# Luzhou and Mazhuang character comparison

This bounded starter contains 18 character readings: nine for the existing Changzhi reference and nine for the existing Handan reference. It adds no vocabulary meanings, recordings, photographs or locality nodes.

## Primary source and scope

支建刚 Zhi Jiangang (2024), 晋冀豫交界晋语知庄章组声母的读音类型与分布格局, *Journal of North University of China, Social Science Edition* 40(4):2–8. [Publisher record](https://cjournal.hep.com.cn/1673-1646/CN/1200838577191264424), [publisher PDF](https://cjournal.hep.com.cn/1673-1646/CN/PDF/10.3969/j.issn.1673-1646.2023127).

Printed p.3 defines the sample as speakers born before 1952 and explains smaller administrative labels. Table 1 on printed p.4, PDF page 3, explicitly identifies **長治潞州** and **邯鄲馬莊**. Publication in 2024 does not date the interviews. These are historical-cohort study references, not universal contemporary city pronunciations. Table headwords are elicitation characters, not source-defined everyday vocabulary.

The existing Changzhi leaf is a general locality reference, with an approximate city anchor. The existing Handan leaf is also a general locality reference; its geographic source is a Congtai District coordinate, not a Congtai accent survey. The new Handan readings are specifically Mazhuang. Sound notes and source descriptions explicitly distinguish that sample from the map anchor. No coordinate was moved and no municipality was duplicated.

## Transcription policy

The table supplies segmental IPA with corner tone marks. No complete paper-specific key for those marks was found. Unicode names identify the codepoints but do not establish the author's local category system. Consequently:

- Each original form and mark is retained in the versioned provenance and reading note.
- Displayed IPA removes only U+A700–U+A707; all visually printed segmental characters and combining marks remain unchanged. The PDF text layer adds a nasal tilde to Changzhi’s first four cells, but the rendered table clearly prints plain ɑ. The ledger preserves both the extracted strings and the visually corrected forms; two reviewers independently checked this distinction at high resolution.
- Every entry has `toneNotation: 'unspecified'`, `learningKind: 'character-reading'`, and a visible label naming the exact locality, age cohort, raw tone mark and absence of pitch.
- No pitch, tone number or category name is reconstructed. HanLingo spelling covers only the supplied segments.
- All 18 are excluded from meaning practice. Changzhi has four distinct segment spellings and supports spelling practice; Handan has only three, so it does not independently supply a practice deck.

The paper's special note about Licheng ꜇2 is outside this selection and is not a general tone legend. Eight Heshun–Yixing candidates remain held in the evidence ledger because a suitable exact-town geographic anchor has not been verified; they are not exported.

## Rights and reproducibility

No explicit open licence was found for the article. This is a small, attributed factual comparison, not a transcription or republication of the article. No table images or article prose are published. Source PDF SHA-256 and exact table/column locators appear in `jin-comparative-provenance.json`. Local review images remain ignored under `.evidence/jin-hui-pinghua-next/`.

Run `python3 scripts/import-jin-comparative.py` to reproduce the module from the versioned factual ledger. The importer refuses held or unreviewed rows and asserts exact removal of the documented nonsegmental marks. It makes no network request.

## Cultural context

The Changzhi city government's [2025 architectural account](https://www.changzhi.gov.cn/ztzl/cjwmwz/shfs/202505/t20250509_3044465.shtml) locates Shangdang Gate and Lu’an City God Temple in Luzhou. The Handan Commerce Bureau's [2026 official list](https://hdsswj.hd.gov.cn/?a=view&p=3&r=5059) documents the Handan Dao pedestrian district. The housing bureau's [2026 city-renewal account](https://zjj.hd.gov.cn/html/handanyaowen/8342.html) documents textile-memory decorations in the Cotton Mill No. 3 residential community. The latter two describe wider Handan city culture, not a claim about Mazhuang speakers.
