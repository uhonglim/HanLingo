import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { resolve } from "node:path";
import { mapPoints } from "../languages";
import { getLocalGallery, localityGalleries } from "./index";

describe("locality photo collections", () => {
  it("gives every mapped locality an Amoy-sized gallery", () => {
    for (const point of mapPoints) {
      const photos = getLocalGallery(point.id);
      expect(photos.length, point.id).toBeGreaterThanOrEqual(9);
      expect(photos.length, point.id).toBeLessThanOrEqual(11);
    }
  });
  it("ships distinct images with usable attribution in each gallery", () => {
    const fileHashes = new Map<string, string>();
    for (const [place, photos] of Object.entries(localityGalleries)) {
      const hashes = new Set<string>();
      const sources = new Set<string>();
      expect(new Set(photos.map((photo) => photo.id)).size, place).toBe(
        photos.length,
      );
      for (const photo of photos) {
        const path = resolve("public", photo.src.replace(/^\//, ""));
        expect(existsSync(path), `${place}: ${photo.src}`).toBe(true);
        if (!fileHashes.has(path))
          fileHashes.set(path, createHash("sha256").update(readFileSync(path)).digest("hex"));
        hashes.add(fileHashes.get(path)!);
        sources.add(photo.sourceUrl);
        for (const text of [
          photo.title,
          photo.alt,
          photo.caption,
          photo.author,
          photo.license,
        ])
          expect(text.trim().length, `${place}: ${photo.id}`).toBeGreaterThan(
            0,
          );
        expect(photo.author).not.toMatch(/^(?:See below|No machine-readable)/i);
        expect(photo.sourceUrl).toMatch(/^https:\/\//);
        expect(photo.licenseUrl).toMatch(/^https:\/\//);
      }
      expect(hashes.size, `${place}: duplicate image data`).toBe(photos.length);
      expect(sources.size, `${place}: duplicate photo source`).toBe(
        photos.length,
      );
    }
  // The full corpus contains hundreds of files; retain every check during parallel test runs.
  }, 20_000);
});
