import {
  pitchLetters,
  romanizeXiamen,
  xiamenSpellingKey,
} from "./xiamen-romanization";

export type SpellingRule = { ipa: string; spelling: string; status: string };
export const conversionRules: SpellingRule[] = [
  ...xiamenSpellingKey,
  ...[..."adefghijklmnostuwyr"].map((ipa) => ({
    ipa,
    spelling: ipa,
    status: "Trial",
  })),
  { ipa: "̃", spelling: "̃", status: "Retained" },
  { ipa: "̩", spelling: "̩", status: "Retained" },
  { ipa: "̍", spelling: "̍", status: "Retained" },
  { ipa: "̚", spelling: "̚", status: "Retained" },
  { ipa: "ː", spelling: "ː", status: "Retained" },
].sort((a, b) => b.ipa.normalize("NFD").length - a.ipa.normalize("NFD").length);

export type ConversionSyllable = {
  ipa: string;
  spelling: string;
  tone: string;
  steps: SpellingRule[];
};

/** A bounded spelling demonstrator, not a pronunciation or sandhi generator. */
export function convertIpa(input: string): ConversionSyllable[] {
  let text = input.trim();
  if (
    (text.startsWith("[") && text.endsWith("]")) ||
    (text.startsWith("/") && text.endsWith("/"))
  )
    text = text.slice(1, -1).trim();
  if (!text)
    throw new Error("Enter IPA with a pitch contour for each syllable.");
  if (text.length > 500) throw new Error("Use up to 500 characters at a time.");
  const syllables = text.split(/[\s.]+/u);
  return syllables.map((syllable) => {
    const match = /^(.+?)([1-5]{1,3}|[˩˨˧˦˥]{1,3})$/u.exec(syllable);
    if (!match)
      throw new Error(
        `Add a pitch contour to “${syllable}”, such as te24 or te˨˦. Use spaces between syllables.`,
      );
    const tone = [...match[2]]
      .map(
        (symbol) =>
          ({ "˩": "1", "˨": "2", "˧": "3", "˦": "4", "˥": "5" })[symbol] ??
          symbol,
      )
      .join("");
    const segment = match[1].replaceAll("t͡ɕ", "tɕ");
    let rest = segment.normalize("NFD");
    const steps: SpellingRule[] = [];
    while (rest) {
      const rule = conversionRules.find((item) =>
        rest.startsWith(item.ipa.normalize("NFD")),
      );
      if (!rule)
        throw new Error(
          `No working spelling for “${[...rest][0]}”. The converter keeps unsupported sounds unresolved.`,
        );
      steps.push(rule);
      rest = rest.slice(rule.ipa.normalize("NFD").length);
    }
    return {
      ipa: segment + pitchLetters(tone),
      spelling: romanizeXiamen([segment], [tone]),
      tone,
      steps,
    };
  });
}
