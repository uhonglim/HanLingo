import type { AttestedWord, BranchLearning, CultureItem } from './types';
import ledger from '../../../docs/wu-jinyun-wuzhou-provenance.json';

const jinyunId = 'jinyun-county-331122';
const steed = { title: 'Steed & Rose · Jinyun examples · 2009 · p. 2297', url: `${ledger.jinyun.source.url}#page=3` };
const chen = { title: 'Chen Zhongmin · Southern Wu comparisons · 2014 · p. 118', url: `${ledger.wuzhou.source.url}#page=3` };
const pitch = (value: string) => value.replace(/[0-9]/gu, digit => '⁰¹²³⁴⁵⁶⁷⁸⁹'[Number(digit)]);

const jinyunWords: AttestedWord[] = ledger.jinyun.candidates.map(row => ({
  id: row.id, localityId: jinyunId, han: row.han, english: row.english,
  ipa: `[${row.sourceSegments}${pitch(row.sourcePitch)}]`,
  learningKind: 'word', toneNotation: 'pitch-contour',
  reading: 'Published citation example',
  registerLabel: `Jinyun · one speaker, late 1990s · settlement unspecified · 2009 source: Chuqu; current atlas: Jinqu${row.shortDuration ? ' · short checked syllable' : ''}`,
  note: `Supplied pitch ${row.sourcePitch}, with the paper’s English gloss.${row.shortDuration ? ' The source underlines this tone to mark short duration; its glottal-stop coda is retained.' : ''} Published in 2009 from Zhu Xiaonong’s late-1990s recording. The named Jinyun reference does not identify the speaker’s settlement.`,
  source: steed,
}));

const characterWords: AttestedWord[] = ledger.wuzhou.candidates.map(row => ({
  id: row.id, localityId: row.localityId, han: row.han, english: `Character ${row.han}`,
  ipa: `[${row.sourceSegments}]`, learningKind: 'character-reading', toneNotation: 'unspecified',
  reading: 'Published character example',
  registerLabel: `${row.localityId === 'yongkang' ? 'Yongkang' : 'Wuyi'} · Chen 2014 · settlement unspecified · source number ${row.sourceNumber}; pitch key unspecified`,
  note: `Source form ${row.sourceSegments}${pitch(row.sourceNumber)}. The paper does not give a key for this example’s number ${row.sourceNumber}; it is retained here without treating it as pitch or assigning a tone-category name. Only the attested segments appear in IPA and HanLingo spelling. Collection date and consultants are unspecified.`,
  source: chen,
}));

const culture: CultureItem[] = [
  {
    title: 'Flatbread from a clay oven',
    text: 'Jinyun shaobing has a sesame crust and a filling of pork and dried vegetables. Bakers press the filled dough onto the inside wall of a clay oven. A 2026 account records the craft through interviews with makers and a lesson at Xiandu. This county tradition does not identify the pronunciation study’s speaker.',
    localityIds: [jinyunId],
    source: { title: 'Lishui government / China Daily · Jinyun shaobing · 2026', url: 'https://www.ezhejiang.gov.cn/lishui/2026-03/09/c_1166228.htm' },
  },
  {
    title: 'Dinghu Peak and Huangdi stories',
    text: 'At Xiandu in Jinyun County, Dinghu Peak rises as a tall stone pillar beside the water. Local Huangdi legends connect the peak with alchemy and a dragon’s ascent. These are stories attached to the landscape; Xiandu is county cultural context, not the study’s documented recording site.',
    localityIds: [jinyunId],
    source: { title: 'Zhejiang government / China Daily · Xiandu · 2026', url: 'https://www.ezhejiang.gov.cn/2026-07/30/c_1201456.htm' },
  },
  {
    title: 'Tin shaped for daily use',
    text: 'Yongkang’s tin craft makes vessels such as wine pots, food containers and boxes, alongside ceremonial objects. The national heritage record describes shaping, filing, polishing and soldering; elaborate pieces also need carved moulds. These objects place metalworking within household life.',
    localityIds: ['yongkang'],
    source: { title: 'China Intangible Cultural Heritage · Yongkang tin craft · VII-62', url: 'https://www.ihchina.cn/project_details/14148' },
  },
  {
    title: 'A meeting place for hardware makers',
    text: 'Yongkang’s China Hardware Fair began in 1996. The 2025 fair brought locks, electric scooters and machinery together with local manufacturers and buyers. It offers a present-day view of the city’s metalworking economy alongside its older handcraft traditions.',
    localityIds: ['yongkang'],
    source: { title: 'Zhejiang government · China Hardware Fair · 2025', url: 'https://www.ezhejiang.gov.cn/jinhua/2025-09/30/c_1129697.htm' },
  },
  {
    title: 'Wuyi after dark',
    text: 'A 2024 account follows evening walks and markets around Wuyi’s historic urban area, which includes Shuxi Bridge, Hushan Academy and the City God Temple. Conservation and visitor facilities have developed together since a project began in 2012; the streetscape includes both historic buildings and recent work.',
    localityIds: ['wuyi'],
    source: { title: 'Zhejiang government · Wuyi Ancient City · 2024', url: 'https://www.ezhejiang.gov.cn/jinhua/2024-11/18/c_1045940.htm' },
  },
  {
    title: 'Yuyuan’s buildings for village life',
    text: 'Yuyuan, southwest of Wuyi’s county town, preserves houses, ancestral halls, a theatre, bridges and buildings for study and care of elders. The national heritage entry documents the village’s construction tradition. This is a specific place within the county, not an identified source for Chen’s pronunciation examples.',
    localityIds: ['wuyi'],
    source: { title: 'China Intangible Cultural Heritage · Yuyuan building craft · VIII-177', url: 'https://www.ihchina.cn/art/detail/id/14676.html' },
  },
];

