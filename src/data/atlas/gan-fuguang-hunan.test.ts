import { describe, expect, it } from 'vitest';
import { atlasGanFuguangHunanClusters, atlasGanFuguangHunanLocalities } from './gan-fuguang-hunan';

describe('Hunan township geographic reference', () => {
  it('preserves four ranks without promoting sound-change types into branches', () => {
    const cluster = atlasGanFuguangHunanClusters[0];
    const place = atlasGanFuguangHunanLocalities[0];
    expect(cluster).toMatchObject({ id: 'linchuan-localities', groupId: 'gan', branchId: 'fuguang', kind: 'geographic' });
    expect(`/${place.groupId}/${place.branchId}/${place.clusterId}/${place.id}`).toBe('/gan/fuguang/linchuan-localities/hunan-fuzhou');
    expect(place.source.locator).toContain('Xie Liuwen 2006');
    expect(place.source.locator).toContain('not formal genealogical');
  });
  it('distinguishes this Jiangxi township from Hunan province and unknown interview coordinates', () => {
    const place = atlasGanFuguangHunanLocalities[0];
    expect(place.coordinates).toEqual([116.38064, 28.00253]);
    expect(place.geographySource?.url).toBe('https://www.wikidata.org/wiki/Q14585730');
    expect(place.geographySource?.locator).toContain('Q1356329');
    expect(place.scope).toContain('not Hunan province');
    expect(place.scope).toContain('not an interview site');
    expect(place.scope).toContain('No local place-name pronunciation');
    expect(place.geographySource?.locator).toContain('Donglin New District');
  });
});
