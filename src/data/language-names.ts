import type { MapPoint } from "./languages";
import { placeReadingsMin, minLandmarkReadings } from './place-readings-min';
import { otherPlaceReadings } from './place-readings-other';

export type LocalPlaceReading = {
  commonName?: string;
  localName: string;
  convention: string;
  source: { title: string; url: string };
  note: string;
};
/** Source orthographies, never guessed from Han characters or neighbouring speech. */
export const localPlaceReadings: Record<string, LocalPlaceReading> = { ...placeReadingsMin, ...otherPlaceReadings, ...minLandmarkReadings };


export type PlaceNameReference = {
  label: string;
  kind: "community" | "conventional" | "source-romanization";
  aliases: string[];
  note: string;
  source: { title: string; url: string };
};
const clanDirectory = {
  title: "SFCCA / NUS Libraries · Bilingual clan association directory",
  url: "https://nus.edu.sg/nuslibraries/dsprojects/sfcca/clans/name/",
};
const communityName = (label: string, aliases: string[], association: string): PlaceNameReference => ({
  label, aliases, kind: "community",
  note: `${label} is the place-name spelling used by ${association}. It is a documented community label, not a HanLingo transcription or a claim that every local speaker uses this spelling.`,
  source: clanDirectory,
});

/** Common names and their provenance, separate from local reading names. */
export const placeNameReferences: Record<string, PlaceNameReference> = {
  xiamen: communityName("Amoy", ["Xiamen", "厦门", "廈門"], "the Amoy Association"),
  quanzhou: {
    label: "Tsuân-tsiu", aliases: ["Quanzhou", "泉州"], kind: "source-romanization",
    note: "Tsuân-tsiu is the Ministry of Education dictionary’s place-name example for 泉州. Quanzhou remains a search alias.",
    source: { title: "Ministry of Education Taigi dictionary · 州, place-name examples", url: "https://sutian.moe.edu.tw/zh-hant/su/2284/" },
  },
  zhangzhou: {
    label: "Chang Chow", aliases: ["Zhangzhou", "Tsiang-tsiu", "漳州"], kind: "community",
    note: "Chang Chow is the community spelling in the bilingual name of 新加坡漳州總會. The separate local reading follows the MOE Hokkien dictionary, not a new Zhangzhou-speaker recording.",
    source: { title: "SFCCA · Members directory, Chang Chow General Association", url: "https://sfcca.sg/en/our-members/" },
  },
  singapore: {
    label: "Sin-ka-pho", aliases: ["Singapore", "新加坡"], kind: "source-romanization",
    note: "Sin-ka-pho is the Hokkien place name in the educational word list; this city reference covers Singapore Hokkien, not every language spoken in Singapore.",
    source: { title: "Taipei school · Taigi vocabulary", url: "https://www.saihs.edu.tw/uploads/1678269782302fhjagTST.pdf" },
  },
  "george-town": {
    label: "Pho Te", aliases: ["George Town", "Penang", "Pho3 Te4", "檳城", "槟城"], kind: "community",
    note: "Timothy Tye records Pho3 Te4 for George Town. The common label is George Town and the secondary reading preserves Pho3 Te4; the locality is the city, not all of Penang.",
    source: { title: "Timothy Tye · Place Names in Penang Hokkien", url: "https://www.penang-traveltips.com/hokkien/place-names.htm" },
  },
  guangzhou: {
    label: "Canton", aliases: ["Guangzhou", "廣州", "广州"], kind: "conventional",
    note: "Canton is the established English city name identified by Guangzhou’s municipal guide. It names the locality here; Yue remains the wider language group. Canton is not presented as a local-language phonetic transcription.",
    source: { title: "Guangzhou municipal government · An Expat’s Guide, Basic Facts", url: "https://www.gz.gov.cn/attachment/7/7792/7792046/10199330.pdf" },
  },
  jinjiang: communityName("Chin Kang", ["Jinjiang", "晉江", "晋江"], "Singapore Chin Kang Huay Kuan"),
  anxi: communityName("Ann Kway", ["Anxi", "安溪"], "Singapore Ann Kway Association"),
  "nanan-min": communityName("Lam Ann", ["Nan’an", "Nanan", "Nan'an", "南安"], "Lam Ann Association"),
  huian: communityName("Hui Ann", ["Hui’an", "Huian", "Hui'an", "惠安"], "Singapore Hui Ann Association"),
  tongan: communityName("Tung Ann", ["Tong’an", "Tongan", "Tong'an", "同安"], "Tung Ann District Guild"),
  fuzhou: communityName("Foochow", ["Fuzhou", "福州"], "Singapore Foochow Association"),
  fuqing: communityName("Futsing", ["Fuqing", "福清"], "Singapore Futsing Association"),
  "changle-min": {
    label: "Dionglok", aliases: ["Changle", "Diòng-lŏ̤h", "長樂", "长乐"], kind: "community",
    note: "The Foochow Dionglok Association explicitly identifies Dionglok with Changle. The atlas retains the specific Changle locality, separate from urban Foochow.",
    source: { title: "Singapore Foochow Dionglok Association · Our Story", url: "https://fzcl.sg/" },
  },
  "longyan-min": communityName("Lung Yen", ["Longyan", "龍巖", "龙岩"], "Singapore Lung Yen Hui Kuan"),
  chenghai: communityName("Theng Hai", ["Chenghai", "澄海"], "Theng Hai Huay Kuan"),
  jieyang: communityName("Kityang", ["Jieyang", "揭陽", "揭阳"], "Kityang Kwee Lim Low Clan Association"),
  ningbo: communityName("Ningpo", ["Ningbo", "寧波", "宁波"], "Ningpo Guild Singapore"),
  taishan: communityName("Toishan", ["Taishan", "Toi Shan", "台山", "臺山"], "the Association of the Wong Clan of Toishan"),
  chayang: communityName("Char Yong", ["Chayang", "茶陽", "茶阳"], "Char Yong Association"),
};

