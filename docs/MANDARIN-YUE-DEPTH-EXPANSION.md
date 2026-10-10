# Mandarin and Yue learning depth — 2026-10-09

Expanded `src/data/learning/mandarin-yue.ts` using locality-specific primary references. No geographic substitute pronunciation was used. The word lists below are reference samples, not complete dictionaries or claims of uniform city-wide usage.

## Content delivered

| Locality  | IPA entries before | IPA entries after | What was added                                                                                                         |
| --------- | -----------------: | ----------------: | ---------------------------------------------------------------------------------------------------------------------- |
| Beijing   |                  0 |                25 | Lee/Zee formal citation words from a lifelong Beijing speaker; always labelled **Standard Mandarin · Beijing speaker** |
| Jinan     |                 10 |                35 | CUHK exact Jinan character readings, everyday objects, body parts, animals and weather                                 |
| Nanjing   |                  9 |                34 | CUHK exact Nanjing readings, including checked finals                                                                  |
| Chengdu   |                  0 |                 0 | Two detailed prosodic notes; phrase-rhythm study and food-culture material                                             |
| Guangzhou |                  0 |                 0 | Guangzhou tone-merger research, voice-quality comparison, embroidery culture                                           |
| Hong Kong |                  6 |                30 | Zee's 1991 consonant/vowel examples, keeping the source's broad transcription and original tone letters                |
| Taishan   |                  0 |                 0 | Worked interpretation of the dictionary's aspiration/coda key; Fushi procession craft                                  |
| Yulin     |                 12 |                20 | Seven more relationship roots and one ranking element from Hu's Tables 1–2                                             |

All eight localities now have at least three substantive sound notes, two culture topics and at least two resources. Shared resources are scoped to the appropriate cities. New culture topics concern documented practices; no photograph is used to infer a person's ethnicity or language.

## Pronunciation evidence and transcription policy

