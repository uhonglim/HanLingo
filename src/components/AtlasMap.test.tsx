import { renderToStaticMarkup } from "react-dom/server";
import { geoContains } from "d3-geo";
import { feature } from "topojson-client";
import type { GeometryCollection, Topology } from "topojson-specification";
import { describe, expect, it } from "vitest";
import { mapPoints } from "../data/languages";
import { placeLabel } from "../data/language-names";
import world from "../data/east-asia-50m.json";
import AtlasMap from "./AtlasMap";
import { createAtlasMarkerIndex, atlasMarkerFocus } from "./AtlasMap.layout";
import { atlasPointPosition, atlasViewport, fitAtlasPoints, revealAtlasPoint, zoomAtlasView } from "./atlasGeometry";

const minPoints = mapPoints.filter((point) => point.groupId === "min");
const cityIds = ["taipak", "singapore", "george-town"];
const cities = cityIds.map((id) => mapPoints.find((point) => point.id === id)!);

describe("Min atlas spanning Fujian, Taiwan, and Southeast Asia", () => {
  it("fits every point inside the padded view and resets consistently after filtering", () => {
    expect(cities.every(Boolean)).toBe(true);
    for (const points of [minPoints, minPoints.filter(point => point.subgroupId === "southern-min"), cities]) {
      const coordinates = points.map(point => point.coordinates);
      const view = fitAtlasPoints(coordinates);
      expect(view.zoom).toBeLessThan(0.8);
      for (const point of points) {
        const [x, y] = atlasPointPosition(point.coordinates, view);
        expect(x, `${point.id}: horizontal fit`).toBeGreaterThanOrEqual(119.99);
        expect(x).toBeLessThanOrEqual(680.01);
        expect(y, `${point.id}: vertical fit`).toBeGreaterThanOrEqual(94.99);
        expect(y).toBeLessThanOrEqual(525.01);
        expect(revealAtlasPoint(view, point.coordinates), `${point.id}: selection must not recenter a fitted map`).toBe(view);
      }
      expect(fitAtlasPoints([...coordinates].reverse())).toEqual(view);
    }
  });

  it("fits new points on the noncompact overview and caps a single-point zoom", () => {
    const view = fitAtlasPoints(mapPoints.map(point => point.coordinates), false);
    for (const point of mapPoints) {
      const [x, y] = atlasPointPosition(point.coordinates, view);
      expect(x).toBeGreaterThan(0);
      expect(x).toBeLessThan(800);
      expect(y).toBeGreaterThan(0);
      expect(y).toBeLessThan(640);
    }
    const singapore = cities.find(point => point.id === "singapore")!;
    const local = fitAtlasPoints([singapore.coordinates]);
    expect(local.zoom).toBe(5);
    expect(atlasPointPosition(singapore.coordinates, local)).toEqual([400, 310]);
  });

  it("zooms around the selected reference point without moving it offscreen", () => {
    const view = fitAtlasPoints(minPoints.map(point => point.coordinates));
    for (const point of cities) {
      const anchor = atlasPointPosition(point.coordinates, view);
      const zoomed = zoomAtlasView(view, 1.3, view.zoom * 0.8, 5, anchor);
      const position = atlasPointPosition(point.coordinates, zoomed);
      expect(position[0]).toBeCloseTo(anchor[0]);
      expect(position[1]).toBeCloseTo(anchor[1]);
    }
  });

  it("includes original coastlines under Taipak, Singapore, and George Town", () => {
    const topology = world as unknown as Topology<{ countries: GeometryCollection }>;
    const countries: Record<string, string> = { taipak: "158", singapore: "702", "george-town": "458" };
    cities.forEach((point) => {
      const geometry = topology.objects.countries.geometries.find(country => String(country.id) === countries[point.id]);
      expect(geometry, point.id).toBeDefined();
      expect(geoContains(feature(topology, geometry!), point.coordinates), point.id).toBe(true);
    });
  });

  it("renders every city with current labels and one keyboard entry point", () => {
    for (const selected of cities) {
      const html = renderToStaticMarkup(<AtlasMap compact points={minPoints} selectedGroup="min" selectedPoint={selected.id} onSelectPoint={() => {}} />);
      const markers = [...html.matchAll(/<g\b[^>]*role="button"[^>]*>/g)].map(match => match[0]);
      expect(markers).toHaveLength(minPoints.length);
      for (const point of cities) {
        const marker = markers.find(tag => tag.includes(`aria-label="Explore ${placeLabel(point)},`));
        expect(marker, point.id).toBeDefined();
        expect(marker).toContain(`tabindex="${point.id === selected.id ? 0 : -1}"`);
        expect(marker).toContain(`aria-pressed="${point.id === selected.id}"`);
      }
      const amoy = minPoints.find(point => point.id === "xiamen")!;
      expect(html).toContain(`aria-label="Explore ${placeLabel(amoy)},`);
    }
  });
});


