import { atlasLexibankPacks } from './atlas-lexibank';
import conflicts from '../../../docs/beida-source-conflicts.json';

// Preserve the source import, but do not teach unresolved source disagreements.
const heldIds = new Set(conflicts.records.map(record => record.id));
export const publishedAtlasLexibankPacks = atlasLexibankPacks.map(pack => ({
  ...pack,
  words: pack.words.filter(word => !heldIds.has(word.id)),
}));
