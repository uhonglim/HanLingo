import { findAtlasLocality, atlasLocalityPath } from "../../data/atlas";
import { Link } from "react-router-dom";
import { xiamenPhotos } from "../../data/xiamen-photos";
import type { XiamenPhoto } from "../../data/xiamen-photos";
import { xiamenWords } from "../../data/xiamen-lexicon";
import { romanizeXiamen } from "../../data/xiamen-romanization";
import PhotoGallery from "../../components/gallery/PhotoGallery";
import type { GalleryPhoto } from "../../data/galleries/types";

const WORDS_PATH = `${atlasLocalityPath(findAtlasLocality("xiamen")!)}/words`;
export const galleryCategories = [
  "All",
  "Food",
  "Streets",
  "Sea",
  "Culture",
] as const;
export type GalleryCategory = (typeof galleryCategories)[number];
type PhotoNote = {
  title: string;
  text: string;
  wordIds: string[];
  source?: string;
  sourceName?: string;
};
const notes: Record<string, PhotoNote> = {
  "gulangyu-rooftops": {
    title: "Gulangyu rooftops",
    text: "Gulangyu’s buildings combine southern Fujian traditions with influences carried through overseas connections. UNESCO calls the island’s distinctive architectural synthesis “Amoy Deco.”",
    source: "https://whc.unesco.org/en/list/1541",
    sourceName: "UNESCO · Kulangsu",
    wordIds: ["sea", "boat", "water", "house"],
  },
  "shacha-noodles": {
    title: "Shacha noodles",
    text: "Shacha noodles use a satay-style soup. Xiamen’s dining guide lists sesame, garlic, peanut oil, shrimp sauce, and chili among the seasoning ingredients.",
    source: "https://www.investxiamen.org.cn/detail/169.html",
    sourceName: "Xiamen dining guide",
    wordIds: ["eat", "noodles", "water", "tasty"],
  },
  "fried-vermicelli": {
    title: "Fried rice vermicelli",
    text: "米 refers to uncooked rice; 飯 refers to cooked rice or a meal.",
    wordIds: ["uncooked-rice", "cooked-rice", "noodles"],
  },
  "dongyu-market": {
    title: "Dongyu market",
    text: "The photograph is from Haicang District. The word readings here follow the urban Xiamen reference.",
    wordIds: ["vegetables", "buy", "money", "person"],
  },
  "nanputuo-temple": {
    title: "Nanputuo Temple",
    text: "Nanputuo is a Buddhist monastery. Its volunteers arrange flower offerings, prepare ceremonies, and guide visitors.",
    source:
      "https://en.nanputuo.com/buddhism/Buddhisattva.aspx?articleid=71998",
    sourceName: "Nanputuo Temple",
    wordIds: ["person", "come", "go"],
  },
  "gulangyu-lane": {
    title: "Gulangyu lane",
    text: "街 means “street”; 厝 means “house” or “home.”",
    wordIds: ["street", "house", "person"],
  },
  "shellfish-stall": {
    title: "Shellfish at the shopfront",
    text: "Shellfish are sold in basins outside the shop.",
    wordIds: ["buy", "money", "eat", "tasty"],
  },
  "xiamen-ferry": {
    title: "Yuanhe ferry",
    text: "This ferry was photographed west of Gulangyu in 2012. 船 means “boat” or “ship”; 海 means “sea.”",
    wordIds: ["boat", "sea", "water"],
  },
  "gulangyu-coast": {
    title: "Gulangyu waterfront",
    text: "海, “sea,” and 水, “water,” both have the falling citation tone 53 in these reference readings.",
    wordIds: ["sea", "water", "boat"],
  },
  "shuzhuang-garden": {
    title: "Shuzhuang Garden",
    text: "A visitor with a red umbrella crosses a bridge above still water.",
    wordIds: ["person", "water", "come", "go"],
  },
  "shop-counter": {
    title: "At a shop counter",
    text: "Jars, boxes, and small packages surround a worker at a shop counter in Xiamen. The photograph does not identify the worker’s language.",
    wordIds: ["person", "buy", "money"],
  },
};
function photoNote(photo: XiamenPhoto): PhotoNote {
  return notes[photo.id] ?? { title: photo.caption, text: "", wordIds: [] };
}
export function photoWords(photo: XiamenPhoto) {
  return photoNote(photo).wordIds.flatMap((id) => {
    const word = xiamenWords.find((item) => item.id === id);
    return word ? [word] : [];
  });
}
const normalize = (text: string) =>
  text
    .toLocaleLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f’'–-]/g, "");
