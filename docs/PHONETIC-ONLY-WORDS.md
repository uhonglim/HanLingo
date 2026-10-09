# Spoken forms without a supplied writing

A source can document a local word with an IPA transcription and lexical gloss without supplying Chinese characters. Such evidence belongs in the learning collection; it does not authorize inventing characters or borrowing another locality’s written form.

`AttestedWord` supports two explicit cases:

- A supplied written form uses a nonempty `han` string. Character-reading records still require this form.
- An oral lexical form without a complete supplied writing uses `han: null`, `writingStatus: "not-supplied"` and `learningKind: "word"`.

Both require the exact locality, source, IPA, lexical gloss and reading scope. A missing written form does not imply a missing word. When a source supplies partial writing with unresolved placeholders, retain that exact partial spelling in the source note and provenance; do not teach the placeholder as a character. The ordinary HanLingo converter remains the only spelling key; it never supplies missing tones. Show consequential context—weak pronouns, connected speech, historical collection dates or an untoned suffix—beside the pronunciation.

Word cards lead with the gloss when no writing is supplied and state that the source lacks a written form. Search, bookmarks and sound exploration work with these records. Meaning practice shows pronunciation without revealing the gloss; two absent written forms are not treated as the same word, but identical IPA or meanings remain excluded as distractors. Photo links use the IPA query when no written form exists.

The existing character-based regional comparison and Amoy card adapters retain their written-form requirements. Written translation grounding excludes records without writing, as well as character-reading records. A lexical IPA record is not permission to manufacture translated Han text.

Tests in `src/data/learning/phonetic-only.test.tsx` cover rendering, search, quiz distractors and the published-record contract. Synthetic test forms stay outside learning data.
