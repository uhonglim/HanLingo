import { describe, expect, it } from 'vitest';
import { atlasGongjiangHakkaClusters, atlasGongjiangHakkaLocalities } from './gongjiang-hakka';
import ledger from '../../../docs/gongjiang-hakka-provenance.json';

describe('Gongjiang town reference', () => {
  it('places the sourced town beneath a geographic county collection', () => {
    const cluster = atlasGongjiangHakkaClusters[0];
    const place = atlasGongjiangHakkaLocalities[0];
    expect(cluster).toMatchObject({ id: 'yudu-localities', groupId: 'hakka', branchId: 'yuxin', kind: 'geographic' });
    expect(`/${place.groupId}/${place.branchId}/${place.clusterId}/${place.id}`).toBe('/hakka/yuxin/yudu-localities/gongjiang-hakka');
    expect(place.source.locator).toContain('narrower than Yudu County');
    expect(place.scope).toContain('not a recording date or a county-wide');
  });
  it('uses a public town coordinate without inventing a recording or name reading', () => {
    const place = atlasGongjiangHakkaLocalities[0];
    expect(place.coordinates).toEqual([115.4128, 25.96422]);
    expect(place.coordinates).toEqual(ledger.geography.coordinates);
    expect(place.geographySource?.url).toBe('https://www.wikidata.org/wiki/Q14570698');
    expect(place.scope).toContain('not an interview site');
    expect(place.scope).toContain('No local place-name pronunciation');
  });
});
