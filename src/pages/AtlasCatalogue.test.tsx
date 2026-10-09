import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { AtlasClusterPage, AtlasLocalityRoute } from './AtlasCatalogue';
import { atlasClusters, atlasLocalities, atlasClusterPath, atlasLocalityPath } from '../data/atlas';
import { mapPoints } from '../data/languages';

function render(path: string, cluster = true) {
  return renderToStaticMarkup(<MemoryRouter initialEntries={[path]}><Routes>
    <Route path={cluster ? '/:languageId/:subgroupId/:clusterId' : '/:languageId/:subgroupId/:clusterId/:varietyId/*'} element={cluster ? <AtlasClusterPage/> : <AtlasLocalityRoute/>}/>
  </Routes></MemoryRouter>);
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
    expect(render(atlasLocalityPath(place), false)).toContain('Local recordings, IPA lessons and photographs have not yet been added');
    expect(render(`${atlasLocalityPath(place)}/words`, false)).toContain('Page not found');
    expect(render(`/${place.groupId}/${place.branchId}/wrong/${place.id}`, false)).toContain('Page not found');
  });
});
