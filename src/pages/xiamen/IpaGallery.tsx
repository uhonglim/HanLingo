import { IpaAudioPreview } from "../../components/IpaAudio";
import PlaceName from "../../components/PlaceName";
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { readingLabels, siteTerms } from "../../data/site-terms";
import { xiamenLearningWords as xiamenWords } from "../../data/xiamen-expanded-lexicon";
import type { XiamenWord } from "../../data/xiamen-lexicon";
import {
  pitchLetters,
  normalizeSegments,
  romanizeXiamen,
  spellSegments,
} from "../../data/xiamen-romanization";
import "./IpaGallery.css";

/** Keep affricates and their marks together; do not match [s] inside [t͡s]. */
export function splitIpaSymbols(syllable: string): string[] {
  const input = [...syllable.normalize("NFD")];
  const result: string[] = [];
  for (let i = 0; i < input.length; i++) {
    let symbol = input[i];
    // The comparison table uses untied ts for the same affricate. Group it
    // without changing the displayed source sequence or matching a plain s.
    if (symbol === "t" && input[i + 1] === "s") symbol += input[++i];
    while (i + 1 < input.length) {
      const next = input[i + 1];
      if ((next === "\u0361" || next === "\u035c") && i + 2 < input.length) {
        symbol += next + input[i + 2];
        i += 2;
      } else if (/[\u0300-\u036fʰː]/u.test(next)) {
        symbol += next;
        i++;
      } else break;
    }
    result.push(symbol.normalize("NFC"));
  }
  return result;
}

export function wordsWithSound(sound: string): XiamenWord[] {
  const selected = normalizeSegments(sound).normalize("NFC");
  return xiamenWords.filter((word) =>
    word.segments.some((syllable) =>
      splitIpaSymbols(syllable).some(symbol => normalizeSegments(symbol).normalize("NFC") === selected),
    ),
  );
}

export function wordsWithTone(tone: string): XiamenWord[] {
  return xiamenWords.filter((word) => word.tones.includes(tone));
}

const categories = [
  "Consonants",
  "Vowels",
  "Nasal vowels",
  "Syllabic nasal",
  "Stop endings",
] as const;
type SoundCategory = (typeof categories)[number];

function categoryOf(symbol: string): SoundCategory {
  const decomposed = symbol.normalize("NFD");
  if (decomposed.includes("\u0303")) return "Nasal vowels";
  if (decomposed.includes("\u030d") || decomposed.includes("\u0329"))
    return "Syllabic nasal";
  if (decomposed.includes("\u031a") || symbol === "ʔ") return "Stop endings";
  if ("aeiouɔ".includes(symbol)) return "Vowels";
  return "Consonants";
}

