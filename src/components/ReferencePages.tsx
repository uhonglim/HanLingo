import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, BookOpen, MapPin } from "lucide-react";
import { languages, letters, mapPoints } from "../data/languages";
import {
  groupArticles,
  subgroupArticles,
  varietyArticles,
} from "../data/encyclopedia";
import { groupPhotos } from "../data/photography";
import {
  groupPath,
  resolveReferenceRoute,
  subgroupPath,
  varietyPath,
} from "../routing";
import AtlasMap from "./AtlasMap";
import "./ReferencePages.css";

export default function ReferencePage() {
  const params = useParams<{
    languageId: string;
    subgroupId: string;
    varietyId: string;
  }>();
  const navigate = useNavigate();
  const route = resolveReferenceRoute(params);
  const [showEnglish, setShowEnglish] = useState(false);
  const entry = route?.point
    ? varietyArticles[route.point.id]
    : route?.subgroup
      ? subgroupArticles[`${route.language.id}/${route.subgroup.id}`]
      : route
        ? groupArticles[route.language.id]
        : undefined;

  useEffect(() => {
    setShowEnglish(false);
  }, [entry?.title, params.languageId, params.subgroupId, params.varietyId]);

  const group = route?.language;
  const point = route?.point;
  const subgroup = route?.subgroup;
  const photo =
    group && route?.level === "group" ? groupPhotos[group.id] : undefined;
  const localLetter =
    point && ["xiamen", "guangzhou", "meixian", "shanghai"].includes(point.id)
      ? letters.find((letter) => letter.id === point.groupId)
      : undefined;
  const localPoints = group
    ? mapPoints.filter(
        (place) =>
          place.groupId === group.id &&
          (!subgroup || place.subgroupId === subgroup.id),
      )
    : [];
  const childSubgroups = group && !subgroup ? group.subgroups : [];
  const relatedPoints = point
    ? mapPoints.filter(
        (place) =>
          place.groupId === point.groupId &&
          place.subgroupId === point.subgroupId &&
          place.id !== point.id,
      )
    : [];

  return (
    <div
      className="reference-layout"
      style={{ "--reference-color": "#2155f5" } as CSSProperties}
    >
      {!route || !entry || !group ? (
        <div className="reference-not-found">
          <h1>Entry not found</h1>
          <div className="reference-recovery-links">
            {languages.map((language) => (
              <Link key={language.id} to={groupPath(language.id)}>
                <span lang="zh-Hant">{language.shortName}</span>
                {language.name}
                <ArrowRight size={16} />
              </Link>
            ))}
          </div>
          <Link className="reference-back" to="/">
            <ArrowLeft size={14} />
            Return to HanLingo
          </Link>
        </div>
      ) : (
        <article className="reference-entry">
          <header
            className={`reference-entry-header${photo ? " has-photo" : ""}`}
          >
            <div className="reference-title-row">
              <h1>{entry.title}</h1>
              <span className="reference-native-title" lang="zh-Hant">
                {point?.nativeName ?? subgroup?.nativeName ?? group.nativeName}
              </span>
            </div>
            <p className="reference-dek">{entry.dek}</p>
            <div className="reference-geography">
              <MapPin size={14} />
              <span>
                {point
                  ? `${point.name} · ${subgroup?.name} · ${group.name}`
                  : subgroup
                    ? `${subgroup.places.join(" · ")} · selected places`
                    : group.geography}
              </span>
            </div>
          </header>

          {photo && (
            <figure className="reference-hero-photo">
              <img
                src={photo.src}
                alt={photo.alt}
                style={{ objectPosition: photo.position ?? "center" }}
                fetchPriority="high"
              />
              <figcaption>
                <span>{photo.caption}</span>
                <span>
                  <a href={photo.sourceUrl} target="_blank" rel="noreferrer">
                    {photo.author}
                  </a>{" "}
                  ·{" "}
                  <a href={photo.licenseUrl} target="_blank" rel="noreferrer">
                    {photo.license}
                  </a>
                </span>
              </figcaption>
            </figure>
          )}

          <div className="reference-reading-layout">
            <div className="reference-prose">
              {entry.sections.map((section, index) => (
                <section key={section.heading} id={`entry-section-${index}`}>
                  <h2>{section.heading}</h2>
                  {section.paragraphs.map((paragraph, paragraphIndex) => (
                    <p key={paragraphIndex}>{paragraph}</p>
                  ))}
                </section>
              ))}
            </div>
            <aside className="reference-entry-rail">
              <div className="reference-contents">
                <nav aria-label="On this page">
                  {entry.sections.map((section, index) => (
                    <a href={`#entry-section-${index}`} key={section.heading}>
                      {section.heading}
                    </a>
                  ))}
                  {(childSubgroups.length > 0 || !point) && (
                    <a href="#reference-explore">
                      {subgroup ? "Local varieties" : "Explore the branches"}
                    </a>
                  )}
                  <a href="#reference-map">On the map</a>
                  {localLetter && (
                    <a href="#reference-letter">A letter in local speech</a>
                  )}
                  <a href="#reference-sources">Sources & further reading</a>
                </nav>
              </div>
              <dl className="reference-facts">
                {entry.facts.map((fact) => (
                  <div key={fact.label}>
                    <dt>{fact.label}</dt>
                    <dd>{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </aside>
          </div>

          {!point && (
            <section className="reference-explore" id="reference-explore">
              <div className="reference-section-heading">
                <div>
                  <h2>{subgroup ? "Local varieties" : "Branches"}</h2>
                </div>
                <span>
                  {subgroup
                    ? `${localPoints.length} selected ${localPoints.length === 1 ? "place" : "places"}`
                    : `${childSubgroups.length} selected branches`}
                </span>
              </div>
              <div className="reference-child-grid">
                {childSubgroups.map((child, index) => {
                  const childPoints = mapPoints.filter(
                    (place) =>
                      place.groupId === group.id &&
                      place.subgroupId === child.id,
                  );
                  return (
                    <Link
                      to={subgroupPath(group.id, child.id)}
                      className="reference-child-card"
                      key={child.id}
                    >
                      <span className="reference-child-index">
                        {String(index + 1).padStart(2, "0")}
                        <span lang="zh-Hant">{child.nativeName}</span>
                      </span>
                      <h3>{child.name}</h3>
                      <p>{child.description}</p>
                      <span className="reference-child-footer">
                        {childPoints.length}{" "}
                        {childPoints.length === 1
                          ? "local variety"
                          : "local varieties"}
                        <ArrowRight size={17} />
                      </span>
                    </Link>
                  );
                })}
                {subgroup &&
                  localPoints.map((child, index) => (
                    <Link
                      to={varietyPath(child)}
                      className="reference-child-card"
                      key={child.id}
                    >
                      <span className="reference-child-index">
                        {String(index + 1).padStart(2, "0")}
                        <span lang="zh-Hant">{child.nativeName}</span>
                      </span>
                      <h3>{child.name}</h3>
                      <p>
                        {varietyArticles[child.id]?.dek ??
                          child.hierarchy.join(" · ")}
                      </p>
                      <span className="reference-child-footer">
                        Read the local guide
                        <ArrowRight size={17} />
                      </span>
                    </Link>
                  ))}
              </div>
              <p className="reference-curation-note">
                These pages offer selected routes into {group.name}. They are an
                introduction to its diversity, rather than an exhaustive
                classification.
              </p>
            </section>
          )}

          <section className="reference-map-section" id="reference-map">
            <div className="reference-section-heading">
              <div>
                <h2>{point ? `${point.name} on the map` : "Map"}</h2>
              </div>
            </div>
            <div className="reference-map-frame">
              <AtlasMap
                points={localPoints}
                selectedGroup={group.id}
                selectedPoint={point?.id ?? null}
                onSelectPoint={(id) => {
                  const selected = mapPoints.find((place) => place.id === id);
                  if (selected) navigate(varietyPath(selected));
                }}
                compact
              />
            </div>
            <p className="reference-curation-note">
              Points locate representative cities, not exclusive language
              territories. Communities and varieties extend beyond these places.
            </p>
          </section>

          {localLetter && (
            <section className="reference-local-letter" id="reference-letter">
              <div className="reference-section-heading">
                <div>
                  <h2>Letter example</h2>
                </div>
                <label className="reference-translation-toggle">
                  <input
                    type="checkbox"
                    checked={showEnglish}
                    onChange={(event) => setShowEnglish(event.target.checked)}
                  />
                  Show the shared English meaning
                </label>
              </div>
              <div
                className={`reference-letter-columns${showEnglish ? " with-translation" : ""}`}
              >
                <div className="reference-letter-chinese" lang="zh-Hant">
                  <p>{localLetter.salutation}</p>
                  {localLetter.paragraphs.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                  <p>{localLetter.closing}</p>
                </div>
                {showEnglish && (
                  <div className="reference-letter-english">
                    <span className="reference-kicker">
                      SHARED MEANING · ENGLISH
                    </span>
                    <p>Mom,</p>
                    {localLetter.english.map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                    <p>Your son, who misses you.</p>
                  </div>
                )}
              </div>
              <p className="reference-letter-note">
                {localLetter.note}. This written sample does not supply a
                verified pronunciation recording or IPA transcription.
              </p>
              <Link
                className="reference-inline-link"
                to={`/compare?left=${group.id}&right=formal`}
              >
                Compare this letter across the family
                <ArrowRight size={15} />
              </Link>
            </section>
          )}

          <section className="reference-sources" id="reference-sources">
            <div>
              <BookOpen size={17} />
              <h2>Sources & further reading</h2>
            </div>
            <ol>
              {entry.sources.map((source, index) => (
                <li key={`${source.url}-${index}`}>
                  <a href={source.url} target="_blank" rel="noreferrer">
                    {source.title}
                  </a>
                  <span>
                    {new URL(source.url).hostname.replace(/^www\./, "")}
                  </span>
                </li>
              ))}
            </ol>
          </section>

          {point && (
            <section className="reference-continue">
              <h2>
                {relatedPoints.length ? "Nearby varieties" : "Related branches"}
              </h2>
              <div className="reference-continue-links">
                {relatedPoints.map((place) => (
                  <Link key={place.id} to={varietyPath(place)}>
                    <span>
                      <small>{subgroup?.name}</small>
                      {place.name}
                      <span lang="zh-Hant">{place.nativeName}</span>
                    </span>
                    <ArrowRight size={18} />
                  </Link>
                ))}
                <Link to={subgroupPath(group.id, subgroup!.id)}>
                  <span>
                    <small>Regional branch</small>
                    {subgroup?.name}
                  </span>
                  <ArrowRight size={18} />
                </Link>
              </div>
            </section>
          )}
          <footer className="reference-entry-footer">
            <span>HanLingo field guide · Present-day edition</span>
            <Link to={route.level === "group" ? "/" : groupPath(group.id)}>
              <ArrowLeft size={13} />
              {route.level === "group"
                ? "Back to the atlas"
                : `All about ${group.name}`}
            </Link>
          </footer>
        </article>
      )}
    </div>
  );
}
