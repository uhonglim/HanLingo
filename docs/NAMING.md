# Names and equivalent levels

Use names attested by the community being described, while preserving precise geography and comparable tree levels. A familiar conventional name is acceptable when its status is explicit; an invented endonym is not.

- Keep group, branch, cluster, locality, and individual pronunciation evidence distinct.
- Locality leaves are peer places, including towns and urban districts rather than only legally designated cities. Taipei belongs alongside Amoy; “Taigi” is a regional language name and must not replace that locality node.
- Min, Southern Min, Hoklo, and Hokkien are not automatically interchangeable. State the scope used by the source. Do not assert mutual intelligibility without evidence.
- The 泉漳 cluster is displayed as **Tsuân-Tsiang**. **Quanzhang**, **Tsuan-Tsiang**, and the former **Tsuan-Chiang** remain search aliases; the existing `tsuan-chiang` URL identifier remains stable. The [Taigi essay in BONG 348](https://tsbp.tgb.org.tw/2015/04/blog-post_11.html) attests **Tsuân-tsiang**. The [MOE 州 entry](https://sutian.moe.edu.tw/zh-hant/su/2284/) separately supplies **Tsuân-tsiu** and **Tsiang-tsiu** as city-name examples; it does **not** attest the combined cluster name. Naming evidence and linguistic classification are separate. None of these spellings is generated HanLingo.
- Use a primary common/community name and a secondary local-language reading in HanLingo spelling, without parentheses. Both are searchable. This replaces the former single-name display rule. Chinese script remains visible as an identifier. Do not manufacture distinct names when the two are identical; do not fabricate an absent local reading.
- Prefer documented local-language names. Keep geographic precision ahead of an attractive but unsupported translation; never coin a local name and present it as community usage.
- Existing route IDs can remain stable while display names change. New places use their own locality IDs.

Sources: [Taiwan Ministry of Education dictionary](https://sutian.moe.edu.tw/zh-hant/su/2284/), [Taiwan language names](https://english.moe.gov.tw/fp-117-40171-b21aa-1.html), [Singapore Hokkien](https://culturepaedia.singaporeccc.org.sg/language-education/the-hokkien-dialect-in-singapore/). Each locality article supplies its own geographic and linguistic sources.

Local naming references: **Sin-ka-pho** is listed for 新加坡 in [Taipei’s school vocabulary list](https://www.saihs.edu.tw/uploads/1678269782302fhjagTST.pdf). **Pho Te** is the former shortened display form of **Pho3 Te4** for George Town in [Timothy Tye’s Penang place-name list](https://www.penang-traveltips.com/hokkien/place-names.htm). Pho3 Te4 remains a source spelling and search alias; it is not used as the HanLingo secondary name. Its digits are source tone categories, not HanLingo pitch contours. The city scope is George Town, not the whole state of Penang.

**Teo Swa** is the community-owned cluster name used beside Tsuân-Tsiang. The [Teo Swa General Association](https://www.csga.co.nz/about-us/) uses it in its bilingual name. Teochew and Swatow are locality peers within that branch; they must not be placed in Tsuân-Tsiang. [You Rujie’s study](https://xbzs.ecnu.edu.cn/CN/html/201601010.htm) provides the Southern Min classification and a Swatow reference.

## Earlier common-name source audit · 2026-10-09

`src/data/language-names.ts` is the shared display-name authority. `placeLabel` resolves a locality ID; `placeNameReference` supplies a short explanation and naming source for existing reference notes. The atlas and legacy learning-point exports apply the same resolver. Names do not change route IDs, classifications, IPA, photograph sources, or paper titles.

| Display label | Geographic identity | Naming evidence |
| --- | --- | --- |
| Canton | Guangzhou city reference | [Guangzhou municipal guide, Basic Facts](https://www.gz.gov.cn/attachment/7/7792/7792046/10199330.pdf) identifies the historical English name. This is an explicitly conventional label, not a claimed Cantonese transcription. |
| Chin Kang · Ann Kway · Lam Ann · Hui Ann | Jinjiang · Anxi · Nan’an · Hui’an | Bilingual community association names in the [SFCCA/NUS directory](https://nus.edu.sg/nuslibraries/dsprojects/sfcca/clans/name/). [NHB’s Chin Kang account](https://www.roots.gov.sg/MUSE/articles/The-Chin-Kang-Gallery-Portal-to-an-Old-World) directly identifies Jinjiang with Chin Kang; [Lam Ann’s own history](https://lamann.org/centennial-celebration/lam-ann-association-cn/) identifies the Nan’an community. |
| Tung Ann · Foochow · Futsing · Lung Yen | Tong’an · Fuzhou · Fuqing · Longyan urban Min | The same bilingual directory records these locality-based associations. These are documented community spellings, not assertions of one universal local orthography. |
| Dionglok | Changle reference under Eastern Min | [Foochow Dionglok Association, Our Story](https://fzcl.sg/) explicitly identifies the locality and local name. It remains separate from urban Foochow. |
| Theng Hai · Kityang | Chenghai · Jieyang | The bilingual directory records Theng Hai Huay Kuan and Kityang Kwee Lim Low Clan Association. |
| Ningpo · Toishan · Char Yong | Ningbo · Taishan · Chayang town | Community names in the bilingual directory. Char Yong names the Chayang locality; it does not replace the separate Dabu county-town reference. |

These name sources remain in the registry, with earlier labels retained as readings or search aliases where the dual-name decision changes the primary label. The distinction between source tone marks and HanLingo pitch numbers remains. Other atlas points keep documented geographic labels pending specific local-name evidence; this audit does not claim an endonym for every point.

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
- Keep source titles, quotations, attested spellings, and stable URL identifiers unchanged. The chosen common/local pair appears on locality surfaces; additional aliases remain in search and source notes.
- Delete repeated introductions and controls that duplicate an existing destination; retain source qualifications and photo credits.

## Dual-name contract · corrected 2026-10-09

The current user decision is **common name + HanLingo spelling of the local name**. The second name must not use another romanization system. `placeLabel` returns the common name; `placeReadingName` generates the secondary name through `convertIpa`; `placeDisplayName` and `PlaceName` use that same result everywhere. No parentheses or extra controls are needed.

- `place-name-pronunciations.ts` holds phonetic evidence separately from source spellings. Identical IPA and tone notation always receive identical HanLingo output. Do not hard-code an attractive output or change the shared sound key for place names.
- The attested name spelling and an explicit phonetic correspondence table may support a manually audited broad IPA normalization. Record both sources and its scope; never claim this is a new local recording. Source orthography alone is insufficient.
- Preserve source tone categories as `·Tn`. Apply a pitch table only when its exact variety and convention are documented. Never infer connected-speech tone sandhi. Mark missing tones in the reference notes.
- POJ, Tâi-lô, Jyutping, Hakka and community orthographies remain in searchable aliases and labelled **Source spelling** notes. They are never a fallback for an unavailable HanLingo reading.
- Common/community names remain Amoy, Canton, Taipei, Kulangsu and the other established choices. Kulangsu is a landmark within Amoy, not another dialect node.
- If phonetic evidence is missing, show the common name alone and record the gap. A name’s source spelling is not evidence of a complete local pronunciation.
- URLs, locality IDs, saved-word keys, source titles, organization names, quotations and source-table labels remain exact. `xiamen`, `guangzhou`, and `taipak` continue to identify the same places.
- Frontend comparison targets and backend display names share generated `translation-targets.json`; regenerate with `npm run build:translation-evidence`.

See `docs/PLACE-NAME-COVERAGE.md` for coverage of HanLingo name spellings versus source spelling evidence. These are different counts.
