import { describe, expect, it } from 'vitest';
import { laiyuanContactLearning } from './laiyuan-contact';
import { convertIpa } from '../romanization-method';
import ledger from '../../../docs/laiyuan-contact-provenance.json';

const pack = laiyuanContactLearning[0];
describe('Laiyuan primary lexical selection', () => {
  it('keeps the two consultant references separate and preserves the bounded selection', () => {
    expect(pack.branchId).toBe('contact/western-fujian');
    expect(pack.words).toHaveLength(24);
    expect(new Set(pack.words.map(word => word.id)).size).toBe(24);
    for (const locality of ['niujia-laiyuan', 'huangzong-laiyuan']) {
      const words = pack.words.filter(word => word.localityId === locality);
      expect(words).toHaveLength(12);
      expect(words.filter(word => word.han !== null)).toHaveLength(6);
      expect(words.filter(word => word.han === null)).toHaveLength(6);
      expect(words.every(word => word.learningKind === 'word')).toBe(true);
      expect(words.every(word => word.registerLabel?.includes('2016'))).toBe(true);
      expect(pack.soundNotes.filter(note => note.localityIds.includes(locality))).toHaveLength(2);
      expect(pack.culture.filter(item => item.localityIds.includes(locality))).toHaveLength(2);
      expect(pack.resources.filter(item => item.localityIds.includes(locality)).length).toBeGreaterThanOrEqual(2);
    }
  });

  it('does not reinterpret historical categories as pitch or add unprinted closures', () => {
    const get = (id: string) => pack.words.find(word => word.id === id)!;
    expect(get('ho2016-huangzong-narrow').ipa).toBe('[hi8]');
    expect(get('ho2016-niujia-narrow').ipa).toBe('[hieʔ8]');
    expect(get('ho2016-niujia-give').ipa.normalize('NFC')).toBe('[pã1]');
    expect(get('ho2016-huangzong-give').ipa).toBe('[kuo67]');
    expect(get('ho2016-niujia-ear').ipa).toBe('[ɲieŋ3 ku1]');
    expect(get('ho2016-huangzong-ear').ipa).toBe('[ɲi3 kʰaŋ1]');
    expect(convertIpa('[kuo67]', 'source-category')[0].spelling).toContain('·T67');
    for (const word of pack.words) {
      expect(word.toneNotation).toBe('source-category');
      expect(word.note).toContain('not pitch contours');
      expect(convertIpa(word.ipa, word.toneNotation).length).toBeGreaterThan(0);
    }
  });

  it('uses explicit source writing without turning etymological proposals into spellings', () => {
    for (const word of pack.words) {
      const record = ledger.records.find(item => item.id === word.id)!;
      expect(word).toMatchObject({ han: record.han, ipa: record.ipa, english: record.english });
      expect(word.source.title).toContain(`p. ${record.sourcePage}`);
      expect(word.source.url.endsWith(`#page=${record.sourcePage + 2}`)).toBe(true);
      expect(word.writingStatus).toBe(word.han === null ? 'not-supplied' : 'attested');
    }
    expect(pack.words.filter(word => word.han === '食')).toHaveLength(2);
    expect(pack.words.filter(word => word.han === '耳菇')).toHaveLength(1);
    expect(pack.words.filter(word => word.han === '耳空')).toHaveLength(1);
    expect(pack.words.filter(word => word.english === 'give').every(word => word.han === null)).toBe(true);
    expect(pack.words.filter(word => word.english === 'narrow').every(word => word.han === null)).toBe(true);
    expect(ledger.source.openLicense).toBeNull();
    expect(pack.resources[2].description).toContain('No open licence');
  });
});
