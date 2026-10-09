# HanLingo spelling

Working proposal, revised 2026-10-09. HanLingo is a shared reading aid beside source IPA. It deliberately uses fewer distinctions than IPA; it is not a phonemic standard for the languages or an existing community orthography.

## One global key

The same IPA input receives the same HanLingo spelling in every locality. Several different IPA sounds may share a spelling. These mergers simplify reading; they do not establish identical articulation, mutual intelligibility, or interchangeable local pronunciations. Exact differences remain visible in IPA.

All pages use the shared key in `src/data/xiamen-romanization.ts` through `spellSegments`, `romanizeXiamen`, or `convertIpa`. Its historical filename does not restrict it to Amoy. Never add locality-specific letter values or silently rewrite source IPA to obtain a preferred spelling.

## Design priorities

Keep letter values predictable across localities, make common words easy to read and type, and retain contrasts that are especially useful to learners: aspiration, voicing, nasal codas, checked codas, nasal vowels, and supplied tone and length. Prefer a small declared set of shared spellings over an ever-growing collection of specialist letters. A source reading remains the authority when simplification creates a homograph.

Romanization need not be a reversible encoding of phonetic transcription. The [official Jyutping chart](https://jyutping.org/en/jyutping/) explicitly groups [t͡s~t͡ʃ] under z and gives syllabic [m̩ ŋ̩] as m/ng. HanLingo borrows that design principle, not Jyutping's letter or tone values. The groupings below are our own cross-variety proposal; the [IPA chart](https://www.internationalphoneticassociation.org/content/ipa-chart) remains the reference for phonetic distinctions.

## Working correspondences

| IPA | HanLingo |
| --- | --- |
| [p pʰ b], [t tʰ d], [k kʰ ɡ] | p ph b, t th d, k kh g |
| [t͡s t͡sʰ] | ts tsh |
| [tɕ tʃ], [tɕʰ tʃʰ] | ch, chh |
| [dʑ dʒ] | j |
| [ɕ ʃ], [ʑ ʒ] | sh, zh |
| [h x χ] | h |
| [ɲ ȵ] | ny |
| [tʂ tʂʰ ʂ ʐ] | tsr tsrh sr zr |
| [ŋ ʔ ɦ ɣ ɬ ɓ ɗ] | ng q hh gh hl ḅ ḍ |
| [a ɑ], [i ɪ], [u ʊ], [y ʏ] | a, i, u, yu |
| [ø œ], [ə ɜ] | oe, eo |
| [ɐ ɛ ɔ æ ɒ ɯ ɤ ɨ ɿ ʮ] | ă ae oo ea ao uu eu ii ir yr |
| [j ɥ], explicit [i̯ u̯ y̯] | y yw, y w yw |

Append **h** to mark aspiration: `p → ph`, `ts → tsh`, `ch → chh`. The retroflex series and implosives retain separate spellings. Plain [u] stays `u`; only explicitly nonsyllabic [u̯] becomes `w`. For example, supplied `xuei5` becomes `huei5`, without inferring a glide.

`ă` represents [ɐ], not nasalization or tone. Doubled letters such as `oo` identify a vowel quality; they do not imply length. `/romanization` displays the complete supported key and the individual conversion steps. **Core** labels direct mappings, **Shared** labels the deliberate sound families, **Detail** labels omitted IPA detail, and **Retained** labels supported marks copied into the spelling. These are mapping roles, not levels of source verification.

## Marks and tones

- Nasalization uses ASCII `~` after the vowel: [ã] → `a~`, [ĩ] → `i~`.
- Supplied length uses `:`: [aː] → `a:`. Length is independent of vowel quality and tone.
- Syllabicity and unreleased-stop marks stay in IPA but are omitted from HanLingo: [ŋ̍] → `ng`, [p̚] → `p`. This omission does not change the source pronunciation.
- Supported breathy, creaky, voiceless and voiced combining marks remain visible: [a̤ a̰ m̥ s̬].
- Supplied pitch contours use digits **1 low** through **5 high**: [˧˥] → `35`, [˥˩] → `51`. Preserve the source’s one-digit or multidigit contour; never reinterpret a tone-category number as pitch.
- Explicit source tone categories use `·T` plus their number. Readings without supplied tones receive segment spellings only and a visible “tones not given” qualification. No missing tones are inferred.

Amoy 茶 “tea” remains **[te˨˦] → te24**, a dictionary-based citation reading documented in [the Xiamen source notes](XIAMEN-LANGUAGE-SOURCES.md). The attested `hui44 ki44 → hui22 ki44` example shows citation and connected readings from [Ge & Mok 2024, example 1](https://ling.cuhk.edu.hk/people/peggy/SP2024_GeMok_Phonotactics.pdf). The converter does not apply tone sandhi automatically.

## Evidence and limits

This revision changes the reading aid, not the underlying lexical evidence. Source IPA, locality and speaker qualifications, source orthographies, and documented community place names remain unchanged. Tâi-lô, POJ, Jyutping and other source spellings remain separately labelled. Place-name secondary labels use HanLingo only: manually audited broad IPA normalization requires both the attested name and an explicit phonetic mapping source, with its scope and tone convention recorded. Source spellings are never blindly passed to the IPA converter.

The spelling is intentionally lossy. Equal spellings do not imply equal IPA, and collision-free reverse conversion is not promised. IPA remains necessary for precise pronunciation. The converter also does not infer pronunciation from Han characters, validate phonotactics, generate lesson pronunciations from machine translation, or infer missing tones. Unknown symbols fail visibly.

The public workshop supports space-separated syllables with an explicit source tone convention. Loading a sourced reading selects its convention; editing the input or convention clears the source attribution. Tied and untied forms of the same affricate are normalized, while the supplied source transcription remains available. Live coverage and examples come from the published records; coverage is not a claim that the languages are completely documented.

### Additional Huangyan source symbols

Palatal stops use `c → ky`, `cʰ → kyh`, and `ɟ → gy`; aspiration still appends `h`. The rounded vowel `ɵ` shares `oe` with `ø/œ` in the reading spelling, while original IPA preserves vowel quality. Legacy affricate ligatures `ʦ ʨ ʣ ʥ ʧ ʤ` normalize to the equivalent expanded IPA symbols only during conversion and sound filtering. Source transcriptions keep their original glyphs. Huangyan JIPA digits are tone categories, displayed as `·Tn`, never pitch contours.
