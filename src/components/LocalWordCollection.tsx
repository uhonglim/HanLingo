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
  const savedWords = words.filter((word) => saved.includes(word.id));
  const savedCount = savedWords.length;
  const canPracticeSaved =
    new Set(savedWords.map((word) => word.english)).size >= 4;
  const update = (name: string, value: string) => {
    const next = new URLSearchParams(params);
    if (value) next.set(name, value);
    else next.delete(name);
    setParams(next, { replace: true, preventScrollReset: true });
  };
  return (
    <>
      <div className="local-word-tools">
        <label className="local-learning-search">
          <span className="sr-only">Search words</span>
          <input
            type="search"
            value={query}
            placeholder="Word, meaning, IPA, or spelling"
            onChange={(event) => update("q", event.target.value)}
          />
        </label>
        <label className="local-topic-select">
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
        </label>
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
          {count} of {words.length + regional.length} words
        </p>
        {savedOnly && canPracticeSaved && (
          <Link to={`${base}/practice?saved=1`}>Practice saved words</Link>
        )}
      </div>
      {count > 0 ? (
        <div className="learning-word-grid">
          {filtered.map((word) => (
            <LearningWord key={word.id} word={word} />
          ))}
          {other.map((word) => (
            <RegionalWord key={word.id} reading={word} />
          ))}
        </div>
      ) : (
        <div className="local-words-empty">
          <h2>
            {savedOnly && !savedCount
              ? "Your word collection starts here"
              : "No matching words"}
          </h2>
          <p>
            {savedOnly && !savedCount
              ? "Save a word with its bookmark, then return here to review it."
              : "Try another meaning, sound, or topic."}
          </p>
          <button
            onClick={() =>
              setParams({}, { replace: true, preventScrollReset: true })
            }
          >
            Show all words
          </button>
        </div>
      )}
      <RegionalDifferences
        key={localityId}
        localityId={localityId}
        query={query}
      />
    </>
  );
}
