import { useEffect, useId, useSyncExternalStore } from 'react';
import { Play, Square } from 'lucide-react';
import { localRecordings } from '../data/local-recordings';
import { ipaPlayback } from '../audio/playback';
import './LocalRecordings.css';

export default function LocalRecordings({ localityId }: { localityId: string }) {
  const owner = useId();
  const state = useSyncExternalStore(ipaPlayback.subscribe, ipaPlayback.getSnapshot, ipaPlayback.getServerSnapshot);
  useEffect(() => () => { if (ipaPlayback.getSnapshot().owner === owner) ipaPlayback.stop(); }, [owner, localityId]);
  const recordings = localRecordings.filter(item => item.localityId === localityId);
  if (!recordings.length) return null;
  return <section className="local-recordings" aria-label="Local recordings">
    <h2>Listen to local voices</h2>
    {recordings.map(recording => {
      const selected = state.owner === owner && state.sample?.id === recording.id;
      const active = selected && (state.status === 'loading' || state.status === 'playing');
      return <article key={recording.id}>
        <div className="local-recording-heading"><button type="button" className="ipa-audio-play" onClick={() => active ? ipaPlayback.stop() : ipaPlayback.play([recording], owner)} aria-label={`${active ? 'Stop' : 'Play'} ${recording.title}`}>{active ? <Square size={17} aria-hidden="true" /> : <Play size={17} aria-hidden="true" />}{active ? 'Stop' : 'Listen'}</button><div><h3>{recording.title}</h3><p>{recording.speaker} · {recording.year}</p></div></div>
        <p>{recording.context}</p>
        <p className="local-recording-status" role="status">{selected ? state.error || (active ? state.status === 'loading' ? 'Loading recording…' : 'Playing recording' : '') : ''}</p>
        <a className="learning-source" href={recording.sourceUrl} target="_blank" rel="noreferrer">Audio hosted by {recording.publisher} · Open original</a>
      </article>;
    })}
  </section>;
}
