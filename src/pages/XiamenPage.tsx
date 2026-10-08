import { useEffect, useMemo, useRef, useState } from "react";
import {
  Link,
  NavLink,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  Check,
  ChevronRight,
  Expand,
  RotateCcw,
  Search,
  X,
} from "lucide-react";
import { xiamenWords } from "../data/xiamen-lexicon";
import { xiamenPhotos } from "../data/xiamen-photos";
import {
  makeQuiz,
  pitchLetters,
  romanizeXiamen,
  xiamenSpellingKey,
} from "../data/xiamen-romanization";
import AtlasMap from "../components/AtlasMap";
import { mapPoints } from "../data/languages";
import "./XiamenPage.css";

const BASE = "/languages/min/southern-min/xiamen";
type Word = (typeof xiamenWords)[number];
type Photo = (typeof xiamenPhotos)[number];
const categories = [
  "All words",
  "Food & drink",
  "People & actions",
  "Around town",
  "Numbers",
];
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
        <button
          className={saved ? "xm-save is-saved" : "xm-save"}
          onClick={onSave}
          aria-label={`${saved ? "Unsave" : "Save"} ${word.english}`}
          aria-pressed={saved}
        >
          <Bookmark size={18} fill={saved ? "currentColor" : "none"} />
        </button>
      </div>
      <div className="xm-word-han" lang="zh-Hant">
        {word.han}
      </div>
      <h3>{word.english}</h3>
      <div className="xm-word-pronunciation">
        <div>
          <strong>{roman(word)}</strong>
        </div>
        <div>
          <span>IPA</span>
          <span className="xm-ipa">{word.ipa}</span>
        </div>
      </div>
      <details className="xm-word-detail">
        <summary>
          Usage & source <ChevronRight size={12} />
        </summary>
        <p>{word.note}</p>
        <p>
          <b>{word.readingMode}.</b>{" "}
          <a href={word.sourceUrl} target="_blank" rel="noreferrer">
            {word.sourceLabel}
          </a>
        </p>
      </details>
    </article>
  );
}

function NotationNote() {
  return (
    <details className="xm-notation">
      <summary>
        IPA & trial spelling
        <ChevronRight size={15} />
      </summary>
      <div>
        <p>
          IPA shows the reference sound. The numbers in HanLingo spellings show
          pitch: <b>1 is low, 5 is high</b>. Single-syllable entries show
          citation tones; entries marked “Connected speech” include the source’s
          tone changes.
        </p>
        <p>
          <b>ts / tsh</b> are [t͡s] / [t͡sʰ]. Trial extensions in this lesson:{" "}
          <b>ng</b> [ŋ], <b>oo</b> [ɔ], <b>q</b> [ʔ]. A tilde marks a nasal
          vowel, as in <b>ã</b> [ã]; <b>â</b> remains [ɐ]. The unreleased-stop
          mark <b>◌̚</b> and syllabic mark <b>◌̍</b> are retained for precision.
          Other plain Latin letters keep their displayed IPA value.
        </p>
        <p>
          The dictionary readings use the Xiamen reference convention. These are
          broad learning transcriptions, not recordings of an individual
          speaker.{" "}
          <Link to={`${BASE}/sounds`}>
            See the sound guide <ArrowRight size={13} />
          </Link>
        </p>
      </div>
    </details>
  );
}

const culturalNotes: Record<
  string,
  {
    title: string;
    text: string;
    source: string;
    sourceName: string;
    words: string[];
  }
