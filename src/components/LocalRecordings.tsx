import { localRecordings } from '../data/local-recordings';
import './LocalRecordings.css';

export default function LocalRecordings({ localityId }: { localityId: string }) {
  const recordings = localRecordings.filter(item => item.localityId === localityId);
  if (!recordings.length) return null;
  return <section className="local-recordings" aria-label="Local recordings">
    <h2>Listen to local voices</h2>
    {recordings.map(recording => <article key={recording.id}>
      <div className="local-recording-heading"><div><h3>{recording.title}</h3><p>{recording.speaker} · {recording.year}</p></div></div>
      <p>{recording.context}</p>
      <a className="learning-source" href={recording.sourceUrl} target="_blank" rel="noreferrer">Listen at {recording.publisher}</a>
    </article>)}
  </section>;
}
