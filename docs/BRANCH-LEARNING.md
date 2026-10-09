# Learning across the branches

The existing group → branch → cluster → locality hierarchy remains the navigation backbone. Learning pages extend a locality directly with `/words`, `/culture`, `/sounds`, and `/practice`. The visible labels are Words, Photos, Sounds, and Practice, matching Amoy.

`src/data/learning/` contains locality-scoped evidence packs. The current coverage of every published branch, including zero-coverage entries, is recorded in `CONTENT-DEPTH.md`. Amoy’s existing lexicon is adapted into the shared learning inventory without replacing its dedicated learning pages. These complement the articles rather than replace their sources or claim a complete survey of Han languages.

- Each word is attached to one locality, a source, and an explicit reading convention. Do not promote a standard-language reading into evidence for a city's vernacular.
- Citation forms, phonemic transcription, connected speech, and source tone categories must remain distinguishable. If a source supplies categories rather than pitch contours, preserve that qualification and do not invent a HanLingo contour.
- HanLingo spelling is generated only when the existing IPA converter supports the supplied sounds and contour notation. Unsupported readings stay unresolved. The source IPA is always retained.
- Culture and resources carry locality scopes. Photos carry their own creator and license; they do not establish a photographed person's language.
- A locality receives Words only with attested words or explicitly labelled character readings, Photos only with licensed photos, and Sounds with attested readings, source tone inventories or sourced sound notes. Meaning practice requires at least four distinct eligible meanings; otherwise, at least four distinct supported HanLingo spellings can support spelling practice. No empty chapter or fake playback control.
- Longer reference prose remains under Language notes. Learning previews, culture, local sources, maps, and child entries remain directly accessible.

Research logs: `MIN-BRANCH-LEARNING.md`, `MANDARIN-YUE-LEARNING.md`, and `HAKKA-WU-LEARNING.md`.

## Local galleries and comparisons

`src/data/galleries/` supplies the shared immersive gallery for every mapped locality. Keep 9–11 distinct scenes per place, with image files hosted locally and source/creator/license links visible. Filters, direct photo links, arrow-key navigation, Escape and focus restoration must work across all galleries.

`src/data/regional-words.ts` attaches a locality and source to each comparative reading. A spelling-only dictionary entry may appear in Words and local comparisons, but does not enter IPA sound filters or generate a HanLingo spelling. Local variants are attestations, not exclusive claims about a city. Keep readings from different studies identifiable; do not silently overwrite an existing lesson with a different study’s tone values.

Verified IPA drives the sound selector and pitch traces. Only explicitly marked pitch contours may be displayed as IPA tone letters or plotted; source tone-category numbers retain their labels. Both original and displayed IPA remain searchable.

## Coverage and presentation

Run `npm run audit:content` to regenerate `CONTENT-DEPTH.md`. Counts separate attested IPA, source-spelling entries, segment-only transcriptions with omitted or unkeyed source tones, photographs, learning notes, culture and source links. Incomplete locality word banks remain explicit research priorities.

Group and branch overviews aggregate actual locality material and sample multiple branches/places before repeating one. The existing child list comes before those previews. Complete word lists remain under locality routes; overview samples never imply a group-wide pronunciation. Consequential register/survey labels travel with the reading into cards and practice.

## Shared learning experience — October 2026

Locality introductions pair three distinct licensed scenes with topic-related attested readings. These associations help browsing; they are not translations of photograph captions, ingredient lists, or proof about photographed speakers. Existing locality galleries keep their full collections, credit links, keyboard viewer and direct photo URLs. The viewer now offers the same local reading cards where available.

Words can be searched and filtered by English-gloss topic. IPA entries can be bookmarked in this browser; the Saved filter and practice deck stay scoped to the current locality. Practice applies the same meaning-or-spelling eligibility to bookmarks. Character readings never become meaning questions. Use `meaningPracticeExclude: true` for a sourced multifunctional form whose context-free meaning would make a quiz ambiguous; it remains visible in Words and eligible for spelling practice. Exclude it from both meaning prompts and distractors, and document why in its provenance. Identical IPA or written forms cannot be competing wrong meanings. An insufficient saved deck is shown explicitly rather than silently replaced by unsaved words.

Sounds retain exact segment matching and add selectable pitch traces derived solely from entries marked as pitch contours. Source categories and segment-only entries never enter the tone explorer. The new Chengdu segment-only lexical examples keep their qualification in word cards, photo readings, sound matches and practice.
