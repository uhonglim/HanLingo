import { describe, expect, it } from 'vitest';
import { houHangzhouShexianLearning } from './hou-hangzhou-shexian';
import ledger from '../../../docs/hou-hangzhou-shexian-provenance.json';
import { convertIpa } from '../romanization-method';
import { localWordCanDistract, meaningPracticeWords, practiceSelection } from './practice';

describe('source-controlled Hou/List lexical collection', () => {
  const words = houHangzhouShexianLearning.flatMap(pack => pack.words);
  it('preserves source Form IPA and original Han Value with explicit source-specific scope', () => {
    expect(words).toHaveLength(160);
    expect(new Set(words.map(w => w.id)).size).toBe(160);
    for (const row of ledger.rows) {
      const word = words.find(w => w.id === `hou-list-${row.id.toLowerCase()}`)!;
      expect(word.han).toBe(row.raw.Ortho);
      expect(row.ipa.normalize('NFC')).toBe(row.raw.IPA.replaceAll('#', '-').normalize('NFC'));
      expect(word.ipa.replaceAll(' ', '')).toBe(`[${row.ipa}]`);
      expect(word.english).toBe(row.english);
      expect(word.learningKind).toBe('word');
      expect(word.toneNotation).toBe('pitch-contour');
      expect(word.registerLabel).toContain(row.language === 'Hangzhou' ? 'neighbourhood unspecified' : 'settlement unspecified');
      expect(word.registerLabel).toContain('Hou 2004 / List 2014');
      expect(word.note).toContain('no consultant biography or fieldwork date');
      expect(word.note).toContain('CC BY 4.0');
      expect(word.source.url).toContain(`${ledger.commit}/cldf/forms.csv#L${row.cldfLine}`);
      const converted = convertIpa(word.ipa, word.toneNotation);
      expect(converted).toHaveLength(row.han.length);
      expect(converted.every(syllable => syllable.tone)).toBe(true);
      expect(row.ipa.match(/[¹²³⁴⁵]+/gu)).toEqual(row.segments.match(/[¹²³⁴⁵]+/gu));
    }
  });
  it('holds partial phrases and ambiguous glosses while preserving attested meaning ranges', () => {
    for (const id of Object.keys(ledger.held)) expect(words.some(w => w.id === `hou-list-${id.toLowerCase()}`)).toBe(false);
    expect(ledger.rows.some(r => [122,123,124,125,126,127,128,129,180].includes(Number(r.concept.Number)))).toBe(false);
    expect(words.filter(w => w.localityId === 'shexian-hui' && w.han === '女')).toHaveLength(1);
    expect(words.find(w => w.localityId === 'shexian-hui' && w.han === '女')?.note).toContain('also lists the same written and spoken form under girl');
    expect(words.find(w => w.han === '起风')?.english).toBe('wind is blowing');
    expect(words.filter(w => w.han === '落雨').every(w => w.english === 'raining')).toBe(true);
    for (const pack of houHangzhouShexianLearning) {
      expect(pack.words).toHaveLength(80);
      expect(meaningPracticeWords(pack.words)).toHaveLength(80);
      expect(practiceSelection(pack.words)?.mode).toBe('meaning');
      expect(pack.soundNotes).toHaveLength(2);
      expect(pack.resources.length).toBeGreaterThanOrEqual(2);
    }
    const hangzhou = houHangzhouShexianLearning[0];
    const who = hangzhou.words.find(w => w.han === '哪个')!;
    const that = hangzhou.words.find(w => w.han === '那个')!;
    expect(who.ipa).toBe(that.ipa);
    expect(localWordCanDistract(who, that)).toBe(false);
    expect(houHangzhouShexianLearning[1].culture).toHaveLength(2);
    expect(houHangzhouShexianLearning[1].culture.every(c => c.localityIds[0] === 'shexian-hui')).toBe(true);
  });
});
