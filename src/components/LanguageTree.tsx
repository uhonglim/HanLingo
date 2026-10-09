import { normalizeNameSearch as normalize } from "../data/name-search";
import { atlasBranches, atlasClusters, atlasLocalities, atlasClusterPath, atlasLocalityPath } from "../data/atlas";
import { availableSections, learningSections } from "../data/learning";
import { siteTerms } from "../data/site-terms";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { ChevronDown, ChevronRight, Search, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { findLearningPlace } from "../data/learning/places";
import { languages } from "../data/languages";
import {
  communityAliases, hokkienAliases,
} from "../data/language-names";
import { groupPath, subgroupPath } from "../routing";
import "./LanguageTree.css";

type TreeNode = {
  id: string;
  name: string;
  nativeName?: string;
  href?: string;
  aliases?: string;
  children?: TreeNode[];
  cluster?: string;
};

const aliases: Record<string, string> = {
  mandarin: "官话 guanhua 国语 國語 普通话 普通話 guoyu putonghua",
  min: "闽语",
  yue: "yue 粤语 广东话 廣東話 cantonese",
  hakka: "客家 kejia",
  wu: "吴语 wuyu",
  "min/southern-min": "闽南 minnan",
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
      children: atlasBranches.filter(branch => branch.groupId === language.id).map((branch) => ({
        id: `subgroup/${language.id}/${branch.id}`,
        name: branch.name, nativeName: branch.nativeName,
        aliases: aliases[`${language.id}/${branch.id}`],
        href: subgroupPath(language.id, branch.id),
        children: atlasClusters.filter(cluster => cluster.groupId === language.id && cluster.branchId === branch.id).map(cluster => ({
          id: `cluster/${language.id}/${branch.id}/${cluster.id}`,
          name: cluster.name, nativeName: cluster.nativeName,
          aliases: cluster.id === "tsuan-chiang" ? hokkienAliases : cluster.id === "teo-swa" ? "Chaoshan 潮汕" : undefined,
          href: atlasClusterPath(cluster),
          children: atlasLocalities.filter(place => place.groupId === language.id && place.branchId === branch.id && place.clusterId === cluster.id).map(place => {
            const lesson = findLearningPlace(place.id);
            const path = atlasLocalityPath(place);
            return {
              id: `place/${place.id}`, name: place.name, nativeName: place.nativeName,
              href: path,
              aliases: [aliases[place.id], communityAliases[place.id], ...(place.aliases ?? [])].filter(Boolean).join(" "),
              children: lesson ? availableSections(lesson).map(section => ({
                id: `${place.id}/${section}`, name: learningSections[section], href: `${path}/${section}`,
                aliases: section === "culture" ? "culture gallery pictures photographs" : section === "sounds" ? "IPA tones pronunciation" : undefined,
              })) : [],
            };
          }),
        })),
      })),
    })),
  };
}

const tree = buildTree();
// Site references sit beside the family tree, not inside its taxonomy.
const referencePages: TreeNode[] = [
  {
    id: "reference/written-chinese",
    name: siteTerms.writtenChinese,
    href: "/written-chinese",
    aliases: "formal standard register writing 書面語 书面语",
  },
  {
    id: "reference/about",
    name: siteTerms.about,
    href: "/about",
    aliases: "references methodology credits photos licenses licences",
  },
];
const normalizedPath = (pathname: string) =>
  pathname.replace(/\/+$/, "") || "/";


function routeTrail(node: TreeNode, pathname: string): string[] {
  // Match the deepest destination before its ancestors.
  for (const child of node.children ?? []) {
    const trail = routeTrail(child, pathname);
    if (trail.length) return [node.id, ...trail];
  }
  return node.href === pathname ? [node.id] : [];
}

