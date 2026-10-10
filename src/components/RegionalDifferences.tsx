import PlaceName from "./PlaceName";
import { useState } from "react";
import { ipaSearchForms } from "../data/ipa-display";
import { Link } from "react-router-dom";
import { learningPlaces as mapPoints } from "../data/learning/places";
import {
  regionalConceptsFor,
  regionalReadingsFor,
  type RegionalReading,
} from "../data/regional-words";
import { spellingFor } from "../data/learning";
import type { AttestedWord } from "../data/learning/types";
import { varietyPath } from "../routing";
import Pronunciation from "./Pronunciation";
import { wordMeaning } from "../data/word-meaning";
import "./RegionalDifferences.css";
import "./BranchLearning.css";

function SourceReading({ reading }: { reading: RegionalReading }) {
  return (
    <>
      {reading.registerLabel && (
        <p className="learning-register">{reading.registerLabel}</p>
      )}
      {reading.ipa && (
        <Pronunciation
          ipa={reading.ipa}
          toneNotation={reading.toneNotation}
          spelling={spellingFor({
            ipa: reading.ipa,
            toneNotation: reading.toneNotation,
          })}
        />
      )}
      {reading.sourceRomanization && (
        <div className="regional-source-spelling">
          <span>{reading.sourceRomanization.system}</span>
          <strong>{reading.sourceRomanization.text}</strong>
        </div>
      )}
    </>
  );
}
export function extraRegionalWords(
  localityId: string,
  words: Pick<AttestedWord, "english">[],
  query = "",
) {
  const existing = new Set(words.map((word) => wordMeaning(word.english)));
  const terms = query.toLocaleLowerCase().normalize("NFC").trim();
  return regionalReadingsFor(localityId)
    .filter((reading) => !existing.has(wordMeaning(reading.english)))
    .filter((reading) =>
      [
        reading.han,
        reading.english,
        ...ipaSearchForms(reading.ipa ?? "", reading.toneNotation),
        reading.sourceRomanization?.text ?? "",
        reading.ipa
          ? (spellingFor({
              ipa: reading.ipa,
              toneNotation: reading.toneNotation,
            }) ?? "")
          : "",
      ].some((text) =>
        text.toLocaleLowerCase().normalize("NFC").includes(terms),
      ),
    );
}
export function RegionalWord({
  reading,
}: {
  reading: RegionalReading & { english: string };
}) {
  return (
    <article className="learning-word regional-word">
      <h3 lang="zh-Hant">{reading.han}</h3>
      <p className="learning-meaning">{reading.english}</p>
      <SourceReading reading={reading} />
      <details>
        <summary>Reading and source</summary>
        <p>{reading.scope}</p>
        {reading.note && <p>{reading.note}</p>}
        <a href={reading.source.url} target="_blank" rel="noreferrer">
          {reading.source.title}
        </a>
      </details>
    </article>
  );
}

export default function RegionalDifferences({
  localityId,
  query,
}: {
  localityId: string;
  query?: string;
}) {
  const all = regionalConceptsFor(localityId).filter(
    (concept) =>
      new Set(concept.readings.map((reading) => reading.localityId)).size > 1,
  );
  const terms = query?.toLowerCase().trim();
  const concepts = terms
    ? all.filter(
        (concept) =>
          concept.english.toLowerCase().includes(terms) ||
          concept.readings.some((reading) =>
            [
              reading.han,
              ...ipaSearchForms(reading.ipa ?? "", reading.toneNotation),
              reading.sourceRomanization?.text ?? "",
              reading.ipa
                ? (spellingFor({
                    ipa: reading.ipa,
                    toneNotation: reading.toneNotation,
                  }) ?? "")
                : "",
            ].some((value) =>
              value
                .toLowerCase()
                .normalize("NFC")
                .includes(terms.normalize("NFC")),
            ),
          ),
      )
    : all;
  const [chosen, setChosen] = useState("");
  const concept = concepts.find((item) => item.id === chosen) ?? concepts[0];
  if (!concept) return null;
  const current = mapPoints.find((point) => point.id === localityId)!;
  const rank = (id: string) => {
    const point = mapPoints.find((item) => item.id === id);
    return id === localityId
      ? 0
      : point?.subgroupId === current.subgroupId &&
          point.groupId === current.groupId
        ? 1
        : point?.groupId === current.groupId
          ? 2
          : 3;
  };
  const ids = [
    ...new Set(concept.readings.map((reading) => reading.localityId)),
  ].sort((a, b) => rank(a) - rank(b));
  const render = (id: string) => {
    const point = mapPoints.find((item) => item.id === id)!;
    return (
      <article
        className={
          id === localityId ? "regional-place is-current" : "regional-place"
        }
        key={id}
      >
        <h3>
          {id === localityId ? (
            <PlaceName point={point}/>
          ) : (
            <Link to={varietyPath(point)}><PlaceName point={point}/></Link>
          )}
        </h3>
        {concept.readings
          .filter((reading) => reading.localityId === id)
          .map((reading) => (
            <div key={reading.id} className="regional-reading">
              <p className="regional-han" lang="zh-Hant">
                {reading.han}
              </p>
              <SourceReading reading={reading} />
              <details>
                <summary>Reading and source</summary>
                <p>{reading.scope}</p>
                {reading.note && <p>{reading.note}</p>}
                <a href={reading.source.url} target="_blank" rel="noreferrer">
                  {reading.source.title}
                </a>
              </details>
            </div>
          ))}
      </article>
    );
  };
  return (
    <section className="regional-differences" aria-label="Local differences">
      <header>
        <div>
          <h2>Local differences</h2>
          <p>
            {concept.contrast === "word-choice"
              ? "Different words"
              : concept.contrast === "pronunciation"
                ? "Different pronunciations"
                : "Words and pronunciation"}
          </p>
        </div>
        {concepts.length > 1 ? (
          <label>
            <span className="sr-only">Compare a meaning</span>
            <select
              value={concept.id}
              onChange={(event) => setChosen(event.target.value)}
            >
              {concepts.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.english}
                </option>
              ))}
            </select>
          </label>
        ) : (
          <strong>{concept.english}</strong>
        )}
      </header>
      <p className="regional-note">
        {concept.note} Reference readings can differ between studies.
      </p>
      <div className="regional-place-grid">{ids.slice(0, 3).map(render)}</div>
      {ids.length > 3 && (
        <details className="regional-more">
          <summary>{ids.length - 3} more places</summary>
          <div className="regional-place-grid">{ids.slice(3).map(render)}</div>
        </details>
      )}
    </section>
  );
}
