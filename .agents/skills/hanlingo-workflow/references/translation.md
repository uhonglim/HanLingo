# Six-way translation

Use for `/compare`, `ReadingRoom.tsx`, or server/model work. Read current `docs/TRANSLATION-PIPELINE.md`, `.env.example` and server code before changes.

## Target and contract

Exactly six outputs: `amoy`, `beijing`, `shanghai`, `guangzhou`, `meixian`, `written`. These mean contemporary Amoy Southern Min, Beijing speech, urban Shanghai Wu, Guangzhou Cantonese, Meixian Hakka and modern Standard Written Chinese. Written Chinese is a register, not a sixth spoken locality.

One input/source selector and one Translate/Cancel action feed six equal result areas. Do not bill a model call on every keystroke. Keep the original sample-letter comparison separate and collapsible; legacy `?left=...&right=...&english=1` links must still work. Keep source text intact on failure. Cancel or invalidate requests after edits; stale responses must never overwrite newer input.

## Implemented pipeline

Input validation → locality-filtered lexical retrieval → one six-target JSON generation call → a separate review call against the ORIGINAL → deterministic validation → visible machine drafts.

- Source selection: auto, English or a target variety/register. Current cap: 800 characters.
- Grounding: `server/evidence.json`, built from current locality records by `npm run build:translation-evidence`. It is a small lexical reference, not a parallel sentence corpus. Guangzhou’s lack of reusable local readings is not filled with Hong Kong entries.
- Review: a fresh context, optionally a different model. Check meaning, omissions/additions, numbers, names, negation and local wording. A second model is not a native-speaker certificate.
- Validate exactly six unique targets, bounded strings and statuses `draft`, `needs-review`, `unavailable`. Strip extra model fields. Keep earlier unresolved warnings even when the reviewer omits them. Compare complete numeral tokens/counts, not substring matches (`23` is not preserved by `123`).
- Failed review may return clearly flagged initial drafts. Failed generation returns an honest error. Never use the old sample as a fake translation response.
- No generated IPA, HanLingo spelling, audio or promotion into trusted learning material. Human locality-competent review is needed before publication as reference data.

## Runtime and verification

`npm run api` runs Node on `127.0.0.1:8788`; Vite proxies both API paths. `GET /api/translation/status` reports configuration presence only. `POST /api/translate` accepts `{text,source}`. Server provider selection, URL and credentials are not client-controlled.

Provider variables are server-only in ignored `.env.local`: `HANLINGO_MODEL_BASE_URL`, `HANLINGO_MODEL_API_KEY`, `HANLINGO_MODEL`, optional `HANLINGO_REVIEW_MODEL`. Use a JSON-mode-compatible general model. For hybrid Qwen, inspect current docs and `HANLINGO_DISABLE_THINKING`. The specialised Qwen-MT interface is **not** a drop-in substitute for this system-message, six-result JSON pipeline.

GitHub Pages cannot run Node. A hosted HTTPS API/reverse proxy and server secrets are required for public translation. `VITE_TRANSLATION_API_BASE` may contain only the public API URL. Never send credentials to the browser or ask for them in chat. Configuration presence, fixture tests and a static deployment do not prove real model execution or dialect quality.

Keep body size/deadline, request timeout, cancellation, concurrency and quota controls. An abort controller alone does not end a stalled request-body iterator: terminate incomplete uploads and release capacity. Do not log source text, model responses or credentials. Public hosting needs appropriate gateway quotas; do not blindly trust forwarded IP headers.

Run server protocol tests plus browser checks for all six results, malformed/partial output, unavailable provider, cancellation and stale responses. Perform a real configured-provider request before claiming the feature works; use exact-locality human evaluation before claiming linguistic accuracy.

## Research leads already checked

- Qwen-MT: terminology/domain/translation-memory concepts; not verified coverage of all requested localities.
- FLORES-WU (WMT 2024): translation plus independent human review, but **Chongming/Shadi**, not urban Shanghai.
- ROCLING 2022 Mandarin–Hakka MT: Taiwan Northern/Southern **Sixian**, not Meixian.
- Xiamen University Hokkien synthesis: lexical mapping and Xiamen-accent synthesis, not a verified general paragraph-translation API.
- Beijing speech databases distinguish local vernacular from local Putonghua.

Primary links and scope details are in `docs/TRANSLATION-PIPELINE.md`. Reverify API/model specifications online before choosing a provider. Do not import datasets without checking locality and reuse terms.
