import { groupPath, resolveReferenceRoute, subgroupPath, varietyPath } from './routing';

export type Breadcrumb = { label: string; path: string };
const pages: Record<string, string> = {
  '/': 'Han languages', '/languages': 'Han languages', '/compare': 'Compare', '/romanization': 'Romanization',
  '/written-chinese': 'Written Chinese', '/about': 'About',
};
const xiamenSections: Record<string, string> = {
  words: 'Words', culture: 'Photos', sounds: 'IPA & tones', practice: 'Practice',
};

/** Derive navigation from validated taxonomy, never from arbitrary URL segments. */
export function getBreadcrumbs(pathname: string): Breadcrumb[] {
  const path = pathname.replace(/\/$/, '') || '/';
  if (pages[path]) return [{ label: pages[path], path }];
  const parts = path.split('/').filter(Boolean);
  if (parts.length > 4) return [{ label: 'Page not found', path }];
  const route = resolveReferenceRoute({ languageId: parts[0], subgroupId: parts[1], varietyId: parts[2] });
  if (!route || (parts[3] && (route.point?.id !== 'xiamen' || !xiamenSections[parts[3]]))) {
    return [{ label: 'Han', path: '/' }, { label: 'Page not found', path }];
  }
  const crumbs = [{ label: 'Han', path: '/' }, { label: route.language.name, path: groupPath(route.language.id) }];
  if (route.subgroup) crumbs.push({ label: route.subgroup.name, path: subgroupPath(route.language.id, route.subgroup.id) });
  if (route.point) crumbs.push({ label: route.point.name, path: varietyPath(route.point) });
  if (parts[3]) crumbs.push({ label: xiamenSections[parts[3]], path });
  return crumbs;
}
