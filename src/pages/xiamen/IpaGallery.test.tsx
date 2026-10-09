import { placeLabel, placeReadingName } from "../../data/language-names";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { xiamenWords } from "../../data/xiamen-lexicon";
import IpaGallery, {
  gallerySounds,
  splitIpaSymbols,
  wordsWithSound,
  wordsWithTone,
} from "./IpaGallery";

const ids = (words: typeof xiamenWords) => words.map((word) => word.id);

describe("Xiamen IPA gallery matching", () => {
  it("preserves affricates, aspiration, nasalization and unreleased or syllabic marks", () => {
    expect(splitIpaSymbols("t͡sʰit̚")).toEqual(["t͡sʰ", "i", "t̚"]);
    expect(splitIpaSymbols("mĩ")).toEqual(["m", "ĩ"]);
    expect(splitIpaSymbols("mi\u0303")).toEqual(["m", "ĩ"]);
    expect(splitIpaSymbols("pŋ̍")).toEqual(["p", "ŋ̍"]);
    for (const word of xiamenWords) {
      for (const syllable of word.segments) {
        expect(splitIpaSymbols(syllable).join(""), word.id).toBe(
          syllable.normalize("NFC"),
        );
      }
    }
  });

  it("does not confuse a base consonant or vowel with a distinct marked sound", () => {
    expect(ids(wordsWithSound("s"))).toEqual(["three", "four"]);
    expect(ids(wordsWithSound("t͡s"))).toContain("water");
    expect(ids(wordsWithSound("t͡s"))).not.toContain("vegetables");
    expect(ids(wordsWithSound("t͡sʰ"))).toContain("vegetables");
    expect(ids(wordsWithSound("i"))).not.toContain("noodles");
    expect(ids(wordsWithSound("ĩ"))).toEqual(["noodles", "money"]);
    expect(ids(wordsWithSound("i\u0303"))).toEqual(["noodles", "money"]);
    expect(ids(wordsWithSound("p"))).not.toContain("ten");
    expect(ids(wordsWithSound("p̚"))).toEqual(["ten"]);
    expect(ids(wordsWithSound("ŋ"))).toEqual(["person"]);
    expect(ids(wordsWithSound("ŋ̍"))).toEqual(["cooked-rice", "two"]);
  });

  it("includes only attested symbols and lets every published word be found", () => {
    expect(gallerySounds).not.toContain("pʰ");
    expect(gallerySounds).not.toContain("ə");
    const found = new Set(
      gallerySounds.flatMap((sound) => ids(wordsWithSound(sound))),
    );
    expect(found).toEqual(new Set(xiamenWords.map((word) => word.id)));
    for (const sound of gallerySounds)
      expect(wordsWithSound(sound).length).toBeGreaterThan(0);
  });

  it("matches the displayed connected tone rather than an underlying dictionary annotation", () => {
    expect(ids(wordsWithTone("53"))).toContain("good");
    expect(ids(wordsWithTone("53"))).not.toContain("tasty");
    expect(ids(wordsWithTone("44"))).toContain("tasty");
    expect(ids(wordsWithTone("4"))).toContain("tasty");
    expect(ids(wordsWithTone("22"))).toContain("airplane");
    expect(ids(wordsWithTone("44"))).toContain("airplane");
  });

  it("opens a shared sound and tone selection with real source links", () => {
    const query = new URLSearchParams({ sound: "ĩ", tone: "32" });
    const html = renderToStaticMarkup(
      <MemoryRouter
        initialEntries={[`/min/southern-min/xiamen/sounds?${query}`]}
      >
        <IpaGallery />
      </MemoryRouter>,
    );
    const heading = html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/)?.[1];
    expect(heading).toBeDefined();
    const headingText = heading!.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    const amoy = { id: 'xiamen', name: 'Amoy' };
    expect(headingText).toBe(`${placeLabel(amoy)} ${placeReadingName(amoy)} sounds`);
    expect(html).not.toContain("IPA gallery");
    expect(html).toContain("HanLingo spelling");
    expect(html).toContain("Nasal close front vowel");
    expect(html).toContain("Short falling");
    expect(html).toContain("Wiktionary contributors");
    expect(html).toContain("oldid=93448520");
    expect(html).toContain("Ge &amp; Mok (2024)");
    expect(html).not.toContain("<audio");
  });

  it("recovers invalid URL selections without an empty or fabricated sound entry", () => {
    const html = renderToStaticMarkup(
      <MemoryRouter
        initialEntries={[
          "/min/southern-min/xiamen/sounds?sound=invalid&tone=99",
        ]}
      >
        <IpaGallery />
      </MemoryRouter>,
    );
    expect(html).toContain("Voiceless alveolar affricate");
    expect(html).toContain("Low to high");
    expect(html).not.toContain("[invalid]");
  });
});
