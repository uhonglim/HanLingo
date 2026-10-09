import { describe, expect, it } from 'vitest';
import { southernMinLearning } from './southern-min';
import { mandarinYueLearning } from './mandarin-yue';
import { hakkaWuLearning } from './hakka-wu';
import { jiangyongChengguanLearning } from './jiangyong-chengguan';
import { meaningPracticeWords } from './practice';

describe('Legacy locality character-source scope', () => {
  const words = [...southernMinLearning, ...mandarinYueLearning, ...hakkaWuLearning].flatMap(pack => pack.words);
  const characters = words.filter(word => word.learningKind === 'character-reading');
  it('excludes 188 CUHK and vowel-study character records from lexical meaning questions', () => {
    expect(characters).toHaveLength(188);
    expect(meaningPracticeWords(characters)).toEqual([]);
    for (const [locality, count] of [['shantou',32], ['jinan',35], ['nanjing',34], ['meixian',27], ['shanghai',21], ['wenzhou',19], ['suzhou',20]] as const) {
      expect(characters.filter(word => word.localityId === locality)).toHaveLength(count);
    }
    for (const word of characters) {
      expect(word.english).toBe(`Character ${word.han}`);
      expect(word.registerLabel).toContain('character reading');
    }
  });
  it('retains independent lexical and explicitly defined local meanings', () => {
    const lishui = words.find(word => word.localityId === 'lishui' && word.han === '東風')!;
    expect(lishui).toBeDefined();
    expect(lishui.learningKind).not.toBe('character-reading');
    expect(meaningPracticeWords([lishui])).toEqual([lishui]);
    const grandmother = jiangyongChengguanLearning.flatMap(pack => pack.words).find(word => word.han === '奶')!;
    expect(grandmother.english).toBe('grandmother; used in address');
    expect(meaningPracticeWords([grandmother])).toEqual([grandmother]);
  });
});
