import { describe, it, expect } from 'vitest';
import { normalizeNameSearch } from './name-search';
import { atlasLocalities } from './atlas';
import { filterMapLocalities } from '../pages/MapPage';

describe('community place-name search', () => {
  it('matches simplified/traditional queries without changing displayed names', () => {
    for (const [traditional, simplified] of [['黃巖','黄岩'],['廣州','广州'],['廈門','厦门'],['溫嶺','温岭'],['樂清','乐清'],['寧波','宁波']])
      expect(normalizeNameSearch(traditional)).toBe(normalizeNameSearch(simplified));
    expect(filterMapLocalities(atlasLocalities, '黄岩').some(place => place.id === 'huangyan')).toBe(true);
    expect(filterMapLocalities(atlasLocalities, '广州').find(place => place.id === 'guangzhou')?.name).toBe('Canton');
    expect(filterMapLocalities(atlasLocalities, 'Ningbo').find(place => place.id === 'ningbo')?.name).toBe('Ningpo');
  });
});
