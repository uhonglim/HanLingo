import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import LocalToneExplorer, {
  attestedContours,
  wordsWithContour,
} from "./LocalToneExplorer";
import type { AttestedWord } from "../data/learning/types";
const word = (
  id: string,
  ipa: string,
  toneNotation: AttestedWord["toneNotation"],
): AttestedWord => ({
  id,
  ipa,
  toneNotation,
  han: id,
  english: id,
  localityId: "fuzhou",
  reading: "Citation reading",
  source: { title: "Dictionary", url: "https://example.org" },
});
describe("evidence-scoped tone gallery", () => {
  it("never turns categories or omitted tones into pitch contours", () => {
    const words = [
      word("pitch", "[ta˥˧]", "pitch-contour"),
      word("digits", "[mi53]", "pitch-contour"),
      word("category", "[ta53]", "source-category"),
      word("unlabelled", "[ta53]", "unspecified"),
    ];
    expect(attestedContours(words)).toEqual(["53"]);
    expect(wordsWithContour(words, "53").map((item) => item.id)).toEqual([
      "pitch",
      "digits",
    ]);
    expect(wordsWithContour(words, "3")).toEqual([]);
    expect(
      renderToStaticMarkup(<LocalToneExplorer words={words.slice(2)} />),
    ).toBe("");
  });
});
