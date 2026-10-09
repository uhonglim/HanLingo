import type { BranchLearning } from './types';

const localityIds = ['singapore-cantonese'];
const phonology = {
  title: 'Luo Futeng · The Cantonese dialect in Singapore · SCCC Culturepaedia',
  url: 'https://culturepaedia.singaporeccc.org.sg/language-education/the-cantonese-dialect-in-singapore/',
};

/** Five bounded character examples, not complete tonal readings or a vernacular transcript. */
export const singaporeCantoneseLearning: BranchLearning[] = [{
  branchId: 'yue/guangfu',
  words: [
    ['wei', '微', 'mei'], ['wen', '文', 'mɐn'], ['wang', '亡', 'mɔŋ'],
    ['jiao', '叫', 'kiu'], ['xiao', '晓', 'hiu'],
  ].map(([id, han, segments]) => ({
    id: `sccc-singapore-cantonese-${id}`, han, english: `Character ${han}`,
    ipa: `[${segments}]`, toneNotation: 'unspecified', localityId: 'singapore-cantonese',
    learningKind: 'character-reading', reading: 'Source segment example · tones not supplied',
    registerLabel: 'Singapore Cantonese · source omits tones, speakers and collection date',
    note: 'The overview supplies segments only. This is not a complete tonal pronunciation or a transcript of the New Year recording.',
    source: phonology,
  })),
  soundNotes: [
    { title: 'Nasal initials', text: 'The overview illustrates an initial m with 微, 文 and 亡. Its examples omit tone values.', localityIds, source: phonology },
    { title: 'Different places of articulation', text: 'The source gives a velar stop in 叫 and h in 晓. These character examples illustrate a contrast with Mandarin; they do not describe every Singapore speaker.', localityIds, source: phonology },
  ],
  culture: [
    {
      title: 'Pat Wo Wui Kun and Cantonese opera',
      text: 'Singapore’s Cantonese opera guild began as Liyuan Tang in 1857 and was registered as Pat Wo Wui Kun in 1890. Its history links professional performers with the city’s Cantonese community.',
      localityIds,
      source: { title: 'Lee Kok Leong · Cantonese clan associations in Singapore', url: 'https://culturepaedia.singaporeccc.org.sg/communities/dialect-group/the-cantonese-clan-associations-of-singapore/' },
    },
    {
      title: 'Kwong Wai Shiu Hospital',
      text: 'Cantonese leaders established the hospital in 1910. The National Museum’s account traces its charitable care and the widening of inpatient access to all communities in 1974.',
      localityIds,
      source: { title: 'National Museum of Singapore · Every Body Plays a Part', url: 'https://www.nhb.gov.sg/nationalmuseum/every-body-plays-a-part/exhibit-d.html' },
    },
  ],
  resources: [
    { title: 'Singapore Cantonese: phonology, words and grammar', description: 'Luo Futeng’s local overview. Phonetic examples are segment-only; tone values and survey speakers are not supplied.', localityIds, kind: 'Study', url: phonology.url },
    { title: 'Cantonese New Year greeting · SCCC 2021', description: 'Listen on the publisher’s page under Cantonese. Ng Rui Zhao performs a festive greeting; SCCC identifies its performers as children aged 7–11. No word-level IPA transcript is supplied.', localityIds, kind: 'Recordings', url: 'https://singaporeccc.org.sg/events/sccc-talking-red-packet-2021/' },
    { title: 'Cantonese associations and the city', description: 'Community history, opera, lion dance and mutual support. Association membership is not a phonetic classification.', localityIds, kind: 'Culture', url: 'https://culturepaedia.singaporeccc.org.sg/communities/dialect-group/the-cantonese-clan-associations-of-singapore/' },
    { title: 'Kwong Wai Shiu Hospital: museum history', description: 'The National Museum’s account of a local charitable institution.', localityIds, kind: 'Culture', url: 'https://www.nhb.gov.sg/nationalmuseum/every-body-plays-a-part/exhibit-d.html' },
  ],
}];
