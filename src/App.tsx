import { useState } from "react";
import type { CSSProperties } from "react";
import {
  ArrowDown,
  ArrowRight,
  Check,
  ChevronDown,
  ChevronRight,
  GitBranch,
  Github,
  Globe2,
  MapPin,
  Menu,
  X,
} from "lucide-react";
import AtlasMap from "./components/AtlasMap";
import { languages, letters, mapPoints } from "./data/languages";
import type { LanguageId } from "./data/languages";

const soundNotes: Record<LanguageId, string> = {
  mandarin:
    "Standard Mandarin contrasts aspiration and lacks syllable-final [p], [t], and [k]; regional Mandarin varieties can differ.",
  min: "Southern Min varieties often distinguish literary and colloquial readings, with extensive tone changes when syllables combine in speech.",
  yue: "Cantonese preserves syllable-final [p̚], [t̚], and [k̚], producing shorter checked syllables alongside its other tone-bearing syllables.",
  hakka:
    "Meixian Hakka preserves final [p], [t], [k], [m], [n], and [ŋ], alongside its own local tone patterns.",
  wu: "Shanghai Wu combines voice-quality distinctions with tone patterns that extend across syllables within a word.",
};

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

function App() {
  const [languageId, setLanguageId] = useState<LanguageId>("min");
  const [subgroupId, setSubgroupId] = useState<string>("");
  const [pointId, setPointId] = useState<string | null>(null);
  const [leftLetter, setLeftLetter] = useState<string>("min");
  const [rightLetter, setRightLetter] = useState<string>("yue");
  const [fullLetter, setFullLetter] = useState(false);
  const [translation, setTranslation] = useState(false);
  const [soundIndex, setSoundIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [sourcesOpen, setSourcesOpen] = useState(false);
  const language = languages.find((item) => item.id === languageId)!;
  const subgroup =
    language.subgroups.find((item) => item.id === subgroupId) ??
    language.subgroups[0];
  const points = mapPoints.filter(
    (point) => point.groupId === languageId && point.subgroupId === subgroup.id,
  );
  const point =
    mapPoints.find(
      (item) => item.id === pointId && item.groupId === languageId,
    ) ?? points[0];
  const sound = sounds[soundIndex];

  function chooseLanguage(id: LanguageId) {
    setLanguageId(id);
    setSubgroupId("");
    setPointId(null);
  }

  function choosePoint(id: string) {
    const selected = mapPoints.find((item) => item.id === id);
    if (!selected) return;
    setLanguageId(selected.groupId);
    setSubgroupId(selected.subgroupId);
    setPointId(id);
  }

  function navigate() {
    setMenuOpen(false);
  }

  function renderLetter(id: string, side: "left" | "right") {
    const letter = letters.find((item) => item.id === id)!;
    const relatedLanguage = languages.find((item) => item.id === id);
    const isFormal = id === "formal";
    const paragraphs = fullLetter
      ? letter.paragraphs
      : letter.paragraphs.slice(0, 1);
    return (
      <article
        className="letter-sheet"
        style={
          {
            "--letter-color": relatedLanguage?.color ?? "#66756c",
          } as CSSProperties
        }
      >
        <div className="letter-select-row">
          <span className="letter-dot" />
          <div className="select-wrap">
            <label className="sr-only" htmlFor={`${side}-letter`}>
              {side === "left" ? "First" : "Second"} letter variety
            </label>
            <select
              id={`${side}-letter`}
              value={id}
              onChange={(event) =>
                side === "left"
                  ? setLeftLetter(event.target.value)
                  : setRightLetter(event.target.value)
              }
            >
              {letters.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
            <ChevronDown size={16} aria-hidden="true" />
          </div>
          <span className="letter-native" lang="zh-Hant">
            {letter.nativeName}
          </span>
        </div>
        <div className="letter-place">
          <span>{isFormal ? "WRITTEN REFERENCE" : "LOCAL VOICE"}</span>
          {letter.place}
        </div>
        <div className="letter-body" lang="zh-Hant">
          <p className="salutation">{letter.salutation}</p>
          {paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
          {fullLetter && <p className="letter-closing">{letter.closing}</p>}
        </div>
        {translation && (
          <div className="translation">
            <span>SHARED MEANING · ENGLISH</span>
            <p>Mom,</p>
            <p>
              I’ve been here for a week. I’m eating and sleeping well, so don’t
              worry.
            </p>
            {fullLetter && (
              <>
                <p>
                  Yesterday, I went to the market with a friend. I saw the cakes
                  you love and bought a box to bring home for you.
                </p>
                <p>
                  It’s been a little cold lately. Remember to wear something
                  warmer when you go out. If I have time next month, I’ll come
                  home, sit with you, and have a good, long chat.
                </p>
                <p>Your son, who misses you</p>
              </>
            )}
          </div>
        )}
        <div className="letter-footnote">
          {isFormal
            ? "A shared written register, not a sixth spoken group."
            : "Contributor sample · awaiting local-speaker review"}
        </div>
      </article>
    );
  }

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <a className="brand" href="#" aria-label="HanLingo home">
          <span className="brand-seal" lang="zh">
            言
          </span>
          <span>
            HanLingo<span className="brand-period">.</span>
          </span>
        </a>
        <nav
          className={menuOpen ? "main-nav is-open" : "main-nav"}
          aria-label="Main navigation"
        >
          <a href="#atlas" onClick={navigate}>
            The atlas
          </a>
          <a href="#compare" onClick={navigate}>
            A shared letter
          </a>
          <a href="#approach" onClick={navigate}>
            Our approach
          </a>
        </nav>
        <a
          className="github-link"
          aria-label="Open HanLingo on GitHub"
          href="https://github.com/uhonglim/HanLingo"
          target="_blank"
          rel="noreferrer"
        >
          <Github size={17} />
          <span>Open project</span>
        </a>
        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>

      <main id="main">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="small-line" /> MANY VOICES. CONNECTED ROOTS.
            </div>
            <h1 id="hero-title">
              A shared script.
              <br />A world of
              <br />
              <em>voices.</em>
            </h1>
            <p className="hero-description">
              Travel through the Han language family.
              <br className="desktop-br" /> Discover how Mandarin, Min, Yue,
              Hakka, and Wu make a shared heritage sound wonderfully different.
            </p>
            <a className="primary-button" href="#atlas">
              Find your way through <ArrowDown size={17} />
            </a>
            <div className="hero-note">
              <span className="edition-dot" /> A living atlas · Present-day
              edition
            </div>
          </div>
          <div className="hero-map" id="map">
            <div className="map-heading">
              <span>
                <Globe2 size={14} /> LANGUAGE, IN PLACE
              </span>
              <span>EXPLORE THE CONNECTIONS</span>
            </div>
            <AtlasMap
              points={mapPoints}
              selectedGroup={languageId}
              selectedPoint={point?.id ?? null}
              onSelectPoint={choosePoint}
            />
            <div
              className="map-selected"
              style={{ "--group-color": language.color } as CSSProperties}
            >
              <span className="map-selected-character" lang="zh-Hant">
                {language.shortName}
              </span>
              <div>
                <span className="mini-label">A PLACE TO BEGIN</span>
                <strong>
                  {point?.name ?? language.featuredPlace}
                  <span>{language.name}</span>
                </strong>
              </div>
              <a href="#atlas" aria-label={`Explore ${language.name}`}>
                <ArrowRight size={20} />
              </a>
            </div>
          </div>
        </section>

        <section
          className="atlas-section"
          id="atlas"
          aria-labelledby="atlas-title"
        >
          <div className="section-heading atlas-heading">
            <div>
              <div className="eyebrow">01 / THE LANGUAGE ATLAS</div>
              <h2 id="atlas-title">One family. Five starting points.</h2>
            </div>
            <p>
              Begin with a language group. <br />
              Follow it to a local voice.
            </p>
          </div>
          <div className="language-cards" aria-label="Choose a language group">
            {languages.map((item, index) => (
              <button
                className={`language-card ${item.id === languageId ? "selected" : ""}`}
                key={item.id}
                onClick={() => chooseLanguage(item.id)}
                aria-pressed={item.id === languageId}
                style={{ "--group-color": item.color } as CSSProperties}
              >
                <div className="language-card-top">
                  <span className="card-number">0{index + 1}</span>
                  <span className="card-indicator">
                    {item.id === languageId ? (
                      <Check size={13} />
                    ) : (
                      <ArrowRight size={15} />
                    )}
                  </span>
                </div>
                <span className="language-glyph" lang="zh-Hant">
                  {item.shortName}
                </span>
                <span className="language-name">
                  {item.name}
                  <span lang="zh-Hant">{item.nativeName}</span>
                </span>
                <span className="language-short">{item.feature}</span>
              </button>
            ))}
          </div>
          <div
            className="atlas-detail"
            style={{ "--group-color": language.color } as CSSProperties}
          >
            <div className="language-overview">
              <span className="mini-label">
                MEET {language.name.toUpperCase()}
              </span>
              <h3>
                {language.name}
                <span lang="zh-Hant">{language.nativeName}</span>
              </h3>
              <p>{language.intro}</p>
              <p className="sound-note">
                <strong>A difference to notice</strong>
                {soundNotes[languageId]}
              </p>
              <div className="geography">
                <MapPin size={15} />
                <span>{language.geography}</span>
              </div>
              <a className="text-link" href="#map">
                Explore on the map <ArrowRight size={15} />
              </a>
            </div>
            <div className="family-explorer">
              <div className="family-explorer-title">
                <GitBranch size={16} />
                <span>Follow the family tree</span>
                <span className="subtle">Selected examples</span>
              </div>
              <div className="tree-controls">
                <div>
                  <label htmlFor="subgroup">REGIONAL SUBGROUP</label>
                  <div className="select-wrap">
                    <select
                      id="subgroup"
                      value={subgroup.id}
                      onChange={(event) => {
                        setSubgroupId(event.target.value);
                        setPointId(null);
                      }}
                    >
                      {language.subgroups.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name} · {item.nativeName}
                        </option>
                      ))}
                    </select>
                    <ChevronDown size={16} />
                  </div>
                </div>
                <ChevronRight className="tree-step-arrow" size={18} />
                <div>
                  <label htmlFor="local-variety">LOCAL VARIETY</label>
                  <div className="select-wrap">
                    <select
                      id="local-variety"
                      value={point?.id ?? ""}
                      onChange={(event) => choosePoint(event.target.value)}
                    >
                      {points.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name} · {item.nativeName}
                        </option>
                      ))}
                    </select>
                    <ChevronDown size={16} />
                  </div>
                </div>
              </div>
              <p className="subgroup-description">{subgroup.description}</p>
              <ol className="family-path" aria-label="Classification path">
                {(point?.hierarchy ?? language.hierarchy).map((item, index) => (
                  <li key={`${item}-${index}`}>
                    {index > 0 && <ChevronRight size={12} />}
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
              <p className="classification-note">
                The tree has flexible levels: a subgroup may contain further
                clusters before a local variety. Classifications vary between
                sources.
              </p>
            </div>
          </div>
          <div className="scope-note">
            <span className="scope-mark">i</span>
            <p>
              <strong>A starting point, not the whole family.</strong> These
              five groups belong to Sinitic, a branch of Sino-Tibetan. Other
              Sinitic groups are outside this first edition. Places on the map
              are examples, not boundaries.
            </p>
          </div>
        </section>

        <section
          className="comparison-section"
          id="compare"
          aria-labelledby="compare-title"
        >
          <div className="section-heading">
            <div>
              <div className="eyebrow">02 / SAME THOUGHT, DIFFERENT WORDS</div>
              <h2 id="compare-title">A letter home.</h2>
            </div>
            <p>
              One small letter. Five local voices. <br />
              The same care, expressed differently.
            </p>
          </div>
          <div className="comparison-toolbar">
            <span>
              <span className="tiny-line" /> “I’m doing well. Don’t worry about
              me.”
            </span>
            <label className="translation-toggle">
              <input
                type="checkbox"
                checked={translation}
                onChange={(event) => setTranslation(event.target.checked)}
              />
              <span className="toggle-track" />
              <span>English meaning</span>
            </label>
          </div>
          <div className="letters-grid">
            {renderLetter(leftLetter, "left")}
            {renderLetter(rightLetter, "right")}
          </div>
          <div className="comparison-bottom">
            <p>
              Choose any two voices above, or compare with Modern Standard
              Written Chinese.
            </p>
            <button
              className="text-link"
              onClick={() => setFullLetter(!fullLetter)}
              aria-expanded={fullLetter}
            >
              {fullLetter ? "Show opening only" : "Read the full letter"}
              <ChevronDown size={16} className={fullLetter ? "rotate" : ""} />
            </button>
          </div>
          <div className="written-note">
            <span className="written-glyph" lang="zh-Hant">
              文
            </span>
            <div>
              <h3>A shared written language, a different layer.</h3>
              <p>
                Modern Standard Written Chinese provides a formal written
                reference. It is closely tied to Mandarin, but it does not stand
                for the everyday speech of every Sinitic community. Select it
                above to see the shift in wording and register.
              </p>
            </div>
          </div>
        </section>

        <section
          className="approach-section"
          id="approach"
          aria-labelledby="approach-title"
        >
          <div className="approach-intro">
            <div className="eyebrow">03 / A COMMON WAY TO SEE SOUND</div>
            <h2 id="approach-title">
              Different voices.
              <br />
              <em>Precise notation.</em>
            </h2>
            <p>
              Before we build a shared romanization, we need a clear way to talk
              about sound. Every phonetic transcription on HanLingo uses the
              International Phonetic Alphabet.
            </p>
            <a
              className="text-link"
              href="https://www.internationalphoneticassociation.org/content/ipa-chart"
              target="_blank"
              rel="noreferrer"
            >
              Meet the IPA <ArrowRight size={15} />
            </a>
          </div>
          <div className="sound-lab">
            <div className="sound-lab-heading">
              <span className="mini-label">ROMANIZATION WORKBENCH</span>
              <span className="draft-tag">A proposal in progress</span>
            </div>
            <p className="sound-lab-description">
              One sound distinction. One consistent spelling.
            </p>
            <div
              className="sound-tabs"
              role="tablist"
              aria-label="Explore proposed consonant spellings"
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
                    if (
                      event.key === "ArrowRight" ||
                      event.key === "ArrowLeft"
                    ) {
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
                  ASPIRATION <strong>{sound.air}</strong>
                </span>
                <span>
                  VOICING <strong>{sound.voice}</strong>
                </span>
              </div>
            </div>
            <p className="sound-caveat">
              Proposed spelling <b>p / ph / b</b> → IPA <b>[p] / [pʰ] / [b]</b>.
              This illustrates three sounds, not a claim that every variety uses
              all three. Vowels, tones, and the full system are still open for
              discussion.
            </p>
          </div>
        </section>

        <section className="editorial-notes" aria-label="About this edition">
          <div className="edition-number">
            FIELD NOTES <span>NO. 001</span>
          </div>
          <div>
            <h3>Start with place. Make room for time.</h3>
            <p>
              This first edition explores present-day varieties. A future
              historical layer will need dated, place-specific evidence—so that
              “Hakka 200 years ago” becomes a documented story, not a guess.
            </p>
          </div>
          <button
            className="text-link sources-button"
            aria-expanded={sourcesOpen}
            aria-controls="source-list"
            onClick={() => setSourcesOpen(!sourcesOpen)}
          >
            Sources & editorial notes
            <ChevronDown size={16} className={sourcesOpen ? "rotate" : ""} />
          </button>
        </section>
        {sourcesOpen && (
          <section
            className="sources-panel"
            id="source-list"
            aria-label="Sources and editorial notes"
          >
            <h3>Built to be explored. Open to correction.</h3>
            <p>
              The atlas is an educational selection. Language and dialect labels
              reflect different scholarly and community traditions; the tree is
              a navigation aid, not a claim that all levels have equal
              linguistic distance.
            </p>
            <ul>
              <li>
                <a
                  href="https://xiaoxue.iis.sinica.edu.tw/Minyu/Content/Files/minyu-Get_Started.pdf"
                  target="_blank"
                  rel="noreferrer"
                >
                  Academia Sinica · Min language resource guide
                </a>{" "}
                — Min, Southern Min, Quanzhang, and local varieties.
              </li>
              <li>
                <a
                  href="https://doi.org/10.1017/S0025100324000203"
                  target="_blank"
                  rel="noreferrer"
                >
                  Journal of the International Phonetic Association · Zhongjiang
                  Chinese
                </a>{" "}
                — Southwestern Mandarin, with comparison to Chengdu.
              </li>
              <li>
                <a
                  href="https://www.internationalphoneticassociation.org/content/ipa-chart"
                  target="_blank"
                  rel="noreferrer"
                >
                  International Phonetic Association · Official IPA chart
                </a>{" "}
                — the reference for phonetic symbols.
              </li>
              <li>
                <a
                  href="https://www.naturalearthdata.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Natural Earth
                </a>{" "}
                — public-domain basemap, distributed by World Atlas.
              </li>
            </ul>
            <p>
              All six letters were supplied by the project founder. Spoken
              examples await local-speaker review; no audio or full-letter IPA
              has been inferred. City coordinates are representative points and
              do not describe the extent of a language community. Further
              classification references are recorded in the project’s{" "}
              <a
                href="https://github.com/uhonglim/HanLingo/blob/codex/hanlingo-atlas/docs/EDITORIAL.md"
                target="_blank"
                rel="noreferrer"
              >
                editorial notes
              </a>
              .
            </p>
          </section>
        )}
      </main>

      <footer className="site-footer">
        <a className="brand" href="#">
          <span className="brand-seal" lang="zh">
            言
          </span>
          <span>
            HanLingo<span className="brand-period">.</span>
          </span>
        </a>
        <p>Connected by roots. Distinct in every voice.</p>
        <a
          href="https://github.com/uhonglim/HanLingo"
          target="_blank"
          rel="noreferrer"
        >
          An open, growing project <Github size={15} />
        </a>
      </footer>
    </>
  );
}

export default App;
