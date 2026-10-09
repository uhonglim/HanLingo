import { describe, expect, it } from 'vitest';
import { minLearning } from './min';
import { meaningPracticeWords } from './practice';
import { getLocalLearning } from './index';
import { learningPlaces } from './places';

describe('Original Min character-reference scope', () => {
  const words = minLearning.flatMap(pack => pack.words);
  it('keeps dictionary and comparative character readings out of meaning practice', () => {
    expect(words).toHaveLength(167);
    expect(meaningPracticeWords(words)).toEqual([]);
    for (const [locality, count] of [['fuzhou', 58], ['jianou', 60], ['putian', 29], ['yongan', 20]] as const) {
      const local = words.filter(word => word.localityId === locality);
      expect(local).toHaveLength(count);
      for (const word of local) {
        expect(word.id).toBe(`${locality}-${word.han}`);
        expect(word.english).toBe(`Character ${word.han}`);
        expect(word.learningKind).toBe('character-reading');
        expect(word.registerLabel).toContain('character reading');
      }
    }
    expect(words.find(word => word.id === 'putian-蛇')?.ipa).toBe('[ɬyɒ˩˧]');
    expect(words.find(word => word.id === 'yongan-奶')?.ipa).toBe('[la˨˩]');
  });

  it('preserves the separately sourced Foochow lexical collection', () => {
    const point = learningPlaces.find(place => place.id === 'fuzhou')!;
    const lexical = getLocalLearning(point).words.filter(word => word.id.startsWith('beida1964-'));
    expect(lexical).toHaveLength(199); // One conflicting gold reading is held for primary-source review.
    expect(meaningPracticeWords(lexical)).toEqual(lexical);
    expect(lexical.find(word => word.han === '米')?.english).toBe('rice');
  });
});
