# Harbin, Rongcheng, Loudi and Kunming lexical surveys

This batch adds **692 lexical entries**: Harbin 151, Rongcheng 150, Loudi 141 and Kunming 250. These are questionnaire-linked lexical forms, unlike the separately labelled character-reading collections. They are dated documentary samples, not new recordings or claims about every present-day resident.

## Sources and reuse

- Liu Lili, Wang Hongzhong and Bai Ying (2007), *现代汉语方言核心词·特征词集*, Nanjing: Fenghuang. [Lexibank edition](https://github.com/lexibank/liusinitic/tree/54f6742d9fa60315ae41b91d0d1e02f04036efb5), commit `54f6742d9fa60315ae41b91d0d1e02f04036efb5`. The source city IDs are `Haerbin`, `Rongcheng`, and `Loudi`. Publication is 2007; collection dates and precise speaker addresses are not supplied by the dataset.
- Beijing University (1964), *汉语方言词汇*, Beijing: Wenzi Gaige. [Lexibank edition](https://github.com/lexibank/beidasinitic/tree/6bb8f57330f3b28c126a633f2c2adc6d01d0f555), commit `6bb8f57330f3b28c126a633f2c2adc6d01d0f555`, [v5.1 DOI](https://doi.org/10.5281/zenodo.13149151). The source city is `Kunming`. The editors describe a 1950s survey, published in 1964, and slight IPA adjustment in the electronic edition. We preserve the electronic `Value`, not a claim of facsimile transcription from the printed book.

Both dataset metadata and LICENSE files state **CC BY 4.0**. Credit belongs to the original authors and the respective Lexibank editors/contributors. Our modifications are a selected subset, conservative exclusions, syllable-spacing for display, brackets, explicitly logged English-heading typo edits and supplementary learning notes. The [provenance ledger](lexical-expansion-provenance.json) pins all CSV, README, metadata and license hashes and records every selected source row, exact input, local writing field, parameter join and displayed record ID. Each public entry links to its physical source-file row. No book scans or extended book prose are reproduced.

## Selection and verification

`node scripts/import-lexical-expansion.mjs` verifies the pinned source hashes and regenerates the data and ledger. Missing source files can be fetched from the pinned GitHub revision. `--research` writes only under `.evidence/lexical-next/`. The importer uses `Value`, not normalized `Segments`; `Chinese_Characters` for Liu, `Benzi` for Beida, and the matching parameter `Name` for meanings. It does not borrow a character or reading from another city.

The Liu selections retain all eligible concepts. Kunming takes 250 eligible entries, prioritising an explicit everyday-word list and then source questionnaire order. Incomplete tones, editorial annotations, missing local characters, unresolved placeholder `囗`, unsupported IPA and separately documented source contradictions are excluded. A second eligible pronunciation of the same concept is not counted as another selected word. Supplied one-digit contours are retained as one digit; we do not invent a longer contour. Compound pitch values remain supplied word-level sequences, not reconstructed citation tones.

Explicit source problems are **held**, never repaired silently:

- Harbin `仍` paired with “throw”; Harbin/Rongcheng/Loudi `進` paired with “near”.
- Harbin 媽 with `m⁴⁴` but no source syllabicity mark or vowel: unresolved transcription.
- Kunming 男入 “man”, 阻 “mouth”, 蜜火蟲 “firefly”, 毛錢衣 “woolen sweater”, and 裌祆: unresolved source glyphs.
- Kunming 蛐蟮 with `tɕʰiʂã¹³`: an unresolved compound with only one supplied tonal group. No internal tone inferred.

The ledger contains these holds and all mechanically rejected candidate records considered before each selection limit. Some genuine local forms look unlike standard written Chinese: Rongcheng 歹 “eat” is retained exactly. Loudi 喫 is attested for both eating and drinking, so a meaning quiz must not offer these as competing answers. Unusual but attested Harbin forms such as 人 `[in²⁴]` remain untouched.

Tests check all 692 generated entries against their ledger values, row links, reading kind, locality, pitch notation and converter support. An independent source review joins against the pinned raw CSV tables rather than treating the generated ledger as source truth. These checks establish faithful transformation of the licensed dataset; they are not new native-speaker verification or proof that the dataset is error-free.

## Geography and classification

- Harbin uses the existing `harbin` locality. No city geometry is changed.
- Rongcheng reuses the existing `rongcheng-371082` leaf because both records identify the same named county-level city and no narrower settlement is supplied. The new readings have their own dated lexical register and row sources; the existing distribution source is not treated as pronunciation evidence. The source does not identify Dongchudao, Yuankuang or another village as the lexical recording site. No duplicate map place is added.
- `loudi-study` is the named Loudi lexical sample, distinct from the Louxing District distribution reference `xiang-county-431302`. It is not a claim about every town in the modern prefecture.
- `kunming-study` is the 1950s study reference. Its cluster is the sourced **Yunnan subdivision**, not an invented urban accent group.

Classification comes separately from [Jing Liwen’s 2025 second-edition Atlas county dataset](https://doi.org/10.5281/zenodo.15897647): row 2617/code 371082 gives Jiao–Liao / Deng–Lian / Yan–Wei for Rongcheng; row 1775/code 431302 gives Lou–Shao / Xiang–Shuang for the Loudi city core; row 3379/code 530100 gives Southwestern / Yunnan / Dianzhong for Kunming. [Hunan’s provincial dialect account](https://www.hunan.gov.cn/jxxx/hxwh/jfy/201711/t20171111_4685273.html) independently places city Loudi with Shuangfeng in Lou–Shao Old Xiang. Finer source ranks stay in notes where the website’s four-level structure does not expose another level.

The existing Rongcheng anchor is unchanged. The two new map anchors are independent geographic references, **not speaker coordinates**: Wikidata [Loudi Q416988](https://www.wikidata.org/wiki/Q416988) and [Kunming Q182852](https://www.wikidata.org/wiki/Q182852), P625 inspected 2026-10-09 (CC0). Exact DMS inputs and scope are recorded in each atlas entry. No local name pronunciation is inferred from pinyin or from these geographic sources.

## Cultural context

Every place has two short original summaries, attached to its own locality only:

- Harbin: multilingual signs and commercial food/souvenir displays from [Gu, Li, Song and Hu’s 2026 field study](https://www.polyu.edu.hk/lst/research/publications/journal-papers/2026/0611-chinese-city-with-russian-characteristics/) of Central Street and Saint Sophia’s surroundings.
- Rongcheng: Dongchudao sea-grass-roof houses in an [official development/heritage account](https://www.ndrc.gov.cn/fggz/nyncjj/xczx/202009/t20200909_1237854.html), and the Yuankuang Grain Rain sea ritual in the [national heritage record](https://www.ihchina.cn/project_details/15092). Both villages are explicitly broader cultural context, not invented wordlist locations.
- Loudi: a [2016 Lianshui dragon-boat event](https://tyj.hunan.gov.cn/tyj/xxgk/gzdt/sstyxw/201606/t20160607_3456671.html) and [2025 city-library/museum Duanwu workshops](https://whhlyt.hunan.gov.cn/whhlyt/news/sxxw/202506/t20250604_33690847.html). Specific dates avoid implying unchanged annual programmes.
- Kunming: [Green Lake’s community arts groups](https://mzzj.yn.gov.cn/html/2024/difangdongtai_0326/53256.html), documented in 2024, and [Kunming Municipal Museum’s Dizang Temple pillar exhibit](https://www.kmmuseum.com/gzl.asp?act=20). Neither supplies identity or language claims about participants.

This batch adds no new photographs or locality audio. Its culture notes do not establish linguistic identity, and its 692 words do not make these localities complete courses.
