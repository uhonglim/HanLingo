/** Reproducible, conservative import of a licensed lexical dataset.
 * node scripts/import-atlas-lexicon.mjs
 * No source IPA substitution, inherited localities, inferred tones or invented characters.
 */
import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createServer } from 'vite';
const commit = '6bb8f57330f3b28c126a633f2c2adc6d01d0f555';
const repository = 'https://github.com/lexibank/beidasinitic';
const base = `https://raw.githubusercontent.com/lexibank/beidasinitic/${commit}/`;
const cache = '.evidence/atlas-learning/beidasinitic';
const limit = 80;
// Explicit identity mapping; do not match coordinates or import Glottolog classifications.
const localities = {
  Beijing: 'beijing-city', Chaozhou: 'chaozhou', Chengdu: 'chengdu', Fuzhou: 'fuzhou',
  Guangzhou: 'guangzhou', Hefei: 'hefei', Jinan: 'jinan', Meixian: 'meixian',
  Shenyang: 'shenyang', Suzhou: 'suzhou', Wenzhou: 'wenzhou', XiAn: 'xian',
  Yangjiang: 'yangjiang', Yangzhou: 'yangzhou',
};
function csv(text) {
  const rows = []; let fields = [], field = '', quoted = false;
  let line = 1, startLine = 1;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (ch === '"') {
      if (quoted && text[i + 1] === '"') { field += '"'; i++; }
      else quoted = !quoted;
    } else if (ch === ',' && !quoted) { fields.push(field); field = ''; }
    else if (ch === '\n' && !quoted) {
      fields.push(field.replace(/\r$/, '')); rows.push({ fields, line: startLine });
      fields = []; field = ''; startLine = line + 1;
    } else field += ch;
    if (ch === '\n') line++;
  }
  if (field || fields.length) { fields.push(field); rows.push({ fields, line: startLine }); }
  const header = rows.shift().fields;
  return rows.map(row => ({ ...Object.fromEntries(header.map((key, i) => [key, row.fields[i] ?? ''])), line: row.line }));
}
await mkdir(cache, { recursive: true });
const checksums = {};
async function acquire(file) {
  // Commit-specific cache paths prevent a moving upstream branch from changing a rerun.
  const path = `${cache}/${commit}-${file.replaceAll('/', '_')}`;
  let text;
  try { text = await readFile(path, 'utf8'); }
  catch {
    const response = await fetch(base + file);
    if (!response.ok) throw new Error(`${file}: HTTP ${response.status}`);
    text = await response.text(); await writeFile(path, text);
  }
  checksums[file] = createHash('sha256').update(text).digest('hex');
  return text;
}
const forms = csv(await acquire('cldf/forms.csv'));
const concepts = new Map(csv(await acquire('cldf/parameters.csv')).map(row => [row.ID, row]));
const languages = new Map(csv(await acquire('cldf/languages.csv')).map(row => [row.ID, row]));
const metadata = JSON.parse(await acquire('metadata.json'));
if (metadata.license !== 'CC-BY-4.0') throw new Error('Unexpected source licence');
await acquire('LICENSE');
await acquire('README.md');
// Everyday concepts first, followed by the source questionnaire order. One form per concept.
const priority = new Map(('water|rice|eat|drink|tea|fish|meat|egg|salt|sugar|oil|bread|noodles|tofu|milk|vegetable|potato|tomato|fruit|apple|orange|banana|pear|peach|grape|dog|cat|pig|cow|horse|chicken|bird|duck|sheep|goat|person|man|woman|child|father|mother|brother|sister|hand|foot|head|eye|ear|nose|mouth|tooth|hair|heart|sun|moon|star|rain|wind|snow|cloud|sky|fire|earth|mountain|river|tree|leaf|flower|grass|house|door|window|table|chair|bed|bowl|cup|chopsticks|spoon|knife|clothes|shoe|hat|soap|market|one|two|three|four|five|six|seven|eight|nine|ten|today|tomorrow|yesterday|year|day|night|morning|good|bad|big|small|long|short|hot|cold|new|old|white|black|red|yellow|green|blue|come|go|walk|run|sleep|sit|stand|buy|sell|give|see|hear|know|speak|read|write|laugh|cry').split('|').map((word, i) => [word, i]));
const vite = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
const rejected = {}; const packs = []; const records = [];
try {
  const { atlasLocalities } = await vite.ssrLoadModule('/src/data/atlas/index.ts');
  const { convertIpa } = await vite.ssrLoadModule('/src/data/romanization-method.ts');
  for (const [language, localityId] of Object.entries(localities)) {
    const point = atlasLocalities.find(point => point.id === localityId);
    if (!point || !languages.has(language)) throw new Error(`Unresolved locality: ${language} → ${localityId}`);
    const placeLabel = point.name;
    const seen = new Set(); const selected = [];
    const candidates = forms.filter(row => row.Language_ID === language).sort((a,b) => {
      const score = row => priority.get(concepts.get(row.Parameter_ID).Name.toLowerCase()) ?? (1000 + Number(concepts.get(row.Parameter_ID).Number));
      return score(a) - score(b) || a.ID.localeCompare(b.ID);
    });
    const reasons = {};
    const reject = reason => { reasons[reason] = (reasons[reason] ?? 0) + 1; };
    for (const row of candidates) {
      const han = row.Benzi.replaceAll(' ', '');
      // Benzi is the local written form; the questionnaire's Chinese_Gloss is NOT a substitute.
      if (!/^[\p{Script=Han}]+$/u.test(han)) { reject('unresolved local character form'); continue; }
      if (row.Value !== row.Form || row.Comment) { reject('edited or annotated form needs review'); continue; }
      // Every syllable must contain supplied pitch digits; 0, category labels, sandhi arrows,
      // parentheses and neutral-tone omissions remain research gaps, never guessed.
      const syllables = row.Value.match(/[^⁰¹²³⁴⁵⁶⁷⁸⁹\s]+[¹²³⁴⁵]{1,3}/gu);
      if (!syllables || syllables.join('') !== row.Value || /[⁰⁶⁷⁸⁹⁻?/()[\]{}]/u.test(row.Value)) { reject('non-simple or incomplete tone notation'); continue; }
      const ipa = `[${syllables.join(' ')}]`;
      try { convertIpa(ipa, 'pitch-contour'); }
      catch { reject('unmapped source IPA'); continue; }
      if (seen.has(row.Parameter_ID)) continue;
      seen.add(row.Parameter_ID);
      selected.push({ id: `beida1964-${row.ID}`, han, english: concepts.get(row.Parameter_ID).Name,
        ipa, toneNotation: 'pitch-contour', localityId, reading: '1950s survey · published 1964',
        registerLabel: `${placeLabel} · 1950s survey · published 1964`,
        note: 'Historical survey attestation, not a claim about every present-day speaker. The CLDF edition’s local character form and IPA are retained. Its editors slightly adjusted the transcription; spaces separate syllables at supplied tone boundaries.',
        source: { title: `Beida 1964 · ${row.ID} · CC BY 4.0`, url: `${repository}/blob/${commit}/cldf/forms.csv#L${row.line}` },
      });
      records.push({ id: `beida1964-${row.ID}`, sourceId: row.ID, sourceValue: row.Value, sourceCharacters: row.Benzi, conceptId: row.Parameter_ID, concepticonId: concepts.get(row.Parameter_ID).Concepticon_ID, line: row.line });
      if (selected.length === limit) break;
    }
    rejected[localityId] = reasons;
    if (selected.length < 20) throw new Error(`Too little verified data for ${localityId}: ${selected.length}`);
    const source = { title: 'Beida 1964 · licensed CLDF edition v5.1', url: 'https://doi.org/10.5281/zenodo.13149151' };
    packs.push({ branchId: `${point.groupId}/${point.branchId}`, words: selected, soundNotes: [
      { title: 'Read the CLDF source forms', text: `${selected[0].han} “${selected[0].english}” is recorded as ${selected[0].ipa}; ${selected[1].han} “${selected[1].english}” as ${selected[1].ipa}. These ${placeLabel} forms were collected in the 1950s, published in 1964 and transcribed in a later CLDF edition with slight IPA adjustments. Their superscript digits are supplied pitch contours, preserved separately from HanLingo spelling.`, localityIds: [localityId], source },
      { title: 'Keep the survey date in view', text: 'These local word forms document a 1950s survey published in 1964, not a newly recorded speaker. Compare them with newer studies without overwriting either source. Neutral-tone and ambiguous forms from this dataset remain excluded rather than receiving guessed tones.', localityIds: [localityId], source },
    ], culture: [], resources: [
      { title: 'Chinese Dialect Vocabularies · 1964', description: 'The published locality-specific wordlist in a licensed, versioned CLDF edition. Each imported reading links to its CLDF source row.', localityIds: [localityId], kind: 'Dictionary', url: source.url },
      { title: 'CLDF dataset and transcription record', description: 'CLDF source values, local character forms, concept definitions and transcription processing. HanLingo uses Value, not the normalized Segments field.', localityIds: [localityId], kind: 'Study', url: `${repository}/tree/${commit}` },
    ] });
  }
} finally { await vite.close(); }
const output = '// Generated by scripts/import-atlas-lexicon.mjs. Data: CC BY 4.0; see docs/ATLAS-LEARNING-SOURCES.md.\nimport type { BranchLearning } from "./types";\nexport const atlasLexibankPacks: BranchLearning[] = ' + JSON.stringify(packs, null, 2) + ';\n';
await writeFile('src/data/learning/atlas-lexibank.ts', output);
await writeFile('src/data/learning/atlas-lexibank-provenance.json', JSON.stringify({ repository, commit, version: 'v5.1', doi: '10.5281/zenodo.13149151', licence: metadata.license, citation: metadata.citation, changes: 'Curated locality match and concept selection; inserted syllable spaces at CLDF source tone boundaries. CLDF source Value and Benzi retained below; the edition already slightly adjusts the 1964 publication’s IPA. No phonetic substitution or tone inference.', limit, checksums, localities, rejected, records }, null, 2) + '\n');
console.log(JSON.stringify({ localities: packs.length, words: packs.reduce((sum, pack) => sum + pack.words.length, 0), counts: packs.map(pack => [pack.words[0].localityId, pack.words.length]), rejected }, null, 2));
