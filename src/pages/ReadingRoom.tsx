import { Fragment } from "react";
import { ArrowLeftRight, ArrowRight } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { letters } from "../data/languages";
import type { Letter } from "../data/languages";
import "./ReadingRoom.css";

const names: Record<Letter["id"], string> = {
  mandarin: "Standard Mandarin",
  min: "Xiamen Southern Min",
  yue: "Guangfu Cantonese",
  hakka: "Meixian Hakka",
  wu: "Shanghai Wu",
  formal: "Formal written Chinese",
};

// Exact excerpts from the supplied texts, not dictionary or pronunciation claims.
const expressions: {
  meaning: string;
  values: Record<Letter["id"], string>;
}[] = [
  {
    meaning: "Addressing mother",
    values: { mandarin: "媽", min: "阿母", yue: "阿媽", hakka: "阿姆", wu: "姆媽", formal: "親愛的媽媽" },
  },
  {
    meaning: "First-person pronoun",
    values: { mandarin: "我", min: "我", yue: "我", hakka: "𠊎", wu: "我", formal: "我" },
  },
  {
    meaning: "The market",
    values: { mandarin: "市場", min: "菜市仔", yue: "街市", hakka: "市場", wu: "菜場", formal: "市場" },
  },
  {
    meaning: "Going home",
    values: { mandarin: "回家", min: "轉去厝", yue: "返屋企", hakka: "轉屋下", wu: "回屋裏", formal: "回家" },
  },
];

export default function ReadingRoom() {
  const [params, setParams] = useSearchParams();
  const showEnglish = params.get("english") === "1";
  const left = letters.find((letter) => letter.id === params.get("left")) ?? letters.find((letter) => letter.id === "min")!;
  const right = letters.find((letter) => letter.id === params.get("right")) ?? letters.find((letter) => letter.id === "yue")!;
  const selected = [left, right];

  function selectLetter(side: "left" | "right", id: string) {
    const next = new URLSearchParams(params);
    next.set("left", side === "left" ? id : left.id);
    next.set("right", side === "right" ? id : right.id);
    setParams(next, { replace: true });
  }

  function swapLetters() {
    const next = new URLSearchParams(params);
    next.set("left", right.id);
    next.set("right", left.id);
    setParams(next, { replace: true });
  }

  function setShowEnglish(visible: boolean) {
    const next = new URLSearchParams(params);
    if (visible) next.set("english", "1");
    else next.delete("english");
    setParams(next);
  }

  return (
    <div className="rr-page">
      <header className="rr-heading">
        <h1>Compare</h1>
      </header>

      <div className="rr-controls">
        <div className="rr-selectors">
          {selected.map((letter, index) => {
            const side = index === 0 ? "left" : "right";
            return (
              <label key={side} htmlFor={`rr-${side}`}>
                <span>{index === 0 ? "First text" : "Second text"}</span>
                <select id={`rr-${side}`} value={letter.id} onChange={(event) => selectLetter(side, event.target.value)}>
                  {letters.map((option) => <option key={option.id} value={option.id}>{names[option.id]}</option>)}
                </select>
              </label>
            );
          })}
        </div>
        <div className="rr-tools">
          <label className="rr-english-toggle">
            <input type="checkbox" checked={showEnglish} onChange={(event) => setShowEnglish(event.target.checked)} />
            <span>Show English meaning</span>
          </label>
          <button type="button" className="rr-swap" onClick={swapLetters} disabled={left.id === right.id}>
            <ArrowLeftRight size={16} aria-hidden="true" /> Swap texts
          </button>
        </div>
      </div>

      <div className="rr-letter-frame">
        <table className="rr-passages">
          <caption className="sr-only">{names[left.id]} and {names[right.id]}, aligned by paragraph</caption>
          <thead>
            <tr>
              {selected.map((letter, index) => (
                <th key={index} scope="col" id={`rr-column-${index}`}>
                  <span>{names[letter.id]}</span>
                  <span className="rr-reference-type">{letter.id === "formal" ? "Written register" : "Contributor sample"}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="rr-greeting-row">
              {selected.map((letter, index) => (
                <td key={index} headers={`rr-column-${index}`}>
                  <span className="rr-mobile-name">{names[letter.id]}</span>
                  <p className="rr-han" lang="zh-Hant">{letter.salutation}</p>
                </td>
              ))}
            </tr>
            {left.paragraphs.map((_, paragraphIndex) => (
              <Fragment key={paragraphIndex}>
                <tr className="rr-paragraph-row">
                  {selected.map((letter, index) => (
                    <td key={index} headers={`rr-column-${index}`}>
                      <span className="rr-mobile-name">{names[letter.id]}</span>
                      <p className="rr-han" lang="zh-Hant">{letter.paragraphs[paragraphIndex]}</p>
                    </td>
                  ))}
                </tr>
                {showEnglish && (
                  <tr className="rr-english-row">
                    <td colSpan={2}>
                      <span>English meaning</span>
                      {left.english[paragraphIndex] === right.english[paragraphIndex] ? (
                        <p>{left.english[paragraphIndex]}</p>
                      ) : (
                        <div className="rr-different-meanings">
                          {selected.map((letter, index) => <p key={index}><b>{names[letter.id]}:</b> {letter.english[paragraphIndex]}</p>)}
                        </div>
                      )}
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
            <tr className="rr-closing-row">
              {selected.map((letter, index) => (
                <td key={index} headers={`rr-column-${index}`}>
                  <span className="rr-mobile-name">{names[letter.id]}</span>
                  <p className="rr-han" lang="zh-Hant">{letter.closing}</p>
                </td>
              ))}
            </tr>
            <tr className="rr-review-row">
              {selected.map((letter, index) => (
                <td key={index} headers={`rr-column-${index}`}>
                  <span className="rr-mobile-name">{names[letter.id]}</span>
                  <p>{letter.note}</p>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      <p className="rr-provenance">
        Chinese texts are preserved as supplied. English summarizes their shared meaning;
        it is not a word-for-word gloss. No pronunciation is inferred from these samples.
      </p>

      <section className="rr-expressions" aria-labelledby="rr-expressions-title">
        <h2 id="rr-expressions-title">Expressions in these letters</h2>
        <table className="rr-expression-table">
          <thead><tr><th scope="col">Context</th><th scope="col">{names[left.id]}</th><th scope="col">{names[right.id]}</th></tr></thead>
          <tbody>
            {expressions.map((expression) => (
              <tr key={expression.meaning}>
                <th scope="row">{expression.meaning}</th>
                {selected.map((letter, index) => (
                  <td key={index}>
                    <span className="rr-mobile-name">{names[letter.id]}</span>
                    <span className="rr-han" lang="zh-Hant">{expression.values[letter.id]}</span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <p className="rr-expression-note">These excerpts show wording in context. A shared character does not guarantee a shared pronunciation.</p>
      </section>

      <section className="rr-written-reference" aria-labelledby="rr-written-title">
        <div>
          <h2 id="rr-written-title">Modern Standard Written Chinese</h2>
          <p>The formal letter is a shared written register closely associated with Mandarin. It is not a sixth spoken group or a transcript of every community’s everyday speech.</p>
        </div>
        <Link to="/written-chinese">Read the reference <ArrowRight size={17} aria-hidden="true" /></Link>
      </section>
    </div>
  );
}
