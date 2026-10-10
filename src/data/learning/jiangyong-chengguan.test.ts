import { describe, expect, it } from 'vitest';
import { jiangyongChengguanLearning } from './jiangyong-chengguan';
import { atlasJiangyongChengguanLocalities } from '../atlas/jiangyong-chengguan';
import { convertIpa } from '../romanization-method';
import provenance from '../../../docs/jiangyong-chengguan-provenance.json';

const pack = jiangyongChengguanLearning[0];

describe('bounded Huang Chengguan character readings', () => {
  it('matches every reviewed source fact and preserves the IPA-to-spelling path', () => {
    expect(pack.words).toHaveLength(12);
    expect(new Set(pack.words.map(word => word.id)).size).toBe(12);
    for (const item of provenance.readings) {
      const word = pack.words.find(entry => entry.han === item.han)!;
      expect(word.ipa).toBe(item.displayIpa);
      expect(word.learningKind).toBe(item.learningKind);
      expect(word.english).toBe(item.english);
      expect(word.toneNotation).toBe('pitch-contour');
      expect(word.registerLabel).toContain('focused survey 1987');
      expect(word.registerLabel).toContain('published 1993');
      expect(word.source.url).toContain('/page/n55/');
      expect(convertIpa(word.ipa, word.toneNotation).map(value => value.spelling).join(' ')).toBe(item.contourTranscription);
    }
  });

  it('keeps local semantic restrictions rather than a generic dictionary meaning', () => {
    const grandmother = pack.words.find(word => word.han === '奶')!;
    expect(grandmother.learningKind).toBe('word');
    expect(grandmother.english).toBe('grandmother; used in address');
    const characterReadings = pack.words.filter(word => word.han !== '奶');
    expect(characterReadings).toHaveLength(11);
    for (const word of characterReadings) {
      expect(word.learningKind).toBe('character-reading');
      expect(word.english).toBe(`Character ${word.han}`);
    }
    expect(grandmother.note).toContain('not the meaning “milk”');
    expect(pack.words.find(word => word.han === '飞')?.note).toContain('not claimed for every use');
  });

  it('keeps a sourced urban point separate from Baishui and scopes all content to it', () => {
    const place = atlasJiangyongChengguanLocalities[0];
    expect(place.id).toBe('jiangyong-chengguan');
    expect(place.coordinates).toEqual([111.3459, 25.27196]);
    expect(place.geographySource?.url).toContain('#L516');
    expect(place.clusterId).toBe('yongzhou-area');
    expect(pack.words.every(word => word.localityId === place.id)).toBe(true);
    for (const item of [...pack.soundNotes, ...pack.culture, ...pack.resources]) {
      expect(item.localityIds).toEqual([place.id]);
    }
    expect(pack.soundNotes).toHaveLength(2);
    expect(pack.culture).toHaveLength(2);
    expect(pack.resources.length).toBeGreaterThanOrEqual(2);
  });

  it('does not turn the short entering-tone key into an unattested lesson syllable', () => {
    expect(provenance.toneKey.find(tone => tone.category === '陰入')).toMatchObject({ contour: '5', duration: 'short' });
    expect(pack.words.some(word => /[ʔptk]/u.test(word.ipa))).toBe(false);
    expect(pack.soundNotes[1].text).toContain('not rewritten as 55');
    expect(pack.soundNotes[1].text).toContain('No example of this tone');
  });
});
