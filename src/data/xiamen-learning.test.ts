import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { xiamenWords } from "./xiamen-lexicon";
import { xiamenPhotos } from "./xiamen-photos";
import {
  makeQuiz,
  pitchLetters,
  romanizeXiamen,
  xiamenSpellingKey,
} from "./xiamen-romanization";

function expectHttpsUrl(value: string) {
  const url = new URL(value);
  expect(url.protocol).toBe("https:");
  expect(url.hostname).not.toBe("");
  expect(url.username + url.password).toBe("");
}

describe("Xiamen learning readings", () => {
  it("can display every sourced word with matching IPA syllables and explicit contours", () => {
    expect(xiamenWords).toHaveLength(35);
    expect(new Set(xiamenWords.map((word) => word.id)).size).toBe(
      xiamenWords.length,
    );

    for (const word of xiamenWords) {
      expect(word.segments.length, word.id).toBeGreaterThan(0);
      expect(word.tones.length, word.id).toBe(word.segments.length);
      const romanized = romanizeXiamen(word.segments, word.tones).split(" ");
      expect(romanized.length, word.id).toBe(word.segments.length);

      const displayedSyllables = word.ipa.slice(1, -1).split(" ");
      expect(word.ipa, word.id).toMatch(/^\[.+\]$/u);
      expect(displayedSyllables.length, word.id).toBe(word.segments.length);
      word.segments.forEach((segment, index) => {
        expect(segment.trim(), word.id).not.toBe("");
        expect(segment, word.id).not.toMatch(/[1-5˩˨˧˦˥]/u);
        expect(word.tones[index], word.id).toMatch(/^[1-5]{1,3}$/u);
        expect(romanized[index].match(/([1-5]+)$/u)?.[1], word.id).toBe(
          word.tones[index],
        );
        expect(displayedSyllables[index], word.id).toBe(
          segment + pitchLetters(word.tones[index]),
        );
      });

      expect(word.han.trim(), word.id).not.toBe("");
      expect(word.english.trim(), word.id).not.toBe("");
      expect(word.sourceReading, word.id).toMatch(/^\/.+\/$/u);
      expect(word.sourceLabel.trim(), word.id).not.toBe("");
      expectHttpsUrl(word.sourceUrl);
    }
  });

  it("preserves the agreed consonant contrasts instead of borrowing Pinyin values", () => {
    expect(
      romanizeXiamen(
        ["t͡sa", "t͡sʰa", "pa", "pʰa", "ba"],
        ["44", "44", "44", "44", "44"],
      ),
    ).toBe("tsa44 tsha44 pa44 pha44 ba44");
    expect(romanizeXiamen(["tɕi", "tɕʰi", "kɐn"], ["35", "35", "22"])).toBe(
      "chi35 chhi35 kăn22",
    );

    for (const [ipa, spelling] of [
      ["t͡s", "ts"],
      ["t͡sʰ", "tsh"],
      ["pʰ", "ph"],
      ["p", "p"],
      ["b", "b"],
    ]) {
      expect(xiamenSpellingKey.find((rule) => rule.ipa === ipa)).toMatchObject({
        spelling,
        status: "Core",
      });
    }
    expect(pitchLetters("35")).toBe("˧˥");
    expect(pitchLetters("51")).toBe("˥˩");
  });

  it("keeps nasal vowels distinct from codas while simplifying syllabicity and release marks", () => {
    expect(
      romanizeXiamen(["mi", "mĩ", "min", "pŋ̍"], ["22", "22", "22", "22"]),
    ).toBe("mi22 mi~22 min22 png22");
    expect(
      romanizeXiamen(
        ["pa", "paʔ", "pat̚", "pak̚", "pap̚"],
        ["4", "4", "4", "4", "4"],
      ),
    ).toBe("pa4 paq4 pat4 pak4 pap4");
    // Canonically equivalent IPA must not create a different displayed spelling.
    expect(romanizeXiamen(["mĩ"], ["22"])).toBe(
      romanizeXiamen(["mi\u0303"], ["22"]),
    );
  });

  it("uses attested connected tones without silently replacing citation readings", () => {
    const byId = new Map(xiamenWords.map((word) => [word.id, word]));
    expect(byId.get("good")).toMatchObject({
      tones: ["53"],
      readingMode: "Citation",
    });
    expect(byId.get("tasty")).toMatchObject({
      tones: ["44", "4"],
      readingMode: "Connected speech",
    });
    expect(byId.get("airplane")).toMatchObject({
      tones: ["22", "44"],
      readingMode: "Connected speech",
    });
    expect(byId.get("one")).toMatchObject({ segments: ["t͡sit̚"], tones: ["4"] });
    expect(byId.get("seven")).toMatchObject({
      segments: ["t͡sʰit̚"],
      tones: ["32"],
    });
  });

  it("rejects incomplete syllables, missing tones, and unsupported sound values", () => {
    expect(() => romanizeXiamen([], [])).toThrow();
    expect(() => romanizeXiamen(["pa", "ta"], ["44"])).toThrow();
    expect(() => romanizeXiamen(["pa"], ["6"])).toThrow();
    expect(() => romanizeXiamen(["pa"], [""])).toThrow();
    expect(() => romanizeXiamen(["ʙa"], ["44"])).toThrow();
  });
});

