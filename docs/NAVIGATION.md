# Navigation — four classification levels

The current user decision supersedes the earlier group → branch → locality → lesson arrangement. The four classification levels are now **group → branch → cluster → locality**. Words, Photos, Sounds and Practice are learning destinations below the locality; they are not a linguistic rank.

Canonical routes follow those four levels directly, without a Languages prefix. Each cluster has its own sourced page. Old three-level locality URLs and their lessons redirect to the corresponding canonical URL, preserving queries and fragments. The family root remains `/` and the left tree begins directly with the published groups. Alongside Mandarin, Min, Yue, Hakka and Wu, the 2026-10-09 expansion adds Gan, Xiang, Jin, Hui and Pinghua; Tuhua is explicitly a regional collection. This new scope supersedes older five-group guidance.

A uniform website depth is not evidence that scholarly classifications have identical ranks. Cluster entries distinguish an attested classification from an explicitly geographic collection. Geographic collections do not claim a new dialect subbranch. Source titles, editions and locators remain attached to cluster and locality records. Do not nest Guangfu and Yuehai as though all sources treat one as the other’s child.

The catalogue in `src/data/atlas/` includes source-attested locality references. The `learningPlaces` adapter gives every catalogue locality a stable learning address. Actual coverage is computed from its evidence; neither this adapter nor the older `mapPoints` collection is a completion flag. Counts must distinguish catalogue references from learning collections: a new catalogue point does not imply a completed vocabulary bank or photo gallery. Unsourced readings, borrowed neighbouring pronunciations and duplicate place aliases must never pad coverage.

The single persistent tree, search, branch-name toggle symmetry, arrow-only disclosure, scroll preservation, mobile panel and immediate navigation remain unchanged. Opening a direct lesson URL reveals all four ancestors. Do not add a second navigation system or animated transitions.

## Whole-atlas Map

`/map` is a top-navigation destination beside Language tree, Compare and Romanization. It uses the same `AtlasMap` component as embedded maps. Group/branch filters fit their actual locality anchors; search highlights matches without refitting on every keystroke. Selected places use canonical four-level URLs. `group`, `branch`, `q` and `place` query parameters make the view addressable. Keyboard arrows pan, +/- zoom, and Home resets the map.

New atlas learning is not limited to the older `mapPoints` list. `src/data/learning/places.ts` provides addresses for all catalogue entries; actual source data determines which chapters exist. Branch and cluster overviews aggregate only their descendant locality evidence. Explicit branch-comparison resources may appear at group/branch level, but are never turned into a local reading. Undocumented leaves retain their source entry and locality map; they do not gain repeated footer navigation or borrowed lessons.
