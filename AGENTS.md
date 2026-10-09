# HanLingo rules

## Reusable workflow

For HanLingo work, automatically read and apply [the HanLingo skill](.agents/skills/hanlingo-workflow/SKILL.md), then load only the references relevant to the task. It is also installed locally as `$hanlingo-workflow`. Current user instructions and current project rules take precedence; the skill does not grant new publishing, credential, spending, or background-task authority.

## Navigation — user decision

- The homepage `/` is the Han family tree. Never redirect it automatically into Min or another branch.
- URLs follow the real hierarchy directly: `/a` → `/a/b` → `/a/b/c`. For example: `/min` → `/min/southern-min` → a sourced cluster → its locality → a learning destination.
- Do **not** introduce a `Languages` layer or `/languages/` prefix. Group names start directly below `/`. Old prefixed links may redirect for compatibility; new links must use canonical paths.
- Keep Map in the top navigation at `/map`; use the same AtlasMap component for every embedded map and the whole-atlas view. Map selections link to canonical locality pages and never invent language boundaries.
- Maps use direct gestures: wheel/trackpad pinch and two-finger touch zoom around the gesture centre, drag to pan, and double-click to zoom. Keep keyboard access and a reset control; do not restore a stack of plus/minus buttons as the primary interaction.
- Use one persistent navigation tree across all pages. Keep its expanded branches, search, and scroll position when changing the adjacent content. Do not reintroduce separate directory navigation, article sidebars, or Xiamen chapter tabs.
- Start the left navigation directly with Mandarin, Min, Yue, Hakka, and Wu. Do not display a Han / Sinitic wrapper above them; the homepage remains the family root.
- Navigation must be immediate and spatially stable: no slide, jump, entrance, page-transition, automatic smooth-scroll, or hover-translation effects. Only the content panel changes when opening a node. Restore the content position on browser Back.
- On mobile, use the same tree in an accessible expandable panel, with separate disclosure controls and links.
- Clicking a branch name toggles its children in both directions and opens its page when one exists. The arrow toggles without navigating. Route-driven expansion must not undo an explicit name toggle; direct URLs and navigation from outside the tree still reveal their ancestors.
- The four classification levels are group → branch → cluster → locality. Words, Photos, Sounds and Practice are learning destinations, not ranks. Keep sourced clusters such as Tsuân-Tsiang and Teo Swa as real navigable pages. Distinguish source classifications from explicitly geographic collections; uniform website depth does not authorize inventing linguistic subdivisions.
- Use two complementary locality names without parentheses: a familiar/community common name as the primary label, and the local reading in **HanLingo spelling** as the secondary label. Generate it through the shared IPA converter; never display POJ, Tâi-lô, Jyutping, Wugniu or another source orthography as the secondary name. Keep those exact spellings only in searchable aliases and labelled source notes. An explicitly documented IPA mapping may normalize an attested source spelling; label that derivation and preserve tone categories or missing tones. This supersedes the former single-display-name rule. Never generate the second name from Mandarin pinyin or copy another locality’s pronunciation. Preserve a missing-reading gap instead of inventing it. Use local names for geographically specific nodes, such as Tsuân-Tsiang for 泉漳 and Amoy for 廈門. Do not replace a specific cluster with a broader label or treat Min, Southern Min, Hokkien, and Hoklo as interchangeable. Preserve alternate names in search and source notes; stable URL identifiers need not change with display names.
- Priority: equal levels, linguistic/geographic precision, and community-owned names. Locality leaves must be comparable places: Taipak, Singapore, and George Town belong alongside Amoy under Tsuân-Tsiang. Do not put a whole regional language such as Taigi at the same level as a city. Explain regional context inside the locality article.
- Prefer documented names used in the language being described, not automatic Mandarin pinyin or English replacement. Keep source romanizations distinct from HanLingo’s trial spelling. Do not invent an endonym when evidence is missing.
- Classifications must be sourced; mutual intelligibility is relevant evidence, not an assumed property of a shared label. Map markers locate reference places, not language boundaries or a claim that all residents speak identically.

## Presentation

