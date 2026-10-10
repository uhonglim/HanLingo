#!/usr/bin/env python3
"""Generate reviewed Gan tone inventories and locality references from the audited ledger.
The ledger is a manual, image-checked transcription, not automatic word extraction.
Held source labels/coordinates are never emitted. No phonetic material is invented.
"""
import json,pathlib,re
R=pathlib.Path(__file__).resolve().parents[1]
data=json.loads((R/'docs/gan-tone-provenance.json').read_text())
ready=[r for r in data['inventories'] if r['reviewStatus']=='visually-checked']
assert len({r['localityId'] for r in ready})==len(ready)
source=data['source']; title='Zhang Yongsheng 张勇生 & Wang Jie 王洁 2022 · 鄂东南赣语的声调类型及其演变'
classification={'title':title,'url':source['url']+'#page=100','locator':'Printed pp 94–100, Tables 3–10. Historical Da–Tong branch scope; county collections are geographic, not linguistic subdivisions. CC BY 4.0.'}
clusters={};places=[];inventories=[]
for r in ready:
 assert r['coordinates'] and len(r['tones'])==r['citationToneCount']
 assert len({t['sourceLabel'] for t in r['tones']})==len(r['tones'])
 assert all(re.fullmatch('[1-5]{1,3}',t['pitchContour']) for t in r['tones'])
 assert r['geography']['maxSpreadKm']<=2
 cid=r['clusterId']
 if cid not in clusters:
  clusters[cid]={'id':cid,'groupId':'gan','branchId':'datong','branchName':'Da–Tong Gan','branchNativeName':'大通片','name':r['countyName']+' area','nativeName':('赤壁' if r['countyInStudy']=='蒲圻' else r['countyInStudy'])+'一帶','kind':'geographic','description':'A geographic collection of named study towns. These county-area labels are not proposed linguistic subdivisions.','source':classification}
 placeSource={'title':title,'url':source['url']+'#page='+str(r['pdfPage']),'locator':f"Printed p{r['printedPage']}, Table {r['table']}; named town {r['town']}. Collection date and speaker demographics unspecified."}
 geo={'title':'Wikidata · '+r['geography']['label'],'url':r['geography']['entity'],'locator':'P625 coordinate and P131 county identity, retrieved 2026-10-09; CC0. Approximate town anchor, not a recording address or language boundary.'}
 places.append({'id':r['localityId'],'name':r['displayName'],'nativeName':r['town'],'groupId':'gan','branchId':'datong','clusterId':cid,'coordinates':r['coordinates'],'scope':f"{r['town']} in the study’s {r['countyInStudy']} area. The 2022 paper supplies this named town’s citation-tone inventory, not a uniform county accent or a word list. Its sampling date and speaker details are unspecified; local place-name IPA remains uncollected.",'source':placeSource,'geographySource':geo,'aliases':[r['geography']['label'],r['countyInStudy']+r['town']]})
 note='Named-town citation tones in a 2022 publication; collection date, speaker demographics and recordings are unspecified. These contours describe tone categories, not complete syllables or connected speech.'
 if r['countyInStudy']=='蒲圻':note+=' The paper uses Puqi, renamed Chibi in 1998.'
 if any(t['sourceLabel'] == '全入' for t in r['tones']):note+=' 全入 and 次入 follow the source’s onset-based checked-tone divisions; they are not yin/yang labels.'
 if r['town']=='大幕':note+=' In Damu, the historical checked category has merged with yang departing.'
 inventories.append({'id':'zhang-wang2022-'+r['localityId'],'localityId':r['localityId'],'sourcePlaceName':r['town'],'tones':[{'category':t['sourceLabel'],'contour':t['pitchContour']} for t in r['tones']],'source':{'title':title,'url':source['url']+'#page='+str(r['pdfPage']),'page':r['printedPage'],'table':r['table']},'note':note})
learning='''// Image-checked named-town tone inventories, CC BY 4.0; see docs/GAN-TONE-INVENTORIES.md.
import type { CitationToneInventory } from './tone-types';
export const ganToneInventories: CitationToneInventory[] = '''+json.dumps(inventories,ensure_ascii=False,indent=2)+';\n'
(R/'src/data/learning/gan-tone-inventories.ts').write_text(learning)
atlas='''// Named study towns; separate Wikidata geographic anchors. See docs/GAN-TONE-INVENTORIES.md.
import type { AtlasCluster, AtlasLocality } from './types';
export const atlasGanToneClusters: AtlasCluster[] = '''+json.dumps(list(clusters.values()),ensure_ascii=False,indent=2)+';\n\nexport const atlasGanToneLocalities: AtlasLocality[] = '+json.dumps(places,ensure_ascii=False,indent=2)+';\n'
(R/'src/data/atlas/gan-tone-localities.ts').write_text(atlas)
print(len(places),'places',len(clusters),'geographic clusters',len(inventories),'inventories',sum(len(i['tones']) for i in inventories),'tones')
