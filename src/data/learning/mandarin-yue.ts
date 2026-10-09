import { groupPhotos } from "../photography";
import type { AttestedWord, BranchLearning, LearningSource } from "./types";

const source = (title: string, url: string): LearningSource => ({ title, url });
const S = {
  beijing: source(
    "Han Hu: The Sociolinguistics of Rhotacization in the Beijing Speech Community, 2022",
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
    "Wenmin Hu: Yulin kinship terminology, Tables 1–2, pp. 11–13",
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

const beijingIpaSource = source(
  "Wai-Sum Lee and Eric Zee: Standard Chinese (Beijing), 2003, pp. 109–110",
  "https://doi.org/10.1017/S0025100303001208",
);
const hongKongIpaSource = source(
  "Eric Zee: Chinese (Hong Kong Cantonese), 1991, pp. 46–47",
  "https://doi.org/10.1017/S0025100300006058",
);

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
  ["paternal-younger-uncle", "叔", "father’s younger brother", "ʃok5"],
  ["maternal-grandfather", "公", "maternal grandfather", "koȵ54"],
  ["maternal-uncle", "舅", "mother’s brother", "tʃau21"],
  ["maternal-uncles-wife", "妗", "mother’s brother’s wife", "tʃam21"],
  ["elder-brother-reference", "兄", "older brother, in reference", "uɛŋ54"],
  ["elder-brothers-wife", "嫂", "older brother’s wife", "ɬau33"],
  [
    "younger-brothers-wife",
    "婶",
    "younger brother’s wife, in reference",
    "ʃam33",
  ],
  ["eldest", "大", "eldest, in a kinship term", "tɔi21"],
];
const yulinWords: AttestedWord[] = yulinRoots.map(
  ([id, han, english, ipa]) => ({
    id: `yulin-${id}`,
    han,
    english,
    ipa,
    localityId: "yulin",
    toneNotation: "pitch-contour",
    reading:
      id === "eldest"
        ? "Kinship ranking element · Yuzhou and Fumian reference"
        : "Kinship root · Yuzhou and Fumian reference",
    note:
      id === "grandmother"
        ? "Used for both maternal and paternal grandmother in this table. Complete address terms can add prefixes and change tone."
        : "A kinship element from the source table; complete address terms can add prefixes and change tone.",
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
  rows.map(([id, han, , ipa]) => ({
    id: `${localityId}-${id}`,
    han,
    english: `Character ${han}`,
    learningKind: "character-reading",
    registerLabel: "Source character reading",
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
  ["ear", "耳", "ear", "ər55"],
  ["two", "二", "two", "ər21"],
  ["clothing", "衣", "clothing", "i213"],
  ["chair", "椅", "chair", "i55"],
  ["five", "五", "five", "u55"],
  ["fish", "魚", "fish", "y42"],
  ["rain", "雨", "rain", "y55"],
  ["moon", "月", "moon", "yə21"],
  ["oil", "油", "oil", "iou42"],
  ["eye", "眼", "eye", "iã55"],
  ["sheep", "羊", "sheep", "iaŋ42"],
  ["nose", "鼻", "nose", "pi42"],
  ["cloth", "布", "cloth", "pu21"],
  ["cup", "杯", "cup", "pei213"],
  ["bag", "包", "bag; bundle", "pɔ213"],
  ["bird", "鳥", "bird", "ȵiɔ55"],
  ["cow", "牛", "cow", "ȵiou42"],
  ["dog", "狗", "dog", "kou55"],
  ["horse", "馬", "horse", "ma55"],
  ["heart", "心", "heart", "ɕiẽ213"],
  ["fire", "火", "fire", "xuə55"],
  ["soil", "土", "soil", "tʰu55"],
  ["boat", "船", "boat", "tʂʰuã42"],
  ["mouth", "口", "mouth", "kʰou55"],
  ["tooth", "牙", "tooth", "ia42"],
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
  ["ear", "耳", "ear", "ər212"],
  ["two", "二", "two", "ər44"],
  ["clothing", "衣", "clothing", "i31"],
  ["chair", "椅", "chair", "i212"],
  ["five", "五", "five", "u212"],
  ["fish", "魚", "fish", "y24"],
  ["rain", "雨", "rain", "y212"],
  ["moon", "月", "moon", "yeʔ5"],
  ["oil", "油", "oil", "iəɯ24"],
  ["eye", "眼", "eye", "ien212"],
  ["sheep", "羊", "sheep", "iaŋ24"],
  ["nose", "鼻", "nose", "piʔ5"],
  ["cloth", "布", "cloth", "pu44"],
  ["cup", "杯", "cup", "pəi31"],
  ["bag", "包", "bag; bundle", "pɔo31"],
  ["bird", "鳥", "bird", "liɔo212"],
  ["cow", "牛", "cow", "liəɯ24"],
  ["dog", "狗", "dog", "kəɯ212"],
  ["horse", "馬", "horse", "mɑ212"],
  ["heart", "心", "heart", "sin31"],
  ["fire", "火", "fire", "xo212"],
  ["soil", "土", "soil", "tʰu212"],
  ["boat", "船", "boat", "tʂʰuaŋ24"],
  ["mouth", "口", "mouth", "kʰəɯ212"],
  ["tooth", "牙", "tooth", "iɑ24"],
]);

const beijingWords: AttestedWord[] = (
  [
    ["eight", "八", "eight", "pa˥"],
    ["lie-prone", "趴", "lie prone", "pʰa˥"],
    ["mother", "媽", "mother", "ma˥"],
    ["send", "發", "send", "fa˥"],
    ["build", "搭", "build", "ta˥"],
    ["he", "他", "he", "tʰa˥"],
    ["scatter", "撒", "scatter; cast", "sa˥"],
    ["wipe", "擦", "wipe", "tsʰa˥"],
    ["shrimp", "蝦", "shrimp", "ɕia˥"],
    ["add", "加", "add", "tɕia˥"],
    ["nip", "掐", "nip off", "tɕʰia˥"],
    ["frog", "蛙", "frog", "wa˥"],
    ["pull", "拉", "pull", "la˥"],
    ["duck", "鴨", "duck", "ja˥"],
    ["song", "歌", "song", "kɤ˥"],
    ["subject", "科", "subject of study", "kʰɤ˥"],
    ["drink", "喝", "drink", "xɤ˥"],
    ["clothes", "衣", "clothes", "i˥"],
    ["house", "屋", "house", "u˥"],
    ["sound", "音", "sound", "in˥"],
    ["safe", "安", "safe", "an˥"],
    ["favour", "恩", "favour", "ən˥"],
    ["flower", "花", "flower", "xua˥"],
    ["black", "黑", "black", "xei˥"],
    ["ash", "灰", "ash", "xuei˥"],
  ] as [string, string, string, string][]
).map(([id, han, english, ipa]) => ({
  id: `beijing-city-ipa-${id}`,
  han,
  english,
  ipa,
  localityId: "beijing-city",
  toneNotation: "pitch-contour",
  registerLabel: "Standard Mandarin · Beijing speaker",
  reading: "Standard Mandarin citation examples · Beijing speaker, 2003",
  note: "The study records a 25-year-old woman who grew up in Beijing. These are its formal reference forms, not a claim about every local conversational style. The source’s high-level tone letter is retained.",
  source: beijingIpaSource,
}));

const hongKongIpaWords: AttestedWord[] = (
  [
    ["flower", "花", "flower", "fa˥"],
    ["frog", "蛙", "frog", "wa˥"],
    ["dozen", "打", "dozen", "ta˥"],
    ["he", "他", "he; she, literary", "tʰa˥"],
    ["sand", "沙", "sand", "sa˥"],
    ["hold", "揸", "hold", "tsa˥"],
    ["add", "加", "add", "ka˥"],
    ["truck", "卡", "truck", "kʰa˥"],
    ["melon", "瓜", "melon", "kʷa˥"],
    ["boast", "誇", "boast", "kʷʰa˥"],
    ["shrimp", "蝦", "shrimp", "ha˥"],
    ["silk", "絲", "silk", "si˥"],
    ["lose", "輸", "lose", "sy˥"],
    ["boot", "靴", "boot", "hœ˥"],
    ["wet", "濕", "wet", "sɐp˥"],
    ["comb", "梳", "comb", "sɔ˥"],
    ["husband", "夫", "husband", "fu˥"],
    ["uncle", "叔", "uncle", "sʊk˥"],
    ["waste", "嘥", "waste", "sai˥"],
    ["west", "西", "west", "sɐi˥"],
    ["basket", "筲", "basket", "sau˥"],
    ["receive", "收", "receive", "sɐu˥"],
    ["grey", "灰", "grey", "fui˥"],
    ["burn", "燒", "burn", "siu˥"],
  ] as [string, string, string, string][]
).map(([id, han, english, ipa]) => ({
  id: `hong-kong-ipa-${id}`,
  han,
  english,
  ipa,
  localityId: "hong-kong",
  toneNotation: "pitch-contour",
  reading: "Hong Kong citation examples · Zee 1991",
  note: "Broad reference transcription from a lifelong Hong Kong speaker, a 22-year-old woman. Vowel lengths are unmarked, following the source’s first notation option. The original tone letter is retained; final stops are unreleased.",
  source: hongKongIpaSource,
}));

const chengduLexicalSource = source(
  "Yangtian Luo: Prosodic Phonology of the Chengdu Dialect, 2022, pp. 117–119",
  "https://asset.library.wisc.edu/1711.dl/M563MSCNTS2278T/R/file-ac2d5.pdf#page=135",
);
// These morphology examples deliberately omit tones in the original dissertation.
// Do not turn their segment strings into complete tonal pronunciations.
const chengduWords: AttestedWord[] = (
  [
    ["turn", "倒拐", "turn", "tau kuai"],
    ["sidewalk", "街沿", "sidewalk", "kai tɕian"],
    ["reach-end", "抵拢", "reach the end", "ti loŋ"],
    ["rice", "饭米", "rice", "fan mi"],
    ["relaxed", "松活", "relaxed", "soŋ xo"],
    ["country", "国家", "country", "kuɛ tɕia"],
    ["brain", "脑壳", "brain", "nau kʰo"],
    ["quilt", "铺盖", "quilt", "pʰu kai"],
    ["switch", "开关", "switch", "kʰai kuan"],
    ["sesame-candy", "麻糖", "sesame candy", "ma taŋ"],
    ["green-tea", "绿茶", "green tea", "ly tsʰa"],
    ["colander", "漏瓢", "colander", "ləu pʰiau"],
    ["summer-shower", "偏东雨", "summer shower", "pʰian toŋ y"],
    ["skinny", "精瘦", "skinny", "tɕin səu"],
    ["bland", "寡淡", "bland", "kua tan"],
    ["speak", "开腔", "speak", "kʰai tɕʰiaŋ"],
    ["cautious", "把稳", "cautious", "pa uən"],
    ["careful", "把细", "careful", "pa ɕi"],
    ["nightfall", "擦黑", "nightfall", "tsʰa xɛ"],
    ["flat-ground", "坝坝", "flat ground", "pa pa"],
    ["small-hole", "洞洞", "small hole", "toŋ toŋ"],
    ["small-cups", "杯杯", "small cups", "pei pei"],
    ["shovel", "铲铲", "shovel", "tsʰuan tsʰuan"],
    ["braid", "揪揪", "braid", "tɕiəu tɕiəu"],
  ] as [string, string, string, string][]
).map(([id, han, english, ipa]) => ({
  id: `chengdu-luo-${id}`,
  han,
  english,
  ipa,
  localityId: "chengdu",
  toneNotation: "unspecified",
  registerLabel: "Chengdu lexical examples · tones not supplied",
  reading: "Local compounds · segment transcription only",
  note: "Luo’s morphology examples supply these segments and meanings without tones. They document local word formation, not complete tonal pronunciations; no pitch or sandhi has been inferred.",
  source: chengduLexicalSource,
}));

const guangzhouLexicalSource = source(
  "Picus Sizhi Ding: Phonological change in Hong Kong Cantonese, 2010, Table 5, p. 206 — Guangzhou column",
  "https://www.abdn.ac.uk/media/site/llmvc/documents/Ding-Phonological-change-in-Hong-Kong-Cantonese.pdf#page=9",
);
const guangzhouWords: AttestedWord[] = (
  [
    ["three", "三", "three", "sam55"],
    ["heart", "心", "heart", "sɐm55"],
    ["hill", "山", "hill", "san55"],
    ["new", "新", "new", "sɐn55"],
    ["star", "星", "star", "sɪŋ55"],
    ["wind", "風", "wind", "foŋ55"],
    ["leaf", "葉", "leaf", "jip22"],
    ["ten", "十", "ten", "sɐp22"],
    ["eight", "八", "eight", "pat33"],
    ["one", "一", "one", "jɐt55"],
    ["eat", "食", "eat", "sek22"],
    ["six", "六", "six", "lok22"],
  ] as [string, string, string, string][]
).map(([id, han, english, ipa]) => ({
  id: `guangzhou-ding-${id}`,
  han,
  english,
  ipa,
  localityId: "guangzhou",
  toneNotation: "pitch-contour",
  registerLabel: "Canton comparative word table",
  reading: "Canton reference · Ding 2010",
  note: "The table explicitly labels this column Guangzhou and credits the Sino-Tibetan Cognates Database. Its vowel symbols, unmarked length and pitch values are retained; this is not the paper’s Hong Kong speaker sample. Han characters identify the table’s glossed items.",
  source: guangzhouLexicalSource,
}));

export const mandarinYueLearning: BranchLearning[] = [
  {
    branchId: "mandarin/beijing",
    words: beijingWords,
    soundNotes: [
      {
        title: "Feel the puff of air",
        text: "八 [pa˥] and 趴 [pʰa˥] differ in aspiration. Keep the same high pitch, and compare the air released after opening your lips. The source also contrasts unaspirated [t k] with aspirated [tʰ kʰ].",
        localityIds: ["beijing-city"],
        source: {
          title: "Lee and Zee: Standard Chinese (Beijing), 2003",
          url: "https://doi.org/10.1017/S0025100303001208",
        },
      },
      {
        title: "Read the register with the example",
        text: "The 25 citation words here come from a lifelong Beijing speaker in Lee and Zee’s Standard Chinese illustration. They show one formal reference style. Hu’s separate study addresses how local conversational rhotacization varies.",
        localityIds: ["beijing-city"],
        source: {
          title: "Lee and Zee: Standard Chinese (Beijing), 2003",
          url: "https://doi.org/10.1017/S0025100303001208",
        },
      },
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
        title: "Collecting the sounds of a hutong",
        text: "Shijia Hutong Museum preserves residents’ furniture, photographs and everyday objects, together with recordings of voices and insect sounds. These neighbourhood sounds place spoken language in the courtyards and lanes where people meet.",
        localityIds: ["beijing-city"],
        source: {
          title: "Beijing: Shijia Hutong Museum and neighbourhood memory",
          url: "https://english.beijing.gov.cn/latest/news/202307/t20230701_3152487.html",
        },
      },
      {
        title: "Peking opera",
        text: "Singing, speech, movement and combat share the stage. Facial painting and costume help identify roles. Listen to the spoken passages as well as the melodies: stage diction is a performance tradition, not a transcript of everyday Beijing speech.",
        localityIds: ["beijing-city"],
        source: S.pekingOpera,
      },
    ],
    resources: [
      {
        title: "Beijing IPA illustration",
        description:
          "Consonant contrasts, vowels, citation tones and a transcribed passage from one lifelong Beijing speaker. Formal Standard Mandarin reference.",
        localityIds: ["beijing-city"],
        kind: "Study",
        url: "https://doi.org/10.1017/S0025100303001208",
      },
      {
        title: "Hutong voices and neighbourhood history",
        description:
          "The city’s account of Shijia Hutong Museum and its collection of everyday sounds.",
        localityIds: ["beijing-city"],
        kind: "Culture",
        url: "https://english.beijing.gov.cn/latest/news/202307/t20230701_3152487.html",
      },
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
        title: "Listen for nasal vowels",
        text: "The CUHK reference writes 門 [mẽ42] and 眼 [iã55] with nasalized vowels. The tilde marks airflow through the nose during the vowel; it is not an extra final [n].",
        localityIds: ["jinan"],
        source: {
          title: "CUHK Chinese Character Database: Jinan sound index",
          url: "https://humanum.arts.cuhk.edu.hk/Lexis/lexi-mf/dialectIndex.php?point=B",
        },
      },
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
        title: "Making a dough lotus",
        text: "At Jinan Cultural Center, practitioner Luo Sui teaches kneading, pinching and carving coloured dough into lotus flowers and koi. Small hand movements build the petals and scales: an everyday material becomes a miniature sculpture.",
        localityIds: ["jinan"],
        source: {
          title: "Jinan Cultural Center: dough figurine workshop",
          url: "https://english.jinan.gov.cn/col/col108306/art/2026/art_9d5adc9b9332497e97b69892401b9217.html",
        },
      },
      {
        title: "Life around the springs",
        text: "Spring water has been used for drinking, cooking and washing in Jinan. Baotu Spring and the spring-fed Daming Lake connect the city’s water system with its everyday public spaces.",
        localityIds: ["jinan"],
        source: S.springs,
      },
    ],
    resources: [
      {
        title: "Dough figurines in practice",
        description:
          "A local workshop documents tools, hand techniques and the maker teaching them.",
        localityIds: ["jinan"],
        kind: "Culture",
        url: "https://english.jinan.gov.cn/col/col108306/art/2026/art_9d5adc9b9332497e97b69892401b9217.html",
      },
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
        title: "A short closure at the end",
        text: "月 [yeʔ5] and 鼻 [piʔ5] end with [ʔ] in the CUHK reference. Close the vocal folds to stop the syllable; do not add a final vowel. Here 5 is the source’s short high checked-tone value.",
        localityIds: ["nanjing"],
        source: {
          title: "CUHK Chinese Character Database: Nanjing sound index",
          url: "https://humanum.arts.cuhk.edu.hk/Lexis/lexi-mf/dialectIndex.php?point=D",
        },
      },
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
        title: "Lanterns along the Qinhuai",
        text: "The Qinhuai Lantern Fair brings illuminated displays to the Confucius Temple area, Bailuzhou Park and the river. In 2025, its five exhibition zones also included Laomendong and Xiaoxihu, connecting streets, public spaces and water during the New Year season.",
        localityIds: ["nanjing"],
        source: {
          title: "Nanjing municipal government: Qinhuai Lantern Fair, 2025",
          url: "https://www.nanjing.gov.cn/bmdt/202501/t20250123_5064892.html",
        },
      },
      {
        title: "Weaving Yunjin brocade",
        text: "Two weavers work a large wooden loom to make patterned silk, sometimes with gold or peacock-feather thread. The craft passes on designs and coordinated handwork in Nanjing.",
        localityIds: ["nanjing"],
        source: S.brocade,
      },
    ],
    resources: [
      {
        title: "Qinhuai lanterns and their city setting",
        description:
          "Nanjing’s municipal account identifies the festival’s river and neighbourhood exhibition sites.",
        localityIds: ["nanjing"],
        kind: "Culture",
        url: "https://www.nanjing.gov.cn/bmdt/202501/t20250123_5064892.html",
      },
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
    words: chengduWords,
    soundNotes: [
      {
        title: "Say the whole local word",
        text: "倒拐 means turn, 铺盖 names a quilt, and 漏瓢 names a colander in Luo’s examples. These are whole lexical forms. The supplied segment strings omit tones, so use them to compare word shapes rather than to predict a spoken phrase.",
        localityIds: ["chengdu"],
        source: chengduLexicalSource,
      },
      {
        title: "Repeating a syllable can make a noun",
        text: "The source pairs 铲 ‘to shovel’ with 铲铲 ‘shovel’, and 揪 ‘pull’ with 揪揪 ‘braid’. Repetition can build a new word. This morphology table leaves pitch unmarked; its spellings are not a tone-sandhi exercise.",
        localityIds: ["chengdu"],
        source: chengduLexicalSource,
      },
      {
        title: "Four tones in Qin’s description",
        text: "Qin gives citation contours 45, 31, 53 and 213 for Chengdu’s four tones. They describe isolated forms in that study. Within a prosodic word, the first rising tone can become high level after another syllable.",
        localityIds: ["chengdu"],
        source: {
          title: "Zuxuan Qin: Prosodic Word in Chengdu Dialect, 2012",
          url: "https://www.isca-archive.org/speechprosody_2012/qin12_speechprosody.pdf",
        },
      },
      {
        title: "Listen for a longer first syllable",
        text: "In Qin’s spontaneous-speech material, a prosodic word normally starts with a longer syllable followed by shorter ones. Its boundaries also limit tone changes, so practising a whole phrase reveals patterns that isolated syllables miss.",
        localityIds: ["chengdu"],
        source: {
          title: "Zuxuan Qin: Prosodic Word in Chengdu Dialect, 2012",
          url: "https://www.isca-archive.org/speechprosody_2012/qin12_speechprosody.pdf",
        },
      },
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
        title: "Learning a balance of flavours",
        text: "UNESCO’s Chengdu entry describes combinations of sweet, sour, bitter, spicy and salty tastes. Its food culture includes public festivals, cookery training and cuisine research. A useful tasting exercise is to name each flavour separately before calling a dish simply “hot”.",
        localityIds: ["chengdu"],
        source: {
          title: "UNESCO Creative Cities Network: Chengdu",
          url: "https://www.unesco.org/en/creative-cities/chengdu",
        },
      },
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
        title: "Chengdu compounds and everyday words",
        description:
          "Luo’s 2022 dissertation includes local lexical examples. Pages 117–119 supply the segment-only word collection here.",
        localityIds: ["chengdu"],
        kind: "Study",
        url: chengduLexicalSource.url,
      },
      {
        title: "Chengdu phrase rhythm and tone changes",
        description:
          "A four-page study shows how speech rhythm and tone changes align within prosodic words.",
        localityIds: ["chengdu"],
        kind: "Study",
        url: "https://www.isca-archive.org/speechprosody_2012/qin12_speechprosody.pdf",
      },
      {
        title: "Chengdu’s food culture",
        description:
          "UNESCO documents the city’s cuisine, public participation and culinary education.",
        localityIds: ["chengdu"],
        kind: "Culture",
        url: "https://www.unesco.org/en/creative-cities/chengdu",
      },
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
    words: [...guangzhouWords, ...hongKongWords, ...hongKongIpaWords],
    soundNotes: [
      {
        title: "Keep the final consonant distinct",
        text: "Canton 三 [sam55] and 山 [san55] hold the vowel and pitch steady while the final nasal changes. Compare lips together for [m] with the tongue tip touching behind the upper teeth for [n].",
        localityIds: ["guangzhou"],
        source: guangzhouLexicalSource,
      },
      {
        title: "A short syllable still has a tone",
        text: "The Canton table writes 一 [jɐt55], 八 [pat33] and 十 [sɐp22]. Their final stops close the syllables; the pitch values still differ. The digits here are printed contours, not Jyutping categories.",
        localityIds: ["guangzhou"],
        source: guangzhouLexicalSource,
      },
      {
        title: "Canton tone contrasts are changing",
        text: "The PolyU study tests production and perception in Canton. It documents speakers merging the mid and low level tones, with differences between speaking and listening. Preserve the speaker and study context instead of declaring one merged inventory for the whole city.",
        localityIds: ["guangzhou"],
        source: {
          title: "PolyU: Tone merger in Guangzhou Cantonese, 2012",
          url: "https://theses.lib.polyu.edu.hk/handle/200/6794",
        },
      },
      {
        title: "Compare the quality of the voice",
        text: "A study of 191 speakers examines Hong Kong and Canton across three age groups. It investigates phonation—the way the vocal folds vibrate—in addition to consonants, vowels and tones. Accent differences can involve this voice quality even when a phoneme chart is shared.",
        localityIds: ["guangzhou"],
        source: {
          title:
            "Roxana S. Y. Fung and Eugene Y. C. Wong: Voice quality in Hong Kong and Guangzhou Cantonese, 2023",
          url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10584129/",
        },
      },
      {
        title: "Keep final stops closed",
        text: "In Zee’s Hong Kong reference, 濕 [sɐp˥] and 叔 [sʊk˥] end in unreleased stops. Finish the syllable with the lips or tongue still closing the airflow. Their short checked syllables contrast with open syllables such as 花 [fa˥].",
        localityIds: ["hong-kong"],
        source: {
          title: "Eric Zee: Chinese (Hong Kong Cantonese), 1991",
          url: "https://doi.org/10.1017/S0025100300006058",
        },
      },
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
        text: "The corpus description distinguishes a high falling 53 contour in Canton speech from the high level 55 favoured by many younger Hong Kong speakers. Age, speaker and locality matter when comparing tone inventories.",
        localityIds: ["guangzhou", "hong-kong"],
        source: S.corpus,
      },
    ],
    culture: [
      {
        title: "Canton embroidery",
        text: "Canton embroidery belongs to the Pearl River Delta craft tradition. Museum objects supply patterns for studying composition, colour and stitches, while makers reproduce older pieces to learn their techniques. Canton embroidery and Chaoshan embroidery are distinct traditions within the broader Yue embroidery label.",
        localityIds: ["guangzhou"],
        source: {
          title: "Guangzhou culture bureau: Canton embroidery, 2024",
          url: "https://wglj.gz.gov.cn/xxgk/qt/rdjyzxta/zxta/content/post_9744566.html",
        },
      },
      {
        title: "Pulling milk tea",
        text: "Hong Kong milk-tea makers mix black teas, brew them through a cloth bag and pour the tea between metal pots before adding milk. The heritage record describes variations between makers in the blend and brewing process; there is no single fixed recipe.",
        localityIds: ["hong-kong"],
        source: {
          title: "Hong Kong Memory: Milk-tea ingredients, tools and brewing",
          url: "https://slscdn.hkmemory.hk/en/collections-ichhk_ii-hong_kong_style_milk_tea_making_technique-ingredients_utensils_and_brewing_process.html",
        },
      },
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
        title: "Canton word comparisons",
        description:
          "Table 5 on page 206 identifies Canton separately from Meixian, Amoy and Suzhou. It supplies the 12 Canton readings here.",
        localityIds: ["guangzhou"],
        kind: "Study",
        url: guangzhouLexicalSource.url,
      },
      {
        title: "Canton tone merger",
        description:
          "An experimental study of tone production, perception and changing contrasts in Canton.",
        localityIds: ["guangzhou"],
        kind: "Study",
        url: "https://theses.lib.polyu.edu.hk/handle/200/6794",
      },
      {
        title: "Canton and Hong Kong voice quality",
        description:
          "A study with 191 speakers tests accent and age differences through acoustic measures.",
        localityIds: ["guangzhou", "hong-kong"],
        kind: "Study",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10584129/",
      },
      {
        title: "Hong Kong IPA illustration",
        description:
          "Zee’s consonant and vowel examples, checked against the journal’s published errata.",
        localityIds: ["hong-kong"],
        kind: "Study",
        url: "https://doi.org/10.1017/S0025100300006058",
      },
      {
        title: "How milk tea is made",
        description:
          "Photographs and a step-by-step account of the tools, blend and pouring technique.",
        localityIds: ["hong-kong"],
        kind: "Culture",
        url: "https://slscdn.hkmemory.hk/en/collections-ichhk_ii-hong_kong_style_milk_tea_making_technique-ingredients_utensils_and_brewing_process.html",
      },
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
        title: "One letter, two positions",
        text: "The dictionary’s 切 example is written tɛt33 in its simplified notation. Its key explicitly distinguishes the first t, an aspirated [tʰ], from the final t, an unreleased [t̚]. Position determines how to read these symbols.",
        localityIds: ["taishan"],
        source: {
          title: "Taishanese Dictionary: transcription conventions",
          url: "https://taishandict.com/transcription.html",
        },
      },
      {
        title: "Toishan needs its own readings",
        text: "Cheng compares Toishan and Cantonese phonology while noting that the two are not entirely mutually intelligible. A shared character or membership in Yue does not establish the same pronunciation.",
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
        title: "Fushi’s floating-colour procession",
        text: "In Fushi village, Doushan town within Toishan, makers build frames and props, prepare costumes and train the young performers carried in floating-colour tableaux. Scenes draw on dramatic stories such as Mulan and the Moon Goddess. This is a specific village tradition, not a practice attributed to every Toishan resident.",
        localityIds: ["taishan"],
        source: {
          title:
            "Jiangmen culture bureau: Fushi floating-colour craft and its practitioners",
          url: "https://www.jiangmen.gov.cn/jmwgj/gkmlpt/content/3/3379/post_3379654.html",
        },
      },
      {
        title: "Letters that carried money home",
        text: "The Wuyi region’s 銀信 combined family correspondence with remittances. The UNESCO archive preserves messages, receipts and account books linking emigrants with home. This regional history includes communities beyond Toishan.",
        localityIds: ["taishan"],
        source: S.letters,
      },
    ],
    resources: [
      {
        title: "Fushi procession craft",
        description:
          "The culture bureau documents the frame-making, costume work and training behind local floating-colour performances.",
        localityIds: ["taishan"],
        kind: "Culture",
        url: "https://www.jiangmen.gov.cn/jmwgj/gkmlpt/content/3/3379/post_3379654.html",
      },
      {
        title: "Taishanese dictionary and recordings",
        description:
          "A community word dictionary with audio. Read the transcription key and retain the variety information attached to each entry.",
        localityIds: ["taishan"],
        kind: "Dictionary",
        url: "https://taishandict.com/",
      },
      {
        title: "Toishan phonology",
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
        title: "Older brother: address or reference",
        text: "The study distinguishes 哥 [ko54], often used in direct address, from 兄 [uɛŋ54], used when referring to an older brother. Pronunciation practice should keep this difference in use alongside the sound.",
        localityIds: ["yulin"],
        source: {
          title: "Wenmin Hu: Yulin kinship terminology, 2020",
          url: "https://pressto.amu.edu.pl/index.php/linpo/article/view/linpo-2020-0001",
        },
      },
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
        title: "Yulin niuba in the heritage record",
        text: "The municipal heritage inventory lists 玉林牛巴, the local beef snack, under traditional craft skills, with Yuzhou’s cultural centre among its responsible institutions. ",
        localityIds: ["yulin"],
        source: {
          title: "Yulin Mass Art Center: first municipal heritage inventory",
          url: "https://m.ylsqzysg.com/nd.jsp?groupId=0&id=85&mid=425",
        },
      },
      {
        title: "Family relationships in words",
        text: "The Yuzhou and Fumian material distinguishes a father’s older brother, a mother’s brother and other relatives. Direct address and talking about someone can use different forms. Family vocabulary carries social relationships as well as pronunciation.",
        localityIds: ["yulin"],
        source: S.yulin,
      },
    ],
    resources: [
      {
        title: "Yulin’s local heritage inventory",
        description:
          "The municipal list places niuba alongside music, stories, crafts and other local practices.",
        localityIds: ["yulin"],
        kind: "Culture",
        url: "https://m.ylsqzysg.com/nd.jsp?groupId=0&id=85&mid=425",
      },
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
