# Min and Yue locality atlas

Audited 2026-10-09. `src/data/atlas/min-yue.ts` contains **100 locality references: 59 Min and 41 Yue**, organized through 26 clusters or geographic collections. All 31 previously published Min/Yue locality IDs and visible names are retained. These are documented reference points, not 100 complete learning courses.

## Classification contract

The four navigation levels are group → branch → cluster/collection → locality. A fixed display depth is not evidence that every third-level node has the same historical or linguistic rank. Each node explicitly records `kind: classification` or `kind: geographic`.

- Southern Min retains Tsuan-Chiang and Teo Swa, with the gazetteer’s western Longyan–Zhangping division beside them. The source’s more detailed coastal divisions remain in the locality locators; they are not presented as additional navigation levels.
- Eastern Min uses Houguan and Funing. Northern Min uses the gazetteer’s eastern and western divisions. Puxian and Central Min each retain the source’s north/south distinctions.
- Hainan’s current Wenchang collection is geographic. Leizhou is a separate regional branch in this atlas; sources also classify it within Southern Min or combine it with Hainan. The Leizhou Peninsula collection is geographic.
- Yue follows the **Language Atlas of China column** in Hui & Simmons’ comparison. Yuehai and Guangfu are alternative names, not successive levels. Guan–Bao and Xiangshan are separate branches in Zhan’s alternative classification, but not in the selected atlas column. They therefore appear here only as explicitly geographic collections beneath Guangfu. No hybrid family tree is asserted.
- The geographic Yue collections are editorial browsing aids. Their sources establish locality membership in the branch; they do not establish an extra named linguistic subbranch.

## Primary records checked

| Source | Exact evidence used |
| --- | --- |
| [Fujian Provincial Gazetteer, Dialects, overview II](https://data.fjdsfzw.org.cn/upload/Annals/2011/方言志/epub/ops/8.htm) | The final distribution table supplies named Southern, Northern, Central and Puxian Min localities and their subdivisions. The surrounding discussion distinguishes county distribution from language enclaves. |
| [Fujian Gazetteer, chapter 1 §1](https://data.fjdsfzw.org.cn/upload/Annals/2011/方言志/epub/ops/11.htm) | Lists 11 southern and 7 northern Eastern Min city/county references, specifies urban Fuzhou, and discusses minority and neighboring-language enclaves. Ningde follows this source’s northern placement; alternatives are acknowledged. |
| [Fujian Gazetteer, chapter 5 §1](https://data.fjdsfzw.org.cn/upload/Annals/2011/方言志/epub/ops/111.htm) | Central Min distribution in Yong’an, Sanming and Shaxian. The overview table names Liedong and Liexi separately. |
| [Tang 2009, *Mutual intelligibility of Chinese dialects*](https://www.lotpublications.nl/Documents/228_fulltext.pdf) | Chapter 2 §2.3.1, printed p. 28, summarizes Quanzhang/Chao-Shan and Houguan/Funing clusters. Footnote 26 records alternative treatment of Leizhou and Qiongwen. Used for names and grouping, not a claim that all members are mutually intelligible. |
| [Guangdong provincial government, Languages](https://www.gdhmo.gov.cn/gaikuang/content/post_68514.html) | The Min paragraph names Chaoshan and Leizhou localities. The Yue paragraph explicitly identifies Yuehai with Guangfu. Its alternative broad Yue divisions are not silently substituted for the selected Language Atlas scheme. |
| [Hui & Simmons 2023, Table 1, pp. 2–3](https://mdpi-res.com/d_attachment/languages/languages-08-00146/article_deploy/languages-08-00146.pdf#page=2) | Named Yue references and side-by-side classifications. The merged table cells were checked visually on both original PDF pages. The authors are **Man-Shan Hui and Richard VanNess Simmons**. |
| [Sung 2026, *Advancing Explanatory and Tonal Dialectometry*](https://www.lotpublications.nl/Documents/709_fulltext.pdf) | Chapter 2, printed pp. 14–15, summarizes Yang et al. and Xiong locality membership, including Qinzhou/Beihai and Wuchuan/Huazhou. Later chapters distinguish urban Hong Kong from Kam Tin. |
| [MOE Taigi dictionary, 柑仔蜜](https://sutian.moe.edu.tw/zh-hant/su/5090/) | Retains the six existing locality references and source-spelling conventions for Taiwan. No new IPA is inferred from these labels. |
| [Luo Futeng, Singapore Chinese Cultural Centre](https://culturepaedia.singaporeccc.org.sg/language-education/the-hokkien-dialect-in-singapore/) | Singapore Hokkien’s documented connections to Quanzhou, Zhangzhou, Amoy and Tong’an; contact and variation remain part of the locality scope. |
| [Ông Kuì-lân 2022, Penang Hokkien fieldwork](https://taiwan.ntue.edu.tw/var/file/29/1029/img/692/476201647.pdf) | Regional fieldwork and comparison with five southern Fujian references. George Town remains the map anchor, not an assertion that the fieldwork represents every resident. |
| [Peng 2026, Wenchang Min Chinese](https://doi.org/10.1017/S002510032610111X) | Wenchang location and the two-speaker scope, pp. 1–2. |
| [ASJP, Min Leizhou](https://asjp.clld.org/languages/MIN_LEIZHOU) | Dictionary-based locality metadata, including coordinates, citing Zhang & Cai’s 1998 Leizhou dictionary. No ASJP transcription is relabeled as IPA. |
| [Li & Thompson 1983, Xuwen](https://doi.org/10.1163/19606028-90000262) | Academic locality description and Min–Yue contact context. No uninspected phonetic table is imported. |
| [Yue-Hashimoto 1985, Suixi](https://ci.nii.ac.jp/ncid/BA13746123) | Library record of the CUHK locality monograph *The Suixi dialect of Leizhou*. The title establishes the reference; this catalog check is not a claim that the full monograph was inspected. |

## Scope and map positions

New map positions are rounded reference anchors at urban centers, county seats or the named neighborhood. They are orientation aids, not speaker addresses, recordings’ GPS locations, dialect boundaries or survey polygons. Existing map coordinates remain unchanged; Leizhou uses the explicit ASJP metadata coordinate. Administrative changes and important language mixtures are recorded in each locality’s `scope`.

Examples needing particular care:

- Longyan means the Xinluo Min reference, not the multilingual prefecture.
- Fuding and Xiapu mean urban Eastern Min references; their Southern Min villages are not silently included.
- Jianyang is in Fujian; Chaoyang is in Guangdong; Lianjiang is 福建連江 rather than 廣東廉江; Pingnan is 福建屏南 rather than 廣西平南.
- Lianzhou in Qin–Lian is 廉州 in Hepu, not 廣東連州.
- Wuzhou is the urban Guangfu reference; nearby rural Goulou speech is separate.
- Yongning is the Yue reference, not the separately studied Pinghua variety.
- Zhongshan means the Shiqi Yue reference; its Min communities are outside this entry’s scope.
- Doumen has its own Siyi entry; it does not make all Zhuhai Siyi.

No unverified local endonyms were invented. Existing documented community names are preserved; additional local spellings should replace geographic labels only after evidence is collected.

## Checks

The module imports successfully. A data audit checks all 31 existing Min/Yue IDs and names, 100 unique locality IDs, 26 valid parent clusters, branch/group agreement, and a URL plus specific locator on every record. The new catalog adds no fabricated vocabulary, photos, IPA, recordings or learning sections.
