# 1,000 locality references

This release retains the existing 308 references and adds 692 distinct county-level geographic references. The total is 1,000: Mandarin 695, Min 84, Yue 57, Hakka 71 and Wu 93, across 36 branches and 94 clusters or geographic collections. It does not add 692 speaker surveys or completed courses. The four browsing levels remain group → branch → cluster → locality. County-level distribution records are explicitly labelled on their pages; boundaries and uniform accents are not inferred.

## Sources and use

- **Classification:** Jing Liwen, 2025, [《中国语言地图集(第2版)汉语方言卷》县级行政单位方言数据集](https://doi.org/10.5281/zenodo.15897647), CC BY 4.0. We adapted factual locality names, county identifiers and source classification fields from the tab-delimited `《中国语言地图集（第2版）汉语方言卷》数据集.csv`. This is Jing's tabulation of the second-edition Atlas, with administrative references updated to 2023; it is not an official digital edition of the Atlas. Province-code values in this file are inconsistent and are not used.
- **Independent comparison:** Dan Qin's [Chinese dialect distance county table](https://github.com/dan-qqq/Chinese_dialect_distance/blob/master/data/CH_dialect_county_compl.csv). Only matching group/branch assignments were eligible. Both tables draw on earlier classifications; agreement is a consistency check, not independent fieldwork. Qin does not confirm the finer subdivisions provided only by Jing. No speech, recordings or text corpus is imported from this comparison.
- **Geography and common names:** [Wikidata](https://www.wikidata.org/), CC0, retrieved 9 October 2026. Exact county-identifier joins use P442 after removing its formatting spaces. Each included item has one unambiguous coordinate/name result. P625 coordinates are administrative reference anchors, not speaker addresses. Existing community names are preserved. Newly documented English geographic labels are not presented as local endonyms or HanLingo pronunciation.
- **Coordinate review:** Huang, Grieve and Jiao's [2024 LACD research supplement](https://doi.org/10.5281/zenodo.10697975), CC BY 4.0, was used as a secondary geographic cross-check where locality identity was comparable. Its computational clusters were **not** imported as linguistic classifications.

Each new locality links its classification source and its specific Wikidata entity. `atlas-county-provenance.json` retains the original source row number, source ranks, comparison fields, geographic identifier, exact coordinates and the checksums of the retrieved files. Licensing applies to those factual extracts; no source implies endorsement of HanLingo.

## Selection and exclusions

The classification table contains 3,666 rows, including repeated rows, mixed-language areas and non-county records. Only a single distinct full classification tuple per county was considered. Codes ending `00`, unresolved coordinates, competing results, group/branch disagreements and unsupported rank mappings were held back. This produced 1,724 exact-join candidates before duplicate and scope review.

The final selection excludes matching existing names/aliases, same-group anchors within 12 km of an existing reference, unresolved Chinese name matches, and independently identified geographic problems. This conservative overlap screen prevents padding; it does not claim that neighbouring localities speak alike. The excluded Lujiang County item had an erroneous coordinate in central Hefei. Code 350527 was also held because its administrative entity was not an unambiguous present-day locality reference. It is not used as a substitute for documented Kinmen speech.

All eligible non-Mandarin candidates surviving this review were considered first. Mandarin additions were distributed across the eight branches, using a stable county-code order within each branch, until 692 additions were selected. This is a curated size-limited catalogue, not an exhaustive list of all local speech varieties or an equal-sampling survey. There are no repeated Wikidata entities or exact coordinate duplicates in the added set.

## Ranks and names

Mandarin source 方言区 maps to branch and 方言片 to cluster; a lower 小片 remains in the source locator. For other groups, the named source 方言片 maps to branch. A source 小片 is used only where explicitly given. Branch-only records use clearly labelled geographic collections. The mapping does not invent a linguistic subbranch to fill a URL level.

Second-edition divisions that differ from the site's earlier gazetteer/2008 references retain an edition note. They are not silently substituted for older divisions. Only new nodes with actual selected descendants are published. The older pages, their IDs, lessons, dual names and compatibility routes remain intact.

No IPA, local-name pronunciation, audio, photograph, word list or HanLingo spelling was generated for the added county records. They do not acquire Words, Photos, Sounds or Practice links without separate evidence. The whole-atlas content audit includes their zero coverage.

## Reproduction and acceptance

- `python3 scripts/import-atlas-counties.py` rebuilds the application data from the reviewed provenance ledger and rank crosswalks.
- `python3 scripts/import-atlas-counties.py --verify-sources` additionally compares every selected row, identifier, name and coordinate against the checksum-pinned raw downloads in `.evidence/atlas-1000/`. The classification file comes from the DOI record's named CSV. The comparison comes from Qin's linked CSV. The Wikidata response is the query below.
- `npm run audit:content` regenerates all 1,000 locality coverage rows, including gaps.
- Atlas tests check unique IDs, canonical routes, sources, parent ranks, static paths, searchable county codes and absence of invented learning chapters. Map tests include a 1,000-point fixture. The persistent tree mounts expanded children only and retains expansion/search state.

```sparql
SELECT ?item ?code ?coord ?itemLabel ?itemLabelZh WHERE {
  ?item wdt:P442 ?code; wdt:P625 ?coord.
  FILTER(STRLEN(?code)=8)
  OPTIONAL { ?item rdfs:label ?itemLabelZh. FILTER(LANG(?itemLabelZh)="zh") }
  SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
}
```

A future retrieval can differ as source records improve. Compare it to the saved checksums and re-review changed rows rather than silently regenerating a new release.
