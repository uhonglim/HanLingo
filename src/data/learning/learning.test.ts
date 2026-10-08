import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { languages, mapPoints } from "../languages";
import {
  branchLearning,
  availableSections,
  getLocalLearning,
  searchWords,
  spellingFor,
} from "./index";
import { getBreadcrumbs } from "../../navigation";
import { varietyPath } from "../../routing";

function sourceUrl(value: string) {
  expect(new URL(value).protocol).toBe("https:");
}
describe("learning coverage beyond Southern Min", () => {
  it("covers every other published branch with scoped sound, culture, and learning sources", () => {
    const expected = languages
      .flatMap((group) =>
        group.subgroups.map((branch) => `${group.id}/${branch.id}`),
      )
      .filter((id) => id !== "min/southern-min")
      .sort();
    expect(branchLearning.map((pack) => pack.branchId).sort()).toEqual(
      expected,
    );
    for (const pack of branchLearning) {
      expect(pack.soundNotes.length, pack.branchId).toBeGreaterThan(0);
      expect(pack.culture.length, pack.branchId).toBeGreaterThan(0);
      expect(pack.resources.length, pack.branchId).toBeGreaterThan(0);
      const ids = mapPoints
        .filter(
          (point) => `${point.groupId}/${point.subgroupId}` === pack.branchId,
        )
        .map((point) => point.id);
      for (const word of pack.words) {
        expect(ids).toContain(word.localityId);
        expect(word.ipa.trim()).not.toBe("");
        expect(word.reading.trim()).not.toBe("");
        sourceUrl(word.source.url);
      }
      for (const item of [
        ...pack.soundNotes,
        ...pack.culture,
        ...pack.resources,
      ]) {
        if (!("scope" in item && item.scope === "branch-comparison"))
          expect(item.localityIds.length, item.title).toBeGreaterThan(0);
        for (const id of item.localityIds)
          expect(ids, pack.branchId).toContain(id);
        sourceUrl("source" in item ? item.source.url : item.url);
      }
      expect(new Set(pack.words.map((word) => word.id)).size).toBe(
        pack.words.length,
      );
      for (const item of pack.culture)
        if (item.photo) {
          sourceUrl(item.photo.sourceUrl);
          sourceUrl(item.photo.licenseUrl);
          expect(item.photo.src.startsWith("/images/")).toBe(true);
          expect(existsSync(resolve("public", item.photo.src.slice(1)))).toBe(
            true,
          );
          expect(item.photo.author.trim()).not.toBe("");
          expect(item.photo.alt.trim()).not.toBe("");
        }
    }
  });
  it("only exposes usable local chapters and validates their breadcrumbs", () => {
    for (const point of mapPoints.filter(
      (point) => point.subgroupId !== "southern-min",
    )) {
      const data = getLocalLearning(point);
      expect(data.resources.length, point.id).toBeGreaterThan(0);
      expect(
        data.culture.some((item) => item.photo),
        point.id,
      ).toBe(true);
      const sections = availableSections(point);
      expect(sections.includes("words")).toBe(data.words.length > 0);
      expect(sections.includes("culture")).toBe(
        data.culture.some((item) => item.photo),
      );
      expect(sections.includes("practice")).toBe(
        new Set(data.words.map((word) => word.english)).size >= 4,
      );
      for (const section of sections)
        expect(
          getBreadcrumbs(`${varietyPath(point)}/${section}`).at(-1)?.label,
        ).not.toBe("Page not found");
      expect(
        getBreadcrumbs(`${varietyPath(point)}/made-up`).at(-1)?.label,
      ).toBe("Page not found");
    }
  });
  it("keeps unsupported IPA unresolved and searches attested fields", () => {
    expect(spellingFor({ ipa: "[te˨˦]", toneNotation: "pitch-contour" })).toBe(
      "te24",
    );
    expect(
      spellingFor({ ipa: "[ɬɜ˧]", toneNotation: "pitch-contour" }),
    ).toBeUndefined();
    expect(
      spellingFor({ ipa: "pa1", toneNotation: "source-category" }),
    ).toBeUndefined();
    expect(spellingFor({ ipa: "pa1" })).toBeUndefined();
    expect(spellingFor({ ipa: "te²⁴", toneNotation: "pitch-contour" })).toBe(
      "te24",
    );
    const words = branchLearning.flatMap((pack) => pack.words);
    for (const word of words)
      expect(searchWords([word], word.han)).toEqual([word]);
    expect(searchWords(words, "unlikely-to-match-a-word")).toEqual([]);
  });
});
