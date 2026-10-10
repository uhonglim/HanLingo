import { describe, expect, it } from 'vitest';
import { atlasShaowuNgai2021Clusters, atlasShaowuNgai2021Localities } from './shaowu-ngai2021';

describe('Shaowu urban reference hierarchy', () => {
  it('keeps four levels without inventing a formal subdivision', () => {
    const cluster = atlasShaowuNgai2021Clusters[0];
    const place = atlasShaowuNgai2021Localities[0];
    expect(cluster.kind).toBe('geographic');
    expect(place.clusterId).toBe(cluster.id);
    expect(`/${place.groupId}/${place.branchId}/${place.clusterId}/${place.id}`).toBe('/min/shaojiang/shaowu-localities/shaowu');
    expect(cluster.description).toContain('not a formal linguistic subdivision');
    expect(place.source.locator).toContain('pp.12 and 22');
    expect(place.source.locator).toContain('competing affiliations');
  });
  it('separates the public urban map anchor from consultant geography', () => {
    const place = atlasShaowuNgai2021Localities[0];
    expect(place.coordinates).toEqual([117.48310, 27.34089]);
    expect(place.geographySource?.url).toBe('https://www.geonames.org/1795857/shaowu.html');
    expect(place.scope).toContain('not a uniform county-wide accent');
    expect(place.scope).toContain('not a consultant’s home');
    expect(place.referenceType).toBeUndefined();
  });
});
