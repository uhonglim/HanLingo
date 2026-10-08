import { Link } from "react-router-dom";
import { mapPoints } from "../data/languages";
import type { MapPoint } from "../data/languages";
import {
  getBranchLearning,
  getLocalLearning,
  spellingFor,
} from "../data/learning";
import type { AttestedWord } from "../data/learning/types";
import { placeLabel } from "../data/language-names";
import { varietyPath } from "../routing";
import { siteTerms } from "../data/site-terms";
import "./BranchLearning.css";
import Pronunciation from "./Pronunciation";

export function LearningWord({ word }: { word: AttestedWord }) {
  const spelling = spellingFor(word);
  return (
    <article className="learning-word">
      <h3 lang="zh-Hant">{word.han}</h3>
      <p className="learning-meaning">{word.english}</p>
      <Pronunciation
        ipa={word.ipa}
        spelling={spelling}
        toneNotation={word.toneNotation}
      />
      <details>
        <summary>Reading and source</summary>
        <p>{word.reading}</p>
        {word.note && <p>{word.note}</p>}
        {!spelling && (
          <p>
            {word.toneNotation === "source-category"
              ? "The source gives tone categories, not pitch contours. They are not converted into HanLingo tone numbers."
              : "This source reading is not yet fully mapped to HanLingo spelling."}
          </p>
        )}
        <a href={word.source.url} target="_blank" rel="noreferrer">
          {word.source.title}
        </a>
      </details>
    </article>
  );
}

export default function BranchLearning({
  groupId,
  subgroupId,
  point,
  heroPhotoSrc,
}: {
  groupId: string;
  subgroupId?: string;
  point?: MapPoint;
  heroPhotoSrc?: string;
}) {
  const pack = subgroupId ? getBranchLearning(groupId, subgroupId) : undefined;
  if (!pack) return null;
  const data = point ? getLocalLearning(point) : pack;
  // Branch pages show readings from named localities; no branch-wide pronunciation is implied.
  const words = data.words.slice(0, 4);
  return (
    <div className="branch-learning">
      {words.length > 0 && (
        <section className="learning-preview">
          <h2>
            {point ? (
              <Link to={`${varietyPath(point)}/words`}>
                {siteTerms.sections.words}
              </Link>
            ) : (
              siteTerms.sections.words
            )}
          </h2>
          <div className="learning-word-grid">
            {words.map((word) => {
              const locality = mapPoints.find(
                (item) => item.id === word.localityId,
              )!;
              return (
                <div key={word.id}>
                  {!point && (
                    <Link
                      className="learning-locality"
                      to={varietyPath(locality)}
                    >
                      {placeLabel(locality)}
                    </Link>
                  )}
                  <LearningWord word={word} />
                </div>
              );
            })}
          </div>
        </section>
      )}
      {data.culture.length > 0 && (
        <section className="learning-culture-preview">
          <h2>Culture</h2>
          <div className="learning-culture-grid">
            {data.culture
              .filter((item) => item.text || item.photo?.src !== heroPhotoSrc)
              .map((item) => (
                <article key={item.title}>
                  {item.photo && item.photo.src !== heroPhotoSrc && (
                    <figure>
                      <img
                        src={item.photo.src}
                        alt={item.photo.alt}
                        loading="lazy"
                        style={{ objectPosition: item.photo.position }}
                      />
                      <figcaption>
                        {item.photo.caption}{" "}
                        <a
                          href={item.photo.sourceUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {item.photo.author}
                        </a>{" "}
                        ·{" "}
                        <a
                          href={item.photo.licenseUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {item.photo.license}
                        </a>
                      </figcaption>
                    </figure>
                  )}
                  <h3>{item.title}</h3>
                  {item.text && <p>{item.text}</p>}
                  {item.source.url !== item.photo?.sourceUrl && (
                    <a
                      className="learning-source"
                      href={item.source.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {item.source.title}
                    </a>
                  )}
                </article>
              ))}
          </div>
        </section>
      )}
      {data.resources.length > 0 && (
        <section className="learning-resource-section">
          <h2>Learn from local sources</h2>
          <div className="learning-resources">
            {data.resources.map((item) => (
              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                key={item.url}
              >
                <span>{item.kind}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
