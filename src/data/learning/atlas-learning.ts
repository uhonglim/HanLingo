import type { BranchLearning } from './types';
import { huangyanLearningPack } from './atlas-huangyan';
import { atlasLexibankPacks } from './atlas-lexibank';

export const atlasLearningPacks: BranchLearning[] = [huangyanLearningPack, ...atlasLexibankPacks];
