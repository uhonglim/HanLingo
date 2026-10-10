import type { AttestedWord, BranchLearning } from './types';
import ledger from '../../../docs/shaowu-ngai2021-provenance.json';

const localityId = 'shaowu';
const source = { title: 'Ngai 2021 · A Grammar of Shaowu', url: ledger.source.url };
const qualifications: Record<string, string> = {
  '牛公': 'The final syllable is 22 in this attested compound, although the source gives standalone 公 with 21. No tone has been inferred or regularized.',
  '跤': 'This is Ngai’s page 4 form with 21; the earlier study cited on page 12 gives 31. The studies are not merged.',
  '得': 'The source describes several constructions, including get, give and causative uses. A meaning requires context; this entry is excluded from context-free meaning questions and distractors.',
  '帮': 'The gloss selects the lexical verb help. Page 5 also describes its grammatical uses, including a comitative use; it is not a universal translation of help in every construction.',
  '拿': 'The gloss selects the lexical hold/take use. Page 5 also describes instrumental and object-marking uses.',
  '了': 'The gloss selects the lexical finish use. Page 9 also describes an aspectual-marker function; the form cannot be translated as finish in every sentence.',
  '度': 'The gloss selects the lexical pass-through use. Page 9 also describes its use as an experiential marker.',
};
const words: AttestedWord[] = ledger.rows.map(row => ({
  id: row.id, localityId, han: row.han, english: row.english,
  learningKind: 'word', ipa: row.ipa, toneNotation: 'pitch-contour',
  ...(row.meaningPracticeExclude ? { meaningPracticeExclude: true as const } : {}),
  reading: 'Documented lexical form',
  registerLabel: 'Urban Shaowu · Ngai 2021 · fieldwork 2009–2019',
  note: `Printed p.${row.printedPage}. The source specifies IPA and pitch values; superscript tone digits are displayed on the baseline. ${qualifications[row.han] ?? 'The English gloss follows the source’s selected lexical sense.'} Four principal consultants are documented, but no individual speaker or recording date is assigned to this entry. No playable word recording is supplied.`,
  source,
}));
export const shaowuNgai2021Learning: BranchLearning[] = [{
  branchId: 'min/shaojiang', words,
  soundNotes: [
    {
      title: 'Rounded ü in the word for cow',
      text: '牛嫲 [ny22 ma22] begins with [y], a front rounded vowel. HanLingo writes it ü: nü22 ma22. The same source gives 牛公 [ny22 kuŋ22]; keep its supplied final 22 rather than replacing it with the 21 of standalone 公.',
      localityIds: [localityId], source,
    },
    {
      title: 'Aspiration and two kinds of affricate',
      text: '剪 [tsien55] begins with [ts], while 厝 [tɕʰiɔ213] begins with an aspirated palatal affricate. HanLingo distinguishes ts and chh. In 跤 [kʰau21] and 徛 [kʰi55], kh marks aspiration; it does not mean a separate h syllable.',
      localityIds: [localityId], source,
    },
    {
      title: 'Six supplied pitch contours',
      text: 'Ngai gives 21, 22, 55, 213, 35 and 53 as the six tone contours. For example, 梳 has 21, 拿 has 22 and 剪 has 55. These digits describe pitch, not tone-category numbers. The selected forms do not generate tone changes for new sentences.',
      localityIds: [localityId], source,
    },
  ],
  culture: [
    {
      title: 'The timber frame of Baoyan Hall',
      text: 'Baoyan Temple’s main hall stands in Zhaoyang, within urban Shaowu. An architectural field study dates the hall to 1533 and records a double-eaved hip-and-gable roof over a five-bay-wide, five-bay-deep plan. Its measured timber frame offers a concrete way to explore the city’s built heritage.',
      localityIds: [localityId], source: { title: ledger.cultureSources[0].title, url: ledger.cultureSources[0].url },
    },
    {
      title: 'Local life in the folk museum',
      text: 'Shaowu’s folk museum is listed at 3 Daojia Lane, off Wusi Road. Its museum profile records its establishment in 1987 and public opening in February 1988, with local traditional culture and everyday life as its subject. This is cultural context, not a linguistic recording site.',
      localityIds: [localityId], source: { title: ledger.cultureSources[1].title, url: ledger.cultureSources[1].url },
    },
  ],
  resources: [
    { title: 'A Grammar of Shaowu', description: 'Twenty selected lexical facts from Ngai’s urban fieldwork. Copyright retained; no full tables, prose, lexicon or recordings are reproduced.', kind: 'Study', localityIds: [localityId], url: source.url },
    { title: 'Read the source preview', description: 'Authorized publisher-distributed preview: IPA key on LI–LII; urban scope and tones on p.3; selected forms on pp.4, 5 and 9–11; fieldwork on p.19.', kind: 'Study', localityIds: [localityId], url: ledger.source.preview },
    { title: 'Baoyan Hall’s architecture', description: 'Xu Yitao’s comparative field study, Table 1 on p.138, records the urban hall’s date and timber-frame design.', kind: 'Culture', localityIds: [localityId], url: ledger.cultureSources[0].url },
    { title: 'Shaowu’s museum collection', description: 'Museum catalogue profile and urban addresses, including the folk museum. No current opening schedule is asserted here.', kind: 'Culture', localityIds: [localityId], url: ledger.cultureSources[1].url },
  ],
}];
