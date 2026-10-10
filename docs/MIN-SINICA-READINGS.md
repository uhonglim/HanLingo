# Min character-reading expansion — 9 October 2026

This collection adds **1,500 sourced character readings**, 100 for each of 15 locality references. It is not a new speech survey, a spoken-word translation list, or 1,500 audio recordings. Each record is typed `character-reading` and labelled `Character <han>`; separately attributed written-character senses may help identify the graph, but actual local word choice can differ. These readings are excluded from lexical meaning quizzes. Source readings supplement existing collections without replacing them.

| Branch | Exact locality reference | Readings |
| --- | --- | ---: |
| Eastern Min | Gutian, Fuzhou, Fuqing, Zherong, Fu’an, Ningde | 600 |
| Northern Min | Chong’an town (Wuyishan), Tancheng (Jianyang), Songxi, Jian’ou | 400 |
| Puxian Min | Xianyou town, Putian | 200 |
| Central Min | Shaxian town | 100 |
| Leizhou Min | Leicheng, historically Haikang | 100 |
| Southern Min | Bangkok Teochew | 100 |

No Matsu recording is assigned to Nangan or another island. No Sanming Sanyuan data is assigned to Liedong or Liexi. No character database classification silently replaces the atlas hierarchy. No Hong Kong, Singapore, Malaysian or Taiwanese reading is inferred from these locality sheets.

## Source and rights

[Academia Sinica’s 小學堂 download page](https://xiaoxue.iis.sinica.edu.tw/ccrdata/) publishes its independently downloadable phonological fact files under the [Public Domain Mark 1.0](https://creativecommons.org/publicdomain/mark/1.0/). The complete online database has separate editorial rights; this importer uses only the expressly downloadable Min fact archive.

- Archive: `https://xiaoxue.iis.sinica.edu.tw/ccrdata/file/ccr10_minyu_data_xlsx.zip`
- Downloaded: 2026-10-09.
- Archive SHA-256: `4d849388c03b7a537e58d3c9ed4fa0ddb90566c0c48d909a5b7880d0950e8fed`.
- `docs/min-sinica-reading-provenance.json` retains exact workbook names and hashes, row numbers, character IDs, and the original initial, rime, pitch-value and tone-category fields for every included record.
- These are database attestations compiled from documentary sources. The archive download date is not a speaker-recording date or a claim that every present-day resident uses each form.

## Import contract

`python3 scripts/import-min-sinica.py` uses Python’s standard library. It downloads the archive only when missing, verifies the pinned hash, reads the XLSX XML directly, and deterministically regenerates `src/data/learning/min-expanded-readings.ts` and the provenance ledger. An archive change causes a hard failure requiring review. Supply a local archive path as the first argument to reproduce from the saved bytes.

The source explicitly separates 聲母 (initial), 韻母 (rime), 調值 (pitch value), 調類 (tone category), and 備註 (notes). The only transcription operation is concatenating initial + rime + pitch value inside IPA brackets. Source initial `0` denotes zero onset and is omitted. No sounds, glides, aspiration, lengths, tones, or sandhi rules are added. IPA is retained in `ipa`; the existing shared converter produces HanLingo spelling at display time.

Selection uses an ordered character list spanning food, family, body, landscape, animals, household objects, actions, numbers, time and qualities. It stops at 100 accepted readings per place. Records are excluded when:

- the character is absent or appears in more than one source row;
- the source has any usage/reading annotation requiring individual interpretation;
- a field contains alternate readings or ambiguous punctuation;
- initial/rime is missing or pitch is not explicitly one to three digits from 1–5.

These conservative filters intentionally leave gaps rather than choosing a convenient variant. The original traditional tone category stays in each reading’s visible note. It is never substituted for pitch. Prior studies with different readings retain their own IDs and scope.

## Audited examples

The following source cells were inspected directly, independently of the rendered HanLingo forms:

| Sheet | Character | Initial | Rime | Pitch | Result |
| --- | --- | --- | --- | --- | --- |
| 235 · 海康(雷城話) | 魚 | h | u | 11 | [hu11] |
| 236 · 仙游(城關話) | 魚 | h | y | 24 | [hy24] |
| 238 · 古田 | 魚 | ŋ | y | 33 | [ŋy33] |
| 243 · 福安 | 魚 | ŋ | øi | 22 | [ŋøi22] |
| 247 · 建陽(潭城鎮城關話) | 魚 | ŋ | y | 334 | [ŋy334] |
| 251 · 沙縣(城關話) | 魚 | g | y | 31 | [gy31] |

Shaxian’s source `[g]` remains `[g]`; it is not changed to a nasal onset. Source `[y]` follows the global HanLingo `ü` mapping. Leicheng’s `[h]` is not replaced with an onset from another Min locality. The source explicitly lists each pitch in its 調值 field.

## Source discrepancy held out

Sheet 235 (Leicheng) row 245 records 雞, character ID 3066, as `l + oi + 213`. The adjacent variant 鷄, ID 3067, has `k + oi + 213`. Both are unannotated. This is an inconsistency in the published fact file, not a parser change. Neither form is chosen as a lesson about 雞 until the underlying dictionary can resolve it. The importer explicitly holds the selected 雞 entry and fills the 100-entry quota with the next eligible character. The discrepancy is also recorded in the machine-readable ledger.

An additional audit compared available simple, unannotated variant entries for 雞/鷄, 貓/猫, 床/牀, 窗/窓, 船/舩, 碗/盌/椀, 畫/畵, 樹/树, 鐵/鐡/鉄, 葱/蔥 and 峰/峯 across the selected sheets. No other disagreement involving a selected lesson was found in that limited check. It is not a claim that the source database is free of errors.

## Validation

The importer pins source bytes and retains a per-record ledger. The verification script `node scripts/verify-min-sinica.mjs` checks the 1,500 generated records, exact reconstruction from that ledger, uniqueness, tone labels, and conversion through the shared IPA key. It also checks six independent spot examples, 100 distinct characters per locality, the explicit `character-reading` type, neutral character labels and zero eligibility for lexical meaning quizzes. The 1,500 record IDs, characters, IPA strings and pitch values are unchanged by the record-kind correction.

Full project tests, content inventory, browser acceptance, and release verification remain parent-task integration steps. This file does not claim these readings have audio recordings or that all Min localities now have equal learning depth.

## Character-type correction

An independent integration audit found that these 1,500 records had previously omitted `learningKind` despite being described as character readings. The omission allowed them into meaning practice and counted them as lexical words. The importer now emits `learningKind: character-reading`, neutral `Character <han>` English labels and preserves every source pronunciation and stable ID. Manual character glosses used to prioritize the original selection are not published as source-attested local translations. The shared, independently attributed written-character aid is maintained separately.
