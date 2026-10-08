import { describe, expect, it } from "vitest";
import { mapPoints } from "./languages";
import {
  regionalConcepts,
  regionalConceptsFor,
  regionalReadingsFor,
} from "./regional-words";

describe("regional word evidence", () => {
  it("connects distinct concepts to real localities and per-reading evidence", () => {
    expect(new Set(regionalConcepts.map((item) => item.id)).size).toBe(
      regionalConcepts.length,
    );
    const readings = regionalConcepts.flatMap((item) => item.readings);
    expect(new Set(readings.map((item) => item.id)).size).toBe(readings.length);
    const places = new Set(mapPoints.map((point) => point.id));
    for (const concept of regionalConcepts) {
      expect(
        new Set(concept.readings.map((item) => item.localityId)).size,
      ).toBeGreaterThanOrEqual(2);
      for (const reading of concept.readings) {
        expect(places.has(reading.localityId)).toBe(true);
        expect(reading.ipa || reading.sourceRomanization?.text).toBeTruthy();
        expect(reading.scope).toBeTruthy();
        expect(new URL(reading.source.url).protocol).toBe("https:");
      }
    }
  });
  it("retains alternative local forms without inventing IPA from source tone marks", () => {
    const soap = regionalReadingsFor("taipak").filter(
      (item) => item.conceptId === "soap",
    );
    expect(soap.map((item) => item.sourceRomanization?.text)).toEqual([
      "sap-muî",
      "sap-bûn",
    ]);
    for (const word of soap) {
      expect(word.ipa).toBeUndefined();
      expect(word.toneNotation).toBe("source-category");
    }
    expect(
      regionalReadingsFor("singapore").find(
        (item) => item.conceptId === "market",
      )?.sourceRomanization?.text,
    ).toBe("pa sat");
  });
  it("preserves small Amoy, Tsiang-chiu and Tsuan-chiu differences from a single table", () => {
    const chicken = regionalConcepts.find((item) => item.id === "chicken")!;
    expect(
      chicken.readings.find((item) => item.localityId === "xiamen")?.ipa,
    ).toBe("[kue55]");
    expect(
      chicken.readings.find((item) => item.localityId === "zhangzhou")?.ipa,
    ).toBe("[ke44]");
    expect(
      chicken.readings.find((item) => item.localityId === "quanzhou")?.ipa,
    ).toBe("[kue33]");
    expect(regionalConceptsFor("zhangzhou")).toHaveLength(4);
    expect(regionalReadingsFor("does-not-exist")).toEqual([]);
  });
  it("does not publish the unverified tomato locality assignment or wrong Jian’ou sense", () => {
    const tomato = regionalConcepts.find((item) => item.id === "tomato")!;
    expect(
      tomato.readings.some((item) =>
        ["xiamen", "quanzhou"].includes(item.localityId),
      ),
    ).toBe(false);
    const rice = regionalReadingsFor("jianou").filter(
      (item) => item.conceptId === "uncooked-rice",
    );
    expect(rice.some((item) => item.ipa === "[mi˨˩]")).toBe(false);
  });
});
