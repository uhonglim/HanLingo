import type { AtlasCluster, AtlasLocality } from './types';

const cantoneseCommunitySource = {
  title: 'Lee Kok Leong · Cantonese clan associations in Singapore · SCCC Culturepaedia',
  url: 'https://culturepaedia.singaporeccc.org.sg/communities/dialect-group/the-cantonese-clan-associations-of-singapore/',
  locator: 'Opening section identifies Cantonese as Guangfu speech. This supports the site’s Cantonese reference placement, not the classification of every Guangdong-origin association or ancestral variety.',
};

export const atlasOverseasYueClusters: AtlasCluster[] = [{
  id: 'overseas-cantonese', groupId: 'yue', branchId: 'guangfu',
  branchName: 'Guangfu', branchNativeName: '廣府片',
  name: 'Overseas Cantonese', nativeName: '海外廣府話', kind: 'geographic',
  description: 'Cantonese locality references outside its southern China source region. This is a geographic collection, not a linguistic subdivision.',
  source: cantoneseCommunitySource,
}];

export const atlasOverseasYueLocalities: AtlasLocality[] = [{
  id: 'singapore-cantonese', name: 'Singapore', nativeName: '新加坡',
  groupId: 'yue', branchId: 'guangfu', clusterId: 'overseas-cantonese',
  coordinates: [103.8, 1.3],
  aliases: ['Singapore Cantonese', '新加坡廣東話', '新加坡广东话', 'Singapore Guangfu'],
  scope: 'Singapore Cantonese community reference in Luo Futeng’s overview. Its five phonetic examples omit tones and do not specify speakers or collection dates. This does not represent every Cantonese speaker, Taishanese, or Hakka community in Singapore. Local place-name IPA is not yet collected.',
  source: {
    title: 'Luo Futeng · The Cantonese dialect in Singapore · SCCC Culturepaedia',
    url: 'https://culturepaedia.singaporeccc.org.sg/language-education/the-cantonese-dialect-in-singapore/',
    locator: 'Phonology, examples 1–2; updated 14 May 2026. Guangfu placement is an editorial alignment with the source’s Cantonese/Guangfu terminology, supported separately by Lee Kok Leong’s community history.',
  },
  geographySource: {
    title: 'Wikidata · Singapore · CC0',
    url: 'https://www.wikidata.org/wiki/Q334',
    locator: 'P625 Point(103.8 1.3), checked 9 October 2026. Approximate city-state anchor, not a speaker address, cultural-site location or language boundary.',
  },
}];
