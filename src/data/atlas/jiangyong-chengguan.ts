import type { AtlasLocality } from './types';

/** Huang's urban Chengguan survey is separate from the Baishui village record. */
export const atlasJiangyongChengguanLocalities: AtlasLocality[] = [{
  id: 'jiangyong-chengguan',
  name: 'Jiangyong · Chengguan',
  nativeName: '江永城關',
  groupId: 'tuhua',
  branchId: 'southern-hunan',
  clusterId: 'yongzhou-area',
  coordinates: [111.3459, 25.27196],
  scope: 'Huang Xuezhen’s Chengguan Tuhua reference in the Jiangyong county town: focused survey in 1987, published in 1993. Chengguan town was renamed Xiaopu in 1995. This urban reference does not stand for Baishui village, Shangjiangxu, or all of today’s Xiaopu town.',
  source: {
    title: 'Huang Xuezhen · Jiangyong Fangyan Yanjiu · 1993',
    url: 'https://archive.org/details/jiangyong-fangyan-yanjiu-9787800503879/page/n15/mode/2up',
    locator: 'Printed p. 1 identifies the 1987 focused Chengguan Tuhua survey and the county seat; pp. 9 and 41 supply the selected tone key and character readings. Yongzhou-area is an editorial geographic collection, not a subgroup attributed to Huang.',
  },
  geographySource: {
    title: 'Sincomp · georeferenced CCR locality index',
    url: 'https://github.com/lernanto/sincomp/blob/537236686ac30938aff807c4858de5b8d5c24e73/src/sincomp/ccr_dialects.csv#L516',
    locator: 'Separate row 江永城關(市區): latitude 25.271960, longitude 111.345900. Approximate urban anchor, not a speaker address. The preceding Baishui row is a different locality.',
  },
  aliases: ['江永城关', '江永城關市區', '江永城关市区', 'Jiangyong county town', 'Xiaopu', '潇浦', '瀟浦'],
}];
