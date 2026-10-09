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
  title: "Wu: Puxian subgrouping, tables 1–5, pp. 160–164",
  url: "https://www.ling.sinica.edu.tw/upload/researcher_manager_result/17e7b4c054664b1e85670eb38147af5b.pdf",
};
const codas: LearningSource = {
  title: "Wu and Lin: Min consonant endings, pp. 1–2",
  url: "https://www.ling.sinica.edu.tw/upload/researcher_manager_result/80f9788d396d35b0e8c32ebd19416ac5.pdf",
};
const yonganDictionary: LearningSource = {
  title: "Zhou & Lin: Yong’an Fangyan, pp. 7–8, 23, 28–29",
  url: "https://www.slideshare.net/slideshow/ss-186173002/186173002",
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
      ["黑", "black", "[haiʔ˨˧]"],
      ["小", "small", "[sieu˧˨]"],
      ["多", "many; much", "[to˦˦]"],
      ["家", "home; family", "[ka˦˦]"],
      ["屋", "house", "[ouʔ˨˧]"],
      ["桌", "table", "[tɔʔ˨˧]"],
      ["椅", "chair", "[ie˧˨]"],
      ["書", "book", "[t͡sy˦˦]"],
      ["紙", "paper", "[t͡sai˧˨]"],
      ["筆", "writing brush; pen", "[pɛiʔ˨˧]"],
      ["船", "boat", "[suŋ˥˧]"],
      ["橋", "bridge", "[kyo˥˧]"],
      ["油", "oil", "[ieu˥˧]"],
      ["糖", "sugar", "[tʰouŋ˥˧]"],
      ["肉", "meat", "[nyʔ˥]"],
      ["蛋", "egg", "[tɑŋ˨˩˨]"],
      ["果", "fruit", "[kuo˧˨]"],
      ["菜", "vegetables", "[t͡sʰɑi˨˩˨]"],
      ["足", "foot", "[t͡søyʔ˨˧]"],
      ["牙", "tooth", "[ŋa˥˧]"],
      ["腳", "foot; leg", "[kyɔʔ˨˧]"],
      ["哭", "cry", "[kʰouʔ˨˧]"],
      ["笑", "laugh", "[t͡sʰiɛu˨˩˨]"],
      ["晚", "late; evening", "[muoŋ˧˨]"],
      ["冷", "cold", "[lɛiŋ˧˨]"],
      ["熱", "hot", "[ieʔ˥]"],
      ["一", "one", "[ɛiʔ˨˧]"],
      ["二", "two", "[nɛi˨˩˨]"],
      ["四", "four", "[sɛi˨˩˨]"],
      ["六", "six", "[løyʔ˥]"],
      ["七", "seven", "[t͡sʰɛiʔ˨˧]"],
      ["八", "eight", "[paiʔ˨˧]"],
      ["十", "ten", "[sɛiʔ˥]"],
      ["月", "moon", "[ŋuoʔ˥]"],
      ["土", "earth; soil", "[tʰu˧˨]"],
      ["馬", "horse", "[ma˧˨]"],
      ["羊", "sheep", "[yoŋ˥˧]"],
      ["雞", "chicken", "[kie˦˦]"],
      ["狗", "dog", "[kɛu˧˨]"],
      ["豬", "pig", "[ty˦˦]"],
      ["風", "wind", "[huŋ˦˦]"],
      ["雲", "cloud", "[huŋ˥˧]"],
      ["天", "sky", "[tʰieŋ˦˦]"],
      ["海", "sea", "[hai˧˨]"],
      ["花", "flower", "[hua˦˦]"],
      ["酒", "wine", "[t͡sieu˧˨]"],
      ["門", "door", "[muoŋ˥˧]"],
      ["心", "heart", "[siŋ˦˦]"],
      ["大", "big", "[tuɑi˨˦˨]"],
      ["新", "new", "[siŋ˦˦]"],

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
        title: "A book and a sheet of paper",
        text: "書 [t͡sy˦˦] and 紙 [t͡sai˧˨] share the unaspirated [t͡s] onset. Their vowels and tones differ: [y] is rounded and forward, while [ai] moves between two vowel positions.",
        localityIds: ["fuzhou"],
        source: fuzhouDictionary,
      },
      {
        title: "Two short food readings",
        text: "肉 [nyʔ˥] ends at the glottis, while 糖 [tʰouŋ˥˧] ends in the velar nasal [ŋ]. Keep the endings distinct even when practising the syllables slowly.",
        localityIds: ["fuzhou"],
        source: fuzhouDictionary,
      },
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
      ["河", "river", "[ɔ˨˩]"],
      ["草", "grass", "[t͡sʰau˨˩]"],
      ["食", "eat", "[si˦˦]"],
      ["目", "eye", "[mu˦˨]"],
      ["口", "mouth", "[kʰe˨˩]"],
      ["鼻", "nose", "[pʰi˦˦]"],
      ["白", "white", "[pɛ˦˨]"],
      ["黑", "black", "[xɛ˨˦]"],
      ["青", "blue-green", "[t͡sʰaŋ˥˦]"],
      ["小", "small", "[siau˨˩]"],
      ["短", "short", "[to˨˩]"],
      ["去", "go", "[kʰɔ˧˧]"],
      ["坐", "sit", "[t͡so˦˦]"],
      ["買", "buy", "[mai˨˩]"],
      ["賣", "sell", "[mai˦˦]"],
      ["有", "have", "[iu˨˩]"],
      ["家", "home; family", "[ka˥˦]"],
      ["屋", "house", "[u˨˦]"],
      ["桌", "table", "[tɔ˨˦]"],
      ["椅", "chair", "[i˨˩]"],
      ["書", "book", "[sy˥˦]"],
      ["紙", "paper", "[t͡syɛ˨˩]"],
      ["筆", "writing brush; pen", "[pi˨˦]"],
      ["橋", "bridge", "[kiau˧˧]"],
      ["燈", "lamp", "[taiŋ˥˦]"],
      ["油", "oil", "[iu˧˧]"],
      ["糖", "sugar", "[tʰɔŋ˧˧]"],
      ["肉", "meat", "[ny˦˨]"],
      ["二", "two", "[ni˦˦]"],
      ["四", "four", "[si˧˧]"],
      ["五", "five", "[ŋu˦˨]"],
      ["六", "six", "[ly˦˨]"],
      ["七", "seven", "[t͡sʰi˨˦]"],
      ["八", "eight", "[pai˨˦]"],
      ["九", "nine", "[kiu˨˩]"],
      ["火", "fire", "[xo˨˩]"],
      ["土", "earth; soil", "[tʰu˨˩]"],
      ["木", "wood", "[mu˦˨]"],
      ["金", "gold", "[keiŋ˥˦]"],
      ["鳥", "bird", "[niau˨˩]"],
      ["馬", "horse", "[ma˨˩]"],
      ["牛", "cow", "[niu˧˧]"],
      ["羊", "sheep", "[iɔŋ˧˧]"],
      ["雞", "chicken", "[kai˥˦]"],
      ["雨", "rain", "[xy˦˦]"],
      ["風", "wind", "[xɔŋ˥˦]"],
      ["天", "sky", "[tʰiŋ˥˦]"],
      ["海", "sea", "[xuɛ˨˩]"],
      ["花", "flower", "[xua˥˦]"],
      ["酒", "wine", "[t͡siu˨˩]"],
      ["門", "door", "[mɔŋ˧˧]"],
      ["心", "heart", "[seiŋ˥˦]"],

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
        title: "Buy and sell: listen for pitch",
        text: "買 [mai˨˩] and 賣 [mai˦˦] have the same consonant and vowels in these dictionary readings. The low falling tone of 買 contrasts with the level tone of 賣.",
        localityIds: ["jianou"],
        source: jianouDictionary,
      },
      {
        title: "A mouth begins with a breath",
        text: "口 [kʰe˨˩] begins with aspirated [kʰ]. Compare 家 [ka˥˦], whose [k] has no following aspiration. HanLingo keeps these onsets separate as kh and k.",
        localityIds: ["jianou"],
        source: jianouDictionary,
      },
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
      {
        title: "Tea gardens beyond the city",
        text: "Jian’ou’s tea landscape extends into Dongyou, Dongfeng, and other surrounding towns. Local documentation follows old oolong gardens alongside tea-processing sites: the wider locality includes both cultivation and manufacture.",
        localityIds: ["jianou"],
        source: {
          title: "Jian’ou People’s Congress: visits to the local tea industry",
          url: "https://www.josrd.gov.cn/doc/release?resourceId=dc688c76c17a1f9&resourceType=3",
        },
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
        ["蛇", "snake", "[ɬyɒ˩˧]"],
        ["晴", "clear weather", "[ɬã˩˧]"],
        ["癢", "itch", "[ɬiau˩˩]"],
        ["上", "up; above", "[ɬiau˩˩]"],
        ["舌", "tongue", "[ɬɛʔ˦]"],
        ["十", "ten", "[ɬieʔ˦]"],
        ["全", "whole; complete", "[t͡sø˩˧]"],
        ["層", "layer", "[t͡sɛŋ˩˧]"],
        ["雜", "mixed", "[t͡saʔ˦]"],
        ["絕", "cut off", "[t͡sø˦˨]"],
        ["毒", "poison", "[tʰau˦˨]"],
        ["飼", "feed; rear", "[t͡sʰi˦˨]"],
        ["綻", "split open", "[tʰiŋ˦˨]"],
        ["鹽", "salt", "[ɬiŋ˦˨]"],
        ["墓", "tomb", "[mɔu˦˨]"],
        ["露", "dew", "[lɔu˦˨]"],
        ["妹", "younger sister", "[muai˦˨]"],
        ["面", "face", "[miŋ˦˨]"],
        ["夢", "dream", "[mɒŋ˦˨]"],
        ["三", "three", "[ɬɒ˥˧˧]"],
        ["四", "four", "[ɬi˦˨]"],
        ["寫", "write", "[ɬia˦˥˧]"],
        ["錢", "money", "[t͡siŋ˩˧]"],
        ["字", "written character", "[t͡si˩˩]"],
        ["前", "front; before", "[ɬe˩˧]"],
        ["坐", "sit", "[ɬø˩˩]"],
        ["石", "stone", "[ɬieu˩˧]"],
        ["樹", "tree", "[t͡sʰiu˦˨]"],
        ["罵", "scold", "[ma˦˨]"],
      ],
      "Citation reading. Source tone categories are expanded to the Putian pitch contours in table 4; these are not sandhi forms.",
    ),
    soundNotes: [
      {
        title: "Keep the nasal vowel in clear weather",
        text: "晴 [ɬã˩˧] has a nasalized [ã]. Air passes through the nose during the vowel; this is different from adding an [n] or [ŋ] after an oral vowel.",
        localityIds: ["putian"],
        source: putianStudy,
      },
      {
        title: "Ten ends with a glottal stop",
        text: "十 [ɬieʔ˦] closes with [ʔ]. The source labels this category 8 and gives Putian’s citation pitch as 4; the category number itself is not the pitch.",
        localityIds: ["putian"],
        source: putianStudy,
      },
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
        text: "The study labels words with traditional tone categories, then supplies a separate Putian contour table. Here category 1 becomes 533, 2 becomes 13, 3 becomes 453, 5 becomes 42, 6 becomes 11, and 8 becomes 4.",
        localityIds: ["putian"],
        source: putianStudy,
      },
    ],
    culture: [
      {
        title: "Puxian opera: gesture and song",
        text: "Puxian opera is performed in Putian and Xianyou. Its inherited repertoire combines sung passages, speech, and distinctive movements; some gestures preserve traces of puppet performance. Watch the hands and steps as well as listening to the voice.",
        localityIds: ["putian"],
        source: {
          title: "China ICH: Puxian opera",
          url: "https://www.ihchina.cn/project_details/13141.html",
        },
      },
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
    words: readings(
      "yongan",
      yonganDictionary,
      [
        ["爸", "father", "[pa˦˨]"],
        ["來", "come", "[la˧˧]"],
        ["奶", "milk", "[la˨˩]"],
        ["菜", "vegetables", "[t͡sʰa˨˦]"],
        ["才", "ability; talent", "[t͡sa˧˧]"],
        ["財", "wealth", "[t͡sa˧˧]"],
        ["再", "again", "[t͡sa˨˦]"],
        ["太", "too; very", "[tʰa˨˩]"],
        ["買", "buy", "[be˨˩]"],
        ["賣", "sell", "[be˨˦]"],
        ["雪", "snow", "[se˩˨]"],
        ["洗", "wash", "[se˨˩]"],
        ["細", "fine; thin", "[se˨˦]"],
        ["米", "rice", "[bi˨˩]"],
        ["四", "four", "[si˨˦]"],
        ["紙", "paper", "[ti˨˩]"],
        ["鼻", "nose", "[pʰi˨˦]"],
        ["七", "seven", "[t͡sʰi˩˨]"],
        ["皮", "skin", "[pʰi˧˧]"],
        ["比", "compare", "[pi˨˩]"],
      ],
      "Zhou and Lin’s dictionary character reading. Source categories 1–6 are converted using the book’s own citation-tone table; phrase pronunciation may differ.",
    ),
    soundNotes: [
      {
        title: "Three different beginnings",
        text: "Compare the onsets of 爸 [pa˦˨], 鼻 [pʰi˨˦], and 米 [bi˨˩]: unaspirated [p], aspirated [pʰ], and voiced [b]. HanLingo writes these p, ph, and b.",
        localityIds: ["yongan"],
        source: yonganDictionary,
      },
      {
        title: "Buy and sell use different tones",
        text: "買 [be˨˩] and 賣 [be˨˦] share their segments. In these citation readings, 買 falls from 2 to 1 while 賣 rises from 2 to 4.",
        localityIds: ["yongan"],
        source: yonganDictionary,
      },
      {
        title: "Six categories, six citation contours",
        text: "The dictionary’s category numbers 1–6 stand for 42, 33, 21, 54, 24, and 12. For example, 七 is category 6, read [t͡sʰi˩˨]; its pitch is 12, not 6.",
        localityIds: ["yongan"],
        source: yonganDictionary,
      },
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
      {
        title: "Rice sheets three ways",
        text: "Yong’an 粿条 begins with ground rice steamed into sheets. The city’s food guide describes servings in bone broth, stir-fried with vegetables and meat, or rolled and skewered for dipping in soy sauce.",
        localityIds: ["yongan"],
        source: {
          title: "Yong’an government: 粿条",
          url: "https://www.ya.gov.cn/mlya/yaly/yams/201409/t20140926_856425.htm",
        },
      },
    ],
    resources: [
      {
        title: "Yong’an character dictionary",
        description:
          "Zhou Changji and Lin Baoqing’s local monograph: tone values on pages 7–8, character readings on pages 23 and 28–29. This link opens a scan of the printed book.",
        localityIds: ["yongan"],
        kind: "Dictionary",
        url: yonganDictionary.url,
      },
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
