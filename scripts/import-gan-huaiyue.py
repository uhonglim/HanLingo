#!/usr/bin/env python3
"""Rebuild the reviewed Xu2022 Huai–Yue character pack from its source-cell ledger.

The ledger is a manual, image-checked transcription, not OCR-generated lessons.
It retains all 126 candidates, including 20 geography holds. Source PDF hash and
independent geography/classification evidence are recorded alongside the rows.
"""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ledger = json.loads((ROOT / 'docs/gan-huaiyue-provenance.json').read_text())
source_url = ledger['source']['url']
source_title = 'Xu Jian 徐建 2022 · 皖西南方言开口一二等韵读齐齿呼现象考察'
superscript = str.maketrans('12345', '¹²³⁴⁵')
words, notes, culture, resources, points = [], [], [], [], []
for slug, loc in ledger['localities'].items():
    if not loc['publish']:
        continue
    locality_id = loc['localityId']
    rows = [r for r in ledger['rows'] if r['proposedLocalitySlug'] == slug]
    for r in rows:
        register = '' if r['register'] == 'unspecified' else ' · ' + r['register']
        context = f" The source specifies {r['sourceContext']}; only {r['han']} is transcribed, not the complete compound." if r['sourceContext'] else ''
        notestr = f"Source row {r['sourcePlaceName']}; original notation {r['sourceReading']}. Source digits give pitch contours."
        if 'ә' in r['sourceSegments']:
            notestr += ' The source’s ә glyph is normalized to IPA ə; the original is retained in the source record.'
        if r['register'] != 'unspecified':
            notestr += ' Source footnote 1 defines the first slash alternative as colloquial and the second as literary.'
        if slug == 'susong-erlang':
            notestr += ' Sun Yizhi 2002, reproduced in Xu 2022; recording and collection date unspecified.'
        else:
            notestr += ' Xu’s field survey, published 2022; collection date, speaker details and recording unavailable.'
        notestr += context
        words.append({
            'id': r['id'], 'han': r['han'], 'english': 'Character ' + r['han'],
            'ipa': '[' + r['sourceSegments'].replace('ә', 'ə') + r['pitchContour'].translate(superscript) + ']',
            'toneNotation': 'pitch-contour', 'localityId': locality_id,
            'learningKind': 'character-reading', 'reading': 'Comparative character reading' + register,
            'registerLabel': loc['name'] + ' · Xu 2022 · character reading · pitch contours' + register + ' · collection date unspecified',
            'note': notestr,
            'source': {'title': f"Xu Jian 2022 · p.{r['page']}, table {r['table']}, {r['sourcePlaceName']}, column {r['column']} · CC BY 4.0", 'url': source_url + '#page=' + str(r['pdfPage'])},
        })
    for n in loc['soundNotes']:
        notes.append({'title': n['title'], 'text': n['text'], 'localityIds': [locality_id], 'source': {'title': f"Xu Jian 2022 · p.{n['page']}, table {n['table']}", 'url': source_url + '#page=' + str(n['page'] + 6)}})
    for c in loc['culture']:
        culture.append({'title': c['title'], 'text': c['text'], 'localityIds': [locality_id], 'source': {'title': c['sourceTitle'], 'url': c['url']}})
    resources.append({'title': 'Xu Jian’s comparative character study', 'description': 'The named settlement’s attested readings and historical phonology; publication year 2022, collection date unspecified.', 'kind': 'Study', 'localityIds': [locality_id], 'url': source_url + '#page=' + str(rows[0]['pdfPage'])})
    seen = set()
    for c in loc['culture']:
        if c['url'] in seen:
            continue
        seen.add(c['url'])
        resources.append({'title': c['sourceTitle'], 'description': 'Documented cultural context in the named town or its villages; not evidence of a survey speaker’s location.', 'kind': 'Culture', 'localityIds': [locality_id], 'url': c['url']})
    g = loc['geography']
    classification = loc['classification']
    scope = f"{loc['sourcePlaceName']} is the named settlement reference in Xu Jian’s 2022 comparison. These are character readings, not a uniform accent across the surrounding county. Collection date and speaker details are unspecified."
    if slug == 'susong-erlang':
        scope += ' The Erlang readings are reproduced from Sun Yizhi 2002.'
    if slug == 'dongzhi-yaodu':
        scope += ' Dongzhi County contains Gan, Mandarin and Hui references; Xu explicitly places Yaodu in the Gan comparison.'
    scope += ' The map uses a separate approximate town anchor; local place-name IPA is not yet collected.'
    points.append({'id': locality_id, 'name': loc['name'], 'nativeName': loc['nativeName'], 'groupId': 'gan', 'branchId': 'huaiyue', 'clusterId': 'huaiyue-localities', 'coordinates': loc['coordinates'], 'scope': scope,
        'source': {'title': source_title, 'url': source_url + '#page=' + str(rows[0]['pdfPage']), 'locator': f"Named settlement {loc['sourcePlaceName']}; printed pp262–268, tables2–5. Gan membership: Xu2022. Huai–Yue county alignment: Jing2025, county {classification['县编码']}, row {classification['jingRow']}. Geographic collection, not a new linguistic subdivision."},
        'aliases': [g['label'], loc['sourcePlaceName']],
        'geographySource': {'title': 'Wikidata · ' + g['label'], 'url': g['place'].replace('http:', 'https:'), 'locator': 'Exact Chinese settlement label and P131 county match; P625 approximate town anchor, retrieved 2026-10-09, CC0. Not a recording address or language boundary.'}})
assert len(words) == 106 and len(points) == 9
assert len(notes) == 18 and len(culture) == 18
head = '// Generated by scripts/import-gan-huaiyue.py; reviewed source rows in docs/gan-huaiyue-provenance.json.\n'
(ROOT / 'src/data/learning/gan-huaiyue.ts').write_text(head + 'import type { BranchLearning } from "./types";\nexport const ganHuaiyueLearning: BranchLearning[] = ' + json.dumps([{'branchId':'gan/huaiyue','words':words,'soundNotes':notes,'culture':culture,'resources':resources}], ensure_ascii=False, indent=2) + ';\n')
(ROOT / 'src/data/atlas/gan-huaiyue-localities.ts').write_text(head + 'import type { AtlasLocality } from "./types";\n/** Reuses the existing, explicitly geographic huaiyue-localities cluster. */\nexport const atlasGanHuaiyueLocalities: AtlasLocality[] = ' + json.dumps(points, ensure_ascii=False, indent=2) + ';\n')
print(f'{len(words)} character readings; {len(points)} settlement references; {len(ledger["rows"]) - len(words)} held; {len(notes)} sound notes; {len(culture)} cultural topics.')
