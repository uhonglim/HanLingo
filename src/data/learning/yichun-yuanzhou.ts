import type { AttestedWord, BranchLearning } from './types';
import ledger from '../../../docs/yichun-yuanzhou-provenance.json';

const localityId = 'gan-county-360902';
const bookSource = { title: 'Xuping Li · A Grammar of Gan Chinese · 2018', url: ledger.source.officialUrl };
const towerSource = {
  title: 'Shanghai Astronomical Observatory · visit to Yuanzhou Qiaolou',
  url: 'https://shao.cas.cn/gh/jcdt/202507/t20250729_7898349.html',
};
const readingSource = {
  title: 'Jiangxi Daily · Yuanzhou cultural life · 3 May 2023, p. 1',
  url: 'https://epaper.jxxw.com.cn/resfile/2023-05-03/01/jxrb-20230503-001.pdf',
};

const words: AttestedWord[] = ledger.records.map(record => ({
  id: record.id,
  han: record.han,
  english: record.english,
  ipa: record.ipa,
  localityId,
  learningKind: 'word',
  writingStatus: 'attested',
  toneNotation: 'pitch-contour',
  reading: 'Published lexical example',
  registerLabel: 'Central–southern Yuanzhou · published 2018 · not the whole district',
  note: `${record.note} From Li’s central–southern Yuanzhou study, not a pronunciation shared by all Yichun prefecture. Digits are Chao pitch contours, not tone categories. No recording accompanies this selection.`,
  source: { title: `Li 2018 · printed p. ${record.printedPage} · ${record.example}`, url: ledger.source.officialUrl },
}));

export const yichunYuanzhouLearning: BranchLearning[] = [{
  branchId: 'gan/yiliu',
  words,
  soundNotes: [
    {
      title: 'Three singular pronouns',
      text: 'The study gives 我 [ŋo³⁴], 你 [ȵi³⁴] and 渠 [kiɛ³⁴] for first, second and third person singular. The second begins with the source’s alveolo-palatal nasal [ȵ]; it is not the initial [n] of Standard Mandarin. These are central–southern Yuanzhou forms. The table also gives plurals, but their suffix has no printed tone, so this starter does not add a guessed pitch.',
      localityIds: [localityId],
      source: { ...bookSource, title: 'Li 2018 · printed p. 43 · Table 4-1 and §4.1' },
    },
    {
      title: 'Kinship words with 老 and 表',
      text: '老兄 [lau⁴² ɕiaŋ³⁴] and 老弟 [lau⁴² tʰi²¹³] mean elder and younger brother in the study; 老 is a respectful or familiar prefix here. 表哥、表弟 and 表妹 identify cousins through maternal relatives or the father’s sisters. Their first syllable keeps the printed [piɛu⁴²]. The source’s explicit sandhi chain for 表姐 is outside this selection.',
      localityIds: [localityId],
      source: { ...bookSource, title: 'Li 2018 · printed pp. 29–31 · examples 14 and 17' },
    },
  ],
  culture: [
    {
      title: 'A tower that kept the time',
      text: 'Yuanzhou Qiaolou, also called Yichun’s Drum Tower, served as a local time observatory. A visit report from the Shanghai Astronomical Observatory describes its water-clock instruments and its roles in measuring, keeping and announcing time. It is an urban heritage site, not an identified recording location for these words.',
      localityIds: [localityId],
      source: towerSource,
    },
    {
      title: 'Reading in the neighbourhood',
      text: 'A 2023 Jiangxi Daily report visits the Yimi Yueguang reading corner in Tanxia community, Fenghuang subdistrict. It also documents the development of reading rooms at Shizishan, Nanchan Pavilion and Changli Academy. These are dated examples of urban Yuanzhou’s public reading culture; the report does not establish which local variety each visitor speaks.',
      localityIds: [localityId],
      source: readingSource,
    },
  ],
  resources: [
    {
      title: 'The Yuanzhou grammar',
      description: 'Xuping Li’s 2018 grammar supplies the selected words, written forms and meanings. Pages 6 and 9–10 delimit the central–southern Yuanzhou variety; this is narrower than the district marker and much narrower than Yichun prefecture.',
      localityIds: [localityId], kind: 'Study', url: bookSource.url,
    },
    {
      title: 'Scope and source conventions',
      description: 'The publisher’s preview includes the book’s introduction and copyright notice. The full book’s pp. 18–19 define five-level pitch contours 34, 44, 42, 213 and 5; entering-tone 5 is omitted in stop-final examples. None of these sixteen selections requires restoring an omitted tone. Copyright remains with the publisher.',
      localityIds: [localityId], kind: 'Study', url: ledger.source.officialPreview,
    },
    {
      title: 'Yuanzhou’s timekeeping tower',
      description: 'An institutional visit report from the Shanghai Astronomical Observatory discusses the local tower’s timekeeping instruments. Its cultural account is separate from the language study.',
      localityIds: [localityId], kind: 'Culture', url: towerSource.url,
    },
    {
      title: 'Neighbourhood reading culture',
      description: 'Jiangxi Daily’s 3 May 2023 report describes the Tanxia reading corner and the development of urban reading rooms. It records activity at that date rather than current opening hours.',
      localityIds: [localityId], kind: 'Culture', url: readingSource.url,
    },
  ],
}];
