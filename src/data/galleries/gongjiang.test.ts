import { describe, expect, it } from 'vitest';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { findAtlasLocality } from '../atlas';
import { gongjiangGalleries } from './gongjiang';
import provenance from '../../../docs/gallery-gongjiang-provenance.json';

const photos = gongjiangGalleries['gongjiang-hakka'];
describe('Gongjiang town cultural gallery', () => {
  it('preserves nine unique credited source images and their delivered assets', () => {
    expect(Object.keys(gongjiangGalleries)).toEqual(['gongjiang-hakka']);
    expect(findAtlasLocality('gongjiang-hakka')).toBeDefined();
    expect(photos).toHaveLength(9);
    expect(provenance.records).toHaveLength(9);
    const assetHashes = new Set<string>();
    const originalHashes = new Set<string>();
    const sources = new Set<string>();
    for (const photo of photos) {
      const record = provenance.records.find(row => row.id === photo.id)!;
      expect(record, photo.id).toBeDefined();
      for (const field of ['author', 'sourceUrl', 'license', 'licenseUrl', 'caption'] as const) expect(photo[field]).toBe(record[field]);
      expect(photo.sourceUrl).toMatch(/^https:\/\/commons.wikimedia.org\/wiki\/File:/);
      expect(photo.license).toBe(photo.author === 'Zhangzhugang' ? 'CC BY-SA 3.0' : 'CC BY-SA 4.0');
      expect(photo.licenseUrl).toBe(photo.author === 'Zhangzhugang' ? 'https://creativecommons.org/licenses/by-sa/3.0' : 'https://creativecommons.org/licenses/by-sa/4.0');
      const bytes = readFileSync(resolve('public', photo.src.slice(1)));
      expect(bytes.subarray(0, 4).toString()).toBe('RIFF');
      expect(bytes.subarray(8, 12).toString()).toBe('WEBP');
      const hash = createHash('sha256').update(bytes).digest('hex');
      expect(hash).toBe(record.assetSha256);
      expect(Math.max(photo.width!, photo.height!)).toBeLessThanOrEqual(1440);
      assetHashes.add(hash); originalHashes.add(record.originalSha256); sources.add(photo.sourceUrl);
    }
    expect(assetHashes.size).toBe(9);
    expect(originalHashes.size).toBe(9);
    expect(sources.size).toBe(9);
    expect(photos.filter(photo => photo.author === 'Zhangzhugang')).toHaveLength(7);
  });

  it('retains dated town context without invented camera anchors or kinship associations', () => {
    expect(provenance.scope).toContain('Gongjiang Town');
    expect(provenance.scope).toContain('No speaker identity');
    const withoutCoordinates = provenance.records.filter(row => row.cameraCoordinates === null);
    expect(withoutCoordinates.map(row => row.title)).toEqual(['Hongqi Avenue', 'Yudu railway platform', 'Xie ancestral hall']);
    for (const record of provenance.records) {
      expect(record.locationEvidence.length).toBeGreaterThan(50);
      if (record.cameraCoordinates) {
        expect(record.cameraCoordinates.lat).toBeGreaterThan(25.95);
        expect(record.cameraCoordinates.lat).toBeLessThan(25.97);
        expect(record.cameraCoordinates.lon).toBeGreaterThan(115.40);
        expect(record.cameraCoordinates.lon).toBeLessThan(115.43);
      }
    }
    for (const photo of photos) {
      expect(photo.relatedWordIds).toBeUndefined();
      expect(photo.caption).toContain(photo.year);
    }
    expect(photos.find(photo => photo.title === 'Hongqi Avenue')?.year).toBe('2017');
    expect(photos.find(photo => photo.title === 'Yudu railway platform')?.year).toBe('2018');
    expect(photos.filter(photo => photo.year === '2014')).toHaveLength(7);
    expect(provenance.sourceConflict).toContain('numbers vary');
    expect(provenance.held.some(reason => reason.includes('Government aerial'))).toBe(true);
  });
});
