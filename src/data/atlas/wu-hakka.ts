import type { AtlasCluster, AtlasLocality, AtlasSource } from './types';

const wuBook = 'https://zjjcmspublic.oss-cn-hangzhou-zwynet-d01-a.internet.cloud.zj.gov.cn/jcms_files/jcms1/web2476/site/attach/0/16hywh-2/%E6%B5%99%E6%B1%9F%E5%90%B4%E8%AF%AD%E5%88%86%E5%8C%BA.pdf';
const gazetteer = 'https://dfz.zj.gov.cn/zlyz/ossfs/h5/ZS-H-330000-2010-097-0101/files/basic-html/';
const wuSource = (locator: string): AtlasSource => ({ title: 'Fu Guotong et al.: Zhejiang Wu classification, 1985', url: wuBook, locator });
const gazSource = (page: number, locator: string): AtlasSource => ({ title: 'Zhejiang provincial gazetteer: Dialects', url: `${gazetteer}page${page}.html`, locator: `Digital page ${page}; ${locator}` });
const taicang: AtlasSource = { title: 'Taicang cultural bureau: Local speech', url: 'https://www.taicang.gov.cn/taicang/tcwh/202009/ddacdc104e204cb58023f837d3591499.shtml', locator: 'Opening paragraph: Taihu, Su-Hu-Jia and the Taicang area' };
const dabu: AtlasSource = { title: 'Dabu county: Local Hakka varieties', url: 'https://www.dabu.gov.cn/zjdp/whts/fy/content/post_2591731.html', locator: '大埔客家方言的分片: named towns and five local areas, 2024-01-24' };
const hailu: AtlasSource = { title: 'NCU Hakka College: Origins of Taiwan Hailu', url: 'https://hakka.ncu.edu.tw/Hakka_ePaper/paper/paper150/02_01.html', locator: 'Wu Chung-chieh research account: Hetian, Xintian and local migration histories, 2012-02-01' };
const taiwanHailu: AtlasSource = { title: 'Taichung Hakka Affairs Commission: Accent distribution', url: 'https://www.hakka.taichung.gov.tw/28009/28168/71488/381494/', locator: '海陸腔 township list; several localities also appear under other accents' };
const changting: AtlasSource = { title: 'Lin Hui-shan: Changting Hakka Tone Sandhi, 2007', url: 'https://toaj.stpi.niar.org.tw/index/journal/volume/article/4b1141f987fa79a3018808aead6d1f34', locator: 'Chinese abstract: county town and its suburbs; paper pp. 175–225' };
const meixian: AtlasSource = { title: 'City University of Hong Kong: Vowels and tones in Meixian Hakka', url: 'https://lbms03.cityu.edu.hk/theses/c_ftt/phd-ctl-b40860632f.pdf', locator: 'Meixian reference and speaker sample; retained locality evidence' };
const wuhua: AtlasSource = { title: 'Hsu: Comparative study of Guangdong Wuhua Hakka', url: 'https://hakka.ncu.edu.tw/Hakka_ePaper/paper/paper139/05_03.html', locator: 'Author abstract: northern/southern phonological division; Anliu and Meilin, 2011-08-15' };
const xingning: AtlasSource = { title: 'Hakka Affairs Council: Xingning Hakka phonology study', url: 'https://sign.hakka.gov.tw/File/Get?filename=%5CAttach%5C1990%5C1%5C8522162371.pdf', locator: 'Xingning investigation; retained locality reference' };

