import type { BranchLearning } from './types';

/** Independent source packs may describe the same branch without replacing one another. */
export function mergeLearningPacks(input: BranchLearning[]): BranchLearning[] {
  const output = new Map<string, BranchLearning>();
  for (const pack of input) {
    const merged = output.get(pack.branchId) ?? { branchId: pack.branchId, words: [], soundNotes: [], culture: [], resources: [] };
    for (const key of ['words', 'soundNotes', 'culture', 'resources'] as const) {
      // The import contract assigns globally unique IDs to readings. Text entries
      // are distinct by locality and source; a shared title is not a duplicate.
      const entries = [...merged[key], ...pack[key]];
      const unique = [...new Map(entries.map(entry => [
        'id' in entry ? entry.id : `${entry.title}/${entry.localityIds.join('/')}/${'url' in entry ? entry.url : entry.source.url}`, entry,
      ])).values()];
      Object.assign(merged, { [key]: unique });
    }
    output.set(pack.branchId, merged);
  }
  return [...output.values()];
}
