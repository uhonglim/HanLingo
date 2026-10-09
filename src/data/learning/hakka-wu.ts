import type { AttestedWord, BranchLearning, LearningSource } from "./types";
import { groupPhotos } from "../photography";

const source = (title: string, url: string): LearningSource => ({ title, url });
const meixian = source(
  "Cheung: Vowels and tones in Meixian Hakka, Table 2.1, p. 19",
  "https://lbms03.cityu.edu.hk/theses/c_ftt/phd-ctl-b40860632f.pdf#page=36",
);
const lufeng = source(
  "Lü Wan-yun: Lufeng fieldwork, August 2007, pp. 106–107",
  "https://cloud.hakka.gov.tw/Attachment/1/84178533971.pdf#page=106",
);
const changting = source(
  "Lin Hui-shan: Changting Hakka Tone Sandhi, 2007",
  "https://toaj.stpi.niar.org.tw/index/journal/volume/article/4b1141f987fa79a3018808aead6d1f34",
);
const shanghai = source(
  "Chen & Gussenhoven: Shanghai Chinese, 2015, pp. 322–328",
  "https://www.cambridge.org/core/services/aop-cambridge-core/content/view/E58F14205E5EFF63067C6A180DB7AEEA/S0025100315000043a.pdf/div-class-title-shanghai-chinese-div.pdf",
);
const wenzhou = source(
  "Scholz: Wenzhou Chinese, 2012, Chapter 2",
  "https://www.lotpublications.nl/Documents/305_fulltext.pdf",
);
const lishui = source(
  "Lan, Chen & Zhang: An acoustic study of tone sandhi in Lishui Wu, 2023",
  "https://www.internationalphoneticassociation.org/icphs-proceedings/ICPhS2023/full_papers/542.pdf",
);
const lishuiWordSource = source(
  "Phil Rose: Dialect-geographical Acoustic-Tonetics, Interspeech 2018, p. 2735",
  "https://www.isca-archive.org/interspeech_2018/rose18_interspeech.pdf#page=3",
);
const suzhou = source(
  "Feng: Fricative vowels in Suzhou Chinese, 2007",
  "https://www.icphs2007.de/conference/Papers/1321/1321.pdf",
);
const hakkaHouse = source(
  "Nankou town: Qiaoxiang village and its houses",
  "https://www.gdmx.gov.cn/mzmxnkzzf/gkmlpt/content/2/2868/post_2868836.html",
);
const hailuTea = source(
  "Shanwei: Salted tea in Haifeng and Lufeng",
  "https://www.shanwei.gov.cn/shanwei/swly/swtc/content/post_599056.html",
);
const changtingCulture = source(
  "Fujian: Life in Changting old town",
  "https://www.fujian.gov.cn/zwgk/ztzl/sxzygwzxsgzx/sdjj/wvjj/202307/t20230722_6211821.htm",
);
const pingtan = source(
  "Suzhou Cultural Affairs: Pingtan performance and teaching",
  "https://wglj.suzhou.gov.cn/szwhgdhlyj/gzdt/202401/1fc34dcbcb8140889803a00bb838b618.shtml",
);
const kunqu = source(
  "UNESCO: Kun Qu opera",
  "https://ich.unesco.org/en/RL/kun-qu-opera-00004",
);
const printing = source(
  "UNESCO: Wooden movable-type printing of China",
  "https://ich.unesco.org/en/USL/wooden-movable-type-printing-of-china-00322",
);
const weir = source(
  "Lishui Cultural Heritage Office: Tongji Weir",
  "https://www.lishui.gov.cn/art/2020/3/30/art_1229268129_56275281.html",
);

function words(
  localityId: string,
  entries: [string, string, string, string][],
  source: LearningSource,
  reading: string,
  note: string,
  toneNotation: AttestedWord["toneNotation"] = "pitch-contour",
): AttestedWord[] {
  return entries.map(([id, han, english, ipa]) => ({
    id: `${localityId}-${id}`,
    han,
    english,
    ipa,
    localityId,
    toneNotation,
    reading,
    registerLabel:
      localityId === "haifeng"
        ? "Haifeng Hakka survey · segments only"
        : undefined,
    note,
    source,
  }));
}

// CUHK character readings: pitch numbers are those printed by this source,
// not tone-category numbers or predictions from another locality.
function cuhkWords(
  localityId: string,
  entries: [string, string, string][],
): AttestedWord[] {
  return entries.map(([han, english, ipa]) => ({
    id: `${localityId}-cuhk-${han.codePointAt(0)}`,
    han,
    english,
    ipa: `[${ipa}]`,
    localityId,
    toneNotation: "pitch-contour",
    reading: "Dictionary character reading",
    note: "CUHK locality-column reading. These are isolated character pronunciations, not a guarantee that a character is used alone as an everyday word. Pitch values follow this dictionary and may differ from other speaker samples. The source’s ȵ and syllabic marks are retained; affricate ligatures are expanded with IPA tie bars.",
    source: source(
      "CUHK Multi-function Chinese Character Database: " + han,
      "https://humanum.arts.cuhk.edu.hk/Lexis/lexi-mf/dialect.php?word=" +
        encodeURIComponent(han),
    ),
  }));
}

