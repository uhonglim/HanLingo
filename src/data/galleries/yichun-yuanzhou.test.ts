import { describe, expect, it } from 'vitest';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { yichunYuanzhouGalleries } from './yichun-yuanzhou';
import provenance from '../../../docs/gallery-yichun-yuanzhou-provenance.json';

const photos = yichunYuanzhouGalleries['gan-county-360902'];
describe('urban Yuanzhou photographs', () => {
  it('delivers ten distinct licensed assets with exact metadata and hashes', () => {
    expect(Object.keys(yichunYuanzhouGalleries)).toEqual(['gan-county-360902']);
    expect(photos).toHaveLength(10);
    expect(new Set(provenance.photos.map(photo => photo.originalSha256)).size).toBe(10);
    const hashes = new Set<string>();
    for (const photo of photos) {
      const row = provenance.photos.find(item => item.id === photo.id)!;
      expect(row).toBeDefined();
      for (const key of ['sourceUrl', 'license', 'licenseUrl', 'author', 'caption'] as const) expect(photo[key]).toBe(row[key]);
      expect(photo.sourceUrl).toMatch(/^https:\/\/commons.wikimedia.org\/wiki\/File:/);
      expect(photo.licenseUrl).toMatch(/^https:\/\/creativecommons.org\//);
      expect(photo.relatedWordIds).toBeUndefined();
      const bytes = readFileSync(resolve('public', photo.src.slice(1)));
      expect(bytes.subarray(0, 4).toString()).toBe('RIFF');
      expect(bytes.subarray(8, 12).toString()).toBe('WEBP');
      const hash = createHash('sha256').update(bytes).digest('hex');
      expect(hash).toBe(row.assetSha256);
      hashes.add(hash);
    }
    expect(hashes.size).toBe(10);
  });
  it('excludes the distant garden and does not turn upload dates into capture years', () => {
    expect(provenance.held).toHaveLength(1);
    expect(provenance.held[0].cameraCoordinates?.lon).toBe(114.019396);
    expect(photos.some(photo => photo.id === 'yichun-yuanzhou-10')).toBe(false);
    for (const row of provenance.photos) {
      if (row.sourceDate.includes('original upload')) expect(photos.find(photo => photo.id === row.id)?.year).toBeUndefined();
      if (row.cameraCoordinates) {
        expect(row.cameraCoordinates.lon).toBeGreaterThan(114.37);
        expect(row.cameraCoordinates.lon).toBeLessThan(114.44);
        expect(row.cameraCoordinates.lat).toBeGreaterThan(27.78);
        expect(row.cameraCoordinates.lat).toBeLessThan(27.83);
      }
    }
  });
});
