import type { AtlasLocality } from './types';

export const atlasWeiziluLocalities: AtlasLocality[] = [{
  id: 'weizilu-pinghua',
  name: 'Weizilu',
  nativeName: '位子渌',
  groupId: 'pinghua',
  branchId: 'southern-pinghua',
  clusterId: 'yong-river',
  coordinates: [108.2722080, 22.8441636],
  scope: 'Weizilu community in Xixiangtang, Nanning. De Sousa’s 2024 publication names this specific fieldwork reference, without identifying a speaker address or collection date. The map uses Weizilu Road as an orientation anchor; it does not mark a village centre, interview site or language boundary.',
  source: {
    title: 'Hilário de Sousa 2024 · Weizilu Pinghua · CC BY 4.0',
    url: 'https://hilario.bambooradical.com/downloadables/languages-09-00311-with-cover.pdf#page=18',
    locator: 'Table 5, printed p.17: 南寧位子碌 Nanning Weizilu, Pinghua Southern. Appendix B p.28: author’s fieldwork. Yong River is the website’s explicitly geographic collection, not an additional source dialect rank. Community name 位子渌 and Xixiangtang placement independently documented by Nanning Vocational Technology University, 22 June 2026, https://jzxy.nnvtu.edu.cn/info/1269/8134.htm .',
  },
  geographySource: {
    title: 'OpenStreetMap contributors · Weizilu Road · ODbL',
    url: 'https://www.openstreetmap.org/way/1037240461',
    locator: 'Nominatim named-road reference 位子渌路, Xixiangtang, Nanning; representative coordinate [108.2722080,22.8441636]. Road orientation anchor only, not a survey coordinate. Retrieved 2026-10-09.',
  },
  aliases: ['位子碌', '位子渌社区', 'Nanning Weizilu', 'Wèizǐlù'],
}];
