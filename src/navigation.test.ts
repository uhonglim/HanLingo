import { describe, expect, it } from 'vitest';
import { getBreadcrumbs } from './navigation';

describe('hierarchical navigation', () => {
  it('preserves each real parent of a Xiamen lesson', () => {
    expect(getBreadcrumbs('/languages/min/southern-min/xiamen/words')).toEqual([
      { label: 'Languages', path: '/languages' },
      { label: 'Min', path: '/languages/min' },
      { label: 'Southern Min', path: '/languages/min/southern-min' },
      { label: 'Xiamen', path: '/languages/min/southern-min/xiamen' },
      { label: 'Words', path: '/languages/min/southern-min/xiamen/words' },
    ]);
  });
  it('rejects invented parents and unknown lesson paths', () => {
    for (const path of ['/languages/min/southern-min/shanghai', '/languages/min/southern-min/xiamen/fake']) {
      expect(getBreadcrumbs(path).at(-1)?.label).toBe('Page not found');
    }
  });
  it('uses the same page label for navigation and titles', () => {
    expect(getBreadcrumbs('/compare/')).toEqual([{ label: 'Compare', path: '/compare' }]);
    expect(getBreadcrumbs('/languages')).toHaveLength(1);
  });
});
