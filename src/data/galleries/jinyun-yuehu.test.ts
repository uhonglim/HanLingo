import { describe, expect, it } from 'vitest';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { findAtlasLocality } from '../atlas';
import { jinyunYuehuGalleries } from './jinyun-yuehu';
import provenance from '../../../docs/gallery-jinyun-yuehu-provenance.json';

const photos = Object.values(jinyunYuehuGalleries).flat();
describe('Jinyun and urban Yuehu cultural galleries', () => {
  it('develops two existing places with distinct scenes and the reviewed lead order', () => {
    expect(Object.keys(jinyunYuehuGalleries).sort()).toEqual(['gan-county-360602', 'jinyun-county-331122']);
    for (const id of Object.keys(jinyunYuehuGalleries)) expect(findAtlasLocality(id)).toBeDefined();
    expect(jinyunYuehuGalleries['jinyun-county-331122']).toHaveLength(11);
    expect(jinyunYuehuGalleries['gan-county-360602']).toHaveLength(9);
    expect(jinyunYuehuGalleries['jinyun-county-331122'][0].title).toBe('Dufeng Academy');
    expect(jinyunYuehuGalleries['gan-county-360602'][0].year).toBe('2012');
  });

  it('delivers twenty distinct licensed images with reproducible provenance', () => {
    expect(photos).toHaveLength(20);
    expect(provenance.records).toHaveLength(20);
    const hashes = new Set<string>();
    const originals = new Set<string>();
    const sources = new Set<string>();
    for (const photo of photos) {
      const record = provenance.records.find(row => row.id === photo.id)!;
      expect(record, photo.id).toBeDefined();
      for (const field of ['author', 'license', 'licenseUrl', 'sourceUrl', 'caption'] as const) expect(photo[field]).toBe(record[field]);
      expect(photo.sourceUrl).toMatch(/^https:\/\/commons.wikimedia.org\/wiki\/File:/);
      expect(photo.licenseUrl).toMatch(/^https:\/\/creativecommons.org\//);
      expect(photo.author.trim()).not.toBe('');
      expect(photo.relatedWordIds).toBeUndefined();
      const bytes = readFileSync(resolve('public', photo.src.slice(1)));
      expect(bytes.subarray(0, 4).toString()).toBe('RIFF');
      expect(bytes.subarray(8, 12).toString()).toBe('WEBP');
      const hash = createHash('sha256').update(bytes).digest('hex');
      expect(hash).toBe(record.assetSha256);
      expect(Math.max(photo.width!, photo.height!)).toBeLessThanOrEqual(1440);
      hashes.add(hash); originals.add(record.originalSha256); sources.add(photo.sourceUrl);
    }
    expect(hashes.size).toBe(20); expect(originals.size).toBe(20); expect(sources.size).toBe(20);
  });

  it('preserves exact photographed subjects and dated city context', () => {
    const photo = (id: string) => photos.find(row => row.id === `jinyun-yuehu-${id}`)!;
    expect(photo('jinyun-02').caption).toContain('Pan pond');
    expect(photo('jinyun-05').caption).toContain('Caishen temple');
    expect(photo('jinyun-07').caption).toContain('reclining stone figure');
    expect(photo('jinyun-10').year).toBe('2008');
    expect(photo('yuehu-02').caption).toContain('seen from Yingtan Bridge');
    expect(photo('yuehu-15').year).toBe('2017');
    expect(photo('yuehu-16').caption).toContain('May 2012');
    expect(photo('yuehu-18').caption).toContain('first waiting room');
    expect(provenance.held['yuehu-11']).toContain('no count padding');
    expect(photos.some(row => row.id === 'jinyun-yuehu-yuehu-11')).toBe(false);
  });
});
