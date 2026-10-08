# Navigation

The homepage `/` is the Han family root. It stays at `/`; it does not redirect into Min. `/languages` is a compatibility alias for the homepage.

One `LanguageTree` is mounted outside the route content. Its branches, search state, and scroll position stay in place as the reader opens a language, subgroup, local variety, or lesson. The content panel scrolls independently. Mobile uses the same tree in an expandable panel.

Canonical article paths start directly with their language group. Do not add a `/languages` prefix:

- `/min`
- `/min/southern-min`
- `/min/southern-min/xiamen`
- `/min/southern-min/xiamen/words` (also culture, sounds, practice)

Quanzhang is shown as a cluster within Southern Min in the tree. It has no separate article route; old `/languages/...` URLs redirect once to their corresponding canonical path, preserving query strings and fragments. The five featured groups are a selection from Sinitic, not a complete classification.

Use the shared tree for navigation. Do not introduce another reference sidebar, chapter tab bar, or duplicate directory page. Breadcrumbs show ancestry; Compare and Romanization remain shared tools in the top bar.
