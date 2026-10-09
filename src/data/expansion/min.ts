import type { AtlasExpansion } from './types';
import type { AttestedWord } from '../learning/types';
import { wenchangPhotos } from './wenchang-photos';

const study = { title: 'Peng 2026: Wenchang Min Chinese · Illustration of the IPA', url: 'https://doi.org/10.1017/S002510032610111X' };
const pdf = 'https://www.cambridge.org/core/services/aop-cambridge-core/content/view/376F5C3FBC0DCF5D7A083AB823223D1C/S002510032610111Xa.pdf/wenchang-min-chinese.pdf';
const commons = (file: string) => `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(file)}`;
const street = { title: 'Wennan old street · credited location photograph', url: commons('Wenchang_City_old_area_-_06.JPG') };
const food = { title: 'Wenchang chicken · credited food photograph', url: commons('Wenchang_Chicken_1.JPG') };

// Visually checked against the original PDF, pp. 2–3 and 18. The text layer corrupts IPA and Han glyphs.
const consonantExamples: [string, string, string][] = [
  ['盒', 'box', 'ap3'], ['马', 'horse', 'be31'], ['病', 'disease', 'ɓe34'],
  ['麻', 'numb', 'ma33'], ['非', 'very', 'ɸui34'], ['书', 'book', 'tu34'],
  ['你', 'you', 'du31'], ['坐', 'to sit', 'tse42'], ['野', 'arrogant', 'dze31'],
  ['猪', 'pig', 'ɗu34'], ['南', 'south', 'nam33'], ['餐', 'meal', 'san34'],
  ['李', 'plum', 'li31'], ['棋', 'chess', 'ki33'], ['牙', 'tooth', 'ɡe33'],
  ['硬', 'hard', 'ŋe42'], ['投', 'to throw', 'hou33'], ['凶', 'fierce', 'ɦioŋ34'],
];
// The tone table supplies both category IDs and their pitch values. Only its explicit pitch-value column is used here.
const toneExamples: [string, string, string][] = [
  ['诗', 'poem', 'ti34'], ['时', 'time', 'ti33'], ['死', 'to die', 'ti31'],
  ['四', 'four', 'ti21'], ['是', 'yes', 'ti42'], ['蒂', 'base of a flower', 'ɗi52'],
  ['节', 'joint', 'tat5'], ['达', 'to reach', 'ɗat3'],
  ['医', 'doctor', 'i34'], ['红', 'red', 'aŋ33'], ['德', 'virtue', 'ɗek5'],
];
const words: AttestedWord[] = [...consonantExamples, ...toneExamples].map(([han, english, ipa], index) => ({
  id: `wenchang-peng-${index + 1}`, han, english, ipa: `[${ipa}]`, localityId: 'wenchang',
  toneNotation: 'pitch-contour', reading: 'Citation word-list reading · Peng 2026',
  registerLabel: 'Recorded Wenchang speakers',
  note: `Two Wenchang-raised university students supplied the recordings; the acoustic analysis chiefly uses the male speaker. ${index >= 18 && index < 26 ? 'Pitch values follow the explicit tone-value column on p. 18, not the superscript category numbers beside its sample words. ' : ''}${/[ptk][35]$/.test(ipa) ? 'The source underlines this pitch number to mark a checked syllable. Final stops are unreleased in isolation. ' : ''}Other studies report different tone values; these are the readings of this study.`,
  source: { title: `${study.title} · ${index < 18 ? 'pp. 2–3' : 'p. 18'}`, url: pdf + `#page=${index < 10 ? 2 : index < 18 ? 3 : 18}` },
}));

