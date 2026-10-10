import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { AtlasClusterPage, AtlasLocalityRoute } from './AtlasCatalogue';
import { atlasClusters, atlasLocalities, atlasClusterPath, atlasLocalityPath } from '../data/atlas';
import { mapPoints } from '../data/languages';

function render(path: string, cluster = true) {
  return renderToStaticMarkup(<MemoryRouter initialEntries={[path]}><Routes>
    <Route path={cluster ? '/:languageId/:subgroupId/:clusterId' : '/:languageId/:subgroupId/:clusterId/:varietyId/*'} element={cluster ? <AtlasClusterPage/> : <AtlasLocalityRoute/>}/>
  </Routes></MemoryRouter>).replace(/<svg[\s\S]*?<\/svg>/g, "");
}

describe('atlas destination pages', () => {
  it('opens every real cluster, including clusters that share a locality name', () => {
    for (const cluster of atlasClusters) {
      const html = render(atlasClusterPath(cluster));
      expect(html, atlasClusterPath(cluster)).toContain('Classification source');
      for (const place of atlasLocalities.filter(p => p.groupId === cluster.groupId && p.branchId === cluster.branchId && p.clusterId === cluster.id)) {
        expect(html, place.id).toContain(`href="${atlasLocalityPath(place)}"`);
      }
    }
  });
  it('keeps catalogue-only entries explicit and rejects fabricated parents or lessons', () => {
    const place = atlasLocalities.find(p => !mapPoints.some(m => m.id === p.id))!;
    expect(render(atlasLocalityPath(place), false)).toContain('Local IPA readings are still being documented');
    expect(render(`${atlasLocalityPath(place)}/words`, false)).toContain('Page not found');
    expect(render(`/${place.groupId}/${place.branchId}/wrong/${place.id}`, false)).toContain('Page not found');
  });
  it('accepts static-host trailing slashes for real learning destinations', () => {
    for (const path of [
      '/min/eastern-min/funing/fuan/words',
      '/min/southern-min/teo-swa/singapore-teochew/sounds',
      '/min/eastern-min/overseas-foochow/sibu-foochow/culture',
      '/min/southern-min/tsuan-chiang/xiamen/words',
    ]) {
      // Lazy loading may suspend during SSR; the routing guard must accept both URLs.
      expect(render(`${path}/?q=tea`, false), path).not.toContain('Page not found');
      expect(render(path, false), path).not.toContain('Page not found');
      expect(render(`${path}/invented/`, false), path).toContain('Page not found');
    }
  });

});
