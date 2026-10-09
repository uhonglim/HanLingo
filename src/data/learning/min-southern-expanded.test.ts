import { describe, expect, it } from 'vitest';
import { minSouthernExpanded } from './min-southern-expanded';
import { convertIpa } from '../romanization-method';

const words = minSouthernExpanded.flatMap(pack => pack.words);
const readings = (localityId: string, han: string) => words.filter(word => word.localityId === localityId && word.han === han);

describe('image-audited Southern Min comparison and Penang words', () => {
  it('keeps local differences, dated scopes and source alternatives', () => {
    expect(readings('george-town', '豬')[0].ipa).toBe('[tu33]');
    expect(readings('tongan', '豬')[0].ipa).toBe('[tɨ55]');
    expect(readings('quanzhou', '豬')[0].ipa).toBe('[tɯ55]');
    expect(readings('tongan', '日').map(word => word.ipa)).toEqual(['[lit5]', '[dzit5]']);
    expect(readings('george-town', 'laksa').map(word => word.ipa)).toEqual(['[lak1 sa11]', '[la11 sa11]']);
    expect(readings('longhai', '鼠')).toHaveLength(0); // an explicit missing cell is not reconstructed
    for (const word of words) {
      expect(word.registerLabel).toMatch(/2011\/2015|199[3689]/);
      expect(word.toneNotation).toBe('pitch-contour');
      expect(word.source.url).toMatch(/476201647\.pdf#page=\d+$/);
    }
  });
  it('does not turn a source headword or regional speaker into a city-wide Han standard', () => {
    const pasar = readings('george-town', 'pasar')[0];
    expect(pasar.registerLabel).toContain('Source-language headword');
    expect(pasar.note).toContain('does not supply a Hokkien Han spelling');
    expect(pasar.note).toContain('not a George Town-wide standard');
    expect(readings('george-town', '市場')).toHaveLength(0);
    expect(readings('george-town', '茶烏冰')[0].ipa).toBe('[tə33 ɔ33 piŋ55]');
    expect(readings('george-town', '茶烏')[0].ipa).toBe('[tɛ33 ɔ55]');
    expect(readings('singapore', 'pasar')).toHaveLength(0);
  });
  it('converts all readings through the shared central-vowel key', () => {
    expect(words.length).toBeGreaterThanOrEqual(150);
    expect(new Set(words.map(word => word.id)).size).toBe(words.length);
    for (const word of words) {
      const converted = convertIpa(word.ipa, word.toneNotation);
      expect(converted.length, word.id).toBeGreaterThan(0);
      expect(converted.every(item => item.spelling.length > 0), `${word.id}: ${word.ipa}`).toBe(true);
    }
  });
});
