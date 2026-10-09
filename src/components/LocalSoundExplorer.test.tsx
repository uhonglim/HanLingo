import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import type { AttestedWord } from "../data/learning/types";
import LocalSoundExplorer, {
  localSoundSymbols,
  splitLocalIpaSymbols,
  wordsWithLocalSound,
} from "./LocalSoundExplorer";

function example(
  id: string,
  ipa: string,
  toneNotation: AttestedWord["toneNotation"] = "pitch-contour",
): AttestedWord {
  return {
    id,
    ipa,
    toneNotation,
    han: id,
    english: id,
    localityId: "xiamen",
    reading: "Test source reference",
    source: {
      title: "Source dictionary",
      url: "https://example.org/dictionary",
    },
  };
}
const words = [
  example("aspirated", "[tsʰa11]"),
  example("tied-aspirated", "[t͡sʰa˥˧]"),
  example("plain-affricate", "[t͜sa35]"),
  example("plain-s", "[sa33]"),
  example("plain-i", "[mi21]"),
  example("nasal-i", "[mi\u030333]"),
  example("syllabic-nasal", "[pŋ̍22]"),
  example("nasal-coda", "[paŋ55]"),
  example("unreleased-coda", "[ap̚3]"),
];
const ids = (matches: AttestedWord[]) => matches.map((word) => word.id);

describe("local sound matching", () => {
  it("keeps affricates and marks whole, including the untied source notation", () => {
    expect(splitLocalIpaSymbols("[tsʰit̚41]")).toEqual(["t͡sʰ", "i", "t̚"]);
    expect(splitLocalIpaSymbols("[t͜sʰiː˥˧]")).toEqual(["t͡sʰ", "iː"]);
    expect(splitLocalIpaSymbols("[tɕʰĩ35 pŋ̍22]")).toEqual([
      "t͡ɕʰ",
      "ĩ",
      "p",
      "ŋ̍",
    ]);
    expect(splitLocalIpaSymbols("[t3 s3]")).toEqual(["t", "s"]);
  });
  it("does not match a base phone inside a different marked phone", () => {
    expect(ids(wordsWithLocalSound(words, "s"))).toEqual(["plain-s"]);
    expect(ids(wordsWithLocalSound(words, "ts"))).toEqual(["plain-affricate"]);
    expect(ids(wordsWithLocalSound(words, "t͡sʰ"))).toEqual([
      "aspirated",
      "tied-aspirated",
    ]);
    expect(ids(wordsWithLocalSound(words, "ĩ"))).toEqual(["nasal-i"]);
    expect(ids(wordsWithLocalSound(words, "i\u0303"))).toEqual(["nasal-i"]);
    expect(ids(wordsWithLocalSound(words, "i"))).toEqual(["plain-i"]);
    expect(ids(wordsWithLocalSound(words, "ŋ̍"))).toEqual(["syllabic-nasal"]);
    expect(ids(wordsWithLocalSound(words, "ŋ"))).toEqual(["nasal-coda"]);
    expect(ids(wordsWithLocalSound(words, "p̚"))).toEqual(["unreleased-coda"]);
    expect(ids(wordsWithLocalSound(words, "p"))).toEqual([
      "syllabic-nasal",
      "nasal-coda",
    ]);
  });
  it("never interprets source categories or punctuation as selectable sounds", () => {
    const category = example("category", "/tsʰa⁸ mi6/", "source-category");
    expect(splitLocalIpaSymbols(category.ipa)).toEqual(["t͡sʰ", "a", "m", "i"]);
    expect(localSoundSymbols([category])).not.toContain("8");
    expect(wordsWithLocalSound(words, "53")).toEqual([]);
    expect(wordsWithLocalSound(words, "mi")).toEqual([]);
    expect(localSoundSymbols([])).toEqual([]);
  });
  it("shows only real matches, sources and a bounded title, with no fake audio", () => {
    const html = renderToStaticMarkup(<LocalSoundExplorer words={words} />);
    expect(html).toContain("Sounds in these words");
    expect(html).toContain('aria-pressed="true"');
    expect(html).toContain("2 words");
    expect(html).toContain("tied-aspirated");
    expect(html).not.toContain("plain-affricate</h3>");
    expect(html).toContain("Source dictionary");
    expect(html).toContain("IPA above, HanLingo spelling below");
    expect(html).toContain("<small>tsh</small>");
    expect(html).not.toContain("<audio");
    expect(renderToStaticMarkup(<LocalSoundExplorer words={[]} />)).toBe("");
  });
  it("spells segments with explicitly marked source categories rather than pitch graphs", () => {
    const html = renderToStaticMarkup(
      <LocalSoundExplorer
        words={[example("source-category", "[tsʰa8]", "source-category")]}
      />,
    );
    expect(html).toContain("[tsʰa8]");
    expect(html).toContain("IPA · source tone categories");
    expect(html).toContain("HanLingo spelling · source tone categories");
    expect(html).toContain("tsha·T8");
    expect(html).not.toContain("Pitch contour");
  });
});
