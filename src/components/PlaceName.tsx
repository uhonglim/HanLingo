import { placeLabel, placeReadingName } from '../data/language-names';
import './PlaceName.css';

export type PlaceNamePoint = { id: string; name: string; nativeName?: string };

/** A common name and its documented local reading, with no invented fallback. */
export default function PlaceName({ point, showHan = false }: { point: PlaceNamePoint; showHan?: boolean }) {
  const commonName = placeLabel(point);
  const reading = placeReadingName(point);
  const distinctReading = reading && reading !== commonName ? reading : undefined;
  return <span className="place-name">
    <span className="place-name-primary">{commonName}</span>
    {distinctReading && <>{' '}<span className="place-name-reading">{distinctReading}</span></>}
    {showHan && point.nativeName && <>{' '}<span className="place-name-han" lang="zh">{point.nativeName}</span></>}
  </span>;
}
