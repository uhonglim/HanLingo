import { useId, useMemo, useState } from "react";
import type { AttestedWord } from "../data/learning/types";
import { spellingFor } from "../data/learning";
import { LearningWord } from "./BranchLearning";
import "./LocalSoundExplorer.css";

const tie = "\u0361";
const belowTie = "\u035c";
const affricates = new Set([
  "ts",
  "tʃ",
  "tɕ",
  "tʂ",
  "dz",
  "dʒ",
  "dʑ",
  "dʐ",
  "pf",
]);
const modifiers = new Set(["ʰ", "ʷ", "ʲ", "ˠ", "ˤ", "˞", "ː", "ˑ", "ʼ"]);
const toneCharacters = /[0-9⁰¹²³⁴⁵⁶⁷⁸⁹˩˨˧˦˥ꜛꜜ]/u;
const baseCharacter = /\p{L}/u;
const combiningMark = /\p{M}/u;

/**
 * Extract segment symbols, never tone values. Tie bars are canonicalized only
 * for matching; the example cards retain each source's original transcription.
 * An untied ts / tsʰ in the current datasets is the source's affricate notation.
 */
export function splitLocalIpaSymbols(ipa: string): string[] {
  const chars = [...ipa.normalize("NFD")];
  const symbols: string[] = [];
  for (let index = 0; index < chars.length; index++) {
    const start = chars[index];
    if (
      toneCharacters.test(start) ||
      !baseCharacter.test(start) ||
      modifiers.has(start)
    )
      continue;
    let symbol = start;
    // A tie bar explicitly joins two bases. Also recognize the established
    // untied affricates used in the reference tables; never cross a boundary.
    if (
      (chars[index + 1] === tie || chars[index + 1] === belowTie) &&
      baseCharacter.test(chars[index + 2] ?? "")
    ) {
      symbol += tie + chars[index + 2];
      index += 2;
    } else if (affricates.has(start + (chars[index + 1] ?? ""))) {
      symbol += tie + chars[index + 1];
      index++;
    }
    while (index + 1 < chars.length) {
      const next = chars[index + 1];
      if (
        (combiningMark.test(next) && next !== tie && next !== belowTie) ||
        modifiers.has(next)
      ) {
        symbol += next;
        index++;
      } else break;
    }
    symbols.push(symbol.normalize("NFC"));
  }
  return symbols;
}

export function localSoundSymbols(words: readonly AttestedWord[]): string[] {
  return [...new Set(words.flatMap((word) => splitLocalIpaSymbols(word.ipa)))];
}

export function wordsWithLocalSound(
  words: readonly AttestedWord[],
  sound: string,
): AttestedWord[] {
  const selected = splitLocalIpaSymbols(sound);
  if (selected.length !== 1) return [];
  return words.filter((word) =>
    splitLocalIpaSymbols(word.ipa).includes(selected[0]),
  );
}

export default function LocalSoundExplorer({
  words,
}: {
  words: AttestedWord[];
}) {
  const headingId = useId();
  const examplesId = useId();
  const sounds = useMemo(() => localSoundSymbols(words), [words]);
  const [selection, setSelection] = useState("");
  const active = sounds.includes(selection) ? selection : sounds[0];
  const examples = useMemo(
    () => (active ? wordsWithLocalSound(words, active) : []),
    [active, words],
  );
  if (!active) return null;
  return (
    <section className="local-sound-explorer" aria-labelledby={headingId}>
      <header>
        <h2 id={headingId}>Sounds in these words</h2>
        <p>IPA above, HanLingo spelling below. Choose a sound to find words.</p>
      </header>
      <div
        className="local-sound-selector"
        role="group"
        aria-label="Choose an IPA sound"
      >
        {sounds.map((sound) => {
          const spelling = spellingFor({
            ipa: `[${sound}]`,
            toneNotation: "unspecified",
          });
          return (
            <button
              type="button"
              key={sound}
              aria-label={`IPA sound [${sound}]. ${spelling ? `HanLingo ${spelling}` : "Spelling not yet mapped"}`}
              aria-pressed={active === sound}
              aria-controls={examplesId}
              onClick={() => setSelection(sound)}
            >
              <span>[{sound}]</span>
              <small>{spelling ?? "Unmapped"}</small>
            </button>
          );
        })}
      </div>
      <div id={examplesId} className="local-sound-examples">
        <p className="local-sound-count" role="status" aria-live="polite">
          <span>[{active}]</span> in {examples.length}{" "}
          {examples.length === 1 ? "word" : "words"}
        </p>
        <div className="learning-word-grid">
          {examples.map((word) => (
            <LearningWord key={word.id} word={word} />
          ))}
        </div>
      </div>
    </section>
  );
}
