import { Link } from "react-router-dom";
import { letters } from "../data/languages";
import { siteTerms } from "../data/site-terms";

export default function WrittenChinesePage() {
  const letter = letters.find((item) => item.id === "formal")!;
  return (
    <div className="written-page">
      <header className="written-page-hero">
        <div>
          <h1>{siteTerms.writtenChinese}</h1>
        </div>
      </header>
      <div className="written-page-grid">
        <article className="written-essay">
          <h2>Writing across communities</h2>
          <p>
            Standard Written Chinese is used in education, public information,
            and correspondence. Its vocabulary and grammar are closely
            associated with vernacular Mandarin. It is a shared written form,
            not a sixth spoken group alongside Mandarin, Min, Yue, Hakka, and
            Wu.
          </p>
          <h2>Characters and pronunciation</h2>
          <p>
            A shared character can have different pronunciations across
            languages. Local writing can also use different words, characters,
            and sentence patterns to express the same meaning. Compare the
            letters to see these differences in context.
          </p>
          <h2>Formal is a style</h2>
          <p>
            This letter uses formal wording. Standard Written Chinese can also
            be casual, intimate, literary, or technical. The five
            spoken-language letters use conversational wording, so the
            comparison shows differences in both language and style.
          </p>
          <Link to="/compare?left=min&right=formal" className="text-link">
            Compare with Amoy
          </Link>
          <div className="written-sources">
            <h3>Sources</h3>
            <a
              href="https://www.cambridge.org/core/books/abs/modern-chinese/dialect-writing/F9D387397BA417BD49B98FD63B540F67"
              target="_blank"
              rel="noreferrer"
            >
              Ping Chen · Modern Chinese: Dialect writing
            </a>
          </div>
        </article>
        <aside className="formal-letter">
          <h2>A letter home</h2>
          <div className="letter-body" lang="zh-Hant">
            <p className="salutation">{letter.salutation}</p>
            {letter.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <p className="letter-closing">{letter.closing}</p>
          </div>
          <p className="letter-footnote">Contributor-supplied · formal style</p>
        </aside>
      </div>
    </div>
  );
}
