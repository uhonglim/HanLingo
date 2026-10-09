import { describe, expect, it } from 'vitest';
import { xiangComparativeLearning } from './xiang-comparative';
import { atlasXiangReadingLocalities } from '../atlas/xiang-reading-localities';
import { atlasGanXiangLocalities, atlasGanXiangClusters } from '../atlas/gan-xiang';
import ledger from '../../../docs/xiang-comparative-provenance.json';
import { convertIpa } from '../romanization-method';

const words = xiangComparativeLearning.flatMap(pack => pack.words);
const sourceLocalities = ledger.localities;
describe('Wu 2024 Xiang character comparisons', () => {
  it('preserves exact reviewed cells and category notation without creating lexical meanings', () => {
    expect(words).toHaveLength(238);
    expect(new Set(words.map(word => word.id)).size).toBe(238);
    const unsupported = new Set<string>();
    for (const record of ledger.records) {
      const loc = sourceLocalities[record.locality as keyof typeof sourceLocalities];
      const id = `wu2024-${loc.localityId}-t${record.table}-c${record.column}-a${record.alternative}`;
      const word = words.find(word => word.id === id);
      if (!loc.publish) { expect(word).toBeUndefined(); continue; }
      expect(word).toBeDefined();
      expect(word!.han).toBe(record.tableHeadword);
      expect(word!.english).toBe(`Character ${record.han}`);
      expect(word!.learningKind).toBe('character-reading');
      expect(word!.ipa).toBe(`[${record.sourceForm.replaceAll('h', 'ʰ').replaceAll('\u0342', '\u0303')}]`);
      expect(word!.toneNotation).toBe('source-category');
      expect(word!.registerLabel).toContain('settlement unspecified');
      expect(word!.registerLabel).toContain('Wu 2024 · character reading');
      expect(word!.source.url).toContain(`#page=${record.pdfPage}`);
      expect(word!.note).toContain(`Original notation: ${record.sourceForm}.`);
      try {
        const converted = convertIpa(word!.ipa, word!.toneNotation);
        expect(converted[0].spelling).toContain(`·T${record.toneCategory}`);
      } catch (error) { unsupported.add(String(error)); }
    }
    expect([...unsupported]).toEqual([]);
  });
  it('holds ambiguous source geography and reuses established county references', () => {
    expect(words.filter(word => word.localityId === 'xiang-county-431321')).toHaveLength(61);
    expect(words.filter(word => word.localityId === 'hengyang-xiang')).toHaveLength(58);
    expect(words.filter(word => word.localityId === 'xiang-county-431224')).toHaveLength(58);
    expect(words.filter(word => word.localityId === 'xiang-county-431223')).toHaveLength(61);
    expect(atlasXiangReadingLocalities.map(point => point.id)).toEqual(['hengyang-xiang']);
    expect(words.some(word => word.localityId === 'xiang-county-430421')).toBe(false);
    const places = [...atlasGanXiangLocalities, ...atlasXiangReadingLocalities];
    for (const pack of xiangComparativeLearning) for (const word of pack.words) {
      const place = places.find(place => place.id === word.localityId)!;
      expect(place).toBeDefined();
      expect(pack.branchId).toBe(`${place.groupId}/${place.branchId}`);
      expect(atlasGanXiangClusters.some(cluster => cluster.groupId === place.groupId && cluster.branchId === place.branchId && cluster.id === place.clusterId)).toBe(true);
    }
  });
  it('supplies scoped culture and source links without treating heritage sites as speaker locations', () => {
    for (const locality of Object.values(sourceLocalities).filter(loc => loc.publish)) {
      const pack = xiangComparativeLearning.find(pack => pack.branchId === locality.branchId)!;
      expect(pack.culture.filter(item => item.localityIds.includes(locality.localityId))).toHaveLength(2);
      expect(pack.resources.filter(item => item.localityIds.includes(locality.localityId))).toHaveLength(4);
      expect(pack.soundNotes.filter(item => item.localityIds.includes(locality.localityId))).toHaveLength(2);
    }
  });
  it('keeps substitutions out and applies only explicitly documented register labels', () => {
    expect(ledger.held).toHaveLength(19);
    const hengyang = words.filter(word => word.localityId === 'hengyang-xiang');
    expect(hengyang.some(word => word.han === '痔' || word.han === '枝')).toBe(false);
    const shuangfeng = words.filter(word => word.localityId === 'xiang-county-431321');
    expect(shuangfeng.filter(word => word.registerLabel?.includes('colloquial')).map(word => word.han)).toEqual(['澀', '蝨', '側']);
    expect(shuangfeng.some(word => word.registerLabel?.includes('literary'))).toBe(false);
    expect(hengyang.filter(word => word.han === '知').map(word => word.ipa)).toEqual(['[tsɿ1]', '[tɕi1]']);
    expect(words.filter(word => word.han === '差').every(word => word.note?.includes('參差: the second character only'))).toBe(true);
  });
});
