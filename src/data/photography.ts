import type { LanguageId } from "./languages";

export type GroupPhoto = {
  src: string;
  alt: string;
  caption: string;
  author: string;
  license: string;
  licenseUrl: string;
  sourceUrl: string;
  position?: string;
};

// Documentary contexts, not claims about the identity or language of pictured people.
// Photo licenses apply independently of the application code license.
export const groupPhotos: Partial<Record<LanguageId, GroupPhoto>> & Record<"mandarin" | "min" | "yue" | "hakka" | "wu", GroupPhoto> = {
  mandarin: {
    src: "/images/chengdu-teahouse.webp",
    alt: "Visitors seated around tables beneath a green awning at a park teahouse in Chengdu.",
    caption: "Visitors gather at a teahouse in Baihuatan Park, Chengdu.",
    author: "Daderot",
    license: "CC0",
    licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/deed.en",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Teahouse_in_Baihuatan_Park_-_Chengdu,_China_-_DSC03869.JPG",
    position: "50% 52%",
  },
  min: {
    src: "/images/xiamen-street.webp",
    alt: "People walking along a shopping street beneath colorful overhead banners in Amoy.",
    caption: "Street life on Zhongshan Road, Amoy.",
    author: "xiquinhosilva",
    license: "CC BY 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by/2.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Zhongshan_Road_07371-Xiamen_(48814371052).jpg",
    position: "50% 56%",
  },
  yue: {
    src: "/images/cantonese-opera.webp",
    alt: "Cantonese opera performers in costume preparing their makeup in front of backstage mirrors.",
    caption:
      "Guangzhou Youth Cantonese Opera Troupe performers prepare backstage, 2013.",
    author: "wingmelee",
    license: "CC BY-SA 2.5",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.5",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Guangzhou_Youth_Cantonese_Opera_Troupe_20130604-E.jpg",
    position: "50% 42%",
  },
  hakka: {
    src: "/images/hakka-festival.webp",
    alt: "Dancers performing on stage at the 2014 Hakka Tung Blossom Festival.",
    caption: "Dancers at the 2014 Hakka Tung Blossom Festival.",
    author: "Foxy Who \\(^∀^)/",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:2014%E5%AE%A2%E5%AE%B6%E6%A1%90%E8%8A%B1%E8%88%9E%E8%B9%88%E5%A4%A7%E8%B3%BD_Hakka_Tung_Blossom_Festival_-_panoramio.jpg",
    position: "50% 40%",
  },
  wu: {
    src: "/images/suzhou-pingtan.webp",
    alt: "Two Suzhou Pingtan performers seated with stringed instruments and microphones at a public exhibition.",
    caption: "Suzhou Pingtan performers at MetroTrans 2024.",
    author: "N509FZ",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Suzhou_Pingtan_performers_at_Suzhou_Rail_Transit,_Hall_5,_MetroTrans_2024_(20240614140205).jpg",
    position: "50% 47%",
  },
};
