// Shared working key. New extensions remain Trial; source IPA is never replaced.
export type SpellingRule = { ipa: string; spelling: string; status: string };
export const xiamenSpellingKey: SpellingRule[] = [
  { ipa: "t͡sʰ", spelling: "tsh", status: "Agreed" },
  { ipa: "t͡s", spelling: "ts", status: "Agreed" },
  { ipa: "tɕʰ", spelling: "chh", status: "Agreed" },
  { ipa: "tɕ", spelling: "ch", status: "Agreed" },
  { ipa: "pʰ", spelling: "ph", status: "Agreed" },
  { ipa: "p", spelling: "p", status: "Agreed" },
  { ipa: "b", spelling: "b", status: "Agreed" },
  ...[
    ["tʰ", "th"], ["kʰ", "kh"], ["ŋ̍", "ng̍"], ["ŋ̩", "ng̍"],
    ["ŋ", "ng"], ["ɡ", "g"], ["ɐ", "ă"], ["ɔ", "oo"],
    ["ɤ", "oe"], ["ə", "er"], ["ɛ", "ae"], ["ʔ", "q"],
  ].map(([ipa, spelling]) => ({ ipa, spelling, status: "Trial" })),
];

// Each additional source sound gets its own value. Digraphs do not imply length.
// ȵ, ɿ and ʮ are retained as distinct Sinological source conventions.
export const sharedSpellingExtensions: SpellingRule[] = [
  ["ɕ", "sh"], ["ʑ", "zh"], ["ʃ", "š"], ["ʒ", "ž"],
  ["tʃʰ", "tšh"], ["tʃ", "tš"], ["dʒ", "dž"], ["dʑ", "jh"],
  ["tʂʰ", "tsrh"], ["tʂ", "tsr"], ["ʂ", "sr"], ["ʐ", "zr"],
  ["dz", "dz"], ["pfʰ", "pfh"], ["pf", "pf"],
  ["kʷʰ", "kwh"], ["kʰʷ", "kwh"], ["kʷ", "kw"],
  ["ɲ", "ny"], ["ȵ", "nj"], ["ɦ", "hh"], ["ɬ", "hl"],
  ["ɸ", "ff"], ["β", "vv"], ["ɓ", "ḅ"], ["ɗ", "ḍ"],
  ["ɑ", "aa"], ["ɒ", "ao"], ["æ", "ea"], ["ɪ", "ĭ"],
  ["ʊ", "ŭ"], ["ʏ", "ÿ"], ["ø", "ö"], ["œ", "eu"],
  ["ɯ", "uu"], ["ɜ", "ê"], ["ɨ", "ï"], ["ɿ", "ir"], ["ʮ", "yr"],
].map(([ipa, spelling]) => ({ ipa, spelling, status: "Trial" }));

export const sharedSpellingRules: SpellingRule[] = [
  ...xiamenSpellingKey,
  ...sharedSpellingExtensions,
  ...[..."adefghijklmnostuvwxyzr"].map((ipa) => ({ ipa, spelling: ipa, status: "Trial" })),
  ...["̃", "̩", "̍", "̚", "ː", "̤", "̰", "̥", "̬"].map((ipa) => ({ ipa, spelling: ipa, status: "Retained" })),
].sort((a, b) => b.ipa.normalize("NFD").length - a.ipa.normalize("NFD").length);

/** Normalize equivalent tie-bar spellings, not different places of articulation. */
export function normalizeSegments(input: string): string {
  return input.replace(/t[͜͡]?s/gu, "t͡s")
    .replace(/([td])[͜͡]([ɕʑʃʒʂz])/gu, "$1$2")
    .replace(/p[͜͡]f/gu, "pf");
}

export function spellSegments(segment: string) {
  let rest = normalizeSegments(segment).normalize("NFD");
  const steps: SpellingRule[] = [];
  if (!rest) throw new Error("Enter an IPA segment.");
  while (rest) {
    const rule = sharedSpellingRules.find((item) => rest.startsWith(item.ipa.normalize("NFD")));
    if (!rule) throw new Error(`No working spelling for “${[...rest][0]}”. The converter keeps unsupported sounds unresolved.`);
    if (!steps.length && rule.status === "Retained")
      throw new Error("A phonetic mark needs a preceding IPA segment.");
    steps.push(rule);
    rest = rest.slice(rule.ipa.normalize("NFD").length);
  }
  return { spelling: steps.map((step) => step.spelling).join("").normalize("NFC"), steps };
}

/** Legacy lesson entry point, backed by the same key as every other variety. */
export function romanizeXiamen(segments: string[], tones: string[]): string {
  if (segments.length !== tones.length || !segments.length)
    throw new Error("Each syllable requires an explicit tone contour.");
  return segments.map((segment, i) => {
    if (!/^[1-5]{1,3}$/.test(tones[i])) throw new Error("Invalid pitch contour.");
    return spellSegments(segment).spelling + tones[i];
  }).join(" ");
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
