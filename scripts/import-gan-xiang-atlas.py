#!/usr/bin/env python3
"""Rebuild the reviewed Gan/Xiang atlas release from its source ledger; no inference.
Use --verify-sources to compare exact CSV rows, classifications and georeferences.
"""
from pathlib import Path
import json,sys,csv,hashlib
root=Path(__file__).resolve().parents[1]
ledger=json.loads((root/'docs/gan-xiang-atlas-provenance.json').read_text())
points=ledger['coreReferences']+[r['point'] for r in ledger['localities']]
clusters=ledger['clusters'];keys={(c['groupId'],c['branchId'],c['id']) for c in clusters}
assert len(points)==115 and len({p['id'] for p in points})==115
assert len({(c['groupId'],c['branchId']) for c in clusters})==14
for p in points:assert (p['groupId'],p['branchId'],p['clusterId']) in keys
if '--verify-sources' in sys.argv:
 cache=root/'.evidence/atlas-1000'
 for file,sha in ledger['sources'].items():assert hashlib.sha256((cache/file).read_bytes()).hexdigest()==sha,file
 rows=list(csv.DictReader((cache/'jing-county.csv').open(),delimiter='\t'))
 for record in ledger['localities']:
  assert rows[record['jingRow']-2]==record['jing']
  assert record['jing']['县编码']==record['qin']['AdCode']==record['code']
  assert record['jing']['方言片']==record['qin']['方言片/语种']
  assert record['qin']['方言区/语支']=={'gan':'赣','xiang':'湘'}[record['point']['groupId']]
  assert record['wikidata']['code']['value'].replace(' ','')==record['code']
  coordinates=[float(n) for n in record['wikidata']['coord']['value'].removeprefix('Point(').removesuffix(')').split()]
  assert coordinates==record['point']['coordinates']
  assert record['point']['name']==record['wikidata']['itemLabel']['value']
header='// County facts: Jing2025 CC BY4.0; georeferences: Wikidata CC0. See docs/GAN-XIANG-SOURCES.md.\nimport type { AtlasCluster, AtlasLocality } from "./types";\n'
(root/'src/data/atlas/gan-xiang.ts').write_text(header+'export const atlasGanXiangClusters: AtlasCluster[] = '+json.dumps(clusters,ensure_ascii=False,indent=2)+';\n\nexport const atlasGanXiangLocalities: AtlasLocality[] = '+json.dumps(points,ensure_ascii=False,indent=2)+';\n')
print(f'Rebuilt {len(points)} Gan/Xiang references and {len(clusters)} clusters across14 branches.')
