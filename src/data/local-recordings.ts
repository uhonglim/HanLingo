import { phonemicaRecordingLinks } from './recording-links-phonemica';

/** Original publisher listening pages; inline reuse permission has not been established. */
export type LocalRecording = {
  id: string; localityId: string; title: string; speaker: string; year: string;
  delivery: 'publisher-page'; context: string; sourceUrl: string; publisher: string;
};
const sourceUrl = 'https://singaporeccc.org.sg/events/sccc-talking-red-packet-2021/';
export const localRecordings: LocalRecording[] = [
  { id: 'sccc-hokkien-2021', localityId: 'singapore', title: 'Hokkien New Year greeting', speaker: 'Teo Kun Jie Marshall', year: '2021', delivery: 'publisher-page', context: 'A greeting performed for SCCC’s Talking Red Packet project. One speaker’s performance; no word-level IPA transcript is supplied.', sourceUrl, publisher: 'Singapore Chinese Cultural Centre' },
  { id: 'sccc-teochew-2021', localityId: 'singapore-teochew', title: 'Teochew New Year greeting', speaker: 'Raina Lee Xin Tian', year: '2021', delivery: 'publisher-page', context: 'A greeting performed for SCCC’s Talking Red Packet project. One speaker’s performance; no word-level IPA transcript is supplied.', sourceUrl, publisher: 'Singapore Chinese Cultural Centre' },
  { id: 'sccc-hainanese-2021', localityId: 'singapore-hainanese', title: 'Hainanese New Year greeting', speaker: 'Wong Shu Wen', year: '2021', delivery: 'publisher-page', context: 'A greeting performed for SCCC’s Talking Red Packet project. The publisher identifies the language, not a particular ancestral town accent.', sourceUrl, publisher: 'Singapore Chinese Cultural Centre' },
  { id: 'sccc-cantonese-2021', localityId: 'singapore-cantonese', title: 'Cantonese New Year greeting', speaker: 'Ng Rui Zhao', year: '2021', delivery: 'publisher-page', context: 'A child’s festive greeting for SCCC’s Talking Red Packet project. No word-level IPA transcript is supplied.', sourceUrl, publisher: 'Singapore Chinese Cultural Centre' },
  ...phonemicaRecordingLinks,
];
