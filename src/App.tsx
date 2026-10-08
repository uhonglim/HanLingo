import { Suspense, lazy, useLayoutEffect, useState } from "react";
import { Link, NavLink, Route, Routes, useLocation } from "react-router-dom";
import { ArrowRight, Github, Menu, X } from "lucide-react";
import HomePage from "./pages/HomePage";
import BrandMark from "./components/BrandMark";
import MinPage from "./pages/MinPage";
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
      "/": "Min",
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
          <BrandMark size={34} />
          <span>HanLingo</span>
        </Link>
        <nav
          className={menuOpen ? "main-nav is-open" : "main-nav"}
          aria-label="Main navigation"
        >
          <NavLink to="/languages/min" onClick={closeMenu}>
            Min
          </NavLink>
          <NavLink to="/languages" end onClick={closeMenu}>
            Languages
          </NavLink>
          <NavLink to="/compare" onClick={closeMenu}>
            Reading room
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
              Loading
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
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
          <BrandMark size={34} />
          <span>HanLingo</span>
        </Link>
        <Link to="/about">Sources & about</Link>
      </footer>
    </>
  );
}
