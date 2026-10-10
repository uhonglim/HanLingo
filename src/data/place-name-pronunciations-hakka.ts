/**
 * Hailu name readings normalized with an explicit official IPA/tone key.
 * These are dictionary citation forms, not transcriptions of local recordings.
 * Keep the attested source spelling in place-readings-other.ts for provenance.
 */
import type { PlaceNamePronunciation } from './place-name-pronunciations';

const placeSource = {
  title: 'MOE Taiwan Hakka dictionary · 地名清單, explicit Hailu notes',
  url: 'https://hakkadict.moe.edu.tw/appendix/%E5%9C%B0%E5%90%8D%E6%B8%85%E5%96%AE/',
};
const mappingSource = {
  title: 'MOE 客家語拼音方案使用手冊 (2012), pp. 1–3 · IPA and Hailu tone tables',
  url: 'https://hakkadict.moe.edu.tw/static/resource/%E5%AE%A2%E8%AA%9E%E8%B3%87%E6%BA%90%E4%B8%8B%E8%BC%89/%E5%85%B6%E4%BB%96%E8%B3%87%E6%BA%90/hakka_pinyin3.pdf#page=5',
};

const hailuName = (ipa: string, sourceForm: string): PlaceNamePronunciation => ({
  ipa,
  toneNotation: 'pitch-contour',
  source: placeSource,
  mappingSource,
  note: `The appendix explicitly supplies Hailu ${sourceForm}; the administrative suffix is omitted here. Broad IPA is normalized from that spelling with the MOE segment and Hailu tone tables, not quoted as an independent recorded transcription. Citation tones are retained; connected-speech sandhi is not applied. This is the dictionary's Hailu reference, not a survey of every local speaker.`,
});

// The official key gives rh = ʒ, zh = tʃ, sh = ʃ, g = k, b = p,
// initial k = kʰ, and final d/g = t/k. The vowel letters keep their
// chart values; no extra vowel length, glide or release detail is inferred.
// Hailu: ˋ = 53 (open), ˊ = 24, + = 33; unmarked open = 55,
// unmarked checked = 5. All fourteen source rows were checked directly.
export const hakkaPlaceNamePronunciations: Record<string, PlaceNamePronunciation> = {
  'guanyin-hakka': hailuName('kon53 ʒim53', 'gonˋ rhimˋ kiˋ'),
  'xinwu-hakka': hailuName('sin53 vuk5', 'sinˋ vug kiˋ'),
  'xinfeng-hakka': hailuName('sin53 fuŋ53', 'sinˋ fungˋ hiongˋ'),
  'xinpu-hakka': hailuName('sin53 pu53', 'sinˋ buˋ zhinˊ'),
  'hukou-hakka': hailuName('fu55 kʰieu24', 'fu kieuˊ hiongˋ'),
  'qionglin-hakka': hailuName('kiuŋ53 lim55', 'giungˋ lim hiongˋ'),
  'hengshan-hakka': hailuName('vaŋ55 san53', 'vang sanˋ hiongˋ'),
  'guanxi-hakka': hailuName('kuan53 si53', 'guanˋ siˋ zhinˊ'),
  'beipu-hakka': hailuName('pet5 pu53', 'bed buˋhiongˋ'),
  'baoshan-hakka': hailuName('po24 san53', 'boˊ sanˋ hiongˋ'),
  'emei-hakka': hailuName('ŋo55 mi55', 'ngo mi hiongˋ'),
  'zhudong-hakka': hailuName('tʃuk5 tuŋ53', 'zhug dungˋ zhinˊ'),
  'jian-hakka': hailuName('kit5 on53', 'gid onˋ hiongˋ'),
  'shoufeng-hakka': hailuName('ʃiu33 fuŋ53', 'shiu+ fungˋ hiongˋ'),
};
