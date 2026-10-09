import type { AttestedWord, BranchLearning, CultureItem } from './types';
import ledger from '../../../docs/gan-tongcheng-readings-provenance.json';

const source = ledger.source;
const juanshui = 'gan-tongcheng-juanshui';
const shinan = 'gan-tongcheng-shinan';
const words: AttestedWord[] = ledger.rows.map(row => ({
  id: row.id, localityId: row.localityId, han: row.han,
  english: `Character ${row.han}`, learningKind: 'character-reading',
  ipa: row.ipa, toneNotation: 'pitch-contour',
  reading: 'Comparative character reading',
  registerLabel: `${row.placeName} · Zhang & Wang 2022 · character reading · collection date unspecified`,
  note: `Source row ${row.sourcePlace}, column ${row.column}: ${row.sourceForm}. The table gives this character’s pronunciation, not a local lexical definition. Sampling dates, consultants and exact neighbourhoods are unspecified. Pitch values and the source nasal symbol ȵ are retained. No playable word recording is supplied.`,
  source,
}));

const culture: CultureItem[] = [
  {
    title: 'Opera beside the river',
    text: 'Juanshui’s opera garden, completed in December 2024 on Yanhe Road in Xianghan community, gives local opera a public riverside setting. Pavilions, paths and a performance square join the neighbourhood’s everyday walking spaces.',
    localityIds: [juanshui],
    source: { title: 'Xianning Daily · 6 January 2025 · Hubei housing department republication', url: 'https://zjt.hubei.gov.cn/bmdt/dtyw/szsm/202501/t20250106_5491125.shtml' },
  },
  {
    title: 'A town museum',
    text: 'Tongcheng’s cultural-service directory places the county museum at the Yinshan Culture and Art Centre in Juanshui. This is a place to explore county history; its address does not identify the linguistic study’s recording site.',
    localityIds: [juanshui],
    source: { title: 'Tongcheng Culture and Tourism Cloud · museum directory', url: 'https://tcxwly.chaoxing.com/' },
  },
  {
    title: 'Gongs and lanterns on the hills',
    text: 'Around Shinan, Lantern Festival teams gather on neighbouring hilltops with gongs, drums, lamps and fires. The provincial heritage record names Meigang village as the applicant community for the local gong-and-light competition.',
    localityIds: [shinan],
    source: { title: 'Hubei intangible heritage centre · 26 February 2021', url: 'https://wlt.hubei.gov.cn/hbsfwzwhycw/mtgz/xwdt/202102/t20210226_3364961.shtml' },
  },
  {
    title: 'Rhythm made with the body',
    text: 'A 2024 report traces Tongcheng’s clapping dance to Shinan and Daping and describes its later stage and school teaching. Performers make rhythms by clapping and striking parts of the body. The tradition crosses community identities; it is not evidence of any performer’s dialect.',
    localityIds: [shinan],
    source: { title: 'Xianning Daily · reporting by Chen Xin, Liu Yuguan and Chen Xiaobin · 18 June 2024', url: 'https://app.xnnews.com.cn/news/rt/202406/t20240618_3624040.shtml' },
  },
];

export const ganTongchengReadings: BranchLearning[] = [{
  branchId: 'gan/datong', words, culture,
  soundNotes: [
    { title: 'Unvoiced and voiced beginnings', text: 'Juanshui’s table contrasts 答 [tanʔ55] with 塔 [danʔ35]. The onset and pitch both change. HanLingo keeps t and d distinct; these are individual character readings, not an inferred rule for every word.', localityIds: [juanshui], source },
    { title: 'A front rounded vowel', text: '入 is transcribed [ynʔ55] in the Juanshui row. HanLingo writes the vowel [y] as ü; the following [n] and glottal closure [ʔ] remain in the transcription. The supplied 55 is its citation pitch.', localityIds: [juanshui], source },
    { title: 'An internal local difference', text: 'Shinan gives 答 [taiʔ55], while the same study gives Juanshui [tanʔ55]. The difference inside the syllable is retained rather than replacing both with one county-wide form.', localityIds: [shinan], source },
    { title: 'Nasal ending before a glottal closure', text: 'Shinan’s 节 [tɕiɛnʔ55] and 切 [ʑiɛnʔ35] both contain [nʔ]. Juanshui’s corresponding rows give [tɕiɛʔ55] and [ʑiɛʔ35]. These two town references are kept separate.', localityIds: [shinan], source },
  ],
  resources: [
    { title: 'Tongcheng character comparisons', description: 'Twenty selected readings from two unambiguous rows of Table16. Both conflicting Magang rows remain excluded. CC BY4.0; speaker and sampling details unspecified.', kind: 'Study', localityIds: [juanshui, shinan], url: source.url },
    ...culture.map(item => ({ title: item.title, description: item.source.title, kind: 'Culture' as const, localityIds: item.localityIds, url: item.source.url })),
  ],
}];
