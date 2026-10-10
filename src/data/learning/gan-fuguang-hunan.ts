import type { AttestedWord, BranchLearning } from './types';
import ledger from '../../../docs/gan-fuguang-hunan-provenance.json';

const localityId = 'hunan-fuzhou';
const source = { title: ledger.source.title, url: ledger.source.url };
const words: AttestedWord[] = ledger.rows.map(row => ({
  id: row.id, localityId, han: row.han,
  english: `Character ${row.han}`, learningKind: 'character-reading',
  ipa: row.ipa, toneNotation: 'source-category',
  reading: 'Comparative character reading',
  registerLabel: 'Hunan township · Chen 2026 · one speaker · tone categories, not pitch',
  note: `Table 2, p.110, 抚州湖南, column ${row.column}: ${row.sourceForm}. Source category ${row.category} is shown as editorial T${row.editorialCategory}; the paper prints a corner mark, not this digit or a pitch contour. Exact segments are retained. This is a character reading, not a supplied local lexical definition. The consultant is a male bamboo worker aged 76 in the source; collection date, age-reference year and precise village are unspecified. No playable word recording is supplied.`,
  source,
}));

export const ganFuguangHunanLearning: BranchLearning[] = [{
  branchId: 'gan/fuguang', words,
  soundNotes: [
    {
      title: 'Two affricate beginnings',
      text: '栽 begins with [ts], while 节 begins with [tɕ]. HanLingo keeps these as ts and ch. The source also gives aspirated [tsʰ] in 草 and [tɕʰ] in 全. These selected character readings illustrate the contrast; they do not establish every word’s pronunciation.',
      localityIds: [localityId], source,
    },
    {
      title: 'Two ways to close a syllable',
      text: '节 ends in [t]; 摘 ends in [ʔ], a glottal closure. Both carry the source’s 陰入 category mark. HanLingo shows that category as ·T7, an editorial identifier rather than a measured pitch. Neither the ending nor the category supplies a full local tone contour.',
      localityIds: [localityId], source,
    },
  ],
  culture: [
    {
      title: 'Carved houses and a village stage',
      text: 'A January 2015 report from Zhuxi village in Hunan Township describes a theatre stage, ancestral halls and carved wood, brick and stone. It also records serious theft and damage. This dated account is a window into local built heritage, not a claim that the buildings remain intact today.',
      localityIds: [localityId], source: { title: ledger.cultureSources[0].title, url: ledger.cultureSources[0].url },
    },
    {
      title: 'You Guoen’s former residence',
      text: 'The district’s 2023 heritage list places You Guoen’s former residence in Youjia village, within Hongtang village committee in Hunan Township, and dates the building to the Qing period. The residence and Zhuxi provide township context; neither is identified as the linguistic consultant’s home.',
      localityIds: [localityId], source: { title: ledger.cultureSources[1].title, url: ledger.cultureSources[1].url },
    },
  ],
  resources: [
    { title: 'Hunan character readings', description: 'Sixteen selected factual readings from Chen Nuo’s 2026 Table 2. Copyright retained; the article and table are not reproduced. Source tone categories, not pitch values.', kind: 'Study', localityIds: [localityId], url: source.url },
    { title: 'Zhuxi’s architectural heritage', description: 'A dated 2015 field report from the township, including damage and preservation concerns.', kind: 'Culture', localityIds: [localityId], url: ledger.cultureSources[0].url },
    { title: 'Protected local buildings', description: 'Linchuan’s 2023 list; row 131 locates You Guoen’s former residence. Township context, not a recording site.', kind: 'Culture', localityIds: [localityId], url: ledger.cultureSources[1].url },
    { title: 'Reading the corner tone marks', description: 'Unicode identifies the source symbols as Chinese tone categories. HanLingo’s T1, T2, T3, T5 and T7 are editorial identifiers for these categories, not local pitch values.', kind: 'Study', localityIds: [localityId], url: ledger.transcription.unicodeSource },
  ],
}];