describe("Xiamen documentary photo collection", () => {
  it("ships all eleven credited photos as valid local WebP files", () => {
    expect(xiamenPhotos).toHaveLength(11);
    expect(new Set(xiamenPhotos.map((photo) => photo.id)).size).toBe(
      xiamenPhotos.length,
    );
    expect(new Set(xiamenPhotos.map((photo) => photo.src)).size).toBe(
      xiamenPhotos.length,
    );
    expect(xiamenPhotos.some((photo) => photo.id === "gulangyu-rooftops")).toBe(
      true,
    );

    for (const photo of xiamenPhotos) {
      expect(photo.src).toMatch(/^\/images\/xiamen-[a-z0-9-]+\.webp$/u);
      const path = fileURLToPath(
        new URL(`../../public${photo.src}`, import.meta.url),
      );
      const file = readFileSync(path);
      expect(file.subarray(0, 4).toString(), photo.id).toBe("RIFF");
      expect(file.subarray(8, 12).toString(), photo.id).toBe("WEBP");
      expect(file.readUInt32LE(4) + 8, photo.id).toBe(file.length);
      for (const field of ["alt", "caption", "author", "license"] as const) {
        expect(photo[field].trim(), `${photo.id}: ${field}`).not.toBe("");
      }
      expect(photo.license, photo.id).toMatch(
        /^(?:CC BY(?:-SA)? \d\.\d|Pexels License)$/u,
      );
      expectHttpsUrl(photo.sourceUrl);
      expectHttpsUrl(photo.licenseUrl);
    }
  });
});

describe("Xiamen quiz generation", () => {
  it("creates a repeatable round with unique questions and exactly one correct option", () => {
    const idsBefore = xiamenWords.map((word) => word.id);
    const round = makeQuiz(xiamenWords, 6, () => 0.25);
    expect(round).toEqual(makeQuiz(xiamenWords, 6, () => 0.25));
    expect(round).toHaveLength(6);
    expect(new Set(round.map((question) => question.answer.id)).size).toBe(6);
    for (const question of round) {
      expect(question.options).toHaveLength(4);
      expect(new Set(question.options.map((option) => option.id)).size).toBe(4);
      expect(
        question.options.filter((option) => option.id === question.answer.id),
      ).toHaveLength(1);
      expect(
        question.options.every((option) => xiamenWords.includes(option)),
      ).toBe(true);
    }
    expect(xiamenWords.map((word) => word.id)).toEqual(idsBefore);
  });

  it("handles small, duplicate, and empty pools without unavailable or repeated options", () => {
    const [first, second] = xiamenWords;
    const reduced = [first, second, { ...first }];
    const round = makeQuiz(reduced, 6, () => 0);
    expect(round).toHaveLength(2);
    expect(new Set(round.map((question) => question.answer.id)).size).toBe(2);
    for (const question of round) {
      expect(question.options).toHaveLength(2);
      expect(new Set(question.options.map((option) => option.id)).size).toBe(2);
      expect(
        question.options.filter((option) => option.id === question.answer.id),
      ).toHaveLength(1);
    }
    expect(makeQuiz([first, first], 6, () => 0)).toEqual([
      { answer: first, options: [first] },
    ]);
    expect(makeQuiz([], 6, () => 0)).toEqual([]);
    expect(makeQuiz(xiamenWords, 0, () => 0)).toEqual([]);
  });

  it("can exclude other valid answers from a question’s distractors", () => {
    const words = xiamenWords.filter((word) =>
      ["two", "two-er", "one", "three"].includes(word.id),
    );
    const formsOfTwo = new Set(["two", "two-er"]);
    const round = makeQuiz(
      words,
      4,
      () => 0.25,
      (answer, candidate) =>
        !(formsOfTwo.has(answer.id) && formsOfTwo.has(candidate.id)),
    );
    expect(new Set(round.map((question) => question.answer.id))).toEqual(
      new Set(words.map((word) => word.id)),
    );
    for (const question of round) {
      expect(
        question.options.filter((option) => option.id === question.answer.id),
      ).toHaveLength(1);
      if (formsOfTwo.has(question.answer.id)) {
        expect(
          question.options.filter((option) => formsOfTwo.has(option.id)),
        ).toHaveLength(1);
        expect(question.options).toHaveLength(3);
      } else {
        expect(question.options).toHaveLength(4);
      }
    }
  });
});
