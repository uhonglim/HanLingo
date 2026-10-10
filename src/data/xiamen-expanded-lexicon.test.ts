import { describe, expect, it } from 'vitest';
import { minSouthernExpanded } from './learning/min-southern-expanded';
import { xiamenWords } from './xiamen-lexicon';
import { xiamenCanDistract, xiamenLearningWords } from './xiamen-expanded-lexicon';
import { filterXiamenWords } from './xiamen-vocabulary';
import { romanizeXiamen, makeQuiz } from './xiamen-romanization';

const sourceWords = minSouthernExpanded.flatMap(pack => pack.words).filter(word => word.localityId === 'xiamen');
describe('Amoy expanded learning adapter', () => {
  it('keeps existing object identities and saved IDs while adding only Amoy evidence', () => {
    expect(sourceWords).toHaveLength(22);
    expect(xiamenLearningWords).toHaveLength(xiamenWords.length + sourceWords.length);
    xiamenWords.forEach((word, index) => expect(xiamenLearningWords[index]).toBe(word));
    expect(new Set(xiamenLearningWords.map(word => word.id)).size).toBe(xiamenLearningWords.length);
  });
  it('preserves exact source IPA, source pitch contours, provenance and dated qualifications', () => {
    for (const source of sourceWords) {
      const word = xiamenLearningWords.find(item => item.id === source.id)!;
      expect(word.ipa).toBe(source.ipa);
      expect(`[${word.segments.map((segment, i) => segment + word.tones[i]).join(' ')}]`).toBe(source.ipa);
      expect(word.sourceUrl).toBe(source.source.url);
      expect(word.sourceReading).toBe(source.ipa);
      expect(word.registerLabel).toBe('Amoy · 1998 study reference');
      expect(romanizeXiamen(word.segments, word.tones)).not.toContain('undefined');
      expect(filterXiamenWords('', 'All words', true, [source.id])).toEqual([word]);
    }
  });
  it('does not offer alternate readings of the same character or meaning as wrong answers', () => {
    const variants = xiamenLearningWords.filter(word => word.han === '橫');
    expect(variants).toHaveLength(2);
    expect(xiamenCanDistract(variants[0], variants[1])).toBe(false);
    const two = xiamenLearningWords.filter(word => ['兩', '二'].includes(word.han));
    for (const a of two) for (const b of two) expect(xiamenCanDistract(a, b)).toBe(false);
    const quiz = makeQuiz(xiamenLearningWords, xiamenLearningWords.length, () => 0.5, xiamenCanDistract);
    expect(new Set(quiz.map(item => item.answer.id))).toEqual(new Set(xiamenLearningWords.map(word => word.id)));
    for (const round of quiz) for (const option of round.options)
      if (option.id !== round.answer.id) expect(xiamenCanDistract(round.answer, option)).toBe(true);
  });
  it('finds new readings using simplified characters and HanLingo spelling', () => {
    expect(filterXiamenWords('软').map(word => word.han)).toEqual(['軟']);
    expect(filterXiamenWords('the21').map(word => word.han)).toEqual(['退']);
  });
});
