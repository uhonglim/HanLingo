# Language evidence, galleries, and spelling

## Evidence and locality

Every reading needs locality, meaning, source, transcription convention and relevant speaker/register scope. Use primary dictionaries, linguistic publications, documented recordings and cultural institutions. Inspect the original table or PDF image when extraction could corrupt IPA, combining marks, column ownership or tones.

- A character reading is not automatically an everyday standalone word or phrase lesson.
- Distinguish lexical choice from phonetic difference. User suggestions such as local names for tomato, soap or market are research leads until their exact locality and form are checked.
- Do not copy Hong Kong readings into Guangzhou, Taiwan Sixian into Meixian, Chongming into urban Shanghai, or Taiwan Hokkien into Amoy.
- Keep Standard Mandarin from a Beijing speaker visibly qualified; it is not an unqualified sample of Beijing vernacular.
- Haifeng segment-only examples have no supplied tones. Preserve the visible “tones not given” qualification in words, comparisons and practice; never fill tones from another town.
- Preserve conflicting source readings separately with scope rather than choosing a convenient universal form. Deduplicate only actual repeated records, not different studies.
- Source category digits are not pitch contours. Source-only Tâi-lô/POJ/Jyutping spellings do not establish IPA automatically.

Data entry points: `src/data/learning/`, `src/data/regional-words.ts`, `src/data/xiamen-lexicon.ts`, `src/components/Pronunciation.tsx`. Read `docs/BRANCH-LEARNING.md` before enabling Words, Photos, Sounds or Practice destinations. No empty exercises or invented recordings.

## Useful depth and photography

Run `npm run audit:content` after relevant data changes; it regenerates `docs/CONTENT-DEPTH.md`. All published branches need learning packs. Each mapped locality currently has a minimum of two specific sound/learning notes, two documented culture topics and two useful source links. A research target of 20 attested readings and three sound notes is a queue for sourcing, not permission to fabricate entries. Generic counters do not fully measure Amoy’s dedicated lessons.

Aim for **9–11 distinct photos per locality**, comparable to Amoy’s 11: architecture, streets, food, crafts, performance and everyday settings. Preserve image source, author, licence, location and accurate caption. Do not pad with duplicate crops/views. Use the shared immersive gallery with keyboard navigation, deep links, filters, credits and mobile layout. A photograph illustrates culture; it does not authenticate a pronunciation or establish someone’s identity.

Expose words, sounds, culture and photos at group/branch overviews with balanced locality sampling. Keep full collections in their existing locality chapters. Do not claim that a photo-rich page is a complete language course.

## Shared romanization proposal

Use one global deterministic IPA-to-HanLingo key. The same IPA receives the same spelling in every locality; different IPA sounds may deliberately share a spelling. This is a lossy reading aid, not a phonemic standard or a claim that the sounds are equivalent. Exact source IPA, source orthographies and documented community place names remain unchanged.

Core stop distinctions remain p/ph/b, t/th/d, k/kh/g and ts/tsh. Append h for aspiration. Shared families include [h x χ]→h, [ɕ ʃ]→sh, [ʑ ʒ]→zh, [tɕ tʃ]→ch (aspirated chh), [dʑ dʒ]→j, [ɲ ȵ]→ny; [a ɑ]→a, [i ɪ]→i, [u ʊ]→u, [y ʏ]→yu, [ø œ]→oe, [ə ɜ]→eo. The retroflex series and implosives retain separate spellings. Further mappings include [ɤ]→eu, [ɨ]→ii, [j]→y, [ɥ]→yw, [ɣ]→gh, [ɦ]→hh and [ɐ]→ă. Read the complete current key in `docs/ROMANIZATION.md` before editing it; do not introduce locality-specific values.

Nasalization uses ASCII ~ after the vowel and supplied length uses :. Syllabicity and unreleased-stop marks are omitted only from the spelling; source IPA keeps them. Supported phonation and voicing combining marks remain visible. Explicit nonsyllabic [u̯ i̯ y̯] becomes w/y/yw; plain [u] remains u, so supplied xuei5 becomes huei5. Do not infer glides, phonation or tones.

The sound key labels mapping roles Core, Shared, Detail and Retained; these do not grade evidence or claim a final community standard. Supplied pitch contours retain digits 1–5, including the source’s one-digit versus multidigit notation. Explicit source categories use ·Tn, never pitch suffixes. Supplied segments without tones receive segment spelling and a visible tones-not-given label. Unsupported sounds remain unresolved. There is no Han-character pronunciation inference, automatic sandhi, phonotactic validation or collision-free reverse conversion.

`/romanization` serves all five groups equally, with examples derived from existing records and live coverage counts. `src/data/romanization-examples.ts` owns examples; `romanization-method.ts` owns parsing. The legacy `xiamen-romanization.ts` is the shared key despite its name. Display `HanLingo spelling` separately from `IPA`. Update meaningful tests for conversion changes. Saved words remain keyed by stable record IDs, not merged spellings; generated translations never supply lesson IPA or HanLingo spelling.

## Catalogue expansion and dated lexical datasets

All catalogue references have a learning address through `src/data/learning/places.ts`; chapters still require actual evidence. Additional packs use `mergeLearningPacks` so duplicate branch IDs do not overwrite older studies. Keep cluster aggregation scoped to descendants, and include `scope: branch-comparison` resources only at appropriate group/branch level. Related-place links never count toward local content depth.

The Beida CLDF importer (`scripts/import-atlas-lexicon.mjs`) pins a commit and licence, records source-file hashes and row locators, and preserves `Value`/`Benzi` rather than replacing IPA with normalized `Segments`. The survey was collected in the 1950s and published in 1964; the CLDF editors slightly adjusted IPA. These facts must remain visible and distinct from new recordings. Review changed selections whenever the converter or source pin changes.

Huangyan's current word table is specifically a Ningxi Town speaker reference, with source tone categories 1–8. Its city-center map marker is not the recording location. Preserve original IPA ligatures; normalize equivalent ligatures only inside conversion/search. Palatal stops now use ky/kyh/gy; the vowel ɵ shares oe in HanLingo spelling while exact IPA remains visible. See `docs/ATLAS-LEARNING-SOURCES.md` and `docs/ROMANIZATION.md`.
