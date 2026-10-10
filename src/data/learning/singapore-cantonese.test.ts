import { describe, expect, it } from 'vitest';
import ledger from '../../../docs/singapore-cantonese-provenance.json';
import { singaporeCantoneseLearning } from './singapore-cantonese';
import { atlasOverseasYueClusters, atlasOverseasYueLocalities } from '../atlas/overseas-yue';
import { convertIpa } from '../romanization-method';

const pack = singaporeCantoneseLearning[0];
describe('Singapore Cantonese source scope', () => {
  it('keeps all five segment-only examples without supplying tone or lexical meanings', () => {
    expect(pack.words).toHaveLength(5);
    for (const row of ledger.rows) {
      const word = pack.words.find(word => word.han === row.han)!;
      expect(word.ipa).toBe(`[${row.segments}]`);
      expect(word.learningKind).toBe('character-reading');
      expect(word.english).toBe(`Character ${row.han}`);
      expect(word.toneNotation).toBe('unspecified');
      expect(word.registerLabel).toContain('omits tones');
      expect(convertIpa(word.ipa, word.toneNotation).every(syllable => syllable.tone === '')).toBe(true);
    }
    expect(pack.words.some(word => word.han === '舅')).toBe(false);
  });
  it('separates overseas geography from formal classification and other Singapore varieties', () => {
    const cluster = atlasOverseasYueClusters[0];
    const place = atlasOverseasYueLocalities[0];
    expect(cluster.kind).toBe('geographic');
    expect(place.id).toBe('singapore-cantonese');
    expect(place.groupId).toBe('yue');
    expect(place.branchId).toBe('guangfu');
    expect(place.clusterId).toBe(cluster.id);
    expect(place.coordinates).toEqual([103.8, 1.3]);
    expect(place.scope).toContain('Taishanese');
    expect(place.scope).toContain('Hakka');
    expect(pack.soundNotes).toHaveLength(2);
    expect(pack.culture).toHaveLength(2);
    expect(pack.resources.length).toBeGreaterThanOrEqual(2);
  });
  it('links the child performance on its publisher page rather than treating it as a lesson transcript', () => {
    const recording = pack.resources.find(resource => resource.kind === 'Recordings')!;
    expect(recording.url).toBe(ledger.recording.sourceUrl);
    expect(recording.url).not.toContain('.mp3');
    expect(recording.description).toContain('Ng Rui Zhao');
    expect(recording.description).toContain('children aged 7–11');
    expect(recording.description).toContain('No word-level IPA transcript');
    expect(ledger.recording.mode).toContain('not embedded');
  });
});
