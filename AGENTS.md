# HanLingo rules

## Navigation — user decision

- The homepage `/` is the Han family tree. Never redirect it automatically into Min or another branch.
- URLs follow the real hierarchy directly: `/a` → `/a/b` → `/a/b/c`. For example: `/min` → `/min/southern-min` → `/min/southern-min/xiamen` → `/min/southern-min/xiamen/words`.
- Do **not** introduce a `Languages` layer or `/languages/` prefix. Group names start directly below `/`. Old prefixed links may redirect for compatibility; new links must use canonical paths.
- Use one persistent navigation tree across all pages. Keep its expanded branches, search, and scroll position when changing the adjacent content. Do not reintroduce separate directory navigation, article sidebars, or Xiamen chapter tabs.
- Start the left navigation directly with Mandarin, Min, Yue, Hakka, and Wu. Do not display a Han / Sinitic wrapper above them; the homepage remains the family root.
- Navigation must be immediate and spatially stable: no slide, jump, entrance, page-transition, automatic smooth-scroll, or hover-translation effects. Only the content panel changes when opening a node. Restore the content position on browser Back.
- On mobile, use the same tree in an accessible expandable panel, with separate disclosure controls and links.
- Classification and URL parents must be valid. Show Quanzhang as a cluster under Southern Min; do not fabricate an article just to add a URL segment.

## Presentation

- English interface and introduction; Chinese content, IPA, and the agreed trial HanLingo romanization are the learning material.
- Keep copy factual and brief. No decorative labels or filler introductions. Preserve phonetic qualifications, sources, and photograph credits.
- Use the shared HanLingo visual style and logo. Do not layer an older interface or a second navigation system into a page.

See `docs/NAVIGATION.md` for the architecture. Local review uses `http://127.0.0.1:5173/`.
