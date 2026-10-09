/// <reference types="vite/client" />
import targetNames from "../data/translation-targets.json";
import { siteTerms } from "../data/site-terms";
import { Fragment, useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { ArrowLeftRight } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { letters } from "../data/languages";
import type { Letter } from "../data/languages";
import "./ReadingRoom.css";

const targetName = (id: string) => targetNames.find(item => item.id === id)!.name;
const names: Record<Letter["id"], string> = {
  mandarin: "Standard Mandarin",
  min: `${targetName("amoy")} · Southern Min`,
  yue: `${targetName("guangzhou")} · Cantonese`,
  hakka: `${targetName("meixian")} · Hakka`,
  wu: `${targetName("shanghai")} · Wu`,
  formal: siteTerms.writtenChinese,
};

// Exact excerpts from the supplied texts, not dictionary or pronunciation claims.
const expressions: {
  meaning: string;
  values: Record<Letter["id"], string>;
}[] = [
  {
    meaning: "Addressing mother",
    values: {
      mandarin: "媽",
      min: "阿母",
      yue: "阿媽",
      hakka: "阿姆",
      wu: "姆媽",
      formal: "親愛的媽媽",
    },
  },
  {
    meaning: "First-person pronoun",
    values: {
      mandarin: "我",
      min: "我",
      yue: "我",
      hakka: "𠊎",
      wu: "我",
      formal: "我",
    },
  },
  {
    meaning: "The market",
    values: {
      mandarin: "市場",
      min: "菜市仔",
      yue: "街市",
      hakka: "市場",
      wu: "菜場",
      formal: "市場",
    },
  },
  {
    meaning: "Going home",
    values: {
      mandarin: "回家",
      min: "轉去厝",
      yue: "返屋企",
      hakka: "轉屋下",
      wu: "回屋裏",
      formal: "回家",
    },
  },
];

const translationApiBase = (
  import.meta.env.VITE_TRANSLATION_API_BASE ?? ""
).replace(/\/$/, "");

type TranslationTarget =
  "amoy" | "beijing" | "shanghai" | "guangzhou" | "meixian" | "written";
type TranslationResult = {
  target: TranslationTarget;
  text: string;
  status: "draft" | "needs-review" | "unavailable";
  notes: string[];
};

const targets = targetNames as { id: TranslationTarget; name: string; lang: string }[];

export function readResults(value: unknown): TranslationResult[] {
  if (
    !value ||
    typeof value !== "object" ||
    !("mode" in value) ||
    value.mode !== "model" ||
    !("results" in value) ||
    !Array.isArray(value.results) ||
    value.results.length !== 6
  ) {
    throw new Error("Invalid translation response");
  }
  const found = new Set<string>();
  return value.results.map((item: unknown) => {
    if (
      !item ||
      typeof item !== "object" ||
      !("target" in item) ||
      !targets.some((target) => target.id === item.target) ||
      !("text" in item) ||
      typeof item.text !== "string" ||
      item.text.length > 6000 ||
      !("status" in item) ||
      !["draft", "needs-review", "unavailable"].includes(String(item.status)) ||
      !("notes" in item) ||
      !Array.isArray(item.notes) ||
      !item.notes.every((note: unknown) => typeof note === "string") ||
      (!item.text.trim() && item.status !== "unavailable") ||
      found.has(String(item.target))
    ) {
      throw new Error("Invalid translation result");
    }
    found.add(String(item.target));
    return item as TranslationResult;
  });
}

export default function ReadingRoom() {
  const [params] = useSearchParams();
  const [text, setText] = useState("");
  const [source, setSource] = useState("auto");
  const [results, setResults] = useState<TranslationResult[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [configured, setConfigured] = useState<boolean | null>(null);
  const [announcement, setAnnouncement] = useState("");
  const [sampleOpen, setSampleOpen] = useState(
    () => params.has("left") || params.has("right") || params.has("english"),
  );
  const request = useRef<AbortController | null>(null);
  const sequence = useRef(0);
  const legacyLeft = params.get("left");
  const legacyRight = params.get("right");
  const legacyEnglish = params.get("english");

  useEffect(() => {
    if (legacyLeft || legacyRight || legacyEnglish) setSampleOpen(true);
  }, [legacyLeft, legacyRight, legacyEnglish]);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`${translationApiBase}/api/translation/status`, {
      signal: controller.signal,
      headers: { Accept: "application/json" },
    })
      .then(async (response) => {
        if (!response.ok) throw new Error("Service status unavailable");
        const body: unknown = await response.json();
        if (
          body &&
          typeof body === "object" &&
          "configured" in body &&
          typeof body.configured === "boolean"
        ) {
          if (!controller.signal.aborted) setConfigured(body.configured);
        }
      })
      .catch(() => {
        /* The translation request reports an actionable service error. */
      });
    return () => {
      controller.abort();
      sequence.current += 1;
      request.current?.abort();
    };
  }, []);

  function invalidate() {
    sequence.current += 1;
    request.current?.abort();
    request.current = null;
    setLoading(false);
    setResults(null);
    setError("");
    setAnnouncement("");
  }

  function cancel() {
    sequence.current += 1;
    request.current?.abort();
    request.current = null;
    setLoading(false);
    setAnnouncement("Translation cancelled. Your text is unchanged.");
  }

  async function translate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loading) {
      cancel();
      return;
    }
    const input = text.trim();
    if (!input || text.length > 800) return;
    request.current?.abort();
    const controller = new AbortController();
    request.current = controller;
    const currentSequence = ++sequence.current;
    setLoading(true);
    setError("");
    setResults(null);
    setAnnouncement("Translating into six written versions.");
    try {
      const response = await fetch(`${translationApiBase}/api/translate`, {
        method: "POST",
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ text: input, source }),
      });
      if (!response.ok) {
        const message =
          response.status === 503 && configured === false
            ? "The translation service is not connected yet. Your text is unchanged."
            : response.status === 429
              ? "The translation service is busy. Please try again shortly."
              : response.status === 413 || response.status === 400
                ? "This text could not be translated. Keep it within 800 characters and try again."
                : "The translation service is unavailable. Your text is unchanged; please try again later.";
        throw new Error(message);
      }
      const translated = readResults(await response.json());
      if (currentSequence !== sequence.current || controller.signal.aborted)
        return;
      setResults(translated);
      setConfigured(true);
      setAnnouncement(
        "Translation request complete. Results and any review notes are shown below.",
      );
    } catch (cause) {
      if (currentSequence !== sequence.current || controller.signal.aborted)
        return;
      const message =
        cause instanceof Error &&
        cause.message.startsWith("The translation service")
          ? cause.message
          : cause instanceof Error && cause.message.startsWith("This text")
            ? cause.message
            : "The translation service is unavailable. Your text is unchanged; please try again later.";
      setError(message);
      setAnnouncement("");
    } finally {
      if (currentSequence === sequence.current) {
        setLoading(false);
        request.current = null;
      }
    }
  }

  return (
    <div className="rr-page">
      <header className="rr-heading">
        <h1>{siteTerms.compare}</h1>
        <p>One text, six written versions.</p>
      </header>
      <form className="rr-translator" onSubmit={translate}>
        <div className="rr-input-heading">
          <label htmlFor="rr-translation-input">Your text</label>
          <label className="rr-source-label" htmlFor="rr-source">
            <span className="sr-only">Source language</span>
            <select
              id="rr-source"
              value={source}
              onChange={(event) => {
                invalidate();
                setSource(event.target.value);
              }}
            >
              <option value="auto">Detect language</option>
              <option value="en">English</option>
              <option value="written">{siteTerms.writtenChinese}</option>
              {targets
                .filter((target) => target.id !== "written")
                .map((target) => (
                  <option key={target.id} value={target.id}>
                    {target.name}
                  </option>
                ))}
            </select>
          </label>
        </div>
        <textarea
          id="rr-translation-input"
          value={text}
          onChange={(event) => {
            invalidate();
            setText(event.target.value);
          }}
          maxLength={800}
          rows={5}
          placeholder="Write something you would say."
          aria-describedby="rr-input-count rr-provider-note"
        />
        <div className="rr-input-footer">
          <span id="rr-input-count">{text.length} / 800</span>
          <button
            className="rr-translate-button"
            type="submit"
            disabled={!loading && !text.trim()}
          >
            {loading ? "Cancel" : "Translate"}
          </button>
        </div>
        <p id="rr-provider-note" className="rr-provider-note">
          Text is sent to the translation service. Results are machine drafts.
        </p>
      </form>
      {error ? (
        <p className="rr-service-message rr-service-error" role="alert">
          {error}
        </p>
      ) : configured === false && !loading ? (
        <p className="rr-service-message">
          Translation is not available yet. You can still compare the sample
          letter below.
        </p>
      ) : null}
      <p className="sr-only" role="status" aria-live="polite">
        {announcement}
      </p>
      <section
        className="rr-translations"
        aria-labelledby="rr-translations-title"
        aria-busy={loading}
      >
        <div className="rr-results-heading">
          <h2 id="rr-translations-title">
            {loading
              ? "Translating…"
              : results
                ? "Machine drafts"
                : "Translations"}
          </h2>
        </div>
        <div className="rr-result-grid">
          {targets.map((target) => {
            const result = results?.find((item) => item.target === target.id);
            const unavailable =
              results !== null &&
              (!result ||
                result.status === "unavailable" ||
                !result.text.trim());
            return (
              <article
                className="rr-result"
                key={target.id}
                aria-labelledby={`rr-target-${target.id}`}
              >
                <header>
                  <h3 id={`rr-target-${target.id}`}>{target.name}</h3>
                  {unavailable ? (
                    <span className="rr-result-status">Unavailable</span>
                  ) : result?.status === "needs-review" ? (
                    <span className="rr-result-status">Needs review</span>
                  ) : null}
                </header>
                {result?.text.trim() && !unavailable ? (
                  <p className="rr-result-text" lang={target.lang}>
                    {result.text}
                  </p>
                ) : (
                  <p className="rr-result-placeholder">
                    <span aria-hidden="true">—</span>
                    <span className="sr-only">
                      {loading
                        ? "Translating"
                        : unavailable
                          ? "No translation returned"
                          : "Awaiting your text"}
                    </span>
                  </p>
                )}
                {result && result.notes.length > 0 && (
                  <ul className="rr-result-notes">
                    {result.notes.map((note, index) => (
                      <li key={index}>{note}</li>
                    ))}
                  </ul>
                )}
              </article>
            );
          })}
        </div>
      </section>
      <details
        className="rr-sample"
        open={sampleOpen}
        onToggle={(event) => setSampleOpen(event.currentTarget.open)}
      >
        <summary>Compare the sample letter</summary>
        <SampleLetterComparison />
      </details>
    </div>
  );
}

