import { describe, expect, it } from "vitest";
import { atlasLocalities, atlasClusters } from "./atlas";
import { mapPoints } from "./languages";
import { romanizationReadings } from "./romanization-examples";
import { clusterLabel, languageNameGlossary, placeLabel, placeNameReferences, quanzhangLabel } from "./language-names";

describe("documented community names", () => {
  it("uses one label across atlas, old learning points and IPA readings", () => {
    for (const point of mapPoints) {
      expect(point.name, point.id).toBe(placeLabel(point));
      expect(atlasLocalities.find((item) => item.id === point.id)?.name, point.id).toBe(point.name);
      for (const word of romanizationReadings.filter((item) => item.localityId === point.id)) {
        expect(word.locality, word.id).toBe(point.name);
      }
    }
  });
  it("retains searchable geographic aliases and an explicit source for every override", () => {
    for (const [id, reference] of Object.entries(placeNameReferences)) {
      const point = atlasLocalities.find((item) => item.id === id);
      expect(point, id).toBeDefined();
      expect(point!.name).toBe(reference.label);
      expect(point!.aliases).toEqual(expect.arrayContaining(reference.aliases));
      expect(reference.source.url).toMatch(/^https:\/\//);
      expect(reference.note.length).toBeGreaterThan(40);
    }
    expect(placeNameReferences.guangzhou.kind).toBe("conventional");
    expect(placeNameReferences.guangzhou.aliases).toContain("Guangzhou");
    expect(placeNameReferences.chayang.aliases).not.toContain("Dabu");
    expect(placeLabel({ id: "unresearched-place", name: "Documented geographic name" })).toBe("Documented geographic name");
  });
  it("keeps cluster naming consistent without changing the stable URL identifier", () => {
    const cluster = atlasClusters.find((item) => item.id === "tsuan-chiang")!;
    expect(cluster.name).toBe(quanzhangLabel);
    expect(clusterLabel("Quanzhang cluster")).toBe(quanzhangLabel);
    expect(clusterLabel("Tsuan-Chiang")).toBe(quanzhangLabel);
    expect(languageNameGlossary.map((entry) => entry.term)).toEqual(["Min", "Southern Min", "Tsuân-Tsiang", "Hokkien", "Hoklo"]);
    expect(new Set(languageNameGlossary.map((entry) => entry.text)).size).toBe(5);
  });
});