export const minExpansion: AtlasExpansion = {
  branches: [{
    id: 'hainan-min', groupId: 'min', name: 'Hainan Min', nativeName: '海南閩語', places: ['Wenchang'],
    description: 'Min varieties of Hainan, with Wenchang as the current phonetic reference.',
    article: {
      title: 'Hainan Min', dek: 'Explore Wenchang’s implosives, checked syllables, and local tone contrasts.',
      sections: [
        { heading: 'A Hainan reference', paragraphs: ['Hainan Min is a regional grouping within Min. Some broader classifications include it within Southern Min; this atlas gives it a separate regional branch so a Hainan locality is not folded into Tsuan-Chiang. The current learning material comes from Wenchang, in northeastern Hainan. Its readings do not establish a pronunciation for Haikou or for the whole island.'] },
        { heading: 'Begin with Wenchang', paragraphs: ['Peng’s phonetic study documents contrasts between ordinary voiced stops and implosives, as well as short syllables ending in stops. Its tone table supplies explicit pitch values alongside tone-category labels. Explore the recorded word-list examples first, then compare the local tone notes: older studies and different speech contexts do not always give the same result.'] },
      ], facts: [{ label: 'Reference locality', value: 'Wenchang' }, { label: 'Classification scope', value: 'A regional Min branch; included within Southern Min in some broader schemes' }],
      sources: [study], readingMinutes: 1,
    },
  }],
  places: [{
    point: { id: 'wenchang', name: 'Wenchang', nativeName: '文昌', groupId: 'min', subgroupId: 'hainan-min', coordinates: [110.754, 19.615], hierarchy: ['Sinitic', 'Min', 'Hainan Min', 'Wenchang'] },
    article: {
      title: 'Wenchang', dek: 'Min speech in northeastern Hainan, with a distinctive contrast between voiced stops and implosives.',
      sections: [
        { heading: 'Hear the difference', paragraphs: ['The word-list examples distinguish the ordinary voiced stop in 马 “horse” from the implosive in 病 “disease”. The contrast changes both consonant quality and timing. Wenchang also has a dental implosive, heard in 猪 “pig”. These sounds need their own IPA symbols; a familiar Mandarin spelling cannot preserve the distinction.'] },
        { heading: 'Whose pronunciation?', paragraphs: ['The 2026 study recorded two university students who grew up in Wenchang. Most acoustic measurements use the male speaker. Its citation tones are the basis of this word collection, while connected speech has separate patterns. The map locates Wenchang’s urban center; neither the map nor this small speaker sample defines a boundary or a single accent for every settlement in the municipality.'] },
        { heading: 'Streets and food', paragraphs: ['The gallery moves from the arcaded old streets and Confucian temple to a local restaurant and the river. Wenchang chicken is illustrated by a preparation photograph from Haikou. Photographs from Qinglan, Dongjiao, and Puqian are labelled separately: they show the wider municipality’s surroundings without extending the pronunciation sample to those places.'] },
      ],
      facts: [{ label: 'Name convention', value: 'Published geographic name; no unverified local endonym is supplied' }, { label: 'Reading reference', value: 'Peng 2026 · two Wenchang-raised speakers' }, { label: 'Map anchor', value: 'Wenchang urban center; not a dialect boundary' }],
      sources: [study, street, food], readingMinutes: 2,
    },
    words,
    soundNotes: [
      { title: 'Ordinary voiced stops and implosives', text: 'Wenchang contrasts [b] with [ɓ], and [d] with [ɗ]. Peng’s recordings usually show a shorter stretch of voicing before release for implosives. Keep the hooked IPA letters: replacing both sounds with b or d would erase the contrast.', localityIds: ['wenchang'], source: study },
      { title: 'Eight categories, explicit pitch values', text: 'This study gives citation values 34, 33, 31, 21, 42, 52, 5, and 3. The final two belong to checked syllables ending in stops. Older descriptions disagree on some values; the examples retain this study’s speaker and notation rather than combine different tone systems.', localityIds: ['wenchang'], source: study },
      { title: 'Tone changes inside a word', text: 'In Peng’s recorded reduplicated words, the first syllable changes while the second keeps its citation tone. These patterns also differ from some earlier descriptions of general compounds. An isolated reading is therefore not a recipe for pronouncing a sentence.', localityIds: ['wenchang'], source: study },
    ],
    culture: [
      { title: 'Wennan’s arcaded streets', text: 'The old street photographs show continuous shopfronts and covered pedestrian space. Look at how upper-floor façades sit above the shaded street edge.', localityIds: ['wenchang'], source: street },
      { title: 'Wenchang chicken', text: 'The photograph shows Wenchang chicken being prepared in Haikou. It illustrates the regional dish outside its namesake city and supplies no local pronunciation.', localityIds: ['wenchang'], source: food },
    ],
    resources: [
      { title: 'Wenchang Min Chinese', description: 'An open-access IPA illustration with speaker details, consonants, vowels, citation tones, and connected-speech analysis.', localityIds: ['wenchang'], kind: 'Study', url: study.url },
      { title: 'Wennan old street', description: 'A credited photograph of the old urban streetscape, with its original location and licence.', localityIds: ['wenchang'], kind: 'Culture', url: street.url },
      { title: 'Wenchang chicken', description: 'The original food photograph and reuse licence.', localityIds: ['wenchang'], kind: 'Culture', url: food.url },
    ], photos: wenchangPhotos,
  }],
};