- English interface and introduction; Chinese content, IPA, and the current HanLingo spelling proposal are the learning material.
- Use one global IPA-to-HanLingo key: identical IPA always gives identical spelling across localities. Deliberate many-to-one mappings simplify the reading aid; they do not imply equivalent sounds or reversible spelling. Preserve exact source IPA, source orthographies and documented place names. Follow `docs/ROMANIZATION.md`; never infer missing tones. The v3 key uses sh/ch/chh/zh/j for the palatal, postalveolar and retroflex sibilant families while keeping s/ts/tsh separate. Retain p/ph/b and the other stop contrasts. Use ü for [y ʏ], y for [j], and yu for [ju]; always retain the dots, which indicate vowel quality rather than tone. Keep ă for [ɐ] because current local word pairs require the distinction from a; treat this as a documented design choice, not an inherited user requirement.
- Use the shared interface terms in `src/data/site-terms.ts` and `docs/NAMING.md`. A destination or learning concept must have one consistent label; preserve source titles and quotations.
- Keep copy factual and brief. No decorative labels or filler introductions. Preserve phonetic qualifications, sources, and photograph credits.
- Reference articles lead with the community name and readable content. Do not repeat the breadcrumb hierarchy in a metadata sidebar. Put naming conventions and dictionary details in expandable reference notes beside sources; keep map qualifications with the map.
- Keep controls minimal: reuse an existing selector or tree destination instead of adding another button. Main navigation remains visible on mobile. Do not add duplicate directory columns, promotional action blocks, or repeated footer navigation.
- Learning sections beyond Amoy use `src/data/learning/`. Keep each reading tied to its locality and source; never treat source tone-category digits as pitch contours. Add Words, Photos, Sounds, and Practice destinations only when their evidence requirements in `docs/BRANCH-LEARNING.md` are met.
- Use the shared HanLingo visual style and logo. Do not layer an older interface or a second navigation system into a page.
- Local photo galleries should have comparable depth to Amoy (11 photographs): aim for 9–11 distinct, documented scenes per published locality. Do not pad counts with duplicate images, crops, or repeated views of one subject. Every image needs a source, attribution, license, and accurate place caption. Use the shared immersive gallery and preserve keyboard and direct-link access.
- Teach local differences explicitly. A regional word choice is different from a pronunciation difference; link every form to its documented locality and source. A local attestation never means that all residents use it or that other places do not. Keep source romanization separate from HanLingo spelling, and never infer IPA or pitch values from spelling alone.

- Every catalogue level should expose its available learning material, scoped to the actual descendant locality. A related-place link is not local evidence. Measure progress toward Amoy depth across all 300 references, including zero-coverage entries; never claim catalogue growth is course completion.
- Maintain the reproducible content inventory with `npm run audit:content`. Every published branch needs a learning pack, and every mapped locality needs at least two specific sound/learning notes, two documented culture topics, and two useful source links. More photographs or repeated prose do not close a vocabulary gap.
- Display consequential reading qualifications beside pronunciation: a formal Standard Mandarin speaker reference is not an unqualified vernacular city sample; source segment lists with omitted tones are not complete tonal pronunciations. Keep these qualifications visible in overview cards, comparisons, and practice.

See `docs/NAVIGATION.md` for the architecture. Local review uses `http://127.0.0.1:5173/`.

## Translation

- `/compare` targets Amoy, Beijing speech, urban Shanghai, Guangzhou, Meixian Hakka, and modern Standard Written Chinese. Meizhou is a wider region; written Chinese is a register, not a sixth spoken locality.
- Keep generated translations visibly separate from sourced learning material. Automated review is not native-speaker verification. Never generate lesson IPA, tone sandhi or HanLingo spelling from unverified translated text.
- Model credentials belong only in the backend environment. GitHub Pages needs a separately hosted API; frontend publication alone must never be reported as a working translation service.
- Run `npm test` (including the server protocol tests) and verify a real configured provider before claiming automatic translation works. Injected fixture tests establish protocol behavior only.

## Four-level catalogue update

The latest user request explicitly supersedes the earlier flattened cluster-caption structure. Use group → branch → cluster → locality, with a page at every classification level. Keep source ranks and editions visible; geographic collections must be labelled as such rather than claimed as formal subbranches. Preserve old locality and learning URLs as redirects.

`src/data/atlas/` records sourced catalogue points separately from developed learning collections. Catalogue-only references need named source locations, geographic scope and a real four-level route; they must not claim uncollected IPA, photographs or completed lessons. The existing learning content requirements still govern Words, Photos, Sounds and Practice. Report the two coverage counts separately.
