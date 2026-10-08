import { describe, expect, it } from "vitest";
import { convertIpa } from "./romanization-method";
import { xiamenWords } from "./xiamen-lexicon";
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
    for (const input of ["", "te", "[ɕi35]", "te6", "te2345", "茶24"])
      expect(() => convertIpa(input), input).toThrow();
  });
});
