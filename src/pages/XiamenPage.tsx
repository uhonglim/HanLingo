import PlaceName from "../components/PlaceName";
import PlaceNameNotes from "../components/PlaceNameNotes";
import { findAtlasLocality, atlasLocalityPath } from "../data/atlas";
import { useEffect, useMemo, useState } from "react";
import {
  Link,
  Route,
  Routes,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  Check,
  ChevronRight,
  RotateCcw,
  Search,
  X,
} from "lucide-react";
import { readingLabels, siteTerms } from "../data/site-terms";
import { xiamenWords } from "../data/xiamen-lexicon";
import {
  filterXiamenWords,
  vocabularyCategories as categories,
} from "../data/xiamen-vocabulary";
import { xiamenPhotos } from "../data/xiamen-photos";
import { makeQuiz, romanizeXiamen } from "../data/xiamen-romanization";
import AtlasMap from "../components/AtlasMap";
import { mapPoints } from "../data/languages";
import "./XiamenPage.css";
import CultureGallery, {
  photoWords as relatedWords,
} from "./xiamen/CultureGallery";
import IpaGallery from "./xiamen/IpaGallery";
import Pronunciation from "../components/Pronunciation";
import RegionalDifferences, {
  extraRegionalWords,
  RegionalWord,
} from "../components/RegionalDifferences";

const AMOY = findAtlasLocality("xiamen")!;
const BASE = atlasLocalityPath(AMOY);
type Word = (typeof xiamenWords)[number];
type Photo = (typeof xiamenPhotos)[number];
const roman = (word: Word) => romanizeXiamen(word.segments, word.tones);
const wordLink = (word: Word) =>
  `${BASE}/words?q=${encodeURIComponent(word.han)}`;

function useCollection(key: string) {
  const [items, setItems] = useState<string[]>(() => {
    try {
      const saved: unknown = JSON.parse(localStorage.getItem(key) || "[]");
      return Array.isArray(saved)
        ? saved.filter(
            (id): id is string =>
              typeof id === "string" && xiamenWords.some((w) => w.id === id),
          )
        : [];
    } catch {
      return [];
    }
  });
  const [storageError, setStorageError] = useState(false);
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(items));
    } catch {
      setStorageError(true);
    }
  }, [items, key]);
  const toggle = (id: string) =>
    setItems((old) =>
      old.includes(id) ? old.filter((item) => item !== id) : [...old, id],
    );
  const add = (id: string) =>
    setItems((old) => (old.includes(id) ? old : [...old, id]));
  return { items, toggle, add, storageError };
}

function PhotoCredit({ photo }: { photo: Photo }) {
  return (
    <div className="xm-credit">
      <span>
        {photo.caption}
        {photo.year && ` · ${photo.year}`}
      </span>
      <span>
        <a href={photo.sourceUrl} target="_blank" rel="noreferrer">
          {photo.author}
        </a>{" "}
        ·{" "}
        <a href={photo.licenseUrl} target="_blank" rel="noreferrer">
          {photo.license}
        </a>
      </span>
    </div>
  );
}

function WordCard({
  word,
  saved,
  onSave,
}: {
  word: Word;
  saved: boolean;
  onSave: () => void;
}) {
  return (
    <article className="xm-word-card">
      <div className="xm-word-top">
        <div className="xm-word-han" lang="zh-Hant">
          {word.han}
        </div>
        <button
          className={saved ? "xm-save is-saved" : "xm-save"}
          onClick={onSave}
          aria-label={`${saved ? "Unsave" : "Save"} ${word.english}`}
          aria-pressed={saved}
        >
          <Bookmark size={18} fill={saved ? "currentColor" : "none"} />
        </button>
      </div>
      <h3>{word.english}</h3>
      <Pronunciation
        ipa={word.ipa}
        spelling={roman(word)}
        toneNotation="pitch-contour"
      />
      <details className="xm-word-detail">
        <summary>
          Reading and source <ChevronRight size={12} />
        </summary>
        <p>{word.note}</p>
        <dl className="xm-word-source">
          <div>
            <dt>Reading</dt>
            <dd>{readingLabels[word.readingMode]}</dd>
          </div>
          <div>
            <dt>Source transcription</dt>
            <dd>{word.sourceReading}</dd>
          </div>
        </dl>
        <a href={word.sourceUrl} target="_blank" rel="noreferrer">
          {word.sourceLabel}
        </a>
      </details>
    </article>
  );
}

