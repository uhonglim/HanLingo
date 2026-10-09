import { practiceSelection } from "../data/learning/practice";
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import type { AttestedWord } from "../data/learning/types";
import { searchWords } from "../data/learning";
import { wordTopic, wordTopics } from "../data/learning/word-topics";
import { useWordNotebook } from "../hooks/useWordNotebook";
import { LearningWord } from "./BranchLearning";
import RegionalDifferences, {
  extraRegionalWords,
  RegionalWord,
} from "./RegionalDifferences";

export default function LocalWordCollection({
  localityId,
  words,
  base,
}: {
  localityId: string;
  words: AttestedWord[];
  base: string;
}) {
  const [params, setParams] = useSearchParams();
  const { saved } = useWordNotebook();
  const query = params.get("q") ?? "";
  const requested = params.get("topic") ?? "";
  const characterOnly = words.length > 0 && words.every(word => word.learningKind === "character-reading");
  const entryLabel = characterOnly ? "readings" : "words";
  const regional = extraRegionalWords(localityId, words);
  const topics = wordTopics.filter((topic) =>
    [...words, ...regional].some((word) => wordTopic(word.english) === topic),
  );
  const topic = topics.find((item) => item === requested) ?? "";
  const savedOnly = params.get("saved") === "1";
  const matchesTopic = (word: { english: string }) =>
    !topic || wordTopic(word.english) === topic;
  const filtered = searchWords(words, query).filter(
    (word) => matchesTopic(word) && (!savedOnly || saved.includes(word.id)),
  );
  const other = savedOnly
    ? []
    : extraRegionalWords(localityId, words, query).filter(matchesTopic);
  const count = filtered.length + other.length;
  const viewKey = `${localityId}/${query}/${topic}/${savedOnly}`;
  const [window, setWindow] = useState({ key: viewKey, size: 48 });
  const visibleCount = window.key === viewKey ? window.size : 48;
  const shownWords = filtered.slice(0, visibleCount);
  const shownOther = other.slice(0, Math.max(0, visibleCount - shownWords.length));
  const savedWords = words.filter((word) => saved.includes(word.id));
  const savedCount = savedWords.length;
  const canPracticeSaved =
    Boolean(practiceSelection(savedWords));
  const update = (name: string, value: string) => {
    const next = new URLSearchParams(params);
    if (value) next.set(name, value);
    else next.delete(name);
    setParams(next, { replace: true, preventScrollReset: true });
  };
  return (
    <>
      {characterOnly && <p className="learning-register">Source character readings. These identify the written characters; they are not translations of everyday words.</p>}
      <div className="local-word-tools">
        <label className="local-learning-search">
          <span className="sr-only">Search words</span>
          <input
            type="search"
            value={query}
            placeholder={characterOnly ? "Character, meaning, IPA, or spelling" : "Word, meaning, IPA, or spelling"}
            onChange={(event) => update("q", event.target.value)}
          />
        </label>
        {!characterOnly && topics.length > 1 && <label className="local-topic-select">
          <span className="sr-only">Word topic</span>
          <select
            aria-label="Word topic"
            value={topic}
            onChange={(event) => update("topic", event.target.value)}
          >
            <option value="">All topics</option>
            {topics.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>}
        {words.length > 0 && (
          <label className="local-saved-toggle">
            <input
              type="checkbox"
              checked={savedOnly}
              onChange={(event) =>
                update("saved", event.target.checked ? "1" : "")
              }
            />
            Saved · {savedCount}
          </label>
        )}
      </div>
      <div className="local-word-results">
        <p role="status">
          {count} of {words.length + regional.length} {entryLabel}
        </p>
        {savedOnly && canPracticeSaved && (
          <Link to={`${base}/practice?saved=1`}>Practice saved {entryLabel}</Link>
        )}
      </div>
      {count > 0 ? (
        <div className="learning-word-grid">
          {shownWords.map((word) => (
            <LearningWord key={word.id} word={word} />
          ))}
          {shownOther.map((word) => (
            <RegionalWord key={word.id} reading={word} />
          ))}
        </div>
      ) : (
        <div className="local-words-empty">
          <h2>
            {savedOnly && !savedCount
              ? (characterOnly ? "Your reading collection starts here" : "Your word collection starts here")
              : `No matching ${entryLabel}`}
          </h2>
          <p>
            {savedOnly && !savedCount
              ? "Save an entry with its bookmark, then return here to review it."
              : "Try another meaning, sound, or topic."}
          </p>
          <button
            onClick={() =>
              setParams({}, { replace: true, preventScrollReset: true })
            }
          >
            Show all {entryLabel}
          </button>
        </div>
      )}
      {count > visibleCount && <button className="learning-show-more" onClick={() => setWindow({ key: viewKey, size: visibleCount + 48 })}>Show more {entryLabel} · {Math.min(visibleCount, count)} of {count}</button>}
      <RegionalDifferences
        key={localityId}
        localityId={localityId}
        query={query}
      />
    </>
  );
}