> = {
  "shacha-noodles": {
    title: "A bowl of shacha noodles",
    text: "Shacha noodles use a satay-style soup. Xiamen’s dining guide lists sesame, garlic, peanut oil, shrimp sauce, and chili among the seasoning ingredients.",
    source: "https://www.investxiamen.org.cn/detail/169.html",
    sourceName: "Xiamen dining guide",
    words: ["食", "麵", "水", "好食"],
  },
  "fried-vermicelli": {
    title: "Rice, noodles, and the table",
    text: "Fried rice vermicelli served in Xiamen. 米 refers to uncooked rice; 飯 refers to cooked rice or a meal.",
    source:
      "https://commons.wikimedia.org/wiki/File:Fried_Rice_vermicelli_Xiamen.jpg",
    sourceName: "Photograph record",
    words: ["米", "飯", "麵"],
  },
  "nanputuo-temple": {
    title: "Nanputuo, a working monastery",
    text: "Nanputuo is a Buddhist monastery. Its volunteers arrange flower offerings, prepare ceremonies, and guide visitors.",
    source:
      "https://en.nanputuo.com/buddhism/Buddhisattva.aspx?articleid=71998",
    sourceName: "Nanputuo Temple",
    words: ["人", "來", "去"],
  },
};
const seaNote = {
  title: "Across the water to Gulangyu",
  text: "Gulangyu’s buildings combine southern Fujian traditions with influences carried through overseas connections. UNESCO calls the island’s distinctive architectural synthesis “Amoy Deco.”",
  source: "https://whc.unesco.org/en/list/1541",
  sourceName: "UNESCO · Kulangsu",
  words: ["海", "船", "水", "厝"],
};
const pictureNotes: Record<
  string,
  { title: string; text: string; words: string[] }
