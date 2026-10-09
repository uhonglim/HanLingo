import { placeDisplayName } from "../data/language-names";
import { findLearningPlace } from "../data/learning/places";
import { availableSections } from "../data/learning";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { languages, mapPoints } from "../data/languages";
import { atlasBranches, atlasClusters, atlasLocalities, atlasClusterPath, atlasLocalityPath, findAtlasLocality, findAtlasCluster } from "../data/atlas";
import { getBreadcrumbs } from "../navigation";
import {
  groupPath,
  subgroupPath,
  varietyPath,
} from "../routing";
import LanguageTree from "./LanguageTree";

type Attributes = Record<string, string>;
function attributes(markup: string): Attributes {
  return Object.fromEntries(
    [...markup.matchAll(/([\w:-]+)(?:="([^"]*)")?/g)].map((match) => [
      match[1],
      match[2] ?? "",
    ]),
  );
}
function openingTags(html: string, tag: string) {
  return [...html.matchAll(new RegExp(`<${tag}\\b([^>]*)>`, "g"))].map(
    (match) => attributes(match[1]),
  );
}
function links(html: string) {
  return [...html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)].map((match) => ({
    attrs: attributes(match[1]),
    content: match[2],
  }));
}
function renderTree(path: string) {
  return renderToStaticMarkup(
    <MemoryRouter initialEntries={[path]}>
      <LanguageTree />
    </MemoryRouter>,
  );
}
function expectExpanded(html: string, name: string) {
  const button = openingTags(html, "button").find(
    (item) => item["aria-label"] === `Collapse ${name}`,
  );
  expect(
    button,
    `${name} must be expanded to expose the current branch`,
  ).toBeDefined();
  expect(button?.["aria-expanded"]).toBe("true");
  const target = openingTags(html, "ul").find(
    (item) => item.id === button?.["aria-controls"],
  );
  expect(target, `${name} must control a real subtree`).toBeDefined();
  expect(target).not.toHaveProperty("hidden");
}

const xiamen = mapPoints.find((point) => point.id === "xiamen")!;
const xiamenPath = varietyPath(xiamen);
const lessons = ["words", "culture", "sounds", "practice"];

