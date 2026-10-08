import { describe, expect, it } from 'vitest';
import { getBreadcrumbs } from './navigation';

describe('hierarchical navigation', () => {
  it('preserves each real parent of a Xiamen lesson', () => {
    expect(getBreadcrumbs('/min/southern-min/xiamen/words')).toEqual([
      { label: 'Han', path: '/' },
      { label: 'Min', path: '/min' },
      { label: 'Southern Min', path: '/min/southern-min' },
      { label: 'Xiamen', path: '/min/southern-min/xiamen' },
      { label: 'Words', path: '/min/southern-min/xiamen/words' },
    ]);
  });
  it('rejects invented parents and unknown lesson paths', () => {
    for (const path of ['/min/southern-min/shanghai', '/min/southern-min/xiamen/fake']) {
      expect(getBreadcrumbs(path).at(-1)?.label).toBe('Page not found');
    }
  });
  it('keeps the family root at the homepage', () => {
    expect(getBreadcrumbs('/')).toEqual([{ label: 'Han languages', path: '/' }]);
  });
  it('uses the same page label for navigation and titles', () => {
    expect(getBreadcrumbs('/compare/')).toEqual([{ label: 'Compare', path: '/compare' }]);
    expect(getBreadcrumbs('/languages')).toHaveLength(1);
  });
});
