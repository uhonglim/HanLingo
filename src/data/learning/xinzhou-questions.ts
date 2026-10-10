import type { AttestedWord, BranchLearning } from './types';
import ledger from '../../../docs/xinzhou-questions-provenance.json';

const localityId = 'xinzhou-jin';
const source = {
  title: 'Ruan Jiamin · Xinzhou question words · 2024 · pp. 50–53',
  url: `${ledger.sourceUrl}#page=3`,
};

const words: AttestedWord[] = ledger.rows.map(row => ({
  id: row.id,
  localityId,
  ...(row.han === null
    ? { han: null, writingStatus: 'not-supplied' as const }
    : { han: row.han }),
  english: row.english,
  ipa: row.ipa,
  learningKind: 'word',
  toneNotation: 'unspecified',
  ...(row.meaningPracticeExclude ? { meaningPracticeExclude: true as const } : {}),
  reading: 'Published question word',
  registerLabel: 'Xinzhou · 2023 fieldwork · settlement unspecified · segments only; source number key undefined',
  note: `${row.usageNote} Source form [${row.sourceForm}]. The paper does not define its numerical notation; only its segments appear in IPA and HanLingo spelling. The fieldwork took place in January–February 2023; consultants and exact settlements are unspecified.${row.han === null ? ' No written headword is supplied for this fused form; the explanatory 谁家 is not substituted as its writing.' : ''}`,
  source,
}));

export const xinzhouQuestionsLearning: BranchLearning[] = [{
  branchId: 'jin/wutai',
  words,
  soundNotes: [
    {
      title: 'Who, and whose family',
      text: 'The source gives 谁 [suei] for a singular person question and [suɑ] for a fused form meaning “whose family”. Their final vowels differ. The latter also has restricted possessive uses before kinship and social titles. These are segment-only transcriptions: the source’s numerical marks remain in the word notes because their key is not defined.',
      localityIds: [localityId], source,
    },
    {
      title: 'Three syllables in a time question',
      text: '甚时候 [ʂəŋ sɿ xəu] asks when. Its first two syllables contrast [ʂ] with [s], and the last begins with [x]. The source records conversations in January–February 2023 without naming exact settlements or individual consultants. The atlas marker locates Xinzhou for orientation; it is not a known recording address.',
      localityIds: [localityId], source,
    },
  ],
  culture: ledger.culture.map(item => ({
    title: item.title, text: item.text, source: item.source, localityIds: [localityId],
  })),
  resources: [
    {
      title: 'Xinzhou question words in conversation',
      description: 'Ruan’s 2024 study publishes the selected phonetic forms in Table 1 and explains their uses on pp. 50–53. Fieldwork: January–February 2023; exact settlements unspecified. CC BY 4.0. The article does not define its numerical tone notation or supply a playable recording.',
      kind: 'Study', url: source.url, localityIds: [localityId],
    },
    {
      title: 'Xinzhou’s atlas placement',
      description: 'The current catalogue follows the 2012 Atlas framework in Jing’s 2025 county crosswalk. Ruan independently identifies Xinzhou with the Wutai branch. A named locality reference does not imply one uniform pronunciation throughout the municipality.',
      kind: 'Study', url: 'https://doi.org/10.5281/zenodo.15897647', localityIds: [localityId],
    },
    ...ledger.culture.map(item => ({
      title: item.title, description: item.source.title, kind: 'Culture' as const,
      url: item.source.url, localityIds: [localityId],
    })),
  ],
}];
