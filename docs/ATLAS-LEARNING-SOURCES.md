# Atlas learning sources

This addition contains **1,152 source-attested readings across 15 localities**: 32 Huangyan examples and 80 readings each from 14 survey localities. It does not make all 300 atlas localities equally complete. A reference marker, photograph or culture note does not establish a local pronunciation.

The application loads `src/data/learning/atlas-learning.ts`. Its packs merge with existing locality material; different studies remain separate records. The source IPA is preserved, and HanLingo spelling is computed through the global converter. No new pronunciation is generated from Han characters or source romanization.

## Huangyan: Ningxi speaker reference

**Source:** Jeroen van de Weijer, Marjoleine Sloos and Yunyun Ran, “Huangyan Taizhou,” *Journal of the International Phonetic Association* 53(2), 532–546 (2023; first published online 28 October 2021). [Publisher and DOI](https://doi.org/10.1017/S0025100321000189).

- `atlas-huangyan.ts` transcribes 32 individual consonant-table examples on printed p. 538. Each character, gloss and transcription was checked against the rendered original page; text extraction corrupts several characters and IPA symbols and was not used as the final authority.
- The participant is a 24-year-old male native speaker from **Ningxi Town**, Huangyan District (p. 532). Every record carries that scope. These are not labelled as a uniform urban Huangyan or district-wide pronunciation.
- The article uses its own eight **tone categories**, numbered 1–8 (pp. 536–537). They are not pitch values or the traditional historical tone-category numbering. Records use `toneNotation: 'source-category'`; HanLingo displays category suffixes separately from pitch contours.
- Original affricate ligatures and superscript digits remain in IPA. Chinese characters are presented in traditional form. The paper’s voiced-obstruent symbols can represent breathy release in isolated words; its qualification on p. 538 remains in the learning notes and affected word notes. No phonation marks were inferred or added to the source examples.
- **Rights:** the article is copyrighted by its authors and published by Cambridge University Press. No open licence is claimed. This addition uses attributed individual lexical facts and independently written explanations; it does not redistribute article pages, the complete article, table artwork or supplementary recordings.

Yuanfan Ying’s separate 2025 study, [“Complex tone sandhi types in the Sinitic Wu dialect of Huangyan”](https://doi.org/10.3765/plsa.v10i1.5935), is a contextual resource. Its [publisher page](https://journals.linguisticsociety.org/proceedings/index.php/PLSA/article/view/5935) specifies CC BY 4.0. It concerns a different, older urban speaker and uses pitch contours. Its readings and tone values have **not** been substituted into the Ningxi examples.

Huangyan photographs and culture material are maintained separately; a cultural photograph does not authenticate a spoken word.

## Beida 1964: licensed, dated lexical survey

**Published survey:** Běijīng Dàxué 北京大学 (1964), *Hànyǔ fāngyán cíhuì 汉语方言词汇 [Chinese dialect vocabularies]*, Beijing: Wenzi Gaige.

**Digital edition:** [Lexibank `beidasinitic` v5.1](https://doi.org/10.5281/zenodo.13149151), maintained/edited by Johann-Mattis List, with Beijing University credited for data collection. The edition declares **[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)** in its metadata and licence file. The import is pinned to [commit `6bb8f57330f3b28c126a633f2c2adc6d01d0f555`](https://github.com/lexibank/beidasinitic/tree/6bb8f57330f3b28c126a633f2c2adc6d01d0f555).

The [pinned edition README](https://github.com/lexibank/beidasinitic/blob/6bb8f57330f3b28c126a633f2c2adc6d01d0f555/README.md#notes) states that the data were **collected in the 1950s**, published in **1964**, and digitized during 2012 and 2016. Its editors supply morpheme segmentation and a **slightly adjusted IPA transcription**. Thus `Value` is the CLDF source IPA, not a verified facsimile of the printed book. Every reading carries **1950s survey · published 1964**; these are not newly recorded speech or a reconstruction of a historical language stage. Their inclusion supports source comparison within the geographic atlas; it must never imply that every present-day speaker uses the recorded form.

| Source locality | HanLingo locality ID | Selected readings |
| --- | --- | ---: |
| Beijing | `beijing-city` | 80 |
| Chaozhou | `chaozhou` | 80 |
| Chengdu | `chengdu` | 80 |
| Fuzhou | `fuzhou` | 80 |
| Guangzhou | `guangzhou` | 80 |
| Hefei | `hefei` | 80 |
| Jinan | `jinan` | 80 |
| Meixian | `meixian` | 80 |
| Shenyang | `shenyang` | 80 |
| Suzhou | `suzhou` | 80 |
| Wenzhou | `wenzhou` | 80 |
| XiAn | `xian` | 80 |
| Yangjiang | `yangjiang` | 80 |
| Yangzhou | `yangzhou` | 80 |

Mapping is explicit and reviewed. No coordinate-nearest joins, neighbouring accent inheritance, automatic source classification import or locality-name guesses are used. Xiamen is deliberately excluded because its dedicated lessons use a separate collection. Source localities outside the current atlas are not silently created or assigned to another place.

### Record preservation and selection

- CLDF source `Value` supplies the displayed IPA, including that edition’s stated transcription adjustments. The normalized CLDF `Segments` field is deliberately **not** substituted for it.
- CLDF source `Benzi` supplies the local written form. Questionnaire `Chinese_Gloss` is not a substitute for local characters. Spaces in `Benzi` are removed for display; CLDF source text remains in the provenance manifest.
- The importer inserts syllable spaces only at supplied tone boundaries and wraps the CLDF source transcription in display brackets. It does not change CLDF source segments or supplied pitch digits.
- One form per source concept is selected, with familiar food, household, nature, people, time and action meanings prioritized, followed by the original questionnaire order. Distinct concepts that share an English label remain distinguishable source records.
- Only complete, uncomplicated pitch transcriptions supported by the current converter are included. Forms with neutral-tone zeroes, mixed sandhi notation, missing tones, annotations, unresolved characters or edited source values are excluded pending review. Exclusion does not imply that those forms are linguistically invalid.
- Each displayed reading links to its CLDF source CSV row at the pinned commit and identifies its record ID and licence. Existing studies are not overwritten.

### Reproduce and audit

Run from the project root:

```sh
node scripts/import-atlas-lexicon.mjs
```

The script downloads pinned source files, including the edition’s README, to the ignored `.evidence/atlas-learning/beidasinitic/` cache, checks the declared licence, verifies curated locality IDs and validates conversion without changing IPA. It writes:

- `src/data/learning/atlas-lexibank.ts`: 14 learning packs, 1,120 words.
- `src/data/learning/atlas-lexibank-provenance.json`: upstream commit, edition, licence, citation, SHA-256 checksums, explicit locality matches, skipped-record reasons and each selected row’s CLDF source `Value`, `Benzi`, concept ID and source line.

Reproduction depends on the committed importer and global converter as well as the pinned dataset. Expanding supported IPA can change which records pass the conservative selection; review any regenerated diff. Do not replace the source pin with a moving branch without a provenance review.

The import was checked for 1,120 unique record IDs and exact preservation of source `Value` after removing display spaces and brackets, plus preservation of `Benzi` after removing source spaces. All 1,152 new readings, including Huangyan, convert with their explicitly declared tone convention.

## Coverage still requiring primary evidence

This is a substantive expansion, not a completed course for every atlas marker. The current addition gives new attested lexical material to Huangyan and Hefei and deepens 13 other localities. Source records do not become new locations simply because their names resemble atlas labels.

Potential further sources were inspected but **not imported**:

- Eastling’s locality phonology index: usable source access and redistribution terms were not established.
- The CDDB Hou 2004 collection: broader locality coverage, but licence scope, exact locality matches and mixed citation/sandhi transcription handling still need review before integration.
- Other Lexibank collections: some repeat the same survey cities; others use source fields that are not straightforward IPA or have unresolved locality metadata. They were not used to inflate coverage.

Remaining locality vocabulary gaps must be filled with identifiable dictionaries, recordings or fieldwork references that supply the exact local form and transcription convention. An inherited regional form, guessed tone, translated sentence or local photograph does not close that gap.

## Reviewed incomplete-writing repair

A later source audit identified **10 existing entries containing 囗**, the CLDF edition’s unresolved-character placeholder. A Han-script regular expression had admitted these as if they were complete written forms. The entries remain useful pronunciation-and-meaning evidence, but the placeholder is not taught as a local character.

These 10 records now use `han: null`, `writingStatus: 'not-supplied'`, and `learningKind: 'word'`. Here null means **no complete written form is supplied**: some originals contain known characters alongside the unresolved slot. Exact original `Benzi`, including spaces and known characters, remains in the note and provenance. No inferred character replaces any slot.

The exact IDs, old display forms, original source writing, source lines, IPA, meanings and locality assignments are recorded in [`beida-writing-repairs.json`](beida-writing-repairs.json). They cover Chaozhou sleep/mugwort; Fuzhou bad/old/day-before-yesterday; Hefei dusk; Jinan male pig; Meixian lightning; Shenyang cattle; and Xi’an donkey.

All **1,120 existing IDs, pronunciations, meanings, locality assignments and their order remain unchanged**; the other **1,110 word records remain byte-equivalent after JSON serialization**. Tests verify both preservation hashes and the exact 10 repairs. Every locality still has 80 entries; this repair adds no words.

The importer now follows the ledger’s fixed reviewed source-ID selection instead of recalculating the first 80 eligible rows against a changing IPA converter. It validates each selected source form and fails if a preserved selection becomes invalid. Only the 10 explicitly reviewed IDs receive incomplete-writing handling; newly encountered placeholders remain excluded. The generated `rejected` counters now describe validation of that fixed selection, not a fresh scan of the whole questionnaire. Future vocabulary expansion requires a separately audited selection change rather than raising the limit blindly.
