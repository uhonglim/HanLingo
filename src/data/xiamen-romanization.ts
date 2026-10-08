// Draft extensions are exposed to readers in the Xiamen spelling key.
// Longest matches first: no spelling silently borrows Pinyin/POJ sound values.
export const xiamenSpellingKey = [
  { ipa: "t͡sʰ", spelling: "tsh", status: "Agreed" },
  { ipa: "t͡s", spelling: "ts", status: "Agreed" },
  { ipa: "tɕʰ", spelling: "chh", status: "Agreed" },
  { ipa: "tɕ", spelling: "ch", status: "Agreed" },
  { ipa: "pʰ", spelling: "ph", status: "Agreed" },
  { ipa: "p", spelling: "p", status: "Agreed" },
  { ipa: "b", spelling: "b", status: "Agreed" },
  { ipa: "tʰ", spelling: "th", status: "Trial" },
  { ipa: "kʰ", spelling: "kh", status: "Trial" },
  { ipa: "ŋ̍", spelling: "ng̍", status: "Trial" },
  { ipa: "ŋ̩", spelling: "ng̍", status: "Trial" },
  { ipa: "ŋ", spelling: "ng", status: "Trial" },
  { ipa: "ɡ", spelling: "g", status: "Trial" },
  { ipa: "ɐ", spelling: "â", status: "Trial" },
  { ipa: "ɔ", spelling: "oo", status: "Trial" },
  { ipa: "ɤ", spelling: "oe", status: "Trial" },
  { ipa: "ə", spelling: "er", status: "Trial" },
  { ipa: "ɛ", spelling: "ae", status: "Trial" },
  { ipa: "ʔ", spelling: "q", status: "Trial" },
];

/** Retains nasalization, syllabicity, and unreleased-stop marks from the source. */
export function romanizeXiamen(segments: string[], tones: string[]): string {
  if (segments.length !== tones.length || !segments.length)
    throw new Error("Each syllable requires an explicit tone contour.");
  return segments
    .map((segment, i) => {
      let input = segment.normalize("NFD");
      let output = "";
      while (input) {
        const rule = xiamenSpellingKey.find((item) =>
          input.startsWith(item.ipa.normalize("NFD")),
        );
        if (rule) {
          output += rule.spelling;
          input = input.slice(rule.ipa.normalize("NFD").length);
        } else {
          const symbol = [...input][0];
          if (!/[abdefghijklmnoprstuwyɐ\u0300-\u036fː]/u.test(symbol))
            throw new Error(`Unmapped Xiamen IPA symbol: ${symbol}`);
          output += symbol === "ɐ" ? "â" : symbol;
          input = input.slice(symbol.length);
        }
      }
      if (!/^[1-5]{1,3}$/.test(tones[i]))
        throw new Error("Invalid pitch contour.");
      return output.normalize("NFC") + tones[i];
    })
    .join(" ");
}

export function pitchLetters(contour: string): string {
  return [...contour]
    .map(
      (digit) =>
        ({ "1": "˩", "2": "˨", "3": "˧", "4": "˦", "5": "˥" })[digit] ?? "",
    )
    .join("");
}

export function makeQuiz<T extends { id: string }>(
  pool: T[],
  limit = 6,
  random = Math.random,
  canDistract: (answer: T, candidate: T) => boolean = () => true,
) {
  const shuffle = (items: T[]) => {
    const result = [...items];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  };
  const unique = [...new Map(pool.map((item) => [item.id, item])).values()];
  return shuffle(unique)
    .slice(0, limit)
    .map((answer) => ({
      answer,
      options: shuffle([
        answer,
        ...shuffle(
          unique.filter(
            (item) => item.id !== answer.id && canDistract(answer, item),
          ),
        ).slice(0, 3),
      ]),
    }));
}
