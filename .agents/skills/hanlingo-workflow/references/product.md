# Product, names, and interface

## Purpose and scope

HanLingo teaches Han languages and their cultures. The initial geographic scope includes Mainland China, Taiwan, Singapore and Penang-area communities. Start with present-day localities; do not invent “Hakka 200 years ago” as a uniform variety. The original six letters supplied by Alan are illustrative texts, not authenticated translation or phonetic corpora.

Amoy was the first deep prototype. The goal then expanded to comparable useful depth across every published branch. Maintain all five groups; Min-first development does not mean removing other groups.

## Tree and routes

`/` is the family-tree home. The left edge starts directly with Mandarin, Min, Yue, Hakka and Wu, without a Han wrapper. Keep a single persistent tree across pages, including its expansion, search and scroll state. The mobile version is the same tree in an expandable panel.

Paths follow four classification levels: group → branch → cluster → locality, followed by an optional learning destination. The latest user request supersedes the earlier flattened cluster captions. Preserve compatibility redirects from old three-level locality URLs, including query and fragment. No Languages wrapper. Every cluster has a sourced page; distinguish true classification from an explicitly geographic collection rather than inventing an academic rank.

Clicking a branch name toggles its children in both directions and opens its page when available. Its arrow toggles without navigating. Route-driven expansion must not immediately undo a deliberate collapse. Browser Back restores content position. Avoid slide/entrance/smooth-scroll/hover-translation effects and sibling-page jumping.

## Equal levels and community names

Before adding a place, check current map points, tree data, route aliases and learning packs so an existing locality is expanded rather than duplicated.

Use **group → branch → cluster → locality**. Locality leaves may be comparable towns, urban districts or cities; do not mix Taigi, a regional language label, with Amoy or Taipak as if they were equal places.

- 泉漳 displays as **Tsuan-Chiang**, the user’s Hokkien-style working name. Source **Tsuân-Tsiang** and Mandarin **Quanzhang** remain distinct aliases/reference forms.
- Amoy, Tsuân-tsiu, Tsiang-tsiu, Taipak, Tâi-lâm, Ko-hiông, Gî-lân, Lo̍k-káng, Sam-kiap and overseas Hokkien localities retain documented local naming and exact scope.
- Singapore can display Sin-ka-pho; George Town can display Pho Te. George Town is not all of Penang. Preserve source spelling conventions instead of generating place names through the IPA converter.
- Teochew and Swatow belong to the **Teo Swa** cluster under Southern Min, not Tsuan-Chiang.
- Meixian Hakka is the translation reference. Meizhou is a wider administrative area; its name does not imply one uniform accent.

Use one visible name without parenthetical aliases. Aliases belong in search and source notes. Stable route IDs need not change with display names. Do not invent an endonym when documented evidence is missing. Use `src/data/site-terms.ts`, `src/data/language-names.ts` and `docs/NAMING.md` as the current sources of labels.

## Design

Keep one coherent visual system: calm spacing, readable typography, restrained cobalt accents, meaningful photography, concise English, and visible language examples. Avoid mixing old and new UI generations, badge clutter, decorative gradients, giant metadata panels, promotional filler, unnecessary bottom buttons or repeated navigation.

Reference pages lead with name and content. Put source naming conventions/dictionary metadata inside reference notes, not a long “Group / Branch / Entry type / Map anchor” panel. Keep map qualifications beside the map. Map dragging should feel controlled; markers are geographic anchors, never dialect boundaries. Do not infer the ethnicity or language of pictured people from appearance.

Use existing HanLingo identity assets (`public/hanlingo-logo.svg`, `public/hanlingo-mark.svg`, `BrandMark.tsx`) and `docs/BRAND.md`. Do not restore the rejected 言/言語 logo. Verify IPA and tone glyphs in real browser screenshots; an uninstalled serif fallback previously produced missing glyphs. The bundled DM Sans is the current tested UI font.

Use ordinary learning examples. Do not restore the removed Xi Jinping romanization demonstration; this was a specific editorial removal, not a rule to erase linguistic or geographic facts.

If a new direct request clearly changes an earlier naming preference, follow the new instruction while keeping geographic and evidence scope explicit. If the wording ambiguously mixes a place with a regional language, explain that concrete distinction and clarify only the unresolved choice. A user-chosen label is not automatically a documented community endonym; never fabricate evidence to justify it.

## Uniform navigation depth

The latest 2026-10-09 request defines four linguistic browsing levels: group → branch → cluster → locality. Lessons sit below localities but do not count as classification. `src/data/atlas/` stores source-attested catalogue references separately from the developed learning collection. Count and label these separately; never claim a newly catalogued place has IPA lessons or a completed gallery. Preserve source editions, geographical scope and competing classifications.
