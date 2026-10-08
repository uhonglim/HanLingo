import { useState } from "react";
import type { CSSProperties } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { languages, letters } from "../data/languages";

export default function ReadingRoom() {
  const [searchParams, setSearchParams] = useSearchParams();
  const validId = (id: string | null, fallback: string) =>
    letters.some((item) => item.id === id) ? id! : fallback;
  const leftLetter = validId(searchParams.get("left"), "min");
  const rightLetter = validId(searchParams.get("right"), "yue");
  const setLeftLetter = (id: string) =>
    setSearchParams({ left: id, right: rightLetter }, { replace: true });
  const setRightLetter = (id: string) =>
    setSearchParams({ left: leftLetter, right: id }, { replace: true });
  const [fullLetter, setFullLetter] = useState(true);
  const [translation, setTranslation] = useState(false);
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
    <div className="reading-room">
      <div className="page-breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <span>The reading room</span>
      </div>
      <section
        className="comparison-section"
        id="compare"
        aria-labelledby="compare-title"
      >
        <div className="section-heading">
          <div>
            <div className="eyebrow">02 / SAME THOUGHT, DIFFERENT WORDS</div>
            <h1 id="compare-title">A letter home.</h1>
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
            Choose any two voices above, or compare with Modern Standard Written
            Chinese.
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

      <section className="comparison-words">
        <div className="eyebrow">LOOK CLOSER</div>
        <h2>The words that carry the feeling.</h2>
        <p>
          Compare written expressions in the supplied letters. These are
          contextual examples, not pronunciation guides or a complete
          dictionary.
        </p>
        <div className="word-comparison-scroll">
          <table>
            <thead>
              <tr>
                <th>In this letter</th>
                <th>Mandarin</th>
                <th>Min · Xiamen</th>
                <th>Yue · Guangfu</th>
                <th>Hakka · Meixian</th>
                <th>Wu · Shanghai</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Addressing mother</th>
                <td lang="zh-Hant">媽</td>
                <td lang="zh-Hant">阿母</td>
                <td lang="zh-Hant">阿媽</td>
                <td lang="zh-Hant">阿姆</td>
                <td lang="zh-Hant">姆媽</td>
              </tr>
              <tr>
                <th>The first-person pronoun</th>
                <td lang="zh-Hant">我</td>
                <td lang="zh-Hant">我</td>
                <td lang="zh-Hant">我</td>
                <td lang="zh-Hant">𠊎</td>
                <td lang="zh-Hant">我</td>
              </tr>
              <tr>
                <th>Going home</th>
                <td lang="zh-Hant">回家</td>
                <td lang="zh-Hant">轉去厝</td>
                <td lang="zh-Hant">返屋企</td>
                <td lang="zh-Hant">轉屋下</td>
                <td lang="zh-Hant">回屋裏</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="reading-note">
          A shared character does not guarantee a shared pronunciation. Full
          phonetic transcriptions will be added only with local-speaker review.
        </p>
        <Link to="/written-chinese" className="text-link">
          Explore the written reference <ArrowRight size={16} />
        </Link>
      </section>
    </div>
  );
}
