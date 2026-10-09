export type XiamenWordCategory =
  "Food & drink" | "People & actions" | "Around town" | "Numbers";

export type XiamenWord = {
  id: string;
  han: string;
  english: string;
  ipa: string;
  segments: string[];
  tones: string[];
  category: XiamenWordCategory;
  note: string;
  sourceUrl: string;
  sourceLabel: string;
  sourceReading: string;
  readingMode: "Citation" | "Connected speech";
  registerLabel?: string;
};

const superscriptDigits: Record<string, string> = {
  "¹": "1",
  "²": "2",
  "³": "3",
  "⁴": "4",
  "⁵": "5",
};
const toneLetters: Record<string, string> = {
  "1": "˩",
  "2": "˨",
  "3": "˧",
  "4": "˦",
  "5": "˥",
};

/** Format an attested source reading; this applies no inferred sandhi rules. */
function word(
  id: string,
  han: string,
  english: string,
  sourceReading: string,
  category: XiamenWordCategory,
  note: string,
  revision: number,
  readingMode: XiamenWord["readingMode"] = "Citation",
): XiamenWord {
  const syllables = sourceReading
    .slice(1, -1)
    .split(" ")
    .map((syllable) => {
      const match = /^(.+?)([¹²³⁴⁵]+)(?:⁻([¹²³⁴⁵]+))?$/.exec(syllable);
      if (!match)
        throw new Error(`Invalid source reading for ${id}: ${syllable}`);
      // In a source annotation such as ⁵³⁻⁴⁴, the right side is the attested surface tone.
      const contour = match[3] ?? match[2];
      return {
        segment: match[1],
        tone: [...contour].map((digit) => superscriptDigits[digit]).join(""),
      };
    });
  const segments = syllables.map((syllable) => syllable.segment);
  const tones = syllables.map((syllable) => syllable.tone);
  const ipa = `[${syllables.map(({ segment, tone }) => `${segment}${[...tone].map((digit) => toneLetters[digit]).join("")}`).join(" ")}]`;
  return {
    id,
    han,
    english,
    ipa,
    segments,
    tones,
    category,
    note,
    sourceUrl: `https://en.wiktionary.org/w/index.php?title=${encodeURIComponent(han)}&oldid=${revision}#Chinese`,
    sourceLabel: `Wiktionary contributors · ${han} · Xiamen Sinological IPA`,
    sourceReading,
    readingMode,
  };
}