describe("persistent language tree", () => {
  it("opens the source cluster as a real ancestor of its locality", () => {
    const place = findAtlasLocality("shantou")!;
    const cluster = findAtlasCluster(place.groupId, place.branchId, place.clusterId)!;
    const html = renderTree(atlasLocalityPath(place));
    for (const name of ["Min", "Southern Min", cluster.name]) expectExpanded(html, name);
    const renderedLinks = links(html);
    const current = renderedLinks.filter(link => link.attrs["aria-current"] === "page");
    expect(current).toHaveLength(1);
    expect(current[0].content).toContain(place.name);
    expect(renderedLinks.filter(link => link.attrs.href === atlasClusterPath(cluster))).toHaveLength(1);
    expect(getBreadcrumbs(atlasLocalityPath(place)).map(crumb => crumb.path)).toEqual([
      "/", "/min", "/min/southern-min", atlasClusterPath(cluster), atlasLocalityPath(place),
    ]);
    expect(html).not.toContain("language-tree-cluster-caption");
  });

  it("gives every locality and chapter the same tree depth as its URL", () => {
    const html = atlasClusters.map(cluster => renderTree(atlasClusterPath(cluster))).join("")
      + mapPoints.map(point => renderTree(varietyPath(point))).join("");
    const listStack: boolean[] = [];
    const depths = new Map<string, number>();
    for (const match of html.matchAll(/<(\/?)(ul|a)\b([^>]*)>/g)) {
      const [, closing, tag, raw] = match;
      if (tag === "ul") {
        if (closing) listStack.pop();
        else listStack.push(attributes(raw).class === "language-tree-children");
      } else if (!closing) {
        depths.set(attributes(raw).href, listStack.filter(Boolean).length);
      }
    }
    for (const cluster of atlasClusters)
      expect(depths.get(atlasClusterPath(cluster)), cluster.id).toBe(2);
    for (const place of atlasLocalities) {
      const path = atlasLocalityPath(place);
      expect(depths.get(path), place.id).toBe(3);
      expect(getBreadcrumbs(path), place.id).toHaveLength(5); // family root + four linguistic levels
      const point = mapPoints.find(point => point.id === place.id);
      for (const section of point ? availableSections(point) : []) {
        expect(depths.get(`${path}/${section}`), `${place.id}/${section}`).toBe(4);
        expect(getBreadcrumbs(`${path}/${section}`)).toHaveLength(6);
      }
    }
  });
  it("exposes five groups at the family root without opening an arbitrary branch", () => {
    const html = renderTree("/");
    const renderedLinks = links(html);
    const destinations = new Set(renderedLinks.map((link) => link.attrs.href));
    expect(languages).toHaveLength(5);
    for (const group of languages)
      expect(destinations.has(groupPath(group.id)), group.name).toBe(true);
    expect(destinations.has(subgroupPath("min", "southern-min"))).toBe(false);
    expect(destinations.has(xiamenPath)).toBe(false);
    for (const lesson of lessons)
      expect(destinations.has(`${xiamenPath}/${lesson}`), lesson).toBe(false);
    expect(html).not.toContain("Han / Sinitic");
    expect(destinations.has("/")).toBe(false);
    for (const group of languages) {
      const toggle = openingTags(html, "button").find(
        (item) => item["aria-label"] === `Expand ${group.name}`,
      );
      expect(toggle?.["aria-expanded"]).toBe("false");
    }
    const current = renderedLinks.filter(
      (link) => link.attrs["aria-current"] === "page",
    );
    expect(current).toHaveLength(0);
  });

  it("opens every ancestor and marks only Photos current on a direct gallery URL", () => {
    const path = `${xiamenPath}/culture`;
    const html = renderTree(path);
    const current = links(html).filter(
      (link) => link.attrs["aria-current"] === "page",
    );
    expect(current).toHaveLength(1);
    expect(current[0].attrs.href).toBe(path);
    expect(current[0].content).toContain("Photos");
    for (const name of ["Min", "Southern Min", findAtlasCluster("min", "southern-min", findAtlasLocality("xiamen")!.clusterId)!.name, placeDisplayName(xiamen)])
      expectExpanded(html, name);

    const targets = [...openingTags(html, "ul"), ...openingTags(html, "div")];
    for (const control of openingTags(html, "button").filter(
      (button) => button["aria-controls"],
    )) {
      expect(
        targets.some((target) => target.id === control["aria-controls"]),
        control["aria-label"],
      ).toBe(true);
    }
  });

  it("marks Amoy once with no duplicate overview destination", () => {
    const current = links(renderTree(`${xiamenPath}/`)).filter(
      (link) => link.attrs["aria-current"] === "page",
    );
    expect(current).toHaveLength(1);
    expect(current[0].attrs.href).toBe(xiamenPath);
    expect(current[0].content).toContain("Amoy");
    expect(
      links(renderTree(xiamenPath)).filter(
        (link) => link.attrs.href === xiamenPath,
      ),
    ).toHaveLength(1);
  });

  it("links every sourced locality through its actual four parents", () => {
    const destinations = new Set(atlasClusters.flatMap(cluster => links(renderTree(atlasClusterPath(cluster))).map(link => link.attrs.href)));
    for (const group of languages) expect(destinations.has(groupPath(group.id))).toBe(true);
    for (const branch of atlasBranches)
      expect(destinations.has(subgroupPath(branch.groupId, branch.id))).toBe(true);
    for (const cluster of atlasClusters)
      expect(destinations.has(atlasClusterPath(cluster))).toBe(true);
    for (const place of atlasLocalities)
      expect(destinations.has(atlasLocalityPath(place)), place.name).toBe(true);

    for (const href of destinations) {
      expect(href).not.toMatch(/^\/languages(?:\/|$)/);
      if (["/", "/written-chinese", "/about"].includes(href)) continue;
      const crumbs = getBreadcrumbs(href);
      expect(crumbs.at(-1)?.label, `Invalid language hierarchy: ${href}`).not.toBe("Page not found");
      expect(crumbs.at(-1)?.path).toBe(href);
      expect(crumbs.slice(1).every(crumb => destinations.has(crumb.path))).toBe(true);
      const segments = href.split("/").filter(Boolean);
      expect(segments.length).toBeLessThanOrEqual(5);
      if (segments.length === 5) {
        const point = findLearningPlace(segments[3]);
        expect(point).toBeDefined();
        expect(availableSections(point!)).toContain(segments[4]);
      }
    }
  });

  it("keeps written Chinese and sources outside the spoken-family hierarchy", () => {
    const html = renderTree("/");
    const referenceList = html.slice(
      html.indexOf('class="language-tree-reference-links"'),
    );
    expect(referenceList).toContain('aria-label="Reference pages"');
    expect(links(referenceList).map((link) => link.attrs.href)).toEqual([
      "/written-chinese",
      "/about",
    ]);
    for (const path of ["/written-chinese", "/about#source-list"]) {
      const current = links(renderTree(path)).filter(
        (link) => link.attrs["aria-current"] === "page",
      );
      expect(current).toHaveLength(1);
      expect(current[0].attrs.href).toBe(path.split("#")[0]);
    }
  });

  it("labels Sounds without changing its canonical lesson route", () => {
    const current = links(renderTree(`${xiamenPath}/sounds`)).filter(
      (link) => link.attrs["aria-current"] === "page",
    );
    expect(current).toHaveLength(1);
    expect(current[0].content).toContain("Sounds");
    expect(current[0].attrs.href).toBe(`${xiamenPath}/sounds`);
  });
});
