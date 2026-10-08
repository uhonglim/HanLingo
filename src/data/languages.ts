export type LanguageId = 'mandarin' | 'min' | 'yue' | 'hakka' | 'wu';

export interface Language {
  id: LanguageId;
  name: string;
  nativeName: string;
  shortName: string;
  color: string;
  intro: string;
  feature: string;
  geography: string;
  subgroups: {
    id: string;
    name: string;
    nativeName: string;
    description: string;
    places: string[];
  }[];
  featuredPlace: string;
  hierarchy: string[];
}

/** A curated introduction to present-day varieties, not a complete taxonomy. */
export const languages: Language[] = [
  {
    id: 'mandarin',
    name: 'Mandarin',
    nativeName: '官話',
    shortName: '官',
    color: '#b77938',
    intro:
      'A broad group stretching across northern and southwestern China. Standard Mandarin is its best-known standardized variety, but Beijing, Nanjing, and Chengdu each have their own local speech.',
    feature: 'Across northern China and the southwest.',
    geography: 'Northern China, the lower Yangtze, and the southwest',
    subgroups: [
      {
        id: 'beijing',
        name: 'Beijing Mandarin',
        nativeName: '北京官話',
        description: 'A northern grouping that includes the local speech of Beijing.',
        places: ['Beijing'],
      },
      {
        id: 'jilu',
        name: 'Ji–Lu Mandarin',
        nativeName: '冀魯官話',
        description: 'Varieties associated with parts of Hebei and Shandong.',
        places: ['Jinan'],
      },
      {
        id: 'jianghuai',
        name: 'Jianghuai Mandarin',
        nativeName: '江淮官話',
        description: 'Lower Yangtze varieties, including speech around Nanjing and Yangzhou.',
        places: ['Nanjing', 'Yangzhou'],
      },
      {
        id: 'southwestern',
        name: 'Southwestern Mandarin',
        nativeName: '西南官話',
        description: 'A wide regional grouping that includes Chengdu and Chongqing.',
        places: ['Chengdu', 'Chongqing'],
      },
    ],
    featuredPlace: 'Chengdu',
    hierarchy: ['Sinitic', 'Mandarin', 'Southwestern Mandarin', 'Chengdu'],
  },
  {
    id: 'min',
    name: 'Min',
    nativeName: '閩語',
    shortName: '閩',
    color: '#cf593c',
    intro:
      'A notably diverse group rooted in Fujian and carried far beyond it. Southern Min and Eastern Min are different branches; Xiamen and Fuzhou should not be treated as interchangeable examples.',
    feature: 'Distinct branches across Fujian and coastal communities.',
    geography: 'Fujian, parts of neighboring provinces, Taiwan, and overseas communities',
    subgroups: [
      {
        id: 'southern-min',
        name: 'Southern Min',
        nativeName: '閩南語',
        description:
          'Includes the Quanzhang cluster: Quanzhou, Zhangzhou, and Xiamen. Southern Min extends beyond this cluster.',
        places: ['Xiamen', 'Quanzhou', 'Zhangzhou'],
      },
      {
        id: 'eastern-min',
        name: 'Eastern Min',
        nativeName: '閩東語',
        description: 'A separate Min branch with Fuzhou as one familiar local variety.',
        places: ['Fuzhou'],
      },
      {
        id: 'northern-min',
        name: 'Northern Min',
        nativeName: '閩北語',
        description: 'Northern Fujian varieties, represented here by Jian’ou.',
        places: ['Jian’ou'],
      },
      {
        id: 'puxian',
        name: 'Puxian Min',
        nativeName: '莆仙語',
        description: 'A Min branch associated with Putian and Xianyou.',
        places: ['Putian'],
      },
      {
        id: 'central-min',
        name: 'Central Min',
        nativeName: '閩中語',
        description: 'An inland Min branch, represented here by Yong’an.',
        places: ['Yong’an'],
      },
    ],
    featuredPlace: 'Xiamen',
    hierarchy: ['Sinitic', 'Min', 'Southern Min', 'Quanzhang cluster', 'Xiamen'],
  },
  {
    id: 'yue',
    name: 'Yue',
    nativeName: '粵語',
    shortName: '粵',
    color: '#748463',
    intro:
      'The group that includes Cantonese as spoken in Guangzhou and Hong Kong, alongside varieties such as Taishanese. Cantonese is an entry point into Yue, rather than a name for every local variety.',
    feature: 'Guangzhou Cantonese, Taishanese, and other Yue varieties.',
    geography: 'Guangdong, Guangxi, Hong Kong, Macau, and overseas communities',
    subgroups: [
      {
        id: 'guangfu',
        name: 'Guangfu',
        nativeName: '廣府片',
        description: 'Includes Guangzhou and Hong Kong Cantonese.',
        places: ['Guangzhou', 'Hong Kong'],
      },
      {
        id: 'siyi',
        name: 'Siyi',
        nativeName: '四邑片',
        description: 'Includes Taishan and neighboring communities west of the Pearl River Delta.',
        places: ['Taishan'],
      },
      {
        id: 'goulou',
        name: 'Goulou',
        nativeName: '勾漏片',
        description: 'An inland Yue grouping, represented here by Yulin in Guangxi.',
        places: ['Yulin'],
      },
    ],
    featuredPlace: 'Guangzhou',
    hierarchy: ['Sinitic', 'Yue', 'Guangfu', 'Guangzhou'],
  },
  {
    id: 'hakka',
    name: 'Hakka',
    nativeName: '客語',
    shortName: '客',
    color: '#92769b',
    intro:
      'A group spoken across communities in southern China, Taiwan, and overseas. Meixian is a well-known reference variety, while Hailu and Tingzhou show other parts of the Hakka landscape.',
    feature: 'Meixian, Hailu, and Hakka communities across regions.',
    geography: 'Guangdong, Fujian, Jiangxi, Taiwan, and overseas communities',
    subgroups: [
      {
        id: 'yuetai',
        name: 'Yue–Tai',
        nativeName: '粵台片',
        description: 'A commonly used grouping that includes Meixian Hakka.',
        places: ['Meixian'],
      },
      {
        id: 'hailu',
        name: 'Hailu',
        nativeName: '海陸片',
        description:
          'Associated with Haifeng and Lufeng. Its position in Hakka classifications varies by source.',
        places: ['Haifeng', 'Lufeng'],
      },
      {
        id: 'tingzhou',
        name: 'Tingzhou',
        nativeName: '汀州片',
        description: 'A western Fujian grouping, represented here by Changting.',
        places: ['Changting'],
      },
    ],
    featuredPlace: 'Meixian',
    hierarchy: ['Sinitic', 'Hakka', 'Yue–Tai', 'Meixian'],
  },
  {
    id: 'wu',
    name: 'Wu',
    nativeName: '吳語',
    shortName: '吳',
    color: '#588785',
    intro:
      'A group centered on the lower Yangtze and Zhejiang, including Shanghainese, Suzhou, and Wenzhou varieties. Many Wu varieties preserve consonant distinctions that differ from Standard Mandarin.',
    feature: 'From Shanghai and Suzhou to southern Zhejiang.',
    geography: 'Shanghai, southern Jiangsu, Zhejiang, and neighboring areas',
    subgroups: [
      {
        id: 'taihu',
        name: 'Taihu',
        nativeName: '太湖片',
        description: 'A northern Wu grouping that includes Shanghai and Suzhou.',
        places: ['Shanghai', 'Suzhou'],
      },
      {
        id: 'oujiang',
        name: 'Oujiang',
        nativeName: '甌江片',
        description: 'A southern Wu grouping associated with Wenzhou and the Ou River area.',
        places: ['Wenzhou'],
      },
      {
        id: 'chuqu',
        name: 'Chuqu',
        nativeName: '處衢片',
        description: 'An inland Wu grouping, represented here by Lishui.',
        places: ['Lishui'],
      },
    ],
    featuredPlace: 'Shanghai',
    hierarchy: ['Sinitic', 'Wu', 'Taihu', 'Shanghai'],
  },
];

