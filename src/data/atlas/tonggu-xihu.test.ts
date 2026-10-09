import { describe, expect, it } from 'vitest';
import { atlasTongguXihuClusters, atlasTongguXihuLocalities } from './tonggu-xihu';
import ledger from '../../../docs/tonggu-xihu-provenance.json';

describe('Tonggu Xihu locality scope', () => {
  it('uses four real levels without claiming Yongning is a linguistic subbranch', () => {
    const cluster = atlasTongguXihuClusters[0];
    const place = atlasTongguXihuLocalities[0];
    expect(cluster).toMatchObject({ groupId: 'hakka', branchId: 'tonggui', id: 'yongning-localities', kind: 'geographic' });
    expect(place).toMatchObject({ id: 'tonggu-xihu', groupId: 'hakka', branchId: 'tonggui', clusterId: cluster.id });
    expect(`/${place.groupId}/${place.branchId}/${place.clusterId}/${place.id}`).toBe('/hakka/tonggui/yongning-localities/tonggu-xihu');
    expect(cluster.source.locator).toContain('Gan / Yiliu');
    expect(cluster.source.locator).toContain('not a village survey');
    expect(place.scope).toContain('Gan–Hakka bilingual');
  });
  it('keeps the town coordinate distinct from the source village and recording location', () => {
    const place = atlasTongguXihuLocalities[0];
    expect(place.coordinates).toEqual([114.37778, 28.52819]);
    expect(place.coordinates).toEqual(ledger.geography.coordinates);
    expect(place.scope).toContain('not a verified Xihu or Guancang pin');
    expect(place.geographySource?.url).toBe('https://www.wikidata.org/wiki/Q11131540');
    expect(place.geographySource?.locator).toContain('no separate underlying reference');
    expect(place.scope).toContain('No local place-name pronunciation');
  });
});
