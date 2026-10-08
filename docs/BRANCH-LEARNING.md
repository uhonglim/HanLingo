# Learning beyond Southern Min

The existing group → branch → locality hierarchy remains the navigation backbone. Learning pages extend a locality directly with `/words`, `/culture`, `/sounds`, and `/practice`. The visible labels are Words, Photos, Sounds, and Practice, matching Amoy.

`src/data/learning/` contains evidence-scoped packs for each published branch outside Southern Min. These complement the articles rather than replace their sources or claim a complete survey of Han languages.

- Each word is attached to one locality, a source, and an explicit reading convention. Do not promote a standard-language reading into evidence for a city's vernacular.
- Citation forms, phonemic transcription, connected speech, and source tone categories must remain distinguishable. If a source supplies categories rather than pitch contours, preserve that qualification and do not invent a HanLingo contour.
- HanLingo spelling is generated only when the existing IPA converter supports the supplied sounds and contour notation. Unsupported readings stay unresolved. The source IPA is always retained.
- Culture and resources carry locality scopes. Photos carry their own creator and license; they do not establish a photographed person's language.
- A locality receives a Words chapter only with attested words, Photos only with licensed photos, Sounds with words or sourced sound notes, and Practice only with four distinct attested meanings. No empty chapter or fake playback control.
- Longer reference prose remains under Language notes. Learning previews, culture, local sources, maps, and child entries remain directly accessible.

Research logs: `MIN-BRANCH-LEARNING.md`, `MANDARIN-YUE-LEARNING.md`, and `HAKKA-WU-LEARNING.md`.

## Local galleries and comparisons

`src/data/galleries/` supplies the shared immersive gallery for every mapped locality. Keep 9–11 distinct scenes per place, with image files hosted locally and source/creator/license links visible. Filters, direct photo links, arrow-key navigation, Escape and focus restoration must work across all galleries.

`src/data/regional-words.ts` attaches a locality and source to each comparative reading. A spelling-only dictionary entry may appear in Words and local comparisons, but does not enter IPA sound filters or generate a HanLingo spelling. Local variants are attestations, not exclusive claims about a city. Keep readings from different studies identifiable; do not silently overwrite an existing lesson with a different study’s tone values.

Verified IPA drives the sound selector and pitch traces. Only explicitly marked pitch contours may be displayed as IPA tone letters or plotted; source tone-category numbers retain their labels. Both original and displayed IPA remain searchable.
