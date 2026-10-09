import type { AtlasLocality } from './types';

/** A named settlement anchor for the source's Yunlou reference, not a speaker address. */
export const atlasYunlouGanLocalities: AtlasLocality[] = [{
  id: 'yunlou-gan',
  name: 'Yunlou',
  nativeName: '雲樓',
  groupId: 'gan',
  branchId: 'jicha',
  clusterId: 'jicha-localities',
  coordinates: [115.16583, 26.86083],
  scope: 'Ji’an Yunlou Gan as described by Chang and Yang in 2026. The paper identifies Yunlou and the local label Xin’an accent, but gives no speaker addresses or village-level survey boundary. The map marks the named Yunlou settlement in the former Yunlou area, now in Futian; it does not represent all residents of that settlement or the whole Ji’an region.',
  source: {
    title: 'Chang & Yang · Ji’an Yunlou Gan · 2026 · CC BY 4.0',
    url: 'https://link.springer.com/article/10.1007/s11049-026-09716-5',
    locator: 'P. 2 names Ji’an Yunlou and describes the native-speaker judgments; p. 4, footnote 2 explicitly assigns this variety to Ji–Cha Gan. Ji–Cha localities is an editorial geographic collection, not an extra linguistic subdivision claimed by the paper.',
  },
  geographySource: {
    title: 'GeoNames · Yunlou · populated place 1923997 · CC BY 4.0',
    url: 'https://www.geonames.org/1923997/yunlou.html',
    locator: 'Yunlou, Jiangxi, Ji’an Shi; WGS84 latitude 26.86083, longitude 115.16583. Settlement anchor only; the linguistic source does not identify an exact consultant village or address.',
  },
  aliases: ['云楼', '吉安云楼', '雲樓', '新安声', '新安聲', 'Xin’an accent', 'Yunlou Gan'],
}];
