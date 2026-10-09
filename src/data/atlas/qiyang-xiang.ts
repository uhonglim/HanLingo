import type { AtlasLocality } from './types';

export const atlasQiyangLocalities: AtlasLocality[] = [{
  id: 'qiyang-study', name: 'Qiyang', nativeName: '祁陽',
  groupId: 'xiang', branchId: 'yongquan', clusterId: 'dongqi',
  coordinates: [111.84812, 26.58949],
  scope: 'Qiyang County as named in Zhu and Zhang’s 2008 acoustic study. Twelve middle-aged native speakers were recorded and nine included in the acoustic analysis. The paper does not name their towns or recording date. This regional anchor is not a speaker address or a claim that the entire present-day city shares these readings.',
  source: {
    title: 'Wang Zhongli · Phonetic Study of Qiyang Dialect · 2020',
    url: 'https://www.ruralchina.cn/xcyj/XCBookDetail?ID=7301666&SiteID=18&SubLibID=',
    locator: 'Publisher’s Chinese abstract explicitly assigns Qiyang to Xiang, Yong–Quan, Dong–Qi. Zhu and Zhang 2008 separately describe their Qiyang sample as Old Xiang; the 2020 book does not identify the earlier consultants.',
  },
  geographySource: {
    title: 'Wikidata · Qiyang · Q1199641 · CC0',
    url: 'https://www.wikidata.org/wiki/Q1199641',
    locator: 'P625 coordinate 26.58949 N, 111.84812 E; cached county gazetteer matches Chinese label 祁阳市 and administrative code 431181. Geographic reference only.',
  },
  aliases: ['祁阳', '祁阳县', '祁陽縣', 'Qiyang County', 'Qiyang Xiang'],
}];
