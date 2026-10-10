import type { BranchLearning } from './types';

const city = { title: 'Zhejiang Economic Information Center · Huangyan cultural heritage, 2025', url: 'https://zjic.zj.gov.cn/ywdh/qyfz/202504/t20250414_23380313.shtml' };
const bamboo = { title: 'Ministry of Culture · National intangible heritage list, entry 345', url: 'https://zwgk.mct.gov.cn/zfxxgkml/fwzwhyc/202012/t20201210_918992.html' };
export const huangyanCulture: BranchLearning = {
  branchId: 'wu/taizhou', words: [], soundNotes: [],
  culture: [
    { title: 'A town on the Yongning River', text: 'Wudong Bridge, the old lanes and the Confucian Temple belong to Huangyan’s historic townscape. The riverfront links this older centre with the modern city. The photographs show particular buildings and dates, rather than an unchanged “traditional” town.', localityIds: ['huangyan'], source: city },
    { title: 'Mandarins and ginger soup noodles', text: 'Huangyan’s local foods include mandarins, bayberries, dark rice cakes and ginger soup noodles. A 2025 account from Zhejiang documents these foods in the city’s cultural programme. Their local names need separately attested readings; a photograph alone cannot supply pronunciation.', localityIds: ['huangyan'], source: city },
    { title: 'Bamboo carving', text: 'Huangyan fanhuang bamboo carving is listed as a national intangible cultural heritage extension project in 2008. The listing identifies Huangyan District specifically; it should not be confused with every bamboo-carving tradition in Zhejiang.', localityIds: ['huangyan'], source: bamboo },
  ],
  resources: [
    { title: city.title, description: 'Local bridges, temples, food and cultural spaces.', localityIds: ['huangyan'], kind: 'Culture', url: city.url },
    { title: bamboo.title, description: 'The original national listing for Huangyan bamboo carving.', localityIds: ['huangyan'], kind: 'Culture', url: bamboo.url },
  ],
};
