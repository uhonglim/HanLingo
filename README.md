# HanLingo

Learn Sinitic languages through useful words, pronunciation, and photographs of everyday culture. English is the interface language.

HanLingo begins with five groups—Mandarin 官, Min 閩, Yue 粵, Hakka 客, and Wu 吳—and a separate comparison with Modern Standard Written Chinese. Its reference library connects **5 group pages, 18 subgroup pages, and 33 locality pages** through interactive maps, classification paths, and sourced articles. This edition focuses on present-day geography and selected communities.

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
npm run audit:content  # Regenerate the branch and locality depth inventory
```

`preview` serves the production build locally; use the URL printed in the terminal. No API keys or backend services are required. Building or previewing the site does not deploy it.

## Explore the site

- Start learning in the [Amoy chapter](http://127.0.0.1:5173/min/southern-min/xiamen): sourced vocabulary, 11 credited photographs, and separate Words, Photos, Sounds, and Practice pages.
- Filter photographs by subject or related vocabulary, open full images, and browse with the arrow keys. Photo details include cultural context, credits, and words with IPA and trial spelling.
- Compare documented local word choices and pronunciations, including Amoy–Tsiang-tsiu–Tsuân-tsiu vowel and tone differences, Taiwan tomato and soap variants, and Singapore market terminology. Source romanizations stay separate from IPA and HanLingo spelling.
- Explore **27 attested IPA symbols and seven reference tone contours**. Selecting a sound or tone highlights it in matching sourced words; the collection is not a complete Xiamen sound inventory.
- Search or save words, follow photographs to related vocabulary, explore pitch contours and a tone-sandhi example, and complete short practice rounds. Saved words and learning progress stay in this browser.
- All 18 branches have learning packs. Group and branch overviews expose locally labelled words, sound notes, photo galleries, culture, and primary learning resources. See the reproducible [content depth audit](docs/CONTENT-DEPTH.md) for exact coverage and remaining lexical gaps.
- Min now has 17 locality entries, including 13 in Southern Min. Tsuan-Chiang includes six Taiwan locality references alongside Amoy, Tsuân-tsiu, Tsiang-tsiu, Sin-ka-pho, and Pho Te. Teo Swa separately contains Teochew and Swatow. Every mapped locality has a licensed photo gallery, with 9–11 distinct images. The tree labels the 泉漳 cluster **Tsuan-Chiang** and the flagship chapter **Amoy**; alternate names remain searchable.
- The homepage is the Han family tree. Open a group, then its subgroup and locality; the same tree stays in place as the adjacent content changes. The Min map remains available at `/min`.
- Follow a map point to a dedicated local article, or pan and zoom to compare reference places.
- Read group introductions with credited photographs, then follow the scholarly sources attached to individual articles.
- Compare the six supplied versions of a letter home in the reading room, with an English meaning guide.
- Visit the romanization workbench and the separate Modern Standard Written Chinese page.

| Route                                 | Content                                                |
| ------------------------------------- | ------------------------------------------------------ |
| `/`                                   | Han family tree and Xiamen learning entry              |
| `/:languageId`                        | Group article and regional overview                    |
| `/:languageId/:subgroupId`            | Subgroup article and related localities                |
| `/:languageId/:subgroupId/:varietyId` | Local-variety article and classification path          |
| `/compare`                            | Reading room and letter comparison                     |
| `/romanization`                       | Current romanization decisions and open questions      |
| `/written-chinese`                    | Modern Standard Written Chinese as a written reference |
| `/about`                              | Project scope, method, and credits                     |

`/min/southern-min/xiamen` opens the flagship learning chapter; append `/words`, `/culture`, `/sounds`, or `/practice` for its learning sections. Search and photograph selections have shareable URLs. The Amoy overview connects photographs to reveal-meaning practice cards and bookmarks. Other localities have photo galleries and evidence-backed Words, Sounds, and Practice sections where supported. Routes validate the complete classification path, so a known city placed under the wrong subgroup does not resolve as a valid reference page.

Navigation follows `/min` → `/min/southern-min` → `/min/southern-min/xiamen`, without a Languages layer or animated page transitions. Old `/languages/...` links redirect to the corresponding canonical path. The tree and content scroll independently, and browser Back restores the reading position. See [the navigation rules](AGENTS.md) and [navigation architecture](docs/NAVIGATION.md).

The application uses React Router’s browser history. The production build generates static entry points for valid deep routes, plus a sitemap and release manifest. HanLingo is published at [hanlingo.pairup.world](https://hanlingo.pairup.world/) through GitHub Pages. See [deployment instructions](docs/DEPLOYMENT.md) for the source-to-release verification procedure.

## Interface

The interface uses a white reading surface, sans-serif type, and a cobalt H mark. Navigation is compact; source credits and pronunciation detail remain visible without decorative labels or slogans. The SVG logo and favicon are documented in [the brand notes](docs/BRAND.md).

## Content principles

The five groups are a curated introduction, not an exhaustive classification of Sinitic. Navigation uses **group → subgroup → local variety**, with extra classification levels explained where needed: Min → Southern Min → Tsuan-Chiang → Amoy, for example. Scholarly schemes can differ; the articles identify relevant limits rather than treating every navigation level as a universally accepted taxonomic rank.

Modern Standard Written Chinese is a written reference, not a sixth spoken branch. The six letters are contributor-supplied examples awaiting linguistic and speaker review. They are not a verified dialect corpus, and the shared English text is a meaning guide rather than a word-by-word gloss. A Standard Mandarin sample is not presented as a transcription of local Beijing speech.

Pronunciation belongs in **IPA**. The developing HanLingo romanization is a separate notation. Accepted decisions include `p → [p]`, `ph → [pʰ]`, `b → [b]`, `ts / tsh → [t͡s] / [t͡sʰ]`, consistent aspiration marking, and separate pitch-contour numbers. Xiamen spellings are generated from the sourced IPA; unconfirmed extensions remain marked as trial. Citation tones and attested connected speech are distinguished. See [the romanization discussion record](docs/ROMANIZATION.md) and [Xiamen language sources](docs/XIAMEN-LANGUAGE-SOURCES.md). No full-letter IPA or audio has been invented.

Map points mark approximate reference localities, not exclusive language territories or survey boundaries. The selection does not cover every community or the full diaspora. Historical comparison remains future work and requires dated, place-specific evidence. Photographs illustrate identified places, performances, or events; they do not establish the identity or everyday language of people shown.

See [the editorial guide](docs/EDITORIAL.md) for classification decisions, source texts, and contribution standards. Each reference article has its own source links in `src/data/encyclopedia.ts`. Photograph authorship, licensing, and documented file adaptations are recorded in [the photography credits](docs/PHOTO-CREDITS.md).

## Project structure

```text
src/
  App.tsx                      Shared layout and page routes
  main.tsx                     React and BrowserRouter entry point
  routing.tsx                  Reference URLs and classification-path validation
  styles.css                   Shared visual styles
  pages/                       Family root, reading room, and learning pages
  components/LanguageTree.*    Persistent shared navigation tree
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

Tests cover the taxonomy, comparison letters, reference content, route integrity, Xiamen IPA-to-spelling conversion, photo assets and credits, and quiz generation. The 11 additional Xiamen photographs have their own [source and license register](docs/XIAMEN-PHOTOS.md). Use the commands above to check the current checkout.

Repository: [uhonglim/HanLingo](https://github.com/uhonglim/HanLingo). Project licensing is recorded in [LICENSE](LICENSE). The expanded gallery registers are [Min](docs/gallery-min-sources.md), [other groups](docs/gallery-other-sources.md), and [Teo Swa](docs/gallery-chaoshan-sources.md); lexical evidence is tracked in [regional word research](docs/regional-word-research.md). Photograph licenses apply independently of the code license; font license notices remain under `public/fonts/`.

## Translation service

`/compare` includes a six-way machine-translation interface. Run `npm run api` beside Vite after setting the server-only provider fields in `.env.local`. GitHub Pages needs a separately hosted API; a static deploy alone does not activate translation. See [the translation pipeline](docs/TRANSLATION-PIPELINE.md) for locality scope, setup, deployment and research precedents.
