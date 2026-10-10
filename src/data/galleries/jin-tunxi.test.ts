import { describe, expect, it } from 'vitest';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { findAtlasLocality } from '../atlas';
import { otherSiniticGalleries } from './other-sinitic';
import { jinTunxiGalleries, jinTunxiGalleryAdditions } from './jin-tunxi';
import provenance from '../../../docs/gallery-jin-tunxi-provenance.json';

const additions = Object.values(jinTunxiGalleryAdditions).flat();
describe('Changzhi, Handan and Tunxi photo depth', () => {
  it('develops existing locality references and preserves Tunxi’s original nine', () => {
    expect(Object.keys(jinTunxiGalleryAdditions).sort()).toEqual(['changzhi-jin', 'handan-jin', 'tunxi-hui']);
    for (const id of Object.keys(jinTunxiGalleries)) {
      expect(findAtlasLocality(id)).toBeDefined();
      expect(jinTunxiGalleries[id]).toHaveLength(11);
    }
    expect(jinTunxiGalleryAdditions['changzhi-jin']).toHaveLength(11);
    expect(jinTunxiGalleryAdditions['handan-jin']).toHaveLength(11);
    expect(jinTunxiGalleryAdditions['tunxi-hui']).toHaveLength(2);
    expect(otherSiniticGalleries['tunxi-hui']).toHaveLength(9);
    expect(jinTunxiGalleries['tunxi-hui'].slice(0, 9)).toEqual(otherSiniticGalleries['tunxi-hui']);
    expect(jinTunxiGalleries['tunxi-hui'].slice(9)).toEqual(jinTunxiGalleryAdditions['tunxi-hui']);
  });

  it('delivers twenty-four distinct licensed WebP assets with exact source credits', () => {
    expect(additions).toHaveLength(24);
    expect(provenance.records).toHaveLength(24);
    const sources = new Set<string>();
    const hashes = new Set<string>();
    const originals = new Set<string>();
    for (const photo of additions) {
      const record = provenance.records.find(row => row.id === photo.id)!;
      expect(record, photo.id).toBeDefined();
      for (const key of ['sourceUrl', 'license', 'licenseUrl', 'author', 'caption'] as const) expect(photo[key]).toBe(record[key]);
      expect(photo.sourceUrl).toMatch(/^https:\/\/commons.wikimedia.org\/wiki\/File:/);
      expect(photo.licenseUrl).toMatch(/^https:\/\/creativecommons.org\//);
      expect(photo.author.trim().length).toBeGreaterThan(0);
      expect(photo.relatedWordIds).toBeUndefined();
      const bytes = readFileSync(resolve('public', photo.src.slice(1)));
      expect(bytes.subarray(0, 4).toString()).toBe('RIFF');
      expect(bytes.subarray(8, 12).toString()).toBe('WEBP');
      const hash = createHash('sha256').update(bytes).digest('hex');
      expect(hash).toBe(record.assetSha256);
      expect(Math.max(photo.width!, photo.height!)).toBeLessThanOrEqual(1440);
      sources.add(photo.sourceUrl); hashes.add(hash); originals.add(record.originalSha256);
    }
    expect(sources.size).toBe(24); expect(hashes.size).toBe(24); expect(originals.size).toBe(24);
    const oldTunxiHashes = otherSiniticGalleries['tunxi-hui'].map(photo => createHash('sha256').update(readFileSync(resolve('public', photo.src.slice(1)))).digest('hex'));
    expect(oldTunxiHashes.every(hash => !hashes.has(hash))).toBe(true);
  });

  it('keeps source-specific scene, date and locality qualifications', () => {
    const find = (suffix: string) => additions.find(photo => photo.id === `jin-tunxi-${suffix}`)!;
    expect(find('changzhi-jin-04').caption).toContain('rebuilt');
    expect(find('changzhi-jin-08').caption).toContain('displayed at Changzhi Museum');
    expect(find('handan-jin-05').caption).toContain('inside Handan Library');
    expect(find('handan-jin-08').caption).toContain('Paths and planting');
    expect(find('handan-jin-10').caption).toContain('does not name the restaurant');
    expect(find('tunxi-hui-01').caption).toContain('Binyuan street gate');
    expect(find('tunxi-hui-02').year).toBe('2013');
    expect(find('tunxi-hui-02').caption).toContain('dated view');
    expect(provenance.scope).toContain('not Mazhuang fieldwork sites');
    expect(provenance.records.some(record => record.sourceFilename === 'Nan_Yan_Cun_Lamian.jpg')).toBe(false);
    expect(provenance.held['handan-jin-11'].reason).toContain('wider Handan region');
  });
});
