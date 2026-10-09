import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import RegionalDifferences, {
  extraRegionalWords,
  RegionalWord,
} from "./RegionalDifferences";
import Pronunciation, { pitchContours, displayIpa } from "./Pronunciation";
import { regionalReadingsFor, regionalConcepts } from "../data/regional-words";
import { getLocalLearning } from "../data/learning";
import { mapPoints } from "../data/languages";

describe("local references and IPA", () => {
  it("does not turn source spelling into invented IPA or HanLingo pitch", () => {
    const reading = regionalReadingsFor("taipak").find(
      (item) => item.conceptId === "soap",
    )!;
    const html = renderToStaticMarkup(<RegionalWord reading={reading} />);
    expect(html).toContain("MOE Tâi-lô");
    expect(html).toContain("sap-muî");
    expect(html).not.toContain("pronunciation-ipa");
    expect(html).not.toContain("HanLingo spelling");
  });
  it("deduplicates explicit meaning aliases but keeps different senses distinct", () => {
    const words = getLocalLearning(
      mapPoints.find((point) => point.id === "fuzhou")!,
    ).words;
    expect(extraRegionalWords("fuzhou", words)).toHaveLength(0);
    expect(
      extraRegionalWords("xiamen", [
        { english: "to buy" },
        { english: "cooked rice; a meal" },
      ]).some(
        (word) => word.conceptId === "buy" || word.conceptId === "cooked-rice",
      ),
    ).toBe(false);
  });
  it("finds a comparison by its source spelling and preserves alternate local forms", () => {
    const html = renderToStaticMarkup(
      <MemoryRouter>
        <RegionalDifferences localityId="taipak" query="sap-bûn" />
      </MemoryRouter>,
    );
    expect(html).toContain("sap-bûn");
    expect(html).toContain("sap-muî");
    expect(html).toContain("Reference readings can differ between studies");
  });
  it("draws pitch only from explicitly identified pitch contours", () => {
    expect(pitchContours("[ta˥˧] [tʰa²⁴]")).toEqual(["53", "24"]);
    expect(displayIpa("[ke44]", "pitch-contour")).toBe("[ke˦˦]");
    expect(displayIpa("[pa1]", "source-category")).toBe("[pa1]");
    const categories = renderToStaticMarkup(
      <Pronunciation
        ipa="[pa1]"
        spelling="pa·T1"
        toneNotation="source-category"
      />,
    );
    expect(categories).toContain("IPA · source tone categories");
    expect(categories).toContain("HanLingo spelling · source tone categories");
    expect(categories).toContain("pa·T1");
    expect(categories).not.toContain("<svg");
  });
  it("keeps omitted tones visible instead of plotting an invented contour", () => {
    const html = renderToStaticMarkup(
      <Pronunciation ipa="[pa]" spelling="pa" toneNotation="unspecified" />,
    );
    expect(html).toContain("tones not given");
    expect(html).not.toContain("<svg");
    expect(html).toContain("HanLingo spelling · tones not given");
    expect(html).toContain("<strong>pa</strong>");
  });

  it("does not repeat identical Shanghai dictionary entries after vocabulary expansion", () => {
    for (const id of ["mountain", "uncooked-rice"]) {
      const readings = regionalConcepts
        .find((concept) => concept.id === id)!
        .readings.filter(
          (reading) =>
            reading.localityId === "shanghai" &&
            reading.source.url.includes("cuhk"),
        );
      expect(readings).toHaveLength(1);
    }
    expect(regionalReadingsFor("shantou").length).toBeGreaterThan(0);
  });
});
