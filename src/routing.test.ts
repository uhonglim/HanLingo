import { legacyMinQueryTarget } from "./routing";
import { findAtlasLocality, atlasLocalityPath } from "./data/atlas";
import { describe, expect, it } from "vitest";
import { languages, mapPoints } from "./data/languages";
import {
  groupPath,
  subgroupPath,
  varietyPath,
  resolveReferenceRoute,
} from "./routing";

describe("reference routes", () => {
  it("resolves every published group, subgroup, and local variety", () => {
    for (const language of languages) {
      expect(resolveReferenceRoute({ languageId: language.id })?.level).toBe(
        "group",
      );
      expect(groupPath(language.id)).toBe(`/${language.id}`);
      for (const subgroup of language.subgroups) {
        expect(
          resolveReferenceRoute({
            languageId: language.id,
            subgroupId: subgroup.id,
          })?.level,
        ).toBe("subgroup");
        expect(subgroupPath(language.id, subgroup.id)).toBe(
          `/${language.id}/${subgroup.id}`,
        );
      }
    }
    for (const point of mapPoints) {
      expect(
        resolveReferenceRoute({
          languageId: point.groupId,
          subgroupId: point.subgroupId,
          varietyId: point.id,
        })?.point,
      ).toBe(point);
      expect(varietyPath(point)).toBe(
        atlasLocalityPath(findAtlasLocality(point.id)!),
      );
    }
  });

  it("rejects mismatched hierarchy levels instead of displaying the wrong article", () => {
    expect(
      resolveReferenceRoute({ languageId: "min", subgroupId: "taihu" }),
    ).toBeNull();
    expect(
      resolveReferenceRoute({
        languageId: "min",
        subgroupId: "southern-min",
        varietyId: "fuzhou",
      }),
    ).toBeNull();
    expect(
      resolveReferenceRoute({
        languageId: "min",
        subgroupId: "southern-min",
        varietyId: "shanghai",
      }),
    ).toBeNull();
    expect(
      resolveReferenceRoute({ languageId: "min", varietyId: "xiamen" }),
    ).toBeNull();
    expect(resolveReferenceRoute({ languageId: "unknown" })).toBeNull();
  });
});

describe("legacy Min map selections", () => {
  it("preserves places, branch selection and unrelated query parameters", () => {
    expect(legacyMinQueryTarget("?branch=southern-min&place=penang-hokkien&q=tea")).toBe("/min/southern-min/tsuan-chiang/george-town?q=tea");
    expect(legacyMinQueryTarget("?branch=eastern-min")).toBe("/min/eastern-min");
    expect(legacyMinQueryTarget("?place=beijing-city")).toBeNull();
    expect(legacyMinQueryTarget("")).toBeNull();
  });
});