export function filterCulturePhotos(
  photos: XiamenPhoto[],
  category: GalleryCategory,
  query: string,
) {
  const terms = normalize(query).trim().split(/\s+/).filter(Boolean);
  return photos.filter((photo) => {
    if (category !== "All" && photo.category !== category) return false;
    const note = photoNote(photo);
    const text = normalize(
      [
        photo.caption,
        photo.alt,
        photo.category,
        photo.author,
        photo.year ?? "",
        note.title,
        note.text,
        ...photoWords(photo).map(
          (word) =>
            `${word.han} ${word.english} ${word.ipa} ${romanizeXiamen(word.segments, word.tones)}`,
        ),
      ].join(" "),
    );
    return terms.every((term) => text.includes(term));
  });
}
export function stepCulturePhoto(
  photos: XiamenPhoto[],
  currentId: string,
  direction: -1 | 1,
) {
  if (!photos.length) return undefined;
  const index = photos.findIndex((photo) => photo.id === currentId);
  if (index < 0) return photos[0].id;
  return photos[(index + direction + photos.length) % photos.length].id;
}
export function updateCultureParams(
  current: URLSearchParams,
  changes: Partial<Record<"q" | "category" | "photo", string>>,
) {
  const next = new URLSearchParams(current);
  for (const [key, value] of Object.entries(changes)) {
    if (value) next.set(key, value);
    else next.delete(key);
  }
  return next;
}

const photos: GalleryPhoto[] = xiamenPhotos.map((photo) => ({
  ...photo,
  title: photoNote(photo).title,
  category: photo.category === "Sea" ? "Landscape" : photo.category,
  searchText: photoWords(photo)
    .map(
      (word) =>
        `${word.han} ${word.english} ${word.ipa} ${romanizeXiamen(word.segments, word.tones)}`,
    )
    .join(" "),
}));
export default function CultureGallery() {
  return (
    <PhotoGallery
      place="Amoy"
      photos={photos}
      renderDetail={(photo) => {
        const original = xiamenPhotos.find((item) => item.id === photo.id)!;
        const note = photoNote(original);
        return (
          <>
            <h3>Words in this scene</h3>
            <ul>
              {photoWords(original)
                .slice(0, 3)
                .map((word) => (
                  <li key={word.id}>
                    <Link
                      to={`${WORDS_PATH}?q=${encodeURIComponent(word.han)}`}
                    >
                      <b lang="zh-Hant">{word.han}</b>
                      <span>{word.english}</span>
                      <span className="gallery-word-ipa">{word.ipa}</span>
                      <span>{romanizeXiamen(word.segments, word.tones)}</span>
                    </Link>
                  </li>
                ))}
            </ul>
            <details>
              <summary>Reading and source</summary>
              {note.text && <p>{note.text}</p>}
              {note.source && (
                <p>
                  <a href={note.source} target="_blank" rel="noreferrer">
                    {note.sourceName}
                  </a>
                </p>
              )}
              {photoWords(original).map((word) => (
                <p key={word.id}>
                  <a href={word.sourceUrl} target="_blank" rel="noreferrer">
                    {word.sourceLabel}
                  </a>
                </p>
              ))}
            </details>
          </>
        );
      }}
    />
  );
}