export interface MapPoint {
  id: string;
  name: string;
  nativeName: string;
  /** Approximate city reference point in [longitude, latitude] order. */
  coordinates: [number, number];
  groupId: LanguageId;
  subgroupId: string;
  hierarchy: string[];
}

/** Points locate examples; they do not claim exclusive language territories. */
export const mapPoints: MapPoint[] = [
  { id: 'beijing-city', name: 'Beijing', nativeName: '北京', coordinates: [116.41, 39.9], groupId: 'mandarin', subgroupId: 'beijing', hierarchy: ['Sinitic', 'Mandarin', 'Beijing Mandarin', 'Beijing'] },
  { id: 'jinan', name: 'Jinan', nativeName: '濟南', coordinates: [117.12, 36.65], groupId: 'mandarin', subgroupId: 'jilu', hierarchy: ['Sinitic', 'Mandarin', 'Ji–Lu Mandarin', 'Jinan'] },
  { id: 'nanjing', name: 'Nanjing', nativeName: '南京', coordinates: [118.8, 32.06], groupId: 'mandarin', subgroupId: 'jianghuai', hierarchy: ['Sinitic', 'Mandarin', 'Jianghuai Mandarin', 'Nanjing'] },
  { id: 'chengdu', name: 'Chengdu', nativeName: '成都', coordinates: [104.07, 30.57], groupId: 'mandarin', subgroupId: 'southwestern', hierarchy: ['Sinitic', 'Mandarin', 'Southwestern Mandarin', 'Chengdu'] },
  { id: 'xiamen', name: 'Xiamen', nativeName: '廈門', coordinates: [118.09, 24.48], groupId: 'min', subgroupId: 'southern-min', hierarchy: ['Sinitic', 'Min', 'Southern Min', 'Quanzhang cluster', 'Xiamen'] },
  { id: 'quanzhou', name: 'Quanzhou', nativeName: '泉州', coordinates: [118.68, 24.87], groupId: 'min', subgroupId: 'southern-min', hierarchy: ['Sinitic', 'Min', 'Southern Min', 'Quanzhang cluster', 'Quanzhou'] },
  { id: 'zhangzhou', name: 'Zhangzhou', nativeName: '漳州', coordinates: [117.65, 24.51], groupId: 'min', subgroupId: 'southern-min', hierarchy: ['Sinitic', 'Min', 'Southern Min', 'Quanzhang cluster', 'Zhangzhou'] },
  { id: 'fuzhou', name: 'Fuzhou', nativeName: '福州', coordinates: [119.3, 26.07], groupId: 'min', subgroupId: 'eastern-min', hierarchy: ['Sinitic', 'Min', 'Eastern Min', 'Fuzhou'] },
  { id: 'jianou', name: 'Jian’ou', nativeName: '建甌', coordinates: [118.3, 27.02], groupId: 'min', subgroupId: 'northern-min', hierarchy: ['Sinitic', 'Min', 'Northern Min', 'Jian’ou'] },
  { id: 'putian', name: 'Putian', nativeName: '莆田', coordinates: [119.01, 25.45], groupId: 'min', subgroupId: 'puxian', hierarchy: ['Sinitic', 'Min', 'Puxian Min', 'Putian'] },
  { id: 'yongan', name: 'Yong’an', nativeName: '永安', coordinates: [117.37, 25.94], groupId: 'min', subgroupId: 'central-min', hierarchy: ['Sinitic', 'Min', 'Central Min', 'Yong’an'] },
  { id: 'guangzhou', name: 'Guangzhou', nativeName: '廣州', coordinates: [113.26, 23.13], groupId: 'yue', subgroupId: 'guangfu', hierarchy: ['Sinitic', 'Yue', 'Guangfu', 'Guangzhou'] },
  { id: 'hong-kong', name: 'Hong Kong', nativeName: '香港', coordinates: [114.17, 22.32], groupId: 'yue', subgroupId: 'guangfu', hierarchy: ['Sinitic', 'Yue', 'Guangfu', 'Hong Kong'] },
  { id: 'taishan', name: 'Taishan', nativeName: '台山', coordinates: [112.79, 22.25], groupId: 'yue', subgroupId: 'siyi', hierarchy: ['Sinitic', 'Yue', 'Siyi', 'Taishan'] },
  { id: 'yulin', name: 'Yulin', nativeName: '玉林', coordinates: [110.18, 22.65], groupId: 'yue', subgroupId: 'goulou', hierarchy: ['Sinitic', 'Yue', 'Goulou', 'Yulin'] },
  { id: 'meixian', name: 'Meixian', nativeName: '梅縣', coordinates: [116.08, 24.27], groupId: 'hakka', subgroupId: 'yuetai', hierarchy: ['Sinitic', 'Hakka', 'Yue–Tai', 'Meixian'] },
  { id: 'haifeng', name: 'Haifeng', nativeName: '海豐', coordinates: [115.32, 22.97], groupId: 'hakka', subgroupId: 'hailu', hierarchy: ['Sinitic', 'Hakka', 'Hailu', 'Haifeng'] },
  { id: 'lufeng', name: 'Lufeng', nativeName: '陸豐', coordinates: [115.64, 22.95], groupId: 'hakka', subgroupId: 'hailu', hierarchy: ['Sinitic', 'Hakka', 'Hailu', 'Lufeng'] },
  { id: 'changting', name: 'Changting', nativeName: '長汀', coordinates: [116.36, 25.83], groupId: 'hakka', subgroupId: 'tingzhou', hierarchy: ['Sinitic', 'Hakka', 'Tingzhou', 'Changting'] },
  { id: 'shanghai', name: 'Shanghai', nativeName: '上海', coordinates: [121.47, 31.23], groupId: 'wu', subgroupId: 'taihu', hierarchy: ['Sinitic', 'Wu', 'Taihu', 'Shanghai'] },
  { id: 'suzhou', name: 'Suzhou', nativeName: '蘇州', coordinates: [120.59, 31.3], groupId: 'wu', subgroupId: 'taihu', hierarchy: ['Sinitic', 'Wu', 'Taihu', 'Suzhou'] },
  { id: 'wenzhou', name: 'Wenzhou', nativeName: '溫州', coordinates: [120.7, 28.0], groupId: 'wu', subgroupId: 'oujiang', hierarchy: ['Sinitic', 'Wu', 'Oujiang', 'Wenzhou'] },
  { id: 'lishui', name: 'Lishui', nativeName: '麗水', coordinates: [119.92, 28.45], groupId: 'wu', subgroupId: 'chuqu', hierarchy: ['Sinitic', 'Wu', 'Chuqu', 'Lishui'] },
];