function SampleLetterComparison() {
  const [params, setParams] = useSearchParams();
  const showEnglish = params.get("english") === "1";
  const left =
    letters.find((letter) => letter.id === params.get("left")) ??
    letters.find((letter) => letter.id === "min")!;
  const right =
    letters.find((letter) => letter.id === params.get("right")) ??
    letters.find((letter) => letter.id === "yue")!;
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
    <div className="rr-sample-body">
      <div className="rr-tools">
        <label className="rr-english-toggle">
          <input
            type="checkbox"
            checked={showEnglish}
            onChange={(event) => setShowEnglish(event.target.checked)}
          />
          <span>English meaning</span>
        </label>
        <button
          type="button"
          className="rr-swap"
          onClick={swapLetters}
          disabled={left.id === right.id}
        >
          <ArrowLeftRight size={16} aria-hidden="true" /> Swap texts
        </button>
      </div>

      <table className="rr-passages">
        <caption className="sr-only">
          {names[left.id]} and {names[right.id]}, aligned by paragraph
        </caption>
        <thead>
          <tr>
            {selected.map((letter, index) => (
              <th key={index} scope="col" id={`rr-column-${index}`}>
                <label htmlFor={`rr-${index === 0 ? "left" : "right"}`}>
                  <span className="sr-only">
                    {index === 0 ? "First text" : "Second text"}
                  </span>
                  <select
                    id={`rr-${index === 0 ? "left" : "right"}`}
                    value={letter.id}
                    onChange={(event) =>
                      selectLetter(
                        index === 0 ? "left" : "right",
                        event.target.value,
                      )
                    }
                  >
                    {letters.map((option) => (
                      <option key={option.id} value={option.id}>
                        {names[option.id]}
                      </option>
                    ))}
                  </select>
                </label>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className="rr-greeting-row">
            {selected.map((letter, index) => (
              <td key={index} headers={`rr-column-${index}`}>
                <span className="rr-mobile-name">{names[letter.id]}</span>
                <p className="rr-han" lang="zh-Hant">
                  {letter.salutation}
                </p>
              </td>
            ))}
          </tr>
          {left.paragraphs.map((_, paragraphIndex) => (
            <Fragment key={paragraphIndex}>
              <tr className="rr-paragraph-row">
                {selected.map((letter, index) => (
                  <td key={index} headers={`rr-column-${index}`}>
                    <span className="rr-mobile-name">{names[letter.id]}</span>
                    <p className="rr-han" lang="zh-Hant">
                      {letter.paragraphs[paragraphIndex]}
                    </p>
                  </td>
                ))}
              </tr>
              {showEnglish && (
                <tr className="rr-english-row">
                  <td colSpan={2}>
                    <span>English meaning</span>
                    {left.english[paragraphIndex] ===
                    right.english[paragraphIndex] ? (
                      <p>{left.english[paragraphIndex]}</p>
                    ) : (
                      <div className="rr-different-meanings">
                        {selected.map((letter, index) => (
                          <p key={index}>
                            <b>{names[letter.id]}:</b>{" "}
                            {letter.english[paragraphIndex]}
                          </p>
                        ))}
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
                <p className="rr-han" lang="zh-Hant">
                  {letter.closing}
                </p>
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
      <p className="rr-provenance">
        Chinese texts are preserved as supplied. English summarizes their shared
        meaning; it is not a word-for-word gloss. No pronunciation is inferred
        from these samples.
      </p>

      <section
        className="rr-expressions"
        aria-labelledby="rr-expressions-title"
      >
        <h2 id="rr-expressions-title">Expressions</h2>
        <table className="rr-expression-table">
          <thead>
            <tr>
              <th scope="col">Context</th>
              <th scope="col">{names[left.id]}</th>
              <th scope="col">{names[right.id]}</th>
            </tr>
          </thead>
          <tbody>
            {expressions.map((expression) => (
              <tr key={expression.meaning}>
                <th scope="row">{expression.meaning}</th>
                {selected.map((letter, index) => (
                  <td key={index}>
                    <span className="rr-mobile-name">{names[letter.id]}</span>
                    <span className="rr-han" lang="zh-Hant">
                      {expression.values[letter.id]}
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <p className="rr-expression-note">
          These excerpts show wording in context. A shared character does not
          guarantee a shared pronunciation.
        </p>
      </section>

      <p className="rr-written-reference">
        <Link to="/written-chinese">{siteTerms.writtenChinese}</Link> is a
        shared written register closely associated with Mandarin, not a sixth
        spoken group.
      </p>
    </div>
  );
}
