import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it } from "vitest";
import LocalLearningPage from "./LocalLearningPage";
import { getLocalLearning } from "../data/learning";
import { mapPoints } from "../data/languages";
import { regionalReadingsFor } from "../data/regional-words";
import { varietyPath } from "../routing";

function render(path: string) {
  return renderToStaticMarkup(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
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
    expect(html).toContain(
      `1 of ${getLocalLearning(mapPoints.find((point) => point.id === "meixian")!).words.length} words`,
    );
    expect(html).toContain("tsha11");
    expect(html).toContain("Reading and source");
    expect(html.match(/class="learning-word"/g)).toHaveLength(1);
    expect(html).toContain("Local differences");
  });
  it("does not create empty word or practice routes for a locality without attested words", () => {
    for (const point of mapPoints) {
      const data = getLocalLearning(point);
      if (!data.words.length && !regionalReadingsFor(point.id).length)
        expect(render(`${varietyPath(point)}/words`)).toContain(
          "Entry not found",
        );
      if (new Set(data.words.map((word) => word.english)).size < 4)
        expect(render(`${varietyPath(point)}/practice`)).toContain(
          "Entry not found",
        );
    }
    expect(render("/min/southern-min/shanghai/sounds")).toContain(
      "Entry not found",
    );
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
