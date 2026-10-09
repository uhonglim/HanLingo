import type { AtlasCluster, AtlasLocality, AtlasSource } from './types';

const fj = (page: number, locator: string): AtlasSource => ({
  title: 'Fujian Provincial Gazetteer · Dialects',
  url: `https://data.fjdsfzw.org.cn/upload/Annals/2011/方言志/epub/ops/${page}.htm`, locator,
});
const fjTable = fj(8, 'Overview II · 福建境内汉语方言分区表');
const fjEast = fj(11, 'Chapter 1 §1 · southern and northern Eastern Min locality lists');
const fjCentral = fj(111, 'Chapter 5 §1 · Yong’an, Sanming and Shaxian distribution');
const gd: AtlasSource = {
  title: 'Guangdong provincial government · Languages',
  url: 'https://www.gdhmo.gov.cn/gaikuang/content/post_68514.html',
  locator: '语言 · 粤方言 and 闽方言 distribution paragraphs',
};
const minTaxonomy: AtlasSource = {
  title: 'Tang 2009 · Mutual intelligibility of Chinese dialects',
  url: 'https://www.lotpublications.nl/Documents/228_fulltext.pdf#page=40',
  locator: 'Chapter 2 §2.3.1, printed p. 28 · Min clusters and footnote 26',
};
const yueTable: AtlasSource = {
  title: 'Hui & Simmons 2023 · Contact-Induced Layering and Diffusion in Yue',
  url: 'https://mdpi-res.com/d_attachment/languages/languages-08-00146/article_deploy/languages-08-00146.pdf#page=2',
  locator: 'Table 1, pp. 2–3 · Language Atlas of China column',
};
const yueSurvey: AtlasSource = {
  title: 'Sung 2026 · Advancing Explanatory and Tonal Dialectometry',
  url: 'https://www.lotpublications.nl/Documents/709_fulltext.pdf',
  locator: 'Chapter 2, printed pp. 14–15 · Yang et al. and Xiong locality lists',
};
const moe: AtlasSource = {
  title: 'Ministry of Education Taigi dictionary · Locality comparisons',
  url: 'https://sutian.moe.edu.tw/zh-hant/su/5090/',
  locator: '柑仔蜜 · regional readings: 臺北、臺南、高雄、宜蘭、鹿港、三峽',
};
const wenchang: AtlasSource = {
  title: 'Peng 2026 · Wenchang Min Chinese',
  url: 'https://doi.org/10.1017/S002510032610111X',
  locator: 'Opening description and speaker information, pp. 1–2',
};

function cluster(id: string, groupId: 'min' | 'yue', branchId: string,
  branchName: string, branchNativeName: string, name: string, nativeName: string,
  kind: AtlasCluster['kind'], description: string, source: AtlasSource): AtlasCluster {
  return { id, groupId, branchId, branchName, branchNativeName, name, nativeName, kind, description, source };
}

