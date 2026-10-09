import { useState } from "react";
import type { AttestedWord } from "../data/learning/types";
import { pitchContours } from "../data/ipa-display";
import { PitchTrace } from "./Pronunciation";
import { LearningWord } from "./BranchLearning";

// A pitch value is not a tone category, nor evidence for phrase-level sandhi.
export function attestedContours(words: AttestedWord[]): string[] {
  return [
    ...new Set(
      words
        .filter((word) => word.toneNotation === "pitch-contour")
        .flatMap((word) => pitchContours(word.ipa)),
    ),
  ];
}
export function wordsWithContour(words: AttestedWord[], contour: string) {
  return words.filter(
    (word) =>
      word.toneNotation === "pitch-contour" &&
      pitchContours(word.ipa).includes(contour),
  );
}
export default function LocalToneExplorer({
  words,
}: {
  words: AttestedWord[];
}) {
  const contours = attestedContours(words);
  const [selected, setSelected] = useState("");
  if (!contours.length) return null;
  const active = contours.includes(selected) ? selected : contours[0];
  const matches = wordsWithContour(words, active);
  return (
    <section
      className="local-tone-explorer"
      aria-label="Pitch contours in these words"
    >
      <header>
        <h2>See the tones</h2>
        <p>
          1 is low. 5 is high. These traces follow the supplied readings, not a
          complete tone system.
        </p>
      </header>
      <div
        className="local-tone-selector"
        role="group"
        aria-label="Choose a pitch contour"
      >
        {contours.map((contour) => (
          <button
            key={contour}
            aria-pressed={active === contour}
            aria-label={`Show contour ${contour}`}
            onClick={() => setSelected(contour)}
          >
            <PitchTrace contour={contour} />
            <span>{contour}</span>
          </button>
        ))}
      </div>
      <p className="local-sound-count" role="status">
        {matches.length} {matches.length === 1 ? "reading" : "readings"} with
        contour {active}
      </p>
      <div className="learning-word-grid">
        {matches.map((word) => (
          <LearningWord key={word.id} word={word} />
        ))}
      </div>
    </section>
  );
}
