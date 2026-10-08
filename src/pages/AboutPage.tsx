import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
export default function AboutPage() {
  const [sourcesOpen, setSourcesOpen] = useState(true);
  return (
    <div className="about-page">
      <div className="page-breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <span>About the atlas</span>
      </div>
      <header className="page-intro">
        <div className="eyebrow">HOW WE BUILD HANLINGO</div>
        <h1>
          An atlas with
          <br />
          <em>room to grow.</em>
        </h1>
        <p>
          Language lives in people, places, and everyday words. HanLingo
          connects them through a growing, English-language reference to the
          Sinitic languages.
        </p>
      </header>
      <section className="editorial-notes" aria-label="About this edition">
        <div className="edition-number">
          FIELD NOTES <span>NO. 001</span>
        </div>
        <div>
          <h3>Start with place. Make room for time.</h3>
          <p>
            This first edition explores present-day varieties. A future
            historical layer will need dated, place-specific evidence—so that
            “Hakka 200 years ago” becomes a documented story, not a guess.
          </p>
        </div>
        <button
          className="text-link sources-button"
          aria-expanded={sourcesOpen}
          aria-controls="source-list"
          onClick={() => setSourcesOpen(!sourcesOpen)}
        >
          Sources & editorial notes
          <ChevronDown size={16} className={sourcesOpen ? "rotate" : ""} />
        </button>
      </section>
      {sourcesOpen && (
        <section
          className="sources-panel"
          id="source-list"
          aria-label="Sources and editorial notes"
        >
          <h3>Built to be explored. Open to correction.</h3>
          <p>
            The atlas is an educational selection. Language and dialect labels
            reflect different scholarly and community traditions; the tree is a
            navigation aid, not a claim that all levels have equal linguistic
            distance.
          </p>
          <ul>
            <li>
              <a
                href="https://xiaoxue.iis.sinica.edu.tw/Minyu/Content/Files/minyu-Get_Started.pdf"
                target="_blank"
                rel="noreferrer"
              >
                Academia Sinica · Min language resource guide
              </a>{" "}
              — Min, Southern Min, Quanzhang, and local varieties.
            </li>
            <li>
              <a
                href="https://doi.org/10.1017/S0025100324000203"
                target="_blank"
                rel="noreferrer"
              >
                Journal of the International Phonetic Association · Zhongjiang
                Chinese
              </a>{" "}
              — Southwestern Mandarin, with comparison to Chengdu.
            </li>
            <li>
              <a
                href="https://www.internationalphoneticassociation.org/content/ipa-chart"
                target="_blank"
                rel="noreferrer"
              >
                International Phonetic Association · Official IPA chart
              </a>{" "}
              — the reference for phonetic symbols.
            </li>
            <li>
              <a
                href="https://www.naturalearthdata.com/"
                target="_blank"
                rel="noreferrer"
              >
                Natural Earth
              </a>{" "}
              — public-domain basemap, distributed by World Atlas.
            </li>
          </ul>
          <p>
            All six letters were supplied by the project founder. Spoken
            examples await local-speaker review; no audio or full-letter IPA has
            been inferred. City coordinates are representative points and do not
            describe the extent of a language community. Further classification
            references are recorded in the project’s{" "}
            <a
              href="https://github.com/uhonglim/HanLingo/blob/codex/hanlingo-atlas/docs/EDITORIAL.md"
              target="_blank"
              rel="noreferrer"
            >
              editorial notes
            </a>
            .
          </p>
        </section>
      )}
      <section className="about-photo-note">
        <h2>People, places, and photographs.</h2>
        <p>
          Photographs show documented settings, activities, and communities. A
          photograph cannot establish what language a person speaks. Every
          photograph carries its original source, creator, and reuse license.
        </p>
        <p>
          Every group, subgroup, and local-variety page has its own address.
          Maps show representative places; the articles explain why a city name
          is not a claim that everyone there speaks the same way.
        </p>
      </section>
    </div>
  );
}
