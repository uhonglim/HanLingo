# HanLingo spelling

Working proposal v3.1, revised 2026-10-09. HanLingo is a shared reading aid beside source IPA. It deliberately uses fewer distinctions than IPA; it is not a phonemic standard for the languages or an existing community orthography.

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
| [tɕ tʃ tʂ], [tɕʰ tʃʰ tʂʰ] | ch, chh |
| [dʑ dʒ dʐ] | j |
| [ɕ ʃ ʂ], [ʑ ʒ ʐ] | sh, zh |
| [h x χ] | h |
| [ɲ ȵ] | ny |
| [r ɹ ɻ] | r |
| [ŋ ʔ ɦ ɣ ɬ ɓ ɗ] | ng q hh gh hl ḅ ḍ |
| [a ɑ], [i ɪ], [u ʊ], [y ʏ] | a, i, u, ü |
| [ø œ], [ə ɘ ɜ] | oe, eo |
| [ɐ ɛ ɔ æ ɒ ɯ ɤ ɨ ɿ ʮ] | ă ae oo ea ao uu eu ii ir yr |
| [j ɥ], explicit [i̯ u̯ y̯] | y yw, y w yw |

Append **h** to mark aspiration: `p → ph`, `ts → tsh`, `ch → chh`. Alveolopalatal, postalveolar and retroflex sibilants share the sh/ch family; alveolar s/ts/tsh stay separate. Implosives retain separate spellings. Plain [u] stays `u`; only explicitly nonsyllabic [u̯] becomes `w`. For example, supplied `xuei5` becomes `huei5`, without inferring a glide.

`ă` represents [ɐ], not nasalization or tone. It is retained after checking the actual corpus: merging it into a makes Canton 三/心 and 山/新, and Hong Kong 嘥/西 and 筲/收, identical in both spelling and supplied tone. The sources do not all mark length, so inventing a long vowel is not a valid repair. Doubled letters such as `oo` identify a vowel quality; they do not imply length. `/romanization` displays the complete supported key and the individual conversion steps. **Core** labels direct mappings, **Shared** labels the deliberate sound families, **Detail** labels omitted IPA detail, and **Retained** labels supported marks copied into the spelling. These are mapping roles, not levels of source verification.

## Marks and tones

- Nasalization uses ASCII `~` after the vowel: [ã] → `a~`, [ĩ] → `i~`.
- Supplied length uses `:`: [aː] → `a:`. Length is independent of vowel quality and tone.
- Syllabicity and unreleased-stop marks stay in IPA but are omitted from HanLingo: [ŋ̍] → `ng`, [p̚] → `p`. This omission does not change the source pronunciation.
- Supported breathy, creaky, voiceless and voiced combining marks remain visible: [a̤ a̰ m̥ s̬].
- Supplied pitch contours use digits **1 low** through **5 high**: [˧˥] → `35`, [˥˩] → `51`. Preserve the source’s one-digit or multidigit contour; never reinterpret a tone-category number as pitch.
- Explicit source tone categories use `·T` plus their number. Readings without supplied tones or without an established source tone key receive segment spellings and a visible “segments only” qualification. Their notes distinguish missing tones from unkeyed source numbers, retaining any original numbered form. No missing tones or undocumented number meanings are inferred.

