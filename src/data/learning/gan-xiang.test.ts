import { describe, expect, it } from 'vitest';
import { ganXiangLearning } from './gan-xiang';
import { atlasGanXiangClusters, atlasGanXiangLocalities } from '../atlas/gan-xiang';
import provenance from '../../../docs/gan-xiang-reading-provenance.json';
import { convertIpa } from '../romanization-method';

const words = ganXiangLearning.flatMap(pack => pack.words);
const recordById = new Map(provenance.records.map(row => [row.id, row]));
describe('Gan and Xiang evidence packs', () => {
  it('keeps 250 dated local forms for each urban reference, with exact source characters and IPA', () => {
    expect(words).toHaveLength(500);
    expect(new Set(words.map(word => word.id)).size).toBe(500);
    for (const id of ['nanchang-gan', 'changsha-xiang']) {
      expect(words.filter(word => word.localityId === id)).toHaveLength(250);
    }
    for (const word of words) {
      const row = recordById.get(word.id)!;
      expect(row).toBeDefined();
      expect(word.han).toBe(row.sourceCharacters.replaceAll(' ', ''));
      expect(word.han).not.toContain('囗');
      expect(word.ipa.slice(1, -1).replaceAll(' ', '')).toBe(row.sourceValue);
      expect(word.toneNotation).toBe('pitch-contour');
      expect(word.registerLabel).toContain('1950s survey · published 1964');
      expect(word.source.url).toContain(`forms.csv#L${row.line}`);
      expect(() => convertIpa(word.ipa, word.toneNotation)).not.toThrow();
    }
  });
  it('preserves a concrete interlocality contrast without substituting modern or shared readings', () => {
    const nc = words.find(word => word.localityId === 'nanchang-gan' && word.english === 'tea')!;
    const cs = words.find(word => word.localityId === 'changsha-xiang' && word.english === 'tea')!;
    expect([nc.han, nc.ipa]).toEqual(['茶', '[tsʰa²⁴]']);
    expect([cs.han, cs.ipa]).toEqual(['茶', '[tsa¹³]']);
    for (const locality of ['nanchang-gan', 'changsha-xiang']) {
      const eat = words.find(word => word.localityId === locality && word.english === 'eat')!;
      const drink = words.find(word => word.localityId === locality && word.english === 'drink')!;
      expect(eat.ipa).toBe(drink.ipa);
      expect(eat.han).toBe('吃');
      expect(eat.id).not.toBe(drink.id);
    }
  });
  it('resolves every new locality through a real four-level path and labels county scope', () => {
    const keys = new Set(atlasGanXiangClusters.map(cluster => `${cluster.groupId}/${cluster.branchId}/${cluster.id}`));
    expect(atlasGanXiangLocalities).toHaveLength(115);
    expect(new Set(atlasGanXiangLocalities.map(point => point.id)).size).toBe(115);
    expect(new Set(atlasGanXiangClusters.map(cluster => `${cluster.groupId}/${cluster.branchId}`)).size).toBe(14);
    for (const point of atlasGanXiangLocalities) {
      expect(keys.has(`${point.groupId}/${point.branchId}/${point.clusterId}`)).toBe(true);
      expect(point.coordinates.every(Number.isFinite)).toBe(true);
      if (point.id.includes('-county-')) {
        expect(point.referenceType).toBe('county');
        expect(point.scope).toContain('not a speaker');
        expect(point.geographySource?.locator).toContain('P442');
      }
    }
    for (const pack of ganXiangLearning) {
      const core = atlasGanXiangLocalities.find(point => point.id === pack.words[0]?.localityId)!;
      expect(pack.branchId).toBe(`${core.groupId}/${core.branchId}`);
      expect(pack.culture.length).toBeGreaterThanOrEqual(2);
      expect(pack.resources.length).toBeGreaterThanOrEqual(4);
    }
  });
});