const cluster = (id: string, groupId: 'wu' | 'hakka', branchId: string, branchName: string, branchNativeName: string, name: string, nativeName: string, kind: AtlasCluster['kind'], description: string, source: AtlasSource): AtlasCluster => ({ id, groupId, branchId, branchName, branchNativeName, name, nativeName, kind, description, source });
export const atlasWuHakkaClusters: AtlasCluster[] = [
  cluster('su-hu-jia', 'wu', 'taihu', 'Taihu', '太湖片', 'Su-Hu-Jia', '蘇滬嘉', 'classification', 'The established Taihu subdivision; city and township samples remain separate.', taicang),
  cluster('huzhou', 'wu', 'taihu', 'Taihu', '太湖片', 'Huzhou', '湖州', 'classification', 'Huzhou, also called Tiaoxi in other classifications.', wuSource('§2.2.2, printed pp. 11–12; PDF pp. 17–18')),
  cluster('hangzhou-cluster', 'wu', 'taihu', 'Taihu', '太湖片', 'Hangzhou', '杭州', 'classification', 'The old urban Hangzhou variety; surrounding areas require separate references.', gazSource(51, '杭州方言: old city and seven named villages')),
  cluster('linshao', 'wu', 'taihu', 'Taihu', '太湖片', 'Linshao', '臨紹', 'classification', 'The source-defined Linshao subdivision; county labels are reference points, not uniform territories.', wuSource('§2.2.4, printed pp. 13–15; PDF pp. 19–21')),
  cluster('yongjiang', 'wu', 'taihu', 'Taihu', '太湖片', 'Yongjiang', '甬江', 'classification', 'Also named Ningbo or Mingzhou in the cited gazetteer.', gazSource(169, '五、宁波小片其余方言音系: distribution paragraph')),
  cluster('linhai-sanmen', 'wu', 'taizhou', 'Taizhou', '台州片', 'Linhai–Sanmen', '臨海三門', 'classification', 'One of the three internal Taizhou areas described in the 1985 study.', wuSource('§2.3.1, printed p. 17; PDF p. 23')),
  cluster('tiantai-xianju', 'wu', 'taizhou', 'Taizhou', '台州片', 'Tiantai–Xianju', '天台仙居', 'classification', 'The study pairs Tiantai and Xianju within Taizhou Wu.', wuSource('§2.3.1, printed p. 17; PDF p. 23')),
  cluster('huangyan-wenling', 'wu', 'taizhou', 'Taizhou', '台州片', 'Huangyan–Wenling', '黃巖溫嶺', 'classification', 'The study groups Huangyan and Wenling with northern Yueqing.', wuSource('§2.3.1, printed p. 17; PDF p. 23')),
  cluster('wenzhou-area', 'wu', 'oujiang', 'Oujiang', '甌江片', 'Wenzhou area', '溫州地區', 'geographic', 'A locality collection within Oujiang, not an additional claimed genetic division.', wuSource('§2.3.2, printed pp. 18–19; PDF pp. 24–25')),
  cluster('jinhua-basin', 'wu', 'wuzhou', 'Wuzhou', '婺州片', 'Jinhua basin', '金華盆地', 'geographic', 'A geographic collection of documented Wuzhou reference places; internal speech differs.', wuSource('§2.3.3, printed p. 21; PDF p. 27')),
  cluster('lishui-cluster', 'wu', 'chuqu', 'Chuqu', '處衢片', 'Lishui', '麗水', 'classification', 'The gazetteer’s Lishui subdivision; its distribution contains other language communities too.', gazSource(346, '五、丽水小片其余方言音系')),
  cluster('quzhou', 'wu', 'chuqu', 'Chuqu', '處衢片', 'Quzhou', '衢州', 'classification', 'The Quzhou subdivision as delimited by the provincial gazetteer.', gazSource(381, '五、衢州小片其余方言音系')),
  cluster('meizhou-references', 'hakka', 'yuetai', 'Yue–Tai', '粵台片', 'Meizhou references', '梅州參照點', 'geographic', 'Separate Meixian, Xingning and Wuhua references. This geographic collection does not make their speech identical.', wuhua),
  cluster('dabu-towns', 'hakka', 'yuetai', 'Yue–Tai', '粵台片', 'Dabu towns', '大埔鄉鎮', 'geographic', 'The county documents five internal areas. This collection keeps named towns visible without treating the county as one accent.', dabu),
  cluster('haifeng-lufeng', 'hakka', 'hailu', 'Hailu', '海陸片', 'Haifeng–Lufeng', '海豐陸豐', 'geographic', 'Existing county reference entries; the region also contains Min and other speech communities.', hailu),
  cluster('hetian', 'hakka', 'hailu', 'Hailu', '海陸片', 'Hetian', '河田', 'classification', 'The mainland Hetian grouping discussed in the university research account.', hailu),
  cluster('xintian', 'hakka', 'hailu', 'Hailu', '海陸片', 'Xintian', '新田', 'classification', 'The Xintian grouping in the cited research; Nanwan is contact-affected and is not simplified into one accent.', hailu),
  cluster('taiwan-hailu', 'hakka', 'hailu', 'Hailu', '海陸片', 'Taiwan Hailu', '臺灣海陸', 'geographic', 'Local Hailu communities documented by Taiwan’s Hakka authorities. This is a geographic collection, not a claim of identical mainland ancestry.', taiwanHailu),
  cluster('changting-reference', 'hakka', 'tingzhou', 'Tingzhou', '汀州片', 'Changting reference', '長汀參照點', 'geographic', 'The county-town reference studied by Lin; no finer genetic subdivision is asserted.', changting),
];

