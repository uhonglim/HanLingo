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
): AttestedWord[] {
  return entries.map(([id, han, english, ipa]) => ({
    id: `${localityId}-${id}`,
    han,
    english,
    ipa,
    localityId,
    toneNotation: "pitch-contour",
    reading,
    note,
    source,
  }));
}

export const hakkaWuLearning: BranchLearning[] = [
  {
    branchId: "hakka/yuetai",
    words: words(
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
    soundNotes: [
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
        title: "Courtyards and curved houses",
        text: "Qiaoxiang village in Nankou, Meixian, preserves large Hakka houses, including the curved compounds called 圍龍屋. The buildings connect family history with migration overseas and return visits.",
        localityIds: ["meixian"],
        source: hakkaHouse,
      },
    ],
    resources: [
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
    words: words(
      "lufeng",
      [
        ["younger-brother", "老弟", "younger brother", "[lau11 tʰai53]"],
        ["younger-sister", "老妹", "younger sister", "[lau11 moi22]"],
        ["loach", "湖鰍", "loach", "[pʰui55 tsʰiu53]"],
      ],
      lufeng,
      "Fieldwork reading",
      "Guangdong Lufeng column, August 2007. Source aspiration marks are normalized to IPA ʰ. The report does not identify a single town for this table; do not generalize it to all Lufeng or Taiwan Hailu.",
    ),
    soundNotes: [
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
        title: "A bowl of salted tea",
        text: "In Haifeng and Lufeng, tea leaves are ground with ingredients such as peanuts, sesame, and mint, then mixed with hot water and salt. Bowls may include puffed rice. Sharing tea accompanies visits and family occasions across the region’s communities.",
        localityIds: ["haifeng", "lufeng"],
        source: hailuTea,
      },
    ],
    resources: [
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
    words: words(
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
    soundNotes: [
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
    words: words(
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
    soundNotes: [
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
    words: [],
    soundNotes: [
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
        title: "Water through Tongji Weir",
        text: "Tongji Weir, southwest of central Lishui in Liandu, combines a dam, gates, channels, and a stone water bridge. Its irrigation system connects the landscape with farming and settlement. Nearby villages are cultural context, not evidence of identical urban pronunciation.",
        localityIds: ["lishui"],
        source: weir,
      },
    ],
    resources: [
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
