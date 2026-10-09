import { describe, expect, it } from 'vitest';
import { huiWuyuanLearning } from './hui-wuyuan';
import { atlasHuiWuyuanLocalities } from '../atlas/hui-wuyuan-localities';
import ledger from '../../../docs/hui-wuyuan-provenance.json';
import { convertIpa } from '../romanization-method';

const pack = huiWuyuanLearning[0];
describe('Youshan village documentary readings', () => {
  it('retains source character identities, merged-cell ownership and pitch contours', () => {
    expect(pack.words).toHaveLength(19);
    expect(new Set(pack.words.map(word => word.id)).size).toBe(19);
    for (const row of ledger.rows) {
      const word = pack.words.find(word => word.id === row.id)!;
      expect(word.han).toBe(row.han);
      expect(word.ipa).toBe(`[${row.sourceReading}]`);
      expect(word.toneNotation).toBe('pitch-contour');
      expect(word.learningKind).toBe('character-reading');
      expect(word.english).toBe(`Character ${row.han}`);
      expect(word.registerLabel).toContain('2015 survey · one older speaker');
      expect(word.source.url).toContain(`#page=${row.pdfPage}`);
      expect(convertIpa(word.ipa, word.toneNotation)[0].spelling).not.toContain('·T');
      if (row.mergedHeadwords) expect(word.note).toContain(row.mergedHeadwords);
    }
    expect(pack.words.find(word => word.han === '脳')?.ipa).toBe('[la31]');
    expect(pack.words.find(word => word.han === '女')?.ipa).toBe('[ny31]');
    expect(pack.words.find(word => word.han === '呂')?.ipa).toBe('[li31]');
    expect(pack.words.find(word => word.han === '好')?.note).toContain('verb 好');
    expect(pack.words.some(word => ['宝', '寶', '飽'].includes(word.han))).toBe(false);
  });
  it('keeps the exact village geography and all content at the same scope', () => {
    expect(atlasHuiWuyuanLocalities).toHaveLength(1);
    const point = atlasHuiWuyuanLocalities[0];
    expect(point.id).toBe('youshan-hui');
    expect([point.groupId, point.branchId, point.clusterId]).toEqual(['hui', 'qiwu', 'qimen-wuyuan']);
    expect(point.coordinates).toEqual([117.4235520, 29.2387878]);
    expect(point.geographySource?.url).toBe('https://www.openstreetmap.org/node/5134436407');
    expect(point.scope).toContain('administrative village');
    expect(pack.branchId).toBe(`${point.groupId}/${point.branchId}`);
    for (const item of [...pack.soundNotes, ...pack.culture, ...pack.resources]) {
      expect(item.localityIds).toEqual([point.id]);
    }
    expect(pack.words.every(word => word.localityId === point.id)).toBe(true);
    expect(pack.soundNotes).toHaveLength(2);
    expect(pack.culture).toHaveLength(2);
    expect(pack.resources).toHaveLength(3);
  });
});