function NotationNote() {
  return (
    <details className="xm-notation">
      <summary>
        IPA and {siteTerms.spelling}
        <ChevronRight size={15} />
      </summary>
      <div>
        <p>
          IPA gives broad reference readings, not an individual speaker’s
          recording.
          {siteTerms.spelling} uses pitch numbers from{" "}
          <b>1 (low) to 5 (high)</b>. Citation readings show syllables in
          isolation; connected speech includes tone changes.{" "}
          <Link to="/romanization">{siteTerms.romanization} rules</Link>
        </p>
      </div>
    </details>
  );
}

function SceneWord({
  word,
  saved,
  onSave,
}: {
  word: Word;
  saved: boolean;
  onSave: () => void;
}) {
  const [revealed, setRevealed] = useState(false);
  return (
    <div className="xm-scene-word">
      <button
        className={`xm-reveal-word${revealed ? " is-revealed" : ""}`}
        onClick={() => setRevealed(!revealed)}
        aria-expanded={revealed}
        aria-label={
          revealed
            ? `${word.han}: ${word.english}. ${roman(word)}. IPA ${word.ipa}. Hide meaning`
            : `Reveal meaning of ${word.han}. ${roman(word)}. IPA ${word.ipa}`
        }
      >
        <b lang="zh-Hant">{word.han}</b>
        <span className="xm-reveal-reading">
          <span>{roman(word)}</span>
          <small className="xm-ipa">{word.ipa}</small>
        </span>
        <span
          className={`xm-reveal-meaning${revealed ? "" : " xm-reveal-hint"}`}
        >
          {revealed ? word.english : "Show meaning"}
        </span>
      </button>
      <button
        className={`xm-save xm-scene-save${saved ? " is-saved" : ""}`}
        onClick={onSave}
        aria-label={`${saved ? "Unsave" : "Save"} ${word.han}`}
        aria-pressed={saved}
      >
        <Bookmark size={16} fill={saved ? "currentColor" : "none"} />
      </button>
    </div>
  );
}

function Overview({
  saved,
  toggle,
}: {
  saved: string[];
  toggle: (id: string) => void;
}) {
  const navigate = useNavigate();
  const scenes = ["shacha-noodles", "dongyu-market", "gulangyu-coast"]
    .map((id) => xiamenPhotos.find((photo) => photo.id === id))
    .filter((photo): photo is Photo => Boolean(photo));
  const sceneTitles: Record<string, string> = {
    "shacha-noodles": "Noodles",
    "dongyu-market": "Market",
    "gulangyu-coast": "Waterfront",
  };
  return (
    <>
      <section className="xm-hero">
        <div className="xm-hero-copy">
          <h1>
            <PlaceName point={AMOY} showHan/>
          </h1>
        </div>
      </section>
      <section className="xm-section xm-scenes">
        <h2 className="sr-only">Words in photos</h2>
        <div className="xm-scenes-grid">
          {scenes.map((photo) => (
            <article key={photo.id}>
              <Link
                to={`${BASE}/culture?photo=${photo.id}`}
                className="xm-scene-photo"
                aria-label={`Open photo: ${photo.caption}`}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  style={{ objectPosition: photo.position }}
                />
              </Link>
              <PhotoCredit photo={photo} />
              <h3>{sceneTitles[photo.id]}</h3>
              <div className="xm-scene-words">
                {relatedWords(photo)
                  .slice(0, 3)
                  .map((word) => (
                    <SceneWord
                      key={word.id}
                      word={word}
                      saved={saved.includes(word.id)}
                      onSave={() => toggle(word.id)}
                    />
                  ))}
              </div>
            </article>
          ))}
        </div>
      </section>
      <RegionalDifferences localityId="xiamen" />
      <details className="atlas-reference-notes"><summary>Place names and sources</summary><PlaceNameNotes point={AMOY}/><PlaceNameNotes point={{id:"gulangyu", name:"Kulangsu"}}/></details>
      <section className="xm-section xm-location">
        <div>
          <h2>Southern Min</h2>
          <p>
            These readings follow urban Amoy Hokkien. Tsuân-tsiu and Tsiang-tsiu
            have their own varieties.
          </p>
        </div>
        <AtlasMap
          compact
          points={mapPoints.filter(
            (point) =>
              point.groupId === "min" && point.subgroupId === "southern-min",
          )}
          selectedGroup="min"
          selectedPoint="xiamen"
          onSelectPoint={(id) => {
            const point = mapPoints.find((item) => item.id === id);
            if (point && id !== "xiamen") navigate(atlasLocalityPath(findAtlasLocality(id)!));
          }}
        />
      </section>
    </>
  );
}

