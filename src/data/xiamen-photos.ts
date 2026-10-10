export type XiamenPhoto = {
  id: string;
  src: string;
  alt: string;
  caption: string;
  author: string;
  license: string;
  licenseUrl: string;
  sourceUrl: string;
  category: "Food" | "Streets" | "Sea" | "Culture";
  year?: string;
  position?: string;
};

// The first photo is the dedicated hero. Captions identify documented places
// and activities; they do not assert anyone's ethnicity or spoken language.
export const xiamenPhotos: XiamenPhoto[] = [
  {
    id: "gulangyu-rooftops",
    src: "/images/xiamen-gulangyu-rooftops.webp",
    alt: "Rooftops and trees on Kulangsu overlook blue harbor water and Amoy’s city skyline.",
    caption:
      "Kulangsu rooftops and Amoy’s waterfront, viewed from Sunlight Rock.",
    author: "そらみみ",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:View_of_Urban_Area_of_Amoy_from_Mount_Riguangyan.jpg",
    category: "Sea",
    year: "2012",
    position: "50% 65%",
  },
  {
    id: "shacha-noodles",
    src: "/images/xiamen-shacha-noodles.webp",
    alt: "A bowl of noodles in reddish broth with assorted toppings and a spoon.",
    caption: "Shacha noodles photographed in Amoy.",
    author: "Xmhaoyu",
    license: "CC BY 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by/3.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Shachamian.JPG",
    category: "Food",
    year: "2008",
    position: "50% 50%",
  },
  {
    id: "fried-vermicelli",
    src: "/images/xiamen-fried-vermicelli.webp",
    alt: "A plate of stir-fried rice vermicelli with vegetables and other ingredients.",
    caption: "Fried rice vermicelli at a restaurant in Amoy.",
    author: "Hhaithait",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Fried_Rice_vermicelli_Xiamen.jpg",
    category: "Food",
    year: "2010",
    position: "50% 50%",
  },
  {
    id: "dongyu-market",
    src: "/images/xiamen-dongyu-market.webp",
    alt: "Vendors and shoppers among vegetables and stalls on a sunlit street in Dongyu.",
    caption: "A street market in Dongyu, Haicang District, Amoy.",
    author: "N509FZ",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Street_market_in_Dongyu,_Xiamen_(20170123085633).jpg",
    category: "Streets",
    year: "2017",
    position: "50% 55%",
  },
  {
    id: "nanputuo-temple",
    src: "/images/xiamen-nanputuo-temple.webp",
    alt: "The Nanputuo name in gold characters above an arched temple entrance.",
    caption: "An entrance at Nanputuo Temple, Amoy.",
    author: "pan浩",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Nanputuo.JPG",
    category: "Culture",
    year: "2007",
    position: "50% 30%",
  },
  {
    id: "gulangyu-lane",
    src: "/images/xiamen-gulangyu-lane.webp",
    alt: "A quiet lane runs between walls beneath trees on Kulangsu.",
    caption: "A tree-lined lane on Kulangsu.",
    author: "Jerry Luo",
    license: "CC BY 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by/2.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Gulangyu_street.jpg",
    category: "Streets",
    year: "2012",
    position: "50% 50%",
  },
  {
    id: "shellfish-stall",
    src: "/images/xiamen-shellfish-stall.webp",
    alt: "Red basins holding different shellfish line the front of a shop on Kulangsu.",
    caption: "Shellfish offered for sale on Kulangsu.",
    author: "Don Ramey Logan",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Xiamen_China_Gulangyu_Island_shellfish_for_sale_by_Don_Ramey_Logan.jpg",
    category: "Food",
    position: "60% 57%",
  },
  {
    id: "xiamen-ferry",
    src: "/images/xiamen-yuanhe-ferry.webp",
    alt: "The white Yuanhe ferry on harbor water with Kulangsu’s shoreline behind it.",
    caption: "The Yuanhe ferry west of Kulangsu in Amoy Harbor.",
    author: "User:Vmenkov",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Gulangyu_-_Yuanhe_ferry_-_DSCF9335.JPG",
    category: "Sea",
    year: "2012",
    position: "50% 55%",
  },
  {
    id: "gulangyu-coast",
    src: "/images/xiamen-gulangyu-coast.webp",
    alt: "Palm trees stand beside a lawn and small tower near Kulangsu’s waterfront.",
    caption: "By the shore on Kulangsu.",
    author: "Yumeto",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:20231022_Seaside_of_Gulangyu.jpg",
    category: "Sea",
    year: "2023",
    position: "50% 57%",
  },
  {
    id: "shuzhuang-garden",
    src: "/images/xiamen-shuzhuang-garden.webp",
    alt: "A person with a red umbrella crosses a stone bridge reflected in still water.",
    caption: "A visitor crosses a bridge at Shuzhuang Garden, Kulangsu.",
    author: "Romain Pontida",
    license: "CC BY-SA 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Woman_crossing_a_bridge_on_Gulangyu_Island,_Xiamen,_China_-_%E9%BC%93%E6%B5%AA%E5%B1%BF,_%E5%8E%A6%E9%97%A8%EF%BC%8C%E4%B8%AD%E5%9B%BD_(16114158191).jpg",
    category: "Culture",
    year: "2014",
    position: "50% 45%",
  },
  {
    id: "shop-counter",
    src: "/images/xiamen-shop-counter.webp",
    alt: "A man works with small packages and a hand tool at a shop counter lined with jars and boxes.",
    caption: "At a shop counter in Amoy.",
    author: "Vincent Tan",
    license: "Pexels License",
    licenseUrl: "https://www.pexels.com/license/",
    sourceUrl:
      "https://www.pexels.com/photo/elderly-man-preparing-tea-in-xiamen-shop-33817897/",
    category: "Culture",
    position: "48% 60%",
  },
];
