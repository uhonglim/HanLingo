import type { AttestedWord, BranchLearning } from './types';
import ledger from '../../../docs/tonggu-xihu-provenance.json';

const localityId = 'tonggu-xihu';
const paper = { title: 'Yang and colleagues · The Phonology of Tonggu Hakka · 2016', url: ledger.source.url };
const readingRoom = ledger.cultureSources[0];
const familyCalls = ledger.cultureSources[1];
const words: AttestedWord[] = ledger.records.map(record => {
  const common = {
    id: record.id, english: record.english, ipa: record.ipa, localityId,
    toneNotation: 'pitch-contour' as const, reading: 'Published citation form',
    registerLabel: 'Guancang, Xihu · one Gan–Hakka bilingual consultant · July 2016',
    note: [record.note, 'The source’s conventional citation pitches are retained; these are not measured curves or computed connected-speech tones.'].filter(Boolean).join(' '),
    source: { ...paper, title: `Yang and colleagues 2016 · p. ${record.page} · ${record.locator}` },
    learningKind: 'word' as const,
  };
  return record.han === null
    ? { ...common, han: null, writingStatus: 'not-supplied' as const }
    : { ...common, han: record.han, writingStatus: 'attested' as const };
});

export const tongguXihuLearning: BranchLearning[] = [{
  branchId: 'hakka/tonggui', words,
  soundNotes: [
    { title: 'Citation tones, as printed', text: 'The paper writes six conventional citation values: 24, 113, 31, 44, 2 and 5. It separately discusses narrower measured realizations. These lessons preserve its printed convention, including 佢 [tɕi¹¹³] and 徛 [tɕʰi²⁴]; connected-speech tones are not reconstructed.', localityIds: [localityId], source: { ...paper, title: 'Yang and colleagues 2016 · pp. 132 and 139' } },
    { title: 'The same pronunciation can carry different meanings', text: 'The glossary gives [ke³¹] both for hiding something and for an aphid. It also distinguishes [no¹¹³] “rub, knead,” written 捼, from an unwritten homophone meaning “step on.” Their HanLingo spelling is identical because their supplied IPA is identical; spelling alone does not identify the word.', localityIds: [localityId], source: { ...paper, title: 'Yang and colleagues 2016 · p. 142' } },
  ],
  culture: [
    { title: 'Chess and drawing at the village reading room', text: 'A 2025 Jiangxi Daily report describes children learning chess and drawing in Xihu village’s rural reading room. This is a dated account of village community life; it does not identify the language used in those activities.', localityIds: [localityId], source: { title: readingRoom.title, url: readingRoom.url } },
    { title: 'Keeping families in touch', text: 'In 2021, volunteers in Xihu’s Gaoping and Hengling hamlets helped children video-call parents working away from home. These named village neighbourhoods are distinct from Guancang, the linguistic consultant’s home hamlet.', localityIds: [localityId], source: { title: familyCalls.title, url: familyCalls.url } },
  ],
  resources: [
    { title: 'The Tonggu Hakka phonology and glossary', description: 'CC BY 4.0 paper. The consultant and contact background are on pp. 128–129, the conventional tone key on p. 132 and selected lexical glosses on pp. 139–145. Recorded in July 2016; no playable recording accompanies this selection.', kind: 'Study', url: paper.url, localityIds: [localityId] },
    { title: 'Xihu’s village reading room', description: 'Jiangxi Daily’s August 2025 report names the village’s chess and drawing activities. Other villages in the report are separate places.', kind: 'Culture', url: readingRoom.url, localityIds: [localityId] },
    { title: 'Family contact across distance', description: 'The July 2021 public-service account specifically names Xihu’s Gaoping and Hengling hamlets and their family video calls.', kind: 'Culture', url: familyCalls.url, localityIds: [localityId] },
  ],
}];
