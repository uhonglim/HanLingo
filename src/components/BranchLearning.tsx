import { Bookmark } from "lucide-react";
import { useWordNotebook } from "../hooks/useWordNotebook";
import { Link } from "react-router-dom";
import { mapPoints } from "../data/languages";
import type { MapPoint } from "../data/languages";
import {
  branchLearning,
  getLocalLearning,
  spellingFor,
} from "../data/learning";
import type { AttestedWord } from "../data/learning/types";
import { placeLabel } from "../data/language-names";
import { varietyPath } from "../routing";
import { siteTerms } from "../data/site-terms";
import "./BranchLearning.css";
import Pronunciation from "./Pronunciation";
import { getLocalGallery } from "../data/galleries";
import { PhotoCredit } from "./gallery/PhotoGallery";
import { regionalReadingsFor } from "../data/regional-words";
import { wordMeaning } from "../data/word-meaning";
import { RegionalWord } from "./RegionalDifferences";

/** Round-robin sampling keeps a large city from filling the whole overview. */
export function balancedPreview<T>(
  items: T[],
  key: (item: T) => string,
  limit: number,
): T[] {
  const groups = new Map<string, T[]>();
  items.forEach((item) => {
    const id = key(item);
    groups.set(id, [...(groups.get(id) ?? []), item]);
  });
  const result: T[] = [];
  for (let row = 0; result.length < Math.min(limit, items.length); row++) {
    for (const group of groups.values()) {
      if (group[row]) result.push(group[row]);
      if (result.length === limit) break;
    }
  }
  return result;
}

