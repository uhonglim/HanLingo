import { findAtlasLocality, atlasLocalityPath } from "./data/atlas";
import { describe, expect, it } from "vitest";
import { publicPaths, staticPaths } from "./static-paths";
import { getBreadcrumbs } from "./navigation";

describe("static hosting routes", () => {
  it("gives real canonical routes a unique directory entry point", () => {
    const paths = publicPaths();
    expect(new Set(paths).size).toBe(paths.length);
    for (const path of paths) {
      expect(path).toMatch(/^\/(?:[a-z0-9-]+(?:\/[a-z0-9-]+)*)?$/);
      expect(getBreadcrumbs(path).at(-1)?.label, path).not.toBe(
        "Page not found",
      );
    }
    expect(paths).toContain(`${atlasLocalityPath(findAtlasLocality("fuzhou")!)}/words`);
    expect(paths).toContain("/romanization");
    expect(paths).toContain(`${atlasLocalityPath(findAtlasLocality("yongan")!)}/words`);
    expect(paths).toContain(`${atlasLocalityPath(findAtlasLocality("chengdu")!)}/practice`);
    expect(paths).toContain(`${atlasLocalityPath(findAtlasLocality("guangzhou")!)}/words`);
    expect(paths).not.toContain(`${atlasLocalityPath(findAtlasLocality("lishui")!)}/practice`);
  });
  it("keeps legacy entry points available without including them in the sitemap", () => {
    expect(staticPaths()).toContain("/languages/min/southern-min/xiamen/words");
    expect(staticPaths()).toContain("/min/southern-min/penang-hokkien");
    expect(publicPaths()).not.toContain("/languages");
  });
});
