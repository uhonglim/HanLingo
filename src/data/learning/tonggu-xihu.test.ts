import { describe, expect, it } from 'vitest';
import { tongguXihuLearning } from './tonggu-xihu';
import { convertIpa } from '../romanization-method';
import ledger from '../../../docs/tonggu-xihu-provenance.json';

const pack = tongguXihuLearning[0];
describe('Tonggu Xihu 2016 reviewed glossary selection', () => {
  it('preserves the twenty exact source joins and does not invent written forms', () => {
    expect(pack.words.map(w => [w.han, w.ipa, w.english])).toEqual([
      ['佢', '[tɕi¹¹³]', 'he / third-person pronoun'], ['徛', '[tɕʰi²⁴]', 'stand'],
      ['係', '[hi⁴⁴]', 'be / copula'], ['跍', '[ku²⁴]', 'squat'],
      [null, '[sa²⁴]', 'open; spread open'], [null, '[mia²⁴]', 'touch; feel with the hand'],
      [null, '[sia⁴⁴]', 'wither / gradually go out'], [null, '[ke³¹]', 'hide something'],
      [null, '[ke³¹]', 'aphid'], [null, '[lie³¹]', 'lick'],
      [null, '[tsie²⁴]', 'prick; pierce; squeeze'], ['捼', '[no¹¹³]', 'rub; knead'],
      [null, '[no¹¹³]', 'step on'], ['屙', '[o²⁴]', 'defecate or urinate'],
      ['嗰', '[kai³¹]', 'that'], ['荷', '[kʰai²⁴]', 'carry a load'],
      ['覒', '[mau⁴⁴]', 'look'], [null, '[tsau²⁴]', 'dry; not wet'],
      [null, '[piau²⁴]', 'jump'], ['嫽', '[liau⁴⁴]', 'play'],
    ]);
    expect(pack.words.filter(w => w.han === null)).toHaveLength(10);
    for (const word of pack.words) {
      expect(word.learningKind).toBe('word');
      expect(word.writingStatus).toBe(word.han === null ? 'not-supplied' : 'attested');
    }
    expect(pack.words.some(w => w.han === '撩')).toBe(false);
    expect(ledger.records.find(w => w.id.endsWith('-play'))?.note).toContain('separate 撩');
  });
  it('preserves printed conventional pitch rather than substituting acoustic measurements', () => {
    const pitchSuperscripts: Record<string, string> = { '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵' };
    for (const word of pack.words) {
      const source = ledger.records.find(r => r.id === word.id)!;
      const suffix = [...source.sourceConventionalPitch].map(d => pitchSuperscripts[d]).join('');
      expect(word.ipa).toBe(`[${source.sourceOnset === 'Ø' ? '' : source.sourceOnset}${source.sourceRhyme}${suffix}]`);
      expect(word.toneNotation).toBe('pitch-contour');
      const spelling = convertIpa(word.ipa, word.toneNotation).map(s => s.spelling).join(' ');
      expect(spelling).toContain(source.sourceConventionalPitch);
      expect(spelling).not.toContain('?');
      expect(word.note).toContain('conventional citation pitches');
    }
    expect(convertIpa('[tɕʰi²⁴]', 'pitch-contour')[0].spelling).toBe('chhi24');
    expect(pack.words.filter(w => w.ipa === '[ke³¹]').map(w => w.english)).toEqual(['hide something', 'aphid']);
    expect(pack.words.filter(w => w.ipa === '[no¹¹³]').map(w => w.english)).toEqual(['rub; knead', 'step on']);
  });
  it('keeps village speaker scope, exact cultural places and source permission visible', () => {
    expect(pack.branchId).toBe('hakka/tonggui');
    for (const word of pack.words) {
      expect(word.localityId).toBe('tonggu-xihu');
      expect(word.registerLabel).toContain('one Gan–Hakka bilingual consultant');
      expect(word.registerLabel).toContain('July 2016');
    }
    expect(pack.soundNotes).toHaveLength(2);
    expect(pack.culture).toHaveLength(2);
    expect(pack.resources).toHaveLength(3);
    for (const item of [...pack.soundNotes, ...pack.culture, ...pack.resources]) expect(item.localityIds).toEqual(['tonggu-xihu']);
    expect(pack.culture[1].text).toContain('distinct from Guancang');
    expect(ledger.source.licenseUrl).toBe('https://creativecommons.org/licenses/by/4.0/');
    expect(pack.resources[0].description).toContain('no playable recording');
  });
});
