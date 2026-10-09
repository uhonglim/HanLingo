import type { LocalRecording } from './local-recordings';

/** Publisher listening links only. This module does not grant audio embedding or reuse. */
export type PhonemicaRecordingLink = LocalRecording & {
  publishedOn: string;
  originalTitle: string;
  sourceLocality: string;
  transcript: 'timed-community-transcript' | 'none-displayed';
};

export const phonemicaRecordingLinks: PhonemicaRecordingLink[] = [
  {
    id: 'phonemica-changsha-sibyl-2013',
    localityId: 'changsha-xiang',
    title: 'Childhood games in Changsha',
    originalTitle: '长沙儿童游戏',
    speaker: 'Sibyl',
    year: '2013',
    publishedOn: '2013-04-20',
    sourceLocality: 'Changsha City, Hunan',
    transcript: 'timed-community-transcript',
    delivery: 'publisher-page',
    context: 'Sibyl recalls rubber-band jumping, shuttlecocks and skipping ropes. Phonemica identifies Changsha City without a district. The original page has a timed community transcript; this speaker recording, published in 2013, is separate from the historical word-list readings.',
    sourceUrl: 'https://phonemica.net/x/543748332bd553180882ab49/0',
    publisher: 'Phonemica',
  },
  {
    id: 'phonemica-jixi-rzcc-2018',
    localityId: 'jixi-hui',
    title: 'A few words from Jixi',
    originalTitle: '两三言',
    speaker: '然之痴痴',
    year: '2018',
    publishedOn: '2018-06-22',
    sourceLocality: 'Jixi, Anhui; settlement unspecified',
    transcript: 'none-displayed',
    delivery: 'publisher-page',
    context: 'A speaker contribution published in 2018. Phonemica names Jixi and classifies the speech as Hui, Jishe; it does not identify a town or village within the county. No transcript is displayed on the original page.',
    sourceUrl: 'https://phonemica.net/x/5b2c4c4f2bd5531a7216a7ae/0',
    publisher: 'Phonemica',
  },
  {
    id: 'phonemica-nanchang-donghu-consing-2014',
    localityId: 'nanchang-gan',
    title: 'A story from Donghu',
    originalTitle: '东湖的一个故事',
    speaker: 'consing',
    year: '2014',
    publishedOn: '2014-07-22',
    sourceLocality: 'Donghu District, Nanchang, Jiangxi',
    transcript: 'none-displayed',
    delivery: 'publisher-page',
    context: 'A speaker contribution published in 2014 from Donghu District within urban Nanchang, identified by Phonemica as Gan, Changdu. No transcript is displayed. This recording represents its contributor and is separate from the historical Nanchang word-list readings.',
    sourceUrl: 'https://phonemica.net/x/5437480d2bd553180882aaed/0',
    publisher: 'Phonemica',
  },
];
