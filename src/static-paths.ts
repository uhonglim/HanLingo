import { languages, mapPoints } from './data/languages';
import { availableSections } from './data/learning';
import { legacyMinPlaces } from './data/language-names';
import { groupPath, varietyPath } from './routing';
import { atlasBranches, atlasClusters, atlasLocalities, atlasClusterPath, atlasLocalityPath } from './data/atlas';
export function publicPaths() {
  return [...new Set([
    '/', '/compare', '/romanization', '/written-chinese', '/about',
    ...languages.map(group=>groupPath(group.id)),
    ...atlasBranches.map(b=>`/${b.groupId}/${b.id}`),
    ...atlasClusters.map(atlasClusterPath), ...atlasLocalities.map(atlasLocalityPath),
    ...mapPoints.flatMap(point=>availableSections(point).map(section=>`${varietyPath(point)}/${section}`)),
  ])];
}
export function staticPaths() {
  const oldPaths=mapPoints.flatMap(p=>{const base=`/${p.groupId}/${p.subgroupId}/${p.id}`; return [base,...availableSections(p).map(s=>`${base}/${s}`)];});
  return [...new Set([
    ...publicPaths(), ...oldPaths, '/languages',
    ...[...publicPaths(),...oldPaths].filter(path=>languages.some(g=>path===`/${g.id}`||path.startsWith(`/${g.id}/`))).map(path=>`/languages${path}`),
    ...Object.keys(legacyMinPlaces).map(id=>`/min/southern-min/${id}`),
  ])];
}
