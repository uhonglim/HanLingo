import type { AttestedWord } from './types';
import { wordMeaning } from '../word-meaning';
import { convertIpa } from '../romanization-method';

const comparable = (value: string) => value.normalize('NFC').replace(/[\s\[\]]/g, '');

export const meaningPracticeWords = (words: AttestedWord[]) =>
  words.filter(word => word.learningKind !== 'character-reading');

export function practiceSpelling(word: AttestedWord): string | undefined {
  try {
    return convertIpa(word.ipa, word.toneNotation ?? 'unspecified').map(item => item.spelling).join(' ') || undefined;
  } catch { return undefined; }
}

/** Meaning quizzes require lexical evidence; a reading collection can teach the shared spelling key. */
export function practiceSelection(words: AttestedWord[]): { mode: 'meaning' | 'spelling'; words: AttestedWord[] } | undefined {
  const lexical = [...new Map(meaningPracticeWords(words).map(word => [word.english, word])).values()];
  if (lexical.length >= 4) return { mode: 'meaning', words: lexical };
  const readings = [...new Map(words.filter(word => practiceSpelling(word)).map(word => [practiceSpelling(word), word])).values()];
  if (readings.length >= 4) return { mode: 'spelling', words: readings };
  return undefined;
}

/** A form with multiple attested senses must never make its other sense a wrong answer. */
export function localWordCanDistract(answer: AttestedWord, candidate: AttestedWord) {
  return wordMeaning(answer.english) !== wordMeaning(candidate.english)
    && comparable(answer.han) !== comparable(candidate.han)
    && comparable(answer.ipa) !== comparable(candidate.ipa);
}
