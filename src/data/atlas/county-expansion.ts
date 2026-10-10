import records from './county-localities.json';
import clusters from './county-clusters.json';
import type { AtlasCluster, AtlasLocality } from './types';

/** Reviewed factual extract; rebuild with scripts/import-atlas-counties.py. */
export const atlasCountyClusters = clusters as AtlasCluster[];
export const atlasCountyLocalities: AtlasLocality[] = records.map(record => ({
  id: record.id, name: record.name, nativeName: record.nativeName,
  groupId: record.groupId as AtlasLocality['groupId'],
  branchId: record.branchId, clusterId: record.clusterId,
  coordinates: record.coordinates as [number, number],
  referenceType: 'county',
  scope: `${record.name} · ${record.prefecture}, ${record.province}. County-level distribution reference, not a town or speaker sample. The map marks the administrative place, not a dialect boundary.`,
  aliases: [record.code, record.province, record.prefecture, record.source.region, record.source.branch, record.source.cluster].filter(Boolean),
  source: {
    title: 'Jing Liwen · Language Atlas of China county catalogue, 2025',
    url: 'https://doi.org/10.5281/zenodo.15897647',
    locator: `County ${record.code} · ${record.nativeName} · source row ${record.source.row}: ${[record.source.group, record.source.region, record.source.branch, record.source.cluster].filter(Boolean).join(' / ')}. Second-edition Atlas classifications; 2023 administrative references. Factual extract adapted under CC BY 4.0.`,
  },
  geographySource: {
    title: `Wikidata · ${record.name}`,
    url: `https://www.wikidata.org/wiki/${record.wikidata}`,
    locator: `${record.wikidata} · P442 code ${record.code}, P625 coordinates and English geographic label · retrieved 9 October 2026 · CC0. This label is not a phonetic reading or claimed local endonym.`,
  },
}));
