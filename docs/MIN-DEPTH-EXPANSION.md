# Min learning expansion

Research and source review: 2026-10-09. These data deepen the existing locality pages; they do not change the classification or navigation tree.

## Coverage

`src/data/learning/southern-min.ts` exports one `BranchLearning` pack for `min/southern-min`. Each of the 13 mapped localities has two culture topics, two learning resources, and at least two specific listening or vocabulary notes.

| Locality    | Sound / learning notes | Culture topics | Resources |                                  New IPA entries |
| ----------- | ---------------------: | -------------: | --------: | -----------------------------------------------: |
| Amoy        |                      2 |              2 |         2 |       0; existing Amoy material remains separate |
| Tsuan-Chiu  |                      2 |              2 |         2 | 0; existing regional comparisons remain separate |
| Tsiang-Chiu |                      2 |              2 |         2 | 0; existing regional comparisons remain separate |
| Taipak      |                      2 |              2 |         2 |                                                0 |
| Tainan      |                      2 |              2 |         2 |                                                0 |
| Kaohsiung   |                      2 |              2 |         2 |                                                0 |
| Yilan       |                      2 |              2 |         2 |                                                0 |
| Lukang      |                      2 |              2 |         2 |                                                0 |
| Sanxia      |                      2 |              2 |         2 |                                                0 |
| Singapore   |                      2 |              2 |         2 |                                                0 |
| George Town |                      2 |              2 |         2 |                                                0 |
| Teochew     |                      2 |              2 |         2 |                                                0 |
| Swatow      |                      3 |              2 |         2 |                                               32 |

`src/data/learning/min.ts` adds 24 character readings each to Fuzhou and Jian’ou and one culture topic each to Jian’ou, Putian, and Yong’an.

| Locality | Attested IPA entries after this change | Culture topics |
| -------- | -------------------------------------: | -------------: |
| Fuzhou   |                                     32 |              2 |
| Jian’ou  |                                     32 |              2 |
| Putian   |                                     10 |              2 |
| Yong’an  |                                      0 |              2 |

## Phonetic evidence

New IPA entries come directly from the Chinese University of Hong Kong's Multi-function Chinese Character Database locality tables:

- [Fuzhou, point O](https://humanum.arts.cuhk.edu.hk/Lexis/lexi-mf/dialectIndex.php?point=O)
- [Jian’ou, point Q](https://humanum.arts.cuhk.edu.hk/Lexis/lexi-mf/dialectIndex.php?point=Q)
- [Swatow, point R](https://humanum.arts.cuhk.edu.hk/Lexis/lexi-mf/dialectIndex.php?point=R)

For this expansion, only characters with one listed table reading were selected. Broad English character glosses do not assert that the same reading is used in every compound. Existing Jian’ou 米 “rice” remains [mi˦˨]; the distinct reading for “metre” was not substituted. Entries explicitly identify citation readings, not connected speech.

The tables provide IPA initials/finals and explicit pitch values alongside tone-category labels. Pitch digits 1–5 were rendered as IPA tone letters ˩˨˧˦˥; category labels were not converted into contours. The typographic affricate ligature ʦ was normalized to t͡s. Nasalization, syllabic marks, aspiration, and closures remain explicit. HanLingo spelling is generated downstream from IPA using the existing shared rules; no new spelling rule is introduced here.

Downloaded source HTML, parsed table readings, and selected rows are preserved locally under `.evidence/min-depth/`. The parser and selected JSON make the added character readings traceable to source rows. These are research evidence, not a runtime network dependency.

## Regional differences without invented IPA

- [Wang Kuei-lan's Penang study, table 17](https://taiwan.ntue.edu.tw/var/file/29/1029/img/692/476201647.pdf#page=36) supplies comparisons of 雞, 火, 買, and 飯 across Amoy, Tsuan-Chiu, and Tsiang-Chiu. Notes explain actual vowel or tone differences. Its study-specific contours do not overwrite another source's Amoy teaching readings.
- Taiwan notes use the MOE dictionary's named regional reference rows and its own Tâi-lô forms. The source distinctions in tomato, soap, chopsticks, chicken, and market remain visible. Tâi-lô `ir`, accents, and final `h` are not silently interpreted as HanLingo or IPA. These entries supplement the existing source-only regional word data.
- [Singapore Chinese Cultural Centre](https://culturepaedia.singaporeccc.org.sg/language-education/the-hokkien-dialect-in-singapore/) provides local language/contact and place-name context. [NHB's river-walk guide](https://www.roots.gov.sg/~/media/Roots/Files/singapore-river-walk/nhb_singpaore-river-walk_2018.pdf) attests the meaning of Lau Pa Sat. Neither is used to invent pitch contours.
- Penang fieldwork and the community dictionary are marked as regional comparisons when attached to George Town. They are not represented as evidence that all city residents use one pronunciation.
- Chaozhou tone/song research is labelled as a research poster. General Teochew lessons are regional comparison material. Swatow dictionary readings are scoped only to `shantou`, not relabelled as Chaozhou-city speech.

## Culture evidence

Each culture item includes its own source object. Sources include UNESCO heritage records, the National Heritage Board, George Town World Heritage Incorporated, city/county heritage and tourism departments, cultural institutions, and the Yilan distillery operator. Topics include Nanyin, puppet theatre, woodblock prints, tea, rice sheets, indigo dyeing, historic trading streets, harbour warehouses, clan jetties, and overseas letters.

City culture is not equated with the ethnicity or language of every resident. Sanxia's Hakka connections, Singapore's shared hawker culture, and George Town's multilingual performances are explicit. Regional customs are labelled as shared rather than claimed as exclusive to one locality. No photograph or depicted person's language is inferred from these texts.

## Remaining evidence gaps

- Yong’an still needs a usable primary word-by-word source with locality, meaning, segmental reading, and tone value. Historical correspondence tables alone do not justify manufacturing a basic word list.
- Putian remains at 10 verified entries. Further lexical expansion should use a transcribed dictionary or documented recordings, not extrapolate from the subgrouping paper.
- Taiwan, Singapore, George Town, and Chaozhou-city need additional exact-locality IPA evidence before new interactive IPA exercises are enabled from those sources. Source spelling, useful comparisons, culture, and listening resources remain available meanwhile.
- New character entries are not recordings. The dictionary links expose source audio where available; no synthetic voice is presented as a locality speaker.

## Validation

- `npx tsc -b` passed after both data files were written.
- `npx vitest run src/data/learning/learning.test.ts src/data/regional-words.test.ts src/data/xiamen-learning.test.ts` passed: 3 files, 16 tests.
- Parent integration owns the learning index and browser acceptance. This subtask changes only the two Min learning data files and this document; it does not publish or alter routes.
