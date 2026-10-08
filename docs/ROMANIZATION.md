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

- **â → [ɐ]** is implemented as a trial vowel spelling. Separating vowel quality from tone was accepted; the particular circumflex spelling remains provisional. The earlier page and record overstated it as a confirmed decision.

- **sh → [ɕ]** remains a candidate assignment. The working **ch/chh → [tɕ]/[tɕʰ]** pair follows the accepted aspiration rule. These sounds must remain distinguishable from [ʂ], [tʂ], and [tʂʰ]. The same spelling cannot silently mean a different consonant in another variety.
- Aspiration notation must remain distinguishable from a literal sequence of a consonant followed by [h]. A syllable-boundary or other segmentation rule is still needed.
- Vowel length, the wider vowel inventory, the remaining consonants, syllable-boundary conventions, and the required level of phonetic detail remain open. The pitch-contour notation does not by itself settle contextual tone changes or how much phonetic variation to encode.
- A reference variety and transcription convention must be stated. An IPA symbol in a broad dictionary transcription does not describe every detail of every speaker's pronunciation.

## Everyday worked example

Xiamen **茶**, “tea,” is displayed as **[te˨˦]**, with the working spelling **te24**. The suffix `24` records a rise from pitch level 2 to level 4; it is not a lexical tone-category number. This is the dictionary-based citation reading documented in [the Xiamen source notes](XIAMEN-LANGUAGE-SOURCES.md) and the per-entry source in `src/data/xiamen-lexicon.ts`.

No general Han-character transliteration, text-to-speech pronunciation, or final cross-Sinitic spelling table follows from this record yet. The Xiamen prototype below converts only its explicitly sourced IPA.

## Xiamen learning prototype

The 35-entry collection shows source-based Xiamen IPA alongside trial HanLingo spellings. Confirmed rules are kept separate from trial extensions: `ng → [ŋ]`, `oo → [ɔ]`, `q → [ʔ]`, `th → [tʰ]`, `kh → [kʰ]`, `g → [ɡ]`. Nasal-vowel tildes, unreleased-stop marks, and syllabicity marks are retained. These extensions have not been accepted as the final cross-Sinitic inventory. The converter rejects unmapped IPA instead of silently substituting a different sound. See [Xiamen source notes](XIAMEN-LANGUAGE-SOURCES.md).

## Public IPA workshop

`/romanization` now brings the decisions, the complete explicit working key, retained IPA letters and marks, tone contours, and source examples together. It loads all 35 Amoy entries and accepts custom, space-separated syllables with either IPA tone letters or pitch digits. Each syllable displays its sound-by-sound conversion and decision status.

The public parser in `src/data/romanization-method.ts` validates a bounded set of symbols, then uses the same `romanizeXiamen` conversion as the learning pages. It accepts tied `[t͡ɕ]` as an input variant of `[tɕ]`. Missing contours and unsupported symbols produce an error, not a guessed reading. This spelling demo does not validate phonotactics, infer pronunciation from characters, apply sandhi, or promise an unambiguous reverse conversion. Digraphs and consonant sequences still require a boundary policy.

The documented Amoy example `hui44 ki44 → hui22 ki44` comes from [Ge & Mok 2024, example 1](https://ling.cuhk.edu.hk/people/peggy/SP2024_GeMok_Phonotactics.pdf). The page distinguishes the source's citation and connected forms. IPA descriptions use the [official IPA chart](https://www.internationalphoneticassociation.org/content/ipa-chart); the explanation of tone-category numbers uses the [published Jyutping scheme](https://jyutping.org/en/jyutping/).
