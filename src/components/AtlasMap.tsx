import {
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { KeyboardEvent } from "react";
import { createAtlasMarkerIndex, atlasMarkerFocus, nearestAtlasMarker } from "./AtlasMap.layout";
import { attachAtlasGestures } from "./atlasGestures";
import { geoGraticule, geoPath } from "d3-geo";
import { merge, mesh } from "topojson-client";
import type {
  GeometryCollection,
  MultiPolygon,
  Polygon,
  Topology,
} from "topojson-specification";
import world from "../data/east-asia-50m.json";
import { placeLabel, placeReadingName, placeDisplayName } from "../data/language-names";
import {
  ATLAS_WIDTH as WIDTH,
  ATLAS_HEIGHT as HEIGHT,
  atlasProjection as projection,
  atlasPointPosition,
  atlasViewport,
  fitAtlasPoints,
  revealAtlasPoint,
  zoomAtlasView,
} from "./atlasGeometry";
import type { AtlasView as View } from "./atlasGeometry";
import "./AtlasMap.css";

export type MapPoint = {
  id: string;
  name: string;
  nativeName: string;
  coordinates: [number, number];
  groupId: string;
};

type AtlasMapProps = {
  points: MapPoint[];
  selectedGroup: string;
  selectedPoint: string | null;
  onSelectPoint: (id: string) => void;
  compact?: boolean;
  /** Search emphasis does not reset the reader’s pan or zoom. */
  highlightedPointIds?: string[];
};

type Label = { x: number; y: number; width: number; height: number };

const COLORS: Record<string, string> = {
  mandarin: "#b77938",
  min: "#2155f5",
  yue: "#748463",
  hakka: "#92769b",
  wu: "#588785",
  gan: "#8d5c43", xiang: "#596747", jin: "#766149",
  hui: "#566b70", pinghua: "#6c7550", tuhua: "#826b75",
};
const topology = world as unknown as Topology<{
  countries: GeometryCollection;
}>;
const path = geoPath(projection);
const countryPolygons = topology.objects.countries.geometries.filter(
  (geometry): geometry is Polygon | MultiPolygon =>
    geometry.type === "Polygon" || geometry.type === "MultiPolygon",
);
const landPath = path(merge(topology, countryPolygons)) ?? "";
const boundaryPath =
  path(mesh(topology, topology.objects.countries, (a, b) => a !== b)) ?? "";
const gridPath =
  path(
    geoGraticule()
      .extent([
        [90, -10],
        [140, 50],
      ])
      .step([5, 5])(),
  ) ?? "";
const geographicLabels: {
  name: string;
  coordinates: [number, number];
  className: string;
  rotate?: number;
}[] = [
  {
    name: "MAINLAND CHINA",
    coordinates: [108.1, 34.2],
    className: "atlas-country-label",
  },
  {
    name: "TAIWAN",
    coordinates: [123.3, 23.1],
    className: "atlas-island-label",
    rotate: -58,
  },
  {
    name: "EAST CHINA SEA",
    coordinates: [126.8, 28.4],
    className: "atlas-sea-label",
    rotate: -32,
  },
  {
    name: "SOUTH CHINA SEA",
    coordinates: [115.9, 19.3],
    className: "atlas-sea-label",
  },
];

function overlaps(a: Label, b: Label) {
  return (
    a.x < b.x + b.width + 5 &&
    a.x + a.width + 5 > b.x &&
    a.y < b.y + b.height + 5 &&
    a.y + a.height + 5 > b.y
  );
}

export default function AtlasMap({
  points,
  selectedGroup,
  selectedPoint,
  onSelectPoint,
  compact = false,
  highlightedPointIds,
}: AtlasMapProps) {
  // The parent may build a fresh points array on every render. A geometry key
  // keeps a reader's pan/zoom intact until the actual mapped places change.
  const geometryKey = useMemo(() => JSON.stringify(
    points
      .map((point) => [point.id, ...point.coordinates] as const)
      .sort((a, b) => a[0].localeCompare(b[0])),
  ), [points]);
  const maxZoom = 24;
  const highlighted = useMemo(() => highlightedPointIds ? new Set(highlightedPointIds) : null, [highlightedPointIds]);
  const initialView = useMemo<View>(() => {
    const coordinates = (
      JSON.parse(geometryKey) as [string, number, number][]
    ).map(([, longitude, latitude]): [number, number] => [longitude, latitude]);
    return fitAtlasPoints(coordinates, compact);
  }, [compact, geometryKey]);
  const minZoom = Math.min(0.8, initialView.zoom * 0.8);
  const svgRef = useRef<SVGSVGElement>(null);
  const markerRefs = useRef(new Map<string, SVGGElement>());
  const [focusedPointId, setFocusedPointId] = useState<string | null>(selectedPoint);
  const drag = useRef<{ view: View; labels: Map<string, Label> } | null>(null);
  const labelsRef = useRef(new Map<string, Label>());
  const [viewport, setViewport] = useState(() => atlasViewport(WIDTH, HEIGHT));
  const [view, setRenderedView] = useState<View>(initialView);
  const viewRef = useRef(view);
  function setView(next: View | ((previous: View) => View)) {
    viewRef.current = typeof next === 'function' ? next(viewRef.current) : next;
    setRenderedView(viewRef.current);
  }
  const [dragging, setDragging] = useState(false);
  const [layout, setLayout] = useState<{ scale: number; reserved: Label[] }>({
    scale: 1,
    reserved: [],
  });
  const id = useId().replace(/:/g, "");
  const clipId = `atlas-clip-${id}`;
  const instructionsId = `atlas-instructions-${id}`;

  useLayoutEffect(() => {
    setView(initialView);
  }, [initialView]);

  useLayoutEffect(() => {
    const svg = svgRef.current;
    const container = svg?.parentElement;
    if (!svg || !container) return;
    const overlays = [
      ...container.querySelectorAll(
        ".atlas-map-footer, .atlas-map-controls, .atlas-map-hint, .atlas-north",
      ),
    ];
    const selectedCard =
      container.parentElement?.querySelector(".map-selected");
    if (selectedCard) overlays.push(selectedCard);
    function measure() {
      if (!svg) return;
      const bounds = svg.getBoundingClientRect();
      const nextViewport = atlasViewport(bounds.width, bounds.height);
      const scale = bounds.width / nextViewport.width;
      if (!scale) return;
      setViewport(nextViewport);
      setLayout({
        scale,
        reserved: overlays.map((element) => {
          const rect = element.getBoundingClientRect();
          return {
            x: (rect.left - bounds.left) / scale + nextViewport.x - 6,
            y: (rect.top - bounds.top) / scale + nextViewport.y - 6,
            width: rect.width / scale + 12,
            height: rect.height / scale + 12,
          };
        }),
      });
    }
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(svg);
    overlays.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const selectedCoordinates = points.find(
    (item) => item.id === selectedPoint,
  )?.coordinates;
  const selectedLongitude = selectedCoordinates?.[0];
  const selectedLatitude = selectedCoordinates?.[1];
  useLayoutEffect(() => {
    if (selectedLongitude === undefined || selectedLatitude === undefined)
      return;
    setFocusedPointId(selectedPoint);
    setView((previous) =>
      revealAtlasPoint(previous, [selectedLongitude, selectedLatitude]),
    );
  }, [selectedPoint, selectedGroup, selectedLongitude, selectedLatitude]);

  const basePoints = useMemo(
    () =>
      points.map((point) => {
        const position = projection(point.coordinates) ?? [0, 0];
        return {
          ...point,
          displayName: placeLabel(point),
          readingName: placeReadingName(point),
          fullName: placeDisplayName(point),
          x: position[0],
          y: position[1],
        };
      }),
    [points],
  );
  const projectedPoints = useMemo(() => basePoints.map(point => ({
    ...point, x: point.x * view.zoom + view.x, y: point.y * view.zoom + view.y,
  })), [basePoints, view]);
  // Preserve a small edge margin for markers entering during a gesture.
  const visiblePoints = useMemo(() => projectedPoints.filter(point =>
    point.x >= viewport.x && point.x <= viewport.x + viewport.width &&
    point.y >= viewport.y && point.y <= viewport.y + viewport.height,
  ), [projectedPoints, viewport]);
  const visibleIds = useMemo(() => visiblePoints.map(point => point.id), [visiblePoints]);
  const markerTabStop = focusedPointId && visibleIds.includes(focusedPointId) ? focusedPointId
    : selectedPoint && visibleIds.includes(selectedPoint) ? selectedPoint : visibleIds[0];
  const renderedPoints = useMemo(() => {
    const margin = 24 / layout.scale;
    return projectedPoints.filter(point => point.id === focusedPointId || (
      point.x >= viewport.x - margin && point.x <= viewport.x + viewport.width + margin &&
      point.y >= viewport.y - margin && point.y <= viewport.y + viewport.height + margin
    ));
  }, [projectedPoints, viewport, layout.scale, focusedPointId]);

  const labels = useMemo(() => {
    // Keep the same label anchors throughout a gesture instead of hopping
    // between collision candidates on every pointer movement.
    if (dragging && drag.current) {
      const gesture = drag.current;
      return new Map(
        [...gesture.labels].map(([id, label]) => [
          id,
          {
            ...label,
            x: (label.x - gesture.view.x) * view.zoom / gesture.view.zoom + view.x,
            y: (label.y - gesture.view.y) * view.zoom / gesture.view.zoom + view.y,
          },
        ]),
      );
    }
    const markerOverlaps = createAtlasMarkerIndex(projectedPoints);
    const placed: Label[] = [...layout.reserved];
    const result = new Map<string, Label>();
    const sorted = [...visiblePoints].sort((a, b) => {
      const priority = (p: MapPoint) =>
        p.id === selectedPoint ? 4 : highlighted?.has(p.id) ? 3 : p.groupId === selectedGroup ? 2 : 1;
      return priority(b) - priority(a);
    });
    for (const point of sorted) {
      if (
        point.x < viewport.x + 12 ||
        point.x > viewport.x + viewport.width - 12 ||
        point.y < viewport.y + 45 ||
        point.y > viewport.y + viewport.height - 52
      )
        continue;
      const active = point.id === selectedPoint;
      if (
        !active &&
        !highlighted?.has(point.id) &&
        !(selectedGroup === "all" && (points.length < 40 || view.zoom > initialView.zoom * 1.6)) &&
        point.groupId !== selectedGroup &&
        ![
          "beijing-city",
          "chengdu",
          "guangzhou",
          "shanghai",
          "xiamen",
        ].includes(point.id)
      )
        continue;
      const width =
        (Math.max(40, point.displayName.length * (active ? 7.2 : 6.4), active && point.readingName ? point.readingName.length * 6.2 : 0) +
          (active ? 19 : 0)) /
        layout.scale;
      const height = (active ? point.readingName && point.readingName !== point.displayName ? 40 : 26 : 19) / layout.scale;
      const gap = 9 / layout.scale;
      const candidates: Label[] = [
        { x: point.x + gap, y: point.y - height / 2, width, height },
        { x: point.x - width - gap, y: point.y - height / 2, width, height },
        { x: point.x - width / 2, y: point.y - height - gap, width, height },
        { x: point.x - width / 2, y: point.y + gap, width, height },
      ];
      const label = candidates.find(
        (candidate) =>
          candidate.x >= viewport.x + 8 &&
          candidate.x + width < viewport.x + viewport.width - 8 &&
          !placed.some((other) => overlaps(candidate, other)) &&
          !markerOverlaps(candidate, point.id),
      );
      if (label || active) {
        const chosen =
          label ??
          candidates.find(
            (candidate) =>
              !layout.reserved.some((other) => overlaps(candidate, other)),
          ) ??
          candidates[2];
        placed.push(chosen);
        result.set(point.id, chosen);
      }
    }
    return result;
  }, [
    projectedPoints,
    visiblePoints,
    highlighted,
    points.length,
    initialView.zoom,
    view.zoom,
    selectedGroup,
    selectedPoint,
    layout,
    dragging,
    view.x,
    view.y,
    viewport,
  ]);

  labelsRef.current = labels;
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    return attachAtlasGestures(svg, {
      getView: () => viewRef.current,
      onView: setView,
      onActive: active => {
        drag.current = active ? { view: viewRef.current, labels: labelsRef.current } : null;
        setDragging(active);
      },
      minZoom,
      maxZoom,
    });
  }, [minZoom, maxZoom]);

  function zoom(factor: number) {
    setView((previous) => {
      const selected = selectedCoordinates
        ? atlasPointPosition(selectedCoordinates, previous)
        : null;
      const anchor: [number, number] =
        selected &&
        selected[0] >= 0 &&
        selected[0] <= WIDTH &&
        selected[1] >= 0 &&
        selected[1] <= HEIGHT
          ? selected
          : [WIDTH / 2, HEIGHT / 2];
      return zoomAtlasView(previous, factor, minZoom, maxZoom, anchor);
    });
  }

  function mapKeyboard(event: KeyboardEvent<SVGSVGElement>) {
    if (event.target !== event.currentTarget) return;
    const step = 60 / layout.scale;
    const offsets: Record<string, [number, number]> = {
      ArrowLeft: [step, 0], ArrowRight: [-step, 0], ArrowUp: [0, step], ArrowDown: [0, -step],
    };
    if (offsets[event.key]) {
      event.preventDefault();
      const [x, y] = offsets[event.key];
      setView(previous => ({ ...previous, x: previous.x + x, y: previous.y + y }));
    } else if (['+', '=', '-', 'Home', '0'].includes(event.key)) {
      event.preventDefault();
      if (event.key === 'Home' || event.key === '0') setView(initialView);
      else zoom(event.key === '-' ? 1 / 1.3 : 1.3);
    }
  }

  function selectWithKeyboard(
    event: KeyboardEvent<SVGGElement>,
    pointId: string,
  ) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onSelectPoint(pointId);
      return;
    }
    const nextId = atlasMarkerFocus(visibleIds, pointId, event.key);
    if (nextId) {
      event.preventDefault();
      setFocusedPointId(nextId);
      markerRefs.current.get(nextId)?.focus({ preventScroll: true });
    }
  }

  return (
    <div
      className={`atlas-map${compact ? " atlas-map--compact" : ""}${dragging ? " atlas-map--dragging" : ""}`}
    >
      <span className="atlas-map-hint">
        Drag to move · Scroll or pinch to zoom
      </span>
      <span className="sr-only" id={instructionsId}>Scroll or pinch to zoom, drag to move, or double-click to zoom in. Use arrow keys to pan, plus and minus to zoom, and Home to reset. On a locality marker, use arrow keys to move between places, Home or End to reach the first or last visible place, and Enter or Space to select. Tab leaves the markers.</span>
      <svg
        ref={svgRef}
        className="atlas-map-canvas"
        viewBox={`${viewport.x} ${viewport.y} ${viewport.width} ${viewport.height}`}
        aria-label="Interactive map of selected Han language varieties and communities. Select a reference point to explore."
        aria-describedby={instructionsId}
        tabIndex={0}
        onKeyDown={mapKeyboard}
      >
        <defs>
          <clipPath id={clipId}>
            <rect {...viewport} />
          </clipPath>
        </defs>
        <g clipPath={`url(#${clipId})`}>
          <g
            transform={`translate(${view.x} ${view.y}) scale(${view.zoom})`}
            aria-hidden="true"
          >
            <path
              d={landPath}
              className="atlas-land"
              vectorEffect="non-scaling-stroke"
            />
            <path
              d={boundaryPath}
              className="atlas-borders"
              vectorEffect="non-scaling-stroke"
            />
            <path
              d={gridPath}
              className="atlas-grid"
              vectorEffect="non-scaling-stroke"
            />
          </g>
          <g aria-hidden="true">
            {geographicLabels.map((label) => {
              const position = projection(label.coordinates) ?? [0, 0];
              const x = position[0] * view.zoom + view.x;
              const y = position[1] * view.zoom + view.y;
              return (
                <text
                  key={label.name}
                  x={x}
                  y={y}
                  className={label.className}
                  transform={
                    label.rotate
                      ? `rotate(${label.rotate} ${x} ${y})`
                      : undefined
                  }
                >
                  {label.name}
                </text>
              );
            })}
          </g>
          <g aria-hidden="true" className="atlas-place-halos">
            {renderedPoints
              .filter((point) => point.groupId === selectedGroup)
              .map((point) => (
                <circle
                  key={point.id}
                  cx={point.x}
                  cy={point.y}
                  r={(point.id === selectedPoint ? 18 : 9) / layout.scale}
                  fill={COLORS[point.groupId] ?? "#748463"}
                  opacity={point.id === selectedPoint ? 0.1 : 0.04}
                />
              ))}
          </g>
          {[...renderedPoints]
            .sort(
              (a, b) =>
                Number(a.id === selectedPoint) * 2 +
                Number(a.groupId === selectedGroup) -
                (Number(b.id === selectedPoint) * 2 +
                  Number(b.groupId === selectedGroup)),
            )
            .map((point) => {
              const active = point.id === selectedPoint;
              const inGroup = point.groupId === selectedGroup || selectedGroup === "all";
              const dimmed = highlighted !== null && !highlighted.has(point.id) && !active;
              const color = COLORS[point.groupId] ?? "#748463";
              const label = labels.get(point.id);
              return (
                <g
                  key={point.id}
                  className={`atlas-place${active ? " atlas-place--active" : ""}${inGroup ? " atlas-place--in-group" : ""}${dimmed ? " atlas-place--dimmed" : ""}`}
                  style={{ color }}
                  role="button"
                  tabIndex={point.id === markerTabStop ? 0 : -1}
                  ref={(node) => {
                    if (node) markerRefs.current.set(point.id, node);
                    else markerRefs.current.delete(point.id);
                  }}
                  onFocus={() => setFocusedPointId(point.id)}
                  aria-label={`Explore ${point.displayName}, ${point.readingName && point.readingName !== point.displayName ? `${point.readingName}, ` : ''}${point.nativeName}`}
                  aria-pressed={active}
                  onClick={(event) => {
                    const matrix = svgRef.current?.getScreenCTM();
                    const isLabel = (event.target as Element).closest('.atlas-place-label');
                    if (!event.detail || isLabel || !matrix) return onSelectPoint(point.id);
                    const position = new DOMPoint(event.clientX, event.clientY).matrixTransform(matrix.inverse());
                    const selectedId = nearestAtlasMarker(renderedPoints, position.x, position.y, point.id);
                    markerRefs.current.get(selectedId)?.focus({ preventScroll: true });
                    onSelectPoint(selectedId);
                  }}
                  onKeyDown={(event) => selectWithKeyboard(event, point.id)}
                >
                  <title>{`${point.fullName} · ${point.nativeName}`}</title>
                  <circle
                    className="atlas-place-hit"
                    cx={point.x}
                    cy={point.y}
                    r={14 / layout.scale}
                  />
                  <circle
                    className="atlas-place-focus"
                    cx={point.x}
                    cy={point.y}
                    r={15 / layout.scale}
                  />
                  {active && (
                    <circle
                      cx={point.x}
                      cy={point.y}
                      r={11 / layout.scale}
                      fill="none"
                      stroke={color}
                      strokeWidth={1}
                      opacity={0.55}
                    />
                  )}
                  <circle
                    className="atlas-place-dot"
                    cx={point.x}
                    cy={point.y}
                    r={
                      (active ? 5.5 : inGroup ? 3.8 : 3) / layout.scale
                    }
                    fill={color}
                    opacity={inGroup || active ? 1 : 0.6}
                  />
                  {label && (
                    <g className="atlas-place-label">
                      {active && (
                        <rect
                          x={label.x}
                          y={label.y}
                          width={label.width}
                          height={label.height}
                          rx={4}
                          className="atlas-place-label-bg"
                        />
                      )}
                      <text
                        x={label.x + (active ? 9.5 / layout.scale : 0)}
                        y={label.y + label.height / 2 - (active && point.readingName && point.readingName !== point.displayName ? 7 / layout.scale : 0)}
                        style={{
                          fontSize:
                            (active || inGroup ? 12 : 10) / layout.scale,
                        }}
                        dominantBaseline="central"
                        fill={active ? color : undefined}
                      >
                        {point.displayName}
                        {active && point.readingName && point.readingName !== point.displayName && <tspan
                          x={label.x + 9.5 / layout.scale}
                          dy={15 / layout.scale}
                          style={{ fontSize: 10 / layout.scale, fontWeight: 400 }}
                        >{point.readingName}</tspan>}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
        </g>
      </svg>
      <div className="atlas-north" aria-hidden="true">
        <span>N</span>
        <svg width="12" height="30" viewBox="0 0 12 30">
          <path d="M6 1 2 11 6 8 10 11Z" fill="currentColor" />
          <path d="M6 7V29" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>
      <div className="atlas-map-controls" aria-label="Map controls">
        <button
          type="button"
          aria-label="Reset map view"
          title="Reset map view"
          onClick={() => setView(initialView)}
        >
          <svg viewBox="0 0 20 20" aria-hidden="true">
            <path d="M5 6a6 6 0 1 1-1 7M5 2v4H1" />
          </svg>
        </button>
      </div>
      <div className="atlas-map-footer">
        <span className="atlas-map-key">
          <span aria-hidden="true" />
          Locality anchors · not language boundaries
        </span>
        <a
          href="https://www.naturalearthdata.com/"
          target="_blank"
          rel="noreferrer"
        >
          Map: Natural Earth
        </a>
      </div>
    </div>
  );
}
