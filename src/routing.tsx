import { languages, mapPoints } from "./data/languages";
import type { Language, MapPoint } from "./data/languages";

export const groupPath = (languageId: string) =>
  `/${encodeURIComponent(languageId)}`;
export const subgroupPath = (languageId: string, subgroupId: string) =>
  `${groupPath(languageId)}/${encodeURIComponent(subgroupId)}`;
export const varietyPath = (
  point: Pick<MapPoint, "id" | "groupId" | "subgroupId">,
) =>
  `${subgroupPath(point.groupId, point.subgroupId)}/${encodeURIComponent(point.id)}`;

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
  const subgroup = language.subgroups.find(
    (item) => item.id === params.subgroupId,
  );
  if (!subgroup) return null;
  if (!params.varietyId) return { level: "subgroup", language, subgroup };
  const point = mapPoints.find(
    (item) =>
      item.id === params.varietyId &&
      item.groupId === language.id &&
      item.subgroupId === subgroup.id,
  );
  if (!point) return null;
  return { level: "variety", language, subgroup, point };
}
