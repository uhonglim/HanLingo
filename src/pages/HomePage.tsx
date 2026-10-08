import { useState } from "react";
import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, GitBranch, Globe2 } from "lucide-react";
import AtlasMap from "../components/AtlasMap";
import { languages, mapPoints } from "../data/languages";
import { groupPhotos } from "../data/photography";

export function GroupBooks() {
  return (
    <div className="group-books">
      {languages.map((language, index) => {
        const photo = groupPhotos[language.id];
        return (
          <article
            key={language.id}
            className="group-book"
            style={{ "--group-color": language.color } as CSSProperties}
          >
            <Link className="group-book-link" to={`/languages/${language.id}`}>
              <div className="group-book-image">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  style={{ objectPosition: photo.position }}
                />
                <span className="group-book-glyph" lang="zh-Hant">
                  {language.shortName}
                </span>
              </div>
              <div className="group-book-content">
                <span className="book-number">CHAPTER 0{index + 1}</span>
                <h3>
                  {language.name}
                  <span lang="zh-Hant">{language.nativeName}</span>
                  <ArrowRight size={19} />
                </h3>
                <p>{language.feature}</p>
                <div className="book-contents">
                  {language.subgroups.length} subgroups<span>·</span>
                  {
                    mapPoints.filter((point) => point.groupId === language.id)
                      .length
                  }{" "}
                  local profiles
                </div>
              </div>
            </Link>
            <div className="group-photo-credit">
              <a href={photo.sourceUrl} target="_blank" rel="noreferrer">
                {photo.author}
              </a>
              <span>·</span>
              <a href={photo.licenseUrl} target="_blank" rel="noreferrer">
                {photo.license}
              </a>
            </div>
          </article>
        );
      })}
      <Link to="/written-chinese" className="group-book written-book">
        <span className="book-number">A DIFFERENT LAYER</span>
        <span className="written-book-glyph" lang="zh-Hant">
          文
        </span>
        <h3>The written language.</h3>
        <p>
          Explore Modern Standard Written Chinese alongside the many voices of
          everyday speech.
        </p>
        <span className="text-link">
          Open the written reference <ArrowRight size={16} />
        </span>
      </Link>
    </div>
  );
}

export default function HomePage() {
  const [pointId, setPointId] = useState("xiamen");
  const point = mapPoints.find((item) => item.id === pointId)!;
  const language = languages.find((item) => item.id === point.groupId)!;
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="small-line" />
            MANY VOICES. CONNECTED ROOTS.
          </div>
          <h1 id="hero-title">
            A shared script.
            <br />A world of
            <br />
            <em>voices.</em>
          </h1>
          <p className="hero-description">
            Travel through the Han language family.
            <br className="desktop-br" /> Discover the languages, the places,
            and the people behind a shared heritage.
          </p>
          <Link className="primary-button" to="/languages">
            Explore the language library <ArrowRight size={17} />
          </Link>
          <div className="hero-note">
            <span className="edition-dot" />A living atlas · Present-day edition
          </div>
        </div>
        <div className="hero-map" id="map">
          <div className="map-heading">
            <span>
              <Globe2 size={14} />
              LANGUAGE, IN PLACE
            </span>
            <span>EVERY PLACE HAS A STORY</span>
          </div>
          <AtlasMap
            points={mapPoints}
            selectedGroup={point.groupId}
            selectedPoint={point.id}
            onSelectPoint={setPointId}
          />
          <div
            className="map-selected"
            style={{ "--group-color": language.color } as CSSProperties}
          >
            <span className="map-selected-character" lang="zh-Hant">
              {language.shortName}
            </span>
            <div>
              <span className="mini-label">EXPLORE A LOCAL VOICE</span>
              <strong>
                {point.name}
                <span>{language.name}</span>
              </strong>
            </div>
            <Link
              to={`/languages/${point.groupId}/${point.subgroupId}/${point.id}`}
              aria-label={`Read about ${point.name}`}
            >
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
      <section className="home-library">
        <div className="section-heading">
          <div>
            <div className="eyebrow">THE LANGUAGE LIBRARY</div>
            <h2>Five doors. A world within each.</h2>
          </div>
          <Link to="/languages" className="text-link">
            Browse all varieties <ArrowRight size={16} />
          </Link>
        </div>
        <GroupBooks />
        <p className="photo-context-note">
          Photographs show documented places and cultural settings. Original
          sources and credits accompany each language chapter.
        </p>
      </section>
      <section className="depth-guide">
        <div>
          <div className="eyebrow">FOLLOW THE CONNECTIONS</div>
          <h2>
            Go a little deeper.
            <br />
            <em>Then deeper still.</em>
          </h2>
          <p>
            Start with a language group. Follow a regional branch, then meet a
            local variety through its places, sound patterns, written examples,
            and sources.
          </p>
        </div>
        <div className="depth-path">
          <Link to="/languages/min">
            <span className="depth-stage">01 / GROUP</span>
            <strong>
              Min <span lang="zh-Hant">閩語</span>
            </strong>
            <ArrowRight size={17} />
          </Link>
          <Link to="/languages/min/southern-min">
            <span className="depth-stage">02 / REGIONAL SUBGROUP</span>
            <strong>
              Southern Min <span lang="zh-Hant">閩南語</span>
            </strong>
            <ArrowRight size={17} />
          </Link>
          <div className="depth-cluster">
            <GitBranch size={13} />
            Via the Quanzhang cluster
          </div>
          <Link to="/languages/min/southern-min/xiamen">
            <span className="depth-stage">03 / LOCAL VARIETY</span>
            <strong>
              Xiamen <span lang="zh-Hant">廈門</span>
            </strong>
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>
      <section className="home-reading">
        <div className="home-letter-fragment" lang="zh-Hant">
          <span>阿母：</span>
          <p>
            我來遮已經一個禮拜矣，
            <br />
            食睏攏好，你毋免煩惱。
          </p>
          <small>廈門 · 閩南語</small>
        </div>
        <div>
          <div className="eyebrow">
            <BookOpen size={15} />
            THE READING ROOM
          </div>
          <h2>
            The same feeling.
            <br />
            <em>Different words.</em>
          </h2>
          <p>
            A letter home, written in five local voices. Read them side by side,
            with a shared English meaning and a formal written reference.
          </p>
          <Link to="/compare" className="text-link">
            Read a letter home <ArrowRight size={16} />
          </Link>
        </div>
      </section>
      <div className="home-scope">
        <p>
          <strong>A growing reference, not a finished inventory.</strong> These
          five groups are an introduction to the larger Sinitic branch of
          Sino-Tibetan. Each chapter makes its scope and sources visible.
        </p>
        <Link to="/about" className="text-link">
          How we build the atlas <ArrowRight size={15} />
        </Link>
      </div>
    </>
  );
}
