# Hangzhou and She County gallery sources

This batch adds thirteen distinct photographs: two to Hangzhou’s existing nine and eleven to the existing `shexian-hui` county reference. Both galleries reach eleven photographs. Hangzhou’s original records and ordering are unchanged.

`src/data/galleries/hangzhou-she.ts` exports `hangzhouSheGalleryAdditions` and the complete `hangzhouSheGalleries`. The complete export must follow `expandedGalleries` in the shared gallery index so Hangzhou’s eleven are not overwritten by its older nine. Shared integration belongs to the root agent.

## Geographic and photographic scope

Hangzhou’s additions show Gongchen Bridge and a courtyard of Hu Xueyan’s former residence. They add canal transport and domestic architecture to the existing food, street, museum and West Lake scenes. They are city cultural context, not the location of a particular language consultant.

The She County gallery shows Xu Guo’s stone archway, Doushan Street, Yuliang Dam, Yangchan village, an archway in Xucun, a Xin’an River sightseeing quay, the reconstructed Huizhou government-office complex, Sanyang seen from its station, Changxi’s wooden footbridge, Huang Binhong’s courtyard and Changqing pagoda. Each caption names its pictured place and date. The collection is county-wide culture; it is not a claim that every scene belongs to the Hou pronunciation study’s settlement or that everyone pictured speaks the same variety.

No Tunxi, Chengkan, Tangmo, Hongcun, Xidi or Hebei She County image is substituted for Anhui She County. No existing Tunxi/Huizhou asset is reused to increase counts. A Tangyue protection-plaque closeup and alternate Tangyue house candidates were held rather than used as padding.

## Source qualifications

The Huizhou government-office image is explicitly captioned as reconstructed. The municipal government’s account of the project records its reopening in November 2012; the selected photograph was taken in April 2015. The county government also describes the project as 徽州府衙复原. These primary references are in the provenance ledger. No claim that this entire visible complex survives untouched from the Ming period is made.

The Yangchan image is captioned as houses, without making an unsupported claim about a named household. Xucun’s archway retains a broad caption because its exact commemorative name was not independently established. Sanyang’s viewpoint is explicitly the railway-station platform, as supplied by the photographer. The Xin’an River quay is not given an inferred specific dock name.

Huang Binhong’s source description explicitly identifies the courtyard of his She County former residence. A public-sector report also places the former residence in Tandu village in its county cultural-work account. This photo is not confused with his Hangzhou former residence.

The Yuliang Dam file’s free-description field is empty, but its filename, Commons category and national cultural-site identifier 5-319 identify the subject. The visual review confirms the dam and riverside settlement. No camera coordinates are invented for this or other photographs with missing location fields.

All photographs are dated records, not claims about current services, bridge condition, street appearance or access. County culture and lexical evidence remain separately scoped.

## Reuse permissions and attribution

`gallery-hangzhou-she-provenance.json` preserves the exact Commons filename/page, photographer, source description, date, image URL, camera coordinates where supplied, selected licence, original licence link, original SHA-256, delivered SHA-256 and transformation for every new image.

Twelve images use source-offered CC BY-SA 3.0, CC BY-SA 4.0 or CC BY 3.0 licences. Alex Needham’s Changxi bridge photograph has an explicit worldwide public-domain dedication by the copyright holder, together with an unrestricted fallback grant. Its permission link goes to the exact source declaration; it is not relabelled CC0. Attribution is retained even for that public-domain image. The shared viewer displays photographer, source and licence links.

The whole frame is retained. EXIF orientation is applied, images are resized to a maximum of 1440 pixels and converted to WebP; no crops or generative edits are used. CC adaptations retain their source licence terms. The Yangchan houses image has one curated association to the source-attested She County word for “house” (`hou-list-shexian-40_house-1`, 屋). The viewer retains its visible “settlement unspecified” study register; this is a county lesson associated with the subject, not a claim about Yangchan pronunciation. No other photo-word associations are added.

All thirteen source URLs, original hashes and delivered hashes are distinct. A normalized source-URL check and delivered-byte check found no overlap with existing `src/data` source records or `public/images` files before implementation.

## Review and reproduction

The producing agent checked each source file’s rights and metadata and inspected all thirteen final image subjects. Independent review passed for all thirteen source pages, licences, captions, unique hashes and existing Hangzhou overlap; the report is `.evidence/gallery-ninth/independent-depth-review.json`. Supplemental primary government pages were read through the web tool; direct requests returned HTTP 412 or a TLS EOF, and no bypass was attempted.

Ignored evidence is in `.evidence/gallery-ninth/`: Commons pages, metadata, original downloads, candidate WebPs, two final contact sheets, the selection ledger and deterministic implementation script. Tracked provenance retains the reproducible source record without requiring that cache. Focused tests verify existing-gallery preservation, locality IDs, file format, distinct hashes, licences and consequential scope/date qualifications.
