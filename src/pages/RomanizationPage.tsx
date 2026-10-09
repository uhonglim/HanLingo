import { siteTerms } from "../data/site-terms";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { AttestedWord } from "../data/learning/types";
import { pitchLetters } from "../data/xiamen-romanization";
import { convertIpa, conversionRules } from "../data/romanization-method";
import { placeNamePronunciations, placeNameSpelling } from "../data/place-name-pronunciations";
import {
  romanizationGroups,
  romanizationReadings as readingExamples,
} from "../data/romanization-examples";
import "./RomanizationPage.css";

const marks = [
  [
    "[ã]",
    "a~",
    "Nasalization",
    "Write ~ after the nasalized vowel. It does not add an n or ng ending.",
  ],
  [
    "[ŋ̍] / [ŋ̩]",
    "ng",
    "Syllabic nasal",
    "The nasal itself forms the syllable. The spelling omits the syllabicity mark; IPA retains it.",
  ],
  ["[m̩]", "m", "Syllabic m", "The IPA mark shows that m forms the syllable."],
  [
    "[p̚] / [t̚] / [k̚]",
    "p / t / k",
    "Unreleased endings",
    "The ending stays; its unreleased detail remains in IPA.",
  ],
  [
    "[a̤] / [a̰]",
    "a̤ / a̰",
    "Breathy and creaky voice",
    "Keep the source’s phonation mark. It is separate from vowel quality and tone.",
  ],
  [
    "[m̥] / [s̬]",
    "m̥ / s̬",
    "Voicing detail",
    "Keep a supplied voiceless or voiced diacritic; do not replace it with a different consonant.",
  ],
  [
    "[aː]",
    "a:",
    "Length",
    "Write : only for supplied length. A doubled vowel such as oo names a vowel quality, not length.",
  ],
];

const featuredReadings = [
  {
    localityId: "beijing-city", han: "說",
    title: "sh, not sr",
    note: "[ʂ], [ʃ], and [ɕ] share sh. The simpler spelling keeps s separate; IPA preserves tongue position.",
  },
  {
    localityId: "zhangzhou", han: "飯",
    title: "A nasal vowel",
    note: "~ follows the vowel it nasalizes. It is not a final n or ng.",
  },
  {
    localityId: "guangzhou", han: "心",
    title: "A vowel worth keeping",
    note: "ă keeps [ɐ] distinct from a. Merging them would make this source’s 三 and 心 identical in spelling and tone. The breve marks vowel quality, never tone.",
  },
].map((example) => {
  const word = readingExamples.find((item) =>
    item.localityId === example.localityId && item.han === example.han,
  );
  if (!word) throw new Error(`Missing workshop reading: ${example.localityId} ${example.han}`);
  return { ...example, word };
});
const initialWord = readingExamples.find(word => word.id.endsWith(':beijing-city-ipa-ash'))!;
const cantonVowelContrast = ['三', '心'].map(han => readingExamples.find(word => word.localityId === 'guangzhou' && word.han === han)!);
const sharedSpellingExample = ["衣", "煙"].map((han) => {
  const word = readingExamples.find((item) => item.localityId === "suzhou" && item.han === han);
  if (!word) throw new Error(`Missing Suzhou spelling contrast: ${han}`);
  return word;
});

