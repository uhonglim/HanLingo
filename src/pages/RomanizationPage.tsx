import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { xiamenWords } from "../data/xiamen-lexicon";
import { pitchLetters, xiamenSpellingKey } from "../data/xiamen-romanization";
import { convertIpa } from "../data/romanization-method";
import "./RomanizationPage.css";

const marks = [
  [
    "[ã]",
    "ã",
    "Nasalization",
    "Keep the tilde on the vowel; a nasal vowel is distinct from a following n or ng.",
  ],
  [
    "[ŋ̍] / [ŋ̩]",
    "ng̍",
    "Syllabic nasal",
    "The nasal itself forms the syllable. These two IPA diacritics are equivalent placements.",
  ],
  ["[m̩]", "m̩", "Syllabic m", "Keep the syllabicity mark."],
  [
    "[p̚] / [t̚] / [k̚]",
    "p̚ / t̚ / k̚",
    "Unreleased endings",
    "Keep the unreleased mark when the source supplies it.",
  ],
  [
    "[aː]",
    "aː",
    "Length",
    "Keep ː when supplied. A doubled vowel such as trial oo names a vowel quality, not length.",
  ],
];
const sharedLetters = "a d e f g h i j k l m n o r s t u w y";

export default function RomanizationPage() {
  const [input, setInput] = useState("[te˨˦]");
  const [wordId, setWordId] = useState("tea");
  const [query, setQuery] = useState("");
  const selectedWord = xiamenWords.find((word) => word.id === wordId);
  const conversion = useMemo(() => {
    try {
      return { syllables: convertIpa(input), error: "" };
    } catch (error) {
      return {
        syllables: [],
        error: error instanceof Error ? error.message : "Unsupported input.",
      };
    }
  }, [input]);
  const rules = xiamenSpellingKey.filter((rule) =>
    `${rule.ipa} ${rule.spelling} ${rule.status}`
      .normalize("NFC")
      .toLowerCase()
      .includes(query.normalize("NFC").toLowerCase().trim()),
  );
  const loadWord = (id: string) => {
    const word = xiamenWords.find((item) => item.id === id);
    if (word) {
      setWordId(id);
      setInput(word.ipa);
    }
  };
  return (
    <div className="roman-method">
      <header className="roman-header">
        <h1>HanLingo romanization</h1>
        <p>
          Shared sound-to-spelling rules for Han languages, with each locality’s
          pronunciation and pitch preserved. The current implementation covers Amoy.
        </p>
        <div className="roman-core" aria-label="Agreed stop consonants">
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
                <label htmlFor="roman-ipa">IPA with tones</label>
                <select
                  aria-label="Load an Amoy word"
                  value={wordId}
                  onChange={(event) => loadWord(event.target.value)}
                >
                  <option value="">Custom IPA</option>
                  {xiamenWords.map((word) => (
                    <option key={word.id} value={word.id}>
                      {word.han} · {word.english}
                    </option>
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
              <p id="roman-input-help" className="roman-note">
                [te˨˦] or te24 · Separate syllables with spaces. Supplied sounds only;
                the converter does not predict pronunciation.
              </p>
            </div>
            <div className="roman-result" aria-live="polite" aria-atomic="true">
              {conversion.error ? (
                <p className="roman-error">{conversion.error}</p>
              ) : (
                <>
                  <span>HanLingo <small>Working spelling</small></span>
                  <output htmlFor="roman-ipa">
                    {conversion.syllables
                      .map((syllable) => syllable.spelling)
                      .join(" ")}
                  </output>
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
                          {step.spelling}
                        </strong>
                        <small>{step.status}</small>
                      </li>
                    ))}
                    <li>
                      <span className="roman-symbol">
                        {pitchLetters(syllable.tone)}
                      </span>
                      <span aria-hidden="true">→</span>
                      <strong>{syllable.tone}</strong>
                      <small>Pitch contour</small>
                    </li>
                  </ul>
                </div>
              ))}
            </div>
          )}
          {selectedWord && (
            <div className="roman-word-source">
              <strong lang="zh-Hant">{selectedWord.han}</strong>
              <span>
                {selectedWord.english} · Amoy ·{" "}
                {selectedWord.readingMode.toLowerCase()}
              </span>
              <a href={selectedWord.sourceUrl} target="_blank" rel="noreferrer">
                Reading source
              </a>
              <p>{selectedWord.note}</p>
            </div>
          )}
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
          <b>Agreed</b> rules are settled starting points. <b>Trial</b> spellings
          remain open to revision.
        </p>
        <div className="roman-key-layout">
          <div className="roman-table-wrap">
            <table>
              <thead>
                <tr>
                  <th scope="col">IPA</th>
                  <th scope="col">HanLingo</th>
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
                p → ph, ts → tsh, ch → chh. The whole base spelling receives h. A
                standalone h still represents [h] in the working key.
              </p>
            </div>
            <div>
              <h3>Different places of articulation</h3>
              <p>
                ts / tsh represent [t͡s] / [t͡sʰ]; ch / chh represent [tɕ] / [tɕʰ].
                They remain separate even when another spelling system uses the
                same letters.
              </p>
            </div>
            <div>
              <h3>Vowels stay separate from tone</h3>
              <p>
                Trial â represents [ɐ], not a tone. Trial oo, oe, er, and ae
                represent [ɔ], [ɤ], [ə], and [ɛ]. Tone follows the syllable as
                numbers.
              </p>
            </div>
          </div>
        </div>
        <details className="roman-details">
          <summary>Letters retained in the current implementation</summary>
          <p className="roman-symbol">{sharedLetters}</p>
          <p>
            These letters keep their IPA values as trial spellings. For example,
            j means [j] and y means [y]. They are not Pinyin values, and this
            list is not a claim that every variety uses every sound. The wider
            Han inventory still needs review.
          </p>
        </details>
      </section>

      <section className="roman-section" aria-labelledby="roman-tones-title">
        <h2 id="roman-tones-title">Pitch contours</h2>
        <p>
          Append the supplied contour to each syllable. 1 is low and 5 is high,
          relative to the speaker’s range. These are pitch levels, not
          measurements in hertz.
        </p>
        <div className="roman-tones">
          {["44", "24", "53", "21", "22", "32", "4"].map((tone) => (
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
          The seven contours above occur in the current Amoy word set. A single
          4 gives a pitch level; it does not itself mark a stop ending or
          duration. Preserve the source’s contour notation.
        </p>
        <div className="roman-tone-example">
          <h3>Connected speech · 飛機</h3>
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
          The working spelling retains these IPA marks until we settle dedicated
          conventions.
        </p>
        <div className="roman-table-wrap">
          <table>
            <thead>
              <tr>
                <th scope="col">IPA</th>
                <th scope="col">Working spelling</th>
                <th scope="col">What stays distinct</th>
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
              {xiamenWords.length} Amoy words use the same conversion code as
              this page. Their broad dictionary IPA, source readings, and
              citation or connected-speech status remain attached to each word.
            </p>
            <Link to="/min/southern-min/xiamen/words">Amoy words</Link>
          </div>
          <div>
            <h3>Next decisions</h3>
            <p>
              The full vowel inventory; candidate sh for [ɕ] versus a distinct
              spelling for [ʂ]; voiced affricates; phonation; syllable
              boundaries; and consistent detail across sources. Digraphs such as
              ng still need boundary rules. The converter does not validate
              phonotactics or provide a universal reverse conversion.
            </p>
          </div>
        </div>
        <p>
          A shared character can have different spellings when its local sounds
          differ. Min, Mandarin, Yue, Hakka, and Wu each need locality-specific
          inventories and pronunciation evidence. This is our working proposal, not a
          completed standard or an automatic character-to-speech system.
          Documented place names such as Ko-hiông retain their source spelling;
          they are not silently converted into HanLingo spelling.
        </p>
        <div className="roman-sources">
          <a
            href="https://www.internationalphoneticassociation.org/content/ipa-chart"
            target="_blank"
            rel="noreferrer"
          >
            Official IPA chart
          </a>
          <Link to="/min/southern-min/xiamen/sounds">Amoy IPA gallery</Link>
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