export const wuJinyunWuzhouLearning: BranchLearning[] = [
  {
    branchId: 'wu/jinqu', words: jinyunWords,
    soundNotes: [
      {
        title: 'The same syllable, two pitch shapes',
        text: 'The study gives 麻 “hemp” [mʌw¹³¹] and 马 “horse” [mʌw³³¹]. The segment sequence is the same; the supplied pitch changes. These citation examples come from one Jinyun speaker recorded in the late 1990s. Steed and Rose call the reference Chuqu; the current atlas places Jinyun County in Jinqu using a different classification source. The two labels are kept distinct.',
        localityIds: [jinyunId], source: steed,
      },
      {
        title: 'A short syllable ending in a catch',
        text: '八 [pɔʔ³¹¹] and 白 [paʔ²¹³] end in [ʔ], a glottal closure. Their vowels and pitch shapes differ. The paper also underlines the tone values to mark short duration; the digits alone do not encode that timing. The county map marker is an orientation point, not a known recording address.',
        localityIds: [jinyunId], source: steed,
      },
    ],
    culture: culture.filter(item => item.localityIds.includes(jinyunId)),
    resources: [
      { title: 'Jinyun’s published citation examples', description: 'Steed and Rose’s 2009 paper gives Han, IPA, glosses and pitch values on p. 2297. The single-speaker recording dates to the late 1990s; settlement unspecified. Copyright ISCA; no playable recording supplied here.', kind: 'Study', url: steed.url, localityIds: [jinyunId] },
      { title: 'Current atlas placement', description: 'Jing’s 2025 county dataset records Jinyun as Jinqu after the second-edition atlas. This is the navigation classification; the pronunciation paper independently uses Chuqu.', kind: 'Study', url: 'https://doi.org/10.5281/zenodo.15897647', localityIds: [jinyunId] },
      ...culture.filter(item => item.localityIds.includes(jinyunId)).map(item => ({ title: item.title, description: item.source.title, kind: 'Culture' as const, url: item.source.url, localityIds: item.localityIds })),
    ],
  },
  {
    branchId: 'wu/wuzhou', words: characterWords,
    soundNotes: [
      {
        title: 'A closure before the nasal',
        text: 'Chen writes Yongkang 幫 [ʔmaŋ] and 東 [ʔnoŋ]. The initial [ʔ] comes before [m] or [n], so these examples begin with a glottal closure followed by a nasal. The printed source numbers remain in each reading’s note; the paper does not provide their key.',
        localityIds: ['yongkang'], source: chen,
      },
      {
        title: 'Different endings after the same start',
        text: 'Yongkang 扮 [ʔma] and 綳 [ʔmai] share their initial sequence but differ at the end: [a] versus [ai]. These are character examples from Chen’s 2014 comparison. No exact settlement, consultant or collection date is given, and no pitch contour has been added.',
        localityIds: ['yongkang'], source: chen,
      },
      {
        title: 'Glottalized nasals and a plain stop',
        text: 'In Wuyi, Chen gives 冰 [ʔmiŋ] and 店 [ʔnie], with a glottal closure before a nasal, alongside 表 [pie], beginning with [p]. The examples belong to the named Wuyi reference; the paper does not identify a settlement or recording address.',
        localityIds: ['wuyi'], source: chen,
      },
      {
        title: 'A glottal closure before [l]',
        text: 'Wuyi 釣 [ʔlie] and 帶 [ʔlia] both begin with [ʔl]. Their finals differ: [ie] and [ia]. The source prints the number 5 after each example without defining its value here, so the lesson keeps that number in the notes and leaves pitch unspecified.',
        localityIds: ['wuyi'], source: chen,
      },
    ],
    culture: culture.filter(item => !item.localityIds.includes(jinyunId)),
    resources: [
      ...['yongkang', 'wuyi'].map(localityId => ({ title: 'Chen’s Southern Wu comparisons', description: 'Page 118 provides these character examples. The lesson preserves segments and source numbers separately because the paper gives no key for those numbers. Speaker details and recording date are unspecified; no audio is provided.', kind: 'Study' as const, url: chen.url, localityIds: [localityId] })),
      ...culture.filter(item => !item.localityIds.includes(jinyunId)).map(item => ({ title: item.title, description: item.source.title, kind: 'Culture' as const, url: item.source.url, localityIds: item.localityIds })),
    ],
  },
];
