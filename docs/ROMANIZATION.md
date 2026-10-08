# Shared Han romanization: discussion record

Status: decisions recorded on 2026-10-09. This is a design record, not a complete or finalized romanization specification.

## Confirmed decisions

- The system is based on sounds and their IPA correspondence. A spelling has the same assigned sound value across the varieties represented; it is not inherited automatically from Pinyin, Jyutping, or another existing spelling system.
- The core stop distinction is **p → [p]**, **ph → [pʰ]**, **b → [b]**: voiceless unaspirated, voiceless aspirated, and voiced respectively.
- Aspiration is marked consistently by appending **h** to the consonant spelling. In the current working application, **ch → [tɕ]** therefore pairs with **chh → [tɕʰ]**. The aspiration rule and this application were accepted explicitly; the complete consonant inventory is still unfinished.
- **â → [ɐ]** is a vowel spelling. Its circumflex does not mark a tone.
- Tone is represented separately from vowel quality using **pitch-contour numbers for now**: **1 is low**, **5 is high**, **35 → [˧˥]**, and **51 → [˥˩]**. Thus the current Mandarin example can be written **Shi35 Chin51 Phing35**, conditional on the candidate `sh → [ɕ]` assignment. These are pitch values, not the numbered tone categories of Pinyin or Jyutping.
- IPA remains the phonetic reference. The custom romanization is a separate notation and should be identified as such.

## Candidate mappings and unresolved choices

The examples **Shi Chin Phing** and **Tsap Kân Phing** express the intended direction; they are not yet verified outputs of a complete system.

- **sh → [ɕ]** remains a candidate assignment suggested by the Mandarin `Shi` example. The working **ch/chh → [tɕ]/[tɕʰ]** pair follows the accepted aspiration rule. These sounds must remain distinguishable from [ʂ], [tʂ], and [tʂʰ]. The same spelling cannot silently mean a different consonant in another variety.
- Aspiration notation must remain distinguishable from a literal sequence of a consonant followed by [h]. A syllable-boundary or other segmentation rule is still needed.
- Vowel length, the wider vowel inventory, the remaining consonants, syllable-boundary conventions, and the required level of phonetic detail remain open. The pitch-contour notation does not by itself settle contextual tone changes or how much phonetic variation to encode.
- A reference variety and transcription convention must be stated. An IPA symbol in a broad dictionary transcription does not describe every detail of every speaker's pronunciation.

## Name used to examine the design

The following are **broad reference renderings assembled from dictionary readings and phonetic descriptions**. They are not narrow transcriptions of a recording of the full name, and they are not proposed final romanization spellings.

| Reference | 習近平 in IPA | Lexical tone categories |
| --- | --- | --- |
| Standard Mandarin | [ɕi˧˥ t͡ɕin˥˩ pʰiŋ˧˥] | 2–4–2 |
| Hong Kong Cantonese, conventional [ɪ] notation | [t͡saːp̚˨ kɐn˨ pʰɪŋ˨˩] | 6–6–4 |

The last column identifies existing lexical tone categories for reference. It is not the accepted pitch-contour notation: Mandarin category 2 is conventionally [˧˥], giving `35` in the current proposal, while category 4 is [˥˩], giving `51`.

The Mandarin readings are supported by the Ministry of Education's entries for [習](https://dict.revised.moe.edu.tw/dictView.jsp?ID=6829&la=0&powerMode=0), [近](https://dict.revised.moe.edu.tw/dictView.jsp?ID=5876&q=1&word=%E8%BF%91), and [平](https://dict.revised.moe.edu.tw/dictView.jsp?ID=920&la=0&powerMode=0). The consonant distinctions are described in [Lee and Zee's Standard Chinese IPA illustration](https://doi.org/10.1017/S0025100303001208).

The Cantonese reference readings are **zaap6 gan6 ping4** in Jyutping. CUHK records **zaap6** for 習 and also a **zap6** variant; the short-vowel variant must not silently replace the main reference reading. See [CUHK's 習 entry](https://humanum.arts.cuhk.edu.hk/Lexis/lexi-mf/search.php?word=%E7%BF%92), [its syllable list including both readings](https://humanum.arts.cuhk.edu.hk/Lexis/lexi-can/pho-rel.php?s1=z&s3=6), [近 under gan6](https://humanum.arts.cuhk.edu.hk/Lexis/lexi-can/pho-rel.php?s1=g&s2=an), and [平 under ping4](https://humanum.arts.cuhk.edu.hk/Lexis/lexi-can/pho-rel.php?s1=p&s3=4).

### What this example leaves open

**The Cantonese vowel in 平 needs a declared transcription convention.** The conventional [ɪŋ] notation appears in the Cantonese phonetic literature; the current [Jyutping IPA chart](https://jyutping.org/en/jyutping/) instead transcribes the nucleus before `-ng` and `-k` as [e]. Following that chart, the last syllable is [pʰeŋ˨˩]. This does not make the Jyutping spelling `peng4`: its vowel belongs to a different category. [Zee's IPA illustration](https://doi.org/10.1017/S0025100300006058) and [his study of 100 Hong Kong Cantonese speakers](https://www.internationalphoneticassociation.org/icphs-proceedings/ICPhS2003/papers/p15_1117.pdf) provide phonetic context.

Consequently, the draft spelling `Phing` cannot quietly give `i` the value [i] in Mandarin and [ɪ] or [e] in Cantonese while claiming a strictly identical phonetic correspondence. The project must select its reference convention and then assign the spellings consistently.

**Length and tone contours also depend on the transcription level.** The Cantonese /aː/ category contrasts with /ɐ/, while the former is shorter before a stop coda than in an open syllable. The unreleased final [p̚] and the displayed tone contours describe a reference pronunciation; they are not measurements of every spoken token. The Hong Kong example should not be relabelled an exact pronunciation for all Guangzhou and Hong Kong speakers.

No automatic transliteration, text-to-speech pronunciation, or final spelling table follows from this record yet.
