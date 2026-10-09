/**
 * Name-only pronunciation evidence. This is not a local speech recording.
 * The dictionary attestations stay in place-readings-min.ts; these records
 * document the additional phonetic key used before applying HanLingo's key.
 */
import type { PlaceNamePronunciation } from './place-name-pronunciations';
import { placeReadingsMin, minLandmarkReadings } from './place-readings-min';

const moePhoneticKey = {
  title: 'MOE Tâi-lô manual · initial table, tone categories and IPA rime tables, pp. 5, 8, 53–54',
  url: 'https://language.moe.gov.tw/001/Upload/FileUpload/3677-15601/Documents/tshiutsheh_1081017.pdf',
};

const dictionaryName = (id: string, ipa: string, qualification = ''): PlaceNamePronunciation => ({
  ipa,
  toneNotation: 'source-category',
  source: placeReadingsMin[id].source,
  mappingSource: moePhoneticKey,
  note: `Broad phonemic rendering of the MOE dictionary name using its published IPA key; citation-tone categories, not pitch or sandhi.${qualification ? ` ${qualification}` : ''}`,
});

const amoyPhoneticKey = {
  title: 'Luo Changpei · 廈門音系 (1930), pp. 9–12, Amoy consonants and rimes',
  url: 'https://upload.wikimedia.org/wikipedia/commons/5/54/NTUL-9900013542F01_%E5%BB%88%E9%97%A8%E9%9F%B3%E7%B3%BB.pdf',
};

/** Only names supported by both a name attestation and a documented phonetic key. */
export const minPlaceNamePronunciations: Record<string, PlaceNamePronunciation> = {
  xiamen: {
    ipa: 'e7 mŋ̍5', toneNotation: 'source-category',
    source: placeReadingsMin.xiamen.source,
    mappingSource: amoyPhoneticKey,
    note: 'Editorial broad rendering of the attested Amoy name Ē-mn̂g, checked against Luo’s Amoy phonemic inventory. Traditional POJ categories 7 and 5 are retained; no modern pitch or connected-speech transcription is claimed.',
  },
  gulangyu: {
    ipa: 'kɔ2 lɔŋ7 su7', toneNotation: 'source-category',
    source: minLandmarkReadings.gulangyu.source,
    mappingSource: amoyPhoneticKey,
    note: 'Editorial broad rendering of the attested Amoy name kó·-lōng-sū. Luo’s Amoy inventory distinguishes [ɔ] from [o] and supplies the [ɔŋ] rime. POJ categories 2, 7 and 7 are retained; this is not a new island-specific recording.',
  },
  taipak: dictionaryName('taipak', 'tai5 pak4'),
  tainan: dictionaryName('tainan', 'tai5 lam5'),
  kaohsiung: dictionaryName('kaohsiung', 'kə1 hiɔŋ5', 'The manual uses [ə] for o and notes regional alternatives; this is not a measured Kaohsiung accent.'),
  yilan: dictionaryName('yilan', 'gi5 lan5'),
  lukang: dictionaryName('lukang', 'lɔk8 kaŋ2'),
  sanxia: dictionaryName('sanxia', 'sam1 kiap4'),
};
