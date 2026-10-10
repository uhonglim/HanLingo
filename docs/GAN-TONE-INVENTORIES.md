# Named-town tone inventories in southeastern Hubei Gan

The first collection publishes 36 named-town inventories, containing 196 citation-tone categories, in eight geographic county-area collections under Da–Tong Gan. These are tone-system references, not vocabulary cards, native recordings, complete courses or county-wide accent standards.

## Primary source

张勇生、王洁 (Zhang Yongsheng and Wang Jie), 2022, **鄂东南赣语的声调类型及其演变**, printed pp.94–108 in the Society for Geolinguistics volume. [DOI and CC BY 4.0 deposit](https://doi.org/10.5281/zenodo.6342364); [publisher PDF](https://geolinguistics.sakura.ne.jp/Monograph/SiG-mono2-2-xia-ebook.pdf).

The paper identifies the southeastern Hubei Gan area and its historical Da–Tong classification on p.94. Table1 names 93 towns and their numbers of citation-tone categories. Tables3–10 supply 39 explicit complete tone inventories. The difference matters: 93 named survey points do not provide 93 full inventories. Sampling dates, speaker demographics and recordings are unspecified. Publication in2022 is not a collection date.

All included tables were checked against rendered PDF pages102–106 (printed pp.96–100). The full article, PDF pages100–114, was visually inspected for context. Chao-style digits represent supplied pitch contours. Historical categories are not themselves phonetic syllables; no onset, vowel, word, sandhi or HanLingo spelling has been generated from a category row. In Tongcheng, the authors’ labels 全入 and 次入 reflect present onset-conditioned checked-tone divisions; they have not been renamed yin/yang checked tones.

## Holds

Three complete source rows remain in the provenance ledger but are not emitted into published data:

- **Longgang**: Table7 prints 人声34 where the surrounding prose concerns checked 入声. The raw label is retained; the whole inventory is held pending an explicit editorial resolution.
- **Jinshandian**: competing Wikidata coordinates are over4km apart. No arbitrary coordinate is selected for the published atlas.
- **Weiyuankou**: Wikidata’s 湋源口 point sits near Yangxin county centre; a [municipal geographic record](https://sthjj.huangshi.gov.cn/zwgk/fdzdgk/wsgs/202509/t20250923_1263809.html) places named 韦源口 sites roughly30km farther north. Neither a county-centre nor a road-site coordinate is substituted for the town reference.

Table16 contains actual lexical comparisons but repeats the locality label 馬港 with differing forms. Those word readings are outside this import. 大畈, 慈口 and 九岭 have tone counts in Table1 but no full inventories in Tables3–10; neighbouring inventories have not been copied to them.

A second transcription review corrected our initial low-resolution misreading of 阴 as 阳: Liurenba is 阴去35; Damu is 阴去213 and 阳去45. Independent PDF text and enlarged table crops agree. Both rows are restored; this was a transcription error in our review, not a contradiction in the published source.

## Geographic identity

The source area contains Daye and Yangxin under Huangshi, and Xian’an, Tongshan, Jiayu, Chibi, Chongyang and Tongcheng under Xianning. The article retains 蒲圻 for present Chibi, which it notes was renamed in1998. Each new cluster is explicitly a geographic collection, not a proposed linguistic subdivision. Named town references remain separate from existing county distribution entries.

Map coordinates are separate Wikidata P625 statements, matched by the exact town label and P131 county identity. When an item has several nearby coordinates, the recorded value with the most decimal places is retained only if all candidates lie within2km; all alternatives and their maximum separation remain in the ledger. This is a deterministic selection among existing geographic statements, not a claim that decimal precision establishes survey accuracy. Markers are approximate town anchors, never speaker addresses. The sources establish geographic names, but do not supply local place-name IPA; no HanLingo secondary name or claimed endonym has been invented.

## Reproduction and evidence

`docs/gan-tone-provenance.json` preserves all39 image-checked rows, source page/table locators, original category labels, the three holds, geographic entity IDs, alternative coordinates, source SHA-256 and the separate ready-ID list. It is a curated manual transcription ledger, not an OCR output.

Run `python3 scripts/import-gan-tones.py` to rebuild only the two owned modules:

- `src/data/learning/gan-tone-inventories.ts`
- `src/data/atlas/gan-tone-localities.ts`

Local audit material lives under `.evidence/whole-atlas-next/`: `gan-tone-pages/page-100.png` through `page-114.png`, `gan-datong-town-counts.json`, `gan-datong-tone-inventories.json`, its CSV counterpart, `gan-tone-zenodo-record.json`, and the source Wikidata query/result (`get-town-coordinates.py`, `gan-town-wikidata.json`). The original volume is `.evidence/gan-xiang/research/gan-xia-tones.pdf`. Bibliographic licensing was checked through Zenodo’s record metadata (`cc-by-4.0`); geographic facts use Wikidata’s CC0 terms.

## Final row and overlap audit

`docs/gan-tone-source-rows.json` records an independent extraction of the printed PDF row text. All39 raw category/contour sets agree with the corrected ledger; regression tests compare all36 published inventories with that separate oracle and keep all three holds excluded. The full author names are 张勇生 and 王洁, as printed at the article opening.

The nearby-reference audit finds only three existing entries within3km: Juanshui / Tongcheng county at1.11km, Tongyang / Tongshan county at0.22km, and Xingguo / Yangxin county at0.51km. Each existing entry is explicitly a county-distribution reference. None is the new named-town survey, and the county entry does not inherit its tones. No other existing atlas point lies within3km of the new references in this batch. The research audit is `.evidence/whole-atlas-next/gan-town-overlap-audit.json`.
