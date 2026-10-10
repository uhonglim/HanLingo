import { describe, expect, it } from 'vitest';
import { yingtanGanLearning } from './yingtan-gan';
import { convertIpa } from '../romanization-method';
import ledger from '../../../docs/yingtan-gan-provenance.json';

const pack = yingtanGanLearning[0];
describe('Yuehu Yingtan source-specific productions', () => {
  it('preserves the bounded eighteen source cells and keeps surname and absent writing distinct', () => {
    expect(pack.words.map(w => [w.han, w.ipa, w.english])).toEqual([
      ['和', '[xo²⁴]', 'peace'], ['瞎', '[xaʔ⁵]', 'blind'], ['鞋', '[xai²⁴]', 'shoe'],
      ['好', '[xau³⁴¹]', 'nice'], ['河', '[χo²⁴]', 'river'], ['你', '[ni²⁴]', 'second-person singular pronoun'],
      ['班', '[pan²²]', 'class'], ['搬', '[poŋ²²]', 'to lift'], ['完', '[βoŋ²⁴]', 'finished'],
      ['棍', '[kyn⁴²]', 'stick'], ['边', '[pien²²]', 'the edge'], ['奔', '[pən²²]', 'to run'],
      ['宾', '[pin²²]', 'the guest'], ['用', '[joŋ⁴²]', 'to use'], ['东', '[toŋ²²]', 'east'],
      [null, '[kie⁴²]', 'to saw'], [null, '[kʰie⁴²]', 'to go to'], ['王', '[βɑŋ²⁴]', 'surname Wang'],
    ]);
    expect(pack.words.filter(w => w.learningKind === 'word')).toHaveLength(17);
    expect(pack.words.filter(w => w.learningKind === 'character-reading').map(w => w.han)).toEqual(['王']);
    for (const word of pack.words.filter(w => w.han === null)) expect(word.writingStatus).toBe('not-supplied');
    for (const han of ['帮', '憨', '五', '秧', '弯', '呣']) expect(pack.words.some(w => w.han === han)).toBe(false);
    expect(ledger.held.find(w => w.han === '帮')?.rawIPA).toEqual(['pɑŋ22', 'pɔŋ22']);
  });
  it('keeps literal repetition differences, empty cells and supplied surface pitch', () => {
    const repetitions = (han: string) => ledger.records.find(w => w.han === han)!.sourceRepetitions;
    expect(repetitions('和')).toEqual(['xo24', 'χo24', 'χo24']);
    expect(repetitions('鞋')).toEqual(['xai24', 'xai24', 'xai213']);
    expect(repetitions('好')).toEqual(['xau341', 'xau341', 'xau34']);
    expect(repetitions('棍')).toEqual(['kyn42', 'kyn42', 'kʰyn42']);
    expect(repetitions('河')).toEqual(['χo24', null, null]);
    for (const word of pack.words) {
      const source = ledger.records.find(r => r.id === word.id)!;
      expect(source.sourceRepetitions[0]).toBe(source.rawIPA);
      expect(word.toneNotation).toBe('pitch-contour');
      const spelling = convertIpa(word.ipa, word.toneNotation).map(s => s.spelling).join(' ');
      expect(spelling).toContain(source.rawIPA.match(/[1-5]+$/u)![0]);
      expect(spelling).not.toContain('?');
    }
    expect(convertIpa('[kyn⁴²]', 'pitch-contour')[0].spelling).toBe('kün42');
    expect(pack.words.find(w => w.han === '用')?.note).toContain('too use');
  });
  it('keeps one-speaker scope, dated culture and noncommercial source terms visible', () => {
    expect(pack.branchId).toBe('gan/yingyi');
    for (const word of pack.words) {
      expect(word.localityId).toBe('gan-county-360602');
      expect(word.registerLabel).toContain('one speaker');
      expect(word.registerLabel).toContain('recording date unspecified');
    }
    expect(pack.soundNotes).toHaveLength(2);
    expect(pack.culture).toHaveLength(2);
    expect(pack.resources).toHaveLength(3);
    for (const item of [...pack.soundNotes, ...pack.culture, ...pack.resources]) expect(item.localityIds).toEqual(['gan-county-360602']);
    expect(pack.culture[0].text).toContain('2023');
    expect(pack.culture[1].text).toContain('2015');
    expect(ledger.source.licenseUrl).toBe('https://creativecommons.org/licenses/by-nc/4.0/');
    expect(pack.resources[0].description).toContain('CC BY-NC 4.0');
  });
});