const soundDescriptions: Record<string, { name: string; note: string }> = {
  p: {
    name: "Voiceless bilabial stop",
    note: "Compare [p] with voiced [b]. HanLingo writes [p] as p.",
  },
  b: {
    name: "Voiced bilabial stop",
    note: "Compare the beginning of 米 with the beginning of 飯.",
  },
  t: {
    name: "Voiceless alveolar stop",
    note: "The opening sound in 茶. This is separate from the affricate [t͡s].",
  },
  tʰ: {
    name: "Aspirated alveolar stop",
    note: "Compare [tʰ] with unaspirated [t]. HanLingo writes th.",
  },
  k: {
    name: "Voiceless velar stop",
    note: "Compare [k] with aspirated [kʰ] in 去.",
  },
  kʰ: {
    name: "Aspirated velar stop",
    note: "The raised [ʰ] marks aspiration. Keep the whole symbol together.",
  },
  ɡ: {
    name: "Voiced velar stop",
    note: "IPA [ɡ] is written g in HanLingo spelling.",
  },
  t͡s: {
    name: "Voiceless alveolar affricate",
    note: "The tie bar joins the stop and fricative as one affricate. Compare aspirated [t͡sʰ].",
  },
  t͡sʰ: {
    name: "Aspirated alveolar affricate",
    note: "The aspiration mark distinguishes [t͡sʰ] from [t͡s]. HanLingo writes it as tsh.",
  },
  m: {
    name: "Bilabial nasal",
    note: "The same symbol appears at the beginning of 麵 and at the end of 啉.",
  },
  n: {
    name: "Alveolar nasal",
    note: "Appears at the start of 兩; the following [ŋ̍] carries the syllable.",
  },
  ŋ: {
    name: "Velar nasal",
    note: "The final consonant in 人. Compare syllabic [ŋ̍] in 飯.",
  },
  l: {
    name: "Alveolar lateral",
    note: "Appears at the beginning of several everyday words in this collection.",
  },
  s: {
    name: "Voiceless alveolar fricative",
    note: "Compare plain [s] with the affricate [t͡s]. They are distinct sounds.",
  },
  h: {
    name: "Glottal fricative",
    note: "Appears at the start of 魚, 好, 海 and the first syllable of 飛機.",
  },
  a: {
    name: "Open vowel",
    note: "[a] also occurs within vowel sequences. Nasal [ã] is separate.",
  },
  e: {
    name: "Close-mid front vowel",
    note: "Appears alone in 茶 and after [u] in words such as 買.",
  },
  i: {
    name: "Close front vowel",
    note: "Oral [i] and nasal [ĩ] are distinct vowels.",
  },
  o: {
    name: "Close-mid back rounded vowel",
    note: "The vowel in 好. Compare the more open [ɔ] in 五.",
  },
  u: {
    name: "Close back rounded vowel",
    note: "Appears alone in 厝 and within vowel sequences such as [ui] in 水.",
  },
  ɔ: {
    name: "Open-mid back rounded vowel",
    note: "The vowel in 五. HanLingo spelling uses oo for [ɔ].",
  },
  ã: {
    name: "Nasal open vowel",
    note: "The IPA tilde marks nasalization. HanLingo writes a~ for this vowel in 三.",
  },
  ẽ: {
    name: "Nasal close-mid front vowel",
    note: "The tilde marks nasalization. HanLingo writes e~; compare oral [e].",
  },
  ĩ: {
    name: "Nasal close front vowel",
    note: "The IPA tilde marks nasalization in 麵 and 錢; HanLingo writes i~.",
  },
  ŋ̍: {
    name: "Syllabic velar nasal",
    note: "The vertical mark says that this nasal carries the syllable, as in 飯 and 兩. HanLingo writes ng; IPA keeps the syllabicity detail.",
  },
  p̚: {
    name: "Unreleased bilabial stop",
    note: "The final mark indicates no audible release. HanLingo writes p; IPA keeps the unreleased mark.",
  },
  t̚: {
    name: "Unreleased alveolar stop",
    note: "The source marks this final stop as unreleased in 一 and 七. HanLingo writes t; IPA keeps the release detail.",
  },
  k̚: {
    name: "Unreleased velar stop",
    note: "The source marks the final stop in 六 as unreleased. HanLingo writes k; IPA keeps the release detail.",
  },
  ʔ: {
    name: "Glottal stop",
    note: "A stop closure at the glottis. HanLingo spelling uses q for [ʔ].",
  },
};

const soundOrder = [
  "p",
  "b",
  "t",
  "tʰ",
  "k",
  "kʰ",
  "ɡ",
  "t͡s",
  "t͡sʰ",
  "m",
  "n",
  "ŋ",
  "l",
  "s",
  "h",
  "i",
  "e",
  "a",
  "u",
  "o",
  "ɔ",
  "ĩ",
  "ẽ",
  "ã",
  "ŋ̍",
  "p̚",
  "t̚",
  "k̚",
  "ʔ",
];
const attested = new Set(
  xiamenWords.flatMap((word) => word.segments.flatMap(splitIpaSymbols).map(normalizeSegments)),
);
export const gallerySounds = [...attested].sort(
  (a, b) => soundOrder.indexOf(a) - soundOrder.indexOf(b),
);
const referenceToneOrder = ["44", "24", "53", "21", "22", "32", "4"];
export const galleryTones = [...new Set([...referenceToneOrder, ...xiamenWords.flatMap(word => word.tones)])]
  .filter(tone => xiamenWords.some(word => word.tones.includes(tone)));
