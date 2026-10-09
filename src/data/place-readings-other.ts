/** Source orthographies for place names, not generated HanLingo or IPA lessons.
 * Missing entries are research gaps: never fill them from a neighbouring variety.
 */
export type OtherPlaceReading = {
  commonName?: string;
  localName: string;
  convention: string;
  source: { title: string; url: string };
  note: string;
};

const hakkaPlaceList = {
  title: 'Ministry of Education Taiwan Hakka dictionary · 地名清單, Hailu notes',
  url: 'https://hakkadict.moe.edu.tw/appendix/%E5%9C%B0%E5%90%8D%E6%B8%85%E5%96%AE/',
};
const hailu = (localName: string, fullSourceName: string): OtherPlaceReading => ({
  localName,
  convention: 'Taiwan Hakka Romanization · Hailu',
  source: hakkaPlaceList,
  note: `The appendix explicitly gives the Hailu form ${fullSourceName}. The administrative suffix is omitted in the short place label; supplied tone marks remain. This is the Hailu reference, not the appendix’s default Sixian column or a claim about every resident.`,
});
const wuCommunity = (localName: string, chineseName: string, schema: string, repository: string, commit: string, scope: string, commonName?: string): OtherPlaceReading => ({
  ...(commonName ? { commonName } : {}), localName,
  convention: 'Wugniu community spelling · tones unmarked',
  source: {
    title: `Wu-language community NGLI · ${chineseName} input scheme`,
    url: `https://github.com/NGLI/${repository}/blob/${commit}/${schema}.schema.yaml#L4-L16`,
  },
  note: `The community project pairs ${chineseName} with the name identifier ${schema.replace('wugniu_', '')}; only its initial letter is capitalized here. ${scope} This is a documented community spelling, not a complete tonal transcription or a HanLingo conversion.`,
});

