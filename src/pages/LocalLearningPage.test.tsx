import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it } from "vitest";
import LocalLearningPage from "./LocalLearningPage";
import { getLocalLearning, searchWords } from "../data/learning";
import { mapPoints } from "../data/languages";
import { regionalReadingsFor } from "../data/regional-words";
import { practiceSelection } from "../data/learning/practice";
import { varietyPath } from "../routing";

function render(path: string) {
  return renderToStaticMarkup(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/:languageId/:subgroupId/:clusterId/:varietyId/:chapter" element={<LocalLearningPage />} />
        <Route
          path="/:languageId/:subgroupId/:varietyId/:chapter"
          element={<LocalLearningPage />}
        />
      </Routes>
    </MemoryRouter>,
  );
}
describe("local learning chapters", () => {
  it("searches local words and renders source-qualified spellings", () => {
    const html = render("/hakka/yuetai/meixian/words?q=tea");
    const words = getLocalLearning(mapPoints.find(point => point.id === "meixian")!).words;
    const matches = searchWords(words, "tea");
    expect(html).toContain(`${matches.length} of ${words.length} words`);
    expect(html).toContain("tsha11");
    expect(html).toContain("Reading and source");
    expect(html.match(/class="learning-word"/g)).toHaveLength(matches.length);
    expect(html).toContain("Local differences");
  });
  it("does not silently replace an empty saved deck with unsaved words", () => {
    const html = render("/min/eastern-min/fuzhou/practice?saved=1");
    expect(html).toContain("Save four distinct answers to practise");
    expect(html).toContain("Use all words");
    expect(html).not.toContain('aria-label="Word practice"');
  });
  it("keeps omitted-tone examples separate from the new dated tonal survey", () => {
    const words = render("/mandarin/southwestern/chengdu/words?q=倒拐");
    expect(words).toContain("tones not supplied");
    expect(words).toContain("IPA · segments only");
    expect(words).not.toContain('aria-label="Pitch contour');
    expect(words).toContain("HanLingo spelling · segments only");
    const all = render("/mandarin/southwestern/chengdu/words");
    expect(all).toContain("1950s survey · published 1964");
    for (const card of all.match(/<article class="learning-word">[\s\S]*?<\/article>/g) ?? []) {
      if (card.includes("tones not supplied")) expect(card.includes('aria-label="Pitch contour')).toBe(false);
    }
  });
  it("does not create empty word or practice routes for a locality without attested words", () => {
    for (const point of mapPoints) {
      const data = getLocalLearning(point);
      if (!data.words.length && !regionalReadingsFor(point.id).length)
        expect(render(`${varietyPath(point)}/words`)).toContain(
          "Entry not found",
        );
      if (!practiceSelection(data.words))
        expect(render(`${varietyPath(point)}/practice`)).toContain(
          "Entry not found",
        );
    }
    expect(render("/min/southern-min/shanghai/sounds")).toContain(
      "Entry not found",
    );
  });
  it("teaches spelling from source character readings without revealing the answer or inventing meanings", () => {
    const html = render("/hui/qiwu/qimen-wuyuan/youshan-hui/practice");
    expect(html).toContain('aria-label="IPA spelling practice"');
    expect(html).toContain("Match this IPA to HanLingo spelling.");
    expect(html).not.toContain("Choose the meaning");
    expect(html).not.toContain('class="pronunciation-spelling"');
    expect(html.match(/aria-pressed="false"/g) ?? []).toHaveLength(4);
  });
  it("provides distinct practice answers and shows credited local photos without duplicate source links", () => {
    const practice = render("/min/eastern-min/fuzhou/practice");
    expect(practice.match(/aria-pressed="false"/g) ?? []).toHaveLength(4);
    const photo = render("/mandarin/jilu/jinan/culture");
    expect(photo).toContain("photo-gallery-grid");
    expect(photo).toContain("creativecommons.org");
    expect(photo).not.toContain("Photo and location");
  });
});
