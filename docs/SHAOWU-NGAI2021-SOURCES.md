# Urban Shaowu: twenty lexical readings

This starter adds twenty attested words, three sound notes and two urban culture topics to Shao–Jiang Min. It is a bounded factual selection, not a full lexicon, complete course, current speech survey or audio collection. Every row is recorded in `shaowu-ngai2021-provenance.json` with its printed-page locator.

## Primary language source

Sing Sing Ngai, *A Grammar of Shaowu: A Sinitic Language of Northwestern Fujian* (2021), [DOI 10.1515/9781501512483](https://doi.org/10.1515/9781501512483). The [authorized retail preview](https://api.pageplace.de/preview/DT0400.9781501512483_A42566628/preview-9781501512483_A42566628.pdf) contains the relevant introduction, transcription conventions and fieldwork description. Copyright is retained. No open reuse licence is asserted; the website does not reproduce the book, full tables, passages, recordings or full lexicon. The selected pronunciation facts and concise glosses remain individually attributed.

Printed p.3 limits the language reference to urban Shaowu rather than all its townships. Pages 12 and 22 explicitly discuss Shaojiang in the Language Atlas classification. Pages 12–18 also record competing affiliations: the website’s Min → Shaojiang placement follows the Atlas convention rather than claiming an uncontested classification. The intermediate `shaowu-localities` collection is geographic, not a formal linguistic subdivision.

The route is `/min/shaojiang/shaowu-localities/shaowu`. GeoNames [1795857](https://www.geonames.org/1795857/shaowu.html) identifies the city seat at 27.34089 N, 117.48310 E. This locates the public urban reference, not any consultant’s home or a language boundary. It does not establish uniform speech across the county-level city. Local name pronunciation is handled separately by the shared name system. Printed LI gives 邵武 as `ɕiau213~21u55`; LII explains the free tonal variant. The secondary name displays the explicitly printed original contour, `shiau213 u55`, while retaining the source’s 21 variant in its reference note. This does not infer a new sandhi rule or nasal vowel.

## What the pronunciation represents

The source identifies IPA on printed LI. LII explains superscript pitch values, free variants and tone changes. Page 3 supplies the six contours 21, 22, 55, 213, 35 and 53. The implementation preserves the selected segments and contours, converts the printed raised aspiration h to Unicode ʰ, puts contour digits on the baseline and inserts a space between compound syllables. It does not reinterpret digits as categories, infer tones or apply productive sandhi.

The twenty rows come from pp.4, 5 and 9–11. They are lexical examples with supplied meanings, rather than bare character readings. 牛公 retains the source’s final 22, even though standalone 公 is given with 21. 跤 retains Ngai’s page 4 contour 21, not the earlier study’s 31 cited on page 12. Multifunctional 得 remains visible but is excluded from meaning questions and distractors. 帮, 拿, 了 and 度 teach their documented lexical senses with visible notes about grammatical uses.

Page 19 documents seven visits between December 2009 and August 2019 and four principal consultants. Ages as of 2020: Li Jingxin, female, 91; Li Hougong, male, 82; Gao Ying, female, 68. The late Wei Yixin was in her early seventies in December 2009. The selected entries do not identify their individual speaker or recording date. The publication’s existence of field recordings does not supply licensed playable assets.

## Urban culture

- Xu Yitao’s architectural field study, *Palace Museum Journal* 2025 no.9, Table 1 on p.138, identifies Baoyan Hall in Zhaoyang and dates it to 1533. Its five-by-five-bay arrangement and double-eaved hip-and-gable roof were checked against the PDF image. Only these factual details are paraphrased; no study photographs or diagrams are republished. [Primary study](https://img.dpm.org.cn/Uploads/file/2025/12/22/1766400334hKYveGNhs218985.pdf).
- The Shaowu museum catalogue profile identifies the folk museum at 3 Daojia Lane off Wusi Road and records establishment in 1987 and public opening in February 1988. These historical facts are supported by the indexed primary museum profile; direct reader access failed. No present-day opening hours or intact-building claim is made. [Museum profile](https://www.museumschina.cn/museums/details?id=35068121800002).

The former `fjswbwg.com` museum domain now returned unrelated game content and is excluded from product sources. No culture subject is represented as a consultant’s recording location. No photographs are added by this starter.

## Review and validation

The root agent independently reviewed all twenty lexical forms and the transcription, scope and fieldwork pages. Its report is retained in ignored `.evidence/zero-branch-next/root-independent-review.json`; the candidate source images and authorized preview hash are also retained there. Module tests protect the exact word sequence, source tones, HanLingo spelling, multifunctional-meaning exclusion, urban scope and geographic hierarchy. Central integration, browser acceptance and deployment are separate steps.
