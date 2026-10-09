import { describe, expect, it } from 'vitest';
import { mapPoints } from '../languages';
import { getLocalLearning, spellingFor } from '../learning';

const readings = (id: string) => getLocalLearning(mapPoints.find((point) => point.id === id)!).words;

describe('new regional pronunciation evidence', () => {
  it('uses Wenchang’s explicit pitch values rather than its table’s category IDs', () => {
    const words = readings('wenchang');
    for (const [han, ipa] of [['诗', '[ti34]'], ['时', '[ti33]'], ['四', '[ti21]'], ['节', '[tat5]'], ['达', '[ɗat3]']]) {
      const word = words.find((entry) => entry.han === han)!;
      expect(word.ipa).toBe(ipa);
      expect(word.toneNotation).toBe('pitch-contour');
      expect(word.registerLabel).toBe('Recorded Wenchang speakers');
    }
  });
  it('preserves Wenchang’s implosives without silently inventing shared spellings', () => {
    const words = readings('wenchang');
    expect(spellingFor(words.find((word) => word.han === '马')!)).toBe('be31');
    const disease = words.find((word) => word.han === '病')!;
    expect(disease.ipa).toBe('[ɓe34]');
    expect(spellingFor(disease)).toBeUndefined();
  });
  it('keeps Lanzhou’s source examples visibly toneless', () => {
    const words = readings('lanzhou');
    expect(words.length).toBeGreaterThan(0);
    for (const word of words) {
      expect(word.registerLabel).toMatch(/tones omitted/i);
      expect(word.ipa).not.toMatch(/[1-5¹²³⁴⁵˩˨˧˦˥]/u);
      expect(spellingFor(word)).toBeUndefined();
    }
  });
});
