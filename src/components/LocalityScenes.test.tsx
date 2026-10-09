import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { PhotoReadings, wordsForPhoto } from "./LocalityScenes";
import { getLocalGallery } from "../data/galleries";
import { otherSiniticLearning } from "../data/learning/other-sinitic";

describe("photo reading relevance", () => {
  const words = otherSiniticLearning.flatMap((pack) => pack.words)
    .filter((word) => word.localityId === "guilin-pinghua");
  const photo = getLocalGallery("guilin-pinghua").find(
    (entry) => entry.id === "other-sinitic-guilin-pinghua-11",
  )!;

  it("does not turn caption qualifications into photo-related readings", () => {
    expect(photo.caption).toContain("does not specify");
    expect(words.some((word) => word.english === "not")).toBe(true);
    expect(wordsForPhoto(photo, words)).toEqual([]);
    const html = renderToStaticMarkup(
      <PhotoReadings photo={photo} words={words} base="/guilin" />,
    );
    expect(html).toBe("");
  });

  it("requires an explicit association even when a gloss appears in the title", () => {
    const word = words[0];
    expect(wordsForPhoto({ ...photo, title: word.english }, [word])).toEqual([]);
  });

  it("shows only explicitly associated readings available in this locality", () => {
    const word = words[0];
    const associated = {
      ...photo,
      relatedWordIds: ["another-locality-reading", word.id, word.id],
    };
    expect(wordsForPhoto(associated, [word])).toEqual([word]);
    const html = renderToStaticMarkup(
      <MemoryRouter>
        <PhotoReadings photo={associated} words={[word]} base="/guilin" />
      </MemoryRouter>,
    );
    expect(html).toContain("Related readings");
    expect(html).toContain(word.han);
    expect(html).toContain("HanLingo spelling");
  });
});