> = {
  "dongyu-market": {
    title: "At a Dongyu market",
    text: "A street market in Dongyu, Haicang District. The words alongside this photograph follow the urban Xiamen reference.",
    words: ["菜", "買", "錢", "人"],
  },
  "shellfish-stall": {
    title: "Shellfish at the shopfront",
    text: "Basins of shellfish outside a Gulangyu shop.",
    words: ["買", "錢", "食", "好食"],
  },
  "gulangyu-lane": {
    title: "A lane through Gulangyu",
    text: "A shaded lane between buildings on Gulangyu. 街 means “street”; 厝 means “house” or “home.”",
    words: ["街", "厝", "人"],
  },
  "xiamen-ferry": {
    title: "A ferry on the harbor",
    text: "The Yuanhe ferry photographed west of Gulangyu in 2012. 船 means “boat” or “ship”; 海 means “sea.”",
    words: ["船", "海", "水"],
  },
  "gulangyu-coast": {
    title: "At the water’s edge",
    text: "Gulangyu’s waterfront. 海, “sea,” and 水, “water,” both have the falling citation tone 53.",
    words: ["海", "水", "船"],
  },
  "shuzhuang-garden": {
    title: "A bridge at Shuzhuang Garden",
    text: "A visitor with a red umbrella crosses a bridge at Shuzhuang Garden.",
    words: ["人", "水", "來", "去"],
  },
  "shop-counter": {
    title: "Across the counter",
    text: "Jars, boxes, and small packages surround a worker at a shop counter in Xiamen. The photograph does not identify the worker’s language.",
    words: ["人", "買", "錢"],
  },
};
function photoNote(photo: Photo) {
  return (
    culturalNotes[photo.id] ??
    (pictureNotes[photo.id]
      ? {
          ...pictureNotes[photo.id],
          source: photo.sourceUrl,
          sourceName: "Photograph record",
        }
      : seaNote)
  );
}
function relatedWords(photo: Photo) {
  const wanted = photoNote(photo).words;
  const exact = wanted
    .map((han) => xiamenWords.find((word) => word.han === han))
    .filter((word): word is Word => Boolean(word));
  return exact.length
    ? exact
    : xiamenWords
        .filter(
          (w) =>
            w.category ===
            (photo.category === "Food" ? "Food & drink" : "Around town"),
        )
        .slice(0, 3);
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
        <span>{roman(word)}</span>
        <small className="xm-ipa">{word.ipa}</small>
        {revealed ? (
          <strong>{word.english}</strong>
        ) : (
          <span className="xm-reveal-hint">Show meaning</span>
        )}
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
            Xiamen <span lang="zh-Hant">廈門</span>
          </h1>
        </div>
        <Link to={`${BASE}/words`}>
          All words <ArrowRight size={16} />
        </Link>
      </section>
      <section className="xm-section xm-scenes">
        <h2 className="sr-only">Photo vocabulary</h2>
        <div className="xm-scenes-grid">
          {scenes.map((photo) => (
            <article key={photo.id}>
              <Link
                to={`${BASE}/culture?photo=${photo.id}`}
                className="xm-scene-photo"
                aria-label={`Open photograph: ${photo.caption}`}
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
        <div className="xm-bottom-link">
          <Link to={`${BASE}/practice`}>
            Practice <ArrowRight size={16} />
          </Link>
          <Link to={`${BASE}/culture`}>
            More photographs <ArrowRight size={16} />
          </Link>
        </div>
      </section>
      <section className="xm-section xm-location">
        <div>
          <h2>Southern Min</h2>
          <p>
            These readings follow urban Xiamen Southern Min. Quanzhou and
            Zhangzhou have their own varieties.
          </p>
          <Link to="/languages/min/southern-min">
            Southern Min varieties <ArrowRight size={15} />
          </Link>
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
            if (point && id !== "xiamen")
              navigate(`/languages/min/southern-min/${id}`);
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
  const [category, setCategory] = useState("All words");
  const onlySaved = params.get("saved") === "1";
  const changeParam = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
  };
  const setOnlySaved = (value: boolean) =>
    changeParam("saved", value ? "1" : "");
  const words = xiamenWords.filter(
    (word) =>
      (category === "All words" || word.category === category) &&
      (!onlySaved || saved.includes(word.id)) &&
      `${word.han} ${word.english} ${roman(word)} ${word.ipa}`
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
  );
  return (
    <div className="xm-inner">
      <h1 className="sr-only">Xiamen words</h1>
      <div className="xm-word-tools">
        <div className="xm-search">
          <Search size={18} />
          <label htmlFor="xiamen-word-search" className="sr-only">
            Search Xiamen words
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
        <span className="sr-only" role="status">
          {words.length} matching words
        </span>
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
      {!words.length && (
        <div className="xm-empty">
          <h2>
            {onlySaved ? "No saved words in this view." : "No matching words."}
          </h2>
          <button
            className="xm-button"
            onClick={() => {
              setOnlySaved(false);
              setCategory("All words");
              setParams({});
            }}
          >
            Show all words
          </button>
        </div>
      )}
      <div className="xm-bottom-link">
        <Link to={`${BASE}/practice`}>
          Practice <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}

function PhotoDialog({
  photo,
  onClose,
}: {
  photo: Photo;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    dialog?.showModal();
    return () => dialog?.close();
  }, []);
  const note = photoNote(photo);
  return (
    <dialog
      ref={ref}
      className="xm-photo-dialog"
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
      aria-labelledby="xm-dialog-title"
    >
      <button
        className="xm-dialog-close"
        aria-label="Close photograph"
        onClick={onClose}
      >
        <X size={22} />
      </button>
      <img src={photo.src} alt={photo.alt} />
      <div className="xm-dialog-content">
        <h2 id="xm-dialog-title">{note.title}</h2>
        <p>{note.text}</p>
        <div className="xm-photo-words">
          {relatedWords(photo).map((word) => (
            <Link key={word.id} to={wordLink(word)}>
              <b lang="zh-Hant">{word.han}</b>
              <span>
                {word.english}
                <small>
                  {roman(word)} · {word.ipa}
                </small>
              </span>
              <ArrowRight size={15} />
            </Link>
          ))}
        </div>
        <PhotoCredit photo={photo} />
        <a
          className="xm-source-link"
          href={note.source}
          target="_blank"
          rel="noreferrer"
        >
          {note.sourceName}
        </a>
      </div>
    </dialog>
  );
}
function Culture() {
  const [params, setParams] = useSearchParams();
  const [category, setCategory] = useState("All photographs");
  const selected = xiamenPhotos.find((p) => p.id === params.get("photo"));
  const filtered = xiamenPhotos.filter(
    (p) => category === "All photographs" || p.category === category,
  );
  return (
    <div className="xm-inner">
      <h1 className="sr-only">Xiamen photographs</h1>
      <div className="xm-filter-row">
        {["All photographs", "Food", "Streets", "Sea", "Culture"].map((cat) => (
          <button
            key={cat}
            aria-pressed={category === cat}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="xm-photo-grid">
        {filtered.map((photo, i) => (
          <figure key={photo.id} className={i % 5 === 0 ? "xm-photo-wide" : ""}>
            <button
              onClick={() => setParams({ photo: photo.id })}
              aria-label={`Open photograph: ${photo.caption}`}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                style={{ objectPosition: photo.position }}
              />
              <span className="xm-photo-expand">
                <Expand size={17} />
              </span>
            </button>
            <PhotoCredit photo={photo} />
            <div className="xm-gallery-words">
              {relatedWords(photo)
                .slice(0, 2)
                .map((word) => (
                  <Link key={word.id} to={wordLink(word)}>
                    <b lang="zh-Hant">{word.han}</b>
                    <span>
                      {word.english}
                      <small>
                        {roman(word)} · {word.ipa}
                      </small>
                    </span>
                  </Link>
                ))}
            </div>
          </figure>
        ))}
      </div>
      <div className="xm-culture-note">
        <h2>Gulangyu architecture</h2>
        <p>{seaNote.text}</p>
        <a href={seaNote.source} target="_blank" rel="noreferrer">
          UNESCO · Kulangsu <ArrowRight size={15} />
        </a>
      </div>
      {selected && (
        <PhotoDialog
          key={selected.id}
          photo={selected}
          onClose={() => setParams({}, { replace: true })}
        />
      )}
    </div>
  );
}

function ToneGraph({ tone }: { tone: string }) {
  const values = [...tone].map(Number);
  if (values.length === 1) values.push(values[0]);
  const pts = values
    .map((v, i) => `${30 + (i * 200) / (values.length - 1)},${155 - v * 25}`)
    .join(" ");
  return (
    <svg
      className="xm-tone-graph"
      viewBox="0 0 270 150"
      role="img"
      aria-label={`Pitch contour ${tone}, from ${tone[0]} to ${tone.at(-1)} on a scale of one to five`}
    >
      {[1, 2, 3, 4, 5].map((v) => (
        <g key={v}>
          <line x1="30" x2="240" y1={155 - v * 25} y2={155 - v * 25} />
          <text x="10" y={159 - v * 25}>
            {v}
          </text>
        </g>
      ))}
      <polyline points={pts} />
      {values.map((v, i) => (
        <circle
          key={i}
          cx={30 + (i * 200) / (values.length - 1)}
          cy={155 - v * 25}
          r="4"
        />
      ))}
    </svg>
  );
}
function Sounds() {
  const [tone, setTone] = useState("24");
  const example = xiamenWords.find(
    (w) => w.tones.length === 1 && w.tones[0] === tone,
  );
  const [combined, setCombined] = useState(false);
  return (
    <div className="xm-inner">
      <h1 className="sr-only">Xiamen sounds</h1>
      <section className="xm-tone-lesson">
        <div>
          <h2>Tones</h2>
          <p>
            The numbers describe pitch height. <b>24</b> starts low and rises;{" "}
            <b>53</b> falls from high to middle. Short checked tones end in a
            stop.
          </p>
          <div className="xm-tone-buttons" aria-label="Choose a tone">
            {["44", "24", "53", "21", "22", "32", "4"].map((t) => (
              <button
                key={t}
                aria-pressed={tone === t}
                onClick={() => setTone(t)}
              >
                {t}
                <small>{pitchLetters(t)}</small>
              </button>
            ))}
          </div>
          <a
            className="xm-source-link"
            href="https://data.fjdsfzw.org.cn/upload/Annals/2011/%E6%96%B9%E8%A8%80%E5%BF%97/epub/ops/215.htm"
            target="_blank"
            rel="noreferrer"
          >
            Reference · Fujian dialect gazetteer
          </a>
        </div>
        <div className="xm-tone-example">
          <ToneGraph tone={tone} />
          {example ? (
            <div>
              <span lang="zh-Hant">{example.han}</span>
              <div>
                <b>{example.english}</b>
                <strong>{roman(example)}</strong>
                <small>{example.ipa}</small>
              </div>
            </div>
          ) : (
            <p>Choose another contour to see a word from this collection.</p>
          )}
          <small>Schematic pitch, not an acoustic recording.</small>
        </div>
      </section>
      <section className="xm-sandhi">
        <div>
          <h2>Tone changes</h2>
          <p>
            In this example, the first syllable changes from <b>44 to 22</b>.
            The last keeps its citation tone.
          </p>
          <a
            href="https://ling.cuhk.edu.hk/people/peggy/SP2024_GeMok_Phonotactics.pdf"
            target="_blank"
            rel="noreferrer"
            className="xm-source-link"
          >
            Ge & Mok, 2024 · example 1
          </a>
        </div>
        <div>
          <div className="xm-switch">
            <button aria-pressed={!combined} onClick={() => setCombined(false)}>
              Separate syllables
            </button>
            <button aria-pressed={combined} onClick={() => setCombined(true)}>
              Together
            </button>
          </div>
          <div className="xm-plane">
            <span lang="zh-Hant">飛機</span>
            <b>airplane</b>
            <strong>
              hui<span>{combined ? "22" : "44"}</span> ki44
            </strong>
            <p className="xm-ipa">[hui{combined ? "˨˨" : "˦˦"} ki˦˦]</p>
          </div>
        </div>
      </section>
      <section className="xm-section">
        <div className="xm-section-heading">
          <div>
            <h2>Spelling key</h2>
          </div>
          <Link to="/romanization">
            Romanization <ArrowRight size={16} />
          </Link>
        </div>
        <div className="xm-key-grid">
          {xiamenSpellingKey
            .filter((r) => r.ipa !== "ŋ̩")
            .map((rule) => (
              <div key={rule.ipa}>
                <b>{rule.spelling}</b>
                <span>[{rule.ipa}]</span>
                <small className={rule.status === "Agreed" ? "is-agreed" : ""}>
                  {rule.status}
                </small>
              </div>
            ))}
        </div>
      </section>
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
      <h1 className="sr-only">Xiamen practice</h1>
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
                  {roman(word)}
                  <br />
                  {word.ipa}
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
  const { pathname } = useLocation();
  useEffect(() => {
    const suffix = pathname.split("/").at(-1);
    document.title = `HanLingo — Xiamen${suffix === "xiamen" ? "" : ` · ${suffix}`}`;
  }, [pathname]);
  return (
    <div className="xm-page">
      <div className="xm-chapter-nav">
        <Link to="/languages/min" className="xm-min-link">
          <ArrowLeft size={15} /> Min
        </Link>
        <nav aria-label="Xiamen learning sections">
          {[
            ["", "Overview"],
            ["/words", "Words"],
            ["/culture", "Culture"],
            ["/sounds", "Sounds"],
            ["/practice", "Practice"],
          ].map(([path, label]) => (
            <NavLink key={path} to={BASE + path} end>
              {label}
            </NavLink>
          ))}
        </nav>
        <Link
          to={`${BASE}/words?saved=1`}
          className="xm-collection-link"
          aria-label={`${saved.items.length} saved words`}
        >
          <Bookmark size={16} />
          {saved.items.length}
        </Link>
      </div>
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
        <Route path="culture" element={<Culture />} />
        <Route path="sounds" element={<Sounds />} />
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
                <ArrowLeft size={16} /> Back to Xiamen
              </Link>
            </div>
          }
        />
      </Routes>
      <NotationNote />
    </div>
  );
}
