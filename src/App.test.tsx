import { describe, expect, it } from "vitest";
import { getPageScrollPlan } from "./App";

const location = (pathname: string, search = "", hash = "") => ({ pathname, search, hash });

describe("independent page-panel scrolling", () => {
  it("preserves the reader's position for filters and repeated current-page links", () => {
    expect(getPageScrollPlan(location("/min"), location("/min", "?branch=eastern-min"), "PUSH")).toEqual({ kind: "preserve" });
    expect(getPageScrollPlan(location("/compare", "?left=min"), location("/compare", "?left=min&english=1"), "PUSH")).toEqual({ kind: "preserve" });
    expect(getPageScrollPlan(location("/yue/guangfu/guangzhou"), location("/yue/guangfu/guangzhou"), "PUSH")).toEqual({ kind: "preserve" });
    expect(getPageScrollPlan(location("/min/southern-min/xiamen/sounds", "", "#ipa-tones-heading"), location("/min/southern-min/xiamen/sounds", "?tone=53"), "REPLACE")).toEqual({ kind: "preserve" });
  });

  it("restores Back/Forward positions even when only the query changed or an old fragment remains", () => {
    expect(getPageScrollPlan(location("/min", "?branch=eastern-min"), location("/min"), "POP", 450)).toEqual({ kind: "position", top: 450 });
    expect(getPageScrollPlan(location("/compare"), location("/about", "", "#source-list"), "POP", 920)).toEqual({ kind: "position", top: 920 });
  });

  it("honors a new source anchor when navigation also removes a search query", () => {
    expect(getPageScrollPlan(location("/about", "?q=source"), location("/about", "", "#source-list"), "PUSH")).toEqual({ kind: "anchor", id: "source-list" });
    expect(getPageScrollPlan(null, location("/yue", "", "#reference-sources"), "POP")).toEqual({ kind: "anchor", id: "reference-sources" });
    expect(getPageScrollPlan(location("/yue", "", "#reference-sources"), location("/yue", "", "#reference-sources"), "PUSH")).toEqual({ kind: "anchor", id: "reference-sources" });
    expect(getPageScrollPlan(location("/compare", "", "#rr-expressions-title"), location("/compare", "?english=1", "#rr-expressions-title"), "PUSH")).toEqual({ kind: "preserve" });
  });

  it("starts new documents at the top and safely decodes direct fragment IDs", () => {
    expect(getPageScrollPlan(location("/min"), location("/about"), "PUSH")).toEqual({ kind: "position", top: 0 });
    expect(getPageScrollPlan(null, location("/about", "", "#source%2Dlist"), "POP")).toEqual({ kind: "anchor", id: "source-list" });
    expect(getPageScrollPlan(null, location("/about", "", "#bad%"), "POP")).toEqual({ kind: "anchor", id: "bad%" });
  });
});
