import { pitchLetters, sharedSpellingRules, spellSegments, normalizeSegments } from "./xiamen-romanization";
export type { SpellingRule } from "./xiamen-romanization";
export const conversionRules = sharedSpellingRules;
export type ToneNotation = "pitch-contour" | "source-category" | "unspecified";
export type ConversionSyllable = {
  ipa: string;
  spelling: string;
  tone: string;
  steps: import("./xiamen-romanization").SpellingRule[];
};

/** Transliterate only supplied sounds; never infer a missing tone or a pronunciation. */
export function convertIpa(input: string, toneNotation: ToneNotation = "pitch-contour"): ConversionSyllable[] {
  let text = input.trim().replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]/gu, (digit) => String("⁰¹²³⁴⁵⁶⁷⁸⁹".indexOf(digit)));
  if ((text.startsWith("[") && text.endsWith("]")) || (text.startsWith("/") && text.endsWith("/")))
    text = text.slice(1, -1).trim();
  if (!text) throw new Error("Enter IPA to convert.");
  if (text.length > 500) throw new Error("Use up to 500 characters at a time.");
  return text.split(/[\s.]+/u).map((syllable) => {
    let segment = syllable;
    let tone = "";
    if (toneNotation === "pitch-contour") {
      const match = /^([^0-9˩˨˧˦˥]+)([1-5]{1,3}|[˩˨˧˦˥]{1,3})$/u.exec(syllable);
      if (!match) throw new Error(`Add a pitch contour to “${syllable}”. Use spaces between syllables, or select “Tones not supplied” for a source that omits tones.`);
      segment = match[1];
      tone = [...match[2]].map((symbol) => ({ "˩": "1", "˨": "2", "˧": "3", "˦": "4", "˥": "5" })[symbol] ?? symbol).join("");
    } else if (toneNotation === "source-category") {
      const match = /^([^0-9˩˨˧˦˥]+)([0-9]{1,2})$/u.exec(syllable);
      if (!match) throw new Error(`Keep the source’s tone-category number on “${syllable}”; categories are not pitch contours.`);
      segment = match[1];
      tone = match[2];
    } else if (/[0-9˩˨˧˦˥]/u.test(syllable)) {
      throw new Error("This input contains tone marks. Select its documented tone notation before converting.");
    }
    const result = spellSegments(segment);
    return {
      ipa: normalizeSegments(segment) + (toneNotation === "pitch-contour" ? pitchLetters(tone) : tone),
      spelling: result.spelling + (toneNotation === "source-category" ? `·T${tone}` : tone),
      tone,
      steps: result.steps,
    };
  });
}
