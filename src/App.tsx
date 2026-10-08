import { Suspense, lazy, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, NavLink, Navigate, Route, Routes, useLocation, useNavigationType } from "react-router-dom";
import { ArrowRight, Github, Menu, X } from "lucide-react";
import MinPage from "./pages/MinPage";
import { getBreadcrumbs } from "./navigation";
import "./pages/pages.css";
const LibraryPage = lazy(() => import("./pages/LibraryPage"));
const ReferencePage = lazy(() => import("./components/ReferencePages"));
const ReadingRoom = lazy(() => import("./pages/ReadingRoom"));
const RomanizationPage = lazy(() => import("./pages/RomanizationPage"));
const WrittenChinesePage = lazy(() => import("./pages/WrittenChinesePage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const XiamenPage = lazy(() => import("./pages/XiamenPage"));

const scrollPositions = new Map<string, number>();
function PageLocation() {
  const location = useLocation();
  const navigationType = useNavigationType();
  const previous = useRef(location);
  useEffect(() => {
    window.history.scrollRestoration = 'manual';
    const remember = () => scrollPositions.set(location.key, window.scrollY);
    window.addEventListener('scroll', remember, { passive: true });
    return () => window.removeEventListener('scroll', remember);
  }, [location.key]);
  useLayoutEffect(() => {
    const crumbs = getBreadcrumbs(location.pathname);
    document.title = `${crumbs.at(-1)?.label ?? 'HanLingo'} · HanLingo`;
    const old = previous.current;
    previous.current = location;
    if (old.pathname === location.pathname && old.search !== location.search) return;
    const target = navigationType === 'POP' ? scrollPositions.get(location.key) ?? 0 : 0;
    const frame = requestAnimationFrame(() => {
      if (location.hash) document.getElementById(location.hash.slice(1))?.scrollIntoView();
      else window.scrollTo({ top: target, behavior: 'instant' });
    });
    return () => cancelAnimationFrame(frame);
  }, [location, navigationType]);
  return null;
}
function LocationTrail() {
  const { pathname } = useLocation();
  const crumbs = getBreadcrumbs(pathname);
  if (crumbs.length < 2) return null;
  return <nav className="location-trail" aria-label="Breadcrumb"><ol>
    {crumbs.map((crumb, index) => <li key={crumb.path}>
      {index === crumbs.length - 1 ? <span aria-current="page">{crumb.label}</span> : <Link to={crumb.path}>{crumb.label}</Link>}
    </li>)}
  </ol></nav>;
}
function NotFound() {
  return (
    <section className="not-found-page">
      <h1>Page not found</h1>
      <Link to="/languages" className="primary-button">
        Browse languages <ArrowRight size={17} />
      </Link>
    </section>
  );
}
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <Link
          to="/"
          className="brand"
          aria-label="HanLingo home"
          onClick={closeMenu}
        >
          <img
            className="brand-lockup"
            src="/hanlingo-logo.svg?v=2"
            alt="HanLingo"
            width="178"
            height="38"
          />
        </Link>
        <nav
          className={menuOpen ? "main-nav is-open" : "main-nav"}
          aria-label="Main navigation"
          id="main-navigation"
        >
          <NavLink to="/languages" onClick={closeMenu}>
            Languages
          </NavLink>
          <NavLink to="/compare" onClick={closeMenu}>
            Compare
          </NavLink>
          <NavLink to="/romanization" onClick={closeMenu}>
            Romanization
          </NavLink>
        </nav>
        <a
          className="github-link"
          aria-label="Open HanLingo on GitHub"
          href="https://github.com/uhonglim/HanLingo"
          target="_blank"
          rel="noreferrer"
        >
          <Github size={17} />
          <span>GitHub</span>
        </a>
        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-controls="main-navigation"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>
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
            <Route path="/" element={<Navigate to="/languages/min" replace />} />
            <Route path="/languages" element={<LibraryPage />} />
            <Route path="/languages/min" element={<MinPage />} />
            <Route
              path="/languages/min/southern-min/xiamen/*"
              element={<XiamenPage />}
            />
            <Route path="/languages/:languageId" element={<ReferencePage />} />
            <Route
              path="/languages/:languageId/:subgroupId"
              element={<ReferencePage />}
            />
            <Route
              path="/languages/:languageId/:subgroupId/:varietyId"
              element={<ReferencePage />}
            />
            <Route path="/compare" element={<ReadingRoom />} />
            <Route path="/romanization" element={<RomanizationPage />} />
            <Route path="/written-chinese" element={<WrittenChinesePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <footer className="site-footer">
        <Link className="brand" to="/">
          <img
            className="brand-lockup"
            src="/hanlingo-logo.svg?v=2"
            alt="HanLingo"
            width="178"
            height="38"
          />
        </Link>
        <Link to="/about">Sources & about</Link>
      </footer>
    </>
  );
}
