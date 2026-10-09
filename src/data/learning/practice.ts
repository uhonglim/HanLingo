import type { AttestedWord } from './types';
import { wordMeaning } from '../word-meaning';

const comparable = (value: string) => value.normalize('NFC').replace(/[\s\[\]]/g, '');

export const meaningPracticeWords = (words: AttestedWord[]) =>
  words.filter(word => word.learningKind !== 'character-reading');

/** A form with multiple attested senses must never make its other sense a wrong answer. */
export function localWordCanDistract(answer: AttestedWord, candidate: AttestedWord) {
  return wordMeaning(answer.english) !== wordMeaning(candidate.english)
    && comparable(answer.han) !== comparable(candidate.han)
    && comparable(answer.ipa) !== comparable(candidate.ipa);
}
