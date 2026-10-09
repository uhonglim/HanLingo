import { describe, expect, it } from "vitest";
import { convertIpa } from "./romanization-method";
import { xiamenWords } from "./xiamen-lexicon";
import { mapPoints } from "./languages";
import { getLocalLearning, spellingFor } from "./learning";
import { romanizeXiamen } from "./xiamen-romanization";

describe("public IPA spelling demonstrator", () => {
  it("matches the lesson converter for every published word and accounts for each sound", () => {
    for (const word of xiamenWords) {
      const syllables = convertIpa(word.ipa);
      expect(syllables.map((s) => s.spelling).join(" "), word.id).toBe(
        romanizeXiamen(word.segments, word.tones),
      );
      for (const syllable of syllables)
        expect(
          syllable.steps
            .map((step) => step.spelling)
            .join("")
            .normalize("NFC") + syllable.tone,
        ).toBe(syllable.spelling);
    }
  });
  it("handles both tone notations, canonical Unicode, and tied palatal affricates", () => {
    expect(convertIpa("[t͡sʰa˨˩]")[0].spelling).toBe("tsha21");
    expect(convertIpa("[tsʰa11]")[0].spelling).toBe("tsha11");
    expect(convertIpa("[tsʰa¹¹]")[0].spelling).toBe("tsha11");
    expect(convertIpa("/t͡ɕʰi35/")[0].spelling).toBe("chhi35");
    expect(convertIpa("mi\u030322")[0].spelling).toBe("mĩ22");
    expect(convertIpa("pŋ̩22")[0].spelling).toBe("png̍22");
    expect(
      convertIpa("kɐn22")[0].steps.find((step) => step.ipa === "ɐ")?.status,
    ).toBe("Trial");
  });
  it("rejects missing tones and unsupported IPA instead of guessing", () => {
    for (const input of ["", "te", "[ʙi35]", "te6", "te2345", "茶24", "ː35", "̃a35"])
      expect(() => convertIpa(input), input).toThrow();
  });
});


describe("shared spelling coverage and evidence boundaries", () => {
  it("spells every published IPA reading without adding missing tones", () => {
    for (const point of mapPoints) for (const word of getLocalLearning(point).words) {
      const spelling = spellingFor(word);
      expect(spelling, `${point.id}: ${word.id} ${word.ipa}`).toBeTruthy();
      if (word.toneNotation === "unspecified") {
        expect(spelling).not.toMatch(/[0-9]/u);
        expect(convertIpa(word.ipa, "unspecified").every((syllable) => syllable.tone === "")).toBe(true);
      }
    }
  });
  it("preserves vowel quality, nasalization, length and distinct consonants", () => {
    const spell = (ipa: string) => convertIpa(ipa)[0].spelling;
    expect(spell("sɐm55")).toBe("săm55");
    expect(spell("sam55")).toBe("sam55");
    expect(spell("sãm55")).toBe("sãm55");
    expect(spell("sɑːm55")).toBe("saaːm55");
    expect(new Set(["s", "ɕ", "ʃ", "ʂ", "ɬ"].map((sound) => spell(sound + "a35"))).size).toBe(5);
    expect(new Set(["t͡s", "tɕ", "tʃ", "tʂ"].map((sound) => spell(sound + "a35"))).size).toBe(4);
    expect(spell("kʷʰa55")).toBe("kwha55");
    expect(spell("ɓe34")).toBe("ḅe34");
    expect(spell("be34")).toBe("be34");
    expect(spell("ɦoŋ13")).toBe("hhong13");
    expect(spell("ȵy213")).toBe("njy213");
  });
  it("does not turn tone categories or missing tones into pitch", () => {
    expect(convertIpa("[pat⁶]", "source-category")[0]).toMatchObject({spelling: "pat·T6", tone: "6", ipa: "pat6"});
    expect(convertIpa("[pat]", "unspecified")[0]).toMatchObject({spelling: "pat", tone: "", ipa: "pat"});
    expect(() => convertIpa("pat6")).toThrow();
    expect(() => convertIpa("pat6", "unspecified")).toThrow();
    expect(() => convertIpa("pat˦", "source-category")).toThrow();
    expect(() => convertIpa("pat", "source-category")).toThrow();
    expect(() => convertIpa("̃", "unspecified")).toThrow();
  });
});
