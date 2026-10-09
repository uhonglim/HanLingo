import { placeLabel, placeReadingName } from "../../data/language-names";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { xiamenPhotos } from "../../data/xiamen-photos";
import { xiamenWords } from "../../data/xiamen-lexicon";
import CultureGallery, {
  filterCulturePhotos,
  photoWords,
  stepCulturePhoto,
  updateCultureParams,
} from "./CultureGallery";

const ids = (photos: typeof xiamenPhotos) => photos.map((photo) => photo.id);
const galleryUrl = "/min/southern-min/xiamen/culture";
const renderGallery = (query = "") =>
  renderToStaticMarkup(
    <MemoryRouter initialEntries={[galleryUrl + query]}>
      <CultureGallery />
    </MemoryRouter>,
  );

describe("Xiamen culture gallery", () => {
  it("covers all photographs with real lexical associations and intersects category with search", () => {
    expect(filterCulturePhotos(xiamenPhotos, "All", "")).toHaveLength(11);
    for (const photo of xiamenPhotos) {
      const words = photoWords(photo);
      expect(words.length, photo.id).toBeGreaterThanOrEqual(2);
      expect(new Set(words.map((word) => word.id)).size, photo.id).toBe(
        words.length,
      );
      expect(
        words.every((word) => xiamenWords.includes(word)),
        photo.id,
      ).toBe(true);
    }
    expect(ids(filterCulturePhotos(xiamenPhotos, "Food", ""))).toEqual([
      "shacha-noodles",
      "fried-vermicelli",
      "shellfish-stall",
    ]);
    expect(ids(filterCulturePhotos(xiamenPhotos, "Streets", "Dongyu"))).toEqual(
      ["dongyu-market"],
    );
    expect(filterCulturePhotos(xiamenPhotos, "Food", "Dongyu")).toEqual([]);
    expect(
      ids(filterCulturePhotos(xiamenPhotos, "Sea", "  YUANHE  2012  ")),
    ).toEqual(["xiamen-ferry"]);
    expect(
      ids(filterCulturePhotos(xiamenPhotos, "Culture", "Vincent Tan")),
    ).toEqual(["shop-counter"]);
    expect(ids(filterCulturePhotos(xiamenPhotos, "Streets", "菜"))).toEqual([
      "dongyu-market",
    ]);
    expect(filterCulturePhotos(xiamenPhotos, "All", "zzzzzz")).toEqual([]);
  });

  it("navigates only the filtered photos, wraps both ways, and handles empty or one-photo views", () => {
    const food = filterCulturePhotos(xiamenPhotos, "Food", "");
    const before = ids(food);
    expect(stepCulturePhoto(food, "shacha-noodles", 1)).toBe(
      "fried-vermicelli",
    );
    expect(stepCulturePhoto(food, "shacha-noodles", -1)).toBe(
      "shellfish-stall",
    );
    expect(stepCulturePhoto(food, "shellfish-stall", 1)).toBe("shacha-noodles");
    expect(stepCulturePhoto(food, "unknown", 1)).toBe("shacha-noodles");
    expect(stepCulturePhoto([food[0]], food[0].id, 1)).toBe(food[0].id);
    expect(stepCulturePhoto([], "unknown", -1)).toBeUndefined();
    expect(ids(food)).toEqual(before);
  });

  it("preserves filters and unrelated URL parameters when opening, changing, or closing a photo", () => {
    const initial = new URLSearchParams("category=food&q=noodles&ref=shared");
    const opened = updateCultureParams(initial, { photo: "shacha-noodles" });
    const moved = updateCultureParams(opened, { photo: "fried-vermicelli" });
    const closed = updateCultureParams(moved, { photo: "" });
    expect(closed.toString()).toBe(initial.toString());
    expect(initial.has("photo")).toBe(false);
    expect(opened.get("photo")).toBe("shacha-noodles");
    const changed = updateCultureParams(moved, { category: "sea", photo: "" });
    expect(changed.get("q")).toBe("noodles");
    expect(changed.get("ref")).toBe("shared");
    expect(changed.has("photo")).toBe(false);
  });

  it("renders URL-backed categories and handles valid, mismatched, and missing deep-linked photos", () => {
    const all = renderGallery();
    expect(all.match(/class="photo-gallery-open"/g) ?? []).toHaveLength(11);
    const heading = all.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/)?.[1];
    expect(heading).toBeDefined();
    const headingText = heading!.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    const amoy = { id: 'xiamen', name: 'Amoy' };
    expect(headingText).toBe(`${placeLabel(amoy)} ${placeReadingName(amoy)} photos`);
    expect(all).not.toContain("Amoy photographs");
    const food = renderGallery("?category=food");
    expect(food.match(/class="photo-gallery-open"/g) ?? []).toHaveLength(3);
    expect(food).toContain('<option value="food" selected="">Food');
    const detail = renderGallery("?category=sea&photo=xiamen-ferry");
    expect(detail).toContain("<dialog");
    expect(detail).toContain('id="gallery-photo-title">Yuanhe ferry');
    expect(detail).toContain("tsun24");
    expect(detail).toContain("[t͡sun˨˦]");
    expect(detail).toContain("CC BY-SA 3.0");
    const outside = renderGallery("?category=food&photo=xiamen-ferry");
    expect(outside).toContain("This photo is outside the current filters.");
    expect(outside).toContain('disabled="" aria-label="Next photo"');
    expect(renderGallery("?category=food&photo=missing")).toContain(
      "Photo not found.",
    );
    expect(renderGallery("?q=zzzzzz")).toContain("No photos match");
  });
});
