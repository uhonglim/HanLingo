import { describe, expect, it } from 'vitest';
import { atlasLaiyuanContactClusters, atlasLaiyuanContactLocalities } from './laiyuan-contact';

describe('Laiyuan editorial geographic collection', () => {
  it('does not turn contact varieties into a source genealogical classification', () => {
    expect(atlasLaiyuanContactClusters).toHaveLength(1);
    const cluster = atlasLaiyuanContactClusters[0];
    expect(cluster).toMatchObject({ groupId: 'contact', branchId: 'western-fujian', id: 'laiyuan', kind: 'geographic' });
    expect(cluster.description).toContain('does not assign them directly to Min or Hakka');
    expect(cluster.source.locator).toContain('not genealogical ranks');
    expect(atlasLaiyuanContactLocalities.map(point => point.id)).toEqual(['niujia-laiyuan', 'huangzong-laiyuan']);
    for (const point of atlasLaiyuanContactLocalities) {
      expect(point).toMatchObject({ groupId: 'contact', branchId: 'western-fujian', clusterId: 'laiyuan' });
      expect(point.scope).toContain('not their homes or a language boundary');
      expect(point.source.locator).toContain('consultant communities');
    }
  });
  it('uses separate documented settlement anchors and visible narrower consultant scopes', () => {
    const [niujia, huangzong] = atlasLaiyuanContactLocalities;
    expect(niujia.coordinates).toEqual([116.97338, 25.55008]);
    expect(huangzong.coordinates).toEqual([116.93914, 25.52519]);
    expect(niujia.geographySource?.url).toContain('/7525880/');
    expect(huangzong.geographySource?.url).toContain('/7526393/');
    expect(niujia.scope).toContain('Dongkenglong');
    expect(huangzong.scope).toContain('Nanyang and Dakengtou');
    expect(huangzong.scope).toContain('differences between them');
  });
});
