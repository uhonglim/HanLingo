"""Build the redistributable offline sound pack from the checked-in source manifest."""
import hashlib, html, json, zipfile
from pathlib import Path

root = Path(__file__).resolve().parents[1]
manifest_text = (root / 'src/data/ipa-audio-manifest.json').read_text()
manifest = json.loads(manifest_text)
credits = ['# HanLingo IPA sound pack', '', manifest['scope'], '',
           'Each MP3 is licensed CC BY-SA 3.0: https://creativecommons.org/licenses/by-sa/3.0/',
           'Transcoded from the source Ogg; no trimming, pitch shifting, or phonetic synthesis.',
           'The source file license applies to each recording. No speaker endorsement is implied.', '']
for sample in manifest['samples']:
    data = (root / 'public' / sample['src'].lstrip('/')).read_bytes()
    assert hashlib.sha256(data).hexdigest() == sample['sha256'], sample['file']
    credits.extend([f"## [{sample['ipa']}] — {sample['name']}", sample['author'], sample['sourceUrl'],
                    sample['licenseUrl'], sample['context'], f"Original SHA-1: {sample['originalSha1']}", ''])
buttons = ''.join(f'<button data-src="{html.escape(s["file"])}" aria-label="Play {html.escape(s["name"])}">[{html.escape(s["ipa"])}]<small>{html.escape(s["name"])}</small></button>' for s in manifest['samples'])
page = '''<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>HanLingo IPA sound pack</title><style>body{max-width:960px;margin:40px auto;padding:0 20px;font:16px system-ui;color:#202a33}p{line-height:1.6}main{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:8px}button{padding:20px 10px;border:1px solid #ccd5e2;background:white;color:#254de0;font-size:28px;cursor:pointer}small{display:block;color:#596777;font-size:12px;margin-top:8px}audio{width:100%;margin:20px 0}</style><h1>HanLingo · Hear the IPA</h1><p>General vowel demonstrations. This is not fluent speech or a recording of a specific locality; tones are not performed.</p><p><a href="CREDITS.md">Recording credits and licences</a> · <a href="manifest.json">IPA manifest</a></p><audio controls preload="none"></audio><p id="status" role="status">Choose a sound.</p><main>''' + buttons + '''</main><script>const audio=document.querySelector('audio'),status=document.querySelector('#status');document.querySelectorAll('button').forEach(button=>button.addEventListener('click',()=>{audio.pause();audio.src=button.dataset.src;status.textContent=button.textContent;audio.play().catch(()=>status.textContent='Press the audio player to try again.');}));audio.addEventListener('error',()=>status.textContent='Audio could not load. Extract the whole ZIP first.');</script></html>'''
(root / 'public/audio/ipa/manifest.json').write_text(manifest_text)
with zipfile.ZipFile(root / 'public/audio/hanlingo-ipa-pack.zip', 'w', zipfile.ZIP_DEFLATED) as archive:
    def add(name, data):
        info=zipfile.ZipInfo('hanlingo-ipa-pack/'+name, (2026,10,9,0,0,0)); info.compress_type=zipfile.ZIP_DEFLATED
        archive.writestr(info,data)
    add('manifest.json',manifest_text)
    add('CREDITS.md','\n'.join(credits))
    add('index.html',page)
    add('README.txt','Extract the whole ZIP, then open index.html in a browser. Click a sound. No server, API key, installation or internet connection is needed for the MP3 files. Read CREDITS.md before redistribution. The manifest uses file for offline paths and src for HanLingo website paths.\n')
    for sample in manifest['samples']: add(sample['file'],(root/'public'/sample['src'].lstrip('/')).read_bytes())
print(f"Built offline pack with {len(manifest['samples'])} attributed MP3 recordings.")
