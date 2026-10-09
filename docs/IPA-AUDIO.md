# IPA sound pack

Version 1 provides **15 general vowel demonstrations**, reused by the Romanization workshop and exact matching sounds on locality Sounds pages. These are human recordings, not a TTS engine or verified local-word recordings. Some source consonant demos include supporting vowels; an expanded pack must document that context. The current vowel pack does not perform lexical tones, sandhi or connected speech.

## Source and reuse

`src/data/ipa-audio-manifest.json` is the source of truth. Every entry records the exact IPA, source file page, original file URL and SHA-1, recording attribution, CC BY-SA 3.0 license, conversion notice, MP3 duration and SHA-256. All published originals passed the source SHA-1 check before conversion. MP3 versions were made with FFmpeg, without trimming or pitch changes. Audio rights remain with the credited creators; select the CC BY-SA license offered by the original file pages.

The pack currently contains i, y, u, ɪ, ʏ, ʊ, e, ø, ə, ɤ, o, œ, ɔ, ɐ and a. HanLingo spelling is calculated by the same converter used elsewhere. Two IPA sounds may share a spelling while retaining different recordings, such as [y] and [ʏ]. No recording is selected from the spelling alone.

The initial source audit held [ɛ] because the downloaded original did not match Commons API metadata; [n] was held because source description text conflicts with its title and IPA. Remaining consonant downloads were deferred after the origin returned HTTP 429 with a 600-second retry interval. Do not label these absent files as playable or silently use another sound.

## Runtime behavior

- The shared `IpaAudioHost` owns one media element. Selecting a sound cancels previous playback. Route changes, input changes and component removal stop the relevant playback.
- A sequence plays separate demonstrations, never an assembled word pronunciation. No tone-category-to-pitch inference occurs. Tone marks remain in the displayed source but are not performed.
- Unsupported exact segments block the whole sequence. Aspiration, nasalization, vowel length, syllabicity, phonation and release marks are never stripped to obtain an available base recording.
- Playback begins only after a click; files are not preloaded. Load timeout, media errors and rejected play promises show a retryable failure. Old request failures cannot override a newer selection.
- Sources, creators, licenses and recording context remain visible beside playback. No browser speech-synthesis fallback reads IPA as ordinary text.

## Download

Run `python3 scripts/build-ipa-pack.py` after a reviewed manifest/audio change. It verifies MP3 hashes and produces `public/audio/hanlingo-ipa-pack.zip` deterministically. Extract the entire ZIP and open `index.html` to use the included MP3 player offline. The archive includes the manifest, README, attribution/license links and every MP3. Locality UI links use the regular website audio paths; the offline player uses the manifest's file names.

## Acceptance

`npm test` checks file hashes and attribution, exact matching, marks and tone conventions, queue advancement, failure/retry, timeout, cancellation and stale requests. `npm run build` checks TypeScript and static publishing. Browser acceptance must additionally establish actual media loading/playback, switching sounds, route cancellation, the download, and a narrow viewport. Unit media doubles alone do not prove a browser can decode a recording.

## Version 2: three consonant demonstrations

Adds Peter Isotalo’s Commons recordings of [p], [m] and [ŋ] under their offered CC BY-SA 3.0 licence. Original Ogg SHA-1 values match the recorded Commons metadata. Each MP3 is converted with FFmpeg/libmp3lame quality3, without trimming or pitch shifting; the manifest records duration and SHA-256. The full source clips retain any supporting vowels and are not labelled as local syllables. [pʰ], syllabic [m̩] and other marked variants still require their own exact recordings; a base consonant never substitutes for them.

The earlier600-second source retry interval had elapsed by more than10,000seconds before this bounded retrieval. Retrieval stopped after a later HTTP429 on [f]; [f], [s] and [l] remain absent. [n] and [ɛ] remain held for the earlier description/hash discrepancies. Version2 therefore contains18 demonstrations, not a complete consonant inventory.

Sources: [bilabial plosive](https://commons.wikimedia.org/wiki/File:Voiceless_bilabial_plosive.ogg), [bilabial nasal](https://commons.wikimedia.org/wiki/File:Bilabial_nasal.ogg), [velar nasal](https://commons.wikimedia.org/wiki/File:Velar_nasal.ogg). Attribution, selected licence, original bytes’ hashes and conversion hashes remain in the distributed manifest and offline-pack credits.

## Version2.1: three more consonant demonstrations

After the earlier retry interval had long elapsed, a bounded three-file retrieval succeeded for [f], [s] and [l]. Every original Ogg matched its previously recorded source SHA1. The files are full recordings by Peter Isotalo under CC BY-SA3.0; source attribution, licence links and delivered MP3 SHA256 are in the manifest and downloadable pack. They were transcoded, never trimmed or pitch-shifted.

- [f]: [Voiceless labiodental fricative](https://commons.wikimedia.org/wiki/File:Voiceless_labiodental_fricative.ogg), demonstrated between two [a] vowels.
- [s]: [Voiceless alveolar sibilant](https://commons.wikimedia.org/wiki/File:Voiceless_alveolar_sibilant.ogg), source description gives [sa asa].
- [l]: [Alveolar lateral approximant](https://commons.wikimedia.org/wiki/File:Alveolar_lateral_approximant.ogg), demonstrated between two [a] vowels; the original file page was rechecked for author and licence.

The pack now contains21 general demonstrations:15 vowels and6 consonants. These clips do not become local word recordings, and their supporting vowels must not be removed or mistaken for lexical syllables. [n] and [ɛ] remain held; no disputed source was silently repaired.
