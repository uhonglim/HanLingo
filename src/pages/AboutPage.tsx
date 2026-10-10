import { siteTerms } from "../data/site-terms";

export default function AboutPage() {
  return (
    <div className="about-page">
      <header className="page-intro">
        <h1>{siteTerms.about}</h1>
      </header>
      <section className="editorial-notes" aria-label="Scope">
        <div>
          <h2>Scope</h2>
          <p>
            HanLingo brings together present-day Han languages, local words,
            pronunciation, and culture. The tree follows groups, branches,
            clusters, and localities; these levels describe relationships, not
            equal degrees of difference or mutual intelligibility.
          </p>
        </div>
      </section>
      <section
        className="sources-panel"
        id="source-list"
        aria-label="Sources and method"
      >
        <h2>Sources and method</h2>
        <p>
          Pronunciation uses IPA alongside trial HanLingo spelling. Each
          learning entry identifies its source and locality. Map markers locate
          places; they do not mark language boundaries.
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
            · Min classification and locality records.
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
            · Southwestern Mandarin, with comparison to Chengdu.
          </li>
          <li>
            <a
              href="https://www.internationalphoneticassociation.org/content/ipa-chart"
              target="_blank"
              rel="noreferrer"
            >
              International Phonetic Association · Official IPA chart
            </a>{" "}
            · Phonetic symbols.
          </li>
          <li>
            <a
              href="https://www.naturalearthdata.com/"
              target="_blank"
              rel="noreferrer"
            >
              Natural Earth
            </a>{" "}
            · Public-domain basemap, distributed by World Atlas.
          </li>
        </ul>
        <p>
          The six comparison letters are contributor-supplied. The five spoken
          versions await local-speaker review and have no full-letter IPA or
          audio. Further classification references appear in the{" "}
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
      <section className="about-photo-note">
        <h2>{siteTerms.sections.photos}</h2>
        <p>
          Each photograph includes its source, creator, and reuse license.
          Photos document places and culture; they do not establish which
          language a person speaks.
        </p>
      </section>
    </div>
  );
}
