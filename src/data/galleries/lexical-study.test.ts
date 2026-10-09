import { describe, expect, it } from "vitest";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { findAtlasLocality } from "../atlas";
import { expandedGalleries } from "../expansion";
import { lexicalStudyGalleries } from "./lexical-study";
import provenance from "../../../docs/gallery-lexical-study-provenance.json";

const counts: Record<string, number> = {
  "rongcheng-371082": 9,
  "loudi-study": 9,
  "kunming-study": 10,
};

describe("Lexical study photo galleries", () => {
  it("attaches actual curated counts to the three existing lexical references", () => {
    expect(Object.keys(lexicalStudyGalleries).sort()).toEqual(Object.keys(counts).sort());
    for (const [id, count] of Object.entries(counts)) {
      expect(findAtlasLocality(id)).toBeDefined();
      expect(lexicalStudyGalleries[id]).toHaveLength(count);
      expect(provenance.localities.find((row) => row.localityId === id)?.count).toBe(count);
    }
  });

  it("preserves exact sources, credits and hashes for 28 distinct delivered assets", () => {
    const photos = Object.values(lexicalStudyGalleries).flat();
    expect(photos).toHaveLength(28);
    expect(provenance.records).toHaveLength(28);
    const hashes = new Set<string>();
    const sources = new Set<string>();
    for (const photo of photos) {
      const evidence = provenance.records.find((row) => row.id === photo.id)!;
      expect(evidence, photo.id).toBeDefined();
      const bytes = readFileSync(resolve("public", photo.src.slice(1)));
      const hash = createHash("sha256").update(bytes).digest("hex");
      expect(hash).toBe(evidence.imageSha256);
      expect(bytes.subarray(0, 4).toString()).toBe("RIFF");
      expect(bytes.subarray(8, 12).toString()).toBe("WEBP");
      for (const key of ["author", "license", "licenseUrl", "sourceUrl", "caption"] as const)
        expect(photo[key]).toBe(evidence[key]);
      expect(photo.author.trim().length).toBeGreaterThan(0);
      expect(photo.sourceUrl).toMatch(/^https:\/\/commons.wikimedia.org\/wiki\/File:/);
      expect(photo.licenseUrl).toMatch(/^https:\/\/creativecommons.org\//);
      expect(photo.width).toBeGreaterThan(0);
      expect(photo.height).toBeGreaterThan(0);
      expect(Math.max(photo.width!, photo.height!)).toBeLessThanOrEqual(1440);
      hashes.add(hash);
      sources.add(photo.sourceUrl);
    }
    expect(hashes.size).toBe(28);
    expect(sources.size).toBe(28);
  });

  it("retains geographic exclusions and the existing Harbin collection", () => {
    expect(provenance.held).toHaveLength(9);
    expect(provenance.held.find((row) => row.candidate === "loudi-3")?.reason).toContain("nearby village");
    expect(provenance.held.find((row) => row.candidate === "loudi-9")?.reason).toContain("Yanling");
    expect(provenance.localities.find((row) => row.localityId === "rongcheng-371082")?.scope).toContain("Hebei");
    expect(provenance.preservedExisting).toMatchObject({ localityId: "harbin", count: 9 });
    expect(lexicalStudyGalleries.harbin).toBeUndefined();
    expect(expandedGalleries.harbin).toHaveLength(9);
    for (const excluded of ["lexical-study-loudi-3", "lexical-study-loudi-9", "lexical-study-kunming-4"])
      expect(Object.values(lexicalStudyGalleries).flat().some((photo) => photo.id === excluded)).toBe(false);
  });
});
