import { expect, it } from 'vitest';
import { getLocalLearning, spellingFor } from './learning';
import { findLearningPlace } from './learning/places';

it('keeps four attested Canton and Hong Kong vowel contrasts distinct without changing source IPA', () => {
  const pairs = [
    ['guangzhou', 'guangzhou-ding-three', 'sam55', 'sam55', 'guangzhou-ding-heart', 'sɐm55', 'săm55'],
    ['guangzhou', 'guangzhou-ding-hill', 'san55', 'san55', 'guangzhou-ding-new', 'sɐn55', 'săn55'],
    ['hong-kong', 'hong-kong-ipa-waste', 'sai˥', 'sai5', 'hong-kong-ipa-west', 'sɐi˥', 'săi5'],
    ['hong-kong', 'hong-kong-ipa-basket', 'sau˥', 'sau5', 'hong-kong-ipa-receive', 'sɐu˥', 'său5'],
  ] as const;
  for (const [placeId, leftId, leftIpa, leftSpelling, rightId, rightIpa, rightSpelling] of pairs) {
    const words = getLocalLearning(findLearningPlace(placeId)!).words;
    const left = words.find(word => word.id === leftId)!;
    const right = words.find(word => word.id === rightId)!;
    expect(left, leftId).toBeDefined();
    expect(right, rightId).toBeDefined();
    expect(spellingFor(left), leftId).toBe(leftSpelling);
    expect(spellingFor(right), rightId).toBe(rightSpelling);
    expect(spellingFor(left)).not.toBe(spellingFor(right));
    expect(left.ipa).toBe(leftIpa);
    expect(right.ipa).toBe(rightIpa);
    expect(left.toneNotation).toBe('pitch-contour');
    expect(right.toneNotation).toBe('pitch-contour');
  }
});
