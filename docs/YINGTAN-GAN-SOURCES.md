# Yuehu urban Yingtan: one speaker’s surface productions

## Selection and scope

`yingtanGanLearning` adds 18 entries to the existing Yuehu District reference `gan-county-360602`, in `gan/yingyi`: 17 lexical readings and one surname character reading. Two verbs have no supplied Chinese writing. No new locality, speaker coordinates, audio or photographs are claimed.

Primary source: Xiaotian Liu, 2026, *Phonetic Investigation of the Yingtan Variety of Gan Chinese: A Comparative Analysis Based on Single-Speaker Data*, ICLCC 2026, pp. 88–99. [Publisher PDF](https://www.atlantis-press.com/article/126026097.pdf), DOI [10.2991/978-2-38476-597-3_11](https://doi.org/10.2991/978-2-38476-597-3_11).

The speaker identifies with urban Yuehu (p. 89). Speaker Q is one woman, age 23, born in the 2000s, who acquired Gan in her family and Mandarin through schooling (abstract; pp. 92–93). The author instructed remote self-recording. Neither a precise neighbourhood nor recording date is supplied. Publication in 2026 is not a recording date. This collection is not a representative pronunciation inventory for everyone in Yuehu or the wider Yingtan prefecture. The paper explicitly adopts Ying–Yi Gan; the existing map point remains a broader administrative reference.

## Exact transcription and repetitions

`docs/yingtan-gan-provenance.json` is the small, reviewed source ledger. Runtime entries derive directly from it, rather than scraping the PDF. Each entry retains its original baseline-digit IPA, exact page/table, selected first repetition, full explicitly printed repetition array and writing status. Empty table cells remain null; an empty second cell is not evidence of a second identical recording.

The paper explicitly introduces Chao Yuen Ren’s pitch notation (p. 91). Lesson IPA uses the bracketed actual surface forms in Tables 6–8 and section 4.3, not the earlier underlying slash forms or a tone-category number. Baseline pitch digits become Unicode superscripts only for display. Segment symbols remain unchanged. Repeated forms for 和, 鞋, 好 and 棍 are retained verbatim and qualified beside the lesson reading. They are within-speaker variation, not evidence of different neighbourhood accents.

The English typo `too use` becomes `to use`, with the original retained in the note. `2nd SG pronoun` is expanded without changing meaning. 王 remains a surname character reading, not the common noun “king.” No Chinese characters are supplied for the source’s two phonetic-only verbs. The HanLingo spelling comes from the global converter.

## Holds

- 帮: Table 8 has `pɑŋ22`, but its preceding paragraph has `pɔŋ22`. Neither is preferred without further evidence.
- 憨: the English gloss is semantically ambiguous.
- 五: the author marks its place of articulation as needing checking.
- 秧: the supplied generic English gloss does not support a precise lexical lesson.
- 弯: retain the labialization in `βʷan22`; no unsupported modifier is stripped to make it fit the spelling key.
- 呣: the modal particle’s function is unspecified.
- Partially transcribed sentences have missing tones and are not expanded into lesson phrases.
- Additional examples outside the small selected set remain unreviewed for publication, not presumed erroneous.

## Rights and reproducibility

The publisher and p. 99 state **CC BY-NC 4.0**, not CC BY 4.0. This is not a general permission for commercial reuse. The implementation uses a bounded selection of factual IPA/character/meaning pairs, not reproduced prose, complete tables, figures, photographs, recordings or a mirror of the article. Source prose is summarized independently and linked. Source files stay in ignored research evidence.

Downloaded PDF: `.evidence/gan-next/liu2026-yingtan.pdf`.
SHA-256: `d2811a509deb09c25841aa0cbee028e569d30f0a9116e761d46ba68423f1274d`.
Rendered physical PDF pages 8–10 correspond to printed pages 95–97: `.evidence/gan-next/liu2026-yingtan-08.png`, `-09.png`, `-10.png`. The plain-text extraction is a search aid, not the transcription authority. Review the rendered pages against every ledger row before changing the selection.

Run `npx vitest run src/data/learning/yingtan-gan.test.ts` for source-cell, repetition, missing-writing, scope and shared-converter checks.

## Cultural context

Two separately sourced items belong to Yuehu District, without implying the consultant visited them or lives nearby:

- [Jiangxi Daily, 17 February 2023, p. 9](https://epaper.jxxw.com.cn/resfile/2023-02-17/09/jxrb-20230217-009.pdf): onsite reporting at Tongjia River, Jiaoshan kiln remains and Wang Hui’s ancient-pottery museum. Reported museum objects are cultural evidence, not a linguistic recording site.
- [Yingtan Taiwan Affairs Office, 22 July 2015](https://www.gwytb.gov.cn/local/201507/t20150722_10305010.htm): an organizer’s historical account explicitly names the Tongluowan Yellow Wax Stone Museum in Yuehu. The learning page does not infer current opening hours, a contemporary exhibit inventory, or a link between visitors’ languages and the study speaker.

No Longhushan or Guixi attractions are reassigned to Yuehu to fill this collection.
