/** Source spellings of place names, never generated IPA or HanLingo readings. */
export type MinPlaceReading = {
  commonName?: string;
  localName: string;
  convention: string;
  source: { title: string; url: string };
  note: string;
};

const amoyManual = {
  title: 'Lim Kian Hui · annotated Amoy manual, dialogue 2',
  url: 'https://limkianhui.wordpress.com/2010/04/14/eng_hoa/',
};
const moeChiu = {
  title: 'MOE Taigi dictionary · 州, place-name examples',
  url: 'https://sutian.moe.edu.tw/zh-hant/su/2284/',
};

export const placeReadingsMin: Record<string, MinPlaceReading> = {
  xiamen: {
    commonName: 'Amoy', localName: 'Ē-mn̂g', convention: 'Amoy Pe̍h-ōe-jī', source: amoyManual,
    note: 'The editor pairs Amoy with Ē-mn̂g in both the historical dialogue and his explicitly present-day wording. This is a source spelling; its tone marks are not HanLingo pitch numbers.',
  },
  quanzhou: {
    localName: 'Tsuân-tsiu', convention: 'MOE Tâi-lô', source: moeChiu,
    note: 'The dictionary records this Hokkien name for 泉州. It is not a new recording of an urban Quanzhou speaker or a claim that every local accent realizes the name identically.',
  },
  zhangzhou: {
    localName: 'Tsiang-tsiu', convention: 'MOE Tâi-lô', source: moeChiu,
    note: 'The dictionary records this Hokkien name for 漳州. The source is a Taiwan Hokkien dictionary, not a city-specific recording from Zhangzhou.',
  },
  taipak: {
    commonName: 'Taipei', localName: 'Tâi-pak', convention: 'MOE Tâi-lô',
    source: { title: 'MOE Taigi dictionary · 臺北 place-name entries', url: 'https://sutian.moe.edu.tw/zh-hant/tshiau/?lui=tai_su&tsha=tai5-pak4' },
    note: 'The dictionary lists 臺北 as Tâi-pak and 臺北市 as Tâi-pak-tshī. The short place name is used here; Taigi is a language label, not the name of this city.',
  },
  tainan: {
    commonName: 'Tainan', localName: 'Tâi-lâm', convention: 'MOE Tâi-lô',
    source: { title: 'MOE Taigi dictionary · 臺南', url: 'https://sutian.moe.edu.tw/zh-hant/su/20696/' },
    note: 'The place name is directly recorded in the dictionary’s railway-station appendix. It does not define one accent across the whole municipality.',
  },
  kaohsiung: {
    commonName: 'Kaohsiung', localName: 'Ko-hiông', convention: 'MOE Tâi-lô',
    source: { title: 'MOE Taigi dictionary · Kaohsiung Red Line place names', url: 'https://sutian.moe.edu.tw/zh-hant/huliok/155/' },
    note: 'Ko-hiông is the place-name component in the dictionary’s 高雄國際機場 and 高雄車站 entries. The destination suffix is omitted here, without changing the source spelling.',
  },
  yilan: {
    commonName: 'Yilan', localName: 'Gî-lân', convention: 'MOE Tâi-lô',
    source: { title: 'MOE Taigi dictionary · 宜蘭 place-name entries', url: 'https://sutian.moe.edu.tw/zh-hant/tshiau/?lui=tai_su&tsha=gi5-lan5' },
    note: 'The dictionary records Gî-lân for 宜蘭 and separately records the city and county forms. This locality is anchored to the city.',
  },
  lukang: {
    commonName: 'Lukang', localName: 'Lo̍k-káng', convention: 'MOE Tâi-lô',
    source: { title: 'MOE Taigi dictionary · 方言, locality example', url: 'https://sutian.moe.edu.tw/zh-hant/su/948/' },
    note: 'The dictionary’s example directly writes Lo̍k-káng for 鹿港. Its administrative appendix separately lists Lo̍k-káng-tìn for the township.',
  },
  sanxia: {
    commonName: 'Sanxia', localName: 'Sam-kiap', convention: 'MOE Tâi-lô',
    source: { title: 'MOE Taigi dictionary · New Taipei administrative names, 三峽區', url: 'https://sutian.moe.edu.tw/zh-hant/huliok/124/?iahbe=1&pitsoo=50' },
    note: 'The appendix records Sam-kiap-khu for 三峽區. The district suffix -khu is omitted for the short locality label; the name itself is not respelled.',
  },
  singapore: {
    commonName: 'Singapore', localName: 'Sin-ka-pho', convention: 'Hokkien community spelling',
    source: { title: 'Penang Hokkien Podcast · episode 810, Sin-ka-pho 新加坡', url: 'https://www.youtube.com/watch?v=jRLFohNkSh8' },
    note: 'The Hokkien podcast uses this name for Singapore in its episode title. This documents a community spelling, not a complete survey of Singapore Hokkien pronunciations.',
  },
  'george-town': {
    commonName: 'George Town', localName: 'Pho3 Te4', convention: 'Timothy Tye’s Penang Hokkien spelling',
    source: { title: 'Timothy Tye · Place Names in Penang Hokkien', url: 'https://www.penang-traveltips.com/hokkien/place-names.htm' },
    note: 'The source explicitly pairs George Town with Pho3 Te4. Its spelling and tone digits are retained; the city is not equated with the whole of Penang, and these digits are not HanLingo pitch contours.',
  },
  fuzhou: {
    commonName: 'Foochow', localName: 'Hók-ciŭ', convention: 'Bàng-uâ-cê',
    source: { title: 'Fuzhounese-English Dictionary · Learn Fuzhounese', url: 'https://fuzhounese.org/learn' },
    note: 'The community dictionary explicitly gives Hók-ciŭ for 福州, the city. This is the written citation-form name; the source explains that connected pronunciation undergoes tone sandhi.',
  },
  'changle-min': {
    commonName: 'Dionglok', localName: 'Diòng-lŏ̤h', convention: 'Association’s Foochow romanization',
    source: { title: 'Singapore Foochow Dionglok Association · Our Story', url: 'https://fzcl.sg/' },
    note: 'The association explicitly pairs Changle 長樂 with Diòng-lŏ̤h and explains its familiar name Dionglok. This specific locality remains separate from urban Foochow.',
  },
  chaozhou: {
    commonName: 'Teochew', localName: 'diê-tsiu', convention: 'The Teochew Store’s community transcription',
    source: { title: 'The Teochew Store · The Different Names of Teochew', url: 'https://www.theteochewstore.org/blogs/latest/42851843-the-different-names-of-teochew' },
    note: 'The community article explicitly identifies diê-tsiu as the pronunciation of 潮州 in the prefectural city’s prestige speech. Its notation is retained, without inventing tone numbers.',
  },
};

/** A verified landmark name, not an invented extra locality or hierarchy level. */
export const minLandmarkReadings: Record<string, MinPlaceReading> = {
  gulangyu: {
    commonName: 'Kulangsu', localName: 'kó·-lōng-sū', convention: 'Amoy Pe̍h-ōe-jī, source typography', source: amoyManual,
    note: 'Dialogue 2 pairs this name with 鼓浪嶼 and retains it in the editor’s present-day wording. The source’s raised-dot typography is preserved. Kulangsu is UNESCO’s conventional name (https://whc.unesco.org/en/list/1541); the island is within Amoy, not a new atlas locality here.',
  },
};
