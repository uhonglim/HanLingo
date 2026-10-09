import PlaceName from "../components/PlaceName";
import { atlasBranches, atlasLocalities } from "../data/atlas";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { languages, type LanguageId } from "../data/languages";
import { learningPlaces } from "../data/learning/places";
import { getLocalGallery } from "../data/galleries";
import { groupPhotos } from "../data/photography";
import { getLocalLearning, spellingFor } from "../data/learning";
import { varietyPath } from "../routing";
import Pronunciation from "../components/Pronunciation";
import "./TreeHomePage.css";

const selections: Partial<Record<LanguageId, { locality: string; word: string; scene: string }>> = {
  mandarin: { locality: "beijing-city", word: "beijing-city-ipa-eight", scene: "A Chengdu teahouse" },
  min: { locality: "xiamen", word: "xiamen-water", scene: "An Amoy shopping street" },
  yue: { locality: "guangzhou", word: "guangzhou-ding-heart", scene: "Backstage in Canton" },
  hakka: { locality: "meixian", word: "meixian-tea", scene: "The Tung Blossom Festival" },
  wu: { locality: "shanghai", word: "shanghai-cuhk-31859", scene: "Suzhou Pingtan performers" },
};

const entries = languages.map((group) => {
  const selection = selections[group.id];
  const candidates = learningPlaces.filter(place => place.groupId === group.id);
  const point = candidates.find(place => place.id === selection?.locality)
    ?? candidates.find(place => getLocalLearning(place).words.length > 0)
    ?? candidates[0];
  const words = point ? getLocalLearning(point).words : [];
  const everyday = ['water', 'rice', 'tea', 'house', 'person', 'fish'];
  const word = words.find(item => item.id === selection?.word)
    ?? everyday.map(meaning => words.find(item => item.english.toLowerCase() === meaning && spellingFor(item))).find(Boolean)
    ?? words.find(item => spellingFor(item));
  const photo = groupPhotos[group.id] ?? (point ? getLocalGallery(point.id)[0] : undefined)
    ?? candidates.flatMap(place => getLocalGallery(place.id))[0];
  return { group, point, word, scene: selection?.scene, photo };
});

export default function TreeHomePage() {
  return (
    <div className="tree-home">
      <header className="thp-heading">
        <h1>Han languages,<br /><span>place by place.</span></h1>
        <div className="thp-introduction">
          <p>Learn the words. Explore the sounds.{" "}<br />Meet the cultures behind them.</p>
          <p className="thp-coverage">{atlasBranches.length} branches · {atlasLocalities.length} locality references</p>
        </div>
      </header>

      <section className="thp-collection" aria-label="Language groups and regional collections">
        {entries.map(({ group, point, word, scene, photo }, index) => (
          <article className="thp-group" key={group.id}>
            <Link to={`/${group.id}`} className="thp-group-photo" aria-label={`Explore ${group.name}`}>
              {photo && <img src={photo.src} alt={photo.alt} style={{ objectPosition: photo.position }}
                width="480" height="640" fetchPriority={index < 2 ? "high" : "auto"} />}
              <span className="thp-photo-name" lang="zh-Hant">{group.nativeName}</span>
              <ArrowUpRight size={20} aria-hidden="true" />
            </Link>
            <div className="thp-group-heading">
              <h2><Link to={`/${group.id}`}>{group.name}</Link></h2>
              <p>{atlasBranches.filter(branch => branch.groupId === group.id).length} branches · {atlasLocalities.filter(place => place.groupId === group.id).length} places</p>
            </div>
            <p className="thp-geography">{group.collectionKind === "geographic" && <strong>Geographic collection. </strong>}{group.feature}</p>
            {point && word && <div className="thp-word">
              <Link className="thp-locality" to={`${varietyPath(point)}/words`}><PlaceName point={point}/> <ArrowUpRight size={13} aria-hidden="true" /></Link>
              <div className="thp-word-meaning"><span lang="zh-Hant">{word.han}</span><span>{word.english}</span></div>
              <Pronunciation ipa={word.ipa} spelling={spellingFor(word)} toneNotation={word.toneNotation} />
              <p className="thp-reading">{word.registerLabel ?? word.reading}</p>
            </div>}
            {(word || photo) && <details className="thp-evidence">
              <summary>Reading &amp; photo sources</summary>
              {word && <><p>{word.note}</p>
              <a href={word.source.url} target="_blank" rel="noreferrer">{word.source.title}</a></>}
              {photo && <><p>{scene && <strong>{scene}. </strong>}{photo.caption}</p>
              <p><a href={photo.sourceUrl} target="_blank" rel="noreferrer">{photo.author}</a>{" · "}<a href={photo.licenseUrl} target="_blank" rel="noreferrer">{photo.license}</a></p></>}
            </details>}
          </article>
        ))}
      </section>
      <p className="thp-context">Explore Sinitic language groups and separately labelled regional collections. Each reading belongs to a specific locality and source. <Link to="/romanization">How IPA becomes HanLingo spelling <ArrowUpRight size={13} aria-hidden="true" /></Link></p>
    </div>
  );
}
