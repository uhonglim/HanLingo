import { describe, expect, it } from 'vitest';
import { atlasLexibankDeeperPacks } from './atlas-lexibank-deeper';
import { atlasLexibankPacks } from './atlas-lexibank';
import originalLedger from './atlas-lexibank-provenance.json';
import ledger from '../../../docs/beida-deeper-provenance.json';
import selection from '../../../docs/beida-deeper-selection.json';
import { convertIpa } from '../romanization-method';
const original = atlasLexibankPacks.flatMap(pack => pack.words);
const words = atlasLexibankDeeperPacks.flatMap(pack => pack.words);

describe('reviewed Beida deeper supplement', () => {
  it('adds 120 distinct records to each original 80-word collection without overlap', () => {
    expect(original).toHaveLength(1120);
    expect(words).toHaveLength(1680);
    expect(atlasLexibankDeeperPacks).toHaveLength(14);
    const existingIds = new Set(original.map(word => word.id));
    expect(new Set(words.map(word => word.id)).size).toBe(words.length);
    for (const pack of atlasLexibankDeeperPacks) {
      expect(pack.words).toHaveLength(120);
      const locality = pack.words[0].localityId;
      const combined = [...original.filter(word => word.localityId === locality), ...pack.words];
      expect(combined).toHaveLength(200);
      const newForms = new Set<string>();
      const oldForms = new Set(combined.slice(0, 80).map(word => `${word.han}/${word.ipa}`));
      for (const word of pack.words) {
        expect(word.localityId).toBe(locality);
        expect(existingIds.has(word.id)).toBe(false);
        const form = `${word.han}/${word.ipa}`;
        expect(oldForms.has(form)).toBe(false);
        expect(newForms.has(form)).toBe(false);
        newForms.add(form);
      }
    }
  });

  it('preserves every reviewed local character, supplied pitch, meaning and source-row locator', () => {
    expect(ledger.records).toHaveLength(words.length);
    const byId = new Map(ledger.records.map(row => [row.id, row]));
    for (const word of words) {
      const row = byId.get(word.id)!;
      expect(row).toBeDefined();
      expect(word.han).toBe(row.sourceCharacters.replaceAll(' ', ''));
      expect(word.han).not.toContain('囗');
      expect(word.ipa.slice(1, -1).replaceAll(' ', '')).toBe(row.sourceValue);
      expect(word.ipa).not.toMatch(/[0-9⁰⁶⁷⁸⁹⁻]/u);
      expect(row.sourceValue.match(/[¹²³⁴⁵]+/gu)).toEqual(row.sourceSegments.match(/[¹²³⁴⁵]+/gu));
      expect(word.english).toBe(row.english);
      expect(word.localityId).toBe(row.localityId);
      expect(word.source.url).toBe(`${ledger.repository}/blob/${ledger.commit}/cldf/forms.csv#L${row.sourceLine}`);
      expect(word).toMatchObject({ learningKind: 'word', toneNotation: 'pitch-contour', reading: '1950s survey · published 1964' });
      expect(word.registerLabel).toContain('1950s survey');
      expect(word.note).toContain('not a claim about every present-day speaker');
      expect(convertIpa(word.ipa, 'pitch-contour').length).toBeGreaterThan(0);
    }
    for (const [path, hash] of Object.entries(ledger.checksums)) {
      expect(hash).toBe(originalLedger.checksums[path as keyof typeof originalLedger.checksums]);
    }
  });

  it('excludes reviewed holds and old concepts, while documenting the scarf heading correction', () => {
    const oldConcepts = new Set(originalLedger.records.map(row => `${row.sourceId.split('-')[0]}/${row.conceptId}`));
    const newConcepts = new Set<string>();
    const held = new Set(selection.held.map(row => row.sourceId));
    expect(held.size).toBe(42);
    for (const row of ledger.records) {
      const key = `${row.languageId}/${row.conceptId}`;
      expect(oldConcepts.has(key)).toBe(false);
      expect(newConcepts.has(key)).toBe(false);
      expect(held.has(row.sourceId)).toBe(false);
      newConcepts.add(key);
      if (row.conceptId === '234_shawl') {
        expect(row.sourceEnglish).toBe('shawl');
        expect(row.questionnaireChinese).toBe('圍巾');
        expect(row.english).toBe('scarf');
        expect(words.find(word => word.id === row.id)?.note).toContain('English heading is “shawl”');
      } else if (row.conceptId === '220_jacket') {
        expect(row.sourceEnglish).toBe('jacket');
        expect(row.questionnaireChinese).toBe('上衣');
        expect(row.english).toBe('upper garment');
      } else expect(row.english).toBe(row.sourceEnglish);
    }
    expect(ledger.records.filter(row => row.conceptId === '234_shawl')).toHaveLength(12);
    expect(ledger.records.filter(row => row.conceptId === '220_jacket')).toHaveLength(7);
  });
});
