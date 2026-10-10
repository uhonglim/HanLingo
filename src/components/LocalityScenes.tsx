import { Link } from "react-router-dom";
import { useState } from "react";
import type { MapPoint } from "../data/languages";
import type { AttestedWord } from "../data/learning/types";
import type { GalleryPhoto } from "../data/galleries/types";
import { getLocalGallery } from "../data/galleries";
import { getLocalLearning, spellingFor } from "../data/learning";
import { varietyPath } from "../routing";
import { PhotoCredit } from "./gallery/PhotoGallery";
import Pronunciation from "./Pronunciation";
import "./LocalityScenes.css";

export function wordsForPhoto(photo: GalleryPhoto, words: AttestedWord[]) {
  // Only a curated association can connect a reading to a pictured subject.
  // Caption words also include source qualifications, not just visible objects.
  const localWords = new Map(words.map((word) => [word.id, word]));
  return [...new Set(photo.relatedWordIds ?? [])]
    .flatMap((id) => {
      const word = localWords.get(id);
      return word ? [word] : [];
    })
    .slice(0, 3);
}
export function scenePhotos(photos: GalleryPhoto[]) {
  // The collection's curated opening image also introduces its locality page.
  const selected: GalleryPhoto[] = photos.length ? [photos[0]] : [];
  for (const category of ["Food", "Streets", "Landscape", "Culture"]) {
    if (selected.some((photo) => photo.category === category)) continue;
    const photo = photos.find((item) => item.category === category);
    if (photo) selected.push(photo);
  }
  for (const photo of photos)
    if (!selected.includes(photo)) selected.push(photo);
  return selected.slice(0, 3);
}
function RevealReading({ word, base }: { word: AttestedWord; base: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="scene-reading">
      <button
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        aria-label={`${open ? "Hide" : "Reveal"} meaning of ${word.han ?? word.ipa}`}
      >
        {word.han && <span lang="zh-Hant">{word.han}</span>}
        <span>{open ? word.english : "Show meaning"}</span>
      </button>
      {word.registerLabel && (
        <p className="learning-register">{word.registerLabel}</p>
      )}
      <Pronunciation
        ipa={word.ipa}
        toneNotation={word.toneNotation}
        spelling={spellingFor(word)}
      />
      {open && (
        <Link
          className="learning-source"
          to={`${base}/words?q=${encodeURIComponent(word.han ?? word.ipa)}`}
        >
          Reading and source
        </Link>
      )}
    </div>
  );
}
export function PhotoReadings({
  photo,
  words,
  base,
}: {
  photo: GalleryPhoto;
  words: AttestedWord[];
  base: string;
}) {
  const related = wordsForPhoto(photo, words);
  if (!related.length) return null;
  return (
    <div className="scene-readings">
      <h3>Related readings</h3>
      <div>
        {related.map((word) => (
          <RevealReading key={word.id} word={word} base={base} />
        ))}
      </div>
    </div>
  );
}
export default function LocalityScenes({ point }: { point: MapPoint }) {
  const photos = scenePhotos(getLocalGallery(point.id));
  const words = getLocalLearning(point).words;
  const base = varietyPath(point);
  if (!photos.length) return null;
  return (
    <section
      className="locality-scenes"
      aria-label="Local photographs and readings"
    >
      {photos.map((photo) => (
        <article className="locality-scene" key={photo.id}>
          <figure>
            <Link
              to={`${base}/culture?photo=${encodeURIComponent(photo.id)}`}
              aria-label={`Open photo: ${photo.title}`}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                style={{ objectPosition: photo.position }}
              />
            </Link>
            <figcaption>
              <Link
                to={`${base}/culture?photo=${encodeURIComponent(photo.id)}`}
              >
                {photo.title}
              </Link>
              <PhotoCredit photo={photo} />
            </figcaption>
          </figure>
          <PhotoReadings photo={photo} words={words} base={base} />
        </article>
      ))}
    </section>
  );
}