function Vocabulary({
  saved,
  toggle,
}: {
  saved: string[];
  toggle: (id: string) => void;
}) {
  const [params, setParams] = useSearchParams();
  const query = params.get("q") ?? "";
  const requestedCategory = params.get("category") ?? "All words";
  const category = categories.includes(requestedCategory)
    ? requestedCategory
    : "All words";
  const onlySaved = params.get("saved") === "1";
  const changeParam = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
  };
  const setOnlySaved = (value: boolean) =>
    changeParam("saved", value ? "1" : "");
  const words = filterXiamenWords(query, category, onlySaved, saved);
  const setCategory = (value: string) =>
    changeParam("category", value === "All words" ? "" : value);
  const hasFilters = Boolean(query || onlySaved || category !== "All words");
  const extraWords =
    !onlySaved && category === "All words"
      ? extraRegionalWords("xiamen", xiamenWords, query)
      : [];
  const totalWords =
    xiamenWords.length + extraRegionalWords("xiamen", xiamenWords).length;
  return (
    <div className="xm-inner">
      <header className="xm-page-heading">
        <div>
          <h1><PlaceName point={AMOY}/> {siteTerms.sections.words.toLowerCase()}</h1>
          <p role="status">
            {words.length + extraWords.length} of {totalWords} words
            {onlySaved ? " · saved" : ""}
          </p>
        </div>
        {hasFilters && (
          <button
            className="xm-clear-view"
            onClick={() => setParams({}, { replace: true })}
          >
            Show all words
          </button>
        )}
      </header>
      <div className="xm-word-tools">
        <div className="xm-search">
          <Search size={18} />
          <label htmlFor="xiamen-word-search" className="sr-only">
            Search Amoy words
          </label>
          <input
            id="xiamen-word-search"
            type="search"
            value={query}
            onChange={(e) => changeParam("q", e.target.value)}
            placeholder="Word, meaning, or spelling"
          />
          {query && (
            <button
              onClick={() => changeParam("q", "")}
              aria-label="Clear word search"
            >
              <X size={16} />
            </button>
          )}
        </div>
        <button
          className={`xm-saved-filter ${onlySaved ? "is-active" : ""}`}
          aria-pressed={onlySaved}
          onClick={() => setOnlySaved(!onlySaved)}
        >
          <Bookmark size={16} />
          Saved
        </button>
      </div>
      <div className="xm-filter-row" aria-label="Word categories">
        {categories.map((cat) => (
          <button
            key={cat}
            aria-pressed={cat === category}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="xm-word-grid">
        {words.map((word) => (
          <WordCard
            key={word.id}
            word={word}
            saved={saved.includes(word.id)}
            onSave={() => toggle(word.id)}
          />
        ))}
      </div>
      {extraWords.length > 0 && (
        <div className="learning-word-grid">
          {extraWords.map((reading) => (
            <RegionalWord key={reading.id} reading={reading} />
          ))}
        </div>
      )}
      <RegionalDifferences localityId="xiamen" query={query} />
      {!words.length && !extraWords.length && (
        <div className="xm-empty">
          <h2>
            {onlySaved ? "No saved words in this view." : "No matching words."}
          </h2>
        </div>
      )}
    </div>
  );
}

function Practice({
  saved,
  learned,
  markLearned,
}: {
  saved: string[];
  learned: string[];
  markLearned: (id: string) => void;
}) {
  const [mode, setMode] = useState<"all" | "saved">("all");
  const pool = useMemo(
    () =>
      mode === "saved"
        ? xiamenWords.filter((w) => saved.includes(w.id))
        : xiamenWords,
    [mode, saved],
  );
  const [round, setRound] = useState<ReturnType<typeof makeQuiz<Word>>>([]);
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState<string | null>(null);
  const [correct, setCorrect] = useState<string[]>([]);
  const [finished, setFinished] = useState(false);
  function start() {
    setRound(
      makeQuiz(
        pool,
        6,
        Math.random,
        (a, b) => ![a.id, b.id].every((id) => id === "two" || id === "two-er"),
      ),
    );
    setIndex(0);
    setAnswer(null);
    setCorrect([]);
    setFinished(false);
  }
  const current = round[index];
  const choose = (id: string) => {
    if (answer) return;
    setAnswer(id);
    if (id === current.answer.id) {
      setCorrect((old) => [...old, id]);
      markLearned(id);
    }
  };
  return (
    <div className="xm-inner xm-practice">
      <header className="xm-page-heading">
        <h1><PlaceName point={AMOY}/> {siteTerms.sections.practice.toLowerCase()}</h1>
        {(current || finished) && (
          <button
            className="xm-clear-view"
            onClick={() => {
              setRound([]);
              setFinished(false);
              setIndex(0);
              setAnswer(null);
            }}
          >
            Change practice
          </button>
        )}
      </header>
      {!current && !finished ? (
        <section className="xm-practice-start">
          <h2>Match words to meanings</h2>
          <p>{learned.length} words answered correctly</p>
          <div className="xm-switch">
            <button
              aria-pressed={mode === "all"}
              onClick={() => setMode("all")}
            >
              All words
            </button>
            <button
              aria-pressed={mode === "saved"}
              onClick={() => setMode("saved")}
            >
              Saved words
            </button>
          </div>
          {pool.length >= 4 ? (
            <button className="xm-button" onClick={start}>
              Start practice <ArrowRight size={16} />
            </button>
          ) : (
            <p>
              Save at least four words for this practice.{" "}
              <Link to={`${BASE}/words`}>Browse words</Link>
            </p>
          )}
          <small>Progress is saved in this browser.</small>
        </section>
      ) : finished ? (
        <section className="xm-practice-finish" aria-live="polite">
          <div className="xm-finish-score">
            {correct.length}
            <span>/ {round.length}</span>
          </div>
          <h2>Results</h2>
          <div className="xm-review-list">
            {round.map(({ answer: word }) => (
              <div key={word.id}>
                <span>
                  {correct.includes(word.id) ? (
                    <Check size={16} />
                  ) : (
                    <RotateCcw size={16} />
                  )}
                </span>
                <b lang="zh-Hant">{word.han}</b>
                <span>{word.english}</span>
                <small>
                  <Link to={wordLink(word)}>
                    {roman(word)}
                    <br />
                    {word.ipa}
                  </Link>
                </small>
              </div>
            ))}
          </div>
          <button className="xm-button" onClick={start}>
            New round <RotateCcw size={15} />
          </button>
        </section>
      ) : (
        <section className="xm-quiz">
          <div className="xm-quiz-progress">
            <span>
              Question {index + 1} / {round.length}
            </span>
            <span>{correct.length} correct</span>
          </div>
          <div className="xm-progress-track">
            <span style={{ width: `${(index / round.length) * 100}%` }} />
          </div>
          <p className="xm-quiz-prompt">Choose the word for</p>
          <h2>{current.answer.english}</h2>
          <div className="xm-answer-grid">
            {current.options.map((word) => (
              <button
                key={word.id}
                disabled={answer !== null}
                className={
                  answer
                    ? word.id === current.answer.id
                      ? "is-correct"
                      : word.id === answer
                        ? "is-incorrect"
                        : ""
                    : ""
                }
                onClick={() => choose(word.id)}
              >
                <b lang="zh-Hant">{word.han}</b>
                <span>{roman(word)}</span>
              </button>
            ))}
          </div>
          {answer && (
            <div className="xm-quiz-feedback" role="status">
              <div>
                <strong>
                  {answer === current.answer.id
                    ? "Correct"
                    : "The word is " + current.answer.han + "."}
                </strong>
                <p>
                  {roman(current.answer)} <span>· {current.answer.ipa}</span>
                </p>
                <small>{current.answer.note}</small>
              </div>
              <button
                className="xm-button"
                onClick={() => {
                  if (index === round.length - 1) setFinished(true);
                  else {
                    setIndex(index + 1);
                    setAnswer(null);
                  }
                }}
              >
                {index === round.length - 1 ? "See results" : "Next word"}{" "}
                <ArrowRight size={16} />
              </button>
            </div>
          )}
        </section>
      )}
    </div>
  );
}

export default function XiamenPage() {
  const saved = useCollection("hanlingo:xiamen:saved:v1");
  const learned = useCollection("hanlingo:xiamen:learned:v1");
  return (
    <div className="xm-page">
      {(saved.storageError || learned.storageError) && (
        <p className="xm-storage-note">
          Browser storage is unavailable. Your progress will last for this
          session.
        </p>
      )}
      <Routes>
        <Route
          index
          element={<Overview saved={saved.items} toggle={saved.toggle} />}
        />
        <Route
          path="words"
          element={<Vocabulary saved={saved.items} toggle={saved.toggle} />}
        />
        <Route path="culture" element={<CultureGallery />} />
        <Route path="sounds" element={<IpaGallery />} />
        <Route
          path="practice"
          element={
            <Practice
              saved={saved.items}
              learned={learned.items}
              markLearned={learned.add}
            />
          }
        />
        <Route
          path="*"
          element={
            <div className="xm-inner xm-empty">
              <h1>This lesson wasn’t found.</h1>
              <Link to={BASE}>
                <ArrowLeft size={16} /> Back to Amoy
              </Link>
            </div>
          }
        />
      </Routes>
      <NotationNote />
    </div>
  );
}
