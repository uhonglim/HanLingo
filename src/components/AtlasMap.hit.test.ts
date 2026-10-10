import { describe, expect, it } from 'vitest';
import { nearestAtlasMarker } from './AtlasMap.layout';

describe('dense atlas pointer selection', () => {
  it('selects the closest dot even when another marker hit area is painted above it', () => {
    const points = [{ id: 'city', x: 100, y: 100 }, { id: 'district', x: 104, y: 102 }];
    expect(nearestAtlasMarker(points, 100, 100, 'district')).toBe('city');
    expect(nearestAtlasMarker(points, 104, 102, 'city')).toBe('district');
    expect(nearestAtlasMarker([...points].reverse(), 100, 100, 'district')).toBe('city');
    expect(nearestAtlasMarker([], 100, 100, 'city')).toBe('city');
  });
});
