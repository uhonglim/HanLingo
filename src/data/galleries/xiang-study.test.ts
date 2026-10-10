import { describe, expect, it } from "vitest";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { findAtlasLocality } from "../atlas";
import { xiangStudyGalleries } from "./xiang-study";
import provenance from "../../../docs/gallery-xiang-study-provenance.json";

const counts: Record<string, number> = {
  "xiang-county-431321": 7,
  "hengyang-xiang": 10,
  "xiang-county-431224": 9,
  "xiang-county-431223": 6,
};

describe("Xiang study photo galleries", () => {
  it("attaches actual curated counts to the four existing Xiang references", () => {
    expect(Object.keys(xiangStudyGalleries).sort()).toEqual(Object.keys(counts).sort());
    for (const [id, count] of Object.entries(counts)) {
      expect(findAtlasLocality(id)?.groupId).toBe("xiang");
      expect(xiangStudyGalleries[id]).toHaveLength(count);
      expect(provenance.localities.find((row) => row.localityId === id)?.count).toBe(count);
    }
  });

  it("preserves exact sources, credits and hashes for 32 distinct delivered assets", () => {
    const photos = Object.values(xiangStudyGalleries).flat();
    expect(photos).toHaveLength(32);
    expect(provenance.records).toHaveLength(32);
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
    expect(hashes.size).toBe(32);
    expect(sources.size).toBe(32);
  });

  it("retains scope, exclusions and the conflicting school date", () => {
    expect(provenance.held).toHaveLength(8);
    const school = xiangStudyGalleries["xiang-county-431224"].find((p) => p.id === "xiang-study-xupu-6")!;
    expect(school.year).toBeUndefined();
    expect(provenance.records.find((r) => r.id === school.id)?.dateNote).toContain("conflicts");
    expect(provenance.localities.find((r) => r.localityId === "hengyang-xiang")?.scope).toContain("not Hengyang County");
    for (const excluded of ["xiang-study-chenxi-3", "xiang-study-chenxi-5", "xiang-study-hengyang-5", "xiang-study-hengyang-11"])
      expect(Object.values(xiangStudyGalleries).flat().some((p) => p.id === excluded)).toBe(false);
  });
});