const depthWords: Record<string, AttestedWord[]> = {
  meixian: cuhkWords("meixian", [
    ["山", "mountain", "san44"],
    ["水", "water", "sui31"],
    ["米", "rice", "mi31"],
    ["手", "hand", "su31"],
    ["魚", "fish", "n̍11"],
    ["肉", "meat", "ŋiuk1"],
    ["飯", "cooked rice", "fan53"],
    ["天", "sky", "tʰien44"],
    ["地", "ground", "tʰi53"],
    ["日", "sun; day", "ŋit1"],
    ["月", "moon", "ŋiat5"],
    ["火", "fire", "fo31"],
    ["風", "wind", "fuŋ44"],
    ["花", "flower", "fa44"],
    ["狗", "dog", "keu31"],
    ["牛", "ox", "ŋiu11"],
    ["貓", "cat", "miau53"],
    ["雞", "chicken", "ke44"],
    ["門", "door", "mun11"],
    ["白", "white", "pʰak5"],
    ["黑", "black", "het1"],
    ["大", "big", "tʰai53"],
    ["小", "small", "siau31"],
    ["多", "many", "to44"],
    ["來", "come", "loi11"],
    ["去", "go", "hi53"],
    ["好", "good", "hau31"],
  ]),
  shanghai: cuhkWords("shanghai", [
    ["山", "mountain", "se53"],
    ["米", "rice", "mi13"],
    ["手", "hand", "sɤ35"],
    ["肉", "meat", "ȵioʔ1"],
    ["飯", "cooked rice", "ve13"],
    ["天", "sky", "tʰi53"],
    ["地", "ground", "di13"],
    ["火", "fire", "hu35"],
    ["風", "wind", "foŋ53"],
    ["狗", "dog", "kɤ35"],
    ["牛", "ox", "ȵiɤ13"],
    ["雞", "chicken", "t͡ɕi53"],
    ["門", "door", "məŋ13"],
    ["白", "white", "baʔ1"],
    ["黑", "black", "həʔ5"],
    ["紅", "red", "ɦoŋ13"],
    ["小", "small", "ɕiɔ35"],
    ["多", "many", "tu53"],
    ["來", "come", "le13"],
    ["好", "good", "hɔ35"],
    ["你", "you", "ni53"],
  ]),
  wenzhou: cuhkWords("wenzhou", [
    ["山", "mountain", "sa33"],
    ["米", "rice", "mei35"],
    ["手", "hand", "ɕɤu35"],
    ["魚", "fish", "ŋøy31"],
    ["飯", "cooked rice", "va22"],
    ["天", "sky", "tʰi33"],
    ["地", "ground", "dei22"],
    ["月", "moon", "ȵy213"],
    ["火", "fire", "fu35"],
    ["風", "wind", "hoŋ33"],
    ["花", "flower", "ho33"],
    ["狗", "dog", "kau35"],
    ["白", "white", "ba213"],
    ["黑", "black", "he213"],
    ["小", "small", "ɕiɛ35"],
    ["多", "many", "tɤu33"],
    ["好", "good", "hɜ35"],
    ["我", "I; me", "ŋ̍35"],
    ["你", "you", "ȵi35"],
  ]),
  suzhou: words(
    "suzhou",
    [
      ["this", "斯", "this", "[sɿ44]"],
      ["book", "書", "book", "[sʮ44]"],
      ["clothes", "衣", "clothes", "[i44]"],
      ["winding", "迂", "winding", "[y44]"],
      ["husband", "夫", "husband", "[fu44]"],
      ["smoke", "煙", "smoke", "[ɪ44]"],
      ["excellent", "優", "excellent", "[ʏ44]"],
      ["safety", "安", "safety", "[ø44]"],
      ["sadness", "哀", "sadness", "[ɛ44]"],
      ["fork", "丫", "fork; branch junction", "[o44]"],
      ["fold", "拗", "fold", "[æ44]"],
      ["in-turn", "挨", "in turn", "[ɑ44]"],
      ["grace", "恩", "grace", "[ən44]"],
      ["water-spinach", "蕹", "water spinach", "[oŋ44]"],
      ["cherry", "櫻", "cherry", "[ã44]"],
      ["dirty", "骯", "dirty", "[ɑ̃44]"],
      ["check", "遏", "check; restrain", "[əʔ5]"],
      ["evil", "惡", "evil", "[oʔ5]"],
      ["duck", "鴨", "duck", "[aʔ5]"],
      ["press", "壓", "press", "[ɑʔ5]"],
    ],
    source(
      "Ling Feng: A phonetic study of the vowel system in Suzhou Chinese, Tables 2-1 and 3-1 (2009)",
      "https://lbms03.cityu.edu.hk/theses/c_ftt/phd-ctl-b39479298f.pdf#page=34",
    ),
    "Vowel-study character reading",
    "Metropolitan Suzhou speakers in their fifties; word tables on pp. 14 and 74. The author’s broad transcription, including sinological apical-vowel symbols ɿ and ʮ, is retained. 44 and 5 are pitch values. These elicitation characters are not all independent everyday words.",
  ),
  haifeng: words(
    "haifeng",
    [
      ["cup", "杯", "cup", "[pui]"],
      ["eight", "八", "eight", "[pat]"],
      ["hundred", "百", "hundred", "[pak]"],
      ["plum", "梅", "plum", "[moi]"],
      ["tail", "尾", "tail", "[mui]"],
      ["mosquito", "蚊", "mosquito", "[mun]"],
      ["ash", "灰", "ash", "[foi]"],
      ["rice-plant", "禾", "rice plant", "[vo]"],
      ["house", "屋", "house", "[vuk]"],
      ["push", "推", "push", "[tʰui]"],
      ["soup", "湯", "soup", "[tʰoŋ]"],
      ["thunder", "雷", "thunder", "[lui]"],
      ["egg", "卵", "egg", "[lon]"],
      ["boat", "船", "boat", "[ʃon]"],
      ["cloud", "雲", "cloud", "[ʒun]"],
      ["leaf", "葉", "leaf", "[ʒiap]"],
      ["song", "歌", "song", "[ko]"],
      ["chicken", "雞", "chicken", "[kai]"],
      ["mouth", "口", "mouth", "[kʰeu]"],
      ["goose", "鵝", "goose", "[ŋo]"],
      ["day", "日", "sun; day", "[ŋit]"],
      ["tea", "茶", "tea", "[tsʰa]"],
      ["dog", "狗", "dog", "[keu]"],
      ["head", "頭", "head", "[tʰeu]"],
    ],
    source(
      "Chang Wei-min: On the dialectal variations in Haifeng Hakka, pp. 30–31 (2008)",
      "https://cloud.hakka.gov.tw/Attachment/1/921210533771.pdf#page=45",
    ),
    "Haifeng Hakka survey · segments only",
    "Guangdong Haifeng Hakka examples from the consonant and vowel tables, not Taiwan Hailu. The chapter surveys Pingdong, Huangqiang and Xikeng rather than one county-seat accent; their tone values differ. Tones are deliberately omitted here, so these are sound-shape examples, not complete pronunciations to imitate.",
    "unspecified",
  ),
};

