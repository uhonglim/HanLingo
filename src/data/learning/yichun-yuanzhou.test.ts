import { describe, expect, it } from 'vitest';
import { yichunYuanzhouLearning } from './yichun-yuanzhou';
import { findAtlasLocality } from '../atlas';
import { convertIpa } from '../romanization-method';
import ledger from '../../../docs/yichun-yuanzhou-provenance.json';

const pack = yichunYuanzhouLearning[0];
describe('central–southern Yuanzhou lexical starter', () => {
  it('uses the existing district and visibly qualifies the narrower study', () => {
    expect(findAtlasLocality('gan-county-360902')).toMatchObject({ groupId: 'gan', branchId: 'yiliu' });
    expect(pack.branchId).toBe('gan/yiliu');
    expect(pack.words).toHaveLength(16);
    expect(new Set(pack.words.map(word => word.id)).size).toBe(16);
    for (const word of pack.words) {
      expect(word.localityId).toBe('gan-county-360902');
      expect(word.registerLabel).toContain('Central–southern Yuanzhou');
      expect(word.registerLabel).toContain('not the whole district');
      expect(word.learningKind).toBe('word');
      expect(word.writingStatus).toBe('attested');
      expect(word.toneNotation).toBe('pitch-contour');
      expect(word.source.url).toBe('https://doi.org/10.1515/9781501507328');
      expect(word.source.title).not.toContain('CC BY');
      expect(convertIpa(word.ipa, word.toneNotation).length).toBeGreaterThan(0);
    }
  });
  it('keeps source lexemes, rounded vowels and nasal symbols intact', () => {
    for (const record of ledger.records) {
      const word = pack.words.find(item => item.id === record.id)!;
      expect(word).toMatchObject({ han: record.han, english: record.english, ipa: record.ipa });
      expect(word.source.title).toContain(`p. ${record.printedPage}`);
      expect(word.source.title).toContain(record.example);
    }
    expect(pack.words.find(word => word.han === '你')?.ipa).toBe('[ȵi³⁴]');
    expect(pack.words.find(word => word.han === '树')?.ipa).toBe('[tɕʰy²¹³]');
    expect(pack.words.find(word => word.han === '表妹')?.ipa).toBe('[piɛu⁴² mœ⁴⁴]');
    expect(pack.words.find(word => word.han === '洋布')?.english).toBe('cloth in general');
    expect(pack.words.find(word => word.han === '渠')?.english).toBe('third-person singular pronoun');
  });
  it('does not fabricate suffix tones or flatten explicit sandhi chains', () => {
    expect(pack.words.find(word => word.han === '迷毛雨')?.note).toContain('optional');
    for (const held of ['表姐', '洋火', '树仔']) expect(pack.words.some(word => word.han === held)).toBe(false);
    expect(ledger.held).toHaveLength(4);
    expect(ledger.source.openLicense).toBeNull();
    expect(pack.words.every(word => !/[⁰⁵→]/u.test(word.ipa))).toBe(true);
    expect(pack.resources[1].description).toContain('None of these sixteen');
  });
  it('keeps two language notes and two cultural topics scoped to the same existing reference', () => {
    expect(pack.soundNotes).toHaveLength(2);
    expect(pack.culture).toHaveLength(2);
    expect(pack.resources).toHaveLength(4);
    for (const item of [...pack.soundNotes, ...pack.culture, ...pack.resources]) expect(item.localityIds).toEqual(['gan-county-360902']);
    expect(pack.culture[1].text).toContain('2023');
    expect(pack.culture[0].text).toContain('not an identified recording location');
  });
});
