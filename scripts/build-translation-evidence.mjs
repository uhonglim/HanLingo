import { createServer } from "vite";
import { writeFile } from "node:fs/promises";
const vite = await createServer({
  server: { middlewareMode: true },
  appType: "custom",
});
try {
  const { mapPoints } = await vite.ssrLoadModule("/src/data/languages.ts");
  const { getLocalLearning } = await vite.ssrLoadModule(
    "/src/data/learning/index.ts",
  );
  const places = {
    amoy: "xiamen",
    beijing: "beijing-city",
    shanghai: "shanghai",
    guangzhou: "guangzhou",
    meixian: "meixian",
  };
  const data = Object.fromEntries(
    Object.entries(places).map(([target, id]) => {
      const point = mapPoints.find((p) => p.id === id);
      return [
        target,
        getLocalLearning(point).words.map((word) => ({
          han: word.han,
          meaning: word.english,
          scope: word.registerLabel || word.reading,
          note: word.note || "",
          source: word.source,
        })),
      ];
    }),
  );
  await writeFile("server/evidence.json", JSON.stringify(data, null, 2) + "\n");
  console.log(
    "Built locality-specific translation grounding; no neighbouring locality substitutions.",
  );
} finally {
  await vite.close();
}
