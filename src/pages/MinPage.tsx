import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin } from "lucide-react";
import AtlasMap from "../components/AtlasMap";
import { languages, mapPoints } from "../data/languages";
import { minSources } from "../data/min-sources";
import { groupPhotos } from "../data/photography";
import { xiamenPhotos } from "../data/xiamen-photos";
import { xiamenWords } from "../data/xiamen-lexicon";
import { subgroupPath, varietyPath } from "../routing";
import "./MinPage.css";

const min = languages.find((language) => language.id === "min")!;
const places = mapPoints.filter((point) => point.groupId === "min");
const xiamen = places.find((point) => point.id === "xiamen")!;
const xiamenPath = varietyPath(xiamen);
const streetPhoto = groupPhotos.min;
const photoStories = ["shacha-noodles", "gulangyu-lane"].map((id) =>
  xiamenPhotos.find((photo) => photo.id === id)!,
);

type CreditedPhoto = {
  caption: string;
  author: string;
  sourceUrl: string;
  license: string;
  licenseUrl: string;
};

function Credit({ photo }: { photo: CreditedPhoto }) {
  return (
    <figcaption className="min-photo-credit">
      <span>{photo.caption}</span>
      <span>
        <a href={photo.sourceUrl} target="_blank" rel="noreferrer">
          {photo.author}
        </a>
        {" · "}
        <a href={photo.licenseUrl} target="_blank" rel="noreferrer">
          {photo.license}
        </a>
      </span>
    </figcaption>
  );
}

