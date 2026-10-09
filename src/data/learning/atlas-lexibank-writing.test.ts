import { createHash } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import { atlasLexibankPacks } from './atlas-lexibank';
import sourceLedger from './atlas-lexibank-provenance.json';
import repairLedger from '../../../docs/beida-writing-repairs.json';
import { convertIpa } from '../romanization-method';

const words = atlasLexibankPacks.flatMap(pack => pack.words);
const repairedIds = new Set(repairLedger.records.map(record => record.id));
const hash = (value: unknown) => createHash('sha256').update(JSON.stringify(value)).digest('hex');

describe('Beida incomplete-writing migration', () => {
  it('preserves every published ID, pronunciation, meaning, locality and order', () => {
    expect(words).toHaveLength(repairLedger.existingCount);
    expect(words.map(word => word.id)).toEqual(repairLedger.preservedSourceIds.map(id => `beida1964-${id}`));
    const core = words.map(({ id, ipa, english, localityId }) => ({ id, ipa, english, localityId }));
    expect(hash(core)).toBe(repairLedger.unchangedCoreSha256);
    expect(hash(words.filter(word => !repairedIds.has(word.id)))).toBe(repairLedger.unchangedOtherWordsSha256);
  });

  it('moves exactly ten unresolved source spellings to explicitly incomplete writing', () => {
    expect(repairLedger.records).toHaveLength(10);
    expect(words.filter(word => word.han === null).map(word => word.id).sort()).toEqual([...repairedIds].sort());
    for (const repair of repairLedger.records) {
      const word = words.find(item => item.id === repair.id)!;
      expect(word).toMatchObject({ han: null, writingStatus: 'not-supplied', learningKind: 'word', ipa: repair.ipa, english: repair.english, localityId: repair.localityId });
      expect(repair.previousHan).toBe(repair.sourceCharacters.replaceAll(' ', ''));
      expect(word.note).toContain(`“${repair.sourceCharacters}”`);
      expect(word.note).toContain('No complete written form is supplied');
      expect(convertIpa(word.ipa, word.toneNotation).length).toBeGreaterThan(0);
      const source = sourceLedger.records.find(record => record.id === repair.id)!;
      expect(source.sourceCharacters).toBe(repair.sourceCharacters);
      expect(source.line).toBe(repair.sourceLine);
      expect(word.source.url).toContain(`#L${repair.sourceLine}`);
    }
    expect(words.some(word => word.han?.includes('囗'))).toBe(false);
  });
});
