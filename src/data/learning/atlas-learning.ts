import type { BranchLearning } from './types';
import { huangyanLearningPack } from './atlas-huangyan';
import { publishedAtlasLexibankPacks as atlasLexibankPacks } from './atlas-lexibank-published';

export const atlasLearningPacks: BranchLearning[] = [huangyanLearningPack, ...atlasLexibankPacks];
