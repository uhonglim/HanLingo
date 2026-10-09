import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import LocalRecordings from './LocalRecordings';
import { IpaPlayback } from '../audio/playback';
import { ipaSamples } from '../audio/ipa-samples';
import { localRecordings } from '../data/local-recordings';

describe('local source recordings', () => {
  it('keeps locality, speaker, context and original source beside playback', () => {
    const html = renderToStaticMarkup(<LocalRecordings localityId="singapore-teochew" />);
    expect(html).toContain('Raina Lee Xin Tian');
    expect(html).toContain('no word-level IPA transcript');
    expect(html).toContain('https://singaporeccc.org.sg/events/sccc-talking-red-packet-2021/');
    expect(html).not.toContain('Hokkien New Year greeting');
    expect(renderToStaticMarkup(<LocalRecordings localityId="fuan" />)).toBe('');
  });
  it('shares the player with IPA demos without overlapping or advancing stale audio', () => {
    const audio = { src: '', play: vi.fn(() => Promise.resolve()), pause: vi.fn(), removeAttribute: vi.fn(), load: vi.fn(), onplaying: null as null | (() => void), onerror: null, onended: null as null | (() => void) };
    const player = new IpaPlayback();
    player.attach(audio as unknown as HTMLAudioElement);
    player.play([ipaSamples[0], ipaSamples[1]], 'ipa');
    const staleEnd = audio.onended!;
    player.play([localRecordings[1]], 'local');
    staleEnd();
    expect(audio.src).toBe(localRecordings[1].src);
    expect(player.getSnapshot().sample?.id).toBe('sccc-teochew-2021');
    expect(audio.pause).toHaveBeenCalled();
    player.play([ipaSamples[2]], 'ipa');
    expect(audio.src).toBe(ipaSamples[2].src);
    player.detach();
    expect(player.getSnapshot().status).toBe('idle');
  });
});
