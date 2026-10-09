import { atlasMandarinClusters, atlasMandarinLocalities } from './mandarin';
import { atlasMinYueClusters, atlasMinYueLocalities } from './min-yue';
import { atlasWuHakkaClusters, atlasWuHakkaLocalities } from './wu-hakka';
export type { AtlasCluster, AtlasLocality, AtlasSource } from './types';
export const atlasClusters = [...atlasMandarinClusters, ...atlasMinYueClusters, ...atlasWuHakkaClusters];
export const atlasLocalities = [...atlasMandarinLocalities, ...atlasMinYueLocalities, ...atlasWuHakkaLocalities];
export const atlasBranches = [...new Map(atlasClusters.map(c => [`${c.groupId}/${c.branchId}`, {
  id: c.branchId, groupId: c.groupId, name: c.branchName, nativeName: c.branchNativeName,
}])).values()];
export const findAtlasLocality = (id: string) => atlasLocalities.find(p => p.id === id);
export const findAtlasCluster = (groupId: string, branchId: string, id: string) => atlasClusters.find(c => c.groupId === groupId && c.branchId === branchId && c.id === id);
export const atlasClusterPath = (c: {groupId: string; branchId: string; id: string}) => `/${c.groupId}/${c.branchId}/${c.id}`;
export const atlasLocalityPath = (p: {groupId: string; branchId: string; clusterId: string; id: string}) => `/${p.groupId}/${p.branchId}/${p.clusterId}/${p.id}`;
