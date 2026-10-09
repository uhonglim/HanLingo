import { describe, expect, it } from 'vitest';
import ledger from '../../../docs/atlas-county-provenance.json';
import { atlasCountyClusters, atlasCountyLocalities } from './county-expansion';
import { atlasLocalityPath, atlasLocalities, findAtlasCluster } from './index';
import { availableSections } from '../learning';
import { findLearningPlace } from '../learning/places';
import { getBreadcrumbs } from '../../navigation';
import { filterMapLocalities } from '../../pages/MapPage';
import { publicPaths } from '../../static-paths';

describe('reviewed thousand-locality atlas', () => {
  it('retains a unique geographic identity and source-row proof for all 692 additions', () => {
    expect(atlasCountyLocalities).toHaveLength(692);
    expect(new Set(ledger.localities.map(row => row.wikidata)).size).toBe(692);
    const paths = new Set(publicPaths());
    for (const place of atlasCountyLocalities) {
      const row = ledger.localities.find(entry => entry.id === place.id)!;
      expect(row, place.id).toBeDefined();
      expect(row.code).toBe(row.geographyCode);
      expect(row.source.countyCode).toBe(row.code);
      expect(row.source.branch).toBe(row.crosscheck.branch);
      expect(place.coordinates).toEqual(row.coordinates);
      expect(place.source.locator).toContain(`source row ${row.source.row}`);
      expect(place.geographySource?.url).toContain(row.wikidata);
      expect(place.referenceType).toBe('county');
      const path = atlasLocalityPath(place);
      expect(paths.has(path), path).toBe(true);
      expect(getBreadcrumbs(path)).toHaveLength(5);
      expect(findAtlasCluster(place.groupId, place.branchId, place.clusterId)).toBeDefined();
      expect(filterMapLocalities(atlasLocalities, row.code).map(match => match.id)).toContain(place.id);
      // Only a subsequently sourced exact-place learning collection unlocks lessons.
      if (['rongcheng-371082', 'gan-county-360902', 'jinyun-county-331122', 'gan-county-360602'].includes(place.id)) {
        expect(availableSections(findLearningPlace(place.id)!)).toEqual(['words', 'culture', 'sounds', 'practice']);

      } else expect(availableSections(findLearningPlace(place.id)!)).toEqual([]);
    }
  });
  it('does not publish unused ranks or known mislocated source points', () => {
    for (const cluster of atlasCountyClusters) {
      expect(atlasCountyLocalities.some(place => place.groupId === cluster.groupId && place.branchId === cluster.branchId && place.clusterId === cluster.id)).toBe(true);
    }
    expect(ledger.localities.some(place => place.code === '340124')).toBe(false);
    expect(new Set(atlasLocalities.map(place => atlasLocalityPath(place))).size).toBe(atlasLocalities.length);
  });
});
