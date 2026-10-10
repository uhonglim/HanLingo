import type { AtlasCluster, AtlasLocality } from './types';
import ledger from '../../../docs/shaowu-ngai2021-provenance.json';

const source = {
  title: 'Ngai 2021 · A Grammar of Shaowu', url: ledger.source.url,
  locator: 'p.3 restricts the language reference to urban Shaowu; pp.12 and 22 describe the Language Atlas Shaojiang placement and competing affiliations. This follows that Atlas convention without treating the classification debate as settled.',
};
export const atlasShaowuNgai2021Clusters: AtlasCluster[] = [{
  id: 'shaowu-localities', groupId: 'min', branchId: 'shaojiang',
  branchName: 'Shao–Jiang Min', branchNativeName: '邵將片',
  name: 'Shaowu', nativeName: '邵武', kind: 'geographic',
  description: 'Locality references in the Shaowu area. A geographic collection, not a formal linguistic subdivision; the city reference represents Ngai’s urban fieldwork.',
  source,
}];
export const atlasShaowuNgai2021Localities: AtlasLocality[] = [{
  id: 'shaowu', groupId: 'min', branchId: 'shaojiang', clusterId: 'shaowu-localities',
  name: 'Shaowu', nativeName: '邵武', coordinates: [117.48310, 27.34089],
  aliases: ['邵武话', '邵武話', '邵武市区', '邵武市區', 'Shao-wu', 'Urban Shaowu'],
  scope: 'Urban Shaowu in northwestern Fujian, following Ngai’s 2009–2019 fieldwork with four principal consultants. This is not a uniform county-wide accent. Min/Shaojiang follows the Atlas placement discussed by Ngai; alternative affiliations and Gan–Hakka contact are documented. The map marks the public city seat, not a consultant’s home or a language boundary.',
  source,
  geographySource: { title: ledger.geography.title, url: ledger.geography.url, locator: ledger.geography.locator },
}];
