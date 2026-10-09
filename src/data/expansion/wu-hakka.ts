import type { AtlasExpansion } from "./types";

export const wuHakkaExpansion: AtlasExpansion = {
  branches: [
    {
      id: "taizhou",
      name: "Taizhou",
      nativeName: "台州片",
      description: "Coastal Zhejiang Wu, with Linhai as a local reference.",
      places: ["Linhai"],
      groupId: "wu",
      article: {
        title: "Taizhou Wu",
        dek: "Coastal Zhejiang, with local patterns of word tone.",
        sections: [
          {
            heading: "A branch with local voices",
            paragraphs: [
              "Taizhou is one of the Wu subgroups distinguished in Phil Rose’s dialect-geographical study of Zhejiang. It should not be confused with the present administrative city of the same name: a linguistic grouping and a municipal boundary answer different questions. Linhai provides a geographical starting point here, while the research’s detailed example is explicitly a speaker from Genglou.",
            ],
          },
          {
            heading: "Words carry their own melody",
            paragraphs: [
              "Rose compares cognate two-syllable words across sites rather than treating a shared historical tone category as one modern pitch. The Genglou pattern rises high on the first syllable before a final fall. The contrast with neighboring Wu sites shows why complete local words and named speakers are needed. This branch page provides a route to the evidence; it does not supply a universal Taizhou tone chart.",
            ],
          },
        ],
        facts: [
          {
            label: "Reference scope",
            value:
              "Taizhou Wu; Linhai is the mapped locality and Genglou is a named research point",
          },
        ],
        sources: [
          {
            title: "Rose: Dialect-geographical acoustic-tonetics, 2018",
            url: "https://www.isca-archive.org/interspeech_2018/rose18_interspeech.pdf",
          },
          {
            title: "Linhai local gazetteer office: Taizhou old town",
            url: "https://tzsz.zjtz.gov.cn/art/2022/7/20/art_1229142710_58904329.html",
          },
        ],
        readingMinutes: 2,
      },
    },
  ],
  places: [
    {
      point: {
        id: "hangzhou",
        name: "Hangzhou",
        nativeName: "杭州",
        coordinates: [120.16, 30.25],
        groupId: "wu",
        subgroupId: "taihu",
        hierarchy: ["Sinitic", "Wu", "Taihu", "Hangzhou"],
      },
      article: {
        title: "Hangzhou",
        dek: "Old-city Wu beside West Lake.",
        sections: [
          {
            heading: "Local speech",
            paragraphs: [
              "Hangzhou’s old-city speech belongs to the Taihu branch of Wu. The municipality is much larger than this speech area: Xu Yue distinguishes the old city from Yuhang and Xiaoshan, and documents several other language communities within the municipal boundary. A photograph taken in Hangzhou therefore does not identify the language of the person in it.",
            ],
          },
          {
            heading: "Place and daily life",
            paragraphs: [
              "Language contact is central to the city’s story. Xu describes northern features alongside a Wu foundation, and notes more conservative speech in several villages southwest of the center. Here the marker locates the old city. West Lake, food stalls and silk shops give cultural context; they are not evidence that every neighborhood shares one pronunciation.",
            ],
          },
        ],
        facts: [
          {
            label: "Reference place",
            value:
              "Hangzhou urban center; named surrounding towns retain their own scope",
          },
          {
            label: "Naming",
            value:
              "Established geographic name; no unsupported local romanization supplied",
          },
        ],
        sources: [
          {
            title: "Xu Yue: Dialects in Hangzhou",
            url: "https://www.ehangzhou.gov.cn/2018-06/14/c_242896.htm",
          },
          {
            title: "UNESCO: West Lake cultural landscape",
            url: "https://whc.unesco.org/en/list/1334/",
          },
          {
            title: "Photographers: Hangzhou scenes",
            url: "https://commons.wikimedia.org/wiki/Category:Hangzhou",
          },
        ],
        readingMinutes: 2,
      },
      words: [],
      soundNotes: [
        {
          title: "Old city and its neighbors",
          text: "The old city, Yuhang and Xiaoshan are distinct reference areas in Xu Yue’s account. Keep their readings separate even when an address says Hangzhou.",
          localityIds: ["hangzhou"],
          source: {
            title: "Xu Yue: Dialects in Hangzhou",
            url: "https://www.ehangzhou.gov.cn/2018-06/14/c_242896.htm",
          },
        },
        {
          title: "Urban and village speech",
          text: "Xu records more conservative Hangzhou speech in villages including Longjing and Meijiawu. A citywide label should not erase that variation.",
          localityIds: ["hangzhou"],
          source: {
            title: "Xu Yue: Dialects in Hangzhou",
            url: "https://www.ehangzhou.gov.cn/2018-06/14/c_242896.htm",
          },
        },
      ],
      culture: [
        {
          title: "West Lake",
          text: "Causeways, islands, temples and gardens make the lake a designed cultural landscape. Its views influenced garden traditions elsewhere in East Asia.",
          localityIds: ["hangzhou"],
          source: {
            title: "UNESCO: West Lake cultural landscape",
            url: "https://whc.unesco.org/en/list/1334/",
          },
        },
        {
          title: "Food and shopfronts",
          text: "The gallery records breakfast, Hefang Street stalls and a Fengqi Road silk shop. These are identified scenes of everyday commerce rather than a single costume or dish standing for every resident.",
          localityIds: ["hangzhou"],
          source: {
            title: "Photographers: Hangzhou scenes",
            url: "https://commons.wikimedia.org/wiki/Category:Hangzhou",
          },
        },
      ],
      resources: [
        {
          title: "Xu Yue: Dialects in Hangzhou",
          description:
            "Local speech research with the source’s own geographic and speaker scope.",
          localityIds: ["hangzhou"],
          kind: "Study",
          url: "https://www.ehangzhou.gov.cn/2018-06/14/c_242896.htm",
        },
        {
          title: "UNESCO: West Lake cultural landscape",
          description: "Place-specific cultural context and documentation.",
          localityIds: ["hangzhou"],
          kind: "Culture",
          url: "https://whc.unesco.org/en/list/1334/",
        },
        {
          title: "Photographers: Hangzhou scenes",
          description: "Place-specific cultural context and documentation.",
          localityIds: ["hangzhou"],
          kind: "Culture",
          url: "https://commons.wikimedia.org/wiki/Category:Hangzhou",
        },
      ],
      photos: [
        {
          id: "expansion-hangzhou-0",
          title: "Yue Fei Temple gate",
          category: "Culture",
          src: "/images/expansion-wuhakka-hangzhou-0.webp",
          alt: "Yue Fei Temple gate",
          caption: "Yue Fei Temple gate.",
          author: "G41rn8",
          license: "CC BY-SA 4.0",
          licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
          sourceUrl:
            "https://commons.wikimedia.org/wiki/File:Entrance_gate_of_the_Yue_Fei_Temple%2C_Hangzhou_2006_18-11.jpg",
          width: 1280,
          height: 960,
        },
        {
          id: "expansion-hangzhou-1",
          title: "Breakfast in Hangzhou",
          category: "Food",
          src: "/images/expansion-wuhakka-hangzhou-1.webp",
          alt: "Breakfast in Hangzhou",
          caption: "Breakfast in Hangzhou.",
          author: "Hermann Luyken",
          license: "CC0",
          licenseUrl:
            "https://creativecommons.org/publicdomain/zero/1.0/deed.en",
          sourceUrl:
            "https://commons.wikimedia.org/wiki/File:2014.11.21.092313_Breakfast_Yikou_Tian_Zhongshi_Hangzhou.jpg",
          width: 1280,
          height: 853,
        },
        {
          id: "expansion-hangzhou-2",
          title: "Wrapped chicken at Lou Wai Lou",
          category: "Food",
          src: "/images/expansion-wuhakka-hangzhou-2.webp",
          alt: "Wrapped chicken at Lou Wai Lou",
          caption: "Wrapped chicken at Lou Wai Lou.",
          author: "Hermann Luyken",
          license: "CC0",
          licenseUrl:
            "https://creativecommons.org/publicdomain/zero/1.0/deed.en",
          sourceUrl:
            "https://commons.wikimedia.org/wiki/File:2014.11.21.172335_Wrapped_chicken_Lou_Wai_Lou_Restaurant_Xihu_Hangzhou.jpg",
          width: 1280,
          height: 853,
        },
        {
          id: "expansion-hangzhou-3",
          title: "Lotus-root starch with osmanthus",
          category: "Food",
          src: "/images/expansion-wuhakka-hangzhou-3.webp",
          alt: "Lotus-root starch with osmanthus",
          caption: "Lotus-root starch with osmanthus.",
          author: "MNXANL",
          license: "CC BY-SA 4.0",
          licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
          sourceUrl:
            "https://commons.wikimedia.org/wiki/File:202308_West_Lake_Lotus_Root_Starch_with_Osmanthus_Topping.jpg",
          width: 960,
          height: 1280,
        },
        {
          id: "expansion-hangzhou-4",
          title: "Hefang Street snacks",
          category: "Food",
          src: "/images/expansion-wuhakka-hangzhou-4.webp",
          alt: "Hefang Street snacks",
          caption: "Hefang Street snacks.",
          author: "David Stanley from Nanaimo, Canada",
          license: "CC BY 2.0",
          licenseUrl: "https://creativecommons.org/licenses/by/2.0",
          sourceUrl:
            "https://commons.wikimedia.org/wiki/File:Chinese_Snack_Foods_(40693892792).jpg",
          width: 1280,
          height: 960,
        },
        {
          id: "expansion-hangzhou-5",
          title: "Celadon plate in the provincial museum",
          category: "Culture",
          src: "/images/expansion-wuhakka-hangzhou-5.webp",
          alt: "Celadon plate in the provincial museum",
          caption: "Celadon plate in the provincial museum.",
          author: "Gary Todd from Xinzheng, China",
          license: "CC0",
          licenseUrl:
            "https://creativecommons.org/publicdomain/zero/1.0/deed.en",
          sourceUrl:
            "https://commons.wikimedia.org/wiki/File:Eastern_Jin_Celadon_Food_Plate%2C_Yue_Kiln_(17107270005).jpg",
          width: 1280,
          height: 853,
        },
        {
          id: "expansion-hangzhou-6",
          title: "Silk shop on Fengqi Road",
          category: "Streets",
          src: "/images/expansion-wuhakka-hangzhou-6.webp",
          alt: "Silk shop on Fengqi Road",
          caption: "Silk shop on Fengqi Road.",
          author: "N509FZ",
          license: "CC BY-SA 4.0",
          licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
          sourceUrl:
            "https://commons.wikimedia.org/wiki/File:Qipao_and_silk_scarves_on_display_at_a_shop_on_Fengqi_Road_(20170202103143).jpg",
          width: 1280,
          height: 893,
        },
        {
          id: "expansion-hangzhou-7",
          title: "Shrimp with Longjing tea",
          category: "Food",
          src: "/images/expansion-wuhakka-hangzhou-7.webp",
          alt: "Shrimp with Longjing tea",
          caption: "Shrimp with Longjing tea.",
          author: "Zheng Zhou",
          license: "CC BY-SA 4.0",
          licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
          sourceUrl:
            "https://commons.wikimedia.org/wiki/File:Shrimp_Stir-fried_with_Dragon_Well_Tea.jpg",
          width: 1280,
          height: 960,
        },
        {
          id: "expansion-hangzhou-8",
          title: "West Lake and the city",
          category: "Landscape",
          src: "/images/expansion-wuhakka-hangzhou-8.webp",
          alt: "West Lake and the city",
          caption: "West Lake and the city.",
          author: "User:CatOnMars",
          license: "CC BY 4.0",
          licenseUrl: "https://creativecommons.org/licenses/by/4.0",
          sourceUrl:
            "https://commons.wikimedia.org/wiki/File:Huanglong_%26_Broken_Bridge_-_Hangzhou_City_%26_West_Lake_near_Broken_Bridge.jpg",
          width: 1280,
          height: 853,
        },
      ],
    },
    {
      point: {
        id: "ningbo",
        name: "Ningpo",
        nativeName: "寧波",
        coordinates: [121.55, 29.87],
        groupId: "wu",
        subgroupId: "taihu",
        hierarchy: ["Sinitic", "Wu", "Taihu", "Ningpo"],
      },
      article: {
        title: "Ningpo",
        dek: "Vowel contrasts from a coastal Wu city.",
        sections: [
          {
            heading: "Local speech",
            paragraphs: [
              "Ningpo is a Taihu Wu reference locality on Zhejiang’s coast. Fang Hu’s vowel study uses recordings from ten male native speakers collected in Ningpo city in 2001, with an articulatory investigation involving two speakers. It is a precisely identified research sample, not a claim that all ages or all places administered by Ningpo pronounce words identically.",
            ],
          },
          {
            heading: "Place and daily life",
            paragraphs: [
              "The study distinguishes normal-length vowels, shorter vowels in syllables closed by a glottal stop, and apical vowels after alveolar affricates and fricatives. The photographs move between the Tianyi Pavilion collection, busy streets, newer business districts and food. Objects displayed in a museum illustrate material culture; their place of display should not be confused with the birthplace of a word.",
            ],
          },
        ],
        facts: [
          {
            label: "Reference place",
            value:
              "Ningpo urban center; named surrounding towns retain their own scope",
          },
          {
            label: "Naming",
            value:
              "Established geographic name; no unsupported local romanization supplied",
          },
        ],
        sources: [
          {
            title:
              "Hu: An acoustic and articulatory analysis of vowels in Ningbo Chinese, 2003",
            url: "https://www.internationalphoneticassociation.org/icphs-proceedings/ICPhS2003/papers/p15_3017.pdf",
          },
          {
            title: "Tianyi Pavilion and Moon Lake administration",
            url: "https://nbtygyh.haishu.gov.cn/",
          },
          {
            title: "Photographers: Ningbo scenes",
            url: "https://commons.wikimedia.org/wiki/Category:Ningbo",
          },
        ],
        readingMinutes: 2,
      },
      words: [],
      soundNotes: [
        {
          title: "Lip shape matters",
          text: "Hu finds distinct lip configurations for the high vowels: spreading, horizontal protrusion and vertical protrusion. Rounding alone is too coarse to describe the contrast.",
          localityIds: ["ningbo"],
          source: {
            title:
              "Hu: An acoustic and articulatory analysis of vowels in Ningbo Chinese, 2003",
            url: "https://www.internationalphoneticassociation.org/icphs-proceedings/ICPhS2003/papers/p15_3017.pdf",
          },
        },
        {
          title: "Vowel duration and closure",
          text: "The study separates normal-length vowels from short vowels in syllables ending in a glottal stop. Duration is part of the contrast, not just spelling.",
          localityIds: ["ningbo"],
          source: {
            title:
              "Hu: An acoustic and articulatory analysis of vowels in Ningbo Chinese, 2003",
            url: "https://www.internationalphoneticassociation.org/icphs-proceedings/ICPhS2003/papers/p15_3017.pdf",
          },
        },
      ],
      culture: [
        {
          title: "Tianyi Pavilion",
          text: "The city’s book-collecting heritage can be explored at the Tianyi Pavilion and Moon Lake site. The gallery pairs the pavilion with individual carved objects in its museum.",
          localityIds: ["ningbo"],
          source: {
            title: "Tianyi Pavilion and Moon Lake administration",
            url: "https://nbtygyh.haishu.gov.cn/",
          },
        },
        {
          title: "Rice cakes and restaurant signs",
          text: "A documented rice-cake dessert and a duck sculpture associated with Gang Ya Gou offer two views of food culture: what is served and how a local food business presents itself.",
          localityIds: ["ningbo"],
          source: {
            title: "Photographers: Ningbo scenes",
            url: "https://commons.wikimedia.org/wiki/Category:Ningbo",
          },
        },
      ],
      resources: [
        {
          title:
            "Hu: An acoustic and articulatory analysis of vowels in Ningbo Chinese, 2003",
          description:
            "Local speech research with the source’s own geographic and speaker scope.",
          localityIds: ["ningbo"],
          kind: "Study",
          url: "https://www.internationalphoneticassociation.org/icphs-proceedings/ICPhS2003/papers/p15_3017.pdf",
        },
        {
          title: "Tianyi Pavilion and Moon Lake administration",
          description: "Place-specific cultural context and documentation.",
          localityIds: ["ningbo"],
          kind: "Culture",
          url: "https://nbtygyh.haishu.gov.cn/",
        },
        {
          title: "Photographers: Ningpo scenes",
          description: "Place-specific cultural context and documentation.",
          localityIds: ["ningbo"],
          kind: "Culture",
          url: "https://commons.wikimedia.org/wiki/Category:Ningbo",
        },
      ],
      photos: [
        {
          id: "expansion-ningbo-0",
          title: "Tianyi Pavilion garden",
          category: "Culture",
          src: "/images/expansion-wuhakka-ningbo-0.webp",
          alt: "Tianyi Pavilion garden",
          caption: "Tianyi Pavilion garden.",
          author: "Mx. Granger",
          license: "CC0",
          licenseUrl:
            "https://creativecommons.org/publicdomain/zero/1.0/deed.en",
          sourceUrl:
            "https://commons.wikimedia.org/wiki/File:Tianyi_Pavilion%2C_Ningbo.jpg",
          width: 1280,
          height: 960,
        },
        {
          id: "expansion-ningbo-1",
          title: "Tianyi Square",
          category: "Culture",
          src: "/images/expansion-wuhakka-ningbo-1.webp",
          alt: "Tianyi Square",
          caption: "Tianyi Square.",
          author: "Shakura~commonswiki (Commons attribution)",
          license: "Public domain",
          licenseUrl: "https://commons.wikimedia.org/wiki/File:Ningbo_Tianyi_Square.jpg",
          sourceUrl:
            "https://commons.wikimedia.org/wiki/File:Ningbo_Tianyi_Square.jpg",
          width: 1280,
          height: 960,
        },
        {
          id: "expansion-ningbo-2",
          title: "South Business District",
          category: "Streets",
          src: "/images/expansion-wuhakka-ningbo-2.webp",
          alt: "South Business District",
          caption: "South Business District.",
          author: "Milkomède",
          license: "CC BY-SA 4.0",
          licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
          sourceUrl:
            "https://commons.wikimedia.org/wiki/File:Ningbo_South_Business_District_24-09-2018.jpg",
          width: 1280,
          height: 853,
        },
        {
          id: "expansion-ningbo-3",
          title: "A busy Ningpo street",
          category: "Streets",
          src: "/images/expansion-wuhakka-ningbo-3.webp",
          alt: "A busy Ningpo street",
          caption: "A busy Ningpo street.",
          author: "Megan Eaves",
          license: "CC BY-SA 2.0",
          licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0",
          sourceUrl:
            "https://commons.wikimedia.org/wiki/File:Central_Ningbo.jpg",
          width: 1280,
          height: 960,
        },
        {
          id: "expansion-ningbo-4",
          title: "Dragon relief at Tianyi Pavilion",
          category: "Culture",
          src: "/images/expansion-wuhakka-ningbo-4.webp",
          alt: "Dragon relief at Tianyi Pavilion",
          caption: "Dragon relief at Tianyi Pavilion.",
          author: "Nablazzz",
          license: "CC BY-SA 3.0",
          licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
          sourceUrl:
            "https://commons.wikimedia.org/wiki/File:Ningbo_-_Tianyi_Pavilion_Museum_01.jpg",
          width: 1280,
          height: 853,
        },
        {
          id: "expansion-ningbo-5",
          title: "Skyline from Changfeng Bridge",
          category: "Landscape",
          src: "/images/expansion-wuhakka-ningbo-5.webp",
          alt: "Skyline from Changfeng Bridge",
          caption: "Skyline from Changfeng Bridge.",
          author: "Siyuwj",
          license: "CC BY-SA 3.0",
          licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
          sourceUrl:
            "https://commons.wikimedia.org/wiki/File:Ningbo_skyline_viewed_on_Changfeng_Bridge.jpg",
          width: 1280,
          height: 857,
        },
        {
          id: "expansion-ningbo-6",
          title: "Woodcarving at Tianyi Pavilion",
          category: "Culture",
          src: "/images/expansion-wuhakka-ningbo-6.webp",
          alt: "Woodcarving at Tianyi Pavilion",
          caption: "Woodcarving at Tianyi Pavilion.",
          author: "Nablazzz",
          license: "CC BY-SA 3.0",
          licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
          sourceUrl:
            "https://commons.wikimedia.org/wiki/File:Ningbo_-_Tianyi_Pavilion_Museum_07.jpg",
          width: 853,
          height: 1280,
        },
        {
          id: "expansion-ningbo-7",
          title: "Gang Ya Gou duck sculpture",
          category: "Culture",
          src: "/images/expansion-wuhakka-ningbo-7.webp",
          alt: "Gang Ya Gou duck sculpture",
          caption: "Gang Ya Gou duck sculpture.",
          author: "三猎",
          license: "CC BY-SA 4.0",
          licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
          sourceUrl:
            "https://commons.wikimedia.org/wiki/File:%E7%BC%B8%E9%B8%AD%E7%8B%97.jpg",
          width: 1280,
          height: 852,
        },
        {
          id: "expansion-ningbo-8",
          title: "Rice cake with fermented rice",
          category: "Food",
          src: "/images/expansion-wuhakka-ningbo-8.webp",
          alt: "Rice cake with fermented rice",
          caption: "Rice cake with fermented rice.",
          author: "Leeinm",
          license: "CC BY 4.0",
          licenseUrl: "https://creativecommons.org/licenses/by/4.0",
          sourceUrl:
            "https://commons.wikimedia.org/wiki/File:%E9%85%92%E9%85%BF%E5%B9%B4%E7%B3%95.jpg",
          width: 1280,
          height: 853,
        },
      ],
    },
    {
      point: {
        id: "shaoxing",
        name: "Shaoxing",
        nativeName: "紹興",
        coordinates: [120.58, 30.0],
        groupId: "wu",
        subgroupId: "taihu",
        hierarchy: ["Sinitic", "Wu", "Taihu", "Shaoxing"],
      },
      article: {
        title: "Shaoxing",
        dek: "Canal streets and two-syllable tone patterns.",
        sections: [
          {
            heading: "Local speech",
            paragraphs: [
              "Shaoxing belongs to the Taihu Wu area. Its tone patterns should be learned through complete words, not by attaching a memorized dictionary tone to each character. Wen, Chen and Cheng’s acoustic study examines two-syllable combinations and finds that both the first and the second tone can shape the result. A simple rule saying that one position always dominates is inadequate.",
            ],
          },
          {
            heading: "Place and daily life",
            paragraphs: [
              "The gallery follows the old city through canal boats, Shusheng Cultural Street, Shen’s Garden and sites associated with Lu Xun. Rice wine is another local cultural thread, appearing in cooking as well as drinking. These places share an urban setting; a nearby town such as Keqiao or Anchang still needs its own speaker evidence before its pronunciation is treated as a Shaoxing city reading.",
            ],
          },
        ],
        facts: [
          {
            label: "Reference place",
            value:
              "Shaoxing urban center; named surrounding towns retain their own scope",
          },
          {
            label: "Naming",
            value:
              "Established geographic name; no unsupported local romanization supplied",
          },
        ],
        sources: [
          {
            title:
              "Wen, Chen & Cheng: Disyllabic tone sandhi patterns in Shaoxing Wu Chinese, 2023",
            url: "https://www.internationalphoneticassociation.org/icphs-proceedings/ICPhS2023/full_papers/785.pdf",
          },
          {
            title: "Shaoxing Keqiao: Black-awning boats",
            url: "https://wz.kq.gov.cn/art/2013/8/20/art_1605139_28805491.html",
          },
          {
            title: "Shaoxing culture bureau: Food and city life",
            url: "https://sxwg.sx.gov.cn/art/2021/8/27/art_1647996_58941849.html",
          },
        ],
        readingMinutes: 2,
      },
      words: [],
      soundNotes: [
        {
          title: "Listen to both syllables",
          text: "The 2023 study finds that both initial and noninitial tones affect disyllabic sandhi. Neither position can be discarded when learning the word’s melody.",
          localityIds: ["shaoxing"],
          source: {
            title:
              "Wen, Chen & Cheng: Disyllabic tone sandhi patterns in Shaoxing Wu Chinese, 2023",
            url: "https://www.internationalphoneticassociation.org/icphs-proceedings/ICPhS2023/full_papers/785.pdf",
          },
        },
        {
          title: "Register and contour",
          text: "Both tonal register and contour condition the reported patterns. The authors find no corresponding duration effect that would by itself explain the sandhi.",
          localityIds: ["shaoxing"],
          source: {
            title:
              "Wen, Chen & Cheng: Disyllabic tone sandhi patterns in Shaoxing Wu Chinese, 2023",
            url: "https://www.internationalphoneticassociation.org/icphs-proceedings/ICPhS2023/full_papers/785.pdf",
          },
        },
      ],
      culture: [
        {
          title: "Black-awning boats",
          text: "The low, covered boats belong to Shaoxing’s canal history. The local heritage account follows their changing role from everyday transport to cultural tourism.",
          localityIds: ["shaoxing"],
          source: {
            title: "Shaoxing Keqiao: Black-awning boats",
            url: "https://wz.kq.gov.cn/art/2013/8/20/art_1605139_28805491.html",
          },
        },
        {
          title: "Rice wine and city food",
          text: "Shaoxing’s culture bureau documents wine alongside street food and restaurant life. A bottle photograph identifies a product; it is not a recording of the local word.",
          localityIds: ["shaoxing"],
          source: {
            title: "Shaoxing culture bureau: Food and city life",
            url: "https://sxwg.sx.gov.cn/art/2021/8/27/art_1647996_58941849.html",
          },
        },
      ],
      resources: [
        {
          title:
            "Wen, Chen & Cheng: Disyllabic tone sandhi patterns in Shaoxing Wu Chinese, 2023",
          description:
            "Local speech research with the source’s own geographic and speaker scope.",
          localityIds: ["shaoxing"],
          kind: "Study",
          url: "https://www.internationalphoneticassociation.org/icphs-proceedings/ICPhS2023/full_papers/785.pdf",
        },
        {
          title: "Shaoxing Keqiao: Black-awning boats",
          description: "Place-specific cultural context and documentation.",
          localityIds: ["shaoxing"],
          kind: "Culture",
          url: "https://wz.kq.gov.cn/art/2013/8/20/art_1605139_28805491.html",
        },
        {
          title: "Shaoxing culture bureau: Food and city life",
          description: "Place-specific cultural context and documentation.",
          localityIds: ["shaoxing"],
          kind: "Culture",
          url: "https://sxwg.sx.gov.cn/art/2021/8/27/art_1647996_58941849.html",
        },
      ],
      photos: [
        {
          id: "expansion-shaoxing-0",
          title: "Shaoxing skyline",
          category: "Landscape",
          src: "/images/expansion-wuhakka-shaoxing-0.webp",
          alt: "Shaoxing skyline",
          caption: "Shaoxing skyline.",
          author: "serapio",
          license: "CC BY-SA 2.0",
          licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0",
          sourceUrl:
            "https://commons.wikimedia.org/wiki/File:Shaoxing_Cityscape.jpg",
          width: 1280,
          height: 960,
        },
        {
          id: "expansion-shaoxing-1",
          title: "Black-awning boats",
          category: "Culture",
          src: "/images/expansion-wuhakka-shaoxing-1.webp",
          alt: "Black-awning boats",
          caption: "Black-awning boats.",
          author: "Yiwen122",
          license: "CC BY-SA 4.0",
          licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
          sourceUrl:
            "https://commons.wikimedia.org/wiki/File:Black-awning_Boat.jpg",
          width: 1280,
          height: 562,
        },
        {
          id: "expansion-shaoxing-2",
          title: "A bottle of aged rice wine",
          category: "Food",
          src: "/images/expansion-wuhakka-shaoxing-2.webp",
          alt: "A bottle of aged rice wine",
          caption:
            "A bottle of aged Shaoxing-style rice wine; this product photograph does not identify its place of consumption.",
          author: "Popolon",
          license: "CC BY-SA 4.0",
          licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
          sourceUrl:
            "https://commons.wikimedia.org/wiki/File:Chen_nian_jia_fan_wine.jpg",
          width: 541,
          height: 1280,
        },
        {
          id: "expansion-shaoxing-3",
          title: "Lu Xun Cultural Festival",
          category: "Culture",
          src: "/images/expansion-wuhakka-shaoxing-3.webp",
          alt: "Lu Xun Cultural Festival",
          caption: "Lu Xun Cultural Festival.",
          author: "Uuueol",
          license: "CC BY-SA 4.0",
          licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
          sourceUrl:
            "https://commons.wikimedia.org/wiki/File:Lu_Xun_Cultural_Festival.jpg",
          width: 1040,
          height: 1280,
        },
        {
          id: "expansion-shaoxing-4",
          title: "Shen’s Garden",
          category: "Culture",
          src: "/images/expansion-wuhakka-shaoxing-4.webp",
          alt: "Shen’s Garden",
          caption: "Shen’s Garden.",
          author: "Uuueol",
          license: "CC BY-SA 4.0",
          licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
          sourceUrl:
            "https://commons.wikimedia.org/wiki/File:Shen%27s_Garden.jpg",
          width: 1280,
          height: 953,
        },
        {
          id: "expansion-shaoxing-5",
          title: "Shusheng Cultural Street",
          category: "Streets",
          src: "/images/expansion-wuhakka-shaoxing-5.webp",
          alt: "Shusheng Cultural Street",
          caption: "Shusheng Cultural Street.",
          author: "Uuueol",
          license: "CC BY-SA 4.0",
          licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
          sourceUrl:
            "https://commons.wikimedia.org/wiki/File:Shusheng_Cultural_Street.jpg",
          width: 975,
          height: 1280,
        },
        {
          id: "expansion-shaoxing-6",
          title: "Sanwei Study",
          category: "Culture",
          src: "/images/expansion-wuhakka-shaoxing-6.webp",
          alt: "Sanwei Study",
          caption: "Sanwei Study.",
          author: "Camelliora",
          license: "CC BY-SA 4.0",
          licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
          sourceUrl:
            "https://commons.wikimedia.org/wiki/File:%E6%B5%99%E6%B1%9F%E7%BB%8D%E5%85%B4%E4%B8%89%E5%91%B3%E4%B9%A6%E5%B1%8B.jpg",
          width: 1280,
          height: 581,
        },
        {
          id: "expansion-shaoxing-7",
          title: "Xianheng restaurant",
          category: "Culture",
          src: "/images/expansion-wuhakka-shaoxing-7.webp",
          alt: "Xianheng restaurant",
          caption: "Xianheng restaurant.",
          author: "Camelliora",
          license: "CC BY-SA 4.0",
          licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
          sourceUrl:
            "https://commons.wikimedia.org/wiki/File:%E6%B5%99%E6%B1%9F%E7%BB%8D%E5%85%B4%E5%92%B8%E4%BA%A8%E9%85%92%E5%BA%97.jpg",
          width: 1280,
          height: 583,
        },
        {
          id: "expansion-shaoxing-8",
          title: "Huadiao wine jars",
          category: "Food",
          src: "/images/expansion-wuhakka-shaoxing-8.webp",
          alt: "Huadiao wine jars",
          caption: "Huadiao wine jars.",
          author: "Walter Grassroot",
          license: "CC BY-SA 4.0",
          licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
          sourceUrl:
            "https://commons.wikimedia.org/wiki/File:%E7%BB%8D%E5%85%B4%E8%8A%B1%E9%9B%95%E9%85%92.jpg",
          width: 960,
          height: 1280,
        },
      ],
    },
    {
      point: {
        id: "linhai",
        name: "Linhai",
        nativeName: "臨海",
        coordinates: [121.14, 28.85],
        groupId: "wu",
        subgroupId: "taizhou",
        hierarchy: ["Sinitic", "Wu", "Taizhou", "Linhai"],
      },
      article: {
        title: "Linhai",
        dek: "Taizhou Wu around the old prefectural city.",
        sections: [
          {
            heading: "Local speech",
            paragraphs: [
              "Linhai is a reference place in the Taizhou branch of Wu. Phil Rose’s comparative study separates Taizhou from neighboring Wu branches and includes Genglou, a locality within Linhai. The Genglou recordings are valuable precisely because their origin is known: they cannot be silently relabeled as the pronunciation of every resident of Linhai’s old city.",
            ],
          },
          {
            heading: "Place and daily life",
            paragraphs: [
              "The research compares matching two-syllable tonal categories across many Zhejiang sites. The Genglou example rises into an unusually high register before falling on the second syllable. Linhai’s cultural landscape is equally specific: the old prefectural walls, East Lake and Ziyang Street form an urban cluster, while Yongquan citrus and Taojiang scenery lie in the wider municipality. Gallery captions preserve those distinctions.",
            ],
          },
        ],
        facts: [
          {
            label: "Reference place",
            value:
              "Linhai urban center; named surrounding towns retain their own scope",
          },
          {
            label: "Naming",
            value:
              "Established geographic name; no unsupported local romanization supplied",
          },
        ],
        sources: [
          {
            title: "Rose: Dialect-geographical acoustic-tonetics, 2018",
            url: "https://www.isca-archive.org/interspeech_2018/rose18_interspeech.pdf",
          },
          {
            title: "Linhai local gazetteer office: Taizhou old town",
            url: "https://tzsz.zjtz.gov.cn/art/2022/7/20/art_1229142710_58904329.html",
          },
          {
            title: "Linhai development plan: Yongquan citrus",
            url: "https://www.linhai.gov.cn/module/download/downfile.jsp?classid=0&filename=31520247ff514566934bb38b9ea5aaa1.pdf",
          },
        ],
        readingMinutes: 2,
      },
      words: [],
      soundNotes: [
        {
          title: "A named speaker locality",
          text: "Rose’s detailed Taizhou example comes from Genglou in Linhai. Use it as a Genglou reference, not as a uniform citywide accent.",
          localityIds: ["linhai"],
          source: {
            title: "Rose: Dialect-geographical acoustic-tonetics, 2018",
            url: "https://www.isca-archive.org/interspeech_2018/rose18_interspeech.pdf",
          },
        },
        {
          title: "A high rise followed by a fall",
          text: "For the studied cognate word pattern, the Genglou speaker’s first syllable rises into falsetto and the final syllable falls. This is a word pattern, not an isolated-tone chart.",
          localityIds: ["linhai"],
          source: {
            title: "Rose: Dialect-geographical acoustic-tonetics, 2018",
            url: "https://www.isca-archive.org/interspeech_2018/rose18_interspeech.pdf",
          },
        },
      ],
      culture: [
        {
          title: "Walls, water and streets",
          text: "The local gazetteer office identifies the old city wall, Ziyang Street, East Lake and Jinshan as the four major parts of the historic city area.",
          localityIds: ["linhai"],
          source: {
            title: "Linhai local gazetteer office: Taizhou old town",
            url: "https://tzsz.zjtz.gov.cn/art/2022/7/20/art_1229142710_58904329.html",
          },
        },
        {
          title: "Yongquan citrus",
          text: "Yongquan’s mandarin oranges belong to the wider Linhai landscape. The town’s agricultural and cultural setting is distinct from the old urban center.",
          localityIds: ["linhai"],
          source: {
            title: "Linhai development plan: Yongquan citrus",
            url: "https://www.linhai.gov.cn/module/download/downfile.jsp?classid=0&filename=31520247ff514566934bb38b9ea5aaa1.pdf",
          },
        },
      ],
      resources: [
        {
          title: "Rose: Dialect-geographical acoustic-tonetics, 2018",
          description:
            "Local speech research with the source’s own geographic and speaker scope.",
          localityIds: ["linhai"],
          kind: "Study",
          url: "https://www.isca-archive.org/interspeech_2018/rose18_interspeech.pdf",
        },
        {
          title: "Linhai local gazetteer office: Taizhou old town",
          description: "Place-specific cultural context and documentation.",
          localityIds: ["linhai"],
          kind: "Culture",
          url: "https://tzsz.zjtz.gov.cn/art/2022/7/20/art_1229142710_58904329.html",
        },
        {
          title: "Linhai development plan: Yongquan citrus",
          description: "Place-specific cultural context and documentation.",
          localityIds: ["linhai"],
          kind: "Culture",
          url: "https://www.linhai.gov.cn/module/download/downfile.jsp?classid=0&filename=31520247ff514566934bb38b9ea5aaa1.pdf",
        },
      ],
      photos: [
        {
          id: "expansion-linhai-0",
          title: "Old walls and the Ling River",
          category: "Landscape",
          src: "/images/expansion-wuhakka-linhai-0.webp",
          alt: "Old walls and the Ling River",
          caption: "Old walls and the Ling River. Linhai area.",
          author: "Marcus Hsu  talk",
          license: "CC BY 3.0",
          licenseUrl: "https://creativecommons.org/licenses/by/3.0",
          sourceUrl:
            "https://commons.wikimedia.org/wiki/File:%E7%81%B5%E6%B1%9F.JPG",
          width: 1280,
          height: 850,
        },
        {
          id: "expansion-linhai-1",
          title: "Dongcheng town",
          category: "Culture",
          src: "/images/expansion-wuhakka-linhai-1.webp",
          alt: "Dongcheng town",
          caption: "Dongcheng town. Linhai area.",
          author: "MNXANL",
          license: "CC BY-SA 4.0",
          licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
          sourceUrl:
            "https://commons.wikimedia.org/wiki/File:202403_Dongcheng_Town%2C_Linhai.jpg",
          width: 1280,
          height: 960,
        },
        {
          id: "expansion-linhai-2",
          title: "Linhai bus station",
          category: "Streets",
          src: "/images/expansion-wuhakka-linhai-2.webp",
          alt: "Linhai bus station",
          caption: "Linhai bus station. Linhai area.",
          author: "PanShiBo",
          license: "CC BY-SA 3.0",
          licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
          sourceUrl:
            "https://commons.wikimedia.org/wiki/File:Linhai_bus_station.jpg",
          width: 1280,
          height: 719,
        },
        {
          id: "expansion-linhai-3",
          title: "Linhai gymnasium",
          category: "Culture",
          src: "/images/expansion-wuhakka-linhai-3.webp",
          alt: "Linhai gymnasium",
          caption: "Linhai gymnasium. Linhai area.",
          author: "Mr.Zhé",
          license: "CC BY-SA 4.0",
          licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
          sourceUrl:
            "https://commons.wikimedia.org/wiki/File:Linhai_gym%2C_2015.jpeg",
          width: 1280,
          height: 960,
        },
        {
          id: "expansion-linhai-4",
          title: "Dayang branch library",
          category: "Culture",
          src: "/images/expansion-wuhakka-linhai-4.webp",
          alt: "Dayang branch library",
          caption: "Dayang branch library. Linhai area.",
          author: "Mr.Zhé",
          license: "CC BY-SA 4.0",
          licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
          sourceUrl:
            "https://commons.wikimedia.org/wiki/File:Linhai_Library%2C_Dayang_Branch.jpeg",
          width: 1280,
          height: 960,
        },
        {
          id: "expansion-linhai-5",
          title: "Yongquan mandarin oranges",
          category: "Food",
          src: "/images/expansion-wuhakka-linhai-5.webp",
          alt: "Yongquan mandarin oranges",
          caption:
            "Yongquan mandarin oranges from Linhai, photographed away from their place of production.",
          author: "Mr.Zhé",
          license: "CC BY-SA 4.0",
          licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
          sourceUrl:
            "https://commons.wikimedia.org/wiki/File:Linhai_Yongquan_Mandarin%2C_Dec_2019.jpg",
          width: 1280,
          height: 960,
        },
        {
          id: "expansion-linhai-6",
          title: "Taojiang Shisanzhu",
          category: "Landscape",
          src: "/images/expansion-wuhakka-linhai-6.webp",
          alt: "Taojiang Shisanzhu",
          caption: "Taojiang Shisanzhu. Linhai area.",
          author: "Yumeto",
          license: "CC BY-SA 4.0",
          licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
          sourceUrl:
            "https://commons.wikimedia.org/wiki/File:Taojiang_Shisanzhu.jpg",
          width: 1280,
          height: 960,
        },
        {
          id: "expansion-linhai-7",
          title: "Rural Linhai",
          category: "Landscape",
          src: "/images/expansion-wuhakka-linhai-7.webp",
          alt: "Rural Linhai",
          caption: "Rural Linhai. Linhai area.",
          author: "Meisuotun",
          license: "CC BY-SA 3.0",
          licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
          sourceUrl:
            "https://commons.wikimedia.org/wiki/File:%E5%86%9C%E6%9D%91_-_panoramio_-_Meisuotun.jpg",
          width: 1280,
          height: 720,
        },
        {
          id: "expansion-linhai-8",
          title: "East Lake",
          category: "Landscape",
          src: "/images/expansion-wuhakka-linhai-8.webp",
          alt: "East Lake",
          caption: "East Lake. Linhai area.",
          author: "猫猫的日记本",
          license: "CC BY-SA 4.0",
          licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
          sourceUrl:
            "https://commons.wikimedia.org/wiki/File:The_East_Lake_in_Linhai_01_2017-01.jpg",
          width: 1280,
          height: 850,
        },
      ],
    },
    {
      point: {
        id: "wuhua",
        name: "Wuhua",
        nativeName: "五華",
        coordinates: [115.77, 23.93],
        groupId: "hakka",
        subgroupId: "yuetai",
        hierarchy: ["Sinitic", "Hakka", "Yue–Tai", "Wuhua"],
      },
      article: {
        title: "Wuhua",
        dek: "A county seat within a varied Hakka landscape.",
        sections: [
          {
            heading: "Local speech",
            paragraphs: [
              "Wuhua is represented on the map by its county seat, Shuizhai. The surrounding county is not one uniform accent. Hsu’s comparative research distinguishes northern and southern phonological patterns and a different east–west division in vocabulary. This matters when comparing a family’s everyday words with a dictionary labeled simply Wuhua.",
            ],
          },
          {
            heading: "Place and daily life",
            paragraphs: [
              "The study also compares Wuhua communities in Taiwan with their places of origin, Anliu and Meilin in southern Wuhua. Their vocabulary and vowels have changed through contact; the shared origin does not make the modern varieties interchangeable. The gallery includes named towns and villages across the county. Their captions identify the setting instead of presenting all rural scenes as Shuizhai city life.",
            ],
          },
        ],
        facts: [
          {
            label: "Reference place",
            value:
              "Wuhua urban center; named surrounding towns retain their own scope",
          },
          {
            label: "Naming",
            value:
              "Established geographic name; no unsupported local romanization supplied",
          },
        ],
        sources: [
          {
            title: "Hsu: Comparative study of Guangdong Wuhua Hakka",
            url: "https://hakka.ncu.edu.tw/Hakka_ePaper/paper/paper139/05_03.html",
          },
          {
            title: "Wuhua county: Local theatre traditions",
            url: "https://www.wuhua.gov.cn/xxgk/ztzl/rdzt/wwwh/content/mpost_2773118.html",
          },
        ],
        readingMinutes: 2,
      },
      words: [],
      soundNotes: [
        {
          title: "Two maps of variation",
          text: "Hsu finds a north–south division in phonology but an east–west tendency in vocabulary. Word choice and pronunciation need not follow the same boundaries.",
          localityIds: ["wuhua"],
          source: {
            title: "Hsu: Comparative study of Guangdong Wuhua Hakka",
            url: "https://hakka.ncu.edu.tw/Hakka_ePaper/paper/paper139/05_03.html",
          },
        },
        {
          title: "A changing second syllable",
          text: "The research identifies tone sandhi on the following syllable among Wuhua’s features. It also stresses that the phonological characteristics are not uniform across the county.",
          localityIds: ["wuhua"],
          source: {
            title: "Hsu: Comparative study of Guangdong Wuhua Hakka",
            url: "https://hakka.ncu.edu.tw/Hakka_ePaper/paper/paper139/05_03.html",
          },
        },
      ],
      culture: [
        {
          title: "String puppets",
          text: "Wuhua puppetry uses Hakka dialogue alongside sung traditions. Its performers control complex jointed figures, with a transmission institute continuing the practice.",
          localityIds: ["wuhua"],
          source: {
            title: "Wuhua county: Local theatre traditions",
            url: "https://www.wuhua.gov.cn/xxgk/ztzl/rdzt/wwwh/content/mpost_2773118.html",
          },
        },
        {
          title: "Tea-picking theatre",
          text: "The county’s theatre account follows tea-picking songs and dance into small-scale drama. Fans, handkerchiefs and sung exchanges connect performance with rural work.",
          localityIds: ["wuhua"],
          source: {
            title: "Wuhua county: Local theatre traditions",
            url: "https://www.wuhua.gov.cn/xxgk/ztzl/rdzt/wwwh/content/mpost_2773118.html",
          },
        },
      ],
      resources: [
        {
          title: "Hsu: Comparative study of Guangdong Wuhua Hakka",
          description:
            "Local speech research with the source’s own geographic and speaker scope.",
          localityIds: ["wuhua"],
          kind: "Study",
          url: "https://hakka.ncu.edu.tw/Hakka_ePaper/paper/paper139/05_03.html",
        },
        {
          title: "Wuhua county: Local theatre traditions",
          description: "Place-specific cultural context and documentation.",
          localityIds: ["wuhua"],
          kind: "Culture",
          url: "https://www.wuhua.gov.cn/xxgk/ztzl/rdzt/wwwh/content/mpost_2773118.html",
        },
      ],
      photos: [
        {
          id: "expansion-wuhua-0",
          title: "Gaoshan Zai",
          category: "Culture",
          src: "/images/expansion-wuhakka-wuhua-0.webp",
          alt: "Gaoshan Zai",
          caption: "Gaoshan Zai. Wuhua area.",
          author: "THEODORE-STU (Commons uploader and self-licensor)",
          license: "CC BY-SA 3.0",
          licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
          sourceUrl: "https://commons.wikimedia.org/wiki/File:Gaoshan_Zai.jpeg",
          width: 1280,
          height: 957,
        },
        {
          id: "expansion-wuhua-1",
          title: "Hills at Shuanghua",
          category: "Culture",
          src: "/images/expansion-wuhakka-wuhua-1.webp",
          alt: "Hills at Shuanghua",
          caption: "Hills at Shuanghua. Wuhua area.",
          author: "THEODORE-STU (Commons uploader and self-licensor)",
          license: "CC BY-SA 3.0",
          licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
          sourceUrl: "https://commons.wikimedia.org/wiki/File:Shuanghua1.jpg",
          width: 1280,
          height: 957,
        },
        {
          id: "expansion-wuhua-2",
          title: "Shangba village",
          category: "Culture",
          src: "/images/expansion-wuhakka-wuhua-2.webp",
          alt: "Shangba village",
          caption: "Shangba village. Wuhua area.",
          author: "8168UFO",
          license: "CC BY 3.0",
          licenseUrl: "https://creativecommons.org/licenses/by/3.0",
          sourceUrl:
            "https://commons.wikimedia.org/wiki/File:%E4%B8%8A%E5%9D%9D%E6%9D%91_-_panoramio_-_8168UFO_(1).jpg",
          width: 1280,
          height: 960,
        },
        {
          id: "expansion-wuhua-3",
          title: "Shangba village office",
          category: "Culture",
          src: "/images/expansion-wuhakka-wuhua-3.webp",
          alt: "Shangba village office",
          caption: "Shangba village office. Wuhua area.",
          author: "8168UFO",
          license: "CC BY 3.0",
          licenseUrl: "https://creativecommons.org/licenses/by/3.0",
          sourceUrl:
            "https://commons.wikimedia.org/wiki/File:%E4%B8%8A%E5%9D%9D%E6%9D%91%E5%A7%94_-_panoramio.jpg",
          width: 1280,
          height: 960,
        },
        {
          id: "expansion-wuhua-4",
          title: "Shangba riverside restaurant",
          category: "Landscape",
          src: "/images/expansion-wuhakka-wuhua-4.webp",
          alt: "Shangba riverside restaurant",
          caption: "Shangba riverside restaurant. Wuhua area.",
          author: "8168UFO",
          license: "CC BY 3.0",
          licenseUrl: "https://creativecommons.org/licenses/by/3.0",
          sourceUrl:
            "https://commons.wikimedia.org/wiki/File:%E4%B8%8A%E5%9D%9D%E6%B2%BF%E6%B1%9F%E9%B1%BC%E7%94%9F_-_panoramio_(1).jpg",
          width: 1280,
          height: 766,
        },
        {
          id: "expansion-wuhua-5",
          title: "Li Huitang’s former residence",
          category: "Culture",
          src: "/images/expansion-wuhakka-wuhua-5.webp",
          alt: "Li Huitang’s former residence",
          caption: "Li Huitang’s former residence. Wuhua area.",
          author: "8168UFO",
          license: "CC BY 3.0",
          licenseUrl: "https://creativecommons.org/licenses/by/3.0",
          sourceUrl:
            "https://commons.wikimedia.org/wiki/File:%E4%B8%96%E7%95%8C%E7%90%83%E7%8E%8B%E6%9D%8E%E6%83%A0%E5%A0%82%E6%95%85%E5%B1%85_-_panoramio_(1).jpg",
          width: 1280,
          height: 960,
        },
        {
          id: "expansion-wuhua-6",
          title: "Dongfang Street",
          category: "Streets",
          src: "/images/expansion-wuhakka-wuhua-6.webp",
          alt: "Dongfang Street",
          caption: "Dongfang Street. Wuhua area.",
          author: "8168UFO",
          license: "CC BY 3.0",
          licenseUrl: "https://creativecommons.org/licenses/by/3.0",
          sourceUrl:
            "https://commons.wikimedia.org/wiki/File:%E4%B8%9C%E6%96%B9%E8%A1%97_-_panoramio.jpg",
          width: 1280,
          height: 960,
        },
        {
          id: "expansion-wuhua-7",
          title: "Sanqing Hall",
          category: "Culture",
          src: "/images/expansion-wuhakka-wuhua-7.webp",
          alt: "Sanqing Hall",
          caption: "Sanqing Hall. Wuhua area.",
          author: "8168UFO",
          license: "CC BY 3.0",
          licenseUrl: "https://creativecommons.org/licenses/by/3.0",
          sourceUrl:
            "https://commons.wikimedia.org/wiki/File:%E4%B8%89%E6%B8%85%E6%AE%BF_-_panoramio_-_8168UFO.jpg",
          width: 1280,
          height: 960,
        },
        {
          id: "expansion-wuhua-8",
          title: "Wuhua pavilion",
          category: "Culture",
          src: "/images/expansion-wuhakka-wuhua-8.webp",
          alt: "Wuhua pavilion",
          caption: "Wuhua pavilion. Wuhua area.",
          author: "8168UFO",
          license: "CC BY 3.0",
          licenseUrl: "https://creativecommons.org/licenses/by/3.0",
          sourceUrl:
            "https://commons.wikimedia.org/wiki/File:%E4%BA%94%E5%8D%8E%E4%BA%AD_-_panoramio.jpg",
          width: 1280,
          height: 766,
        },
      ],
    },
    {
      point: {
        id: "xingning",
        name: "Xingning",
        nativeName: "興寧",
        coordinates: [115.73, 24.14],
        groupId: "hakka",
        subgroupId: "yuetai",
        hierarchy: ["Sinitic", "Hakka", "Yue–Tai", "Xingning"],
      },
      article: {
        title: "Xingning",
        dek: "Local Hakka, ancestral houses and lantern gatherings.",
        sections: [
          {
            heading: "Local speech",
            paragraphs: [
              "Xingning is a locality within the Yuetai Hakka branch. Research comparing Xingning with Miaoli warns against treating the two as identical merely because both appear in discussions of Sixian Hakka. The study surveys several points from north to south and finds different phonological patterns, with Luofu in the north showing affinities with southern Jiangxi.",
            ],
          },
          {
            heading: "Place and daily life",
            paragraphs: [
              "Word choice adds another layer. The comparison records differences in kinship terms and in the suffixes used for nouns, so a family expression should retain its place label. The photographs include the urban street, the Confucian school and named settlements around Xingning. An ancestral house in a surrounding village represents that community’s architecture, not an acoustic sample for the whole city.",
            ],
          },
        ],
        facts: [
          {
            label: "Reference place",
            value:
              "Xingning urban center; named surrounding towns retain their own scope",
          },
          {
            label: "Naming",
            value:
              "Established geographic name; no unsupported local romanization supplied",
          },
        ],
        sources: [
          {
            title:
              "A comparative study of Taiwan Miaoli and Guangdong Xingning Hakka",
            url: "https://sign.hakka.gov.tw/File/Get?filename=%5CAttach%5C1990%5C1%5C8522162371.pdf",
          },
          {
            title: "Xingning cultural bureau: Weilong houses",
            url: "https://www.xingning.gov.cn/zjxn/lswh/wlw/content/post_831189.html",
          },
          {
            title: "Xingning gazetteer office: Lantern celebrations",
            url: "https://xnwmw.xingning.gov.cn/content/detail/5a4f1baa99c92a156d7f124f.html",
          },
        ],
        readingMinutes: 2,
      },
      words: [],
      soundNotes: [
        {
          title: "Consonant endings",
          text: "The comparative study reports a reduced set of consonant endings in Xingning relative to the Miaoli reference. The two should not share a copied pronunciation table.",
          localityIds: ["xingning"],
          source: {
            title:
              "A comparative study of Taiwan Miaoli and Guangdong Xingning Hakka",
            url: "https://sign.hakka.gov.tw/File/Get?filename=%5CAttach%5C1990%5C1%5C8522162371.pdf",
          },
        },
        {
          title: "Noun suffixes vary by place",
          text: "Northern and southern Xingning use different noun-suffix forms in the study; Shima and Shuikou are singled out again. Even a short ending needs a precise locality.",
          localityIds: ["xingning"],
          source: {
            title:
              "A comparative study of Taiwan Miaoli and Guangdong Xingning Hakka",
            url: "https://sign.hakka.gov.tw/File/Get?filename=%5CAttach%5C1990%5C1%5C8522162371.pdf",
          },
        },
      ],
      culture: [
        {
          title: "Weilong houses",
          text: "Xingning’s cultural bureau documents the curved enclosures, halls and lateral wings of its traditional residences. The gallery names individual compounds rather than merging them into one generic Hakka house.",
          localityIds: ["xingning"],
          source: {
            title: "Xingning cultural bureau: Weilong houses",
            url: "https://www.xingning.gov.cn/zjxn/lswh/wlw/content/post_831189.html",
          },
        },
        {
          title: "Lantern celebrations",
          text: "The local gazetteer describes clan-specific dates for lantern festivities. Gathering at ancestral halls connects the lantern with welcoming new family members.",
          localityIds: ["xingning"],
          source: {
            title: "Xingning gazetteer office: Lantern celebrations",
            url: "https://xnwmw.xingning.gov.cn/content/detail/5a4f1baa99c92a156d7f124f.html",
          },
        },
      ],
      resources: [
        {
          title:
            "A comparative study of Taiwan Miaoli and Guangdong Xingning Hakka",
          description:
            "Local speech research with the source’s own geographic and speaker scope.",
          localityIds: ["xingning"],
          kind: "Study",
          url: "https://sign.hakka.gov.tw/File/Get?filename=%5CAttach%5C1990%5C1%5C8522162371.pdf",
        },
        {
          title: "Xingning cultural bureau: Weilong houses",
          description: "Place-specific cultural context and documentation.",
          localityIds: ["xingning"],
          kind: "Culture",
          url: "https://www.xingning.gov.cn/zjxn/lswh/wlw/content/post_831189.html",
        },
        {
          title: "Xingning gazetteer office: Lantern celebrations",
          description: "Place-specific cultural context and documentation.",
          localityIds: ["xingning"],
          kind: "Culture",
          url: "https://xnwmw.xingning.gov.cn/content/detail/5a4f1baa99c92a156d7f124f.html",
        },
      ],
      photos: [
        {
          id: "expansion-xingning-0",
          title: "Xingtianyi Street",
          category: "Streets",
          src: "/images/expansion-wuhakka-xingning-0.webp",
          alt: "Xingtianyi Street",
          caption: "Xingtianyi Street. Xingning area.",
          author: "PanShiBo",
          license: "CC BY-SA 3.0",
          licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
          sourceUrl: "https://commons.wikimedia.org/wiki/File:XingNing.JPG",
          width: 1280,
          height: 960,
        },
        {
          id: "expansion-xingning-1",
          title: "A Weilong house in Xingning",
          category: "Culture",
          src: "/images/expansion-wuhakka-xingning-1.webp",
          alt: "A Weilong house in Xingning",
          caption: "A Weilong house in Xingning. Xingning area.",
          author: "HKB08",
          license: "CC BY-SA 4.0",
          licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
          sourceUrl:
            "https://commons.wikimedia.org/wiki/File:Hakka_WeiLong_House_in_Xingning_City.jpg",
          width: 1280,
          height: 960,
        },
        {
          id: "expansion-xingning-2",
          title: "Xingming school arch",
          category: "Culture",
          src: "/images/expansion-wuhakka-xingning-2.webp",
          alt: "Xingming school arch",
          caption: "Xingming school arch. Xingning area.",
          author: "HKB08",
          license: "CC BY-SA 4.0",
          licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
          sourceUrl:
            "https://commons.wikimedia.org/wiki/File:Xingning_Xingming_Secondary_School_Arch.jpg",
          width: 1280,
          height: 902,
        },
        {
          id: "expansion-xingning-3",
          title: "Kitchen garden at Dongsheng compound",
          category: "Culture",
          src: "/images/expansion-wuhakka-xingning-3.webp",
          alt: "Kitchen garden at Dongsheng compound",
          caption: "Kitchen garden at Dongsheng compound. Xingning area.",
          author: "Qiu Mao",
          license: "CC BY 3.0",
          licenseUrl: "https://creativecommons.org/licenses/by/3.0",
          sourceUrl:
            "https://commons.wikimedia.org/wiki/File:%E5%85%B4%E5%AE%81%E4%B8%9C%E9%A3%8E%E6%9D%91%E4%B8%9C%E5%8D%87%E5%9B%B4%EF%BC%88%E4%B9%9D%E5%8E%85%E5%8D%81%E5%85%AB%E4%BA%95%EF%BC%89_-_panoramio.jpg",
          width: 1280,
          height: 960,
        },
        {
          id: "expansion-xingning-4",
          title: "Dazhong compound, Yangli",
          category: "Culture",
          src: "/images/expansion-wuhakka-xingning-4.webp",
          alt: "Dazhong compound, Yangli",
          caption: "Dazhong compound, Yangli. Xingning area.",
          author: "Harry Zeng",
          license: "CC BY-SA 3.0",
          licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
          sourceUrl:
            "https://commons.wikimedia.org/wiki/File:%E5%85%B4%E5%AE%81%E5%B8%82%E5%AE%81%E6%96%B0%E9%95%87%E6%B4%8B%E9%87%8C%E6%9D%91%E5%A4%A7%E4%BC%97%E5%9B%B4_-_panoramio_-_Harry_Zeng_(1).jpg",
          width: 1280,
          height: 853,
        },
        {
          id: "expansion-xingning-5",
          title: "Wall inscription at Guian compound",
          category: "Culture",
          src: "/images/expansion-wuhakka-xingning-5.webp",
          alt: "Wall inscription at Guian compound",
          caption: "Wall inscription at Guian compound. Xingning area.",
          author: "Qiu Mao",
          license: "CC BY 3.0",
          licenseUrl: "https://creativecommons.org/licenses/by/3.0",
          sourceUrl:
            "https://commons.wikimedia.org/wiki/File:%E5%85%B4%E5%AE%81%E6%9C%B1%E5%9D%91%E6%9D%91%E6%A1%82%E5%AE%89%E5%9B%B420121004_-_panoramio_(1).jpg",
          width: 1280,
          height: 960,
        },
        {
          id: "expansion-xingning-6",
          title: "Paper inscription at Jinshi residence",
          category: "Culture",
          src: "/images/expansion-wuhakka-xingning-6.webp",
          alt: "Paper inscription at Jinshi residence",
          caption: "Paper inscription at Jinshi residence. Xingning area.",
          author: "Qiu Mao",
          license: "CC BY 3.0",
          licenseUrl: "https://creativecommons.org/licenses/by/3.0",
          sourceUrl:
            "https://commons.wikimedia.org/wiki/File:%E5%85%B4%E5%AE%81%E6%B1%A4%E4%B8%80%E6%9D%91%E8%BF%9B%E5%A3%AB%E7%AC%AC20121004_-_panoramio_(1).jpg",
          width: 960,
          height: 1280,
        },
        {
          id: "expansion-xingning-7",
          title: "Courtyard at Panan compound",
          category: "Culture",
          src: "/images/expansion-wuhakka-xingning-7.webp",
          alt: "Courtyard at Panan compound",
          caption: "Courtyard at Panan compound. Xingning area.",
          author: "Qiu Mao",
          license: "CC BY 3.0",
          licenseUrl: "https://creativecommons.org/licenses/by/3.0",
          sourceUrl:
            "https://commons.wikimedia.org/wiki/File:%E5%85%B4%E5%AE%81%E6%B2%B3%E8%A5%BF%E6%9D%91%E7%A3%90%E5%AE%89%E5%9B%B420121004_-_panoramio_(1).jpg",
          width: 1280,
          height: 960,
        },
        {
          id: "expansion-xingning-8",
          title: "Wenfeng pagoda",
          category: "Culture",
          src: "/images/expansion-wuhakka-xingning-8.webp",
          alt: "Wenfeng pagoda",
          caption: "Wenfeng pagoda. Xingning area.",
          author: "BV3CM",
          license: "CC BY-SA 3.0",
          licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
          sourceUrl:
            "https://commons.wikimedia.org/wiki/File:%E8%88%88%E5%AF%A7-%E6%96%87%E5%B3%B0%E5%8F%A4%E5%A1%94_-_panoramio.jpg",
          width: 945,
          height: 1280,
        },
        {
          id: "expansion-xingning-9",
          title: "Xingning Confucian school",
          category: "Culture",
          src: "/images/expansion-wuhakka-xingning-9.webp",
          alt: "Xingning Confucian school",
          caption: "Xingning Confucian school. Xingning area.",
          author: "古海岸遗址",
          license: "CC BY-SA 4.0",
          licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
          sourceUrl:
            "https://commons.wikimedia.org/wiki/File:Meizhou_Xingning_Xuegong_20171004.102740.jpg",
          width: 1280,
          height: 960,
        },
      ],
    },
    {
      point: {
        id: "dabu",
        name: "Dabu",
        nativeName: "大埔",
        coordinates: [116.69, 24.35],
        groupId: "hakka",
        subgroupId: "yuetai",
        hierarchy: ["Sinitic", "Hakka", "Yue–Tai", "Dabu"],
      },
      article: {
        title: "Dabu",
        dek: "Huliao, Baihou and the county’s local differences.",
        sections: [
          {
            heading: "Local speech",
            paragraphs: [
              "Dabu’s map marker locates Huliao, the county seat. The county’s own language account identifies Huliao as its reference speech and groups Huliao with Baihou, while distinguishing four other local areas. It also reports Min-speaking communities within the county. Administrative residence alone therefore does not establish a person’s language or exact accent.",
            ],
          },
          {
            heading: "Place and daily life",
            paragraphs: [
              "The account gives different local expressions for visiting someone, illustrating that variation involves vocabulary as well as tone. These written attestations are useful comparison leads; they do not supply the IPA needed for a pronunciation lesson. The gallery ranges from Baihou streets and fields to the Guang Lu Di residence in Xihe. Each scene keeps its actual place instead of being presented as downtown Huliao.",
            ],
          },
        ],
        facts: [
          {
            label: "Reference place",
            value:
              "Dabu urban center; named surrounding towns retain their own scope",
          },
          {
            label: "Naming",
            value:
              "Established geographic name; no unsupported local romanization supplied",
          },
        ],
        sources: [
          {
            title: "Dabu county: Local Hakka varieties",
            url: "https://www.dabu.gov.cn/zjdp/whts/fy/content/post_2591731.html",
          },
          {
            title: "Dabu county: Hakka customs and architecture",
            url: "https://www.dabu.gov.cn/zjdp/whts/ms/content/mpost_2272995.html",
          },
        ],
        readingMinutes: 2,
      },
      words: [],
      soundNotes: [
        {
          title: "Five local areas",
          text: "The county account distinguishes five areas and associates Huliao with Baihou. Neighboring Gaopi, Chayang and other towns should retain their own reading labels.",
          localityIds: ["dabu"],
          source: {
            title: "Dabu county: Local Hakka varieties",
            url: "https://www.dabu.gov.cn/zjdp/whts/fy/content/post_2591731.html",
          },
        },
        {
          title: "Words as well as tones",
          text: "The source contrasts local expressions for visiting someone across Huliao, Baihou and Chayang. Its non-IPA spellings are not converted here into invented phonetic lessons.",
          localityIds: ["dabu"],
          source: {
            title: "Dabu county: Local Hakka varieties",
            url: "https://www.dabu.gov.cn/zjdp/whts/fy/content/post_2591731.html",
          },
        },
      ],
      culture: [
        {
          title: "Several house forms",
          text: "Dabu’s cultural account names round earth buildings, square stone compounds, Weilong houses and houses combining local and overseas architectural influences.",
          localityIds: ["dabu"],
          source: {
            title: "Dabu county: Hakka customs and architecture",
            url: "https://www.dabu.gov.cn/zjdp/whts/ms/content/mpost_2272995.html",
          },
        },
        {
          title: "Food at family gatherings",
          text: "The county account describes wedding meals and a wide range of local snacks. These are family and community practices, not a single fixed menu shared by every household.",
          localityIds: ["dabu"],
          source: {
            title: "Dabu county: Hakka customs and architecture",
            url: "https://www.dabu.gov.cn/zjdp/whts/ms/content/mpost_2272995.html",
          },
        },
      ],
      resources: [
        {
          title: "Dabu county: Local Hakka varieties",
          description:
            "Local speech research with the source’s own geographic and speaker scope.",
          localityIds: ["dabu"],
          kind: "Study",
          url: "https://www.dabu.gov.cn/zjdp/whts/fy/content/post_2591731.html",
        },
        {
          title: "Dabu county: Hakka customs and architecture",
          description: "Place-specific cultural context and documentation.",
          localityIds: ["dabu"],
          kind: "Culture",
          url: "https://www.dabu.gov.cn/zjdp/whts/ms/content/mpost_2272995.html",
        },
      ],
      photos: [
        {
          id: "expansion-dabu-0",
          title: "Baihou barber shop",
          category: "Streets",
          src: "/images/expansion-wuhakka-dabu-0.webp",
          alt: "Baihou barber shop",
          caption: "Baihou barber shop. Dabu area.",
          author: "Yun Huang Yong from Harbord, Australia",
          license: "CC BY 2.0",
          licenseUrl: "https://creativecommons.org/licenses/by/2.0",
          sourceUrl:
            "https://commons.wikimedia.org/wiki/File:Barber_shop_(19849805526).jpg",
          width: 1280,
          height: 853,
        },
        {
          id: "expansion-dabu-1",
          title: "Pavilion in Dabu",
          category: "Culture",
          src: "/images/expansion-wuhakka-dabu-1.webp",
          alt: "Pavilion in Dabu",
          caption: "Pavilion in Dabu. Dabu area.",
          author: "Yun Huang Yong from Harbord, Australia",
          license: "CC BY 2.0",
          licenseUrl: "https://creativecommons.org/licenses/by/2.0",
          sourceUrl:
            "https://commons.wikimedia.org/wiki/File:At_the_pavilion_(19850104416).jpg",
          width: 1280,
          height: 853,
        },
        {
          id: "expansion-dabu-2",
          title: "River behind Guang Lu Di",
          category: "Landscape",
          src: "/images/expansion-wuhakka-dabu-2.webp",
          alt: "River behind Guang Lu Di",
          caption: "River behind Guang Lu Di. Dabu area.",
          author: "Yun Huang Yong from Harbord, Australia",
          license: "CC BY 2.0",
          licenseUrl: "https://creativecommons.org/licenses/by/2.0",
          sourceUrl:
            "https://commons.wikimedia.org/wiki/File:Guang_Lu_Di_backs_onto_a_serene_river_(19918974486).jpg",
          width: 1280,
          height: 853,
        },
        {
          id: "expansion-dabu-3",
          title: "Traditional and modern stoves",
          category: "Culture",
          src: "/images/expansion-wuhakka-dabu-3.webp",
          alt: "Traditional and modern stoves",
          caption: "Traditional and modern stoves. Dabu area.",
          author: "Yun Huang Yong from Harbord, Australia",
          license: "CC BY 2.0",
          licenseUrl: "https://creativecommons.org/licenses/by/2.0",
          sourceUrl:
            "https://commons.wikimedia.org/wiki/File:Like_many_old_buildings_we_came_across_people_still_live_inside_Guang_Lu_Di_-_nice_combo_of_traditional_Hakka_stove_and_modern_gas_stove_(19322687014).jpg",
          width: 1280,
          height: 853,
        },
        {
          id: "expansion-dabu-4",
          title: "Cultivated plots in Baihou",
          category: "Landscape",
          src: "/images/expansion-wuhakka-dabu-4.webp",
          alt: "Cultivated plots in Baihou",
          caption: "Cultivated plots in Baihou. Dabu area.",
          author: "Yun Huang Yong from Harbord, Australia",
          license: "CC BY 2.0",
          licenseUrl: "https://creativecommons.org/licenses/by/2.0",
          sourceUrl:
            "https://commons.wikimedia.org/wiki/File:Much_of_the_village_is_still_planted_(19255328253).jpg",
          width: 1280,
          height: 853,
        },
        {
          id: "expansion-dabu-5",
          title: "Baihou main gate",
          category: "Culture",
          src: "/images/expansion-wuhakka-dabu-5.webp",
          alt: "Baihou main gate",
          caption: "Baihou main gate. Dabu area.",
          author: "Yun Huang Yong from Harbord, Australia",
          license: "CC BY 2.0",
          licenseUrl: "https://creativecommons.org/licenses/by/2.0",
          sourceUrl:
            "https://commons.wikimedia.org/wiki/File:Mum_%26_dad_at_Baihou_main_gate_(19881312851).jpg",
          width: 1280,
          height: 853,
        },
        {
          id: "expansion-dabu-6",
          title: "Baihou South street",
          category: "Streets",
          src: "/images/expansion-wuhakka-dabu-6.webp",
          alt: "Baihou South street",
          caption: "Baihou South street. Dabu area.",
          author: "Yun Huang Yong from Harbord, Australia",
          license: "CC BY 2.0",
          licenseUrl: "https://creativecommons.org/licenses/by/2.0",
          sourceUrl:
            "https://commons.wikimedia.org/wiki/File:One_of_the_main_roads_in_Baihou_South._Chickens_everywhere_(19253305054).jpg",
          width: 1280,
          height: 853,
        },
        {
          id: "expansion-dabu-7",
          title: "Rice fields in Dabu",
          category: "Food",
          src: "/images/expansion-wuhakka-dabu-7.webp",
          alt: "Rice fields in Dabu",
          caption: "Rice fields in Dabu. Dabu area.",
          author: "Yun Huang Yong from Harbord, Australia",
          license: "CC BY 2.0",
          licenseUrl: "https://creativecommons.org/licenses/by/2.0",
          sourceUrl:
            "https://commons.wikimedia.org/wiki/File:Walking_through_the_rice_paddies_(19849946006).jpg",
          width: 1280,
          height: 853,
        },
        {
          id: "expansion-dabu-8",
          title: "Fishing in Dabu",
          category: "Culture",
          src: "/images/expansion-wuhakka-dabu-8.webp",
          alt: "Fishing in Dabu",
          caption: "Fishing in Dabu. Dabu area.",
          author: "Yun Huang Yong from Harbord, Australia",
          license: "CC BY 2.0",
          licenseUrl: "https://creativecommons.org/licenses/by/2.0",
          sourceUrl:
            "https://commons.wikimedia.org/wiki/File:Watching_these_guys_fish..._(19255162643).jpg",
          width: 1280,
          height: 853,
        },
      ],
    },
  ],
};
