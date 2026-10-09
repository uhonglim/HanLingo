import { lazy, Suspense } from 'react';
import { Link, Navigate, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import { atlasBranches, atlasClusters, atlasLocalities, atlasClusterPath, atlasLocalityPath, findAtlasCluster, findAtlasLocality } from '../data/atlas';
import type { AtlasSource } from '../data/atlas';
import { mapPoints } from '../data/languages';
import { getLocalGallery } from '../data/galleries';
import { availableSections, learningSections } from '../data/learning';
import AtlasMap from '../components/AtlasMap';
import BranchLearning from '../components/BranchLearning';
import './AtlasCatalogue.css';
const ReferencePage = lazy(() => import('../components/ReferencePages'));
const LocalLearningPage = lazy(() => import('./LocalLearningPage'));
const XiamenPage = lazy(() => import('./XiamenPage'));
function Missing() { return <section className="atlas-catalogue"><h1>Page not found</h1><Link to="/">Han languages</Link></section>; }
function Source({source}:{source:AtlasSource}) { return <p className="atlas-source"><a href={source.url} target="_blank" rel="noreferrer">{source.title}</a><span>{source.locator}</span></p>; }
export function AtlasBranchCards({groupId}:{groupId:string}) {
  return <section className="atlas-directory"><h2>Branches</h2><div className="atlas-directory-grid">{atlasBranches.filter(b=>b.groupId===groupId).map(b=><Link to={`/${b.groupId}/${b.id}`} key={b.id}><h3>{b.name}{" "}<span lang="zh">{b.nativeName}</span></h3><p>{atlasClusters.filter(c=>c.groupId===groupId&&c.branchId===b.id).length} clusters · {atlasLocalities.filter(p=>p.groupId===groupId&&p.branchId===b.id).length} locality references</p></Link>)}</div></section>;
}
export function AtlasBranchPage() {
  const {languageId,subgroupId}=useParams();
  const branch=atlasBranches.find(b=>b.groupId===languageId&&b.id===subgroupId);
  if(!branch) return <Missing/>;
  const clusters=atlasClusters.filter(c=>c.groupId===languageId&&c.branchId===subgroupId);
  return <article className="atlas-catalogue"><header><h1>{branch.name}{" "}<span lang="zh">{branch.nativeName}</span></h1><p>{clusters.length} clusters · {atlasLocalities.filter(p=>p.groupId===languageId&&p.branchId===subgroupId).length} locality references</p></header><div className="atlas-directory-grid">{clusters.map(c=><Link key={c.id} to={atlasClusterPath(c)}><h2>{c.name}{" "}<span lang="zh">{c.nativeName}</span></h2><p>{c.description}</p><small>{c.kind==='geographic'?'Geographic collection':'Source classification'} · {atlasLocalities.filter(p=>p.groupId===c.groupId&&p.branchId===c.branchId&&p.clusterId===c.id).length} places</small></Link>)}</div><p className="atlas-scope">Four browsing levels: group → branch → cluster → locality. Source ranks vary. Geographic collections organize attested places without inventing a linguistic subbranch.</p><BranchLearning groupId={branch.groupId} subgroupId={branch.id}/></article>;
}
export function AtlasClusterPage() {
  const {languageId='',subgroupId='',clusterId=''}=useParams();
  const {search,hash}=useLocation();
  const navigate=useNavigate();
  const cluster=findAtlasCluster(languageId,subgroupId,clusterId);
  const old=findAtlasLocality(clusterId);
  if(!cluster&&old&&mapPoints.some(p=>p.id===old.id&&p.groupId===languageId&&p.subgroupId===subgroupId)) return <Navigate replace to={atlasLocalityPath(old)+search+hash}/>;
  if(!cluster) return <Missing/>;
  const places=atlasLocalities.filter(p=>p.groupId===languageId&&p.branchId===subgroupId&&p.clusterId===clusterId);
  const representative=places.map(p=>getLocalGallery(p.id)[0]).find(Boolean);
  return <article className="atlas-catalogue"><header><h1>{cluster.name}{" "}<span lang="zh">{cluster.nativeName}</span></h1><p>{cluster.description}</p><small>{cluster.kind==='geographic'?'Geographic collection · not a claimed linguistic subbranch':'Source classification'} · {places.length} locality references</small></header>{representative&&<figure className="atlas-catalogue-photo"><img src={representative.src} alt={representative.alt}/><figcaption>{representative.caption} <a href={representative.sourceUrl}>{representative.author}</a> · <a href={representative.licenseUrl}>{representative.license}</a></figcaption></figure>}<div className="atlas-place-list">{places.map(p=>{const lesson=mapPoints.find(m=>m.id===p.id);return <Link to={atlasLocalityPath(p)} key={p.id}><h2>{p.name}{" "}<span lang="zh">{p.nativeName}</span></h2><small>{lesson?availableSections(lesson).map(s=>learningSections[s]).join(' · '):'Locality reference'}</small></Link>;})}</div><AtlasMap points={places} selectedGroup={languageId} selectedPoint={null} onSelectPoint={id=>{const p=places.find(p=>p.id===id);if(p)navigate(atlasLocalityPath(p));}}/><p className="atlas-scope">Markers locate reference places, not dialect boundaries. A source attestation does not mean that everyone in a city speaks alike.</p><h2>Classification source</h2><Source source={cluster.source}/></article>;
}
export function AtlasLocalityRoute() {
  const {languageId='',subgroupId='',clusterId='',varietyId='', '*':rest=''}=useParams();
  const {search,hash}=useLocation();
  const old=findAtlasLocality(clusterId);
  const oldLesson=old&&mapPoints.find(p=>p.id===old.id);
  if(oldLesson&&old?.groupId===languageId&&oldLesson.subgroupId===subgroupId&&availableSections(oldLesson).some(s=>s===varietyId)&&!rest) return <Navigate replace to={`${atlasLocalityPath(old)}/${varietyId}${search}${hash}`}/>;
  const place=findAtlasLocality(varietyId);
  if(!place||place.groupId!==languageId||place.branchId!==subgroupId||place.clusterId!==clusterId) return <Missing/>;
  const lesson=mapPoints.find(p=>p.id===place.id);
  if(lesson) return <Suspense fallback={<p>Loading</p>}>{place.id==='xiamen'?<XiamenPage/>:<Routes><Route index element={<ReferencePage/>}/><Route path=":chapter" element={<LocalLearningPage/>}/><Route path="*" element={<Missing/>}/></Routes>}</Suspense>;
  if(rest) return <Missing/>;
  const cluster=findAtlasCluster(place.groupId,place.branchId,place.clusterId)!;
  return <article className="atlas-catalogue"><header><h1>{place.name}{" "}<span lang="zh">{place.nativeName}</span></h1><p>{place.scope}</p></header><section><h2>Language and place</h2><p>{cluster.description}</p><p className="atlas-scope">This entry documents a locality and its source classification. Local recordings, IPA lessons and photographs have not yet been added; neighbouring readings are not substituted.</p></section><AtlasMap points={[place]} selectedGroup={languageId} selectedPoint={place.id} onSelectPoint={()=>{}}/><p className="atlas-scope">The marker is an approximate place anchor, not a dialect boundary or a claim about all residents.</p><h2>Sources</h2><Source source={place.source}/>{place.source.url!==cluster.source.url&&<Source source={cluster.source}/>}</article>;
}
