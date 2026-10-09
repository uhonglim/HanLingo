import { localPlaceReadings, placeLabel, placeNameReference } from '../data/language-names';

export default function PlaceNameNotes({ point }: { point: { id: string; name: string } }) {
  const common = placeNameReference(point), reading = localPlaceReadings[point.id];
  if (!common && !reading) return null;
  return <div className="place-name-notes">
    {common && <p>{common.note} <a href={common.source.url} target="_blank" rel="noreferrer">{common.source.title}</a></p>}
    {reading && <p><strong>{placeLabel(point)} · {reading.localName}</strong> — {reading.convention}. {reading.note}{' '}
      <a href={reading.source.url} target="_blank" rel="noreferrer">{reading.source.title}</a></p>}
  </div>;
}
