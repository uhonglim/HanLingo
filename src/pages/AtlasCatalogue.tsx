import PlaceName from "../components/PlaceName";
import { lazy, Suspense } from 'react';
import { Link, Navigate, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import { atlasBranches, atlasClusters, atlasLocalities, atlasClusterPath, atlasLocalityPath, findAtlasCluster, findAtlasLocality } from '../data/atlas';
import type { AtlasLocality, AtlasSource } from '../data/atlas';
import { mapPoints } from '../data/languages';
import { getLocalGallery } from '../data/galleries';
import { availableSections, getLocalLearning } from '../data/learning';
import { findLearningPlace } from '../data/learning/places';
import PlaceNameNotes from "../components/PlaceNameNotes";
import LanguageNameNotes from "../components/LanguageNameNotes";
import AtlasMap from '../components/AtlasMap';
import BranchLearning from '../components/BranchLearning';
import LocalityScenes from '../components/LocalityScenes';
import './AtlasCatalogue.css';
const ReferencePage = lazy(() => import('../components/ReferencePages'));
const LocalLearningPage = lazy(() => import('./LocalLearningPage'));
const XiamenPage = lazy(() => import('./XiamenPage'));

function Missing() { return <section className="atlas-catalogue"><h1>Page not found</h1><Link to="/">Han languages</Link></section>; }
function Source({ source }: { source: AtlasSource }) {
  return <p className="atlas-source"><a href={source.url} target="_blank" rel="noreferrer">{source.title}</a><span>{source.locator}</span></p>;
}
function PlaceList({ places }: { places: AtlasLocality[] }) {
  return <div className="atlas-place-list">{places.map(place => {
    const point = findLearningPlace(place.id)!;
    const data = getLocalLearning(point);
    const photos = getLocalGallery(place.id);
    const detail = [data.words.length ? `${data.words.length} readings` : '', photos.length ? `${photos.length} photos` : ''].filter(Boolean).join(' · ');
    return <Link to={atlasLocalityPath(place)} key={place.id}>
      {photos[0] && <img src={photos[0].src} alt="" loading="lazy"/>}
      <div><h3><PlaceName point={place} showHan/></h3><small>{detail || 'Place & classification sources'}</small></div>
    </Link>;
  })}</div>;
}
function ContextMap({ places, selected }: { places: AtlasLocality[]; selected?: AtlasLocality }) {
  const navigate = useNavigate();
  return <section className="atlas-context-map"><h2><Link to={`/map?${selected ? `place=${selected.id}` : `group=${places[0]?.groupId ?? ''}`}`}>Map</Link></h2>
    <AtlasMap points={places} selectedGroup={places[0]?.groupId ?? 'all'} selectedPoint={selected?.id ?? null} onSelectPoint={id => {
      const place = findAtlasLocality(id); if (place) navigate(atlasLocalityPath(place));
    }} compact/>
    <p className="atlas-scope">Markers locate reference places, not dialect boundaries. Open Map to explore the whole atlas.</p>
  </section>;
}
export function AtlasBranchCards({ groupId }: { groupId: string }) {
  return <section className="atlas-directory"><h2>Branches</h2><div className="atlas-directory-grid">{atlasBranches.filter(b => b.groupId === groupId).map(b => <Link to={`/${b.groupId}/${b.id}`} key={b.id}><h3>{b.name}{' '}<span lang="zh">{b.nativeName}</span></h3><p>{atlasClusters.filter(c => c.groupId === groupId && c.branchId === b.id).length} clusters · {atlasLocalities.filter(p => p.groupId === groupId && p.branchId === b.id).length} locality references</p></Link>)}</div></section>;
}
export function AtlasBranchPage() {
  const { languageId, subgroupId } = useParams();
  const branch = atlasBranches.find(b => b.groupId === languageId && b.id === subgroupId);
  if (!branch) return <Missing/>;
  const clusters = atlasClusters.filter(c => c.groupId === languageId && c.branchId === subgroupId);
  const places = atlasLocalities.filter(p => p.groupId === languageId && p.branchId === subgroupId);
  return <article className="atlas-catalogue"><header><h1>{branch.name}{' '}<span lang="zh">{branch.nativeName}</span></h1><p>{clusters.length} clusters · {places.length} locality references</p></header>
    <BranchLearning groupId={branch.groupId} subgroupId={branch.id}/>
    <section className="atlas-child-directory"><h2>Explore the branch</h2><div className="atlas-directory-grid">{clusters.map(c => <Link key={c.id} to={atlasClusterPath(c)}><h3>{c.name}{' '}<span lang="zh">{c.nativeName}</span></h3><p>{c.description}</p><small>{c.kind === 'geographic' ? 'Geographic collection' : 'Source classification'} · {places.filter(p => p.clusterId === c.id).length} places</small></Link>)}</div></section>
    <ContextMap places={places}/>
    {branch.groupId === "min" && branch.id === "southern-min" && <LanguageNameNotes/>}
    <p className="atlas-scope">Four browsing levels: group → branch → cluster → locality. Source ranks vary; a geographic collection is not an invented linguistic subbranch.</p>
  </article>;
}
export function AtlasClusterPage() {
  const { languageId = '', subgroupId = '', clusterId = '' } = useParams();
  const { search, hash } = useLocation();
  const cluster = findAtlasCluster(languageId, subgroupId, clusterId);
  const old = findAtlasLocality(clusterId);
  if (!cluster && old && mapPoints.some(p => p.id === old.id && p.groupId === languageId && p.subgroupId === subgroupId)) return <Navigate replace to={atlasLocalityPath(old) + search + hash}/>;
  if (!cluster) return <Missing/>;
  const places = atlasLocalities.filter(p => p.groupId === languageId && p.branchId === subgroupId && p.clusterId === clusterId);
  return <article className="atlas-catalogue"><header><h1>{cluster.name}{' '}<span lang="zh">{cluster.nativeName}</span></h1><p>{cluster.description}</p><small>{cluster.kind === 'geographic' ? 'Geographic collection · not a claimed linguistic subbranch' : 'Source classification'} · {places.length} locality references</small></header>
    <BranchLearning groupId={languageId} subgroupId={subgroupId} localityIds={places.map(p => p.id)}/>
    <section className="atlas-child-directory"><h2>Local voices</h2><PlaceList places={places}/></section>
    <ContextMap places={places}/>{cluster.id === "tsuan-chiang" && <LanguageNameNotes/>}<h2>Classification source</h2><Source source={cluster.source}/>
  </article>;
}
function CatalogueLocalityPage({ place }: { place: AtlasLocality }) {
  const point = findLearningPlace(place.id)!;
  const data = getLocalLearning(point);
  const sections = availableSections(point);
  const cluster = findAtlasCluster(place.groupId, place.branchId, place.clusterId)!;
  const neighbours = atlasLocalities.filter(p => p.groupId === place.groupId && p.branchId === place.branchId);
  return <article className="atlas-catalogue atlas-locality"><header><h1><PlaceName point={place} showHan/></h1>
    {sections.length > 0 && <p className="atlas-learning-counts">{[data.words.length ? `${data.words.length} source readings` : '', getLocalGallery(place.id).length ? `${getLocalGallery(place.id).length} photographs` : ''].filter(Boolean).join(' · ')}</p>}
  </header>
    {place.referenceType === 'county' && <p className="atlas-scope">County-level distribution reference; local accents may differ within this area.</p>}
    {getLocalGallery(place.id).length > 0 && <LocalityScenes point={point}/>}
    {data.words.length > 0 && <p className="atlas-reading-scope">{[...new Set(data.words.map(w => w.registerLabel).filter(Boolean))].join(' · ')}</p>}
    <BranchLearning groupId={place.groupId} subgroupId={place.branchId} point={point}/>
    {!data.words.length && <p className="atlas-scope">Local IPA readings are still being documented.</p>}
    <ContextMap places={neighbours} selected={place}/>
    <section><h2>Sources</h2><Source source={place.source}/>{place.source.url !== cluster.source.url && <Source source={cluster.source}/>}{place.geographySource && <Source source={place.geographySource}/>}
      <details className="atlas-reference-notes"><summary>Place and naming notes</summary><p>{place.scope}</p><p>{cluster.description}</p><PlaceNameNotes point={point}/></details>
    </section>
  </article>;
}
export function AtlasLocalityRoute() {
  const { languageId = '', subgroupId = '', clusterId = '', varietyId = '', '*': rawRest = '' } = useParams();
  // Static hosts canonicalize directory entry points with a trailing slash.
  const rest = rawRest.replace(/\/+$/, '');
  const { search, hash } = useLocation();
  const old = findAtlasLocality(clusterId);
  const oldLesson = old && mapPoints.find(p => p.id === old.id);
  if (oldLesson && old?.groupId === languageId && oldLesson.subgroupId === subgroupId && availableSections(oldLesson).some(s => s === varietyId) && !rest) return <Navigate replace to={`${atlasLocalityPath(old)}/${varietyId}${search}${hash}`}/>;
  const place = findAtlasLocality(varietyId);
  if (!place || place.groupId !== languageId || place.branchId !== subgroupId || place.clusterId !== clusterId) return <Missing/>;
  const oldReference = mapPoints.some(p => p.id === place.id);
  if (rest && !availableSections(findLearningPlace(place.id)!).some(section => section === rest)) return <Missing/>;
  return <Suspense fallback={<p>Loading</p>}>{place.id === 'xiamen' ? <XiamenPage/> : <Routes>
    <Route index element={oldReference ? <ReferencePage/> : <CatalogueLocalityPage place={place}/>}/>
    <Route path=":chapter" element={<LocalLearningPage/>}/>
    <Route path="*" element={<Missing/>}/>
  </Routes>}</Suspense>;
}
