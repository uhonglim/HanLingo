import { placeReadingName } from "./language-names";
import { existsSync, readFileSync, statSync } from "node:fs";
import { resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  groupArticles,
  subgroupArticles,
  varietyArticles,
} from "./encyclopedia";
import type { EncyclopediaEntry } from "./encyclopedia";
import { languages, mapPoints } from "./languages";
import { groupPhotos } from "./photography";
import { minCommunityPhotos } from "./min-community-photos";

function expectHttpsUrl(value: string, context: string) {
  expect(value.trim(), `${context} must have a URL`).not.toBe("");
  const parsed = new URL(value);
  expect(parsed.protocol, `${context} must use HTTPS`).toBe("https:");
  expect(parsed.hostname, `${context} must identify a host`).not.toBe("");
  expect(parsed.username, `${context} must not embed credentials`).toBe("");
  expect(parsed.password, `${context} must not embed credentials`).toBe("");
}

function expectCompleteArticle(
  article: EncyclopediaEntry,
  context: string,
  minimumBodyWords: number,
) {
  expect(article, `${context} needs an article`).toBeDefined();
  expect(article.title.trim(), `${context} needs a title`).not.toBe("");
  expect(article.dek.trim(), `${context} needs an introduction`).not.toBe("");
  expect(
    article.sections.length,
    `${context} must extend beyond the initial single-section scaffold`,
  ).toBeGreaterThanOrEqual(2);

  for (const section of article.sections) {
    expect(
      section.heading.trim(),
      `${context} contains an untitled section`,
    ).not.toBe("");
    expect(
      section.paragraphs.length,
      `${context} / ${section.heading} needs actual prose`,
    ).toBeGreaterThan(0);
    for (const paragraph of section.paragraphs) {
      expect(
        paragraph.trim(),
        `${context} / ${section.heading} contains an empty paragraph`,
      ).not.toBe("");
      expect(
        paragraph,
        `${context} contains unfinished scaffold text`,
      ).not.toMatch(
        /\b(?:TODO|TBD|lorem ipsum|content pending|coming soon|placeholder text)\b/i,
      );
    }
  }

  // Low editorial floors catch a regression to route labels and starter blurbs;
  // they do not stand in for source review or factual quality.
  const bodyWords = article.sections
    .flatMap((section) => section.paragraphs)
    .join(" ")
    .trim()
    .split(/\s+/u).length;
  expect(
    bodyWords,
    `${context} needs substantive reference prose, not a navigation stub`,
  ).toBeGreaterThanOrEqual(minimumBodyWords);

  expect(
    article.facts.length,
    `${context} needs populated reference facts`,
  ).toBeGreaterThan(0);
  for (const fact of article.facts) {
    expect(
      fact.label.trim(),
      `${context} contains an unlabelled fact`,
    ).not.toBe("");
    expect(fact.value.trim(), `${context} contains an empty fact`).not.toBe("");
  }

  expect(
    article.sources.length,
    `${context} needs a traceable source`,
  ).toBeGreaterThan(0);
  for (const source of article.sources) {
    expect(
      source.title.trim(),
      `${context} contains an untitled source`,
    ).not.toBe("");
    expectHttpsUrl(source.url, `${context}: ${source.title}`);
  }
  expect(Number.isInteger(article.readingMinutes)).toBe(true);
  expect(article.readingMinutes).toBeGreaterThan(0);
}

