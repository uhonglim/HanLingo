import { lexicalExpansionLearning } from "./learning/lexical-expansion";
import { atlasLexibankPacks } from "./learning/atlas-lexibank";
import { ganXiangLearning } from "./learning/gan-xiang";
import { otherSiniticLearning } from "./learning/other-sinitic";
import { southernMinLearning } from "./learning/southern-min";
import { displayIpa } from "./ipa-display";
import { minLearning } from "./learning/min";
import { mandarinYueLearning } from "./learning/mandarin-yue";
import { hakkaWuLearning } from "./learning/hakka-wu";
import { xiamenWords } from "./xiamen-lexicon";
import type { LearningSource } from "./learning/types";
import { hasWrittenForm } from "./learning/types";

export type RegionalReading = {
  id: string;
  localityId: string;
  han: string;
  sourceRomanization?: { text: string; system: string };
  ipa?: string;
  toneNotation: "pitch-contour" | "source-category" | "unspecified";
  source: LearningSource;
  /** The place, speaker sample, or dictionary reference actually documented. */
  scope: string;
  registerLabel?: string;
  note?: string;
};
export type RegionalConcept = {
  id: string;
  english: string;
  contrast: "pronunciation" | "word-choice" | "mixed";
  note: string;
  readings: RegionalReading[];
};

const moeScopes: Record<string, string> = {
  taipak: "MOE 臺北偏泉腔 reference",
  tainan: "MOE 臺南混合腔 reference",
  kaohsiung: "MOE 高雄混合腔 reference",
  yilan: "MOE 宜蘭偏漳腔 reference",
  lukang: "MOE 鹿港偏泉腔 reference",
  sanxia: "MOE 三峽偏泉腔 reference",
};
function moe(
  conceptId: string,
  entry: number,
  title: string,
  rows: [localityId: string, han: string, spelling: string][],
): RegionalReading[] {
  return rows.map(([localityId, han, spelling], index) => ({
    id: `${conceptId}-${localityId}-moe-${index}`,
    localityId,
    han,
    sourceRomanization: { text: spelling, system: "MOE Tâi-lô" },
    toneNotation: "source-category",
    source: {
      title: `MOE Taiwanese dictionary · ${title} · locality comparison`,
      url: `https://sutian.moe.edu.tw/zh-hant/su/${entry}/`,
    },
    scope: moeScopes[localityId],
    note: "A documented local reference, not a form exclusive to this place. Source tone marks are retained; no IPA contour is inferred.",
  }));
}

const comparisonSource: LearningSource = {
  title: "Wang Kuei-lan, 2022 · Table 17, p. 170",
  url: "https://taiwan.ntue.edu.tw/var/file/29/1029/img/692/476201647.pdf#page=36",
};
const comparisonScope: Record<string, string> = {
  xiamen: "Amoy column in Wang’s comparison table",
  zhangzhou: "Tsiang-tsiu column in Wang’s comparison table",
  quanzhou: "Tsuân-tsiu column in Wang’s comparison table",
};
/** These are printed pitch values, not tone-category numbers. */
function comparison(
  conceptId: string,
  han: string,
  rows: [localityId: string, ipa: string][],
): RegionalReading[] {
  return rows.map(([localityId, ipa]) => ({
    id: `${conceptId}-${localityId}-wang`,
    localityId,
    han,
    ipa,
    toneNotation: "pitch-contour",
    source: comparisonSource,
    scope: comparisonScope[localityId],
    note: "Citation forms from one comparison table. Its reference pitch values can differ from other Amoy lessons; they are not connected-speech tones.",
  }));
}

