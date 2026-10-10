import { readFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
import { createServer } from 'vite';
const ledger = JSON.parse(await readFile('docs/min-sinica-reading-provenance.json', 'utf8'));
const vite = await createServer({ configFile: false, optimizeDeps: { noDiscovery: true, include: [] }, server: { middlewareMode: true }, appType: 'custom' });
try {
  const { minExpandedReadings: packs } = await vite.ssrLoadModule('/src/data/learning/min-expanded-readings.ts');
  const { convertIpa } = await vite.ssrLoadModule('/src/data/romanization-method.ts');
  const { meaningPracticeWords } = await vite.ssrLoadModule('/src/data/learning/practice.ts');
  const words = packs.flatMap(p => p.words);
  assert.equal(words.length, 1500);
  assert.equal(new Set(words.map(w => w.id)).size, words.length);
  assert.equal(packs.length, 15);
  assert.equal(meaningPracticeWords(words).length, 0, 'Character readings must not enter lexical meaning quizzes');
  for (const pack of packs) {
    assert.equal(pack.words.length, 100);
    assert.equal(new Set(pack.words.map(w => w.han)).size, 100);
    assert.ok(pack.soundNotes.length >= 3);
  }
  assert.ok(!words.some(w => w.localityId === 'leizhou' && w.han === '雞'), 'Conflicting source chicken reading must remain held');
  const originals = new Map(ledger.records.map(r => [`${r.localityId}/${r.han}`, r]));
  for (const word of words) {
    const raw = originals.get(`${word.localityId}/${word.han}`);
    assert.ok(raw, word.id);
    assert.equal(word.ipa, `[${raw.initial === '0' ? '' : raw.initial}${raw.rime}${raw.pitch}]`);
    assert.equal(word.toneNotation, 'pitch-contour');
    assert.equal(word.learningKind, 'character-reading');
    assert.equal(word.english, `Character ${word.han}`);
    assert.match(word.reading, /character/i);
    assert.ok(word.note.includes(raw.toneCategory));
    assert.ok(word.source.title.includes(`row ${raw.row}, character ID ${raw.sourceId}`));
    const result = convertIpa(word.ipa, word.toneNotation);
    assert.equal(result.length, 1);
    assert.equal(result[0].tone, raw.pitch);
  }
  for (const [locality, ipa] of [['leizhou','[hu11]'],['xianyou','[hy24]'],['gutian','[ŋy33]'],['fuan','[ŋøi22]'],['jianyang-min','[ŋy334]'],['shaxian','[gy31]']]) {
    assert.equal(words.find(w => w.localityId === locality && w.han === '魚')?.ipa, ipa);
  }
  console.log(`Verified ${words.length} exact source transcriptions across ${packs.length} locality packs.`);
} finally { await vite.close(); }
