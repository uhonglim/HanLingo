# Shared Han romanization: discussion record

Status: decisions recorded on 2026-10-09. This is a design record, not a complete or finalized romanization specification.

## Confirmed decisions

- The system is based on sounds and their IPA correspondence. A spelling has the same assigned sound value across the varieties represented; it is not inherited automatically from Pinyin, Jyutping, or another existing spelling system.
- The core stop distinction is **p → [p]**, **ph → [pʰ]**, **b → [b]**: voiceless unaspirated, voiceless aspirated, and voiced respectively.
- Aspiration is marked consistently by appending **h** to the consonant spelling. In the current working application, **ch → [tɕ]** therefore pairs with **chh → [tɕʰ]**. The aspiration rule and this application were accepted explicitly; the complete consonant inventory is still unfinished.
- **ts → [t͡s]** and **tsh → [t͡sʰ]** were accepted for the Xiamen prototype. They stay distinct from **ch/chh → [tɕ]/[tɕʰ]**.
- Tone is represented separately from vowel quality using **pitch-contour numbers for now**: **1 is low**, **5 is high**, **35 → [˧˥]**, and **51 → [˥˩]**. These are pitch values, not the numbered tone categories of Pinyin or Jyutping.
- IPA remains the phonetic reference. The custom romanization is a separate notation and should be identified as such.

## Candidate mappings and unresolved choices

- **ă → [ɐ]** is the current trial vowel spelling, replacing the earlier **â**. The breve identifies vowel quality, never tone or nasalization. **ã → [ã]** retains the IPA tilde for nasalization. These are different vowels: an unnasalized [ɐ] must never become ã. The user authorized revising the vowel notation; the particular extended inventory remains a trial proposal.

- The working **ch/chh → [tɕ]/[tɕʰ]** pair follows the accepted aspiration rule. Trial **sh → [ɕ]**, **š → [ʃ]**, **sr → [ʂ]**, and **hl → [ɬ]** remain distinct. Trial **tš/tšh → [tʃ]/[tʃʰ]** and **tsr/tsrh → [tʂ]/[tʂʰ]** extend the same aspiration rule without merging places of articulation. Trial **ḅ/ḍ → [ɓ]/[ɗ]** distinguish implosives from **b/d**. The same spelling cannot silently mean a different consonant in another variety.
- Source nasalization, syllabicity, unreleased endings, length, breathy voice, creaky voice, and voicing diacritics are retained. Sinological source symbols **ȵ**, **ɿ**, and **ʮ** receive distinct trial spellings **nj**, **ir**, and **yr**; the converter does not silently equate a source transcription convention with another IPA symbol.
- Aspiration notation must remain distinguishable from a literal sequence of a consonant followed by [h]. A syllable-boundary or other segmentation rule is still needed.
- The wider vowel and consonant inventory has explicit trial mappings in the sound key; these assignments, syllable-boundary conventions, and the required level of phonetic detail remain open to refinement. Source vowel length remains **ː**, independent of vowel quality: **ăː** corresponds to **[ɐː]**, while **oo** names **[ɔ]** and does not itself mean a long vowel. The pitch-contour notation does not by itself settle contextual tone changes or how much phonetic variation to encode.
- A reference variety and transcription convention must be stated. An IPA symbol in a broad dictionary transcription does not describe every detail of every speaker's pronunciation.

## Everyday worked example

Xiamen **茶**, “tea,” is displayed as **[te˨˦]**, with the working spelling **te24**. The suffix `24` records a rise from pitch level 2 to level 4; it is not a lexical tone-category number. This is the dictionary-based citation reading documented in [the Xiamen source notes](XIAMEN-LANGUAGE-SOURCES.md) and the per-entry source in `src/data/xiamen-lexicon.ts`.

No general Han-character transliteration, text-to-speech pronunciation, or final cross-Sinitic spelling table follows from this record yet. Lesson spellings derive from their source IPA; extending the collection does not finalize the unresolved mappings.

## Xiamen learning prototype

