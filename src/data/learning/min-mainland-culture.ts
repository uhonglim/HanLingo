import type { BranchLearning, CultureItem } from "./types";
import { minMainlandExpandedGalleries } from "../galleries/min-mainland-expanded";

const photo = (place: string, id: string) =>
  minMainlandExpandedGalleries[place]?.find((item) => item.id === `min-mainland-${place}-${id}`);

function pack(branchId: string, culture: CultureItem[]): BranchLearning {
  return {
    branchId,
    words: [],
    soundNotes: [],
    culture,
    resources: culture.map((item) => ({
      title: item.source.title,
      description: item.text,
      localityIds: item.localityIds,
      kind: "Culture",
      url: item.source.url,
    })),
  };
}

// Cultural context does not establish a speaker's pronunciation or language identity.
export const minMainlandCulture: BranchLearning[] = [
  pack("min/eastern-min", [
    {
      title: "Tanyang black tea",
      text: "Tanyang village in Fu’an’s Shekou town is the centre of the Tanyang gongfu black-tea tradition. Its heritage record connects tea-making with tea workshops, old roads, bridges, songs and local stories.",
      localityIds: ["fuan"],
      photo: photo("fuan", "03"),
      source: { title: "China ICH · Tanyang gongfu tea-making", url: "https://www.ihchina.cn/project_details/23782/" },
    },
    {
      title: "Pingjiang theatre",
      text: "Fu’an’s Pingjiang theatre brings spoken storytelling and song to local stages. A 2024 report documents performances in a Gantang ancestral hall and older artists teaching characteristic steps and singing to younger performers.",
      localityIds: ["fuan"],
      source: { title: "Fujian Daily · Fu’an Pingjiang theatre, 2024", url: "https://fjnews.fjsen.com/wap/2024-07/13/content_31687198.htm" },
    },
  ]),
  pack("min/puxian", [
    {
      title: "Furniture made with joinery",
      text: "Xianyou’s furniture tradition combines mortise-and-tenon construction with carving, inlay and finishing. The national heritage record names Bangtou, Duwei and Daji among its workshop centres.",
      localityIds: ["xianyou"],
      source: { title: "China ICH · Xianyou classical furniture-making", url: "https://www.ihchina.cn/project_details/14351.html" },
    },
    {
      title: "Longhua pagoda",
      text: "Longhua’s stone pagoda is one of Xianyou’s protected architectural landmarks. The documented photograph shows its stacked storeys and projecting eaves, contrasting with the market streets elsewhere in this gallery.",
      localityIds: ["xianyou"],
      photo: photo("xianyou", "01"),
      source: { title: "Allervous · Longhua tower, Xianyou, 2015", url: "https://commons.wikimedia.org/wiki/File:Longhua_tower,_Xianyou.jpg" },
    },
  ]),
  pack("min/northern-min", [
    {
      title: "Chengcun’s walled city",
      text: "Near Wuyishan, Chengcun preserves the remains of a large administrative city built in the first century BCE. Its walls and palace archaeology form a separate part of the Mount Wuyi World Heritage property.",
      localityIds: ["wuyishan"],
      photo: photo("wuyishan", "05"),
      source: { title: "UNESCO · Mount Wuyi: Chengcun archaeology", url: "https://whc.unesco.org/en/list/911/" },
    },
    {
      title: "A landscape of study",
      text: "The Nine-Bend River landscape includes former academies, temples and inscriptions associated with the development of Neo-Confucian learning. UNESCO distinguishes these cultural sites from the reserve’s forest and biodiversity values.",
      localityIds: ["wuyishan"],
      source: { title: "UNESCO · Mount Wuyi nomination dossier", url: "https://whc.unesco.org/uploads/nominations/911.pdf" },
    },
  ]),
  pack("min/central-min", [
    {
      title: "Noodles and bianrou",
      text: "Shaxian’s snack tradition includes mixed noodles and bianrou dumplings. Its documented methods combine pounding, wrapping and steaming with other techniques; the noodle photograph here was taken in Shaxian itself.",
      localityIds: ["shaxian"],
      photo: photo("shaxian", "07"),
      source: { title: "Shaxian government · Snack-making heritage", url: "https://www.fjsx.gov.cn/zjsx/mfms/202303/t20230315_1887306.htm" },
    },
    {
      title: "Yubang and the Xiamao tradition",
      text: "Yubang village in Xiamao is a centre of Shaxian snack-making. The Ministry of Culture and Tourism documents hands-on taro-dumpling wrapping, rice-batter preparation and meat pounding there: a specific local food tradition within the wider Shaxian name.",
      localityIds: ["shaxian"],
      source: { title: "Ministry of Culture and Tourism · Shaxian food origins route", url: "https://zhuanti.mct.gov.cn/xcss2024_xcyfw/fujian/detail/7474.html" },
    },
  ]),
  pack("min/leizhou-min", [
    {
      title: "Stone dogs",
      text: "Leizhou’s carved stone dogs stand at gateways, crossroads and other village thresholds. The national heritage record describes basalt carving and protective customs centred on Leizhou, with related traditions around the Gulf of Tonkin.",
      localityIds: ["leizhou"],
      source: { title: "China ICH · Leizhou stone-dog carving", url: "https://www.ihchina.cn/project_details/14117.html" },
    },
    {
      title: "Leiju theatre",
      text: "Leiju developed from local song traditions while borrowing percussion patterns and stage conventions from Cantonese opera. Its dialogue uses Leizhou speech, with accompaniment including the leihu fiddle, flute, suona and percussion.",
      localityIds: ["leizhou"],
      source: { title: "China ICH · Leiju", url: "https://www.ihchina.cn/project_details/13564/" },
    },
  ]),
  pack("min/hainan-min", [
    {
      title: "Arcades and overseas connections",
      text: "Haikou’s old commercial streets retain arcaded shopfronts associated with merchants returning from Southeast Asia. Their buildings connect local street life with the histories of Hainanese communities overseas.",
      localityIds: ["haikou"],
      photo: photo("haikou", "03"),
      source: { title: "Overseas Chinese Affairs Office · Haikou’s old arcaded streets", url: "https://www.gqb.gov.cn/news/2019/0516/46157.shtml" },
    },
    {
      title: "Hainanese on stage",
      text: "Qiong opera is sung in Hainanese. The national heritage entry registered for Haikou describes its combination of rhythmic song structures, dramatic roles and influences from other theatre traditions; stage singing is distinct from everyday city speech.",
      localityIds: ["haikou"],
      source: { title: "China ICH · Qiong opera, Haikou entry", url: "https://www.ihchina.cn/project_details/13541/" },
    },
  ]),
];
