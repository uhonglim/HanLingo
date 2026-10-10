# Hangzhou and She County: Hou/List words

The collection adds 80 lexical forms for Hangzhou and 80 for She County. These are source-attested word or expression responses, not character-reading lists. Their dates and geographical scope remain visible beside pronunciation. No new locality, recording or photograph is implied.

## Dataset and rights

Source: [SequenceComparison/houchinese](https://github.com/SequenceComparison/houchinese/tree/38d6bd34af5678be7f0c481c6ed765cd0ddfd998), pinned at `38d6bd34af5678be7f0c481c6ed765cd0ddfd998`. The repository’s LICENSE, metadata and CLDF metadata explicitly license the derived dataset under **CC BY 4.0**.

Attribution: Hou Jingyi, ed. (2004), *现代汉语方言音库 / Phonological Database of Chinese Dialects*, Shanghai Education Press; Johann-Mattis List’s *Sequence Comparison in Historical Linguistics* benchmark (2014), retro-standardized as CLDF. This is the 15-variety, 2,789-form SequenceComparison collection. It is separate from the previously held CDDB Hou2004 dataset.

The displayed transcriptions are the derived dataset’s forms. This is not a claim that they reproduce every typographic detail of the original printed volumes. The data licence does not establish rights to original commercial recordings. Publication dates are not interview dates.

## The schema matters

For this source, CLDF `Value` contains **Han writing**, while `Form` contains **IPA**. The source builder maps raw `SIN.csv` columns `Ortho` and `IPA` to those respective fields. Applying a Value-as-IPA rule from another importer would be wrong.

The versioned `hou-hangzhou-shexian-provenance.json` records each original CLDF ID and line, original SIN row and line, Han form, raw IPA, normalized Segments, concept, source English and any displayed gloss qualification. All 160 entries have unique source joins. Canonically equivalent decomposed/composed nasal vowels are documented through both raw and derived strings. Display adds spaces after supplied tone groups; it does not alter any phonetic value.

The normalized `Segments` field is used for checking, not as replacement pronunciation. Its orthographic profile expands ligatures and contains additional normalizations. Selected Form/Segments tone sequences agree. Missing-tone syllables, partial phrase transcriptions and unsupported vowel symbols remain outside this starter.

## Pitch conventions

List’s [institutional book copy](https://www.hhu.de/fileadmin/redaktion/DUP/DLS__J.-M._List___Vol._1_Open_Access.pdf#page=146), printed p.124, Table 4.3, identifies numeric tone examples as pitch shapes; p.140 explicitly names Chao’s Sinitic tone system. Table 4.24 on p.187 identifies the SIN dataset. The table’s separate computational sound-class labels must not be confused with pronunciation values.

Entries retain their supplied pitch digits, including one-digit checked-tone values. No source tone category is converted into pitch, and no missing contour is supplied. The shared HanLingo converter handles the selected forms without a new spelling rule. The source book page was visually inspected; its scan is not published in the app.

## Scope and map anchors

Hangzhou entries use existing locality `hangzhou` under Wu / Taihu / Hangzhou. The dataset names Hangzhou but does not give a neighbourhood, consultant biography or collection date. These readings are therefore labelled **neighbourhood unspecified**. The article’s independently sourced discussion of old-city Hangzhou remains a separate geographical account; it must not be applied as the dataset’s unreported fieldwork address.

The [NII catalogue](https://ci.nii.ac.jp/ncid/BA42571497) dates the separate Hangzhou text-and-cassette publication to September 1998. That bibliography does not establish the date or speaker of every dataset row. The source citation’s 2004 date and List’s 2014 benchmark date are preserved separately.

She County entries use existing `shexian-hui` under Hui / Ji–She / Jixi–She County. The dataset names Shexian but gives no settlement, so the visible qualification is **settlement unspecified**. Existing LACD930 geographical anchor `[118.413586,29.860765]` is retained; the dataset’s inconsistent latitude `30.589829` is not imported. Neither point would establish a speaker’s address. No Huicheng or other town identity is inferred.

The entire unrelated Guixian metadata record is excluded: its ID, Guiyang name and Hmong-Mien linkage conflict. No automatic correction is attempted.

## Semantic review

An independent reviewer checked all 160 original candidate joins and semantic pairs, then verified five replacement numeral entries. The final selection holds:

- A person-denoting Hangzhou form under the ambiguous English heading “humpback”.
- Hangzhou 驮 and She County 担 under overly broad “take”.
- She County 淡, where raw “light” was editorially recoded as “watery”.
- A duplicate She County 女 reading under “girl”; the retained “daughter” card explicitly records the wider source meaning range.

Classifier elicitation phrases are excluded because their IPA transcribes only the classifier, not the whole Han phrase. The “two ounces” heading is excluded because it does not adequately establish the unit expressed by 二两. Weather expressions explicitly say raining, snowing or wind is blowing, with the original headings retained in provenance. A pronoun with identical IPA to another meaning cannot become its misleading quiz distractor.

The final five additions are independently verified numeral forms: Hangzhou 六 and 七; She County 三, 四 and 五. Counts represent source forms, not complete courses.

## Learning and culture

Two source-specific sound notes are added for each reference. Existing Hangzhou culture remains in its established collection. She County receives two locally documented topics: the eight-pillared Xu Guo archway in Huizhou old city, from the [municipal government’s 2023 heritage account](https://www.huangshan.gov.cn/zwgk/public/6615714/11221465.html), and a [July 2024 fish-lantern gathering at Yuliang Dam](https://www.huangshan.gov.cn/zxzx/tpxw/8404077.html). These are county cultural contexts, not evidence of the dataset consultant’s home. Direct requests to the two government pages returned 412 during review; their indexed primary-publisher text supplied the factual statements. No images are copied from those pages.

## Reproduce and verify

`python3 scripts/import-hou-hangzhou-shexian.py` regenerates the module from the versioned reviewed ledger. `--verify-sources` additionally requires and hashes the pinned cached source files and checks raw/CLDF joins. Missing files stop source verification; the script never substitutes another corpus or silently fetches a newer version.

The targeted test verifies original writing and pronunciation, pitch completeness, visible source scope, meaning-practice eligibility, semantic holds and ambiguous-pronunciation distractor exclusion. Shared integration, inventory generation and publication are separate parent-owned steps.