function filterTree(
  node: TreeNode,
  terms: string[],
  parentText = "",
): TreeNode | null {
  const ownText = normalize(
    `${node.name} ${node.nativeName ?? ""} ${node.aliases ?? ""}`,
  );
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
  const currentId =
    trail.at(-1) ?? referencePages.find((node) => node.href === path)?.id;
  const [open, setOpen] = useState(() => new Set(["sinitic", ...trail]));
  const [mobileOpen, setMobileOpen] = useState(path === "/");
  const [query, setQuery] = useState("");
  const [searchClosed, setSearchClosed] = useState<Set<string>>(new Set());
  const searchInput = useRef<HTMLInputElement>(null);
  const treeNavigation = useRef<string | null>(null);
  const instanceId = useId();
  const panelId = `language-tree-panel-${instanceId}`;
  const terms = normalize(query).trim().split(/\s+/).filter(Boolean);
  const searching = terms.length > 0;
  const visibleTree = searching ? filterTree(tree, terms) : tree;
  const visibleReferences = searching
    ? referencePages
        .map((node) => filterTree(node, terms))
        .filter((node): node is TreeNode => node !== null)
    : referencePages;

  useEffect(() => {
    // An explicit name click owns its toggle; route reveal must not undo it.
    if (treeNavigation.current !== path) {
      setOpen((previous) => {
        if (trail.every((id) => previous.has(id))) return previous;
        return new Set([...previous, ...trail]);
      });
    }
    treeNavigation.current = null;
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

  function renderNodes(nodes: TreeNode[]) {
    return nodes.map((node, index) =>
      renderNode(
        node,
        Boolean(node.cluster && node.cluster !== nodes[index - 1]?.cluster),
      ),
    );
  }

  function renderNode(node: TreeNode, showCluster = false) {
    const hasChildren = Boolean(node.children?.length);
    const expanded = searching ? !searchClosed.has(node.id) : open.has(node.id);
    const active = node.id === currentId;
    const ancestor = !active && trail.includes(node.id);
    const childrenId = `language-tree-children-${instanceId}-${node.id.replace(/[^a-zA-Z0-9_-]/g, "_")}`;
    return (
      <li className="language-tree-item" key={node.id}>
        {showCluster && (
          <span className="language-tree-cluster-caption">{node.cluster}</span>
        )}
        <div
          className={`language-tree-row${active ? " language-tree-row--active" : ""}${ancestor ? " language-tree-row--ancestor" : ""}`}
        >
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
          ) : (
            <span className="language-tree-spacer" aria-hidden="true" />
          )}
          {node.href ? (
            <Link
              to={node.href}
              className="language-tree-link"
              aria-current={active ? "page" : undefined}
              onClick={(event) => {
                if (
                  event.button !== 0 ||
                  event.metaKey ||
                  event.ctrlKey ||
                  event.shiftKey ||
                  event.altKey
                )
                  return;
                if (hasChildren) toggle(node.id);
                treeNavigation.current = node.href === path ? null : node.href!;
                if (node.href !== "/") setMobileOpen(false);
              }}
            >
              <span>{node.name}</span>
              {node.nativeName && (
                <span className="language-tree-native" lang="zh-Hant">
                  {node.nativeName}
                </span>
              )}
            </Link>
          ) : (
            <span className="language-tree-link">{node.name}</span>
          )}
        </div>
        {hasChildren && (
          <ul
            className="language-tree-children"
            id={childrenId}
            hidden={!expanded}
          >
            {renderNodes(node.children!)}
          </ul>
        )}
      </li>
    );
  }

  return (
    <aside
      className={`language-tree${mobileOpen ? " language-tree--mobile-open" : ""}`}
    >
      <button
        className="language-tree-mobile-toggle"
        type="button"
        aria-expanded={mobileOpen}
        aria-controls={panelId}
        onClick={() => setMobileOpen((previous) => !previous)}
      >
        {siteTerms.tree} <ChevronDown size={17} aria-hidden="true" />
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
              aria-label="Find a language or place"
              autoComplete="off"
              spellCheck={false}
            />
            {query && (
              <button
                type="button"
                aria-label="Clear tree search"
                onClick={() => {
                  changeQuery("");
                  searchInput.current?.focus();
                }}
              >
                <X size={14} aria-hidden="true" />
              </button>
            )}
          </label>
        </div>
        <nav className="language-tree-navigation" aria-label="Language family">
          {visibleTree && (
            <ul className="language-tree-root">
              {renderNodes(visibleTree.children ?? [])}
            </ul>
          )}
          {visibleReferences.length > 0 && (
            <ul
              className="language-tree-reference-links"
              aria-label="Reference pages"
            >
              {renderNodes(visibleReferences)}
            </ul>
          )}
          {!visibleTree && !visibleReferences.length && (
            <p className="language-tree-empty" role="status">
              No matches
            </p>
          )}
        </nav>
      </div>
    </aside>
  );
}
