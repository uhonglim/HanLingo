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

## Agreed romanization decisions

These rules come from direct user decisions:

| IPA | HanLingo | Meaning |
| --- | --- | --- |
| [p] / [pʰ] / [b] | p / ph / b | unaspirated / aspirated / voiced |
| [t͡s] / [t͡sʰ] | ts / tsh | alveolar affricates |
| [tɕ] / [tɕʰ] | ch / chh | alveolo-palatal affricates |
| [˧˥] / [˥˩] | 35 / 51 | supplied pitch contour; 1 low, 5 high |

Append h consistently for aspiration. Preserve distinctions across varieties rather than importing Pinyin letter values. Keep vowels and tones separate. One IPA sound has one assigned spelling; shared Han characters may have different local spellings.

**Trial, not settled:** â=[ɐ], oo=[ɔ], oe=[ɤ], er=[ə], ae=[ɛ], ng=[ŋ], q=[ʔ], th/kh and other extensions currently listed by the converter. sh=[ɕ] remains a candidate; retroflexes, voiced affricates, broader vowels, phonation and syllable boundaries still need decisions. Do not silently finalize them because a new variety needs them.

Retain supported nasalization, syllabicity, length and unreleased-stop marks. Preserve the source’s one-digit versus multi-digit pitch notation. The converter is bounded: no Han-character pronunciation inference, automatic sandhi, phonotactic validation or promised universal reverse conversion. Unsupported sounds remain unresolved.

`/romanization` serves all five groups equally, with examples derived from existing records and live coverage counts. `src/data/romanization-examples.ts` owns examples; `romanization-method.ts` owns parsing. The legacy `xiamen-romanization.ts` remains a shared implementation dependency despite its name. Display `HanLingo spelling` separately from `IPA`. Read `docs/ROMANIZATION.md` before changing rules; update meaningful tests for any conversion change.
