import { groupPhotos } from "../photography";
import type { AttestedWord, BranchLearning, LearningSource } from "./types";

const source = (title: string, url: string): LearningSource => ({ title, url });
const S = {
  beijing: source(
    "Han Hu: The Sociophonetics of Rhotacization in the Beijing Speech Community, 2022",
    "https://www.lotpublications.nl/Documents/624_fulltext.pdf",
  ),
  jinan: source(
    "Yujing Huang: Position-sensitive sandhi — Jinan Tone 4",
    "https://www.ub.edu/ocp12/wp-content/uploads/2014/11/OCP12_Main_poster_HUANG.pdf",
  ),
  nanjing: source(
    "Xin Li: Surface and underlying tones, Chapter 2 and Appendix A",
    "https://www.lotpublications.nl/Documents/527_fulltext.pdf",
  ),
  chengdu: source(
    "Hai Hu and Yiwen Zhang: Path of Vowel Raising in Chengdu Dialect of Mandarin",
    "https://arxiv.org/abs/1803.03887",
  ),
  hongKong: source(
    "M. Chan: Alveolarization in Hong Kong Cantonese, Table 21, p. 78",
    "https://ora.ox.ac.uk/objects/uuid%3A2d40e687-83cd-4d93-9c3e-fa6e5569cf6b",
  ),
  corpus: source(
    "SFUSED Cantonese: Methods, design, and usage",
    "https://pmc.ncbi.nlm.nih.gov/articles/PMC10851145/",
  ),
  yulin: source(
    "Wenmin Hu: Yulin kinship terminology, Table 1, pp. 11–12",
    "https://pressto.amu.edu.pl/index.php/linpo/article/view/linpo-2020-0001",
  ),
  taishan: source(
    "Teresa M. Cheng: The Phonology of Taishan, 1973",
    "https://www.jstor.org/stable/23749797",
  ),
  taishanDictionary: source(
    "Taishanese Dictionary: transcription conventions",
    "https://taishandict.com/transcription.html",
  ),
  pekingOpera: source(
    "UNESCO: Peking opera",
    "https://ich.unesco.org/en/RL/peking-opera-00418",
  ),
  springs: source(
    "Jinan: Spring water in daily life",
    "https://english.jinan.gov.cn/col108249/art/2022/art_108249_4776259.html",
  ),
  brocade: source(
    "UNESCO: Craftsmanship of Nanjing Yunjin brocade",
    "https://ich.unesco.org/en/RL/craftsmanship-of-nanjing-yunjin-brocade-00200",
  ),
  opera: source(
    "UNESCO: Cantonese opera",
    "https://ich.unesco.org/en/RL/cantonese-opera-00203",
  ),
  letters: source(
    "UNESCO: Qiaopi and Yinxin nomination, section 3.4",
    "https://media.unesco.org/sites/default/files/webform/mow001/china_qiaopi_and_yinxin.pdf",
  ),
};

// The source explicitly prints IPA and the numeric pitch values together.
// Kinship roots are not necessarily complete forms of address; keep that distinction visible.
const yulinRoots: [string, string, string, string][] = [
  ["father", "爸", "father", "pɔ54"],
  ["mother", "妈", "mother", "mɔ54"],
  ["paternal-grandfather", "爷", "paternal grandfather", "iɛ54"],
  ["grandmother", "婆", "grandmother", "po32"],
  ["paternal-elder-uncle", "伯", "father’s older brother", "pa33"],
  ["paternal-aunt", "姑", "father’s sister", "ku54"],
  ["maternal-aunt", "姨", "mother’s sister", "i32"],
  ["elder-brother", "哥", "older brother", "ko54"],
  ["younger-brother", "弟", "younger brother", "tai24"],
  ["elder-sister", "姐", "older sister", "tɛ33"],
  ["younger-sister", "妹", "younger sister", "mɔi21"],
  ["grandson", "孙", "grandson", "ɬyn54"],
];
const yulinWords: AttestedWord[] = yulinRoots.map(
  ([id, han, english, ipa]) => ({
    id: `yulin-${id}`,
    han,
    english,
    ipa,
    localityId: "yulin",
    toneNotation: "pitch-contour",
    reading: "Kinship root · Yuzhou and Fumian reference",
    note:
      id === "grandmother"
        ? "Used for both maternal and paternal grandmother in this table. Complete address terms can add prefixes and change tone."
        : "A kinship root from the source table; complete address terms can add prefixes and change tone.",
    source: S.yulin,
  }),
);
const hongKongWords: AttestedWord[] = (
  [
    ["think", "思", "to think", "siː55"],
    ["history", "史", "history", "siː35"],
    ["try", "試", "to try", "siː33"],
    ["time", "時", "time", "siː21"],
    ["market", "市", "market", "siː24"],
    ["matter", "事", "a matter", "siː22"],
  ] as const
).map(([id, han, english, ipa]) => ({
  id: `hong-kong-${id}`,
  han,
  english,
  ipa,
  localityId: "hong-kong",
  toneNotation: "pitch-contour",
  reading: "Citation reading · Hong Kong reference",
  note: "Table 21 gives both IPA tone letters and these pitch values. Its low rising tone is 24; other descriptions may use a different contour.",
  source: S.hongKong,
}));

