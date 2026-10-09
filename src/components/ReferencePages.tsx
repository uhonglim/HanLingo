import { getBranchLearning, getLocalLearning } from "../data/learning";
import BranchLearning from "./BranchLearning";
import LocalityScenes from "./LocalityScenes";
import RegionalDifferences from "./RegionalDifferences";
import { branchDepth, localityDepth } from "../data/content-depth";
import { getLocalGallery } from "../data/galleries";
import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, BookOpen, MapPin } from "lucide-react";
import { languages, letters, mapPoints } from "../data/languages";
import { placeLabel, clusterLabel } from "../data/language-names";
import {
  groupArticles,
  subgroupArticles,
  varietyArticles,
} from "../data/encyclopedia";
import { groupPhotos } from "../data/photography";
import { minCommunityPhotos } from "../data/min-community-photos";
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
  const englishName = entry?.facts.find(
    (fact) => fact.label === "English name",
  )?.value;
  const mapAnchor = entry?.facts.find(
    (fact) => fact.label === "Map anchor",
  )?.value;
  const referenceFacts =
    entry?.facts.filter(
      (fact) =>
        ![
          "Group",
          "Branch",
          "Cluster",
          "Entry type",
          "English name",
          "Map anchor",
        ].includes(fact.label),
    ) ?? [];
  const localCluster =
    point && point.hierarchy.length > 4 ? point.hierarchy[3] : undefined;
  const learningPhoto = point
    ? getLocalLearning(point).culture.find((item) => item.photo)?.photo
    : group && subgroup
      ? getBranchLearning(group.id, subgroup.id)?.culture.find(
          (item) => item.photo,
        )?.photo
      : undefined;
  const photo =
    (point
      ? (getLocalGallery(point.id)[0] ?? minCommunityPhotos[point.id])
      : group && route?.level === "group"
        ? groupPhotos[group.id]
        : undefined) ?? learningPhoto;
  const localLetter =
    point && ["xiamen", "guangzhou", "meixian", "shanghai"].includes(point.id)
      ? letters.find((letter) => letter.id === point.groupId)
      : undefined;
  const localPoints = group
    ? mapPoints.filter(
        (place) =>
          place.groupId === group.id &&
          (!subgroup || place.subgroupId === subgroup.id) &&
          (!localCluster || place.hierarchy[3] === localCluster),
      )
    : [];
  const childSubgroups = group && !subgroup ? group.subgroups : [];

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
              <h1>{point ? placeLabel(point) : entry.title}</h1>
              <span className="reference-native-title" lang="zh-Hant">
                {point?.nativeName ?? subgroup?.nativeName ?? group.nativeName}
              </span>
            </div>
            {englishName && (
              <p className="reference-english-name">{englishName}</p>
            )}
            <p className="reference-dek">{entry.dek}</p>
            <div className="reference-geography">
              <MapPin size={14} />
              <span>
                {point
                  ? localCluster
                    ? clusterLabel(localCluster)
                    : subgroup?.name
                  : subgroup
                    ? `${localPoints.map(placeLabel).join(" · ")}`
                    : group.geography}
              </span>
            </div>
          </header>

          {point && <LocalityScenes key={point.id} point={point} />}
          {photo && !point && (
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

          {!point && (
            <section className="reference-explore" id="reference-explore">
              <div className="reference-section-heading">
                <div>
                  <h2>{subgroup ? "Localities" : "Branches"}</h2>
                </div>
                <span>
                  {subgroup
                    ? `${localPoints.length} ${localPoints.length === 1 ? "locality" : "localities"}`
                    : `${childSubgroups.length} branches`}
                </span>
              </div>
              <div className="reference-child-grid">
                {childSubgroups.map((child) => {
                  return (
                    <Link
                      to={subgroupPath(group.id, child.id)}
                      className="reference-child-card"
                      key={child.id}
                    >
                      {(() => {
                        const representative = mapPoints.find(
                          (place) =>
                            place.groupId === group.id &&
                            place.subgroupId === child.id,
                        );
                        const image =
                          representative &&
                          getLocalGallery(representative.id)[0];
                        return (
                          image && (
                            <>
                              <img
                                className="reference-child-photo"
                                src={image.src}
                                alt={image.alt}
                                loading="lazy"
                              />
                              <span className="reference-child-credit">
                                {image.author} · {image.license}
                              </span>
                            </>
                          )
                        );
                      })()}
                      <h3>
                        {placeLabel(child)}
                        <span className="reference-child-native" lang="zh-Hant">
                          {child.nativeName}
                        </span>
                      </h3>
                      <p>{child.description}</p>
                      <p className="reference-content-count">
                        {(() => {
                          const depth = branchDepth(group.id, child.id);
                          return `${depth.localities} ${depth.localities === 1 ? "locality" : "localities"} · ${depth.words ? `${depth.words} ${depth.words === 1 ? "word" : "words"} · ` : ""}${depth.photos} photos`;
                        })()}
                      </p>
                    </Link>
                  );
                })}
                {subgroup &&
                  localPoints.map((child) => (
                    <Link
                      to={varietyPath(child)}
                      className="reference-child-card"
                      key={child.id}
                    >
                      {getLocalGallery(child.id)[0] && (
                        <>
                          <img
                            className="reference-child-photo"
                            src={getLocalGallery(child.id)[0].src}
                            alt={getLocalGallery(child.id)[0].alt}
                            loading="lazy"
                          />
                          <span className="reference-child-credit">
                            {getLocalGallery(child.id)[0].author} ·{" "}
                            {getLocalGallery(child.id)[0].license}
                          </span>
                        </>
                      )}
                      <h3>
                        {placeLabel(child)}
                        <span className="reference-child-native" lang="zh-Hant">
                          {child.nativeName}
                        </span>
                      </h3>
                      <p>
                        {varietyArticles[child.id]?.dek ??
                          child.hierarchy.join(" · ")}
                      </p>
                      <p className="reference-content-count">
                        {(() => {
                          const depth = localityDepth(child.id);
                          return `${depth.words ? `${depth.words} ${depth.words === 1 ? "word" : "words"} · ` : ""}${depth.photos} photos`;
                        })()}
                      </p>
                    </Link>
                  ))}
              </div>
              <p className="reference-curation-note">
                Selected localities; this is not a complete classification.
              </p>
            </section>
          )}

          <BranchLearning
            groupId={group.id}
            subgroupId={subgroup?.id}
            point={point}
            heroPhotoSrc={photo?.src}
          />

          {point && (
            <RegionalDifferences key={point.id} localityId={point.id} />
          )}

          <details className="reference-language-notes">
            <summary>Language notes</summary>
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
            </div>
          </details>

          <section className="reference-map-section" id="reference-map">
            <div className="reference-section-heading">
              <div>
                <h2>{point ? `${placeLabel(point)} on the map` : "Map"}</h2>
              </div>
            </div>
            <div className="reference-map-frame">
              <AtlasMap
                points={localPoints}
                selectedGroup={group.id}
                selectedPoint={point?.id ?? null}
                onSelectPoint={(id) => {
                  const selected = mapPoints.find((place) => place.id === id);
                  if (selected && selected.id !== point?.id)
                    navigate(varietyPath(selected));
                }}
                compact
              />
            </div>
            <p className="reference-curation-note">
              {mapAnchor ??
                "Map markers locate reference places, not dialect boundaries."}
            </p>
          </section>

          {localLetter && (
            <section className="reference-local-letter" id="reference-letter">
              <div className="reference-section-heading">
                <div>
                  <h2>Letter</h2>
                </div>
                <label className="reference-translation-toggle">
                  <input
                    type="checkbox"
                    checked={showEnglish}
                    onChange={(event) => setShowEnglish(event.target.checked)}
                  />
                  English meaning
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
                    <span className="reference-kicker">English meaning</span>
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
                Compare letters
                <ArrowRight size={15} />
              </Link>
            </section>
          )}

          <section className="reference-sources" id="reference-sources">
            <div>
              <BookOpen size={17} />
              <h2>Sources</h2>
            </div>
            {referenceFacts.length > 0 && (
              <details className="reference-notes" key={entry.title}>
                <summary>Reference notes</summary>
                <dl>
                  {referenceFacts.map((fact) => (
                    <div key={fact.label}>
                      <dt>{fact.label}</dt>
                      <dd>{fact.value}</dd>
                    </div>
                  ))}
                </dl>
              </details>
            )}
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
        </article>
      )}
    </div>
  );
}
