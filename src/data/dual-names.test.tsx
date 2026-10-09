import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import PlaceName from '../components/PlaceName';
import { atlasLocalities, atlasLocalityPath } from './atlas';
import { getBreadcrumbs } from '../navigation';
import { localPlaceReadings, placeDisplayName, placeLabel, placeReadingName, resolvePlaceNames } from './language-names';
import { filterMapLocalities } from '../pages/MapPage';
import targetNames from './translation-targets.json';

describe('common and local place names', () => {
  it('keeps the agreed city identities and old URLs while rendering both names', () => {
    for (const [id, common, reading] of [
      ['xiamen', 'Amoy', 'Ē-mn̂g'], ['guangzhou', 'Canton', 'Gwong2 Zau1'],
      ['taipak', 'Taipei', 'Tâi-pak'], ['singapore', 'Singapore', 'Sin-ka-pho'],
    ]) {
      const point = atlasLocalities.find(p => p.id === id)!;
      expect(placeLabel(point)).toBe(common);
      expect(placeReadingName(point)).toBe(reading);
      expect(atlasLocalityPath(point).split('/').at(-1)).toBe(id);
      expect(getBreadcrumbs(atlasLocalityPath(point)).at(-1)?.label).toBe(`${common} · ${reading}`);
      const text = renderToStaticMarkup(<PlaceName point={point} showHan/>).replace(/<[^>]+>/g, '');
      expect(text).toBe(`${common} ${reading} ${point.nativeName}`);
    }
  });

  it('finds local spellings and legacy aliases without treating them as new places', () => {
    for (const [query, id] of [['e mng', 'xiamen'], ['Xiamen', 'xiamen'], ['gwong2 zau1', 'guangzhou'], ['Guangzhou', 'guangzhou'], ['Taipak', 'taipak'], ['tâi-pak', 'taipak'], ['sin ka pho', 'singapore']]) {
      expect(filterMapLocalities(atlasLocalities, query).map(p=>p.id),query).toContain(id);
    }
    expect(atlasLocalities.some(p=>p.id==='gulangyu')).toBe(false);
    expect(placeDisplayName({id:'gulangyu',name:'Gulangyu'})).toBe('Kulangsu · kó·-lōng-sū');
  });

  it('requires provenance and leaves unavailable readings absent rather than manufacturing pinyin', () => {
    for (const [id, reading] of Object.entries(localPlaceReadings)) {
      expect(id === 'gulangyu' || atlasLocalities.some(p=>p.id===id),id).toBe(true);
      expect(reading.source.url).toMatch(/^https:\/\//);
      expect(reading.convention.length).toBeGreaterThan(4);
      expect(reading.note.length).toBeGreaterThan(30);
    }
    const point = atlasLocalities.find(p=>p.id==='huangyan')!;
    expect(resolvePlaceNames(point).localReadingName).toBeUndefined();
    expect(renderToStaticMarkup(<PlaceName point={point}/>)).not.toContain('place-name-reading');
    const same = atlasLocalities.find(p=>p.id==='quanzhou')!;
    expect(renderToStaticMarkup(<PlaceName point={same}/>).match(/Tsuân-tsiu/g)).toHaveLength(1);
  });

  it('keeps comparison display metadata synchronized with the same name resolver', () => {
    for (const target of targetNames) {
      if (!target.localityId) continue;
      const point = atlasLocalities.find(p=>p.id===target.localityId)!;
      expect(target.commonName).toBe(placeLabel(point));
      expect(target.name).toBe(placeDisplayName(point));
      expect(target.localName).toBe(placeReadingName(point) ?? null);
    }
  });
});
