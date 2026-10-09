# Galleries for the expanded lexical references

Reviewed 9 October 2026. This batch adds **28 photographs** to three previously uncovered locality references. Harbin already has nine photos in `src/data/expansion/mandarin.ts`; that collection is retained unchanged.

| Locality | New scenes | Geographic scope |
| --- | ---: | --- |
| Rongcheng · `rongcheng-371082` | 9 | The Shandong county-level city: the Chishan scenic area, a beach, coastal buildings, Shilihe neighbourhood, Lüdaohu wetland, Chengshantou and railway station. |
| Loudi · `loudi-study` | 9 | Urban Loudi: market, night dining, Sunshui Park, Shima Park sculpture, river bridge, commercial street, railway station, city road and a railway meal. |
| Kunming · `kunming-study` | 10 | City culture and landscape: Green Lake activity and scenery, noodle cooking, Zhengyi Road, Dian Lake, art district, produce stall, Yuantong Temple and museum exterior/pillar. |

The lexical survey scopes are documented in `LEXICAL-EXPANSION-SOURCES.md`. None of these photographs supplies a speaker identity, an exact recording site or pronunciation evidence. The Kunming lexical sample was collected in the 1950s; its modern photos are independently dated. Rongcheng does not mean the county in Hebei or the district in Guangdong. Dongchudao and Yuankuang are discussed in separate culture notes, but this gallery does not pretend to have pictures of those villages.

## Source and rights

Each selected image has a Commons original file-page link, author, applicable licence, original media URL, source-page SHA-256, delivered-image SHA-256, dimensions and caption in `gallery-lexical-study-provenance.json`. The gallery renders the image author, licence and original source link. CC BY, CC BY-SA, CC0 and public-domain image terms apply independently of the code licence. Preserve attribution and share-alike requirements where applicable.

Original Commons HTML is cached at the exact ledger paths under `.evidence/lexical-study-galleries/commons/`. Normal public Commons file-page and imageinfo API endpoints supplied the image URLs. Sequential delays and stop-on-429 handling were used; there were no access-control workarounds.

Images are resized within 1440 × 1440 and converted to RGB WebP quality 83, without crops, synthetic details or generative alteration. Missing capture years remain missing. Dates are from the file record; upload dates are not relabelled as capture dates. Original media remain available through the source file pages.

## Scene review and exclusions

All three complete contact sheets were inspected. Captions follow the depicted subject and source record rather than a file name alone.

- Rongcheng’s Chishan waterfront view is geotagged at 36.899873, 122.399982, beside the separately geotagged Chishanshen statue view. The image is not labelled as the city centre or the lexical recording site. The Chengshantou photo shows its gateway and visitor area, not a close-up of the headland cliffs.
- Rongcheng’s repeated beach views and repeated Chishanshen statue image were removed. The community activity area, apartment streetfront and wetland are different subjects around Shilihe, not three crops of one scene.
- A file titled “Main Street Loudi” says in its own description that it was taken in a nearby village. It is held from the urban reference.
- “Louxing Subdistrict 1” conflicts internally: its English description places the scene in Yanling County, Zhuzhou, while its Chinese description says Loudi. It is held rather than silently corrected.
- A commercial-building facade in Loudi is omitted in favour of distinct food/transport material. The boxed railway meal is a documented station photograph, not a claim that the dish is unique to Loudi.
- A Kunming file named “Old Street” shows a photographic display beside an area awaiting redevelopment. It is omitted rather than presented as a direct photograph of the buildings shown in the display.
- The Green Lake dancers are described only by visible activity and documented place. No ethnicity or language is assigned to them. Temple and museum photographs similarly make no claim about the lexical speakers.

The ledger retains nine rejected candidates and their reasons. These exclusions keep counts from being padded with repeated views or doubtful place matches.

## Reproduction and validation

Local evidence helpers `photos.py`, `collect.py`, `selection.json`, `captions.json` and `publish.py` are in `.evidence/lexical-study-galleries/`. The collector caches source pages and media metadata; the publisher emits `lexicalStudyGalleries`, its asset files and the public ledger. The tracked ledger preserves exact URLs, captions and checksums independently of the helper cache.

Run `npx vitest run src/data/galleries/lexical-study.test.ts`. The tests verify the existing locality identities, 9/9/10 actual counts, Harbin’s retained collection, unique source URLs/asset hashes, source credits, dimensions and documented exclusions. Shared gallery-index integration belongs to the parent release task.
