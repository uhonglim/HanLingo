import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import MinPage from "./MinPage";
import { languages, mapPoints } from "../data/languages";
import { groupPhotos } from "../data/photography";

export function GroupBooks() {
  return (
    <div className="group-books">
      {languages.map((language) => {
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
        <span className="written-book-glyph" lang="zh-Hant">
          文
        </span>
        <h3>Standard written Chinese</h3>

        <span className="text-link">
          Open the written reference <ArrowRight size={16} />
        </span>
      </Link>
    </div>
  );
}

export default function HomePage() {
  return <MinPage />;
}