export function LearningWord({ word }: { word: AttestedWord }) {
  const spelling = spellingFor(word);
  const notebook = useWordNotebook();
  const saved = notebook.saved.includes(word.id);
  return (
    <article className="learning-word">
      <div className="learning-word-top">
        <h3 lang="zh-Hant">{word.han}</h3>
        <button
          className="learning-save"
          aria-label={`${saved ? "Unsave" : "Save"} ${word.english}`}
          aria-pressed={saved}
          onClick={() => notebook.toggle(word.id)}
        >
          <Bookmark size={18} fill={saved ? "currentColor" : "none"} />
        </button>
      </div>
      {notebook.error && (
        <p role="status">This browser could not save the word.</p>
      )}
      <p className="learning-meaning">{word.english}</p>
      {word.registerLabel && (
        <p className="learning-register">{word.registerLabel}</p>
      )}
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
  const places = mapPoints.filter(
    (place) =>
      place.groupId === groupId &&
      (!subgroupId || place.subgroupId === subgroupId) &&
      (!point || place.id === point.id),
  );
  const packs = branchLearning.filter(
    (pack) =>
      pack.branchId.startsWith(`${groupId}/`) &&
      (!subgroupId || pack.branchId === `${groupId}/${subgroupId}`),
  );
  const localData = places.map((place) => getLocalLearning(place));
  const data = {
    words: localData.flatMap((local) => local.words),
    soundNotes: point
      ? (localData[0]?.soundNotes ?? [])
      : packs.flatMap((pack) => pack.soundNotes),
    culture: point
      ? (localData[0]?.culture ?? [])
      : packs.flatMap((pack) => pack.culture),
    resources: point
      ? (localData[0]?.resources ?? [])
      : packs.flatMap((pack) => pack.resources),
  };
  const words = balancedPreview(
    data.words,
    (word) => {
      const place = mapPoints.find((place) => place.id === word.localityId)!;
      return subgroupId ? word.localityId : place.subgroupId;
    },
    point ? 6 : 8,
  );
  const meanings = new Set(
    data.words.map((word) => `${word.localityId}/${wordMeaning(word.english)}`),
  );
  const spellingWords = balancedPreview(
    places
      .flatMap((place) => regionalReadingsFor(place.id))
      .filter(
        (word) =>
          !meanings.has(`${word.localityId}/${wordMeaning(word.english)}`),
      ),
    (word) => word.localityId,
    point ? 6 : 4,
  );
  const cultures = balancedPreview(
    data.culture.filter((item) => item.text.trim()),
    (item) => item.localityIds[0] ?? item.title,
    point ? 20 : 6,
  );
  const soundNotes = balancedPreview(
    data.soundNotes,
    (item) => item.localityIds[0] ?? item.title,
    point ? 2 : 4,
  );
  const resources = [
    ...new Map(data.resources.map((item) => [item.url, item])).values(),
  ];
  const photoPlaces = balancedPreview(
    places,
    (place) =>
      subgroupId ? (place.hierarchy[3] ?? place.id) : place.subgroupId,
    6,
  );
  const photos =
    photoPlaces.length === 1
      ? getLocalGallery(photoPlaces[0].id)
          .slice(0, 3)
          .map((photo) => ({ place: photoPlaces[0], photo }))
      : photoPlaces
          .map((place) => ({ place, photo: getLocalGallery(place.id)[0] }))
          .filter((item) => item.photo);
  return (
    <div className="branch-learning">
      {(words.length > 0 || spellingWords.length > 0) && (
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
                      to={`${varietyPath(locality)}/words`}
                    >
                      {placeLabel(locality)}
                    </Link>
                  )}
                  <LearningWord word={word} />
                </div>
              );
            })}
            {spellingWords.map((reading) => {
              const locality = mapPoints.find(
                (place) => place.id === reading.localityId,
              )!;
              return (
                <div key={reading.id}>
                  {!point && (
                    <Link
                      className="learning-locality"
                      to={`${varietyPath(locality)}/words`}
                    >
                      {placeLabel(locality)}
                    </Link>
                  )}
                  <RegionalWord reading={reading} />
                </div>
              );
            })}
          </div>
        </section>
      )}
      {soundNotes.length > 0 && (
        <section className="learning-sound-preview">
          <h2>
            {point ? (
              <Link to={`${varietyPath(point)}/sounds`}>Sounds</Link>
            ) : (
              "Sounds"
            )}
          </h2>
          <div className="learning-sound-grid">
            {soundNotes.map((note) => (
              <article key={`${note.localityIds.join("/")}/${note.title}`}>
                {!point && (
                  <p className="learning-locality-names">
                    {note.localityIds
                      .map((id) =>
                        placeLabel(mapPoints.find((place) => place.id === id)!),
                      )
                      .join(" · ")}
                  </p>
                )}
                <h3>{note.title}</h3>
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
        </section>
      )}
      {!point && photos.length > 0 && (
        <section className="learning-photo-preview">
          <h2>Photos</h2>
          <div className="learning-photo-grid">
            {photos.map(({ place, photo }) => (
              <figure key={`${place.id}/${photo.id}`}>
                <Link
                  to={`${varietyPath(place)}/culture?photo=${encodeURIComponent(photo.id)}`}
                >
                  <img src={photo.src} alt={photo.alt} loading="lazy" />
                  <h3>{placeLabel(place)}</h3>
                  <p>{photo.title}</p>
                </Link>
                <PhotoCredit photo={photo} />
              </figure>
            ))}
          </div>
        </section>
      )}
      {cultures.length > 0 && (
        <section className="learning-culture-preview">
          <h2>Culture</h2>
          <div className="learning-culture-grid">
            {cultures.map((item) => (
              <article key={`${item.localityIds.join("/")}/${item.title}`}>
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
                {!point && (
                  <p className="learning-locality-names">
                    {item.localityIds
                      .map((id) =>
                        placeLabel(mapPoints.find((place) => place.id === id)!),
                      )
                      .join(" · ")}
                  </p>
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
      {resources.length > 0 && (
        <section className="learning-resource-section">
          <h2>Learn from local sources</h2>
          <div className="learning-resources">
            {balancedPreview(
              resources,
              (item) => {
                const place = mapPoints.find(
                  (place) => place.id === item.localityIds[0],
                );
                return subgroupId
                  ? (place?.id ?? item.title)
                  : (place?.subgroupId ?? item.title);
              },
              point ? 20 : 8,
            ).map((item) => (
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
