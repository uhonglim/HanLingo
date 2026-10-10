# HanLingo identity

Two interlocking speech forms make the symbol. Their open crossbar, rounded outline, and single speech tail connect the mark to conversation. The cobalt symbol is paired with an outlined, tightly spaced HanLingo wordmark in near-black.

## Production assets

- `public/hanlingo-logo.svg`: complete horizontal lockup. Lettering is outlined, so the export does not depend on installed fonts.
- `public/hanlingo-mark.svg`: standalone symbol and current favicon.
- `public/favicon.svg`: matching compatibility favicon.
- `src/components/BrandMark.tsx`: `currentColor` React symbol with optional `size` and accessible `title` props.
- `scripts/build-brand.py`: rebuilds the exported SVG files using fontTools and the bundled DM Sans semibold font. DM Sans license is retained in `public/fonts/DM-Sans-LICENSE.txt`.

The header and footer use the full lockup. Versioned URLs refresh older cached logos. Keep the mark in one flat color, with clear space around it; do not add a seal, shadow, texture, or gradient.

## Design process

The visual concept was generated with the built-in `image_gen` tool, with transparency enabled. Its unmodified output is retained at `docs/design/hanlingo-logo-concept.png`. The production mark was then redrawn as clean vector paths, and the wordmark was constructed from outlined DM Sans glyphs. The website uses those SVG files, not the generated raster.

## Generation prompt

Use case: logo-brand. Create one final professional logo for HanLingo, a serious but welcoming website for learning the Han languages and their regional cultures. Horizontal lockup on a genuinely transparent background. Exact wordmark text: HanLingo (H-a-n-L-i-n-g-o), dark near-black #172128, custom tasteful humanist sans lettering, open counters, beautifully balanced kerning, medium semibold, not a stock rounded app font. To the left, a distinctive compact cobalt #2155F5 symbol: two interlocking rounded speech forms that create a clear white/transparent H in the negative space, with one subtle speech tail. The silhouette should feel like a small flowing woven knot or two voices meeting, not a square stamp. Design mastery: disciplined geometry, generous negative space inside the mark, beautiful optical balance, one flat color, recognizable at 24px. Icon about 1.25 times the cap height, horizontal gap about half icon width. Only the symbol and HanLingo lettering, one single logo. NO Chinese character, no 言 or 語, no slogan, no annotations, no variations, no mockup, no frame, no texture, no gradient, no shadows, no 3D. Tightly frame the full horizontal lockup in a wide canvas with only a modest clear margin. Premium contemporary independent language journal identity, confident and unusually well crafted. Produce crisp clean edges suitable for use as an actual website logo.
