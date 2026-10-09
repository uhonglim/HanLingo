import { languageNameGlossary } from '../data/language-names';

export default function LanguageNameNotes() {
  return <details className="atlas-reference-notes language-name-notes">
    <summary>Min, Hokkien and the names used here</summary>
    <dl>{languageNameGlossary.map(item => <div key={item.id}>
      <dt>{item.term}</dt><dd>{item.text}{' '}<a href={item.source.url} target="_blank" rel="noreferrer">Source</a></dd>
    </div>)}</dl>
  </details>;
}
