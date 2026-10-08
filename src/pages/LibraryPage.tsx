import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowRight, ChevronDown, Search, X } from "lucide-react";
import { languages, mapPoints } from "../data/languages";
import type { Language, LanguageId, MapPoint } from "../data/languages";
import { groupPhotos } from "../data/photography";
import "./LibraryPage.css";

const aliases: Record<LanguageId, string> = {
  mandarin: "官话 官話 guanhua",
  min: "闽语 閩語",
  yue: "粤语 粵語 广东话 廣東話 cantonese",
  hakka: "客家 hakka kejia",
  wu: "吴语 吳語 wuyu",
};
const discoveryAliases: Partial<Record<LanguageId, string>> = {
  mandarin: "国语 國語 普通话 普通話 guoyu putonghua",
  min: "闽南 閩南 hokkien hoklo minnan",
  yue: "广府 廣府",
  wu: "shanghainese",
};
const subgroupAliases: Record<string, string> = {
  "min/southern-min": "闽南 閩南 hokkien hoklo minnan 泉漳 quanzhang",
  "yue/guangfu": "广府 廣府",
};
const localAliases: Record<string, string> = {
  xiamen: "厦门 amoy",
  shanghai: "shanghainese",
  jianou: "建瓯",
  guangzhou: "广州 canton",
  meixian: "梅县",
  haifeng: "海丰",
  lufeng: "陆丰",
  changting: "长汀",
  suzhou: "苏州",
  wenzhou: "温州",
  lishui: "丽水",
};
const normalize = (text: string) => text.toLocaleLowerCase().normalize("NFKD")
  .replace(/[\u0300-\u036f’'–-]/g, "");
const openGroups = () => Object.fromEntries(languages.map(group => [group.id, true])) as Record<LanguageId, boolean>;

type Branch = { subgroup: Language['subgroups'][number]; points: MapPoint[] };
type GroupResult = { group: Language; branches: Branch[] };

function LocalVarieties({ points }: { points: MapPoint[] }) {
  // Quanzhang is a cluster within Southern Min, not a city-level dialect.
  const clusters = new Map<string, MapPoint[]>();
  for (const point of points) {
    const cluster = point.hierarchy.slice(3, -1).join(" / ");
    clusters.set(cluster, [...(clusters.get(cluster) ?? []), point]);
  }
  return [...clusters].map(([cluster, places]) => (
    <div key={cluster} className="ld-local-branch">
      {cluster && <h4>{cluster}</h4>}
      <ul className="ld-local-list">
        {places.map(point => (
          <li key={point.id}>
            <Link to={`/languages/${point.groupId}/${point.subgroupId}/${point.id}`}>
              <span>{point.name}</span>
              <span lang="zh-Hant">{point.nativeName}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  ));
}

function LanguageSection({ result, expanded, toggle }: {
  result: GroupResult; expanded: boolean; toggle: () => void;
}) {
  const { group, branches } = result;
  const photo = groupPhotos[group.id];
  return (
    <section className="ld-language" aria-labelledby={`ld-${group.id}-title`}>
      <header className="ld-language-heading">
        <h2 id={`ld-${group.id}-title`}>
          <Link to={`/languages/${group.id}`}>
            {group.name}<span lang="zh-Hant">{group.nativeName}</span>
          </Link>
        </h2>
        <button className="ld-disclosure" aria-expanded={expanded}
          aria-controls={`ld-${group.id}-branches`} aria-label={`${expanded ? "Collapse" : "Expand"} ${group.name}`}
          onClick={toggle}>
          <ChevronDown size={20} aria-hidden="true" />
        </button>
      </header>
      <div id={`ld-${group.id}-branches`} className="ld-language-body" hidden={!expanded}>
        <div className="ld-context">
          <p>{group.geography}</p>
          <figure>
            <img src={photo.src} alt={photo.alt} loading="lazy" width="460" height="260"
              style={{ objectPosition: photo.position }} />
            <figcaption>
              <span>{photo.caption}</span>
              <span><a href={photo.sourceUrl} target="_blank" rel="noreferrer">{photo.author}</a>
                {" · "}<a href={photo.licenseUrl} target="_blank" rel="noreferrer">{photo.license}</a></span>
            </figcaption>
          </figure>
        </div>
        {branches.length > 0 ? (
          <div className="ld-branches">
            {branches.map(({ subgroup, points }) => (
              <section className="ld-subgroup" key={subgroup.id} aria-labelledby={`ld-${group.id}-${subgroup.id}`}>
                <h3 id={`ld-${group.id}-${subgroup.id}`}>
                  <Link to={`/languages/${group.id}/${subgroup.id}`}>
                    {subgroup.name}<span lang="zh-Hant">{subgroup.nativeName}</span>
                  </Link>
                </h3>
                <LocalVarieties points={points} />
              </section>
            ))}
          </div>
        ) : <Link className="ld-reference-link" to={`/languages/${group.id}`}>Open {group.name} reference <ArrowRight size={16} /></Link>}
      </div>
    </section>
  );
}

export default function LibraryPage() {
  const [params, setParams] = useSearchParams();
  const query = params.get("q") ?? "";
  const expanded = openGroups();
  for (const id of (params.get("closed") ?? "").split(",")) {
    if (languages.some(group => group.id === id)) expanded[id as LanguageId] = false;
  }
  function setExpanded(update: (previous: Record<LanguageId, boolean>) => Record<LanguageId, boolean>) {
    const changed = update(expanded);
    const closed = languages.filter(group => !changed[group.id]).map(group => group.id).join(",");
    const next = new URLSearchParams(params);
    if (closed) next.set("closed", closed);
    else next.delete("closed");
    setParams(next, { replace: true });
  }
  const search = normalize(query.trim());
  const matches = useMemo(() => {
    const includes = (text: string) => normalize(text).includes(search);
    return languages.flatMap(group => {
      const groupMatch = includes(`${group.name} ${group.nativeName} ${aliases[group.id]}`);
      const contextMatch = includes(group.geography);
      const branches = group.subgroups.flatMap(subgroup => {
        const branchAlias = subgroupAliases[`${group.id}/${subgroup.id}`] ?? "";
        const subgroupMatch = includes(`${subgroup.name} ${subgroup.nativeName} ${branchAlias}`);
        const points = mapPoints.filter(point => point.groupId === group.id && point.subgroupId === subgroup.id)
          .filter(point => groupMatch || subgroupMatch || includes(
            `${point.name} ${point.nativeName} ${point.hierarchy.join(" ")} ${branchAlias} ${localAliases[point.id] ?? ""}`,
          ));
        // Keep a subgroup discoverable by an example place even if the city has no page yet.
        const placeMatch = includes(subgroup.places.join(" "));
        return groupMatch || subgroupMatch || placeMatch || points.length
          ? [{ subgroup, points }] : [];
      });
      const discoveryMatch = Boolean(discoveryAliases[group.id]) && includes(discoveryAliases[group.id]!);
      return groupMatch || contextMatch || discoveryMatch || branches.length ? [{ group, branches }] : [];
    });
  }, [search]);
  const writtenMatch = !search || normalize("Modern Standard Written Chinese Formal Han Chinese 现代标准书面语 現代標準書面語 書面語 书面语").includes(search);
  const allExpanded = matches.every(({ group }) => expanded[group.id]);
  function updateSearch(value: string) {
    const next = new URLSearchParams(params);
    if (value) next.set("q", value);
    else next.delete("q");
    next.delete("closed");
    setParams(next, { replace: true });
  }
  return (
    <div className="language-directory">
      <header className="ld-heading">
        <h1>Languages</h1>
        <div className="ld-search">
          <Search size={19} aria-hidden="true" />
          <label className="sr-only" htmlFor="language-directory-search">Search languages, subgroups, and places</label>
          <input id="language-directory-search" type="search" placeholder="Language or place"
            value={query} onChange={event => updateSearch(event.target.value)} />
          {query && <button onClick={() => updateSearch("")} aria-label="Clear search"><X size={18} aria-hidden="true" /></button>}
        </div>
      </header>
      <div className="ld-tools">
        <p>Language groups, regional subgroups, and local varieties</p>
        {matches.length > 0 && <button onClick={() => setExpanded(previous => ({
          ...previous, ...Object.fromEntries(matches.map(({ group }) => [group.id, !allExpanded])),
        }))}>{allExpanded ? "Collapse all" : "Expand all"}</button>}
      </div>
      <p className="sr-only" role="status">
        {matches.length} language groups{writtenMatch ? " and the written Chinese reference" : ""}{search ? ` matching ${query}` : ""}
      </p>
      {matches.map(result => <LanguageSection key={result.group.id} result={result}
        expanded={expanded[result.group.id]} toggle={() => setExpanded(previous => ({
          ...previous, [result.group.id]: !previous[result.group.id],
        }))} />)}
      {writtenMatch && <Link className="ld-written" to="/written-chinese">
        <div><h2>Written Chinese</h2><p>Modern Standard Written Chinese is a shared written register, separate from the spoken-language tree.</p></div>
        <ArrowRight size={21} aria-hidden="true" />
      </Link>}
      {!matches.length && !writtenMatch && <div className="ld-empty">
        <h2>No matches</h2><button onClick={() => updateSearch("")}>Clear search</button>
      </div>}
    </div>
  );
}
