import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import ReadingRoom, { readResults } from "./ReadingRoom";
const payload = () => ({
  mode: "model",
  results: [
    "amoy",
    "beijing",
    "shanghai",
    "guangzhou",
    "meixian",
    "written",
  ].map((target) => ({ target, text: "測試", status: "draft", notes: [] })),
});
describe("six-way translation interface", () => {
  it("rejects partial, duplicated, empty and non-model results", () => {
    expect(readResults(payload())).toHaveLength(6);
    expect(() => readResults({ ...payload(), mode: "sample" })).toThrow();
    expect(() =>
      readResults({ ...payload(), results: payload().results.slice(1) }),
    ).toThrow();
    const duplicate = payload();
    duplicate.results[5] = duplicate.results[0];
    expect(() => readResults(duplicate)).toThrow();
    const empty = payload();
    empty.results[0].text = "";
    expect(() => readResults(empty)).toThrow();
  });
  it("renders six places/registers without fabricating phonetics or translations", () => {
    const html = renderToStaticMarkup(
      <MemoryRouter>
        <ReadingRoom />
      </MemoryRouter>,
    );
    for (const target of payload().results)
      expect(html).toContain(`id="rr-target-${target.target}"`);
    expect(html).toContain("Results are machine drafts");
    expect(html).toContain("Meixian · Moiyan");
    expect(html).toContain("Canton · Gwong2 Zau1");
    expect(html).not.toContain('class="pronunciation"');
    expect(html).not.toContain('rr-sample" open');
  });
  it("keeps direct links into the original sample comparison usable", () => {
    const html = renderToStaticMarkup(
      <MemoryRouter initialEntries={["/compare?left=min&right=wu&english=1"]}>
        <ReadingRoom />
      </MemoryRouter>,
    );
    expect(html).toContain('rr-sample" open');
    expect(html).toContain("English meaning");
    expect(html).toContain("Chinese texts are preserved as supplied");
  });
});