const tones = galleryTones;
const toneNames: Record<string, string> = {
  "44": "High level",
  "24": "Low to high",
  "53": "High to middle",
  "21": "Low falling",
  "22": "Low level",
  "32": "Short falling",
  "4": "Short high",
  "55": "High level · source 55", "35": "Middle to high", "11": "Low level · source 11", "5": "High · source 5",
};
const gazetteerUrl =
  "https://data.fjdsfzw.org.cn/upload/Annals/2011/%E6%96%B9%E8%A8%80%E5%BF%97/epub/ops/215.htm";
const sandhiUrl =
  "https://ling.cuhk.edu.hk/people/peggy/SP2024_GeMok_Phonotactics.pdf";

function spellingFor(sound: string) {
  const result = spellSegments(sound);
  return {
    spelling: result.spelling,
    status: [...new Set(result.steps.map((step) => step.status))].join(" · "),
  };
}

function HighlightedIpa({
  word,
  sound,
  tone,
}: {
  word: XiamenWord;
  sound?: string;
  tone?: string;
}) {
  return (
    <span className="ipa-gallery-transcription">
      [
      {word.segments.map((syllable, i) => (
        <span key={i}>
          {i > 0 && " "}
          {splitIpaSymbols(syllable).map((symbol, j) =>
            normalizeSegments(symbol) === sound ? (
              <mark key={j}>{symbol}</mark>
            ) : (
              <span key={j}>{symbol}</span>
            ),
          )}
          {word.tones[i] === tone ? (
            <mark>{pitchLetters(word.tones[i])}</mark>
          ) : (
            pitchLetters(word.tones[i])
          )}
        </span>
      ))}
      ]
    </span>
  );
}

function WordExamples({
  words,
  sound,
  tone,
}: {
  words: XiamenWord[];
  sound?: string;
  tone?: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? words : words.slice(0, 6);
  return (
    <div className="ipa-gallery-example-list">
      <ul className="ipa-gallery-words">
        {visible.map((word) => (
          <li key={word.id}>
            <div className="ipa-gallery-word-title">
              <b lang="zh-Hant">{word.han}</b>
              <span>{word.english}</span>
            </div>
            <HighlightedIpa word={word} sound={sound} tone={tone} />
            <p className="ipa-gallery-romanization">
              {romanizeXiamen(word.segments, word.tones)}
            </p>
            <span className="ipa-gallery-reading-mode">
              {word.registerLabel ? `${word.registerLabel} · ${readingLabels[word.readingMode]}` : readingLabels[word.readingMode]}
            </span>
            <details>
              <summary>Reading and source</summary>
              <p>{word.note}</p>
              <p className="ipa-gallery-original">
                Source transcription: <span>{word.sourceReading}</span>
              </p>
              <a href={word.sourceUrl} target="_blank" rel="noreferrer">
                {word.sourceLabel}
              </a>
            </details>
          </li>
        ))}
      </ul>
      {words.length > 6 && (
        <button
          className="ipa-gallery-more"
          type="button"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded
            ? "Show fewer examples"
            : `Show all ${words.length} examples`}
        </button>
      )}
    </div>
  );
}

function ToneGraph({
  tone,
  compact = false,
}: {
  tone: string;
  compact?: boolean;
}) {
  const values = [...tone].map(Number);
  if (values.length === 1) values.push(values[0]);
  const points = values
    .map(
      (value, i) =>
        `${28 + (i * 180) / (values.length - 1)},${145 - value * 24}`,
    )
    .join(" ");
  return (
    <svg
      className={`ipa-gallery-tone-graph${compact ? " is-compact" : ""}`}
      viewBox="0 0 236 140"
      role="img"
      aria-label={`Schematic pitch ${tone}, on a scale from 1 low to 5 high`}
    >
      {[1, 2, 3, 4, 5].map((value) => (
        <g key={value}>
          <line x1="28" x2="208" y1={145 - value * 24} y2={145 - value * 24} />
          {!compact && (
            <text x="10" y={149 - value * 24}>
              {value}
            </text>
          )}
        </g>
      ))}
      <polyline points={points} />
    </svg>
  );
}