const localConcepts: RegionalConcept[] = [
  {
    id: "tomato",
    english: "tomato",
    contrast: "word-choice",
    note: "The dictionary records different names, with overlap between places.",
    readings: moe("tomato", 5090, "柑仔蜜", [
      ["taipak", "臭柿仔", "tshàu-khī-á"],
      ["tainan", "柑仔蜜", "kam-á-bi̍t"],
      ["kaohsiung", "柑仔蜜", "kam-á-bi̍t"],
      ["yilan", "臭柿仔", "tshàu-khī-á"],
      ["lukang", "トマト", "thoo-má-tooh"],
      ["sanxia", "臭柿仔", "tshàu-khī-á"],
    ]),
  },
  {
    id: "soap",
    english: "soap",
    contrast: "pronunciation",
    note: "Taipei has two recorded forms of 雪文; sap-bûn is also documented farther south.",
    readings: moe("soap", 8021, "雪文", [
      ["taipak", "雪文", "sap-muî"],
      ["taipak", "雪文", "sap-bûn"],
      ["tainan", "雪文", "sap-bûn"],
      ["kaohsiung", "雪文", "sap-bûn"],
      ["yilan", "雪文", "sap-bûn"],
      ["lukang", "雪文", "sap-muî"],
      ["sanxia", "雪文", "sap-muî"],
    ]),
  },
  {
    id: "chopsticks",
    english: "chopsticks",
    contrast: "pronunciation",
    note: "The word stays 箸 while the vowel changes between the dictionary’s reference accents.",
    readings: moe("chopsticks", 10689, "箸", [
      ["taipak", "箸", "tū"],
      ["tainan", "箸", "tī"],
      ["kaohsiung", "箸", "tī"],
      ["yilan", "箸", "tī"],
      ["lukang", "箸", "tǐr"],
      ["sanxia", "箸", "tīr"],
    ]),
  },
  {
    id: "market",
    english: "market",
    contrast: "mixed",
    note: "Sin-ka-pho heritage names use pa sat; MOE’s locality table records 市場, including a vowel difference in Tâi-lâm.",
    readings: [
      ...moe("market", 1772, "市場", [
        ["taipak", "市場", "tshī-tiûnn"],
        ["tainan", "市場", "tshī-tiônn"],
        ["kaohsiung", "市場", "tshī-tiûnn"],
        ["yilan", "市場", "tshī-tiûnn"],
        ["lukang", "市場", "tshī-tiûnn"],
        ["sanxia", "市場", "tshī-tiûnn"],
      ]),
      {
        id: "market-singapore-nhb",
        localityId: "singapore",
        han: "巴刹",
        sourceRomanization: { text: "pa sat", system: "NHB heritage spelling" },
        toneNotation: "unspecified",
        source: {
          title: "National Heritage Board · Singapore River Walk, p. 43",
          url: "https://www.roots.gov.sg/~/media/Roots/Files/singapore-river-walk/nhb_singpaore-river-walk_2018.pdf",
        },
        scope: "Hokkien market names in Sin-ka-pho’s heritage record",
        note: "Attested within lau pa sat, “old market”. The heritage spelling supplies no tone or IPA transcription.",
      },
    ],
  },
  {
    id: "chicken",
    english: "chicken",
    contrast: "pronunciation",
    note: "Compare the vowel in Amoy and Tsiang-tsiu, then the pitch in Tsuân-tsiu.",
    readings: [
      ...comparison("chicken", "雞", [
        ["xiamen", "[kue55]"],
        ["zhangzhou", "[ke44]"],
        ["quanzhou", "[kue33]"],
      ]),
      ...moe("chicken", 12657, "雞", [
        ["taipak", "雞", "kue"],
        ["tainan", "雞", "ke"],
        ["kaohsiung", "雞", "ke"],
        ["yilan", "雞", "ke"],
        ["lukang", "雞", "kue"],
        ["sanxia", "雞", "kere"],
      ]),
    ],
  },
  {
    id: "fire",
    english: "fire",
    contrast: "pronunciation",
    note: "One character, three local vowel forms.",
    readings: comparison("fire", "火", [
      ["xiamen", "[he53]"],
      ["zhangzhou", "[hue53]"],
      ["quanzhou", "[hə55]"],
    ]),
  },
  {
    id: "buy",
    english: "buy",
    contrast: "pronunciation",
    note: "Amoy and Tsiang-tsiu differ in the vowel sequence; Tsuân-tsiu also differs in pitch.",
    readings: comparison("buy", "買", [
      ["xiamen", "[bue53]"],
      ["zhangzhou", "[be53]"],
      ["quanzhou", "[bue55]"],
    ]),
  },
  {
    id: "cooked-rice",
    english: "cooked rice; a meal",
    contrast: "pronunciation",
    note: "Compare the syllabic nasal in Amoy with the nasalized vowel sequence in Tsiang-tsiu.",
    readings: comparison("cooked-rice", "飯", [
      ["xiamen", "[pŋ̍11]"],
      ["zhangzhou", "[puĩ22]"],
      ["quanzhou", "[pŋ̍41]"],
    ]),
  },
];

