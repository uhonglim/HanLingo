import { mandarinExpansion } from './mandarin';
import { yueExpansion } from './yue';
import { wuHakkaExpansion } from './wu-hakka';
import { minExpansion } from './min';
import type { BranchLearning } from '../learning/types';

const expansions = [mandarinExpansion, yueExpansion, wuHakkaExpansion, minExpansion];
export const expandedBranches = expansions.flatMap((entry) => entry.branches);
export const expandedPlaces = expansions.flatMap((entry) => entry.places);
export const expandedBranchArticles = Object.fromEntries(
  expandedBranches.map((branch) => [`${branch.groupId}/${branch.id}`, branch.article]),
);
export const expandedLocalityArticles = Object.fromEntries(
  expandedPlaces.map((place) => [place.point.id, place.article]),
);
export const expandedGalleries = Object.fromEntries(
  expandedPlaces.map((place) => [place.point.id, place.photos]),
);

/** Append locality evidence to its actual parent, including newly introduced branches. */
export function expandLearningPacks(existing: BranchLearning[]): BranchLearning[] {
  const packs = new Map(existing.map((pack) => [pack.branchId, {
    ...pack,
    words: [...pack.words], soundNotes: [...pack.soundNotes],
    culture: [...pack.culture], resources: [...pack.resources],
  }]));
  for (const place of expandedPlaces) {
    const branchId = `${place.point.groupId}/${place.point.subgroupId}`;
    const pack = packs.get(branchId) ?? { branchId, words: [], soundNotes: [], culture: [], resources: [] };
    pack.words.push(...place.words);
    pack.soundNotes.push(...place.soundNotes);
    pack.culture.push(...place.culture);
    pack.resources.push(...place.resources);
    packs.set(branchId, pack);
  }
  return [...packs.values()];
}
