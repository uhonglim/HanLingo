import { atlasLaiyuanContactClusters, atlasLaiyuanContactLocalities } from "./laiyuan-contact";
import { atlasWeiziluLocalities } from "./weizilu";
import { atlasQiyangLocalities } from "./qiyang-xiang";
import { atlasLexicalStudyClusters, atlasLexicalStudyLocalities } from "./lexical-study-localities";
import { atlasYunlouGanLocalities } from "./yunlou-gan";
import { atlasOverseasYueClusters, atlasOverseasYueLocalities } from "./overseas-yue";
import { atlasHuiWuyuanLocalities } from "./hui-wuyuan-localities";
import { atlasJiangyongChengguanLocalities } from "./jiangyong-chengguan";
import { atlasGanHuaiyueLocalities } from "./gan-huaiyue-localities";
import { atlasGanToneClusters, atlasGanToneLocalities } from "./gan-tone-localities";
import { atlasXiangReadingLocalities } from "./xiang-reading-localities";
import { atlasOtherSiniticClusters, atlasOtherSiniticLocalities } from "./other-sinitic";
import { atlasGanXiangClusters, atlasGanXiangLocalities } from "./gan-xiang";
import { atlasOverseasMinClusters, atlasOverseasMinLocalities } from './min-overseas';
import { atlasCountyClusters, atlasCountyLocalities } from './county-expansion';
import { placeLabel, placeNameAliases } from "../language-names";
import { atlasMandarinClusters, atlasMandarinLocalities } from './mandarin';
import { atlasMinYueClusters, atlasMinYueLocalities } from './min-yue';
import { atlasWuHakkaClusters, atlasWuHakkaLocalities } from './wu-hakka';
export type { AtlasCluster, AtlasLocality, AtlasSource } from './types';
export const atlasClusters = [...atlasMandarinClusters, ...atlasMinYueClusters, ...atlasWuHakkaClusters, ...atlasOverseasMinClusters, ...atlasCountyClusters, ...atlasGanXiangClusters, ...atlasOtherSiniticClusters, ...atlasGanToneClusters, ...atlasOverseasYueClusters, ...atlasLexicalStudyClusters, ...atlasLaiyuanContactClusters];
export const atlasLocalities = [...atlasMandarinLocalities, ...atlasMinYueLocalities, ...atlasWuHakkaLocalities, ...atlasOverseasMinLocalities, ...atlasCountyLocalities, ...atlasGanXiangLocalities, ...atlasOtherSiniticLocalities, ...atlasGanToneLocalities, ...atlasXiangReadingLocalities, ...atlasJiangyongChengguanLocalities, ...atlasGanHuaiyueLocalities, ...atlasHuiWuyuanLocalities, ...atlasOverseasYueLocalities, ...atlasLexicalStudyLocalities, ...atlasYunlouGanLocalities, ...atlasWeiziluLocalities, ...atlasQiyangLocalities, ...atlasLaiyuanContactLocalities].map((point) => ({
  ...point,
  name: placeLabel(point),
  aliases: [...new Set([...placeNameAliases(point), ...(point.aliases ?? [])])],
}));
export const atlasBranches = [...new Map(atlasClusters.map(c => [`${c.groupId}/${c.branchId}`, {
  id: c.branchId, groupId: c.groupId, name: c.branchName, nativeName: c.branchNativeName,
}])).values()];
const localityById = new Map(atlasLocalities.map(place => [place.id, place]));
const clusterByPath = new Map(atlasClusters.map(cluster => [`${cluster.groupId}/${cluster.branchId}/${cluster.id}`, cluster]));
export const findAtlasLocality = (id: string) => localityById.get(id);
export const findAtlasCluster = (groupId: string, branchId: string, id: string) => clusterByPath.get(`${groupId}/${branchId}/${id}`);
export const atlasClusterPath = (c: {groupId: string; branchId: string; id: string}) => `/${c.groupId}/${c.branchId}/${c.id}`;
export const atlasLocalityPath = (p: {groupId: string; branchId: string; clusterId: string; id: string}) => `/${p.groupId}/${p.branchId}/${p.clusterId}/${p.id}`;
