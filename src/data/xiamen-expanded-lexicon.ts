import { xiamenWords, type XiamenWord, type XiamenWordCategory } from './xiamen-lexicon';
import { minSouthernExpanded } from './learning/min-southern-expanded';
import { wordMeaning } from './word-meaning';

const categories: Record<string, XiamenWordCategory> = {
  '二': 'Numbers', '糜': 'Food & drink', '生': 'Food & drink',
  '妹': 'People & actions', '退': 'People & actions', '短': 'People & actions',
  '賣': 'People & actions', '血': 'People & actions', '關': 'People & actions',
  '病': 'People & actions', '反': 'People & actions', '毛': 'People & actions',
  '軟': 'People & actions',
};

/** Adapt only source-labelled Amoy readings; preserve the original collection and saved IDs. */
const additions: XiamenWord[] = minSouthernExpanded.flatMap(pack => pack.words)
  .filter(word => word.localityId === 'xiamen')
  .map(word => {
    if (!word.han) throw new Error(`Amoy character-card adapter requires an attested written form: ${word.id}`);
    if (word.toneNotation !== 'pitch-contour' || !/^\[.+\]$/u.test(word.ipa))
      throw new Error(`Amoy lesson requires explicitly supplied pitch: ${word.id}`);
    const syllables = word.ipa.slice(1, -1).split(/\s+/u).map(syllable => {
      const match = /^([^0-9]+)([1-5]{1,3})$/u.exec(syllable);
      if (!match) throw new Error(`Unresolved source syllable in ${word.id}: ${syllable}`);
      return { segments: match[1], tone: match[2] };
    });
    return {
      id: word.id, han: word.han, english: word.english, ipa: word.ipa,
      segments: syllables.map(syllable => syllable.segments),
      tones: syllables.map(syllable => syllable.tone),
      category: categories[word.han] ?? 'Around town',
      note: word.note ?? '', sourceUrl: word.source.url, sourceLabel: word.source.title,
      sourceReading: word.ipa, readingMode: 'Citation', registerLabel: word.registerLabel,
    };
  });

export const xiamenLearningWords: XiamenWord[] = [...xiamenWords, ...additions];

/** Alternate source readings of the same character/meaning must not be wrong quiz options. */
export function xiamenCanDistract(a: XiamenWord, b: XiamenWord): boolean {
  return a.han !== b.han && wordMeaning(a.english) !== wordMeaning(b.english)
    && ![a.id, b.id].every(id => id === 'two' || id === 'two-er');
}
