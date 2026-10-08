import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import BranchLearning, { balancedPreview } from "./BranchLearning";
import { languages, mapPoints } from "../data/languages";

describe("learning overviews", () => {
  it("surfaces actual learning material at all five group roots", () => {
    for (const group of languages) {
      const html = renderToStaticMarkup(
        <MemoryRouter>
          <BranchLearning groupId={group.id} />
        </MemoryRouter>,
      );
      for (const heading of [
        "Words",
        "Sounds",
        "Photos",
        "Culture",
        "Learn from local sources",
      ])
        expect(html, `${group.id}: ${heading}`).toContain(heading);
      expect(html).toContain("Reading and source");
      expect(html).toContain("/culture?photo=");
      expect(html).toContain("creativecommons.org");
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
