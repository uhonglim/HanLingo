import SourceToneInventory from "../components/SourceToneInventory";
import { practiceSelection, practiceSpelling, localWordCanDistract } from "../data/learning/practice";
import LocalRecordings from '../components/LocalRecordings';
import PlaceName from "../components/PlaceName";
import { useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { resolveReferenceRoute, varietyPath } from "../routing";
import { placeLabel } from "../data/language-names";
import {
  availableSections,
  getLocalLearning,
  learningSections,
  spellingFor,
} from "../data/learning";
import type { LearningSection } from "../data/learning";
import type { AttestedWord } from "../data/learning/types";
import { PhotoReadings, wordsForPhoto } from "../components/LocalityScenes";
import LocalWordCollection from "../components/LocalWordCollection";
import LocalToneExplorer from "../components/LocalToneExplorer";
import { useWordNotebook } from "../hooks/useWordNotebook";
import RegionalDifferences from "../components/RegionalDifferences";
import "../components/BranchLearning.css";
import { makeQuiz } from "../data/xiamen-romanization";
import PhotoGallery from "../components/gallery/PhotoGallery";
import Pronunciation from "../components/Pronunciation";
import LocalSoundExplorer from "../components/LocalSoundExplorer";
import { getLocalGallery } from "../data/galleries";

function Practice({ words, mode }: { words: AttestedWord[]; mode: "meaning" | "spelling" }) {
  const label = (word: AttestedWord) => mode === "spelling" ? practiceSpelling(word)! : word.english;
  const pool = [...new Map(words.map(word => [label(word), word])).values()];
  const canDistract = (answer: AttestedWord, candidate: AttestedWord) => mode === "spelling" ? label(answer) !== label(candidate) : localWordCanDistract(answer, candidate);
  const [deck, setDeck] = useState(() =>
    makeQuiz(
      pool,
      10, Math.random, canDistract,
    ),
  );
  const [round, setRound] = useState(0);
  const [selected, setSelected] = useState<string>();
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const question = deck[round].answer;
  const options = deck[round].options.map(label);
  const answer = (value: string) => {
    if (selected) return;
    setSelected(value);
    if (value === label(question)) setScore(score + 1);
  };
  const restart = () => {
    setDeck(
      makeQuiz(
        pool,
        10, Math.random, canDistract,
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
        <p>{mode === "spelling" ? "Correct spellings" : "Correct meanings"}</p>
        <button className="learning-quiz-next" onClick={restart}>
          Try again
        </button>
      </section>
    );
  return (
    <section className="learning-quiz" aria-label={mode === "spelling" ? "IPA spelling practice" : "Word practice"}>
      <p className="learning-quiz-progress">
        {round + 1} / {deck.length}
      </p>
      <h2 lang="zh-Hant">{question.han}</h2>
      {question.registerLabel && (
        <p className="learning-register">{question.registerLabel}</p>
      )}
      <Pronunciation
        ipa={question.ipa}
        toneNotation={question.toneNotation}
        spelling={mode === "spelling" && !selected ? undefined : spellingFor(question)}
      />
      <p>{mode === "spelling" ? "Match this IPA to HanLingo spelling." : "Choose the meaning."}</p>
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
            {selected === label(question)
              ? "Correct."
              : `Answer: ${label(question)}.`}
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
              {round + 1 === deck.length ? "Results" : mode === "spelling" ? "Next reading" : "Next word"}
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
  const [query] = useSearchParams();
  const { saved } = useWordNotebook();
  const data = point ? getLocalLearning(point) : undefined;
  const valid = point && availableSections(point).includes(chapter);
  if (!valid || !point || !data)
    return (
      <div className="local-learning-page">
        <h1>Entry not found</h1>
        <Link to={point ? varietyPath(point) : "/"}>
          Return to {point ? placeLabel(point) : "HanLingo"}
        </Link>
      </div>
    );
  if (chapter === "culture")
    return (
      <div className="local-learning-page local-gallery-page">
        <PhotoGallery
          key={point.id}
          place={placeLabel(point)}
          placeIdentity={point}
          photos={getLocalGallery(point.id)}
          renderDetail={(photo) =>
            wordsForPhoto(photo, data.words).length ? (
              <PhotoReadings
                photo={photo}
                words={data.words}
                base={varietyPath(point)}
              />
            ) : null
          }
        />
      </div>
    );
  const allPractice = practiceSelection(data.words);
  const savedWords = data.words.filter((word) => saved.includes(word.id));
  const savedSelection = practiceSelection(savedWords);
  const savedPractice = query.get("saved") === "1" && Boolean(savedSelection);
  const activePractice = savedPractice ? savedSelection : allPractice;
  return (
    <div className="local-learning-page" key={`${point.id}/${chapter}`}>
      <header>
        <h1>
          <PlaceName point={point}/> {learningSections[chapter].toLowerCase()}
        </h1>
      </header>
      {chapter === "words" && (
        <LocalWordCollection
          key={point.id}
          localityId={point.id}
          words={data.words}
          base={varietyPath(point)}
        />
      )}
      {chapter === "sounds" && (
        <>
          <LocalRecordings localityId={point.id} />
          {data.toneInventories.map(inventory => <SourceToneInventory key={inventory.id} inventory={inventory} />)}
          <LocalSoundExplorer key={`${point.id}-sounds`} words={data.words} />
          <LocalToneExplorer key={`${point.id}-tones`} words={data.words} />
          <RegionalDifferences key={`${point.id}-differences`} localityId={point.id} />
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
        </>
      )}
      {chapter === "practice" &&
      query.get("saved") === "1" &&
      !savedPractice ? (
        <section className="local-words-empty">
          <h2>Save four distinct answers to practise</h2>
          <p>
            Save four different local meanings or four different HanLingo spellings.
          </p>
          <Link
            className="learning-source"
            to={`${varietyPath(point)}/words?saved=1`}
          >
            Your saved words
          </Link>
          {" · "}
          <Link
            className="learning-source"
            to={`${varietyPath(point)}/practice`}
          >
            Use all words
          </Link>
        </section>
      ) : (
        chapter === "practice" && activePractice && (
          <>
            {savedPractice && (
              <p className="learning-register">
                Practising your saved entries ·{" "}
                <Link to={`${varietyPath(point)}/practice`}>Use all words</Link>
              </p>
            )}
            <Practice
              key={`${point.id}/${savedPractice ? savedWords.map((word) => word.id).join(",") : "all"}`}
              words={activePractice.words}
              mode={activePractice.mode}
            />
          </>
        )
      )}
    </div>
  );
}
