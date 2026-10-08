// Keep the Natural Earth 1:50m detail used by this regional atlas, without
// shipping the geometry of the rest of the world. Coordinates are unmodified.
import { readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const source = JSON.parse(
  readFileSync(require.resolve("world-atlas/countries-50m.json"), "utf8"),
);
const ids = new Set([
  "156",
  "158",
  "392",
  "408",
  "410",
  "704",
  "418",
  "104",
  "764",
  "116",
  "608",
  "458",
  "702",
  "360",
  "356",
  "064",
  "524",
  "050",
  "496",
  "643",
]);
const geometries = source.objects.countries.geometries.filter((country) =>
  ids.has(country.id),
);
const arcIds = new Map();
const arcs = [];
function remap(items) {
  return items.map((item) => {
    if (Array.isArray(item)) return remap(item);
    const oldId = item < 0 ? ~item : item;
    if (!arcIds.has(oldId)) {
      arcIds.set(oldId, arcs.length);
      arcs.push(source.arcs[oldId]);
    }
    const newId = arcIds.get(oldId);
    return item < 0 ? ~newId : newId;
  });
}
const countries = geometries.map((country) => ({
  ...country,
  arcs: remap(country.arcs),
}));
writeFileSync(
  new URL("../src/data/east-asia-50m.json", import.meta.url),
  JSON.stringify({
    type: "Topology",
    transform: source.transform,
    objects: {
      countries: { type: "GeometryCollection", geometries: countries },
    },
    arcs,
  }) + "\n",
);
