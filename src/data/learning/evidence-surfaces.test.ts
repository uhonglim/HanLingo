import { meaningPracticeWords, practiceSelection } from "./practice";
import { describe, expect, it } from 'vitest';
import { availableSections, getLocalLearning, spellingFor } from './index';
import { learningPlaces } from './places';
import { ganToneInventories } from './gan-tone-inventories';
import { xiangComparativeLearning } from './xiang-comparative';

describe('distinct learning evidence surfaces', () => {
  it('opens source tone charts without inventing vocabulary or practice', () => {
    for (const inventory of ganToneInventories) {
      const place = learningPlaces.find(place => place.id === inventory.localityId)!;
      expect(place).toBeDefined();
      const data = getLocalLearning(place);
      expect(data.toneInventories).toContain(inventory);
      expect(availableSections(place)).toContain('sounds');
      if (['gan-tongcheng-juanshui', 'gan-tongcheng-shinan'].includes(place.id)) {
        // These towns now have separately transcribed Table16 syllables.
        // The other inventories still cannot manufacture words from tone categories.
        expect(data.words).toHaveLength(10);
        expect(data.words.every(word => word.id.startsWith('zhang-wang2022-t16-'))).toBe(true);
        expect(meaningPracticeWords(data.words)).toEqual([]);
        expect(practiceSelection(data.words)?.mode).toBe('spelling');
        expect(availableSections(place)).toContain('words');
        expect(availableSections(place)).toContain('practice');
      } else {
        expect(data.words).toHaveLength(0);
        expect(availableSections(place)).not.toContain('practice');
        expect(availableSections(place)).not.toContain('words');
      }
    }
  });
  it('keeps source-category character readings out of meaning quizzes', () => {
    const words = xiangComparativeLearning.flatMap(pack => pack.words);
    for (const id of new Set(words.map(word => word.localityId))) {
      const place = learningPlaces.find(place => place.id === id)!;
      expect(availableSections(place)).toContain('words');
      expect(availableSections(place)).toContain('sounds');
      expect(availableSections(place)).toContain('practice');
      expect(meaningPracticeWords(getLocalLearning(place).words)).toEqual([]);
      expect(practiceSelection(getLocalLearning(place).words)?.mode).toBe('spelling');
    }
    for (const word of words) {
      expect(spellingFor(word)).toMatch(/·T[1-8]/);
      expect(word.toneNotation).toBe('source-category');
    }
  });
});