export const otherPlaceReadings: Record<string, OtherPlaceReading> = {
  guangzhou: {
    commonName: 'Canton',
    localName: 'Gwong2 Zau1',
    convention: 'Cantonese Jyutping',
    source: {
      title: 'Chinese University of Hong Kong · Cantonese Express, 識新朋友',
      url: 'https://www.ilc.cuhk.edu.hk/workshop/Chinese/Cantonese/CantoneseExpress/dailyConversation/01/text.aspx',
    },
    note: 'The full city name 廣州 is written Gwong2 Zau1 in the course dialogue. These are Jyutping tone categories, not pitch numbers or HanLingo spelling. The Hong Kong teaching source documents the Cantonese name; it does not establish all details of a Canton speaker’s accent.',
  },
  'hong-kong': {
    commonName: 'Hong Kong',
    localName: 'Hoeng1 Gong2',
    convention: 'Cantonese Jyutping',
    source: {
      title: 'Chinese University of Hong Kong · Cantonese Express, 識新朋友 vocabulary',
      url: 'https://www.ilc.cuhk.edu.hk/workshop/Chinese/Cantonese/CantoneseExpress/dailyConversation/01/vocab_03.aspx',
    },
    note: 'The course records 香港 as Hoeng1 Gong2 in its vocabulary. Digits are Jyutping tone categories, not pitch contours or HanLingo spelling.',
  },
  shanghai: wuCommunity('Zaonhe', '上海', 'wugniu_zaonhe', 'rime-wugniu_zaonhe', '12a9d3032cff3206db1792aa9d8f85440fc593c0', 'The scheme identifies its scope as middle-generation urban Shanghai.'),
  ningbo: wuCommunity('Gninpou', '寧波', 'wugniu_gninpou', 'rime-wugniu_gninpou', 'f89a494f6f6af0354b786a44af048b8340804a8a', 'The scheme specifies the old three urban districts, separate from its Yinzhou scheme.', 'Ningpo'),
  suzhou: wuCommunity('Soutseu', '蘇州', 'wugniu_soutseu', 'rime-wugniu_soutseu', '9abdfb18cd5a7eb9b6422e3ea880cfa4b2b7227f', 'It identifies a Suzhou Wu scheme.'),
  jiaxing: wuCommunity('Kashin', '嘉興', 'wugniu_kashin', 'rime-wugniu_kashin', 'a27cfee26f320b24299ed2e47665b7317419577a', 'The repository keeps Jiaxing, Jiashan, Tongxiang, Haining and Haiyan as separate schemes.'),
  jiashan: wuCommunity('Kazoe', '嘉善', 'wugniu_kazoe', 'rime-wugniu_kashin', 'a27cfee26f320b24299ed2e47665b7317419577a', 'This is the Jiashan scheme, not the neighbouring Jiaxing city scheme.'),
  tongxiang: wuCommunity('Donshian', '桐鄉', 'wugniu_donshian', 'rime-wugniu_kashin', 'a27cfee26f320b24299ed2e47665b7317419577a', 'This is the Tongxiang scheme, not the neighbouring Jiaxing city scheme.'),
  haining: wuCommunity('Haegnin', '海寧', 'wugniu_haegnin', 'rime-wugniu_kashin', 'a27cfee26f320b24299ed2e47665b7317419577a', 'This is the Haining scheme, not the neighbouring Jiaxing city scheme.'),
  meixian: {
    commonName: 'Meixian',
    localName: 'Moiyan',
    convention: 'Hakka community name · tones unmarked',
    source: {
      title: 'Samsun Lampotang · Hakka family background, University of Florida',
      url: 'https://vam.anest.ufl.edu/sem/personal.html',
    },
    note: 'The author identifies his Hakka family’s home near Meixian and explicitly lists Moiyan among its community spellings. This first-person attestation supports the name, not one standardized spelling or a phonetic reading for the whole Meizhou municipality.',
  },
  'guanyin-hakka': hailu('Gonˋ rhimˋ', 'gonˋ rhimˋ kiˋ'),
  'xinwu-hakka': hailu('Sinˋ vug', 'sinˋ vug kiˋ'),
  'xinfeng-hakka': hailu('Sinˋ fungˋ', 'sinˋ fungˋ hiongˋ'),
  'xinpu-hakka': hailu('Sinˋ buˋ', 'sinˋ buˋ zhinˊ'),
  'hukou-hakka': hailu('Fu kieuˊ', 'fu kieuˊ hiongˋ'),
  'qionglin-hakka': hailu('Giungˋ lim', 'giungˋ lim hiongˋ'),
  'hengshan-hakka': hailu('Vang sanˋ', 'vang sanˋ hiongˋ'),
  'guanxi-hakka': hailu('Guanˋ siˋ', 'guanˋ siˋ zhinˊ'),
  'beipu-hakka': hailu('Bed buˋ', 'bed buˋhiongˋ'),
  'baoshan-hakka': hailu('Boˊ sanˋ', 'boˊ sanˋ hiongˋ'),
  'emei-hakka': hailu('Ngo mi', 'ngo mi hiongˋ'),
  'zhudong-hakka': hailu('Zhug dungˋ', 'zhug dungˋ zhinˊ'),
  'jian-hakka': hailu('Gid onˋ', 'gid onˋ hiongˋ'),
  'shoufeng-hakka': hailu('Shiu+ fungˋ', 'shiu+ fungˋ hiongˋ'),
};

/** Explicit research gaps; these must not become fabricated fallback local names. */
export const otherPlaceReadingGaps = {
  wu: 'Only seven community-authored Wugniu scheme names are attested here. Other Wu localities need their own whole-place-name source; a Shanghai reading of 寧波 is not a Ningpo reading.',
  hakka: 'The MOE appendix’s unqualified column is Sixian. Only entries explicitly marked Hailu were matched to our Hailu localities; Guangfu and other unmarked names are not borrowed from that column.',
  yue: 'Canton and Hong Kong have explicit full-name Jyutping examples. Other Yue localities need a source for their own local name; general Cantonese readings cannot establish Taishan, Yangjiang or another local accent.',
  mandarin: 'No local dialect name reading is inferred from Standard Mandarin pinyin. Conventional names remain until an exact locality-specific attestation is available.',
};
