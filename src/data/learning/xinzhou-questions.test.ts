import { describe, expect, it } from 'vitest';
import { xinzhouQuestionsLearning } from './xinzhou-questions';
import { convertIpa } from '../romanization-method';
import { localWordCanDistract, meaningPracticeWords, practiceSelection } from './practice';
import ledger from '../../../docs/xinzhou-questions-provenance.json';

describe('Xinzhou questions from Ruan 2024', () => {
  const pack = xinzhouQuestionsLearning[0];
  const word = (han: string) => pack.words.find(item => item.han === han)!;

  it('preserves all 13 source forms without interpreting their numerical notation', () => {
    expect(pack.branchId).toBe('jin/wutai');
    expect(pack.words).toHaveLength(13);
    for (const row of ledger.rows) {
      const entry = pack.words.find(item => item.id === row.id)!;
      expect(entry).toMatchObject({ han: row.han, english: row.english, learningKind: 'word', toneNotation: 'unspecified', localityId: 'xinzhou-jin' });
      expect(entry.ipa).toBe(`[${row.sourceForm.replace(/[0-9]+/gu, ' ').trim()}]`);
      expect(entry.note).toContain(`[${row.sourceForm}]`);
      expect(entry.registerLabel).toContain('2023 fieldwork');
      expect(entry.registerLabel).toContain('settlement unspecified');
      expect(entry.registerLabel).toContain('segments only');
      const converted = convertIpa(entry.ipa, entry.toneNotation);
      expect(converted.length).toBeGreaterThan(0);
      expect(converted.map(item => item.spelling).join(' ')).not.toMatch(/[0-9]/u);
    }
    expect(word('甚时候').ipa).toBe('[ʂəŋ sɿ xəu]');
    expect(word('咋').ipa).toBe('[ʦuɑ]');
    expect(word('几').ipa).toBe('[ʨi]');
    expect(pack.words.filter(item => item.han === null)).toHaveLength(1);
    expect(pack.words.find(item => item.han === null)).toMatchObject({ writingStatus: 'not-supplied', english: 'whose family', ipa: '[suɑ]' });
    expect(pack.words.some(item => item.han === '谁家')).toBe(false);
    for (const held of ['谁们', '哪儿', '哪儿搭', '哪半儿', '哪忽栏儿', '多会儿']) {
      expect(pack.words.some(item => item.han === held)).toBe(false);
    }
  });

  it('keeps source senses but excludes overlapping meanings from prompts and distractors', () => {
    expect(word('咋').english).toBe('how / why');
    expect(word('多少').english).toBe('how much / how many');
    expect(word('咋地个').english).toBe('how is it / how did it go');
    expect(pack.words.filter(item => item.meaningPracticeExclude).map(item => item.han)).toEqual(['咋', '多少']);
    expect(meaningPracticeWords(pack.words)).toHaveLength(11);
    expect(practiceSelection(pack.words)?.mode).toBe('meaning');
    expect(practiceSelection(pack.words)?.words).toHaveLength(10);
    expect(practiceSelection(pack.words)?.words.some(item => item.meaningPracticeExclude)).toBe(false);
    for (const [a, b] of [['咋', '咋个'], ['咋', '为甚'], ['多少', '几'], ['多么', '多啦']]) {
      expect(localWordCanDistract(word(a), word(b))).toBe(false);
      expect(localWordCanDistract(word(b), word(a))).toBe(false);
    }
    expect(localWordCanDistract(word('谁'), word('甚'))).toBe(true);
  });

  it('provides place-scoped sound notes, culture and source links', () => {
    expect(pack.soundNotes).toHaveLength(2);
    expect(pack.culture).toHaveLength(2);
    expect(pack.resources).toHaveLength(4);
    for (const item of [...pack.soundNotes, ...pack.culture, ...pack.resources]) {
      expect(item.localityIds).toEqual(['xinzhou-jin']);
    }
    expect(pack.soundNotes[1].text).toContain('not a known recording address');
    expect(pack.culture[1].text).toContain('2017 restoration');
    expect(pack.resources[0].description).toContain('does not define');
    expect(ledger.license).toContain('CC BY4.0');
  });
});
