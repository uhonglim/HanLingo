import { Link } from "react-router-dom";
import { useState } from "react";
import type { MapPoint } from "../data/languages";
import type { AttestedWord } from "../data/learning/types";
import type { GalleryPhoto } from "../data/galleries/types";
import { getLocalGallery } from "../data/galleries";
import { getLocalLearning, spellingFor } from "../data/learning";
import { varietyPath } from "../routing";
import { wordTopic, type WordTopic } from "../data/learning/word-topics";
import { PhotoCredit } from "./gallery/PhotoGallery";
import Pronunciation from "./Pronunciation";
import "./LocalityScenes.css";

const relatedTopics: Record<GalleryPhoto["category"], WordTopic[]> = {
  Food: ["Food & drink"],
  Landscape: ["Nature"],
  Streets: ["Around town", "People & body"],
  Culture: ["Around town", "People & body"],
};
export function wordsForPhoto(photo: GalleryPhoto, words: AttestedWord[]) {
  const subject = `${photo.title} ${photo.alt} ${photo.caption}`.toLowerCase();
  const priority = [
    "fish",
    "tea",
    "water",
    "rice",
    "eat",
    "drink",
    "door",
    "house",
    "road",
    "tree",
    "sky",
    "mountain",
    "river",
    "flower",
  ];
  const rank = (word: AttestedWord) => {
    const gloss = word.english.toLowerCase().split(";")[0].trim();
    if (gloss.length > 2 && subject.includes(gloss)) return -1;
    const index = priority.indexOf(gloss);
    return index < 0 ? priority.length : index;
  };
  return words
    .filter((word) =>
      relatedTopics[photo.category].includes(wordTopic(word.english)),
    )
    .sort((a, b) => rank(a) - rank(b))
    .slice(0, 3);
}
export function scenePhotos(photos: GalleryPhoto[]) {
  const selected: GalleryPhoto[] = [];
  for (const category of ["Food", "Streets", "Landscape", "Culture"]) {
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
        aria-label={`${open ? "Hide" : "Reveal"} meaning of ${word.han}`}
      >
        <span lang="zh-Hant">{word.han}</span>
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
          to={`${base}/words?q=${encodeURIComponent(word.han)}`}
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
