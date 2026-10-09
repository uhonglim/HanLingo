import type { AtlasCluster, AtlasLocality, AtlasSource } from './types';

const source: AtlasSource = {
  title: 'Ho Chun-Hui · Laiyuan fieldwork · 2016',
  url: 'https://cloud.hakka.gov.tw/site/hakka/public/attachment/105A0010.pdf',
  locator: 'Printed pp. 2 and 19 decline a direct Min or Hakka assignment; Fig. 2 locates the villages. Pp. 20 and 47 identify the consultant communities. Contact varieties, Western Fujian and Laiyuan are editorial geographic collections, not genealogical ranks.',
};

export const atlasLaiyuanContactClusters: AtlasCluster[] = [{
  id: 'laiyuan', groupId: 'contact', branchId: 'western-fujian',
  branchName: 'Western Fujian', branchNativeName: '閩西',
  name: 'Laiyuan', nativeName: '賴源', kind: 'geographic',
  description: 'Named communities in Laiyuan township, Liancheng. Ho describes mixed varieties and does not assign them directly to Min or Hakka. This is an editorial geographic collection, not a formal linguistic subdivision.',
  source,
}];

export const atlasLaiyuanContactLocalities: AtlasLocality[] = [
  {
    id: 'niujia-laiyuan', name: 'Niujia', nativeName: '牛家',
    groupId: 'contact', branchId: 'western-fujian', clusterId: 'laiyuan',
    coordinates: [116.97338, 25.55008],
    scope: 'Ho’s 2016 Niujia reference in Laiyuan township, Liancheng. The main consultant came from Dongkenglong natural village within Niujia administrative village; another consultant was also from Niujia. The map marks a named settlement, not their homes or a language boundary. The source does not assign this variety directly to Min or Hakka.',
    source,
    geographySource: {
      title: 'GeoNames · Niujiacun · populated place 7525880',
      url: 'https://www.geonames.org/7525880/niujiacun.html',
      locator: '牛家 / 牛家村, Longyan, Fujian; WGS84 25.55008 N, 116.97338 E. Named settlement anchor; Laiyuan village identity is independently documented in Ho’s Fig. 2 and consultant table, not a consultant address.',
    },
    aliases: ['牛家村', '賴源牛家', '赖源牛家', 'Niujiacun', 'Dongkenglong', '東坑壠', '东坑垅'],
  },
  {
    id: 'huangzong-laiyuan', name: 'Huangzong', nativeName: '黃宗',
    groupId: 'contact', branchId: 'western-fujian', clusterId: 'laiyuan',
    coordinates: [116.93914, 25.52519],
    scope: 'Ho’s published 2016 Huangzong reference in Laiyuan township, Liancheng. Consultants came from Nanyang and Dakengtou natural villages within Huangzong administrative village; the study acknowledges differences between them. The map marks a named settlement, not their homes or a language boundary. The source does not assign this variety directly to Min or Hakka.',
    source,
    geographySource: {
      title: 'GeoNames · Huangzongcun · populated place 7526393',
      url: 'https://www.geonames.org/7526393/huangzongcun.html',
      locator: '黄宗 / 黄宗村, Longyan, Fujian; WGS84 25.52519 N, 116.93914 E. Named settlement anchor; Laiyuan village identity is independently documented in Ho’s Fig. 2 and consultant table, not a consultant address.',
    },
    aliases: ['黄宗', '黄宗村', '黃宗村', '賴源黃宗', '赖源黄宗', 'Huangzongcun', 'Nanyang', 'Dakengtou', '南洋', '大坑頭', '大坑头'],
  },
];
