#!/usr/bin/env python3
"""Rebuild the reviewed county-reference release from its factual provenance ledger.

Selection is deliberately reviewed, not expanded by guessing neighbouring accents.
The ledger retains source rows, exact coordinates, common-name source, and rank mapping.
Raw source checksums and retrieval instructions live in docs/ATLAS-1000-SOURCES.md.
"""
import json
from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]
ledger = json.loads((ROOT / 'docs/atlas-county-provenance.json').read_text())
rows = ledger['localities']
assert len(rows) == 692
assert len({r['code'] for r in rows}) == len(rows)
assert len({r['wikidata'] for r in rows}) == len(rows)
output = []
for r in rows:
    assert r['source']['countyCode'] == r['code'] == r['geographyCode']
    assert r['source']['branch'] == r['crosscheck']['branch']
    assert all(isinstance(v, (float, int)) for v in r['coordinates'])
    output.append({k:r[k] for k in ['id','code','name','nativeName','groupId','branchId','clusterId','coordinates','wikidata','province','prefecture','source','mappingNote']})
(ROOT / 'src/data/atlas/county-localities.json').write_text(json.dumps(output, ensure_ascii=False, indent=2) + '\n')
clusters=[]
for filename in ['mandarin-clusters.json','newClusters.json']:
    for c in json.loads((ROOT/'scripts/data/atlas-counties'/filename).read_text()):
        if any((r['groupId'],r['branchId'],r['clusterId']) == (c['groupId'],c['branchId'],c['id']) for r in rows):
            clusters.append(c)
(ROOT / 'src/data/atlas/county-clusters.json').write_text(json.dumps(clusters, ensure_ascii=False, indent=2) + '\n')
print(f'Rebuilt {len(output)} locality references and {len(clusters)} sourced classification/geographic nodes.')

# Optional raw-source verification, using the downloaded files rather than the app output.
import sys, hashlib, csv
if '--verify-sources' in sys.argv:
    cache = ROOT / '.evidence/atlas-1000'
    for filename, sha in ledger['rawChecksums'].items():
        assert hashlib.sha256((cache/filename).read_bytes()).hexdigest() == sha, filename
    source = list(csv.DictReader((cache/'jing-county.csv').open(encoding='utf-8-sig'), delimiter='\t'))
    geo = json.loads((cache/'wikidata-counties.json').read_text())['results']['bindings']
    for row in rows:
        raw = source[row['source']['row'] - 2]
        assert raw['县编码'] == row['code'] and raw['县'] == row['nativeName']
        for rawkey, key in [('方言大区','group'),('方言区','region'),('方言片','branch'),('方言小片','cluster')]:
            assert raw[rawkey] == row['source'][key], (row['code'], key)
        point = next(g for g in geo if g['item']['value'].endswith('/'+row['wikidata']))
        assert point['code']['value'].replace(' ','') == row['code']
        assert point['itemLabel']['value'] == row['name']
        assert point['coord']['value'] == 'Point('+' '.join(str(v) for v in row['coordinates'])+')'
    print('All 692 source rows, identifiers, names and coordinates match the checksum-pinned source snapshots.')
