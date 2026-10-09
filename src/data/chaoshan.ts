import type { EncyclopediaEntry } from "./encyclopedia";
import type { MapPoint } from "./languages";

const classificationSource = {
  title:
    "You Rujie (2016): Language Contact and the Emergence of New Languages, §2",
  url: "https://xbzs.ecnu.edu.cn/CN/html/201601010.htm",
};

const namesSource = {
  title: "Brandon Seah: Learn Teochew — place names and regional context",
  url: "https://learnteochew.com/pages/introduction.html",
};

const clusterNameSource = {
  title: "Teo Swa General Association of New Zealand: community name",
  url: "https://www.csga.co.nz/about-us/",
};

/** Approximate city anchors, not linguistic boundaries or survey locations. */
export const chaoshanPoints: MapPoint[] = [
  {
    id: "chaozhou",
    name: "Teochew",
    nativeName: "潮州",
    coordinates: [116.6323, 23.6618],
    groupId: "min",
    subgroupId: "southern-min",
    hierarchy: [
      "Sinitic",
      "Min",
      "Southern Min",
      "Chaoshan cluster",
      "Teochew",
    ],
  },
  {
    id: "shantou",
    name: "Swatow",
    nativeName: "汕頭",
    coordinates: [116.682, 23.354],
    groupId: "min",
    subgroupId: "southern-min",
    hierarchy: ["Sinitic", "Min", "Southern Min", "Chaoshan cluster", "Swatow"],
  },
];

export const chaoshanArticles: Record<string, EncyclopediaEntry> = {
  chaozhou: {
    title: "Teochew",
    dek: "Southern Min in Teochew, beside the Han River in eastern Guangdong.",
    sections: [
      {
        heading: "The city and the wider name",
        paragraphs: [
          "Teochew is an established name for 潮州, called Chaozhou in Mandarin. The city lies on the Han River in eastern Guangdong. Its old town faces Guangji Bridge, which crosses the river outside the eastern gate. The name Teochew also describes a wider language and cultural region; this entry refers specifically to the city, rather than every community carrying that name.",
        ],
      },
      {
        heading: "Within Southern Min",
        paragraphs: [
          "Teochew belongs to Southern Min’s Teo Swa cluster, separate from Tsuân-Tsiang. Linguist You Rujie uses the name Chaoshan for these eastern Guangdong varieties. Teo Swa is the community spelling used by the Teo Swa General Association of New Zealand; it names the wider cluster, not one uniform accent.",
        ],
      },
      {
        heading: "Tone in speech and song",
        paragraphs: [
          "Zhang and Cross’s research on Chaozhou songs describes eight citation tones and investigates tone sandhi: changes to tones when syllables occur together. Their work compares citation and sandhi forms when analysing melody. A tone label alone therefore does not specify how a word sounds in a phrase; examples need their local source and spoken context.",
        ],
      },
    ],
    facts: [
      { label: "City", value: "Teochew · 潮州" },
      { label: "Cluster", value: "Teo Swa · 潮汕" },
      { label: "Geography", value: "Han River, eastern Guangdong" },
      { label: "Source search name", value: "Chaozhou" },
    ],
    sources: [
      classificationSource,
      namesSource,
      clusterNameSource,
      {
        title: "Chaozhou Municipal Government: old town and Guangji Bridge",
        url: "https://www.chaozhou.gov.cn/slhwz/czxw/content/post_3880941.html",
      },
      {
        title:
          "Xi Zhang and Ian Cross (2021): Effect of tone sandhi on singing in Chaozhou dialect — research poster",
        url: "https://www.cambridge.org/engage/coe/article-details/618c29dada150629539daec9",
      },
    ],
    readingMinutes: 1,
  },
  shantou: {
    title: "Swatow",
    dek: "Southern Min in Swatow, a port city in eastern Guangdong’s Teo Swa region.",
    sections: [
      {
        heading: "The coastal city",
        paragraphs: [
          "Swatow is the established name for 汕頭, called Shantou in Mandarin. It lies on Guangdong’s eastern coast, south of Teochew. The municipal history records its opening as an international trading port in 1860 and the establishment of a separate municipal administration in 1921. The map marker locates the urban centre; it does not represent every variety spoken across the municipality.",
        ],
      },
      {
        heading: "How the city’s speech developed",
        paragraphs: [
          "You Rujie’s study of language contact classifies Swatow speech as a local variety of Chaoshan, within Southern Min. He connects the development of its urban speech to migration from surrounding communities and describes the convergence of their sound systems. Swatow and Teochew are distinct local varieties within the Teo Swa cluster.",
        ],
      },
      {
        heading: "Comparing neighbouring varieties",
        paragraphs: [
          "The same study identifies differences in two-syllable tone sandhi between Swatow and neighbouring Teochew, Theng Hai, and Kityang. This makes the speaker’s locality relevant even within the regional cluster. Learning materials labelled Teochew may use the wider regional name; the speaker’s locality identifies which pronunciation is represented.",
        ],
      },
    ],
    facts: [
      { label: "City", value: "Swatow · 汕頭" },
      { label: "Cluster", value: "Teo Swa · 潮汕" },
      { label: "Geography", value: "Eastern Guangdong coast" },
      { label: "Source search name", value: "Shantou" },
    ],
    sources: [
      classificationSource,
      namesSource,
      clusterNameSource,
      {
        title: "Shantou Municipal Government: administrative history",
        url: "https://www.shantou.gov.cn/cnst/yxst/gk/xzqh/",
      },
      {
        title: "Guangdong Foreign Affairs Office: Shantou geography",
        url: "https://en.gdfao.gov.cn/2026-02/11/c_1015837.htm",
      },
    ],
    readingMinutes: 1,
  },
};
