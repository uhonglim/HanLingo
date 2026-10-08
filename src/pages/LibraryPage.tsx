import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Search, X } from "lucide-react";
import { languages, mapPoints } from "../data/languages";
import { GroupBooks } from "./HomePage";

type Entry = {
  title: string;
  nativeName: string;
  kind: "Group" | "Subgroup" | "Local variety";
  path: string;
  description: string;
  keywords: string;
  color: string;
};
const aliases: Record<string, string> = {
  mandarin: "官话 官話 guanhua",
  min: "闽语 閩語",
  yue: "粤语 粵語 广东话 廣東話 cantonese",
  hakka: "客家 hakka kejia",
  wu: "吴语 吳語 wuyu",
};
// Narrow names help readers discover a parent group without labeling every child.
const discoveryAliases: Record<string, string> = {
  mandarin: "国语 國語 普通话 普通話 guoyu putonghua",
  min: "闽南 閩南 hokkien hoklo minnan",
  yue: "广府 廣府",
  wu: "shanghainese",
};
const subgroupAliases: Record<string, string> = {
  "min/southern-min": "闽南 閩南 hokkien hoklo minnan",
  "yue/guangfu": "广府 廣府",
};
const localAliases: Record<string, string> = {
  shanghai: "shanghainese",
};
const entries: Entry[] = languages.flatMap((group) => [
  {
    title: group.name,
    nativeName: group.nativeName,
    kind: "Group" as const,
    path: `/languages/${group.id}`,
    description: group.geography,
    keywords: `${aliases[group.id]} ${discoveryAliases[group.id] ?? ""}`,
    color: group.color,
  },
  ...group.subgroups.map((subgroup) => ({
    title: subgroup.name,
    nativeName: subgroup.nativeName,
    kind: "Subgroup" as const,
    path: `/languages/${group.id}/${subgroup.id}`,
    description: `${group.name} · ${subgroup.places.join(", ")}`,
    keywords: `${group.name} ${subgroup.nativeName} ${subgroup.places.join(" ")} ${aliases[group.id]} ${subgroupAliases[`${group.id}/${subgroup.id}`] ?? ""}`,
    color: group.color,
  })),
  ...mapPoints
    .filter((point) => point.groupId === group.id)
    .map((point) => ({
      title: point.name,
      nativeName: point.nativeName,
      kind: "Local variety" as const,
      path: `/languages/${group.id}/${point.subgroupId}/${point.id}`,
      description: point.hierarchy.slice(0, -1).join(" / "),
      keywords: `${point.nativeName} ${point.hierarchy.join(" ")} ${aliases[group.id]} ${subgroupAliases[`${group.id}/${point.subgroupId}`] ?? ""} ${localAliases[point.id] ?? ""}`,
      color: group.color,
    })),
]);
const normalize = (text: string) =>
  text
    .toLocaleLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f’'–-]/g, "");

export default function LibraryPage() {
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState("All");
  const matches = useMemo(
    () =>
      entries.filter(
        (entry) =>
          (kind === "All" || entry.kind === kind) &&
          normalize(
            `${entry.title} ${entry.nativeName} ${entry.description} ${entry.keywords}`,
          ).includes(normalize(query.trim())),
      ),
    [query, kind],
  );
  return (
    <div className="library-page">
      <div className="page-breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <span>The language library</span>
      </div>
      <header className="library-intro">
        <div>
          <div className="eyebrow">AN OPEN REFERENCE TO SINITIC</div>
          <h1>
            Choose a language.
            <br />
            <em>Follow your curiosity.</em>
          </h1>
          <p>
            There is more to every name on the map. Explore the groups, regional
            branches, and local varieties that make up this first collection.
          </p>
        </div>
        <div className="library-counts">
          <span>
            <strong>{languages.length}</strong>language groups
          </span>
          <span>
            <strong>
              {languages.reduce((n, l) => n + l.subgroups.length, 0)}
            </strong>
            regional subgroups
          </span>
          <span>
            <strong>{mapPoints.length}</strong>local varieties
          </span>
        </div>
      </header>
      <GroupBooks />
      <section className="library-index" aria-labelledby="directory-title">
        <div className="section-heading">
          <div>
            <div className="eyebrow">FIND A CHAPTER</div>
            <h2 id="directory-title">The complete index.</h2>
          </div>
          <span className="index-description">
            Every entry has its own page.
          </span>
        </div>
        <div className="directory-tools">
          <div className="library-search">
            <Search size={19} />
            <label className="sr-only" htmlFor="library-search">
              Search language groups, subgroups, or places
            </label>
            <input
              id="library-search"
              type="search"
              placeholder="Search a language, branch, or place…"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            {query && (
              <button aria-label="Clear search" onClick={() => setQuery("")}>
                <X size={16} />
              </button>
            )}
          </div>
          <div className="directory-filters" aria-label="Filter entry type">
            {["All", "Group", "Subgroup", "Local variety"].map((item) => (
              <button
                key={item}
                onClick={() => setKind(item)}
                aria-pressed={kind === item}
              >
                {item === "All"
                  ? "All entries"
                  : item === "Local variety"
                    ? "Local varieties"
                    : `${item}s`}
              </button>
            ))}
          </div>
        </div>
        <p className="directory-count" role="status">
          {matches.length} {matches.length === 1 ? "entry" : "entries"}
          {query ? ` matching “${query}”` : ""}
        </p>
        <div className="directory-results">
          {matches.map((entry) => (
            <Link to={entry.path} key={entry.path} className="directory-entry">
              <span
                className="directory-dot"
                style={{ background: entry.color }}
              />
              <div>
                <h3>
                  {entry.title}
                  <span lang="zh-Hant">{entry.nativeName}</span>
                </h3>
                <p>{entry.description}</p>
              </div>
              <span className="directory-kind">{entry.kind}</span>
              <ArrowRight size={16} />
            </Link>
          ))}
        </div>
        {!matches.length && (
          <div className="directory-empty">
            <h3>No chapter found yet.</h3>
            <p>
              Try a group name such as Min, a place such as Xiamen, or clear the
              entry filter.
            </p>
            <button
              className="text-link"
              onClick={() => {
                setQuery("");
                setKind("All");
              }}
            >
              Show all entries <ArrowRight size={15} />
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
