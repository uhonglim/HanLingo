import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { resolveReferenceRoute, varietyPath } from "../routing";
import { placeLabel } from "../data/language-names";
import {
  availableSections,
  getLocalLearning,
  learningSections,
  searchWords,
  spellingFor,
} from "../data/learning";
import type { LearningSection } from "../data/learning";
import type { AttestedWord } from "../data/learning/types";
import { LearningWord } from "../components/BranchLearning";
import "../components/BranchLearning.css";
import { makeQuiz } from "../data/xiamen-romanization";

function Practice({ words }: { words: AttestedWord[] }) {
  const [deck, setDeck] = useState(() =>
    makeQuiz(
      [...new Map(words.map((word) => [word.english, word])).values()],
      10,
    ),
  );
  const [round, setRound] = useState(0);
  const [selected, setSelected] = useState<string>();
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const question = deck[round].answer;
  const options = deck[round].options.map((word) => word.english);
  const answer = (value: string) => {
    if (selected) return;
    setSelected(value);
    if (value === question.english) setScore(score + 1);
  };
  const restart = () => {
    setDeck(
      makeQuiz(
        [...new Map(words.map((word) => [word.english, word])).values()],
        10,
      ),
    );
    setRound(0);
    setSelected(undefined);
    setScore(0);
    setFinished(false);
  };
  if (finished)
    return (
      <section className="learning-quiz">
        <h2>
          {score} / {deck.length}
        </h2>
        <p>Correct meanings</p>
        <button className="learning-quiz-next" onClick={restart}>
          Try again
        </button>
      </section>
    );
  return (
    <section className="learning-quiz" aria-label="Word practice">
      <p className="learning-quiz-progress">
        {round + 1} / {deck.length}
      </p>
      <h2 lang="zh-Hant">{question.han}</h2>
      <p className="learning-spelling">{spellingFor(question)}</p>
      <p className="learning-ipa">
        {question.toneNotation === "source-category" && (
          <span>IPA · source tone categories </span>
        )}
        {question.ipa}
      </p>
      <p>Choose the meaning.</p>
      <div className="learning-quiz-answers">
        {options.map((option) => (
          <button
            key={option}
            aria-pressed={selected === option}
            disabled={Boolean(selected)}
            onClick={() => answer(option)}
          >
            {option}
          </button>
        ))}
      </div>
      {selected && (
        <div aria-live="polite">
          <p>
            {selected === question.english
              ? "Correct."
              : `Answer: ${question.english}.`}
          </p>
          <p>{question.reading}</p>
          {question.note && <p>{question.note}</p>}
          <a
            className="learning-source"
            href={question.source.url}
            target="_blank"
            rel="noreferrer"
          >
            {question.source.title}
          </a>
          <p>
            <button
              className="learning-quiz-next"
              onClick={() => {
                if (round + 1 === deck.length) setFinished(true);
                else {
                  setRound(round + 1);
                  setSelected(undefined);
                }
              }}
            >
              {round + 1 === deck.length ? "Results" : "Next word"}
            </button>
          </p>
        </div>
      )}
    </section>
  );
}

export default function LocalLearningPage() {
  const params = useParams();
  const route = resolveReferenceRoute(params);
  const point = route?.point;
  const chapter = params.chapter as LearningSection;
  const [query, setQuery] = useSearchParams();
  const term = query.get("q") ?? "";
  const data = point ? getLocalLearning(point) : undefined;
  const valid = point && availableSections(point).includes(chapter);
  useEffect(() => {
    if (point && valid)
      document.title = `${placeLabel(point)} ${learningSections[chapter].toLowerCase()} · HanLingo`;
  }, [point, chapter, valid]);
  if (!valid || !point || !data)
    return (
      <div className="local-learning-page">
        <h1>Entry not found</h1>
        <Link to={point ? varietyPath(point) : "/"}>
          Return to {point ? placeLabel(point) : "HanLingo"}
        </Link>
      </div>
    );
  const words = searchWords(data.words, term);
  return (
    <div className="local-learning-page" key={`${point.id}/${chapter}`}>
      <header>
        <h1>
          {placeLabel(point)} {learningSections[chapter].toLowerCase()}
        </h1>
        {chapter === "words" && (
          <p>
            {words.length} of {data.words.length} words
          </p>
        )}
      </header>
      {chapter === "words" && (
        <>
          <label className="local-learning-search">
            <span className="sr-only">Search words</span>
            <input
              type="search"
              value={term}
              placeholder="Word, meaning, IPA, or spelling"
              onChange={(event) => {
                const next = new URLSearchParams(query);
                if (event.target.value) next.set("q", event.target.value);
                else next.delete("q");
                setQuery(next, { replace: true, preventScrollReset: true });
              }}
            />
          </label>
          <div className="learning-word-grid">
            {words.map((word) => (
              <LearningWord key={word.id} word={word} />
            ))}
          </div>
          {!words.length && <p role="status">No words match “{term}”.</p>}
        </>
      )}
      {chapter === "sounds" && (
        <>
          <div className="local-sound-notes">
            {data.soundNotes.map((note) => (
              <article key={note.title}>
                <h2>{note.title}</h2>
                <p>{note.text}</p>
                <a
                  className="learning-source"
                  href={note.source.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {note.source.title}
                </a>
              </article>
            ))}
          </div>
          {data.words.length > 0 && (
            <section>
              <h2>IPA in words</h2>
              <div className="learning-word-grid">
                {data.words.map((word) => (
                  <LearningWord key={word.id} word={word} />
                ))}
              </div>
            </section>
          )}
        </>
      )}
      {chapter === "culture" &&
        data.culture
          .filter((item) => item.photo)
          .map((item) => {
            const photo = item.photo!;
            return (
              <figure className="local-learning-photo" key={item.title}>
                <img
                  src={photo.src}
                  alt={photo.alt}
                  style={{ objectPosition: photo.position }}
                />
                <figcaption>
                  {photo.caption}{" "}
                  <a href={photo.sourceUrl} target="_blank" rel="noreferrer">
                    {photo.author}
                  </a>{" "}
                  ·{" "}
                  <a href={photo.licenseUrl} target="_blank" rel="noreferrer">
                    {photo.license}
                  </a>
                </figcaption>
                <h2>{item.title}</h2>
                {item.text && <p>{item.text}</p>}
                {item.source.url !== photo.sourceUrl && (
                  <a
                    className="learning-source"
                    href={item.source.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {item.source.title}
                  </a>
                )}
              </figure>
            );
          })}
      {chapter === "practice" && <Practice key={point.id} words={data.words} />}
    </div>
  );
}
