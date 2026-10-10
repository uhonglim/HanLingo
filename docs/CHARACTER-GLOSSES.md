# Written-character senses

Some comparative surveys provide a character and its pronunciation rather than an attested everyday word or a local definition. These records retain `learningKind: character-reading`. Their English reading aid comes separately from Unicode Unihan 17.0.0 `kDefinition`, labelled **Written-character senses**. The full definition and Unicode licence are linked beside the pronunciation source. This dictionary aid does not establish local usage, supply IPA, change HanLingo spelling or enable meaning quizzes.

Source: https://www.unicode.org/Public/17.0.0/ucd/Unihan.zip

SHA-256: `f7a48b2b545acfaa77b2d607ae28747404ce02baefee16396c5d2d7a8ef34b5e`

The importer selects single characters actually present in the typed reading collection, from `Unihan_Readings.txt`. It preserves the source definition. Cards show the first two semicolon-separated senses; reference notes retain the full entry. Search also includes the full definition. Explicit local lexical meanings take precedence and receive no generic character definition.

Run `node scripts/import-character-glosses.mjs` after saving the pinned archive at `.evidence/character-glosses/Unihan-17.0.0.zip` and the official https://www.unicode.org/license.txt at `.evidence/character-glosses/license.txt`. The importer verifies the archive hash before writing the selected data and provenance ledger. Unicode License V3 is distributed at `/licenses/UNICODE-3.0.txt`.

The provenance ledger records missing entries and holds. 差, 好, 嚼 and 著 are held because their short dictionary definitions do not safely describe the source context. No replacement definition is inferred. In particular, Chengguan 奶 is a source-attested address to a grandmother and remains a lexical fact; it is never relabelled as milk.
