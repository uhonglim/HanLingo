import { describe, expect, it } from 'vitest';
import { gongjiangHakkaLearning } from './gongjiang-hakka';
import { convertIpa } from '../romanization-method';
import ledger from '../../../docs/gongjiang-hakka-provenance.json';

const pack = gongjiangHakkaLearning[0];
describe('Gongjiang referential kinship selection', () => {
  it('locks the eight independently checked lexical joins', () => {
    expect(pack.words.map(w => [w.han, w.ipa, w.english])).toEqual([
      ['伯伯', '[paʔ⁵ paʔ⁵]', 'father’s elder brother'],
      ['大伯', '[tʰæ⁴² paʔ⁵]', 'father’s elder brother'],
      ['伯老', '[paʔ⁵ lɔ³⁵]', 'father’s elder brother'],
      ['叔', '[ʂuʔ⁵]', 'father’s younger brother'],
      ['叔老', '[ʂuʔ⁵ lɔ³⁵]', 'father’s younger brother'],
      ['老伯', '[lɔ³⁵ paʔ⁵]', 'elder brother'],
      ['内兄', '[lui⁴² ɕiəŋ³¹]', 'wife’s elder brother'],
      ['老婆舅', '[lɔ³⁵ pʰɤ⁴⁴ tɕʰiu³¹]', 'wife’s brother'],
    ]);
    expect(pack.words.every(w => w.writingStatus === 'attested' && w.learningKind === 'word')).toBe(true);
    expect(pack.words.some(w => w.han === '内弟' || /[0⁰]/u.test(w.ipa))).toBe(false);
    expect(ledger.held).toHaveLength(7);
  });
  it('keeps supplied tone values, exact segments and semantic overlap safeguards', () => {
    for (const word of pack.words) {
      expect(word.toneNotation).toBe('pitch-contour');
      const spelling = convertIpa(word.ipa, word.toneNotation).map(s => s.spelling).join(' ');
      expect(spelling).not.toContain('?');
      expect(spelling).not.toContain('55');
      const source = ledger.records.find(r => r.id === word.id)!;
      expect(word.ipa.replace(/[\[\] ]/gu, '')).toBe(source.sourceForm);
    }
    expect(pack.words.filter(w => w.meaningPracticeExclude).map(w => w.han)).toEqual(['老婆舅']);
    expect(pack.words.find(w => w.han === '内兄')?.registerLabel).toContain('literary');
  });
  it('qualifies the reference, verification period, address exclusion and non-audio resources', () => {
    expect(pack.branchId).toBe('hakka/yuxin');
    for (const word of pack.words) {
      expect(word.localityId).toBe('gongjiang-hakka');
      expect(word.registerLabel).toContain('Gongjiang reference');
      expect(word.note).toContain('excludes forms of address');
      expect(word.note).toContain('checked online during 2018–2022');
      expect(word.note).toContain('no item-specific recording date or audio');
    }
    expect(pack.soundNotes).toHaveLength(2);
    expect(pack.culture).toHaveLength(2);
    expect(pack.resources).toHaveLength(3);
    for (const item of [...pack.soundNotes, ...pack.culture, ...pack.resources]) expect(item.localityIds).toEqual(['gongjiang-hakka']);
    expect(ledger.source.rights).toContain('all rights reserved');
    expect(pack.resources[0].description).toContain('Copyright retained');
  });
});
