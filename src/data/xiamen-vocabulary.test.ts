import { describe, expect, it } from 'vitest';
import { filterXiamenWords } from './xiamen-vocabulary';
import { xiamenWords } from './xiamen-lexicon';

describe('Xiamen vocabulary search', () => {
  it('finds sourced entries by simplified characters, IPA, and trial spelling', () => {
    expect(filterXiamenWords('飞机').map(w => w.han)).toEqual(['飛機']);
    expect(filterXiamenWords('t͡sʰai').map(w => w.han)).toEqual(['菜']);
    expect(filterXiamenWords('tshai21').map(w => w.han)).toEqual(['菜']);
    expect(filterXiamenWords(' TEA ').map(w => w.han)).toEqual(['茶']);
  });
  it('combines category, query and saved filters and recovers invalid categories', () => {
    const tea = xiamenWords.find(w => w.han === '茶')!;
    expect(filterXiamenWords('tea', 'Food & drink', true, [tea.id])).toEqual([tea]);
    expect(filterXiamenWords('tea', 'Numbers', true, [tea.id])).toEqual([]);
    expect(filterXiamenWords('tea', 'All words', true, [])).toEqual([]);
    expect(filterXiamenWords('', 'invalid')).toEqual(xiamenWords);
  });
});