- [CUHK Jinan sound index](https://humanum.arts.cuhk.edu.hk/Lexis/lexi-mf/dialectIndex.php?point=B) and [Nanjing sound index](https://humanum.arts.cuhk.edu.hk/Lexis/lexi-mf/dialectIndex.php?point=D): fetched full HTML tables and parsed initial, final, explicitly printed tone contour and character. New characters were chosen only when the table returned a single reading. Existing polyphonic entries were not mechanically overwritten. Affricate ligatures may be expanded to their equivalent IPA letter sequence; the source's legacy nasal symbol ȵ is retained. No tone-category-to-contour inference.
- [Lee and Zee 2003, Standard Chinese (Beijing)](https://doi.org/10.1017/S0025100303001208): publisher PDF pp. 109–110 visually inspected. The speaker is a 25-year-old woman who lived all her life in Beijing. Formal reference pronunciation is visibly labelled on each word, rather than presented as vernacular Beijing speech. Selected examples preserve source IPA and high tone letter ˥. Chinese characters identify the printed English lexical gloss; pronunciation was not generated from characters or pinyin.
- [Zee 1991, Chinese (Hong Kong Cantonese)](https://doi.org/10.1017/S0025100300006058): publisher PDF pp. 46–47 visually inspected; lifelong Hong Kong speaker, a 22-year-old woman. Retain broad option 1, which does not mark vowel length. High-level tone is kept as ˥, not silently expanded to a two-digit contour. The existing six examples from Chan retain their separate source notation and vowel lengths.
- [JIPA 21.2 errata](https://www.cambridge.org/core/journals/journal-of-the-international-phonetic-association/issue/91F6F44EF3133DB5F309EC782C02C0E7): checked corrections: no alveolar trill; missing high tone on “fork”; erroneous length mark on a short vowel; missing second element in [ɐi]. The expanded list does not include the problematic fork item; [ɐi] in “west” follows the corrected diphthong. No trill is added.
- [Hu 2020, Yulin kinship study](https://pressto.amu.edu.pl/index.php/linpo/article/view/linpo-2020-0001): Tables 1–2, pp. 11–13. Expanded entries preserve kinship root/ranking-element use. 哥 and 兄 differ in direct address versus reference; 婶 here denotes a younger brother's wife in reference, not its usual Standard Mandarin sense. 公 retains the source's ȵ symbol. The geographical scope remains Yuzhou and Fumian. The comparison column is Jyutping and was **not** converted into invented Guangzhou IPA.
- [Qin 2012, Prosodic Word in Chengdu Dialect](https://www.isca-archive.org/speechprosody_2012/qin12_speechprosody.pdf): four citation contours and the relation between duration, prosodic boundaries and tone changes. These support sound explanations, not a fabricated vocabulary table. Hu/Zhang's vowel study prints experimental IPA syllables without a sufficient character/gloss alignment, so those tokens were not turned into word cards.
- [Ou 2012, Tone merger in Guangzhou Cantonese](https://theses.lib.polyu.edu.hk/handle/200/6794): repository abstract explicitly reports 75 participants, discrimination/identification/production tasks, T3/T6 full merger and age differences. The note presents a study finding, not a universal merger claim.
- [Fung and Wong 2023](https://pubmed.ncbi.nlm.nih.gov/37851598/): checked authors and abstract for the 191-speaker voice-quality comparison. It distinguishes phonation from merely sharing a phoneme inventory.
- [Taishanese dictionary key](https://taishandict.com/transcription.html): direct worked example 切 tɛt33 supports the onset [tʰ] versus final [t̚] explanation. Its word-entry site returned an interstitial to the fetcher; no unverified entries or flattened accent-dependent vowels were imported.

## Culture sources checked

- [Beijing: Shijia Hutong Museum](https://english.beijing.gov.cn/latest/news/202307/t20230701_3152487.html): residents' objects, photographs and sound recordings.
- [Jinan Cultural Center dough-figurine workshop](https://english.jinan.gov.cn/col/col108306/art/2026/art_9d5adc9b9332497e97b69892401b9217.html): Luo Sui; lotus and koi; kneading, pinching and carving.
- [Nanjing municipal account of the 2025 Qinhuai Lantern Fair](https://www.nanjing.gov.cn/bmdt/202501/t20250123_5064892.html): actual exhibition districts, river and park setting.
- [UNESCO Creative Cities: Chengdu](https://www.unesco.org/en/creative-cities/chengdu): varied flavours, public participation and culinary training; dated business totals are not repeated as current facts.
- [Guangzhou culture bureau: embroidery](https://wglj.gz.gov.cn/xxgk/qt/rdjyzxta/zxta/content/post_9744566.html): Guangzhou/Chaoshan distinction, museum-pattern study and reproduction for craft transmission.
- [Hong Kong Memory: milk tea](https://slscdn.hkmemory.hk/en/collections-ichhk_ii-hong_kong_style_milk_tea_making_technique-ingredients_utensils_and_brewing_process.html): tools, tea blends, pouring technique and variation among makers.
- [Jiangmen culture bureau: Fushi floating-colour practitioner](https://www.jiangmen.gov.cn/jmwgj/gkmlpt/content/3/3379/post_3379654.html): frame and prop building, young performers, costumes and dramatic tableaux. Explicitly located in Fushi, Doushan, within Taishan.
- [Yulin Mass Art Center: first municipal heritage inventory](https://m.ylsqzysg.com/nd.jsp?groupId=0&id=85&mid=425): niuba and the Yuzhou cultural-centre responsibility. No unsupported cooking method or origin date added.

## Remaining boundaries

Chengdu, Guangzhou and Taishan still need aligned locality-specific lexical IPA with source provenance before adding word cards. Their verified sound explanations and cultural material are usable now. The 25 Beijing entries are intentionally formal Standard Mandarin reference material from a documented local speaker, not a replacement for future vernacular Beijing evidence.

Verification: TypeScript no-emit check passed after the data expansion. New dictionary rows were checked against the downloaded source tables; Beijing/Hong Kong IPA pages and Yulin Table 1 were visually inspected. Evidence files are under `.evidence/mandarin-yue-depth/` and are not required for the public build.
