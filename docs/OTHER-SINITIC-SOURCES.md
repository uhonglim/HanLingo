# Jin, Hui, Pinghua and Tuhua: first sourced collection

This batch adds 40 locality references in 21 clusters and 18 branches. It supplies 421 reviewed lexical readings for three source localities: Taiyuan 172, Jixi 115 and Guilin 134. Catalogue presence does not mean a complete course. No Tuhua pronunciation has been inferred from a nearby survey.

## Classification and geography

- [Jing Liwen 2025 county divisions](https://doi.org/10.5281/zenodo.15897647), CC BY 4.0: the 2012 Language Atlas framework with 2023 administrative names. Used for Jin and Hui branch placement. County distribution is not a recording of every resident or the county seat.
- [Academia Sinica locality catalogue](https://xiaoxue.iis.sinica.edu.tw/ccrdata/): separately named reference sheets establish Pinghua and Tuhua locations and their survey labels. Coordinates are separately attributed to the derived Sincomp index, not to the Sinica webpage. Its older Jin/Hui classification is not silently substituted for the 2012 framework.
- [Huang, Grieve and Jiao LACD930 supplement](https://doi.org/10.5281/zenodo.10697975), CC BY 4.0: exact-name matches in `cn_xy.csv` provide coordinates only. Computational FCM labels are not used as formal subdivisions.
- Four remaining anchors use Wikidata P625 at the named district/county, with item URLs beside each record. Guilin uses the pinned Liu dataset coordinate instead.

`src/data/atlas/other-sinitic.ts` preserves each classification source, source edition, scope, coordinate source and whether a cluster is a scholarly classification or a geographic collection. Tuhua is an explicitly geographic cover term, not a demonstrated unified clade. These intermediate collections supply consistent navigation without inventing linguistic ranks.

Important distinctions: Jincheng uses 2012 Shangdang/Jincheng rather than the older Sinica Han–Xin/Huo–Ji assignment. Qimen refers to Qishan town under Qi–Wu, not every Qimen variety. Shitai is a county-distribution reference for its Hui portion, not a claim about the county seat. Jixi is 績溪 in Anhui, not 雞西 in Heilongjiang. Nanning names the Tingzi Pinghua reference; Nanning Cantonese and Weizilu Pinghua are separate. Jiangyong names Baishui; unrelated Jiangyong lexical forms are not assigned to that village.

## Lexical records and reproducibility

Source: Liu Lili, Wang Hongzhong and Bai Ying, *现代汉语方言核心词·特征词集* (2007), as digitized and standardized in [Lexibank liusinitic](https://github.com/lexibank/liusinitic/tree/54f6742d9fa60315ae41b91d0d1e02f04036efb5), CC BY 4.0. The imported version is pinned to commit `54f6742d9fa60315ae41b91d0d1e02f04036efb5`.

Run `python3 scripts/import-other-sinitic.py` to reconstruct the learning module and `docs/other-sinitic-lexical-provenance.json`. The importer downloads missing public files from that exact commit and verifies fixed SHA-256 hashes before use. The ledger records each source row, raw pronunciation, original characters, source hashes, rejected-row counts and peer-review holds. Every displayed word links to its original CSV line.

The subset preserves the original `Value` and `Chinese_Characters`, adding syllable spaces and IPA brackets only. It excludes annotated/edited forms, uncertain written forms, unsupported source vowel ᴀ, marked sandhi, unspecified neutral-tone notation and extra alternatives. The supplied full pitch digits remain pitch contours, never invented tone values. `Segments` is not substituted for the original transcription. Four obvious English heading edits are limited to “mather” → “mother”, “rightside” → “right side”, “leftside” → “left side”, and “live(alive)” → “live; be alive”.

Five rows are held after independent raw-row review: Jixi give 囗 is a missing-character placeholder; Jixi stand 乃豈 may encode a decomposed rare character; Taiyuan throw 仍 and Taiyuan/Jixi near 進 have unresolved character/gloss contradictions. They have not been silently corrected. Four additional Guilin forms containing the same missing-character marker 囗 are excluded by the general character filter. Local semantic choices such as Jixi sit 跪 are preserved as source-local attestations rather than rejected merely for differing from Standard Written Chinese.

Publication year is 2007; collection dates and speaker ages are not supplied. Those gaps are visible beside the readings. No native recordings or generated connected-speech forms are claimed.

### Guilin is a source-specific reference

The dataset authors explicitly discuss Guilin as assigned to Pinghua by Liu et al. 2007 while observing high lexical similarity to Mandarin: [Wu et al., Language Dynamics and Change 13 (2023), 161–197](https://doi.org/10.1163/22105832-bja10023), also available in the [author repository](https://pure.mpg.de/rest/items/item_3490681/component/file_3490688/content). The classification is retained as this source’s reference. It is not a claim that all Guilin speech is Pinghua, and it is not identified with the separate Chaoyang or Yanshan village sheets. The label and reading note retain this qualification.

## Culture and photographs

The three lexical packs each have two documented culture topics: Shanxi Museum bronzes and exhibitions; Jixi food and crafts; Guilin noodles and archaeological ceramics. Each topic links to the primary museum, government or national heritage record. These city/county scenes are cultural context, not proof of speaker identity, recording location or exclusive ownership by one language community. Gallery attribution and licenses are maintained independently in the gallery data.

## Remaining gaps

Most new catalogue points still need exact-locality lexical and recording evidence. Taiyuan, Jixi and Guilin are the current three lexical packs, not proxies for every descendant place. Tunxi materials are not reassigned to Jixi; Weizilu materials are not reassigned to Tingzi. The publicly listed Sinica download endpoint refused access during this audit; access controls were not bypassed. Tuhua therefore retains an explicit pronunciation gap pending retrievable, place-matched evidence.

## Coordinate audit trail

The georeferenced CCR rows come from [Sincomp’s `ccr_dialects.csv`](https://github.com/lernanto/sincomp/blob/537236686ac30938aff807c4858de5b8d5c24e73/src/sincomp/ccr_dialects.csv), pinned at `537236686ac30938aff807c4858de5b8d5c24e73` (MIT repository). Local cache `.evidence/atlas-1000/research-ccr-dialects.csv` was byte-compared with that pinned remote file: SHA-256 `8a625db374428c311795847986dfca82abb9ff857f843a205a9b0360c45086c6`. Source rows are matched by the 編號 field and use 經度/緯度 as approximate anchors; these derived coordinates are not claimed as original Sinica recording coordinates. Qimen and Meicheng use that same index’s named-place coordinates. `geographySource` identifies the derived index separately from the linguistic classification source. The other cached inputs are `.evidence/atlas-1000/research-lacd-cn_xy.csv` and `.evidence/atlas-1000/wikidata-counties.json`; source record locators are retained in each atlas entry.
