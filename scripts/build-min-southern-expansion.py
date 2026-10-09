#!/usr/bin/env python3
"""Rebuild the manually image-audited Wang 2022 comparative collection.
Source facts and exclusion rules: docs/MIN-SOUTHERN-EXPANSION.md.
No inferred Han spelling, tone, or locality transfer.
"""
import json
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
URL='https://taiwan.ntue.edu.tw/var/file/29/1029/img/692/476201647.pdf'
words=[]
def source(page,table):
 return {'title':f'Wang Kuei-lan, 2022 · {table}, p. {page+134}', 'url':f'{URL}#page={page}'}
# Every cell below was read against the rendered PDF, not copied from PUA-corrupted text.
# Columns: Penang, Zhangzhou, Longhai, Tongan, Xiamen, Quanzhou.
comparison=[
('日','sun; day',['dzit5','dzit121','dzit4','lit5|dzit5','lit5','lit24']),
('二','two',['dzi11','dzi22','dzi22','dzi33','li11','li41']),
('豬','pig',['tu33','ti44','ti44','tɨ55','ti55','tɯ55']),
('鼠','mouse; rat',['tsʰu51','tsʰi53','','tsʰɨ51','tsʰu53','tsʰɯ33']),
('短','short',['te51','te53','','tɘ51','te53','tə55']),
('退','retreat; move back',['tʰue55|tʰe51','tʰe21','tʰe22','tʰɘ51','tʰe21','tʰə41']),
('火','fire',['hue51','hue53','hue53','hɘ51','he53','hə55']),
('糜','rice porridge',['be13|muãi13','bãi13','','bɘ13','be35','bə24']),
('妹','younger sister',['muãi33','bãi22','','bɘ33','mẽ35','bə41']),
('雞','chicken',['ke55','ke44','ke44','kue55','kue55','kue33']),
('節','joint; section',['tseʔ3','tseʔ32','tseʔ32','tsueʔ3','tsueʔ32','tsueʔ5']),
('根','root',['kin55','kin44','kin44','kun55','kun55','']),
('斤','catty; unit of weight',['kin55','kin44','kin44','kun55','kun55','kun33']),
('買','buy',['be51','be53','be53','bue3','bue53','bue55']),
('賣','sell',['be33','be22','be22','bue33','bue11','bue41']),
('血','blood',['hueʔ3','hueʔ32','hueʔ32','huiʔ3','huiʔ32','huiʔ5']),
('關','close; shut',['kuãi55','kuã44','kuã44','kuan55','kuãi55','']),
('橫','horizontal; across',['huã13','huã13','huã13','huãi13','huĩ35|huãi35','huĩ24']),
('懸','high; tall',['kuan13','kuan13','kuan13','kuãi13','kuãi35','kuĩ5']),
('生','raw; uncooked',['sĩ55','sɛ̃44','sɛ̃44','tsʰĩ55','sĩ55','sĩ33']),
('病','illness',['pẽ33','pɛ̃22','pɛ̃22','pĩ33','pĩ11','pẽ41']),
# 橂 omitted: source character/gloss too ambiguous for a learner entry.
('反','turn over',['piŋ55','','piŋ53','pũi51','piŋ53','pũi55']),
('毛','hair; fur',['mɔ̃13|mŋ̍13','bɔ̃13','bɔ̃13','mŋ̍13','mŋ̍35','bŋ̍33']),
('飯','cooked rice',['puĩ33|pŋ̍33','puĩ22','puĩ22','pŋ̍33','pŋ̍11','pŋ̍41']),
('軟','soft',['nuĩ51|nŋ̍51','luĩ53','luĩ53','nŋ̍51','nŋ̍53','lŋ̍55']),
]
localities=['george-town','zhangzhou','longhai','tongan','xiamen','quanzhou']
scopes={
 'george-town':'Penang speaker reference · 2011/2015',
 'zhangzhou':'Tsiang-tsiu · 1999 gazetteer reference',
 'longhai':'Longhai · 1993 gazetteer reference',
 'tongan':'Tong’an · 1996 study reference',
 'xiamen':'Amoy · 1998 study reference',
 'quanzhou':'Tsuân-tsiu · Licheng 1999 reference',
}
for han,english,cells in comparison:
 for loc,cell in zip(localities,cells):
  # Already present in regional-words.ts from the exact same table.
  if loc in ['xiamen','zhangzhou','quanzhou'] and han in ['雞','火','買','飯']: continue
  for variant,ipa in enumerate(filter(None,cell.split('|')),1):
   note='Character citation reading in Wang’s comparison of dated local sources; not a phrase recording. Source pitch values are retained, including single-digit values.'
   if loc=='george-town': note+=' Penang regional evidence from 謝清祥, interviewed in 2011 and 2015; not a George Town-wide standard.'
   if han=='退' and loc=='george-town':note+=' The source records two different vowel-and-tone forms.'
   words.append(dict(id=f'{loc}-wang2022-table17-{han}-{variant}',han=han,english=english,ipa=f'[{ipa}]',toneNotation='pitch-contour',localityId=loc,reading='Source citation reading',registerLabel=scopes[loc],note=note,source=source(36,'table 17')))
