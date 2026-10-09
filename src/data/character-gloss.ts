import glosses from './character-glosses.json';
import type { AttestedWord } from './learning/types';

/** General written-character senses never replace an attested local lexical meaning. */
export function writtenCharacterGloss(word: Pick<AttestedWord, 'han' | 'learningKind'>): string | undefined {
  if (word.learningKind !== 'character-reading') return undefined;
  return (glosses as Record<string, string>)[word.han];
}

export const characterGlossSource = {
  title: 'Unicode Unihan 17.0 · kDefinition · written-character senses',
  url: 'https://www.unicode.org/reports/tr38/#kDefinition',
  licenseUrl: '/licenses/UNICODE-3.0.txt',
};
