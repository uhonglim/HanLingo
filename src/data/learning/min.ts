import type { AttestedWord, BranchLearning, LearningSource } from "./types";

const fuzhouDictionary: LearningSource = {
  title: "CUHK: Fuzhou character readings",
  url: "https://humanum.arts.cuhk.edu.hk/Lexis/lexi-mf/dialectIndex.php?point=O",
};
const jianouDictionary: LearningSource = {
  title: "CUHK: Jian’ou character readings",
  url: "https://humanum.arts.cuhk.edu.hk/Lexis/lexi-mf/dialectIndex.php?point=Q",
};
const putianStudy: LearningSource = {
  title: "Wu: Puxian subgrouping, tables 1–5, pp. 160–163",
  url: "https://www.ling.sinica.edu.tw/upload/researcher_manager_result/17e7b4c054664b1e85670eb38147af5b.pdf",
};
const codas: LearningSource = {
  title: "Wu and Lin: Min consonant endings, pp. 1–2",
  url: "https://www.ling.sinica.edu.tw/upload/researcher_manager_result/80f9788d396d35b0e8c32ebd19416ac5.pdf",
};
const northStudy: LearningSource = {
  title: "Wu: Min rhyme correspondences, pp. 73–77",
  url: "https://www.ling.sinica.edu.tw/upload/researcher_manager_result/c37535b570fa1f44797850580f9ef3ba.pdf",
};
const fuzhouStudy: LearningSource = {
  title: "Peng: A Phonetic Study of Fuzhou Chinese",
  url: "https://lbms03.cityu.edu.hk/theses/c_ftt/phd-ctl-b4086098xf.pdf",
};
const lacquer: LearningSource = {
  title: "Fuzhou government: Bodiless lacquerware",
  url: "https://www.fuzhou.gov.cn/zgfzzt/zjrc/mdfc/msfq/201308/t20130809_129757.htm",
};
const lanes: LearningSource = {
  title: "Fuzhou: Three Lanes and Seven Alleys historic district",
  url: "https://swj.fuzhou.gov.cn/zwgk/swgz/202409/P020240906466809991566.pdf",
};
const banners: LearningSource = {
  title: "China ICH: Jian’ou banner balancing",
  url: "https://www.ihchina.cn/Article/Index/detail?id=13779",
};
const mazu: LearningSource = {
  title: "UNESCO: Mazu belief and customs",
  url: "https://ich.unesco.org/en/RL/mazu-belief-and-customs-00227",
};
const opera: LearningSource = {
  title: "China ICH: Yong’an Daqiang opera",
  url: "https://www.ihchina.cn/project_details/13157/",
};

function readings(
  localityId: string,
  source: LearningSource,
  rows: [string, string, string][],
  note?: string,
): AttestedWord[] {
  return rows.map(([han, english, ipa]) => ({
    id: `${localityId}-${han}`,
    han,
    english,
    ipa,
    localityId,
    reading: "Citation reading",
    toneNotation: "pitch-contour",
    note:
      note ?? "Dictionary character reading; phrase pronunciation may differ.",
    source,
  }));
}