The 35-entry collection shows source-based Xiamen IPA alongside trial HanLingo spellings. Confirmed rules are kept separate from trial extensions: `ng → [ŋ]`, `oo → [ɔ]`, `q → [ʔ]`, `th → [tʰ]`, `kh → [kʰ]`, `g → [ɡ]`. Nasal-vowel tildes, unreleased-stop marks, and syllabicity marks are retained. These extensions have not been accepted as the final cross-Sinitic inventory. The converter rejects unmapped IPA instead of silently substituting a different sound. See [Xiamen source notes](XIAMEN-LANGUAGE-SOURCES.md).

## Public IPA workshop

`/romanization` now brings the decisions, the complete explicit working key, retained IPA letters and marks, tone contours, and source examples together. It loads all published IPA readings, grouped under Mandarin, Min, Yue, Hakka, and Wu. It accepts custom, space-separated syllables with an explicit tone-notation selector. Pitch mode accepts IPA tone letters or ordinary/superscript pitch digits. Source-category mode keeps category digits separate as **·T** plus the category number; tones-not-supplied mode converts only the attested segments and visibly labels the absence of tones. Each group has four worked examples drawn directly from locality records, with sources and speaker qualifications retained. A live coverage table distinguishes mapped readings from readings containing unresolved sounds; forms without tones remain visibly qualified, and source tone categories are never interpreted as pitch contours. Each syllable displays its sound-by-sound conversion and decision status.

The public parser in `src/data/romanization-method.ts` validates a bounded set of symbols, then uses the shared `spellSegments` key also used by the legacy `romanizeXiamen` lesson entry point. It accepts tied `[t͡ɕ]` as an input variant of `[tɕ]`, and tied or untied `[t͡sʰ]` / `[tsʰ]` for the same documented alveolar affricate. Dataset words declare their tone convention. Loading a sourced reading also selects its convention; editing either the IPA or tone convention clears the source attribution so an altered result cannot masquerade as that source reading. Custom input defaults to strict pitch-contour mode, which rejects missing contours. Explicit tones-not-supplied mode allows segment conversion without inventing tones. Unsupported symbols still produce an error, not a guessed reading. This spelling demo does not validate phonotactics, infer pronunciation from characters, apply sandhi, or promise an unambiguous reverse conversion. Digraphs and consonant sequences still require a boundary policy.

The documented Amoy example `hui44 ki44 → hui22 ki44` comes from [Ge & Mok 2024, example 1](https://ling.cuhk.edu.hk/people/peggy/SP2024_GeMok_Phonotactics.pdf). The page distinguishes the source's citation and connected forms. IPA descriptions use the [official IPA chart](https://www.internationalphoneticassociation.org/content/ipa-chart); the explanation of tone-category numbers uses the [published Jyutping scheme](https://jyutping.org/en/jyutping/).


## Expanded working key, 2026-10-09

All 637 current IPA word records have working spellings: 573 with documented pitch contours and 64 with tones omitted by their sources. The 64 retain segment-only spellings and a visible missing-tone qualification. The count is a release snapshot, not a completeness claim for the languages.

New assignments are **Trial**, including `sh=[ɕ]`, `š=[ʃ]`, `sr=[ʂ]`, `hl=[ɬ]`, `hh=[ɦ]`, `nj=[ȵ]`, and `ny=[ɲ]`. The source's distinct ȵ, ɿ and ʮ conventions are preserved rather than silently normalized to other IPA symbols. `ḅ=[ɓ]` and `ḍ=[ɗ]` distinguish implosives from plain voiced `b/d`. `aa=[ɑ]`, `ao=[ɒ]`, `ea=[æ]`, `ĭ=[ɪ]`, `ŭ=[ʊ]`, `ÿ=[ʏ]`, `ö=[ø]`, `eu=[œ]`, `uu=[ɯ]` and `ê=[ɜ]` preserve vowel differences. Digraphs name qualities, not length; supplied `ː` remains explicit. These spellings are HanLingo proposals, not claims about existing community orthographies.

The parser uses one shared longest-match key for Amoy and every other locality. Tied and untied affricate variants are normalized only where equivalent. New records are checked by a full published-word coverage test. Unknown segments still fail visibly; adding a future record does not authorize guessing its pronunciation or tone.
