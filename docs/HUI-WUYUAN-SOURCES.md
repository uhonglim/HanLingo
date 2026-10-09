# Youshan village: a bounded Hui reading sample

This increment adds **one village reference and 19 documentary character readings**. It is not a vocabulary course, a whole-county accent, or contemporary speaker audio. The exact character identifications do not establish everyday lexical meanings and remain excluded from meaning practice through `learningKind: character-reading`.

## Primary pronunciation record

Hu Guiyue 胡貴躍 (2016), *中国・徽州方言の音韻的諸特徴 / Phonetic Features of Huizhou Dialects in China*, 人間社会環境研究 32:67–83. [Institutional metadata](https://kanazawa-u.repo.nii.ac.jp/records/5581), [PDF](https://kanazawa-u.repo.nii.ac.jp/record/5581/files/AA12162559-32-67-83.pdf).

This is a departmental journal article, not a thesis. It reports 2015 fieldwork at 36 places. Pages 68–69 explicitly say the survey names are **administrative villages, not townships**. The author selected one lifelong resident per village, normally a male aged 60 or above. The two stated female exceptions are elsewhere; no individual age or speaker identity is supplied for Youshan. These conditions remain visible in every reading’s qualification and note.

The published comparative rows identify 游山 in Wuyuan County. Only that row is selected. The manually checked subset uses table 6 on p.74, the first four columns of table 7 on p.75, and six columns of table 12 on p.80. PDF page numbers are printed page minus 65 because the PDF has a cover.

Transcription rules:

- Preserve the original character forms, including 脳 and 欄. English labels identify characters rather than inventing local meanings.
- Source superscript digits are pitch values, not tone-category IDs. Flatten their typography into the existing pitch-contour representation.
- Table 6 merges some adjacent character columns into an explicit shared cell. Record that ownership separately for each headword; it is not a blank filled from a neighbour.
- 好 is explicitly a verb in the table heading; preserve that qualification without supplying an unverified lexical translation.
- Single-digit duration-bearing examples, ambiguous nasalized sibilant cells, historical reconstructions and every neighbouring village are outside this bounded selection. No tone inventory, local place-name pronunciation or audio is inferred.
- The PDF is scanned and its text layer corrupts IPA. The importer uses the versioned, visually checked ledger; it does not parse OCR into new readings.

## Reuse boundary

The institutional repository makes the article publicly downloadable but supplies **no explicit open reuse licence** on the inspected record. This release includes a small selected set of factual character/pronunciation attestations with citations and newly written explanatory copy. It does not republish the article, its tables, table images or an exhaustive extracted database. Source scans stay in ignored local `.evidence/`, outside the public bundle. Do not describe this source as CC licensed. Any substantially larger import needs a fresh source and reuse review.

## Village, branch and map

`youshan-hui` is 游山村 in 镇头镇, 婺源县. [OpenStreetMap node 5134436407](https://www.openstreetmap.org/node/5134436407), version 1, names that village at longitude 117.4235520, latitude 29.2387878. The Nominatim hierarchy independently resolves the same node to Zhentou Town and Wuyuan County. OSM coordinates are credited under ODbL. This is a village anchor, not an interview location or a boundary.

Qi–Wu placement follows Jing Liwen’s [2025 county classification dataset](https://doi.org/10.5281/zenodo.15897647): Wuyuan code 361130 is 徽语 / 祁婺片. It does not infer a new linguistic subbranch. The existing Qimen–Wuyuan cluster is explicitly a geographic collection. Keep the existing county reference separate from this named village sample. No village IPA for the place name has been collected, so there is no invented secondary name.

## Culture references

- Zhao Huafu 赵华富, [婺源县游山董氏宗族调查研究](https://www.sinoss.net/uploadfile/2010/1130/614.pdf): primary field investigation and historical-document study. Opening page describes the river, bridges and settlement; section 1 describes Jiahui Hall and the village’s lineage halls. The host upload path dates to 2010, but that is not asserted as the investigation date.
- [Zhentou Town government reply, 24 August 2023](https://wenz.jxnews.com.cn/ms/viewpage/202308/view_340107.html): identifies the exact Youshan village and describes building conservation and repairs. Use the labelled official reply, not the preceding resident’s request. Proposed projects are not presented as completed visitor attractions.

Two original culture notes cover the river-and-bridge settlement and Jiahui Hall. Neither note claims that architectural records authenticate pronunciation or that all present-day residents share the survey speaker’s accent.

## Reproduction and checks

Run `python3 scripts/import-hui-wuyuan.py`; it reads `docs/hui-wuyuan-provenance.json` and regenerates the two owned data modules. If the locally cached source PDF exists, its SHA-256 must match the ledger. The ledger contains the selected cell coordinates, merged-column ownership, source hash, scope, map evidence and authored copy. It is deliberately bounded rather than an automatic article extractor.

Run `npx vitest run src/data/learning/hui-wuyuan.test.ts` and `npx tsc --noEmit`. Parent integration owns atlas/learning registry imports and the subsequent whole-site content inventory.

All 19 selected cells received an independent visual review against PDF pages 9, 10 and 15. The reviewer confirmed column ownership, a/ɑ/ɔ glyphs, pitch digits and the 好 verb qualifier. This certifies the selected transcription sample, not every cell in the article. Two targeted tests and TypeScript checking passed; importer regeneration was idempotent.
