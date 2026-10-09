import { useEffect, useId, useRef, useState, useSyncExternalStore } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Play, Square, Volume2 } from 'lucide-react';
import { ipaSamples, planIpaAudio, sampleSpelling } from '../audio/ipa-samples';
import type { IpaSample } from '../audio/ipa-samples';
import { ipaPlayback } from '../audio/playback';
import type { ToneNotation } from '../data/romanization-method';
import './IpaAudio.css';

const categories = [...new Set(ipaSamples.map(sample => sample.category))];
const usePlayback = () => useSyncExternalStore(ipaPlayback.subscribe, ipaPlayback.getSnapshot, ipaPlayback.getServerSnapshot);
export function IpaAudioHost() {
  const ref = useRef<HTMLAudioElement>(null);
  const location = useLocation();
  useEffect(() => { if (ref.current) ipaPlayback.attach(ref.current); return () => ipaPlayback.detach(); }, []);
  useEffect(() => { ipaPlayback.stop(); }, [location.pathname, location.search]);
  return <audio ref={ref} preload="none" data-ipa-audio="true" hidden />;
}
function Credit({ sample }: { sample: IpaSample }) {
  return <span className="ipa-audio-credit">{sample.context} <a href={sample.sourceUrl} target="_blank" rel="noreferrer">{sample.author}</a> · <a href={sample.licenseUrl} target="_blank" rel="noreferrer">{sample.license}</a>. MP3 conversion only.</span>;
}
/** For an exact sound, or a sequence of demonstrations; never advertised as a word recording. */
export function IpaAudioPreview({ ipa, notation = 'unspecified' }: { ipa: string; notation?: ToneNotation }) {
  const owner = useId();
  const state = usePlayback();
  useEffect(() => () => { if (ipaPlayback.getSnapshot().owner === owner) ipaPlayback.stop(); }, [ipa, notation, owner]);
  let plan;
  try { plan = planIpaAudio(ipa, notation); } catch { return null; }
  const active = state.owner === owner && (state.status === 'playing' || state.status === 'loading');
  if (plan.missing.length) return <p className="ipa-audio-gap">No exact demo for {plan.missing.map(s => `[${s}]`).join(', ')}. <Link to="/romanization#listen">Explore recorded sounds</Link>.</p>;
  if (!plan.samples.length) return null;
  const current = state.owner === owner && state.sample ? plan.samples.find(sample => sample.id === state.sample?.id) ?? plan.samples[0] : plan.samples[0];
  return <div className="ipa-audio-preview">
    <button type="button" className="ipa-audio-play" onClick={() => active ? ipaPlayback.stop() : ipaPlayback.play(plan.samples, owner)}>
      {active ? <Square size={15} aria-hidden="true" /> : <Play size={15} aria-hidden="true" />}
      {active ? 'Stop' : plan.samples.length === 1 ? 'Hear sound demo' : 'Hear separate sounds'}
    </button>
    <span className="ipa-audio-status" role="status">{state.owner === owner && state.error ? state.error : active ? `${state.status === 'loading' ? 'Loading' : 'Playing'} [${current.ipa}]` : ''}</span>
    <span className="ipa-audio-status">General IPA demos; not a local word recording. Tones are not performed.</span>
    <Credit sample={current} />
  </div>;
}
export default function IpaSoundLab() {
  const owner = useId();
  const state = usePlayback();
  const [category, setCategory] = useState('Vowels');
  const [selected, setSelected] = useState(ipaSamples.find(s => s.ipa === 'y')!);
  useEffect(() => () => { if (ipaPlayback.getSnapshot().owner === owner) ipaPlayback.stop(); }, [owner]);
  const active = state.owner === owner && (state.status === 'playing' || state.status === 'loading');
  const current = state.owner === owner && state.sample ? ipaSamples.find(sample => sample.id === state.sample?.id) ?? selected : selected;
  return <section className="ipa-sound-lab roman-section" id="listen" aria-labelledby="ipa-listen-heading">
    <header><div><h2 id="ipa-listen-heading">Hear the IPA</h2><p>{ipaSamples.length} human-recorded sound demonstrations. Tap a symbol to listen.</p></div><a href="/audio/hanlingo-ipa-pack.zip" download>Download sound pack</a></header>
    <p className="ipa-audio-scope">General IPA demonstrations, not local word recordings. Consonant clips retain supporting vowels; tones and connected speech are not performed.</p>
    <div className="ipa-audio-toolbar">{categories.length > 1 && <label>Sounds <select value={category} onChange={e => { ipaPlayback.stop(); setCategory(e.target.value); setSelected(ipaSamples.find(s => s.category === e.target.value)!); }}>{categories.map(category => <option key={category}>{category}</option>)}</select></label>}<button className="ipa-audio-play" style={{ visibility: active ? "visible" : "hidden" }} disabled={!active} aria-hidden={!active} onClick={ipaPlayback.stop}><Square size={15} aria-hidden="true" />Stop</button></div>
    <div className="ipa-audio-grid" role="group" aria-label="Play IPA demonstrations">
      {ipaSamples.filter(s => s.category === category).map(sample => <button key={sample.id} type="button" aria-label={`Hear IPA [${sample.ipa}], HanLingo ${sampleSpelling(sample)}`} aria-pressed={current.id === sample.id} onClick={() => { setSelected(sample); ipaPlayback.play([sample], owner); }}><span>[{sample.ipa}]</span><small>{sampleSpelling(sample)}</small><Volume2 size={13} aria-hidden="true" /></button>)}
    </div>
    <div className="ipa-audio-detail"><strong>[{current.ipa}] → {sampleSpelling(current)}</strong><span>{current.name}</span><span role="status">{state.owner === owner && state.error ? state.error : active ? state.status === 'loading' ? 'Loading audio…' : 'Playing' : 'Ready'}</span><Credit sample={current} /></div>
  </section>;
}
