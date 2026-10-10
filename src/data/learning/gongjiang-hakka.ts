import type { AttestedWord, BranchLearning } from './types';
import ledger from '../../../docs/gongjiang-hakka-provenance.json';

const localityId = 'gongjiang-hakka';
const source = { title: 'Wendi Xue · Sinitic kinship terms · 2023', url: ledger.source.url };
const words: AttestedWord[] = ledger.records.map(record => ({
  id: record.id, han: record.han, writingStatus: 'attested', learningKind: 'word',
  english: record.english, ipa: record.ipa, localityId,
  toneNotation: 'pitch-contour', reading: 'Published referential kinship term',
  registerLabel: record.han === '内兄'
    ? 'Gongjiang reference · literary kinship term · Xue 2023'
    : 'Gongjiang reference · referential kinship term · Xue 2023',
  note: [record.note, 'A term for referring to a relative; the study excludes forms of address. Supplied tone values are retained, generally without sandhi. Literature-based material was checked online during 2018–2022; no item-specific recording date or audio is supplied.'].filter(Boolean).join(' '),
  ...(record.meaningPracticeExclude ? { meaningPracticeExclude: true as const } : {}),
  source: { ...source, title: `Xue 2023 · p. ${record.sourcePage} · ${record.sourceLocator}` },
}));

export const gongjiangHakkaLearning: BranchLearning[] = [{
  branchId: 'hakka/yuxin', words,
  soundNotes: [
    { title: 'Glottal endings in kinship words', text: 'The selected compounds contain 伯 [paʔ⁵] and 叔 [ʂuʔ⁵]. The source retains a final [ʔ] and a single tone value 5; these are preserved rather than expanded into an invented contour. These examples are not a complete sound inventory.', localityIds: [localityId], source: { ...source, title: 'Xue 2023 · pp. 83, 136 and 209' } },
    { title: 'Reversing the two syllables', text: '伯老 [paʔ⁵ lɔ³⁵] refers to a father’s elder brother, while 老伯 [lɔ³⁵ paʔ⁵] is attested for an elder brother. The source gives both orders and their tone values. No connected-speech tone rule is inferred from the pair.', localityIds: [localityId], source: { ...source, title: 'Xue 2023 · pp. 136 and 201' } },
  ],
  culture: [
    { title: 'The town’s history museum', text: 'The Long March assembly and departure history museum is on Changzheng East Road in Gongjiang Town. The county government lists this local museum at number 19. It is a cultural destination, not a site identified by the language study.', localityIds: [localityId], source: ledger.cultureSources[0] },
    { title: 'Jinqiao’s wetland paths and football grounds', text: 'Jinqiao Village is within Gongjiang Town. A June 2026 local report describes boardwalks and cycle paths in its wetland park, alongside football grounds used by young players. This is town-area recreation; the linguistic study does not identify Jinqiao as a consultant’s home.', localityIds: [localityId], source: ledger.cultureSources[1] },
  ],
  resources: [
    { title: 'The Gongjiang kinship reference', description: 'ANU thesis: town scope on p. 118, notation on p. 83 and selected kinship terms on pp. 136, 201, 209 and 354–355. Referential terms, not address instructions. Copyright retained; this selection contains eight factual readings, with no source audio.', kind: 'Study', url: source.url, localityIds: [localityId] },
    { title: 'Gongjiang’s history museum', description: 'The county government identifies the museum and its Gongjiang Town address. Published June 2026.', kind: 'Culture', url: ledger.cultureSources[0].url, localityIds: [localityId] },
    { title: 'Jinqiao’s public recreation spaces', description: 'A June 2026 Ganzhou government report on the named village’s wetland paths and football grounds.', kind: 'Culture', url: ledger.cultureSources[1].url, localityIds: [localityId] },
  ],
}];
