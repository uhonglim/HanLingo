/** Publisher-hosted performances, not redistributable lesson recordings or IPA synthesis. */
export type LocalRecording = {
  id: string; localityId: string; title: string; speaker: string; year: string;
  src: string; context: string; sourceUrl: string; publisher: string;
};
const sourceUrl = 'https://singaporeccc.org.sg/events/sccc-talking-red-packet-2021/';
const base = 'https://cdn.singaporeccc.org.sg/sccc/uploads/2021/01/';
export const localRecordings: LocalRecording[] = [
  { id: 'sccc-hokkien-2021', localityId: 'singapore', title: 'Hokkien New Year greeting', speaker: 'Teo Kun Jie Marshall', year: '2021', src: base + '2.-Hokkien-by-Teo-Kun-Jie-%E5%BC%A0%E7%84%9C%E6%8D%B7-%E7%A6%8F%E5%BB%BA%E8%AF%9D2.mp3', context: 'A greeting performed for SCCC’s Talking Red Packet project. One speaker’s performance; no word-level IPA transcript is supplied.', sourceUrl, publisher: 'Singapore Chinese Cultural Centre' },
  { id: 'sccc-teochew-2021', localityId: 'singapore-teochew', title: 'Teochew New Year greeting', speaker: 'Raina Lee Xin Tian', year: '2021', src: base + '3.-Teochew-by-Lee-Xin-Tian-%E6%9D%8E%E6%AC%A3%E6%81%AC-%E6%BD%AE%E5%B7%9E-%E6%81%AD%E5%96%9C%E6%81%AD%E5%96%9C%E6%96%B0%E6%AD%A3%E5%A6%82%E6%84%8F-1.mp3', context: 'A greeting performed for SCCC’s Talking Red Packet project. One speaker’s performance; no word-level IPA transcript is supplied.', sourceUrl, publisher: 'Singapore Chinese Cultural Centre' },
  { id: 'sccc-hainanese-2021', localityId: 'singapore-hainanese', title: 'Hainanese New Year greeting', speaker: 'Wong Shu Wen', year: '2021', src: base + '6.-Hainanese-by-Wang-Shu-Wen-%E7%8E%8B%E8%88%92%E9%9B%AF-%E6%B5%B7%E5%8D%97%E8%AF%9D.mp3', context: 'A greeting performed for SCCC’s Talking Red Packet project. The publisher identifies the language, not a particular ancestral town accent.', sourceUrl, publisher: 'Singapore Chinese Cultural Centre' },
];
