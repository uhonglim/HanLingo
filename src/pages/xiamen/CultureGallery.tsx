import { useCallback, useEffect, useMemo, useRef } from "react";
import type { KeyboardEvent } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  Expand,
  Search,
  X,
} from "lucide-react";
import { siteTerms } from "../../data/site-terms";
import { xiamenPhotos } from "../../data/xiamen-photos";
import type { XiamenPhoto } from "../../data/xiamen-photos";
import { xiamenWords } from "../../data/xiamen-lexicon";
import { romanizeXiamen } from "../../data/xiamen-romanization";
import "./CultureGallery.css";

const WORDS_PATH = "/min/southern-min/xiamen/words";
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

function Credit({ photo }: { photo: XiamenPhoto }) {
  return (
    <p className="xc-credit">
      <a href={photo.sourceUrl} target="_blank" rel="noreferrer">
        {photo.author}
      </a>
      <span aria-hidden="true"> · </span>
      <a href={photo.licenseUrl} target="_blank" rel="noreferrer">
        {photo.license}
      </a>
    </p>
  );
}

function PhotoViewer({
  photo,
  photos,
  outsideFilters,
  onSelect,
  onClose,
  restoreFocus,
}: {
  photo: XiamenPhoto;
  photos: XiamenPhoto[];
  outsideFilters: boolean;
  onSelect: (id: string) => void;
  onClose: () => void;
  restoreFocus: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const note = photoNote(photo);
  const index = photos.findIndex((item) => item.id === photo.id);
  const canNavigate = photos.length > 1;
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (!dialog.open) dialog.showModal();
    closeRef.current?.focus();
    return () => {
      dialog.close();
      requestAnimationFrame(() => {
        if (!dialog.open) restoreFocus();
      });
    };
  }, [restoreFocus]);
  useEffect(() => {
    contentRef.current?.scrollTo({ top: 0 });
    bodyRef.current?.scrollTo({ top: 0 });
  }, [photo.id]);
  function move(direction: -1 | 1) {
    if (!canNavigate) return;
    const next = stepCulturePhoto(photos, photo.id, direction);
    if (next) onSelect(next);
  }
  function keydown(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    const target = event.target as HTMLElement;
    if (target.closest("input, textarea, select, [contenteditable=true]"))
      return;
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      move(event.key === "ArrowLeft" ? -1 : 1);
    }
  }
  return (
    <dialog
      ref={dialogRef}
      className="xc-dialog"
      aria-labelledby="xc-photo-title"
      onKeyDown={keydown}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose();
      }}
    >
      <div className="xc-viewer-toolbar">
        <div className="xc-viewer-navigation">
          <button
            type="button"
            onClick={() => move(-1)}
            disabled={!canNavigate}
            aria-label="Previous photo"
            aria-keyshortcuts="ArrowLeft"
          >
            <ArrowLeft size={19} aria-hidden="true" />
          </button>
          <span role="status" aria-live="polite" aria-atomic="true">
            {index + 1} / {photos.length}
            <span className="sr-only"> · {note.title}</span>
          </span>
          <button
            type="button"
            onClick={() => move(1)}
            disabled={!canNavigate}
            aria-label="Next photo"
            aria-keyshortcuts="ArrowRight"
          >
            <ArrowRight size={19} aria-hidden="true" />
          </button>
        </div>
        <button
          ref={closeRef}
          type="button"
          className="xc-close"
          onClick={onClose}
          aria-label="Close photo"
          aria-keyshortcuts="Escape"
        >
          <X size={22} aria-hidden="true" />
        </button>
      </div>
      <div className="xc-viewer-body" ref={bodyRef}>
        <div className="xc-stage">
          <img src={photo.src} alt={photo.alt} />
        </div>
        <div className="xc-detail" ref={contentRef}>
          <p className="xc-photo-meta">
            {photo.category}
            {photo.year && ` · ${photo.year}`}
          </p>
          <h2 id="xc-photo-title">{note.title}</h2>
          <p className="xc-caption">{photo.caption}</p>
          <Credit photo={photo} />
          {outsideFilters && (
            <p className="xc-outside-note">
              This photo is outside the current filters.
            </p>
          )}
          {note.text && <p className="xc-context">{note.text}</p>}
          {note.source && (
            <a
              className="xc-context-source"
              href={note.source}
              target="_blank"
              rel="noreferrer"
            >
              {note.sourceName}
            </a>
          )}
          <section className="xc-related" aria-labelledby="xc-related-title">
            <h3 id="xc-related-title">Related words</h3>
            <p className="xc-spelling-note">{siteTerms.spelling} · IPA</p>
            <ul>
              {photoWords(photo).map((word) => (
                <li key={word.id}>
                  <Link to={`${WORDS_PATH}?q=${encodeURIComponent(word.han)}`}>
                    <span lang="zh-Hant" className="xc-han">
                      {word.han}
                    </span>
                    <span className="xc-word-reading">
                      <strong>{word.english}</strong>
                      <span>{romanizeXiamen(word.segments, word.tones)}</span>
                      <span className="xc-ipa">{word.ipa}</span>
                    </span>
                    <ArrowRight size={15} aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
            <details className="xc-word-sources">
              <summary>
                Word sources <ChevronDown size={14} aria-hidden="true" />
              </summary>
              <ul>
                {photoWords(photo).map((word) => (
                  <li key={word.id}>
                    <a href={word.sourceUrl} target="_blank" rel="noreferrer">
                      {word.sourceLabel}
                    </a>
                  </li>
                ))}
              </ul>
            </details>
          </section>
        </div>
      </div>
    </dialog>
  );
}

export default function CultureGallery() {
  const [params, setParams] = useSearchParams();
  const query = params.get("q") ?? "";
  const category =
    galleryCategories.find(
      (item) => item.toLowerCase() === params.get("category")?.toLowerCase(),
    ) ?? "All";
  const selectedId = params.get("photo");
  const selected = xiamenPhotos.find((photo) => photo.id === selectedId);
  const filtered = useMemo(
    () => filterCulturePhotos(xiamenPhotos, category, query),
    [category, query],
  );
  const outsideFilters = Boolean(
    selected && !filtered.some((photo) => photo.id === selected.id),
  );
  const viewerPhotos = selected && outsideFilters ? [selected] : filtered;
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const photoButtons = useRef(new Map<string, HTMLButtonElement>());
  const headingRef = useRef<HTMLHeadingElement>(null);
  const selectedRef = useRef(selectedId);
  if (selectedId) selectedRef.current = selectedId;
  const restoreFocus = useCallback(() => {
    const target =
      openerRef.current ?? photoButtons.current.get(selectedRef.current ?? "");
    if (target?.isConnected) target.focus({ preventScroll: true });
    else headingRef.current?.focus({ preventScroll: true });
  }, []);
  function changeFilters(changes: Partial<Record<"q" | "category", string>>) {
    setParams(updateCultureParams(params, { ...changes, photo: "" }), {
      replace: true,
    });
  }
  function openPhoto(id: string, button: HTMLButtonElement) {
    openerRef.current = button;
    setParams(updateCultureParams(params, { photo: id }));
  }
  function closePhoto() {
    setParams(updateCultureParams(params, { photo: "" }), { replace: true });
  }
  return (
    <div className="xc-gallery">
      <header className="xc-heading">
        <div>
          <h1 ref={headingRef} tabIndex={-1}>
            Amoy {siteTerms.sections.photos.toLowerCase()}
          </h1>
          <p role="status" aria-live="polite">
            {filtered.length} {filtered.length === 1 ? "photo" : "photos"}
            {query.trim() && ` matching “${query.trim()}”`}
          </p>
        </div>
        <div className="xc-search">
          <Search size={18} aria-hidden="true" />
          <label className="sr-only" htmlFor="xc-photo-search">
            Search photos, places, or related words
          </label>
          <input
            id="xc-photo-search"
            type="search"
            value={query}
            placeholder="Place, subject, or word"
            onChange={(event) => changeFilters({ q: event.target.value })}
          />
          {query && (
            <button
              type="button"
              onClick={() => changeFilters({ q: "" })}
              aria-label="Clear photo search"
            >
              <X size={17} aria-hidden="true" />
            </button>
          )}
        </div>
      </header>
      <div className="xc-filters" role="group" aria-label="Photo categories">
        {galleryCategories.map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={category === item}
            onClick={() =>
              changeFilters({
                category: item === "All" ? "" : item.toLowerCase(),
              })
            }
          >
            {item === "All" ? "All photos" : item}
          </button>
        ))}
      </div>
      {selectedId && !selected && (
        <div className="xc-missing" role="status">
          Photo not found.
          <button type="button" onClick={closePhoto}>
            Dismiss
          </button>
        </div>
      )}
      {filtered.length ? (
        <div className="xc-grid">
          {filtered.map((photo) => (
            <figure
              key={photo.id}
              className={`xc-card${photo.id === "shellfish-stall" ? " xc-card-portrait" : ""}`}
            >
              <button
                className="xc-image-button"
                type="button"
                onClick={(event) => openPhoto(photo.id, event.currentTarget)}
                aria-label={`Open photo: ${photoNote(photo).title}`}
                ref={(node) => {
                  if (node) photoButtons.current.set(photo.id, node);
                  else photoButtons.current.delete(photo.id);
                }}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  style={{ objectPosition: photo.position }}
                />
                <span className="xc-expand" aria-hidden="true">
                  <Expand size={18} />
                </span>
              </button>
              <figcaption>
                <p className="xc-photo-meta">
                  {photo.category}
                  {photo.year && ` · ${photo.year}`}
                </p>
                <h2>{photoNote(photo).title}</h2>
                <Credit photo={photo} />
              </figcaption>
              <ul className="xc-card-words">
                {photoWords(photo)
                  .slice(0, 2)
                  .map((word) => (
                    <li key={word.id}>
                      <Link
                        to={`${WORDS_PATH}?q=${encodeURIComponent(word.han)}`}
                      >
                        <span lang="zh-Hant">{word.han}</span>
                        <span>{word.english}</span>
                      </Link>
                    </li>
                  ))}
              </ul>
            </figure>
          ))}
        </div>
      ) : (
        <div className="xc-empty">
          <h2>No photos match</h2>
          <button
            type="button"
            onClick={() => changeFilters({ q: "", category: "" })}
          >
            Clear filters
          </button>
        </div>
      )}
      {selected && (
        <PhotoViewer
          photo={selected}
          photos={viewerPhotos}
          outsideFilters={outsideFilters}
          onSelect={(id) =>
            setParams(updateCultureParams(params, { photo: id }), {
              replace: true,
            })
          }
          onClose={closePhoto}
          restoreFocus={restoreFocus}
        />
      )}
    </div>
  );
}
