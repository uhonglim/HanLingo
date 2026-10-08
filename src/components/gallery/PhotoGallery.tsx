import { useCallback, useEffect, useRef, type ReactNode } from "react";
import { useSearchParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Expand, X } from "lucide-react";
import type { GalleryPhoto } from "../../data/galleries/types";
import "./PhotoGallery.css";

export const normalizePhotoSearch = (value: string) =>
  value
    .toLocaleLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f’'–-]/g, "");
export function filterGallery(
  photos: GalleryPhoto[],
  query: string,
  category: string,
) {
  const terms = normalizePhotoSearch(query).split(/\s+/).filter(Boolean);
  return photos.filter(
    (photo) =>
      (!category || photo.category.toLowerCase() === category.toLowerCase()) &&
      terms.every((term) =>
        normalizePhotoSearch(
          [
            photo.title,
            photo.caption,
            photo.alt,
            photo.author,
            photo.category,
            photo.year,
            photo.searchText,
          ].join(" "),
        ).includes(term),
      ),
  );
}
export function stepGallery(
  photos: GalleryPhoto[],
  current: string,
  direction: -1 | 1,
) {
  if (!photos.length) return undefined;
  const index = photos.findIndex((photo) => photo.id === current);
  return photos[
    index < 0 ? 0 : (index + direction + photos.length) % photos.length
  ].id;
}
export function PhotoCredit({ photo }: { photo: GalleryPhoto }) {
  return (
    <span className="photo-credit">
      <a href={photo.sourceUrl} target="_blank" rel="noreferrer">
        {photo.author}
      </a>{" "}
      ·{" "}
      <a href={photo.licenseUrl} target="_blank" rel="noreferrer">
        {photo.license}
      </a>
    </span>
  );
}

function Viewer({
  photo,
  photos,
  onSelect,
  onClose,
  restoreFocus,
  detail,
  outside,
}: {
  photo: GalleryPhoto;
  photos: GalleryPhoto[];
  onSelect: (id: string) => void;
  onClose: () => void;
  restoreFocus: () => void;
  detail?: ReactNode;
  outside: boolean;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const close = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const element = dialog.current!;
    element.showModal();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    close.current?.focus();
    return () => {
      element.close();
      document.body.style.overflow = overflow;
      restoreFocus();
    };
  }, [restoreFocus]);
  const move = (direction: -1 | 1) => {
    const id = stepGallery(photos, photo.id, direction);
    if (id) onSelect(id);
  };
  return (
    <dialog
      ref={dialog}
      className="photo-viewer"
      aria-labelledby="gallery-photo-title"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onKeyDown={(event) => {
        if (
          event.altKey ||
          event.ctrlKey ||
          event.metaKey ||
          event.target instanceof HTMLInputElement
        )
          return;
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          move(event.key === "ArrowLeft" ? -1 : 1);
        }
      }}
    >
      <div className="photo-viewer-top">
        <div>
          <button
            type="button"
            disabled={photos.length < 2}
            aria-label="Previous photo"
            onClick={() => move(-1)}
          >
            <ArrowLeft size={20} />
          </button>
          <span role="status">
            {photos.findIndex((item) => item.id === photo.id) + 1} /{" "}
            {photos.length}
          </span>
          <button
            type="button"
            disabled={photos.length < 2}
            aria-label="Next photo"
            onClick={() => move(1)}
          >
            <ArrowRight size={20} />
          </button>
        </div>
        <button
          ref={close}
          type="button"
          onClick={onClose}
          aria-label="Close photo"
        >
          <X size={24} />
        </button>
      </div>
      <div className="photo-viewer-image">
        <img src={photo.src} alt={photo.alt} />
      </div>
      <div className={`photo-viewer-bottom${detail ? " has-detail" : ""}`}>
        <div>
          <h2 id="gallery-photo-title">{photo.title}</h2>
          <p>
            {photo.caption}
            {photo.year && !photo.caption.includes(photo.year)
              ? ` · ${photo.year}`
              : ""}
          </p>
          <PhotoCredit photo={photo} />
          {outside && <p>This photo is outside the current filters.</p>}
        </div>
        {detail && <div className="photo-viewer-detail">{detail}</div>}
      </div>
    </dialog>
  );
}

