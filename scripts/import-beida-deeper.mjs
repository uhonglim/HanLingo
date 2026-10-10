/** Append a fixed reviewed Beida selection without touching the original 1,120 records.
 * node scripts/import-beida-deeper.mjs [--check]
 */
import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createServer } from 'vite';
const ledger = JSON.parse(await readFile('docs/beida-deeper-selection.json', 'utf8'));
const originalLedger = JSON.parse(await readFile('src/data/learning/atlas-lexibank-provenance.json', 'utf8'));
const { commit, repository } = ledger;
const base = `https://raw.githubusercontent.com/lexibank/beidasinitic/${commit}/`;
const cache = '.evidence/atlas-learning/beidasinitic';
const sha256 = text => createHash('sha256').update(text).digest('hex');
const checksums = {};
const checkOnly = process.argv.includes('--check');
function csv(text) {
  const rows = []; let fields = [], field = '', quoted = false, line = 1, startLine = 1;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (ch === '"') { if (quoted && text[i + 1] === '"') { field += '"'; i++; } else quoted = !quoted; }
    else if (ch === ',' && !quoted) { fields.push(field); field = ''; }
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
async function acquire(file) {
  const path = `${cache}/${commit}-${file.replaceAll('/', '_')}`;
  let text;
  try { text = await readFile(path, 'utf8'); }
  catch {
    const response = await fetch(base + file);
    if (!response.ok) throw new Error(`${file}: HTTP ${response.status}`);
    text = await response.text(); await writeFile(path, text);
  }
  const hash = sha256(text);
  if (originalLedger.checksums[file] !== hash) throw new Error(`Source checksum changed: ${file}`);
  checksums[file] = hash;
  return text;
}
const forms = new Map(csv(await acquire('cldf/forms.csv')).map(row => [row.ID, row]));
const concepts = new Map(csv(await acquire('cldf/parameters.csv')).map(row => [row.ID, row]));
const languages = new Map(csv(await acquire('cldf/languages.csv')).map(row => [row.ID, row]));
const metadata = JSON.parse(await acquire('metadata.json'));
if (metadata.license !== ledger.licence) throw new Error('Source licence changed');
await acquire('LICENSE'); await acquire('README.md');
const originalIds = new Set(originalLedger.records.map(row => row.sourceId));
const originalConcepts = new Set(originalLedger.records.map(row => `${forms.get(row.sourceId).Language_ID}/${row.conceptId}`));
const heldIds = new Set(ledger.held.map(row => row.sourceId));
const seenIds = new Set(), seenConcepts = new Set(originalConcepts), seenForms = new Set();
const records = [], packs = [];
const vite = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
try {
  const { atlasLocalities } = await vite.ssrLoadModule('/src/data/atlas/index.ts');
  const { convertIpa } = await vite.ssrLoadModule('/src/data/romanization-method.ts');
  const { atlasLexibankPacks } = await vite.ssrLoadModule('/src/data/learning/atlas-lexibank.ts');
  const originalWords = atlasLexibankPacks.flatMap(pack => pack.words);
  if (originalWords.length !== ledger.originalCount || sha256(JSON.stringify(originalWords.map(({id, ipa, english, localityId}) => ({id, ipa, english, localityId})))) !== ledger.originalCoreSha256) throw new Error('Original published core changed');
  for (const word of originalWords) seenForms.add(`${word.localityId}/${word.han}/${word.ipa}`);
  for (const selected of ledger.selection) {
    const row = forms.get(selected.sourceId), concept = concepts.get(selected.conceptId);
    if (!row || !concept || !languages.has(selected.languageId)) throw new Error(`Missing source row: ${selected.sourceId}`);
    for (const [actual, expected, label] of [
      [row.Segments, selected.sourceSegments, 'normalized source field'], [row.Language_ID, selected.languageId, 'locality'], [row.Value, selected.sourceValue, 'IPA'],
      [row.Benzi, selected.sourceCharacters, 'writing'], [row.line, selected.sourceLine, 'line'],
      [row.Parameter_ID, selected.conceptId, 'concept'], [concept.Name, selected.sourceEnglish, 'English'],
      [concept.Chinese_Gloss, selected.questionnaireChinese, 'questionnaire'],
    ]) if (actual !== expected) throw new Error(`${selected.sourceId}: changed ${label}`);
    if (originalIds.has(row.ID) || seenIds.has(row.ID) || heldIds.has(row.ID)) throw new Error(`Duplicate or held source ID: ${row.ID}`);
    if (originalLedger.localities[row.Language_ID] !== selected.localityId) throw new Error(`Changed locality identity: ${row.ID}`);
    const conceptKey = `${row.Language_ID}/${row.Parameter_ID}`;
    if (seenConcepts.has(conceptKey)) throw new Error(`Duplicate local concept: ${row.ID}`);
    const han = row.Benzi.replaceAll(' ', '');
    if (!/^[\p{Script=Han}]+$/u.test(han) || han.includes('囗')) throw new Error(`Incomplete source writing: ${row.ID}`);
    if (row.Value !== row.Form || row.Comment) throw new Error(`Annotated form: ${row.ID}`);
    const syllables = row.Value.match(/[^⁰¹²³⁴⁵⁶⁷⁸⁹\s]+[¹²³⁴⁵]{1,3}/gu);
    if (!syllables || syllables.join('') !== row.Value || /[⁰⁶⁷⁸⁹⁻?/()[\]{}]/u.test(row.Value)) throw new Error(`Unresolved tone notation: ${row.ID}`);
    if (/[0-9]/u.test(row.Value) || JSON.stringify(row.Value.match(/[¹²³⁴⁵]+/gu)) !== JSON.stringify(row.Segments.match(/[¹²³⁴⁵]+/gu))) throw new Error(`Conflicting or corrupt source pitch: ${row.ID}`);
    const ipa = `[${syllables.join(' ')}]`;
    convertIpa(ipa, 'pitch-contour');
    const formKey = `${selected.localityId}/${han}/${ipa}`;
    if (seenForms.has(formKey)) throw new Error(`Duplicate local form: ${row.ID}`);
    const point = atlasLocalities.find(point => point.id === selected.localityId);
    if (!point) throw new Error(`Missing atlas locality: ${selected.localityId}`);
    const correction = ledger.headingCorrections[row.Parameter_ID];
    if (correction && (correction.sourceEnglish !== concept.Name || correction.questionnaireChinese !== concept.Chinese_Gloss)) throw new Error(`Unmatched heading correction: ${row.ID}`);
    const english = correction?.proposedEnglish ?? concept.Name;
    const word = {
      id: `beida1964-${row.ID}`, han, english, ipa, learningKind: 'word', toneNotation: 'pitch-contour', localityId: point.id,
      reading: '1950s survey · published 1964', registerLabel: `${point.name} · 1950s survey · published 1964`,
      note: 'Historical survey attestation, not a claim about every present-day speaker. The CLDF edition’s local character form and IPA are retained. Its editors slightly adjusted the transcription; spaces separate syllables at supplied tone boundaries.' + (correction ? ` The dataset’s English heading is “${concept.Name}”; “${english}” follows its questionnaire heading ${concept.Chinese_Gloss}.` : ''),
      source: { title: `Beida 1964 · ${row.ID} · CC BY 4.0`, url: `${repository}/blob/${commit}/cldf/forms.csv#L${row.line}` },
    };
    let pack = packs.find(pack => pack.words[0]?.localityId === point.id);
    if (!pack) { pack = { branchId: `${point.groupId}/${point.branchId}`, words: [], soundNotes: [], culture: [], resources: [] }; packs.push(pack); }
    pack.words.push(word);
    records.push({ id: word.id, ...selected, han, english, ipa, concepticonId: concept.Concepticon_ID, ...(correction ? { headingCorrection: correction } : {}) });
    seenIds.add(row.ID); seenConcepts.add(conceptKey); seenForms.add(formKey);
  }
} finally { await vite.close(); }
if (records.length !== ledger.additionalCount || packs.length !== 14 || packs.some(pack => pack.words.length !== ledger.expectedPerLocality)) throw new Error('Reviewed selection counts changed');
const output = '// Generated by scripts/import-beida-deeper.mjs. Data: CC BY 4.0; see docs/BEIDA-DEEPER-SOURCES.md.\nimport type { BranchLearning } from "./types";\nexport const atlasLexibankDeeperPacks: BranchLearning[] = ' + JSON.stringify(packs, null, 2) + ';\n';
const provenance = JSON.stringify({ repository, commit, version: ledger.version, doi: ledger.doi, licence: metadata.license, citation: metadata.citation, checksums, originalCount: ledger.originalCount, additionalCount: records.length, counts: Object.fromEntries(packs.map(pack => [pack.words[0].localityId, pack.words.length])), changes: 'Fixed reviewed additions only. Source Value and local Benzi retained; spaces at supplied pitch boundaries. Two documented English-heading corrections from questionnaire Chinese. No guessed segments, tone values or characters.', held: ledger.held, records }, null, 2) + '\n';
for (const [path, content] of [['src/data/learning/atlas-lexibank-deeper.ts', output], ['docs/beida-deeper-provenance.json', provenance]]) {
  if (checkOnly) { if (await readFile(path, 'utf8') !== content) throw new Error(`Generated output differs: ${path}`); }
  else await writeFile(path, content);
}
console.log(JSON.stringify({ mode: checkOnly ? 'verified' : 'generated', localities: packs.length, additionalWords: records.length, held: ledger.held.length }, null, 2));
