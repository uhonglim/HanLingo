# Beida everyday-word supplement

This adds **1,680 words: 120 for each of 14 existing locality references**, extending their Beida collections from 80 to 200 records each. It does not add places, replace the original 1,120 records, or turn dated survey material into contemporary recordings.

These are retained source-record counts. A separate publication filter withholds six older source conflicts: Foochow, Jinan, Xi’an and Yangjiang therefore publish 199 Beida records each, Canton 198, and the other nine localities 200. See `docs/beida-source-conflicts.json`; the original records remain unchanged, but are excluded from learning, comparisons and translation grounding until verified against primary pages.

Beijing, Teochew, Chengdu, Foochow, Canton, Hefei, Jinan, Meixian, Shenyang, Soochow, Wenzhou, Xi’an, Yangjiang and Yangzhou retain the exact locality identities of the original importer. Their existing culture, sound notes and resources continue to apply; the supplement supplies words only. This is lexical depth, not 14 completed language courses.

## Primary dataset and rights

- Běijīng Dàxué 北京大学 (1964), *Hànyǔ fāngyán cíhuì 汉语方言词汇 [Chinese Dialect Vocabularies]*, Beijing: Wenzi Gaige.
- Licensed CLDF edition **v5.1**, [DOI 10.5281/zenodo.13149151](https://doi.org/10.5281/zenodo.13149151), [pinned repository](https://github.com/lexibank/beidasinitic/tree/6bb8f57330f3b28c126a633f2c2adc6d01d0f555).
- Commit `6bb8f57330f3b28c126a633f2c2adc6d01d0f555`; **CC BY 4.0**, verified against the edition’s metadata and LICENSE. Attribution follows its supplied citation. This licence refers to the CLDF edition, not an independent claim about original book scans.
- The survey was collected in the **1950s**, published in **1964**, and later edited into CLDF. Its editors report slight IPA adjustments. Every displayed reading retains this date qualification. No new audio or present-day speaker claim is added.

## Exact forms and meaning review

The importer uses `Value` and local `Benzi`, not normalized `Segments` and not the questionnaire’s generic `Chinese_Gloss` as a substitute written form. Only spaces at supplied superscript pitch boundaries are added. Single-digit contours remain single digits; no missing neutral tone, source-category tone, contextual sandhi, or zero is guessed.

Every selected concept/local-character pairing was reviewed against its English and Chinese questionnaire headings. A second pass checked replacements after holds and duplicate removal. An independent reviewer matched all 1,680 candidate source joins and inspected 28 semantic samples across all 14 places; three additional glyph/order conflicts from that review are held. All subsequent replacement rows were reviewed separately. The fixed selection contains 242 concepts across the 14 places, with one form per concept per place. Different local lexical choices are preserved. For example, Chengdu 房圈 “room” and Soochow 耐 “you” are not rewritten into Standard Written Chinese.

**42 uncertain entries are held**, with exact source IDs, IPA, characters and reasons in the selection ledger. These include 14 園 “round” records versus questionnaire 圓, two 自已 “self” records, probable digitization conflicts such as 撟 “bridge” and 拒子 “cupboard,” a Xi’an pronoun 低, a Wenzhou shirt-character order conflict, a Yangjiang demonstrative 桌昵, and unresolved regional character choices. They are not silently corrected. The holds mean that these source spellings need additional review, not that all unfamiliar regional forms are errors.

Two explicit English-heading corrections affect 19 records. In 12 records, the CLDF heading `shawl` is displayed as **scarf**, following its questionnaire 圍巾 and the selected local neckwear forms. The exact source English and Chinese headings remain in provenance and the correction appears beside the readings. In seven records, `jacket` becomes **upper garment**, following the broader questionnaire 上衣 and local 衫/短衫 forms; their source English is likewise retained. No IPA or local spelling changes accompany these corrections.

The final independent review also identified 11 conflicting pitch sequences between the source `Value` and normalized `Segments` fields; all 11 are held without selecting a preferred value. One further Meixian 家私 form has an unusual source55 for 家: both fields agree, but it is held for original-page confirmation rather than changed to44. Unresolved 囗 placeholders, annotations, ASCII digits embedded among segments, incomplete pitch notation and unsupported IPA are excluded. Previously published incomplete-writing records remain under their separately reviewed migration; the supplement does not touch them. Exact repeated local Han+IPA forms and already published local concepts are excluded from the new selection. Different studies elsewhere in HanLingo are not merged away.

## Reproduction and audit

- Reviewed fixed selection and holds: `docs/beida-deeper-selection.json`.
- Generated source rows, checksums and counts: `docs/beida-deeper-provenance.json`.
- Output: `src/data/learning/atlas-lexibank-deeper.ts`, export `atlasLexibankDeeperPacks`.
- Import: `node scripts/import-beida-deeper.mjs`.
- Read-only reproducibility check: `node scripts/import-beida-deeper.mjs --check`.
- Tests: `src/data/learning/atlas-lexibank-deeper.test.ts`, plus the original writing-repair test to confirm preserved IDs and core fields.

The importer verifies every selected row’s exact original language ID, character string, IPA value, parameter, source line and questionnaire headings. It matches source-file SHA-256 hashes against the original pinned import, rejects pitch disagreement between source fields, checks the shared IPA converter, verifies the original 1,120-record core hash, rejects held/duplicate IDs and concepts, and requires exactly 120 additions per locality. It never selects an arbitrary next 120 records on rerun. A source update or selection change requires a fresh review.

The downloaded files remain under ignored `.evidence/atlas-learning/beidasinitic/<commit>-*`. Review tables and candidate-stage exclusions are under ignored `.evidence/beida-deeper/`; the tracked ledgers contain the evidence needed to reproduce this published selection.
