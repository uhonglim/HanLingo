import { describe, expect, it } from 'vitest';
import conflicts from '../../../docs/beida-source-conflicts.json';
import { atlasLexibankPacks } from './atlas-lexibank';
import { branchLearning, getLocalLearning } from './index';
import { mapPoints } from '../languages';

describe('unresolved source disagreements', () => {
  it('preserves all six originals but excludes them from every learning surface', () => {
    const originals = atlasLexibankPacks.flatMap(pack => pack.words);
    const published = branchLearning.flatMap(pack => pack.words);
    expect(conflicts.records).toHaveLength(6);
    for (const record of conflicts.records) {
      const original = originals.find(word => word.id === record.id)!;
      expect(original).toBeDefined();
      expect(published.some(word => word.id === record.id)).toBe(false);
      const point = mapPoints.find(point => point.id === original.localityId)!;
      expect(getLocalLearning(point).words.some(word => word.id === record.id)).toBe(false);
      expect(record.value).not.toBe(record.segments);
    }
  });
});
