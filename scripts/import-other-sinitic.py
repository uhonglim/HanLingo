#!/usr/bin/env python3
"""Rebuild the reviewed Liu 2007 lexical subset from pinned CC BY 4.0 data.
Run from any directory. Missing public source files are downloaded once; every
source is SHA-256 checked before generating the owned learning export/ledger.
"""
import csv, json, pathlib, re, hashlib, collections, urllib.request
R=pathlib.Path(__file__).resolve().parents[1]
base=R/'.evidence/min-expansion-2026'
base.mkdir(parents=True, exist_ok=True)
commit='54f6742d9fa60315ae41b91d0d1e02f04036efb5'
repo='https://github.com/lexibank/liusinitic'
url=repo+'/blob/'+commit+'/cldf/forms.csv'
EXPECTED={'forms': '7496caf7dd62373791d700c0eb05e154ed7f8d7f9c8a41fb5a9b060a07c70fca', 'parameters': '6ea8a355d2dec1090010b6c2f77e806bf73b6231061be7dcf693721e8cf3d11d', 'languages': '4e796ba750c9e93e86c2398a8bc4199b6501888b181276ca2c46de13575ccec0', 'sources': 'f235e5f01e749761e40e9d9b56ea80899714bac80e79c8612f3698b1f0bcd783'}
for name,digest in EXPECTED.items():
 ext='bib' if name=='sources' else 'csv'
 path=base/f'liusinitic-cldf_{name}.{ext}'
 if not path.exists():
  remote=f'https://raw.githubusercontent.com/lexibank/liusinitic/{commit}/cldf/{name}.{ext}'
  with urllib.request.urlopen(remote, timeout=60) as response:
   raw=response.read()
  if hashlib.sha256(raw).hexdigest()!=digest:
   raise SystemExit(f'Source hash mismatch: {remote}')
  path.write_bytes(raw)
 if hashlib.sha256(path.read_bytes()).hexdigest()!=digest:
  raise SystemExit(f'Source hash mismatch: {path}')
