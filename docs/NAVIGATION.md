# Navigation

The homepage `/` is the Han family root. It stays at `/`; it does not redirect into Min. `/languages` is a compatibility alias for the homepage.

One `LanguageTree` is mounted outside the route content. Its branches, search state, and scroll position stay in place as the reader opens a language, subgroup, local variety, or lesson. The content panel scrolls independently. Mobile uses the same tree in an expandable panel.

The visible tree starts directly with Mandarin, Min, Yue, Hakka, and Wu, without a Han / Sinitic wrapper. The family root remains available through the logo and top navigation.

Canonical article paths start directly with their language group. Do not add a `/languages` prefix:

- `/min`
- `/min/southern-min`
- `/min/southern-min/xiamen`
- `/min/southern-min/xiamen/words` (also culture, sounds, practice)

All five groups use the same four interactive levels: **group → branch → locality → lesson**. Sourced clusters are non-interactive captions at the locality level, not additional expandable nodes. Tsuan-Chiang names the 泉漳 cluster within Southern Min, with Quanzhang retained as a search alias; Teo Swa remains a separate caption for Teochew and Swatow. This is navigation consistency, not a claim that every group has the same linguistic taxonomy. Cluster membership stays in locality references and source data. Clusters have no separate article route; old `/languages/...` URLs redirect once to their corresponding canonical path, preserving query strings and fragments. Display names use one familiar or local name without bracketed alternatives: Amoy and Tsuan-Chiang. Names at different taxonomic and geographic levels are not interchangeable. Technical names stay in source notes and search aliases. Stable URL identifiers are unchanged.

Taipak, Singapore, and George Town are locality peers alongside Amoy, Tsuân-tsiu, and Tsiang-tsiu. Their articles explain Taiwan, Singapore, and Penang Hokkien in local context; regional language names are not mixed into the city level. Their map points locate reference places, not exclusive language territories. See [naming priorities](NAMING.md). The five featured groups are a selection from Sinitic, not a complete classification.

Use the shared tree for navigation. Do not introduce another reference sidebar, chapter tab bar, or duplicate directory page. Breadcrumbs show ancestry; Compare and Romanization remain shared tools in the top bar.

Southern Min also contains the **Teo Swa** cluster, with Teochew and Swatow locality pages. Expanded Tsuan-Chiang places include Tâi-lâm, Ko-hiông, Gî-lân, Lo̍k-káng, and Sam-kiap. Use community spellings in display labels; familiar Mandarin and English names remain searchable. A town or district can be a documented locality reference without being treated as an entire regional language.

## Final presentation structure

The three shared destinations are always visible in the top bar, including on mobile. The tree is the only persistent hierarchical navigator; breadcrumbs retain the requested ancestry. The homepage gives equal photo and pronunciation previews for the five featured groups. Min uses a single map with branch and locality selectors, rather than a second locality directory. Its selected place opens through the existing article link.

Reference articles use simple content rows for child summaries and end at their sources. Do not append a second related-links directory or repeat the site navigation in a footer. Learning pages retain only controls that operate the current lesson; avoid duplicate overview buttons pointing to destinations already in the tree. The romanization workshop uses its one word selector instead of duplicate sample buttons.

## Shared locality learning

Every mapped locality outside Southern Min now uses the same conditional learning structure as Amoy. `src/data/learning/index.ts` supplies the available child destinations to the tree, route validation, and breadcrumbs. Words and Practice require attested readings; Photos requires a credited photograph; Sounds uses sourced pronunciation notes. Do not create empty chapters to make the tree appear fuller.

Locality headings use the same display name as their tree node. Branch and locality articles lead with a credited photo, word previews where available, culture, and primary learning resources. Longer prose stays under Language notes; maps and classification references remain intact.
