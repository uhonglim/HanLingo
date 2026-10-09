import { describe, expect, it } from 'vitest';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { findAtlasLocality } from '../atlas';
import { expandedGalleries } from '../expansion';
import { houHangzhouShexianLearning } from '../learning/hou-hangzhou-shexian';
import { hangzhouSheGalleries, hangzhouSheGalleryAdditions } from './hangzhou-she';
import provenance from '../../../docs/gallery-hangzhou-she-provenance.json';

const additions = Object.values(hangzhouSheGalleryAdditions).flat();
describe('Hangzhou and She County photo depth', () => {
  it('preserves the original nine Hangzhou scenes while developing existing places', () => {
    expect(Object.keys(hangzhouSheGalleries).sort()).toEqual(['hangzhou', 'shexian-hui']);
    for (const [id, photos] of Object.entries(hangzhouSheGalleries)) {
      expect(findAtlasLocality(id)).toBeDefined();
      expect(photos).toHaveLength(11);
    }
    expect(expandedGalleries.hangzhou).toHaveLength(9);
    expect(hangzhouSheGalleryAdditions.hangzhou).toHaveLength(2);
    expect(hangzhouSheGalleries.hangzhou.slice(0, 9)).toEqual(expandedGalleries.hangzhou);
    expect(hangzhouSheGalleries.hangzhou.slice(9)).toEqual(hangzhouSheGalleryAdditions.hangzhou);
  });

  it('ships thirteen distinct credited images with matching source and asset provenance', () => {
    expect(additions).toHaveLength(13);
    expect(provenance.records).toHaveLength(13);
    const hashes = new Set<string>();
    const originals = new Set<string>();
    const sources = new Set<string>();
    for (const photo of additions) {
      const record = provenance.records.find(row => row.id === photo.id)!;
      expect(record, photo.id).toBeDefined();
      for (const field of ['author', 'sourceUrl', 'license', 'licenseUrl', 'caption'] as const) expect(photo[field]).toBe(record[field]);
      expect(photo.author.trim()).not.toBe('');
      expect(photo.sourceUrl).toMatch(/^https:\/\/commons.wikimedia.org\/wiki\/File:/);
      expect(photo.licenseUrl).toMatch(/^https:\/\//);
      if (photo.id !== 'hangzhou-she-shexian-hui-05') expect(photo.relatedWordIds).toBeUndefined();
      if (photo.license === 'Public domain') expect(photo.licenseUrl).toBe(photo.sourceUrl);
      else expect(photo.licenseUrl).toMatch(/^https:\/\/creativecommons.org\//);
      const bytes = readFileSync(resolve('public', photo.src.slice(1)));
      expect(bytes.subarray(0, 4).toString()).toBe('RIFF');
      expect(bytes.subarray(8, 12).toString()).toBe('WEBP');
      const hash = createHash('sha256').update(bytes).digest('hex');
      expect(hash).toBe(record.assetSha256);
      expect(Math.max(photo.width!, photo.height!)).toBeLessThanOrEqual(1440);
      hashes.add(hash); originals.add(record.originalSha256); sources.add(photo.sourceUrl);
    }
    expect(hashes.size).toBe(13); expect(originals.size).toBe(13); expect(sources.size).toBe(13);
    for (const oldPhoto of expandedGalleries.hangzhou) {
      const hash = createHash('sha256').update(readFileSync(resolve('public', oldPhoto.src.slice(1)))).digest('hex');
      expect(hashes.has(hash)).toBe(false);
      expect(sources.has(oldPhoto.sourceUrl)).toBe(false);
    }
  });

  it('keeps reconstruction, date and county scope separate from the language study', () => {
    const photo = (id: string) => additions.find(row => row.id === `hangzhou-she-${id}`)!;
    const houses = photo('shexian-hui-05');
    expect(houses.relatedWordIds).toEqual(['hou-list-shexian-40_house-1']);
    const houseWord = houHangzhouShexianLearning.flatMap(pack => pack.words).find(word => word.id === houses.relatedWordIds![0])!;
    expect(houseWord.localityId).toBe('shexian-hui');
    expect(houseWord.english).toBe('house');
    expect(houseWord.registerLabel).toContain('settlement unspecified');
    expect(photo('shexian-hui-08').caption).toContain('reconstructed');
    expect(photo('shexian-hui-08').year).toBe('2015');
    expect(photo('shexian-hui-09').caption).toContain('railway-station platform');
    expect(photo('shexian-hui-10').year).toBe('2008');
    expect(photo('shexian-hui-10').license).toBe('Public domain');
    expect(photo('shexian-hui-11').caption).toContain('courtyard');
    expect(provenance.scope).toContain('not the Hou study settlement');
    expect(provenance.held['shexian-hui-04']).toContain('rejected');
    expect(additions.some(row => row.id === 'hangzhou-she-shexian-hui-04')).toBe(false);
  });
});