forms=list(csv.DictReader((base/'liusinitic-cldf_forms.csv').open()));params={x['ID']:x for x in csv.DictReader((base/'liusinitic-cldf_parameters.csv').open())}
places=[('Taiyuan','taiyuan-jin','jin/bingzhou'),('Jixi','jixi-hui','hui/jishe'),('Guilin','guilin-pinghua','pinghua/northern-pinghua')]
CULTURE={
 'taiyuan-jin':[
  {'title':'Bronzes at Shanxi Museum','text':'The museum in Taiyuan displays bronzes alongside porcelain, stone carving and Buddhist sculpture. Its bird-shaped Jin marquis vessel connects an animal form with the ritual vessels of early Jin history. This is museum context, not evidence for an ancient pronunciation.','localityIds':['taiyuan-jin'],'source':{'title':'National Museum of China · Shanxi Museum collections','url':'https://www.chnmuseum.cn/portals/0/web/zt/gmdc2022/detail.html?id=8'}},
  {'title':'Opera and merchant culture','text':'Shanxi Museum’s permanent themes include the history of opera and Shanxi merchants. They offer two ways into the region’s performance and commercial culture from a museum visit in Taiyuan; neither is exclusive to one modern Jin accent.','localityIds':['taiyuan-jin'],'source':{'title':'National Museum of China · Shanxi Museum exhibitions','url':'https://www.chnmuseum.cn/portals/0/web/zt/gmdc2022/detail.html?id=8'}}],
 'jixi-hui':[
  {'title':'A shared pot from Shangzhuang','text':'Jixi’s local food guide describes yipin guo as a layered shared pot associated with Shangzhuang. The dish provides county cultural context; it does not locate the speakers behind the Jixi word survey in that town.','localityIds':['jixi-hui'],'source':{'title':'Jixi County Government · Huizhou food culture','url':'https://www.cnjx.gov.cn/OpennessContent/show/3035087.html'}},
  {'title':'Ink and carved surfaces','text':'Jixi’s craft venues include the Hu Kaiwen ink factory and the carving traditions presented around Shangzhuang. Ink-making and wood, brick and stone carving connect the county’s workshops with writing and household architecture.','localityIds':['jixi-hui'],'source':{'title':'Jixi County Government · ink-making and Huizhou crafts','url':'https://www.cnjx.gov.cn/OpennessContent/show/3797084.html'}}],
 'guilin-pinghua':[
  {'title':'Rice noodles and brine','text':'Guilin rice noodles are briefly warmed, drained and served with a seasoned brine and toppings. The national heritage record describes the craft across the wider Guilin area; the food belongs to city life across several language communities.','localityIds':['guilin-pinghua'],'source':{'title':'China Intangible Cultural Heritage Museum · Guilin rice-noodle making','url':'https://www.ihchina.cn/Article/Index/detail?id=23596'}},
  {'title':'Blue-and-white meiping','text':'Ming-period meiping vessels from the Jingjiang princely tombs are an important part of Guilin’s archaeological record. Their painted surfaces and funerary use offer a different view of the region from its familiar river landscapes.','localityIds':['guilin-pinghua'],'source':{'title':'National Museum of China · meiping and the Jingjiang tomb finds','url':'https://www.chnmuseum.cn/zp/zpml/201812/t20181218_23828.shtml'}}],
}
HOLDS={
 'Jixi-39_give-1':'Missing-character placeholder 囗; no written headword established.',
 'Jixi-185_stand-1':'乃豈 may encode a decomposed rare character; one syllable, unresolved notation.',
 'Taiyuan-100_throw-1':'Source character 仍 contradicts throw gloss; possible typo, not silently corrected.',
 'Taiyuan-67_near-1':'Source character 進 contradicts near gloss; possible typo, not silently corrected.',
 'Jixi-67_near-1':'Source character 進 contradicts near gloss; possible typo, not silently corrected.',
}
packs=[];ledger=[];rejected={}
for name,locality,branch in places:
 words=[];seen=set();bad=collections.Counter()
 for line,x in enumerate(forms,2):
  if x['Language_ID']!=name:continue
  if x['ID'] in HOLDS:bad['peer-review character hold']+=1;continue
  if x['Comment'] or x['Value']!=x['Form']:bad['annotated or edited form']+=1;continue
  han=x['Chinese_Characters'].replace(' ','')
  if not han or '囗' in han or any(not '\u3400'<=c<='\u9fff' for c in han):bad['unresolved written form']+=1;continue
  v=x['Value']
  if 'ᴀ' in v:bad['unsupported source vowel ᴀ']+=1;continue
  syl=re.findall('[^⁰¹²³⁴⁵⁶⁷⁸⁹\\s]+[¹²³⁴⁵]{1,3}',v)
  if ''.join(syl)!=v.replace(' ','') or re.search('[⁰⁶⁷⁸⁹⁻*?/()[\\]{}]',v):bad['tone transition, neutral tone or marked reading']+=1;continue
  if x['Parameter_ID'] in seen:bad['additional alternative']+=1;continue
  seen.add(x['Parameter_ID']);ipa='['+' '.join(syl)+']';english=params[x['Parameter_ID']]['Name'];english={'mather':'mother','rightside':'right side','leftside':'left side','live(alive)':'live; be alive'}.get(english,english)
  word=dict(id='liu2007-'+x['ID'],han=han,english=english,ipa=ipa,toneNotation='pitch-contour',localityId=locality,reading='Published lexical survey',registerLabel=(name+' · '+('Pinghua reference in Liu 2007 · ' if name=='Guilin' else '')+'CLDF transcription · collection date unspecified'),note='Preserves the published dataset’s Value and Chinese_Characters fields. CLDF editors standardized transcription from Liu et al. 2007; these are not new recordings. Speaker age and collection date are unspecified. No connected-speech form is generated.',source={'title':'Liu, Wang & Bai 2007 · '+x['ID']+' · CC BY 4.0','url':url+'#L'+str(line)})
  words.append(word);ledger.append(dict(id=word['id'],row=line,sourceValue=v,sourceCharacters=x['Chinese_Characters'],localityId=locality))
 source={'title':'Liu, Wang & Bai · Collection of basic vocabulary in Chinese dialects, 2007','url':repo+'/tree/'+commit}
 short=words[:3];examples='; '.join(f"{w['han']} ‘{w['english']}’ {w['ipa']}" for w in short)
 notes=[{'title':'Three local words','text':examples+'. These forms belong to the '+name+' entry in the same published survey, so the local words can be compared without replacing their source pronunciation.','localityIds':[locality],'source':source},{'title':'Read the complete syllable','text':'Pitch digits in this collection follow the source’s supplied pitch values. Retain aspiration, vowel quality and any final consonant as well as pitch. A word’s tone in a phrase can differ from the form listed here; no sandhi has been generated.','localityIds':[locality],'source':source},{'title':'A dated lexical reference','text':'This collection was published in 2007. It records local written forms and lexical choices rather than assigning each Mandarin word an automatic pronunciation. The dataset does not provide recordings or a single accent for every resident.','localityIds':[locality],'source':source}]
 if name=='Guilin':notes.append({'title':'Pinghua is a separate Guilin reference','text':'The dataset authors explicitly report that Liu 2007 assigns this Guilin sample to Pinghua, while noting its strong lexical similarity to Mandarin. This is that source-specific reference, not all Guilin speech and not an identified Chaoyang or Yanshan village sample.','localityIds':[locality],'source':{'title':'Wu et al. 2023 · source-specific Guilin classification','url':'https://doi.org/10.1163/22105832-bja10023'}})
 packs.append(dict(branchId=branch,words=words,soundNotes=notes,culture=CULTURE[locality],resources=[{'title':name+' local word survey','description':'Published 2007; exact readings and local Chinese forms with record identifiers. The source includes forms that need further review and are not imported here.','localityIds':[locality],'kind':'Dictionary','url':url},{'title':'Survey identity and transcription sources','description':'Check the locality record, source bibliography and the CC BY 4.0 dataset before comparing this reference with another study.','localityIds':[locality],'kind':'Study','url':repo+'/tree/'+commit}]))
 rejected[locality]=dict(bad)
(R/'src/data/learning/other-sinitic.ts').write_text('// Source: Liu et al. 2007, Lexibank CLDF, CC BY 4.0. Exact values; see docs/OTHER-SINITIC-SOURCES.md.\nimport type { BranchLearning } from "./types";\n\nexport const otherSiniticLearning: BranchLearning[] = '+json.dumps(packs,ensure_ascii=False,indent=2)+';\n')
(R/'docs/other-sinitic-lexical-provenance.json').write_text(json.dumps(dict(commit=commit,source=url,hashes={p.name:hashlib.sha256(p.read_bytes()).hexdigest() for p in [base/f'liusinitic-cldf_{name}.{"bib" if name=="sources" else "csv"}' for name in EXPECTED]},records=ledger,rejected=rejected,peerReviewHolds=HOLDS),ensure_ascii=False,indent=2))
print([(p['branchId'],len(p['words'])) for p in packs])
