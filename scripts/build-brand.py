"""Build crisp vector assets from the speech mark and bundled DM Sans font."""
from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen

ROOT = Path(__file__).resolve().parents[1]
BLUE = '#2155f5'
INK = '#172128'
PATHS = [
    'M383 346H289V261C251 267 220 296 220 339V419C220 456 244 486 281 499L288 514C253 525 224 529 197 523L100 561L130 493C108 471 98 442 98 405V345C98 301 116 270 151 244L262 169C312 135 383 168 383 223Z',
    'M383 243C412 229 433 225 449 226C521 226 578 283 578 354V421C578 464 561 495 526 519L415 582C362 615 289 582 289 527V415H383V500C421 493 449 462 449 425V341C449 302 424 268 383 255Z',
]
paths = ''.join(f'<path d="{d}"/>' for d in PATHS)
mark = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="68 100 540 540" fill="{BLUE}"><title>HanLingo</title>{paths}</svg>\n'
for name in ['hanlingo-mark.svg', 'favicon.svg']:
    (ROOT / 'public' / name).write_text(mark)

# Real outlines avoid platform-dependent text rendering in the exported lockup.
font = TTFont(ROOT / 'public/fonts/dm-sans-semibold.ttf')
glyphs = font.getGlyphSet()
cmap = font.getBestCmap()
size = 40
scale = size / font['head'].unitsPerEm
x = 70.0
letters = []
for character in 'HanLingo':
    name = cmap[ord(character)]
    pen = SVGPathPen(glyphs)
    glyphs[name].draw(pen)
    letters.append(f'<path transform="translate({x:.3f} 39) scale({scale} {-scale})" d="{pen.getCommands()}"/>')
    x += font['hmtx'][name][0] * scale - 1.0
width = round(x + 2, 3)
logo = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} 56"><title>HanLingo</title><g transform="translate(-6.8 -10) scale(.1)" fill="{BLUE}">{paths}</g><g fill="{INK}">{"".join(letters)}</g></svg>\n'
(ROOT / 'public/hanlingo-logo.svg').write_text(logo)
print(f'Wrote mark, favicon and outlined wordmark ({width} × 56).')
