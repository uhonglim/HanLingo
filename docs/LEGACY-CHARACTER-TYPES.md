# Legacy character-source scope audit

9 October 2026. The source notes and construction helpers explicitly identify the following **188** records as character pronunciations. They were previously untyped and eligible for lexical meaning quizzes. The correction marks them `character-reading` and gives neutral `Character <han>` labels, with a visible qualifier. Every ID, character, IPA value and source URL is retained.

| Collection | Entries | Source evidence |
| --- | ---: | --- |
| Swatow | 32 | CUHK character dictionary, Shantou locality column; every entry already described itself as a dictionary character reading |
| Jinan | 35 | CUHK character dictionary, Jinan locality column; the helper concatenates supplied initial, final and pitch values |
| Nanjing | 34 | CUHK character dictionary, Nanjing locality column; same character-reading helper |
| Meixian | 27 | CUHK character dictionary, Meixian locality column; source notes explicitly distinguish character pronunciation from an independently used word |
| Shanghai | 21 | CUHK character dictionary, Shanghai locality column; independent sourced Shanghai examples remain separate |
| Wenzhou | 19 | CUHK character dictionary, Wenzhou locality column; existing source notation retained |
| Suzhou | 20 | Ling Feng 2009 vowel study, Tables 2-1 and 3-1; elicitation characters illustrating vowels, explicitly not all independent everyday words |

This is a correction based on the actual source-data construction and existing source notes, not a classifier run on source titles. The CUHK helpers and the specific Suzhou study call now declare the record kind explicitly. Other calls to the shared Hakka/Wu lexical helper remain lexical. A record's presence in a book with character tables does not override an explicit local definition: Jiangyong 奶 remains the documented grandmother address term.

The shared written-character dictionary aid supplies any English character senses separately. It never supplies local pronunciation or promotes a character into a vocabulary-meaning quiz. Pronunciation and spelling practice may use these character readings when it tests the supplied sounds rather than an inferred local meaning.

`legacy-character-scope.test.ts` checks the seven exact collection counts, neutral labels and meaning-quiz exclusion, while keeping Lishui's independently attested compound and the Jiangyong address term eligible as lexical evidence. `MIN-CHARACTER-TYPES.md` covers the original 167 Min records, and `MIN-SINICA-READINGS.md` covers the further 1,500 Sinica entries.

Two further Shanghai records, 茶 and 魚, previously existed only as regional-comparison additions. They are now retained in `shanghai-character-supplement.ts` with their original IDs and IPA, explicitly typed as character readings. 山 and 米 already exist in the main character collection. Semantic comparisons now use lexical evidence; the character records remain available for sound study without a claim about everyday standalone word choice. Translation grounding also excludes character-only records.
