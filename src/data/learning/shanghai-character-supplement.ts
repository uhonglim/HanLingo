import type { BranchLearning } from './types';

/** Former comparison-only records retained as character readings, not local word definitions. */
export const shanghaiCharacterSupplement: BranchLearning[] = [{
  branchId: 'wu/taihu',
  words: [
    { id: 'tea-shanghai-cuhk', han: '茶', ipa: '[zo13]' },
    { id: 'fish-shanghai-cuhk', han: '魚', ipa: '[ɦŋ̍13]' },
  ].map(word => ({
    ...word, localityId: 'shanghai', english: `Character ${word.han}`,
    learningKind: 'character-reading', toneNotation: 'pitch-contour',
    reading: 'CUHK Shanghai character-reading reference',
    registerLabel: 'Shanghai · CUHK dictionary character reading',
    note: 'The dictionary reference is separate from the Huangpu speaker in other Shanghai lessons. This character reading does not establish a standalone local word or compound tones.',
    source: {
      title: `CUHK Chinese Character Database · ${word.han} · Shanghai`,
      url: `https://humanum.arts.cuhk.edu.hk/Lexis/lexi-mf/dialect.php?word=${encodeURIComponent(word.han)}`,
    },
  })),
  soundNotes: [], culture: [], resources: [],
}];
