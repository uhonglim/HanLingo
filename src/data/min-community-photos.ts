import type { GroupPhoto } from "./photography";

// Documentary place photographs, not evidence about anyone's language or identity.
// Image licenses are independent of the application license; see docs/MIN-COMMUNITY-PHOTOS.md.
export const minCommunityPhotos: Record<string, GroupPhoto> = {
  taipak: {
    src: "/images/min-taipak-dihua-street.webp",
    alt: "Brick and stucco shopfronts on Dihua Street, with signs, pedestrians and parked scooters in Taipei.",
    caption: "Dihua Street in Datong, Taipei, photographed in July 2023.",
    author: "Supanut Arunoprayote",
    license: "CC BY 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Buildings_along_Dihua_Street_07.23_(10).jpg",
    position: "50% 55%",
  },
  tainan: {
    src: "/images/min-taiwan-tainan.webp",
    alt: "Vehicle light trails cross an evening street in front of Ji He Tang temple and parked scooters in Tainan.",
    caption: "A street near Shennong Street and Ji He Tang temple, Tainan, 2008.",
    author: "AngMoKio",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Tainan_Streetscene_amk.jpg",
    position: "50% 15%",
  },
  singapore: {
    src: "/images/min-singapore-thian-hock-keng.webp",
    alt: "The entrance facade of Thian Hock Keng in Singapore, with tiled roofs, dragon ornaments and stone columns.",
    caption: "Thian Hock Keng, Singapore, photographed in June 2023.",
    author: "MardianaAlias",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Thian_Hock_Keng_Temple,_20230630.jpg",
    position: "50% 55%",
  },
  "george-town": {
    src: "/images/min-penang-khoo-kongsi.webp",
    alt: "The ornate front hall of Khoo Kongsi in George Town, with roof sculptures, decorated pillars and stone steps.",
    caption: "Khoo Kongsi, George Town, Penang, photographed in January 2020.",
    author: "Supanut Arunoprayote",
    license: "CC BY 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Khoo_Kongsi_(I).jpg",
    position: "50% 20%",
  },
};
