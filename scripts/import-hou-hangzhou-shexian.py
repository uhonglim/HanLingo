#!/usr/bin/env python3
"""Reproduce reviewed Hou/List lexical facts; never treat this source's Han Value as IPA."""
import argparse
import csv
import hashlib
import json
import re
import unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--verify-sources', action='store_true', help='Also verify the pinned cached source files and original CSV joins.')
args = parser.parse_args()
ledger = json.loads((ROOT / 'docs/hou-hangzhou-shexian-provenance.json').read_text())
pin = ledger['commit']
repo = ledger['repository']

if args.verify_sources:
    for name, relative in ledger['sourceFiles'].items():
        path = ROOT / relative
        assert path.is_file(), f'Missing pinned source {relative}; recover from {repo}/tree/{pin}, not another corpus.'
        assert hashlib.sha256(path.read_bytes()).hexdigest() == ledger['sourceHashes'][name], f'Changed source: {name}'
    forms = {r['ID']: r for r in csv.DictReader(open(ROOT / ledger['sourceFiles']['cldf_forms.csv']))}
    parameters = {r['ID']: r for r in csv.DictReader(open(ROOT / ledger['sourceFiles']['cldf_parameters.csv']))}
    raw_lines = (ROOT / ledger['sourceFiles']['raw_SIN.csv']).read_text().splitlines()
    raw = {r['ID']: r for r in csv.DictReader([line for line in raw_lines if not line.startswith('#')], delimiter='\t')}
    for row in ledger['rows']:
        original = forms[row['id']]
        assert original['Value'] == row['han'] and original['Form'] == row['ipa']
        assert original['Segments'] == row['segments'] and original['Language_ID'] == row['language']
        assert parameters[original['Parameter_ID']] == row['concept']
        assert raw[row['raw']['ID']] == row['raw']

def display_ipa(value):
    return '[' + re.sub(r'([⁰¹²³⁴⁵⁶⁷⁸⁹]+)(?=[^⁰¹²³⁴⁵⁶⁷⁸⁹])', r'\1 ', value).strip() + ']'

