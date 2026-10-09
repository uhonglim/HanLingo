import { placeLabel, placeReadingName } from "../../data/language-names";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { xiamenWords as originalWords } from "../../data/xiamen-lexicon";
import { xiamenLearningWords as xiamenWords } from "../../data/xiamen-expanded-lexicon";
import IpaGallery, {
  gallerySounds,
  galleryTones,
  splitIpaSymbols,
  wordsWithSound,
  wordsWithTone,
} from "./IpaGallery";

const originalIds = new Set(originalWords.map(word => word.id));
const oldIds = (words: typeof xiamenWords) => ids(words).filter(id => originalIds.has(id));
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
    expect(oldIds(wordsWithSound("s"))).toEqual(["three", "four"]);
    expect(oldIds(wordsWithSound("t͡s"))).toContain("water");
    expect(oldIds(wordsWithSound("t͡s"))).not.toContain("vegetables");
    expect(oldIds(wordsWithSound("t͡sʰ"))).toContain("vegetables");
    expect(oldIds(wordsWithSound("i"))).not.toContain("noodles");
    expect(oldIds(wordsWithSound("ĩ"))).toEqual(["noodles", "money"]);
    expect(oldIds(wordsWithSound("i\u0303"))).toEqual(["noodles", "money"]);
    expect(oldIds(wordsWithSound("p"))).not.toContain("ten");
    expect(oldIds(wordsWithSound("p̚"))).toEqual(["ten"]);
    expect(oldIds(wordsWithSound("ŋ"))).toEqual(["person"]);
    expect(oldIds(wordsWithSound("ŋ̍"))).toEqual(["cooked-rice", "two"]);
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

  it("retains source affricates and exposes the added Amoy tones and dated readings", () => {
    expect(splitIpaSymbols("tsʰu")).toEqual(["tsʰ", "u"]);
    expect(wordsWithSound("t͡sʰ").some(word => word.han === "鼠")).toBe(true);
    expect(wordsWithSound("s").some(word => word.han === "鼠")).toBe(false);
    for (const contour of ["55", "35", "11", "5"]) {
      expect(galleryTones).toContain(contour);
      expect(wordsWithTone(contour).length).toBeGreaterThan(0);
    }
    const html = renderToStaticMarkup(
      <MemoryRouter initialEntries={["/min/southern-min/tsuan-chiang/xiamen/sounds?sound=ẽ&tone=35"]}>
        <IpaGallery />
      </MemoryRouter>,
    );
    expect(html).toContain("Amoy · 1998 study reference");
    expect(html).toContain("Nasal close-mid front vowel");
    expect(html).toContain("Wang Kuei-lan, 2022");
    expect(html).toContain("57 sourced");
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