// Verified 2026-10-09 against the explicitly Xiamen-labeled pronunciation blocks.
// These broad dictionary readings are not narrow transcriptions of recorded speakers.
// The tone inventory and source-selection method are documented in
// docs/XIAMEN-LANGUAGE-SOURCES.md. Dictionary attribution is retained per entry.
export const xiamenWords: XiamenWord[] = [
  word(
    "tea",
    "茶",
    "tea",
    "/te²⁴/",
    "Food & drink",
    "The everyday reading; the source also lists separate literary readings.",
    92201515,
  ),
  word(
    "water",
    "水",
    "water",
    "/t͡sui⁵³/",
    "Food & drink",
    "A falling citation tone. Keep the opening affricate distinct from plain [s].",
    93428753,
  ),
  word(
    "cooked-rice",
    "飯",
    "cooked rice; a meal",
    "/pŋ̍²²/",
    "Food & drink",
    "The nasal [ŋ̍] carries the syllable. Compare 米 for uncooked rice.",
    92731972,
  ),
  word(
    "uncooked-rice",
    "米",
    "uncooked rice",
    "/bi⁵³/",
    "Food & drink",
    "Rice as grain, distinguished here from cooked 飯.",
    92748693,
  ),
  word(
    "noodles",
    "麵",
    "noodles",
    "/mĩ²²/",
    "Food & drink",
    "The everyday reading has a nasal vowel, shown by the tilde in [ĩ].",
    93448520,
  ),
  word(
    "fish",
    "魚",
    "fish",
    "/hi²⁴/",
    "Food & drink",
    "The selected urban Xiamen reading; the source also records suburban [hu˨˦].",
    92751309,
  ),
  word(
    "meat",
    "肉",
    "meat",
    "/baʔ³²/",
    "Food & drink",
    "Ends with a glottal stop [ʔ]. This is the source’s everyday meat reading.",
    93434345,
  ),
  word(
    "vegetables",
    "菜",
    "vegetables; a dish",
    "/t͡sʰai²¹/",
    "Food & drink",
    "The opening affricate is aspirated: [t͡sʰ].",
    93396748,
  ),
  word(
    "drink",
    "啉",
    "to drink",
    "/lim⁴⁴/",
    "Food & drink",
    "An everyday verb, shown here with its isolated citation tone.",
    93447529,
  ),
  word(
    "tasty",
    "好食",
    "tasty; delicious",
    "/ho⁵³⁻⁴⁴ t͡siaʔ⁴/",
    "Food & drink",
    "The source explicitly marks 好 changing from 53 to 44 in this word.",
    91359902,
    "Connected speech",
  ),

  word(
    "eat",
    "食",
    "to eat",
    "/t͡siaʔ⁴/",
    "People & actions",
    "The eating sense has this reading; other senses of 食 have other readings.",
    92983648,
  ),
  word(
    "good",
    "好",
    "good",
    "/ho⁵³/",
    "People & actions",
    "Compare the changed first-syllable tone in 好食, “tasty”.",
    93448473,
  ),
  word(
    "person",
    "人",
    "person",
    "/laŋ²⁴/",
    "People & actions",
    "The everyday person reading; the source lists other readings for other uses.",
    92701645,
  ),
  word(
    "i",
    "我",
    "I; me",
    "/ɡua⁵³/",
    "People & actions",
    "The selected everyday reading begins with voiced [ɡ].",
    93364379,
  ),
  word(
    "you",
    "你",
    "you",
    "/li⁵³/",
    "People & actions",
    "The dictionary also identifies this character as a common substitute for 汝.",
    93174696,
  ),
  word(
    "come",
    "來",
    "to come",
    "/lai²⁴/",
    "People & actions",
    "A rising citation tone; a full phrase may have different tone grouping.",
    92199905,
  ),
  word(
    "go",
    "去",
    "to go",
    "/kʰi²¹/",
    "People & actions",
    "The selected urban reading has [i]; suburban Xiamen [u] is also documented.",
    93405579,
  ),
  word(
    "buy",
    "買",
    "to buy",
    "/bue⁵³/",
    "People & actions",
    "The everyday reading begins with voiced [b], distinct from [p] and [pʰ].",
    92201824,
  ),

  word(
    "sea",
    "海",
    "sea",
    "/hai⁵³/",
    "Around town",
    "Shown as a single word; no surrounding phrase is implied.",
    93388184,
  ),
  word(
    "boat",
    "船",
    "boat; ship",
    "/t͡sun²⁴/",
    "Around town",
    "The everyday reading, distinct from the source’s literary reading.",
    92703852,
  ),
  word(
    "house",
    "厝",
    "house; home",
    "/t͡sʰu²¹/",
    "Around town",
    "A local word for a house or home, with an aspirated initial.",
    93416182,
  ),
  word(
    "street",
    "街",
    "street",
    "/kue⁴⁴/",
    "Around town",
    "The selected Xiamen everyday reading; nearby varieties need their own labels.",
    91428245,
  ),
  word(
    "money",
    "錢",
    "money",
    "/t͡sĩ²⁴/",
    "Around town",
    "The everyday reading has a nasal vowel [ĩ].",
    93436989,
  ),
  word(
    "airplane",
    "飛機",
    "airplane",
    "/hui⁴⁴⁻²² ki⁴⁴/",
    "Around town",
    "The first tone changes from 44 to 22; Ge and Mok (2024) give the same example.",
    89965738,
    "Connected speech",
  ),

  word(
    "one",
    "一",
    "one",
    "/t͡sit̚⁴/",
    "Numbers",
    "The everyday Min reading selected here; the character also has a separate literary reading.",
    92923652,
  ),
  word(
    "two",
    "兩",
    "two",
    "/nŋ̍²²/",
    "Numbers",
    "The everyday reading uses a syllabic nasal. 二 has a separate entry and reading.",
    93318241,
  ),
  word(
    "two-er",
    "二",
    "two: the character 二",
    "/li²²/",
    "Numbers",
    "A separate reading from 兩; the two forms are not interchangeable in every expression.",
    92550636,
  ),
  word(
    "three",
    "三",
    "three",
    "/sã⁴⁴/",
    "Numbers",
    "The everyday reading has nasal [ã]; the literary reading retains a final nasal consonant.",
    92536907,
  ),
  word(
    "four",
    "四",
    "four",
    "/si²¹/",
    "Numbers",
    "The selected everyday reading; this citation tone also appears in Cao’s Xiamen examples.",
    93386109,
  ),
  word(
    "five",
    "五",
    "five",
    "/ɡɔ²²/",
    "Numbers",
    "The everyday Xiamen reading uses [ɔ] and citation tone 22.",
    92719862,
  ),
  word(
    "six",
    "六",
    "six",
    "/lak̚⁴/",
    "Numbers",
    "A checked syllable ending in unreleased [k̚].",
    92691732,
  ),
  word(
    "seven",
    "七",
    "seven",
    "/t͡sʰit̚³²/",
    "Numbers",
    "Starts with an aspirated affricate and ends in unreleased [t̚].",
    92722445,
  ),
  word(
    "eight",
    "八",
    "eight",
    "/pueʔ³²/",
    "Numbers",
    "The everyday reading ends in [ʔ]; its literary reading has a different ending.",
    92707648,
  ),
  word(
    "nine",
    "九",
    "nine",
    "/kau⁵³/",
    "Numbers",
    "The everyday reading selected from the source’s everyday/literary pair.",
    92630836,
  ),
  word(
    "ten",
    "十",
    "ten",
    "/t͡sap̚⁴/",
    "Numbers",
    "A checked syllable ending in unreleased [p̚].",
    92722508,
  ),
];
