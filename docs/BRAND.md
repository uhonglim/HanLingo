# HanLingo mark

The mark is an original flat vector H made from two facing strokes. Their open ends suggest a conversation or the edges of an open book. A diagonal seam keeps both strokes distinct while their shared silhouette reads as one initial. The two shapes have rotational symmetry, with opposing angled terminals.

The mark replaces the generic Chinese-character seal. It contains no character, enclosing square, gradient, texture, or raster image. Use it with the sans-serif **HanLingo** wordmark.

## Assets

- `src/components/BrandMark.tsx`: React SVG component. Named and default exports are available. It inherits `currentColor`.
- `public/hanlingo-mark.svg`: the same geometry in cobalt `#2155f5`, suitable for the favicon and standalone use.

The shared viewBox is `0 0 32 32`; the drawing occupies the central 24 × 24 area. The diagonal separation remains open at a 24-pixel component size. Keep the two paths, their proportions, and their separation intact. Use cobalt on white or a single contrasting color; white on cobalt is also suitable. Do not put the mark back into a decorative square seal.

## Component API

```tsx
import BrandMark from './components/BrandMark'

// Decorative beside visible text; hidden from assistive technology by default.
<BrandMark size={32} className="brand-mark" />

// A meaningful standalone mark has its own accessible name.
<BrandMark size={24} title="HanLingo" style={{ color: '#2155f5' }} />
```

`size` accepts a number or CSS size string and defaults to 32. Standard SVG props, including `className`, `style`, and accessible labels, are accepted. Supplying `title` creates a unique title ID for each component instance. No animation or fixed background is included.

The favicon URL is `/hanlingo-mark.svg`. Application integration and the HTML icon link are owned by the site layout.
