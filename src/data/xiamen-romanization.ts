// One global reading key. Shared spellings simplify writing; source IPA stays exact.
export type SpellingRule = { ipa: string; spelling: string; status: string; note?: string };
const rules = (pairs: string[][], status = "Core", note?: string): SpellingRule[] =>
  pairs.map(([ipa, spelling]) => ({ ipa, spelling, status, ...(note ? { note } : {}) }));

export const xiamenSpellingKey: SpellingRule[] = rules([
  ["t͡sʰ", "tsh"], ["t͡s", "ts"], ["pʰ", "ph"], ["p", "p"], ["b", "b"],
  ["tʰ", "th"], ["kʰ", "kh"], ["ŋ", "ng"], ["ɡ", "g"],
  ["ɐ", "ă"], ["ɔ", "oo"], ["ɤ", "eu"], ["ɛ", "ae"], ["ʔ", "q"],
]);

export const sharedSpellingExtensions: SpellingRule[] = [
  ...rules([["h", "h"], ["x", "h"], ["χ", "h"]], "Shared", "The h family shares a spelling; IPA preserves the place of friction."),
  ...rules([["ɕ", "sh"], ["ʃ", "sh"], ["ʑ", "zh"], ["ʒ", "zh"],
    ["tɕ", "ch"], ["tʃ", "ch"], ["tɕʰ", "chh"], ["tʃʰ", "chh"],
    ["dʑ", "j"], ["dʒ", "j"]], "Shared", "Palatal and postalveolar sounds share a reading spelling; retroflex sounds stay separate."),
  ...rules([["ɲ", "ny"], ["ȵ", "ny"]], "Shared", "These nasal transcriptions share a spelling, not a claim of identical articulation."),
  ...rules([["a", "a"], ["ɑ", "a"], ["i", "i"], ["ɪ", "i"],
    ["u", "u"], ["ʊ", "u"], ["y", "yu"], ["ʏ", "yu"],
    ["ø", "oe"], ["œ", "oe"], ["ə", "eo"], ["ɜ", "eo"]],
    "Shared", "A vowel family shares its reading spelling. Consult IPA for the exact vowel quality."),
  ...rules([["tʂʰ", "tsrh"], ["tʂ", "tsr"], ["ʂ", "sr"], ["ʐ", "zr"],
    ["dz", "dz"], ["pfʰ", "pfh"], ["pf", "pf"],
    ["kʷʰ", "kwh"], ["kʰʷ", "kwh"], ["kʷ", "kw"],
    ["ɦ", "hh"], ["ɣ", "gh"], ["ɬ", "hl"], ["ɸ", "ff"], ["β", "vv"],
    ["ɓ", "ḅ"], ["ɗ", "ḍ"], ["ɒ", "ao"], ["æ", "ea"], ["ɯ", "uu"],
    ["ɨ", "ii"], ["ɿ", "ir"], ["ʮ", "yr"], ["j", "y"], ["ɥ", "yw"],
    ["i̯", "y"], ["u̯", "w"], ["y̯", "yw"]]),
];

export const sharedSpellingRules: SpellingRule[] = [
  ...xiamenSpellingKey,
  ...sharedSpellingExtensions,
  ...rules([..."defgklmnostvwzr"].map(ipa => [ipa, ipa])),
  ...rules([["̃", "~"], ["ː", ":"]], "Core", "Nasalization and supplied length use keyboard punctuation, independently of tone."),
  ...rules([["̩", ""], ["̍", ""], ["̚", ""]], "Detail", "This detail remains in IPA and is omitted from the reading spelling."),
  ...rules(["̤", "̰", "̥", "̬"].map(ipa => [ipa, ipa]), "Retained", "Supplied phonation and voicing marks remain visible."),
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
    if (!steps.length && (/^\p{M}/u.test(rule.ipa) || rule.ipa === "ː"))
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