places = {'Hangzhou': ('hangzhou', 'wu/taihu', 'Hangzhou', 'neighbourhood unspecified'), 'Shexian': ('shexian-hui', 'hui/jishe', 'She County', 'settlement unspecified')}
packs = []
for language, (locality, branch, name, qualification) in places.items():
    words = []
    for row in ledger['rows']:
        if row['language'] != language:
            continue
        assert row['id'] not in ledger['held']
        assert unicodedata.normalize('NFC', row['raw']['IPA'].replace('#', '-')) == unicodedata.normalize('NFC', row['ipa'])
        assert row['raw']['Ortho'] == row['han'] and row['raw']['Languages'] == language
        assert display_ipa(row['ipa']) == row['displayIpa']
        assert len(re.findall(r'[¹²³⁴⁵]+', row['ipa'])) == len(row['han'])
        assert re.findall(r'[⁰¹²³⁴⁵⁶⁷⁸⁹]+', row['ipa']) == re.findall(r'[⁰¹²³⁴⁵⁶⁷⁸⁹]+', row['segments'])
        words.append({
            'id': 'hou-list-' + row['id'].lower(), 'han': row['han'], 'english': row['english'],
            'ipa': row['displayIpa'], 'toneNotation': 'pitch-contour', 'learningKind': 'word',
            'localityId': locality, 'reading': 'Hou/List lexical reference',
            'registerLabel': name+' · Hou 2004 / List 2014 · '+qualification,
            'note': (row['glossQualification']+' ' if row['glossQualification'] else '')+'The derived dataset names '+name+' but gives no consultant biography or fieldwork date. These are its supplied transcriptions and tone values. Display spaces separate syllables; the source form is '+row['ipa']+'. Adapted from Hou/List, CC BY 4.0.',
            'source': {'title': 'Hou/List · '+row['id']+' · CC BY 4.0', 'url': repo+'/blob/'+pin+'/cldf/forms.csv#L'+str(row['cldfLine'])},
        })
    def item(title, text, source_title, url):
        return {'title': title, 'text': text, 'localityIds': [locality], 'source': {'title': source_title, 'url': url}}
    source_url = repo+'/tree/'+pin
    if language == 'Hangzhou':
        sounds = [
            item('Voicing in familiar words', '爸爸 [pɑ33 pɑ33] and 老婆 [lɔ53 bo213] show the source’s unvoiced [p] and voiced [b]. HanLingo keeps these as p and b. The dataset names Hangzhou without a neighbourhood or speaker address.', 'Hou/List · Hangzhou father and wife entries', source_url),
            item('Two hand expressions', 'The source gives 小手 [ɕjɔ53 sej53] for the left hand and 顺手 [zɥen13 sej53] for the right hand. Both contain 手 [sej53]. These are local lexical expressions in the dataset; the labels do not establish usage in every Hangzhou neighbourhood.', 'Hou/List · Hangzhou left-hand and right-hand entries', source_url),
        ]
        culture = []  # Existing Hangzhou collection supplies two sourced topics; do not duplicate them.
        resources = [
            {'title': 'Hangzhou words in the Hou/List dataset', 'description': 'The pinned CC BY 4.0 collection supplies Han spellings, phonetic forms and meanings. It does not identify a neighbourhood, consultant or collection date.', 'localityIds': [locality], 'kind': 'Study', 'url': source_url},
            {'title': 'Hangzhou audio-volume catalogue', 'description': 'The National Institute of Informatics records the 1998 text-and-cassette publication. This bibliographic record does not provide reusable audio or date the dataset’s interviews.', 'localityIds': [locality], 'kind': 'Study', 'url': 'https://ci.nii.ac.jp/ncid/BA42571497'},
        ]
    else:
        arch = 'https://www.huangshan.gov.cn/zwgk/public/6615714/11221465.html'
        fish = 'https://www.huangshan.gov.cn/zxzx/tpxw/8404077.html'
        sounds = [
            item('A consonant can form a syllable', 'The dataset gives 尔 [n̩35] for singular “you” and 姆妈 [m̩35 ma31] for “mother”. In [n̩] and [m̩], the nasal consonant carries the syllable. The source names She County; its settlement and speakers are unspecified.', 'Hou/List · Shexian singular-you and mother entries', source_url),
            item('Aspiration in nose and head', '鼻头 [pʰi22 tʰju44] contains aspirated [pʰ] and [tʰ], written ph and th in HanLingo. Its second syllable also occurs independently as 头 [tʰju44], “head”. The given tone values belong to this source reference.', 'Hou/List · Shexian nose and head entries', source_url),
        ]
        culture = [
            item('Xu Guo’s stone archway', 'In She County’s Huizhou old city, the 1584 Xu Guo archway has eight pillars joined across four sides. Its enclosed arrangement brings stone carving into the surrounding streets.', 'Huangshan government · 28 June 2023', arch),
            item('Fish lanterns at Yuliang', 'A July 2024 gathering at Yuliang Dam brought residents out with fish lanterns to perform the carp’s leap through the dragon gate. The city’s photo report locates the event in Yuliang community, Huicheng Town, within She County.', 'Huangshan government · Wu Jianping · 1 August 2024', fish),
        ]
        resources = [
            {'title': 'She County words in the Hou/List dataset', 'description': 'A county-named lexical reference with no specified settlement or consultant. The page’s existing county anchor is geographical orientation, not a fieldwork site.', 'localityIds': [locality], 'kind': 'Study', 'url': source_url},
            {'title': 'Huizhou stone carving', 'description': 'The local government describes the Xu Guo archway within She County’s old city.', 'localityIds': [locality], 'kind': 'Culture', 'url': arch},
            {'title': 'Yuliang fish lanterns', 'description': 'A dated local-government photo report of the fish-lantern gathering at Yuliang Dam.', 'localityIds': [locality], 'kind': 'Culture', 'url': fish},
        ]
    assert len(words) == 80
    packs.append({'branchId': branch, 'words': words, 'soundNotes': sounds, 'culture': culture, 'resources': resources})

(ROOT / 'src/data/learning/hou-hangzhou-shexian.ts').write_text('// CC BY 4.0 source facts; generated by scripts/import-hou-hangzhou-shexian.py.\nimport type { BranchLearning } from "./types";\nexport const houHangzhouShexianLearning: BranchLearning[] = '+json.dumps(packs,ensure_ascii=False,indent=2)+';\n')
print('Hou/List: 80 Hangzhou + 80 She County lexical forms')
