import type { AttestedWord, BranchLearning } from './types';
import ledger from '../../../docs/yingtan-gan-provenance.json';

const localityId = 'gan-county-360602';
const paper = { title: 'Xiaotian Liu · Yingtan single-speaker study · 2026', url: ledger.source.url };
const kiln = ledger.cultureSources[0];
const stone = ledger.cultureSources[1];
const words: AttestedWord[] = ledger.records.map(record => {
  const common = {
    id: record.id, english: record.english, ipa: record.ipa, localityId,
    toneNotation: 'pitch-contour' as const, reading: 'Published surface production',
    registerLabel: 'Yuehu urban area · one speaker, age 23 · published 2026; recording date unspecified',
    note: [record.note, record.sourceRepetitions.length > 1 ? 'The lesson uses the first printed repetition; blank table cells do not establish identical repeats.' : '', 'Pitch follows the printed surface form. No playable recording is supplied for this selection.'].filter(Boolean).join(' '),
    source: { ...paper, title: `Liu 2026 · p. ${record.page} · ${record.locator}` },
  };
  return record.han === null
    ? { ...common, han: null, writingStatus: 'not-supplied' as const, learningKind: 'word' as const }
    : { ...common, han: record.han, writingStatus: 'attested' as const, learningKind: record.learningKind === 'character-reading' ? 'character-reading' as const : 'word' as const };
});

export const yingtanGanLearning: BranchLearning[] = [{
  branchId: 'gan/yingyi', words,
  soundNotes: [
    { title: 'One speaker, several realizations', text: 'The study prints 和 first with [x], then twice with [χ]. 鞋 ends with pitch 24 in two repetitions and 213 in the third; 好 has 341, 341 and 34. These are documented differences within one speaker’s repetitions, not separate city accents. The lesson selects the first printed production and keeps the alternatives beside it.', localityIds: [localityId], source: { ...paper, title: 'Liu 2026 · p. 95 · Table 6' } },
    { title: 'Listen to the ending consonant', text: 'For the selected speaker, the printed forms include 班 [pan²²], 搬 [poŋ²²] and 宾 [pin²²]. Table 8 separates these surface productions from an earlier reference transcription. Its [n] and [ŋ] endings remain distinct in both IPA and HanLingo spelling; the study does not establish that every Yuehu speaker uses these forms.', localityIds: [localityId], source: { ...paper, title: 'Liu 2026 · p. 96 · Table 8' } },
  ],
  culture: [
    { title: 'Pottery beside the Tongjia River', text: 'In Yuehu’s Tongjia area, the Jiaoshan kiln site preserves evidence of early pottery production. A 2023 onsite report follows researcher Wang Hui along the river and into the Jiaoshan ancient-pottery museum, where patterned fragments and incised marks make the craft visible. This is district cultural context; the language study does not identify this as the speaker’s neighbourhood.', localityIds: [localityId], source: { title: kiln.title, url: kiln.url } },
    { title: 'A museum devoted to yellow wax stone', text: 'Yuehu’s Tongluowan Yellow Wax Stone Museum was a stop on a July 2015 cultural visit documented by its local organizers. The account places this named museum within Yuehu, separately from the wider Yingtan itinerary. This is a dated cultural reference, not a claim about current opening hours or the study speaker’s background.', localityIds: [localityId], source: { title: stone.title, url: stone.url } },
  ],
  resources: [
    { title: 'The Yingtan single-speaker study', description: 'Original 2026 paper: speaker scope on pp. 89 and 92–93, pitch notation on p. 91, selected surface forms on pp. 95–97. The paper is CC BY-NC 4.0; this collection is a bounded selection of factual readings, not a republication of its tables or figures.', kind: 'Study', url: paper.url, localityIds: [localityId] },
    { title: 'Jiaoshan pottery and its museum', description: 'Jiangxi Daily’s February 2023 visit documents the Tongjia riverside site, ancient pottery fragments and a local researcher’s museum work.', kind: 'Culture', url: kiln.url, localityIds: [localityId] },
    { title: 'A documented Yuehu museum visit', description: 'The organizers’ July 2015 account names the Tongluowan Yellow Wax Stone Museum in Yuehu. It supplies historical context, not present visitor information.', kind: 'Culture', url: stone.url, localityIds: [localityId] },
  ],
}];
