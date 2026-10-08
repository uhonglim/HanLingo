# HanLingo

An English-language introduction to the Sinitic languages, explored through places, local varieties, and a shared letter home.

HanLingo begins with five groups—Mandarin 官, Min 閩, Yue 粵, Hakka 客, and Wu 吳—and a separate comparison with Modern Standard Written Chinese. Its reference library connects **5 group pages, 18 subgroup pages, and 23 local-variety pages** through interactive maps, classification paths, and sourced articles. This edition focuses on present-day geography and selected communities.

## Run locally

Install Node.js and npm, then run:

```sh
npm install
npm run dev
```

Open **[http://127.0.0.1:5173](http://127.0.0.1:5173)**. Use this exact IPv4 address: `localhost` can resolve to IPv6 and reach a different local application. Vite binds HanLingo to `127.0.0.1`; check its terminal output if port 5173 is already occupied.

```sh
npm test        # Run the Vitest suite
npm run build  # Type-check and generate the production bundle in dist/
npm run preview
```

`preview` serves the production build locally; use the URL printed in the terminal. No API keys or backend services are required. Building or previewing the site does not deploy it.

## Explore the site

- Start with the homepage, then browse the language library by group, subgroup, and locality.
- Follow a map point to a dedicated local article, or pan and zoom to compare reference places.
- Read group introductions with credited photographs, then follow the scholarly sources attached to individual articles.
- Compare the six supplied versions of a letter home in the reading room, with an English meaning guide.
- Visit the romanization workbench and the separate Modern Standard Written Chinese page.

| Route | Content |
| --- | --- |
| `/` | Introduction and featured groups |
| `/languages` | Language library |
| `/languages/:languageId` | Group article and regional overview |
| `/languages/:languageId/:subgroupId` | Subgroup article and related localities |
| `/languages/:languageId/:subgroupId/:varietyId` | Local-variety article and classification path |
| `/compare` | Reading room and letter comparison |
| `/romanization` | Current romanization decisions and open questions |
| `/written-chinese` | Modern Standard Written Chinese as a written reference |
| `/about` | Project scope, method, and credits |

For example, `/languages/min/southern-min/xiamen` opens the Xiamen article. Routes validate the complete classification path, so a known city placed under the wrong subgroup does not resolve as a valid reference page.

The application uses React Router’s browser history. Vite supports development navigation and direct page refreshes. A future production host must **rewrite application routes to `index.html` while serving asset files normally**, so opening or refreshing a deep URL works. This repository does not establish a production deployment.

## Content principles

The five groups are a curated introduction, not an exhaustive classification of Sinitic. Navigation uses **group → subgroup → local variety**, with extra classification levels explained where needed: Min → Southern Min → Quanzhang cluster → Xiamen, for example. Scholarly schemes can differ; the articles identify relevant limits rather than treating every navigation level as a universally accepted taxonomic rank.

Modern Standard Written Chinese is a written reference, not a sixth spoken branch. The six letters are contributor-supplied examples awaiting linguistic and speaker review. They are not a verified dialect corpus, and the shared English text is a meaning guide rather than a word-by-word gloss. A Standard Mandarin sample is not presented as a transcription of local Beijing speech.

Pronunciation belongs in **IPA**. The developing HanLingo romanization is a separate notation. Accepted decisions include `p → [p]`, `ph → [pʰ]`, and `b → [b]`, consistent aspiration marking, and separate pitch-contour numbers; the complete inventory and transcription conventions remain unfinished. See [the romanization discussion record](docs/ROMANIZATION.md) for the current decisions, candidate mappings, and sourced examples. No full-letter IPA or audio has been invented.

Map points mark approximate reference localities, not exclusive language territories or survey boundaries. The selection does not cover every community or the full diaspora. Historical comparison remains future work and requires dated, place-specific evidence. Photographs illustrate identified places, performances, or events; they do not establish the identity or everyday language of people shown.

See [the editorial guide](docs/EDITORIAL.md) for classification decisions, source texts, and contribution standards. Each reference article has its own source links in `src/data/encyclopedia.ts`. Photograph authorship, licensing, and documented file adaptations are recorded in [the photography credits](docs/PHOTO-CREDITS.md).

## Project structure

```text
src/
  App.tsx                      Shared layout and page routes
  main.tsx                     React and BrowserRouter entry point
  routing.tsx                  Reference URLs and classification-path validation
  styles.css                   Shared visual styles
  pages/                       Homepage, library, reading room, and supporting pages
  components/AtlasMap.*        Interactive geographic map
  components/ReferencePages.*  Group, subgroup, and locality article views
  data/languages.ts            Groups, subgroups, map points, and letters
  data/encyclopedia.ts         Sourced reference articles, facts, and reading times
  data/photography.ts          Photograph captions, credits, and license links
  data/east-asia-50m.json       Bundled regional map geometry
public/
  fonts/                       Bundled fonts and their license notices
  images/                      Locally hosted licensed photographs
scripts/
  build-atlas.mjs              Regenerate the regional map dataset
docs/
  EDITORIAL.md                 Content policy, evidence, and source texts
  ROMANIZATION.md              Accepted decisions and unresolved design questions
  PHOTO-CREDITS.md             Photograph sources, licenses, and adaptations
```

Built with React, TypeScript, Vite, and React Router. The SVG atlas uses D3 Geo and TopoJSON with a regional extract of the Natural Earth 1:50m geometry distributed by `world-atlas`. After installing dependencies, regenerate that extract with:

```sh
node scripts/build-atlas.mjs
```

Tests cover the taxonomy, comparison letters, reference content, and route integrity. Use the commands above to check the current checkout.

Repository: [uhonglim/HanLingo](https://github.com/uhonglim/HanLingo). Project licensing is recorded in [LICENSE](LICENSE). Photograph licenses apply independently of the code license; font license notices remain under `public/fonts/`.
