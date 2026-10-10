import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import PlaceName from '../components/PlaceName';
import { atlasLocalities, atlasLocalityPath } from './atlas';
import { getBreadcrumbs } from '../navigation';
import { localPlaceReadings, placeDisplayName, placeLabel, placeReadingName, resolvePlaceNames } from './language-names';
import { filterMapLocalities } from '../pages/MapPage';
import targetNames from './translation-targets.json';
import { placeNamePronunciations } from './place-name-pronunciations';
import { convertIpa } from './romanization-method';
import PlaceNameNotes from '../components/PlaceNameNotes';

describe('common and local place names', () => {
  it('keeps the agreed city identities and old URLs while rendering both names', () => {
    for (const [id, common, reading] of [
      ['xiamen', 'Amoy', 'e·T7 mng·T5'], ['guangzhou', 'Canton', 'kwoo:ng·T2 tsău·T1'],
      ['taipak', 'Taipei', 'tai·T5 pak·T4'], ['hong-kong', 'Hong Kong', 'hoe:ng·T1 koo:ng·T2'],
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
    expect(placeDisplayName({id:'gulangyu',name:'Gulangyu'})).toBe('Kulangsu · koo·T2 loong·T7 su·T7');
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
    const sourceOnly = atlasLocalities.find(p=>p.id==='singapore')!;
    expect(localPlaceReadings[sourceOnly.id].localName).toBe('Sin-ka-pho');
    expect(placeReadingName(sourceOnly)).toBeUndefined();
    expect(renderToStaticMarkup(<PlaceName point={sourceOnly}/>)).not.toContain('Sin-ka-pho');
    expect(renderToStaticMarkup(<PlaceNameNotes point={sourceOnly}/>)).toContain('Source spelling: Sin-ka-pho');
  });

  it('generates every secondary name with the global key and keeps provenance separate', () => {
    for (const [id, pronunciation] of Object.entries(placeNamePronunciations)) {
      const expected = convertIpa(pronunciation.ipa, pronunciation.toneNotation).map(s => s.spelling).join(' ');
      expect(placeReadingName({id}), id).toBe(expected);
      expect(pronunciation.source.url, id).toMatch(/^https:/);
      expect(pronunciation.note.length, id).toBeGreaterThan(30);
      if (id !== 'gulangyu') expect(filterMapLocalities(atlasLocalities, expected).map(p => p.id), id).toContain(id);
    }
    const hongKong = atlasLocalities.find(p=>p.id==='hong-kong')!;
    const display = renderToStaticMarkup(<PlaceName point={hongKong}/>);
    expect(display).not.toContain('Hoeng1 Gong2');
    expect(display).toContain('hoe:ng·T1 koo:ng·T2');
    const notes = renderToStaticMarkup(<PlaceNameNotes point={hongKong}/>);
    expect(notes).toContain('Source spelling: Hoeng1 Gong2');
    expect(notes).toContain('IPA segments + source tone categories');
  });

  it('uses the documented Shaowu original pitch without losing the source variant', () => {
    const reading = placeNamePronunciations.shaowu;
    expect(reading.ipa).toBe('ɕiau213 u55');
    expect(reading.toneNotation).toBe('pitch-contour');
    expect(placeReadingName({ id: 'shaowu' })).toBe('shiau213 u55');
    expect(reading.note).toContain('ɕiau213~21u55');
    expect(reading.note).toContain('tonal free variant');
    expect(reading.note).toContain('not vowel nasalization');
    const notes = renderToStaticMarkup(<PlaceNameNotes point={{ id: 'shaowu', name: 'Shaowu' }}/>);
    expect(notes).toContain('shiau213 u55');
    expect(notes).toContain('ɕiau213~21u55');
    expect(notes).toContain('tonal free variant');
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
