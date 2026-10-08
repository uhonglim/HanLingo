import { Link, useSearchParams } from "react-router-dom";
import { ArrowRight, MapPin } from "lucide-react";
import AtlasMap from "../components/AtlasMap";
import { languages, mapPoints } from "../data/languages";
import { legacyMinPlaces, placeClusterLabel, placeLabel } from "../data/language-names";
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
  const [params, setParams] = useSearchParams();
  const requestedBranch = params.get("branch");
  const branch = min.subgroups.some((item) => item.id === requestedBranch) ? requestedBranch! : "all";
  const requestedPlace = params.get("place") ?? "xiamen";
  const selectedId = legacyMinPlaces[requestedPlace] ?? requestedPlace;
  function setSelectedId(id: string) {
    setParams((current) => { current.set("place", id); return current; }, { replace: true });
  }
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
    const nextPlaces =
      id === "all" ? places : places.filter((point) => point.subgroupId === id);
    setParams((current) => {
      if (id === "all") current.delete("branch"); else current.set("branch", id);
      if (!nextPlaces.some((point) => point.id === selectedId)) current.set("place", nextPlaces[0].id);
      return current;
    }, { replace: true });
  }

  return (
    <div className="min-hub">
      <div className="min-content">
        <header className="min-heading">
          <h1>
            Min <span lang="zh-Hant">閩語</span>
          </h1>
          <p>
            From Fujian to Taiwan, Singapore, and Penang. Explore Min’s branches
            and the Hokkien varieties shaped by different communities.
          </p>
        </header>

        <section className="min-feature" aria-labelledby="min-xiamen-title">
          <figure className="min-feature-photo">
            <Link to={xiamenPath} aria-label="Open the Amoy learning chapter">
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
            <p className="min-feature-location">Southern Min · Tsuan-Chiang</p>
            <h2 id="min-xiamen-title">
              Amoy <span lang="zh-Hant">廈門</span>
            </h2>
            <Link className="min-primary-link" to={xiamenPath}>
              Learn Amoy <ArrowRight size={18} />
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
            <h2 id="min-regions-title">Places and communities</h2>
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
                    {placeLabel(selected)}{" "}
                    <span lang="zh-Hant">{selected.nativeName}</span>
                  </h3>
                  <p>
                    {selectedBranch.name}
                    {placeClusterLabel(selected) && ` · ${placeClusterLabel(selected)}`}
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
                          {placeLabel(point)}{" "}
                          <span lang="zh-Hant">{point.nativeName}</span>
                        </span>
                        <span className="min-place-description">
                          {placeClusterLabel(point) ?? subgroup.name} ·{" "}
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
            <h2 id="min-photos-title">Amoy in photographs</h2>
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
            <h2 id="min-classification-title">Names and branches</h2>
            <p>
              Min → Southern Min → a cluster → a locality.
              These {min.subgroups.length} branches and {places.length} places are a selection from Min.
              Each community needs its own pronunciation evidence.
            </p>
            <dl className="min-name-guide">
              <div><dt>Tsuan-Chiang · 泉漳</dt><dd>The geographically specific Quanzhou–Zhangzhou cluster. This Hokkien-style name replaces the Mandarin spelling “Quanzhang” in navigation.</dd></div>
              <div><dt>Teo Swa · 潮汕</dt><dd>A separate Southern Min cluster, including Teochew and Swatow. This name is also used by the <a href="https://www.csga.co.nz/about-us/" target="_blank" rel="noreferrer">Teo Swa community association</a>.</dd></div>
              <div><dt>Hokkien · Hoklo · Taigi</dt><dd>Names whose usage depends on the community and source. They do not name all Min, and they are not extra levels in the tree.</dd></div>
              <div><dt>Amoy · 廈門</dt><dd>An established name for Xiamen and its speech. Both names lead to the same learning chapter.</dd></div>
            </dl>
            <p className="min-name-sources"><a href="https://english.moe.gov.tw/fp-117-40171-b21aa-1.html" target="_blank" rel="noreferrer">Taiwan language names</a>{" · "}<a href="https://culturepaedia.singaporeccc.org.sg/language-education/the-hokkien-dialect-in-singapore/" target="_blank" rel="noreferrer">Hokkien in Singapore</a></p>
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
