import { describe, expect, it } from 'vitest';
import { phonemicaRecordingLinks } from './recording-links-phonemica';
import { atlasGanXiangLocalities } from './atlas/gan-xiang';
import { atlasOtherSiniticLocalities } from './atlas/other-sinitic';

describe('Phonemica original publisher listening links', () => {
  it('keeps speaker recordings at attested locality scopes without adding media or lesson IPA', () => {
    const points = [...atlasGanXiangLocalities, ...atlasOtherSiniticLocalities];
    for (const recording of phonemicaRecordingLinks) {
      expect(points.find(point => point.id === recording.localityId)).toBeDefined();
      expect(recording.delivery).toBe('publisher-page');
      expect(recording.sourceUrl).toMatch(/^https:\/\/phonemica\.net\/x\/[a-f0-9]{24}\/0$/);
      expect(recording.publishedOn.slice(0, 4)).toBe(recording.year);
      expect(recording).not.toHaveProperty('audioUrl');
      expect(recording).not.toHaveProperty('ipa');
    }
    const donghu = phonemicaRecordingLinks.find(row => row.localityId === 'nanchang-gan')!;
    expect(donghu.sourceLocality).toContain('Donghu District');
    expect(donghu.context).toContain('separate from the historical');
    const jixi = phonemicaRecordingLinks.find(row => row.localityId === 'jixi-hui')!;
    expect(jixi.sourceLocality).toContain('settlement unspecified');
    expect(jixi.context).toContain('does not identify a town or village');
  });

  it('does not mistake a tier label or transcription controls for a supplied IPA transcript', () => {
    const changsha = phonemicaRecordingLinks.find(row => row.localityId === 'changsha-xiang')!;
    expect(changsha.transcript).toBe('timed-community-transcript');
    expect(changsha.context).toContain('without a district');
    expect(phonemicaRecordingLinks.filter(row => row.transcript === 'none-displayed').map(row => row.localityId).sort()).toEqual(['jixi-hui', 'nanchang-gan']);
    expect(phonemicaRecordingLinks.some(row => /zhangbei/.test(row.localityId))).toBe(false);
  });
});
