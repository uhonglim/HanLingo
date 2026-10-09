import { describe, expect, it } from 'vitest';
import ledger from '../../../docs/gan-huaiyue-provenance.json';
import { ganHuaiyueLearning } from './gan-huaiyue';
import { atlasGanHuaiyueLocalities } from '../atlas/gan-huaiyue-localities';
import { atlasGanXiangClusters } from '../atlas/gan-xiang';
import { convertIpa } from '../romanization-method';

const pack = ganHuaiyueLearning[0];
const sup = (value: string) => value.replace(/[1-5]/g, digit => '¹²³⁴⁵'[Number(digit) - 1]);
describe('Xu 2022 Huai–Yue settlement readings', () => {
  it('retains every reviewed cell, pitch and source locator without creating word meanings', () => {
    expect(pack.words).toHaveLength(106);
    expect(new Set(pack.words.map(word => word.id)).size).toBe(106);
    for (const record of ledger.rows) {
      const loc = ledger.localities[record.proposedLocalitySlug as keyof typeof ledger.localities];
      const word = pack.words.find(word => word.id === record.id);
      if (!loc.publish) { expect(word).toBeUndefined(); continue; }
      expect(word).toBeDefined();
      expect(word!.han).toBe(record.han);
      expect(word!.english).toBe(`Character ${record.han}`);
      expect(word!.learningKind).toBe('character-reading');
      expect(word!.ipa).toBe(`[${record.sourceSegments.replaceAll('ә', 'ə')}${sup(record.pitchContour)}]`);
      expect(word!.toneNotation).toBe('pitch-contour');
      expect(word!.source.url).toContain(`#page=${record.pdfPage}`);
      expect(word!.note).toContain(record.sourceReading);
      expect(word!.registerLabel).toContain('collection date unspecified');
      expect(() => convertIpa(word!.ipa, word!.toneNotation)).not.toThrow();
    }
  });
  it('preserves register alternatives and unusual source contours exactly', () => {
    const forms = (slug: string, han: string) => pack.words.filter(word => word.localityId === `gan-${slug}` && word.han === han);
    expect(forms('dongzhi-yaodu', '头').map(word => word.ipa)).toEqual(['[tʰiəu²²⁴]', '[tʰəu²²⁴]']);
    expect(forms('dongzhi-yaodu', '头').map(word => word.reading)).toEqual(['Comparative character reading · colloquial', 'Comparative character reading · literary']);
    expect(forms('susong-erlang', '额').map(word => word.ipa)).toEqual(['[ŋiæ²⁴]', '[ŋiæʔ²⁴]']);
    expect(forms('susong-erlang', '刻')[0].ipa).toBe('[kʰiæʔ⁵]');
    expect(forms('qianshan-meicheng', '特')[0].ipa).toBe('[tʰɛ¹³]');
    expect(forms('qianshan-meicheng', '肋')[0].ipa).toBe('[liɛ⁴²]');
    expect(forms('qianshan-meicheng', '特')[0].note).toContain('特为');
    expect(forms('qianshan-meicheng', '肋')[0].note).toContain('肋条');
  });
  it('holds unresolved settlements instead of borrowing county coordinates', () => {
    expect(atlasGanHuaiyueLocalities).toHaveLength(9);
    expect(Object.values(ledger.localities).filter(loc => !loc.publish)).toHaveLength(2);
    expect(pack.words.some(word => ['gan-taihu-yanghe', 'gan-taihu-jinxi'].includes(word.localityId))).toBe(false);
    for (const place of atlasGanHuaiyueLocalities) {
      expect(place.clusterId).toBe('huaiyue-localities');
      expect(atlasGanXiangClusters.find(cluster => cluster.id === place.clusterId)?.kind).toBe('geographic');
      expect(place.geographySource!.url).toMatch(/^https:\/\/www.wikidata.org\/entity\/Q\d+$/);
      expect(place.scope).toContain('approximate town anchor');
      expect(place.referenceType).toBeUndefined();
      expect(pack.words.some(word => word.localityId === place.id)).toBe(true);
    }
    expect(atlasGanHuaiyueLocalities.find(place => place.id === 'gan-dongzhi-yaodu')?.scope).toContain('Gan, Mandarin and Hui');
  });
  it('supplies specific sound and culture notes and useful sources at every published place', () => {
    for (const place of atlasGanHuaiyueLocalities) {
      expect(pack.soundNotes.filter(note => note.localityIds.includes(place.id))).toHaveLength(2);
      expect(pack.culture.filter(item => item.localityIds.includes(place.id))).toHaveLength(2);
      expect(pack.resources.filter(item => item.localityIds.includes(place.id)).length).toBeGreaterThanOrEqual(2);
    }
  });
});
