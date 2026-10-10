#!/usr/bin/env python3
"""Reproduce a bounded character comparison; never interpret unkeyed corner marks."""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ledger = json.loads((ROOT / 'docs/jin-comparative-provenance.json').read_text())
url = ledger['source']['url']
places = {'changzhi-jin': ('shangdang', 'Luzhou, Changzhi'), 'handan-jin': ('hanxin', 'Mazhuang, Handan')}
culture_url = 'https://www.changzhi.gov.cn/ztzl/cjwmwz/shfs/202505/t20250509_3044465.shtml'
handan_walk = 'https://hdsswj.hd.gov.cn/?a=view&p=3&r=5059'
handan_textile = 'https://zjj.hd.gov.cn/html/handanyaowen/8342.html'
packs = []
for locality, (branch, name) in places.items():
    def item(title, text, source_title='Zhi 2024 · table 1, p.4', source_url=url+'#page=3'):
        return {'title': title, 'text': text, 'localityIds': [locality], 'source': {'title': source_title, 'url': source_url}}
    words = []
    for row in ledger['rows']:
        if row['proposedLocalityId'] != locality:
            continue
        raw = row['sourceForm']
        segments = ''.join(c for c in raw if not '\ua700' <= c <= '\ua707')
        assert segments == row['segmentIpa'] and row['visualChecked'] and not row['hold']
        words.append({
            'id': row['id'], 'han': row['han'], 'english': 'Character '+row['han'],
            'ipa': '['+segments+']', 'toneNotation': 'unspecified', 'learningKind': 'character-reading',
            'localityId': locality, 'reading': 'Character reading · segments only',
            'registerLabel': name+' · speakers born before 1952 · source mark '+row['sourceToneMark']+' · pitch not supplied',
            'note': 'Zhi 2024, table 1: '+raw+'. The displayed IPA retains the segments; the source tone mark is shown separately. The paper supplies no complete key for these marks. Publication year is not a fieldwork date.',
            'source': {'title': 'Zhi 2024 · table 1, p.4 · '+name, 'url': url+'#page=3'},
        })
    if locality == 'changzhi-jin':
        sounds = [
            item('梳 and 书: a vowel difference', 'In the Luzhou sample, 梳 has [suə] and 书 has [su]. Both carry the printed mark ꜀. These are segmental forms; the source does not provide their pitch values.'),
            item('Same segments, different marks', '站 and 战 have tsɑŋ꜅; 盏 and 展 have ꜂tsɑŋ. Their segment spelling is the same, while the printed tone marks differ. The sample is Luzhou speech from speakers born before 1952; the city map is an orientation anchor.'),
        ]
        culture = [
            item('Shangdang Gate', 'At the north end of Fupo Street in Luzhou, Shangdang Gate marks the entrance to a former administrative compound. It remains a visible landmark of the old city.', 'Changzhi city government · 9 May 2025', culture_url),
            item('Lu’an City God Temple', 'This Luzhou temple has three successive courtyards on a north–south axis. Its buildings retain features from the Yuan, Ming and Qing periods after repeated rebuilding.', 'Changzhi city government · 9 May 2025', culture_url),
        ]
        resources = [
            {'title': 'Luzhou character comparison', 'description': 'Table 1 gives nine character readings from the older-speaker sample. The Changzhi map is a city reference, not a surveyed speaker address.', 'localityIds': [locality], 'kind': 'Study', 'url': url+'#page=3'},
            {'title': 'Luzhou’s historic buildings', 'description': 'The city’s account locates Shangdang Gate and Lu’an City God Temple in Luzhou.', 'localityIds': [locality], 'kind': 'Culture', 'url': culture_url},
        ]
    else:
        sounds = [
            item('Three onset patterns', 'The Mazhuang sample gives 站 [tʂa], 抽 [tʂʰou] and 梳 [ʂu]: an unaspirated affricate, an aspirated affricate and a fricative. Pitch is not supplied in this comparison.'),
            item('A Mazhuang sample within Handan', '抽, 愁 and 臭 share [tʂʰou] but carry different printed tone marks. These readings are from Mazhuang speakers born before 1952. The existing map point is in Congtai District for city orientation; it is not the Mazhuang fieldwork location.'),
        ]
        culture = [
            item('Handan Dao on foot', 'In the wider city, the Handan Dao pedestrian area links Congtai Park, Xuebu Bridge, cultural venues and a local-food street. This is city context for the Mazhuang reading sample.', 'Handan Commerce Bureau · 14 February 2026', handan_walk),
            item('Textile memories in the neighbourhood', 'Shuttle-shaped decorations in the Cotton Mill No. 3 residential community recall the city’s textile workers. A 2026 city report describes these details as part of neighbourhood renewal; this is wider Handan context.', 'Handan Housing and Urban–Rural Development Bureau · 12 January 2026', handan_textile),
        ]
        resources = [
            {'title': 'Mazhuang character comparison', 'description': 'Table 1 identifies Mazhuang, Handan. The existing Congtai District map marker provides city orientation and is not the sample’s fieldwork location.', 'localityIds': [locality], 'kind': 'Study', 'url': url+'#page=3'},
            {'title': 'Walking Handan Dao', 'description': 'An official description of the city’s pedestrian district and nearby cultural venues.', 'localityIds': [locality], 'kind': 'Culture', 'url': handan_walk},
            {'title': 'Textile history in shared spaces', 'description': 'A city report documents shuttle-shaped decorations recalling textile work in the Cotton Mill No. 3 neighbourhood.', 'localityIds': [locality], 'kind': 'Culture', 'url': handan_textile},
        ]
    packs.append({'branchId': 'jin/'+branch, 'words': words, 'soundNotes': sounds, 'culture': culture, 'resources': resources})

(ROOT / 'src/data/learning/jin-comparative.ts').write_text('// Bounded character facts; generated by scripts/import-jin-comparative.py.\nimport type { BranchLearning } from "./types";\nexport const jinComparativeLearning: BranchLearning[] = '+json.dumps(packs,ensure_ascii=False,indent=2)+';\n')
print('Jin comparison:', sum(len(p['words']) for p in packs), 'segment-only character readings')
