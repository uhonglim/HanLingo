import { placeDisplayName } from "../language-names";
import { describe, expect, it } from 'vitest';
import { atlasClusters, atlasLocalities, atlasBranches, atlasLocalityPath, atlasClusterPath } from './index';
import { mapPoints } from '../languages';
import { getBreadcrumbs } from '../../navigation';
import { varietyPath } from '../../routing';
import { availableSections } from '../learning';
import { publicPaths, staticPaths } from '../../static-paths';

describe('four-level sourced locality atlas',()=>{
  it('contains at least200 distinct locality references, each attached to a real sourced cluster',()=>{
    expect(atlasLocalities.length).toBeGreaterThanOrEqual(200);
    expect(new Set(atlasLocalities.map(p=>p.id)).size).toBe(atlasLocalities.length);
    expect(new Set(atlasClusters.map(c=>atlasClusterPath(c))).size).toBe(atlasClusters.length);
    for(const place of atlasLocalities){
      const cluster=atlasClusters.find(c=>c.groupId===place.groupId&&c.branchId===place.branchId&&c.id===place.clusterId);
      expect(cluster,place.id).toBeDefined();
      expect(place.scope.length,place.id).toBeGreaterThan(25);
      for(const source of [place.source,cluster!.source]){
        expect(source.title.length).toBeGreaterThan(5);
        expect(source.locator.length).toBeGreaterThan(5);
        expect(new URL(source.url).protocol).toMatch(/^https?:$/);
      }
      expect(place.coordinates.every(Number.isFinite)).toBe(true);
      expect(place.coordinates[0]).toBeGreaterThan(70);
      expect(place.coordinates[0]).toBeLessThan(140);
      expect(place.coordinates[1]).toBeGreaterThan(-5);
      expect(place.coordinates[1]).toBeLessThan(55);
      expect(atlasLocalityPath(place).split('/').filter(Boolean)).toHaveLength(4);
      expect(getBreadcrumbs(atlasLocalityPath(place)).at(-1)?.label).toBe(placeDisplayName(place));
    }
  });
  it('preserves every existing lesson and old deep link without inserting a course into the taxonomy',()=>{
    const canonical=publicPaths();const compatibility=staticPaths();
    for(const point of mapPoints){
      const place=atlasLocalities.find(p=>p.id===point.id);
      expect(place,point.id).toBeDefined();
      expect(varietyPath(point)).toBe(atlasLocalityPath(place!));
      expect(canonical).toContain(atlasLocalityPath(place!));
      for(const section of availableSections(point)){
        const path=`${atlasLocalityPath(place!)}/${section}`;
        expect(canonical).toContain(path);
        expect(getBreadcrumbs(path)).toHaveLength(6); // root + four taxa + lesson
        expect(compatibility).toContain(`/${point.groupId}/${point.subgroupId}/${point.id}/${section}`);
      }
    }
    for(const branch of atlasBranches) expect(canonical).toContain(`/${branch.groupId}/${branch.id}`);
  });
  it('rejects valid place names under false parents or fabricated lessons',()=>{
    for(const place of atlasLocalities.slice(0,20)){
      expect(getBreadcrumbs(`/${place.groupId}/${place.branchId}/wrong/${place.id}`).at(-1)?.label).toBe('Page not found');
      expect(getBreadcrumbs(`${atlasLocalityPath(place)}/imaginary`).at(-1)?.label).toBe('Page not found');
    }
  });
});
