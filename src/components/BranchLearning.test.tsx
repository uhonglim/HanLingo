import { learningPlaces } from "../data/learning/places";
import { getLocalLearning } from "../data/learning";
import { getLocalGallery } from "../data/galleries";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import BranchLearning, { balancedPreview } from "./BranchLearning";
import { languages, mapPoints } from "../data/languages";

describe("learning overviews", () => {
  it("surfaces actual learning material at every group root according to available evidence", () => {
    for (const group of languages) {
      const html = renderToStaticMarkup(
        <MemoryRouter>
          <BranchLearning groupId={group.id} />
        </MemoryRouter>,
      );
      const places = learningPlaces.filter(place => place.groupId === group.id);
      const data = places.map(getLocalLearning);
      if (data.some(pack => pack.words.length)) {
        expect(html, group.name).toContain("Words");
        expect(html).toContain("Reading and source");
      }
      if (data.some(pack => pack.soundNotes.length)) expect(html).toContain("Sounds");
      if (data.some(pack => pack.culture.length)) expect(html).toContain("Culture");
      if (data.some(pack => pack.resources.length)) expect(html).toContain("Learn from local sources");
      if (places.some(place => getLocalGallery(place.id).length)) {
        expect(html).toContain("Photos");
        expect(html).toContain("/culture?photo=");
        expect(html).toContain("creativecommons.org");
      }
    }
  });
  it("samples multiple localities before repeating one locality", () => {
    const sample = balancedPreview(
      [
        { city: "a", value: 1 },
        { city: "a", value: 2 },
        { city: "b", value: 3 },
        { city: "c", value: 4 },
      ],
      (item) => item.city,
      3,
    );
    expect(sample.map((item) => item.city)).toEqual(["a", "b", "c"]);
    expect(balancedPreview([], String, 6)).toEqual([]);
  });
  it("keeps spelling-only local evidence visible without manufacturing IPA", () => {
    const point = mapPoints.find((point) => point.id === "taipak")!;
    const html = renderToStaticMarkup(
      <MemoryRouter>
        <BranchLearning groupId="min" subgroupId="southern-min" point={point} />
      </MemoryRouter>,
    );
    expect(html).toContain("MOE Tâi-lô");
    expect(html).toContain("sap-bûn");
    expect(html).not.toContain("HanLingo spelling");
  });
});
