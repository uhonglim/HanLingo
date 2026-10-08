import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const sounds = [
  {
    spelling: "p",
    ipa: "[p]",
    title: "Voiceless, unaspirated",
    description:
      "The lips close and release, without a strong puff of air. The vocal folds do not vibrate during the closure.",
    air: "Low",
    voice: "Off",
  },
  {
    spelling: "ph",
    ipa: "[pʰ]",
    title: "Voiceless, aspirated",
    description:
      "The same lip closure, followed by a noticeable puff of air before the next voiced sound begins.",
    air: "Strong",
    voice: "Off",
  },
  {
    spelling: "b",
    ipa: "[b]",
    title: "Voiced",
    description:
      "The lips close and release with vocal-fold vibration. Voicing is a different dimension from aspiration.",
    air: "Low",
    voice: "On",
  },
];

export default function RomanizationPage() {
  const [soundIndex, setSoundIndex] = useState(0);
  const sound = sounds[soundIndex];
  return (
    <div className="romanization-page">
      <section
        className="approach-section"
        id="approach"
        aria-labelledby="approach-title"
      >
        <div className="approach-intro">
          <h1 id="approach-title">Romanization</h1>
          <a
            className="text-link"
            href="https://www.internationalphoneticassociation.org/content/ipa-chart"
            target="_blank"
            rel="noreferrer"
          >
            IPA chart <ArrowRight size={15} />
          </a>
        </div>
        <div className="sound-lab">
          <div className="sound-lab-heading">
            <h2>p, ph, b</h2>
          </div>
          <div
            className="sound-tabs"
            role="tablist"
            aria-label="Explore consonant sound distinctions"
          >
            {sounds.map((item, index) => (
              <button
                role="tab"
                id={`sound-tab-${index}`}
                aria-selected={index === soundIndex}
                aria-controls="sound-panel"
                tabIndex={index === soundIndex ? 0 : -1}
                key={item.spelling}
                className={index === soundIndex ? "active" : ""}
                onClick={() => setSoundIndex(index)}
                onKeyDown={(event) => {
                  if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
                    event.preventDefault();
                    const next =
                      (index +
                        (event.key === "ArrowRight" ? 1 : -1) +
                        sounds.length) %
                      sounds.length;
                    setSoundIndex(next);
                    document.getElementById(`sound-tab-${next}`)?.focus();
                  }
                }}
              >
                <span>{item.spelling}</span>
                <span>{item.ipa}</span>
              </button>
            ))}
          </div>
          <div
            className="sound-panel"
            id="sound-panel"
            role="tabpanel"
            aria-labelledby={`sound-tab-${soundIndex}`}
          >
            <div className="sound-panel-title">
              <h3>{sound.title}</h3>
              <span className="ipa-large">{sound.ipa}</span>
            </div>
            <p>{sound.description}</p>
            <div className="sound-properties">
              <span>
                Aspiration <strong>{sound.air}</strong>
              </span>
              <span>
                Voicing <strong>{sound.voice}</strong>
              </span>
            </div>
          </div>
          <p className="sound-caveat">
            Agreed starting spellings <b>p / ph / b</b> → IPA{" "}
            <b>[p] / [pʰ] / [b]</b>. This illustrates three sounds, not a claim
            that every variety uses all three. The wider consonant inventory,
            vowels, and rules for tone changes are still being developed.
          </p>
        </div>
      </section>

      <section className="romanization-decisions">
        <div>
          <h2>Shared notation</h2>
          <p>
            The same sound receives the same spelling across varieties. Shared
            characters and related words can have different spellings when their
            sounds differ.
          </p>
        </div>
        <div className="decision-table">
          <div>
            <span>Sound reference</span>
            <strong>IPA</strong>
            <p>Specify the local variety and transcription convention.</p>
          </div>
          <div>
            <span>Vowel decision</span>
            <strong>
              â <small>→</small> [ɐ]
            </strong>
            <p>The circumflex identifies this vowel. It is not a tone mark.</p>
          </div>
          <div>
            <span>Tone decision</span>
            <strong>
              35 <small>→</small> [˧˥]
            </strong>
            <p>
              Use pitch-contour suffixes for now: 1 is low, 5 is high. Tone
              changes and detailed usage still need rules.
            </p>
          </div>
        </div>
      </section>
      <section className="working-alphabet">
        <div className="section-heading">
          <div>
            <h2>Spelling rules</h2>
          </div>
        </div>
        <div className="alphabet-table-scroll">
          <table>
            <thead>
              <tr>
                <th>Spelling</th>
                <th>IPA reference</th>
                <th>Working rule</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>p / ph / b</td>
                <td>[p] / [pʰ] / [b]</td>
                <td>
                  Distinguish voiceless unaspirated, voiceless aspirated, and
                  voiced stops.
                </td>
              </tr>
              <tr>
                <td>ch / chh</td>
                <td>[tɕ] / [tɕʰ]</td>
                <td>
                  Add h for aspiration, including after a multi-letter base.
                </td>
              </tr>
              <tr>
                <td>ts / tsh</td>
                <td>[t͡s] / [t͡sʰ]</td>
                <td>Keep alveolar affricates distinct from ch / chh.</td>
              </tr>
              <tr>
                <td>â</td>
                <td>[ɐ]</td>
                <td>A vowel-quality symbol. Tone is written separately.</td>
              </tr>
              <tr>
                <td>35 / 51</td>
                <td>[˧˥] / [˥˩]</td>
                <td>
                  Suffixes describe pitch movement, not language-specific tone
                  categories.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="word-study">
          <div>
            <span>Amoy</span>
            <span className="example-han" lang="zh-Hant">
              茶 · tea
            </span>
            <strong>te24</strong>
            <span className="example-ipa">[te˨˦]</span>
          </div>
          <p>
            The Amoy word for tea pairs the sounds <b>[te]</b> with a rising
            citation tone <b>[˨˦]</b>, written <b>24</b>.{" "}
            <Link to="/min/southern-min/xiamen/words?q=茶">
              Word source
            </Link>
          </p>
        </div>
        <p className="reading-note">
          The same letters must not silently change their IPA value across
          varieties. For example, a Cantonese vowel transcribed [ɪ] or [e] needs
          to remain distinct from Mandarin [i].
        </p>
        <div className="method-source-links">
          <a
            href="https://doi.org/10.1017/S0025100303001208"
            target="_blank"
            rel="noreferrer"
          >
            Lee & Zee · Standard Chinese
          </a>
          <a
            href="https://jyutping.org/en/jyutping/"
            target="_blank"
            rel="noreferrer"
          >
            Jyutping · Cantonese IPA reference
          </a>
          <a
            href="https://www.internationalphoneticassociation.org/content/ipa-chart"
            target="_blank"
            rel="noreferrer"
          >
            Official IPA chart
          </a>
        </div>
      </section>
      <section className="method-principles">
        <h2>Design principles</h2>
        <div className="principles-grid">
          <article>
            <h3>Sound and spelling</h3>
            <p>
              IPA is our reference for pronunciation. Romanization is a
              practical writing system whose spellings need a clear, explicit
              relationship to those sounds.
            </p>
          </article>
          <article>
            <h3>Local varieties</h3>
            <p>
              Each entry names its variety and preserves the sound distinctions
              used by its speakers.
            </p>
          </article>
          <article>
            <h3>Unfinished rules</h3>
            <p>
              The first rules cover p / ph / b, ch / chh, ts / tsh, â, and
              pitch-contour suffixes. The remaining consonants, vowels, syllable
              boundaries, and connected speech still need decisions and testing.
            </p>
          </article>
        </div>
        <div className="method-open">
          <h3>Open questions</h3>
          <p>
            Unresolved choices include connected-speech tone changes, spellings
            for [s], [ɕ], and [ʂ], syllable boundaries, and the level of
            phonetic detail to represent.
          </p>
        </div>
      </section>
    </div>
  );
}
