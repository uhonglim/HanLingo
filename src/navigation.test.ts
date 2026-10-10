import { placeDisplayName } from "./data/language-names";
import { findAtlasLocality, findAtlasCluster, atlasLocalityPath, atlasClusterPath } from "./data/atlas";
import { describe, expect, it } from "vitest";
import { getBreadcrumbs } from "./navigation";

describe("hierarchical navigation", () => {
  it("preserves each real parent of a Xiamen lesson", () => {
    const place = findAtlasLocality("xiamen")!;
    const cluster = findAtlasCluster(place.groupId, place.branchId, place.clusterId)!;
    const expected = [
      { label: "Han languages", path: "/" },
      { label: "Min", path: "/min" },
      { label: "Southern Min", path: "/min/southern-min" },
      { label: cluster.name, path: atlasClusterPath(cluster) },
      { label: placeDisplayName(place), path: atlasLocalityPath(place) },
      { label: "Words", path: `${atlasLocalityPath(place)}/words` },
    ];
    expect(getBreadcrumbs(`${atlasLocalityPath(place)}/words`)).toEqual(expected);
    expect(getBreadcrumbs("/min/southern-min/xiamen/words")).toEqual(expected);
  });
  it("rejects invented parents and unknown lesson paths", () => {
    for (const path of [
      "/min/southern-min/shanghai",
      "/min/southern-min/xiamen/fake",
    ]) {
      expect(getBreadcrumbs(path).at(-1)?.label).toBe("Page not found");
    }
  });
  it("keeps the family root at the homepage", () => {
    expect(getBreadcrumbs("/")).toEqual([
      { label: "Han languages", path: "/" },
    ]);
  });
  it("uses the same page label for navigation and titles", () => {
    expect(getBreadcrumbs("/compare/")).toEqual([
      { label: "Compare", path: "/compare" },
    ]);
    expect(getBreadcrumbs("/languages")).toHaveLength(1);
  });
});