export const hakkaWuLearning: BranchLearning[] = [
  {
    branchId: "hakka/yuetai",
    words: [
      ...depthWords.meixian,
      ...words(
        "meixian",
        [
          ["tea", "茶", "tea", "[tsʰa11]"],
          ["car", "車", "car", "[tsʰa33]"],
          ["rain", "雨", "rain", "[i41]"],
          ["one", "一", "one", "[it41]"],
          ["seven", "七", "seven", "[tsʰit41]"],
          ["wing", "翼", "wing", "[it55]"],
          ["tongue", "舌", "tongue", "[sat55]"],
          ["rice-cake", "糍", "glutinous rice cake", "[tsʰi11]"],
          ["take", "取", "take", "[tsʰi41]"],
          ["pull", "扯", "pull", "[tsʰa41]"],
          ["come-out", "出", "come out", "[tsʰut41]"],
          ["summer-heat", "暑", "hot weather", "[tsʰu41]"],
        ],
        meixian,
        "Citation reading",
        "Meijiang speakers, aged 50–70 in the study. Broad IPA and pitch values follow Table 2.1; this is not a Taiwan Sixian reading.",
      ),
    ],
    soundNotes: [
      {
        title: "Fish without a vowel",
        text: "CUHK records 魚 as [n̍11] in its Meixian column. The vertical mark makes the nasal syllabic: the nasal itself carries the syllable. Keep this dictionary reading separate from the Meijiang speaker sample used elsewhere on this page.",
        localityIds: ["meixian"],
        source: {
          title:
            "CUHK Multi-function Chinese Character Database: locality readings",
          url: "https://humanum.arts.cuhk.edu.hk/Lexis/lexi-mf/dialect.php?word=%E5%B1%B1",
        },
      },

      {
        title: "Tea and a car",
        text: "茶 [tsʰa11] and 車 [tsʰa33] have the same consonant and vowel here. The pitch distinguishes them: 11 is low and 33 is mid. Read each as one syllable.",
        localityIds: ["meixian"],
        source: meixian,
      },
      {
        title: "Keep the final stop",
        text: "一 [it41] and 翼 [it55] end in [t]. The study describes this final stop as unreleased: close the syllable without adding a vowel. These shorter syllables also contrast in pitch.",
        localityIds: ["meixian"],
        source: meixian,
      },
    ],
    culture: [
      {
        title: "Mountain songs from Songkou",
        text: "Songkou in Meixian has a documented Hakka mountain-song tradition built around four-line song forms, with narrative singing at different speeds. Listen for the phrasing of a performed verse: sung melody is not a substitute for a spoken tone recording.",
        localityIds: ["meixian"],
        source: {
          title: "Guangdong Cultural Centre: Songkou Hakka mountain songs",
          url: "https://www.gd.gov.cn/zjgd/lnwh/fywh/ctyy/content/post_157920.html",
        },
      },

      {
        title: "Courtyards and curved houses",
        text: "Qiaoxiang village in Nankou, Meixian, preserves large Hakka houses, including the curved compounds called 圍龍屋. The buildings connect family history with migration overseas and return visits.",
        localityIds: ["meixian"],
        source: hakkaHouse,
      },
    ],
    resources: [
      {
        title: "Meixian character readings",
        description:
          "Choose the Meixian row to compare isolated character readings. The database prints source pitch values.",
        localityIds: ["meixian"],
        kind: "Dictionary",
        url: "https://humanum.arts.cuhk.edu.hk/Lexis/lexi-mf/dialect.php?word=%E5%B1%B1",
      },

      {
        title: "Meixian vowels and tones",
        description:
          "Acoustic study with word tables, vowel measurements, and connected-speech comparisons. The sampled speakers grew up in Meijiang.",
        localityIds: ["meixian"],
        kind: "Study",
        url: meixian.url,
      },
      {
        title: "Taiwan Hakka dictionary",
        description:
          "Search words and recordings in the dictionary’s named Taiwan varieties. Select the variety explicitly; its Sixian entries are comparative material, not Meixian recordings.",
        localityIds: [],
        scope: "branch-comparison",
        kind: "Dictionary",
        url: "https://hakkadict.moe.edu.tw/",
      },
      {
        title: "Qiaoxiang village",
        description:
          "A local account of the houses and overseas family connections of Nankou, Meixian.",
        localityIds: ["meixian"],
        kind: "Culture",
        url: hakkaHouse.url,
      },
    ],
  },
  {
    branchId: "hakka/hailu",
    words: [
      ...depthWords.haifeng,
      ...words(
        "lufeng",
        [
          ["younger-brother", "老弟", "younger brother", "[lau11 tʰai53]"],
          ["younger-sister", "老妹", "younger sister", "[lau11 moi22]"],
          ["loach", "湖鰍", "loach", "[pʰui55 tsʰiu53]"],
          ["lightning", "火蛇", "lightning", "[fo11 ʃa55]"],
          ["riverbank", "坑邊", "riverbank", "[haŋ53 pen53]"],
          ["embankment", "坑剝", "river embankment", "[haŋ53 pok13]"],
          ["asphalt-road", "瀝青路", "asphalt road", "[lit32 tsʰiaŋ53 lu22]"],
          ["dust", "塵灰", "dust", "[tsʰin55 foi53]"],
          ["stream", "坑壢", "stream", "[haŋ53 lak32]"],
          ["tunnel", "涵孔", "tunnel", "[ham55 kʰuŋ53]"],
          ["straw-ash", "禾槁灰", "rice-straw ash", "[vo55 kau11 foi53]"],
          ["earthworm", "蟲憲", "earthworm", "[tʃʰuŋ55 kʰien13]"],
          ["cricket", "土猴", "cricket", "[tʰu11 heu13]"],
          ["firefly", "火焰蟲", "firefly", "[fo11 ʒiam11 tʃʰuŋ55]"],
          ["chimney", "煙囪", "chimney", "[an53 tʰuŋ13]"],
          ["chopstick-holder", "箸簍", "chopstick holder", "[tʃʰu11 lui13]"],
          ["aunt", "阿嬸", "aunt", "[a11 sim13]"],
          ["son-in-law", "阿郎", "son-in-law", "[a11 loŋ13]"],
          ["weather", "天時", "weather", "[tʰen53 ʃi55]"],
          ["terraced-field", "山田", "terraced field", "[son53 tʰen55]"],
          ["noon", "當晝心", "noon", "[toŋ53 tʃiu11 sim53]"],
        ],
        lufeng,
        "Fieldwork reading",
        "Guangdong Lufeng column, August 2007. Source aspiration marks are normalized to IPA ʰ. The report does not identify a single town for this table; do not generalize it to all Lufeng or Taiwan Hailu.",
      ),
    ],
    soundNotes: [
      {
        title: "Three Haifeng Hakka towns",
        text: "Chang’s survey distinguishes Pingdong, Huangqiang and Xikeng. Their corresponding tone categories can have different pitch shapes. The shared consonant-and-vowel examples here omit tones; a complete reading needs a named town and its recorded tone.",
        localityIds: ["haifeng"],
        source: {
          title:
            "Chang Wei-min: Haifeng Hakka variation, pp.30–35 and 172–173 (2008)",
          url: "https://cloud.hakka.gov.tw/Attachment/1/921210533771.pdf",
        },
      },
      {
        title: "Rain, water and rain falling",
        text: "The Haifeng Huangqiang and Xikeng columns use 雨 for rain. The study separately notes 落水 for rain falling, while the surveyed Hsinchu localities use 水 for rain itself. Learn the whole expression rather than replacing every occurrence of “rain” with one character.",
        localityIds: ["haifeng"],
        source: {
          title:
            "Chang Wei-min: Haifeng Hakka variation, pp.30–35 and 172–173 (2008)",
          url: "https://cloud.hakka.gov.tw/Attachment/1/921210533771.pdf",
        },
      },
      {
        title: "Lightning has a local name",
        text: "The Guangdong Lufeng table records 火蛇, literally “fire snake”, for lightning. It also records 湖鰍 for loach with initial [pʰ]. Both the word choice and its consonants matter; the Taiwan comparison column is a separate reading.",
        localityIds: ["lufeng"],
        source: {
          title: "Lü Wan-yun: Guangdong Lufeng fieldwork, pp.106–107",
          url: "https://cloud.hakka.gov.tw/Attachment/1/84178533971.pdf#page=106",
        },
      },

      {
        title: "Lufeng and Taiwan Hailu",
        text: "The 2007 comparison records 老弟 with [lau] in Guangdong Lufeng and [lo] in Hsinchu. A shared Hailu name does not make the two pronunciations identical. Compare the locality columns before learning a form.",
        localityIds: ["lufeng", "haifeng"],
        source: lufeng,
      },
      {
        title: "Listen for aspiration",
        text: "The Lufeng forms 老弟 [lau11 tʰai53] and 湖鰍 [pʰui55 tsʰiu53] contain aspirated consonants. IPA ʰ marks the air released after the closure; HanLingo writes that aspiration with h.",
        localityIds: ["lufeng"],
        source: lufeng,
      },
    ],
    culture: [
      {
        title: "Making and dancing a qilin",
        text: "Haifeng’s qilin dance combines a crafted animal head, two dancers, percussion and martial-arts routines. Bamboo strips form the head beneath layers of paper and paint. This is a tradition of the multilingual Haifeng area, not evidence of one uniform Hakka-speaking community.",
        localityIds: ["haifeng"],
        source: {
          title: "Shanwei: Haifeng qilin dance",
          url: "https://www.shanwei.gov.cn/shanwei/swly/yswh/content/post_1103646.html",
        },
      },
      {
        title: "Stories behind a lit screen",
        text: "Lufeng shadow theatre brings cut figures, moving shadows and live performers together. Its local troupe also teaches puppet-making alongside performances. The stage tradition belongs to Lufeng’s cultural landscape; its performance language should not be assumed to match the Hakka fieldwork words.",
        localityIds: ["lufeng"],
        source: {
          title: "Shanwei Cultural Affairs: Lufeng shadow theatre",
          url: "https://www.shanwei.gov.cn/swwgltj/zhengwu/0800/0801/content/post_1146498.html",
        },
      },

      {
        title: "A bowl of salted tea",
        text: "In Haifeng and Lufeng, tea leaves are ground with ingredients such as peanuts, sesame, and mint, then mixed with hot water and salt. Bowls may include puffed rice. Sharing tea accompanies visits and family occasions across the region’s communities.",
        localityIds: ["haifeng", "lufeng"],
        source: hailuTea,
      },
    ],
    resources: [
      {
        title: "Haifeng Hakka: three surveyed towns",
        description:
          "Chang’s thesis distinguishes Pingdong, Huangqiang and Xikeng, with sound tables and Guangdong–Taiwan vocabulary comparisons.",
        localityIds: ["haifeng"],
        kind: "Study",
        url: "https://cloud.hakka.gov.tw/Attachment/1/921210533771.pdf",
      },

      {
        title: "Lufeng fieldwork and comparison",
        description:
          "Lü Wan-yun compares an 1897 document, modern Guangdong fieldwork, and Taiwan Hailu. The Guangdong word table begins on page 106.",
        localityIds: ["lufeng", "haifeng"],
        kind: "Study",
        url: lufeng.url,
      },
      {
        title: "Taiwan Hailu: pronunciation guide",
        description:
          "Ministry of Education introduction to Taiwan Hailu. Its consonants, seven tones, and sandhi rules describe Taiwan speech; use it for comparison with Guangdong.",
        localityIds: [],
        scope: "branch-comparison",
        kind: "Study",
        url: "https://language.moe.gov.tw/001/Upload/Files/site_content/M0001/hkknowledge/01/107_004_%E8%87%BA%E7%81%A3%E6%B5%B7%E9%99%B8%E8%85%94%E5%AE%A2%E5%AE%B6%E8%AA%9E%E7%B0%A1%E4%BB%8B.pdf",
      },
      {
        title: "Salted tea in Haifeng and Lufeng",
        description:
          "Preparation, hospitality, and local variations, documented by Shanwei’s public portal.",
        localityIds: ["haifeng", "lufeng"],
        kind: "Culture",
        url: hailuTea.url,
      },
    ],
  },
  {
    branchId: "hakka/tingzhou",
    words: [],
    soundNotes: [
      {
        title: "Five tones do not make one sandhi rule",
        text: "Lin’s comparison uses five citation-tone categories, then tests all 125 three-syllable category combinations. Some sequences change from left to right, others from right to left, and some require a separate analysis. The paper’s H, M and L labels describe tonal height, not HanLingo spelling.",
        localityIds: ["changting"],
        source: {
          title: "Lin Hui-shan: Changting Hakka Tone Sandhi, pp.177–188 (2007)",
          url: "https://thjcs.site.nthu.edu.tw/var/file/452/1452/img/1300/THJCS371-6.pdf",
        },
      },

      {
        title: "Learn the whole phrase",
        text: "Changting fieldwork compares words spoken alone, in pairs, and in three-syllable sequences. The same syllable can change tone with its neighbors, and the order of changes matters. An isolated reading cannot supply the pronunciation of a phrase.",
        localityIds: ["changting"],
        source: changting,
      },
      {
        title: "Chengguan is one reference",
        text: "The Chengguan study describes the county-seat variety and compares it with neighboring western Fujian Hakka varieties. Its consonant, vowel, and tone tables should be read as a local system, rather than a pronunciation key for every Tingzhou locality.",
        localityIds: ["changting"],
        source: source(
          "National Central University: Changting Chengguan Hakka",
          "https://etd.lib.ncu.edu.tw/detail/58397520cd865be401a7419ea86e6768/?seq=3",
        ),
      },
    ],
    culture: [
      {
        title: "Food in the old town",
        text: "Changting’s old streets bring together tofu shops, local snacks, and Hakka food traditions. Dried tofu is a documented local specialty; its production is listed among Fujian’s provincial heritage crafts.",
        localityIds: ["changting"],
        source: source(
          "Fujian: Provincial intangible cultural heritage list, item 104",
          "https://www.fujian.gov.cn/zwgk/zxwj/szfwj/202202/P020220209644631272136.pdf",
        ),
      },
      {
        title: "Along the Ting River",
        text: "Changting’s riverside old town combines surviving historic streets with everyday shops and homes. Explore it as a lived place, alongside the county-seat speech described in the linguistic studies.",
        localityIds: ["changting"],
        source: changtingCulture,
      },
    ],
    resources: [
      {
        title: "Changting tone sandhi",
        description:
          "Lin’s fieldwork examines single syllables and two- and three-syllable sequences. The open abstract explains the findings; downloading the article may require the site’s verification.",
        localityIds: ["changting"],
        kind: "Study",
        url: changting.url,
      },
      {
        title: "Changting Chengguan Hakka",
        description:
          "A locality-specific thesis covering the sound system, vocabulary, and comparisons with surrounding Hakka varieties.",
        localityIds: ["changting"],
        kind: "Study",
        url: "https://etd.lib.ncu.edu.tw/detail/58397520cd865be401a7419ea86e6768/?seq=3",
      },
      {
        title: "Changting old town",
        description:
          "Local food, architecture, and street life in a Fujian government feature.",
        localityIds: ["changting"],
        kind: "Culture",
        url: changtingCulture.url,
      },
    ],
  },
  {
    branchId: "wu/taihu",
    words: [
      ...depthWords.suzhou,
      ...depthWords.shanghai,
      ...words(
        "shanghai",
        [
          ["knife", "刀", "knife", "[tɔ51]"],
          ["island", "島", "island", "[tɔ35]"],
          ["peach", "桃", "peach", "[dɔ213]"],
          ["read", "讀", "read", "[dʊʔ213]"],
          ["low", "低", "low", "[ti51]"],
          ["melon", "瓜", "melon", "[ko51]"],
          ["tall", "高", "tall", "[kɔ51]"],
          ["street", "街", "street", "[ka51]"],
        ],
        shanghai,
        "Citation reading",
        "Broad segments from Chen & Gussenhoven. Contours follow their footnote 2 citation-tone notation, converted from tone letters to numbers. The reference speaker grew up in Huangpu; other speakers and studies differ.",
      ),
    ],
    soundNotes: [
      {
        title: "A character can have two readings",
        text: "CUHK labels Shanghai 花 [ho53] colloquial and [hua53] literary. These are usage layers within one locality, not different cities. A written character alone does not determine which reading fits a spoken expression.",
        localityIds: ["shanghai"],
        source: {
          title: "CUHK: 花, Shanghai locality column",
          url: "https://humanum.arts.cuhk.edu.hk/Lexis/lexi-mf/dialect.php?word=%E8%8A%B1",
        },
      },
      {
        title: "Hear the ending in duck",
        text: "Suzhou 鴨 [aʔ5] ends with a glottal stop, while 恩 [ən44] ends with a nasal. The vowel study places these words in separate syllable groups. Finish the closure without adding another vowel.",
        localityIds: ["suzhou"],
        source: {
          title: "Ling Feng: Suzhou vowels, pp.11,14,74 (2009)",
          url: "https://lbms03.cityu.edu.hk/theses/c_ftt/phd-ctl-b39479298f.pdf#page=34",
        },
      },
      {
        title: "Which Suzhou generation?",
        text: "Feng’s main sample consists of metropolitan Suzhou speakers in their fifties. The thesis discusses younger speakers’ merger of older [ts tsʰ s] before [i y] with [tɕ tɕʰ ɕ]. The word tables therefore represent a specified generation, not a timeless city standard.",
        localityIds: ["suzhou"],
        source: {
          title: "Ling Feng: Suzhou vowels, pp.11,14,74 (2009)",
          url: "https://lbms03.cityu.edu.hk/theses/c_ftt/phd-ctl-b39479298f.pdf#page=34",
        },
      },

      {
        title: "Tone belongs to the word",
        text: "In Shanghai, the first syllable can determine the pitch pattern across a tone unit. Learn a compound from its full recording rather than joining isolated syllable tones.",
        localityIds: ["shanghai"],
        source: shanghai,
      },
      {
        title: "Three consonant series",
        text: "Shanghai contrasts unaspirated, aspirated, and voiced-series stops. The voiced series may lack full voicing at the start of a tone unit, where phonation and pitch also cue the contrast. Between vowels, voicing is more apparent.",
        localityIds: ["shanghai"],
        source: shanghai,
      },
      {
        title: "Suzhou’s fricative vowels",
        text: "Some Suzhou vowels carry audible friction. Feng’s acoustic and articulatory study compares a fricative vowel with its plain close-vowel counterpart: the difference involves constriction and noise, not simply a different pitch.",
        localityIds: ["suzhou"],
        source: suzhou,
      },
    ],
    culture: [
      {
        title: "Huju: Shanghai on stage",
        text: "Huju draws on local Shanghai speech and folk-song traditions. Spoken dialogue, singing and changing theatrical styles make it a useful way to encounter the language in performance. A stage voice is a performance convention rather than a neutral pronunciation model.",
        localityIds: ["shanghai"],
        source: {
          title: "Shanghai Municipal Government: Baoshan cultural traditions",
          url: "https://www.shanghai.gov.cn/baoshan/index.html",
        },
      },
      {
        title: "Life around a shikumen doorway",
        text: "Shikumen houses connect stone-framed entrances with Shanghai’s lane neighborhoods. Huangpu preserves examples such as Shangxianfang and Bugao Li. Look beyond individual façades to the lanes, shared entrances and closely spaced homes.",
        localityIds: ["shanghai"],
        source: {
          title: "Shanghai Municipal Government: Huangpu cultural heritage",
          url: "https://www.shanghai.gov.cn/huangpu/index.html",
        },
      },

      {
        title: "Pingtan: stories with strings",
        text: "Suzhou Pingtan combines storytelling and song. Performers accompany themselves on the three-stringed sanxian and the pipa, with distinct singing styles passed between teachers and students.",
        localityIds: ["suzhou"],
        source: pingtan,
        photo: groupPhotos.wu,
      },
      {
        title: "Kunqu on stage",
        text: "Kunqu developed in Kunshan in the Suzhou region. Voice, movement, costume, and percussion work together in a stylized theatre tradition. Stage pronunciation is a performance convention; it is not a recording of casual Suzhou conversation.",
        localityIds: ["suzhou"],
        source: kunqu,
      },
    ],
    resources: [
      {
        title: "Suzhou vowel system: full dissertation",
        description:
          "Speaker scope, sound changes and the exact character tables used here. Includes acoustic and articulatory measurements.",
        localityIds: ["suzhou"],
        kind: "Study",
        url: "https://lbms03.cityu.edu.hk/theses/c_ftt/phd-ctl-b39479298f.pdf#page=34",
      },

      {
        title: "Shanghai Chinese: IPA illustration",
        description:
          "Sound-system description with a Huangpu-born reference speaker and references to the accompanying recordings. Tone values vary across descriptions.",
        localityIds: ["shanghai"],
        kind: "Study",
        url: shanghai.url,
      },
      {
        title: "Shanghai pronunciation lessons",
        description:
          "Zhu Yuhao’s community-authored tutorial. Its own spelling conventions are separate from HanLingo spelling.",
        localityIds: ["shanghai"],
        kind: "Study",
        url: "https://zhuyuhao.com/shanghainese-tutorial/",
      },
      {
        title: "Suzhou vowel study",
        description:
          "Articulatory measurements and word examples for fricative vowels in Suzhou speech.",
        localityIds: ["suzhou"],
        kind: "Study",
        url: suzhou.url,
      },
      {
        title: "Kunqu: UNESCO film and description",
        description:
          "Watch performance documentation and read about the tradition’s origins and stagecraft.",
        localityIds: ["suzhou"],
        kind: "Culture",
        url: kunqu.url,
      },
    ],
  },
  {
    branchId: "wu/oujiang",
    words: [
      ...depthWords.wenzhou,
      ...words(
        "wenzhou",
        [
          ["send", "派", "send; dispatch", "[pʰa42]"],
          ["dress-up", "扮", "dress up", "[pa42]"],
          ["arrange", "排", "arrange", "[ba31]"],
          ["too", "太", "too; excessively", "[tʰa42]"],
          ["belt", "帶", "belt", "[ta42]"],
          ["chat", "談", "talk; chat", "[da31]"],
          ["fast", "快", "fast", "[kʰa42]"],
          ["thick", "厚", "thick", "[ɡau24]"],
          ["tooth", "牙", "tooth", "[ŋu31]"],
          ["ox", "牛", "ox", "[ŋau31]"],
          ["door", "門", "door", "[maŋ31]"],
          ["face", "面", "face", "[mi11]"],
        ],
        wenzhou,
        "Citation reading",
        "Scholz’s 2012 description of young Lucheng speakers, pp. 15 and 20. Broad IPA and source pitch numbers are retained; these forms do not represent every age group or all Wenzhou districts.",
      ),
    ],
    soundNotes: [
      {
        title: "Short does not always mean a final stop",
        text: "In CUHK’s Wenzhou column, 白 [ba213] and 黑 [he213] belong to the historical entering-tone category but are printed without final [p], [t], [k] or [ʔ]. A historical tone-category name alone cannot tell you the modern ending.",
        localityIds: ["wenzhou"],
        source: {
          title: "CUHK: 白, Wenzhou locality column",
          url: "https://humanum.arts.cuhk.edu.hk/Lexis/lexi-mf/dialect.php?word=%E7%99%BD",
        },
      },

      {
        title: "One vowel, three beginnings",
        text: "派 [pʰa42], 扮 [pa42], and 排 [ba31] illustrate the three consonant series in the source. Aspiration separates [pʰ] from [p]; the voiced series also differs in tonal register and phonation.",
        localityIds: ["wenzhou"],
        source: wenzhou,
      },
      {
        title: "A nasal can be a syllable",
        text: "The velar nasal [ŋ] begins 牙 and ends 門. Scholz also records it as a complete syllable, without a vowel, in words such as 我. Do not insert a vowel just because English syllables usually have one.",
        localityIds: ["wenzhou"],
        source: wenzhou,
      },
    ],
    culture: [
      {
        title: "Ou crafts in Lucheng",
        text: "Lucheng collections bring together Ou embroidery, Ou relief sculpture, Ou ceramics and wood carving. Compare how a flower or figure is built from stitches, modeled material or carved wood. These crafts offer a different view of the city from its skyline.",
        localityIds: ["wenzhou"],
        source: {
          title: "Wenzhou: local crafts in Lucheng exhibition collections",
          url: "https://wzstb.wenzhou.gov.cn/art/2023/6/15/art_1234528_58902225.html",
        },
      },

      {
        title: "Printing a family history",
        text: "In Rui’an, within the wider Wenzhou area, craftspeople carve reusable wooden characters and arrange them to print clan genealogies. Printing equipment travels to ancestral halls. This is regional cultural context, distinct from the Lucheng pronunciation sample.",
        localityIds: ["wenzhou"],
        source: printing,
      },
    ],
    resources: [
      {
        title: "Wenzhou: sounds and connected speech",
        description:
          "Scholz’s open dissertation describes young Lucheng speakers, with IPA examples, tone patterns, and experiments on phrasing.",
        localityIds: ["wenzhou"],
        kind: "Study",
        url: wenzhou.url,
      },
      {
        title: "Wenzhou tone and phonation",
        description:
          "An experimental study of how pitch and voice quality contribute to the perception of Wenzhou tones.",
        localityIds: ["wenzhou"],
        kind: "Study",
        url: "https://www.isca-archive.org/tal_2012/xu12c_tal.pdf",
      },
      {
        title: "Wooden movable-type printing",
        description:
          "UNESCO documentation and film about the craft in Rui’an, Wenzhou.",
        localityIds: ["wenzhou"],
        kind: "Culture",
        url: printing.url,
      },
    ],
  },
  {
    branchId: "wu/chuqu",
    words: words(
      "lishui",
      [["east-wind", "東風", "east wind", "[tʊŋ44 fʊŋ323]"]],
      lishuiWordSource,
      "Whole-word tone-sandhi example · Rose 2018",
      "The source supplies the Lishui compound’s segments and 44.323 pitch pattern together. These are the tones within this word, not isolated readings to reuse in other phrases. This is an attested example, not a rule for every speaker.",
    ),
    soundNotes: [
      {
        title: "Follow the pitch across 東風",
        text: "Rose’s Lishui example 東風 [tʊŋ44 fʊŋ323] begins level and finishes with a dipping contour. The study transcribes this whole-word pattern directly. Keep it attached to the compound instead of applying it automatically to new words.",
        localityIds: ["lishui"],
        source: lishuiWordSource,
      },
      {
        title: "Real words and unfamiliar combinations",
        text: "The 2023 experiment compared familiar two-syllable words with newly assembled syllable pairs. The first syllable’s pitch depended on both the item and the speaker. Learning a familiar compound gives evidence that a tone chart by itself cannot provide.",
        localityIds: ["lishui"],
        source: {
          title: "Lan, Chen & Zhang: Lishui tone sandhi (2023)",
          url: "https://www.internationalphoneticassociation.org/icphs-proceedings/ICPhS2023/full_papers/542.pdf",
        },
      },

      {
        title: "Listen to both syllables",
        text: "Lishui tone sandhi is often described as right-dominant: the last syllable tends to keep its citation tone while the first changes. The 2023 study found variation across words and speakers, so a single automatic conversion rule would hide real differences.",
        localityIds: ["lishui"],
        source: lishui,
      },
      {
        title: "Liandu, not the whole prefecture",
        text: "The 2023 recordings come from eight speakers raised in Lishui’s main urban area, Liandu. Younger speakers’ phrase tones were closer to their isolated readings than those of older speakers. Keep locality and speaker generation with a pronunciation example.",
        localityIds: ["lishui"],
        source: lishui,
      },
    ],
    culture: [
      {
        title: "Green glaze from Longquan",
        text: "In Longquan, within the wider Lishui prefecture, celadon makers repeatedly heat and cool glazed vessels to control their surface and color. Recipes and kiln judgment pass through families and apprenticeships. This is regional craft context; Longquan speech is distinct from the urban Liandu sample.",
        localityIds: ["lishui"],
        source: {
          title: "UNESCO: Traditional firing technology of Longquan celadon",
          url: "https://ich.unesco.org/en/RL/traditional-firing-technology-of-longquan-celadon-00205",
        },
      },

      {
        title: "Water through Tongji Weir",
        text: "Tongji Weir, southwest of central Lishui in Liandu, combines a dam, gates, channels, and a stone water bridge. Its irrigation system connects the landscape with farming and settlement. Nearby villages are cultural context, not evidence of identical urban pronunciation.",
        localityIds: ["lishui"],
        source: weir,
      },
    ],
    resources: [
      {
        title: "A Lishui compound with its pitch trace",
        description:
          "Rose’s study compares locality-specific compounds across Zhejiang. Page 2735 supplies 東風 with its full word-tone contour.",
        localityIds: ["lishui"],
        kind: "Study",
        url: lishuiWordSource.url,
      },
      {
        title: "Lishui tone sandhi: eight speakers",
        description:
          "A 2023 acoustic comparison of younger and older urban speakers, including citation tones and two-syllable words.",
        localityIds: ["lishui"],
        kind: "Study",
        url: lishui.url,
      },
      {
        title: "Lishui Wu: sound system and vocabulary",
        description:
          "William Steed’s 2010 thesis describes segments, citation tones, and two-syllable tone sandhi using three speakers.",
        localityIds: ["lishui"],
        kind: "Study",
        url: "https://openresearch-repository.anu.edu.au/items/69a0c01b-9f60-4eef-8e5d-cc0aed96accc",
      },
      {
        title: "Tongji Weir",
        description:
          "The Lishui Cultural Heritage Office’s description of the historic irrigation works in Liandu.",
        localityIds: ["lishui"],
        kind: "Culture",
        url: weir.url,
      },
    ],
  },
];
