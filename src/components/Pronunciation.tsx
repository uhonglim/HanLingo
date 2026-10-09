import "./Pronunciation.css";

import { displayIpa, pitchContours } from "../data/ipa-display";
import { siteTerms } from "../data/site-terms";
export { displayIpa, pitchContours } from "../data/ipa-display";

export function PitchTrace({ contour }: { contour: string }) {
  const values = [...contour].map(Number);
  if (values.length === 1) values.push(values[0]);
  const points = values
    .map(
      (value, index) =>
        `${5 + (index * 46) / (values.length - 1)},${33 - (value - 1) * 7}`,
    )
    .join(" ");
  return (
    <svg viewBox="0 0 56 40" role="img" aria-label={`Pitch contour ${contour}`}>
      {[5, 19, 33].map((y) => (
        <path key={y} d={`M3 ${y}H53`} className="pronunciation-guide" />
      ))}
      <polyline
        points={points}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Pronunciation({
  ipa,
  spelling,
  toneNotation = "unspecified",
}: {
  ipa: string;
  spelling?: string;
  toneNotation?: "pitch-contour" | "source-category" | "unspecified";
}) {
  const contours = toneNotation === "pitch-contour" ? pitchContours(ipa) : [];
  const qualification =
    toneNotation === "source-category"
      ? " · source tone categories"
      : toneNotation === "unspecified"
        ? /[˩˨˧˦˥0-9⁰¹²³⁴⁵⁶⁷⁸⁹]/u.test(ipa)
          ? " · source tone notation"
          : " · tones not given"
        : "";
  return (
    <div className="pronunciation">
      <div className="pronunciation-ipa-row">
        <div>
          <span className="pronunciation-label">
            IPA{qualification}
          </span>
          <p className="pronunciation-ipa">{displayIpa(ipa, toneNotation)}</p>
        </div>
        {contours.length > 0 && (
          <div className="pronunciation-pitch" aria-label="Pitch contour">
            {contours.map((contour, index) => (
              <PitchTrace key={index} contour={contour} />
            ))}
          </div>
        )}
      </div>
      {spelling && (
        <p className="pronunciation-spelling">
          <span className="pronunciation-label">
            {siteTerms.spelling}{qualification}
          </span>
          <strong>{spelling}</strong>
        </p>
      )}
    </div>
  );
}