Amoy 茶 “tea” remains **[te˨˦] → te24**, a dictionary-based citation reading documented in [the Xiamen source notes](XIAMEN-LANGUAGE-SOURCES.md). The attested `hui44 ki44 → hui22 ki44` example shows citation and connected readings from [Ge & Mok 2024, example 1](https://ling.cuhk.edu.hk/people/peggy/SP2024_GeMok_Phonotactics.pdf). The converter does not apply tone sandhi automatically.

## Evidence and limits

This revision changes the reading aid, not the underlying lexical evidence. Source IPA, locality and speaker qualifications, source orthographies, and documented community place names remain unchanged. Tâi-lô, POJ, Jyutping and other source spellings remain separately labelled. Place-name secondary labels use HanLingo only: manually audited broad IPA normalization requires both the attested name and an explicit phonetic mapping source, with its scope and tone convention recorded. Source spellings are never blindly passed to the IPA converter.

The spelling is intentionally lossy. Equal spellings do not imply equal IPA, and collision-free reverse conversion is not promised. IPA remains necessary for precise pronunciation. The converter also does not infer pronunciation from Han characters, validate phonotactics, generate lesson pronunciations from machine translation, or infer missing tones. Unknown symbols fail visibly.

The public workshop supports space-separated syllables with an explicit source tone convention. Loading a sourced reading selects its convention; editing the input or convention clears the source attribution. Tied and untied forms of the same affricate are normalized, while the supplied source transcription remains available. Live coverage and examples come from the published records; coverage is not a claim that the languages are completely documented.

### Additional Huangyan source symbols

Palatal stops use `c → ky`, `cʰ → kyh`, and `ɟ → gy`; aspiration still appends `h`. The rounded vowel `ɵ` shares `oe` with `ø/œ` in the reading spelling, while original IPA preserves vowel quality. Legacy affricate ligatures `ʦ ʨ ʣ ʥ ʧ ʤ` normalize to the equivalent expanded IPA symbols only during conversion and sound filtering. Source transcriptions keep their original glyphs. Huangyan JIPA digits are tone categories, displayed as `·Tn`, never pitch contours.

## Design decisions in v3

The target is one learnable reading key across Han varieties, not a lossless substitute for IPA or an adoption of Pinyin. Stable priorities are consistent mapping, stop voicing and aspiration, useful distinctions in real words, then ease of reading and typing. A shorter alphabet is useful only when its omissions are understood.

- **sha, not sra:** [ʂ ʃ ɕ] share sh; their corresponding affricates use ch/chh and voiced series zh/j. The letter r no longer acts as a retroflex modifier. It remains for actual rhotic sounds; [ʐ] is a fricative and uses zh, not r. The revision also supports tied [d͡ʐ] consistently.
- **Keep ă:** a hypothetical [ɐ]→a merger introduces four additional same-locality, same-tone collision groups in the current 1,789-record corpus. The chosen sibilant mergers introduce none in that sample. This sample does not prove that those sounds never contrast elsewhere. We keep the useful vowel distinction with one letter rather than adding a less familiar ASCII sequence such as ax.
- **Keep the remaining vowel key:** i/u/ü, e/ae, o/oo, eo/eu, oe, ii/uu express selected vowel families consistently. Double letters name a vowel quality; only : marks supplied length. Tone marks do not change the vowel identity.
- **Keep the evidence:** nasalization ~, supplied length :, voiced/voiceless and phonation marks, pitch contours and source categories retain their separate meanings. The spelling never adds a missing tone, glide, length distinction or sandhi pattern.
- **Place names do not dictate sound values:** the common name Shanghai remains Shanghai. Its documented name transcription [zɑ̃3 he2] gives za~·T3 he·T2. A Mandarin pronunciation of the same characters must be labelled Mandarin; it does not become Shanghai’s local name. Likewise, a Mandarin spelling of 長沙 cannot establish the local Xiang pronunciation.

Sourced examples: Beijing 說 [ʂuo55] → shuo55 and 茶 [tʂʰa35] → chha35 use the 1950s survey published in 1964, not a newly recorded contemporary speaker. Canton 三 [sam55] → sam55 and 心 [sɐm55] → săm55 preserve Ding’s comparative-table transcription. The interactive workshop links these exact records and keeps their dates and qualifications.

## Rounded vowel and glide in v3.1

Use **ü** for [y ʏ], **y** for [j], and **u** for [u ʊ]. The former yu vowel spelling collided with the sequence [ju]; now [y] → ü, [ju] → yu and [jy] → yü. These are conversion examples, not claims that each sequence occurs in every locality. [y] and [ʏ] remain an explicitly shared vowel family; IPA preserves the distinction.

The dots identify vowel quality, never tone or nasalization. Always keep ü, including after ch, chh and sh; do not adopt Pinyin’s context-dependent omission. Supplied [yː] → ü:, [ỹ] → ü~; pitch and source-category suffixes follow their existing rules. [ɥ] and explicit [y̯] remain yw. Source Jyutping yu and IPA y remain unchanged in their labelled source fields. The tradeoff is one non-ASCII letter for a clearer distinction from the glide-plus-vowel sequence; no new keyboard or display mode is needed.

The central-vowel reading aid **eo** also covers [ɘ], attested in the dated Tong’an comparison in Wang (2022). This is a deliberate many-to-one extension; exact IPA remains visible, and [ə], [ɘ] and [ɜ] are not claimed to be identical sounds.

The back unrounded vowel **[ʌ] shares eu with [ɤ]**. The two vowel heights remain distinct in IPA; this is a deliberate reading-aid merger, separate from central `eo` and low `a/ă`. It supports the exact Jinyun examples in [Steed & Rose 2009, p. 2297](https://www.isca-archive.org/interspeech_2009/steed09_interspeech.pdf): 麻 `[mʌw131]` → `meuw131`, 马 `[mʌw331]` → `meuw331`, and 大 `[tʌ411]` → `teu411`. These are the source’s citation contours, not inferred tone values. No other spelling or source transcription changes.

The source apical-vowel symbols **ɿ** and **ʅ** share **ir** in the reading aid. The latter retains its retroflex distinction in the displayed source transcription. This follows the existing shared-sibilant reading families, not a claim that these vowels sound identical. Tone categories remain category labels, e.g. source `[ʂʅ1]` → `shir·T1`; no pitch contour is inferred.

### Four-point pitch contours

Supplied pitch contours may contain one to four targets on the 1–5 scale. This preserves complex source contours such as 3243 and 2143 in [Zhu and Zhang's Qiyang study](https://www.isca-archive.org/interspeech_2008/zhu08b_interspeech.pdf), Table 1, p. 1113, instead of shortening them to a three-point contour. The IPA display, trace and HanLingo suffix keep every supplied target. This parser support does not turn a four-digit source tone category into pitch, supply a missing value, or independently establish a word's pronunciation.

A supplied combining diaeresis above a segment is retained separately from the below-diaeresis. The Qiyang 2008 table prints `p̈a̤`, while its discussion describes slack voice; the source convention and mark placement remain visible. HanLingo does not globally equate an above-diaeresis with breathiness, centralization or the below-diaeresis. A diacritic without a preceding segment remains invalid.
