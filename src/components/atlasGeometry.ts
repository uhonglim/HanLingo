import { geoMercator } from "d3-geo";

export type AtlasView = { x: number; y: number; zoom: number };
export type AtlasCoordinate = [number, number];
export const ATLAS_WIDTH = 800;
export const ATLAS_HEIGHT = 640;
export const DEFAULT_ATLAS_VIEW: AtlasView = { x: 0, y: 0, zoom: 1 };

export const atlasProjection = geoMercator()
  .center([114, 31])
  .scale(1390)
  .translate([ATLAS_WIDTH / 2, ATLAS_HEIGHT / 2]);

export function atlasPointPosition(coordinates: AtlasCoordinate, view: AtlasView): AtlasCoordinate {
  const [x, y] = atlasProjection(coordinates) ?? [0, 0];
  return [x * view.zoom + view.x, y * view.zoom + view.y];
}

/** Fit representative points with room for city labels and the inset controls. */
export function fitAtlasPoints(coordinates: AtlasCoordinate[], compact = true): AtlasView {
  if (!coordinates.length) return DEFAULT_ATLAS_VIEW;
  const projected = coordinates.map((point) => atlasProjection(point))
    .filter((point): point is [number, number] => point !== null && point.every(Number.isFinite));
  if (!projected.length) return DEFAULT_ATLAS_VIEW;
  if (!compact && projected.every(([x, y]) => x >= 0 && x <= ATLAS_WIDTH && y >= 0 && y <= ATLAS_HEIGHT)) {
    return DEFAULT_ATLAS_VIEW;
  }
  const xs = projected.map(([x]) => x);
  const ys = projected.map(([, y]) => y);
  const minX = Math.min(...xs), maxX = Math.max(...xs);
  const minY = Math.min(...ys), maxY = Math.max(...ys);
  // Do not clamp to the former 0.8 floor: Southeast Asia needs a wider view.
  const zoom = Math.min(compact ? 5 : 3.2, 560 / Math.max(1, maxX - minX), 430 / Math.max(1, maxY - minY));
  return {
    zoom,
    x: ATLAS_WIDTH / 2 - ((minX + maxX) / 2) * zoom,
    y: 310 - ((minY + maxY) / 2) * zoom,
  };
}

/** Keep a selected point reachable without recentering an already-visible map. */
export function revealAtlasPoint(view: AtlasView, coordinates: AtlasCoordinate): AtlasView {
  const [x, y] = atlasPointPosition(coordinates, view);
  const safeX = Math.max(65, Math.min(ATLAS_WIDTH - 100, x));
  const safeY = Math.max(90, Math.min(ATLAS_HEIGHT - 100, y));
  if (x === safeX && y === safeY) return view;
  return { ...view, x: view.x + safeX - x, y: view.y + safeY - y };
}

export function zoomAtlasView(view: AtlasView, factor: number, minZoom: number, maxZoom: number, anchor: AtlasCoordinate): AtlasView {
  const zoom = Math.max(minZoom, Math.min(maxZoom, view.zoom * factor));
  const ratio = zoom / view.zoom;
  return { zoom, x: anchor[0] + (view.x - anchor[0]) * ratio, y: anchor[1] + (view.y - anchor[1]) * ratio };
}
