import { availableSections, learningSections } from "./data/learning";
import { siteTerms } from "./data/site-terms";
import {
  groupPath,
  resolveReferenceRoute,
  subgroupPath,
  varietyPath,
} from "./routing";
import { placeLabel } from "./data/language-names";

export type Breadcrumb = { label: string; path: string };
const pages: Record<string, string> = {
  "/": "Han languages",
  "/languages": "Han languages",
  "/compare": "Compare",
  "/romanization": "Romanization",
  "/written-chinese": siteTerms.writtenChinese,
  "/about": siteTerms.about,
};
/** Derive navigation from validated taxonomy, never from arbitrary URL segments. */
export function getBreadcrumbs(pathname: string): Breadcrumb[] {
  const path = pathname.replace(/\/$/, "") || "/";
  if (pages[path]) return [{ label: pages[path], path }];
  const parts = path.split("/").filter(Boolean);
  if (parts.length > 4) return [{ label: "Page not found", path }];
  const route = resolveReferenceRoute({
    languageId: parts[0],
    subgroupId: parts[1],
    varietyId: parts[2],
  });
  if (
    !route ||
    (parts[3] &&
      (!route.point ||
        !availableSections(route.point).some(
          (section) => section === parts[3],
        )))
  ) {
    return [
      { label: siteTerms.home, path: "/" },
      { label: "Page not found", path },
    ];
  }
  const crumbs = [
    { label: siteTerms.home, path: "/" },
    { label: route.language.name, path: groupPath(route.language.id) },
  ];
  if (route.subgroup)
    crumbs.push({
      label: route.subgroup.name,
      path: subgroupPath(route.language.id, route.subgroup.id),
    });
  if (route.point)
    crumbs.push({
      label: placeLabel(route.point),
      path: varietyPath(route.point),
    });
  if (parts[3])
    crumbs.push({
      label: learningSections[parts[3] as keyof typeof learningSections],
      path,
    });
  return crumbs;
}
