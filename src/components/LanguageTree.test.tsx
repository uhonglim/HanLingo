import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { languages, mapPoints } from "../data/languages";
import { groupPath, subgroupPath, varietyPath, resolveReferenceRoute } from "../routing";
import LanguageTree from "./LanguageTree";

type Attributes = Record<string, string>;
function attributes(markup: string): Attributes {
  return Object.fromEntries([...markup.matchAll(/([\w:-]+)(?:="([^"]*)")?/g)]
    .map(match => [match[1], match[2] ?? ""]));
}
function openingTags(html: string, tag: string) {
  return [...html.matchAll(new RegExp(`<${tag}\\b([^>]*)>`, "g"))]
    .map(match => attributes(match[1]));
}
function links(html: string) {
  return [...html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)]
    .map(match => ({ attrs: attributes(match[1]), content: match[2] }));
}
function renderTree(path: string) {
  return renderToStaticMarkup(<MemoryRouter initialEntries={[path]}><LanguageTree /></MemoryRouter>);
}
function expectExpanded(html: string, name: string) {
  const button = openingTags(html, "button").find(item => item["aria-label"] === `Collapse ${name}`);
  expect(button, `${name} must be expanded to expose the current branch`).toBeDefined();
  expect(button?.["aria-expanded"]).toBe("true");
  const target = openingTags(html, "ul").find(item => item.id === button?.["aria-controls"]);
  expect(target, `${name} must control a real subtree`).toBeDefined();
  expect(target).not.toHaveProperty("hidden");
}

const xiamen = mapPoints.find(point => point.id === "xiamen")!;
const xiamenPath = varietyPath(xiamen);
const lessons = ["words", "culture", "sounds", "practice"];

describe("persistent language tree", () => {
  it("exposes five groups at the family root without opening an arbitrary branch", () => {
    const html = renderTree("/");
    const renderedLinks = links(html);
    const destinations = new Set(renderedLinks.map(link => link.attrs.href));
    expect(languages).toHaveLength(5);
    for (const group of languages) expect(destinations.has(groupPath(group.id)), group.name).toBe(true);
    expect(destinations.has(subgroupPath("min", "southern-min"))).toBe(true);
    expect(destinations.has(xiamenPath)).toBe(true);
    for (const lesson of lessons) expect(destinations.has(`${xiamenPath}/${lesson}`), lesson).toBe(true);
    expectExpanded(html, "Han / Sinitic");
    for (const group of languages) {
      const toggle = openingTags(html, "button").find(item => item["aria-label"] === `Expand ${group.name}`);
      expect(toggle?.["aria-expanded"]).toBe("false");
    }
    const current = renderedLinks.filter(link => link.attrs["aria-current"] === "page");
    expect(current).toHaveLength(1);
    expect(current[0].attrs.href).toBe("/");
  });

  it("opens every ancestor and marks only Culture current on a direct lesson URL", () => {
    const path = `${xiamenPath}/culture`;
    const html = renderTree(path);
    const current = links(html).filter(link => link.attrs["aria-current"] === "page");
    expect(current).toHaveLength(1);
    expect(current[0].attrs.href).toBe(path);
    expect(current[0].content).toContain("Culture");
    for (const name of ["Han / Sinitic", "Min", "Southern Min", "Quanzhang cluster", "Xiamen"])
      expectExpanded(html, name);

    const targets = [...openingTags(html, "ul"), ...openingTags(html, "div")];
    for (const control of openingTags(html, "button").filter(button => button["aria-controls"])) {
      expect(targets.some(target => target.id === control["aria-controls"]), control["aria-label"]).toBe(true);
    }
  });

  it("marks Overview once at the Xiamen base route despite the parent sharing its URL", () => {
    const current = links(renderTree(`${xiamenPath}/`)).filter(link => link.attrs["aria-current"] === "page");
    expect(current).toHaveLength(1);
    expect(current[0].attrs.href).toBe(xiamenPath);
    expect(current[0].content).toContain("Overview");
  });

  it("links every published variety through its real parents without a languages prefix or invented cluster route", () => {
    const destinations = new Set(links(renderTree("/")).map(link => link.attrs.href));
    for (const group of languages) {
      expect(destinations.has(groupPath(group.id))).toBe(true);
      for (const subgroup of group.subgroups)
        expect(destinations.has(subgroupPath(group.id, subgroup.id))).toBe(true);
    }
    for (const point of mapPoints) expect(destinations.has(varietyPath(point)), point.name).toBe(true);

    for (const href of destinations) {
      expect(href).not.toMatch(/^\/languages(?:\/|$)/);
      if (href === "/") continue;
      const [languageId, subgroupId, varietyId, lesson, ...extra] = href.split("/").filter(Boolean);
      expect(extra).toHaveLength(0);
      const route = resolveReferenceRoute({ languageId, subgroupId, varietyId });
      expect(route, `Invalid language hierarchy: ${href}`).not.toBeNull();
      if (lesson) {
        expect(route?.point?.id).toBe("xiamen");
        expect(lessons).toContain(lesson);
      }
    }
  });
});