# Penang forms: exact displayed source headword, English gloss, IPA, PDF page,
# table/paragraph location, and any lexical qualification. Empty characters are never invented.
penang=[
('pasar','market','pa33 sa11',45,'table 23','Malay source headword; the study does not supply a Hokkien Han spelling.'),
('pasar malam','night market','pa33 sa11 mã33 lam55',45,'table 23','Malay source headword; the study does not supply a Hokkien Han spelling.'),
('lori','truck','lɔ33 li55',45,'table 23','Malay source headword; the study does not supply a Hokkien Han spelling.'),
('baru','just now','ba11 lu55',45,'table 23','Malay source headword; the study does not supply a Hokkien Han spelling.'),
('sampah','rubbish','sam33 pa55',45,'table 23','Malay source headword; the study does not supply a Hokkien Han spelling.'),
('akal','knowledge; wisdom','a33 kai51',45,'table 23','Malay source headword; the study does not supply a Hokkien Han spelling.'),
('gatal','itchy','ka11 tai51',45,'table 23','Malay source headword; the study does not supply a Hokkien Han spelling.'),
('baba','Baba; male Peranakan','ba33 ba55',45,'table 23','Malay source headword. One of two attested tone forms, with no meaning difference reported.'),
('baba','Baba; male Peranakan','ba11 ba13',45,'table 23','Malay source headword. One of two attested tone forms, with no meaning difference reported.'),
('pantang','taboo; customary prohibition','pan33 taŋ55',45,'table 23','Malay source headword; the study does not supply a Hokkien Han spelling.'),
('sate','satay; grilled meat skewers','sa33 te55',46,'table 24','Malay source headword; the study does not supply a Hokkien Han spelling.'),
('kopi','coffee with milk or creamer','kɔ33 pi55',46,'table 24','Malay source headword. The author distinguishes this order from black coffee.'),
('sotong','squid','sɔ33 tɔŋ55',46,'table 24','Malay source headword; the author also reports 蘇東 on local signs.'),
('roti','bread','lɔ33 ti55',46,'table 24','Malay source headword; the study does not supply a Hokkien Han spelling.'),
('tomyam','tom yum; sour spicy soup','tɔm33 iam55',46,'table 24','Malay source headword, ultimately from Thai; not a Thai pronunciation.'),
('barli','barli; a drink ingredient','pa11 li13',46,'table 24','Malay source headword. The source glosses 薏仁; retain that source gloss without claiming a botanical identification.'),
('laksa','laksa noodle dish','lak1 sa11',46,'table 24','Malay source headword; a recorded form with final [k].'),
('laksa','laksa noodle dish','la11 sa11',46,'table 24','Malay source headword; a recorded form without final [k].'),
('shortcut','shortcut','sɔk5 kat5',49,'table 26','English source headword; the IPA is the Penang loan pronunciation, not English.'),
('screwdriver','screwdriver','si11 ku11 lai33 və51',49,'table 26','English source headword. The borrowed [v] is retained, not replaced with a core Hokkien consonant.'),
('strawberry','strawberry','si11 to33 be33 li55',49,'table 26','English source headword; the IPA is the Penang loan pronunciation, not English.'),
('auntie','auntie; address to an older woman','an33 ti55',49,'table 26','English source headword. The study explicitly includes unrelated older women.'),
('uncle','uncle; address to an older man','an33 ko55',49,'table 26','English source headword. The study explicitly includes unrelated older men.'),
('carrot','carrot','kʰe33 lɔk5',49,'table 26','English source headword; the IPA is the Penang loan pronunciation, not English.'),
('park','park a vehicle','pak5',49,'table 26','English source headword; a verb here, not a public garden.'),
('ink','stamp-pad ink','in55',50,'table 26','English source headword; the study glosses 印泥.'),
('customs','customs office','kʰa55 si11 tʰəm11',50,'table 26','English source headword; the IPA is the Penang loan pronunciation, not English.'),
('license','licence; permit','lai55 sən55',50,'table 26','English source headword; the IPA is the Penang loan pronunciation, not English.'),
('保理廳','court of law','po55 li55 tʰiã55',50,'table 27','Source Han spelling. A compound built on a borrowing from English police.'),
('保理主','judge','po55 li55 tsu51',51,'table 27','Source Han spelling. A compound built on a borrowing from English police.'),
('羔丕烏','black coffee','kɔ33 pi33 ɔ55',51,'table 27','Exact table spelling; the prose also uses 咖啡烏. No milk or creamer in the source’s description.'),
('拿督公','Datuk Gong; local guardian deity','nã33 tɔk5 kɔŋ55',51,'table 27','Source Han spelling; a Malay-derived component combined with 公.'),
('吊死禮申','revoke a licence','tiau55 si55 lai55 sən55',51,'table 27','Exact source Han spelling; a compound containing the English-derived licence word.'),
('茶','tea with milk or creamer','tɛ13',51,'discussion below table 27','The author distinguishes this drink order from 茶烏.'),
('茶烏','tea without milk','tɛ33 ɔ55',51,'discussion below table 27','Source phrase form; do not replace the first syllable’s supplied phrase pitch with its citation tone.'),
('茶烏冰','iced tea without milk','tə33 ɔ33 piŋ55',51,'discussion below table 27','The source gives [ə] here, beside [ɛ] in 茶烏. Preserve this attested difference.'),
('目油','tears','bak1 iu13',54,'table 28','One of two recorded final-stop forms in this Penang reference.'),
('目油','tears','bat1 iu13',54,'table 28','One of two recorded final-stop forms in this Penang reference.'),
('傢俬','furniture','ke33 si55',54,'table 28','Local lexical comparison; the Taipei/Taiwan column is not borrowed as Penang evidence.'),
('enting','earrings','an33 tin55',54,'table 28','Malay source headword; compare the two other Penang words 耳環 and 耳穿.'),
('耳環','earrings','hi11 kʰuan13',54,'table 28','One of three words recorded for earrings in this Penang reference.'),
('耳穿','earrings','hi11 tsʰuĩ55',54,'table 28','One of three words recorded for earrings in this Penang reference.'),
('cabai','chilli pepper','tsa11 bai55',54,'table 28','Malay source headword; compare the other Penang word 番椒.'),
('番椒','chilli pepper','huan11 tsio51',54,'table 28, continued p. 189','The second syllable continues at the top of printed p. 189.'),
('鹹酸甜','preserved sweet-sour fruit','kiam33 sŋ̍33 tĩ55',55,'table 28','The middle syllable has a syllabic velar nasal, not an inserted vowel.'),
('嘜頭','trademark; brand mark','mãk1 tʰau13',55,'table 28','Source Han spelling; an English-derived mark word.'),
('柴木師','carpenter','tsʰa33 bak1 su55',55,'table 28','Source Han spelling; compare 柴工 for wood-related skilled work.'),
('柴工','woodworker','tsʰa33 kaŋ55',55,'table 28','The source describes detailed work involving wood.'),
('歪心','biased; unfair','uai33 sim55',55,'table 28','The source explains the local meaning as partiality, not moral corruption.'),
('幔仔店','foreign-goods store','muã33 a55 tiam11',57,'table 29','Historical shop term in the source; not presented as a universal present-day department-store name.'),
('思覺','like; be fond of','su33 kaʔ3',57,'table 29','Source Han spelling; borrowed from Malay suka.'),
('揣空頭','look for work; seek a way forward','tsʰue11 kʰaŋ33 tʰau13',57,'table 29','The source describes seeking a livelihood or opportunity.'),
('老君厝','hospital','lo55 kun33 tsʰu11',58,'table 29','Source form for a Western-medicine hospital; compare 醫生館.'),
('醫生館','hospital','i33 siŋ33 kuan51',58,'table 29, note','A second recorded hospital expression; the phrase begins in the previous page’s note.'),
('報生紙','birth certificate','po55 sẽ33 tsua51',58,'table 29','Source Han spelling for a local document name.'),
('紅青火','traffic lights','aŋ33 tsʰẽ33 hue51',58,'table 29','The colour order and final word 火 belong to this local expression.'),
('徛囚','be stuck; be trapped','kʰia11 siu13',58,'table 29','The source also describes being caught in a difficult situation.'),
('食風','go for a pleasure trip','tsia11 hɔŋ55',58,'table 29','The study analyses a calque of Malay makan angin; the IPA follows the supplied whole phrase.'),
]
for i,(han,english,ipa,page,table,note) in enumerate(penang,1):
 words.append(dict(id=f'george-town-wang2022-local-{i}',han=han,english=english,ipa=f'[{ipa}]',toneNotation='pitch-contour',localityId='george-town',reading='Attested word or phrase',registerLabel=scopes['george-town']+(' · Source-language headword' if han.isascii() else ''),note=note+' Penang regional speaker reference; not a George Town-wide standard. Pitch values are those supplied for this complete form.',source=source(page,table)))
