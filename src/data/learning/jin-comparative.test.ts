import { describe, expect, it } from 'vitest';
import { jinComparativeLearning } from './jin-comparative';
import ledger from '../../../docs/jin-comparative-provenance.json';
import { convertIpa } from '../romanization-method';
import { meaningPracticeWords, practiceSelection } from './practice';

describe('bounded Jin character comparison', () => {
  const words = jinComparativeLearning.flatMap(pack => pack.words);
  it('preserves exact source segments without inventing tone categories or lexical meanings', () => {
    expect(words).toHaveLength(18);
    for (const row of ledger.rows) {
      const word = words.find(w => w.id === row.id)!;
      expect(row.hold).toBe(false);
      expect(word.han).toBe(row.han);
      expect(word.ipa).toBe(`[${row.sourceForm.replace(/[\uA700-\uA707]/gu, '')}]`);
      expect(word.learningKind).toBe('character-reading');
      expect(word.english).toBe(`Character ${row.han}`);
      expect(word.toneNotation).toBe('unspecified');
      expect(word.registerLabel).toContain(`source mark ${row.sourceToneMark}`);
      expect(word.registerLabel).toContain('speakers born before 1952');
      expect(word.registerLabel).toContain('pitch not supplied');
      expect(word.note).toContain(row.sourceForm);
      expect(word.source.url).toContain('#page=3');
      expect(() => convertIpa(word.ipa, word.toneNotation)).not.toThrow();
    }
    expect(meaningPracticeWords(words)).toEqual([]);
    expect(words.find(w => w.id === 'zhi2024-changzhi-jin-t1-c1')?.ipa).toBe('[tsɑŋ]');
    expect(ledger.rows.filter(row => 'extractedForm' in row)).toHaveLength(4);
    expect(ledger.heldRows).toHaveLength(8);
    expect(words.some(w => w.localityId.includes('heshun'))).toBe(false);
  });
  it('uses exact sample scope and only sufficiently distinct spelling exercises', () => {
    const changzhi = jinComparativeLearning.find(p => p.branchId === 'jin/shangdang')!;
    const handan = jinComparativeLearning.find(p => p.branchId === 'jin/hanxin')!;
    expect(changzhi.words.every(w => w.registerLabel?.startsWith('Luzhou, Changzhi'))).toBe(true);
    expect(handan.words.every(w => w.registerLabel?.startsWith('Mazhuang, Handan'))).toBe(true);
    expect(practiceSelection(changzhi.words)?.mode).toBe('spelling');
    expect(practiceSelection(changzhi.words)?.words).toHaveLength(4);
    expect(practiceSelection(handan.words)).toBeUndefined();
    expect(handan.soundNotes.some(n => n.text.includes('Congtai District') && n.text.includes('not the Mazhuang fieldwork location'))).toBe(true);
    for (const pack of jinComparativeLearning) {
      expect(pack.words).toHaveLength(9);
      expect(pack.soundNotes.length).toBeGreaterThanOrEqual(2);
      expect(pack.culture.length).toBeGreaterThanOrEqual(2);
      expect(pack.resources.length).toBeGreaterThanOrEqual(2);
      for (const note of [...pack.soundNotes, ...pack.culture, ...pack.resources]) expect(note.localityIds).toEqual([pack.words[0].localityId]);
    }
  });
});
