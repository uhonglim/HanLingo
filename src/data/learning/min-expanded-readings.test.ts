import { describe, expect, it } from 'vitest';
import { minExpandedReadings } from './min-expanded-readings';
import { meaningPracticeWords } from './practice';
import ledger from '../../../docs/min-sinica-reading-provenance.json';

describe('Sinica Min character readings', () => {
  const words = minExpandedReadings.flatMap(pack => pack.words);
  it('keeps all 1,500 phonological entries out of lexical meaning quizzes', () => {
    expect(words).toHaveLength(1500);
    expect(minExpandedReadings).toHaveLength(15);
    expect(meaningPracticeWords(words)).toEqual([]);
    for (const word of words) {
      expect(word.learningKind).toBe('character-reading');
      expect(word.english).toBe(`Character ${word.han}`);
      expect(word.registerLabel).toContain('character reading');
    }
  });
  it('preserves existing saved-record identities and every source IPA and pitch value', () => {
    const sourceRows = new Map(ledger.records.map(row => [`${row.localityId}/${row.han}`, row]));
    for (const word of words) {
      const row = sourceRows.get(`${word.localityId}/${word.han}`)!;
      expect(row).toBeDefined();
      const sourceNumber = row.workbook.match(/^\d+/)![0];
      expect(word.id).toBe(`sinica-min-${sourceNumber}-${row.sourceId}`);
      expect(word.ipa).toBe(`[${row.initial === '0' ? '' : row.initial}${row.rime}${row.pitch}]`);
      expect(word.toneNotation).toBe('pitch-contour');
      expect(word.note).toContain(row.toneCategory);
    }
  });
});
