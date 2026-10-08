import { languages, mapPoints } from './data/languages';
import { availableSections } from './data/learning';
import { legacyMinPlaces } from './data/language-names';
import { groupPath, subgroupPath, varietyPath } from './routing';

/** Real directory entry points let static hosts serve deep links with HTTP 200. */
export function publicPaths() {
  return [...new Set([
    '/', '/compare', '/romanization', '/written-chinese', '/about',
    ...languages.flatMap(group => [groupPath(group.id), ...group.subgroups.map(branch => subgroupPath(group.id, branch.id))]),
    ...mapPoints.flatMap(point => [varietyPath(point), ...availableSections(point).map(section => `${varietyPath(point)}/${section}`)]),
  ])];
}
export function staticPaths() {
  return [...new Set([
    ...publicPaths(),
    '/languages',
    ...publicPaths().filter(path => languages.some(group => path === `/${group.id}` || path.startsWith(`/${group.id}/`))).map(path => `/languages${path}`),
    ...Object.keys(legacyMinPlaces).map(id => `/min/southern-min/${id}`),
  ])];
}
