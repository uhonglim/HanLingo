import { describe, expect, it } from 'vitest';
import { tunxiLearning } from './tunxi';
import { weiziluLearning } from './weizilu';
import { atlasWeiziluLocalities } from '../atlas/weizilu';
import tunxiLedger from '../../../docs/tunxi-learning-provenance.json';
import weiziluLedger from '../../../docs/weizilu-learning-provenance.json';
import { convertIpa } from '../romanization-method';

const tunxi = tunxiLearning[0];
const weizilu = weiziluLearning[0];
describe('Tunxi and Weizilu source-controlled lexical starters', () => {
  it('preserves missing Tunxi writing and pronoun restrictions without manufacturing tones', () => {
    expect(tunxi.words).toHaveLength(20);
    expect(tunxi.words.filter(w => w.han === null)).toHaveLength(19);
    for (const row of tunxiLedger.rows) {
      const word = tunxi.words.find(w => w.id === `lu2017-tunxi-${row.id}`)!;
      expect(word.han).toBe(row.sourceHan);
      expect(word.learningKind).toBe('word');
      if (word.han === null) expect(word.writingStatus).toBe('not-supplied');
      expect(word.ipa).toBe(`[${row.sourceIpa.replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]/gu,d => String('⁰¹²³⁴⁵⁶⁷⁸⁹'.indexOf(d))).replace(':','ː').replaceAll('-',' ')}]`);
      expect(word.note).toContain(row.sourceIpa);
      expect(word.source.url).toContain(`#page=${row.pdfPageOneBased}`);
      if (row.register === 'Strong pronoun') {
        expect(word.registerLabel).toContain('tone on -le not supplied');
        expect(() => convertIpa(word.ipa,word.toneNotation)).toThrow();
      } else {
        expect(() => convertIpa(word.ipa,word.toneNotation)).not.toThrow();
      }
      if (row.register === 'Uncliticized weak pronoun') expect(word.registerLabel).toContain('needs a following host');
    }
    expect(tunxi.words.find(w => w.han)?.han).toBe('人');
    expect(tunxi.words.find(w => w.id.endsWith('-rice'))?.ipa).toBe('[fuːə11]');
  });
  it('realizes only documented replacement tones and keeps morphological evidence', () => {
    expect(weizilu.words).toHaveLength(18);
    for (const row of weiziluLedger.rows) {
      const word = weizilu.words.find(w => w.id === row.id)!;
      const normalized = row.sourceIpa.replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]/gu,d => String('⁰¹²³⁴⁵⁶⁷⁸⁹'.indexOf(d))).replace(/([1-5]+)⁻([1-5]+)/gu,'$2').replaceAll(' -',' ').replaceAll('ә','ə');
      expect(word.ipa).toBe(`[${normalized}]`);
      expect(word.han).toBe(row.han);
      expect(word.note).toContain(row.sourceIpa);
      expect(word.note).toContain('CC BY 4.0');
      expect(word.toneNotation).toBe('pitch-contour');
      expect(() => convertIpa(word.ipa, word.toneNotation)).not.toThrow();
      if (row.sourceIpa.includes('⁻')) expect(word.note).toContain('underlying tone');
    }
    expect(weizilu.words.find(w => w.id.endsWith('-yuan'))?.ipa).toBe('[mɐn53]');
    expect(weizilu.words.find(w => w.id.endsWith('-grandmother'))?.ipa).toBe('[nai55 nai55]');
    expect(weizilu.words.find(w => w.id.endsWith('-puppy-low'))?.registerLabel).toContain('more common');
  });
  it('keeps exact locality scopes with sound, culture and source coverage', () => {
    expect(atlasWeiziluLocalities).toHaveLength(1);
    const p = atlasWeiziluLocalities[0];
    expect([p.groupId,p.branchId,p.clusterId]).toEqual(['pinghua','southern-pinghua','yong-river']);
    expect(p.coordinates).toEqual([108.2722080,22.8441636]);
    expect(p.scope).toContain('Road as an orientation anchor');
    expect(p.geographySource?.url).toContain('/way/1037240461');
    for (const [pack,id] of [[tunxi,'tunxi-hui'],[weizilu,'weizilu-pinghua']] as const) {
      expect(pack.words.every(w => w.localityId === id)).toBe(true);
      expect(pack.soundNotes.length).toBeGreaterThanOrEqual(2);
      expect(pack.culture.length).toBeGreaterThanOrEqual(2);
      expect(pack.resources.length).toBeGreaterThanOrEqual(2);
      for (const item of [...pack.soundNotes,...pack.culture,...pack.resources]) expect(item.localityIds).toEqual([id]);
    }
  });
});
