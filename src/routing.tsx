import { legacyMinPlaces } from "./data/language-names";
import { findAtlasLocality, atlasLocalityPath, atlasBranches } from "./data/atlas";
import { languages, mapPoints } from "./data/languages";
import type { Language, MapPoint } from "./data/languages";

export const groupPath = (languageId: string) =>
  `/${encodeURIComponent(languageId)}`;
export const subgroupPath = (languageId: string, subgroupId: string) =>
  `${groupPath(languageId)}/${encodeURIComponent(subgroupId)}`;
export const varietyPath = (
  point: Pick<MapPoint, "id" | "groupId" | "subgroupId">,
) =>
  findAtlasLocality(point.id) ? atlasLocalityPath(findAtlasLocality(point.id)!) : `${subgroupPath(point.groupId, point.subgroupId)}/${encodeURIComponent(point.id)}`;

export type ReferenceRoute = {
  level: "group" | "subgroup" | "variety";
  language: Language;
  subgroup?: Language["subgroups"][number];
  point?: MapPoint;
};

/** A URL must describe a real path through the taxonomy, not just a known city. */
export function resolveReferenceRoute(params: {
  languageId?: string;
  subgroupId?: string;
  varietyId?: string;
}): ReferenceRoute | null {
  const language = languages.find((item) => item.id === params.languageId);
  if (!language || (!params.subgroupId && params.varietyId)) return null;
  if (!params.subgroupId) return { level: "group", language };
  const catalogBranch = atlasBranches.find(item => item.groupId === language.id && item.id === params.subgroupId);
  const subgroup = language.subgroups.find(item => item.id === params.subgroupId) ??
    (catalogBranch ? { ...catalogBranch, description: "", places: [] } : undefined);
  if (!subgroup) return null;
  if (!params.varietyId) return { level: "subgroup", language, subgroup };
  const point = mapPoints.find(
    (item) =>
      item.id === params.varietyId &&
      item.groupId === language.id &&
      (item.subgroupId === subgroup.id || findAtlasLocality(item.id)?.branchId === subgroup.id),
  );
  if (!point) return null;
  return { level: "variety", language, subgroup, point };
}

/** Preserve old map selections without restoring the retired directory interface. */
export function legacyMinQueryTarget(search: string): string | null {
  const params = new URLSearchParams(search);
  const requested = params.get("place");
  const place = requested ? findAtlasLocality(legacyMinPlaces[requested] ?? requested) : undefined;
  const branch = atlasBranches.find(b => b.groupId === "min" && b.id === params.get("branch"));
  const target = place?.groupId === "min" ? atlasLocalityPath(place) : branch ? `/min/${branch.id}` : null;
  if (!target) return null;
  params.delete("place");
  params.delete("branch");
  return target + (params.size ? `?${params}` : "");
}
