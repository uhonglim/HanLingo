import type { BranchLearning } from './types';
import { atlasExtraGalleries } from '../galleries/atlas-extra';

const wenlingGazetteer = { title: 'Taizhou Local Gazetteer · Wenling scenic places', url: 'https://tzsz.zjtz.gov.cn/art/2018/12/13/art_1229209654_54440083.html' };
const paper = { title: 'China Intangible Cultural Heritage Digital Museum · Yueqing fine-line paper-cutting', url: 'https://www.ihchina.cn/project_details/13929/' };
const wood = { title: 'China Intangible Cultural Heritage Digital Museum · Yueqing boxwood carving', url: 'https://www.ihchina.cn/project_details/14024' };
const bao = { title: 'Hefei municipal cultural account · Bao Gong shrine', url: 'https://m.ccdi.gov.cn/content/68/00/13456.html' };
const anhuiMuseum = { title: 'Anhui Museum · Huizhou architectural collection', url: 'https://www.ahm.cn/News/Details/fwzl?nid=14782' };

// Culture-only expansion: no neighbouring city's pronunciation is borrowed.
export const atlasCulturePacks: BranchLearning[] = [
  {
    branchId: 'mandarin/jianghuai', words: [], soundNotes: [],
    culture: [
      { title: 'Bao Park and the shrine', text: 'Bao Gong shrine stands on Xianghuadun beside the water in central Hefei. Halls, inscribed stones and garden buildings commemorate Bao Zheng. The gallery’s bridge belongs to the surrounding park; it is not the shrine itself.', localityIds: ['hefei'], source: bao, photo: atlasExtraGalleries.hefei.find(photo => photo.id === 'hefei-bao-park') },
      { title: 'Anhui’s collections in Hefei', text: 'Anhui Museum brings objects from across the province to Hefei. Its Huizhou architectural collection includes carved wood, brick and stone. These pieces teach the craft of Huizhou, a different region from Hefei. The gallery shows the museum’s Shushan building.', localityIds: ['hefei'], source: anhuiMuseum, photo: atlasExtraGalleries.hefei.find(photo => photo.id === 'hefei-museum') },
    ],
    resources: [
      { title: 'Bao Gong shrine and its setting', description: 'A municipal cultural account of the shrine, inscriptions, garden buildings and water around Xianghuadun.', localityIds: ['hefei'], kind: 'Culture', url: bao.url },
      { title: 'Anhui Museum', description: 'Official collections and exhibitions, with separate addresses for the Luyang and Shushan buildings in Hefei.', localityIds: ['hefei'], kind: 'Culture', url: 'https://www.ahm.cn/' },
      { title: 'Huizhou architectural objects', description: 'The museum explains the carved wood, brick and stone in its provincial collection.', localityIds: ['hefei'], kind: 'Culture', url: anhuiMuseum.url },
    ],
  },
  {
    branchId: 'wu/taizhou', words: [], soundNotes: [],
    culture: [
      { title: 'From stone quarry to cavern', text: 'Changyu Dongtian in Xinhe grew out of stone-slab quarrying. Its chambers and cut rock faces record work inside the mountain. The gallery shows the Shuangmen entrance; the site belongs to the wider Wenling municipality.', localityIds: ['wenling'], source: wenlingGazetteer, photo: atlasExtraGalleries.wenling.find(photo => photo.id === 'wenling-quarry') },
      { title: 'Shitang’s stone-built coast', text: 'Shitang’s hillside houses, lanes and steps use local stone. Carved granite window grilles add geometric patterns to the buildings. This coastal community is a distinct place within Wenling; its architecture does not establish the pronunciation of urban Wenling.', localityIds: ['wenling'], source: wenlingGazetteer, photo: atlasExtraGalleries.wenling.find(photo => photo.id === 'wenling-shitang') },
    ],
    resources: [
      { title: 'Wenling places in the Taizhou gazetteer', description: 'Quarry landscapes, coastal stone buildings and the city’s park architecture, with named locations.', localityIds: ['wenling'], kind: 'Culture', url: wenlingGazetteer.url },
      { title: 'Changyu Dongtian municipal site description', description: 'Wenling’s official account of the quarry site and its surrounding landscape.', localityIds: ['wenling'], kind: 'Culture', url: 'https://www.wl.gov.cn/art/2013/1/10/art_1544447_27478587.html' },
    ],
  },
  {
    branchId: 'wu/oujiang', words: [], soundNotes: [],
    culture: [
      { title: 'Fine-line paper-cutting', text: 'Yueqing’s fine-line paper-cutting developed from decorations for dragon lanterns. Makers cut closely spaced lines and small openings into geometric, floral and narrative patterns. The heritage record names several communities, including Lecheng, rather than attributing the craft to every resident.', localityIds: ['yueqing'], source: paper },
      { title: 'Boxwood carving', text: 'Yueqing boxwood carving includes small figures and compositions that work with the shape of roots or split wood. The national heritage record distinguishes these approaches; the wood’s grain and natural form guide the carving.', localityIds: ['yueqing'], source: wood },
    ],
    resources: [
      { title: 'Yueqing fine-line paper-cutting', description: 'National heritage entry describing places, lantern decoration and paper-cutting techniques.', localityIds: ['yueqing'], kind: 'Culture', url: paper.url },
      { title: 'Yueqing boxwood carving', description: 'National heritage entry describing figure, root and split-wood carving.', localityIds: ['yueqing'], kind: 'Culture', url: wood.url },
      { title: 'Yueqing heritage exhibition', description: 'The Ministry of Culture documents local paper-cutting and boxwood-carving institutions.', localityIds: ['yueqing'], kind: 'Culture', url: 'https://www.mct.gov.cn/whzx/tpxw/200606/t20060621_828325.htm' },
    ],
  },
];
