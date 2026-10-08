import { Suspense, lazy, useLayoutEffect, useState } from "react";
import { Link, NavLink, Route, Routes, useLocation } from "react-router-dom";
import { ArrowRight, Github, Menu, X } from "lucide-react";
import HomePage from "./pages/HomePage";
import { resolveReferenceRoute } from "./routing";
import "./pages/pages.css";
const LibraryPage = lazy(() => import("./pages/LibraryPage"));
const ReferencePage = lazy(() => import("./components/ReferencePages"));
const ReadingRoom = lazy(() => import("./pages/ReadingRoom"));
const RomanizationPage = lazy(() => import("./pages/RomanizationPage"));
const WrittenChinesePage = lazy(() => import("./pages/WrittenChinesePage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const XiamenPage = lazy(() => import("./pages/XiamenPage"));

function PageLocation() {
  const { pathname, hash } = useLocation();
  useLayoutEffect(() => {
    const names: Record<string, string> = {
      "/": "A shared script. A world of voices.",
      "/languages": "The language library",
      "/compare": "A letter home",
      "/romanization": "Romanization workbench",
      "/written-chinese": "Modern Standard Written Chinese",
      "/about": "About the atlas",
    };
    const parts = pathname.split("/").filter(Boolean);
    const reference =
      parts[0] === "languages" && parts.length <= 4
        ? resolveReferenceRoute({
            languageId: parts[1],
            subgroupId: parts[2],
            varietyId: parts[3],
          })
        : null;
    document.title = `HanLingo — ${names[pathname] ?? reference?.point?.name ?? reference?.subgroup?.name ?? reference?.language.name ?? "Page not found"}`;
    if (!hash) window.scrollTo({ top: 0, behavior: "instant" });
    else {
      const target = document.getElementById(hash.slice(1));
      target?.scrollIntoView();
    }
  }, [pathname, hash]);
  return null;
}
function NotFound() {
  return (
    <section className="not-found-page">
      <div className="eyebrow">PAGE NOT FOUND</div>
      <h1>
        A different path
        <br />
        <em>through the atlas.</em>
      </h1>
      <p>
        This address does not match a chapter. The language library connects
        every group, subgroup, and local variety in this edition.
      </p>
      <Link to="/languages" className="primary-button">
        Open the language library <ArrowRight size={17} />
      </Link>
    </section>
  );
}
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  return (
    <>
      <PageLocation />
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
          <span className="brand-seal" lang="zh">
            言
          </span>
          <span>
            HanLingo<span className="brand-period">.</span>
          </span>
        </Link>
        <nav
          className={menuOpen ? "main-nav is-open" : "main-nav"}
          aria-label="Main navigation"
        >
          <NavLink to="/languages" onClick={closeMenu}>
            The languages
          </NavLink>
          <NavLink to="/compare" onClick={closeMenu}>
            Reading room
          </NavLink>
          <NavLink to="/romanization" onClick={closeMenu}>
            Romanization
          </NavLink>
          <NavLink to="/about" onClick={closeMenu}>
            About
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
          <span>Open project</span>
        </a>
        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>
      <main id="main" tabIndex={-1}>
        <Suspense
          fallback={
            <div className="chapter-loading" role="status">
              Opening the chapter…
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/languages" element={<LibraryPage />} />
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
          <span className="brand-seal" lang="zh">
            言
          </span>
          <span>
            HanLingo<span className="brand-period">.</span>
          </span>
        </Link>
        <p>Connected by roots. Distinct in every voice.</p>
        <Link to="/about">
          Sources & the project <ArrowRight size={15} />
        </Link>
      </footer>
    </>
  );
}
