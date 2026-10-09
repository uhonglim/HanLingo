import type { Language, LanguageId, MapPoint } from '../languages';
import type { EncyclopediaEntry } from '../encyclopedia';
import type { BranchLearning } from '../learning/types';
import type { GalleryPhoto } from '../galleries/types';
export type ExpandedBranch = Language['subgroups'][number] & { groupId: LanguageId; article: EncyclopediaEntry };
export type ExpandedPlace = {
  point: MapPoint;
  article: EncyclopediaEntry;
  words: BranchLearning['words'];
  soundNotes: BranchLearning['soundNotes'];
  culture: BranchLearning['culture'];
  resources: BranchLearning['resources'];
  photos: GalleryPhoto[];
};
export type AtlasExpansion = { branches: ExpandedBranch[]; places: ExpandedPlace[] };