// CUHK’s locality rows supply the initial, final and pitch contour separately.
// Joining those fields changes no sound symbol or tone value.
const dictionaryWords = (
  localityId: string,
  point: string,
  rows: [string, string, string, string][],
): AttestedWord[] =>
  rows.map(([id, han, english, ipa]) => ({
    id: `${localityId}-${id}`,
    han,
    english,
    ipa,
    localityId,
    toneNotation: "pitch-contour",
    reading: "Dictionary character reading",
    note: "An isolated character reading from CUHK’s locality table; compound and conversational tones can differ.",
    source: source(
      `CUHK Chinese Character Database: ${han}, locality ${point}`,
      `https://humanum.arts.cuhk.edu.hk/Lexis/lexi-mf/dialect.php?word=${encodeURIComponent(han)}`,
    ),
  }));
const jinanWords = dictionaryWords("jinan", "濟南", [
  ["rice", "米", "uncooked rice", "mi55"],
  ["door", "門", "door", "mẽ42"],
  ["meal", "飯", "cooked rice; meal", "fã21"],
  ["sky", "天", "sky", "tʰiã213"],
  ["tea", "茶", "tea", "tʂʰa42"],
  ["water", "水", "water", "ʂuei55"],
  ["hand", "手", "hand", "ʂou55"],
  ["mountain", "山", "mountain", "ʂã213"],
  ["person", "人", "person", "ʐẽ42"],
  ["flower", "花", "flower", "xua213"],
]);
const nanjingWords = dictionaryWords("nanjing", "南京", [
  ["rice", "米", "uncooked rice", "mi212"],
  ["door", "門", "door", "mən24"],
  ["meal", "飯", "cooked rice; meal", "faŋ44"],
  ["sky", "天", "sky", "tʰien31"],
  ["tea", "茶", "tea", "tʂʰɑ24"],
  ["water", "水", "water", "ʂuəi212"],
  ["hand", "手", "hand", "ʂəɯ212"],
  ["mountain", "山", "mountain", "ʂaŋ31"],
  ["flower", "花", "flower", "xuɑ31"],
]);

