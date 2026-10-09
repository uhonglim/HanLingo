# Min expansion · October 2026

This release adds 8 locality references to the four-level atlas: Manila Hokkien, Medan Hokkien, Bangkok Teochew, Singapore Teochew, Sibu Foochow, Sitiawan Foochow, Singapore Hainanese and Haikou. Min now has 67 locality references across 7 branches. Overseas Foochow and Overseas Hainanese are explicitly geographic collections, not invented linguistic subbranches. Existing canonical routes and place names remain stable. A city may have several language-specific reference pages.

## Readings

- 1,500 source-labelled character readings: 100 each for Leicheng/Leizhou, Xianyou, Putian, Gutian, Fuzhou, Fuqing, Zherong, Fu’an, Ningde, Wuyishan/Chong’an, Jianyang, Songxi, Jian’ou, Shaxian and Bangkok Teochew. See [Sinica provenance](MIN-SINICA-READINGS.md).
- 196 comparative and Penang readings from Wang (2022). Alternative forms are separate attestations, not additional meanings. See [source audit](MIN-SOUTHERN-EXPANSION.md).
- Identical IPA uses the global spelling key. The existing central-vowel reading aid `eo` now includes [ɘ]; exact source IPA is preserved.
- Amoy’s dedicated word, sound and practice pages use an adapter that keeps the original 35 word IDs and adds the 22 source-labelled Amoy entries. Regional entries remain separately labelled.

These are transcribed reference readings, not 1,696 new recordings. Character glosses identify the written character; they are not claims about the usual standalone word in conversation. Leizhou’s contradictory 雞/鷄 source pair is held out and documented.

## Photographs

90 newly added, distinct licensed scenes: 9 each for Fu’an, Xianyou, Wuyishan, Shaxian, Leizhou, Haikou, Bangkok, Sibu, Manila and Medan. Commons creators, license links and original file pages remain with every image. Assets are resized and encoded as WebP, preserving source display orientation; no synthetic cultural photographs are used. Individual descriptions and contact sheets were reviewed.

Singapore’s Teochew and Hainanese pages reuse 9 existing Singapore city scenes, excluding the specifically Hokkien temple. These are shared city context, not 18 additional photographs or claims about the language of pictured people. The content audit now distinguishes gallery placements from unique image assets.

See [mainland gallery notes](gallery-min-mainland-expanded.md). Overseas file metadata and source links live in `src/data/galleries/min-overseas.ts` and `min-bangkok.ts`. Sibu’s earlier night market is explicitly a historical view. Medan’s palace foundation stone and Tamil temple are wider city heritage, not evidence of Hokkien identity.

## Listening

Three real Singapore New Year greetings are streamed directly from the Singapore Chinese Cultural Centre’s [2021 Talking Red Packet](https://singaporeccc.org.sg/events/sccc-talking-red-packet-2021/): Hokkien, Teochew and Hainanese. Each retains its named performer, date, source page and recording scope. These files are not copied into the downloadable IPA pack. The one-player mechanism prevents overlap with general IPA demonstrations and stops playback when leaving the page; network failures retain an original-source link.

## Checks and remaining gaps

`npm run audit:min-readings` verifies all 1,500 source rows against the pinned provenance ledger. `npm test` covers catalogue paths, lesson availability, gallery metadata, phonetic conversion, quiz differences and the shared player. `npm run audit:content` rebuilds complete coverage counts, including localities with zero IPA. `npm run build:translation-evidence` updates existing verified-source grounding without claiming that a model service has been configured.

Many atlas points still lack local IPA or audio. Sibu, Sitiawan, Medan and Manila receive accurately scoped cultural/language-use content; no nearby city’s pronunciation is copied into their lessons. Hainan Min gains Haikou’s gallery and cultural material plus a Singapore recorded performance, but not a fabricated Haikou word list. Current limitations stay measurable in [the content inventory](CONTENT-DEPTH.md).

Local acceptance checked: Fu’an tea search returns its own [ta22] reference and visible source row; Bangkok tea renders [te55] / `te55` on a 390-pixel viewport without horizontal overflow; a Leizhou practice answer gives source-linked feedback; Amoy’s new 軟 entry is searchable through simplified 软; Sibu’s gallery opens its direct-linked overlay; Singapore Teochew audio advances with no media error and stops on navigation. The build produces 1,834 static entry points. Automated checks pass: 175 frontend/data tests plus 10 translation protocol tests. These tests do not establish a configured translation provider or native-speaker validation of all data.
