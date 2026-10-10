import type { PlaceNamePronunciation } from './place-name-pronunciations';

const schemaSource = (repository: string, revision: string, schema: string, place: string) => ({
  title: `NGLI / Wugniu · ${place} community name identifier`,
  url: `https://github.com/NGLI/${repository}/blob/${revision}/${schema}.schema.yaml#L4-L16`,
});
const kashinChart = {
  title: 'NGLI / Wugniu · locality-specific IPA tables for Jiashan and Haining',
  url: 'https://github.com/NGLI/rime-wugniu_kashin/wiki/音系及拼音方案',
};

/** Only source IPA and explicit, locality-matched spelling-to-IPA tables.
 * These name readings do not add lexical lessons or infer connected-speech tones.
 */
export const wuPlaceNamePronunciations: Record<string, PlaceNamePronunciation> = {
  shanghai: {
    ipa: 'zɑ̃3 he2',
    toneNotation: 'source-category',
    source: {
      title: 'Brice David Roberts (2020), An Autosegmental-Metrical Model of Shanghainese Tone and Intonation · Appendix B, item 64, p. 156',
      url: 'https://escholarship.org/content/qt5hm0n8b7/qt5hm0n8b7.pdf#page=179',
    },
    note: 'The two syllables for 上海 are extracted from the author’s broad IPA transcription in stimulus 64; the same name occurs in stimulus 59. Appendix B explicitly identifies the digits as citation-tone categories T1–T5. They are preserved as ·T3 and ·T2, not interpreted as pitch values or a measured connected-name contour. This reading uses the dissertation’s transcription, not an inferred conversion of the Wugniu identifier Zaonhe.',
  },
  ningbo: {
    ipa: 'ȵiŋ pəu',
    toneNotation: 'unspecified',
    source: schemaSource('rime-wugniu_gninpou', 'f89a494f6f6af0354b786a44af048b8340804a8a', 'wugniu_gninpou', 'Ningpo'),
    mappingSource: {
      title: 'NGLI / Wugniu · Ningpo old-three-districts spelling and IPA tables',
      url: 'https://github.com/NGLI/rime-wugniu_gninpou/wiki/音系搭拼音方案#宁波老三区',
    },
    note: 'Broad segment transcription of the community name gnin-pou: gn → [ȵ], in → [iŋ], p → [p], ou → [əu], using the scheme’s own old-three-districts table. The identifier supplies no tones; tones and sandhi are not inferred. This is the documented older urban reference, not the separate Yinzhou scheme.',
  },
  suzhou: {
    ipa: 'səu tsøʏ',
    toneNotation: 'unspecified',
    source: schemaSource('rime-wugniu_soutseu', '9abdfb18cd5a7eb9b6422e3ea880cfa4b2b7227f', 'wugniu_soutseu', 'Suzhou'),
    mappingSource: {
      title: 'NGLI / Wugniu · Suzhou spelling and IPA tables',
      url: 'https://github.com/NGLI/rime-wugniu_soutseu/blob/9abdfb18cd5a7eb9b6422e3ea880cfa4b2b7227f/README.md#音系及拼音方案',
    },
    note: 'Broad segment transcription of the community name sou-tseu, using the same project’s s → [s], ou → [əu], ts → [ts], eu → [øʏ] correspondences. The unmarked name identifier does not supply tones. No citation tones or connected-speech contour are added.',
  },
  jiashan: {
    ipa: 'ka zø',
    toneNotation: 'unspecified',
    source: schemaSource('rime-wugniu_kashin', 'a27cfee26f320b24299ed2e47665b7317419577a', 'wugniu_kazoe', 'Jiashan'),
    mappingSource: kashinChart,
    note: 'Broad segment transcription of the community name ka-zoe using the Jiashan table specifically: k → [k], a → [a], z → [z], oe → [ø]. No tones are supplied in the name identifier. The neighbouring Jiaxing chart is not used.',
  },
  haining: {
    ipa: 'hɛ ȵin',
    toneNotation: 'unspecified',
    source: schemaSource('rime-wugniu_kashin', 'a27cfee26f320b24299ed2e47665b7317419577a', 'wugniu_haegnin', 'Haining'),
    mappingSource: kashinChart,
    note: 'Broad segment transcription of the community name hae-gnin using the Haining table specifically: h → [h], ae → [ɛ], gn → [ȵ], in → [in]. No tones are supplied in the name identifier; no tone or sandhi pattern is inferred.',
  },
};

export const wuPlaceNamePronunciationGaps = {
  jiaxing: 'The community identifier Kashin is attested, but its published local spelling table does not give IPA correspondences. Do not borrow another city’s chart.',
  tongxiang: 'The community identifier Donshian is attested, but the Tongxiang spelling table does not provide IPA correspondences. The Haining table on the same page is a different locality.',
  meixian: 'The first-person community source attests Moiyan but does not define its phonetic values. Taiwan Sixian readings and unsourced online transcriptions cannot establish this Meixian name reading.',
};