export default function IpaGallery() {
  const [params, setParams] = useSearchParams();
  const requestedSound = params.get("sound")?.normalize("NFC");
  const sound =
    requestedSound && gallerySounds.includes(requestedSound)
      ? requestedSound
      : "t͡s";
  const requestedTone = params.get("tone");
  const tone =
    requestedTone && tones.includes(requestedTone) ? requestedTone : "24";
  const [combined, setCombined] = useState(true);
  const description = soundDescriptions[sound];
  const spelling = spellingFor(sound);
  const soundWords = wordsWithSound(sound);
  const toneWords = wordsWithTone(tone);
  const toneExample =
    toneWords.find((word) => word.readingMode === "Citation") ?? toneWords[0];

  function choose(key: "sound" | "tone", value: string) {
    setParams(
      (current) => {
        const next = new URLSearchParams(current);
        next.set(key, value);
        return next;
      },
      { replace: true },
    );
  }

  return (
    <div className="ipa-gallery">
      <header className="ipa-gallery-header">
        <h1><PlaceName point={{id:"xiamen",name:"Amoy"}}/> {siteTerms.sections.sounds.toLowerCase()}</h1>
        <p>
          {gallerySounds.length} IPA symbols in {xiamenWords.length} sourced
          words; not a complete sound inventory.
        </p>
      </header>

      <section
        aria-labelledby="ipa-sounds-heading"
        className="ipa-gallery-section"
      >
        <div className="ipa-gallery-heading">
          <h2 id="ipa-sounds-heading">{siteTerms.sections.sounds}</h2>
          <Link to={{ search: params.toString(), hash: "#ipa-tones-heading" }}>
            Tones
          </Link>
        </div>
        <div className="ipa-gallery-soundboard">
          {categories.map((category) => (
            <fieldset key={category}>
              <legend>{category}</legend>
              <div>
                {gallerySounds
                  .filter((symbol) => categoryOf(symbol) === category)
                  .map((symbol) => (
                    <button
                      key={symbol}
                      type="button"
                      aria-pressed={sound === symbol}
                      aria-label={`Select IPA ${symbol}: ${soundDescriptions[symbol]?.name ?? category}`}
                      onClick={() => choose("sound", symbol)}
                    >
                      <span>{symbol}</span>
                      <small>{spellingFor(symbol).spelling}</small>
                    </button>
                  ))}
              </div>
            </fieldset>
          ))}
        </div>
        <div
          className="ipa-gallery-selected"
          aria-live="polite"
          aria-atomic="true"
        >
          <div className="ipa-gallery-symbol">[{sound}]</div>
          <div>
            <h3>{description?.name ?? categoryOf(sound)}</h3>
            <p>{description?.note}</p>
            <p className="ipa-gallery-spelling">
              {siteTerms.spelling} <strong>{spelling.spelling}</strong>{" "}
              <span>{spelling.status}</span>
            </p>
          </div>
          <span className="ipa-gallery-match-count">
            {soundWords.length} {soundWords.length === 1 ? "word" : "words"}
          </span>
        </div>
        <IpaAudioPreview ipa={sound} />
        <WordExamples key={`sound-${sound}`} words={soundWords} sound={sound} />
        <p className="ipa-gallery-caption">
          IPA above, HanLingo spelling below.{" "}
          <Link to="/romanization">{siteTerms.romanization} rules</Link>
        </p>
      </section>

      <section
        className="ipa-gallery-section"
        aria-labelledby="ipa-tones-heading"
      >
        <h2 id="ipa-tones-heading">Tones</h2>
        <p className="ipa-gallery-intro">
          Pitch runs from 1 (low) to 5 (high). Each reading retains its source’s
          contour, including differences between studies. The{" "}
          <a href={gazetteerUrl} target="_blank" rel="noreferrer">
            Fujian dialect gazetteer
          </a>{" "}
          is one reference; the dated Amoy comparison supplies additional readings.
        </p>
        <div
          className="ipa-gallery-tones"
          role="group"
          aria-label="Choose a pitch contour"
        >
          {tones.map((contour) => (
            <button
              key={contour}
              type="button"
              aria-pressed={tone === contour}
              aria-label={`Select tone ${contour}, ${toneNames[contour]}`}
              onClick={() => choose("tone", contour)}
            >
              <ToneGraph tone={contour} compact />
              <b>{contour}</b>
              <span>{pitchLetters(contour)}</span>
            </button>
          ))}
        </div>
        <div className="ipa-gallery-tone-detail">
          <div>
            <ToneGraph tone={tone} />
            <p>Schematic pitch; the horizontal axis does not show duration.</p>
          </div>
          <div aria-live="polite" aria-atomic="true">
            <h3>
              {toneNames[tone]}{" "}
              <span>
                {tone} · {pitchLetters(tone)}
              </span>
            </h3>
            {toneExample && (
              <>
                <b className="ipa-gallery-tone-han" lang="zh-Hant">
                  {toneExample.han}
                </b>
                <p>{toneExample.english}</p>
                <HighlightedIpa word={toneExample} tone={tone} />
                {toneExample.registerLabel && <p className="ipa-gallery-reading-mode">{toneExample.registerLabel}</p>}
              </>
            )}
            {(tone === "32" || tone === "4") && (
              <p className="ipa-gallery-caption">
                A checked tone: the examples end in a stop consonant.
              </p>
            )}
          </div>
        </div>
        <h3 className="ipa-gallery-examples-heading">
          Words with {pitchLetters(tone)} <span>{toneWords.length}</span>
        </h3>
        <WordExamples key={`tone-${tone}`} words={toneWords} tone={tone} />
        <p className="ipa-gallery-caption">
          Citation readings show syllables in isolation; connected speech
          includes tone changes. Either syllable may carry the highlighted tone.
        </p>
      </section>

      <section
        className="ipa-gallery-section ipa-gallery-sandhi"
        aria-labelledby="ipa-sandhi-heading"
      >
        <div>
          <h2 id="ipa-sandhi-heading">Tone changes in a word</h2>
          <p>
            In 飛機 “airplane”, the first syllable changes from 44 to 22. The
            second stays at 44. This example is documented by{" "}
            <a href={sandhiUrl} target="_blank" rel="noreferrer">
              Ge & Mok (2024), example 1
            </a>
            .
          </p>
        </div>
        <div className="ipa-gallery-plane">
          <div
            className="ipa-gallery-mode"
            role="group"
            aria-label="Airplane pronunciation context"
          >
            <button
              type="button"
              aria-pressed={!combined}
              onClick={() => setCombined(false)}
            >
              Separate syllables
            </button>
            <button
              type="button"
              aria-pressed={combined}
              onClick={() => setCombined(true)}
            >
              Together
            </button>
          </div>
          <div aria-live="polite" aria-atomic="true">
            <b lang="zh-Hant">飛機</b>
            <p className="ipa-gallery-transcription">
              [hui<mark>{combined ? "˨˨" : "˦˦"}</mark> ki˦˦]
            </p>
            <p className="ipa-gallery-romanization">
              hui{combined ? "22" : "44"} ki44
            </p>
            <span>
              {combined
                ? readingLabels["Connected speech"]
                : readingLabels.Citation}
            </span>
          </div>
        </div>
      </section>
      <footer className="ipa-gallery-footer">
        <p>
          Word readings: the explicitly Xiamen-labeled Sinological IPA entries
          on Wiktionary. Each example links to its recorded source revision. IPA
          tone letters display the same pitch values as the source’s numbers.
        </p>
        <p>Shared spellings simplify reading. IPA keeps the precise sound and detail.</p>
      </footer>
    </div>
  );
}
