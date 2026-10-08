# Local work, verification and release

Original repository: `/Users/alan/Documents/ChatGPT/HanLingo`, remote `https://github.com/uhonglim/HanLingo.git`. Verify the actual checkout and branch before acting. The session used `codex/hanlingo-atlas`; this is a historical working branch, not a requirement for all future tasks. Preserve dirty/unrelated work and stage explicit files.

## Commands and acceptance

- `npm run dev`: Vite at `http://127.0.0.1:5173/`.
- `npm run api`: translation backend at port 8788; requires configured provider for actual generation.
- `npm test`: frontend/data tests plus Node translation protocol tests in the current package scripts.
- `npm run build`: TypeScript and production build, including direct-route static entry points.
- `npm run audit:content`: regenerates tracked depth inventory when language data changes.
- `npm run build:translation-evidence`: regenerates locality-scoped server grounding when relevant vocabulary changes.

Use the available browser tool for desktop/mobile interaction. Check deep routes, search, tree toggle symmetry, Back behavior, broken images/credits, actual IPA rendering, converter errors, gallery keyboard controls, and API failures according to the change. Run tests appropriate to the affected behavior; do not invent extra approval gates or repeat unchanged checks without reason.

Use `scripts/check_project.py --repo <checkout>` for current local metadata. `--verify` runs the current test/build scripts only after verifying the package is HanLingo. It does not establish live release or provider readiness.

## Publishing when authorized

Public frontend: `https://hanlingo.pairup.world/`. GitHub Pages serves `gh-pages` artifacts. DNS was configured in Aliyun with `hanlingo` CNAME to `uhonglim.github.io`; do not reconfigure DNS for routine code changes. Keep `public/CNAME`, `.nojekyll`, `release.json`, direct-route entry points, compatibility redirects and HTTPS.

Read current `docs/DEPLOYMENT.md` and `scripts/publish-pages.mjs`. From a clean committed source checkout: push the source, then use the existing `npm run deploy`. It builds and publishes from a temporary artifact checkout, without merging the source branch. Do not bypass its clean-tree guard or force-push.

An HTTPS push stalled with default chunked transfer during this session. If the same transport problem occurs, the confirmed per-command workaround was:

```sh
GIT_CONFIG_COUNT=2 GIT_CONFIG_KEY_0=http.postBuffer GIT_CONFIG_VALUE_0=524288000 GIT_CONFIG_KEY_1=http.version GIT_CONFIG_VALUE_1=HTTP/1.1 npm run deploy
```

The same environment can wrap `git push origin <actual-branch>`. Do not turn it into global Git configuration or repeatedly retry an unknown publication outcome; inspect remote/source/artifact state first.

Release proof: identify the artifact SHA → corresponding GitHub Pages run succeeds → HTTPS `release.json` matches intended source SHA → changed page/interaction works in a real browser. A push, HTTP 200, build or static-page count alone is not proof. Save a useful screenshot when showing the result.

Automatic translation needs an independently deployed backend. Publishing the static Compare page does not start a model service. A skill’s automatic selection is not permission to publish, change DNS, spend credits or redeem a reset. Use actual task/session authorization.
