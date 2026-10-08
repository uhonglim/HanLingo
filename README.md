# HanLingo

An English-language introduction to the Sinitic languages, explored through places, local varieties, and a shared letter home.

HanLingo begins with five groups—Mandarin 官, Min 閩, Yue 粵, Hakka 客, and Wu 吳—and a separate comparison with Modern Standard Written Chinese. Interactive maps connect the broad groups to selected subgroups and local varieties. This first edition focuses on present-day geography.

## Run locally

Install Node.js and npm, then run:

```sh
npm install
npm run dev
```

Open [http://127.0.0.1:5173](http://127.0.0.1:5173). The development server binds to the local machine.

```sh
npm test        # Run the Vitest suite
npm run build  # Type-check and generate the production bundle in dist/
npm run preview
```

`preview` serves the production build locally; use the URL printed in the terminal. No API keys or backend services are required.

## The experience

- Explore the five featured groups and their selected regional subgroups.
- Select a locality on the map, pan, zoom, and follow its classification path.
- Compare all six supplied versions of a letter home, with an English meaning guide.
- Read the distinction between IPA pronunciation and HanLingo’s proposed romanization.

## Content principles

The five groups are a curated introduction, not an exhaustive classification of Sinitic. The navigation uses **group → subgroup → local variety**, with extra levels where needed: Min → Southern Min → Quanzhang cluster → Xiamen, for example.

Modern Standard Written Chinese is a written reference, not a sixth spoken branch. The six letters are contributor-supplied examples awaiting linguistic and speaker review. They are not a verified dialect corpus, and the shared English text is a meaning guide rather than a word-by-word gloss.

Pronunciation belongs in **IPA**. The proposed spellings `p`, `ph`, and `b` illustrate a possible distinction between `[p]`, `[pʰ]`, and `[b]`; they do not constitute a finalized romanization system. No full-letter IPA or audio has been invented.

Map points mark approximate reference localities, not exclusive language territories or survey boundaries. The current selection does not cover every community or the full diaspora. Historical comparison remains future work and requires dated, place-specific evidence.

See [the editorial guide](docs/EDITORIAL.md) for the source register, classification decisions, original letters, and requirements for future contributions.

## Project structure

```text
src/
  App.tsx                 Page layout and interactions
  main.tsx                React entry point
  styles.css              Shared visual styles
  components/AtlasMap.*   Interactive geographic map
  data/languages.ts       Groups, subgroups, map points, and letters
public/
  fonts/                  Bundled fonts and their license notices
docs/
  EDITORIAL.md            Content policy, evidence, and source texts
```

Built with React, TypeScript, and Vite. The SVG atlas uses D3 Geo, TopoJSON, and the `world-atlas` geographic dataset.

Repository: [uhonglim/HanLingo](https://github.com/uhonglim/HanLingo). Project licensing is recorded in [LICENSE](LICENSE); font license notices are retained under `public/fonts/`.
