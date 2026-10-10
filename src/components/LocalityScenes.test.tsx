import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { PhotoReadings, wordsForPhoto } from "./LocalityScenes";
import { getLocalGallery } from "../data/galleries";
import { branchLearning } from "../data/learning";
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

  it("resolves every curated wider-atlas photo reading within its own locality", () => {
    let associations = 0;
    for (const localityId of ['changsha-xiang', 'taiyuan-jin', 'jixi-hui', 'guilin-pinghua', 'kunming-study', 'loudi-study', 'rongcheng-371082']) {
      const localWords = branchLearning.flatMap(pack => pack.words).filter(word => word.localityId === localityId);
      for (const entry of getLocalGallery(localityId)) {
        if (!entry.relatedWordIds?.length) continue;
        associations += 1;
        expect(wordsForPhoto(entry, localWords).map(word => word.id)).toEqual(entry.relatedWordIds);
      }
    }
    expect(associations).toBe(9);
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
