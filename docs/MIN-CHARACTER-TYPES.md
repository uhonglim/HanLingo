# Original Min reading scope correction

The 9 October 2026 audit found that the original Min packs used a shared character-reading helper without setting `learningKind`. This let supplied character pronunciations enter lexical meaning quizzes. The correction preserves all IDs, Han characters, IPA, source tone notation and source links.

| Source collection | Locality | Corrected entries | Evidence scope |
| --- | --- | ---: | --- |
| CUHK character dictionary | Foochow | 58 | Isolated character readings, not a local word-definition list |
| CUHK character dictionary | Jian’ou | 60 | Isolated character readings, not a local word-definition list |
| Wu, Puxian subgrouping, tables 1–5, pp. 160–164 | Putian | 29 | Comparative character correspondences; English meanings were editorial character glosses |
| Zhou & Lin, *Yong’an Fangyan*, pp. 7–8, 23, 28–29 | Yong’an | 20 | Dictionary character readings, with the book's category-to-pitch table applied explicitly |

All **167** entries now use `learningKind: character-reading`, neutral `Character <han>` labels and a visible source-character qualifier. Sound-note titles identify the source characters or sound contrasts rather than presenting editorial glosses as attested local vocabulary. Their useful IPA contrasts remain. Written-character senses are maintained separately with their own dictionary attribution; they do not establish local usage.

The separate **80 Foochow Beida lexical survey responses** remain lexical entries and meaning-practice candidates. They are dated to the 1950s survey, published 1964, and are not reclassified because of the nearby character collection.

This correction does not change Putian or Yong’an's already documented category-to-pitch conversions. It does not expand those studies' geographic scope. Source URLs remain beside each record in `src/data/learning/min.ts`.

`min-character-scope.test.ts` verifies all four counts, stable character-based IDs, neutral labels, practice exclusion and retention of the independent Foochow lexical pack. The separate 1,500-entry Sinica correction is documented in `MIN-SINICA-READINGS.md`.
