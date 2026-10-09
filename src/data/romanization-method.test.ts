import { describe, expect, it } from "vitest";
import { convertIpa } from "./romanization-method";
import { xiamenWords } from "./xiamen-lexicon";
import { mapPoints } from "./languages";
import { getLocalLearning, spellingFor, searchWords } from "./learning";
import { romanizeXiamen, sharedSpellingRules } from "./xiamen-romanization";

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
    expect(convertIpa("mi\u030322")[0].spelling).toBe("mi~22");
    expect(convertIpa("pŋ̩22")[0].spelling).toBe("png22");
    expect(
      convertIpa("kɐn22")[0].steps.find((step) => step.ipa === "ɐ")?.status,
    ).toBe("Core");
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
  it("preserves selected vowel contrasts, nasalization, length and core consonants", () => {
    const spell = (ipa: string) => convertIpa(ipa)[0].spelling;
    expect(spell("sɐm55")).toBe("săm55");
    expect(spell("sam55")).toBe("sam55");
    expect(spell("sãm55")).toBe("sa~m55");
    expect(spell("sɑːm55")).toBe("sa:m55");
    expect(new Set(["s", "ɕ", "ʃ", "ʂ", "ɬ"].map((sound) => spell(sound + "a35"))).size).toBe(3);
    expect(new Set(["t͡s", "tɕ", "tʃ", "tʂ"].map((sound) => spell(sound + "a35"))).size).toBe(2);
    expect(spell("kʷʰa55")).toBe("kwha55");
    expect(spell("ɓe34")).toBe("ḅe34");
    expect(spell("be34")).toBe("be34");
    expect(spell("ɦoŋ13")).toBe("hhong13");
    expect(spell("ȵy213")).toBe("nyü213");
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


describe("reading spelling v3", () => {
  const spell = (ipa: string) => convertIpa(ipa)[0];
  it("declares many-to-one families without changing the IPA or its tones", () => {
    for (const family of [["h", "x", "χ"], ["ɕ", "ʃ", "ʂ"], ["tɕ", "tʃ", "tʂ"], ["ʑ", "ʒ", "ʐ"], ["dʑ", "dʒ", "dʐ"], ["r", "ɹ", "ɻ"], ["ɲ", "ȵ"], ["a", "ɑ"], ["i", "ɪ"], ["u", "ʊ"], ["y", "ʏ"], ["ø", "œ"], ["ə", "ɘ", "ɜ"]]) {
      const results = family.map(sound => spell(sound + "35"));
      expect(new Set(results.map(s=>s.spelling)).size, family.join("/")).toBe(1);
      expect(new Set(results.map(s=>s.ipa)).size).toBe(family.length);
      expect(results.every(s=>s.tone === "35")).toBe(true);
    }
    expect(spell("xuei5").spelling).toBe("huei5");
    expect(spell("xwei5").spelling).toBe("hwei5");
    expect(spell("xu̯ei5").spelling).toBe("hwei5");
    expect(spell("ja5").spelling).toBe("ya5");
    expect(spell("dʑa5").spelling).toBe("ja5");
    expect(spell("tʃʰa5").spelling).toBe("chha5");
    expect(spell("tʂʰa5").spelling).toBe("chha5");
    expect(spell("d͡ʐa5").spelling).toBe("ja5");
    expect(spell("ʂa5").spelling).toBe("sha5");
    expect(spell("ɻa5").spelling).toBe("ra5");
    expect(spell("ʐa5").spelling).toBe("zha5");
  });
  it("separates the rounded vowel from y plus u without changing tone or marks", () => {
    expect(spell("y35").spelling).toBe("ü35");
    expect(spell("ʏ35").spelling).toBe("ü35");
    expect(spell("ju35").spelling).toBe("yu35");
    expect(spell("jy35").spelling).toBe("yü35");
    expect(spell("yː35").spelling).toBe("ü:35");
    expect(spell("ỹ35").spelling).toBe("ü~35");
    expect(spell("ɥe35").spelling).toBe("ywe35");
    expect(spell("y̯e35").spelling).toBe("ywe35");
    expect(convertIpa("y6", "source-category")[0].spelling).toBe("ü·T6");
    expect(convertIpa("y", "unspecified")[0].spelling).toBe("ü");
    expect(new Set(["y35", "ju35", "u35"].map(ipa => spell(ipa).spelling)).size).toBe(3);
  });
  it("keeps both sourced words searchable when their reading spellings coincide", () => {
    const words = getLocalLearning(mapPoints.find(p=>p.id === "suzhou")!).words;
    const matches = searchWords(words, "i44");
    for (const [han, ipa] of [["衣", "[i44]"], ["煙", "[ɪ44]"]]) {
      const word = matches.find(w=>w.han === han);
      expect(word?.ipa).toBe(ipa);
      expect(spellingFor(word!)).toBe("i44");
    }
  });
  it("uses one key with no conflicting Unicode-normalized assignments", () => {
    const keys = sharedSpellingRules.map(r=>r.ipa.normalize("NFD"));
    expect(new Set(keys).size).toBe(keys.length);
  });
  it("keeps detailed marks in IPA while making selected marks easier to type", () => {
    expect(spell("pŋ̍22")).toMatchObject({ipa:"pŋ̍˨˨", spelling:"png22"});
    expect(spell("pat̚4")).toMatchObject({ipa:"pat̚˦", spelling:"pat4"});
    expect(spell("paʔ4").spelling).toBe("paq4");
    expect(spell("mĩː22").spelling).toBe("mi~:22");
    expect(spell("a̤35").spelling).toBe("a̤35");
    expect(spell("a̰35").spelling).toBe("a̰35");
    expect(spell("m̥a35").spelling).toBe("m̥a35");
    for (const input of ["̩35", "̚35", "ː35", "̃a35"]) expect(()=>spell(input)).toThrow();
    for (const family of [["pa", "pʰa", "ba"], ["ta", "tʰa", "da"], ["ka", "kʰa", "ɡa"], ["sa", "ʂa", "za"], ["e", "ɛ"], ["o", "ɔ"], ["a", "ɐ"], ["u", "y"]]) {
      expect(new Set(family.map(s=>spell(s+"35").spelling)).size).toBe(family.length);
    }
  });
});
