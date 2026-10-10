import { describe, expect, it } from 'vitest';
import { lexicalExpansionLearning } from './lexical-expansion';
import { atlasLexicalStudyClusters, atlasLexicalStudyLocalities } from '../atlas/lexical-study-localities';
import { convertIpa } from '../romanization-method';
import ledger from '../../../docs/lexical-expansion-provenance.json';

const words = lexicalExpansionLearning.flatMap(pack => pack.words);
describe('pinned Harbin, Rongcheng, Loudi and Kunming lexical surveys', () => {
  it('preserves exact source forms, characters, glossary joins and physical row links', () => {
    expect(words).toHaveLength(692);
    expect(new Set(words.map(word => word.id)).size).toBe(words.length);
    const indexed = new Map(words.map(word => [word.id, word]));
    for (const record of ledger.records) {
      const word = indexed.get(record.id)!;
      expect(word.ipa.slice(1, -1).replaceAll(' ', '')).toBe(record.sourceValue.replaceAll(' ', ''));
      expect(word.han).toBe(record.sourceCharacters.replaceAll(' ', ''));
      expect(word.english).toBe((ledger.headingEdits as Record<string, string>)[record.sourceEnglish] ?? record.sourceEnglish);
      expect(word.localityId).toBe(record.localityId);
      expect(word.learningKind).toBe('word');
      expect(word.source.url).toContain(`#L${record.line}`);
      expect(word.toneNotation).toBe('pitch-contour');
      expect(convertIpa(word.ipa, word.toneNotation).length).toBeGreaterThan(0);
      expect(word.source.title).toContain('CC BY 4.0');
    }
  });
  it('keeps unresolved characters and missing internal tones out of lessons', () => {
    for (const heldId of Object.keys(ledger.holds)) {
      expect(words.some(word => word.id.endsWith(heldId))).toBe(false);
    }
    const lookup = (id: string) => words.find(word => word.id.endsWith(id))!;
    expect(lookup('Haerbin-99_person-1').ipa).toBe('[in²⁴]');
    expect(lookup('Rongcheng-14_eat-1')).toMatchObject({ han: '歹', english: 'eat', ipa: '[tai²¹⁴]' });
    expect(lookup('Loudi-14_eat-1').ipa).toBe(lookup('Loudi-47_drink-1').ipa);
    expect(lookup('Kunming-305_soap-1')).toMatchObject({ han: '洋堿', english: 'soap', ipa: '[iã³¹ tɕiɛ⁵³]' });
  });
  it('keeps sample dates and locality scopes visible and supplies evidence for learning notes', () => {
    const counts = { harbin: 151, 'rongcheng-371082': 150, 'loudi-study': 141, 'kunming-study': 250 };
    for (const [id, count] of Object.entries(counts)) {
      const pack = lexicalExpansionLearning.find(item => item.words[0].localityId === id)!;
      expect(pack.words).toHaveLength(count);
      expect(pack.soundNotes).toHaveLength(2);
      expect(pack.culture).toHaveLength(2);
      expect(pack.resources.length).toBeGreaterThanOrEqual(2);
      for (const item of [...pack.soundNotes, ...pack.culture, ...pack.resources]) expect(item.localityIds).toEqual([id]);
      for (const word of pack.words) expect(word.registerLabel).toContain(id === 'kunming-study' ? '1950s survey · published 1964' : 'published 2007 · collection date unspecified');
      for (const note of pack.soundNotes) expect(pack.words.some(word => word.source.url === note.source.url)).toBe(true);
    }
  });
  it('reuses the exact Rongcheng place and keeps distinct survey places separate', () => {
    expect(atlasLexicalStudyLocalities.map(place => place.id)).toEqual(['loudi-study', 'kunming-study']);
    expect(atlasLexicalStudyLocalities.some(place => place.referenceType === 'county')).toBe(false);
    expect(atlasLexicalStudyClusters[0]).toMatchObject({ id: 'yunnan', kind: 'classification', branchId: 'southwestern' });
    expect(atlasLexicalStudyClusters[0].source.locator).toContain('滇中小片');
    expect(atlasLexicalStudyLocalities.every(place => place.geographySource?.url.startsWith('https://www.wikidata.org/'))).toBe(true);
    expect(words.some(word => ['xiang-county-431302'].includes(word.localityId))).toBe(false);
    expect(words.filter(word => word.localityId === 'rongcheng-371082')).toHaveLength(150);
    expect(atlasLexicalStudyLocalities.some(place => place.id.startsWith('rongcheng'))).toBe(false);
  });
});
