import { groupPath, resolveReferenceRoute, subgroupPath, varietyPath } from './routing';

export type Breadcrumb = { label: string; path: string };
const pages: Record<string, string> = {
  '/languages': 'Languages', '/compare': 'Compare', '/romanization': 'Romanization',
  '/written-chinese': 'Written Chinese', '/about': 'About',
};
const xiamenSections: Record<string, string> = {
  words: 'Words', culture: 'Culture', sounds: 'Sounds', practice: 'Practice',
};

/** Derive navigation from validated taxonomy, never from arbitrary URL segments. */
export function getBreadcrumbs(pathname: string): Breadcrumb[] {
  const path = pathname.replace(/\/$/, '') || '/';
  if (pages[path]) return [{ label: pages[path], path }];
  const parts = path.split('/').filter(Boolean);
  if (parts[0] !== 'languages' || parts.length > 5) return [{ label: 'Page not found', path }];
  const route = resolveReferenceRoute({ languageId: parts[1], subgroupId: parts[2], varietyId: parts[3] });
  if (!route || (parts[4] && (route.point?.id !== 'xiamen' || !xiamenSections[parts[4]]))) {
    return [{ label: 'Languages', path: '/languages' }, { label: 'Page not found', path }];
  }
  const crumbs = [{ label: 'Languages', path: '/languages' }, { label: route.language.name, path: groupPath(route.language.id) }];
  if (route.subgroup) crumbs.push({ label: route.subgroup.name, path: subgroupPath(route.language.id, route.subgroup.id) });
  if (route.point) crumbs.push({ label: route.point.name, path: varietyPath(route.point) });
  if (parts[4]) crumbs.push({ label: xiamenSections[parts[4]], path });
  return crumbs;
}