export default function PhotoGallery({
  place,
  photos,
  renderDetail,
}: {
  place: string;
  photos: GalleryPhoto[];
  renderDetail?: (photo: GalleryPhoto) => ReactNode;
}) {
  const [params, setParams] = useSearchParams();
  const query = params.get("q") ?? "";
  const requested = params.get("category") ?? "";
  // Preserve old Amoy sea links while using one category vocabulary everywhere.
  const category = requested.toLowerCase() === "sea" ? "landscape" : requested;
  const categories = [...new Set(photos.map((photo) => photo.category))];
  const validCategory = categories.some(
    (item) => item.toLowerCase() === category.toLowerCase(),
  )
    ? category
    : "";
  const filtered = filterGallery(photos, query, validCategory);
  const selected = photos.find((photo) => photo.id === params.get("photo"));
  const outside = Boolean(selected && !filtered.includes(selected));
  const opener = useRef<HTMLButtonElement | null>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const restoreFocus = useCallback(() => {
    if (opener.current?.isConnected)
      opener.current.focus({ preventScroll: true });
    else heading.current?.focus({ preventScroll: true });
  }, []);
  const update = (values: Record<string, string>, replace = true) => {
    const next = new URLSearchParams(params);
    for (const [key, value] of Object.entries(values)) {
      if (value) next.set(key, value);
      else next.delete(key);
    }
    setParams(next, { replace, preventScrollReset: true });
  };
  return (
    <section className="photo-gallery">
      <header className="photo-gallery-heading">
        <div>
          <h1 ref={heading} tabIndex={-1}>
            {place} photos
          </h1>
          <p role="status">
            {filtered.length} {filtered.length === 1 ? "photo" : "photos"}
          </p>
        </div>
        <div className="photo-gallery-tools">
          <label>
            <span className="sr-only">
              Search photos, places, or related words
            </span>
            <input
              type="search"
              value={query}
              placeholder="Search the gallery"
              onChange={(event) => update({ q: event.target.value, photo: "" })}
            />
          </label>
          <label>
            <span className="sr-only">Photo category</span>
            <select
              value={validCategory.toLowerCase()}
              onChange={(event) =>
                update({ category: event.target.value, photo: "" })
              }
            >
              <option value="">All photos</option>
              {categories.map((item) => (
                <option key={item} value={item.toLowerCase()}>
                  {item}
                </option>
              ))}
            </select>
          </label>
        </div>
      </header>
      {params.get("photo") && !selected && (
        <p role="status">
          Photo not found.{" "}
          <button type="button" onClick={() => update({ photo: "" })}>
            Dismiss
          </button>
        </p>
      )}
      {filtered.length ? (
        <div className="photo-gallery-grid">
          {filtered.map((photo, index) => (
            <figure
              key={photo.id}
              className={`photo-gallery-item${index === 0 ? " photo-gallery-lead" : ""}`}
            >
              <button
                className="photo-gallery-open"
                type="button"
                aria-label={`Open photo: ${photo.title}`}
                onClick={(event) => {
                  opener.current = event.currentTarget;
                  update({ photo: photo.id }, false);
                }}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading={index < 3 ? "eager" : "lazy"}
                  decoding="async"
                  style={{ objectPosition: photo.position }}
                />
                <span className="photo-gallery-expand" aria-hidden="true">
                  <Expand size={18} />
                </span>
              </button>
              <figcaption>
                <h2>{photo.title}</h2>
                <PhotoCredit photo={photo} />
              </figcaption>
            </figure>
          ))}
        </div>
      ) : (
        <div className="photo-gallery-empty">
          <h2>No photos match</h2>
          <button
            type="button"
            onClick={() => update({ q: "", category: "", photo: "" })}
          >
            Clear filters
          </button>
        </div>
      )}
      {selected && (
        <Viewer
          photo={selected}
          photos={outside ? [selected] : filtered}
          outside={outside}
          onSelect={(id) => update({ photo: id })}
          onClose={() => update({ photo: "" })}
          restoreFocus={restoreFocus}
          detail={renderDetail?.(selected)}
        />
      )}
    </section>
  );
}
