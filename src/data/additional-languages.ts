import { atlasLaiyuanContactClusters, atlasLaiyuanContactLocalities } from "./atlas/laiyuan-contact";
import { atlasOtherSiniticClusters, atlasOtherSiniticLocalities } from "./atlas/other-sinitic";
import { atlasGanXiangClusters, atlasGanXiangLocalities } from "./atlas/gan-xiang";
import type { Language } from './languages';
import type { EncyclopediaEntry } from './encyclopedia';

const classification = {
  title: 'Xiong Zhenghui & Zhang Zhenxing · 汉语方言的分区 · 2008',
  url: 'https://ling.cass.cn/keyan/xueshuchengguo/cgtj/202112/W020211223385125636799.pdf',
};

/** Tuhua and contact varieties are editorial collections, not additional genealogical groups. */
const records = [
  { id: 'gan', name: 'Gan', nativeName: '贛語', shortName: '贛', color: '#8d5c43', geography: 'Jiangxi and adjoining parts of Hunan, Hubei, Anhui and Fujian', feature: 'From Nanchang and Poyang Lake to the hills of western Jiangxi.', featuredPlace: 'Nanchang', intro: 'Gan includes the speech of Nanchang and many communities around Poyang Lake and inland Jiangxi. Gan and Hakka are related labels in the history of classification, but this atlas keeps their documented localities distinct.', detail: 'The Gan branches on this site follow the classifications named beside each collection. Provincial borders do not define Gan: Jiangxi also contains Mandarin, Hakka, Wu and other speech communities.' },
  { id: 'xiang', name: 'Xiang', nativeName: '湘語', shortName: '湘', color: '#596747', geography: 'Central and eastern Hunan and adjoining districts', feature: 'Changsha, the Xiang River valley and central Hunan.', featuredPlace: 'Changsha', intro: 'Xiang is associated with central and eastern Hunan. Changsha provides one urban reference; it does not stand for every Xiang locality.', detail: '“Old Xiang” and “New Xiang” are useful historical descriptions, but they do not replace the sourced branches and localities in the tree. Voicing, tone and vocabulary differ across those places.' },
  { id: 'jin', name: 'Jin', nativeName: '晉語', shortName: '晉', color: '#766149', geography: 'Shanxi and neighbouring areas of northern China', feature: 'Taiyuan, the Fen River basin and neighbouring northern communities.', featuredPlace: 'Taiyuan', intro: 'Jin is treated as a separate group in the Language Atlas of China. Other classifications place these varieties within Mandarin; the source attached to each entry records the framework used here.', detail: 'A checked-tone category is an important part of Jin classification. Its phonetic realization varies by locality, so a shared category is not a single pronunciation.' },
  { id: 'hui', name: 'Hui', nativeName: '徽語', shortName: '徽', color: '#566b70', geography: 'Southern Anhui and neighbouring parts of Zhejiang and Jiangxi', feature: 'The towns and mountain valleys of historic Huizhou.', featuredPlace: 'Jixi', intro: 'Hui covers local speech in and around historic Huizhou. Nearby towns can differ substantially; a Jixi reading is not a substitute for Tunxi or Shexian.', detail: 'The Language Atlas treats Hui separately from Wu. That grouping and its internal boundaries have a history of scholarly debate. Local source records are retained alongside the browsing hierarchy.' },
  { id: 'pinghua', name: 'Pinghua', nativeName: '平話', shortName: '平', color: '#6c7550', geography: 'Northern and southern Guangxi', feature: 'Distinct northern and southern Guangxi reference communities.', featuredPlace: 'Guilin', intro: 'Pinghua references here distinguish northern and southern Guangxi communities. The label does not mean all speech in Guilin or Nanning is Pinghua.', detail: 'The independence and boundaries of Pinghua are debated. Each reading identifies its surveyed community; urban Mandarin, Yue and nearby Pinghua must not be merged merely because they share a city name.' },
  { id: 'tuhua', name: 'Tuhua collections', nativeName: '土話', shortName: '土', color: '#826b75', geography: 'Source-specific communities in southern Hunan and neighbouring areas', feature: 'Locally documented speech with unsettled or source-specific classification.', featuredPlace: 'Jiangyong · Baishui', intro: 'Tuhua means local speech and is used for more than one community. This is a geographic reference collection, not a claim that all varieties bearing that name form one language group.', detail: 'Entries retain the locality and terminology of their source. Southern Hunan Tuhua, northern Guangdong Tuhua and other regional labels cannot be assumed interchangeable or mutually intelligible.' },
  { id: 'contact', name: 'Contact varieties', nativeName: '接觸方言', shortName: '接', color: '#6e717e', geography: 'Source-specific communities with documented language contact', feature: 'Laiyuan village studies at the Min–Hakka contact zone.', featuredPlace: 'Niujia', intro: 'An editorial collection of documented contact varieties. The Laiyuan study describes mixed features without assigning its village references directly to Min or Hakka.', detail: 'Western Fujian and Laiyuan provide geographic browsing levels. They are not proposed language branches. Each village keeps its own consultant scope, source transcription and historical tone categories; the collection does not assert common ancestry or mutual intelligibility.' },
] satisfies Array<Pick<Language, 'id' | 'name' | 'nativeName' | 'shortName' | 'color' | 'geography' | 'feature' | 'featuredPlace' | 'intro'> & { detail: string }>;

export const additionalLanguages: Language[] = records.map(({ detail: _detail, ...group }) => ({
  ...group, subgroups: [...new Map([...atlasGanXiangClusters, ...atlasOtherSiniticClusters, ...atlasLaiyuanContactClusters].filter(cluster => cluster.groupId === group.id).map(cluster => [cluster.branchId, {
    id: cluster.branchId, name: cluster.branchName, nativeName: cluster.branchNativeName,
    description: cluster.description,
    places: [...atlasGanXiangLocalities, ...atlasOtherSiniticLocalities, ...atlasLaiyuanContactLocalities].filter(place => place.groupId === group.id && place.branchId === cluster.branchId).map(place => place.name),
  }])).values()], hierarchy: ['Sinitic', group.name],
  ...((group.id === 'tuhua' || group.id === 'contact') ? { collectionKind: 'geographic' as const } : {}),
}));

export const additionalGroupArticles: Partial<Record<Language['id'], EncyclopediaEntry>> = Object.fromEntries(records.map(group => [group.id, {
  title: group.name, dek: group.intro,
  sections: [{ heading: 'Local varieties', paragraphs: [group.detail] }],
  facts: [{ label: 'Geographic scope', value: group.geography }],
  sources: group.id === 'contact' ? [{ title: 'Ho Chun-Hui · Laiyuan fieldwork, 2016 · pp. 2, 19–20', url: 'https://cloud.hakka.gov.tw/site/hakka/public/attachment/105A0010.pdf' }] : [classification], readingMinutes: 1,
}]));
