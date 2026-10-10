import type { AtlasCluster, AtlasLocality } from './types';

const paper = {
  title: 'Yang and colleagues · The Phonology of Tonggu Hakka · 2016',
  url: 'https://pdf.hanspub.org/ml20160400000_58054424.pdf',
  locator: 'Pages 128–129: the paper’s Hakka reference is consultant Li Sanhong of Guancang hamlet, Xihu village, Yongning town. The same county also has Gan; this is not a county-wide uniform speech claim.',
};

export const atlasTongguXihuClusters: AtlasCluster[] = [{
  id: 'yongning-localities', groupId: 'hakka', branchId: 'tonggui',
  branchName: 'Tonggui', branchNativeName: '銅桂片',
  name: 'Yongning', nativeName: '永寧', kind: 'geographic',
  description: 'Hakka study localities within Yongning town, Tonggu County. A geographic collection, not a newly claimed linguistic subdivision.',
  source: {
    title: 'Jing Liwen · Second-edition Language Atlas county tabulation · 2025 · CC BY 4.0',
    url: 'https://doi.org/10.5281/zenodo.15897647',
    locator: 'Tab-delimited source lines 2251–2252 list Tonggu County 360926 under Hakka / Tonggui. Line 2250 separately lists Gan / Yiliu. The 2016 phonology paper supplies the village-level Hakka attestation; this county table is not a village survey or an official digital Atlas edition.',
  },
}];

export const atlasTongguXihuLocalities: AtlasLocality[] = [{
  id: 'tonggu-xihu', name: 'Xihu', nativeName: '西湖',
  groupId: 'hakka', branchId: 'tonggui', clusterId: 'yongning-localities',
  coordinates: [114.37778, 28.52819],
  aliases: ['Xihu village', '西湖村', '官倉', '官仓', 'Guancang', 'Tonggu Hakka', '銅鼓客家話', '铜鼓客家话'],
  scope: 'Guancang hamlet in Xihu village, Yongning town: Li Sanhong’s Hakka, recorded in July 2016. The paper describes her Gan–Hakka bilingual background and contact with Gan and Mandarin. The marker is an approximate Yongning town reference, not a verified Xihu or Guancang pin, recording site or speaker home. No local place-name pronunciation has been collected.',
  source: paper,
  geographySource: {
    title: 'Wikidata · Yongning town · Q11131540 · CC0',
    url: 'https://www.wikidata.org/wiki/Q11131540',
    locator: 'P625 28.52819 N, 114.37778 E; Chinese label 永宁镇, parent Tonggu County Q1335847. Verified 9 October 2026. The coordinate has no separate underlying reference in Wikidata; it is an approximate town anchor, not a village or consultant location.',
  },
}];
