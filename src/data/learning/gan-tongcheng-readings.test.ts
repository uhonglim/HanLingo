import { describe, expect, it } from 'vitest';
import { ganTongchengReadings } from './gan-tongcheng-readings';
import { meaningPracticeWords, practiceSelection, practiceSpelling } from './practice';
import { findAtlasLocality } from '../atlas';
import ledger from '../../../docs/gan-tongcheng-readings-provenance.json';

const words = ganTongchengReadings.flatMap(pack => pack.words);
describe('Tongcheng named-town character readings', () => {
  it('preserves two separate exact table rows without correcting ambiguous Magang', () => {
    const expected = {
      'gan-tongcheng-juanshui': ['tanʔ55', 'danʔ35', 'danʔ35', 'lanʔ55', 'ynʔ55', 'tɕiɛʔ55', 'ʑiɛʔ35', 'tseʔ55', 'zeʔ35', 'ȵiɛʔ55'],
      'gan-tongcheng-shinan': ['taiʔ55', 'daiʔ35', 'daiʔ35', 'laiʔ55', 'ynʔ55', 'tɕiɛnʔ55', 'ʑiɛnʔ35', 'tseʔ55', 'zeʔ35', 'ȵiɛnʔ55'],
    };
    expect(words).toHaveLength(20);
    for (const [id, forms] of Object.entries(expected)) {
      const local = words.filter(word => word.localityId === id);
      expect(local.map(word => word.han).join('')).toBe('答塔达腊入节切则贼聂');
      expect(local.map(word => word.ipa)).toEqual(forms.map(form => `[${form}]`));
      expect(findAtlasLocality(id)?.branchId).toBe('datong');
      expect(meaningPracticeWords(local)).toEqual([]);
      expect(practiceSelection(local)?.mode).toBe('spelling');
      expect(local.every(word => practiceSpelling(word))).toBe(true);
    }
    expect(ledger.holds[0].sourcePlace).toBe('马港');
    expect(words.some(word => word.localityId.includes('magang'))).toBe(false);
  });
  it('keeps the town difference and source limitations visible in teaching material', () => {
    expect(practiceSpelling(words.find(word => word.localityId.endsWith('juanshui') && word.han === '节')!)).not.toBe(practiceSpelling(words.find(word => word.localityId.endsWith('shinan') && word.han === '节')!));
    for (const word of words) {
      expect(word.registerLabel).toContain('collection date unspecified');
      expect(word.note).toContain('not a local lexical definition');
    }
    for (const id of ['gan-tongcheng-juanshui', 'gan-tongcheng-shinan']) {
      expect(ganTongchengReadings[0].soundNotes.filter(note => note.localityIds.includes(id))).toHaveLength(2);
      expect(ganTongchengReadings[0].culture.filter(topic => topic.localityIds.includes(id))).toHaveLength(2);
      expect(ganTongchengReadings[0].resources.filter(link => link.localityIds.includes(id))).toHaveLength(3);
    }
  });
});
