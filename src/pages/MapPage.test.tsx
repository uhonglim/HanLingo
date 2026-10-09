import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { atlasLocalities, atlasClusters, atlasLocalityPath, findAtlasLocality } from '../data/atlas';
import MapPage, { filterMapLocalities } from './MapPage';

function render(path: string) {
  return renderToStaticMarkup(<MemoryRouter initialEntries={[path]}><MapPage/></MemoryRouter>);
}

describe('whole-site map', () => {
  it('includes every atlas locality without converting aliases into extra places', () => {
    expect(filterMapLocalities(atlasLocalities, '')).toHaveLength(atlasLocalities.length);
    const html = render('/map');
    expect(html.match(/role="button"/g)).toHaveLength(atlasLocalities.length);
    expect(html).toContain(`${atlasLocalities.length} locality references`);
    expect(html).toContain('All five groups');
  });
  it('finds familiar names, community names, Chinese names and family aliases', () => {
    const searches: [string, string][] = [['Xiamen', 'xiamen'], ['Amoy', 'xiamen'], ['厦门', 'xiamen'], ['Tsiang-tsiu', 'zhangzhou'], ['Taipei', 'taipak'], ['Penang', 'george-town'], ['Hokkien Amoy', 'xiamen'], ['Quanzhang', 'xiamen']];
    for (const [query, id] of searches) expect(filterMapLocalities(atlasLocalities, query).map(point => point.id), query).toContain(id);
    expect(filterMapLocalities(atlasLocalities, 'not-a-real-locality')).toEqual([]);
    expect(filterMapLocalities(atlasLocalities, 'Amoy', 'wu')).toEqual([]);
  });
  it('restricts group and branch filters to their actual places', () => {
    const points = filterMapLocalities(atlasLocalities, '', 'min', 'eastern-min');
    expect(points.length).toBeGreaterThan(10);
    expect(points.every(point => point.groupId === 'min' && point.branchId === 'eastern-min')).toBe(true);
    const html = render('/map?group=min&branch=min/eastern-min');
    expect(html.match(/role="button"/g)).toHaveLength(points.length);
    expect(html).not.toContain('Explore Amoy');
  });
  it('opens a shareable selection with one canonical locality destination and scope', () => {
    const place = findAtlasLocality('xiamen')!;
    const html = render('/map?group=min&place=xiamen');
    expect(html).toContain(`href="${atlasLocalityPath(place)}"`);
    expect(html).toContain(place.scope);
    expect(html).toContain(atlasClusters.find(cluster => cluster.groupId === place.groupId && cluster.branchId === place.branchId && cluster.id === place.clusterId)!.name);
    expect(html).toContain('aria-pressed="true"');
    expect(render('/map?group=wu&place=xiamen')).not.toContain(`href="${atlasLocalityPath(place)}"`);
  });
  it('keeps all filtered anchors present while searching and highlights only matches', () => {
    const html = render('/map?q=Amoy');
    expect(html.match(/role="button"/g)).toHaveLength(atlasLocalities.length);
    expect(html.match(/atlas-place--dimmed/g)).toHaveLength(atlasLocalities.length - 1);
    expect(html).toContain('1 match');
    expect(html).toContain('id="map-search-results"');
  });
});