soundNotes=[]
def sn(loc,title,text,page=36,table='table 17'):
 soundNotes.append(dict(title=title,text=text,localityIds=[loc],source=source(page,table)))
sn('george-town','A nasal can carry a syllable','The Penang reference records both puĩ33 and pŋ̍33 for 飯. In the second form, [ŋ̍] carries the syllable; it is not an ng ending after a missing vowel.')
sn('george-town','Borrowing changes a word’s sound','Compare the source labels carrot and park with Penang [kʰe33 lɔk5] and [pak5]. These are attested Penang loan forms, not English IPA.',49,'table 26')
sn('george-town','Milk changes the order','The source distinguishes kopi [kɔ33 pi55] from black coffee [kɔ33 pi33 ɔ55], and tea [tɛ13] from tea without milk [tɛ33 ɔ55]. Learn the complete local order and its supplied phrase tones.',51,'table 27 and discussion')
sn('george-town','One speaker, several forms','Wang’s principal consultant was 謝清祥, a lifelong Penang resident interviewed in 2011 and again in 2015. The study records alternatives; this is a named regional reference, not one compulsory accent for George Town.',12,'fieldwork note 26')
sn('longhai','Rice with a nasalized vowel','Longhai 飯 is [puĩ22] in the comparison. The vowel is nasalized, unlike Amoy [pŋ̍11], where [ŋ̍] forms the syllable.')
sn('longhai','Keep the voiced affricate','The Longhai reference gives 日 [dzit4] and 二 [dzi22]. Amoy has [l] in these two entries. A shared written character does not determine the onset.')
sn('tongan','Central vowels matter','Tong’an 豬 [tɨ55] and 短 [tɘ51] illustrate two different central vowels. Preserve their exact IPA even when a simplified reading aid groups other sounds.')
sn('tongan','A study can contain variants','The Tong’an column gives both [lit5] and [dzit5] for 日. Wang notes that older speakers were the ones retaining [dz] in the cited investigation.',23,'comparison discussion')
sn('quanzhou','Unrounded in “pig”','Tsuân-tsiu 豬 [tɯ55] contrasts with Penang [tu33]. [ɯ] is unrounded: the vowel difference is separate from the tone difference.')
sn('zhangzhou','Sell and buy stay distinct','The comparison gives 買 [be53] and 賣 [be22]. They share segments in this source, but the pitch contours distinguish them.')
resources=[]
for loc in localities:
 resources.append(dict(title='Six Hokkien references side by side',description=f'{scopes[loc]}. Table 17 preserves source-specific vowels, consonants, variants and pitch values; sources are identified in note 42.',localityIds=[loc],kind='Study',url=URL+'#page=36'))
resources.append(dict(title='Penang local words and language contact',description='Wang’s 2022 study, tables 23–29: food orders, markets, loanwords and local expressions, with a named 2011/2015 consultant.',localityIds=['george-town'],kind='Study',url=URL+'#page=45'))
pack=[dict(branchId='min/southern-min',words=words,soundNotes=soundNotes,culture=[],resources=resources)]
(ROOT/'src/data/learning/min-southern-expanded.ts').write_text('import type { BranchLearning } from "./types";\n\n// Generated from image-audited source records. See docs/MIN-SOUTHERN-EXPANSION.md.\nexport const minSouthernExpanded: BranchLearning[] = '+json.dumps(pack,ensure_ascii=False,indent=2)+';\n')
from collections import Counter
print(len(words),dict(Counter(w['localityId'] for w in words)))
