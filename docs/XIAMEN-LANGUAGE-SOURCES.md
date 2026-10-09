# Xiamen learning vocabulary: sources and conventions

Verified on 2026-10-09. This is a small, sourced vocabulary for modern Xiamen Southern Min, not a complete dictionary, a recording corpus, or a transcription of all Southern Min varieties.

## What the dataset contains

`src/data/xiamen-lexicon.ts` contains 35 entries: 33 single-syllable citation readings and two explicitly documented connected-speech words. The categories cover food and drink, people and actions, places and everyday objects, and numbers. Each entry keeps an English gloss, the chosen character spelling, the exact selected source transcription, its dictionary revision URL, and a reading-mode label.

The glosses are deliberately short. They identify the intended sense rather than listing every meaning of a character. When a character has several readings, the selected reading belongs to that sense: 食 “eat” is distinct from other readings on the same dictionary page. Everyday readings are preferred where the source labels literary and colloquial alternatives. Both 兩 and 二 are included without implying that they are interchangeable in every numerical expression.

These entries provide vocabulary for learning about food, purchases, movement, and familiar places. They do not establish complete sentences, politeness formulas, or local cultural practices. The site should avoid turning isolated words into a purportedly verified phrasebook.

## Pronunciation sources

The lexical source is **Wiktionary contributors**, specifically the **Southern Min → Hokkien → Sinological IPA block whose locality list explicitly includes Xiamen**. This is a community-edited dictionary, not an independently reviewed speaker corpus. Each entry links to its page revision and retains the exact selected `/…/` transcription in `sourceReading`. Some blocks list Xiamen alongside other places; the Xiamen label is required in every case.

The separate cross-dialect character-comparison tables are **not** the source of these readings. Those tables sometimes use different numerical conventions, such as 35 for 茶 where the chosen Xiamen pronunciation block uses 24. Readings were not copied from a Taiwanese-only, Zhangzhou-only, or unspecified Hokkien row.

In several entries, the source explicitly distinguishes urban and suburban Xiamen readings. The selected vocabulary uses 魚 /hi²⁴/ and 去 /kʰi²¹/, while retaining short notes that the source also documents suburban alternatives. An entry labeled Xiamen does not imply uniform usage in every district or by every speaker.

## Primary checks on the tone convention

The following sources support the reference system and the distinction between citation and connected speech. They do not independently verify every lexical entry in the dictionary dataset.

- [Fujian provincial gazetteer, 方言志, 第十章 第一节: 福建方言声调对照表](https://data.fjdsfzw.org.cn/upload/Annals/2011/%E6%96%B9%E8%A8%80%E5%BF%97/epub/ops/215.htm). The Xiamen row records 44, 24, 53, 21, 22, 32, and 4. The table’s column numbers identify historical tone categories; they are not the pitch digits used inside the transcriptions.
- [Yaqing Cao (2022), “Revisiting Tone Sandhi Domain in Xiamen Chinese”](https://journals.linguisticsociety.org/proceedings/index.php/amphonology/article/view/5184), Proceedings of the 2021 Annual Meeting on Phonology, [PDF](https://journals.linguisticsociety.org/proceedings/index.php/amphonology/article/download/5184/4846/9834). Section 2 lists the same seven citation contours, distinguishes checked and unchecked syllables, and explains the role of tone-group position. Its examples include 四 /si21/.
- [Chunyu Ge and Peggy Mok (2024), “The effect of phonotactic constraints on tone sandhi application: A cross-sectional study of Xiamen Min”](https://ling.cuhk.edu.hk/people/peggy/SP2024_GeMok_Phonotactics.pdf), Speech Prosody 2024. Example (1) gives `hui44 ki44 → hui22 ki44`, “plane,” independently supporting the displayed connected form of 飛機. The study also documents variation in the application of sandhi; a conventional reference is not a measurement of every speaker.

## Display transformation

The chosen source uses superscript Chao pitch numbers. The exported `tones` array stores those contours as plain decimal strings. A mechanical formatting step converts each pitch digit into its corresponding IPA tone letter: 1 → ˩, 2 → ˨, 3 → ˧, 4 → ˦, 5 → ˥. No tonal rule is inferred by this formatter.

| Source contour | Displayed tone letters |
| --- | --- |
| 44 | ˦˦ |
| 24 | ˨˦ |
| 53 | ˥˧ |
| 21 | ˨˩ |
| 22 | ˨˨ |
| 32 | ˧˨ |
| 4 | ˦ |

The source’s slashes are retained exactly in `sourceReading`. The learning interface receives square brackets in `ipa`, following HanLingo’s display convention. This is still **broad dictionary-based IPA**, not a narrow transcription of a recording. Level contours retain both digits/letters where the source gives two; the checked high contour retains its single digit/letter.

The `segments` array holds each source syllable without tones. Affricate tie bars, aspiration, nasalization, syllabic-nasal marks, unreleased-stop marks, and glottal stops are retained in the source data and IPA display. HanLingo spelling is a separate, deliberately simplified reading aid: its shared key uses ~ for nasalization, : for supplied length, and omits syllabicity and unreleased-stop marks while leaving them visible in IPA. The current mergers are documented in [the spelling proposal](ROMANIZATION.md). This revision changes neither source readings nor documented tones; custom spelling is not baked into this lexical dataset.

## Connected speech is explicit

Only two entries display connected speech in this set:

| Entry | Exact dictionary transcription | Displayed surface IPA | Evidence |
| --- | --- | --- | --- |
| 好食, “tasty” | /ho⁵³⁻⁴⁴ t͡siaʔ⁴/ | [ho˦˦ t͡siaʔ˦] | The Xiamen dictionary block explicitly marks 53 changing to 44. |
| 飛機, “airplane” | /hui⁴⁴⁻²² ki⁴⁴/ | [hui˨˨ ki˦˦] | The Xiamen dictionary block explicitly marks 44 changing to 22; Ge and Mok give the same example. |

For a source annotation such as ⁵³⁻⁴⁴, the value to the right is the documented surface tone. Every other entry is labeled **Citation**. The application must not imply that arbitrary combinations of these citation forms are verified phrase pronunciations. Checked-syllable sandhi in particular depends on the ending as well as the tone; no general phrase generator is supplied here.

## Attribution and reuse

The exact dictionary transcriptions are credited per entry to Wiktionary contributors and linked to the recorded revision. Wiktionary text is available under [Creative Commons Attribution-ShareAlike 4.0](https://creativecommons.org/licenses/by-sa/4.0/), subject to its [copyright terms](https://en.wiktionary.org/wiki/Wiktionary:Copyrights). To the extent the selected dictionary material or its adaptation is copyrightable, that license continues to govern it independently of the application code license. The tone-number-to-tone-letter conversion and selection of one reading from alternatives are disclosed above.

The short learner notes and gloss selection are editorial work for HanLingo. Local speaker review and recorded examples would strengthen this material, but their absence should not be concealed by synthetic audio or invented phonetic detail.