export const minLearning: BranchLearning[] = [
  {
    branchId: "min/eastern-min",
    words: readings("fuzhou", fuzhouDictionary, [
      ["茶", "tea", "[ta˥˧]"],
      ["水", "water", "[t͡suoi˧˨]"],
      ["魚", "fish", "[ŋy˥˧]"],
      ["米", "rice", "[mi˧˨]"],
      ["手", "hand", "[t͡sʰieu˧˨]"],
      ["山", "mountain", "[saŋ˦˦]"],
      ["三", "three", "[saŋ˦˦]"],
      ["日", "sun; day", "[niʔ˥]"],
    ]),
    soundNotes: [
      {
        title: "A rounded front vowel",
        text: "In 魚 [ŋy˥˧], [y] is a close front rounded vowel: keep the tongue forward and round the lips. The initial [ŋ] is the nasal sound heard at the end of English “sing”.",
        localityIds: ["fuzhou"],
        source: fuzhouDictionary,
      },
      {
        title: "A short final closure",
        text: "The dictionary gives 日 as [niʔ˥]. The final [ʔ] is a glottal stop; do not add a released consonant or another vowel after it.",
        localityIds: ["fuzhou"],
        source: fuzhouDictionary,
      },
      {
        title: "Learn phrases with their own readings",
        text: "Fuzhou pronunciation changes across syllables. Citation tones are useful for looking up a character, but a sequence of dictionary forms is not automatically a natural phrase.",
        localityIds: ["fuzhou"],
        source: fuzhouStudy,
      },
    ],
    culture: [
      {
        title: "Three Lanes and Seven Alleys",
        text: "Fuzhou’s historic district brings old lanes, houses, and present-day shops into the same walk. The photograph records the district in March 2019.",
        localityIds: ["fuzhou"],
        source: lanes,
        photo: {
          src: "/images/min-fuzhou-lanes.jpg",
          alt: "A lane in Fuzhou’s Three Lanes and Seven Alleys historic district.",
          caption:
            "Three Lanes and Seven Alleys, Fuzhou, 2019. Resized from the original.",
          author: "Zhangzhugang",
          license: "CC BY-SA 4.0",
          licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
          sourceUrl:
            "https://commons.wikimedia.org/wiki/File:Fuzhou_Sanfangqixiang_2019.03.13_11-36-32.jpg",
        },
      },
      {
        title: "Lacquer without a permanent mould",
        text: "For Fuzhou bodiless lacquerware, artisans build layers of cloth and lacquer over a mould, then remove the mould. Polishing, colour, and inlay turn the lightweight shell into bowls, vessels, or display pieces.",
        localityIds: ["fuzhou"],
        source: lacquer,
      },
    ],
    resources: [
      {
        title: "Fuzhou character dictionary",
        description:
          "Look up syllables and pitch contours, then use the speaker icon to hear a dictionary recording.",
        localityIds: ["fuzhou"],
        kind: "Dictionary",
        url: fuzhouDictionary.url,
      },
      {
        title: "Fuzhou vowels and tones",
        description:
          "Peng’s acoustic study documents speakers, experimental words, vowels, and citation and connected tones.",
        localityIds: ["fuzhou"],
        kind: "Study",
        url: fuzhouStudy.url,
      },
    ],
  },
  {
    branchId: "min/northern-min",
    words: readings("jianou", jianouDictionary, [
      ["茶", "tea", "[ta˧˧]"],
      ["水", "water", "[sy˨˩]"],
      ["魚", "fish", "[ŋy˧˧]"],
      ["米", "rice", "[mi˦˨]"],
      ["人", "person", "[neiŋ˧˧]"],
      ["手", "hand", "[siu˨˩]"],
      ["山", "mountain", "[suiŋ˥˦]"],
      ["三", "three", "[saŋ˥˦]"],
    ]),
    soundNotes: [
      {
        title: "Listen to the vowel as well as the tone",
        text: "水 [sy˨˩] and 魚 [ŋy˧˧] share [y], a close front rounded vowel. Both the beginning of the syllable and its pitch distinguish the readings.",
        localityIds: ["jianou"],
        source: jianouDictionary,
      },
      {
        title: "Two different endings",
        text: "山 [suiŋ˥˦] and 三 [saŋ˥˦] have the same listed pitch contour but different vowels. Keep the [ui] sequence in 山 distinct from the [a] in 三.",
        localityIds: ["jianou"],
        source: jianouDictionary,
      },
      {
        title: "Readings have layers",
        text: "Research compares several rhyme systems within Jian’ou. A shared written character can have more than one documented reading; the examples here retain the CUHK dictionary’s forms.",
        localityIds: ["jianou"],
        source: northStudy,
      },
    ],
    culture: [
      {
        title: "Balancing a banner",
        text: "Jian’ou performers balance tall bamboo poles carrying embroidered banners, lanterns, and bells. Drums and gongs accompany routines that combine strength with precise control.",
        localityIds: ["jianou"],
        source: banners,
      },
    ],
    resources: [
      {
        title: "Jian’ou character dictionary",
        description:
          "Look up character readings and pitch contours; speaker icons open the dictionary recordings.",
        localityIds: ["jianou"],
        kind: "Dictionary",
        url: jianouDictionary.url,
      },
      {
        title: "Jian’ou rhyme correspondences",
        description:
          "Compare the Jian’ou columns with other Northern Min localities in tables 18–22.",
        localityIds: ["jianou"],
        kind: "Study",
        url: northStudy.url,
      },
      {
        title: "Jian’ou banner balancing",
        description:
          "The national heritage record describes the equipment, movements, and musical accompaniment.",
        localityIds: ["jianou"],
        kind: "Culture",
        url: banners.url,
      },
    ],
  },
  {
    branchId: "min/puxian",
    words: readings(
      "putian",
      putianStudy,
      [
        ["三", "three", "[ɬɒ˥˧˧]"],
        ["四", "four", "[ɬi˦˨]"],
        ["寫", "write", "[ɬia˦˥˧]"],
        ["錢", "money", "[t͡siŋ˩˧]"],
        ["字", "written character", "[t͡si˩˩]"],
        ["前", "front; before", "[ɬe˩˧]"],
        ["坐", "sit", "[ɬø˩˩]"],
        ["石", "stone", "[ɬieu˩˧]"],
        ["樹", "tree", "[t͡sʰiu˦˨]"],
        ["馬", "horse", "[ma˦˨]"],
      ],
      "Citation reading. Source tone categories are expanded to the Putian pitch contours in table 4; these are not sandhi forms.",
    ),
    soundNotes: [
      {
        title: "Air passes beside the tongue",
        text: "Putian 三 [ɬɒ˥˧˧] begins with [ɬ], a voiceless lateral fricative. Keep this distinct from the affricate [t͡s] in 字 [t͡si˩˩].",
        localityIds: ["putian"],
        source: putianStudy,
      },
      {
        title: "Aspiration remains a separate contrast",
        text: "樹 [t͡sʰiu˦˨] begins with an aspirated affricate. The raised [ʰ] marks the breath following the closure; HanLingo uses tsh for this consonant.",
        localityIds: ["putian"],
        source: putianStudy,
      },
      {
        title: "Tone categories are not pitch numbers",
        text: "The study labels words with traditional tone categories, then supplies a separate Putian contour table. Here category 1 becomes 533, 2 becomes 13, 3 becomes 453, 5 becomes 42, and 6 becomes 11.",
        localityIds: ["putian"],
        source: putianStudy,
      },
    ],
    culture: [
      {
        title: "Mazu on Meizhou Island",
        text: "Meizhou Island, in Putian, is a centre of Mazu worship. Temple fairs combine offerings, music, dance, and processions. These maritime customs also connect communities far beyond Putian.",
        localityIds: ["putian"],
        source: mazu,
        photo: {
          src: "/images/min-putian-mazu.jpg",
          alt: "Mazu temple buildings on Meizhou Island during a New Year ceremony.",
          caption:
            "Meizhou Mazu Temple, Putian, February 2018. Resized from the original.",
          author: "向史公哲曰",
          license: "CC BY-SA 4.0",
          licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
          sourceUrl:
            "https://commons.wikimedia.org/wiki/File:祈年期间的湄洲妈祖祖庙3.jpg",
        },
      },
    ],
    resources: [
      {
        title: "Putian words and tones",
        description:
          "Tables 1–5 give the attested character forms and their tone categories; table 4 gives pitch contours.",
        localityIds: ["putian"],
        kind: "Study",
        url: putianStudy.url,
      },
      {
        title: "Mazu customs and film",
        description:
          "UNESCO’s heritage entry includes a film of the practices. Performance speech is not a citation-pronunciation recording.",
        localityIds: ["putian"],
        kind: "Culture",
        url: mazu.url,
      },
    ],
  },
  {
    branchId: "min/central-min",
    words: [],
    soundNotes: [
      {
        title: "Notice where the syllable ends",
        text: "Yong’an research documents both final [m] and [ŋ], alongside nasalized vowels. For [m], the lips close; for [ŋ], the closure is at the back of the mouth. These are sound contrasts to listen for, not a complete word lesson.",
        localityIds: ["yongan"],
        source: codas,
      },
      {
        title: "Literary and colloquial forms",
        text: "Wu and Lin distinguish literary from colloquial readings when comparing syllable endings. Their historical correspondence tables should not be read as a ready-made list of everyday spoken words.",
        localityIds: ["yongan"],
        source: codas,
      },
    ],
    culture: [
      {
        title: "Daqiang opera in Fengtian",
        text: "In Fengtian village, Qingshui She township, Yong’an Daqiang opera combines high singing with large gongs and drums. Its performance tradition draws on Yiyang opera, local songs, and ritual music. This is a regional performance tradition, not a recording of urban Yong’an conversation.",
        localityIds: ["yongan"],
        source: opera,
      },
    ],
    resources: [
      {
        title: "Yong’an syllable endings",
        description:
          "Pages 1–2 compare Yong’an with seven other Min localities, separating nasal and stop-ending developments.",
        localityIds: ["yongan"],
        kind: "Study",
        url: codas.url,
      },
      {
        title: "Yong’an Daqiang opera",
        description:
          "Official heritage documentation locates the tradition in Fengtian and describes its repertoire and performance.",
        localityIds: ["yongan"],
        kind: "Culture",
        url: opera.url,
      },
    ],
  },
];
