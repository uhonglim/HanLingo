import type { AttestedWord, BranchLearning, LearningSource } from './types';
import ledger from '../../../docs/laiyuan-contact-provenance.json';

const niujia = 'niujia-laiyuan';
const huangzong = 'huangzong-laiyuan';
const both = [niujia, huangzong];
const study = (page: number): LearningSource => ({
  title: `Ho Chun-Hui · Laiyuan fieldwork · 2016 · p. ${page}`,
  url: `${ledger.source.url}#page=${page + 2}`,
});
const villageScope = {
  [niujia]: 'Niujia · 2016 fieldwork · main consultant from Dongkenglong',
  [huangzong]: 'Huangzong · 2016 fieldwork · Nanyang and Dakengtou consultants',
};

const words: AttestedWord[] = ledger.records.map(record => {
  const common = {
    id: record.id, english: record.english, ipa: record.ipa,
    localityId: record.localityId, toneNotation: 'source-category' as const,
    reading: 'Surveyed lexical response · source tone categories',
    registerLabel: villageScope[record.localityId as keyof typeof villageScope],
    note: `Digits label historical tone categories, not pitch contours; T67 is a merged category.${record.note ? ` ${record.note}` : ''}${record.han === null ? ' The source supplies this spoken form and meaning without an explicitly attested local spelling.' : ` Written form: ${record.hanLocator}.`} No recording accompanies this selection.`,
    source: { ...study(record.sourcePage), title: `Ho 2016 · p. ${record.sourcePage} · Table ${record.table} · ${record.sourceRow}` },
  };
  return record.han === null
    ? { ...common, han: null, writingStatus: 'not-supplied', learningKind: 'word' }
    : { ...common, han: record.han, writingStatus: 'attested', learningKind: 'word' };
});

export const laiyuanContactLearning: BranchLearning[] = [{
  branchId: 'contact/western-fujian', words,
  soundNotes: [
    {
      title: 'Same segments, different tone categories',
      text: 'Niujia has [aŋ] for both “not” and “five”, but the source distinguishes category 67 from category 3. These labels identify historical categories; they do not mean a pitch movement from six to seven. No word-level pitch contour is reconstructed here.',
      localityIds: [niujia], source: study(30),
    },
    {
      title: 'A glottal stop at the end',
      text: 'Niujia’s recorded forms for “bite”, “stand” and “eat; drink” end in [ʔ]. Keep that closure distinct from the tone-category label that follows. The report explicitly uses 食 for both eating and drinking; the forms here come from its lexical tables, not generated translations.',
      localityIds: [niujia], source: study(29),
    },
    {
      title: 'A local contrast in “give”',
      text: 'The report records Huangzong [kuo] in category 67 for “give”, alongside Niujia [pã] in category 1. This is a comparison of two documented local responses. It neither makes the forms interchangeable nor establishes how every present-day speaker talks.',
      localityIds: [huangzong], source: study(27),
    },
    {
      title: 'Two forms for “ear”',
      text: 'Huangzong has both [ɲi] category 3 + [kʰaŋ] category 1 and [ɲi] category 3 + [ku] category 1. The discussion writes these as 耳空 and 耳菇. The starter shows the first form. The survey combines consultants from Nanyang and Dakengtou and acknowledges individual differences; this table does not allocate each ear form to one speaker.',
      localityIds: [huangzong], source: study(32),
    },
  ],
  culture: [
    {
      title: 'Early mandarin harvests',
      text: 'Fujian’s 2026 agricultural programme lists Niujia village specifically for early-ripening mandarins. The entry distinguishes Niujia’s crop from Huangzong’s highland oolong tea, a useful glimpse of livelihoods in neighbouring Laiyuan villages.',
      localityIds: [niujia],
      source: { title: 'Fujian agricultural authorities · 2026 programme · entry 2222', url: 'https://nynct.fujian.gov.cn/xxgk/zfxxgk/fdzdgknr/nyyw/ywgz/202602/P020260211404669667078.pdf' },
    },
    {
      title: 'Carving bamboo roots',
      text: 'A 2023 Fujian Daily report describes a Niujia resident who learned carving in Zhejiang and returned to open a bamboo-root carving workshop. The story places the craft within Laiyuan’s bamboo economy; the larger bamboo-growing figures in that report concern other villages or the township, not Niujia alone.',
      localityIds: [niujia],
      source: { title: 'Fujian Daily correspondents · Laiyuan bamboo work · 2023', url: 'https://fjnews.fjsen.com/wap/2023-09/14/content_31410709.htm' },
    },
    {
      title: 'Keeping old buildings in use',
      text: 'Laiyuan’s 2024 protection plan identifies five historic buildings in Huangzong for restoration and reuse. It also calls for preserving the village layout, old bridges and trees. This describes the published plan, not a claim that every restoration has been completed.',
      localityIds: [huangzong],
      source: { title: 'Laiyuan township · Huangzong protection plan · 2024', url: 'https://www.fjlylc.gov.cn/xz/lyxrmzf/zfxxgk/zfxxgkml/25/202410/t20241028_2169404.htm' },
    },
    {
      title: 'Tea on the mountain slopes',
      text: 'A 2018 county report documents Huangzong’s highland tea garden and its Taiwan-invested enterprise. These are village livelihoods and places, separate from the consultant locations used in the language study.',
      localityIds: [huangzong],
      source: { title: 'Liancheng county · Huangzong tea garden · 2018', url: 'https://www.fjlylc.gov.cn/ztzl/ddc/lchsy/201809/t20180913_1368622.htm' },
    },
  ],
  resources: [
    {
      title: 'The 2016 Laiyuan field study',
      description: 'Primary lexical responses in Tables 11–13, printed pp. 24–33. Tone-category key: p. 16, note 20. Consultant communities: pp. 20 and 47–49. The report declines a direct Min or Hakka classification.',
      localityIds: both, kind: 'Study', url: ledger.source.url,
    },
    {
      title: 'Laiyuan’s named villages',
      description: 'The township’s 2023 administrative record lists Niujia and Huangzong as separate villages. It establishes place identity, not pronunciation or language boundaries.',
      localityIds: both, kind: 'Culture', url: 'https://www.fjlylc.gov.cn/xz/lyxrmzf/zfxxgk/zfxxgkml/30/202311/t20231123_2077220.htm',
    },
    {
      title: 'What this selection preserves',
      description: 'A bounded selection of 24 factual lexical responses from Ho’s report. No open licence was identified; the report’s scans, extended prose and recordings are not reproduced. Unprinted writing and pitch contours are not supplied.',
      localityIds: both, kind: 'Study', url: `${ledger.source.url}#page=26`,
    },
  ],
}];
