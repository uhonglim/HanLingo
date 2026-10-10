import { describe, expect, it } from 'vitest';
import { wuJinyunWuzhouLearning } from './wu-jinyun-wuzhou';
import { convertIpa } from '../romanization-method';
import { localWordCanDistract, meaningPracticeWords, practiceSelection } from './practice';
import ledger from '../../../docs/wu-jinyun-wuzhou-provenance.json';

describe('bounded Jinyun and Wuzhou source readings', () => {
  const [jinyun, wuzhou] = wuJinyunWuzhouLearning;
  it('retains Jinyun source pitch and source-specific lexical glosses', () => {
    expect(jinyun.words).toHaveLength(20);
    expect(meaningPracticeWords(jinyun.words)).toHaveLength(20);
    const digits = '⁰¹²³⁴⁵⁶⁷⁸⁹';
    for (const row of ledger.jinyun.candidates) {
      const word = jinyun.words.find(item => item.id === row.id)!;
      expect(word).toMatchObject({ han: row.han, english: row.english, learningKind: 'word', toneNotation: 'pitch-contour', localityId: 'jinyun-county-331122' });
      expect(word.ipa).toBe(`[${row.sourceSegments}${row.sourcePitch.replace(/[0-9]/gu, n => digits[Number(n)])}]`);
      expect(convertIpa(word.ipa, word.toneNotation)[0].spelling).toContain(row.sourcePitch);
      expect(word.registerLabel).toContain('one speaker, late 1990s');
      expect(word.registerLabel).toContain('settlement unspecified');
      expect(word.registerLabel).toContain('2009 source: Chuqu; current atlas: Jinqu');
      if (row.shortDuration) {
        expect(word.note).toContain('short duration');
        expect(word.registerLabel).toContain('short checked syllable');
      }
    }
    expect(jinyun.words.find(w => w.han === '麻')?.ipa).toBe('[mʌw¹³¹]');
    expect(jinyun.words.find(w => w.han === '马')?.ipa).toBe('[mʌw³³¹]');
    expect(jinyun.words.find(w => w.han === '登')?.english).toBe('climb');
    expect(jinyun.words.find(w => w.han === '杂')?.ipa).toBe('[zɛʔ²¹³]');
    expect(ledger.jinyun.held.map(row => row.han)).toEqual(['懂', '时', '是', '醉']);
    expect(localWordCanDistract(jinyun.words.find(w => w.han === '麻')!, jinyun.words.find(w => w.han === '马')!)).toBe(true);
    expect(practiceSelection(jinyun.words)?.mode).toBe('meaning');
  });
  it('never interprets Chen’s undefined numbers as pitch or lexical meanings', () => {
    expect(wuzhou.words).toHaveLength(14);
    expect(wuzhou.words.filter(w => w.localityId === 'yongkang')).toHaveLength(6);
    expect(wuzhou.words.filter(w => w.localityId === 'wuyi')).toHaveLength(8);
    expect(meaningPracticeWords(wuzhou.words)).toEqual([]);
    expect(practiceSelection(wuzhou.words.filter(w => w.localityId === 'yongkang'))?.mode).toBe('spelling');
    expect(practiceSelection(wuzhou.words.filter(w => w.localityId === 'wuyi'))?.mode).toBe('spelling');
    for (const row of ledger.wuzhou.candidates) {
      const word = wuzhou.words.find(item => item.id === row.id)!;
      expect(word).toMatchObject({ han: row.han, ipa: `[${row.sourceSegments}]`, english: `Character ${row.han}`, learningKind: 'character-reading', toneNotation: 'unspecified' });
      expect(word.ipa).not.toMatch(/[0-9⁰¹²³⁴⁵⁶⁷⁸⁹]/u);
      expect(word.registerLabel).toContain(`source number ${row.sourceNumber}; pitch key unspecified`);
      expect(word.note).toContain('does not give a key');
      expect(convertIpa(word.ipa, word.toneNotation)[0].spelling).not.toMatch(/[0-9]/u);
    }
    expect(wuzhou.words.find(w => w.han === '釣')?.ipa).toBe('[ʔlie]');
    expect(wuzhou.words.find(w => w.han === '表')?.ipa).toBe('[pie]');
  });
  it('provides scoped sound notes, cultural context and useful sources for each place', () => {
    for (const pack of wuJinyunWuzhouLearning) {
      for (const id of new Set(pack.words.map(word => word.localityId))) {
        expect(pack.soundNotes.filter(note => note.localityIds.includes(id)).length).toBeGreaterThanOrEqual(2);
        expect(pack.culture.filter(note => note.localityIds.includes(id)).length).toBeGreaterThanOrEqual(2);
        expect(pack.resources.filter(note => note.localityIds.includes(id)).length).toBeGreaterThanOrEqual(2);
      }
    }
    expect(jinyun.resources.find(item => item.title === 'Current atlas placement')?.description).toContain('independently uses Chuqu');
    expect(wuzhou.culture.find(item => item.title.includes('Yuyuan'))?.text).toContain('not an identified source');
  });
});
