import { describe, expect, it } from "vitest";
import { englishLetter, languages, letters, mapPoints } from "./languages";

describe("atlas data integrity", () => {
  it("keeps every selectable language and map point uniquely addressable", () => {
    expect(new Set(languages.map((language) => language.id)).size).toBe(
      languages.length,
    );
    expect(new Set(mapPoints.map((point) => point.id)).size).toBe(
      mapPoints.length,
    );

    for (const language of languages) {
      expect(
        new Set(language.subgroups.map((subgroup) => subgroup.id)).size,
        `Subgroup ids must be unique within ${language.name}`,
      ).toBe(language.subgroups.length);
    }
  });

  it("gives every language and subgroup filter at least one selectable map point", () => {
    for (const language of languages) {
      expect(
        language.subgroups.length,
        `${language.name} needs a subgroup selector`,
      ).toBeGreaterThan(0);

      for (const subgroup of language.subgroups) {
        const matches = mapPoints.filter(
          (point) =>
            point.groupId === language.id && point.subgroupId === subgroup.id,
        );
        expect(
          matches.length,
          `${language.name} / ${subgroup.name} must not open an empty map`,
        ).toBeGreaterThan(0);
      }
    }
  });

  it("connects every point to an existing group, subgroup, and local place", () => {
    for (const point of mapPoints) {
      const language = languages.find(
        (candidate) => candidate.id === point.groupId,
      );
      expect(
        language,
        `${point.name} must belong to a visible language group`,
      ).toBeDefined();

      const subgroup = language!.subgroups.find(
        (candidate) => candidate.id === point.subgroupId,
      );
      expect(
        subgroup,
        `${point.name} must belong to a visible subgroup`,
      ).toBeDefined();
      expect(
        subgroup!.places,
        `${point.name} must appear in its subgroup's example places`,
      ).toContain(point.name);

      expect(point.hierarchy[0]).toBe("Sinitic");
      expect(point.hierarchy[1]).toBe(language!.name);
      expect(point.hierarchy[2]).toBe(subgroup!.name);
      expect(
        point.hierarchy.at(-1),
        "A breadcrumb must end at the selected local variety",
      ).toBe(point.name);
      expect(point.nativeName.trim().length).toBeGreaterThan(0);
    }
  });

  it("uses finite longitude/latitude pairs that the map can project", () => {
    for (const point of mapPoints) {
      expect(
        point.coordinates,
        `${point.name} needs exactly two coordinates`,
      ).toHaveLength(2);
      const [longitude, latitude] = point.coordinates;
      expect(Number.isFinite(longitude)).toBe(true);
      expect(Number.isFinite(latitude)).toBe(true);
      expect(longitude).toBeGreaterThanOrEqual(-180);
      expect(longitude).toBeLessThanOrEqual(180);
      expect(latitude).toBeGreaterThanOrEqual(-90);
      expect(latitude).toBeLessThanOrEqual(90);
    }
  });

  it("can open every language at its advertised featured place", () => {
    for (const language of languages) {
      const featuredPoint = mapPoints.find(
        (point) =>
          point.groupId === language.id &&
          point.name === language.featuredPlace,
      );
      expect(
        featuredPoint,
        `${language.name}'s featured place must exist on its map`,
      ).toBeDefined();
      expect(language.hierarchy).toEqual(featuredPoint!.hierarchy);
    }
  });

  it("preserves Quanzhang as a cluster between Southern Min and local varieties", () => {
    const quanzhangPlaces = ["Xiamen", "Quanzhou", "Zhangzhou"];

    for (const place of quanzhangPlaces) {
      const point = mapPoints.find((candidate) => candidate.name === place);
      expect(point, `${place} needs a local example`).toBeDefined();
      expect(point!.hierarchy).toEqual([
        "Sinitic",
        "Min",
        "Southern Min",
        "Quanzhang cluster",
        place,
      ]);
    }

    expect(mapPoints.some((point) => point.name === "Quanzhang")).toBe(false);
  });

  it("keeps Tsuan-Chiang localities as peers with distinct map anchors", () => {
    const anchors = [
      ["taipak", 121.5654, 25.033],
      ["tainan", 120.205, 22.997],
      ["kaohsiung", 120.3014, 22.6273],
      ["yilan", 121.753, 24.7554],
      ["lukang", 120.435, 24.052],
      ["sanxia", 121.369, 24.934],
      ["singapore", 103.8198, 1.3521],
      ["george-town", 100.3327, 5.4141],
    ] as const;

    for (const [id, longitude, latitude] of anchors) {
      const point = mapPoints.find((candidate) => candidate.id === id);
      expect(point, `${id} must remain reachable from the map`).toBeDefined();
      expect(point!.coordinates).toEqual([longitude, latitude]);
      expect(point!.groupId).toBe("min");
      expect(point!.subgroupId).toBe("southern-min");
      expect(point!.hierarchy.slice(0, -1)).toEqual([
        "Sinitic",
        "Min",
        "Southern Min",
        "Quanzhang cluster",
      ]);
      expect(point!.hierarchy).not.toContain("Xiamen");
    }
  });
});

describe("letter comparison data", () => {
  it("offers one complete contributor letter for each of five groups and the written register", () => {
    const expectedIds = ["mandarin", "min", "yue", "hakka", "wu", "formal"];
    expect(letters.map((letter) => letter.id).sort()).toEqual(
      expectedIds.sort(),
    );

    for (const letter of letters) {
      expect(
        letter.paragraphs,
        `${letter.label} must retain all three supplied paragraphs`,
      ).toHaveLength(3);
      for (const text of [
        letter.salutation,
        ...letter.paragraphs,
        letter.closing,
      ]) {
        expect(
          text.trim().length,
          `${letter.label} contains an empty part`,
        ).toBeGreaterThan(0);
        expect(text, `${letter.label} must retain its Han text`).toMatch(
          /\p{Script=Han}/u,
        );
      }
      expect(letter.label.trim()).not.toBe("");
      expect(letter.place.trim()).not.toBe("");
      expect(letter.note.trim()).not.toBe("");
    }
  });

  it("provides a nonempty English meaning for each paragraph in every comparison tab", () => {
    expect(englishLetter).toHaveLength(3);
    for (const paragraph of englishLetter) {
      expect(paragraph.trim().length).toBeGreaterThan(0);
    }

    for (const letter of letters) {
      expect(letter.english).toHaveLength(letter.paragraphs.length);
      for (const paragraph of letter.english) {
        expect(paragraph.trim().length).toBeGreaterThan(0);
      }
    }
  });

  it("keeps the formal written register out of the five spoken group maps", () => {
    expect(languages.map((language) => language.id).sort()).toEqual(
      ["mandarin", "min", "yue", "hakka", "wu"].sort(),
    );
    expect(mapPoints.map((point) => point.groupId)).not.toContain("formal");
    expect(letters.find((letter) => letter.id === "formal")).toBeDefined();
  });
});
