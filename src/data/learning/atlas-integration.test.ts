import { describe, expect, it } from 'vitest';
import { atlasLocalities, atlasLocalityPath } from '../atlas';
import { availableSections, getLocalLearning, spellingFor } from './index';
import { learningPlaces, findLearningPlace } from './places';
import { getBreadcrumbs } from '../../navigation';
import { resolveReferenceRoute } from '../../routing';
import { publicPaths } from '../../static-paths';
import { huangyanWords } from './atlas-huangyan';
import { atlasLexibankPacks } from './atlas-lexibank';
import { getLocalGallery } from '../galleries';
import { convertIpa } from '../romanization-method';
import { mergeLearningPacks } from './merge';

describe('atlas-wide learning integration', () => {
  it('exposes actual new lessons through every navigation layer', () => {
    const paths = new Set(publicPaths());
    for (const place of atlasLocalities) {
      const point = findLearningPlace(place.id)!;
      expect(point.id).toBe(place.id);
      expect(resolveReferenceRoute({languageId:place.groupId,subgroupId:place.branchId,varietyId:place.id})?.point?.id).toBe(place.id);
      for (const section of availableSections(point)) {
        const path = `${atlasLocalityPath(place)}/${section}`;
        expect(paths.has(path), path).toBe(true);
        expect(getBreadcrumbs(path).at(-1)?.label, path).not.toBe('Page not found');
      }
    }
  });
  it('does not substitute neighbouring words or invent practice for photo-only places', () => {
    const huangyan = getLocalLearning(findLearningPlace('huangyan')!);
    expect(huangyan.words).toHaveLength(32);
    expect(huangyan.words.every(word => word.registerLabel?.includes('Ningxi Town'))).toBe(true);
    for (const id of ['wenling', 'yueqing']) {
      const point = findLearningPlace(id)!;
      expect(getLocalGallery(id).length).toBeGreaterThanOrEqual(9);
      expect(getLocalLearning(point).words).toHaveLength(0);
      expect(availableSections(point)).toEqual(['culture']);
    }
    expect(getLocalGallery('huangyan')).toHaveLength(11);
  });
  it('keeps Huangyan source categories and legacy IPA ligatures distinct from pitch', () => {
    expect(spellingFor(huangyanWords.find(word => word.han === '出')!)).toBe('tshoo·T7');
    expect(spellingFor(huangyanWords.find(word => word.han === '敢')!)).toBe('kyaeng·T3');
    expect(spellingFor(huangyanWords.find(word => word.han === '佢')!)).toBe('gyae·T2');
    expect(convertIpa('[cʰɵ³]', 'source-category')[0].spelling).toBe('kyhoe·T3');
    expect(huangyanWords.find(word => word.han === '出')!.ipa).toBe('[ʦʰɔ⁷]');
  });
  it('keeps dated CLDF entries visible, source-linked and convertible', () => {
    const words = atlasLexibankPacks.flatMap(pack => pack.words);
    expect(words).toHaveLength(1120);
    expect(new Set(words.map(word => word.id)).size).toBe(words.length);
    for (const word of words) {
      expect(word.registerLabel).toContain('1950s survey · published 1964');
      expect(word.note).toContain('CLDF');
      expect(word.source.url).toMatch(/\/blob\/[a-f0-9]{40}\/cldf\/forms.csv#L\d+$/);
      expect(Boolean(spellingFor(word)), word.id).toBe(true);
    }
    expect(getLocalLearning(findLearningPlace('hefei')!).words).toHaveLength(200);
  });
  it('keeps all catalogue gaps measurable, including entries with no lessons', () => {
    expect(learningPlaces).toHaveLength(atlasLocalities.length);
    expect(learningPlaces.some(place => !availableSections(place).length)).toBe(true);
  });
  it('merges independent packs without losing readings, cultural notes or resources', () => {
    const one = atlasLexibankPacks[0];
    const extra = {...one, words:[], soundNotes:[], culture:[], resources:[{title:'Comparison',description:'Source-specific comparison',scope:'branch-comparison' as const,localityIds:[],kind:'Study' as const,url:'https://example.org/reference'}]};
    const packs = mergeLearningPacks([one, extra, one]);
    expect(packs).toHaveLength(1);
    expect(packs[0].words).toHaveLength(one.words.length);
    expect(packs[0].resources.some(item => item.scope === 'branch-comparison')).toBe(true);
  });
});
