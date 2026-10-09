import type { AttestedWord, BranchLearning } from './types';

const source = {
  title: 'van de Weijer, Sloos & Ran · Huangyan Taizhou · p. 538',
  url: 'https://doi.org/10.1017/S0025100321000189',
};
// Isolated linguistic facts transcribed from the original printed table, visually checked.
// The source uses tone categories 1–8, NOT Chao pitch contours.
const rows: [string, string, string, string][] = [
  ['meet', '碰', 'meet', 'pʰoŋ⁵'],
  ['pour-wine', '酌', 'pour wine', 'tʰɔŋ¹'],
  ['lump', '塊', 'lump', 'kʰɵ⁵'],
  ['out', '出', 'out', 'ʦʰɔ⁷'],
  ['surpass', '超', 'surpass', 'ʨʰɔ³'],
  ['bag', '包', 'bag', 'pɔ¹'],
  ['many', '多', 'many', 'tu³'],
  ['armour', '甲', 'armour', 'ka⁷'],
  ['dare', '敢', 'dare', 'cɛŋ³'],
  ['inch', '寸', 'inch', 'ʦwɵn⁵'],
  ['juice', '汁', 'juice', 'ʨɐ⁷'],
  ['law', '法', 'law', 'fɐ⁷'],
  ['try', '試', 'try', 'si⁵'],
  ['boots', '靴', 'boots', 'ɕɔ⁷'],
  ['exempt', '豁', 'exempt', 'xwɐ⁷'],
  ['at-once', '就', 'at once', 'bɐ⁸'],
  ['get', '得', 'get', 'dɐ⁸'],
  ['sunflower', '葵', 'sunflower', 'ɡy²'],
  ['he', '佢', 'he', 'ɟɛ²'],
  ['expert', '專', 'expert', 'ʣɵ²'],
  ['help', '助', 'help', 'ʥy⁶'],
  ['grave', '墳', 'grave', 'βɵn⁴'],
  ['be', '是', 'to be', 'zi⁴'],
  ['slowly', '徐', 'slowly', 'ʑy⁴'],
  ['parasol-tree', '梧', 'Chinese parasol tree', 'ɦu⁴'],
  ['rice', '米', 'rice', 'mi²'],
  ['view', '覽', 'view', 'lɛ⁴'],
  ['shower', '浴', 'shower', 'ɥɵ⁸'],
  ['be-nai', '乃', 'to be', 'na²'],
  ['fine-hair', '絨', 'fine hair', 'joŋ²'],
  ['bite', '咬', 'bite', 'ŋɔ³'],
  ['sidelong', '橫', 'sidelong', 'waŋ²'],
];
export const huangyanWords: AttestedWord[] = rows.map(([id, han, english, ipa]) => ({
  id: `huangyan-jipa-${id}`, han, english, ipa: `[${ipa}]`,
  localityId: 'huangyan', toneNotation: 'source-category',
  reading: 'Source tone categories',
  registerLabel: 'Ningxi Town · 24-year-old speaker',
  note: 'Consonant-table example. Superscript numbers identify this study’s tone categories, not pitch. Original IPA ligatures and digits are preserved; characters are displayed in traditional form.' + (/^[bdɡɟʣʥβzʑɦ]/u.test(ipa) ? ' The paper’s voiced-obstruent symbols include breathy release in isolated words, not necessarily continuous voicing.' : ''),
  source,
}));

export const huangyanLearningPack: BranchLearning = {
  branchId: 'wu/taizhou',
  words: huangyanWords,
  soundNotes: [
    {
      title: 'Three ways to start a syllable',
      text: 'Compare 碰 [pʰoŋ5], 包 [pɔ1] and 就 [bɐ8] in the consonant table: aspiration and the lower-register onset remain distinct. The digits here identify the paper’s tone categories. The study describes breathy release and vowel phonation rather than treating every written voiced onset as continuously voiced.',
      localityIds: ['huangyan'], source,
    },
    {
      title: 'A Ningxi reference',
      text: 'These examples come from a 24-year-old man who grew up in Ningxi Town and continued speaking Huangyan daily after moving to Shanghai. They document this speaker and locality; they do not establish one uniform pronunciation across Huangyan District.',
      localityIds: ['huangyan'],
      source: { ...source, title: 'van de Weijer, Sloos & Ran · speaker description, p. 532' },
    },
    {
      title: 'Tone categories are not pitch numbers',
      text: 'The JIPA study labels eight tones with numbers 1–8 for its own synchronic analysis. A separate urban Huangyan study by Ying uses explicit pitch contours and investigates changes in two-syllable words. These are different source conventions and speaker references; category 5 cannot be read as pitch 5.',
      localityIds: ['huangyan'],
      source: { title: 'Ying 2025 · Huangyan tone sandhi', url: 'https://doi.org/10.3765/plsa.v10i1.5935' },
    },
  ],
  culture: [],
  resources: [
    { title: 'Huangyan Taizhou', description: 'The original JIPA phonetic description, with word tables and supplementary speaker recordings. Digits are source tone categories.', localityIds: ['huangyan'], kind: 'Study', url: source.url },
    { title: 'Urban Huangyan tone sandhi', description: 'Yuanfan Ying’s 2025 open-access paper studies how two-syllable word tones change. Its pitch-contour convention stays separate from the Ningxi reference.', localityIds: ['huangyan'], kind: 'Study', url: 'https://doi.org/10.3765/plsa.v10i1.5935' },
  ],
};

export const huangyanSourceMetadata = {
  citation: 'van de Weijer, Jeroen; Sloos, Marjoleine; Ran, Yunyun (2023; first online 2021). Huangyan Taizhou. Journal of the International Phonetic Association 53(2), 532–546.',
  url: source.url,
  locator: 'Consonant examples on printed p. 538; speaker p. 532; tone conventions pp. 536–537.',
  rights: '© The Authors 2021, Cambridge University Press. No open licence is claimed for the article. Only attributed individual lexical facts and independently written explanations are included; no article pages, tables or recordings are redistributed.',
  speakerScope: '24-year-old male native speaker from Ningxi Town, Huangyan District.',
};
