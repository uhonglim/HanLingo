# Qiyang study reference

Eight lexical examples and two grammatical character readings come from Zhu Xiaonong and Zhang Caicai (2008), *A Seven-tone Dialect in Southern China with Falling-Rising-Falling Contour: A Linguistic Acoustic Analysis*, Interspeech, pp. 1113–1115, DOI [10.21437/Interspeech.2008-341](https://doi.org/10.21437/Interspeech.2008-341). The [official ISCA PDF](https://www.isca-archive.org/interspeech_2008/zhu08b_interspeech.pdf) supplies all selected Han, IPA and English glosses in Table 1, printed p. 1113. Two agents independently checked the rendered cells; the broken PDF text layer was not used as the IPA transcription.

## Scope and placement

The paper names Qiyang County in southern Hunan and calls the variety Old Xiang. It recorded twelve middle-aged native speakers, six male and six female; three female speakers were excluded from acoustic analysis, leaving nine. Exact towns, ages and recording dates are not supplied. **2008 is the publication year, not a fieldwork date.**

Wang Zhongli’s 2020 book has a [publisher abstract](https://www.ruralchina.cn/xcyj/XCBookDetail?ID=7301666&SiteID=18&SubLibID=) explicitly assigning Qiyang to Xiang → Yong–Quan → Dong–Qi. This supports the catalogue path, not an identification of Wang’s speakers with the 2008 speakers. The existing Dong–Qi cluster is reused. No prior Qiyang locality existed when this source reference was added.

The map uses Wikidata [Q1199641](https://www.wikidata.org/wiki/Q1199641), P625 [longitude 111.84812, latitude 26.58949], as a regional geographic anchor only. Cached evidence is `.evidence/atlas-1000/wikidata-counties.json`, with label 祁阳市 and code `43 11 81`. Wikidata structured data is CC0. The older source county and current city are not treated as identical survey boundaries. No local pronunciation of the place name is inferred.

## Transcription and holds

`docs/qiyang-xiang-provenance.json` preserves literal table transcriptions and their published meanings. Runtime IPA changes only baseline contour digits to superscript glyphs and encloses the form in brackets. The source’s T1–T7 labels are categories; numbers attached to IPA are supplied pitch trajectories. Both four-target contours, **3243 and 2143**, remain complete. The later six-tone Hu 2011 study and four-level model in Zhu et al. 2012 are not merged into this pack.

The printed table places diaeresis **above p** and **below a, t and i**. These positions remain literal (`p̈a̤`, `t̤i̤`). Sections 4.1.1 and 4.1.3 describe the relevant onsets as slack voiced. No `p`→`b`, `p̈`→`p̤`, phonation removal, or general above/below equivalence is introduced. HanLingo’s shared converter retains the marks, with their source-specific interpretation stated beside the material. Unicode’s general diaeresis semantics must not override this explicit source note.

Four cells remain held: 芭 has the broad gloss “plant”; 把 is glossed “hold” in the table but “a handle” in introductory prose; 八 is printed with 44 in the table and 33 in the introduction; 敌 is conservatively held with the same unresolved T6 contour discrepancy. No selected table meaning is silently corrected. 第 and 粒 retain only the source’s grammatical descriptions and are `character-reading`, excluded from lexical meaning practice.

Figure 4’s 太平 and 相信 are **not included**: they are speaker-specific connected-speech examples and the caption does not supply English lexical glosses. The pack adds no audio or synthesized local reading.

## Rights and culture

The paper says Copyright © 2008 ISCA; no Creative Commons licence was found. This is a bounded selection of ten factual language examples, with attribution. No paper scans, prose, audio or complete elicitation corpus are redistributed. The official paper remains the reading resource.

The two cultural topics have independent primary sources: [the national heritage record for Qiju](https://www.ihchina.cn/project_details/13539/) and [Hunan Provincial Archives on Wuxi inscriptions](https://sdaj.hunan.gov.cn/wszt/xxsl/msgj/200609/t20060927_1977756.html). Qiju’s named stage register is not equated with the study’s vernacular sample. Wuxi’s cliffs are cultural context, not a consultant location. These brief original summaries do not reuse source photographs.

## Reproducibility

The ledger records the source PDF SHA-256 and all selected/held table cells. Ignored evidence includes `.evidence/undercovered-next/qiyang-zhu2008.pdf`, the rendered `qiyang-table-left.png`, and `qiyang-zhu2008-page1.png`. The runtime module derives the ten records directly from the ledger; no random or cap-based selection occurs. `src/data/learning/qiyang-xiang.test.ts` locks every visible table cell, all four holds, category-versus-pitch handling, four-target contours, phonation preservation, and geographic qualifications. No unrelated source packs are changed.