describe("responsive atlas frame", () => {
  it("fills wide and tall frames without stretching or cropping the fitted reference area", () => {
    for (const [width, height] of [[1000, 465], [360, 390], [800, 640]]) {
      const box = atlasViewport(width, height);
      expect(box.width / box.height).toBeCloseTo(width / height);
      expect(box.x).toBeLessThanOrEqual(0);
      expect(box.y).toBeLessThanOrEqual(0);
      expect(box.x + box.width).toBeGreaterThanOrEqual(800);
      expect(box.y + box.height).toBeGreaterThanOrEqual(640);
    }
  });
});

describe('map keyboard access and dense localities', () => {
  it('exposes keyboard panning, zoom, reset and visible marker selection', () => {
    const html = renderToStaticMarkup(<AtlasMap points={minPoints} selectedGroup="all" selectedPoint={null} onSelectPoint={() => {}}/>);
    expect(html).toMatch(/class="atlas-map-canvas"[^>]*tabindex="0"/);
    expect(html).toContain('Use arrow keys to pan, plus and minus to zoom, and Home to reset.');
    expect(html).toContain('aria-label="Reset map view"');
    expect(html).toContain('Scroll or pinch to zoom');
    expect(html).not.toContain('aria-label="Zoom in"');
    expect(html).not.toContain('aria-label="Zoom out"');
  });
  it('can separate close locality anchors by zooming without moving the selected anchor', () => {
    const coords: [number, number][] = [[113.122, 23.028], [113.14, 23.05]];
    const view = fitAtlasPoints(coords, true);
    const anchor = atlasPointPosition(coords[0], view);
    const zoomed = zoomAtlasView(view, 24, .1, 24, anchor);
    expect(zoomed.zoom).toBe(24);
    expect(atlasPointPosition(coords[0], zoomed)[0]).toBeCloseTo(anchor[0]);
    const [x, y] = atlasPointPosition(coords[1], zoomed);
    expect(Math.hypot(x - anchor[0], y - anchor[1])).toBeGreaterThan(15);
  });
});


describe("large atlas interaction", () => {
  const points = Array.from({ length: 1000 }, (_, index) => ({
    id: `reference-${index}`, name: `Reference ${index}`, nativeName: "地點", groupId: "min",
    coordinates: [100 + index % 40 * .8, 18 + Math.floor(index / 40) * .8] as [number, number],
  }));

  it("keeps every fitted place available with a single marker Tab stop", () => {
    const html = renderToStaticMarkup(<AtlasMap points={points} selectedGroup="min" selectedPoint="reference-500" onSelectPoint={() => {}} />);
    const markers = [...html.matchAll(/<g\b[^>]*role="button"[^>]*>/g)].map(match => match[0]);
    expect(markers).toHaveLength(1000);
    expect(markers.filter(marker => marker.includes('tabindex="0"'))).toHaveLength(1);
    expect(markers.find(marker => marker.includes('tabindex="0"'))).toContain('Reference 500');
    expect(html).toContain("Tab leaves the markers.");
  });

  it("can visit all visible markers, wrap in both directions and escape with Tab", () => {
    const ids = points.map(point => point.id);
    const visited = new Set<string>();
    let current = ids[0];
    for (let i = 0; i < ids.length; i++) {
      visited.add(current);
      current = atlasMarkerFocus(ids, current, "ArrowRight")!;
    }
    expect(visited.size).toBe(1000);
    expect(current).toBe(ids[0]);
    expect(atlasMarkerFocus(ids, current, "ArrowLeft")).toBe(ids.at(-1));
    expect(atlasMarkerFocus(ids, current, "End")).toBe(ids.at(-1));
    expect(atlasMarkerFocus(ids, ids[500], "Home")).toBe(ids[0]);
    expect(atlasMarkerFocus(ids, current, "Tab")).toBeNull();
    expect(atlasMarkerFocus([], current, "ArrowDown")).toBeNull();
    expect(atlasMarkerFocus(ids, "outside-viewport", "ArrowDown")).toBe(ids[0]);
  });

  it("spatial label collision checks preserve exact edge and own-marker exclusions", () => {
    const markers = Array.from({ length: 1000 }, (_, index) => ({
      id: `point-${index}`, x: index % 40 * 20 - 90, y: Math.floor(index / 40) * 20 - 80,
    }));
    const collides = createAtlasMarkerIndex(markers);
    for (let index = 0; index < 150; index++) {
      const box = { x: index * 7 - 120, y: index * 3 - 100, width: 36, height: 19 };
      const ownId = `point-${index}`;
      const expected = markers.some(point => point.id !== ownId &&
        point.x >= box.x - 5 && point.x <= box.x + box.width + 5 &&
        point.y >= box.y - 5 && point.y <= box.y + box.height + 5);
      expect(collides(box, ownId)).toBe(expected);
    }
    const isolated = createAtlasMarkerIndex([{ id: "own", x: -32, y: 32 }]);
    expect(isolated({ x: -27, y: 37, width: 10, height: 10 }, "other")).toBe(true);
    expect(isolated({ x: -27, y: 37, width: 10, height: 10 }, "own")).toBe(false);
    expect(isolated({ x: -26.9, y: 37, width: 10, height: 10 }, "other")).toBe(false);
  });
});
