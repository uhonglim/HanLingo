import type { CitationToneInventory } from "../data/learning/tone-types";
import { displayIpa, PitchTrace } from "./Pronunciation";
import "./SourceToneInventory.css";

export default function SourceToneInventory({ inventory }: { inventory: CitationToneInventory }) {
  return (
    <article className="source-tone-inventory" aria-label={`${inventory.sourcePlaceName} citation tones`}>
      <header>
        <h3>Citation tones · <span lang="zh">{inventory.sourcePlaceName}</span></h3>
        <p>1 is low. 5 is high. Compare the source’s tone categories.</p>
      </header>
      <dl className="source-tone-grid">
        {inventory.tones.map(tone => (
          <div key={tone.category}>
            <dt lang="zh">{tone.category}</dt>
            <dd><PitchTrace contour={tone.contour} /><strong>{tone.contour}</strong><span className="source-tone-ipa">{displayIpa(tone.contour, "pitch-contour")}</span></dd>
          </div>
        ))}
      </dl>
      <p className="source-tone-note">{inventory.note}</p>
      <a className="learning-source" href={inventory.source.url} target="_blank" rel="noreferrer">
        {inventory.source.title} · p. {inventory.source.page}, table {inventory.source.table}
      </a>
    </article>
  );
}
