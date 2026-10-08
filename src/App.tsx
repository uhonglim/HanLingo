import { siteTerms } from "./data/site-terms";
import { Suspense, lazy, useEffect, useLayoutEffect, useRef } from "react";
import {
  Link,
  NavLink,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigationType,
} from "react-router-dom";
import { ArrowRight } from "lucide-react";
import MinPage from "./pages/MinPage";
import { getBreadcrumbs } from "./navigation";
import { languages } from "./data/languages";
import { legacyMinPlaces } from "./data/language-names";
import "./pages/pages.css";
const TreeHomePage = lazy(() => import("./pages/TreeHomePage"));
import LanguageTree from "./components/LanguageTree";
const ReferencePage = lazy(() => import("./components/ReferencePages"));
const LocalLearningPage = lazy(() => import("./pages/LocalLearningPage"));
const ReadingRoom = lazy(() => import("./pages/ReadingRoom"));
const RomanizationPage = lazy(() => import("./pages/RomanizationPage"));
const WrittenChinesePage = lazy(() => import("./pages/WrittenChinesePage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const XiamenPage = lazy(() => import("./pages/XiamenPage"));

const scrollPositions = new Map<string, number>();
type ScrollLocation = { pathname: string; search: string; hash: string };

export function getPageScrollPlan(
  previous: ScrollLocation | null,
  next: ScrollLocation,
  navigationType: "POP" | "PUSH" | "REPLACE",
  savedTop?: number,
) {
  if (navigationType === "POP" && savedTop !== undefined) {
    return { kind: "position" as const, top: savedTop };
  }
  if (
    next.hash &&
    (!previous ||
      previous.pathname !== next.pathname ||
      previous.hash !== next.hash ||
      previous.search === next.search)
  ) {
    let id = next.hash.slice(1);
    try {
      id = decodeURIComponent(id);
    } catch {
      /* Keep malformed fragments literal. */
    }
    return { kind: "anchor" as const, id };
  }
  if (
    previous?.pathname === next.pathname &&
    (!next.hash || previous.hash === next.hash)
  ) {
    return { kind: "preserve" as const };
  }
  return { kind: "position" as const, top: 0 };
}

function PageLocation() {
  const location = useLocation();
  const navigationType = useNavigationType();
  const previous = useRef<ScrollLocation | null>(null);
  useEffect(() => {
    const originalRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    return () => {
      window.history.scrollRestoration = originalRestoration;
    };
  }, []);
  useEffect(() => {
    const remember = () =>
      scrollPositions.set(
        location.key,
        document.getElementById("page-panel")?.scrollTop ?? 0,
      );
    const panel = document.getElementById("page-panel");
    panel?.addEventListener("scroll", remember, { passive: true });
    return () => panel?.removeEventListener("scroll", remember);
  }, [location.key]);
  useLayoutEffect(() => {
    const crumbs = getBreadcrumbs(location.pathname);
    document.title = `${crumbs.at(-1)?.label ?? "HanLingo"} · HanLingo`;
    const old = previous.current;
    previous.current = location;
    const panel = document.getElementById("page-panel");
    if (!panel) return;
    const plan = getPageScrollPlan(
      old,
      location,
      navigationType,
      scrollPositions.get(location.key),
    );
    if (plan.kind === "preserve") {
      scrollPositions.set(location.key, panel.scrollTop);
      return;
    }
    const frame = requestAnimationFrame(() => {
      let top = plan.kind === "position" ? plan.top : 0;
      if (plan.kind === "anchor") {
        const target = document.getElementById(plan.id);
        if (target && panel.contains(target)) {
          const margin =
            parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
          const padding =
            parseFloat(getComputedStyle(panel).scrollPaddingTop) || 0;
          top =
            panel.scrollTop +
            target.getBoundingClientRect().top -
            panel.getBoundingClientRect().top -
            margin -
            padding;
        }
      }
      panel.scrollTo({ top: Math.max(0, top), behavior: "instant" });
      scrollPositions.set(location.key, panel.scrollTop);
    });
    return () => cancelAnimationFrame(frame);
  }, [location, navigationType]);
  return null;
}
function LocationTrail() {
  const { pathname } = useLocation();
  const crumbs = getBreadcrumbs(pathname);
  if (crumbs.length < 2) return null;
  return (
    <nav className="location-trail" aria-label="Breadcrumb">
      <ol>
        {crumbs.map((crumb, index) => (
          <li key={crumb.path}>
            {index === crumbs.length - 1 ? (
              <span aria-current="page">{crumb.label}</span>
            ) : (
              <Link to={crumb.path}>{crumb.label}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
function LegacyLanguageRoute() {
  const { pathname, search, hash } = useLocation();
  return (
    <Navigate
      to={`${pathname.replace(/^\/languages/, "") || "/"}${search}${hash}`}
      replace
    />
  );
}
function LegacyMinPlaceRoute({ place }: { place: string }) {
  const { search, hash } = useLocation();
  return <Navigate to={`/min/southern-min/${place}${search}${hash}`} replace />;
}
function NotFound() {
  return (
    <section className="not-found-page">
      <h1>Page not found</h1>
      <Link to="/" className="primary-button">
        Browse languages <ArrowRight size={17} />
      </Link>
    </section>
  );
}
export default function App() {
  const { pathname } = useLocation();
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <Link to="/" className="brand" aria-label="HanLingo home">
          <img
            className="brand-lockup"
            src="/hanlingo-logo.svg?v=2"
            alt="HanLingo"
            width="178"
            height="38"
          />
        </Link>
        <nav
          className="main-nav"
          aria-label="Main navigation"
          id="main-navigation"
        >
          <NavLink
            to="/"
            end
            className={
              pathname === "/" ||
              languages.some(
                (group) =>
                  pathname === `/${group.id}` ||
                  pathname.startsWith(`/${group.id}/`),
              )
                ? "active"
                : ""
            }
          >
            {siteTerms.tree}
          </NavLink>
          <NavLink to="/compare">{siteTerms.compare}</NavLink>
          <NavLink to="/romanization">{siteTerms.romanization}</NavLink>
        </nav>
      </header>
      <div className="site-workspace">
        <LanguageTree />
        <div className="page-panel" id="page-panel">
          <main id="main" tabIndex={-1}>
            <LocationTrail />
            <Suspense
              fallback={
                <div className="chapter-loading" role="status">
                  Loading
                </div>
              }
            >
              <PageLocation />
              <Routes>
                <Route path="/" element={<TreeHomePage />} />
                <Route path="/languages/*" element={<LegacyLanguageRoute />} />
                <Route path="/min" element={<MinPage />} />
                {Object.entries(legacyMinPlaces).map(([oldId, place]) => (
                  <Route
                    key={oldId}
                    path={`/min/southern-min/${oldId}`}
                    element={<LegacyMinPlaceRoute place={place} />}
                  />
                ))}
                <Route
                  path="/min/southern-min/xiamen/*"
                  element={<XiamenPage />}
                />
                <Route path="/:languageId" element={<ReferencePage />} />
                <Route
                  path="/:languageId/:subgroupId"
                  element={<ReferencePage />}
                />
                <Route
                  path="/:languageId/:subgroupId/:varietyId"
                  element={<ReferencePage />}
                />
                <Route
                  path="/:languageId/:subgroupId/:varietyId/:chapter"
                  element={<LocalLearningPage />}
                />
                <Route path="/compare" element={<ReadingRoom />} />
                <Route path="/romanization" element={<RomanizationPage />} />
                <Route
                  path="/written-chinese"
                  element={<WrittenChinesePage />}
                />
                <Route path="/about" element={<AboutPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
        </div>
      </div>
    </>
  );
}
