# Names and equivalent levels

Use names attested by the community being described, while preserving precise geography and comparable tree levels. A familiar conventional name is acceptable when its status is explicit; an invented endonym is not.

- Keep group, branch, cluster, locality, and individual pronunciation evidence distinct.
- Locality leaves are peer places, including towns and urban districts rather than only legally designated cities. Taipak belongs alongside Amoy; “Taigi” is a regional language name and must not replace that locality node.
- Min, Southern Min, Hoklo, and Hokkien are not automatically interchangeable. State the scope used by the source. Do not assert mutual intelligibility without evidence.
- The 泉漳 cluster is displayed as **Tsuân-Tsiang**. **Quanzhang**, **Tsuan-Tsiang**, and the former **Tsuan-Chiang** remain search aliases; the existing `tsuan-chiang` URL identifier remains stable. The [Taigi essay in BONG 348](https://tsbp.tgb.org.tw/2015/04/blog-post_11.html) attests **Tsuân-tsiang**. The [MOE 州 entry](https://sutian.moe.edu.tw/zh-hant/su/2284/) separately supplies **Tsuân-tsiu** and **Tsiang-tsiu** as city-name examples; it does **not** attest the combined cluster name. Naming evidence and linguistic classification are separate. None of these spellings is generated HanLingo.
- Use a single display name, without parenthetical alternatives. Retain alternate spellings and wider regional names as search aliases and in explanatory source notes.
- Prefer documented local-language names. Keep geographic precision ahead of an attractive but unsupported translation; never coin a local name and present it as community usage.
- Existing route IDs can remain stable while display names change. New places use their own locality IDs.

Sources: [Taiwan Ministry of Education dictionary](https://sutian.moe.edu.tw/zh-hant/su/2284/), [Taiwan language names](https://english.moe.gov.tw/fp-117-40171-b21aa-1.html), [Singapore Hokkien](https://culturepaedia.singaporeccc.org.sg/language-education/the-hokkien-dialect-in-singapore/). Each locality article supplies its own geographic and linguistic sources.

Local naming references: **Sin-ka-pho** is listed for 新加坡 in [Taipei’s school vocabulary list](https://www.saihs.edu.tw/uploads/1678269782302fhjagTST.pdf). **Pho Te** is the display form of the community source’s **Pho3 Te4** for George Town in [Timothy Tye’s Penang place-name list](https://www.penang-traveltips.com/hokkien/place-names.htm). Those source tone-category digits are omitted from the navigation label; they are not converted into HanLingo pitch contours. The city scope is George Town, not the whole state of Penang.

**Teo Swa** is the community-owned cluster name used beside Tsuân-Tsiang. The [Teo Swa General Association](https://www.csga.co.nz/about-us/) uses it in its bilingual name. Teochew and Swatow are locality peers within that branch; they must not be placed in Tsuân-Tsiang. [You Rujie’s study](https://xbzs.ecnu.edu.cn/CN/html/201601010.htm) provides the Southern Min classification and a Swatow reference.

## Locality-name audit · 2026-10-09

`src/data/language-names.ts` is the shared display-name authority. `placeLabel` resolves a locality ID; `placeNameReference` supplies a short explanation and naming source for existing reference notes. The atlas and legacy learning-point exports apply the same resolver. Names do not change route IDs, classifications, IPA, photograph sources, or paper titles.

| Display label | Geographic identity | Naming evidence |
| --- | --- | --- |
| Canton | Guangzhou city reference | [Guangzhou municipal guide, Basic Facts](https://www.gz.gov.cn/attachment/7/7792/7792046/10199330.pdf) identifies the historical English name. This is an explicitly conventional label, not a claimed Cantonese transcription. |
| Chin Kang · Ann Kway · Lam Ann · Hui Ann | Jinjiang · Anxi · Nan’an · Hui’an | Bilingual community association names in the [SFCCA/NUS directory](https://nus.edu.sg/nuslibraries/dsprojects/sfcca/clans/name/). [NHB’s Chin Kang account](https://www.roots.gov.sg/MUSE/articles/The-Chin-Kang-Gallery-Portal-to-an-Old-World) directly identifies Jinjiang with Chin Kang; [Lam Ann’s own history](https://lamann.org/centennial-celebration/lam-ann-association-cn/) identifies the Nan’an community. |
| Tung Ann · Foochow · Futsing · Lung Yen | Tong’an · Fuzhou · Fuqing · Longyan urban Min | The same bilingual directory records these locality-based associations. These are documented community spellings, not assertions of one universal local orthography. |
| Dionglok | Changle reference under Eastern Min | [Foochow Dionglok Association, Our Story](https://fzcl.sg/) explicitly identifies the locality and local name. It remains separate from urban Foochow. |
| Theng Hai · Kityang | Chenghai · Jieyang | The bilingual directory records Theng Hai Huay Kuan and Kityang Kwee Lim Low Clan Association. |
| Ningpo · Toishan · Char Yong | Ningbo · Taishan · Chayang town | Community names in the bilingual directory. Char Yong names the Chayang locality; it does not replace the separate Dabu county-town reference. |

Existing Amoy, Tsuân-tsiu, Tsiang-tsiu, Taiwan locality labels, Sin-ka-pho, and Pho Te remain. Their cited dictionary and community conventions are retained, including the distinction between source tone marks and HanLingo pitch numbers. Other atlas points keep their documented geographic labels pending specific local-name evidence. This audit does not claim to have verified an endonym for every point.

The community directory is naming evidence only. Its social categories such as “Hokkien” are not imported as linguistic classification: the directory includes Foochow associations under that broad category, while this atlas correctly keeps Foochow in Eastern Min.

`languageNameGlossary` keeps five scopes separate: **Min** is the wider group; **Southern Min** is a branch; **Tsuân-Tsiang** is a cluster in the selected classification; **Hokkien** is a contextual community language name; **Hoklo** is a contextual community/identity label. The latter two remain searchable without becoming additional tree levels. Canton names a locality, Cantonese describes specified speech, and Yue names the wider group.

## Source correction

An earlier version incorrectly described MOE `/su/2284/` as a direct source for “Tsuân-Tsiang.” Its actual entry is 州 and the examples are the two separate city names. The corrected combined-name citation is the Taigi community essay; classification still follows the academic/gazetteer sources, not the essay’s personal claims about intelligibility.

## Shared interface terms

Use `src/data/site-terms.ts` for repeated destination and learning labels. One destination has one name throughout the tree, breadcrumbs, headings, and links.

- **Words**, **Photos**, **Sounds**, and **Practice** are the Amoy learning sections. IPA and tone contours are content within Sounds, not separate names for that destination.
- **HanLingo spelling** labels generated spellings; **IPA** labels pronunciation. Explain trial rules where needed without renaming the output.
- **Citation reading** and **Connected speech** distinguish pronunciation evidence. Do not imply automatic tone-sandhi generation.
- **Standard Written Chinese** is the shared written register destination. Formal describes the sample's style, not another language or a sixth spoken group.
- **Group → branch → cluster → locality** describes the tree levels. Use **Localities** for geographic reference entries, not dialect boundaries.
- Keep source titles, quotations, attested spellings, and stable URL identifiers unchanged. Alternate names belong in search and source notes.
- Delete repeated introductions and controls that duplicate an existing destination; retain source qualifications and photo credits.
