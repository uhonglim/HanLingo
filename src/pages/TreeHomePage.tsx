import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown } from "lucide-react";
import { xiamenPhotos } from "../data/xiamen-photos";
import { xiamenWords } from "../data/xiamen-lexicon";
import { romanizeXiamen } from "../data/xiamen-romanization";
import "./TreeHomePage.css";

const xiamenPath = "/min/southern-min/xiamen";
const photo = xiamenPhotos.find(item => item.id === "gulangyu-rooftops") ?? xiamenPhotos[0];
const words = ["sea", "water", "boat"].flatMap(id => {
  const word = xiamenWords.find(item => item.id === id);
  return word ? [word] : [];
});

export default function TreeHomePage() {
  return (
    <div className="tree-home">
      <header className="thp-heading">
        <h1>Han languages <span lang="zh-Hans">汉</span></h1>
        <p>Mandarin, Min, Yue, Hakka, and Wu are the five language groups featured here, a selection from the wider Sinitic family.</p>
      </header>
      <section className="thp-xiamen" aria-labelledby="thp-xiamen-title">
        <div className="thp-entry-heading">
          <h2 id="thp-xiamen-title">Amoy <span lang="zh-Hant">廈門</span></h2>
          <Link className="thp-learn" to={xiamenPath}>Learn Amoy <ArrowRight size={17} aria-hidden="true" /></Link>
        </div>
        <div className="thp-entry-content">
          <figure className="thp-photo">
            <Link to={xiamenPath} aria-label="Open Amoy learning">
              <img src={photo.src} alt={photo.alt} width="1920" height="1440" fetchPriority="high" />
            </Link>
            <figcaption>
              <span>{photo.caption}{photo.year && ` ${photo.year}.`}</span>
              <span><a href={photo.sourceUrl} target="_blank" rel="noreferrer">{photo.author}</a>
                {" · "}<a href={photo.licenseUrl} target="_blank" rel="noreferrer">{photo.license}</a></span>
            </figcaption>
          </figure>
          <div className="thp-vocabulary">
            <table>
              <caption className="sr-only">Amoy words with citation tones</caption>
              <thead><tr><th scope="col">Word</th><th scope="col">Trial spelling</th><th scope="col">IPA</th></tr></thead>
              <tbody>
                {words.map(word => <tr key={word.id}>
                  <th scope="row"><span lang="zh-Hant">{word.han}</span><span>{word.english}</span></th>
                  <td>{romanizeXiamen(word.segments, word.tones)}</td>
                  <td>{word.ipa}</td>
                </tr>)}
              </tbody>
            </table>
            <details className="thp-sources">
              <summary>Word sources <ChevronDown size={14} aria-hidden="true" /></summary>
              <ul>{words.map(word => <li key={word.id}>
                <a href={word.sourceUrl} target="_blank" rel="noreferrer">{word.sourceLabel}</a>
              </li>)}</ul>
            </details>
          </div>
        </div>
        <Link className="thp-min-link" to="/min">Min language reference <ArrowRight size={16} aria-hidden="true" /></Link>
      </section>
    </div>
  );
}
