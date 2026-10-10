import { describe, expect, it } from 'vitest';
import { writtenCharacterGloss } from './character-gloss';
import { branchLearning, searchWords } from './learning';
import { meaningPracticeWords } from './learning/practice';

const words = branchLearning.flatMap(pack => pack.words);
describe('separately sourced written-character senses', () => {
  it('lets English readers find character readings without turning them into vocabulary quizzes', () => {
    const purpleReadings = words.filter(word => word.han === '紫' && word.learningKind === 'character-reading');
    expect(purpleReadings.length).toBeGreaterThan(0);
    expect(searchWords(purpleReadings, 'purple')).toEqual(purpleReadings);
    expect(meaningPracticeWords(purpleReadings)).toEqual([]);
    expect(purpleReadings.every(word => word.english === 'Character 紫')).toBe(true);
  });
  it('never replaces an explicitly attested local sense with the generic dictionary sense', () => {
    const grandmother = words.find(word => word.id === 'huang1993-chengguan-5976')!;
    expect(grandmother).toBeDefined();
    expect(grandmother.english).toContain('grandmother');
    expect(writtenCharacterGloss(grandmother)).toBeUndefined();
    expect(meaningPracticeWords([grandmother])).toEqual([grandmother]);
  });
  it('holds definitions that conflict with a documented reading context', () => {
    for (const han of ['差', '好', '嚼', '著']) {
      expect(writtenCharacterGloss({ han, learningKind: 'character-reading' })).toBeUndefined();
    }
  });
});
