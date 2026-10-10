import { describe, expect, it } from 'vitest';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { findAtlasLocality } from '../atlas';
import { xinzhouGalleries } from './xinzhou';
import provenance from '../../../docs/gallery-xinzhou-provenance.json';

const photos = xinzhouGalleries['xinzhou-jin'];
describe('Xinzhou cultural photo collection', () => {
  it('develops the existing city reference with nine individually credited scenes', () => {
    expect(Object.keys(xinzhouGalleries)).toEqual(['xinzhou-jin']);
    expect(findAtlasLocality('xinzhou-jin')).toBeDefined();
    expect(photos).toHaveLength(9);
    expect(provenance.records).toHaveLength(9);
    const hashes = new Set<string>();
    const originals = new Set<string>();
    const sources = new Set<string>();
    for (const photo of photos) {
      const record = provenance.records.find(row => row.id === photo.id)!;
      expect(record, photo.id).toBeDefined();
      for (const field of ['author', 'sourceUrl', 'license', 'licenseUrl', 'caption'] as const) expect(photo[field]).toBe(record[field]);
      expect(photo.author.trim()).not.toBe('');
      expect(photo.sourceUrl).toMatch(/^https:\/\/commons.wikimedia.org\/wiki\/File:/);
      expect(photo.license).toBe('CC BY-SA 4.0');
      expect(photo.licenseUrl).toBe('https://creativecommons.org/licenses/by-sa/4.0');
      const bytes = readFileSync(resolve('public', photo.src.slice(1)));
      expect(bytes.subarray(0, 4).toString()).toBe('RIFF');
      expect(bytes.subarray(8, 12).toString()).toBe('WEBP');
      const hash = createHash('sha256').update(bytes).digest('hex');
      expect(hash).toBe(record.assetSha256);
      expect(Math.max(photo.width!, photo.height!)).toBeLessThanOrEqual(1440);
      hashes.add(hash); originals.add(record.originalSha256); sources.add(photo.sourceUrl);
    }
    expect(hashes.size).toBe(9); expect(originals.size).toBe(9); expect(sources.size).toBe(9);
  });

  it('retains photographed urban context without implying speaker locations or unrelated readings', () => {
    expect(provenance.scope).toContain('urban Xinzhou');
    expect(provenance.scope).toContain('does not name exact consultant settlements');
    for (const record of provenance.records) {
      // Camera anchors verify city context, not consultant homes or a dialect boundary.
      expect(record.cameraCoordinates.lat).toBeGreaterThan(38.39);
      expect(record.cameraCoordinates.lat).toBeLessThan(38.44);
      expect(record.cameraCoordinates.lon).toBeGreaterThan(112.72);
      expect(record.cameraCoordinates.lon).toBeLessThan(112.75);
    }
    for (const photo of photos) {
      expect(photo.relatedWordIds).toBeUndefined();
      expect(photo.year).toBe('2025');
      expect(photo.caption).toContain('2025');
    }
    expect(provenance.held['xinzhou-jin-09']).toContain('repeating the station');
    expect(provenance.held['xinzhou-jin-11']).toContain('limited cultural/visual value');
    expect(photos.some(photo => photo.id.endsWith('-09') || photo.id.endsWith('-11'))).toBe(false);
  });
});
