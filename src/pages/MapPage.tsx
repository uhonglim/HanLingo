import { normalizeNameSearch as normalize } from "../data/name-search";
import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowUpRight, Search, X } from 'lucide-react';
import AtlasMap from '../components/AtlasMap';
import { atlasBranches, atlasClusters, atlasLocalities, atlasLocalityPath } from '../data/atlas';
import type { AtlasLocality } from '../data/atlas';
import { findLearningPlace } from "../data/learning/places";
import { languages } from '../data/languages';
import { communityAliases } from '../data/language-names';
import { availableSections, learningSections } from '../data/learning';
import './MapPage.css';


const clusterAliases: Record<string, string> = { 'tsuan-chiang': 'Hokkien Hoklo Quanzhang 泉漳', 'teo-swa': 'Teochew Chaoshan 潮汕' };
export function filterMapLocalities(points: AtlasLocality[], query: string, group = '', branch = '') {
  const terms = normalize(query).trim().split(/\s+/).filter(Boolean);
  return points.filter(point => {
    if (group && point.groupId !== group) return false;
    if (branch && point.branchId !== branch) return false;
    const text = normalize([point.id, point.name, point.nativeName, point.groupId, point.branchId, point.clusterId,
      atlasClusters.find(cluster => cluster.groupId === point.groupId && cluster.branchId === point.branchId && cluster.id === point.clusterId)?.name,
      communityAliases[point.id], ...(point.aliases ?? []), clusterAliases[point.clusterId]].filter(Boolean).join(' '));
    return terms.every(term => text.includes(term));
  });
}

export default function MapPage() {
  const [params, setParams] = useSearchParams();
  const group = languages.some(item => item.id === params.get('group')) ? params.get('group')! : '';
  const branches = atlasBranches.filter(branch => !group || branch.groupId === group);
  const branch = branches.some(item => `${item.groupId}/${item.id}` === params.get('branch')) ? params.get('branch')! : '';
  const branchId = branch.split('/')[1] ?? '';
  const query = params.get('q') ?? '';
  const points = useMemo(() => filterMapLocalities(atlasLocalities, '', group, branchId), [group, branchId]);
  const results = useMemo(() => filterMapLocalities(points, query), [points, query]);
  const selected = points.find(point => point.id === params.get('place'));
  const cluster = selected && atlasClusters.find(item => item.groupId === selected.groupId && item.branchId === selected.branchId && item.id === selected.clusterId);
  const selectedBranch = selected && atlasBranches.find(item => item.groupId === selected.groupId && item.id === selected.branchId);
  const lesson = selected && findLearningPlace(selected.id);
  function update(values: Record<string, string | null>) {
    setParams(previous => {
      const next = new URLSearchParams(previous);
      for (const [key, value] of Object.entries(values)) value ? next.set(key, value) : next.delete(key);
      return next;
    }, { replace: true });
  }
  function select(id: string) { update({ place: id, q: null }); }
  return <section className="map-page">
    <header className="map-page-heading"><h1>Map</h1><p>{points.length} locality references</p></header>
    <div className="map-page-filters">
      <div className="map-page-search-wrap">
        <label className="map-page-search"><Search size={17} aria-hidden="true"/><span className="sr-only">Find a locality on the map</span>
          <input type="search" value={query} onChange={event => update({ q: event.target.value })} placeholder="Find a place" autoComplete="off" aria-controls={query.trim() ? 'map-search-results' : undefined}/>
          {query && <button type="button" onClick={() => update({ q: null })} aria-label="Clear map search"><X size={15}/></button>}
        </label>
        {query.trim() && <div className="map-page-results" id="map-search-results">
          <p role="status">{results.length ? `${results.length} ${results.length === 1 ? 'match' : 'matches'}` : 'No matching localities'}</p>
          <ul>{results.slice(0, 20).map(point => <li key={point.id}><button type="button" onClick={() => select(point.id)}><span>{point.name} <span lang="zh">{point.nativeName}</span></span><small>{languages.find(group => group.id === point.groupId)?.name}</small></button></li>)}</ul>
          {results.length > 20 && <p>First 20 shown. Refine your search to find a locality.</p>}
        </div>}
      </div>
      <label className="map-page-select"><span className="sr-only">Language group</span><select aria-label="Language group" value={group} onChange={event => update({ group: event.target.value, branch: null, place: null })}><option value="">All five groups</option>{languages.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label>
      <label className="map-page-select"><span className="sr-only">Language branch</span><select aria-label="Language branch" value={branch} onChange={event => { const value = event.target.value; update({ branch: value, group: value ? value.split('/')[0] : group, place: null }); }}><option value="">All branches</option>{branches.map(item => <option key={`${item.groupId}/${item.id}`} value={`${item.groupId}/${item.id}`}>{item.name}</option>)}</select></label>
    </div>
    <div className="map-page-frame"><AtlasMap compact={Boolean(group || branch)} points={points} selectedGroup={group || 'all'} selectedPoint={selected?.id ?? null} highlightedPointIds={query.trim() ? results.map(point => point.id) : undefined} onSelectPoint={select}/></div>
    <div className="map-page-selection" aria-live="polite">
      {selected ? <><div className="map-page-selection-heading"><h2><Link to={atlasLocalityPath(selected)}>{selected.name} <span lang="zh">{selected.nativeName}</span><ArrowUpRight size={20} aria-hidden="true"/></Link></h2><p>{languages.find(item => item.id === selected.groupId)?.name} / {selectedBranch?.name} / {cluster?.name}</p></div><div className="map-page-selection-copy"><p>{selected.scope}</p><span className="map-page-sections">{lesson ? availableSections(lesson).map(section => learningSections[section]).join(' · ') : 'Locality & sources'}</span></div></> : <p>Select a point to explore its local language and sources.</p>}
    </div>
  </section>;
}
