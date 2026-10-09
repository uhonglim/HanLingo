import type { AtlasCluster, AtlasLocality, AtlasSource } from './types';

const source = (title: string, url: string, locator: string): AtlasSource => ({ title, url, locator });
export const overseasMinSources = {
  sibu: source('Ting & Ting · The Foochow Chinese', 'https://ir.unimas.my/id/eprint/37271/1/dialects1.pdf', '2021 study of 204 parent–child pairs in Sibu; family language use'),
  sitiawan: source('Khoo, Cho & Chan · Foochow settlement in Sitiawan', 'https://asj.upd.edu.ph/mediabox/archive/ASJ-10-01-1972/khoo%20cho%20and%20chan-spatial%20aspects%20foochow%20settlement%20west%20malaysia%20special%20reference%20sitiawan%20perak%20since%201902.pdf', 'Asian Studies 10, 1972 · Sitiawan settlement and migrant origins'),
  medan: source('Linda Wijaya · Hokkien language maintenance in Medan', 'https://digilib.unimed.ac.id/id/eprint/40209/', '2020 Universitas Negeri Medan thesis · interviews and observations in Medan'),
  manila: source('Tsai Hui-Ming · Philippine Hokkien', 'https://www.ocac.gov.tw/OCAC/file/attach/727609/file_88899.pdf', 'Study abstract · Philippine Hokkien and its Jinjiang connections; national scope'),
  teochew: source('SCCC Culturepaedia · Teochew in Singapore', 'https://culturepaedia.singaporeccc.org.sg/language-education/the-teochew-dialect-in-singapore/', 'Luo Futeng · local phonology, vocabulary, grammar and teaching'),
  hainanese: source('SCCC Culturepaedia · Hainanese in Singapore', 'https://culturepaedia.singaporeccc.org.sg/language-education/the-hainan-dialect-in-singapore/', 'Luo Futeng · Singapore speech and Haikou/Wenchang regional distinctions'),
  sinica: source('Academia Sinica · Chinese dialect character readings', 'https://xiaoxue.iis.sinica.edu.tw/ccrdata/', 'Min archive · locality-labelled Bangkok Teochew dataset'),
};
export const atlasOverseasMinClusters: AtlasCluster[] = [
  { id: 'overseas-foochow', groupId: 'min', branchId: 'eastern-min', branchName: 'Eastern Min', branchNativeName: '閩東語', name: 'Overseas Foochow', nativeName: '海外福州話', kind: 'geographic', description: 'A geographic collection of Malaysian Foochow communities. Their different migrant origins and present-day speech are not a newly proposed linguistic subbranch.', source: overseasMinSources.sibu },
  { id: 'overseas-hainanese', groupId: 'min', branchId: 'hainan-min', branchName: 'Hainan Min', branchNativeName: '海南閩語', name: 'Overseas Hainanese', nativeName: '海外海南話', kind: 'geographic', description: 'Overseas locality references, kept separate from island reference points. Singapore families have several Hainanese regional origins.', source: overseasMinSources.hainanese },
];
const place = (id: string, name: string, nativeName: string, branchId: string, clusterId: string, coordinates: [number, number], citation: AtlasSource, scope: string, aliases: string[] = []): AtlasLocality => ({ id, name, nativeName, groupId: 'min', branchId, clusterId, coordinates, source: citation, scope, aliases });
export const atlasOverseasMinLocalities: AtlasLocality[] = [
  place('manila-hokkien', 'Manila', '馬尼拉', 'southern-min', 'tsuan-chiang', [120.975, 14.600], overseasMinSources.manila, 'Manila reference anchored at Binondo. The cited study describes Philippine Hokkien nationally; it is context, not a city-specific IPA inventory.', ['Binondo', 'Philippine Hokkien', 'Lán-lâng-uē']),
  place('medan-hokkien', 'Medan', '棉蘭', 'southern-min', 'tsuan-chiang', [98.674, 3.590], overseasMinSources.medan, 'Hokkien use in Medan, North Sumatra. The source studies language maintenance rather than supplying a phonetic inventory.', ['Medan Hokkien']),
  place('bangkok-teochew', 'Bangkok', '曼谷', 'southern-min', 'teo-swa', [100.510, 13.740], overseasMinSources.sinica, 'The Bangkok Teochew reference in the cited character-reading dataset. The map locates the city, not a language boundary.', ['Thai Teochew', 'Yaowarat']),
  place('singapore-teochew', 'Singapore', '新加坡', 'southern-min', 'teo-swa', [103.849, 1.285], overseasMinSources.teochew, 'Singapore Teochew reference, distinct from Singapore Hokkien and Hainanese. A city can have several language references.', ['Singapore Teochew']),
  place('sibu-foochow', 'Sibu', '詩巫', 'eastern-min', 'overseas-foochow', [111.828, 2.288], overseasMinSources.sibu, 'Foochow community in Sibu, Sarawak. Family-language research does not establish one uniform urban accent.', ['Sibu Foochow', 'Sibu Fuzhou']),
  place('sitiawan-foochow', 'Sitiawan', '實兆遠', 'eastern-min', 'overseas-foochow', [100.697, 4.216], overseasMinSources.sitiawan, 'Sitiawan–Kampung Koh settlement reference in Perak. Migrants came from several places; this is a locality collection, not a reconstructed common accent.', ['Sitiawan Foochow', 'Kampung Koh']),
  place('singapore-hainanese', 'Singapore', '新加坡', 'hainan-min', 'overseas-hainanese', [103.855, 1.298], overseasMinSources.hainanese, 'Singapore Hainanese community reference. Wenchang, Haikou and other ancestral varieties must not be conflated.', ['Singapore Hainanese', 'Hylam']),
  place('haikou', 'Haikou', '海口', 'hainan-min', 'northeast-hainan', [110.341, 20.045], overseasMinSources.hainanese, 'Urban Haikou reference, separately named from Wenchang in the source. No Wenchang pronunciation is assigned to Haikou.', ['Hoi How']),
];
