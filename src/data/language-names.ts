import type { MapPoint } from "./languages";

/** Reader-facing names are independent of stable URL identifiers. */
export function placeLabel(point: Pick<MapPoint, "id" | "name">) {
  return ({ xiamen: "Amoy", quanzhou: "Tsuân-tsiu", zhangzhou: "Tsiang-tsiu", singapore: "Sin-ka-pho", "george-town": "Pho Te" } as Record<string, string>)[point.id] ?? point.name;
}

export const quanzhangLabel = "Tsuan-Chiang";
export function clusterLabel(name: string) {
  return name === "Quanzhang cluster" ? quanzhangLabel : name === "Chaoshan cluster" ? "Teo Swa" : name;
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
