#!/usr/bin/env python3
"""Rebuild reviewed Wu2024 character readings; do not infer locality, tones or glosses."""
import argparse,hashlib,json,re
from pathlib import Path
root=Path(__file__).resolve().parents[1]
p=argparse.ArgumentParser();p.add_argument('--verify-pdf',type=Path);args=p.parse_args()
ledger=json.loads((root/'docs/xiang-comparative-provenance.json').read_text())
if args.verify_pdf:
 assert hashlib.sha256(args.verify_pdf.read_bytes()).hexdigest()==ledger['source']['sha256'],'PDF source checksum changed'
source=ledger['source'];url=source['url'];localities=ledger['localities'];packs={};points=[]
for key,loc in localities.items():
 if not loc['publish']: continue
 pack=packs.setdefault(loc['branchId'],{'branchId':loc['branchId'],'words':[],'soundNotes':[],'culture':[],'resources':[]})
 selected=[r for r in ledger['records'] if r['locality']==key]
 assert all(r['publicationStatus']=='published-study-reference' for r in selected)
 for r in selected:
  # These are typographic normalization rules explicitly licensed by source p100,
  # not a conversion from an unrelated orthography or a prediction of missing tones.
  segments=r['segments'].replace('h','ʰ').replace('\u0342','\u0303')
  assert re.fullmatch(r'[^0-9]+[1-8]',r['sourceForm'])
  assert r['han']==r['tableHeadword'] and '囗' not in r['han']
  assert r['toneNotation']=='source-category'
  assert r['sourceForm']==r['segments']+str(r['toneCategory'])
  register=' · colloquial' if r['register']=='colloquial' else ''
  qualification=f"{loc['name']} · Wu 2024 · character reading{register} · tone categories · settlement unspecified"
  annotations=[]
  if r['context']:annotations.append(r['context']+'.')
  if r['registerEvidencePage']:annotations.append(f"The author labels this alternative colloquial on p.{r['registerEvidencePage']}; the other alternative is not automatically labelled literary.")
  note=f"Source row {key}; {loc['priorSource']}, cited through Wu 2024. Original notation: {r['sourceForm']}. Baseline h is the source’s aspiration sign; displayed as IPA ʰ. Digits are source tone categories, not pitch contours. The source identifies a regional reference but supplies no exact speaker settlement here. This is a character identification, not an everyday-word translation. "+' '.join(annotations)
  pack['words'].append({'id':f"wu2024-{loc['localityId']}-t{r['table']}-c{r['column']}-a{r['alternative']}",'han':r['han'],'english':f"Character {r['han']}",'ipa':f"[{segments}{r['toneCategory']}]",'toneNotation':'source-category','localityId':loc['localityId'],'learningKind':'character-reading','reading':'Comparative character reading','registerLabel':qualification,'note':note.strip(),'source':{'title':f"Wu Jui-wen 2024 · p.{r['printedPage']}, table {r['table']}, {key} row, column {r['column']}",'url':url+f"#page={r['pdfPage']}"}})
 for culture in loc['culture']:
  pack['culture'].append({**culture,'localityIds':[loc['localityId']]})
  pack['resources'].append({'title':culture['title'],'description':culture['text'],'localityIds':[loc['localityId']],'kind':'Culture','url':culture['source']['url']})
 sourceRef={'title':'Wu Jui-wen 2024 · BCL 17:97–128','url':url}
 # Specific local contrasts chosen only from exact selected source cells.
 # Character comparisons do not establish an everyday lexical gloss.
 if key=='雙峰':
  sound={'title':'Two readings of 蝨','text':'The comparison gives [se2] and [sia2] for 蝨. Its following discussion identifies [sia2] as colloquial. The digits are tone categories; the unmarked alternative is not automatically a literary reading.'}
 elif key=='衡陽':
  sound={'title':'Two readings of 知','text':'Table 4 retains both [tsɿ1] and [tɕi1] for 知. Both belong to source category 1. The author gives no literary/colloquial label for this pair.'}
 elif key=='衡山':
  sound={'title':'Palatal stops in 張 and 章','text':'Table 11 gives [ȶõ1] for both 張 and 章, beside aspirated [ȶʰõ5] for 唱. HanLingo keeps the palatal stop and the nasal vowel; 1 and 5 are tone categories.'}
 elif key=='漵浦':
  sound={'title':'Aspiration in 紫 and 刺','text':'Table 2 gives 紫 as [tsɿ3] and 刺 as [tsʰɿ5]. The readings share the apical vowel [ɿ]; 刺 has an aspirated initial and a different source tone category. Categories 3 and 5 do not specify pitch contours.'}
 else:
  sound={'title':'Keep the vowel in 槍','text':'Table 11 records 槍 as [tɕʰiaɯ3] and 將 as [tɕiaɯ1]. Both readings contain [iaɯ]; 槍 has an aspirated initial. Their source tone categories are 3 and 1, with no pitch contours supplied.'}
 pack['soundNotes'].extend([{**sound,'localityIds':[loc['localityId']],'source':sourceRef},{'title':'Character reading and survey scope','text':f"These are {loc['name']} character readings attributed to {loc['priorSource']} in the 2024 comparison. The article does not identify the speaker settlement or recording date. Categories 1–8 describe the source’s tone classes; they do not provide pitch contours or connected-speech sandhi.",'localityIds':[loc['localityId']],'source':{'title':'Wu 2024 · source identities p.99; notation p.100','url':url+'#page=3'}}])
 pack['resources'].extend([{'title':f"{loc['name']} in the 2024 character comparison",'description':f"Exact {key} rows in tables 2–6, 8 and 10–13. Alternatives remain separate; blank cells and flagged substitutions are held out.",'localityIds':[loc['localityId']],'kind':'Study','url':url+'#page=4'},{'title':'Earlier study and transcription conventions','description':f"The article cites {loc['priorSource']}. Read pp.99–100 for source identities, aspiration and the category-number key; the bibliography appears on pp.124–125.",'localityIds':[loc['localityId']],'kind':'Study','url':url+'#page=3'}])
 if loc['createAtlasReference']: points.append({'id':loc['localityId'],'name':loc['name'],'nativeName':loc['nativeName'],'groupId':'xiang','branchId':loc['branch'],'clusterId':loc['clusterId'],'coordinates':loc['coordinates'],'scope':loc['sourceIdentity']+' This is the named literature reference used by Wu 2024, not a claim of uniform city/county speech. The administrative map anchor is not the speaker or recording location.','source':{'title':'Wu Jui-wen 2024 · named Xiang references','url':url+'#page=3','locator':f"p.99: {key} from {loc['priorSource']}. Categories and aspiration conventions: p.100. Specific settlement and collection date not supplied. Classification: Jing 2025 county data, code 430400 衡阳市, 湘语 / 衡州片 / 衡阳小片 (doi:10.5281/zenodo.15897647)."},'aliases':[key,loc['nativeName']+' 文獻讀音'],'geographySource':loc['geographySource']})
wordCount=sum(len(x['words']) for x in packs.values());assert wordCount==ledger['review']['publicationCounts']['readings']
(root/'src/data/learning/xiang-comparative.ts').write_text('// Reviewed character identifications, not translated everyday vocabulary. See docs/XIANG-COMPARATIVE-SOURCES.md.\nimport type { AttestedWord, BranchLearning } from "./types";\ntype CharacterReadingPack = Omit<BranchLearning, "words"> & { words: (AttestedWord & { learningKind: "character-reading" })[] };\nexport const xiangComparativeLearning: CharacterReadingPack[] = '+json.dumps(list(packs.values()),ensure_ascii=False,indent=2)+';\n')
(root/'src/data/atlas/xiang-reading-localities.ts').write_text('// Source-named literature references; administrative anchors are not speaker locations.\nimport type { AtlasLocality } from "./types";\nexport const atlasXiangReadingLocalities: AtlasLocality[] = '+json.dumps(points,ensure_ascii=False,indent=2)+';\n')
print(json.dumps({'localities':len(points),'branches':len(packs),'readings':wordCount,'heldCells':len(ledger['held'])},ensure_ascii=False))
