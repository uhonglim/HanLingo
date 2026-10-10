export type PlayableClip = { id: string; src: string };
export type PlaybackState = { owner: string; sample: PlayableClip | null; status: 'idle' | 'loading' | 'playing' | 'error'; error: string };
const idle: PlaybackState = { owner: '', sample: null, status: 'idle', error: '' };
/** One media element and a generation counter prevent overlapping or stale playback. */
export class IpaPlayback {
  private audio: HTMLAudioElement | null = null;
  private generation = 0;
  private timer: ReturnType<typeof setTimeout> | undefined;
  private state = idle;
  private listeners = new Set<() => void>();
  getSnapshot = () => this.state;
  getServerSnapshot = () => idle;
  subscribe = (listener: () => void) => { this.listeners.add(listener); return () => { this.listeners.delete(listener); }; };
  private update(state: PlaybackState) { this.state = state; this.listeners.forEach(listener => listener()); }
  attach(audio: HTMLAudioElement) { this.audio = audio; }
  detach() { this.stop(); this.audio = null; }
  stop = () => {
    this.generation++;
    clearTimeout(this.timer);
    if (this.audio) {
      this.audio.onended = null; this.audio.onerror = null; this.audio.onplaying = null;
      this.audio.pause(); this.audio.removeAttribute('src'); this.audio.load();
    }
    this.update(idle);
  };
  play = (samples: readonly PlayableClip[], owner: string) => {
    this.stop();
    const audio = this.audio;
    if (!audio || !samples.length) return;
    const generation = this.generation;
    let index = 0;
    const fail = () => {
      if (generation !== this.generation) return;
      this.stop();
      this.update({ owner, sample: samples[index], status: 'error', error: 'Audio could not play. Check your connection and try again.' });
    };
    const next = () => {
      if (generation !== this.generation) return;
      const sample = samples[index];
      this.update({ owner, sample, status: 'loading', error: '' });
      audio.src = sample.src;
      clearTimeout(this.timer);
      this.timer = setTimeout(fail, 15000);
      audio.onplaying = () => {
        if (generation !== this.generation) return;
        clearTimeout(this.timer);
        this.update({ owner, sample, status: 'playing', error: '' });
      };
      audio.onerror = fail;
      audio.onended = () => {
        if (generation !== this.generation) return;
        if (++index < samples.length) next(); else this.stop();
      };
      try { void audio.play().catch(fail); } catch { fail(); }
    };
    next();
  };
}
export const ipaPlayback = new IpaPlayback();
