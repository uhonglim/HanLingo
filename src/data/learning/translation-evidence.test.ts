import { describe, expect, it } from 'vitest';
import evidence from '../../../server/evidence.json';
import { getLocalLearning } from './index';
import { findLearningPlace } from './places';

describe('translation lexical grounding', () => {
  it('uses exact-locality lexical evidence and never supplies character glosses as translations', () => {
    for (const [target, localityId] of Object.entries({ amoy: 'xiamen', beijing: 'beijing-city', shanghai: 'shanghai', guangzhou: 'guangzhou', meixian: 'meixian' })) {
      const lexical = getLocalLearning(findLearningPlace(localityId)!).words.filter(word => word.learningKind !== 'character-reading' && word.han);
      const rows = evidence[target as keyof typeof evidence];
      expect(rows.map(row => row.recordId)).toEqual(lexical.map(word => word.id));
      for (const row of rows) {
        expect(row.localityId).toBe(localityId);
        expect(row.meaning).not.toMatch(/^Character /);
        expect(row).not.toHaveProperty('ipa');
      }
    }
  });
});
