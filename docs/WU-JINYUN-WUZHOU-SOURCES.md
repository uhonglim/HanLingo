# Jinyun, Yongkang and Wuyi source starters

This bounded collection adds **20 Jinyun lexical examples**, **6 Yongkang character readings** and **8 Wuyi character readings**. It does not establish a complete course, contemporary community norm or new recording collection. All three reuse existing locality pages. No photographs or audio are added by this module.

The manually reviewed factual ledger is [wu-jinyun-wuzhou-provenance.json](wu-jinyun-wuzhou-provenance.json). `src/data/learning/wu-jinyun-wuzhou.ts` derives the published entries directly from it; no network import or inferred pronunciation is involved.

## Jinyun: one recorded speaker, explicit pitch

William Steed and Phil Rose, 2009, *Same Tone, Different Category: Linguistic-Tonetic Variation in the Areal Tone Acoustics of Chuqu Wu*, Interspeech, pp. 2295–2298, DOI [10.21437/Interspeech.2009-650](https://doi.org/10.21437/Interspeech.2009-650). The [original ISCA PDF](https://www.isca-archive.org/interspeech_2009/steed09_interspeech.pdf) is the transcription source.

- Page 2295 identifies the Jinyun material as Zhu Xiaonong’s late-1990s recordings; the analysis uses one speaker per site. No Jinyun settlement, speaker age or exact recording date is supplied.
- Page 2297, §3, gives the selected Han, segment sequences and English glosses inside brackets headed by their pitch values. The same section identifies the notation as Chao tone notation. These values are supplied pitch, not tone-class numbers.
- Underlining in the checked-tone entries marks short duration. The data retain [ʔ] and the supplied contour; the visible register label and note preserve the duration qualification.
- The source PDF contains legacy font mappings. Rendered inspection takes precedence over PUA text extraction. The Greek-looking epsilon glyph in 杂 is represented as Unicode IPA ɛ, with that typographic mapping recorded. 登 remains the printed [najŋ³⁴²] with the source gloss “climb”; no spelling repair is made from expectations.
- Four examples outside this starter remain held for more detailed tied-coda or syllabic-fricative handling: 懂, 时, 是 and 醉. They are not declared source errors.

### Classification difference

The existing `jinyun-county-331122` route is **Wu → Jinqu → Jinqu county references**, after Jing’s 2025 county dataset and its second-edition atlas framework. The pronunciation paper calls its Jinyun reference **Chuqu**. The source labels are explicitly distinguished beside every pronunciation, in a local sound note, and in resources. Keeping the current route does not assert that the two classifications are equivalent or that the paper endorses Jinqu. No settlement is invented to resolve the difference.

The existing map anchor remains a county orientation point, not a located recording site. The late-1990s reference is visibly dated.

## Yongkang and Wuyi: character readings with an unknown number key

Zhongmin Chen, 2014, *On the Relationship between Tones and Initials of the Dialects in the Shànghǎi Area*, TAL 2014, pp. 116–119. [Original ISCA PDF](https://www.isca-archive.org/tal_2014/chen14b_tal.pdf).

Page 118, §4 items 3–4, provides the selected character examples. It names Yongkang and Wuyi but gives no exact settlement, consultants or collection date for those comparative examples. The existing broad place references and approximate anchors are retained.

The superscript numbers 1, 3 and 5 are **not supplied with a key in this paragraph or elsewhere in the paper**. Their resemblance to conventional category numbering is insufficient to turn them into pitch contours or named categories. Therefore:

1. Full printed segment-plus-number forms remain in the ledger and per-reading note.
2. Learner IPA contains only the attested segments, with `toneNotation: 'unspecified'`.
3. The visible register label states the source number and missing pitch.
4. HanLingo spelling converts the segments only. It does not invent tone values.
5. These are `character-reading` entries with neutral character labels, excluded from meaning questions. Eligible spelling practice remains available.

The leading glottal stops in [ʔm], [ʔn] and [ʔl] are preserved. Wuyi 表/拜 retain plain [p]. A 500-dpi crop confirms the exact character 綳, with 朋 on the right; it is not silently replaced with 繃.

## Culture and rights

Two distinct culture topics and useful source links are included for each locality. The cited national heritage records document Yongkang tin craft and Yuyuan’s building tradition. Zhejiang/Lishui government English pages document Jinyun shaobing and Xiandu, Yongkang’s hardware fair, and Wuyi’s historic urban area. Named sites within a county are described as cultural context, never as consultant origins. Legends are labelled as legends. No images from these pages are copied.

Both phonetic papers are publicly readable; no general open reuse licence was established. Steed and Rose’s paper bears Copyright 2009 ISCA. This collection uses a bounded set of factual readings and glosses, with links and attribution. It does not redistribute paper scans, full tables, substantial prose or recordings, and does not claim a CC licence.

## Verification

- Every selected source cell was visually checked against rendered page 3 of its PDF by the authoring agent and independently by `min_overseas_readings`; the parent also corroborated the readings. Source PDF hashes and review scope are in the ledger.
- Ignored raw evidence: `.evidence/wu-hui-next/`, including the PDFs, page renders, high-resolution glyph crops and `independent-overseas-review.json`.
- Tests cover exact source transformations, all source-contour preservation, unknown-number exclusion from IPA/spelling, character exclusion from meaning practice, spelling-practice eligibility, the 麻/马 tonal distinction, and per-locality sound/culture/source coverage.
- Shared conversion maps [ʌ] to `eu` as a deliberate many-to-one reading family with [ɤ]; exact IPA remains distinct. This shared-key change is maintained by the parent, not this data module.

The Lanxi Xiangxi ChinaXiv lead remains unimported: both the original record and linked PDF returned 403. A third-party machine translation is not a substitute transcription source.
