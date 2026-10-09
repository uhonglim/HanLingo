# Mandarin atlas expansion — 2026-10-09

This expansion adds four branches and nine city references. Existing Beijing, Jinan, Nanjing and Chengdu entries remain separate. Place names are conventional Mandarin geographical names, not claimed transcriptions of the local accent.

| Branch | New locality | Linguistic evidence |
|---|---|---|
| Northeastern | Harbin | Xinliang Jiang, 2019 Newcastle thesis, chapter 2: Harbin inventory, syllables and local tones |
| Northeastern | Shenyang | Song Tan, 2017, *La Linguistique* 53(2), pp. 237–256: Liaoning fieldwork and generation-sensitive consonant comparison |
| Jiao–Liao | Dalian | Liu et al., 2022, *Frontiers in Psychology*: falling-tone contrast, frequency, homophone density and speaker generations |
| Jiao–Liao | Qingdao | JLMS25, 2025, *Applied Sciences*: Qingdao explicitly included among distinct Jiao–Liao city samples |
| Central Plains | Zhengzhou | IALP 2023, *The Sound Change of 足 in Zhengzhou Dialect*, especially p. 127: Zheng–Kai classification and city scope |
| Central Plains | Xi’an | Hang Qiao, 2023, *The Meaning and Usage of Marker Kai in Xi’an Dialect*: Guanzhong classification, grammatical 开, explicit exclusion of urban Hui speech |
| Lan–Yin | Lanzhou | Li Yi and San Duanmu, 2014, *Phonemes, Features, and Syllables*: explicit Lan–Yin classification and segment examples |
| Jianghuai | Yangzhou | Tang Zhiqiang and Li Shanpeng, 2018, *方言* 4: 411–420: duration and glottal-stop contributions to checked-tone perception; author-uploaded paper |
| Southwestern | Chongqing | Hu et al., Interspeech 2024: city-raised speaker recruitment and metrical prominence |

Exact primary-source URLs are stored in `src/data/expansion/mandarin.ts`, beside the relevant notes and examples. The Newcastle item is the **2019 PhD thesis**, not the 2015 MA dissertation cited in its bibliography. Dalian is classified under Jiao–Liao, despite being geographically northeastern. City points are not municipality-wide accent claims.

## Reading scope

- Lanzhou: 16 segmental examples from Yi and Duanmu, example (4), printed pp. 6–7. The source omits tones; every entry explicitly says so, uses `toneNotation: "unspecified"`, and does not invent contour values. Aspiration and nasalization are preserved.
- Xi’an: the source prints the full reading of 开 as `[kʰɛ21]`. Its grammatical use can weaken; no numeric pitch is invented for the source’s weak-tone label.
- Other new city entries receive specific linguistic notes and research links, rather than transplanted Standard Mandarin or neighboring-city IPA. Their vocabulary depth remains an evidence gap.
- The Zhengzhou study documents several readings and several dated investigations. This expansion explains the variation without making one of those forms the default reading for all city speakers.
- Qingdao’s corpus link is labeled a study, not a dictionary or a ready-made learner recording collection.

## Cultural and photographic evidence

Each locality has nine distinct credited images plus two culture topics tied to exact image documentation. Commons search was used only for discovery; source-file metadata and contact sheets were inspected. Irrelevant search matches (including a Brighton synagogue returned for Shenyang, Yingxian pagodas returned for Xi’an, and Nanjing’s Xu Garden returned for Yangzhou) were rejected. A near-duplicate Xi’an shopfront was also rejected.

Photos are local WebP assets under `public/images/expansion-mandarin-*`. The data retains original source URL, author, license and license URL. Historical photographs are identified as archival in their captions; their inclusion does not convert the present-day language pages into historical reconstructions. Photos describe the pictured place or activity; they do not infer the language or identity of people pictured.

The collection includes market work and public music in Dalian, Qingdao’s waterfront and buildings, Harbin’s river and winter architecture, separate Yangzhou gardens, Lanzhou food and workplaces, Zhengzhou museum objects, and Chongqing street life. It deliberately avoids padding galleries with alternate crops of one landmark.

## Maintenance

The expansion module owns only data. Shared routes, navigation, galleries and learning packs consume its exported `mandarinExpansion`; no separate navigation or page template is introduced. Future vocabulary additions should be locality-specific and keep meaningful speaker/register/date qualifications visible.
