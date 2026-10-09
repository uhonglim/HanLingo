import { convertIpa, type ToneNotation } from './romanization-method';
import { hakkaPlaceNamePronunciations } from './place-name-pronunciations-hakka';
import { minPlaceNamePronunciations } from './place-name-pronunciations-min';
import { wuPlaceNamePronunciations } from './place-name-pronunciations-wu';

export type PlaceNamePronunciation = {
  /** Source IPA, or an explicitly documented broad transcription from a source spelling. */
  ipa: string;
  toneNotation: ToneNotation;
  source: { title: string; url: string };
  mappingSource?: { title: string; url: string };
  note: string;
};

const jyutpingMapping = {
  title: 'LSHK Jyutping chart · phonemic IPA correspondences',
  url: 'https://jyutping.org/en/jyutping/',
};

/** Name readings are independent of lexical lesson evidence and never create lesson records. */
export const placeNamePronunciations: Record<string, PlaceNamePronunciation> = {
  ...hakkaPlaceNamePronunciations,
  ...minPlaceNamePronunciations,
  ...wuPlaceNamePronunciations,
  guangzhou: {
    ipa: 'kʷɔːŋ2 t͡sɐu1', toneNotation: 'source-category',
    source: {title: 'CUHK Cantonese Express · 識新朋友', url: 'https://www.ilc.cuhk.edu.hk/workshop/Chinese/Cantonese/CantoneseExpress/dailyConversation/01/text.aspx'},
    mappingSource: jyutpingMapping,
    note: 'Broad transcription of the attested name Gwong2 Zau1 using the published Jyutping–IPA chart, with the chart’s alveolar realization of z. The source’s tone categories are retained as ·T2 and ·T1; no pitch contours are inferred. This Hong Kong teaching reference documents the Cantonese name for Canton, not a new recording of a Canton speaker.',
  },
  'hong-kong': {
    ipa: 'hœːŋ1 kɔːŋ2', toneNotation: 'source-category',
    source: {title: 'CUHK Cantonese Express · 香港 vocabulary', url: 'https://www.ilc.cuhk.edu.hk/workshop/Chinese/Cantonese/CantoneseExpress/dailyConversation/01/vocab_03.aspx'},
    mappingSource: jyutpingMapping,
    note: 'Broad transcription of the attested name Hoeng1 Gong2 using the published Jyutping–IPA chart. HanLingo spells the supplied sounds with the same key as every language. ·T1 and ·T2 preserve source tone categories, not measured pitch contours or automatically generated connected-speech tones.',
  },
};

export function placeNameSpelling(id: string): string | undefined {
  const pronunciation = placeNamePronunciations[id];
  if (!pronunciation) return undefined;
  return convertIpa(pronunciation.ipa, pronunciation.toneNotation).map(syllable => syllable.spelling).join(' ');
}