type Row = [id: string, name: string, nativeName: string, longitude: number, latitude: number, scope?: string];
const locations = (clusterId: string, rows: Row[], source?: AtlasSource): AtlasLocality[] => {
  const c = atlasWuHakkaClusters.find(item => item.id === clusterId)!;
  return rows.map(([id, name, nativeName, lon, lat, scope]) => ({
    id, name, nativeName, groupId: c.groupId, branchId: c.branchId, clusterId,
    coordinates: [lon, lat], source: source ?? c.source,
    scope: scope ?? 'Approximate locality anchor; the source reference does not describe every resident.',
  }));
};

export const atlasWuHakkaLocalities: AtlasLocality[] = [
  ...locations('su-hu-jia', [
    ['shanghai', 'Shanghai', '上海', 121.47, 31.23, 'Urban Shanghai; suburban varieties remain distinct.'],
  ], { title: 'Shanghai culture and tourism authority: Shanghai dialect', url: 'https://cmp.whlyj.sh.gov.cn/CMP/sho_init.ac?type=4', locator: '上海方言: 太湖片苏沪嘉小片' }),
  ...locations('su-hu-jia', [
    ['suzhou', 'Suzhou', '蘇州', 120.59, 31.3],
  ], { title: 'Wuxi archives: Local dialect geography', url: 'https://daj.wuxi.gov.cn/doc/2014/06/10/2426144.shtml', locator: 'Su-Hu-Jia as the grouping represented by Suzhou; Wuxi transition caveat' }),
  ...locations('su-hu-jia', [
    ['taicang', 'Taicang', '太倉', 121.1, 31.45],
    ['jiading', 'Jiading', '嘉定', 121.25, 31.38],
    ['baoshan', 'Baoshan', '寶山', 121.49, 31.41],
    ['chongming', 'Chongming', '崇明', 121.4, 31.62],
    ['haimen', 'Haimen', '海門', 121.18, 31.89],
    ['qidong', 'Qidong', '啟東', 121.66, 31.81],
  ]),
  ...locations('su-hu-jia', [
    ['jiaxing', 'Jiaxing', '嘉興', 120.76, 30.75],
    ['jiashan', 'Jiashan', '嘉善', 120.93, 30.84],
    ['tongxiang', 'Tongxiang', '桐鄉', 120.57, 30.63],
    ['haining', 'Haining', '海寧', 120.68, 30.51],
  ], wuSource('§2.2.1, printed pp. 9–10; classification discussion: Jiaxing belongs to Su-Hu-Jia')),
  ...locations('huzhou', [
    ['huzhou', 'Huzhou', '湖州', 120.09, 30.87],
    ['anji', 'Anji', '安吉', 119.68, 30.64],
    ['deqing', 'Deqing', '德清', 119.98, 30.55],
    ['yuhang', 'Yuhang', '餘杭', 119.94, 30.27, 'Old Yuhang reference, not the whole modern district.'],
  ]),
  ...locations('hangzhou-cluster', [['hangzhou', 'Hangzhou', '杭州', 120.16, 30.25, 'Hangzhou Wu reference. Classification sources describe old-city speech, distinct from Yuhang and Xiaoshan; individual studies retain their own locality scope. The city-centre marker is not a speaker location.']]),
  ...locations('linshao', [
    ['fuyang', 'Fuyang', '富陽', 119.96, 30.05],
    ['tonglu', 'Tonglu', '桐廬', 119.68, 29.8],
    ['shaoxing', 'Shaoxing', '紹興', 120.58, 30.0],
    ['shangyu', 'Shangyu', '上虞', 120.87, 30.03],
    ['shengzhou', 'Shengzhou', '嵊州', 120.83, 29.56, 'The source names Shengxian; present locality label Shengzhou.'],
    ['xinchang', 'Xinchang', '新昌', 120.9, 29.5],
    ['zhuji', 'Zhuji', '諸暨', 120.25, 29.72],
    ['xiaoshan', 'Xiaoshan', '蕭山', 120.27, 30.17],
    ['yuyao', 'Yuyao', '餘姚', 121.16, 30.04, 'Urban reference; Zhangting and Lubu are assigned to Yongjiang in the newer gazetteer.'],
  ]),
  ...locations('yongjiang', [
    ['ningbo', 'Ningbo', '寧波', 121.55, 29.87],
    ['fenghua', 'Fenghua', '奉化', 121.41, 29.66],
    ['xiangshan', 'Xiangshan', '象山', 121.87, 29.48],
    ['ninghai', 'Ninghai', '寧海', 121.43, 29.29, 'Town reference north of Chalu; the south belongs to Taizhou in this source.'],
    ['dinghai', 'Dinghai', '定海', 122.11, 30.02],
  ]),
  ...locations('linhai-sanmen', [
    ['linhai', 'Linhai', '臨海', 121.12, 28.85],
    ['sanmen', 'Sanmen', '三門', 121.4, 29.1],
  ]),
  ...locations('tiantai-xianju', [
    ['tiantai', 'Tiantai', '天台', 121.03, 29.14],
    ['xianju', 'Xianju', '仙居', 120.73, 28.85],
  ]),
  ...locations('huangyan-wenling', [
    ['huangyan', 'Huangyan', '黃巖', 121.26, 28.65],
    ['wenling', 'Wenling', '溫嶺', 121.39, 28.37],
  ]),
  ...locations('wenzhou-area', [
    ['wenzhou', 'Wenzhou', '溫州', 120.7, 28.0],
    ['yueqing', 'Yueqing', '樂清', 120.97, 28.12, 'Lecheng town reference; northern Yueqing contains Taizhou Wu.'],
    ['yongjia', 'Yongjia', '永嘉', 120.69, 28.15],
    ['ruian', 'Ruian', '瑞安', 120.66, 27.78],
    ['pingyang', 'Pingyang', '平陽', 120.57, 27.66],
  ]),
  ...locations('jinhua-basin', [
    ['jinhua', 'Jinhua', '金華', 119.65, 29.08],
    ['lanxi', 'Lanxi', '蘭溪', 119.47, 29.21],
    ['yongkang', 'Yongkang', '永康', 120.03, 28.89],
    ['wuyi', 'Wuyi', '武義', 119.82, 28.89],
    ['dongyang', 'Dongyang', '東陽', 120.23, 29.29],
    ['yiwu', 'Yiwu', '義烏', 120.08, 29.31],
  ]),
  ...locations('lishui-cluster', [
    ['lishui', 'Lishui', '麗水', 119.92, 28.45],
    ['qingtian', 'Qingtian', '青田', 120.29, 28.14, 'Town reference; Wenxi and part of Wanshan are excluded by this source.'],
    ['yunhe', 'Yunhe', '雲和', 119.57, 28.12],
    ['jingning', 'Jingning', '景寧', 119.64, 27.98],
    ['qingyuan-zhejiang', 'Qingyuan', '慶元', 119.06, 27.62],
    ['songyang', 'Songyang', '松陽', 119.48, 28.45],
    ['suichang', 'Suichang', '遂昌', 119.27, 28.59],
    ['longquan', 'Longquan', '龍泉', 119.14, 28.07],
    ['taishun', 'Taishun', '泰順', 119.72, 27.56, 'Luoyang county-town anchor; southern Min areas and Baizhang are excluded.'],
  ]),
  ...locations('quzhou', [
    ['quzhou', 'Quzhou', '衢州', 118.87, 28.94],
    ['longyou', 'Longyou', '龍游', 119.17, 29.03],
    ['jiangshan', 'Jiangshan', '江山', 118.63, 28.74],
    ['changshan', 'Changshan', '常山', 118.51, 28.9],
    ['kaihua', 'Kaihua', '開化', 118.42, 29.14],
  ]),
  ...locations('meizhou-references', [['meixian', 'Meixian', '梅縣', 116.08, 24.27, 'Meixian reference; not a reading for the whole Meizhou municipality.']], meixian),
  ...locations('meizhou-references', [['wuhua', 'Wuhua', '五華', 115.78, 23.93, 'Shuizhai county-town anchor; southern Anliu and Meilin have separate references.']], wuhua),
  ...locations('meizhou-references', [['xingning', 'Xingning', '興寧', 115.73, 24.14]], xingning),
  ...locations('dabu-towns', [['dabu', 'Dabu', '大埔', 116.69, 24.35, 'Huliao county-town reference, paired with Baihou by the source.']]),
  ...locations('haifeng-lufeng', [
    ['haifeng', 'Haifeng', '海豐', 115.32, 22.97, 'County anchor; Hakka references concern specific local communities, not the Min-speaking county town.'],
    ['lufeng', 'Lufeng', '陸豐', 115.64, 22.95, 'County anchor; named northern Hakka towns are distinct from the county-wide population.'],
  ]),
  ...locations('changting-reference', [['changting', 'Changting', '長汀', 116.36, 25.83, 'County-town and suburban Changting Hakka study reference.']]),
  ...locations('dabu-towns', [
    ['baihou', 'Baihou', '百侯', 116.77, 24.3, 'Huliao–Baihou area in the county account.'],
    ['chayang', 'Chayang', '茶陽', 116.68, 24.52, 'Named with Xihe in the county’s second area.'],
    ['sanhe-dabu', 'Sanhe', '三河', 116.56, 24.4, 'Named in the county’s third area.'],
    ['gaopi-dabu', 'Gaopi', '高陂', 116.63, 24.19, 'Named in the county’s fourth area.'],
  ]),
  ...locations('hetian', [
    ['hetian-luhe', 'Hetian', '河田', 115.65, 23.31, 'Luhe town; local study reference, not every village.'],
    ['dongkeng-luhe', 'Dongkeng', '東坑', 115.70, 23.29, 'Luhe town named in the Hetian migration area.'],
    ['shuichun', 'Shuichun', '水唇', 115.72, 23.32, 'Luhe town named in the Hetian migration area.'],
    ['luoxi-luhe', 'Luoxi', '螺溪', 115.62, 23.39, 'Luhe town named in the Hetian migration area.'],
  ]),
  ...locations('xintian', [
    ['xintian-luhe', 'Xintian', '新田', 115.55, 23.19, 'Luhe town; its study grouping differs from Taiwan Hailu.'],
    ['hekou-luhe', 'Hekou', '河口', 115.60, 23.18, 'Luhe town explicitly included in the Xintian grouping.'],
  ]),
  ...locations('taiwan-hailu', [
    ['guanyin-hakka', 'Guanyin', '觀音', 121.08, 25.04],
    ['xinwu-hakka', 'Xinwu', '新屋', 121.1, 24.97],
    ['xinfeng-hakka', 'Xinfeng', '新豐', 120.99, 24.9],
    ['xinpu-hakka', 'Xinpu', '新埔', 121.07, 24.83],
    ['hukou-hakka', 'Hukou', '湖口', 121.04, 24.9],
    ['qionglin-hakka', 'Qionglin', '芎林', 121.08, 24.77],
    ['hengshan-hakka', 'Hengshan', '橫山', 121.12, 24.72],
    ['guanxi-hakka', 'Guanxi', '關西', 121.18, 24.8, 'Hailu in part of Guanxi; Sixian also documented.'],
    ['beipu-hakka', 'Beipu', '北埔', 121.05, 24.7],
    ['baoshan-hakka', 'Baoshan', '寶山', 120.99, 24.76],
    ['emei-hakka', 'Emei', '峨眉', 121.02, 24.69],
    ['zhudong-hakka', 'Zhudong', '竹東', 121.09, 24.74],
    ['jian-hakka', 'Jian', '吉安', 121.57, 23.97],
    ['shoufeng-hakka', 'Shoufeng', '壽豐', 121.51, 23.87],
    ['guangfu-hakka', 'Guangfu', '光復', 121.42, 23.67],
    ['yuli-hakka', 'Yuli', '玉里', 121.32, 23.34],
    ['ruisui-hakka', 'Ruisui', '瑞穗', 121.38, 23.5],
    ['fenglin-hakka', 'Fenglin', '鳳林', 121.45, 23.75],
  ]).map(point => ({ ...point, scope: point.id === 'guanxi-hakka' ? point.scope : 'Hailu community reference.' })),

];
