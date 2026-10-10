#!/usr/bin/env python3
"""Rebuild curated Min character-reading packs from the pinned Sinica PDM XLSX archive.
No pronunciation, tone, sandhi, or local lexical choice is inferred. Python standard library only.
Run: python3 scripts/import-min-sinica.py [path/to/ccr10_minyu_data_xlsx.zip]
"""
import collections, hashlib, io, json, pathlib, re, sys, urllib.request, zipfile
import xml.etree.ElementTree as ET

ROOT = pathlib.Path(__file__).resolve().parents[1]
ARCHIVE_URL = 'https://xiaoxue.iis.sinica.edu.tw/ccrdata/file/ccr10_minyu_data_xlsx.zip'
LANDING = 'https://xiaoxue.iis.sinica.edu.tw/ccrdata/'
PIN = '4d849388c03b7a537e58d3c9ed4fa0ddb90566c0c48d909a5b7880d0950e8fed'
# The gloss identifies the written character; it is not a claim about local everyday word choice.
GLOSSES = dict(line.split('=', 1) for line in '''水=water
火=fire
米=rice
魚=fish
茶=tea
鹽=salt
糖=sugar
飯=cooked rice; meal
肉=meat
菜=vegetables
油=oil
酒=wine; alcohol
湯=soup
餅=cake; biscuit
豆=bean
瓜=melon
果=fruit
梨=pear
桃=peach
梅=plum
李=plum
橘=tangerine
薑=ginger
葱=scallion
椒=pepper
醋=vinegar
甜=sweet
苦=bitter
酸=sour
辣=spicy
鹹=salty
食=eat
飲=drink
吞=swallow
煮=cook; boil
炒=stir-fry
蒸=steam
煎=pan-fry
人=person
男=male; man
女=female; woman
父=father
母=mother
兄=elder brother
弟=younger brother
姊=elder sister
妹=younger sister
兒=child
子=child; son
孫=grandchild
姑=paternal aunt
姨=maternal aunt
叔=uncle
伯=elder uncle
家=home; family
姓=surname
名=name
我=I; me
你=you
手=hand
腳=foot; leg
足=foot
頭=head
面=face
目=eye
眼=eye
耳=ear
鼻=nose
口=mouth
嘴=mouth; beak
牙=tooth
齒=tooth
舌=tongue
心=heart
肝=liver
肺=lung
血=blood
骨=bone
皮=skin
毛=hair; fur
肉=meat; flesh
背=back
腹=belly
肩=shoulder
腰=waist
膝=knee
痛=pain
病=illness
藥=medicine
醫=doctor; heal
天=sky; heaven
地=earth; ground
日=sun; day
月=moon; month
星=star
雲=cloud
風=wind
雨=rain
雪=snow
霜=frost
霧=fog
雷=thunder
電=electricity; lightning
光=light
影=shadow
山=mountain
海=sea
河=river
江=river
湖=lake
溪=stream
泉=spring
井=well
田=field
土=soil; earth
沙=sand
石=stone
泥=mud
路=road
橋=bridge
島=island
岸=bank; shore
樹=tree
木=wood; tree
林=woods
森=forest
花=flower
草=grass
葉=leaf
根=root
枝=branch
竹=bamboo
松=pine
馬=horse
牛=cattle
羊=sheep; goat
豬=pig
狗=dog
犬=dog
貓=cat
雞=chicken
鴨=duck
鵝=goose
鳥=bird
蟲=insect
蛇=snake
鼠=rat; mouse
虎=tiger
兔=rabbit
鹿=deer
猴=monkey
蝦=shrimp
蟹=crab
貝=shellfish
蚌=clam
蠶=silkworm
蜂=bee
蝶=butterfly
蚊=mosquito
蟻=ant
屋=house
房=room; house
門=door
窗=window
牆=wall
床=bed
桌=table
椅=chair
凳=stool
燈=lamp
碗=bowl
杯=cup
盤=plate
瓶=bottle
桶=bucket
刀=knife
針=needle
線=thread
布=cloth
衣=clothing
衫=shirt
褲=trousers
鞋=shoe
襪=sock
帽=hat
傘=umbrella
船=boat
車=vehicle
錢=money
銀=silver
金=gold
鐵=iron
銅=copper
紙=paper
筆=writing brush; pen
墨=ink
書=book
字=written character
學=study; learn
讀=read
寫=write
畫=draw; painting
聽=listen
講=speak
說=speak; say
問=ask
答=answer
見=see
看=look; watch
知=know
想=think
笑=laugh
哭=cry
唱=sing
叫=call; shout
來=come
去=go
行=walk; travel
走=walk; run
跑=run
坐=sit
站=stand
立=stand
睡=sleep
眠=sleep
醒=wake
起=rise
入=enter
出=exit
開=open
關=close
買=buy
賣=sell
拿=take; hold
放=put; release
給=give
借=borrow; lend
還=return
等=wait
洗=wash
掃=sweep
擦=wipe
穿=wear
脫=take off
推=push
拉=pull
打=hit
踢=kick
抱=hold in the arms
一=one
二=two
三=three
四=four
五=five
六=six
七=seven
八=eight
九=nine
十=ten
百=hundred
千=thousand
萬=ten thousand
年=year
時=time; hour
分=divide; minute
秒=second
春=spring
夏=summer
秋=autumn
冬=winter
早=early
晚=late; evening
夜=night
今=now; present
昨=yesterday; past
明=bright; next
新=new
舊=old; former
老=old
少=few; young
多=many; much
大=big
小=small
長=long
短=short
高=high; tall
低=low
深=deep
淺=shallow
厚=thick
薄=thin
重=heavy
輕=light in weight
好=good
壞=bad; broken
冷=cold
熱=hot
暖=warm
涼=cool
乾=dry
濕=wet
快=fast
慢=slow
遠=far
近=near
滿=full
空=empty
黑=black
白=white
紅=red
黃=yellow
青=blue-green
綠=green
藍=blue
圓=round
方=square; direction
直=straight
橫=horizontal
東=east
西=west
南=south
北=north
上=up; above
下=down; below
前=front; before
後=back; after
左=left
右=right
內=inside
外=outside
中=middle
邊=edge; side
近=near'''.splitlines())
# Source workbook labels remain exact in the ledger. Do not match similar city names.
PLACES = [
 (235,'leizhou','leizhou-min','Leicheng'),
 (236,'xianyou','puxian','Xianyou town'), (237,'putian','puxian','Putian'),
 (238,'gutian','eastern-min','Gutian'), (240,'fuzhou','eastern-min','Fuzhou'),
 (241,'fuqing','eastern-min','Fuqing'), (242,'zherong','eastern-min','Zherong'),
 (243,'fuan','eastern-min','Fu’an'), (244,'ningde','eastern-min','Ningde'),
 (245,'wuyishan','northern-min','Chong’an town'),
 (247,'jianyang-min','northern-min','Tancheng, Jianyang'),
 (248,'songxi','northern-min','Songxi'), (249,'jianou','northern-min','Jian’ou'),
 (251,'shaxian','central-min','Shaxian town'),
 (258,'bangkok-teochew','southern-min','Bangkok Teochew'),
]
CORE = list('水火米魚茶鹽糖飯肉菜油酒湯餅豆食飲甜苦酸人男女父母兄弟姊妹子孫家手腳頭面目眼耳鼻口牙舌心血骨皮天日月星雲風雨雪山海河田土石路橋樹花草葉竹馬牛羊豬狗貓雞鴨鳥蛇鼠屋門窗床桌椅燈碗杯刀衣衫鞋帽船車錢書字紙筆學讀寫聽講問見看知笑哭唱來去行走坐立睡起入出開關買賣洗穿推拉一二三四五六七八九十百千年春夏秋冬早晚夜新舊大小長短高低多少好壞冷熱乾濕快慢遠近黑白紅黃青東西南北上下前後左右內外中')
ORDER = list(dict.fromkeys(CORE + list(GLOSSES)))
LIMIT = 100
# Source row 245 雞 and adjacent variant 鷄 disagree (l/k) in sheet235.
# Hold the doubtful lesson rather than silently correcting the database.
HELD = {(235, '雞'): 'Source 雞 [loi213] conflicts with adjacent variant 鷄 [koi213]; needs primary-dictionary review.'}
NS = {'x': 'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}
def read_xlsx(data):
 with zipfile.ZipFile(io.BytesIO(data)) as z:
  strings = []
  if 'xl/sharedStrings.xml' in z.namelist():
   root = ET.fromstring(z.read('xl/sharedStrings.xml'))
   strings = [''.join(n.itertext()) for n in root.findall('x:si', NS)]
  root = ET.fromstring(z.read('xl/worksheets/sheet1.xml'))
  rows=[]
  for row in root.findall('x:sheetData/x:row', NS):
   vals=['']*7
   for c in row.findall('x:c',NS):
    col=ord(re.match('[A-Z]+',c.attrib['r'])[0])-ord('A')
    if col>=7: raise ValueError('Unexpected worksheet column')
    v=c.find('x:v',NS)
    if c.get('t')=='inlineStr': value=''.join(c.find('x:is',NS).itertext())
    elif v is None:value=''
    elif c.get('t')=='s':value=strings[int(v.text)]
    else:value=v.text or ''
    vals[col]=value
   rows.append((int(row.attrib['r']),vals))
  if rows[0][1] != ['字號','字','聲母','韻母','調值','調類','備註']:raise ValueError('Changed spreadsheet columns')
  return rows[1:]

def main():
 archive=pathlib.Path(sys.argv[1]) if len(sys.argv)>1 else ROOT/'.evidence/min-expanded-readings/sinica-min.zip'
 if not archive.exists():
  archive.parent.mkdir(parents=True,exist_ok=True)
  urllib.request.urlretrieve(ARCHIVE_URL,archive)
 data=archive.read_bytes()
 if hashlib.sha256(data).hexdigest()!=PIN:raise ValueError('Source archive changed: review before updating pin')
 packs=[];ledger=[];rejected={}
 with zipfile.ZipFile(io.BytesIO(data)) as z:
  for number,locality,branch,label in PLACES:
   filename=next(n for n in z.namelist() if n.startswith(str(number)+' '))
   sourcebytes=z.read(filename);raw=read_xlsx(sourcebytes)
   byhan=collections.defaultdict(list)
   for row,vals in raw:byhan[vals[1]].append((row,vals))
   selected=[];reasons=collections.Counter()
   for han in ORDER:
    if han not in GLOSSES: continue
    gloss=GLOSSES[han]
    if (number,han) in HELD:
     reasons['held source inconsistency']+=1;continue
    candidates=byhan.get(han,[])
    if len(candidates)!=1: reasons['missing or multiple source rows']+=1;continue
    row,vals=candidates[0];sid,char,onset,rime,pitch,category,note=vals
    if note:reasons['annotated reading needs individual review']+=1;continue
    if not onset or not rime or not re.fullmatch('[1-5]{1,3}',pitch):reasons['missing or non-simple pitch']+=1;continue
    if any(re.search(r'[/()\[\]{}?，,;；\s]',v) for v in [onset,rime,category]):reasons['multiple or marked reading needs individual review']+=1;continue
    segments=('' if onset=='0' else onset)+rime
    if re.search('[0-9]',segments):raise ValueError('Unexpected digit in segments')
    ipa='['+segments+pitch+']'
    selected.append([int(sid),row,char,gloss,ipa,category])
    ledger.append({'localityId':locality,'workbook':filename,'workbookSha256':hashlib.sha256(sourcebytes).hexdigest(),'row':row,'sourceId':sid,'han':char,'initial':onset,'rime':rime,'pitch':pitch,'toneCategory':category,'note':note})
    if len(selected)==LIMIT:break
   packs.append({'sourceNumber':number,'localityId':locality,'branchId':'min/'+branch,'label':label,'workbook':filename,'rows':selected})
   rejected[locality]=dict(reasons)
 lines=['// Generated by scripts/import-min-sinica.py; source factual data: Public Domain Mark 1.0.',
        '// Character readings, not lexical translations or new recordings. See docs/MIN-SINICA-READINGS.md.',
        'import type { BranchLearning } from "./types";',
        'type ReadingRow = [number, number, string, string, string, string];',
        'type PlaceRows = { sourceNumber: number; localityId: string; branchId: string; label: string; workbook: string; rows: ReadingRow[] };',
        'const places: PlaceRows[] = [']
 for p in packs:
  meta={k:v for k,v in p.items() if k!='rows'}
  lines.append('  { ...'+json.dumps(meta,ensure_ascii=False)+', rows: [')
  lines += ['    '+json.dumps(row,ensure_ascii=False)+',' for row in p['rows']]
  lines.append('  ] },')
 lines.append('];')
 lines.append(r'''
const sourceUrl = "https://xiaoxue.iis.sinica.edu.tw/ccrdata/";
export const minExpandedReadings: BranchLearning[] = places.map(place => {
  const source = { title: `Academia Sinica 小學堂 · ${place.workbook}`, url: sourceUrl };
  const example = (row: ReadingRow) => `${row[2]} ${row[4]}`;
  const first = place.rows[0];
  const second = place.rows.find(row => row[4].replace(/[1-5]+\]$/, "]") !== first[4].replace(/[1-5]+\]$/, "]")) ?? place.rows[1];
  const tonePair = place.rows.flatMap((a, index) => place.rows.slice(index + 1).filter(b =>
    a[4] !== b[4] && a[4].replace(/[1-5]+\]$/, "]") === b[4].replace(/[1-5]+\]$/, "]")
  ).map(b => [a, b] as const))[0];
  return {
    branchId: place.branchId,
    words: place.rows.map(([id, row, han, , ipa, category]) => ({
      id: `sinica-min-${place.sourceNumber}-${id}`, han, english: `Character ${han}`, ipa,
      learningKind: "character-reading" as const,
      toneNotation: "pitch-contour" as const, localityId: place.localityId,
      reading: "Dictionary character reading",
      registerLabel: `${place.label} · character reading`,
      note: `This source supplies a written character and its pronunciation, not an attested local lexical meaning. Source tone category: ${category}; displayed digits come from the separate pitch-value column. No connected-speech or sandhi form is inferred.`,
      source: { title: `${source.title} · row ${row}, character ID ${id}`, url: sourceUrl },
    })),
    soundNotes: [
      {
        title: "Start with two local readings",
        text: `${example(first)} and ${example(second)} are separate entries in the ${place.label} sheet. Follow each complete syllable, including its supplied pitch digits; the shared HanLingo spelling below the IPA follows the same key used everywhere on the site.`,
        localityIds: [place.localityId], source,
      },
      ...(tonePair ? [{
        title: "Same segments, different pitch",
        text: `${example(tonePair[0])} and ${example(tonePair[1])} have the same segments in this ${place.label} source, but different pitch values. Keep both readings: their shared segment spelling does not make the complete pronunciations identical. These are individual character readings, not connected speech.`,
        localityIds: [place.localityId], source,
      }] : []),
      {
        title: "Character reading and spoken word",
        text: `These ${place.label} pronunciations are character entries in Academia Sinica’s phonological database. A character can be part of a longer word or have another reading in speech. The English label identifies the written character. Any written-character senses shown separately are a dictionary aid, not an attestation of local word usage.`,
        localityIds: [place.localityId], source,
      },
      {
        title: "Pitch values stay separate from categories",
        text: `The source has separate columns for the initial, rime, pitch value and traditional tone category. HanLingo joins the supplied initial and rime and keeps the supplied pitch digits. A source 0 initial means no consonant; it does not mean tone zero. Entries with missing pitch or unresolved alternatives are excluded.`,
        localityIds: [place.localityId], source,
      },
    ],
    culture: [],
    resources: [
      { title: `${place.label} character readings`, description: `Download the Min archive and open ${place.workbook}. Each HanLingo entry identifies its spreadsheet row and character ID. These are documented transcriptions, not new audio recordings.`, localityIds: [place.localityId], kind: "Dictionary" as const, url: sourceUrl },
      { title: "Search the original phonological database", description: "Search characters and compare initials, rimes, pitch values and source notes. The database’s classification is retained in the source; it does not replace HanLingo’s sourced locality hierarchy.", localityIds: [place.localityId], kind: "Study" as const, url: "https://xiaoxue.iis.sinica.edu.tw/ccr/" },
    ],
  };
});
''')
 (ROOT/'src/data/learning/min-expanded-readings.ts').write_text('\n'.join(lines).rstrip()+'\n')
 provenance={'sourceUrl':ARCHIVE_URL,'licence':'Public Domain Mark 1.0','archiveSha256':PIN,'retrieved':'2026-10-09','selection':'Curated character glosses; one row per character; no notes, alternatives or missing pitch; zero initial 0 omitted; initial+rime+source pitch concatenated, with no phonetic substitution. Not a vocabulary-translation dataset.','heldSourceDiscrepancies':[{'workbookNumber':n,'han':h,'reason':reason} for (n,h),reason in HELD.items()],'counts':{p['localityId']:len(p['rows']) for p in packs},'rejected':rejected,'records':ledger}
 (ROOT/'docs/min-sinica-reading-provenance.json').write_text(json.dumps(provenance,ensure_ascii=False,indent=2)+'\n')
 print(json.dumps(provenance['counts'],ensure_ascii=False,indent=2));print('Total',len(ledger))
if __name__=='__main__':main()