export function placeNameReference(point: Pick<MapPoint, "id">) {
  return placeNameReferences[point.id];
}
export function placeLabel(point: Pick<MapPoint, "id" | "name">) {
  return localPlaceReadings[point.id]?.commonName ?? placeNameReferences[point.id]?.label ?? point.name;
}
export function placeNameAliases(point: Pick<MapPoint, "id" | "name">) {
  const reading = localPlaceReadings[point.id];
  return [...new Set([point.name, placeNameReferences[point.id]?.label, reading?.commonName,
    reading?.localName, ...(placeNameReferences[point.id]?.aliases ?? [])].filter((name): name is string => Boolean(name)))];
}

export function placeReadingName(point: { id: string }) {
  return localPlaceReadings[point.id]?.localName;
}
export function placeDisplayName(point: { id: string; name: string }) {
  const common = placeLabel(point), local = placeReadingName(point);
  return local && local !== common ? `${common} · ${local}` : common;
}
export function resolvePlaceNames(point: { id: string; name: string; nativeName?: string }) {
  const reading = localPlaceReadings[point.id];
  return { commonName: placeLabel(point), localReadingName: reading?.localName,
    nativeName: point.nativeName, readingSystem: reading?.convention,
    readingSource: reading?.source, aliases: placeNameAliases(point) };
}

export const quanzhangLabel = "Tsuân-Tsiang";
export const quanzhangNameReference = {
  note: "Tsuân-Tsiang names the 泉漳 cluster. Quanzhang is its Mandarin spelling alias. The Taigi essay uses Tsuân-tsiang; MOE separately records Tsuân-tsiu and Tsiang-tsiu. This name does not rename all Southern Min as Hokkien.",
  source: { title: "Taigi community essay · 啥人是潮州人？", url: "https://tsbp.tgb.org.tw/2015/04/blog-post_11.html" },
};
export function clusterLabel(name: string) {
  return ["Quanzhang cluster", "Tsuan-Chiang", "Tsuan-Tsiang", "Tsuân-Tsiang"].includes(name)
    ? quanzhangLabel : name === "Chaoshan cluster" ? "Teo Swa" : name;
}
export function placeClusterLabel(point: Pick<MapPoint, "hierarchy">) {
  return point.hierarchy.length > 4 ? clusterLabel(point.hierarchy[3]) : undefined;
}
export const hokkienAliases = "hokkien hoklo holo quanzhang tsuan chiang tsuan tsiang Tsuân-Tsiang 泉漳 福建話 福建话";