export default function MinPage() {
  const [branch, setBranch] = useState("all");
  const [selectedId, setSelectedId] = useState("xiamen");
  const visiblePlaces =
    branch === "all"
      ? places
      : places.filter((point) => point.subgroupId === branch);
  const selected =
    visiblePlaces.find((point) => point.id === selectedId) ?? visiblePlaces[0];
  const selectedBranch = min.subgroups.find(
    (subgroup) => subgroup.id === selected.subgroupId,
  )!;

  function changeBranch(id: string) {
    setBranch(id);
    const nextPlaces =
      id === "all" ? places : places.filter((point) => point.subgroupId === id);
    if (!nextPlaces.some((point) => point.id === selectedId)) {
      setSelectedId(nextPlaces[0].id);
    }
  }

  return (
    <div className="min-hub">
      <div className="min-content">
        <header className="min-heading">
          <h1>
            Min <span lang="zh-Hant">閩語</span>
          </h1>
          <p>
            Min includes several distinct branches rooted in Fujian. Xiamen
            belongs to Southern Min; Fuzhou belongs to Eastern Min.
          </p>
        </header>

        <section className="min-feature" aria-labelledby="min-xiamen-title">
          <figure className="min-feature-photo">
            <Link to={xiamenPath} aria-label="Open the Xiamen learning chapter">
              <img
                src={streetPhoto.src}
                alt={streetPhoto.alt}
                style={{ objectPosition: streetPhoto.position }}
                fetchPriority="high"
                width="1600"
                height="1067"
              />
            </Link>
            <Credit photo={streetPhoto} />
          </figure>
          <div className="min-feature-content">
            <p className="min-feature-location">Southern Min · Quanzhang</p>
            <h2 id="min-xiamen-title">
              Xiamen <span lang="zh-Hant">廈門</span>
            </h2>
            <Link className="min-primary-link" to={xiamenPath}>
              Learn Xiamen <ArrowRight size={18} />
            </Link>
            <ul className="min-chapter-links">
              <li>
                <Link to={`${xiamenPath}/words`}>
                  <span>{xiamenWords.length} words</span>
                  <ArrowRight size={17} />
                </Link>
              </li>
              <li>
                <Link to={`${xiamenPath}/sounds`}>
                  <span>Pronunciation & tones</span>
                  <ArrowRight size={17} />
                </Link>
              </li>
              <li>
                <Link to={`${xiamenPath}/culture`}>
                  <span>{xiamenPhotos.length} photographs</span>
                  <ArrowRight size={17} />
                </Link>
              </li>
              <li>
                <Link to={`${xiamenPath}/practice`}>
                  <span>Vocabulary practice</span>
                  <ArrowRight size={17} />
                </Link>
              </li>
            </ul>
          </div>
        </section>

        <section className="min-regions" aria-labelledby="min-regions-title">
          <div className="min-section-heading">
            <h2 id="min-regions-title">Regions and varieties</h2>
            <label className="min-region-select">
              <span>Branch</span>
              <select
                value={branch}
                onChange={(event) => changeBranch(event.target.value)}
              >
                <option value="all">All branches</option>
                {min.subgroups.map((subgroup) => (
                  <option key={subgroup.id} value={subgroup.id}>
                    {subgroup.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="min-region-content">
            <div className="min-map-column">
              <div className="min-map-frame">
                <AtlasMap
                  compact
                  points={visiblePlaces}
                  selectedGroup="min"
                  selectedPoint={selected.id}
                  onSelectPoint={setSelectedId}
                />
              </div>
              <div className="min-map-selection" aria-live="polite">
                <div>
                  <h3>
                    {selected.name}{" "}
                    <span lang="zh-Hant">{selected.nativeName}</span>
                  </h3>
                  <p>
                    {selectedBranch.name}
                    {selected.subgroupId === "southern-min" && " · Quanzhang"}
                  </p>
                </div>
                <Link to={varietyPath(selected)}>
                  {selected.id === "xiamen" ? "Open lessons" : "Read article"}
                  <ArrowRight size={17} />
                </Link>
              </div>
            </div>
            <div className="min-place-directory">
              <div className="min-directory-heading">
                <h3>Places</h3>
                <span>
                  {visiblePlaces.length}{" "}
                  {visiblePlaces.length === 1 ? "entry" : "entries"}
                </span>
              </div>
              <ul>
                {visiblePlaces.map((point) => {
                  const subgroup = min.subgroups.find(
                    (item) => item.id === point.subgroupId,
                  )!;
                  return (
                    <li
                      key={point.id}
                      className={
                        point.id === selected.id
                          ? "min-place-selected"
                          : undefined
                      }
                    >
                      <Link className="min-place-link" to={varietyPath(point)}>
                        <span className="min-place-name">
                          {point.name}{" "}
                          <span lang="zh-Hant">{point.nativeName}</span>
                        </span>
                        <span className="min-place-description">
                          {subgroup.name} ·{" "}
                          {point.id === "xiamen"
                            ? "Learning chapter"
                            : "Reference article"}
                        </span>
                      </Link>
                      <button
                        type="button"
                        onClick={() => setSelectedId(point.id)}
                        aria-label={`Locate ${point.name} on the map`}
                        aria-pressed={selected.id === point.id}
                        title={`Locate ${point.name}`}
                      >
                        <MapPin size={18} />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="min-branch-directory">
            <h3>Branch reference articles</h3>
            <div>
              {min.subgroups.map((subgroup) => (
                <Link key={subgroup.id} to={subgroupPath("min", subgroup.id)}>
                  <span>{subgroup.name}</span>
                  <span lang="zh-Hant">{subgroup.nativeName}</span>
                  <ArrowRight size={16} />
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section
          className="min-photo-stories"
          aria-labelledby="min-photos-title"
        >
          <div className="min-section-heading">
            <h2 id="min-photos-title">Xiamen in photographs</h2>
            <Link className="min-text-link" to={`${xiamenPath}/culture`}>
              All photographs <ArrowRight size={17} />
            </Link>
          </div>
          <div className="min-photo-grid">
            {photoStories.map((photo) => (
              <figure key={photo.id}>
                <Link
                  className="min-story-image"
                  to={`${xiamenPath}/culture?photo=${photo.id}`}
                  aria-label={`Open photograph: ${photo.caption}`}
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    style={{ objectPosition: photo.position }}
                    loading="lazy"
                    width="1200"
                    height="800"
                  />
                </Link>
                <Credit photo={photo} />
              </figure>
            ))}
          </div>
        </section>

        <section
          className="min-classification"
          aria-labelledby="min-classification-title"
        >
          <div>
            <h2 id="min-classification-title">Classification</h2>
            <p>
              These five branches and seven places are a selection, not the full
              extent of Min. Quanzhou, Zhangzhou, and Xiamen belong to the
              Quanzhang cluster within Southern Min. The other branches have
              their own local sound systems; Xiamen readings do not represent
              every Min variety.
            </p>
          </div>
          <div className="min-sources">
            <h3>Sources</h3>
            <ul>
              {minSources.map((source) => (
                <li key={source.url}>
                  <a href={source.url} target="_blank" rel="noreferrer">
                    {source.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