/** A fixed navigation depth does not make geographic collections formal linguistic subgroups. */
export const atlasMinYueClusters: AtlasCluster[] = [
  cluster('tsuan-chiang', 'min', 'southern-min', 'Southern Min', '閩南語', 'Tsuân-Tsiang', '泉漳', 'classification', 'The Quanzhang cluster in the cited classification. Taiwan and overseas references retain their own local speech.', minTaxonomy),
  cluster('teo-swa', 'min', 'southern-min', 'Southern Min', '閩南語', 'Teo Swa', '潮汕', 'classification', 'The Chao-Shan cluster, with distinct city references around Teochew and Swatow.', minTaxonomy),
  cluster('longyan-zhangping', 'min', 'southern-min', 'Southern Min', '閩南語', 'Longyan–Zhangping', '龍巖漳平', 'classification', 'The western Southern Min division in the Fujian gazetteer, distinguished from the coastal references.', fjTable),
  cluster('houguan', 'min', 'eastern-min', 'Eastern Min', '閩東語', 'Houguan', '侯官', 'classification', 'Southern Eastern Min, represented by Fuzhou. The gazetteer names eleven city and county references.', minTaxonomy),
  cluster('funing', 'min', 'eastern-min', 'Eastern Min', '閩東語', 'Funing', '福寧', 'classification', 'Northern Eastern Min, represented by Fu’an. Local placement follows the cited gazetteer, including its Ningde reference.', minTaxonomy),
  cluster('jianou-cluster', 'min', 'northern-min', 'Northern Min', '閩北語', 'Eastern cluster', '東片', 'classification', 'The gazetteer’s eastern division, represented by Jian’ou.', fjTable),
  cluster('jianyang-cluster', 'min', 'northern-min', 'Northern Min', '閩北語', 'Western cluster', '西片', 'classification', 'The gazetteer’s western division, represented by Jianyang; Chong’an is the older name associated with Wuyishan.', fjTable),
  cluster('putian-cluster', 'min', 'puxian', 'Puxian Min', '莆仙語', 'Putian cluster', '莆田北片', 'classification', 'Northern Puxian in the gazetteer, covering Putian and Hanjiang references.', fjTable),
  cluster('xianyou-cluster', 'min', 'puxian', 'Puxian Min', '莆仙語', 'Xianyou cluster', '仙遊南片', 'classification', 'Southern Puxian in the gazetteer, represented by Xianyou.', fjTable),
  cluster('yongan-cluster', 'min', 'central-min', 'Central Min', '閩中語', 'Southern cluster', '南片', 'classification', 'The gazetteer groups Yong’an, Liedong and Liexi in southern Central Min.', fjTable),
  cluster('shaxian-cluster', 'min', 'central-min', 'Central Min', '閩中語', 'Northern cluster', '北片', 'classification', 'The gazetteer’s northern Central Min division, represented by Shaxian.', fjTable),
  cluster('northeast-hainan', 'min', 'hainan-min', 'Hainan Min', '海南閩語', 'Northeastern Hainan', '海南東北部', 'geographic', 'A geographic collection beginning with Wenchang’s documented speakers, not a newly proposed linguistic subgroup.', wenchang),
  cluster('leizhou-peninsula', 'min', 'leizhou-min', 'Leizhou Min', '雷州閩語', 'Leizhou Peninsula', '雷州半島', 'geographic', 'Local references on the peninsula. Some classifications place Leizhou within Southern Min; the atlas keeps it separate from Tsuân-Tsiang.', minTaxonomy),
  cluster('pearl-delta', 'yue', 'guangfu', 'Guangfu', '廣府片', 'Pearl River Delta', '珠江三角洲', 'geographic', 'A geographic collection of Guangfu localities. Yuehai and Guangfu are alternative branch names, not parent and child.', yueTable),
  cluster('guan-bao', 'yue', 'guangfu', 'Guangfu', '廣府片', 'Guan–Bao', '莞寶', 'geographic', 'Dongguan and Bao’an fall under Guangfu in the Language Atlas column. Zhan’s different scheme treats Guan–Bao as a branch; this navigation collection does not combine the schemes into a new lineage.', yueTable),
  cluster('xiangshan', 'yue', 'guangfu', 'Guangfu', '廣府片', 'Xiangshan', '香山', 'geographic', 'Zhongshan and Zhuhai lie under Guangfu in the cited Language Atlas scheme. Xiangshan is a separate branch in another classification; here it is a geographic collection.', yueTable),
  cluster('west-river-guangfu', 'yue', 'guangfu', 'Guangfu', '廣府片', 'West River towns', '西江城鎮', 'geographic', 'Zhaoqing and urban Wuzhou references, not a classification of every surrounding settlement.', yueTable),
  cluster('north-guangdong-guangfu', 'yue', 'guangfu', 'Guangfu', '廣府片', 'Northern Guangdong', '粵北', 'geographic', 'Northern Guangdong localities assigned to Guangfu in the cited atlas classification.', yueTable),
  cluster('tan-river', 'yue', 'siyi', 'Siyi', '四邑片', 'Tan River region', '潭江地區', 'geographic', 'Locality references in and around the traditional Siyi region. The collection is geographic, not a claim that every town has the same accent.', yueTable),
  cluster('goulou-guangxi', 'yue', 'goulou', 'Goulou', '勾漏片', 'Eastern Guangxi', '桂東', 'geographic', 'Guangxi references assigned to Goulou by the cited Language Atlas scheme.', yueTable),
  cluster('goulou-guangdong', 'yue', 'goulou', 'Goulou', '勾漏片', 'Western Guangdong', '粵西', 'geographic', 'Guangdong references assigned to Goulou in the Language Atlas column; other schemes group some of these under Guangfu.', yueTable),
  cluster('yong-xun-river-towns', 'yue', 'yongxun', 'Yong–Xun', '邕潯片', 'Yong–Xun river towns', '邕潯城鎮', 'geographic', 'Yue town references along the river network. Neighboring Pinghua, Zhuang and rural varieties are not absorbed into these points.', yueSurvey),
  cluster('qin-lian-coast', 'yue', 'qinlian', 'Qin–Lian', '欽廉片', 'Qin–Lian coast', '欽廉沿海', 'geographic', 'Coastal and nearby inland locality references in the cited Qin–Lian distribution.', yueSurvey),
  cluster('liangyang', 'yue', 'gaoyang', 'Gao–Yang', '高陽片', 'Liangyang', '兩陽', 'geographic', 'Yangjiang and Yangchun are grouped geographically here; the source compares classifications that assign this area different ranks.', yueTable),
  cluster('gaozhou-area', 'yue', 'gaoyang', 'Gao–Yang', '高陽片', 'Gaozhou area', '高州地區', 'geographic', 'A geographic reference within the cited Gao–Yang branch, separate from the Liangyang coastal references.', yueTable),
  cluster('wu-hua-localities', 'yue', 'wuhua', 'Wu–Hua', '吳化片', 'Wuchuan–Huazhou', '吳川化州', 'geographic', 'The localities named in the traditional Wu–Hua branch; this geographic layer does not assert an additional linguistic split.', yueSurvey),
];

