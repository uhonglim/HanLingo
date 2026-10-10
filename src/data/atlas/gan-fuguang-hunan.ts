import type { AtlasCluster, AtlasLocality } from './types';
import ledger from '../../../docs/gan-fuguang-hunan-provenance.json';

const source = {
  title: ledger.source.title,
  url: ledger.source.url,
  locator: 'Chen 2026, p.109 adopts Xie Liuwen 2006 for Fu–Guang scope; p.110 Table 2 names 抚州湖南. The source’s onset-pattern types are not formal genealogical subdivisions.',
};

export const atlasGanFuguangHunanClusters: AtlasCluster[] = [{
  id: 'linchuan-localities', groupId: 'gan', branchId: 'fuguang',
  branchName: 'Fu–Guang', branchNativeName: '撫廣片',
  name: 'Linchuan', nativeName: '臨川', kind: 'geographic',
  description: 'Named settlement references in the Linchuan area of Fuzhou, Jiangxi. A geographic collection, not an additional linguistic subdivision.',
  source,
}];

export const atlasGanFuguangHunanLocalities: AtlasLocality[] = [{
  id: 'hunan-fuzhou', name: 'Hunan', nativeName: '湖南',
  groupId: 'gan', branchId: 'fuguang', clusterId: 'linchuan-localities',
  coordinates: [116.38064, 28.00253],
  aliases: ['湖南乡', '湖南鄉', 'Hunan Township', '抚州湖南', '撫州湖南', 'Fuzhou Hunan', 'Linchuan Hunan'],
  scope: 'Hunan Township in the Linchuan area of Fuzhou, Jiangxi. Chen’s 2026 publication represents one male consultant, aged 76 in the source; collection date and precise village are unspecified. The public township marker is not an interview site or a language boundary. No local place-name pronunciation has been collected. This Hunan is a township, not Hunan province.',
  source,
  geographySource: {
    title: 'Wikidata · Hunan Township · Q14585730 · CC0',
    url: ledger.geography.sourceUrl,
    locator: 'P625: 28.00253 N, 116.38064 E; P131: Linchuan District, Q1356329. Both statements lack references in the inspected entity; treat this as an approximate public township anchor. Linchuan government heritage lists independently identify 湖南乡 and note Donglin New District management in 2019.',
  },
}];
