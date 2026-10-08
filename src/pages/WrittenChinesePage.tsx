import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { letters } from "../data/languages";
export default function WrittenChinesePage() {
  const letter = letters.find((item) => item.id === "formal")!;
  return (
    <div className="written-page">
      <header className="written-page-hero">
        <div>
          <h1>Modern Standard Written Chinese</h1>
        </div>
      </header>
      <div className="written-page-grid">
        <article className="written-essay">
          <h2>Written reference</h2>
          <p>
            Modern Standard Written Chinese serves as a written reference
            alongside the five spoken groups, rather than as a sixth spoken
            branch. It is used in school materials, public information, and
            personal correspondence.
          </p>
          <p>
            Its vocabulary and grammar are closely associated with vernacular
            Mandarin, but the relationship between a text and a reader’s speech
            is not one-to-one. A person can read a shared text while speaking a
            local language with different everyday words and constructions.
          </p>
          <h2>Characters and pronunciation</h2>
          <p>
            Characters can connect texts across communities, but identical
            characters need not have identical pronunciations. Conversely, local
            writing may use different words or characters to express the same
            meaning. The letters in our reading room make some of these choices
            visible.
          </p>
          <p>
            The HanLingo samples also differ in register. The written reference
            uses more formal wording, while the five spoken-language samples use
            conversational wording. Their vocabulary, sentence structure, and
            tone of address differ.
          </p>
          <h2>The supplied letter</h2>
          <p>
            The letter here is the founder’s supplied formal version. It is
            preserved as a comparison text, not a rule that all written Chinese
            must sound formal. Modern written Chinese can be intimate, casual,
            literary, or technical.
          </p>
          <Link to="/compare?left=min&right=formal" className="text-link">
            Compare with Amoy <ArrowRight size={16} />
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
            <a
              href="https://assets.cambridge.org/97805216/52728/sample/9780521652728ws.pdf"
              target="_blank"
              rel="noreferrer"
            >
              Modern Chinese · Introductory overview
            </a>
          </div>
        </article>
        <aside className="formal-letter">
          <h2>Formal letter</h2>
          <div className="letter-body" lang="zh-Hant">
            <p className="salutation">{letter.salutation}</p>
            {letter.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <p className="letter-closing">{letter.closing}</p>
          </div>
          <p className="letter-footnote">
            Contributor-supplied text · preserved for comparison
          </p>
        </aside>
      </div>
    </div>
  );
}
