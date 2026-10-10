import { afterEach, describe, expect, it, vi } from 'vitest';
import { IpaPlayback } from './playback';
import { ipaSamples } from './ipa-samples';
function setup() {
  const media = { src: '', onplaying: null as null | (() => void), onended: null as null | (() => void), onerror: null as null | (() => void), play: vi.fn(() => Promise.resolve()), pause: vi.fn(), removeAttribute: vi.fn(), load: vi.fn() };
  const playback = new IpaPlayback();
  playback.attach(media as unknown as HTMLAudioElement);
  return { media, playback };
}
afterEach(() => vi.useRealTimers());
describe('single audio playback', () => {
  it('advances only on ended, stops at the end and ignores a replaced request', async () => {
    const {media, playback} = setup();
    let reject!: (reason: Error) => void;
    media.play.mockImplementationOnce(() => new Promise((_resolve, fail) => { reject = fail; }));
    playback.play([ipaSamples[0]], 'old');
    const staleEnded = media.onended!;
    playback.play([ipaSamples[1], ipaSamples[2]], 'new');
    reject(new Error('old request aborted')); await Promise.resolve();
    staleEnded();
    expect(playback.getSnapshot().owner).toBe('new');
    expect(media.src).toBe(ipaSamples[1].src);
    media.onplaying!(); expect(playback.getSnapshot().status).toBe('playing');
    media.onended!(); expect(media.src).toBe(ipaSamples[2].src);
    media.onended!(); expect(playback.getSnapshot().status).toBe('idle');
    expect(media.pause).toHaveBeenCalled();
  });
  it('reports blocked playback, load failures and timeouts; permits retry', async () => {
    vi.useFakeTimers();
    const {media, playback} = setup();
    media.play.mockRejectedValueOnce(new Error('NotAllowedError'));
    playback.play([ipaSamples[0]], 'test'); await Promise.resolve();
    expect(playback.getSnapshot().status).toBe('error');
    playback.play([ipaSamples[0]], 'test'); media.onerror!();
    expect(playback.getSnapshot().status).toBe('error');
    playback.play([ipaSamples[0]], 'test'); vi.advanceTimersByTime(15000);
    expect(playback.getSnapshot().status).toBe('error');
    playback.play([ipaSamples[0]], 'test'); media.onplaying!();
    vi.advanceTimersByTime(15000); expect(playback.getSnapshot().status).toBe('playing');
    playback.detach(); expect(playback.getSnapshot().status).toBe('idle');
  });
});
