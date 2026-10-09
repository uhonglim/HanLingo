import { localPlaceReadings, placeNameReference } from '../data/language-names';
import { placeNamePronunciations, placeNameSpelling } from '../data/place-name-pronunciations';

export default function PlaceNameNotes({ point }: { point: { id: string; name: string } }) {
  const common = placeNameReference(point), reading = localPlaceReadings[point.id];
  const pronunciation = placeNamePronunciations[point.id];
  if (!common && !reading) return null;
  return <div className="place-name-notes">
    {common && <p>{common.note} <a href={common.source.url} target="_blank" rel="noreferrer">{common.source.title}</a></p>}
    {pronunciation && <p><strong>HanLingo spelling: {placeNameSpelling(point.id)}</strong>{' '}·{' '}
      {pronunciation.toneNotation === 'source-category' ? 'IPA segments + source tone categories' : 'IPA'}: {pronunciation.ipa}.{' '}
      {pronunciation.toneNotation === 'unspecified' && 'Tones not supplied. '}{pronunciation.note}{' '}
      <a href={pronunciation.source.url} target="_blank" rel="noreferrer">{pronunciation.source.title}</a>{' '}
      {pronunciation.mappingSource && <a href={pronunciation.mappingSource.url} target="_blank" rel="noreferrer">{pronunciation.mappingSource.title}</a>}</p>}
    {reading && <p><strong>Source spelling: {reading.localName}</strong> — {reading.convention}. {reading.note}{' '}
      <a href={reading.source.url} target="_blank" rel="noreferrer">{reading.source.title}</a></p>}
    {reading && !pronunciation && <p>HanLingo name spelling awaits a documented phonetic reading.</p>}
  </div>;
}