export interface Letter {
  id: LanguageId | 'formal';
  label: string;
  nativeName: string;
  place: string;
  salutation: string;
  paragraphs: string[];
  closing: string;
  english: string[];
  note: string;
}

/** Shared meaning, paraphrased in English rather than a word-by-word gloss. */
export const englishLetter: string[] = [
  'I have been here for a week. I am eating and sleeping well, so you do not need to worry.',
  'Yesterday, I went to the market with a friend. I saw some of your favorite pastries and bought a box to bring home for you.',
  'It has been a little cold lately. Remember to wear an extra layer when you go out. If I have time next month, I will come home, sit with you, and have a long, unhurried chat.',
];

/** Contributor texts are preserved as supplied. No pronunciation is inferred. */
export const letters: Letter[] = [
  {
    id: 'mandarin',
    label: 'Mandarin',
    nativeName: '官話',
    place: 'Standard Mandarin · colloquial style',
    salutation: '媽：',
    paragraphs: [
      '我到這邊已經一個星期了，吃得好，睡得也好，你不用擔心。',
      '昨天我和朋友去市場買東西，看見有你最愛吃的餅，就買了一盒，打算帶回家給你。',
      '這幾天有點冷，你出門記得多穿件衣服。我下個月有空就回家，到時候坐下來，陪你慢慢聊。',
    ],
    closing: '想你的兒子',
    english: englishLetter,
    note: 'Contributor sample · awaiting speaker review',
  },
  {
    id: 'min',
    label: 'Min',
    nativeName: '閩語',
    place: 'Xiamen · Southern Min',
    salutation: '阿母：',
    paragraphs: [
      '我來遮已經一個禮拜矣，食睏攏好，你毋免煩惱。',
      '昨昏我佮朋友去菜市仔買物件，看著你上愛食的餅，就買一盒，想欲提轉去厝予你。',
      '這幾工有淡薄仔寒，你出門愛記得加穿一領衫。下個月我若有閒就轉去厝，閣坐落來，陪你慢慢仔開講。',
    ],
    closing: '想你的囝',
    english: englishLetter,
    note: 'Contributor sample · awaiting speaker review',
  },
  {
    id: 'yue',
    label: 'Yue',
    nativeName: '粵語',
    place: 'Guangfu · Cantonese',
    salutation: '阿媽：',
    paragraphs: [
      '我嚟呢邊已經一個禮拜喇，食得好，瞓得又好，你唔使擔心。',
      '尋日我同朋友去街市買嘢，見到有你最鍾意食嘅餅，就買咗一盒，諗住帶返屋企畀你。',
      '呢幾日有啲凍，你出門口記得着多件衫。我下個月得閒就返屋企，到時再坐低陪你慢慢傾偈。',
    ],
    closing: '掛住你嘅仔',
    english: englishLetter,
    note: 'Contributor sample · awaiting speaker review',
  },
  {
    id: 'hakka',
    label: 'Hakka',
    nativeName: '客語',
    place: 'Meixian · Hakka',
    salutation: '阿姆：',
    paragraphs: [
      '𠊎來這邊有一隻禮拜哩，食好睡好，你毋使愁。',
      '昨晡日𠊎同朋友去市場買東西，看著你最愛食个餅，就買一盒，打算帶轉屋下分你。',
      '這幾日天氣冷，你出門記得着多一件衫。下隻月𠊎有閒就轉屋下，再坐下來陪你慢慢講。',
    ],
    closing: '想你个倈仔',
    english: englishLetter,
    note: 'Contributor sample · awaiting speaker review',
  },
  {
    id: 'wu',
    label: 'Wu',
    nativeName: '吳語',
    place: 'Shanghai · Wu',
    salutation: '姆媽：',
    paragraphs: [
      '我到搿搭已經一個禮拜了，吃得蠻好，睏得也蠻好，儂勿要擔心。',
      '昨日我搭朋友一道去菜場買物事，看見有儂頂歡喜吃個餅，就買了一盒，打算帶回屋裏撥儂。',
      '搿幾日有眼冷，儂出門記得多穿件衣裳。我下個月有空就回屋裏，再坐下來陪儂慢慢講閒話。',
    ],
    closing: '想儂個兒子',
    english: englishLetter,
    note: 'Contributor sample · awaiting speaker review',
  },
  {
    id: 'formal',
    label: 'Formal written Chinese',
    nativeName: '現代標準書面語',
    place: 'Modern Standard Written Chinese · formal register',
    salutation: '親愛的媽媽：',
    paragraphs: [
      '我抵達這裡已有一週，飲食起居一切安好，請您放心。',
      '昨天，我與朋友到市場購物，看見您喜愛的餅，便買了一盒，準備回家時帶給您。',
      '近日天氣轉涼，外出時請記得添衣。下個月如有空閒，我會回家探望您，陪您坐下來，慢慢聊聊。',
    ],
    closing: '想念您的兒子',
    english: englishLetter,
    note: 'A written register for comparison · not a sixth spoken branch',
  },
];
