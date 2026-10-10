import { describe, expect, it } from 'vitest';
import { ganFuguangHunanLearning } from './gan-fuguang-hunan';
import { meaningPracticeWords, practiceSelection, practiceSpelling } from './practice';
import ledger from '../../../docs/gan-fuguang-hunan-provenance.json';

const pack = ganFuguangHunanLearning[0];
describe('Hunan township Fu–Guang character starter', () => {
  it('preserves the exact selected row rather than a neighbouring township', () => {
    expect(pack.words.map(word => word.han).join('')).toBe('栽节草全三摘茶猪斋壮初床山蒸丑蛇');
    expect(pack.words.map(word => word.ipa)).toEqual([
      '[tsai1]', '[tɕiet7]', '[tsʰau3]', '[tɕʰyon2]', '[san1]', '[tsaʔ7]', '[tsʰa2]', '[te1]',
      '[tsai1]', '[tsoŋ5]', '[tsʰu1]', '[soŋ2]', '[san1]', '[tiŋ1]', '[tʰiu3]', '[sa2]',
    ]);
    expect(ledger.rows.map(row => row.sourceForm)).toEqual([
      '꜀tsai', 'tɕiet꜆', '꜂tsʰau', '꜁tɕʰyon', '꜀san', 'tsaʔ꜆', '꜁tsʰa', '꜀te',
      '꜀tsai', 'tsoŋ꜄', '꜀tsʰu', '꜁soŋ', '꜀san', '꜀tiŋ', '꜂tʰiu', '꜁sa',
    ]);
  });
  it('makes editorial tone-category normalization explicit and never teaches character gloss guesses', () => {
    expect(meaningPracticeWords(pack.words)).toEqual([]);
    expect(practiceSelection(pack.words)?.mode).toBe('spelling');
    expect(practiceSpelling(pack.words[0])).toBe('tsai·T1');
    expect(practiceSpelling(pack.words[1])).toBe('chiet·T7');
    expect(practiceSpelling(pack.words[3])).toBe('chhüon·T2');
    expect(new Set(pack.words.map(practiceSpelling)).size).toBe(14);
    pack.words.forEach((word, index) => {
      expect(word.learningKind).toBe('character-reading');
      expect(word.toneNotation).toBe('source-category');
      expect(word.note).toContain(ledger.rows[index].sourceForm);
      expect(word.note).toContain('editorial T');
      expect(word.note).toContain('not this digit or a pitch contour');
      expect(word.registerLabel).toContain('one speaker');
      expect(word.registerLabel).toContain('tone categories, not pitch');
      expect(word.note).toContain('collection date, age-reference year and precise village are unspecified');
    });
  });
  it('keeps culture, sound notes and rights scoped to this reference', () => {
    expect(pack.branchId).toBe('gan/fuguang');
    expect(pack.soundNotes).toHaveLength(2);
    expect(pack.culture).toHaveLength(2);
    expect(pack.resources).toHaveLength(4);
    for (const item of [...pack.soundNotes, ...pack.culture, ...pack.resources]) expect(item.localityIds).toEqual(['hunan-fuzhou']);
    expect(pack.culture[0].text).toContain('2015');
    expect(pack.culture[0].text).toContain('not a claim that the buildings remain intact');
    expect(pack.culture[1].text).toContain('neither is identified');
    expect(ledger.source.rights).toContain('No open reuse licence');
    expect(pack.resources[0].description).toContain('Copyright retained');
  });
});
