# Hakka and Wu learning depth — 9 October 2026

## Scope

This pass adds locality-bound character and word readings, specific sound lessons, and cultural subjects to `src/data/learning/hakka-wu.ts`. It does not alter classification, rename map points, create recordings, or fabricate narrower speaker locations.

## Pronunciation evidence

| Locality  | Addition                                                                     | Primary evidence and limits                                                                                                                                                                                                                                                                                                                                                                                                             |
| --------- | ---------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Meixian   | 27 character readings                                                        | CUHK Multi-function Chinese Character Database, each entry’s 梅縣 row. Each character links directly to its own source page. These pitch numbers differ from Cheung’s Meijiang sample and are intentionally not harmonized.                                                                                                                                                                                                             |
| Shanghai  | 21 character readings                                                        | CUHK 上海 row. Avoided unresolved literary/colloquial alternatives; older sinological `ȵ` retained. Affricate ligatures expand to tied IPA sequences.                                                                                                                                                                                                                                                                                   |
| Wenzhou   | 19 character readings                                                        | CUHK 溫州 row. Avoided special child-directed, literary and compound-restricted alternatives. The pre-existing young-Lucheng study remains separately sourced.                                                                                                                                                                                                                                                                          |
| Suzhou    | 20 character readings                                                        | Ling Feng, _A phonetic study of the vowel system in Suzhou Chinese_ (2009), Tables 2-1 and 3-1, printed pp.14 and74 / PDF34 and94. Metropolitan speakers in their fifties. Tables visually checked against PDF images. Source apical-vowel symbols `ɿ ʮ` retained; these are sinological conventions, not newly invented HanLingo vowels. Source values44 and5 are explicit pitch values.                                               |
| Haifeng   | 24 segmental examples                                                        | Chang Wei-min, _台海兩岸海豐客語之變異及其研究_ (2008), printed pp.30–31 / PDF45–46. Shared Hakka survey consonant/vowel list across Haifeng towns, visually checked. It is NOT the separate Taiwan Hailu list, Haifeng Min, or a county-seat recording. Town tone values differ; tones deliberately omitted with visible reading label and `toneNotation: unspecified`. These forms demonstrate segments, not complete pronunciations. |
| Lufeng    | 18 additional fieldwork words                                                | Lü Wan-yun, Guangdong Lufeng field table, printed/PDF106–107, visually checked. Only the Guangdong column is used. In section II the source explicitly places Hsinchu before the slash and Guangdong after it; weather and terraced-field entries follow the Guangdong side. The source does not identify a single town.                                                                                                                |
| Changting | More explicit sound lesson and open full-paper source; no new IPA bank       | Lin Hui-shan2007 obtained from the journal’s own PDF. It has tone-combination examples in Han characters and H/M/L notation, not a directly reusable segmental wordbank. No consonants or vowels inferred from Hakka elsewhere.                                                                                                                                                                                                         |
| Lishui    | More experimental-learning context and regional craft topic; no new IPA bank | Lan/Chen/Zhang2023 is accessible and describes eight urban Liandu speakers, but does not supply a reusable item-by-item IPA bank. Steed2010 is catalogued at ANU, but the repository download was inaccessible during this pass. No Longquan or other prefecture-locality pronunciation substituted.                                                                                                                                    |

### Retrieval URLs

- CUHK: https://humanum.arts.cuhk.edu.hk/Lexis/lexi-mf/dialect.php?word=%E5%B1%B1 (each word receives its corresponding character URL)
- Suzhou: https://lbms03.cityu.edu.hk/theses/c_ftt/phd-ctl-b39479298f.pdf
- Haifeng: https://cloud.hakka.gov.tw/Attachment/1/921210533771.pdf
- Lufeng: https://cloud.hakka.gov.tw/Attachment/1/84178533971.pdf
- Changting: https://thjcs.site.nthu.edu.tw/var/file/452/1452/img/1300/THJCS371-6.pdf
- Lishui2023: https://www.internationalphoneticassociation.org/icphs-proceedings/ICPhS2023/full_papers/542.pdf
- Lishui2010 catalogue: https://openresearch-repository.anu.edu.au/items/69a0c01b-9f60-4eef-8e5d-cc0aed96accc

## Source handling

- Dictionary readings are labelled **character readings**. The English gloss identifies the character’s sense; it does not imply that the isolated character is the everyday standalone word for that concept.
- No source tone category is converted to pitch. CUHK reports tone name plus pitch value; only that explicit value is retained.
- Suzhou elicitation characters include literary and bound material. Notes make this explicit. The source’s English “crotch” for 丫 is rendered “fork; branch junction” to avoid an unintended anatomical-only gloss.
- Haifeng tones are omitted rather than selecting one town’s tone for a multi-town segment table. The front end must keep the “segments only” / “tones omitted” qualification visible.
- Lufeng uses the author’s legacy symbols (`Σ`, `Ζ`, `Ν`, apostrophe aspiration). These are normalized as `ʃ`, `ʒ`, `ŋ`, `ʰ`, consistent with the source’s consonant classification and existing project normalization. Unclear missing Han characters, ambiguous alternatives and uncertain underscored-vowel examples were excluded.
- CUHK fish in Meixian is syllabic `[n̍11]`; this is not silently changed to `[ŋ̍]`. Wenzhou 我 retains `[ŋ̍35]`. Nasal combining marks in Suzhou 櫻 `[ã44]` and 骯 `[ɑ̃44]` follow the printed table.

## Culture and educational depth

All eight localities have at least two cultural topics after this pass, and at least three sound notes. New topics: Songkou mountain songs; Haifeng qilin construction/performance; Lufeng shadow theatre; Shanghai Huju and shikumen lanes; Lucheng Ou crafts; Longquan celadon as explicitly wider-prefecture context for Lishui. Government cultural offices and UNESCO supply the sources in the data.

Regional culture is not asserted to be exclusive to one speech community. In particular, Haifeng qilin and Lufeng shadow theatre are cultural traditions of multilingual places, Rui’an printing is wider Wenzhou context, and Longquan celadon is not Liandu linguistic evidence.

## Remaining evidence gaps

1. Obtain a complete accessible Changting Chengguan segmental dictionary/table with speaker details.
2. Retrieve and visually inspect Steed2010 Lishui common lexicon before adding IPA words.
3. Replace Haifeng segment-only examples with full town-specific readings when the same exact-word source table gives those readings; preserve the county survey as a separate reference if useful.
4. Recordings remain links to actual source resources only; these additions do not create or imply human audio.
