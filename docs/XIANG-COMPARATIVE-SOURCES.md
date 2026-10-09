# Xiang comparative character readings

This increment publishes **238 character readings across four named study references**, not 238 translated everyday words. It supplements Shuangfeng, Hengyang, Xupu and Chenxi with exact source comparisons. No new audio or fieldwork is claimed.

| Reference | Readings | Atlas identity | Scope |
| --- | ---: | --- | --- |
| Shuangfeng 雙峰 | 61 | `xiang-county-431321` | Existing Shuangfeng county reference; study settlement unspecified |
| Hengyang 衡陽 | 58 | `hengyang-xiang` | Named Hengyang study; city administrative anchor, not Hengyang County |
| Xupu 漵浦 | 58 | `xiang-county-431224` | Existing Xupu county reference; study settlement unspecified |
| Chenxi 辰溪 | 61 | `xiang-county-431223` | Existing Chenxi county reference; study settlement unspecified |

## Pronunciation source

Wu Jui-wen 吳瑞文 (2024), *論現代湘語精、知、章、莊系聲母的存古與創新—兼評吳湘一體說*, Bulletin of Chinese Linguistics 17:97–128. DOI: [10.30184/BCL.202410_17.0007](https://doi.org/10.30184/BCL.202410_17.0007). [Author-hosted PDF](https://www.ling.sinica.edu.tw/upload/researcher_manager_result/7e148a271bcb33ab2cfcccd2ddb8e74a.pdf).

Selected tables: 2 on p.100; 3–4 on p.101; 5–6 on p.102; 8 on p.104; 10 on p.106; 11–12 on p.107; 13 on p.108. Table columns, locality rows and alternatives are recorded individually in `xiang-comparative-provenance.json`. PDF page numbers are printed page numbers minus 96.

The paper's p.99 attributes its Shuangfeng reference to Beijing University's *漢語方音字匯* (2003), Hengyang to Li Yongming's *衡陽方言* (2016b), Hengshan to Peng Zerun's *衡山方言研究* (1999), Xupu to He Kailin's *漵浦方言研究* (1999), and Chenxi to Xie Boduan's 2016 work. The Chenxi title is retained as cited by Wu. These original books were not independently consulted in this increment. Neither a modern recording date nor an exact speaker settlement is inferred from this comparative article.

## Transcription and learning limits

- Source digits 1–8 are **tone categories**, never pitch contours: 陰平、陽平、陰上、陽上、陰去、陽去、陰入、陽入. Display uses `toneNotation: 'source-category'`; HanLingo spelling comes from the shared converter.
- The paper explicitly uses baseline `h` for aspiration (p.100). Display changes this sign to IPA `ʰ`; exact raw forms remain in the ledger and each reading note.
- The PDF extraction encodes Xupu's printed nasal tilde as U+0342. Display normalizes that visually checked tilde to U+0303. It does not change the vowel or infer a nasal vowel from spelling.
- Distinct alternatives remain distinct records. Only explicitly identified colloquial forms receive that label: Shuangfeng 澀 `sia2` (p.105), 蝨 `sia2` (p.106), and 側 `tsia2` (p.109). Their other alternatives are not automatically called literary.
- 差 in table 6 is specifically the second character in 參差. This context is retained.
- English labels identify characters, such as “Character 紫”; they do not invent local lexical meanings. Every record has `learningKind: 'character-reading'`. These records must be excluded from English meaning practice.
- The visible reading qualification states Wu 2024, character-reading scope, tone categories and unspecified settlement. Historical source identity stays visible in the note. A 2024 publication is not a 2024 speech recording.

## Held material

The reviewed ledger contains 290 readable forms, but **52 Hengshan forms remain unpublished**. Jing's county dataset gives Hengshan County 430423 two different classifications: Hengzhou / Hengshan and Lou–Shao / Xiangshuang. Wu's county-level label alone cannot choose between them. Peng's original survey identity must be established first. A precise transcription does not justify an unsupported location-to-branch mapping.

Nineteen source cells were also excluded: visibly blank cells, cells that substitute another Chinese character for the table heading, and cells marked with the author's irregular-initial annotation. Substitutions such as 治 under 痔, 梔 under 枝, and 址 under 止 are not silently relabelled. Their raw values and reasons remain in the ledger. Held cells and held locality readings are separate counts.

## Classification and coordinates

Existing county references retain their existing sourced routes. The new Hengyang reference is separate from Hengyang County: [Jing's 2025 county dialect dataset](https://doi.org/10.5281/zenodo.15897647) has code 430400 衡阳市 under 湘语 / 衡州片 / 衡阳小片. Its four central districts agree. This supports the classification of the city-level reference, without proving a particular district or speaker.

The map anchor is [Wikidata Q144663](https://www.wikidata.org/wiki/Q144663), the city of Hengyang, at 26°53′48″N, 112°35′8″E (CC0). It is not Hengyang County Q162588 and is not a recording location. The existing county anchors are retained for the other three references.

The paper is publicly accessible, but no reusable audio or open full-text license is claimed. Only isolated factual character/transcription pairs are included, with a source locator for each. Narrative wording is original; the full article is not redistributed in the published app.

## Reproduction and review

Run `python3 scripts/import-xiang-comparative.py`. Optional source verification: `--verify-pdf <downloaded-pdf>` checks SHA-256 `8106d0ddb814f0232dda8c8c9c743274bd9f8f709d7dfe7373a7961268b634a7`.

The importer uses a checked ledger, not a generic PDF parser. Fifty manually transcribed locality rows were checked against rendered table pages and an independent `pdftotext -layout` extraction. Blank positions and annotations were checked visually. The ledger records each printed page, table, column, raw cell, alternative, register evidence and publication decision. Rendering screenshots remain research evidence in `.evidence/whole-atlas-next/`; they are not app assets.

The importer writes only `src/data/learning/xiang-comparative.ts` and `src/data/atlas/xiang-reading-localities.ts`. It does not edit shared indexes. Re-running it must leave these two files byte-for-byte unchanged.

## Local culture references

Each of the four references now has two specific cultural topics and four source links: two pronunciation-study links and two culture links. The culture sites do not identify the speech-survey settlement.

- Shuangfeng: [Yongfeng chilli-sauce preparation](https://whhlyt.hunan.gov.cn/whhlyt/news/sxxw/202502/t20250213_33586360.html) and [Fuhoutang's private libraries in Heye](https://sdaj.hunan.gov.cn/sdaj/ggfw/hnts/lyzy/202105/t20210510_16528293.html).
- Hengyang: [Shigu Academy at the river junction](https://www.hengyang.gov.cn/xxgk/dtxx/hydt/20241225/i3543118.html) and [Huiyan Peak's literary associations](https://www.hyyfq.gov.cn/yfgk/yfyx/20240530/i3383757.html). Direct retrieval returned HTTP 412; limited claims were verified against indexed text from these official pages. No bypass was attempted.
- Xupu: [Dajiangkou's June 2024 dragon-boat event](https://www.xp.gov.cn/xp/c110098/202406/7ef48d82a1aa4bf2b7ad1aa5d3fa185d.shtml) and [Xiang Jingyu's former home and manuscripts](https://www.hunan.gov.cn/hnszf/c101485/202108/t20210830_20409915.html).
- Chenxi: [the national Chenhe gaoqiang heritage entry](https://www.ihchina.cn/project_details/13153.html) and [Wubaotian's courtyard architecture](https://wwj.hunan.gov.cn/wwj/c100310/c100314/201503/t20150309_10483023.html). Wubaotian is explicitly identified as lying within Shangpuxi Yao Township; its heritage is not presented as proof of the study's local speech.

An independent second-agent review checked 15 reading records on seven rendered pages. Locality rows, table headings, source segments and category digits matched. It independently confirmed Shuangfeng 蝨 `sia2` as colloquial on p.106. This sample is recorded in the provenance and does not certify the entire paper or resolve Hengshan's classification.
