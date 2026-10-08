# HanLingo rules

## Navigation — user decision

- The homepage `/` is the Han family tree. Never redirect it automatically into Min or another branch.
- URLs follow the real hierarchy directly: `/a` → `/a/b` → `/a/b/c`. For example: `/min` → `/min/southern-min` → `/min/southern-min/xiamen` → `/min/southern-min/xiamen/words`.
- Do **not** introduce a `Languages` layer or `/languages/` prefix. Group names start directly below `/`. Old prefixed links may redirect for compatibility; new links must use canonical paths.
- Use one persistent navigation tree across all pages. Keep its expanded branches, search, and scroll position when changing the adjacent content. Do not reintroduce separate directory navigation, article sidebars, or Xiamen chapter tabs.
- Start the left navigation directly with Mandarin, Min, Yue, Hakka, and Wu. Do not display a Han / Sinitic wrapper above them; the homepage remains the family root.
- Navigation must be immediate and spatially stable: no slide, jump, entrance, page-transition, automatic smooth-scroll, or hover-translation effects. Only the content panel changes when opening a node. Restore the content position on browser Back.
- On mobile, use the same tree in an accessible expandable panel, with separate disclosure controls and links.
- Clicking a branch name toggles its children in both directions and opens its page when one exists. The arrow toggles without navigating. Route-driven expansion must not undo an explicit name toggle; direct URLs and navigation from outside the tree still reveal their ancestors.
- Classification and URL parents must be valid. Show the geographically specific Tsuan-Chiang cluster under Southern Min; Quanzhang is its Mandarin spelling alias. Do not fabricate an article just to add a URL segment.
- Use one familiar or local name in visible navigation, without parenthetical alternative names. Use local names for geographically specific nodes, such as Tsuan-Chiang for 泉漳 and Amoy for 廈門. Do not replace a specific cluster with a broader label or treat Min, Southern Min, Hokkien, and Hoklo as interchangeable. Preserve alternate names in search and source notes; stable URL identifiers need not change with display names.
- Priority: equal levels, linguistic/geographic precision, and community-owned names. Locality leaves must be comparable places: Taipak, Singapore, and George Town belong alongside Amoy under Tsuan-Chiang. Do not put a whole regional language such as Taigi at the same level as a city. Explain regional context inside the locality article.
- Prefer documented names used in the language being described, not automatic Mandarin pinyin or English replacement. Keep source romanizations distinct from HanLingo’s trial spelling. Do not invent an endonym when evidence is missing.
- Classifications must be sourced; mutual intelligibility is relevant evidence, not an assumed property of a shared label. Map markers locate reference places, not language boundaries or a claim that all residents speak identically.

## Presentation

- English interface and introduction; Chinese content, IPA, and the agreed trial HanLingo romanization are the learning material.
- Use the shared interface terms in `src/data/site-terms.ts` and `docs/NAMING.md`. A destination or learning concept must have one consistent label; preserve source titles and quotations.
- Keep copy factual and brief. No decorative labels or filler introductions. Preserve phonetic qualifications, sources, and photograph credits.
- Reference articles lead with the community name and readable content. Do not repeat the breadcrumb hierarchy in a metadata sidebar. Put naming conventions and dictionary details in expandable reference notes beside sources; keep map qualifications with the map.
- Keep controls minimal: reuse an existing selector or tree destination instead of adding another button. Main navigation remains visible on mobile. Do not add duplicate directory columns, promotional action blocks, or repeated footer navigation.
- Learning sections beyond Amoy use `src/data/learning/`. Keep each reading tied to its locality and source; never treat source tone-category digits as pitch contours. Add Words, Photos, Sounds, and Practice destinations only when their evidence requirements in `docs/BRANCH-LEARNING.md` are met.
- Use the shared HanLingo visual style and logo. Do not layer an older interface or a second navigation system into a page.
- Local photo galleries should have comparable depth to Amoy (11 photographs): aim for 9–11 distinct, documented scenes per published locality. Do not pad counts with duplicate images, crops, or repeated views of one subject. Every image needs a source, attribution, license, and accurate place caption. Use the shared immersive gallery and preserve keyboard and direct-link access.
- Teach local differences explicitly. A regional word choice is different from a pronunciation difference; link every form to its documented locality and source. A local attestation never means that all residents use it or that other places do not. Keep source romanization separate from HanLingo spelling, and never infer IPA or pitch values from spelling alone.

- Maintain the reproducible content inventory with `npm run audit:content`. Every published branch needs a learning pack, and every mapped locality needs at least two specific sound/learning notes, two documented culture topics, and two useful source links. More photographs or repeated prose do not close a vocabulary gap.
- Display consequential reading qualifications beside pronunciation: a formal Standard Mandarin speaker reference is not an unqualified vernacular city sample; source segment lists with omitted tones are not complete tonal pronunciations. Keep these qualifications visible in overview cards, comparisons, and practice.

See `docs/NAVIGATION.md` for the architecture. Local review uses `http://127.0.0.1:5173/`.
