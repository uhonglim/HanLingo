---
name: hanlingo-workflow
description: Build, audit, expand, or release HanLingo (uhonglim/HanLingo), including its language tree, regional names, sourced IPA and vocabulary, photo galleries, shared romanization, and six-way translation. Use automatically for HanLingo work; keep these project-specific decisions separate from PairUp.
---

# HanLingo workflow

Help people learn Han languages and encounter their regional cultures through substantial, sourced material and a clear interface. This skill captures Alan’s decisions from the HanLingo building session through 2026-10-09. Current user instructions and current project rules take precedence.

## Start with current state

- Locate the actual HanLingo checkout. The original path is `/Users/alan/Documents/ChatGPT/HanLingo`; repository is `uhonglim/HanLingo`. Read its `AGENTS.md`, inspect working-tree changes, and preserve unrelated work. Do not apply PairUp account/login or production rules to this separate website.
- Read only the references relevant to the task:
  - UI, tree, naming, maps, or logo: [product and navigation](references/product.md).
  - Content, galleries, IPA, local differences, or romanization: [language evidence](references/language.md).
  - Compare, automatic translation, API, or provider setup: [translation](references/translation.md).
  - Verification, localhost, GitHub, or deployment: [operations](references/operations.md).
  - Continuing this exact session: [dated handoff](references/handoff.md), then verify live state. Its counts and release status are not permanent facts.
- Use `scripts/check_project.py --repo <checkout>` for a read-only local status summary. `--verify` additionally runs the project’s tests and build. The script never installs dependencies, publishes, changes DNS, or prints credentials.

## Product invariants

- Present-day geography first. Historical stages require dated, place-specific evidence and are outside the initial scope.
- Five top-level tree groups: Mandarin, Min, Yue, Hakka, Wu. Standard Written Chinese is a shared register, not a sixth spoken group.
- Prefer comparable geographic levels, precise linguistic scope, then documented community-language names. Do not collapse Min, Southern Min, Hokkien, and Hoklo into synonyms.
- Keep English interface text concise. Teach through photos, actual language, and useful comparisons; remove filler and redundant controls, while retaining evidence qualifications.
- Preserve the persistent tree and four classification levels (group → branch → cluster → locality), with lessons below localities and compatibility redirects for old paths. No `/languages/` wrapper, duplicate navigation, or animated page jumps.
- IPA is the phonetic reference. HanLingo spelling is a separate, partly provisional notation. Generated translations are not pronunciation evidence.
- An incomplete sourced collection is preferable to false precision. Expose real gaps; do not inflate depth with duplicate photos, repeated prose, or neighbouring accents.

## Execution and acceptance

Continue authorized implementation through the checks needed for that change. Resolve routine design choices using the project’s conventions. Ask only for missing information that materially blocks the requested work, such as an unavailable model provider or backend credentials; complete independent work meanwhile.

When parallel agents are authorized, give them non-overlapping data/UI/backend ownership and use a separate review pass for consequential language or API changes. Do not turn this session’s request for speed into permanent permission to spawn agents, spend model credits, redeem reset cards, or publish unrelated changes.

Verify behavior as well as compilation: direct nested routes, persistent navigation, desktop/mobile layout, real IPA glyphs, gallery controls, search, and request failure/cancellation as relevant. Report code completion, tests, local acceptance, source push, deployed artifact, and verified release as distinct states. A fixture response is not a live model translation.

## Maintaining this skill

The versioned source is `.agents/skills/hanlingo-workflow/` in the HanLingo repository. Its installed copy is `~/.codex/skills/hanlingo-workflow/`. Keep the copies in sync when explicitly updating this skill. Automatic invocation is enabled in `agents/openai.yaml`; the repository `AGENTS.md` also routes future HanLingo work here. This is reusable task guidance, not a scheduled background job or new authorization.
