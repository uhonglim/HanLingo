import {
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { KeyboardEvent, PointerEvent } from "react";
import { geoGraticule, geoMercator, geoPath } from "d3-geo";
import { merge, mesh } from "topojson-client";
import type {
  GeometryCollection,
  MultiPolygon,
  Polygon,
  Topology,
} from "topojson-specification";
import world from "../data/east-asia-50m.json";
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
};

type View = { x: number; y: number; zoom: number };
type Label = { x: number; y: number; width: number; height: number };

const WIDTH = 800;
const HEIGHT = 640;
const COLORS: Record<string, string> = {
  mandarin: "#b77938",
  min: "#cf593c",
  yue: "#748463",
  hakka: "#92769b",
  wu: "#588785",
};
const DEFAULT_VIEW: View = { x: 0, y: 0, zoom: 1 };
const topology = world as unknown as Topology<{
  countries: GeometryCollection;
}>;
const projection = geoMercator()
  .center([114, 31])
  .scale(1390)
  .translate([WIDTH / 2, HEIGHT / 2]);
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
        [95, 10],
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
}: AtlasMapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const drag = useRef<{
    pointerId: number;
    clientX: number;
    clientY: number;
    viewX: number;
    viewY: number;
  } | null>(null);
  const [view, setView] = useState<View>(DEFAULT_VIEW);
  const [dragging, setDragging] = useState(false);
  const [layout, setLayout] = useState<{ scale: number; reserved: Label[] }>({
    scale: 1,
    reserved: [],
  });
  const id = useId().replace(/:/g, "");
  const clipId = `atlas-clip-${id}`;

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
      const matrix = svg?.getScreenCTM();
      if (!matrix) return;
      setLayout({
        scale: matrix.a,
        reserved: overlays.map((element) => {
          const rect = element.getBoundingClientRect();
          return {
            x: (rect.left - matrix.e) / matrix.a - 6,
            y: (rect.top - matrix.f) / matrix.d - 6,
            width: rect.width / matrix.a + 12,
            height: rect.height / matrix.d + 12,
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

  useEffect(() => {
    const point = points.find((item) => item.id === selectedPoint);
    if (!point) return;
    const projected = projection(point.coordinates);
    if (!projected) return;
    setView((previous) => {
      const x = projected[0] * previous.zoom + previous.x;
      const y = projected[1] * previous.zoom + previous.y;
      if (x > 65 && x < WIDTH - 100 && y > 90 && y < HEIGHT - 100)
        return previous;
      return {
        ...previous,
        x: WIDTH * 0.56 - projected[0] * previous.zoom,
        y: HEIGHT * 0.48 - projected[1] * previous.zoom,
      };
    });
  }, [selectedPoint, selectedGroup, points]);

  const projectedPoints = useMemo(
    () =>
      points.map((point) => {
        const position = projection(point.coordinates) ?? [0, 0];
        return {
          ...point,
          x: position[0] * view.zoom + view.x,
          y: position[1] * view.zoom + view.y,
        };
      }),
    [points, view],
  );

  const labels = useMemo(() => {
    const placed: Label[] = [...layout.reserved];
    const result = new Map<string, Label>();
    const sorted = [...projectedPoints].sort((a, b) => {
      const priority = (p: MapPoint) =>
        p.id === selectedPoint ? 3 : p.groupId === selectedGroup ? 2 : 1;
      return priority(b) - priority(a);
    });
    for (const point of sorted) {
      if (
        point.x < 12 ||
        point.x > WIDTH - 12 ||
        point.y < 45 ||
        point.y > HEIGHT - 52
      )
        continue;
      const active = point.id === selectedPoint;
      if (
        !active &&
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
        (Math.max(40, point.name.length * (active ? 7.2 : 6.4)) +
          (active ? 19 : 0)) /
        layout.scale;
      const height = (active ? 26 : 19) / layout.scale;
      const gap = 9 / layout.scale;
      const candidates: Label[] = [
        { x: point.x + gap, y: point.y - height / 2, width, height },
        { x: point.x - width - gap, y: point.y - height / 2, width, height },
        { x: point.x - width / 2, y: point.y - height - gap, width, height },
        { x: point.x - width / 2, y: point.y + gap, width, height },
      ];
      const label = candidates.find(
        (candidate) =>
          candidate.x >= 8 &&
          candidate.x + width < WIDTH - 8 &&
          !placed.some((other) => overlaps(candidate, other)) &&
          !projectedPoints.some(
            (other) =>
              other.id !== point.id &&
              other.x >= candidate.x - 5 &&
              other.x <= candidate.x + width + 5 &&
              other.y >= candidate.y - 5 &&
              other.y <= candidate.y + height + 5,
          ),
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
  }, [projectedPoints, selectedGroup, selectedPoint, layout]);

  function zoom(factor: number) {
    setView((previous) => {
      const nextZoom = Math.max(0.8, Math.min(3.2, previous.zoom * factor));
      const ratio = nextZoom / previous.zoom;
      return {
        zoom: nextZoom,
        x: WIDTH / 2 + (previous.x - WIDTH / 2) * ratio,
        y: HEIGHT / 2 + (previous.y - HEIGHT / 2) * ratio,
      };
    });
  }

  function startDrag(event: PointerEvent<SVGSVGElement>) {
    if (event.button !== 0) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = {
      pointerId: event.pointerId,
      clientX: event.clientX,
      clientY: event.clientY,
      viewX: view.x,
      viewY: view.y,
    };
    setDragging(true);
  }

  function moveDrag(event: PointerEvent<SVGSVGElement>) {
    if (!drag.current || !svgRef.current) return;
    const bounds = svgRef.current.getBoundingClientRect();
    const ratio = Math.max(WIDTH / bounds.width, HEIGHT / bounds.height);
    const nextX =
      drag.current.viewX + (event.clientX - drag.current.clientX) * ratio;
    const nextY =
      drag.current.viewY + (event.clientY - drag.current.clientY) * ratio;
    setView((previous) => ({ ...previous, x: nextX, y: nextY }));
  }

  function endDrag() {
    drag.current = null;
    setDragging(false);
  }

  function selectWithKeyboard(
    event: KeyboardEvent<SVGGElement>,
    pointId: string,
  ) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onSelectPoint(pointId);
    }
  }

  return (
    <div
      className={`atlas-map${compact ? " atlas-map--compact" : ""}${dragging ? " atlas-map--dragging" : ""}`}
    >
      <span className="atlas-map-hint">
        <span aria-hidden="true">↔</span> Drag to explore
      </span>
      <svg
        ref={svgRef}
        className="atlas-map-canvas"
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        aria-label="Interactive map of selected Han language varieties. Select a city to explore its language."
        onPointerDown={startDrag}
        onPointerMove={moveDrag}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onLostPointerCapture={endDrag}
      >
        <defs>
          <clipPath id={clipId}>
            <rect width={WIDTH} height={HEIGHT} />
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
            {projectedPoints
              .filter((point) => point.groupId === selectedGroup)
              .map((point) => (
                <circle
                  key={point.id}
                  cx={point.x}
                  cy={point.y}
                  r={point.id === selectedPoint ? 43 : 29}
                  fill={COLORS[point.groupId] ?? "#748463"}
                  opacity={point.id === selectedPoint ? 0.075 : 0.035}
                />
              ))}
          </g>
          {[...projectedPoints]
            .sort(
              (a, b) =>
                Number(a.id === selectedPoint) * 2 +
                Number(a.groupId === selectedGroup) -
                (Number(b.id === selectedPoint) * 2 +
                  Number(b.groupId === selectedGroup)),
            )
            .map((point) => {
              const active = point.id === selectedPoint;
              const inGroup = point.groupId === selectedGroup;
              const color = COLORS[point.groupId] ?? "#748463";
              const label = labels.get(point.id);
              return (
                <g
                  key={point.id}
                  className={`atlas-place${active ? " atlas-place--active" : ""}${inGroup ? " atlas-place--in-group" : ""}`}
                  style={{ color }}
                  role="button"
                  tabIndex={
                    point.x > 0 &&
                    point.x < WIDTH &&
                    point.y > 0 &&
                    point.y < HEIGHT
                      ? 0
                      : -1
                  }
                  aria-label={`Explore ${point.name}, ${point.nativeName}`}
                  aria-pressed={active}
                  onPointerDown={(event) => event.stopPropagation()}
                  onClick={() => onSelectPoint(point.id)}
                  onKeyDown={(event) => selectWithKeyboard(event, point.id)}
                >
                  <title>
                    {point.name} · {point.nativeName}
                  </title>
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
                    r={15}
                  />
                  {active && (
                    <circle
                      cx={point.x}
                      cy={point.y}
                      r={11}
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
                      (active ? 5.5 : inGroup ? 4.5 : 3.5) /
                      Math.sqrt(layout.scale)
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
                        y={label.y + label.height / 2}
                        style={{
                          fontSize:
                            (active || inGroup ? 12 : 10) / layout.scale,
                        }}
                        dominantBaseline="central"
                        fill={active ? color : undefined}
                      >
                        {point.name}
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
          aria-label="Zoom in"
          title="Zoom in"
          onClick={() => zoom(1.3)}
          disabled={view.zoom >= 3.2}
        >
          <svg viewBox="0 0 20 20" aria-hidden="true">
            <path d="M10 4v12M4 10h12" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Zoom out"
          title="Zoom out"
          onClick={() => zoom(1 / 1.3)}
          disabled={view.zoom <= 0.8}
        >
          <svg viewBox="0 0 20 20" aria-hidden="true">
            <path d="M4 10h12" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Reset map view"
          title="Reset map view"
          onClick={() => setView(DEFAULT_VIEW)}
        >
          <svg viewBox="0 0 20 20" aria-hidden="true">
            <path d="M5 6a6 6 0 1 1-1 7M5 2v4H1" />
          </svg>
        </button>
      </div>
      <div className="atlas-map-footer">
        <span className="atlas-map-key">
          <span aria-hidden="true" />
          Selected places · not language boundaries
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