export const communityAliases: Record<string, string> = {
  harbin: "哈尔滨",
  shenyang: "沈阳",
  dalian: "大连",
  qingdao: "青岛",
  zhengzhou: "郑州",
  lanzhou: "兰州",
  yangzhou: "扬州",
  chongqing: "重庆",
  macau: "macao 澳门",
  kaiping: "开平",
  jiangmen: "江门",
  nanning: "南宁",
  yangjiang: "阳江",
  ningbo: "宁波",
  shaoxing: "绍兴",
  linhai: "临海",
  wuhua: "五华",
  xingning: "兴宁",
  taipak: "taipei tai pak taiwan taiwanese taigi tai gi hoklo holo 台北 臺北 台語 臺語 台灣 臺灣 台湾",
  singapore: "singapore singaporean sin ka pho sing ka pho 新加坡 新加坡福建話 新加坡福建话",
  "george-town": "penang panang pulau pinang george town malaysia 檳城 槟城 喬治市 乔治市 馬來西亞 马来西亚",
  tainan: "tainan tai lam tailam 台南 臺南",
  kaohsiung: "kaohsiung ko hiong takau takao 高雄 打狗",
  yilan: "yilan ilan gi lan 宜蘭 宜兰",
  lukang: "lukang lugang lok kang 鹿港",
  sanxia: "sanxia sansia sam kiap 三峽 三峡",
  tongan: "tong an tongan tang oan 同安",
  chaozhou: "chaozhou teochew tio chiu 潮州",
  shantou: "shantou swatow sua tau 汕頭 汕头",
  jieyang: "jieyang kityang gek ion 揭陽 揭阳",
};

export const legacyMinPlaces: Record<string, string> = {
  "taiwan-hokkien": "taipak", "singapore-hokkien": "singapore", "penang-hokkien": "george-town",
};

/** Concise scope notes; these terms are not interchangeable navigation levels. */
export const languageNameGlossary = [
  { id: "min", term: "Min", text: "The wider group. Southern Min and Eastern Min are different branches within it.", source: { title: "Tang 2009 · Min classification, §2.3.1", url: "https://www.lotpublications.nl/Documents/228_fulltext.pdf#page=40" } },
  { id: "southern-min", term: "Southern Min", text: "The branch used here for Tsuân-Tsiang, Teo Swa, and Longyan–Zhangping. A shared branch does not make their speech identical.", source: { title: "Fujian Provincial Gazetteer · Dialect classification table", url: "https://data.fjdsfzw.org.cn/upload/Annals/2011/方言志/epub/ops/8.htm" } },
  { id: "tsuan-chiang", term: quanzhangLabel, text: "The 泉漳 cluster within Southern Min: Amoy, Tsuân-tsiu, Tsiang-tsiu and related locality references. Quanzhang is its Mandarin spelling alias.", source: { title: "Tang 2009 · Quanzhang cluster, §2.3.1", url: "https://www.lotpublications.nl/Documents/228_fulltext.pdf#page=40" } },
  { id: "hokkien", term: "Hokkien", text: "A familiar community name, especially in Southeast Asia. Here it describes Tsuân-Tsiang-related local speech, not every language of Fujian or every Min branch.", source: { title: "Luo Futeng · Hokkien in Singapore", url: "https://culturepaedia.singaporeccc.org.sg/language-education/the-hokkien-dialect-in-singapore/" } },
  { id: "hoklo", term: "Hoklo", text: "A community and language label whose scope depends on who uses it. It remains a search term here, not an extra tree level or a replacement for Min.", source: { title: "Yao Wen-song · 啥人是潮州人？, community naming discussion", url: "https://tsbp.tgb.org.tw/2015/04/blog-post_11.html" } },
];
