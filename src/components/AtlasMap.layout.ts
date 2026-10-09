export type AtlasMarkerPosition = { id: string; x: number; y: number };
export type AtlasLabelBox = { x: number; y: number; width: number; height: number };

/** Screen-space buckets avoid scanning the complete atlas for every label. */
export function createAtlasMarkerIndex(points: readonly AtlasMarkerPosition[], cellSize = 32) {
  const cells = new Map<string, AtlasMarkerPosition[]>();
  for (const point of points) {
    const key = `${Math.floor(point.x / cellSize)},${Math.floor(point.y / cellSize)}`;
    const cell = cells.get(key);
    if (cell) cell.push(point);
    else cells.set(key, [point]);
  }
  return (box: AtlasLabelBox, ownId: string, gap = 5) => {
    const left = box.x - gap;
    const right = box.x + box.width + gap;
    const top = box.y - gap;
    const bottom = box.y + box.height + gap;
    for (let x = Math.floor(left / cellSize); x <= Math.floor(right / cellSize); x++) {
      for (let y = Math.floor(top / cellSize); y <= Math.floor(bottom / cellSize); y++) {
        const cell = cells.get(`${x},${y}`);
        if (cell?.some(point => point.id !== ownId && point.x >= left && point.x <= right && point.y >= top && point.y <= bottom)) return true;
      }
    }
    return false;
  };
}

/** All markers remain keyboard reachable without creating 1,000 Tab stops. */
export function atlasMarkerFocus(ids: readonly string[], current: string, key: string): string | null {
  if (!ids.length) return null;
  if (key === "Home") return ids[0];
  if (key === "End") return ids[ids.length - 1];
  const direction = key === "ArrowRight" || key === "ArrowDown" ? 1
    : key === "ArrowLeft" || key === "ArrowUp" ? -1 : 0;
  if (!direction) return null;
  const index = ids.indexOf(current);
  if (index === -1) return direction === 1 ? ids[0] : ids[ids.length - 1];
  return ids[(index + direction + ids.length) % ids.length];
}
