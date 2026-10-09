# Southern Min comparative and Penang vocabulary expansion

This collection adds 196 sourced readings: 88 Penang speaker-reference forms under the George Town learning page, 20 Tsiang-tsiu, 21 Longhai, 26 Tong’an, 22 Amoy and 19 Tsuân-tsiu. Alternative forms are separate records, not additional concepts. The 58 Penang local/loan forms extend the 138 table-comparison readings. No local sound recordings are supplied by this collection.

## Source and scope

王桂蘭, 2022, *檳城福建話的語音系統描寫及詞彙討論*, 文史台灣學報 16, 135–197. [Publisher PDF](https://taiwan.ntue.edu.tw/var/file/29/1029/img/692/476201647.pdf).

Local PDF SHA-256: `d1b89bf3a11914ec683af15788b4449adaaabe5c3881c299292f4ea50008b8b9`.

The Penang consultant is 謝清祥, a lifelong Penang resident, age 68 at the first interviews. Footnote 26 identifies five interviews in 2011 and a supplemental interview in 2015. This is explicitly displayed as **Penang speaker reference · 2011/2015**, not a city-wide standard or a new recording of George Town speech. His ancestral origin is Sandu in the former Haicheng area. The locality page supplies geographic context; it does not turn regional source scope into city-only evidence.

Table 17, printed p. 170, compares Penang against named local sources (footnote 42):

| Column | Source scope retained in the UI |
| --- | --- |
| Tsiang-tsiu | 漳州市志, volume 5, 1999 |
| Longhai | 龍海縣志, 1993 |
| Tong’an | 張屏生, 同安方言及其部分相關方言的語音調查和比較, 1996 |
| Amoy | 周長楫、歐陽憶耘, 廈門方言研究, 1998 |
| Tsuân-tsiu | 鯉城區志, 1999 |

Source dates remain visible beside pronunciations. These are character citation forms, not free-standing phrase recordings. The four comparisons already present from the exact same table—雞、火、買、飯 for Amoy, Tsiang-tsiu and Tsuân-tsiu—are excluded here to avoid counting the same attestation twice.

## Transcription review

Rendered PDF pages 36, 45, 46, 49, 50, 51, 54, 55, 57 and 58 were inspected visually. Extracted text contains private-use font mappings and obvious font corruption, so it is not the authority for the entered IPA.

- Table 17 source pitch digits are preserved, including one-digit checked tones and Tong’an 買 [bue3]. No tone categories were relabelled as pitch.
- Plain source `ts`, `dz` remain exact source sequences; the shared converter recognizes these affricate sequences.
- Nasalized vowels, syllabic [ŋ̍], aspiration and glottal stops are retained.
- A source missing-cell mark is omitted, never reconstructed. 橂 is excluded because the character/gloss is unsuitable for a confidently explained learner item.
- The visibly corrupt jamban transcription in table 23 is excluded rather than silently repaired using a different table.
- Penang loanwords keep their **Malay or English source headword** when no local Han spelling is provided; the Chinese translation column is not falsely used as a local written form. A visible register label identifies source-language headwords, and the note identifies the source language.
- The exact unusual Han spellings 羔丕烏 and 吊死禮申 remain as the study records them, with explanatory notes.
- Tea [tɛ13], tea without milk [tɛ33 ɔ55], and iced tea without milk [tə33 ɔ33 piŋ55] retain the source’s vowel and phrase-tone differences.
- English glosses are concise editorial translations of the source meanings. They do not imply exclusive regional use. The botanical identity of barli is left unresolved because the source’s Chinese gloss is not an adequate botanical identification.

Tong’an [ɘ] is retained as source IPA. The shared key now maps it to **eo**, alongside [ə] and [ɜ], as a documented many-to-one reading aid. Never substitute [ə] in the source record merely to make conversion succeed.

## Evidence not imported

Wang’s CLDF `wangbcd` Taibei and Zhanping records contain mixed Han and source ASCII notation, without a verified source-to-IPA key. These were inspected but not labelled IPA. Singapore sources found in this pass provide other orthographies; no Amoy or Penang reading is assigned to Singapore. The collection supplies no invented audio, no generated tone sandhi, and no claims of current native-speaker validation.

## Rebuild and checks

`python3 scripts/build-min-southern-expansion.py` regenerates only `src/data/learning/min-southern-expanded.ts` from the manually audited rows. `src/data/learning/min-southern-expanded.test.ts` checks exact cross-locality contrasts, missing-cell preservation, regional scope, source-language headwords, and compatibility with the shared converter. Integration uses `mergeLearningPacks` in the main learning index.
