# Xiang study galleries

Reviewed 9 October 2026. These 32 photographs illustrate the places surrounding four named varieties in Wu Jui-wen’s 2024 comparative study. They do not establish a photographed person’s language or the study’s recording location.

| Locality reference | Published scenes | Scope |
| --- | ---: | --- |
| Shuangfeng · `xiang-county-431321` | 7 | County context: bridge, residence, wind turbines, settlement, fields, river and school. |
| Hengyang · `hengyang-xiang` | 10 | Hengyang city: art museum, library, park, pavilion, temple hall, square, river festivities, bus station, academy and pagoda. No Hengyang County or Mount Heng scenes. |
| Xupu · `xiang-county-431224` | 9 | County context including Guanyinge, Jiangkou, Tongxi, Lufeng and Tangwan. |
| Chenxi · `xiang-county-431223` | 6 | County context including the county seat, Huomachong and Xiaolongmen. Chenxi railway station is outside the county seat. |

Shuangfeng and Chenxi remain below the 9–11 scene target. Additional licences and distinct scenes are needed; repeated bridge views, unidentified subjects and nearby-city images do not close these gaps. The actual language-study scopes remain in `docs/xiang-comparative-provenance.json`.

## Source, rights and transformation

Every asset has its own Wikimedia Commons file-page source, author, licence, original file URL, dimensions and delivered-file SHA-256 in `gallery-xiang-study-provenance.json`. The rendered gallery retains the author, licence and source link. Licences in this batch are CC BY 3.0/4.0, CC BY-SA 3.0/4.0, CC0 and public domain; they are independent of the application code licence. Respect the applicable attribution and share-alike terms when reusing these assets.

The original Commons HTML and its SHA-256 are retained in `.evidence/xiang-study-galleries/commons/`. Metadata and contact sheets are beside them. The Commons API supplied 1440-pixel thumbnail URLs when needed; all requests used normal public endpoints and a HanLingo user agent, with sequential delays. The collector stops on HTTP 429. There were no access-control workarounds.

Images were resized within 1440 × 1440 and converted to RGB WebP at quality 83. There are no crops, generated details or synthetic replacements. A source thumbnail smaller than 1440 pixels was not enlarged. Original files remain accessible through their linked Commons pages.

## Visual and locality review

- All four complete contact sheets, plus the selected full-size Laiyan Pagoda photograph, were inspected. Captions follow the actual image and file description rather than relying on the filename alone.
- The Xiannüdian image shows wind turbines on a ridge in Heye, not a temple building. The selected Zhuhui image is Yaoshi Hall beside the pagoda, not the pagoda itself.
- One file with “Laiyan pagoda” in its name is a redevelopment board; it is held. A separately verified whole-pagoda photograph is used instead.
- The Hengzhou Huagu opera candidate has no established performance venue; it is held rather than claimed as a photograph taken in Hengyang city.
- Two views of Xikou Bridge and overlapping hillside/train-side field scenes were reduced to one selected view each. An unidentified Chenxi structure and an untitled image whose place is supported only by a category are held.
- County photos use named-town context where available. They do not imply that every place shown shares the source study’s exact variety.
- Old images are historical photographs, not a claim about present appearance. Capture years follow the Commons record, never an original-upload date. Xupu’s school image has a camera timestamp inconsistent with the supplied capture date; its display year is omitted, with both source and qualification retained in provenance. No image is used as pronunciation evidence.

## Reproduction and checks

The ignored evidence directory contains `photos.py`, `collect.py`, `selection.json`, `captions.json` and `publish.py`. The collector caches file-page HTML and metadata; the publisher copies the selected WebP assets, writes `xiangStudyGalleries` and writes the public provenance ledger. The tracked ledger records exact source URLs, captions and asset hashes independently of these local helpers.

Run `npx vitest run src/data/galleries/xiang-study.test.ts`. It checks the four existing atlas identities, real collection counts, every asset hash, unique sources and bytes, file dimensions, HTTPS licence links, and retained exclusions/date qualifications. The gallery index is integrated separately by the parent task.