export const mandarinYueLearning: BranchLearning[] = [
  {
    branchId: "mandarin/beijing",
    words: [],
    soundNotes: [
      {
        title: "Hear the vowel change in 儿化",
        text: "Rhotacization gives a syllable an r-coloured ending. Han Hu’s study examines how speakers in the Beijing speech community produce and evaluate it; it is a variable feature, not an ending to add to every word.",
        localityIds: ["beijing-city"],
        source: S.beijing,
      },
      {
        title: "A city’s speech has more than one style",
        text: "Local Beijing speech and Standard Mandarin overlap, but a formal reading does not stand for every local conversation. Compare the speaker groups and speaking tasks in the study before treating a pronunciation as universal.",
        localityIds: ["beijing-city"],
        source: S.beijing,
      },
    ],
    culture: [
      {
        title: "Peking opera",
        text: "Singing, speech, movement and combat share the stage. Facial painting and costume help identify roles. Listen to the spoken passages as well as the melodies: stage diction is a performance tradition, not a transcript of everyday Beijing speech.",
        localityIds: ["beijing-city"],
        source: S.pekingOpera,
      },
    ],
    resources: [
      {
        title: "Beijing rhotacization",
        description:
          "A full study of pronunciation and social variation in the Beijing speech community.",
        localityIds: ["beijing-city"],
        kind: "Study",
        url: S.beijing.url,
      },
      {
        title: "Peking opera: watch the performance",
        description:
          "UNESCO’s heritage entry includes film and photographs of the stage tradition.",
        localityIds: ["beijing-city"],
        kind: "Culture",
        url: S.pekingOpera.url,
      },
    ],
  },
  {
    branchId: "mandarin/jilu",
    words: jinanWords,
    soundNotes: [
      {
        title: "Jinan’s falling tone",
        text: "Huang’s study describes Tone 4 as 41; the CUHK dictionary gives 21, as in 飯. These are source-specific pitch descriptions on a five-level scale, not different names for numbered tone categories. Keep the source with the reading.",
        localityIds: ["jinan"],
        source: S.jinan,
      },
      {
        title: "Position changes the result",
        text: "Before another Tone 4, the penultimate syllable can acquire a falling-then-rising contour. In the tested longer sequences, this change targets the penultimate position rather than every eligible syllable.",
        localityIds: ["jinan"],
        source: S.jinan,
      },
    ],
    culture: [
      {
        title: "Life around the springs",
        text: "Spring water has been used for drinking, cooking and washing in Jinan. Baotu Spring and the spring-fed Daming Lake connect the city’s water system with its everyday public spaces.",
        localityIds: ["jinan"],
        source: S.springs,
      },
    ],
    resources: [
      {
        title: "CUHK locality readings",
        description:
          "Character readings with IPA, pitch contours and links to dictionary recordings.",
        localityIds: ["jinan"],
        kind: "Dictionary",
        url: "https://humanum.arts.cuhk.edu.hk/Lexis/lexi-mf/dialectIndex.php?point=B",
      },
      {
        title: "Jinan tone sandhi",
        description:
          "A short research paper with a pitch plot comparing citation and changed Tone 4.",
        localityIds: ["jinan"],
        kind: "Study",
        url: S.jinan.url,
      },
      {
        title: "Jinan’s spring culture",
        description:
          "The city’s account of spring water, daily life and conservation.",
        localityIds: ["jinan"],
        kind: "Culture",
        url: S.springs.url,
      },
    ],
  },
  {
    branchId: "mandarin/jianghuai",
    words: nanjingWords,
    soundNotes: [
      {
        title: "Five lexical tones in Nanjing",
        text: "The Nanjing study distinguishes five lexical tones, excluding neutral tone. Earlier descriptions disagree on some pitch values; a tone label alone does not fix one exact contour.",
        localityIds: ["nanjing"],
        source: S.nanjing,
      },
      {
        title: "Tones can converge or diverge",
        text: "Some two-syllable combinations bring neighbouring tones closer together; others increase their difference. Chapter 2 tests both kinds with 18 young adult speakers born and raised in Nanjing.",
        localityIds: ["nanjing"],
        source: S.nanjing,
      },
      {
        title: "Try the study’s word list",
        text: "花 “flower”, 天 “sky”, 山 “mountain” and 心 “heart” are its Tone 1 examples. Appendix A gives characters, glosses and pinyin; it is a reading list, not an IPA transcription.",
        localityIds: ["nanjing"],
        source: S.nanjing,
      },
    ],
    culture: [
      {
        title: "Weaving Yunjin brocade",
        text: "Two weavers work a large wooden loom to make patterned silk, sometimes with gold or peacock-feather thread. The craft passes on designs and coordinated handwork in Nanjing.",
        localityIds: ["nanjing"],
        source: S.brocade,
      },
    ],
    resources: [
      {
        title: "CUHK locality readings",
        description:
          "Character readings with IPA, pitch contours and links to dictionary recordings.",
        localityIds: ["nanjing"],
        kind: "Dictionary",
        url: "https://humanum.arts.cuhk.edu.hk/Lexis/lexi-mf/dialectIndex.php?point=D",
      },
      {
        title: "Nanjing tone study and word lists",
        description:
          "Chapter 2 explains the sound patterns; Appendix A supplies the words used in the experiment.",
        localityIds: ["nanjing"],
        kind: "Study",
        url: S.nanjing.url,
      },
      {
        title: "Watch Yunjin weaving",
        description:
          "UNESCO’s film and photographs follow the Nanjing loom craft.",
        localityIds: ["nanjing"],
        kind: "Culture",
        url: S.brocade.url,
      },
    ],
  },
  {
    branchId: "mandarin/southwestern",
    words: [],
    soundNotes: [
      {
        title: "Chengdu vowels vary by speaker",
        text: "In the studied /an/ sequences, younger speakers generally raised the vowel towards [ɛ], while older speakers more often used [æ]. The study records 17 native speakers; this is a documented pattern, not one compulsory city-wide pronunciation.",
        localityIds: ["chengdu"],
        source: S.chengdu,
      },
      {
        title: "Listen to the surrounding sounds",
        text: "The experiment compares vowels after [p t k], after [pʰ tʰ kʰ], and after high vowels. Older speakers already show raising after [i] and [y], illustrating how the same vowel can behave differently in different syllables.",
        localityIds: ["chengdu"],
        source: S.chengdu,
      },
    ],
    culture: [
      {
        title: "A Chengdu teahouse",
        text: "At Baihuatan Park, tables and chairs fill a shaded outdoor teahouse. The photograph records a place for tea and conversation; it does not identify the languages of the people pictured.",
        localityIds: ["chengdu"],
        source: source(
          "Daderot: Teahouse in Baihuatan Park",
          groupPhotos.mandarin.sourceUrl,
        ),
        photo: groupPhotos.mandarin,
      },
    ],
    resources: [
      {
        title: "Chengdu vowel raising",
        description:
          "An acoustic study with vowel plots, speaker information and experimental syllables.",
        localityIds: ["chengdu"],
        kind: "Study",
        url: S.chengdu.url,
      },
    ],
  },
  {
    branchId: "yue/guangfu",
    words: hongKongWords,
    soundNotes: [
      {
        title: "One syllable, six meanings",
        text: "The six Hong Kong examples keep [siː] constant and change pitch. Read their contours separately: 55, 35, 33, 21, 24 and 22. These are pitch values, not Jyutping’s tone-category numbers.",
        localityIds: ["hong-kong"],
        source: S.hongKong,
      },
      {
        title: "Word endings can vary",
        text: "Chan’s study follows Hong Kong speakers’ variation between final [ŋ] and [n], and between [k] and [t], in particular phonetic contexts. Variation is part of the evidence; it is not a rule to replace every final consonant.",
        localityIds: ["hong-kong"],
        source: S.hongKong,
      },
      {
        title: "Keep the locality with the tone",
        text: "The corpus description distinguishes a high falling 53 contour in Guangzhou speech from the high level 55 favoured by many younger Hong Kong speakers. Age, speaker and locality matter when comparing tone inventories.",
        localityIds: ["guangzhou", "hong-kong"],
        source: S.corpus,
      },
    ],
    culture: [
      {
        title: "Behind the opera stage",
        text: "Guangzhou Youth Cantonese Opera Troupe performers prepare their makeup backstage. Costume, gesture, music and sung language work together in Cantonese opera.",
        localityIds: ["guangzhou"],
        source: S.opera,
        photo: groupPhotos.yue,
      },
      {
        title: "Cantonese opera in Hong Kong",
        text: "Opera brings together singing, spoken dialogue, percussion and stylized movement. UNESCO documents its transmission in Guangdong, Hong Kong and Macao; stage language and everyday conversation serve different settings.",
        localityIds: ["hong-kong"],
        source: S.opera,
      },
    ],
    resources: [
      {
        title: "CUHK Cantonese character dictionary",
        description:
          "Look up character readings, word combinations and recorded pronunciations. Its romanization is the source’s system, not HanLingo spelling.",
        localityIds: ["guangzhou", "hong-kong"],
        kind: "Dictionary",
        url: "https://humanum.arts.cuhk.edu.hk/Lexis/lexi-can/",
      },
      {
        title: "Hong Kong sounds and tone examples",
        description:
          "Chan’s thesis supplies the six-tone word set and documents changes in final consonants.",
        localityIds: ["hong-kong"],
        kind: "Study",
        url: S.hongKong.url,
      },
      {
        title: "Cantonese speech corpus",
        description:
          "Research on recorded spontaneous Cantonese, with links to its original broadcast material and data. Its adapted transcription must not be mistaken for strict IPA.",
        localityIds: ["hong-kong"],
        kind: "Recordings",
        url: S.corpus.url,
      },
      {
        title: "Cantonese opera: watch and listen",
        description:
          "UNESCO’s performance film, photographs and heritage description.",
        localityIds: ["guangzhou", "hong-kong"],
        kind: "Culture",
        url: S.opera.url,
      },
    ],
  },
  {
    branchId: "yue/siyi",
    words: [],
    soundNotes: [
      {
        title: "Taishan needs its own readings",
        text: "Cheng compares Taishan and Cantonese phonology while noting that the two are not entirely mutually intelligible. A shared character or membership in Yue does not establish the same pronunciation.",
        localityIds: ["taishan"],
        source: S.taishan,
      },
      {
        title: "Read the dictionary’s key first",
        text: "The community dictionary uses a simplified phonetic notation. Its initial b, d, g mean voiceless [p t k], while initial p, t, k mean aspirated [pʰ tʰ kʰ]. Final p, t, k indicate unreleased stops. These are not HanLingo spelling rules.",
        localityIds: ["taishan"],
        source: S.taishanDictionary,
      },
    ],
    culture: [
      {
        title: "Letters that carried money home",
        text: "The Wuyi region’s 銀信 combined family correspondence with remittances. The UNESCO archive preserves messages, receipts and account books linking emigrants with home. This regional history includes communities beyond Taishan.",
        localityIds: ["taishan"],
        source: S.letters,
      },
    ],
    resources: [
      {
        title: "Taishanese dictionary and recordings",
        description:
          "A community word dictionary with audio. Read the transcription key and retain the variety information attached to each entry.",
        localityIds: ["taishan"],
        kind: "Dictionary",
        url: "https://taishandict.com/",
      },
      {
        title: "Taishan phonology",
        description:
          "Cheng’s 1973 study compares consonants, vowels and tones with Cantonese. Publisher access may be required.",
        localityIds: ["taishan"],
        kind: "Study",
        url: S.taishan.url,
      },
      {
        title: "Letters and remittances",
        description:
          "The UNESCO nomination explains the Guangdong and Fujian collections and their local names.",
        localityIds: ["taishan"],
        kind: "Culture",
        url: S.letters.url,
      },
    ],
  },
  {
    branchId: "yue/goulou",
    words: yulinWords,
    soundNotes: [
      {
        title: "Hear [ɬ] in 孙",
        text: "The Yulin reference gives 孙 “grandson” as [ɬyn54]. [ɬ] is a voiceless lateral fricative: air passes along the sides of the tongue. It is a separate sound from [s].",
        localityIds: ["yulin"],
        source: S.yulin,
      },
      {
        title: "Pitch and address forms",
        text: "The study uses ten basic tone values, including four short checked tones. Hyphenated values mark changed tones. The word cards retain the unchanged kinship roots from its table; full forms of address can differ.",
        localityIds: ["yulin"],
        source: S.yulin,
      },
    ],
    culture: [
      {
        title: "Family relationships in words",
        text: "The Yuzhou and Fumian material distinguishes a father’s older brother, a mother’s brother and other relatives. Direct address and talking about someone can use different forms. Family vocabulary carries social relationships as well as pronunciation.",
        localityIds: ["yulin"],
        source: S.yulin,
      },
    ],
    resources: [
      {
        title: "Yulin family vocabulary",
        description:
          "Tables compare Yulin IPA with Cantonese Jyutping. Read those columns as different notation systems; Appendix A gives fuller address forms.",
        localityIds: ["yulin"],
        kind: "Study",
        url: S.yulin.url,
      },
    ],
  },
];
