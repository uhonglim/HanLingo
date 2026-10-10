import { describe, expect, it } from 'vitest';
import { otherSiniticLearning } from './other-sinitic';
import { atlasOtherSiniticLocalities } from '../atlas/other-sinitic';
import { convertIpa } from '../romanization-method';

const words = otherSiniticLearning.flatMap(pack => pack.words);
describe('reviewed Liu local references', () => {
  it('holds unresolved written forms instead of silently correcting them', () => {
    for (const id of ['Jixi-39_give-1', 'Jixi-185_stand-1', 'Taiyuan-100_throw-1', 'Taiyuan-67_near-1', 'Jixi-67_near-1']) {
      expect(words.some(word => word.id === `liu2007-${id}`)).toBe(false);
    }
    expect(words.some(word => word.han?.includes('囗'))).toBe(false);
  });
  it('retains scope and complete supported source transcription', () => {
    expect(words).toHaveLength(421);
    expect(new Set(words.map(word => word.id)).size).toBe(words.length);
    for (const word of words) {
      expect(atlasOtherSiniticLocalities.some(place => place.id === word.localityId)).toBe(true);
      expect(word.registerLabel).toContain('collection date unspecified');
      expect(word.source.url).toMatch(/54f6742d9fa60315ae41b91d0d1e02f04036efb5\/cldf\/forms.csv#L\d+$/);
      expect(convertIpa(word.ipa, word.toneNotation).every(item => item.spelling.length > 0)).toBe(true);
    }
    for (const word of words.filter(word => word.localityId === 'guilin-pinghua')) {
      expect(word.registerLabel).toContain('Pinghua reference in Liu 2007');
    }
    expect(words.some(word => word.localityId === 'jiangyong-baishui')).toBe(false);
  });
});
