import { describe, expect, it } from 'vitest';
import { yunlouGanLearning } from './yunlou-gan';
import { atlasYunlouGanLocalities } from '../atlas/yunlou-gan';
import { convertIpa } from '../romanization-method';
import ledger from '../../../docs/yunlou-gan-provenance.json';

const pack = yunlouGanLearning[0];
describe('Yunlou contextual word selection', () => {
  it('preserves the twenty visually checked source forms with exact page references', () => {
    expect(pack.words).toHaveLength(20);
    expect(new Set(pack.words.map(word => word.id)).size).toBe(20);
    for (const record of ledger.records) {
      const word = pack.words.find(item => item.id === record.id)!;
      expect(word).toMatchObject({
        ipa: record.ipa, han: record.han, english: record.english,
        localityId: 'yunlou-gan', learningKind: 'word', writingStatus: record.writingStatus,
        toneNotation: 'pitch-contour',
      });
      expect(word.source.url).toBe(`${ledger.source.pdfUrl}#page=${record.sourcePage}`);
      expect(word.source.title).toContain(record.sourceExample);
      expect(word.source.title).toContain('CC BY 4.0');
      expect(word.note).toContain('sentence example');
      expect(word.registerLabel).toContain('collection date unspecified');
      expect(convertIpa(word.ipa, word.toneNotation).length).toBeGreaterThan(0);
    }
  });
  it('never guesses a written form for IPA-only evidence', () => {
    const unwritten = pack.words.filter(word => word.han === null);
    expect(unwritten).toHaveLength(12);
    for (const word of unwritten) {
      expect(word.writingStatus).toBe('not-supplied');
      expect(word.note).toContain('without a written form');
    }
    expect(pack.words.filter(word => word.han !== null)).toHaveLength(8);
    expect(pack.words.find(word => word.han === '得')).toMatchObject({ english: 'complement marker', ipa: '[tɛ⁵⁵]' });
    expect(pack.words.find(word => word.han === '连')).toMatchObject({ english: 'additive particle', ipa: '[tian²⁴]' });
  });
  it('does not convert source tone zero or sandhi chains into invented contours', () => {
    expect(pack.words.every(word => !word.ipa.includes('⁰') && !word.ipa.includes('⁻'))).toBe(true);
    expect(pack.words.some(word => word.ipa.includes('³²⁴'))).toBe(true);
    expect(ledger.holds).toHaveLength(3);
    expect(pack.soundNotes[1].text).toContain('not flattened');
  });
  it('uses the named settlement reference and retains study scope', () => {
    expect(atlasYunlouGanLocalities).toHaveLength(1);
    const place = atlasYunlouGanLocalities[0];
    expect(place).toMatchObject({ id: 'yunlou-gan', groupId: 'gan', branchId: 'jicha', clusterId: 'jicha-localities', coordinates: [115.16583, 26.86083] });
    expect(place.geographySource?.url).toBe('https://www.geonames.org/1923997/yunlou.html');
    expect(place.scope).toContain('no speaker addresses');
    expect(pack.soundNotes).toHaveLength(2);
    expect(pack.culture).toHaveLength(2);
    expect(pack.resources.length).toBeGreaterThanOrEqual(2);
    for (const item of [...pack.soundNotes, ...pack.culture, ...pack.resources]) expect(item.localityIds).toEqual(['yunlou-gan']);
  });
});
