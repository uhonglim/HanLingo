import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { displayIpa, ipaSearchForms, pitchContours } from "./ipa-display";
import { getLocalLearning, searchWords } from "./learning";
import { mapPoints } from "./languages";
import { filterXiamenWords } from "./xiamen-vocabulary";
import { xiamenWords } from "./xiamen-lexicon";
import RegionalDifferences, {
  extraRegionalWords,
} from "../components/RegionalDifferences";
import Pronunciation from "../components/Pronunciation";

describe("IPA display and copied-text search", () => {
  it("formats attested pitch values while retaining segment marks and syllable boundaries", () => {
    expect(displayIpa("[t͡sʰĩ53 pŋ̍22]", "pitch-contour")).toBe("[t͡sʰĩ˥˧ pŋ̍˨˨]");
    expect(displayIpa("[ke⁴⁴]", "pitch-contour")).toBe("[ke˦˦]");
    expect(pitchContours("[ke˦˦ pŋ̍²²]")).toEqual(["44", "22"]);
  });
  it("does not turn category digits into either pitch contours or search aliases", () => {
    expect(displayIpa("[pa1]", "source-category")).toBe("[pa1]");
    expect(ipaSearchForms("[pa1]", "source-category")).toEqual(["[pa1]"]);
    expect(displayIpa("[pa1]")).toBe("[pa1]");
    const html = renderToStaticMarkup(
      <Pronunciation ipa="[pa1]" toneNotation="source-category" />,
    );
    expect(html).toContain("IPA · source tone categories");
    expect(html).not.toContain("Pitch contour");
    expect(html).not.toContain("pa˩");
  });
  it("finds a locality word using the exact visible IPA or the original source digits", () => {
    const point = mapPoints.find((point) => point.id === "zhangzhou")!;
    const words = getLocalLearning(point).words;
    const chicken = words.find((word) => word.han === "雞")!;
    expect(
      searchWords(words, displayIpa(chicken.ipa, chicken.toneNotation)),
    ).toContain(chicken);
    expect(searchWords(words, chicken.ipa)).toContain(chicken);
    const categoryWord = {
      ...chicken,
      ipa: "[pa1]",
      toneNotation: "source-category" as const,
    };
    expect(searchWords([categoryWord], "[pa˩]")).toEqual([]);
  });
  it("finds regional additions and comparisons from the displayed IPA", () => {
    expect(
      extraRegionalWords("xiamen", [], "[kue˥˥]").some(
        (word) => word.conceptId === "chicken",
      ),
    ).toBe(true);
    const html = renderToStaticMarkup(
      <MemoryRouter>
        <RegionalDifferences localityId="zhangzhou" query="[ke˦˦]" />
      </MemoryRouter>,
    );
    expect(html).toContain("Local differences");
    expect(html).toContain("雞");
    expect(html).toContain("Tsiang-tsiu");
  });
  it("keeps every existing Amoy IPA reading searchable", () => {
    for (const word of xiamenWords) {
      expect(
        filterXiamenWords(displayIpa(word.ipa, "pitch-contour")).map(
          (item) => item.id,
        ),
      ).toContain(word.id);
    }
  });
});
