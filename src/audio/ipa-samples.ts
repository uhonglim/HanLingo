import manifest from '../data/ipa-audio-manifest.json';
import { normalizeSegments, spellSegments } from '../data/xiamen-romanization';
import { convertIpa } from '../data/romanization-method';
import type { ToneNotation } from '../data/romanization-method';

export type IpaSample = (typeof manifest.samples)[number];
export const ipaSamples = manifest.samples;
const key = (ipa: string) => normalizeSegments(ipa).normalize('NFD').replaceAll('g', 'ɡ');
export const sampleFor = (ipa: string) => ipaSamples.find(sample => key(sample.ipa) === key(ipa));
export const sampleSpelling = (sample: IpaSample) => spellSegments(sample.ipa).spelling;

/** Each marked segment is matched as a whole. Never drop aspiration, length or nasalization. */
export function planIpaAudio(ipa: string, notation: ToneNotation = 'unspecified') {
  const syllables = convertIpa(ipa, notation);
  const samples: IpaSample[] = [];
  const missing: string[] = [];
  for (const syllable of syllables) {
    const segments: string[] = [];
    for (const step of syllable.steps) {
      if (/^[\p{M}ː]/u.test(step.ipa)) {
        if (segments.length) segments[segments.length - 1] += step.ipa;
        else missing.push(step.ipa);
      } else segments.push(step.ipa);
    }
    for (const segment of segments) {
      const sample = sampleFor(segment);
      if (sample) samples.push(sample);
      else missing.push(segment);
    }
  }
  if (samples.length > 30) throw new Error('Use up to 30 sounds for one preview.');
  return { samples, missing: [...new Set(missing)] };
}
