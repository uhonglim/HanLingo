import { createServer } from "node:http";
import { randomUUID } from "node:crypto";
import { pathToFileURL } from "node:url";
import {
  readConfig,
  createModelClient,
  translate,
  TranslationError,
  validateInput,
} from "./translation.mjs";

export function createTranslationServer({
  config = readConfig(),
  callModel,
  origins = ["http://127.0.0.1:5173", "http://localhost:5173"],
  limit = 10,
  concurrency = 2,
  bodyTimeoutMs = 15000,
} = {}) {
  const clients = new Map();
  let active = 0;
  return createServer(async (req, res) => {
    const origin = req.headers.origin;
    const send = (status, body) => {
      if (res.destroyed || res.writableEnded) return;
      res.writeHead(status, {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
      });
      res.end(JSON.stringify(body));
    };
    if (origin && !origins.includes(origin))
      return send(403, { error: "This origin is not allowed." });
    if (origin) {
      res.setHeader("Access-Control-Allow-Origin", origin);
      res.setHeader("Vary", "Origin");
    }
    if (req.method === "OPTIONS") {
      res.writeHead(204, {
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Max-Age": "600",
      });
      return res.end();
    }
    const path = req.url?.split("?")[0];
    if (path === "/api/translation/status" && req.method === "GET")
      return send(200, { configured: config.configured, maxCharacters: 800 });
    if (path !== "/api/translate") return send(404, { error: "Not found." });
    if (req.method !== "POST")
      return send(405, { error: "Use POST for translation." });
    if (!config.configured)
      return send(503, {
        code: "NOT_CONFIGURED",
        error:
          "Automatic translation is not connected yet. The server needs a model provider.",
      });
    if (!req.headers["content-type"]?.startsWith("application/json"))
      return send(415, { error: "Send JSON." });
    const now = Date.now();
    for (const [key, record] of clients)
      if (record.expires <= now) clients.delete(key);
    // Do not trust a browser-supplied forwarded IP. Public deployments should add a gateway quota.
    const ip = req.socket.remoteAddress || "unknown";
    const record = clients.get(ip) || { expires: now + 60000, count: 0 };
    if (
      record.count >= limit ||
      active >= concurrency ||
      clients.size >= 5000
    ) {
      res.setHeader("Retry-After", "60");
      return send(429, {
        error: "Translation is busy. Please try again shortly.",
      });
    }
    record.count++;
    clients.set(ip, record);
    active++;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 185000);
    const bodyTimeout = setTimeout(() => {
      controller.abort();
      req.destroy(new Error("Request body deadline exceeded"));
    }, bodyTimeoutMs);
    res.on("close", () => {
      if (!res.writableEnded) controller.abort();
    });
    try {
      const chunks = [];
      let bytes = 0;
      for await (const chunk of req) {
        bytes += chunk.length;
        if (bytes > 12000)
          throw new TranslationError(
            "Request is too large.",
            413,
            "INVALID_INPUT",
          );
        chunks.push(chunk);
      }
      clearTimeout(bodyTimeout);
      let body;
      try {
        body = JSON.parse(Buffer.concat(chunks).toString("utf8"));
      } catch {
        throw new TranslationError("Send valid JSON.", 400, "INVALID_INPUT");
      }
      const input = validateInput(body);
      const result = await translate(input, {
        callModel: callModel || createModelClient(config),
        signal: controller.signal,
      });
      send(200, { ...result, requestId: randomUUID() });
    } catch (error) {
      if (controller.signal.aborted)
        send(504, {
          error: "Translation timed out. Please try a shorter text.",
        });
      else
        send(error instanceof TranslationError ? error.status : 500, {
          code:
            error instanceof TranslationError ? error.code : "INTERNAL_ERROR",
          error:
            error instanceof TranslationError
              ? error.message
              : "Translation could not finish. Please try again.",
        });
    } finally {
      clearTimeout(timeout);
      clearTimeout(bodyTimeout);
      active--;
    }
  });
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  const host = process.env.HANLINGO_API_HOST || "127.0.0.1";
  const port = Number(process.env.HANLINGO_API_PORT || 8788);
  const origins = (
    process.env.HANLINGO_ALLOWED_ORIGINS ||
    "http://127.0.0.1:5173,http://localhost:5173"
  )
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const server = createTranslationServer({ origins });
  server.requestTimeout = 190000;
  server.listen(port, host, () =>
    console.log(
      `HanLingo translation API on http://${host}:${port}; provider ${readConfig().configured ? "configured" : "not configured"}`,
    ),
  );
}
