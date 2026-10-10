import { placeDisplayName } from "./data/language-names";
import { findLearningPlace } from './data/learning/places';
import { availableSections, learningSections } from './data/learning';
import { siteTerms } from './data/site-terms';
import { languages, mapPoints } from './data/languages';
import { atlasBranches, atlasClusterPath, atlasLocalityPath, findAtlasCluster, findAtlasLocality } from './data/atlas';
export type Breadcrumb = { label: string; path: string };
const pages: Record<string,string> = {'/':'Han languages','/languages':'Han languages','/map':siteTerms.map,'/compare':'Compare','/romanization':'Romanization','/written-chinese':siteTerms.writtenChinese,'/about':siteTerms.about};
export function getBreadcrumbs(pathname: string): Breadcrumb[] {
  const path=pathname.replace(/\/+$/,'')||'/';
  if(pages[path]) return [{label:pages[path],path}];
  const [groupId,branchId,clusterId,localityId,chapter,...extra]=path.split('/').filter(Boolean);
  const missing=[{label:siteTerms.home,path:'/'},{label:'Page not found',path}];
  const group=languages.find(g=>g.id===groupId);
  if(!group||extra.length) return missing;
  const crumbs=[{label:siteTerms.home,path:'/'},{label:group.name,path:`/${group.id}`}];
  if(!branchId) return crumbs;
  const branch=atlasBranches.find(b=>b.groupId===groupId&&b.id===branchId);
  if(!branch) return missing;
  crumbs.push({label:branch.name,path:`/${groupId}/${branchId}`});
  if(!clusterId) return crumbs;
  // Old links are accepted only for a real former locality parent.
  const old=findAtlasLocality(clusterId);
  const oldPoint=mapPoints.find(p=>p.id===clusterId&&p.groupId===groupId&&p.subgroupId===branchId);
  if(old&&oldPoint&&!chapter) return getBreadcrumbs(atlasLocalityPath(old)+(localityId?`/${localityId}`:''));
  const cluster=findAtlasCluster(groupId,branchId,clusterId);
  if(!cluster) return missing;
  crumbs.push({label:cluster.name,path:atlasClusterPath(cluster)});
  if(!localityId) return crumbs;
  const point=findAtlasLocality(localityId);
  if(!point||point.groupId!==groupId||point.branchId!==branchId||point.clusterId!==clusterId) return missing;
  crumbs.push({label:placeDisplayName(point),path:atlasLocalityPath(point)});
  if(chapter) {
    const lesson=findLearningPlace(localityId);
    if(!lesson||!availableSections(lesson).some(s=>s===chapter)) return missing;
    crumbs.push({label:learningSections[chapter as keyof typeof learningSections],path});
  }
  return crumbs;
}
