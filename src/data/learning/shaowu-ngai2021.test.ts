import { describe, expect, it } from 'vitest';
import { shaowuNgai2021Learning } from './shaowu-ngai2021';
import { localWordCanDistract, meaningPracticeWords, practiceSelection, practiceSpelling } from './practice';
import ledger from '../../../docs/shaowu-ngai2021-provenance.json';

const pack = shaowuNgai2021Learning[0];
describe('Urban Shaowu lexical starter from Ngai 2021', () => {
  it('preserves independently reviewed lexical forms and compound tones', () => {
    expect(pack.words.map(word => word.han)).toEqual(['剪', '梳', '牛嫲', '牛公', '囝', '跤', '颂', '鼎', '厝', '得', '帮', '拿', '了', '来', '去', '度', '让', '叫', '行', '徛']);
    expect(pack.words.map(word => word.ipa)).toEqual(['[tsien55]', '[su21]', '[ny22 ma22]', '[ny22 kuŋ22]', '[kin53]', '[kʰau21]', '[siuŋ35]', '[tiaŋ55]', '[tɕʰiɔ213]', '[tie53]', '[pɔŋ21]', '[na22]', '[liau55]', '[li22]', '[kʰɔ213]', '[tʰɔ35]', '[niɔŋ213]', '[kiau213]', '[xaŋ22]', '[kʰi55]']);
    expect(pack.words.find(word => word.han === '牛公')?.note).toContain('standalone 公');
    expect(pack.words.find(word => word.han === '跤')?.note).toContain('earlier study');
  });
  it('uses the source pitch key and shared spelling, never a copied neighbouring reading', () => {
    for (const word of pack.words) {
      expect(word.localityId).toBe('shaowu');
      expect(word.toneNotation).toBe('pitch-contour');
      expect(word.registerLabel).toContain('Urban Shaowu');
      expect(word.registerLabel).toContain('2009–2019');
      expect(word.note).toContain('no individual speaker or recording date');
      expect(practiceSpelling(word)).toBeTruthy();
      expect(practiceSpelling(word)).not.toContain('·T');
    }
    expect(practiceSpelling(pack.words[2])).toBe('nü22 ma22');
    expect(practiceSpelling(pack.words[3])).toBe('nü22 kung22');
    expect(practiceSpelling(pack.words[5])).toBe('khau21');
    expect(practiceSpelling(pack.words[19])).toBe('khi55');
  });
  it('keeps multifunctional 得 visible but out of both meaning prompts and distractors', () => {
    const polyfunctional = pack.words.find(word => word.han === '得')!;
    expect(polyfunctional.meaningPracticeExclude).toBe(true);
    expect(meaningPracticeWords(pack.words)).toHaveLength(19);
    expect(practiceSelection(pack.words)?.mode).toBe('meaning');
    expect(localWordCanDistract(polyfunctional, pack.words[0])).toBe(false);
    expect(localWordCanDistract(pack.words[0], polyfunctional)).toBe(false);
    expect(practiceSpelling(polyfunctional)).toBe('tie53');
    for (const han of ['帮', '拿', '了', '度']) expect(pack.words.find(word => word.han === han)?.note).toContain('lexical');
  });
  it('keeps rights, cultural context and missing media honest', () => {
    expect(pack.branchId).toBe('min/shaojiang');
    expect(pack.soundNotes).toHaveLength(3);
    expect(pack.culture).toHaveLength(2);
    expect(pack.resources).toHaveLength(4);
    for (const item of [...pack.soundNotes, ...pack.culture, ...pack.resources]) expect(item.localityIds).toEqual(['shaowu']);
    expect(pack.culture.every(item => !item.photo)).toBe(true);
    expect(ledger.source.rights).toContain('Copyright retained');
    expect(pack.resources.some(item => item.kind === 'Recordings')).toBe(false);
  });
});
