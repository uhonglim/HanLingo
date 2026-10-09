import { describe, expect, it } from 'vitest';
import { meaningPracticeWords, localWordCanDistract } from './practice';
import { ganXiangLearning } from './gan-xiang';
import { xiangComparativeLearning } from './xiang-comparative';
import { makeQuiz } from '../xiamen-romanization';

describe('local word practice', () => {
  it('does not quiz source character identifications as lexical meanings', () => {
    const characters = xiangComparativeLearning.flatMap(pack => pack.words);
    expect(characters.length).toBeGreaterThan(200);
    expect(meaningPracticeWords(characters)).toEqual([]);
  });
  it('does not mark another attested sense of 吃 wrong in Nanchang', () => {
    const words = ganXiangLearning.flatMap(pack => pack.words).filter(word => word.localityId === 'nanchang-gan');
    const eat = words.find(word => word.english === 'eat')!;
    const drink = words.find(word => word.english === 'drink')!;
    expect(eat).toBeDefined();
    expect(drink.ipa).toBe(eat.ipa);
    expect(localWordCanDistract(eat, drink)).toBe(false);
    for (const question of makeQuiz(words, words.length, () => 0.5, localWordCanDistract)) {
      for (const option of question.options.filter(word => word.id !== question.answer.id)) {
        expect(option.han).not.toBe(question.answer.han);
        expect(option.ipa).not.toBe(question.answer.ipa);
      }
    }
  });
});
