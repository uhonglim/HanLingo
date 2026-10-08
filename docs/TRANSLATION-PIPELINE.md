# Six-way translation

The Compare page accepts up to 800 characters and produces parallel machine drafts for Amoy, Beijing speech, Shanghai Wu, Guangzhou Cantonese, Meixian Hakka, and modern Standard Written Chinese. The last target is a register, not a spoken locality. Meixian is the reference variety; Meizhou names the wider region.

## Implemented flow

1. Validate the source selection and input length. The server accepts text, never a client-supplied model, prompt, credential or provider URL.
2. Retrieve up to eight relevant records per target from the existing locality data. Each keeps its source, reading scope and qualification. This is a small lexical grounding collection, not a parallel sentence corpus. Guangzhou currently has no reusable local wordbank; Hong Kong data is not substituted.
3. One JSON-mode model call drafts all six versions from the same original input. Target profiles distinguish Beijing vernacular from Standard Mandarin, urban Shanghai from Chongming, Amoy from Taiwan, and Meixian from Taiwan Sixian.
4. A separate model call reviews the original, retrieved records and drafts for omissions, additions, names, numbers, negation and locality drift. It uses a separate context and optionally a distinct review model. This is automated review, not human verification.
5. Validate exactly six unique targets, bounded text and allowed statuses. Missing source numerals trigger a review flag; this is a conservative warning because a numeral may legitimately be written in characters. A failed review returns clearly flagged initial drafts. A failed generation returns an error.
6. Render text safely in six equal cards. Never create IPA, HanLingo spelling or audio from these generated translations. The existing user-supplied sample letter remains a separate, clearly labelled comparison.

No input, output, credential or model response is written to application logs. Text is sent to the configured provider and is subject to its data handling policy. No translation is persisted into the site's learning data. Browser edits/cancellation abort the request; already incurred provider usage may still be charged.

## Local setup

Requires Node 22.12+ or a current supported Node release.

```sh
cp .env.example .env.local
# Set server-only provider configuration in .env.local using a local editor.
npm run api
# In another terminal:
npm run dev
```

`HANLINGO_MODEL_BASE_URL` is an OpenAI-compatible `/v1` base URL; requests append `/chat/completions`. Set `HANLINGO_MODEL_API_KEY` and a JSON-mode-capable `HANLINGO_MODEL`. `HANLINGO_REVIEW_MODEL` optionally selects another model at the same provider. For a local compatible service that does not require credentials, use a non-secret placeholder in the API key field.

For Alibaba Cloud, use the workspace/region-compatible endpoint supplied by the console and a general text-generation model supporting JSON Object mode. Hybrid Qwen models may require `HANLINGO_DISABLE_THINKING=true`. **Do not select Qwen-MT for this endpoint:** its specialised request interface does not support these system messages or this multi-target JSON/review workflow.

Vite proxies `/api/translate` and `/api/translation/status` to port 8788. No provider key is sent to the browser. Status reports configuration presence, not successful model authentication. A real model request remains necessary to verify credentials, compatibility, latency and translation quality.

```sh
npm run build:translation-evidence
npm test
npm run build
```

The evidence builder is deterministic and preserves exact locality ownership. Commit `server/evidence.json` after an intentional data refresh. Protocol/integration tests use explicitly injected fixtures; they are not evidence that any model produces accurate dialect translations.

## Deployment

GitHub Pages cannot execute this server. Deploy `server/` with Node on a separate HTTPS backend or an approved reverse proxy. Set its secrets server-side and set `HANLINGO_ALLOWED_ORIGINS=https://hanlingo.pairup.world` (plus explicitly needed local origins). Use `HANLINGO_API_HOST=0.0.0.0` only inside the intended hosted service. Bind to a private interface behind the gateway when possible.

Set the frontend's **public URL only** in `VITE_TRANSLATION_API_BASE` before building. Never put credentials in a `VITE_` variable. For same-origin reverse-proxy hosting, leave it empty. The API includes bounded requests, timeouts, two concurrent requests and ten requests per minute per socket IP. A public gateway needs its own quota and abuse controls; forwarded IP headers are deliberately not trusted by this server. Account for both model calls in provider usage limits.

Until a backend and provider are connected, the UI reports that automatic translation is unavailable; it does not replay the sample letter as a fabricated translation. Publishing the static UI alone does not enable translation.

## Research precedents and scope limits

- [Alibaba Cloud Qwen-MT](https://www.alibabacloud.com/help/en/model-studio/machine-translation): terminology, domain prompts and translation memory are useful precedents. Its Cantonese support is not evidence of accuracy for these five exact local varieties. Qwen-MT is not used by this implementation.
- [Qwen structured output](https://www.alibabacloud.com/help/en/model-studio/qwen-structured-output): JSON Object mode requires a JSON instruction and does not guarantee our six-target schema; local validation is still necessary.
- [FLORES-WU, WMT 2024](https://aclanthology.org/2024.wmt-1.47/): separate translators and reviewer; the dataset targets Chongming/Shadi Wu, not urban Shanghai. No benchmark text has been imported.
- [Taiwan Mandarin–Hakka MT, ROCLING 2022](https://aclanthology.org/2022.rocling-1.38/): Northern/Southern Sixian need separate handling. Its output cannot be relabelled Meixian.
- [Xiamen University Hokkien synthesis](https://jxmu.xmu.edu.cn/upload/html/20200612.html): Xiamen-accent synthesis and lexical mapping, not an available general translation API.
- [BLCU Beijing speech database](https://news.blcu.edu.cn/info/1011/5310.htm): Beijing local speech and local Putonghua are distinct research categories.
- [Guangzhou University AI-DimSum](https://lncaa.gzhu.edu.cn/info/1085/2631.htm): corpus and model work, not a verified six-target production API.
- [Meixian phonetics thesis](https://lbms03.cityu.edu.hk/theses/c_ftt/phd-ctl-b40860632f.pdf): narrower Meijiang speaker evidence, not a general Meizhou translation corpus.

Before treating output as reference material, obtain review by speakers competent in the stated locality. Evaluate held-out sentences for meaning preservation and local naturalness separately. A successful JSON response and a second model call establish neither.
