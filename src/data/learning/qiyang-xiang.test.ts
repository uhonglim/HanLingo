import { describe, expect, it } from 'vitest';
import { qiyangXiangLearning } from './qiyang-xiang';
import { atlasQiyangLocalities } from '../atlas/qiyang-xiang';
import { convertIpa } from '../romanization-method';
import ledger from '../../../docs/qiyang-xiang-provenance.json';

const pack = qiyangXiangLearning[0];
describe('Qiyang 2008 bounded source selection', () => {
  it('preserves the ten visually reviewed table cells and their distinct learning scope', () => {
    const cells = [
      ['低', '[ti³³⁴]', 'low'], ['爬', '[p̈a̤²³]', 'crawl'],
      ['离', '[t̤i̤²³]', 'leave'], ['底', '[ti⁴⁵]', 'bottom'],
      ['霸', '[pa³²⁴³]', 'tyrant'], ['帝', '[ti³²⁴³]', 'monarch'],
      ['罢', '[p̈a̤²¹⁴³]', 'stop'], ['白', '[p̈a̤²⁴]', 'white'],
      ['第', '[t̤i̤²¹⁴³]', 'function word'], ['粒', '[t̤i̤²⁴]', 'quantifier'],
    ];
    expect(pack.words.map(w => [w.han, w.ipa, w.english])).toEqual(cells);
    expect(pack.words.filter(w => w.learningKind === 'word')).toHaveLength(8);
    expect(pack.words.filter(w => w.learningKind === 'character-reading').map(w => w.han)).toEqual(['第', '粒']);
    expect(ledger.held.map(w => w.han)).toEqual(['芭', '把', '八', '敌']);
    for (const held of ledger.held) expect(pack.words.some(w => w.han === held.han)).toBe(false);
  });
  it('retains above and below phonation marks and all four contour targets through the shared converter', () => {
    for (const word of pack.words) {
      const spelling = convertIpa(word.ipa, word.toneNotation).map(syllable => syllable.spelling).join(' ');
      expect(spelling.length).toBeGreaterThan(0);
      if (word.ipa.includes('̈')) expect(spelling.normalize('NFD')).toContain('̈');
      if (word.ipa.includes('̤')) expect(spelling.normalize('NFD')).toContain('̤');
      const record = ledger.records.find(r => r.id === word.id)!;
      expect(spelling).toContain(record.rawIPA.match(/[1-5]+$/u)![0]);
      expect(word.ipa).toBe(record.ipa);
      expect(word.registerLabel).toContain('town and collection date unspecified');
      expect(word.toneNotation).toBe('pitch-contour');
    }
    expect(convertIpa('[p̈a̤²¹⁴³]', 'pitch-contour')[0].spelling.normalize('NFD')).toBe('p̈a̤2143');
  });
  it('keeps study, classification, geography, culture and reuse evidence separate', () => {
    expect(pack.branchId).toBe('xiang/yongquan');
    expect(atlasQiyangLocalities[0]).toMatchObject({ id: 'qiyang-study', groupId: 'xiang', branchId: 'yongquan', clusterId: 'dongqi', coordinates: [111.84812, 26.58949] });
    expect(atlasQiyangLocalities[0].scope).toContain('does not name their towns or recording date');
    expect(atlasQiyangLocalities[0].geographySource?.url).toBe('https://www.wikidata.org/wiki/Q1199641');
    expect(pack.soundNotes).toHaveLength(2);
    expect(pack.culture).toHaveLength(2);
    expect(pack.resources).toHaveLength(4);
    for (const item of [...pack.soundNotes, ...pack.culture, ...pack.resources]) expect(item.localityIds).toEqual(['qiyang-study']);
    expect(ledger.source.openLicense).toBeNull();
    expect(pack.resources[0].description).toContain('Copyright 2008 ISCA');
    expect(pack.culture[0].text).toContain('theatrical register');
    expect(pack.culture[1].text).toContain('not a documented recording site');
  });
});
