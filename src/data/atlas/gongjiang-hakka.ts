import type { AtlasCluster, AtlasLocality } from './types';
import ledger from '../../../docs/gongjiang-hakka-provenance.json';

const source = {
  title: 'Wendi Xue · Sinitic kinship terms · ANU thesis · 2023',
  url: ledger.source.url,
  locator: 'Printed p. 118 assigns Yudu Hakka to Yu–Xin and says the study’s uncle terms chiefly reflect the traditional prestige variety of Gongjiang Town, citing Xie 1998. The reference is narrower than Yudu County.',
};

export const atlasGongjiangHakkaClusters: AtlasCluster[] = [{
  id: 'yudu-localities', groupId: 'hakka', branchId: 'yuxin',
  branchName: 'Yuxin', branchNativeName: '于信片',
  name: 'Yudu', nativeName: '于都', kind: 'geographic',
  description: 'Town references within Yudu County. This geographic collection is not a proposed linguistic subdivision.',
  source,
}];

export const atlasGongjiangHakkaLocalities: AtlasLocality[] = [{
  id: 'gongjiang-hakka', name: 'Gongjiang', nativeName: '貢江',
  groupId: 'hakka', branchId: 'yuxin', clusterId: 'yudu-localities',
  coordinates: [115.4128, 25.96422],
  aliases: ['贡江', '贡江镇', 'Gongjiang Town', 'Yudu Hakka', '于都客家話', '于都客家话'],
  scope: 'Xue’s 2023 kinship study chiefly represents the traditional prestige Hakka variety of Gongjiang Town. Its literature-based terms were checked through online consultation during 2018–2022; this is not a recording date or a county-wide pronunciation claim. The marker is an approximate public town anchor, not an interview site. No local place-name pronunciation has been collected.',
  source,
  geographySource: {
    title: 'Wikidata · Gongjiang Town · Q14570698 · CC0',
    url: ledger.geography.sourceUrl,
    locator: 'P625: 25.96422 N, 115.4128 E; labels Gongjiang Town and 贡江镇. Cached 9 October 2026 in .evidence/hakka-empty-next/gongjiang-wikidata.json. Approximate town anchor, not a consultant address.',
  },
}];
