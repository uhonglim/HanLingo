import { describe, expect, it } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import type { AttestedWord } from './types';
import { branchLearning, searchWords, spellingFor } from './index';
import { LearningWord } from '../../components/BranchLearning';
import { localWordCanDistract, practiceSelection } from './practice';
import { makeQuiz } from '../xiamen-romanization';

// Synthetic forms test the missing-writing contract; these are not lesson data.
const examples: AttestedWord[] = ['pa', 'mi', 'ku', 'te'].map((ipa, index) => ({
  id: `fixture-${index}`, han: null, writingStatus: 'not-supplied', learningKind: 'word',
  english: `fixture meaning ${index}`, ipa: `[${ipa}]`, toneNotation: 'unspecified',
  localityId: 'fixture', reading: 'Synthetic protocol fixture; no supplied tones.',
  source: { title: 'Test fixture', url: 'https://example.org/fixture' },
}));

describe('attested pronunciation without a supplied written form', () => {
  it('shows meaning and exact pronunciation without an invented character or empty heading', () => {
    const html = renderToStaticMarkup(<LearningWord word={examples[0]} />);
    expect(html).toContain('fixture meaning 0</h3>');
    expect(html).toContain('Source does not supply a complete written form.');
    expect(html).toContain('[pa]');
    expect(html).not.toContain('>null<');
    expect(html).not.toContain('lang="zh-Hant"');
    expect(searchWords(examples, 'fixture meaning 0')).toEqual([examples[0]]);
    expect(searchWords(examples, spellingFor(examples[0])!)).toEqual([examples[0]]);
  });
  it('allows distinct oral forms in a meaning quiz but excludes another sense of the same sound', () => {
    expect(practiceSelection(examples)?.mode).toBe('meaning');
    expect(localWordCanDistract(examples[0], examples[1])).toBe(true);
    expect(localWordCanDistract(examples[0], {...examples[1], ipa: examples[0].ipa})).toBe(false);
    for (const question of makeQuiz(examples, 4, () => 0.5, localWordCanDistract)) {
      expect(question.options).toHaveLength(4);
      expect(new Set(question.options.map(word => word.ipa)).size).toBe(4);
    }
  });
  it('requires explicit missing-writing metadata on published records', () => {
    for (const word of branchLearning.flatMap(pack => pack.words)) {
      if (word.han === null) {
        expect(word.writingStatus, word.id).toBe('not-supplied');
        expect(word.learningKind, word.id).toBe('word');
      } else expect(word.han.trim(), word.id).not.toBe('');
    }
  });
});
