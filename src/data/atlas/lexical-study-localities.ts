import type { AtlasCluster, AtlasLocality } from './types';

const countySource = {
  title: 'Jing Liwen · Language Atlas of China, second edition, county distribution · 2025',
  url: 'https://doi.org/10.5281/zenodo.15897647',
};

export const atlasLexicalStudyClusters: AtlasCluster[] = [{
  id: 'yunnan', groupId: 'mandarin', branchId: 'southwestern',
  branchName: 'Southwestern Mandarin', branchNativeName: '西南官話',
  name: 'Yunnan', nativeName: '雲南片', kind: 'classification',
  description: 'The Yunnan subdivision of Southwestern Mandarin in the second-edition Atlas county table. Kunming is further assigned to 滇中小片 in that source; this finer source rank remains documented here rather than becoming an extra website level.',
  source: { ...countySource, locator: 'County-table row 3379, code 530100: 官话 / 西南官话 / 云南片 / 滇中小片. Classification evidence is separate from the 1950s Kunming lexical survey.' },
}];

/** Named lexical surveys, not the county-distribution records or inferred speaker addresses. */
export const atlasLexicalStudyLocalities: AtlasLocality[] = [
  {
    id: 'loudi-study', name: 'Loudi', nativeName: '婁底',
    groupId: 'xiang', branchId: 'loushao', clusterId: 'xiangshuang',
    coordinates: [111.9975, 27.7377777778],
    scope: 'The named Loudi sample in Liu, Wang and Bai’s 2007 lexical collection. The source does not supply a speaker address or collection date. The map uses a city anchor; neither the surrounding Louxing District distribution nor other towns in the Loudi prefecture are treated as this same reading sample.',
    source: {
      title: 'Liu, Wang & Bai 2007 · Loudi lexical sample; Hunan provincial dialect survey',
      url: 'https://www.hunan.gov.cn/jxxx/hxwh/jfy/201711/t20171111_4685273.html',
      locator: 'Hunan provincial source identifies city Loudi speech with Shuangfeng in Old Xiang’s Lou–Shao division. Jing 2025 DOI 10.5281/zenodo.15897647, row 1775, city-core code 431302: 湘语 / 娄邵片 / 湘双小片. Lexical evidence remains the separately pinned Liu CLDF Language_ID Loudi, not this county table.',
    },
    geographySource: { title: 'Wikidata Q416988 · Loudi city anchor · CC0', url: 'https://www.wikidata.org/wiki/Q416988', locator: 'P625 checked 2026-10-09: 27°44′16″N, 111°59′51″E. City marker only; no speaker location inferred.' },
    aliases: ['娄底', '婁底詞彙調查', 'Loudi lexical survey'],
  },
  {
    id: 'kunming-study', name: 'Kunming', nativeName: '昆明',
    groupId: 'mandarin', branchId: 'southwestern', clusterId: 'yunnan',
    coordinates: [102.7061111111, 25.0433333333],
    scope: 'The Kunming reference in Beijing University’s lexical survey, collected in the 1950s and published in 1964. The licensed CLDF edition slightly adjusted IPA. This city-named survey is not a new recording or a uniform description of today’s entire Kunming municipality; a precise speaker address is not supplied.',
    source: {
      title: 'Beijing University 1964 · Kunming lexical sample; Jing 2025 classification',
      url: 'https://github.com/lexibank/beidasinitic/tree/6bb8f57330f3b28c126a633f2c2adc6d01d0f555',
      locator: 'CLDF Language_ID Kunming. Separate second-edition classification: Jing 2025 DOI 10.5281/zenodo.15897647, row 3379, code 530100: 官话 / 西南官话 / 云南片 / 滇中小片. No source variety borrowed from an adjacent county.',
    },
    geographySource: { title: 'Wikidata Q182852 · Kunming city anchor · CC0', url: 'https://www.wikidata.org/wiki/Q182852', locator: 'P625 checked 2026-10-09: 25°2′36″N, 102°42′22″E. City marker only; no speaker location inferred.' },
    aliases: ['昆明詞彙調查', 'Kunming lexical survey'],
  },
];
