import type { AttestedWord, BranchLearning } from './types';
import ledger from '../../../docs/yunlou-gan-provenance.json';

const localityId = 'yunlou-gan';
const paperUrl = ledger.source.url;
const paperSource = {
  title: 'Chang & Yang · Ji’an Yunlou Gan · 2026 · CC BY 4.0',
  url: paperUrl,
};
const heritageSource = {
  title: 'Local gazetteer · Yunlou heritage entries · Knowledge Granular Resources Library',
  url: 'https://meta.librarydata.cn/bookview?gid=140335020220000201&sid=140310020220000002',
};

const words: AttestedWord[] = ledger.records.map(record => {
  const common = {
    id: record.id,
    english: record.english,
    ipa: record.ipa,
    localityId,
    toneNotation: 'pitch-contour' as const,
    reading: 'Published sentence-example form',
    registerLabel: 'Yunlou · sentence examples · published 2026 · collection date unspecified',
    note: `${record.note} Attested within a sentence example, not a separately recorded citation form. No audio accompanies this selection.${record.han === null ? ' The source supplies pronunciation and meaning without a written form.' : ''}`,
    source: {
      title: `Chang & Yang 2026 · p. ${record.sourcePage} · ${record.sourceExample} · CC BY 4.0`,
      url: `${ledger.source.pdfUrl}#page=${record.sourcePage}`,
    },
  };
  return record.han === null
    ? { ...common, han: null, writingStatus: 'not-supplied', learningKind: 'word' }
    : { ...common, han: record.han, writingStatus: 'attested', learningKind: 'word' };
});

export const yunlouGanLearning: BranchLearning[] = [{
  branchId: 'gan/jicha',
  words,
  soundNotes: [
    {
      title: 'Come, go, and a shared proposal',
      text: '来 [luai²¹³] and 去 [kʰə³³] can describe separate movements. Fused 来去 [luai²¹³ kʰə³³] also brings the speaker and hearer into a shared proposal: the study contrasts a joint break with telling somebody else to rest. Context matters; the fused form is not a universal replacement for English “let’s”.',
      localityIds: [localityId],
      source: { ...paperSource, url: `${ledger.source.pdfUrl}#page=3` },
    },
    {
      title: 'Hear the form in its sentence',
      text: 'The selections retain the paper’s tone contours, including the three-part 213 and 324. They come from sentence examples, rather than an isolated-word recording list. Other examples explicitly show tone changes such as 55→51; those chains are not flattened into invented dictionary pronunciations. The source’s reduced form with tone 0 is also kept outside this starter.',
      localityIds: [localityId],
      source: { ...paperSource, url: `${ledger.source.pdfUrl}#page=5` },
    },
  ],
  culture: [
    {
      title: 'Baisui Hall in Yunlou village',
      text: 'The local gazetteer records Baisui Hall in Yunlou village, dates it to 1273, and connects it with the hundredth birthday of Luo Geng’s grandmother and a celebratory poem by Wen Tianxiang. This is a historical record of the Yunlou site, not a claim about its present condition.',
      localityIds: [localityId],
      source: heritageSource,
    },
    {
      title: 'An inscribed hall at Luxia',
      text: 'A separate gazetteer entry locates the Zhang ancestral hall at Luxia in the Yunlou area and records an inscribed couplet by Kuang Ruxie of Zhixia. It is a nearby Yunlou-area heritage place; the linguistic paper does not identify this hall or Luxia as a recording location.',
      localityIds: [localityId],
      source: heritageSource,
    },
  ],
  resources: [
    {
      title: 'The Yunlou study',
      description: 'Chang and Yang’s 2026 primary study supplies the selected forms, meanings and grammatical contexts. Data mainly come from one native-speaker author, with three more speakers checking specified judgments. See pp. 2–5, 11 and 22.',
      localityIds: [localityId],
      kind: 'Study',
      url: paperUrl,
    },
    {
      title: 'Yunlou heritage records',
      description: 'Local gazetteer entries distinguish the hall in Yunlou village from the Zhang ancestral hall at nearby Luxia. The heritage context is separate from the pronunciation evidence.',
      localityIds: [localityId],
      kind: 'Culture',
      url: heritageSource.url,
    },
    {
      title: 'Source reuse and attribution',
      description: 'The article is by Meixiang Chang and Zhaole Yang and is licensed CC BY 4.0. HanLingo selects forms, normalizes IPA typography and shortens English labels; it does not supply unprinted characters, recordings or reconstructed tones.',
      localityIds: [localityId],
      kind: 'Study',
      url: ledger.source.licenseUrl,
    },
  ],
}];