function point(clusterId: string, id: string, name: string, nativeName: string,
  coordinates: [number, number], source: AtlasSource, scope: string, aliases: string[] = []): AtlasLocality {
  const parent = atlasMinYueClusters.find((item) => item.id === clusterId);
  if (!parent) throw new Error(`Unknown Min/Yue atlas cluster: ${clusterId}`);
  return { id, name, nativeName, groupId: parent.groupId, branchId: parent.branchId,
    clusterId, coordinates, scope, source, aliases };
}
const fjLocal = (native: string, row: string): AtlasSource => ({ ...fjTable, locator: `${fjTable.locator} · ${row}: ${native}` });
const yueLocal = (native: string, page = 2): AtlasSource => ({ ...yueTable,
  url: yueTable.url.replace('#page=2', `#page=${page}`),
  locator: `Table 1, p. ${page} · ${native}; Language Atlas of China column` });
const townScope = 'Urban or county-seat reference for the named locality; the source’s distribution is broader than the map point and does not imply uniform speech.';

export const atlasMinYueLocalities: AtlasLocality[] = [
  point('tsuan-chiang', 'xiamen', 'Amoy', '廈門', [118.09, 24.48], fjLocal('厦门', '闽南东片'), 'Amoy urban reference; the gazetteer distinguishes it from the Quanzhou and Zhangzhou references.', ['Xiamen', '厦门']),
  point('tsuan-chiang', 'quanzhou', 'Tsuân-tsiu', '泉州', [118.68, 24.87], fjLocal('泉州', '闽南北片'), townScope, ['Quanzhou']),
  point('tsuan-chiang', 'zhangzhou', 'Tsiang-tsiu', '漳州', [117.65, 24.51], fjLocal('漳州', '闽南南片'), townScope, ['Zhangzhou']),
  point('tsuan-chiang', 'tongan', 'Tong’an', '同安', [118.15, 24.73], fjLocal('同安', '闽南北片'), 'Tong’an town reference, distinct from central Amoy; modern district boundaries do not define the accent.', ['同安', 'Tongan']),
  point('tsuan-chiang', 'jinjiang', 'Jinjiang', '晉江', [118.55, 24.82], fjLocal('晋江', '闽南北片'), townScope, ['晋江']),
  point('tsuan-chiang', 'nanan-min', 'Nan’an', '南安', [118.39, 24.96], fjLocal('南安', '闽南北片'), townScope, ['Nanan']),
  point('tsuan-chiang', 'huian', 'Hui’an', '惠安', [118.8, 25.03], fjLocal('惠安', '闽南北片'), townScope, ['Huian']),
  point('tsuan-chiang', 'anxi', 'Anxi', '安溪', [118.19, 25.06], fjLocal('安溪', '闽南北片'), townScope),
  point('tsuan-chiang', 'longhai', 'Longhai', '龍海', [117.82, 24.45], fjLocal('龙海', '闽南南片'), 'Shima urban anchor for the gazetteer’s Longhai reference, not all present-day administrative territory.', ['龙海', 'Shima', '石碼']),
  point('tsuan-chiang', 'zhangpu', 'Zhangpu', '漳浦', [117.61, 24.12], fjLocal('漳浦', '闽南南片'), townScope),
  point('tsuan-chiang', 'taipak', 'Taipak', '臺北', [121.5654, 25.033], moe, 'The MOE dictionary’s Taipei reference; a locality sample within Taiwan Hokkien.', ['Taipei', '台北']),
  point('tsuan-chiang', 'tainan', 'Tâi-lâm', '臺南', [120.205, 22.997], moe, 'The MOE dictionary’s Tainan locality reference; not every accent in the municipality.', ['Tainan', '台南']),
  point('tsuan-chiang', 'kaohsiung', 'Ko-hiông', '高雄', [120.3014, 22.6273], moe, 'The MOE dictionary’s Kaohsiung mixed reference; the point anchors the urban center.', ['Kaohsiung', 'Takau']),
  point('tsuan-chiang', 'yilan', 'Gî-lân', '宜蘭', [121.753, 24.7554], moe, 'The MOE dictionary’s Yilan regional reference, anchored to the city.', ['Yilan', 'Ilan', '宜兰']),
  point('tsuan-chiang', 'lukang', 'Lo̍k-káng', '鹿港', [120.435, 24.052], moe, 'The MOE dictionary’s Lukang locality reference.', ['Lukang', 'Lugang']),
  point('tsuan-chiang', 'sanxia', 'Sam-kiap', '三峽', [121.369, 24.934], moe, 'The MOE dictionary’s Sanxia locality reference in New Taipei.', ['Sanxia', 'Sansia', '三峡']),
  point('tsuan-chiang', 'singapore', 'Sin-ka-pho', '新加坡', [103.8198, 1.3521], {
    title: 'Luo Futeng · The Hokkien dialect in Singapore', url: 'https://culturepaedia.singaporeccc.org.sg/language-education/the-hokkien-dialect-in-singapore/', locator: 'Opening account and Phonology · Quanzhou, Zhangzhou, Amoy and Tong’an connections',
  }, 'Singapore Hokkien community reference; the source describes contact and speaker variation, not one uniform city-wide pronunciation.', ['Singapore']),
  point('tsuan-chiang', 'george-town', 'Pho Te', '喬治市', [100.3327, 5.4141], {
    title: 'Ông Kuì-lân 2022 · On the Penang Hokkien Phonetic System and Vocabulary', url: 'https://taiwan.ntue.edu.tw/var/file/29/1029/img/692/476201647.pdf', locator: 'Abstract and fieldwork discussion · Penang Hokkien and Zhangzhou-area comparisons',
  }, 'George Town anchor within the wider Penang Hokkien community; regional fieldwork does not establish a single accent for every resident.', ['George Town', 'Penang', '槟城', '檳城']),
  point('teo-swa', 'chaozhou', 'Teochew', '潮州', [116.6323, 23.6618], gd, 'Urban Teochew reference named in the provincial Chaoshan distribution.', ['Chaozhou']),
  point('teo-swa', 'shantou', 'Swatow', '汕頭', [116.682, 23.354], gd, 'Urban Swatow reference; the gazetteer lists Chenghai and Chaoyang separately.', ['Shantou', '汕头']),
  point('teo-swa', 'jieyang', 'Jieyang', '揭陽', [116.37, 23.55], gd, 'Rongcheng urban anchor for the Jieyang reference; not the whole multilingual prefecture.', ['揭阳', 'Rongcheng', '榕城']),
  point('teo-swa', 'chenghai', 'Chenghai', '澄海', [116.76, 23.47], gd, 'Chenghai town reference named separately from Swatow in the provincial distribution.'),
  point('teo-swa', 'chaoyang-min', 'Chaoyang', '潮陽', [116.6, 23.26], gd, 'Chaoyang town reference in the Chaoshan list; distinct from the Liaoning locality with the same English name.', ['潮阳']),
  point('longyan-zhangping', 'longyan-min', 'Longyan', '龍巖', [117.03, 25.1], fjLocal('龙岩', '闽南西片'), 'Xinluo urban reference for Longyan Min, not the whole prefecture or its Hakka communities.', ['龙岩', 'Xinluo', '新羅']),
  point('longyan-zhangping', 'zhangping', 'Zhangping', '漳平', [117.42, 25.29], fjLocal('漳平', '闽南西片'), townScope),
  point('houguan', 'fuzhou', 'Fuzhou', '福州', [119.3, 26.07], fjEast, 'The gazetteer specifies Fuzhou city speech as its reference; suburban and county varieties remain separate.'),
  point('houguan', 'minhou', 'Minhou', '閩侯', [119.14, 26.15], fjEast, townScope, ['闽侯']),
  point('houguan', 'changle-min', 'Changle', '長樂', [119.52, 25.96], fjEast, 'Changle town anchor; the gazetteer distinguishes the Qinjiang Mandarin enclave from local Eastern Min.', ['长乐']),
  point('houguan', 'fuqing', 'Fuqing', '福清', [119.38, 25.72], fjEast, townScope),
  point('houguan', 'pingtan', 'Pingtan', '平潭', [119.79, 25.5], fjEast, townScope),
  point('houguan', 'yongtai', 'Yongtai', '永泰', [118.94, 25.87], fjEast, townScope),
  point('houguan', 'minqing', 'Minqing', '閩清', [118.86, 26.22], fjEast, townScope, ['闽清']),
  point('houguan', 'lianjiang-min', 'Lianjiang', '連江', [119.54, 26.2], fjEast, 'Fujian Lianjiang county-seat reference; not Guangdong Lianjiang 廉江.', ['连江']),
  point('houguan', 'luoyuan', 'Luoyuan', '羅源', [119.55, 26.49], fjEast, townScope, ['罗源']),
  point('houguan', 'gutian', 'Gutian', '古田', [118.75, 26.58], fjEast, townScope),
  point('houguan', 'pingnan-min', 'Pingnan', '屏南', [118.99, 26.91], fjEast, 'Fujian Pingnan county-seat reference; not Guangxi Pingnan 平南.'),
  point('funing', 'fuan', 'Fu’an', '福安', [119.65, 27.09], fjEast, 'Northern Eastern Min representative locality in the gazetteer.', ['Fuan']),
  point('funing', 'ningde', 'Ningde', '寧德', [119.53, 26.66], fjEast, 'Jiaocheng urban reference, assigned to the northern division by this gazetteer; classifications of Ningde differ.', ['宁德', 'Jiaocheng', '蕉城']),
  point('funing', 'shouning', 'Shouning', '壽寧', [119.51, 27.46], fjEast, 'County-seat Eastern Min reference; the source also documents Wu-influenced and other communities elsewhere in the county.', ['寿宁']),
  point('funing', 'zhouning', 'Zhouning', '周寧', [119.34, 27.1], fjEast, townScope, ['周宁']),
  point('funing', 'fuding', 'Fuding', '福鼎', [120.22, 27.33], fjEast, 'Urban Eastern Min reference; Southern Min-speaking villages in the same county are not included in this accent.'),
  point('funing', 'zherong', 'Zherong', '柘榮', [119.9, 27.23], fjEast, townScope, ['柘荣']),
  point('funing', 'xiapu', 'Xiapu', '霞浦', [120, 26.89], fjEast, 'County-seat Eastern Min reference; the Southern Min community of Sansha is a separate locality.'),
  point('jianou-cluster', 'jianou', 'Jian’ou', '建甌', [118.3, 27.02], fjLocal('建瓯', '闽北东片'), townScope, ['建瓯', 'Jianou']),
  point('jianou-cluster', 'songxi', 'Songxi', '松溪', [118.78, 27.53], fjLocal('松溪', '闽北东片'), townScope),
  point('jianou-cluster', 'zhenghe', 'Zhenghe', '政和', [118.86, 27.37], fjLocal('政和', '闽北东片'), townScope),
  point('jianyang-cluster', 'jianyang-min', 'Jianyang', '建陽', [118.12, 27.33], fjLocal('建阳', '闽北西片'), 'Fujian Jianyang urban reference, not the Sichuan locality with the same English name.', ['建阳']),
  point('jianyang-cluster', 'wuyishan', 'Wuyishan', '武夷山', [118.03, 27.76], fjLocal('崇安', '闽北西片'), 'Chong’an urban anchor; the source uses the older county name rather than the wider mountain scenic area.', ['Chongan', 'Chong’an', '崇安']),
  point('putian-cluster', 'putian', 'Putian', '莆田', [119.01, 25.45], fjLocal('莆田', '莆仙北片'), 'Putian urban reference, distinct from the Xianyou reference.'),
  point('putian-cluster', 'hanjiang-min', 'Hanjiang', '涵江', [119.11, 25.46], fjLocal('涵江', '莆仙北片'), 'Hanjiang town reference in Putian; not Yangzhou’s Hanjiang 邗江.'),
  point('xianyou-cluster', 'xianyou', 'Xianyou', '仙遊', [118.69, 25.36], fjLocal('仙游', '莆仙南片'), townScope, ['仙游']),
  point('yongan-cluster', 'yongan', 'Yong’an', '永安', [117.37, 25.94], fjCentral, 'Yong’an town reference in southern Central Min.', ['Yongan']),
  point('yongan-cluster', 'liedong', 'Liedong', '列東', [117.64, 26.27], fjLocal('列东', '闽中南片'), 'Liedong neighborhood reference in Sanming; a named locality, not a claim for all Sanming speech.', ['列东', 'Sanming']),
  point('yongan-cluster', 'liexi', 'Liexi', '列西', [117.63, 26.27], fjLocal('列西', '闽中南片'), 'Liexi neighborhood reference across the river from Liedong in Sanming.', ['Sanming']),
  point('shaxian-cluster', 'shaxian', 'Shaxian', '沙縣', [117.79, 26.4], fjCentral, 'Shaxian town reference, representing the gazetteer’s northern Central Min division.', ['沙县']),
  point('northeast-hainan', 'wenchang', 'Wenchang', '文昌', [110.754, 19.615], wenchang, 'The study records two Wenchang-raised speakers; the urban anchor does not extend their readings to every settlement.'),
  point('leizhou-peninsula', 'leizhou', 'Leizhou', '雷州', [110.08, 20.92], {
    title: 'ASJP · Min Leizhou dictionary sample', url: 'https://asjp.clld.org/languages/MIN_LEIZHOU', locator: 'Leizhou word-list metadata and WGS84 coordinates; source: Zhang & Cai 1998, Leizhou dialect dictionary',
  }, 'Leicheng reference, historically Haikang; dictionary metadata locates the reference at 110.08°E, 20.92°N.', ['Haikang', 'Leicheng', '海康', '雷城']),
  point('leizhou-peninsula', 'xuwen', 'Xuwen', '徐聞', [110.17, 20.33], {
    title: 'Li & Thompson 1983 · A grammatical description of Xuwen', url: 'https://doi.org/10.1163/19606028-90000262', locator: 'Part I, pp. 3–21 · locality description and phonology',
  }, 'Xuwen town reference; the study discusses Min–Yue contact rather than a uniform peninsula accent.', ['徐闻']),
  point('leizhou-peninsula', 'suixi-min', 'Suixi', '遂溪', [110.25, 21.38], {
    title: 'Yue-Hashimoto 1985 · The Suixi dialect of Leizhou', url: 'https://ci.nii.ac.jp/ncid/BA13746123', locator: 'Bibliographic record of the CUHK locality monograph: phonology, vocabulary and syntax',
  }, 'The Suixi Leizhou-Min reference described in the locality monograph; county-seat map anchor.'),
  point('pearl-delta', 'guangzhou', 'Guangzhou', '廣州', [113.26, 23.13], yueLocal('廣州'), 'Urban Guangzhou Cantonese reference; rural and district varieties are not assumed identical.', ['广州', 'Canton']),
  point('pearl-delta', 'hong-kong', 'Hong Kong', '香港', [114.17, 22.32], { ...yueSurvey, locator: 'Urban Hong Kong sample, chapters 5–6; distinct from the Kam Tin sample' }, 'Urban Hong Kong Cantonese reference; traditional New Territories village varieties remain separate.'),
  point('pearl-delta', 'macau', 'Macau', '澳門', [113.5439, 22.1987], yueLocal('Macau'), 'Urban Macau Cantonese reference.', ['Macao', '澳门']),
  point('pearl-delta', 'foshan', 'Foshan', '佛山', [113.122, 23.028], yueLocal('佛山'), 'Old urban Foshan reference; Nanhai, Shunde and other district references are separate entries.'),
  point('pearl-delta', 'shunde', 'Shunde', '順德', [113.25, 22.83], yueLocal('順德'), 'Daliang town anchor for the Shunde reference; other Shunde towns can have different speech.', ['顺德', 'Daliang', '大良']),
  point('pearl-delta', 'nanhai', 'Nanhai', '南海', [113.14, 23.05], yueLocal('南海'), 'Guicheng urban anchor for the source’s Nanhai reference; no claim that all Nanhai towns have one accent.', ['Guicheng', '桂城']),
  point('pearl-delta', 'sanshui', 'Sanshui', '三水', [112.89, 23.16], yueLocal('三水'), 'Xinan urban anchor for the source’s Sanshui reference.', ['Xinan', '西南']),
  point('pearl-delta', 'gaoming', 'Gaoming', '高明', [112.89, 22.9], yueLocal('高明'), 'Hecheng urban anchor for the Gaoming reference.', ['Hecheng', '荷城']),
  point('guan-bao', 'dongguan', 'Dongguan', '東莞', [113.75, 23.04], yueLocal('東莞'), 'Guancheng reference, not every town in the multilingual modern city.', ['东莞', 'Guancheng', '莞城']),
  point('guan-bao', 'baoan', 'Bao’an', '寶安', [113.91, 22.56], yueLocal('寶安'), 'Bao’an locality anchor in Shenzhen; the historical county and modern district have different extents.', ['宝安', 'Baoan', 'Shenzhen']),
  point('xiangshan', 'zhongshan-yue', 'Zhongshan', '中山', [113.38, 22.52], yueLocal('中山'), 'Shiqi Yue reference; Zhongshan also has distinct Min communities, which are not included here.', ['Shiqi', '石岐']),
  point('xiangshan', 'zhuhai-yue', 'Zhuhai', '珠海', [113.58, 22.27], yueLocal('珠海'), 'Xiangzhou urban anchor; the Siyi reference of Doumen is separate.', ['Xiangzhou', '香洲']),
  point('west-river-guangfu', 'zhaoqing', 'Zhaoqing', '肇慶', [112.47, 23.05], yueLocal('肇慶'), 'Duanzhou urban reference; other localities in the prefecture belong to different atlas groupings.', ['肇庆', 'Duanzhou', '端州']),
  point('west-river-guangfu', 'wuzhou', 'Wuzhou', '梧州', [111.314, 23.477], yueLocal('梧州', 3), 'Urban Wuzhou Guangfu reference; surrounding rural Goulou varieties are not included.'),
  point('north-guangdong-guangfu', 'shaoguan-yue', 'Shaoguan', '韶關', [113.59, 24.81], yueLocal('韶關'), 'Shaoguan Yue locality reference; Hakka and northern Guangdong local speech are not classified by this pin.', ['韶关']),
  point('north-guangdong-guangfu', 'qingyuan', 'Qingyuan', '清遠', [113.03, 23.7], yueLocal('清遠'), 'Urban Qingyuan reference; the entire prefecture is not treated as one dialect.', ['清远']),
  point('tan-river', 'taishan', 'Taishan', '台山', [112.79, 22.25], yueLocal('台山'), 'Taicheng urban anchor for the Taishan reference; village and emigrant varieties remain distinct.', ['Toishan', 'Taicheng', '臺山', '台城']),
  point('tan-river', 'kaiping', 'Kaiping', '開平', [112.698, 22.377], yueLocal('開平'), townScope, ['开平']),
  point('tan-river', 'jiangmen', 'Jiangmen', '江門', [113.081, 22.579], yueLocal('江門'), 'Historic urban Jiangmen reference, not the whole modern prefecture.', ['江门']),
  point('tan-river', 'enping', 'Enping', '恩平', [112.3, 22.18], yueLocal('恩平'), townScope),
  point('tan-river', 'xinhui', 'Xinhui', '新會', [113.03, 22.46], yueLocal('新會'), 'Huicheng urban anchor for the Xinhui reference; other Xinhui towns may differ.', ['新会', 'Huicheng', '會城']),
  point('tan-river', 'doumen', 'Doumen', '斗門', [113.29, 22.21], yueLocal('斗門'), 'Jing’an town anchor for the Doumen reference; not an assignment of all Zhuhai to Siyi.', ['斗门', 'Jingan', '井岸']),
  point('goulou-guangxi', 'yulin', 'Yulin', '玉林', [110.18, 22.65], yueLocal('玉林', 3), 'Urban Yulin reference in the Goulou row of the cited classification.'),
  point('goulou-guangxi', 'beiliu', 'Beiliu', '北流', [110.35, 22.71], yueLocal('北流', 3), townScope),
  point('goulou-guangxi', 'guigang', 'Guigang', '貴港', [109.6, 23.09], yueLocal('貴港', 3), 'Guigang reference, called Guixian in older sources; this follows the table’s Goulou assignment.', ['贵港', 'Guixian', '貴縣', '贵县']),
  point('goulou-guangdong', 'sihui', 'Sihui', '四會', [112.73, 23.33], yueLocal('四會', 3), townScope, ['四会']),
  point('goulou-guangdong', 'guangning', 'Guangning', '廣寧', [112.44, 23.63], yueLocal('廣寧', 3), townScope, ['广宁']),
  point('goulou-guangdong', 'luoding', 'Luoding', '羅定', [111.57, 22.77], yueLocal('羅定', 3), townScope, ['罗定']),
  point('yong-xun-river-towns', 'nanning', 'Nanning', '南寧', [108.321, 22.817], yueLocal('南寧'), 'Urban Nanning Yue reference, distinct from local Pinghua and Zhuang.', ['南宁']),
  point('yong-xun-river-towns', 'guiping', 'Guiping', '桂平', [110.08, 23.39], yueLocal('桂平'), 'Urban Guiping Yue reference; rural Goulou and other communities are outside this point’s scope.'),
  point('yong-xun-river-towns', 'hengzhou', 'Hengzhou', '橫州', [109.26, 22.68], yueLocal('橫州'), 'Hengzhou town reference; older sources use Hengxian.', ['横州', 'Hengxian', '橫縣', '横县']),
  point('yong-xun-river-towns', 'yongning-yue', 'Yongning', '邕寧', [108.49, 22.76], yueLocal('邕寧'), 'Pumiao town anchor for the Yongning Yue reference; this is not the separate Yongning Pinghua sample.', ['邕宁', 'Pumiao', '蒲廟']),
  point('qin-lian-coast', 'beihai', 'Beihai', '北海', [109.119, 21.481], yueSurvey, 'Beihai urban Yue reference, named in the Qin–Lian distribution.'),
  point('qin-lian-coast', 'lianzhou-qinlian', 'Lianzhou', '廉州', [109.2, 21.66], yueLocal('廉州', 3), 'Lianzhou town in Hepu, not Guangdong Lianzhou 連州.', ['Hepu', '合浦']),
  point('qin-lian-coast', 'qinzhou', 'Qinzhou', '欽州', [108.62, 21.96], yueSurvey, 'Qinzhou urban reference; surrounding town varieties need separate samples.', ['钦州']),
  point('qin-lian-coast', 'lingshan-yue', 'Lingshan', '靈山', [109.29, 22.42], yueLocal('靈山', 3), 'Lingshan locality reference in the source’s Qin–Lian row; no whole-county uniformity is implied.', ['灵山']),
  point('liangyang', 'yangjiang', 'Yangjiang', '陽江', [111.982, 21.858], yueLocal('陽江'), 'Jiangcheng urban reference, not every town in the modern prefecture.', ['阳江', 'Jiangcheng', '江城']),
  point('liangyang', 'yangchun', 'Yangchun', '陽春', [111.79, 22.17], yueLocal('陽春'), 'Chuncheng urban anchor for Yangchun; the study separately discusses the Hekou variety.', ['阳春', 'Chuncheng', '春城']),
  point('gaozhou-area', 'gaozhou', 'Gaozhou', '高州', [110.85, 21.92], yueLocal('高州'), townScope),
  point('wu-hua-localities', 'huazhou', 'Huazhou', '化州', [110.639, 21.664], yueSurvey, 'Huazhou urban reference, following Xiong’s Wu–Hua assignment summarized in the source.'),
  point('wu-hua-localities', 'wuchuan-yue', 'Wuchuan', '吳川', [110.78, 21.44], yueSurvey, 'Meilu urban Yue reference; Leizhou-Min communities in the wider county are not included.', ['吴川', 'Meilu', '梅菉']),
];
