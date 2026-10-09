# Tunxi and Weizilu lexical starters

This increment adds 20 Tunxi forms and 18 Weizilu forms. These are bounded, contextual lexical examples, not a complete dictionary or contemporary population survey. Alternate forms with the same meaning remain visibly qualified variants.

## Tunxi

Lu Wen, 2017, *Strong and Weak Personal Pronouns in Tunxi Hui Chinese*, NACCL-29 vol.2, pp.519–532. [Official proceedings](https://u.osu.edu/naccl/proceedings/naccl-29/naccl-29-volume-2/). The author supplies the Tunxi reference but no neighbourhood, speaker biography or collection date. Existing `tunxi-hui`, Hui / Xiu–Yi / geographic Tunxi–Yi County collection, is reused.

`docs/tunxi-learning-provenance.json` contains every source form, page and context. `scripts/import-tunxi-learning.py` deterministically builds `tunxiLearning` in `src/data/learning/tunxi.ts`. The PDF hash is recorded in the ledger. Twenty forms were visually checked; a second agent independently checked all twenty.

Nineteen forms have no supplied Han spelling. They use `han:null`, `writingStatus:'not-supplied'`, `learningKind:'word'`. Only 人 is directly supplied, in footnote 2. No familiar Chinese equivalent has been invented. Sentence examples retain a contextual-form label. Source digits are retained as source tone values, not claimed to be new measurements or isolated-word elicitation.

Three strong pronouns end in untoned `-le`. That absence is visible beside IPA; it is not silently given a neutral or lexical tone. Three weak pronouns are visibly marked as needing a following host. Morpheme hyphens become spaces for IPA display; source hyphens remain in notes/ledger. Source `:` becomes IPA `ː`; affricate ligatures remain in exact stored IPA and are handled by the shared converter. The three incomplete forms cannot be converted as complete tonal pronunciations. Do not invent the missing tone merely to make practice work.

No explicit reuse licence was found. Only twenty short factual examples with citations are reproduced; article prose and scans are not published. Known inconsistent person glosses in examples 14b and 20 are not used for the pronoun paradigm. The contradictory historical English note on p.520 is not used. Cultural topics use Huangshan government and Tunxi administration accounts of Old Street and the local museum, independently from pronunciation evidence.

## Weizilu

Hilário de Sousa, 2024, *Some Observations on the Cantonese Lexical Suprafixes*, Languages 9:311, DOI [10.3390/languages9100311](https://doi.org/10.3390/languages9100311). **CC BY 4.0**, printed on article p.1. The selected Weizilu forms occur on pp.17–18, and Appendix B p.28 identifies them as the author’s fieldwork. Publication year is not a fieldwork date; no speaker identity or age is supplied.

`docs/weizilu-learning-provenance.json` preserves each original morphological transcription. `scripts/import-weizilu-learning.py` builds `weiziluLearning`. The importer implements the author’s explicit §1.1 rule: in a substitutive suprafix, the number before the superscript hyphen is underlying and **not pronounced**; the number after it is the pronounced tone. Thus source `mɐn²¹⁻⁵³` is displayed `[mɐn53]`, never `[mɐn2153]`. Every affected entry labels tone replacement, preserves the original form in its note and cites the paper. This is lexical morphology, not an inferred general tone-sandhi algorithm. The Cyrillic-schwa codepoint `ә` printed in two IPA forms is normalized to the visually equivalent IPA `ə`, explicitly recorded beside those forms. Suffix boundary hyphens become spaces; no segment is added.

The new `weizilu-pinghua` leaf is separate from existing `nanning-pinghua`, which explicitly refers to Tingzi. Table 5 classifies Weizilu as Southern Pinghua. `yong-river` is already a geographic collection. The paper writes 位子碌; the current community’s university partner writes 位子渌. Both names remain searchable. There is no attested local place-name pronunciation, so no secondary spelling is invented.

Map geography is deliberately weaker than language scope: OpenStreetMap way1037240461 identifies 位子渌路 in Xixiangtang, Nanning. Its representative point is an **orientation anchor on Weizilu Road**, not a village centroid, speaker address or fieldwork location. Nominatim response is cached in `.evidence/jin-hui-pinghua-next/weizilu-nominatim.json`. The road anchor is visibly qualified. Primary university accounts identify the community and support two specific culture topics: handwritten New Year couplets in January 2025 and public-space planning that retains community memories in June 2026. Their photographs are not downloaded or reused by this increment.

## Gaps

Neither starter supplies reusable speaker audio. No recording or synthetic speech is presented as native-speaker evidence. Tunxi’s missing Han and three missing suffix tones remain gaps. Weizilu’s illustrative set contains morphological alternatives, not eighteen unique meanings. Jin Zhi2024 stays in research pending a separate review of older-speaker scope and corner-tone categories.
