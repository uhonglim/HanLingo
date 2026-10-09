import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import LocalWordCollection from "./LocalWordCollection";
import { getLocalLearning } from "../data/learning";
import { mapPoints } from "../data/languages";
import { parseNotebook } from "../hooks/useWordNotebook";
const data = getLocalLearning(
  mapPoints.find((point) => point.id === "fuzhou")!,
);
const render = (query: string) =>
  renderToStaticMarkup(
    <MemoryRouter initialEntries={[`/min/eastern-min/fuzhou/words${query}`]}>
      <LocalWordCollection
        localityId="fuzhou"
        words={data.words}
        base="/min/eastern-min/fuzhou"
      />
    </MemoryRouter>,
  );
describe("local word collections", () => {
  it("combines topic and search without losing source details", () => {
    const html = render("?q=tea&topic=Food%20%26%20drink");
    expect(html).toContain(">茶</h3>");
    expect(html).not.toContain(">魚</h3>");
    expect(html).toContain("CUHK");
    expect(render("?q=tea&topic=Numbers")).toContain("No matching words");
  });
  it("offers a usable empty notebook without inventing saved content", () => {
    const html = render("?saved=1");
    expect(html).toContain("Your word collection starts here");
    expect(html).not.toContain("Practice saved words");
  });
  it("tolerates corrupt browser storage and deduplicates valid IDs", () => {
    expect(parseNotebook("{broken")).toEqual([]);
    expect(parseNotebook('{"id":"x"}')).toEqual([]);
    expect(parseNotebook('["x",null,1,"x","y"]')).toEqual(["x", "y"]);
  });
});
