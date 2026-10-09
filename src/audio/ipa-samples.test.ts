import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { ipaSamples, planIpaAudio, sampleFor, sampleSpelling } from './ipa-samples';

describe('sourced IPA sound pack', () => {
  it('ships the attributed audio bytes and keeps each IPA recording distinct', () => {
    expect(ipaSamples.length).toBeGreaterThanOrEqual(15);
    expect(new Set(ipaSamples.map(s => s.ipa)).size).toBe(ipaSamples.length);
    for (const sample of ipaSamples) {
      const bytes = readFileSync(`public${sample.src}`);
      expect(createHash('sha256').update(bytes).digest('hex'), sample.ipa).toBe(sample.sha256);
      expect(sample.sourceUrl).toMatch(/^https:\/\/commons.wikimedia.org\/wiki\/File:/);
      expect(sample.author).toBeTruthy();
      expect(sample.license).toBe('CC BY-SA 3.0');
      expect(sample.duration).toBeGreaterThan(0);
    }
    expect(sampleSpelling(sampleFor('y')!)).toBe('ü');
    for (const ipa of ['p', 'm', 'ŋ']) {
      expect(sampleFor(ipa)?.category).toBe('Consonants');
      expect(sampleFor(ipa)?.context).toContain('supporting vowels');
    }
    expect(sampleSpelling(sampleFor('ŋ')!)).toBe('ng');
    for (const ipa of ['f', 's', 'l']) {
      expect(sampleFor(ipa)?.category).toBe('Consonants');
      expect(sampleFor(ipa)?.context).toContain('Not an isolated local syllable');
    }
    expect(sampleFor('s')?.context).toContain('[sa asa]');
    expect(sampleFor('l')?.context).toContain('between two [a]');
    expect(sampleFor('j')).toBeUndefined(); // Never use [y] audio for the y glide.
    expect(sampleFor('ɛ')).toBeUndefined(); // Source hash mismatch held for review.
    expect(sampleFor('y')!.src).not.toBe(sampleFor('ʏ')!.src);
    expect(sampleSpelling(sampleFor('ʌ')!)).toBe('eu');
    expect(sampleSpelling(sampleFor('ɤ')!)).toBe('eu');
    expect(sampleFor('ʌ')!.src).not.toBe(sampleFor('ɤ')!.src);
    expect(sampleFor('ʌ')!.context).toContain('Not a Jinyun word');
  });
  it('keeps exact segment requirements and never substitutes an unmarked recording', () => {
    for (const ipa of ['pʰ', 'yː', 'ã', 'm̩', 'p̚', 'a̤', 'a̰', 'y̯']) {
      const plan = planIpaAudio(ipa);
      expect(plan.missing.length, ipa).toBeGreaterThan(0);
    }
    expect(planIpaAudio('ju').missing).toEqual(['j']);
    expect(planIpaAudio('y').samples.map(s => s.ipa)).toEqual(['y']);
    expect(planIpaAudio('ʌ ɤ').samples.map(s => s.ipa)).toEqual(['ʌ', 'ɤ']);
    expect(planIpaAudio('[y˥]', 'pitch-contour').samples.map(s => s.ipa)).toEqual(['y']);
    expect(planIpaAudio('[y6]', 'source-category').samples.map(s => s.ipa)).toEqual(['y']);
    expect(planIpaAudio('g').missing).toEqual(['g']);
    expect(() => planIpaAudio('i6', 'pitch-contour')).toThrow();
    expect(() => planIpaAudio('ʙ')).toThrow();
    expect(() => planIpaAudio(Array(31).fill('i').join(' '))).toThrow(/30 sounds/);
  });
});
