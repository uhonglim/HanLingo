# Dated session handoff — 2026-10-09

This is a recovery pointer, not current truth. Refresh Git, browser, API configuration and release metadata before making claims.

## Established work

- React/Vite/TypeScript HanLingo with five-group persistent tree and direct hierarchical routes, maps, photo galleries, local learning chapters, shared IPA rendering and romanization.
- The content audit recorded 18 branches, 33 localities, 461 IPA entries (24 explicitly without tones), 32 additional source-spelling entries and 327 photos. All mapped places had two learning/sound notes, two cultural topics and two useful sources, but vocabulary depth remained uneven.
- Five branches lacked an IPA collection: Southwestern Mandarin, Central Min, Siyi Yue, Tingzhou Hakka and Chuqu Wu. Other locality-level gaps are in `docs/CONTENT-DEPTH.md`. Counts are not learning-quality scores or proof of completeness.
- Romanization now has four worked examples for each group, a grouped selector, full working key and coverage inventory. It then included 437 pitch-documented readings: 350 mapped and 87 unresolved.
- Shared spelling decisions: p/ph/b, ts/tsh, ch/chh, h for aspiration and pitch-contour numbers. Wider inventory still provisional. Public-figure example removed; use everyday language examples.

## Last verified release and newer source

- Frontend release source `2dcf8e8f39e943204fce6c27e61040ed32a53270` was verified on HTTPS after GitHub Pages run `37850728618` succeeded. It included the all-five-group Romanization page.
- Later source commit `7b5af31` added the six-way translation interface, server pipeline, evidence builder and tests on `codex/hanlingo-atlas`. It was pushed but **not deployed as a functioning translation service**.
- At that point 103 frontend tests and 10 Node server tests passed; the build and local mobile/desktop failure-state checks passed. Injected server fixtures do not validate model translation quality.

## Unfinished work

No model provider/key was configured. The user had not answered the choice between Alibaba Cloud/Qwen, another OpenAI-compatible provider, or a local model. Alibaba Cloud was recommended, not selected or authorized as a new billed service. `/api/translation/status` returned `configured:false`.

The next actual translation step requires a selected provider with server-side credentials, a real generation/review test, and a hosted API for public use. Existing GitHub Pages hosting cannot execute Node. Do not assume processes remain alive, credentials now exist, tests still pass, or that a later static publish enabled translation.

## Source of these rules

User’s HanLingo session requests established: present-day geography first; comparable locality leaves; community-language naming over blanket Pinyin; precise sourced differences; simple stable navigation; no filler/extra buttons; immersive similarly sized galleries; IPA plus separate shared spelling; all-five-group Romanization; six-way translation with Meixian as the narrower reference. The user asked for speed and parallel agents during this session, but that does not create ongoing resource, model-reset, publication or messaging authority in other tasks.
