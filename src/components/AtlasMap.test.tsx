import { renderToStaticMarkup } from "react-dom/server";
import { geoContains } from "d3-geo";
import { feature } from "topojson-client";
import type { GeometryCollection, Topology } from "topojson-specification";
import { describe, expect, it } from "vitest";
import { mapPoints } from "../data/languages";
import { placeLabel } from "../data/language-names";
import world from "../data/east-asia-50m.json";
import AtlasMap from "./AtlasMap";
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

  it("renders every city as a visible keyboard-selectable marker with current place labels", () => {
    for (const selected of cities) {
      const html = renderToStaticMarkup(<AtlasMap compact points={minPoints} selectedGroup="min" selectedPoint={selected.id} onSelectPoint={() => {}} />);
      const markers = [...html.matchAll(/<g\b[^>]*role="button"[^>]*>/g)].map(match => match[0]);
      expect(markers).toHaveLength(minPoints.length);
      for (const point of cities) {
        const marker = markers.find(tag => tag.includes(`aria-label="Explore ${placeLabel(point)},`));
        expect(marker, point.id).toBeDefined();
        expect(marker).toMatch(/tabindex="0"/i);
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
