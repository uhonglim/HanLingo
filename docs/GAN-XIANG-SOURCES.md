# Gan and Xiang: first sourced release

This release adds **115 locality references across 14 branches**, with **500 attested lexical forms** for the two developed urban collections. It is not 115 complete courses. The remaining 113 entries are explicitly county distribution references; vocabulary and pronunciation must be collected for their own localities.

| Group | Branches | Locality references | Developed lexical collection |
| --- | ---: | ---: | --- |
| Gan | 9 | 71 | Nanchang:250 forms |
| Xiang | 5 | 44 | Changsha:250 forms |

Canonical learning IDs are `nanchang-gan` and `changsha-xiang`. Names remain familiar geographic labels. No unverified local place-name IPA, native spelling, recording, or synthesized word audio is introduced.

## Lexical evidence

The readings use the licensed CLDF edition of **Beijing University, 汉语方言词汇 [Chinese Dialect Vocabularies],1964**. The survey dates to the 1950s. The editors digitized it in 2012 and 2016 and describe their IPA as slightly adjusted. Every reading carries **“1950s survey · published 1964”** beside the pronunciation; these are documented historical urban references, not newly collected present-day speech.

- Dataset: [lexibank/beidasinitic](https://github.com/lexibank/beidasinitic).
- Release: [v 5.1, DOI 10.5281/zenodo.13149151](https://doi.org/10.5281/zenodo.13149151).
- Commit: `6bb8f57330f3b28c126a633f2c2adc6d01d0f555`.
- Licence: **CC BY 4.0**. Credit the original 1964 work and this version of the derived dataset.
- Source locality IDs: exact `Nanchang` and `Changsha`; no phonetic data are assigned to their surrounding counties.
- `docs/gan-xiang-reading-provenance.json` records source IDs, source line numbers, raw `Value`, raw local character form `Benzi`, concept IDs, file hashes, filtering reasons and provenance.

The importer uses `Value`, not the normalized CLDF `Segments` field. It preserves each source IPA symbol and the supplied superscript pitch digits. It inserts spaces only at supplied syllable-tone boundaries, wraps the result in brackets, and removes the source’s spaces between characters for display. The English meaning comes from the corresponding source concept; the characters come from the locality’s `Benzi`, never from the questionnaire’s generic Chinese gloss.

Selection prioritizes everyday concepts and then follows the source questionnaire order. A single form per concept is included. Forms containing the missing-character marker 囗, forms requiring a character reconstruction, edited or annotated forms, ambiguous punctuation, omitted/neutral tones and unsupported IPA remain excluded. No pitch, glide, aspiration, vowel quality, sandhi or local synonym is inferred. The source uses pitch contours here, not tone-category numbers.

The source forms 牲囗 (both cities), 竈囗 and 囗條 are held because 囗 is unresolved. It is not silently changed to 口. The importer selects the next eligible source forms to retain 250 readings per city.

Two useful source checks:

| Form | Nanchang | Changsha |
| --- | --- | --- |
| 茶 tea | [tsʰa²⁴] | [tsa¹³] |
| 米 rice | [mi²¹³] | [mi⁴¹] |
| 吃 eat / drink | [tɕʰiak⁵] | [tɕʰia²⁴] |

The source gives the same local form for the separate eat and drink concepts. Both senses are retained. Practice must not present those identical forms as mutually exclusive answers; source attestation is not permission to construct an ambiguous quiz.

### Unavailable supplementary source

Academia Sinica’s [independently downloadable phonological fact files](https://xiaoxue.iis.sinica.edu.tw/ccrdata/) advertise Gan and Xiang XLSX archives under PDM 1.0. During this expansion, both download requests returnedHTTP 401 with an explicit IP-block page. No bypass was attempted and no new Sinica Gan/Xiang records are claimed in this release. The existing cached Min archive is a different collection. The cached CCR locality catalogue is not used as a substitute for unseen Gan/Xiang pronunciation cells.

## Classification and county references

The classification source is [Jing Liwen 2025, county-level dataset of the second-edition Language Atlas of China](https://doi.org/10.5281/zenodo.15897647), **CC BY 4.0**. Its exact source table rows are retained in `docs/gan-xiang-atlas-provenance.json`. Each selected county’s group and branch are crosschecked against the cached Qin county table; the finer subdivision remains specifically Jing’s attestation, since Qin does not independently encode it.

Gan branches: Chang–Du, Yi–Liu, Ji–Cha, Fu–Guang, Ying–Yi, Da–Tong, Huai–Yue, Lei–Zi and Dong–Sui. These source labels are retained rather than silently replacing Chang–Du with older Chang–Jing classifications.

Xiang branches: Chang–Yi, Lou–Shao, Hengzhou, Yong–Quan and Chen–Xu. Exact source subclusters become formal cluster nodes. Where the source supplies no finer classification, the third-level node is explicitly a geographic collection of locality references. The dataset also contains anomalous Xiang rows labelled with Southwestern Mandarin branch names; those are not imported as Xiang branches.

Selection rejects:

- codes ending in 00 that represent prefecture-level units rather than county references;
- disagreement between the two classification tables;
- multiple full classification tuples for the same county, apart from the three reviewed mixed cases below;
- absent coordinates or multiple distinct Wikidata item/coordinate matches;
- unresolved branch names.

**Reviewed mixed-county exceptions:** Dongkou County 430525, Chenxi County 431223 and Xupu County 431224. Jing explicitly includes the selected Gan or Xiang branch, and Qin agrees with that branch. Their scope text states that other divisions also occur in the county. No whole-county language uniformity is claimed. Other multiple-tuple cases remain excluded.

The tabulation’s `省编码` field is not a reliable province identifier; selection uses the actual six-digit `县编码`. Province and prefecture text are retained as geographic context. Neither classification table is treated as a speaker survey.

## Geography

County coordinates and English common names use the cached Wikidata P442 administrative-code / P625 coordinate results (**CC 0**). Each point preserves its exact itemURL, administrative code and coordinate statement. The point is an administrative anchor, not a recording address, dialect boundary, or claim about all residents.

The two core city markers were separately checked against Wikidata [Nanchang Q171943](https://www.wikidata.org/wiki/Q171943) and [Changsha Q174091](https://www.wikidata.org/wiki/Q174091). The CLDF language coordinates are not substituted for speaker locations. The Changsha CLDF georeference is farther north than the city reference; it is not used for the map.

## Cultural context

Four short, separately sourced cultural topics accompany the core collections:

- Nanchang: [Tengwang Pavilion](https://www.nc.gov.cn/english/Tourism/201810/ada27ead9e414158937858eacd267691.shtml) and [Haihun archaeological site](https://www.nc.gov.cn/english/News/202304/767b58db1c844937888e14c02fbe40b0.shtml), described by Nanchang Municipal Government.
- Changsha: [Mawangdui collections](https://web.hnmuseum.com/en/content/changsha-mawangdui-han-dynasty-tombs-exhibition), Hunan Museum, and [Yuelu Academy](https://www.enghunan.gov.cn/hneng/Tourism/TourHunan/Changsha_55545/TouristAttractions/202606/t20260611_33999260.html), Hunan Government.

These are place-based cultural context. Ancient artefacts do not establish the pronunciation of a modern Gan or Xiang word. Photographic gallery acquisition is separate from this data pack.

## Reproduction and validation

- `node scripts/import-gan-xiang.mjs` rebuilds the 500 selected lexical records from the commit-pinned Beida source files.
- `python 3 scripts/import-gan-xiang-atlas.py --verify-sources` rebuilds the 115 locality records from the reviewed ledger and checks all 113 county selections against the checksum-pinned CSV and Wikidata snapshots.
- `npx vitest run src/data/learning/gan-xiang.test.ts` verifies exact character/IPA reconstruction, source labels and rows, shared conversion, locality counts, routes, classification levels and core cultural resources.

This release establishes substantial starting collections for Nanchang and Changsha. Other Gan/Xiang branches still need their own lexical lessons, local speech recordings and documented galleries; the wider atlas count must remain separate from that learning-depth count.
