import { createServer } from 'vite';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';

const source = 'https://www.unicode.org/Public/17.0.0/ucd/Unihan.zip';
const archive = '.evidence/character-glosses/Unihan-17.0.0.zip';
const sha256 = 'f7a48b2b545acfaa77b2d607ae28747404ce02baefee16396c5d2d7a8ef34b5e';
const bytes = await readFile(archive);
if (createHash('sha256').update(bytes).digest('hex') !== sha256) throw new Error('Pinned Unihan archive mismatch');
const raw = execFileSync('python3', ['-c', 'import zipfile,sys; sys.stdout.buffer.write(zipfile.ZipFile(sys.argv[1]).read("Unihan_Readings.txt"))', archive], { maxBuffer: 30_000_000, encoding: 'utf8' });
const definitions = new Map(raw.split('\n').filter(line => line.includes('\tkDefinition\t')).map(line => {
  const [code, , definition] = line.split('\t');
  return [String.fromCodePoint(parseInt(code.slice(2), 16)), definition];
}));
const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
try {
  const { branchLearning } = await server.ssrLoadModule('/src/data/learning/index.ts');
  const characters = [...new Set(branchLearning.flatMap(pack => pack.words)
    .filter(word => word.learningKind === 'character-reading' && word.han && [...word.han].length === 1)
    .map(word => word.han))].sort();
  // Unihan's broad definition does not contain the documented 參差 sense used in this comparison.
  const held = {
    '差': 'The source reading is the second character of 參差; kDefinition does not supply that contextual sense.',
    '好': 'The Youshan source explicitly marks a verb use; this kDefinition supplies only adjectival senses.',
    '嚼': 'This kDefinition supplies only prattle/be glib; it does not resolve the source character reading context.',
    '著': 'The short definition mixes a general sense and a Cantonese-specific sense, unsuitable as an unqualified aid for other localities.',
  };
  const selected = Object.fromEntries(characters.filter(character => definitions.has(character) && !held[character])
    .map(character => [character, definitions.get(character)]));
  await writeFile('src/data/character-glosses.json', JSON.stringify(selected, null, 2) + '\n');
  await writeFile('docs/character-gloss-provenance.json', JSON.stringify({ version: '17.0.0', source, sha256, field: 'kDefinition', selectedCharacters: Object.keys(selected), held, missing: characters.filter(character => !definitions.has(character)), purpose: 'Written-character senses only; never a local lexical meaning or pronunciation source.' }, null, 2) + '\n');
  await mkdir('public/licenses', { recursive: true });
  const licence = await readFile('.evidence/character-glosses/license.txt', 'utf8');
  if (!licence.includes('UNICODE LICENSE V3')) throw new Error('Unicode licence missing');
  await writeFile('public/licenses/UNICODE-3.0.txt', licence);
  console.log(`Selected ${Object.keys(selected).length} written-character definitions; no local glosses inferred.`);
} finally { await server.close(); }