describe("reference page coverage", () => {
  it("provides a complete article for every language card", () => {
    const expectedIds = languages.map((group) => group.id).sort();
    expect(Object.keys(groupArticles).sort()).toEqual(expectedIds);
    for (const group of languages) {
      expectCompleteArticle(
        groupArticles[group.id],
        `${group.name} group page`,
        250,
      );
    }
  });

  it("provides a complete article for every subgroup route", () => {
    const expectedIds = languages.flatMap((group) =>
      group.subgroups.map((subgroup) => `${group.id}/${subgroup.id}`),
    );
    expect(Object.keys(subgroupArticles).sort()).toEqual(expectedIds.sort());
    for (const id of expectedIds) {
      expectCompleteArticle(subgroupArticles[id], `${id} subgroup page`, 70);
    }
  });

  it("provides a complete article for every selectable local map point", () => {
    expect(Object.keys(varietyArticles).sort()).toEqual(
      mapPoints.map((point) => point.id).sort(),
    );
    for (const point of mapPoints) {
      expectCompleteArticle(
        varietyArticles[point.id],
        `${point.name} local variety page`,
        80,
      );
    }
  });

  it("keeps new locality references at city scope with primary pronunciation evidence for Taipei", () => {
    const localAnchors = [
      ["taipak", "Taipei", "Taipei"],
      ["singapore", "Singapore", "Singapore"],
      ["george-town", "George Town", "George Town"],
    ] as const;

    for (const [id, anchor, title] of localAnchors) {
      const entry = varietyArticles[id];
      expectCompleteArticle(entry, `${id} locality reference`, 200);
      const facts = Object.fromEntries(
        entry.facts.map((fact) => [fact.label, fact.value]),
      );
      expect(entry.title).toBe(title);
      expect(facts["Entry type"]).toBe("Locality reference");
      expect(facts["Map anchor"]).toContain(anchor);
      expect(facts["Map anchor"]).toMatch(/city reference/i);
      expect(facts["Map anchor"]).toMatch(/not a dialect boundary/i);
      expect(entry.sources.length).toBeGreaterThanOrEqual(3);
      expect(new Set(entry.sources.map((source) => source.url)).size).toBe(
        entry.sources.length,
      );
    }

    const taipak = varietyArticles["taipak"];
    expect(taipak.facts.find((fact) => fact.label === "Dictionary reference")?.value).toMatch(
      /Taipei/i,
    );
    expect(
      taipak.sources.some((source) =>
        source.url.startsWith("https://sutian.moe.edu.tw/"),
      ),
      "Taipak's named local reading must retain its primary dictionary source",
    ).toBe(true);
  });

  it("preserves five distinct Taiwan locality references with sourced local names", () => {
    const references = [
      ["tainan", "Tâi-lâm", "Tainan", "臺南混合腔"],
      ["kaohsiung", "Ko-hiông", "Kaohsiung", "高雄混合腔"],
      ["yilan", "Gî-lân", "Yilan", "宜蘭偏漳腔"],
      ["lukang", "Lo̍k-káng", "Lukang", "鹿港偏泉腔"],
      ["sanxia", "Sam-kiap", "Sanxia", "三峽偏泉腔"],
    ] as const;

    for (const [id, localName, englishName, dictionaryLabel] of references) {
      const point = mapPoints.find((candidate) => candidate.id === id);
      expect(point?.name).toBe(englishName);
      expect(placeReadingName({ id })).toBe(localName);
      expect(point?.hierarchy.at(-1)).toBe(englishName);
      const entry = varietyArticles[id];
      expectCompleteArticle(entry, `${id} local reference`, 80);
      expect(entry.title).toBe(englishName);
      const facts = Object.fromEntries(
        entry.facts.map((fact) => [fact.label, fact.value]),
      );
      expect(facts["English name"]).toBe(englishName);
      expect(facts["Dictionary reference"]).toContain(dictionaryLabel);
      expect(facts["Name convention"]).toContain("MOE Tâi-lô");
      expect(
        entry.sources.filter((source) => new URL(source.url).hostname === "sutian.moe.edu.tw").length,
        `${localName} needs its primary name and dictionary evidence`,
      ).toBeGreaterThanOrEqual(2);
    }

    expect(varietyArticles.lukang.facts).toContainEqual({
      label: "Administrative unit", value: "Township",
    });
    expect(varietyArticles.sanxia.facts).toContainEqual({
      label: "Administrative unit", value: "District of New Taipei",
    });
  });
});

describe("documentary photo integration", () => {
  it("provides a real bundled image for every group without unsafe paths", () => {
    expect(Object.keys(groupPhotos).sort()).toEqual(
      languages.map((group) => group.id).sort(),
    );
    const publicRoot = fileURLToPath(new URL("../../public/", import.meta.url));

    for (const [name, photo] of [...Object.entries(groupPhotos), ...Object.entries(minCommunityPhotos)]) {
      expect(photo.src, `${name} needs a local photo asset`).toMatch(
        /^\/images\/[a-z0-9][a-z0-9._-]*\.(?:webp|jpe?g|png)$/i,
      );
      const filePath = resolve(publicRoot, `.${photo.src}`);
      expect(filePath.startsWith(resolve(publicRoot) + sep)).toBe(true);
      expect(existsSync(filePath), `${photo.src} must exist in public`).toBe(
        true,
      );
      expect(statSync(filePath).isFile()).toBe(true);

      const file = readFileSync(filePath);
      expect(
        file.length,
        `${photo.src} must not be an empty or error response`,
      ).toBeGreaterThan(100);
      if (/\.webp$/i.test(photo.src)) {
        expect(file.subarray(0, 4).toString()).toBe("RIFF");
        expect(file.subarray(8, 12).toString()).toBe("WEBP");
      } else if (/\.png$/i.test(photo.src)) {
        expect(file.subarray(0, 8).toString("hex")).toBe("89504e470d0a1a0a");
      } else {
        expect(file.subarray(0, 3).toString("hex")).toBe("ffd8ff");
      }
    }
  });

  it("keeps accessible descriptions, context, and licensing with each photo", () => {
    for (const [id, photo] of Object.entries(groupPhotos)) {
      for (const key of ["alt", "caption", "author", "license"] as const) {
        expect(photo[key].trim(), `${id} photo needs ${key}`).not.toBe("");
      }
      expect(photo.alt).not.toEqual(photo.caption);
      expectHttpsUrl(photo.sourceUrl, `${id} photo source`);
      expectHttpsUrl(photo.licenseUrl, `${id} photo license`);
      expect(photo.license, `${id} needs an explicit reusable license`).toMatch(
        /^(?:CC0|Public domain|CC BY(?:-SA)? \d\.\d)$/,
      );
    }
  });
});
