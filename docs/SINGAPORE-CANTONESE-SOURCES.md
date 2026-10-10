# Singapore Cantonese reference

The pack adds one Singapore Cantonese locality, five source-attested **character segment examples**, two sound notes, two cultural topics and four source resources. It does not add complete tonal pronunciations, inferred local place-name IPA, a recorded vernacular transcript or photographs.

## Classification and geography

[Luo Futeng’s SCCC Culturepaedia overview](https://culturepaedia.singaporeccc.org.sg/language-education/the-cantonese-dialect-in-singapore/) explicitly discusses Singapore Cantonese. [Lee Kok Leong’s community history](https://culturepaedia.singaporeccc.org.sg/communities/dialect-group/the-cantonese-clan-associations-of-singapore/) identifies Cantonese speech with the name Guangfu. This supports editorial alignment with HanLingo’s existing `yue/guangfu` branch. `overseas-cantonese` is expressly a **geographic collection**, not a formal linguistic subdivision.

Community-association history is broader than a phonetic taxonomy: Kwong-Wai-Siew associations can include people with Hakka backgrounds; some associations have Taishan origins. This locality does not classify all their members as Guangfu speakers, nor does it replace Singapore Hokkien, Teochew, Hainanese, Hakka or Taishanese references.

The map point uses [Wikidata Singapore Q334](https://www.wikidata.org/wiki/Q334), P625 `[103.8,1.3]`, CC0, checked9October2026. It is an approximate city-state anchor, not a speaker or museum location. The raw SPARQL response and hash are recorded in `singapore-cantonese-provenance.json`. No geographic jitter is introduced to separate language markers.

## Pronunciation examples

The author’s *Phonology* paragraphs1–2 supply 微 `[mei]`, 文 `[mɐn]`, 亡 `[mɔŋ]`, 叫 `[kiu]`, 晓 `[hiu]`. The five short factual examples retain exactly those segments. They are character readings, not English vocabulary translations. `toneNotation: unspecified` prevents the shared converter from inventing pitch values. The visible qualification also preserves missing speaker and collection-date information. The website update date,14May2026, is not a survey date.

The same section gives 舅 with `[kʰɐu]`. That pairing is held as unresolved; neither character nor transcription is silently corrected. Later broad spelling-style examples in the article are not imported as a consistent IPA wordlist. No vowel length, onset change, citation tone or sandhi is inferred from another Cantonese reference.

## Listening source and reuse

The [SCCC Talking Red Packet2021 page](https://singaporeccc.org.sg/events/sccc-talking-red-packet-2021/) names **Ng Rui Zhao** as its Cantonese performer. It describes the project participants as children aged7–11 and identifies him as a Singapore Hokkien Huay Kuan Cultural Academy student. It does not supply his exact age, ancestral locality, home variety or a word-level IPA transcript. The greeting remains a festive child performance, separate from the five written examples.

The publisher’s MP3 responded HTTP200 with `audio/mpeg` on9October2026. This establishes URL availability only; live playback was not verified. The audio was not downloaded, transcribed, copied, rehosted or embedded.

The current [SCCC Terms of Use](https://singaporeccc.org.sg/terms-of-use/) reserve content rights and disallow framing without written permission. No such permission is established. The pack therefore provides an ordinary **publisher-page listening resource**. `local-recordings.ts` is unchanged by this task. There is no claim of an open audio licence or permission to redistribute the article or its archive photographs.

## Culture

The two original summaries cover Pat Wo Wui Kun’s opera-guild history, sourced to Lee Kok Leong, and Kwong Wai Shiu Hospital’s charitable history, sourced to the [National Museum of Singapore](https://www.nhb.gov.sg/nationalmuseum/every-body-plays-a-part/exhibit-d.html). These are documented Cantonese community connections, not assumptions drawn from generic Singapore scenes. No Hokkien temple photographs are assigned as Cantonese evidence.

## Validation

`src/data/learning/singapore-cantonese.test.ts` checks exact source segments, missing-tone preservation, character-reading status, the held pairing, geographic cluster scope and the external child-performance resource. `docs/singapore-cantonese-provenance.json` records source identity, update dates, source cells, holds, coordinate evidence and listening limitations. Integration and real browser acceptance remain separate parent checks.
