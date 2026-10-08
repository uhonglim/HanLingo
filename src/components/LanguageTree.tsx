import { useEffect, useId, useMemo, useRef, useState } from "react";
import { ChevronDown, ChevronRight, Search, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { languages, mapPoints } from "../data/languages";
import { clusterLabel, communityAliases, hokkienAliases, placeLabel } from "../data/language-names";
import { groupPath, subgroupPath, varietyPath } from "../routing";
import "./LanguageTree.css";

type TreeNode = {
  id: string;
  name: string;
  nativeName?: string;
  href?: string;
  aliases?: string;
  children?: TreeNode[];
};

const aliases: Record<string, string> = {
  mandarin: "官话 guanhua 国语 國語 普通话 普通話 guoyu putonghua",
  min: "闽语",
  yue: "yue 粤语 广东话 廣東話 cantonese",
  hakka: "客家 kejia",
  wu: "吴语 wuyu",
  "min/southern-min": "闽南 hokkien hoklo minnan 泉漳 quanzhang",
  "min/eastern-min": "闽东 閩東 mindong",
  "min/northern-min": "闽北 閩北 minbei",
  "min/puxian": "莆仙 puxian",
  "min/central-min": "闽中 閩中 minzhong",
  "yue/guangfu": "广府",
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

function buildTree(): TreeNode {
  return {
    id: "sinitic",
    name: "Han / Sinitic",
    nativeName: "漢",
    aliases: "汉 Chinese",
    href: "/",
    children: languages.map((language) => ({
      id: `group/${language.id}`,
      name: language.name,
      nativeName: language.nativeName,
      aliases: aliases[language.id],
      href: groupPath(language.id),
      children: language.subgroups.map((subgroup) => {
        const children: TreeNode[] = [];
        for (const point of mapPoints.filter(
          (item) => item.groupId === language.id && item.subgroupId === subgroup.id,
        )) {
          let parent = children;
          // Keep intermediate clusters; they have no separate article route.
          for (const cluster of point.hierarchy.slice(3, -1)) {
            const id = `cluster/${language.id}/${subgroup.id}/${cluster}`;
            let clusterNode = parent.find((node) => node.id === id);
            if (!clusterNode) {
              clusterNode = { id, name: clusterLabel(cluster),
                aliases: cluster === "Quanzhang cluster" ? hokkienAliases : cluster === "Chaoshan cluster" ? "chaoshan chao shan 潮汕 teochew swatow" : undefined, children: [] };
              parent.push(clusterNode);
            }
            parent = clusterNode.children!;
          }
          parent.push({
            id: `place/${point.id}`,
            name: placeLabel(point),
            nativeName: point.nativeName,
            href: varietyPath(point),
            aliases: [point.name, aliases[point.id], communityAliases[point.id]].filter(Boolean).join(" "),
            ...(point.id === "xiamen"
              ? {
                  children: [
                    ["", "Overview"],
                    ["/words", "Words"],
                    ["/culture", "Photos"],
                    ["/sounds", "IPA & tones"],
                    ["/practice", "Practice"],
                  ].map(([suffix, name]) => ({
                    id: `xiamen/${suffix || "overview"}`,
                    name,
                    href: varietyPath(point) + suffix,
                    aliases: suffix === "/culture" ? "culture gallery pictures photographs" : suffix === "/sounds" ? "sounds pronunciation gallery" : undefined,
                  })),
                }
              : {}),
          });
        }
        return {
          id: `subgroup/${language.id}/${subgroup.id}`,
          name: subgroup.name,
          nativeName: subgroup.nativeName,
          aliases: aliases[`${language.id}/${subgroup.id}`],
          href: subgroupPath(language.id, subgroup.id),
          children,
        };
      }),
    })),
  };
}

const tree = buildTree();
// Site references sit beside the family tree, not inside its taxonomy.
const referencePages: TreeNode[] = [
  { id: "reference/written-chinese", name: "Written Chinese", href: "/written-chinese", aliases: "formal standard register writing 書面語 书面语" },
  { id: "reference/about", name: "About & sources", href: "/about", aliases: "references methodology credits photos licenses licences" },
];
const normalizedPath = (pathname: string) => pathname.replace(/\/+$/, "") || "/";
const normalize = (text: string) => text.toLocaleLowerCase().normalize("NFKD")
  .replace(/[\u0300-\u036f’'–-]/g, "");

function routeTrail(node: TreeNode, pathname: string): string[] {
  // Children first makes Overview the single current link at the Xiamen base URL.
  for (const child of node.children ?? []) {
    const trail = routeTrail(child, pathname);
    if (trail.length) return [node.id, ...trail];
  }
  return node.href === pathname ? [node.id] : [];
}

function filterTree(node: TreeNode, terms: string[], parentText = ""): TreeNode | null {
  const ownText = normalize(`${node.name} ${node.nativeName ?? ""} ${node.aliases ?? ""}`);
  const context = `${parentText} ${ownText}`;
  if (terms.every((term) => context.includes(term))) return node;
  const children = (node.children ?? [])
    .map((child) => filterTree(child, terms, context))
    .filter((child): child is TreeNode => child !== null);
  return children.length ? { ...node, children } : null;
}

export default function LanguageTree() {
  const { pathname } = useLocation();
  const path = normalizedPath(pathname);
  const trail = useMemo(() => routeTrail(tree, path), [path]);
  const currentId = trail.at(-1) ?? referencePages.find((node) => node.href === path)?.id;
  const [open, setOpen] = useState(() => new Set(["sinitic", ...trail]));
  const [mobileOpen, setMobileOpen] = useState(path === "/");
  const [query, setQuery] = useState("");
  const [searchClosed, setSearchClosed] = useState<Set<string>>(new Set());
  const searchInput = useRef<HTMLInputElement>(null);
  const instanceId = useId();
  const panelId = `language-tree-panel-${instanceId}`;
  const terms = normalize(query).trim().split(/\s+/).filter(Boolean);
  const searching = terms.length > 0;
  const visibleTree = searching ? filterTree(tree, terms) : tree;
  const visibleReferences = searching
    ? referencePages.map((node) => filterTree(node, terms)).filter((node): node is TreeNode => node !== null)
    : referencePages;

  useEffect(() => {
    setOpen((previous) => {
      if (trail.every((id) => previous.has(id))) return previous;
      return new Set([...previous, ...trail]);
    });
    setMobileOpen(path === "/");
  }, [path, trail]);

  function toggle(id: string) {
    if (searching) {
      setSearchClosed((previous) => {
        const next = new Set(previous);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        return next;
      });
    } else {
      setOpen((previous) => {
        const next = new Set(previous);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        return next;
      });
    }
  }

  function changeQuery(value: string) {
    setQuery(value);
    setSearchClosed(new Set());
  }

  function renderNode(node: TreeNode) {
    const hasChildren = Boolean(node.children?.length);
    const expanded = searching ? !searchClosed.has(node.id) : open.has(node.id);
    const active = node.id === currentId;
    const ancestor = !active && trail.includes(node.id);
    const childrenId = `language-tree-children-${instanceId}-${node.id.replace(/[^a-zA-Z0-9_-]/g, "_")}`;
    return (
      <li className="language-tree-item" key={node.id}>
        <div className={`language-tree-row${active ? " language-tree-row--active" : ""}${ancestor ? " language-tree-row--ancestor" : ""}`}>
          {hasChildren ? (
            <button
              className="language-tree-disclosure"
              type="button"
              aria-label={`${expanded ? "Collapse" : "Expand"} ${node.name}`}
              aria-expanded={expanded}
              aria-controls={childrenId}
              onClick={() => toggle(node.id)}
            >
              <ChevronRight size={14} aria-hidden="true" />
            </button>
          ) : <span className="language-tree-spacer" aria-hidden="true" />}
          {node.href ? (
            <Link
              to={node.href}
              className="language-tree-link"
              aria-current={active ? "page" : undefined}
              onClick={() => { if (node.href !== "/") setMobileOpen(false); }}
            >
              <span>{node.name}</span>
              {node.nativeName && <span className="language-tree-native" lang="zh-Hant">{node.nativeName}</span>}
            </Link>
          ) : <span className="language-tree-cluster">{node.name}</span>}
        </div>
        {hasChildren && (
          <ul className="language-tree-children" id={childrenId} hidden={!expanded}>
            {node.children!.map(renderNode)}
          </ul>
        )}
      </li>
    );
  }

  return (
    <aside className={`language-tree${mobileOpen ? " language-tree--mobile-open" : ""}`}>
      <button
        className="language-tree-mobile-toggle"
        type="button"
        aria-expanded={mobileOpen}
        aria-controls={panelId}
        onClick={() => setMobileOpen((previous) => !previous)}
      >
        Tree <ChevronDown size={17} aria-hidden="true" />
      </button>
      <div className="language-tree-panel" id={panelId}>
        <div className="language-tree-search-wrap">
          <label className="language-tree-search">
            <Search size={16} aria-hidden="true" />
            <span className="sr-only">Find a language or place</span>
            <input
              ref={searchInput}
              type="search"
              value={query}
              onChange={(event) => changeQuery(event.target.value)}
              placeholder="Find a language or place"
              autoComplete="off"
              spellCheck={false}
            />
            {query && (
              <button type="button" aria-label="Clear tree search" onClick={() => { changeQuery(""); searchInput.current?.focus(); }}>
                <X size={14} aria-hidden="true" />
              </button>
            )}
          </label>
        </div>
        <nav className="language-tree-navigation" aria-label="Language family">
          {visibleTree && <ul className="language-tree-root">{visibleTree.children?.map(renderNode)}</ul>}
          {visibleReferences.length > 0 && (
            <ul className="language-tree-reference-links" aria-label="Reference pages">
              {visibleReferences.map(renderNode)}
            </ul>
          )}
          {!visibleTree && !visibleReferences.length && <p className="language-tree-empty" role="status">No matches</p>}
        </nav>
      </div>
    </aside>
  );
}
