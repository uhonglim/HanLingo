import rawRows from '../../../docs/gan-tone-source-rows.json';
import ledger from '../../../docs/gan-tone-provenance.json';
import { atlasLocalities } from '../atlas';
import { describe, expect, it } from 'vitest';
import { ganToneInventories } from './gan-tone-inventories';
import { atlasGanToneClusters, atlasGanToneLocalities } from '../atlas/gan-tone-localities';

describe('image-checked named-town Gan tone inventories', () => {
  it('preserves distinct town contours and checked-tone category names', () => {
    const row = (name: string) => ganToneInventories.find(item => item.sourcePlaceName === name)!;
    expect(row('王英').tones).toEqual([
      { category: '阴平', contour: '22' }, { category: '阳平', contour: '31' }, { category: '入声', contour: '24' },
    ]);
    expect(row('三溪').tones[0].contour).toBe('33');
    expect(row('关刀').tones.find(tone => tone.category === '次入')?.contour).toBe('45');
    expect(row('马港').tones.find(tone => tone.category === '次入')?.contour).toBe('35');
    expect(row('关刀').source.page).toBe(96);
    expect(row('关刀').source.table).toBe(3);
  });
  it('holds ambiguous rows and never substitutes a county point or nearby tone system', () => {
    expect(ganToneInventories).toHaveLength(36);
    expect(atlasGanToneLocalities).toHaveLength(36);
    for (const name of ['龙港', '金山店', '韦源口', '大畈', '慈口', '九岭']) {
      expect(ganToneInventories.some(row => row.sourcePlaceName === name)).toBe(false);
    }
    expect(atlasGanToneClusters.every(cluster => cluster.kind === 'geographic')).toBe(true);
    for (const row of ganToneInventories) {
      expect(atlasGanToneLocalities.some(place => place.id === row.localityId)).toBe(true);
      expect(row.note).toContain('collection date');
      expect(row.tones.every(tone => /^[1-5]{1,3}$/.test(tone.contour))).toBe(true);
    }
  });
  it('matches every published category and contour to independently extracted PDF rows', () => {
    for (const row of ganToneInventories) {
      const sourceRow = rawRows.find(source => source.localityId === row.localityId)!;
      const sourcePairs = [...new Set([...sourceRow.rawExtractedRow.matchAll(/(阴平|阳平|上声|阴去|阳去|去声|全入|次入|入声|人声)\s*(\d{1,3})/g)].map(match => `${match[1]}:${match[2]}`))].sort();
      expect(row.tones.map(tone => `${tone.category}:${tone.contour}`).sort(), row.sourcePlaceName).toEqual(sourcePairs);
      expect(row.source.page).toBe(sourceRow.printedPage);
      expect(row.source.table).toBe(sourceRow.table);
      expect(row.source.url).toContain(`#page=${sourceRow.pdfPage}`);
    }
    expect(ledger.heldInventories.sort()).toEqual(['gan-daye-jinshandian', 'gan-yangxin-longgang', 'gan-yangxin-weiyuankou']);
    expect(rawRows.every(row => row.matchesLedger)).toBe(true);
    expect(ganToneInventories.some(row => ledger.heldInventories.includes(row.localityId))).toBe(false);
  });
  it('keeps survey-town references separate from other atlas identities', () => {
    for (const place of atlasGanToneLocalities) {
      expect(atlasLocalities.filter(other => other.id === place.id)).toHaveLength(1);
      expect(place.source.url).toContain('SiG-mono2-2-xia-ebook.pdf#page=');
      expect(place.geographySource?.url).toMatch(/^https:\/\/www.wikidata.org\/entity\/Q\d+$/);
    }
  });

});
