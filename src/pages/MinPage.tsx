import { Link, useSearchParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import AtlasMap from "../components/AtlasMap";
import { languages, mapPoints } from "../data/languages";
import {
  legacyMinPlaces,
  placeClusterLabel,
  placeLabel,
} from "../data/language-names";
import { minSources } from "../data/min-sources";
import { groupPhotos } from "../data/photography";
import { xiamenPhotos } from "../data/xiamen-photos";
import { romanizeXiamen } from "../data/xiamen-romanization";
import { xiamenWords } from "../data/xiamen-lexicon";
import { varietyPath } from "../routing";
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
  const branch = min.subgroups.some((item) => item.id === requestedBranch)
    ? requestedBranch!
    : "all";
  const requestedPlace = params.get("place") ?? "xiamen";
  const selectedId = legacyMinPlaces[requestedPlace] ?? requestedPlace;
  function setSelectedId(id: string) {
    setParams(
      (current) => {
        current.set("place", id);
        return current;
      },
      { replace: true },
    );
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
    setParams(
      (current) => {
        if (id === "all") current.delete("branch");
        else current.set("branch", id);
        if (!nextPlaces.some((point) => point.id === selectedId))
          current.set("place", nextPlaces[0].id);
        return current;
      },
      { replace: true },
    );
  }

  return (
    <div className="min-hub">
      <div className="min-content">
        <header className="min-heading">
          <h1>
            Min <span lang="zh-Hant">閩語</span>
          </h1>
          <p>
            Min’s branches span Fujian and neighboring regions, Taiwan, and
            communities overseas.
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
              <Link to={xiamenPath}>
                Amoy <span lang="zh-Hant">廈門</span>
              </Link>
            </h2>
            <dl className="min-preview-words">
              {["tea", "water", "person"]
                .map((id) => xiamenWords.find((word) => word.id === id)!)
                .map((word) => (
                  <div key={word.id}>
                    <dt>
                      <a
                        href={word.sourceUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${word.han}: reading source`}
                        lang="zh-Hant"
                      >
                        {word.han}
                      </a>
                      <span>{word.english}</span>
                    </dt>
                    <dd>
                      <strong>
                        {romanizeXiamen(word.segments, word.tones)}
                      </strong>
                      <span>{word.ipa}</span>
                    </dd>
                  </div>
                ))}
            </dl>
          </div>
        </section>

        <section className="min-regions" aria-labelledby="min-regions-title">
          <div className="min-section-heading">
            <h2 id="min-regions-title">Localities</h2>
            <div className="min-map-filters">
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
              <label className="min-region-select">
                <span>Locality</span>
                <select
                  value={selected.id}
                  onChange={(event) => setSelectedId(event.target.value)}
                >
                  {visiblePlaces.map((point) => (
                    <option key={point.id} value={point.id}>
                      {placeLabel(point)}
                    </option>
                  ))}
                </select>
              </label>
            </div>
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
                    {placeClusterLabel(selected) &&
                      ` · ${placeClusterLabel(selected)}`}
                  </p>
                </div>
                <Link to={varietyPath(selected)}>
                  {`Explore ${placeLabel(selected)}`}
                  <ArrowRight size={17} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section
          className="min-photo-stories"
          aria-labelledby="min-photos-title"
        >
          <div className="min-section-heading">
            <h2 id="min-photos-title">Amoy photos</h2>
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
              Min → Southern Min → Amoy → Words. Every group follows the same
              navigation levels; cluster captions keep local relationships visible.
            </p>
            <dl className="min-name-guide">
              <div>
                <dt>Tsuan-Chiang · 泉漳</dt>
                <dd>
                  The Quanzhou–Zhangzhou cluster within Southern Min. Quanzhang
                  is the Mandarin spelling of the same name.
                </dd>
              </div>
              <div>
                <dt>Teo Swa · 潮汕</dt>
                <dd>
                  A separate Southern Min cluster, including Teochew and Swatow.
                  This name is also used by the{" "}
                  <a
                    href="https://www.csga.co.nz/about-us/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Teo Swa community association
                  </a>
                  .
                </dd>
              </div>
              <div>
                <dt>Hokkien</dt>
                <dd>
                  A community name for Southern Min used in Singapore and
                  elsewhere in Southeast Asia. It does not mean every language
                  of Fujian.
                </dd>
              </div>
              <div>
                <dt>Taigi</dt>
                <dd>
                  Taiwanese Southern Min. This regional name includes more than
                  the speech of Taipak or any single locality.
                </dd>
              </div>
              <div>
                <dt>Hoklo</dt>
                <dd>
                  Also used for Taiwanese Southern Min, as listed by Taiwan’s
                  Ministry of Education. It is not a name for all Min.
                </dd>
              </div>
              <div>
                <dt>Amoy · 廈門</dt>
                <dd>
                  An established name for Xiamen and its speech. Xiamen is the
                  modern city name.
                </dd>
              </div>
            </dl>
            <p className="min-name-sources">
              <a
                href="https://english.moe.gov.tw/fp-117-40171-b21aa-1.html"
                target="_blank"
                rel="noreferrer"
              >
                Taiwan language names
              </a>
              {" · "}
              <a
                href="https://culturepaedia.singaporeccc.org.sg/language-education/the-hokkien-dialect-in-singapore/"
                target="_blank"
                rel="noreferrer"
              >
                Hokkien in Singapore
              </a>
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
