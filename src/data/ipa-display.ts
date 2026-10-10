const pitchDigits: Record<string, string> = {
  "˩": "1",
  "˨": "2",
  "˧": "3",
  "˦": "4",
  "˥": "5",
  "¹": "1",
  "²": "2",
  "³": "3",
  "⁴": "4",
  "⁵": "5",
};
const pitchLetters: Record<string, string> = {
  "1": "˩",
  "2": "˨",
  "3": "˧",
  "4": "˦",
  "5": "˥",
};

/** Call only for source readings explicitly identified as pitch contours. */
export function pitchContours(ipa: string): string[] {
  return (ipa.match(/[˩˨˧˦˥]+|[¹²³⁴⁵]+|[1-5]+/gu) ?? []).map((part) =>
    [...part].map((value) => pitchDigits[value] ?? value).join(""),
  );
}

/** Formatting is lossless for attested contours; category digits stay untouched. */
export function displayIpa(ipa: string, toneNotation?: string): string {
  if (toneNotation !== "pitch-contour") return ipa;
  return ipa.replace(
    /[1-5¹²³⁴⁵]/gu,
    (digit) => pitchLetters[pitchDigits[digit] ?? digit],
  );
}

/** Search both the source form and the exact phonetic text readers can copy. */
export function ipaSearchForms(ipa: string, toneNotation?: string): string[] {
  return [...new Set([ipa, displayIpa(ipa, toneNotation)])];
}