// Reuse attested entries instead of maintaining a second pronunciation dictionary.
// Only explicit semantic matches belong together; matching Han alone is insufficient.
const existingWords = [
  ...minLearning,
  ...southernMinLearning,
  ...mandarinYueLearning,
  ...hakkaWuLearning,
  ...atlasLexibankPacks,
  ...ganXiangLearning,
  ...otherSiniticLearning,
  ...lexicalExpansionLearning,
].flatMap((pack) => pack.words).filter(word => word.learningKind !== "character-reading");
const shared: [string, string, string[], string][] = [
  [
    "fish",
    "fish",
    ["fish"],
    "Compare the vowel or syllabic nasal, as well as the opening consonant.",
  ],
  [
    "tea",
    "tea",
    ["tea"],
    "Listen for changes in the opening consonant, vowel, and pitch.",
  ],
  [
    "water",
    "water",
    ["water"],
    "The same everyday meaning has distinct local sound patterns.",
  ],
  [
    "uncooked-rice",
    "uncooked rice",
    ["rice", "uncooked rice"],
    "Rice as grain, distinct from cooked 飯.",
  ],
  [
    "hand",
    "hand",
    ["hand"],
    "Compare the beginning of the syllable as well as its vowel.",
  ],
  [
    "mountain",
    "mountain",
    ["mountain"],
    "Some forms end in a nasal consonant; others have a nasalized vowel.",
  ],
  [
    "three",
    "three",
    ["three"],
    "The initial consonant and vowel differ across these local references.",
  ],
  [
    "door",
    "door",
    ["door"],
    "Compare the vowel and final nasal in these local readings.",
  ],
  [
    "younger-brother",
    "younger brother",
    ["younger brother"],
    "Compare the attested local kinship forms.",
  ],
  [
    "younger-sister",
    "younger sister",
    ["younger sister"],
    "Compare the attested local kinship forms.",
  ],
];
const sharedConcepts: RegionalConcept[] = shared.map(
  ([id, english, glosses, note]) => ({
    id,
    english,
    note,
    contrast: id.startsWith("younger-") ? "mixed" : "pronunciation",
    readings: [
      ...xiamenWords
        .filter((word) => glosses.includes(word.english))
        .map((word) => ({
          id: `${id}-xiamen-${word.id}`,
          localityId: "xiamen",
          han: word.han,
          ipa: word.ipa,
          toneNotation: "pitch-contour" as const,
          source: { title: word.sourceLabel, url: word.sourceUrl },
          scope: `Amoy · ${word.readingMode.toLowerCase()} reference`,
          note: word.note,
        })),
      ...existingWords
        .filter(hasWrittenForm)
        .filter((word) => glosses.includes(word.english))
        .filter(
          (word) =>
            // CUHK distinguishes rice [mi42] from metre [mi21] in Jian’ou.
            !(
              id === "uncooked-rice" &&
              word.localityId === "jianou" &&
              word.ipa.includes("˨˩")
            ),
        )
        .map((word) => ({
          id: `${id}-${word.id}`,
          localityId: word.localityId,
          han: word.han,
          ipa: word.ipa,
          toneNotation: word.toneNotation ?? "unspecified",
          source: word.source,
          scope: word.reading,
          registerLabel: word.registerLabel,
          note: word.note,
        })),
    ],
  }),
);

/** Attestation never implies that every resident uses a form, or that only this place does. */
export const regionalConcepts: RegionalConcept[] = [
  ...localConcepts,
  ...sharedConcepts,
].map((concept) => ({
  ...concept,
  readings: deduplicateReadings(concept.readings),
})).filter(concept => new Set(concept.readings.map(reading => reading.localityId)).size >= 2);

export function deduplicateReadings(
  readings: RegionalReading[],
): RegionalReading[] {
  const seen = new Set<string>();
  return readings.filter((reading) => {
    const key = JSON.stringify([
      reading.localityId,
      reading.han,
      reading.ipa
        ? displayIpa(reading.ipa, reading.toneNotation).normalize("NFC")
        : "",
      reading.sourceRomanization,
      reading.source.url,
      reading.registerLabel,
    ]);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
export function regionalConceptsFor(localityId: string): RegionalConcept[] {
  return regionalConcepts.filter((concept) =>
    concept.readings.some((reading) => reading.localityId === localityId),
  );
}
export function regionalReadingsFor(
  localityId: string,
): (RegionalReading & { conceptId: string; english: string })[] {
  return regionalConcepts.flatMap((concept) =>
    concept.readings
      .filter((reading) => reading.localityId === localityId)
      .map((reading) => ({
        ...reading,
        conceptId: concept.id,
        english: concept.english,
      })),
  );
}