export default function RomanizationPage() {
  const [input, setInput] = useState(initialWord.ipa);
  const [wordId, setWordId] = useState(initialWord.id);
  const [query, setQuery] = useState("");
  const [toneNotation, setToneNotation] = useState<NonNullable<AttestedWord["toneNotation"]>>("pitch-contour");
  const selectedWord = readingExamples.find((word) => word.id === wordId);
  const conversion = useMemo(() => {
    try {
      return { syllables: convertIpa(input, toneNotation), error: "" };
    } catch (error) {
      return {
        syllables: [],
        error: error instanceof Error ? error.message : "Unsupported input.",
      };
    }
  }, [input, toneNotation]);
  const rules = conversionRules
    .filter((rule) => !/^\p{M}/u.test(rule.ipa) && rule.ipa !== "ː")
    .filter((rule) =>
      `${rule.ipa} ${rule.spelling} ${rule.status} ${rule.note ?? ""}`
        .normalize("NFC")
        .toLowerCase()
        .includes(query.normalize("NFC").toLowerCase().trim()),
    );
  const loadWord = (id: string) => {
    setWordId(id);
    const word = readingExamples.find((item) => item.id === id);
    if (word) {
      setInput(word.ipa);
      setToneNotation(word.toneNotation ?? "unspecified");
    } else {
      setToneNotation("pitch-contour");
    }
  };
  return (
    <div className="roman-method">
      <header className="roman-header">
        <h1>HanLingo romanization</h1>
        <p>
          The same IPA gets the same spelling everywhere. Some sounds share a
          spelling to make it easier to read; the source IPA keeps the full
          distinction. One shared proposal for Mandarin, Min, Yue, Hakka, and Wu.
        </p>
        <div className="roman-core" aria-label="Core stop consonants">
          {[
            ["[p]", "p", "Unaspirated"],
            ["[pʰ]", "ph", "Aspirated"],
            ["[b]", "b", "Voiced"],
          ].map(([ipa, spelling, label]) => (
            <div key={ipa}>
              <span>{ipa}</span>
              <ArrowRight size={20} aria-hidden="true" />
              <strong>{spelling}</strong>
              <small>{label}</small>
            </div>
          ))}
        </div>
      </header>

      <section
        className="roman-section"
        aria-labelledby="roman-converter-title"
      >
        <h2 id="roman-converter-title">IPA → HanLingo</h2>
        <div className="roman-converter">
          <div className="roman-conversion-grid">
            <div className="roman-input">
              <div className="roman-input-heading">
                <label htmlFor="roman-ipa">Source IPA</label>
                <select
                  aria-label="Load a sourced reading"
                  value={wordId}
                  onChange={(event) => loadWord(event.target.value)}
                >
                  <option value="">Custom IPA</option>
                  {romanizationGroups.map((group) => (
                    <optgroup key={group.id} label={group.name}>
                      {group.readings.map((word) => (
                        <option key={word.id} value={word.id}>
                          {word.locality} · {word.han} · {word.english}
                          {word.spelling ? "" : " · mapping open"}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>
              <textarea
                id="roman-ipa"
                value={input}
                onChange={(event) => {
                  setInput(event.target.value);
                  setWordId("");
                }}
                rows={3}
                spellCheck={false}
                aria-describedby="roman-input-help"
                maxLength={500}
              />
              <div className="roman-notation">
                <label htmlFor="roman-tone-notation">Tone notation</label>
                <select
                  id="roman-tone-notation"
                  value={toneNotation}
                  onChange={(event) => {
                    setToneNotation(event.target.value as NonNullable<AttestedWord["toneNotation"]>);
                    setWordId("");
                  }}
                >
                  <option value="pitch-contour">Pitch contours</option>
                  <option value="source-category">Source tone categories</option>
                  <option value="unspecified">Tones not supplied</option>
                </select>
              </div>
              <p id="roman-input-help" className="roman-note">
                Separate syllables with spaces. Choose the source’s tone notation;
                the converter does not infer missing pronunciation.
              </p>
            </div>
            <div className="roman-result" aria-live="polite" aria-atomic="true">
              {conversion.error ? (
                <p className="roman-error">{conversion.error}</p>
              ) : (
                <>
                  <span>{siteTerms.spelling}</span>
                  <output htmlFor="roman-ipa">
                    {conversion.syllables
                      .map((syllable) => syllable.spelling)
                      .join(" ")}
                  </output>
                  {toneNotation !== "pitch-contour" && (
                    <p className="roman-note">
                      {toneNotation === "source-category"
                        ? "·T marks a source tone category, not a pitch contour."
                        : "Tones not supplied · segment spelling only."}
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
          {conversion.syllables.length > 0 && (
            <div className="roman-breakdown">
              {conversion.syllables.map((syllable, index) => (
                <div key={index} className="roman-syllable">
                  <h3>
                    [{syllable.ipa}] <ArrowRight size={15} aria-hidden="true" />{" "}
                    {syllable.spelling}
                  </h3>
                  <ul>
                    {syllable.steps.map((step, i) => (
                      <li key={i}>
                        <span className="roman-symbol">{`[${/^\p{M}/u.test(step.ipa) ? "◌" : ""}${step.ipa}]`}</span>
                        <span aria-hidden="true">→</span>
                        <strong>
                          {/^\p{M}/u.test(step.spelling) ? "◌" : ""}
                          {step.spelling || "omitted"}
                        </strong>
                        <small>{step.status}</small>
                      </li>
                    ))}
                    {syllable.tone && (
                      <li>
                        <span className="roman-symbol">
                          {toneNotation === "pitch-contour" ? pitchLetters(syllable.tone) : syllable.tone}
                        </span>
                        <span aria-hidden="true">→</span>
                        <strong>{toneNotation === "source-category" ? `·T${syllable.tone}` : syllable.tone}</strong>
                        <small>{toneNotation === "source-category" ? "Source tone category" : "Pitch contour"}</small>
                      </li>
                    )}
                  </ul>
                </div>
              ))}
            </div>
          )}
          {selectedWord && (
            <div className="roman-word-source">
              <strong lang="zh-Hant">{selectedWord.han}</strong>
              <span>
                {selectedWord.english} · {selectedWord.locality} ·{" "}
                {selectedWord.reading}
              </span>
              <a
                href={selectedWord.source.url}
                target="_blank"
                rel="noreferrer"
              >
                Reading source
              </a>
              {selectedWord.registerLabel && (
                <p className="roman-register">{selectedWord.registerLabel}</p>
              )}
              <p>{selectedWord.note}</p>
            </div>
          )}
        </div>
      </section>

      <section className="roman-section" aria-labelledby="roman-reading-title">
        <h2 id="roman-reading-title">Read the spelling</h2>
        <div className="roman-featured">
          {featuredReadings.map(({ title, note, word }) => (
            <article key={word.id}>
              <h3>{title}</h3>
              <div className="roman-example-word">
                <strong lang="zh-Hant">{word.han}</strong>
                <span>{word.english} · {word.locality}</span>
              </div>
              <div className="roman-example-sound">
                <span>{word.displayIpa}</span>
                <ArrowRight size={16} aria-hidden="true" />
                <strong>{word.spelling}</strong>
              </div>
              {word.registerLabel && <p className="roman-register">{word.registerLabel}</p>}
              <p>{note}</p>
              <a href={word.source.url} target="_blank" rel="noreferrer">Reading source</a>
            </article>
          ))}
        </div>
      </section>

      <section className="roman-section" aria-labelledby="roman-groups-title">
        <h2 id="roman-groups-title">Across five groups</h2>
        <p>
          Local readings, shared rules. Open a source for its speaker, reading
          convention, and context.
        </p>
        <div className="roman-groups">
          {romanizationGroups.map((group) => (
            <article
              className="roman-group"
              key={group.id}
              aria-labelledby={`roman-group-${group.id}`}
            >
              <header>
                <h3 id={`roman-group-${group.id}`}>
                  <Link to={`/${group.id}`}>{group.name}</Link>
                </h3>
                <span lang="zh-Hant">{group.nativeName}</span>
              </header>
              <div className="roman-examples">
                {group.examples.map((word) => (
                  <div className="roman-example" key={word.id}>
                    <Link
                      className="roman-example-place"
                      to={`${word.localityPath}/words`}
                    >
                      {word.locality}
                    </Link>
                    <div className="roman-example-word">
                      <strong lang="zh-Hant">{word.han}</strong>
                      <span>{word.english}</span>
                    </div>
                    {word.registerLabel && (
                      <p className="roman-register">{word.registerLabel}</p>
                    )}
                    <div className="roman-example-sound">
                      <span>{word.displayIpa}</span>
                      <ArrowRight size={16} aria-hidden="true" />
                      <strong>{word.spelling}</strong>
                    </div>
                    {word.toneNotation !== "pitch-contour" && (
                      <p className="roman-note">
                        {word.toneNotation === "source-category"
                          ? "·T marks source tone categories, not pitch."
                          : "Tones not supplied · segment spelling only."}
                      </p>
                    )}
                    <details>
                      <summary>Reading and source</summary>
                      <p>
                        {word.reading}. {word.note}
                      </p>
                      <a
                        href={word.source.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {word.source.title}
                      </a>
                    </details>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="roman-section" aria-labelledby="roman-rules-title">
        <div className="roman-section-heading">
          <h2 id="roman-rules-title">Sound key</h2>
          <input
            aria-label="Search sound mappings"
            type="search"
            placeholder="IPA or spelling"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        <p>
          <b>Core</b> marks direct mappings; <b>Shared</b> groups different
          IPA sounds under one spelling. <b>Detail</b> simplifies a phonetic mark;
          <b> Retained</b> keeps it. These are HanLingo conventions, not source
          romanizations.
        </p>
        <div className="roman-key-layout">
          <div className="roman-table-wrap">
            <table>
              <thead>
                <tr>
                  <th scope="col">IPA</th>
                  <th scope="col">{siteTerms.spelling}</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {rules.map((rule) => (
                  <tr key={rule.ipa}>
                    <td className="roman-symbol">[{rule.ipa}]</td>
                    <td>
                      <strong>{rule.spelling}</strong>
                    </td>
                    <td>{rule.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!rules.length && <p>No matching sound.</p>}
          </div>
          <div className="roman-rule-notes roman-key-notes">
            <div>
              <h3>h marks aspiration</h3>
              <p>
                p → ph, ts → tsh, ch → chh. The whole base spelling receives h.
                Standalone h covers [h], [x], and [χ]; it is not always the
                English h sound.
              </p>
            </div>
            <div>
              <h3>Shared spellings, distinct sounds</h3>
              <p>
                ch covers [tɕ], [tʃ], and [tʂ]; sh covers [ɕ], [ʃ], and [ʂ].
                Write sha for [ʂa], not sra. s / ts / tsh stay separate.
                hl marks [ɬ], while
                ḅ / ḍ keep implosives [ɓ] / [ɗ] separate from b / d.
                A shared spelling does not make two sounds identical.
              </p>
            </div>
            <div aria-labelledby="roman-shared-example">
              <h3 id="roman-shared-example">Same spelling, different sounds</h3>
              {sharedSpellingExample.map((word) => (
                <p key={word.id}>
                  <span lang="zh-Hant">{word.han}</span> “{word.english}” {word.displayIpa}
                  {" → "}<strong>{word.spelling}</strong>
                </p>
              ))}
              <p>
                These Suzhou readings both use {sharedSpellingExample[0].spelling}. Their vowels are different;
                use the IPA to distinguish them. The shared spelling is a reading
                aid, not a claim that they sound the same.{" "}
                <a href={sharedSpellingExample[0].source.url} target="_blank" rel="noreferrer">
                  Suzhou vowel study
                </a>
              </p>
            </div>
            <div>
              <h3>Vowels stay separate from tone</h3>
              <p>
                ă represents [ɐ]; a~ represents nasal [ã]. ae / oo preserve
                [ɛ] / [ɔ], while eo covers [ə] and [ɜ]. eu is [ɤ]; yu is
                [y] or [ʏ]; oe covers [ø] and [œ]. Digraphs name vowel
                qualities; only : marks supplied length.
              </p>
              {cantonVowelContrast.map(word => <p key={word.id}>
                <span lang="zh-Hant">{word.han}</span> “{word.english}” {word.displayIpa}
                {' → '}<strong>{word.spelling}</strong>
              </p>)}
              <p>This Canton table does not mark length. We keep its vowel contrast instead of guessing long vowels.{' '}
                <a href={cantonVowelContrast[0].source.url} target="_blank" rel="noreferrer">Canton source table</a>
              </p>
            </div>
          </div>
        </div>
        <p className="roman-note">
          y represents IPA [j]; j represents [dʑ], [dʒ], or [dʐ].
          r covers [r], [ɹ], and [ɻ]; fricative [ʐ] uses zh. Explicit [i̯],
          [u̯], and [y̯] become y, w, and yw. Plain vowels are never silently
          reinterpreted as glides. Not every variety uses every sound in this key.
        </p>
      </section>

      <section className="roman-section" aria-labelledby="roman-tones-title">
        <h2 id="roman-tones-title">Pitch contours</h2>
        <p>
          Append the supplied contour to each syllable. 1 is low and 5 is high,
          relative to the speaker’s range. These are pitch levels, not
          measurements in hertz.
        </p>
        <div className="roman-tones">
          {["5", "35", "213", "24", "53", "21", "4"].map((tone) => (
            <div key={tone}>
              <svg
                viewBox="0 0 100 70"
                role="img"
                aria-label={`Pitch contour ${tone}`}
              >
                <path d="M10 10H90M10 60H90" className="roman-tone-guide" />
                <polyline
                  points={(tone.length === 1 ? [tone, tone] : [...tone])
                    .map(
                      (digit, index, array) =>
                        `${10 + (index * 80) / (array.length - 1)},${70 - Number(digit) * 12}`,
                    )
                    .join(" ")}
                />
              </svg>
              <strong>{tone}</strong>
              <span>{pitchLetters(tone)}</span>
            </div>
          ))}
        </div>
        <p className="roman-note">
          These are examples of pitch notation, not a shared seven-tone
          inventory. Each locality has its own tone system. A single 4 gives one
          pitch level; it does not mark a stop ending or duration. Keep the
          source’s notation.
        </p>
        <div className="roman-tone-example">
          <h3>Amoy connected speech · 飛機</h3>
          <div>
            <span>[hui˦˦ ki˦˦]</span>
            <ArrowRight size={18} aria-hidden="true" />
            <strong>[hui˨˨ ki˦˦]</strong>
          </div>
          <div>
            <span>hui44 ki44</span>
            <ArrowRight size={18} aria-hidden="true" />
            <strong>hui22 ki44</strong>
          </div>
          <p>
            The first syllable changes in this documented Amoy example. We write
            the attested surface tones and keep citation readings
            distinguishable; the converter does not apply tone changes
            automatically.
          </p>
          <a
            href="https://ling.cuhk.edu.hk/people/peggy/SP2024_GeMok_Phonotactics.pdf"
            target="_blank"
            rel="noreferrer"
          >
            Ge & Mok · Amoy tone sandhi
          </a>
        </div>
        <p>
          Numbers in other romanizations may identify tone categories. A
          Jyutping 2, for example, represents [˧˥] in its published chart; that
          contour becomes 35 here. Copying its digit 2 would change the meaning
          of the notation.{" "}
          <a
            href="https://jyutping.org/en/jyutping/"
            target="_blank"
            rel="noreferrer"
          >
            Jyutping reference
          </a>
        </p>
      </section>

      <section className="roman-section">
        <h2>Phonetic detail</h2>
        <p>
          Nasality and length receive simple marks. Syllabicity and unreleased
          endings stay in IPA; phonation and voicing marks remain in both.
        </p>
        <div className="roman-table-wrap">
          <table>
            <thead>
              <tr>
                <th scope="col">IPA</th>
                <th scope="col">{siteTerms.spelling}</th>
                <th scope="col">How to read it</th>
              </tr>
            </thead>
            <tbody>
              {marks.map(([ipa, spelling, label, note]) => (
                <tr key={label}>
                  <td className="roman-symbol">{ipa}</td>
                  <td>
                    <strong>{spelling}</strong>
                  </td>
                  <td>
                    <b>{label}</b>
                    <p>{note}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="roman-section">
        <h2>Scope and open decisions</h2>
        <div className="roman-rule-notes roman-scope">
          <div>
            <h3>Working material</h3>
            <p>
              {readingExamples.length} sourced readings are available above.
              Supported IPA uses the same spelling rules across localities.
              Source readings and citation or connected-speech qualifications
              stay attached to each word.
            </p>
            <p>
              Readings with no supplied tones receive segment spellings only.
              Source tone categories use ·T followed by the original category;
              they never become pitch contours. Source spelling alone cannot
              supply missing IPA.
            </p>
          </div>
          <div>
            <h3>Names follow local speech</h3>
            <p>
              Shanghai is the common name. Its sourced Shanghai reading{' '}
              [{placeNamePronunciations.shanghai.ipa}] becomes{' '}
              <strong>{placeNameSpelling('shanghai')}</strong>, not shang or srang.
              The source uses tone categories.{' '}
              <a href={placeNamePronunciations.shanghai.source.url} target="_blank" rel="noreferrer">Shanghai name source</a>
            </p>
            <p>
              This is a reading aid, not a reversible phonetic alphabet. Shared
              spellings cannot reconstruct the original IPA. The converter does
              not infer pronunciation, apply tone sandhi, or validate syllables.
              The expanded key remains a proposal; source IPA and documented
              local reading conventions remain the reference.
            </p>
          </div>
        </div>
        <div className="roman-table-wrap">
          <table className="roman-coverage">
            <caption>Current converter coverage</caption>
            <thead>
              <tr>
                <th scope="col">Group</th>
                <th scope="col">Mapped readings</th>
                <th scope="col">Readings with unresolved sounds</th>
              </tr>
            </thead>
            <tbody>
              {romanizationGroups.map((group) => (
                <tr key={group.id}>
                  <th scope="row">{group.name}</th>
                  <td>{group.mapped}</td>
                  <td>
                    {group.unresolved.length}
                    {group.unresolved.length > 0 && (
                      <details>
                        <summary>See source IPA</summary>
                        <ul>
                          {group.unresolved.map((word) => (
                            <li key={word.id}>
                              <a
                                href={word.source.url}
                                target="_blank"
                                rel="noreferrer"
                              >
                                {word.locality} · {word.han}
                              </a>{" "}
                              <span className="roman-symbol">
                                {word.displayIpa}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </details>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          A shared character can have different spellings when its local sounds
          differ. Min, Mandarin, Yue, Hakka, and Wu each need locality-specific
          inventories and pronunciation evidence. This is our working proposal,
          not a completed standard or an automatic character-to-speech system.
          Common place names stay familiar. Their pronunciation labels use HanLingo
          spelling derived from documented IPA; source romanizations remain in
          the reference notes.
        </p>
        <div className="roman-sources">
          <a
            href="https://www.internationalphoneticassociation.org/content/ipa-chart"
            target="_blank"
            rel="noreferrer"
          >
            Official IPA chart
          </a>

          <a
            href="https://github.com/uhonglim/HanLingo"
            target="_blank"
            rel="noreferrer"
          >
            HanLingo source code
          </a>
        </div>
      </section>
    </div>
  );
}
