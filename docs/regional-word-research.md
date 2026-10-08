# Regional vocabulary and pronunciation

Checked 2026-10-09. Data lives in `src/data/regional-words.ts`; it does not replace the existing locality lexicons.

## Evidence rules

- A concept joins readings with the same meaning. A shared character alone is insufficient: CUHK’s Jian’ou 米 distinguishes rice from the unit metre.
- A locality label means attested there or in the named reference accent. It does not mean exclusive to that place, used by every resident, or absent elsewhere.
- MOE’s city-labelled reference accents are retained explicitly. They are reference points within Taiwan’s variation, not administrative boundaries around a homogeneous accent.
- Source romanization stays under its own system name. MOE Tâi-lô tone marks encode categories; no local IPA pitch values are inferred from them.
- HanLingo spelling is derived only from the entries with verified IPA and explicit pitch-contour notation. Untoned heritage spellings cannot supply tones.
- Existing learning datasets are imported directly for shared concepts. Their speaker, date, register and source qualifications travel with each reading.

## New comparison sets

| Evidence                                                                                                                                                    | Material                                                          | Treatment                                                            |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- | -------------------------------------------------------------------- |
| [MOE 柑仔蜜, regional comparison](https://sutian.moe.edu.tw/zh-hant/su/5090/)                                                                               | Tomato names in six published locality references                 | Tâi-lô preserved; no invented IPA.                                   |
| [MOE 雪文, regional comparison](https://sutian.moe.edu.tw/zh-hant/su/8021/)                                                                                 | Soap in six references; two Taipak forms                          | Both alternatives retained, no exclusive claim.                      |
| [MOE 箸, pronunciation comparison](https://sutian.moe.edu.tw/zh-hant/su/10689/)                                                                             | Chopsticks                                                        | Vowel differences stay visible.                                      |
| [MOE 雞, pronunciation comparison](https://sutian.moe.edu.tw/zh-hant/su/12657/)                                                                             | Chicken                                                           | Dictionary spelling shown separately from IPA study readings.        |
| [MOE 市場, regional comparison](https://sutian.moe.edu.tw/zh-hant/su/1772/)                                                                                 | Market                                                            | Includes the Tâi-lâm vowel variant.                                  |
| [National Heritage Board, Singapore River Walk, p. 43](https://www.roots.gov.sg/~/media/Roots/Files/singapore-river-walk/nhb_singpaore-river-walk_2018.pdf) | Singapore market spelling in heritage names                       | Untoned `pa sat`; the source documents `lau pa sat` as “old market”. |
| [Wang Kuei-lan, 2022, Table 17, p. 170](https://taiwan.ntue.edu.tw/var/file/29/1029/img/692/476201647.pdf#page=36)                                          | Amoy, Tsiang-chiu and Tsuan-chiu: chicken, fire, buy, cooked rice | Twelve IPA readings, preserving the table’s printed pitch values.    |

The Wang table was checked visually against PDF page 36, not solely through extracted text. It compares the author’s Penang fieldwork with documented Fujian localities. The selected rows use the named Fujian columns. The paper’s footnote 42 identifies their dictionaries and gazetteers; this is an attributed research comparison, not new HanLingo fieldwork.

The table’s Amoy cooked-rice contour is 11; the separate existing Amoy vocabulary source uses 22. We preserve both as source-specific references, with their qualifications, rather than silently normalizing them or describing this as a distinction between two cities. The present data does not assign Penang-wide fieldwork to George Town without narrower speaker-location evidence.

## User examples checked

- **“Ka Ma Tit” for Tsuan-chiu tomato:** not published as an attested spelling. It may point toward a name such as 柑仔得, but the supplied syllables and precise locality need a directly checked dictionary entry or speaker evidence. Search results suggest overlap between tomato names, so an exclusive Tsuan-chiu/Amoy split would be unsafe.
- **“Tshau Khi A” for Amoy tomato:** MOE verifies `tshàu-khī-á` for named Taiwan references, but those entries do not establish an Amoy pronunciation. The new tomato set therefore uses only the places the checked source identifies.
- **Taipak “sapbun” for soap:** verified with a qualification. The MOE Taipak reference lists `sap-muî` and `sap-bûn`. Other named Taiwan references also use `sap-bûn`; it is not uniquely Taipak.
- **Singapore “Kampang” for market:** not accepted. Singapore heritage records attest `pa sat` in Hokkien market names. The separate Malay-origin kampong/kampung word relates to villages; a Singapore Hokkien IPA for it has not been added.

These candidates remain research notes, not speculative learning entries.

## Additional Shanghai comparisons

Freshly checked CUHK character pages for [茶](https://humanum.arts.cuhk.edu.hk/Lexis/lexi-mf/dialect.php?word=%E8%8C%B6), [米](https://humanum.arts.cuhk.edu.hk/Lexis/lexi-mf/dialect.php?word=%E7%B1%B3), [山](https://humanum.arts.cuhk.edu.hk/Lexis/lexi-mf/dialect.php?word=%E5%B1%B1), and [魚](https://humanum.arts.cuhk.edu.hk/Lexis/lexi-mf/dialect.php?word=%E9%AD%9A) add four Shanghai readings. Fish uses the dictionary’s colloquial reading. These are explicitly labelled as the CUHK reference, separate from the Huangpu speaker documented in the existing Shanghai lessons. No equivalence of speaker generation or citation system is assumed.

## Remaining locality gaps

The new comparison sets do not yet cover every mapped city. In particular, George Town needs speaker-locality evidence before Penang-wide fieldwork can be assigned to it. Singapore currently has an attested heritage spelling for market, not a complete IPA lesson. Teochew and Swatow should use their own local evidence rather than inheriting Tsuan-Chiang forms; they are not mapped locality IDs in the present `mapPoints` dataset. Locality-specific comparison words remain absent for Beijing, Chengdu, Guangzhou, Hong Kong, Taishan, Haifeng, Changting, Suzhou, Lishui and Yong’an. Existing sound studies are useful sources but do not justify invented word entries.

## Existing-source correction found

[CUHK 米](https://humanum.arts.cuhk.edu.hk/Lexis/lexi-mf/dialect.php?word=%E7%B1%B3) gives Jian’ou rice as `[mi42]` and metre as `[mi21]`. The comparison builder excludes the latter from the rice concept, and the primary learning dataset should retain the rice reading. Character senses must be checked before adding more automatic comparison sets.

## API and verification

`RegionalConcept` has `id`, `english`, `contrast`, `note`, and `readings`. Each `RegionalReading` has a stable ID, existing `localityId`, written form, optional IPA, optional named source romanization, explicit tone notation, a source link, and a source scope.

- `regionalConcepts`: all concept sets.
- `regionalConceptsFor(localityId)`: complete sets involving this place, including comparison partners.
- `regionalReadingsFor(localityId)`: only this place’s readings, with `conceptId` and `english` added.

Tests cover real locality IDs, unique IDs, evidence on every reading, multiple places in every set, distinct Amoy/Tsiang-chiu/Tsuan-chiu forms, preservation of both Taipak soap variants, source tone separation, and exclusion of unverified tomato locality claims.
