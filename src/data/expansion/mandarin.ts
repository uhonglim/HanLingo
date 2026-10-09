import type { AtlasExpansion } from './types';

// Localities and sources reviewed in docs/EXPANSION-MANDARIN.md.
export const mandarinExpansion: AtlasExpansion = {
  "branches": [
    {
      "id": "northeastern",
      "name": "Northeastern Mandarin",
      "nativeName": "東北官話",
      "description": "Harbin and Shenyang provide distinct northeastern city references.",
      "places": [
        "Harbin",
        "Shenyang"
      ],
      "groupId": "mandarin",
      "article": {
        "title": "Northeastern Mandarin",
        "dek": "Harbin and Shenyang provide distinct northeastern city references.",
        "sections": [
          {
            "heading": "City references",
            "paragraphs": [
              "Harbin and Shenyang are both Northeastern Mandarin references, but their consonant descriptions should not be merged. Jiang’s Harbin account includes a retroflex series, while Tan’s Shenyang fieldwork describes an alveolar series and age-related variation in retroflex realizations. These are source-specific observations rather than a claim that every speaker fits one inventory."
            ]
          },
          {
            "heading": "What to compare",
            "paragraphs": [
              "The city pages pair local linguistic studies with separately credited photographs. Their map points locate cities, not the extent of northeastern speech. Dalian is nearby geographically but belongs to the separate Jiao–Liao branch."
            ]
          }
        ],
        "facts": [
          {
            "label": "Group",
            "value": "Mandarin"
          },
          {
            "label": "Scope",
            "value": "Present-day locality references"
          }
        ],
        "sources": [
          {
            "title": "Xinliang Jiang: Chinese EFL Learners’ Acquisition of Phonology, 2019, chapter 2",
            "url": "https://theses.ncl.ac.uk/jspui/bitstream/10443/5114/1/Jiang%20Xinliang%20%20ECopy.pdf"
          },
          {
            "title": "Song Tan: Shenyang Mandarin and Standard Mandarin, 2017",
            "url": "https://shs.cairn.info/article/LING_532_0237/pdf?lang=fr"
          }
        ],
        "readingMinutes": 2
      }
    },
    {
      "id": "jiaoliao",
      "name": "Jiao–Liao Mandarin",
      "nativeName": "膠遼官話",
      "description": "Related coastal varieties across the Shandong and Liaodong peninsulas.",
      "places": [
        "Qingdao",
        "Dalian"
      ],
      "groupId": "mandarin",
      "article": {
        "title": "Jiao–Liao Mandarin",
        "dek": "Related coastal varieties across the Shandong and Liaodong peninsulas.",
        "sections": [
          {
            "heading": "City references",
            "paragraphs": [
              "Jiao–Liao Mandarin connects city varieties on two peninsulas. Qingdao and Dalian are the references here; the branch should not be confused with Ji–Lu Mandarin simply because part of it is in Shandong, or with Northeastern Mandarin simply because Dalian is in Liaoning. The JLMS25 project explicitly samples several coastal cities, while the Dalian study gives a focused account of local falling tones."
            ]
          },
          {
            "heading": "What to compare",
            "paragraphs": [
              "A multi-city speech corpus provides comparisons, not permission to substitute one accent for another. Select a city before interpreting a reading, and retain the speaker and recording task when using an acoustic result."
            ]
          }
        ],
        "facts": [
          {
            "label": "Group",
            "value": "Mandarin"
          },
          {
            "label": "Scope",
            "value": "Present-day locality references"
          }
        ],
        "sources": [
          {
            "title": "Liu et al.: Incomplete tonal neutralization in Dalian Mandarin, 2022",
            "url": "https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2022.867353/full"
          },
          {
            "title": "JLMS25: Jiao-Liao Mandarin speech corpus, 2025",
            "url": "https://www.mdpi.com/2076-3417/15/3/1670"
          }
        ],
        "readingMinutes": 2
      }
    },
    {
      "id": "central-plains",
      "name": "Central Plains Mandarin",
      "nativeName": "中原官話",
      "description": "Zhengzhou and Xi’an anchor distinct local varieties within a broad branch.",
      "places": [
        "Zhengzhou",
        "Xi’an"
      ],
      "groupId": "mandarin",
      "article": {
        "title": "Central Plains Mandarin",
        "dek": "Zhengzhou and Xi’an anchor distinct local varieties within a broad branch.",
        "sections": [
          {
            "heading": "City references",
            "paragraphs": [
              "Central Plains Mandarin spans more than one province. Zhengzhou belongs to its Zheng–Kai area, while Xi’an belongs to Guanzhong. The two city entries focus on different evidence: a detailed investigation of variation in 足 in Zhengzhou and a study of the grammatical marker 開 in Xi’an. Shared classification does not guarantee the same tones, everyday words or grammatical habits."
            ]
          },
          {
            "heading": "What to compare",
            "paragraphs": [
              "Choose a local source rather than a generic “Henan” or “Shaanxi” reading. The Xi’an study also excludes urban Hui speech, a consequential restriction that stays beside its example."
            ]
          }
        ],
        "facts": [
          {
            "label": "Group",
            "value": "Mandarin"
          },
          {
            "label": "Scope",
            "value": "Present-day locality references"
          }
        ],
        "sources": [
          {
            "title": "The Sound Change of 足 in Zhengzhou Dialect, IALP 2023",
            "url": "https://www.colips.org/conferences/ialp2023/proceedings/papers/IALP2023_P010.pdf"
          },
          {
            "title": "Hang Qiao: The Meaning and Usage of Marker Kai in Xi’an Dialect, 2023",
            "url": "https://file.ewapub.com/press/media/72bb3333487a4621bda72223ec84a65e.marked.pdf"
          }
        ],
        "readingMinutes": 2
      }
    },
    {
      "id": "lanyin",
      "name": "Lan–Yin Mandarin",
      "nativeName": "蘭銀官話",
      "description": "Northwestern Mandarin, introduced through a documented Lanzhou sound system.",
      "places": [
        "Lanzhou"
      ],
      "groupId": "mandarin",
      "article": {
        "title": "Lan–Yin Mandarin",
        "dek": "Northwestern Mandarin, introduced through a documented Lanzhou sound system.",
        "sections": [
          {
            "heading": "City references",
            "paragraphs": [
              "Lanzhou provides the current city reference for Lan–Yin Mandarin. Yi and Duanmu’s analysis documents labial affricates, nasalized vowels and the relationship between onsets and complete syllables. These features make the branch especially useful for seeing why ordinary Standard Mandarin spelling cannot be used as a universal phonetic transcription."
            ]
          },
          {
            "heading": "What to compare",
            "paragraphs": [
              "The initial reading collection preserves the study’s actual segment examples and visibly marks their omitted tones. No tone values have been supplied from another city. The map is an urban reference point, not a boundary for the wider branch."
            ]
          }
        ],
        "facts": [
          {
            "label": "Group",
            "value": "Mandarin"
          },
          {
            "label": "Scope",
            "value": "Present-day locality references"
          }
        ],
        "sources": [
          {
            "title": "Li Yi and San Duanmu: Phonemes, Features, and Syllables, 2014",
            "url": "https://websites.umich.edu/~duanmu/2014LanzhouRevised.pdf"
          }
        ],
        "readingMinutes": 2
      }
    }
  ],
  "places": [
    {
      "point": {
        "id": "harbin",
        "name": "Harbin",
        "nativeName": "哈爾濱",
        "coordinates": [
          126.64,
          45.76
        ],
        "groupId": "mandarin",
        "subgroupId": "northeastern",
        "hierarchy": [
          "Sinitic",
          "Mandarin",
          "Northeastern Mandarin",
          "Harbin"
        ]
      },
      "article": {
        "title": "Harbin",
        "dek": "Northeastern speech on the Songhua River.",
        "sections": [
          {
            "heading": "Local speech",
            "paragraphs": [
              "Harbin belongs to Northeastern Mandarin. Jiang’s study treats Harbin speech as its own reference and compares its sound system with Guangzhou Cantonese; neither “Mandarin” nor “Northeastern” makes every city sound the same."
            ]
          },
          {
            "heading": "Aspiration, not voicing",
            "paragraphs": [
              "The Harbin inventory described by Jiang contrasts unaspirated and aspirated stops: [p] versus [pʰ], [t] versus [tʰ], and [k] versus [kʰ]. HanLingo therefore keeps p / ph distinct from b."
            ]
          },
          {
            "heading": "Four tones, local contours",
            "paragraphs": [
              "Jiang’s chapter lists four Harbin tones, citing Nie’s description. Their contours differ from the familiar Standard Mandarin classroom model. A tone-category number identifies a class; it does not supply a local pitch contour."
            ]
          },
          {
            "heading": "Saint Sophia",
            "paragraphs": [
              "The cathedral’s brick exterior and domed silhouette appear beside the city’s street and river photographs. Its architecture is part of Harbin’s urban setting, not evidence of a visitor’s language."
            ]
          },
          {
            "heading": "Along the Songhua",
            "paragraphs": [
              "The river photograph places Harbin’s streets in their waterside setting. Compare the open river view with the enclosed shopping street and the winter ice architecture in the gallery."
            ]
          }
        ],
        "facts": [
          {
            "label": "Group",
            "value": "Mandarin"
          },
          {
            "label": "Branch",
            "value": "Northeastern Mandarin"
          },
          {
            "label": "Entry type",
            "value": "Locality reference"
          },
          {
            "label": "Name convention",
            "value": "Conventional city name; not a phonetic transcription"
          },
          {
            "label": "Map anchor",
            "value": "Harbin city reference; not a dialect boundary"
          }
        ],
        "sources": [
          {
            "title": "Xinliang Jiang: Chinese EFL Learners’ Acquisition of Phonology, 2019, chapter 2",
            "url": "https://theses.ncl.ac.uk/jspui/bitstream/10443/5114/1/Jiang%20Xinliang%20%20ECopy.pdf"
          },
          {
            "title": "Saint Sophia Cathedral — photograph and documentation",
            "url": "https://commons.wikimedia.org/wiki/File:Harbin_Saint_Sophia_Cathedral_2017_summer.jpg"
          },
          {
            "title": "Songhua River — photograph and documentation",
            "url": "https://commons.wikimedia.org/wiki/File:Songhua_River_Harbin_2015-06-20-02.jpg"
          }
        ],
        "readingMinutes": 2
      },
      "words": [],
      "soundNotes": [
        {
          "title": "Aspiration, not voicing",
          "text": "The Harbin inventory described by Jiang contrasts unaspirated and aspirated stops: [p] versus [pʰ], [t] versus [tʰ], and [k] versus [kʰ]. HanLingo therefore keeps p / ph distinct from b.",
          "localityIds": [
            "harbin"
          ],
          "source": {
            "title": "Xinliang Jiang: Chinese EFL Learners’ Acquisition of Phonology, 2019, chapter 2",
            "url": "https://theses.ncl.ac.uk/jspui/bitstream/10443/5114/1/Jiang%20Xinliang%20%20ECopy.pdf"
          }
        },
        {
          "title": "Four tones, local contours",
          "text": "Jiang’s chapter lists four Harbin tones, citing Nie’s description. Their contours differ from the familiar Standard Mandarin classroom model. A tone-category number identifies a class; it does not supply a local pitch contour.",
          "localityIds": [
            "harbin"
          ],
          "source": {
            "title": "Xinliang Jiang: Chinese EFL Learners’ Acquisition of Phonology, 2019, chapter 2",
            "url": "https://theses.ncl.ac.uk/jspui/bitstream/10443/5114/1/Jiang%20Xinliang%20%20ECopy.pdf"
          }
        }
      ],
      "culture": [
        {
          "title": "Saint Sophia",
          "text": "The cathedral’s brick exterior and domed silhouette appear beside the city’s street and river photographs. Its architecture is part of Harbin’s urban setting, not evidence of a visitor’s language.",
          "localityIds": [
            "harbin"
          ],
          "source": {
            "title": "Saint Sophia Cathedral — photograph and documentation",
            "url": "https://commons.wikimedia.org/wiki/File:Harbin_Saint_Sophia_Cathedral_2017_summer.jpg"
          },
          "photo": {
            "src": "/images/expansion-mandarin-harbin-20.webp",
            "alt": "Saint Sophia Cathedral in Harbin.",
            "caption": "Saint Sophia Cathedral — Harbin.",
            "author": "Amarespeco",
            "license": "CC BY-SA 4.0",
            "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
            "sourceUrl": "https://commons.wikimedia.org/wiki/File:Harbin_Saint_Sophia_Cathedral_2017_summer.jpg"
          }
        },
        {
          "title": "Along the Songhua",
          "text": "The river photograph places Harbin’s streets in their waterside setting. Compare the open river view with the enclosed shopping street and the winter ice architecture in the gallery.",
          "localityIds": [
            "harbin"
          ],
          "source": {
            "title": "Songhua River — photograph and documentation",
            "url": "https://commons.wikimedia.org/wiki/File:Songhua_River_Harbin_2015-06-20-02.jpg"
          },
          "photo": {
            "src": "/images/expansion-mandarin-harbin-64.webp",
            "alt": "Songhua River in Harbin.",
            "caption": "Songhua River — Harbin.",
            "author": "Caliva",
            "license": "CC BY-SA 4.0",
            "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
            "sourceUrl": "https://commons.wikimedia.org/wiki/File:Songhua_River_Harbin_2015-06-20-02.jpg"
          }
        }
      ],
      "resources": [
        {
          "title": "Xinliang Jiang: Chinese EFL Learners’ Acquisition of Phonology, 2019, chapter 2",
          "description": "Local speech, study scope and transcription conventions.",
          "localityIds": [
            "harbin"
          ],
          "kind": "Study",
          "url": "https://theses.ncl.ac.uk/jspui/bitstream/10443/5114/1/Jiang%20Xinliang%20%20ECopy.pdf"
        },
        {
          "title": "Saint Sophia",
          "description": "Saint Sophia Cathedral — photograph and documentation",
          "localityIds": [
            "harbin"
          ],
          "kind": "Culture",
          "url": "https://commons.wikimedia.org/wiki/File:Harbin_Saint_Sophia_Cathedral_2017_summer.jpg"
        },
        {
          "title": "Along the Songhua",
          "description": "Songhua River — photograph and documentation",
          "localityIds": [
            "harbin"
          ],
          "kind": "Culture",
          "url": "https://commons.wikimedia.org/wiki/File:Songhua_River_Harbin_2015-06-20-02.jpg"
        }
      ],
      "photos": [
        {
          "id": "harbin-20",
          "src": "/images/expansion-mandarin-harbin-20.webp",
          "title": "Saint Sophia Cathedral",
          "category": "Culture",
          "alt": "Saint Sophia Cathedral in Harbin.",
          "caption": "Saint Sophia Cathedral — Harbin.",
          "author": "Amarespeco",
          "license": "CC BY-SA 4.0",
          "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
          "sourceUrl": "https://commons.wikimedia.org/wiki/File:Harbin_Saint_Sophia_Cathedral_2017_summer.jpg",
          "width": 1200,
          "height": 1800
        },
        {
          "id": "harbin-4",
          "src": "/images/expansion-mandarin-harbin-4.webp",
          "title": "A heritage plaque on Central Street",
          "category": "Streets",
          "alt": "A heritage plaque on Central Street in Harbin.",
          "caption": "A heritage plaque on Central Street — Harbin.",
          "author": "Jonashtand",
          "license": "CC BY-SA 4.0",
          "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
          "sourceUrl": "https://commons.wikimedia.org/wiki/File:201907_Harbin_Central_Street_01.jpg",
          "width": 1200,
          "height": 800
        },
        {
          "id": "harbin-41",
          "src": "/images/expansion-mandarin-harbin-41.webp",
          "title": "New Synagogue, archival photograph",
          "category": "Culture",
          "alt": "New Synagogue, archival photograph in Harbin.",
          "caption": "New Synagogue, archival photograph — Harbin.",
          "author": "Unknown authorUnknown author",
          "license": "Public domain",
          "licenseUrl": "https://creativecommons.org/publicdomain/mark/1.0/",
          "sourceUrl": "https://commons.wikimedia.org/wiki/File:Harbin,_New_Synagogue.jpg",
          "width": 1200,
          "height": 775
        },
        {
          "id": "harbin-47",
          "src": "/images/expansion-mandarin-harbin-47.webp",
          "title": "Iveron Church, archival photograph",
          "category": "Culture",
          "alt": "Iveron Church, archival photograph in Harbin.",
          "caption": "Iveron Church, archival photograph — Harbin.",
          "author": "Unknown authorUnknown author",
          "license": "Public domain",
          "licenseUrl": "https://creativecommons.org/publicdomain/mark/1.0/",
          "sourceUrl": "https://commons.wikimedia.org/wiki/File:Harbin_Military_Iveron_church.jpg",
          "width": 1200,
          "height": 789
        },
        {
          "id": "harbin-48",
          "src": "/images/expansion-mandarin-harbin-48.webp",
          "title": "Modern Hotel, before 1940",
          "category": "Streets",
          "alt": "Modern Hotel, before 1940 in Harbin.",
          "caption": "Modern Hotel, before 1940 — Harbin.",
          "author": "Unknown authorUnknown author",
          "license": "Public domain",
          "licenseUrl": "https://creativecommons.org/publicdomain/mark/1.0/",
          "sourceUrl": "https://commons.wikimedia.org/wiki/File:Harbin_Modern_Hotel.jpg",
          "width": 1200,
          "height": 849
        },
        {
          "id": "harbin-52",
          "src": "/images/expansion-mandarin-harbin-52.webp",
          "title": "Sun Island sculpture",
          "category": "Culture",
          "alt": "Sun Island sculpture in Harbin.",
          "caption": "Sun Island sculpture — Harbin.",
          "author": "This image was made by Sadko.\n\nPlease credit this with: \"Sadko, Wikipedia\" in the immediate vicinity of the image. \nA message to me would be appreciated as well. \nIf you wish to use, license, or buy the image, please contact me to discuss terms.\nMore of my work can be found in my personal gallery.",
          "license": "CC BY-SA 4.0",
          "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
          "sourceUrl": "https://commons.wikimedia.org/wiki/File:Harbin_Sun_Island_massive_sculpture.jpg",
          "width": 1200,
          "height": 783
        },
        {
          "id": "harbin-55",
          "src": "/images/expansion-mandarin-harbin-55.webp",
          "title": "Ice architecture",
          "category": "Culture",
          "alt": "Ice architecture in Harbin.",
          "caption": "Ice architecture — Harbin.",
          "author": "Antonio Chaves",
          "license": "CC BY-SA 4.0",
          "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
          "sourceUrl": "https://commons.wikimedia.org/wiki/File:Harbin_ice_castle.jpg",
          "width": 1200,
          "height": 821
        },
        {
          "id": "harbin-59",
          "src": "/images/expansion-mandarin-harbin-59.webp",
          "title": "Hongjun Street",
          "category": "Streets",
          "alt": "Hongjun Street in Harbin.",
          "caption": "Hongjun Street — Harbin.",
          "author": "Caliva",
          "license": "CC BY-SA 4.0",
          "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
          "sourceUrl": "https://commons.wikimedia.org/wiki/File:Hongjun_Street,_Harbin_01.jpg",
          "width": 1200,
          "height": 674
        },
        {
          "id": "harbin-64",
          "src": "/images/expansion-mandarin-harbin-64.webp",
          "title": "Songhua River",
          "category": "Landscape",
          "alt": "Songhua River in Harbin.",
          "caption": "Songhua River — Harbin.",
          "author": "Caliva",
          "license": "CC BY-SA 4.0",
          "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
          "sourceUrl": "https://commons.wikimedia.org/wiki/File:Songhua_River_Harbin_2015-06-20-02.jpg",
          "width": 1200,
          "height": 900
        }
      ]
    },
    {
      "point": {
        "id": "shenyang",
        "name": "Shenyang",
        "nativeName": "瀋陽",
        "coordinates": [
          123.43,
          41.8
        ],
        "groupId": "mandarin",
        "subgroupId": "northeastern",
        "hierarchy": [
          "Sinitic",
          "Mandarin",
          "Northeastern Mandarin",
          "Shenyang"
        ]
      },
      "article": {
        "title": "Shenyang",
        "dek": "Northeastern Mandarin with a documented alveolar–retroflex difference.",
        "sections": [
          {
            "heading": "Local speech",
            "paragraphs": [
              "Shenyang is a city reference within Northeastern Mandarin, separate from Harbin. Tan’s description draws on Liaoning fieldwork in 2016 and distinguishes the older and younger speakers’ consonant realizations."
            ]
          },
          {
            "heading": "The same spelling, different consonants",
            "paragraphs": [
              "Tan’s Shenyang fieldwork reports alveolar [ts], [tsʰ] and [s] where Standard Mandarin has a separate retroflex series. Younger speakers can also produce retroflex variants, particularly in formal speech."
            ]
          },
          {
            "heading": "Listen to the start of 人 and 熱",
            "paragraphs": [
              "In the study, words corresponding to Standard Mandarin’s r-initial can begin with a vowel or [j] in Shenyang. The paper prints tone-category digits, so those numbers must not be read as pitch heights."
            ]
          },
          {
            "heading": "Palace architecture",
            "paragraphs": [
              "The Mukden Palace overview and ceiling detail show two scales of the same complex: its planned courtyard layout and the craft visible overhead."
            ]
          },
          {
            "heading": "The performance street",
            "paragraphs": [
              "The photographed Liu Laogen Grand Stage stands in the Zhongjie area. Read its setting alongside the nearby shopping street; a theatre frontage does not document the pronunciation of a particular performance."
            ]
          }
        ],
        "facts": [
          {
            "label": "Group",
            "value": "Mandarin"
          },
          {
            "label": "Branch",
            "value": "Northeastern Mandarin"
          },
          {
            "label": "Entry type",
            "value": "Locality reference"
          },
          {
            "label": "Name convention",
            "value": "Conventional city name; not a phonetic transcription"
          },
          {
            "label": "Map anchor",
            "value": "Shenyang city reference; not a dialect boundary"
          }
        ],
        "sources": [
          {
            "title": "Song Tan: Shenyang Mandarin and Standard Mandarin, 2017",
            "url": "https://shs.cairn.info/article/LING_532_0237/pdf?lang=fr"
          },
          {
            "title": "Mukden Palace — photograph and documentation",
            "url": "https://commons.wikimedia.org/wiki/File:Mukden_Palace_drone_view_1.jpg"
          },
          {
            "title": "Liu Laogen Grand Stage — photograph and documentation",
            "url": "https://commons.wikimedia.org/wiki/File:Liu_Laogen_Grand_Stage,_Shenyang_Zhongjie_(20240503143126).jpg"
          }
        ],
        "readingMinutes": 2
      },
      "words": [],
      "soundNotes": [
        {
          "title": "The same spelling, different consonants",
          "text": "Tan’s Shenyang fieldwork reports alveolar [ts], [tsʰ] and [s] where Standard Mandarin has a separate retroflex series. Younger speakers can also produce retroflex variants, particularly in formal speech.",
          "localityIds": [
            "shenyang"
          ],
          "source": {
            "title": "Song Tan: Shenyang Mandarin and Standard Mandarin, 2017",
            "url": "https://shs.cairn.info/article/LING_532_0237/pdf?lang=fr"
          }
        },
        {
          "title": "Listen to the start of 人 and 熱",
          "text": "In the study, words corresponding to Standard Mandarin’s r-initial can begin with a vowel or [j] in Shenyang. The paper prints tone-category digits, so those numbers must not be read as pitch heights.",
          "localityIds": [
            "shenyang"
          ],
          "source": {
            "title": "Song Tan: Shenyang Mandarin and Standard Mandarin, 2017",
            "url": "https://shs.cairn.info/article/LING_532_0237/pdf?lang=fr"
          }
        }
      ],
      "culture": [
        {
          "title": "Palace architecture",
          "text": "The Mukden Palace overview and ceiling detail show two scales of the same complex: its planned courtyard layout and the craft visible overhead.",
          "localityIds": [
            "shenyang"
          ],
          "source": {
            "title": "Mukden Palace — photograph and documentation",
            "url": "https://commons.wikimedia.org/wiki/File:Mukden_Palace_drone_view_1.jpg"
          },
          "photo": {
            "src": "/images/expansion-mandarin-shenyang-12.webp",
            "alt": "Mukden Palace in Shenyang.",
            "caption": "Mukden Palace — Shenyang.",
            "author": "Techyan",
            "license": "CC BY-SA 4.0",
            "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
            "sourceUrl": "https://commons.wikimedia.org/wiki/File:Mukden_Palace_drone_view_1.jpg"
          }
        },
        {
          "title": "The performance street",
          "text": "The photographed Liu Laogen Grand Stage stands in the Zhongjie area. Read its setting alongside the nearby shopping street; a theatre frontage does not document the pronunciation of a particular performance.",
          "localityIds": [
            "shenyang"
          ],
          "source": {
            "title": "Liu Laogen Grand Stage — photograph and documentation",
            "url": "https://commons.wikimedia.org/wiki/File:Liu_Laogen_Grand_Stage,_Shenyang_Zhongjie_(20240503143126).jpg"
          },
          "photo": {
            "src": "/images/expansion-mandarin-shenyang-123.webp",
            "alt": "Liu Laogen Grand Stage in Shenyang.",
            "caption": "Liu Laogen Grand Stage — Shenyang.",
            "author": "N509FZ",
            "license": "CC BY-SA 4.0",
            "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
            "sourceUrl": "https://commons.wikimedia.org/wiki/File:Liu_Laogen_Grand_Stage,_Shenyang_Zhongjie_(20240503143126).jpg"
          }
        }
      ],
      "resources": [
        {
          "title": "Song Tan: Shenyang Mandarin and Standard Mandarin, 2017",
          "description": "Local speech, study scope and transcription conventions.",
          "localityIds": [
            "shenyang"
          ],
          "kind": "Study",
          "url": "https://shs.cairn.info/article/LING_532_0237/pdf?lang=fr"
        },
        {
          "title": "Palace architecture",
          "description": "Mukden Palace — photograph and documentation",
          "localityIds": [
            "shenyang"
          ],
          "kind": "Culture",
          "url": "https://commons.wikimedia.org/wiki/File:Mukden_Palace_drone_view_1.jpg"
        },
        {
          "title": "The performance street",
          "description": "Liu Laogen Grand Stage — photograph and documentation",
          "localityIds": [
            "shenyang"
          ],
          "kind": "Culture",
          "url": "https://commons.wikimedia.org/wiki/File:Liu_Laogen_Grand_Stage,_Shenyang_Zhongjie_(20240503143126).jpg"
        }
      ],
      "photos": [
        {
          "id": "shenyang-12",
          "src": "/images/expansion-mandarin-shenyang-12.webp",
          "title": "Mukden Palace",
          "category": "Culture",
          "alt": "Mukden Palace in Shenyang.",
          "caption": "Mukden Palace — Shenyang.",
          "author": "Techyan",
          "license": "CC BY-SA 4.0",
          "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
          "sourceUrl": "https://commons.wikimedia.org/wiki/File:Mukden_Palace_drone_view_1.jpg",
          "width": 1200,
          "height": 675
        },
        {
          "id": "shenyang-1",
          "src": "/images/expansion-mandarin-shenyang-1.webp",
          "title": "Palace ceiling detail",
          "category": "Culture",
          "alt": "Palace ceiling detail in Shenyang.",
          "caption": "Palace ceiling detail — Shenyang.",
          "author": "Pauloleong2002",
          "license": "CC BY-SA 4.0",
          "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
          "sourceUrl": "https://commons.wikimedia.org/wiki/File:Ceiling_in_Mukden_Palace.jpg",
          "width": 1200,
          "height": 1013
        },
        {
          "id": "shenyang-86",
          "src": "/images/expansion-mandarin-shenyang-86.webp",
          "title": "Decorative panel at Zhaoling",
          "category": "Culture",
          "alt": "Decorative panel at Zhaoling in Shenyang.",
          "caption": "Decorative panel at Zhaoling — Shenyang.",
          "author": "Gary Lee Todd, Ph.D.",
          "license": "CC0",
          "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/deed.en",
          "sourceUrl": "https://commons.wikimedia.org/wiki/File:2014_North_Tomb_(Zhaoling,_Tomb_of_Manchu_Chief_Abahai_or_Huang_Taiji)_04.jpg",
          "width": 1200,
          "height": 800
        },
        {
          "id": "shenyang-112",
          "src": "/images/expansion-mandarin-shenyang-112.webp",
          "title": "A stone camel at Zhaoling",
          "category": "Culture",
          "alt": "A stone camel at Zhaoling in Shenyang.",
          "caption": "A stone camel at Zhaoling — Shenyang.",
          "author": "Farm",
          "license": "CC BY-SA 3.0",
          "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
          "sourceUrl": "https://commons.wikimedia.org/wiki/File:Zhaoling_Qing_Camel.JPG",
          "width": 1200,
          "height": 800
        },
        {
          "id": "shenyang-130",
          "src": "/images/expansion-mandarin-shenyang-130.webp",
          "title": "Zhongjie shopping street",
          "category": "Streets",
          "alt": "Zhongjie shopping street in Shenyang.",
          "caption": "Zhongjie shopping street — Shenyang.",
          "author": "Emmanuel Grolleau",
          "license": "CC BY-SA 3.0",
          "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/",
          "sourceUrl": "https://commons.wikimedia.org/wiki/File:Shenyang-zhongjie.jpg",
          "width": 1200,
          "height": 900
        },
        {
          "id": "shenyang-123",
          "src": "/images/expansion-mandarin-shenyang-123.webp",
          "title": "Liu Laogen Grand Stage",
          "category": "Culture",
          "alt": "Liu Laogen Grand Stage in Shenyang.",
          "caption": "Liu Laogen Grand Stage — Shenyang.",
          "author": "N509FZ",
          "license": "CC BY-SA 4.0",
          "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
          "sourceUrl": "https://commons.wikimedia.org/wiki/File:Liu_Laogen_Grand_Stage,_Shenyang_Zhongjie_(20240503143126).jpg",
          "width": 1200,
          "height": 800
        },
        {
          "id": "shenyang-132",
          "src": "/images/expansion-mandarin-shenyang-132.webp",
          "title": "Zhongjie metro station",
          "category": "Streets",
          "alt": "Zhongjie metro station in Shenyang.",
          "caption": "Zhongjie metro station — Shenyang.",
          "author": "Tonyxy1992",
          "license": "CC BY-SA 3.0",
          "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
          "sourceUrl": "https://commons.wikimedia.org/wiki/File:Shenyang_Metro_Zhongjie_Station.jpg",
          "width": 1200,
          "height": 900
        },
        {
          "id": "shenyang-48",
          "src": "/images/expansion-mandarin-shenyang-48.webp",
          "title": "The modern skyline",
          "category": "Landscape",
          "alt": "The modern skyline in Shenyang.",
          "caption": "The modern skyline — Shenyang.",
          "author": "E2568",
          "license": "CC0",
          "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/deed.en",
          "sourceUrl": "https://commons.wikimedia.org/wiki/File:Skyline_of_Shenyang_3.jpg",
          "width": 1200,
          "height": 900
        },
        {
          "id": "shenyang-135",
          "src": "/images/expansion-mandarin-shenyang-135.webp",
          "title": "A sculpture on Zhongjie",
          "category": "Culture",
          "alt": "A sculpture on Zhongjie in Shenyang.",
          "caption": "A sculpture on Zhongjie — Shenyang.",
          "author": "Anna Frodesiak",
          "license": "CC0",
          "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/deed.en",
          "sourceUrl": "https://commons.wikimedia.org/wiki/File:Statue_at_Zhongjie_Road_-_01.jpg",
          "width": 1200,
          "height": 1600
        }
      ]
    },
    {
      "point": {
        "id": "dalian",
        "name": "Dalian",
        "nativeName": "大連",
        "coordinates": [
          121.61,
          38.91
        ],
        "groupId": "mandarin",
        "subgroupId": "jiaoliao",
        "hierarchy": [
          "Sinitic",
          "Mandarin",
          "Jiao–Liao Mandarin",
          "Dalian"
        ]
      },
      "article": {
        "title": "Dalian",
        "dek": "A Liaodong coastal city whose speech connects across the Bohai Sea.",
        "sections": [
          {
            "heading": "Local speech",
            "paragraphs": [
              "Dalian is in Jiao–Liao Mandarin, not Northeastern Mandarin simply because it is geographically in northeast China. The linguistic link across the Liaodong and Shandong peninsulas is reflected in the branch name."
            ]
          },
          {
            "heading": "Two falling tones can stay distinct",
            "paragraphs": [
              "The 2022 Dalian study examines the incomplete convergence of two falling tones. Similar pitch shapes do not necessarily mean that speakers have lost a lexical contrast."
            ]
          },
          {
            "heading": "A word’s frequency matters",
            "paragraphs": [
              "The experiment tests lexical frequency and the number of homophones, as well as speaker generation. It finds that the falling-tone contrast is rather stable across the two sampled generations; Dalian should not be reduced to one stereotyped intonation."
            ]
          },
          {
            "heading": "The fish market",
            "paragraphs": [
              "The market photograph shows seafood as a material part of the coastal city’s daily life. It sits alongside food preparation and harbour scenes rather than standing for a single “Dalian culture”."
            ]
          },
          {
            "heading": "Music in Labour Park",
            "paragraphs": [
              "The credited photograph documents a ruan player in Labour Park. The instrument and park setting provide a close view of public music-making without assigning a language identity to the musician."
            ]
          }
        ],
        "facts": [
          {
            "label": "Group",
            "value": "Mandarin"
          },
          {
            "label": "Branch",
            "value": "Jiao–Liao Mandarin"
          },
          {
            "label": "Entry type",
            "value": "Locality reference"
          },
          {
            "label": "Name convention",
            "value": "Conventional city name; not a phonetic transcription"
          },
          {
            "label": "Map anchor",
            "value": "Dalian city reference; not a dialect boundary"
          }
        ],
        "sources": [
          {
            "title": "Liu et al.: Incomplete tonal neutralization in Dalian Mandarin, 2022",
            "url": "https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2022.867353/full"
          },
          {
            "title": "Fish market — photograph and documentation",
            "url": "https://commons.wikimedia.org/wiki/File:Dalian_Fish_Market.jpg"
          },
          {
            "title": "A ruan player in Labour Park — photograph and documentation",
            "url": "https://commons.wikimedia.org/wiki/File:Dalian_Liaoning_China_Ruan-Player-in-Dalian-Labour-Park-01.jpg"
          }
        ],
        "readingMinutes": 2
      },
      "words": [],
      "soundNotes": [
        {
          "title": "Two falling tones can stay distinct",
          "text": "The 2022 Dalian study examines the incomplete convergence of two falling tones. Similar pitch shapes do not necessarily mean that speakers have lost a lexical contrast.",
          "localityIds": [
            "dalian"
          ],
          "source": {
            "title": "Liu et al.: Incomplete tonal neutralization in Dalian Mandarin, 2022",
            "url": "https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2022.867353/full"
          }
        },
        {
          "title": "A word’s frequency matters",
          "text": "The experiment tests lexical frequency and the number of homophones, as well as speaker generation. It finds that the falling-tone contrast is rather stable across the two sampled generations; Dalian should not be reduced to one stereotyped intonation.",
          "localityIds": [
            "dalian"
          ],
          "source": {
            "title": "Liu et al.: Incomplete tonal neutralization in Dalian Mandarin, 2022",
            "url": "https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2022.867353/full"
          }
        }
      ],
      "culture": [
        {
          "title": "The fish market",
          "text": "The market photograph shows seafood as a material part of the coastal city’s daily life. It sits alongside food preparation and harbour scenes rather than standing for a single “Dalian culture”.",
          "localityIds": [
            "dalian"
          ],
          "source": {
            "title": "Fish market — photograph and documentation",
            "url": "https://commons.wikimedia.org/wiki/File:Dalian_Fish_Market.jpg"
          },
          "photo": {
            "src": "/images/expansion-mandarin-dalian-25.webp",
            "alt": "Fish market in Dalian.",
            "caption": "Fish market — Dalian.",
            "author": "bfishadow",
            "license": "CC BY 2.0",
            "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
            "sourceUrl": "https://commons.wikimedia.org/wiki/File:Dalian_Fish_Market.jpg"
          }
        },
        {
          "title": "Music in Labour Park",
          "text": "The credited photograph documents a ruan player in Labour Park. The instrument and park setting provide a close view of public music-making without assigning a language identity to the musician.",
          "localityIds": [
            "dalian"
          ],
          "source": {
            "title": "A ruan player in Labour Park — photograph and documentation",
            "url": "https://commons.wikimedia.org/wiki/File:Dalian_Liaoning_China_Ruan-Player-in-Dalian-Labour-Park-01.jpg"
          },
          "photo": {
            "src": "/images/expansion-mandarin-dalian-30.webp",
            "alt": "A ruan player in Labour Park in Dalian.",
            "caption": "A ruan player in Labour Park — Dalian.",
            "author": "CEphoto, Uwe Aranas",
            "license": "CC BY-SA 3.0",
            "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
            "sourceUrl": "https://commons.wikimedia.org/wiki/File:Dalian_Liaoning_China_Ruan-Player-in-Dalian-Labour-Park-01.jpg"
          }
        }
      ],
      "resources": [
        {
          "title": "Liu et al.: Incomplete tonal neutralization in Dalian Mandarin, 2022",
          "description": "Local speech, study scope and transcription conventions.",
          "localityIds": [
            "dalian"
          ],
          "kind": "Study",
          "url": "https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2022.867353/full"
        },
        {
          "title": "The fish market",
          "description": "Fish market — photograph and documentation",
          "localityIds": [
            "dalian"
          ],
          "kind": "Culture",
          "url": "https://commons.wikimedia.org/wiki/File:Dalian_Fish_Market.jpg"
        },
        {
          "title": "Music in Labour Park",
          "description": "A ruan player in Labour Park — photograph and documentation",
          "localityIds": [
            "dalian"
          ],
          "kind": "Culture",
          "url": "https://commons.wikimedia.org/wiki/File:Dalian_Liaoning_China_Ruan-Player-in-Dalian-Labour-Park-01.jpg"
        }
      ],
      "photos": [
        {
          "id": "dalian-25",
          "src": "/images/expansion-mandarin-dalian-25.webp",
          "title": "Fish market",
          "category": "Food",
          "alt": "Fish market in Dalian.",
          "caption": "Fish market — Dalian.",
          "author": "bfishadow",
          "license": "CC BY 2.0",
          "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
          "sourceUrl": "https://commons.wikimedia.org/wiki/File:Dalian_Fish_Market.jpg",
          "width": 1200,
          "height": 900
        },
        {
          "id": "dalian-0",
          "src": "/images/expansion-mandarin-dalian-0.webp",
          "title": "Xinghai Square",
          "category": "Streets",
          "alt": "Xinghai Square in Dalian.",
          "caption": "Xinghai Square — Dalian.",
          "author": "Air7538",
          "license": "CC BY-SA 4.0",
          "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
          "sourceUrl": "https://commons.wikimedia.org/wiki/File:China_Dalian_Xinghai_Square_or_Xinghai_Plaza_Day.jpg",
          "width": 1200,
          "height": 329
        },
        {
          "id": "dalian-17",
          "src": "/images/expansion-mandarin-dalian-17.webp",
          "title": "Bangchuidao Island",
          "category": "Landscape",
          "alt": "Bangchuidao Island in Dalian.",
          "caption": "Bangchuidao Island — Dalian.",
          "author": "JesseW900",
          "license": "CC BY-SA 4.0",
          "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
          "sourceUrl": "https://commons.wikimedia.org/wiki/File:Bangchuidao_Island.JPG",
          "width": 1200,
          "height": 900
        },
        {
          "id": "dalian-21",
          "src": "/images/expansion-mandarin-dalian-21.webp",
          "title": "Older shops below the bank tower",
          "category": "Streets",
          "alt": "Older shops below the bank tower in Dalian.",
          "caption": "Older shops below the bank tower — Dalian.",
          "author": "by user:Pubert",
          "license": "Public domain",
          "licenseUrl": "https://creativecommons.org/publicdomain/mark/1.0/",
          "sourceUrl": "https://commons.wikimedia.org/wiki/File:Dalian_Bank_Tower_and_older_shops_2005.jpg",
          "width": 1200,
          "height": 1796
        },
        {
          "id": "dalian-22",
          "src": "/images/expansion-mandarin-dalian-22.webp",
          "title": "International Conference Center",
          "category": "Culture",
          "alt": "International Conference Center in Dalian.",
          "caption": "International Conference Center — Dalian.",
          "author": "CEphoto, Uwe Aranas",
          "license": "CC BY-SA 3.0",
          "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
          "sourceUrl": "https://commons.wikimedia.org/wiki/File:Dalian_China_Dalian-International-Conference-Center-01.jpg",
          "width": 1200,
          "height": 561
        },
        {
          "id": "dalian-23",
          "src": "/images/expansion-mandarin-dalian-23.webp",
          "title": "A lighthouse on the bay",
          "category": "Landscape",
          "alt": "A lighthouse on the bay in Dalian.",
          "caption": "A lighthouse on the bay — Dalian.",
          "author": "CEphoto, Uwe Aranas",
          "license": "CC BY-SA 3.0",
          "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
          "sourceUrl": "https://commons.wikimedia.org/wiki/File:Dalian_China_Lighthouse-in-Dalian-Bay-01.jpg",
          "width": 1200,
          "height": 800
        },
        {
          "id": "dalian-26",
          "src": "/images/expansion-mandarin-dalian-26.webp",
          "title": "Labour Park sculpture",
          "category": "Culture",
          "alt": "Labour Park sculpture in Dalian.",
          "caption": "Labour Park sculpture — Dalian.",
          "author": "CEphoto, Uwe Aranas",
          "license": "CC BY-SA 3.0",
          "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
          "sourceUrl": "https://commons.wikimedia.org/wiki/File:Dalian_Liaoning_China_Buddha_Statue-in-Dalian-Labour-Park-02.jpg",
          "width": 1200,
          "height": 1870
        },
        {
          "id": "dalian-29",
          "src": "/images/expansion-mandarin-dalian-29.webp",
          "title": "Making noodles",
          "category": "Food",
          "alt": "Making noodles in Dalian.",
          "caption": "Making noodles — Dalian.",
          "author": "CEphoto, Uwe Aranas",
          "license": "CC BY-SA 4.0",
          "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
          "sourceUrl": "https://commons.wikimedia.org/wiki/File:Dalian_Liaoning_China_Noodlemaker-01.jpg",
          "width": 1200,
          "height": 1800
        },
        {
          "id": "dalian-30",
          "src": "/images/expansion-mandarin-dalian-30.webp",
          "title": "A ruan player in Labour Park",
          "category": "Culture",
          "alt": "A ruan player in Labour Park in Dalian.",
          "caption": "A ruan player in Labour Park — Dalian.",
          "author": "CEphoto, Uwe Aranas",
          "license": "CC BY-SA 3.0",
          "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
          "sourceUrl": "https://commons.wikimedia.org/wiki/File:Dalian_Liaoning_China_Ruan-Player-in-Dalian-Labour-Park-01.jpg",
          "width": 1200,
          "height": 1775
        }
      ]
    },
    {
      "point": {
        "id": "qingdao",
        "name": "Qingdao",
        "nativeName": "青島",
        "coordinates": [
          120.38,
          36.07
        ],
        "groupId": "mandarin",
        "subgroupId": "jiaoliao",
        "hierarchy": [
          "Sinitic",
          "Mandarin",
          "Jiao–Liao Mandarin",
          "Qingdao"
        ]
      },
      "article": {
        "title": "Qingdao",
        "dek": "Jiaodong speech, seaside streets, and a city of film.",
        "sections": [
          {
            "heading": "Local speech",
            "paragraphs": [
              "Qingdao is a city reference for Jiao–Liao Mandarin on the Shandong Peninsula. Its urban speech belongs beside Dalian in the tree, while Jinan remains in the separate Ji–Lu branch. The corpus provides a practical route into recorded regional speech."
            ]
          },
          {
            "heading": "A city sample within Jiao–Liao",
            "paragraphs": [
              "The JLMS25 corpus recruits speakers from Qingdao alongside Yantai, Weihai, Dalian, Dandong and Yingkou. These are distinct local sources within the corpus, not interchangeable recordings of one city accent."
            ]
          },
          {
            "heading": "Read speech has a register",
            "paragraphs": [
              "JLMS25 is a speech-recognition dataset. Its transcribed recording tasks are valuable evidence of the recorded speakers, but a model benchmark is not a dictionary of spontaneous Qingdao expressions. This page does not convert its text labels into invented IPA."
            ]
          },
          {
            "heading": "A city facing the sea",
            "paragraphs": [
              "No. 2 Beach and Zhanqiao give two different views of Qingdao’s coast: an open beach and a built waterfront. The street photographs show the city behind the shoreline."
            ]
          },
          {
            "heading": "A photography studio frontage",
            "paragraphs": [
              "The former Mifune studio is a documented building in Qingdao. Its photographed exterior adds a small-scale cultural landmark beside the better-known churches and seaside views."
            ]
          }
        ],
        "facts": [
          {
            "label": "Group",
            "value": "Mandarin"
          },
          {
            "label": "Branch",
            "value": "Jiao–Liao Mandarin"
          },
          {
            "label": "Entry type",
            "value": "Locality reference"
          },
          {
            "label": "Name convention",
            "value": "Conventional city name; not a phonetic transcription"
          },
          {
            "label": "Map anchor",
            "value": "Qingdao city reference; not a dialect boundary"
          }
        ],
        "sources": [
          {
            "title": "JLMS25: Jiao-Liao Mandarin speech corpus, 2025",
            "url": "https://www.mdpi.com/2076-3417/15/3/1670"
          },
          {
            "title": "No. 2 Beach — photograph and documentation",
            "url": "https://commons.wikimedia.org/wiki/File:20240729_Qingdao_No._2_Beach_01.jpg"
          },
          {
            "title": "Former Mifune photography studio — photograph and documentation",
            "url": "https://commons.wikimedia.org/wiki/File:%E9%9D%92%E5%B2%9B%E4%B8%89%E8%88%B9%E7%85%A7%E7%9B%B8%E9%A6%86%E6%97%A7%E5%9D%802024.3_(1).jpg"
          }
        ],
        "readingMinutes": 2
      },
      "words": [],
      "soundNotes": [
        {
          "title": "A city sample within Jiao–Liao",
          "text": "The JLMS25 corpus recruits speakers from Qingdao alongside Yantai, Weihai, Dalian, Dandong and Yingkou. These are distinct local sources within the corpus, not interchangeable recordings of one city accent.",
          "localityIds": [
            "qingdao"
          ],
          "source": {
            "title": "JLMS25: Jiao-Liao Mandarin speech corpus, 2025",
            "url": "https://www.mdpi.com/2076-3417/15/3/1670"
          }
        },
        {
          "title": "Read speech has a register",
          "text": "JLMS25 is a speech-recognition dataset. Its transcribed recording tasks are valuable evidence of the recorded speakers, but a model benchmark is not a dictionary of spontaneous Qingdao expressions. This page does not convert its text labels into invented IPA.",
          "localityIds": [
            "qingdao"
          ],
          "source": {
            "title": "JLMS25: Jiao-Liao Mandarin speech corpus, 2025",
            "url": "https://www.mdpi.com/2076-3417/15/3/1670"
          }
        }
      ],
      "culture": [
        {
          "title": "A city facing the sea",
          "text": "No. 2 Beach and Zhanqiao give two different views of Qingdao’s coast: an open beach and a built waterfront. The street photographs show the city behind the shoreline.",
          "localityIds": [
            "qingdao"
          ],
          "source": {
            "title": "No. 2 Beach — photograph and documentation",
            "url": "https://commons.wikimedia.org/wiki/File:20240729_Qingdao_No._2_Beach_01.jpg"
          },
          "photo": {
            "src": "/images/expansion-mandarin-qingdao-18.webp",
            "alt": "No. 2 Beach in Qingdao.",
            "caption": "No. 2 Beach — Qingdao.",
            "author": "Windmemories",
            "license": "CC BY-SA 4.0",
            "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
            "sourceUrl": "https://commons.wikimedia.org/wiki/File:20240729_Qingdao_No._2_Beach_01.jpg"
          }
        },
        {
          "title": "A photography studio frontage",
          "text": "The former Mifune studio is a documented building in Qingdao. Its photographed exterior adds a small-scale cultural landmark beside the better-known churches and seaside views.",
          "localityIds": [
            "qingdao"
          ],
          "source": {
            "title": "Former Mifune photography studio — photograph and documentation",
            "url": "https://commons.wikimedia.org/wiki/File:%E9%9D%92%E5%B2%9B%E4%B8%89%E8%88%B9%E7%85%A7%E7%9B%B8%E9%A6%86%E6%97%A7%E5%9D%802024.3_(1).jpg"
          },
          "photo": {
            "src": "/images/expansion-mandarin-qingdao-60.webp",
            "alt": "Former Mifune photography studio in Qingdao.",
            "caption": "Former Mifune photography studio — Qingdao.",
            "author": "ScareCriterion12",
            "license": "CC0",
            "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/deed.en",
            "sourceUrl": "https://commons.wikimedia.org/wiki/File:%E9%9D%92%E5%B2%9B%E4%B8%89%E8%88%B9%E7%85%A7%E7%9B%B8%E9%A6%86%E6%97%A7%E5%9D%802024.3_(1).jpg"
          }
        }
      ],
      "resources": [
        {
          "title": "JLMS25: Jiao-Liao Mandarin speech corpus, 2025",
          "description": "Local speech, study scope and transcription conventions.",
          "localityIds": [
            "qingdao"
          ],
          "kind": "Study",
          "url": "https://www.mdpi.com/2076-3417/15/3/1670"
        },
        {
          "title": "A city facing the sea",
          "description": "No. 2 Beach — photograph and documentation",
          "localityIds": [
            "qingdao"
          ],
          "kind": "Culture",
          "url": "https://commons.wikimedia.org/wiki/File:20240729_Qingdao_No._2_Beach_01.jpg"
        },
        {
          "title": "A photography studio frontage",
          "description": "Former Mifune photography studio — photograph and documentation",
          "localityIds": [
            "qingdao"
          ],
          "kind": "Culture",
          "url": "https://commons.wikimedia.org/wiki/File:%E9%9D%92%E5%B2%9B%E4%B8%89%E8%88%B9%E7%85%A7%E7%9B%B8%E9%A6%86%E6%97%A7%E5%9D%802024.3_(1).jpg"
        }
      ],
      "photos": [
        {
          "id": "qingdao-0",
          "src": "/images/expansion-mandarin-qingdao-0.webp",
          "title": "Zhanqiao pier",
          "category": "Landscape",
          "alt": "Zhanqiao pier in Qingdao.",
          "caption": "Zhanqiao pier — Qingdao.",
          "author": "Windmemories",
          "license": "CC BY-SA 4.0",
          "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
          "sourceUrl": "https://commons.wikimedia.org/wiki/File:20240729_Zhanqiao_01.jpg",
          "width": 1200,
          "height": 800
        },
        {
          "id": "qingdao-16",
          "src": "/images/expansion-mandarin-qingdao-16.webp",
          "title": "Badaguan streets",
          "category": "Streets",
          "alt": "Badaguan streets in Qingdao.",
          "caption": "Badaguan streets — Qingdao.",
          "author": "Windmemories",
          "license": "CC BY-SA 4.0",
          "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
          "sourceUrl": "https://commons.wikimedia.org/wiki/File:20151212_Badaguan_02.jpg",
          "width": 1200,
          "height": 800
        },
        {
          "id": "qingdao-18",
          "src": "/images/expansion-mandarin-qingdao-18.webp",
          "title": "No. 2 Beach",
          "category": "Landscape",
          "alt": "No. 2 Beach in Qingdao.",
          "caption": "No. 2 Beach — Qingdao.",
          "author": "Windmemories",
          "license": "CC BY-SA 4.0",
          "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
          "sourceUrl": "https://commons.wikimedia.org/wiki/File:20240729_Qingdao_No._2_Beach_01.jpg",
          "width": 1200,
          "height": 800
        },
        {
          "id": "qingdao-47",
          "src": "/images/expansion-mandarin-qingdao-47.webp",
          "title": "Taidong pedestrian street",
          "category": "Streets",
          "alt": "Taidong pedestrian street in Qingdao.",
          "caption": "Taidong pedestrian street — Qingdao.",
          "author": "CHENG SHIYI",
          "license": "CC0",
          "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/deed.en",
          "sourceUrl": "https://commons.wikimedia.org/wiki/File:Qingdao_Taidong_Pedestrian_Street.jpg",
          "width": 1200,
          "height": 1600
        },
        {
          "id": "qingdao-59",
          "src": "/images/expansion-mandarin-qingdao-59.webp",
          "title": "Zhongshan Road",
          "category": "Streets",
          "alt": "Zhongshan Road in Qingdao.",
          "caption": "Zhongshan Road — Qingdao.",
          "author": "Kobe Bryn",
          "license": "CC BY 3.0",
          "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
          "sourceUrl": "https://commons.wikimedia.org/wiki/File:Zhongshan_Road_Shangquan,_Qingdao,_Shandong,_China_-_panoramio_(102).jpg",
          "width": 1200,
          "height": 900
        },
        {
          "id": "qingdao-60",
          "src": "/images/expansion-mandarin-qingdao-60.webp",
          "title": "Former Mifune photography studio",
          "category": "Culture",
          "alt": "Former Mifune photography studio in Qingdao.",
          "caption": "Former Mifune photography studio — Qingdao.",
          "author": "ScareCriterion12",
          "license": "CC0",
          "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/deed.en",
          "sourceUrl": "https://commons.wikimedia.org/wiki/File:%E9%9D%92%E5%B2%9B%E4%B8%89%E8%88%B9%E7%85%A7%E7%9B%B8%E9%A6%86%E6%97%A7%E5%9D%802024.3_(1).jpg",
          "width": 1200,
          "height": 779
        },
        {
          "id": "qingdao-63",
          "src": "/images/expansion-mandarin-qingdao-63.webp",
          "title": "Saint Michael’s Cathedral",
          "category": "Culture",
          "alt": "Saint Michael’s Cathedral in Qingdao.",
          "caption": "Saint Michael’s Cathedral — Qingdao.",
          "author": "ScareCriterion12",
          "license": "CC0",
          "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/deed.en",
          "sourceUrl": "https://commons.wikimedia.org/wiki/File:%E9%9D%92%E5%B2%9B%E5%A4%A9%E4%B8%BB%E5%A0%82%E5%A4%96%E7%AB%8B%E9%9D%A22024.3.jpg",
          "width": 1200,
          "height": 1668
        },
        {
          "id": "qingdao-64",
          "src": "/images/expansion-mandarin-qingdao-64.webp",
          "title": "Jiangsu Road church",
          "category": "Culture",
          "alt": "Jiangsu Road church in Qingdao.",
          "caption": "Jiangsu Road church — Qingdao.",
          "author": "ScareCriterion12",
          "license": "CC0",
          "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/deed.en",
          "sourceUrl": "https://commons.wikimedia.org/wiki/File:%E9%9D%92%E5%B2%9B%E6%B1%9F%E8%8B%8F%E8%B7%AF%E5%9F%BA%E7%9D%A3%E5%A0%82%E5%A4%96%E7%AB%8B%E9%9D%A22024.3_(1).jpg",
          "width": 1200,
          "height": 803
        },
        {
          "id": "qingdao-34",
          "src": "/images/expansion-mandarin-qingdao-34.webp",
          "title": "Arriving at Qingdao railway station",
          "category": "Streets",
          "alt": "Arriving at Qingdao railway station in Qingdao.",
          "caption": "Arriving at Qingdao railway station — Qingdao.",
          "author": "N509FZ",
          "license": "CC BY-SA 4.0",
          "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
          "sourceUrl": "https://commons.wikimedia.org/wiki/File:Exit_D_of_Metro_Qingdao_Railway_Station_(20230429103632).jpg",
          "width": 1200,
          "height": 800
        }
      ]
    },
    {
      "point": {
        "id": "zhengzhou",
        "name": "Zhengzhou",
        "nativeName": "鄭州",
        "coordinates": [
          113.63,
          34.75
        ],
        "groupId": "mandarin",
        "subgroupId": "central-plains",
        "hierarchy": [
          "Sinitic",
          "Mandarin",
          "Central Plains Mandarin",
          "Zhengzhou"
        ]
      },
      "article": {
        "title": "Zhengzhou",
        "dek": "Central Plains speech around a city of old walls and busy streets.",
        "sections": [
          {
            "heading": "Local speech",
            "paragraphs": [
              "Zhengzhou is a Central Plains Mandarin reference. Here the entry means the city’s documented speech, not every variety within the much wider Zhengzhou administrative area or all of Henan. Its dedicated phonetic research is a starting point for a locally sourced word collection."
            ]
          },
          {
            "heading": "One character can have more than one history",
            "paragraphs": [
              "The IALP study follows the sound development of 足 in Zhengzhou and compares recorded local readings with earlier descriptions. A character alone cannot identify which local pronunciation a speaker uses."
            ]
          },
          {
            "heading": "Compare words in their setting",
            "paragraphs": [
              "The study is about a particular sound change, rather than a complete phrasebook. Keep its local forms tied to the described word and context; a Mandarin reading of the same character is not a replacement pronunciation."
            ]
          },
          {
            "heading": "The Shang city wall",
            "paragraphs": [
              "The surviving earthen city wall is shown as a specific archaeological feature in present-day Zhengzhou. It belongs in the city’s cultural setting, not in a reconstruction of ancient pronunciation."
            ]
          },
          {
            "heading": "Objects in the museum",
            "paragraphs": [
              "The Song porcelain pillow and malla figure are separately photographed museum objects. They offer a closer look at materials and forms than another broad museum exterior would."
            ]
          }
        ],
        "facts": [
          {
            "label": "Group",
            "value": "Mandarin"
          },
          {
            "label": "Branch",
            "value": "Central Plains Mandarin"
          },
          {
            "label": "Entry type",
            "value": "Locality reference"
          },
          {
            "label": "Name convention",
            "value": "Conventional city name; not a phonetic transcription"
          },
          {
            "label": "Map anchor",
            "value": "Zhengzhou city reference; not a dialect boundary"
          }
        ],
        "sources": [
          {
            "title": "The Sound Change of 足 in Zhengzhou Dialect, IALP 2023",
            "url": "https://www.colips.org/conferences/ialp2023/proceedings/papers/IALP2023_P010.pdf"
          },
          {
            "title": "Shang city wall — photograph and documentation",
            "url": "https://commons.wikimedia.org/wiki/File:20250527_East_wall_of_the_Zhengzhou_Shang_city.jpg"
          },
          {
            "title": "A Song porcelain pillow — photograph and documentation",
            "url": "https://commons.wikimedia.org/wiki/File:Song_Porcelain_Pillow_-_Zhengzhou_Museum_1.jpg"
          }
        ],
        "readingMinutes": 2
      },
      "words": [],
      "soundNotes": [
        {
          "title": "One character can have more than one history",
          "text": "The IALP study follows the sound development of 足 in Zhengzhou and compares recorded local readings with earlier descriptions. A character alone cannot identify which local pronunciation a speaker uses.",
          "localityIds": [
            "zhengzhou"
          ],
          "source": {
            "title": "The Sound Change of 足 in Zhengzhou Dialect, IALP 2023",
            "url": "https://www.colips.org/conferences/ialp2023/proceedings/papers/IALP2023_P010.pdf"
          }
        },
        {
          "title": "Compare words in their setting",
          "text": "The study is about a particular sound change, rather than a complete phrasebook. Keep its local forms tied to the described word and context; a Mandarin reading of the same character is not a replacement pronunciation.",
          "localityIds": [
            "zhengzhou"
          ],
          "source": {
            "title": "The Sound Change of 足 in Zhengzhou Dialect, IALP 2023",
            "url": "https://www.colips.org/conferences/ialp2023/proceedings/papers/IALP2023_P010.pdf"
          }
        }
      ],
      "culture": [
        {
          "title": "The Shang city wall",
          "text": "The surviving earthen city wall is shown as a specific archaeological feature in present-day Zhengzhou. It belongs in the city’s cultural setting, not in a reconstruction of ancient pronunciation.",
          "localityIds": [
            "zhengzhou"
          ],
          "source": {
            "title": "Shang city wall — photograph and documentation",
            "url": "https://commons.wikimedia.org/wiki/File:20250527_East_wall_of_the_Zhengzhou_Shang_city.jpg"
          },
          "photo": {
            "src": "/images/expansion-mandarin-zhengzhou-1.webp",
            "alt": "Shang city wall in Zhengzhou.",
            "caption": "Shang city wall — Zhengzhou.",
            "author": "Yumeto",
            "license": "CC BY-SA 4.0",
            "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
            "sourceUrl": "https://commons.wikimedia.org/wiki/File:20250527_East_wall_of_the_Zhengzhou_Shang_city.jpg"
          }
        },
        {
          "title": "Objects in the museum",
          "text": "The Song porcelain pillow and malla figure are separately photographed museum objects. They offer a closer look at materials and forms than another broad museum exterior would.",
          "localityIds": [
            "zhengzhou"
          ],
          "source": {
            "title": "A Song porcelain pillow — photograph and documentation",
            "url": "https://commons.wikimedia.org/wiki/File:Song_Porcelain_Pillow_-_Zhengzhou_Museum_1.jpg"
          },
          "photo": {
            "src": "/images/expansion-mandarin-zhengzhou-46.webp",
            "alt": "A Song porcelain pillow in Zhengzhou.",
            "caption": "A Song porcelain pillow — Zhengzhou.",
            "author": "Gary Todd",
            "license": "CC0",
            "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/deed.en",
            "sourceUrl": "https://commons.wikimedia.org/wiki/File:Song_Porcelain_Pillow_-_Zhengzhou_Museum_1.jpg"
          }
        }
      ],
      "resources": [
        {
          "title": "The Sound Change of 足 in Zhengzhou Dialect, IALP 2023",
          "description": "Local speech, study scope and transcription conventions.",
          "localityIds": [
            "zhengzhou"
          ],
          "kind": "Study",
          "url": "https://www.colips.org/conferences/ialp2023/proceedings/papers/IALP2023_P010.pdf"
        },
        {
          "title": "The Shang city wall",
          "description": "Shang city wall — photograph and documentation",
          "localityIds": [
            "zhengzhou"
          ],
          "kind": "Culture",
          "url": "https://commons.wikimedia.org/wiki/File:20250527_East_wall_of_the_Zhengzhou_Shang_city.jpg"
        },
        {
          "title": "Objects in the museum",
          "description": "A Song porcelain pillow — photograph and documentation",
          "localityIds": [
            "zhengzhou"
          ],
          "kind": "Culture",
          "url": "https://commons.wikimedia.org/wiki/File:Song_Porcelain_Pillow_-_Zhengzhou_Museum_1.jpg"
        }
      ],
      "photos": [
        {
          "id": "zhengzhou-16",
          "src": "/images/expansion-mandarin-zhengzhou-16.webp",
          "title": "Erqi Tower",
          "category": "Culture",
          "alt": "Erqi Tower in Zhengzhou.",
          "caption": "Erqi Tower — Zhengzhou.",
          "author": "Gary Todd",
          "license": "CC0",
          "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/deed.en",
          "sourceUrl": "https://commons.wikimedia.org/wiki/File:2006_Erqi_Tower,_Zhengzhou.jpg",
          "width": 1200,
          "height": 1600
        },
        {
          "id": "zhengzhou-1",
          "src": "/images/expansion-mandarin-zhengzhou-1.webp",
          "title": "Shang city wall",
          "category": "Culture",
          "alt": "Shang city wall in Zhengzhou.",
          "caption": "Shang city wall — Zhengzhou.",
          "author": "Yumeto",
          "license": "CC BY-SA 4.0",
          "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
          "sourceUrl": "https://commons.wikimedia.org/wiki/File:20250527_East_wall_of_the_Zhengzhou_Shang_city.jpg",
          "width": 1200,
          "height": 900
        },
        {
          "id": "zhengzhou-31",
          "src": "/images/expansion-mandarin-zhengzhou-31.webp",
          "title": "Xidajie",
          "category": "Streets",
          "alt": "Xidajie in Zhengzhou.",
          "caption": "Xidajie — Zhengzhou.",
          "author": "Windmemories",
          "license": "CC BY-SA 4.0",
          "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
          "sourceUrl": "https://commons.wikimedia.org/wiki/File:Xidajie_near_Erqi_Square,_Zhengzhou_20190320.jpg",
          "width": 1200,
          "height": 800
        },
        {
          "id": "zhengzhou-34",
          "src": "/images/expansion-mandarin-zhengzhou-34.webp",
          "title": "Zhengzhou Art Museum",
          "category": "Culture",
          "alt": "Zhengzhou Art Museum in Zhengzhou.",
          "caption": "Zhengzhou Art Museum — Zhengzhou.",
          "author": "Windmemories",
          "license": "CC BY-SA 4.0",
          "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
          "sourceUrl": "https://commons.wikimedia.org/wiki/File:20241018_New_site_of_Zhengzhou_Art_Museum.jpg",
          "width": 1200,
          "height": 800
        },
        {
          "id": "zhengzhou-35",
          "src": "/images/expansion-mandarin-zhengzhou-35.webp",
          "title": "Zhengzhou Museum",
          "category": "Culture",
          "alt": "Zhengzhou Museum in Zhengzhou.",
          "caption": "Zhengzhou Museum — Zhengzhou.",
          "author": "Windmemories",
          "license": "CC BY-SA 4.0",
          "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
          "sourceUrl": "https://commons.wikimedia.org/wiki/File:20241018_New_site_of_Zhengzhou_Museum.jpg",
          "width": 1200,
          "height": 800
        },
        {
          "id": "zhengzhou-38",
          "src": "/images/expansion-mandarin-zhengzhou-38.webp",
          "title": "Science Museum on Songshan Road",
          "category": "Culture",
          "alt": "Science Museum on Songshan Road in Zhengzhou.",
          "caption": "Science Museum on Songshan Road — Zhengzhou.",
          "author": "Windmemories",
          "license": "CC BY-SA 4.0",
          "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
          "sourceUrl": "https://commons.wikimedia.org/wiki/File:20250110_Zhengzhou_Science_Museum_on_Songshan_Road.jpg",
          "width": 1200,
          "height": 800
        },
        {
          "id": "zhengzhou-46",
          "src": "/images/expansion-mandarin-zhengzhou-46.webp",
          "title": "A Song porcelain pillow",
          "category": "Culture",
          "alt": "A Song porcelain pillow in Zhengzhou.",
          "caption": "A Song porcelain pillow — Zhengzhou.",
          "author": "Gary Todd",
          "license": "CC0",
          "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/deed.en",
          "sourceUrl": "https://commons.wikimedia.org/wiki/File:Song_Porcelain_Pillow_-_Zhengzhou_Museum_1.jpg",
          "width": 1200,
          "height": 900
        },
        {
          "id": "zhengzhou-32",
          "src": "/images/expansion-mandarin-zhengzhou-32.webp",
          "title": "A malla figure",
          "category": "Culture",
          "alt": "A malla figure in Zhengzhou.",
          "caption": "A malla figure — Zhengzhou.",
          "author": "Windmemories",
          "license": "CC BY-SA 4.0",
          "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
          "sourceUrl": "https://commons.wikimedia.org/wiki/File:20210529_Statuette_of_malla_at_Zhengzhou_Museum_01.jpg",
          "width": 1200,
          "height": 1800
        },
        {
          "id": "zhengzhou-62",
          "src": "/images/expansion-mandarin-zhengzhou-62.webp",
          "title": "Black swans at Zhengzhou Zoo",
          "category": "Landscape",
          "alt": "Black swans at Zhengzhou Zoo in Zhengzhou.",
          "caption": "Black swans at Zhengzhou Zoo — Zhengzhou.",
          "author": "Gary Todd",
          "license": "CC0",
          "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/deed.en",
          "sourceUrl": "https://commons.wikimedia.org/wiki/File:Zhengzhou_Zoo_Black_Swans.jpg",
          "width": 1200,
          "height": 800
        }
      ]
    },
    {
      "point": {
        "id": "xian",
        "name": "Xi’an",
        "nativeName": "西安",
        "coordinates": [
          108.94,
          34.34
        ],
        "groupId": "mandarin",
        "subgroupId": "central-plains",
        "hierarchy": [
          "Sinitic",
          "Mandarin",
          "Central Plains Mandarin",
          "Xi’an"
        ]
      },
      "article": {
        "title": "Xi’an",
        "dek": "Guanzhong speech, where 開 can mark the start of an event.",
        "sections": [
          {
            "heading": "Local speech",
            "paragraphs": [
              "Xi’an is in the Guanzhong part of Central Plains Mandarin. The city page keeps that linguistic placement distinct from the larger Shaanxi region. Local grammar matters alongside sound: the use of 開 makes a useful comparison with Standard Written Chinese."
            ]
          },
          {
            "heading": "開 can mean an action is beginning",
            "paragraphs": [
              "Qiao describes 開 after verbs or adjectives as an ingressive marker: it marks entry into an action or state. The study records both verb + 開 + object and verb + object + 開 patterns."
            ]
          },
          {
            "heading": "A full reading and a weak form",
            "paragraphs": [
              "The paper gives 開 a full reading [kʰɛ21] and a weakened grammatical use. Its weak-tone label is not a measured pitch contour. The study explicitly excludes the urban Hui community’s speech from its scope."
            ]
          },
          {
            "heading": "The Muslim Quarter",
            "paragraphs": [
              "The gallery includes the quarter as part of the city’s visible cultural landscape. Qiao’s linguistic study explicitly excludes urban Hui speech, so the photograph and the language sample have different scopes."
            ]
          },
          {
            "heading": "Pagodas and the city",
            "paragraphs": [
              "Giant Wild Goose Pagoda and Baoqing Temple’s pagoda are distinct landmarks. Their city locations help orient the gallery without turning historical monuments into evidence for present-day pronunciation."
            ]
          }
        ],
        "facts": [
          {
            "label": "Group",
            "value": "Mandarin"
          },
          {
            "label": "Branch",
            "value": "Central Plains Mandarin"
          },
          {
            "label": "Entry type",
            "value": "Locality reference"
          },
          {
            "label": "Name convention",
            "value": "Conventional city name; not a phonetic transcription"
          },
          {
            "label": "Map anchor",
            "value": "Xi’an city reference; not a dialect boundary"
          }
        ],
        "sources": [
          {
            "title": "Hang Qiao: The Meaning and Usage of Marker Kai in Xi’an Dialect, 2023",
            "url": "https://file.ewapub.com/press/media/72bb3333487a4621bda72223ec84a65e.marked.pdf"
          },
          {
            "title": "The Muslim Quarter — photograph and documentation",
            "url": "https://commons.wikimedia.org/wiki/File:1_xian_muslim_quarter_china_2011.JPG"
          },
          {
            "title": "Giant Wild Goose Pagoda — photograph and documentation",
            "url": "https://commons.wikimedia.org/wiki/File:Big_Wild_Goose_Pagoda,_Xian,_China_-_panoramio.jpg"
          }
        ],
        "readingMinutes": 2
      },
      "words": [
        {
          "id": "xian-kai-full",
          "han": "開",
          "english": "open; begin",
          "ipa": "kʰɛ21",
          "toneNotation": "pitch-contour",
          "localityId": "xian",
          "reading": "Full reading of 開",
          "registerLabel": "Full reading; grammatical use can be weak",
          "note": "Qiao, section 2. The weak grammatical form is not represented by this full-tone reading. Study excludes urban Hui speech.",
          "source": {
            "title": "Hang Qiao: The Meaning and Usage of Marker Kai in Xi’an Dialect, 2023",
            "url": "https://file.ewapub.com/press/media/72bb3333487a4621bda72223ec84a65e.marked.pdf"
          }
        }
      ],
      "soundNotes": [
        {
          "title": "開 can mean an action is beginning",
          "text": "Qiao describes 開 after verbs or adjectives as an ingressive marker: it marks entry into an action or state. The study records both verb + 開 + object and verb + object + 開 patterns.",
          "localityIds": [
            "xian"
          ],
          "source": {
            "title": "Hang Qiao: The Meaning and Usage of Marker Kai in Xi’an Dialect, 2023",
            "url": "https://file.ewapub.com/press/media/72bb3333487a4621bda72223ec84a65e.marked.pdf"
          }
        },
        {
          "title": "A full reading and a weak form",
          "text": "The paper gives 開 a full reading [kʰɛ21] and a weakened grammatical use. Its weak-tone label is not a measured pitch contour. The study explicitly excludes the urban Hui community’s speech from its scope.",
          "localityIds": [
            "xian"
          ],
          "source": {
            "title": "Hang Qiao: The Meaning and Usage of Marker Kai in Xi’an Dialect, 2023",
            "url": "https://file.ewapub.com/press/media/72bb3333487a4621bda72223ec84a65e.marked.pdf"
          }
        }
      ],
      "culture": [
        {
          "title": "The Muslim Quarter",
          "text": "The gallery includes the quarter as part of the city’s visible cultural landscape. Qiao’s linguistic study explicitly excludes urban Hui speech, so the photograph and the language sample have different scopes.",
          "localityIds": [
            "xian"
          ],
          "source": {
            "title": "The Muslim Quarter — photograph and documentation",
            "url": "https://commons.wikimedia.org/wiki/File:1_xian_muslim_quarter_china_2011.JPG"
          },
          "photo": {
            "src": "/images/expansion-mandarin-xian-0.webp",
            "alt": "The Muslim Quarter in Xi’an.",
            "caption": "The Muslim Quarter — Xi’an.",
            "author": "chensiyuan",
            "license": "CC BY-SA 4.0",
            "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
            "sourceUrl": "https://commons.wikimedia.org/wiki/File:1_xian_muslim_quarter_china_2011.JPG"
          }
        },
        {
          "title": "Pagodas and the city",
          "text": "Giant Wild Goose Pagoda and Baoqing Temple’s pagoda are distinct landmarks. Their city locations help orient the gallery without turning historical monuments into evidence for present-day pronunciation.",
          "localityIds": [
            "xian"
          ],
          "source": {
            "title": "Giant Wild Goose Pagoda — photograph and documentation",
            "url": "https://commons.wikimedia.org/wiki/File:Big_Wild_Goose_Pagoda,_Xian,_China_-_panoramio.jpg"
          },
          "photo": {
            "src": "/images/expansion-mandarin-xian-22.webp",
            "alt": "Giant Wild Goose Pagoda in Xi’an.",
            "caption": "Giant Wild Goose Pagoda — Xi’an.",
            "author": "Николай Максимович",
            "license": "CC BY 3.0",
            "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
            "sourceUrl": "https://commons.wikimedia.org/wiki/File:Big_Wild_Goose_Pagoda,_Xian,_China_-_panoramio.jpg"
          }
        }
      ],
      "resources": [
        {
          "title": "Hang Qiao: The Meaning and Usage of Marker Kai in Xi’an Dialect, 2023",
          "description": "Local speech, study scope and transcription conventions.",
          "localityIds": [
            "xian"
          ],
          "kind": "Study",
          "url": "https://file.ewapub.com/press/media/72bb3333487a4621bda72223ec84a65e.marked.pdf"
        },
        {
          "title": "The Muslim Quarter",
          "description": "The Muslim Quarter — photograph and documentation",
          "localityIds": [
            "xian"
          ],
          "kind": "Culture",
          "url": "https://commons.wikimedia.org/wiki/File:1_xian_muslim_quarter_china_2011.JPG"
        },
        {
          "title": "Pagodas and the city",
          "description": "Giant Wild Goose Pagoda — photograph and documentation",
          "localityIds": [
            "xian"
          ],
          "kind": "Culture",
          "url": "https://commons.wikimedia.org/wiki/File:Big_Wild_Goose_Pagoda,_Xian,_China_-_panoramio.jpg"
        }
      ],
      "photos": [
        {
          "id": "xian-0",
          "src": "/images/expansion-mandarin-xian-0.webp",
          "title": "The Muslim Quarter",
          "category": "Streets",
          "alt": "The Muslim Quarter in Xi’an.",
          "caption": "The Muslim Quarter — Xi’an.",
          "author": "chensiyuan",
          "license": "CC BY-SA 4.0",
          "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
          "sourceUrl": "https://commons.wikimedia.org/wiki/File:1_xian_muslim_quarter_china_2011.JPG",
          "width": 1200,
          "height": 798
        },
        {
          "id": "xian-8",
          "src": "/images/expansion-mandarin-xian-8.webp",
          "title": "The city wall at night",
          "category": "Culture",
          "alt": "The city wall at night in Xi’an.",
          "caption": "The city wall at night — Xi’an.",
          "author": "G41rn8",
          "license": "CC BY-SA 4.0",
          "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
          "sourceUrl": "https://commons.wikimedia.org/wiki/File:City_Wall_of_Xi%27an_at_Night_2007.jpg",
          "width": 1200,
          "height": 703
        },
        {
          "id": "xian-22",
          "src": "/images/expansion-mandarin-xian-22.webp",
          "title": "Giant Wild Goose Pagoda",
          "category": "Culture",
          "alt": "Giant Wild Goose Pagoda in Xi’an.",
          "caption": "Giant Wild Goose Pagoda — Xi’an.",
          "author": "Николай Максимович",
          "license": "CC BY 3.0",
          "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
          "sourceUrl": "https://commons.wikimedia.org/wiki/File:Big_Wild_Goose_Pagoda,_Xian,_China_-_panoramio.jpg",
          "width": 1200,
          "height": 1201
        },
        {
          "id": "xian-28",
          "src": "/images/expansion-mandarin-xian-28.webp",
          "title": "Baoqing Temple pagoda",
          "category": "Culture",
          "alt": "Baoqing Temple pagoda in Xi’an.",
          "caption": "Baoqing Temple pagoda — Xi’an.",
          "author": "xiquinhosilva",
          "license": "CC BY 2.0",
          "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
          "sourceUrl": "https://commons.wikimedia.org/wiki/File:Pagoda_of_the_Baoqing_Temple_51578-Xian_(27891825032).jpg",
          "width": 1200,
          "height": 1812
        },
        {
          "id": "xian-91",
          "src": "/images/expansion-mandarin-xian-91.webp",
          "title": "The Bell Tower",
          "category": "Culture",
          "alt": "The Bell Tower in Xi’an.",
          "caption": "The Bell Tower — Xi’an.",
          "author": "ScareCriterion12",
          "license": "CC BY-SA 4.0",
          "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
          "sourceUrl": "https://commons.wikimedia.org/wiki/File:%E8%A5%BF%E5%AE%89%E9%92%9F%E6%A5%BC2020_(1).jpg",
          "width": 1200,
          "height": 726
        },
        {
          "id": "xian-63",
          "src": "/images/expansion-mandarin-xian-63.webp",
          "title": "A street in the rain",
          "category": "Streets",
          "alt": "A street in the rain in Xi’an.",
          "caption": "A street in the rain — Xi’an.",
          "author": "Ideophagous",
          "license": "CC BY-SA 4.0",
          "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
          "sourceUrl": "https://commons.wikimedia.org/wiki/File:Xi%27an,_China.jpg",
          "width": 1200,
          "height": 900
        },
        {
          "id": "xian-64",
          "src": "/images/expansion-mandarin-xian-64.webp",
          "title": "Shopfronts after dark",
          "category": "Streets",
          "alt": "Shopfronts after dark in Xi’an.",
          "caption": "Shopfronts after dark — Xi’an.",
          "author": "Ideophagous",
          "license": "CC BY-SA 4.0",
          "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
          "sourceUrl": "https://commons.wikimedia.org/wiki/File:Xi%27an,_China_(27965).jpg",
          "width": 1200,
          "height": 900
        },
        {
          "id": "xian-65",
          "src": "/images/expansion-mandarin-xian-65.webp",
          "title": "A narrow shopping street",
          "category": "Streets",
          "alt": "A narrow shopping street in Xi’an.",
          "caption": "A narrow shopping street — Xi’an.",
          "author": "Ideophagous",
          "license": "CC BY-SA 4.0",
          "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
          "sourceUrl": "https://commons.wikimedia.org/wiki/File:Xi%27an,_China_(32633).jpg",
          "width": 1200,
          "height": 900
        },
        {
          "id": "xian-61",
          "src": "/images/expansion-mandarin-xian-61.webp",
          "title": "Spring in Xi’an",
          "category": "Landscape",
          "alt": "Spring in Xi’an in Xi’an.",
          "caption": "Spring in Xi’an — Xi’an.",
          "author": "Ideophagous",
          "license": "CC BY-SA 4.0",
          "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
          "sourceUrl": "https://commons.wikimedia.org/wiki/File:Spring_in_Xi%27an.jpg",
          "width": 1200,
          "height": 1600
        }
      ]
    },
    {
      "point": {
        "id": "lanzhou",
        "name": "Lanzhou",
        "nativeName": "蘭州",
        "coordinates": [
          103.83,
          36.06
        ],
        "groupId": "mandarin",
        "subgroupId": "lanyin",
        "hierarchy": [
          "Sinitic",
          "Mandarin",
          "Lan–Yin Mandarin",
          "Lanzhou"
        ]
      },
      "article": {
        "title": "Lanzhou",
        "dek": "Yellow River speech with striking lip-and-teeth consonants.",
        "sections": [
          {
            "heading": "Local speech",
            "paragraphs": [
              "Lanzhou is a documented Lan–Yin Mandarin reference. Yi and Duanmu compare earlier transcriptions and show how consonants, vowels and syllable structure interact. This is a place where forcing every sound into ordinary pinyin would hide important differences."
            ]
          },
          {
            "heading": "From retroflex to labial",
            "paragraphs": [
              "Yi and Duanmu document Lanzhou [pf] and [pfʰ] in correspondences where Standard Mandarin has a retroflex consonant followed by a rounded element. Their example set includes 珠, 初 and 吹."
            ]
          },
          {
            "heading": "Nasal vowels belong in the transcription",
            "paragraphs": [
              "The same study shows nasalized vowel forms, including 書 [fu], 霜 [fɔ̃] and 軟 [vɐ̃]. These printed examples omit tones. They teach the segments only and must not be treated as complete tonal pronunciations."
            ]
          },
          {
            "heading": "Nanguan barbecue",
            "paragraphs": [
              "The credited photograph identifies a halal barbecue business in Lanzhou’s Nanguan food street. Keep its specific place and subject distinct from generic images of Lanzhou-style food elsewhere."
            ]
          },
          {
            "heading": "A textile workplace",
            "paragraphs": [
              "The archival spinning-workshop photograph records the city’s wool industry around 1960. Its date is retained: this is a historical cultural photograph, while the language reference remains present-day."
            ]
          }
        ],
        "facts": [
          {
            "label": "Group",
            "value": "Mandarin"
          },
          {
            "label": "Branch",
            "value": "Lan–Yin Mandarin"
          },
          {
            "label": "Entry type",
            "value": "Locality reference"
          },
          {
            "label": "Name convention",
            "value": "Conventional city name; not a phonetic transcription"
          },
          {
            "label": "Map anchor",
            "value": "Lanzhou city reference; not a dialect boundary"
          }
        ],
        "sources": [
          {
            "title": "Li Yi and San Duanmu: Phonemes, Features, and Syllables, 2014",
            "url": "https://websites.umich.edu/~duanmu/2014LanzhouRevised.pdf"
          },
          {
            "title": "A halal barbecue stall — photograph and documentation",
            "url": "https://commons.wikimedia.org/wiki/File:%E5%85%B0%E5%B7%9E%E5%8D%97%E5%85%B3%E7%BE%8E%E9%A3%9F%E8%A1%97%E4%B8%80%E5%9B%9E%E6%B0%91%E6%B8%85%E7%9C%9F%E7%83%A7%E7%83%A4%E6%91%8A.jpg"
          },
          {
            "title": "Wool spinning, around 1960 — photograph and documentation",
            "url": "https://commons.wikimedia.org/wiki/File:%E5%85%B0%E5%B7%9E%E7%AC%AC%E4%B8%80%E6%AF%9B%E7%BA%BA%E7%BB%87%E5%8E%82%E7%BA%BA%E7%BA%B1%E8%BD%A6%E9%97%B4%E7%9A%84%E8%B5%B0%E9%94%AD%E6%9C%BA_1960%E5%B9%B4%E5%B7%A6%E5%8F%B3.jpg"
          }
        ],
        "readingMinutes": 2
      },
      "words": [
        {
          "id": "lanzhou-pearl",
          "han": "珠",
          "english": "pearl",
          "ipa": "pfu",
          "toneNotation": "unspecified",
          "localityId": "lanzhou",
          "reading": "Source segment example — tones omitted",
          "registerLabel": "Tones omitted in source",
          "note": "Yi and Duanmu, example (4), pp. 6–7. This is a segmental comparison, not a complete tonal pronunciation.",
          "source": {
            "title": "Li Yi and San Duanmu: Phonemes, Features, and Syllables, 2014",
            "url": "https://websites.umich.edu/~duanmu/2014LanzhouRevised.pdf"
          }
        },
        {
          "id": "lanzhou-paw",
          "han": "爪",
          "english": "paw",
          "ipa": "pfa",
          "toneNotation": "unspecified",
          "localityId": "lanzhou",
          "reading": "Source segment example — tones omitted",
          "registerLabel": "Tones omitted in source",
          "note": "Yi and Duanmu, example (4), pp. 6–7. This is a segmental comparison, not a complete tonal pronunciation.",
          "source": {
            "title": "Li Yi and San Duanmu: Phonemes, Features, and Syllables, 2014",
            "url": "https://websites.umich.edu/~duanmu/2014LanzhouRevised.pdf"
          }
        },
        {
          "id": "lanzhou-desk",
          "han": "桌",
          "english": "desk",
          "ipa": "pfə",
          "toneNotation": "unspecified",
          "localityId": "lanzhou",
          "reading": "Source segment example — tones omitted",
          "registerLabel": "Tones omitted in source",
          "note": "Yi and Duanmu, example (4), pp. 6–7. This is a segmental comparison, not a complete tonal pronunciation.",
          "source": {
            "title": "Li Yi and San Duanmu: Phonemes, Features, and Syllables, 2014",
            "url": "https://websites.umich.edu/~duanmu/2014LanzhouRevised.pdf"
          }
        },
        {
          "id": "lanzhou-chase",
          "han": "追",
          "english": "chase",
          "ipa": "pfei",
          "toneNotation": "unspecified",
          "localityId": "lanzhou",
          "reading": "Source segment example — tones omitted",
          "registerLabel": "Tones omitted in source",
          "note": "Yi and Duanmu, example (4), pp. 6–7. This is a segmental comparison, not a complete tonal pronunciation.",
          "source": {
            "title": "Li Yi and San Duanmu: Phonemes, Features, and Syllables, 2014",
            "url": "https://websites.umich.edu/~duanmu/2014LanzhouRevised.pdf"
          }
        },
        {
          "id": "lanzhou-beginning",
          "han": "初",
          "english": "beginning",
          "ipa": "pfʰu",
          "toneNotation": "unspecified",
          "localityId": "lanzhou",
          "reading": "Source segment example — tones omitted",
          "registerLabel": "Tones omitted in source",
          "note": "Yi and Duanmu, example (4), pp. 6–7. This is a segmental comparison, not a complete tonal pronunciation.",
          "source": {
            "title": "Li Yi and San Duanmu: Phonemes, Features, and Syllables, 2014",
            "url": "https://websites.umich.edu/~duanmu/2014LanzhouRevised.pdf"
          }
        },
        {
          "id": "lanzhou-blow",
          "han": "吹",
          "english": "blow",
          "ipa": "pfʰei",
          "toneNotation": "unspecified",
          "localityId": "lanzhou",
          "reading": "Source segment example — tones omitted",
          "registerLabel": "Tones omitted in source",
          "note": "Yi and Duanmu, example (4), pp. 6–7. This is a segmental comparison, not a complete tonal pronunciation.",
          "source": {
            "title": "Li Yi and San Duanmu: Phonemes, Features, and Syllables, 2014",
            "url": "https://websites.umich.edu/~duanmu/2014LanzhouRevised.pdf"
          }
        },
        {
          "id": "lanzhou-river",
          "han": "川",
          "english": "small river",
          "ipa": "pfʰɐ̃",
          "toneNotation": "unspecified",
          "localityId": "lanzhou",
          "reading": "Source segment example — tones omitted",
          "registerLabel": "Tones omitted in source",
          "note": "Yi and Duanmu, example (4), pp. 6–7. This is a segmental comparison, not a complete tonal pronunciation.",
          "source": {
            "title": "Li Yi and San Duanmu: Phonemes, Features, and Syllables, 2014",
            "url": "https://websites.umich.edu/~duanmu/2014LanzhouRevised.pdf"
          }
        },
        {
          "id": "lanzhou-bed",
          "han": "床",
          "english": "bed",
          "ipa": "pfʰɔ̃",
          "toneNotation": "unspecified",
          "localityId": "lanzhou",
          "reading": "Source segment example — tones omitted",
          "registerLabel": "Tones omitted in source",
          "note": "Yi and Duanmu, example (4), pp. 6–7. This is a segmental comparison, not a complete tonal pronunciation.",
          "source": {
            "title": "Li Yi and San Duanmu: Phonemes, Features, and Syllables, 2014",
            "url": "https://websites.umich.edu/~duanmu/2014LanzhouRevised.pdf"
          }
        },
        {
          "id": "lanzhou-book",
          "han": "書",
          "english": "book",
          "ipa": "fu",
          "toneNotation": "unspecified",
          "localityId": "lanzhou",
          "reading": "Source segment example — tones omitted",
          "registerLabel": "Tones omitted in source",
          "note": "Yi and Duanmu, example (4), pp. 6–7. This is a segmental comparison, not a complete tonal pronunciation.",
          "source": {
            "title": "Li Yi and San Duanmu: Phonemes, Features, and Syllables, 2014",
            "url": "https://websites.umich.edu/~duanmu/2014LanzhouRevised.pdf"
          }
        },
        {
          "id": "lanzhou-brush",
          "han": "刷",
          "english": "brush",
          "ipa": "fa",
          "toneNotation": "unspecified",
          "localityId": "lanzhou",
          "reading": "Source segment example — tones omitted",
          "registerLabel": "Tones omitted in source",
          "note": "Yi and Duanmu, example (4), pp. 6–7. This is a segmental comparison, not a complete tonal pronunciation.",
          "source": {
            "title": "Li Yi and San Duanmu: Phonemes, Features, and Syllables, 2014",
            "url": "https://websites.umich.edu/~duanmu/2014LanzhouRevised.pdf"
          }
        },
        {
          "id": "lanzhou-speak",
          "han": "說",
          "english": "speak",
          "ipa": "fə",
          "toneNotation": "unspecified",
          "localityId": "lanzhou",
          "reading": "Source segment example — tones omitted",
          "registerLabel": "Tones omitted in source",
          "note": "Yi and Duanmu, example (4), pp. 6–7. This is a segmental comparison, not a complete tonal pronunciation.",
          "source": {
            "title": "Li Yi and San Duanmu: Phonemes, Features, and Syllables, 2014",
            "url": "https://websites.umich.edu/~duanmu/2014LanzhouRevised.pdf"
          }
        },
        {
          "id": "lanzhou-sleep",
          "han": "睡",
          "english": "sleep",
          "ipa": "fei",
          "toneNotation": "unspecified",
          "localityId": "lanzhou",
          "reading": "Source segment example — tones omitted",
          "registerLabel": "Tones omitted in source",
          "note": "Yi and Duanmu, example (4), pp. 6–7. This is a segmental comparison, not a complete tonal pronunciation.",
          "source": {
            "title": "Li Yi and San Duanmu: Phonemes, Features, and Syllables, 2014",
            "url": "https://websites.umich.edu/~duanmu/2014LanzhouRevised.pdf"
          }
        },
        {
          "id": "lanzhou-frost",
          "han": "霜",
          "english": "frost",
          "ipa": "fɔ̃",
          "toneNotation": "unspecified",
          "localityId": "lanzhou",
          "reading": "Source segment example — tones omitted",
          "registerLabel": "Tones omitted in source",
          "note": "Yi and Duanmu, example (4), pp. 6–7. This is a segmental comparison, not a complete tonal pronunciation.",
          "source": {
            "title": "Li Yi and San Duanmu: Phonemes, Features, and Syllables, 2014",
            "url": "https://websites.umich.edu/~duanmu/2014LanzhouRevised.pdf"
          }
        },
        {
          "id": "lanzhou-enter",
          "han": "入",
          "english": "enter",
          "ipa": "vu",
          "toneNotation": "unspecified",
          "localityId": "lanzhou",
          "reading": "Source segment example — tones omitted",
          "registerLabel": "Tones omitted in source",
          "note": "Yi and Duanmu, example (4), pp. 6–7. This is a segmental comparison, not a complete tonal pronunciation.",
          "source": {
            "title": "Li Yi and San Duanmu: Phonemes, Features, and Syllables, 2014",
            "url": "https://websites.umich.edu/~duanmu/2014LanzhouRevised.pdf"
          }
        },
        {
          "id": "lanzhou-weak",
          "han": "弱",
          "english": "weak",
          "ipa": "və",
          "toneNotation": "unspecified",
          "localityId": "lanzhou",
          "reading": "Source segment example — tones omitted",
          "registerLabel": "Tones omitted in source",
          "note": "Yi and Duanmu, example (4), pp. 6–7. This is a segmental comparison, not a complete tonal pronunciation.",
          "source": {
            "title": "Li Yi and San Duanmu: Phonemes, Features, and Syllables, 2014",
            "url": "https://websites.umich.edu/~duanmu/2014LanzhouRevised.pdf"
          }
        },
        {
          "id": "lanzhou-soft",
          "han": "軟",
          "english": "soft",
          "ipa": "vɐ̃",
          "toneNotation": "unspecified",
          "localityId": "lanzhou",
          "reading": "Source segment example — tones omitted",
          "registerLabel": "Tones omitted in source",
          "note": "Yi and Duanmu, example (4), pp. 6–7. This is a segmental comparison, not a complete tonal pronunciation.",
          "source": {
            "title": "Li Yi and San Duanmu: Phonemes, Features, and Syllables, 2014",
            "url": "https://websites.umich.edu/~duanmu/2014LanzhouRevised.pdf"
          }
        }
      ],
      "soundNotes": [
        {
          "title": "From retroflex to labial",
          "text": "Yi and Duanmu document Lanzhou [pf] and [pfʰ] in correspondences where Standard Mandarin has a retroflex consonant followed by a rounded element. Their example set includes 珠, 初 and 吹.",
          "localityIds": [
            "lanzhou"
          ],
          "source": {
            "title": "Li Yi and San Duanmu: Phonemes, Features, and Syllables, 2014",
            "url": "https://websites.umich.edu/~duanmu/2014LanzhouRevised.pdf"
          }
        },
        {
          "title": "Nasal vowels belong in the transcription",
          "text": "The same study shows nasalized vowel forms, including 書 [fu], 霜 [fɔ̃] and 軟 [vɐ̃]. These printed examples omit tones. They teach the segments only and must not be treated as complete tonal pronunciations.",
          "localityIds": [
            "lanzhou"
          ],
          "source": {
            "title": "Li Yi and San Duanmu: Phonemes, Features, and Syllables, 2014",
            "url": "https://websites.umich.edu/~duanmu/2014LanzhouRevised.pdf"
          }
        }
      ],
      "culture": [
        {
          "title": "Nanguan barbecue",
          "text": "The credited photograph identifies a halal barbecue business in Lanzhou’s Nanguan food street. Keep its specific place and subject distinct from generic images of Lanzhou-style food elsewhere.",
          "localityIds": [
            "lanzhou"
          ],
          "source": {
            "title": "A halal barbecue stall — photograph and documentation",
            "url": "https://commons.wikimedia.org/wiki/File:%E5%85%B0%E5%B7%9E%E5%8D%97%E5%85%B3%E7%BE%8E%E9%A3%9F%E8%A1%97%E4%B8%80%E5%9B%9E%E6%B0%91%E6%B8%85%E7%9C%9F%E7%83%A7%E7%83%A4%E6%91%8A.jpg"
          },
          "photo": {
            "src": "/images/expansion-mandarin-lanzhou-24.webp",
            "alt": "A halal barbecue stall in Lanzhou.",
            "caption": "A halal barbecue stall — Lanzhou.",
            "author": "Cie tsy-yin",
            "license": "CC BY 4.0",
            "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
            "sourceUrl": "https://commons.wikimedia.org/wiki/File:%E5%85%B0%E5%B7%9E%E5%8D%97%E5%85%B3%E7%BE%8E%E9%A3%9F%E8%A1%97%E4%B8%80%E5%9B%9E%E6%B0%91%E6%B8%85%E7%9C%9F%E7%83%A7%E7%83%A4%E6%91%8A.jpg"
          }
        },
        {
          "title": "A textile workplace",
          "text": "The archival spinning-workshop photograph records the city’s wool industry around 1960. Its date is retained: this is a historical cultural photograph, while the language reference remains present-day.",
          "localityIds": [
            "lanzhou"
          ],
          "source": {
            "title": "Wool spinning, around 1960 — photograph and documentation",
            "url": "https://commons.wikimedia.org/wiki/File:%E5%85%B0%E5%B7%9E%E7%AC%AC%E4%B8%80%E6%AF%9B%E7%BA%BA%E7%BB%87%E5%8E%82%E7%BA%BA%E7%BA%B1%E8%BD%A6%E9%97%B4%E7%9A%84%E8%B5%B0%E9%94%AD%E6%9C%BA_1960%E5%B9%B4%E5%B7%A6%E5%8F%B3.jpg"
          },
          "photo": {
            "src": "/images/expansion-mandarin-lanzhou-33.webp",
            "alt": "Wool spinning, around 1960 in Lanzhou.",
            "caption": "Wool spinning, around 1960 — Lanzhou.",
            "author": "Unknown authorUnknown author",
            "license": "Public domain",
            "licenseUrl": "https://creativecommons.org/publicdomain/mark/1.0/",
            "sourceUrl": "https://commons.wikimedia.org/wiki/File:%E5%85%B0%E5%B7%9E%E7%AC%AC%E4%B8%80%E6%AF%9B%E7%BA%BA%E7%BB%87%E5%8E%82%E7%BA%BA%E7%BA%B1%E8%BD%A6%E9%97%B4%E7%9A%84%E8%B5%B0%E9%94%AD%E6%9C%BA_1960%E5%B9%B4%E5%B7%A6%E5%8F%B3.jpg"
          }
        }
      ],
      "resources": [
        {
          "title": "Li Yi and San Duanmu: Phonemes, Features, and Syllables, 2014",
          "description": "Local speech, study scope and transcription conventions.",
          "localityIds": [
            "lanzhou"
          ],
          "kind": "Study",
          "url": "https://websites.umich.edu/~duanmu/2014LanzhouRevised.pdf"
        },
        {
          "title": "Nanguan barbecue",
          "description": "A halal barbecue stall — photograph and documentation",
          "localityIds": [
            "lanzhou"
          ],
          "kind": "Culture",
          "url": "https://commons.wikimedia.org/wiki/File:%E5%85%B0%E5%B7%9E%E5%8D%97%E5%85%B3%E7%BE%8E%E9%A3%9F%E8%A1%97%E4%B8%80%E5%9B%9E%E6%B0%91%E6%B8%85%E7%9C%9F%E7%83%A7%E7%83%A4%E6%91%8A.jpg"
        },
        {
          "title": "A textile workplace",
          "description": "Wool spinning, around 1960 — photograph and documentation",
          "localityIds": [
            "lanzhou"
          ],
          "kind": "Culture",
          "url": "https://commons.wikimedia.org/wiki/File:%E5%85%B0%E5%B7%9E%E7%AC%AC%E4%B8%80%E6%AF%9B%E7%BA%BA%E7%BB%87%E5%8E%82%E7%BA%BA%E7%BA%B1%E8%BD%A6%E9%97%B4%E7%9A%84%E8%B5%B0%E9%94%AD%E6%9C%BA_1960%E5%B9%B4%E5%B7%A6%E5%8F%B3.jpg"
        }
      ],
      "photos": [
        {
          "id": "lanzhou-20",
          "src": "/images/expansion-mandarin-lanzhou-20.webp",
          "title": "City center from Lanshan",
          "category": "Landscape",
          "alt": "City center from Lanshan in Lanzhou.",
          "caption": "City center from Lanshan — Lanzhou.",
          "author": "Pieceofmetalwork",
          "license": "CC BY-SA 4.0",
          "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
          "sourceUrl": "https://commons.wikimedia.org/wiki/File:Lanzhou_Skyline_201906.jpg",
          "width": 1200,
          "height": 396
        },
        {
          "id": "lanzhou-24",
          "src": "/images/expansion-mandarin-lanzhou-24.webp",
          "title": "A halal barbecue stall",
          "category": "Food",
          "alt": "A halal barbecue stall in Lanzhou.",
          "caption": "A halal barbecue stall — Lanzhou.",
          "author": "Cie tsy-yin",
          "license": "CC BY 4.0",
          "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
          "sourceUrl": "https://commons.wikimedia.org/wiki/File:%E5%85%B0%E5%B7%9E%E5%8D%97%E5%85%B3%E7%BE%8E%E9%A3%9F%E8%A1%97%E4%B8%80%E5%9B%9E%E6%B0%91%E6%B8%85%E7%9C%9F%E7%83%A7%E7%83%A4%E6%91%8A.jpg",
          "width": 1200,
          "height": 1200
        },
        {
          "id": "lanzhou-35",
          "src": "/images/expansion-mandarin-lanzhou-35.webp",
          "title": "Zhongshan Bridge",
          "category": "Streets",
          "alt": "Zhongshan Bridge in Lanzhou.",
          "caption": "Zhongshan Bridge — Lanzhou.",
          "author": "Windmemories",
          "license": "CC BY-SA 4.0",
          "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
          "sourceUrl": "https://commons.wikimedia.org/wiki/File:20080714_Zhongshan_Bridge,_Lanzhou.jpg",
          "width": 1200,
          "height": 800
        },
        {
          "id": "lanzhou-27",
          "src": "/images/expansion-mandarin-lanzhou-27.webp",
          "title": "Ningwozhuang relief sculpture",
          "category": "Culture",
          "alt": "Ningwozhuang relief sculpture in Lanzhou.",
          "caption": "Ningwozhuang relief sculpture — Lanzhou.",
          "author": "Cie tsy-yin",
          "license": "CC BY 4.0",
          "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
          "sourceUrl": "https://commons.wikimedia.org/wiki/File:%E5%85%B0%E5%B7%9E%E5%AE%81%E5%8D%A7%E5%BA%84%E5%AE%BE%E9%A6%86%E6%B5%AE%E9%9B%95.jpg",
          "width": 1200,
          "height": 900
        },
        {
          "id": "lanzhou-34",
          "src": "/images/expansion-mandarin-lanzhou-34.webp",
          "title": "Duzhe publishing house",
          "category": "Culture",
          "alt": "Duzhe publishing house in Lanzhou.",
          "caption": "Duzhe publishing house — Lanzhou.",
          "author": "Cie tsy-yin",
          "license": "CC BY 4.0",
          "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
          "sourceUrl": "https://commons.wikimedia.org/wiki/File:%E8%AF%BB%E8%80%85%E5%87%BA%E7%89%88%E9%9B%86%E5%9B%A2%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8%E5%A4%A7%E6%A5%BC.jpg",
          "width": 1200,
          "height": 1600
        },
        {
          "id": "lanzhou-21",
          "src": "/images/expansion-mandarin-lanzhou-21.webp",
          "title": "A city playground",
          "category": "Streets",
          "alt": "A city playground in Lanzhou.",
          "caption": "A city playground — Lanzhou.",
          "author": "Sigismund von Dobschütz",
          "license": "CC BY-SA 3.0",
          "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
          "sourceUrl": "https://commons.wikimedia.org/wiki/File:Playground_in_Lanzhou,_China.jpg",
          "width": 1200,
          "height": 798
        },
        {
          "id": "lanzhou-26",
          "src": "/images/expansion-mandarin-lanzhou-26.webp",
          "title": "Ningwozhuang auditorium",
          "category": "Culture",
          "alt": "Ningwozhuang auditorium in Lanzhou.",
          "caption": "Ningwozhuang auditorium — Lanzhou.",
          "author": "Cie tsy-yin",
          "license": "CC BY 4.0",
          "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
          "sourceUrl": "https://commons.wikimedia.org/wiki/File:%E5%85%B0%E5%B7%9E%E5%AE%81%E5%8D%A7%E5%BA%84%E5%AE%BE%E9%A6%86%E5%A4%A7%E7%A4%BC%E5%A0%82.jpg",
          "width": 1200,
          "height": 900
        },
        {
          "id": "lanzhou-33",
          "src": "/images/expansion-mandarin-lanzhou-33.webp",
          "title": "Wool spinning, around 1960",
          "category": "Culture",
          "alt": "Wool spinning, around 1960 in Lanzhou.",
          "caption": "Wool spinning, around 1960 — Lanzhou.",
          "author": "Unknown authorUnknown author",
          "license": "Public domain",
          "licenseUrl": "https://creativecommons.org/publicdomain/mark/1.0/",
          "sourceUrl": "https://commons.wikimedia.org/wiki/File:%E5%85%B0%E5%B7%9E%E7%AC%AC%E4%B8%80%E6%AF%9B%E7%BA%BA%E7%BB%87%E5%8E%82%E7%BA%BA%E7%BA%B1%E8%BD%A6%E9%97%B4%E7%9A%84%E8%B5%B0%E9%94%AD%E6%9C%BA_1960%E5%B9%B4%E5%B7%A6%E5%8F%B3.jpg",
          "width": 1200,
          "height": 890
        },
        {
          "id": "lanzhou-2",
          "src": "/images/expansion-mandarin-lanzhou-2.webp",
          "title": "Railway headquarters",
          "category": "Streets",
          "alt": "Railway headquarters in Lanzhou.",
          "caption": "Railway headquarters — Lanzhou.",
          "author": "TheMaxSpell",
          "license": "CC BY-SA 4.0",
          "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
          "sourceUrl": "https://commons.wikimedia.org/wiki/File:CR_Lanzhou_Group_Headquarter.jpg",
          "width": 1200,
          "height": 900
        }
      ]
    },
    {
      "point": {
        "id": "yangzhou",
        "name": "Yangzhou",
        "nativeName": "揚州",
        "coordinates": [
          119.42,
          32.39
        ],
        "groupId": "mandarin",
        "subgroupId": "jianghuai",
        "hierarchy": [
          "Sinitic",
          "Mandarin",
          "Jianghuai Mandarin",
          "Yangzhou"
        ]
      },
      "article": {
        "title": "Yangzhou",
        "dek": "Lower Yangtze speech in a city of gardens and canals.",
        "sections": [
          {
            "heading": "Local speech",
            "paragraphs": [
              "Yangzhou is a Jianghuai Mandarin reference beside Nanjing. Its checked syllables make a useful contrast with northern Mandarin systems. The modern perception study is kept separate from historical written representations of Yangzhou storytelling."
            ]
          },
          {
            "heading": "A short syllable can carry the contrast",
            "paragraphs": [
              "Tang and Li’s Yangzhou perception experiment finds duration crucial for recognizing the checked-tone category. The compared checked and departing tones can share a pitch value while listeners still distinguish them."
            ]
          },
          {
            "heading": "A glottal stop helps, but is not the whole story",
            "paragraphs": [
              "The experiment finds that a glottal closure can improve checked-tone recognition without being necessary in every stimulus. Listen for timing as well as the end of the syllable; a tone diagram alone misses part of the contrast."
            ]
          },
          {
            "heading": "Five Pavilion Bridge",
            "paragraphs": [
              "The bridge photograph and the gallery’s separate garden views show the city’s waterside and built settings. Geyuan and He Garden are named individually rather than being combined as one garden."
            ]
          },
          {
            "heading": "An everyday lunch",
            "paragraphs": [
              "The factory-canteen photograph documents a meal in a working environment. It brings ordinary food into the gallery alongside shrines, gardens and the railway station."
            ]
          }
        ],
        "facts": [
          {
            "label": "Group",
            "value": "Mandarin"
          },
          {
            "label": "Branch",
            "value": "Jianghuai Mandarin"
          },
          {
            "label": "Entry type",
            "value": "Locality reference"
          },
          {
            "label": "Name convention",
            "value": "Conventional city name; not a phonetic transcription"
          },
          {
            "label": "Map anchor",
            "value": "Yangzhou city reference; not a dialect boundary"
          }
        ],
        "sources": [
          {
            "title": "Tang and Li: Perception of checked syllables in Yangzhou, 2018",
            "url": "https://www.researchgate.net/publication/360317444_yangzhoufangyanrushengqubiexingtezhengdeganzhiyanjiu"
          },
          {
            "title": "Five Pavilion Bridge — photograph and documentation",
            "url": "https://commons.wikimedia.org/wiki/File:The_Five_Pavilion_bridge.jpg"
          },
          {
            "title": "Lunch in a factory canteen — photograph and documentation",
            "url": "https://commons.wikimedia.org/wiki/File:Yangzhou_-_Yangnong_Chemical,_canteen_lunch,_pic01.jpg"
          }
        ],
        "readingMinutes": 2
      },
      "words": [],
      "soundNotes": [
        {
          "title": "A short syllable can carry the contrast",
          "text": "Tang and Li’s Yangzhou perception experiment finds duration crucial for recognizing the checked-tone category. The compared checked and departing tones can share a pitch value while listeners still distinguish them.",
          "localityIds": [
            "yangzhou"
          ],
          "source": {
            "title": "Tang and Li: Perception of checked syllables in Yangzhou, 2018",
            "url": "https://www.researchgate.net/publication/360317444_yangzhoufangyanrushengqubiexingtezhengdeganzhiyanjiu"
          }
        },
        {
          "title": "A glottal stop helps, but is not the whole story",
          "text": "The experiment finds that a glottal closure can improve checked-tone recognition without being necessary in every stimulus. Listen for timing as well as the end of the syllable; a tone diagram alone misses part of the contrast.",
          "localityIds": [
            "yangzhou"
          ],
          "source": {
            "title": "Tang and Li: Perception of checked syllables in Yangzhou, 2018",
            "url": "https://www.researchgate.net/publication/360317444_yangzhoufangyanrushengqubiexingtezhengdeganzhiyanjiu"
          }
        }
      ],
      "culture": [
        {
          "title": "Five Pavilion Bridge",
          "text": "The bridge photograph and the gallery’s separate garden views show the city’s waterside and built settings. Geyuan and He Garden are named individually rather than being combined as one garden.",
          "localityIds": [
            "yangzhou"
          ],
          "source": {
            "title": "Five Pavilion Bridge — photograph and documentation",
            "url": "https://commons.wikimedia.org/wiki/File:The_Five_Pavilion_bridge.jpg"
          },
          "photo": {
            "src": "/images/expansion-mandarin-yangzhou-7.webp",
            "alt": "Five Pavilion Bridge in Yangzhou.",
            "caption": "Five Pavilion Bridge — Yangzhou.",
            "author": "Gisling",
            "license": "CC BY-SA 4.0",
            "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
            "sourceUrl": "https://commons.wikimedia.org/wiki/File:The_Five_Pavilion_bridge.jpg"
          }
        },
        {
          "title": "An everyday lunch",
          "text": "The factory-canteen photograph documents a meal in a working environment. It brings ordinary food into the gallery alongside shrines, gardens and the railway station.",
          "localityIds": [
            "yangzhou"
          ],
          "source": {
            "title": "Lunch in a factory canteen — photograph and documentation",
            "url": "https://commons.wikimedia.org/wiki/File:Yangzhou_-_Yangnong_Chemical,_canteen_lunch,_pic01.jpg"
          },
          "photo": {
            "src": "/images/expansion-mandarin-yangzhou-18.webp",
            "alt": "Lunch in a factory canteen in Yangzhou.",
            "caption": "Lunch in a factory canteen — Yangzhou.",
            "author": "RomanM82",
            "license": "CC BY-SA 4.0",
            "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
            "sourceUrl": "https://commons.wikimedia.org/wiki/File:Yangzhou_-_Yangnong_Chemical,_canteen_lunch,_pic01.jpg"
          }
        }
      ],
      "resources": [
        {
          "title": "Tang and Li: Perception of checked syllables in Yangzhou, 2018",
          "description": "Local speech, study scope and transcription conventions.",
          "localityIds": [
            "yangzhou"
          ],
          "kind": "Study",
          "url": "https://www.researchgate.net/publication/360317444_yangzhoufangyanrushengqubiexingtezhengdeganzhiyanjiu"
        },
        {
          "title": "Five Pavilion Bridge",
          "description": "Five Pavilion Bridge — photograph and documentation",
          "localityIds": [
            "yangzhou"
          ],
          "kind": "Culture",
          "url": "https://commons.wikimedia.org/wiki/File:The_Five_Pavilion_bridge.jpg"
        },
        {
          "title": "An everyday lunch",
          "description": "Lunch in a factory canteen — photograph and documentation",
          "localityIds": [
            "yangzhou"
          ],
          "kind": "Culture",
          "url": "https://commons.wikimedia.org/wiki/File:Yangzhou_-_Yangnong_Chemical,_canteen_lunch,_pic01.jpg"
        }
      ],
      "photos": [
        {
          "id": "yangzhou-7",
          "src": "/images/expansion-mandarin-yangzhou-7.webp",
          "title": "Five Pavilion Bridge",
          "category": "Culture",
          "alt": "Five Pavilion Bridge in Yangzhou.",
          "caption": "Five Pavilion Bridge — Yangzhou.",
          "author": "Gisling",
          "license": "CC BY-SA 4.0",
          "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
          "sourceUrl": "https://commons.wikimedia.org/wiki/File:The_Five_Pavilion_bridge.jpg",
          "width": 1200,
          "height": 900
        },
        {
          "id": "yangzhou-2",
          "src": "/images/expansion-mandarin-yangzhou-2.webp",
          "title": "A shrine at Daming Temple",
          "category": "Culture",
          "alt": "A shrine at Daming Temple in Yangzhou.",
          "caption": "A shrine at Daming Temple — Yangzhou.",
          "author": "Nyarlathotep1001",
          "license": "CC BY-SA 4.0",
          "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
          "sourceUrl": "https://commons.wikimedia.org/wiki/File:Chinese_shrine_to_a_statue_of_the_Child-giving_Guanyin_(%E9%80%81%E5%AD%90%E8%A7%80%E9%9F%B3_Songzi_Guanyin)_in_Daming_Temple_(_%E5%A4%A7%E6%98%8E%E5%AF%BA_D%C3%A0m%C3%ADng-s%C3%AC)_in_Yangzhou,_Jiangsu,_China.jpg",
          "width": 1200,
          "height": 1600
        },
        {
          "id": "yangzhou-14",
          "src": "/images/expansion-mandarin-yangzhou-14.webp",
          "title": "Hehuachi after dark",
          "category": "Landscape",
          "alt": "Hehuachi after dark in Yangzhou.",
          "caption": "Hehuachi after dark — Yangzhou.",
          "author": "User:Vmenkov",
          "license": "CC BY-SA 3.0",
          "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
          "sourceUrl": "https://commons.wikimedia.org/wiki/File:Yangzhou_-_Hehuachi_at_night_-_P1070275.jpg",
          "width": 1200,
          "height": 900
        },
        {
          "id": "yangzhou-18",
          "src": "/images/expansion-mandarin-yangzhou-18.webp",
          "title": "Lunch in a factory canteen",
          "category": "Food",
          "alt": "Lunch in a factory canteen in Yangzhou.",
          "caption": "Lunch in a factory canteen — Yangzhou.",
          "author": "RomanM82",
          "license": "CC BY-SA 4.0",
          "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
          "sourceUrl": "https://commons.wikimedia.org/wiki/File:Yangzhou_-_Yangnong_Chemical,_canteen_lunch,_pic01.jpg",
          "width": 1200,
          "height": 902
        },
        {
          "id": "yangzhou-42",
          "src": "/images/expansion-mandarin-yangzhou-42.webp",
          "title": "He Garden",
          "category": "Culture",
          "alt": "He Garden in Yangzhou.",
          "caption": "He Garden — Yangzhou.",
          "author": "Gisling",
          "license": "CC BY 3.0",
          "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
          "sourceUrl": "https://commons.wikimedia.org/wiki/File:He_Garden.jpg",
          "width": 1200,
          "height": 900
        },
        {
          "id": "yangzhou-63",
          "src": "/images/expansion-mandarin-yangzhou-63.webp",
          "title": "Puhaddin Garden",
          "category": "Culture",
          "alt": "Puhaddin Garden in Yangzhou.",
          "caption": "Puhaddin Garden — Yangzhou.",
          "author": "User:Vmenkov",
          "license": "CC BY-SA 3.0",
          "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
          "sourceUrl": "https://commons.wikimedia.org/wiki/File:Yangzhou_Mosque_-_Puhaddin_Garden_-_CIMG3295.JPG",
          "width": 1200,
          "height": 900
        },
        {
          "id": "yangzhou-64",
          "src": "/images/expansion-mandarin-yangzhou-64.webp",
          "title": "Geyuan corridor",
          "category": "Culture",
          "alt": "Geyuan corridor in Yangzhou.",
          "caption": "Geyuan corridor — Yangzhou.",
          "author": "rheins",
          "license": "CC BY 3.0",
          "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
          "sourceUrl": "https://commons.wikimedia.org/wiki/File:%E4%B8%AA%E5%9B%AD%E8%B5%B0%E5%BB%8A_-_Corridor_of_Geyuan_Garden_-_2010.04_-_panoramio.jpg",
          "width": 1200,
          "height": 1600
        },
        {
          "id": "yangzhou-60",
          "src": "/images/expansion-mandarin-yangzhou-60.webp",
          "title": "A park on Tangdong Road",
          "category": "Landscape",
          "alt": "A park on Tangdong Road in Yangzhou.",
          "caption": "A park on Tangdong Road — Yangzhou.",
          "author": "User:Vmenkov",
          "license": "CC BY-SA 3.0",
          "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
          "sourceUrl": "https://commons.wikimedia.org/wiki/File:Yangzhou_-_Tangdong_Road_-_park_-_P1120907.JPG",
          "width": 1200,
          "height": 900
        },
        {
          "id": "yangzhou-0",
          "src": "/images/expansion-mandarin-yangzhou-0.webp",
          "title": "Yangzhou railway station",
          "category": "Streets",
          "alt": "Yangzhou railway station in Yangzhou.",
          "caption": "Yangzhou railway station — Yangzhou.",
          "author": "SCJiang",
          "license": "CC BY-SA 4.0",
          "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
          "sourceUrl": "https://commons.wikimedia.org/wiki/File:201904_Yangzhou_Railway_Station.jpg",
          "width": 1200,
          "height": 800
        }
      ]
    },
    {
      "point": {
        "id": "chongqing",
        "name": "Chongqing",
        "nativeName": "重慶",
        "coordinates": [
          106.55,
          29.56
        ],
        "groupId": "mandarin",
        "subgroupId": "southwestern",
        "hierarchy": [
          "Sinitic",
          "Mandarin",
          "Southwestern Mandarin",
          "Chongqing"
        ]
      },
      "article": {
        "title": "Chongqing",
        "dek": "Southwestern speech among river crossings, markets and hillside streets.",
        "sections": [
          {
            "heading": "Local speech",
            "paragraphs": [
              "Chongqing is a Southwestern Mandarin city reference, separate from Chengdu. The map anchors the urban center. The wider municipality includes many places and local varieties, so its administrative boundary is not used as a dialect boundary."
            ]
          },
          {
            "heading": "Prominence can lean left",
            "paragraphs": [
              "A 2024 acoustic study treats Chongqing as left-dominant in its two-syllable materials, contrasting it with right-dominant Kunming and Amoy. The comparison involves timing, intensity and pitch rather than an impression that one accent sounds “stronger”."
            ]
          },
          {
            "heading": "A city-specific speaker sample",
            "paragraphs": [
              "The study recruited eight Chongqing speakers raised locally and using the dialect in daily life. Its result describes that sample and task; it should not be generalized to every county in Chongqing municipality."
            ]
          },
          {
            "heading": "Xiaomian at the table",
            "paragraphs": [
              "The photograph documents a bowl of Chongqing xiaomian with fried eggs. It is a specific preparation, not a claim that every bowl or every household uses the same ingredients."
            ]
          },
          {
            "heading": "Jiefangbei in 1988",
            "paragraphs": [
              "The dated square and street photographs retain an earlier view of the city. Compare them with the modern bridge and riverside scene; the gallery’s historical dates do not redefine the scope of its speech samples."
            ]
          }
        ],
        "facts": [
          {
            "label": "Group",
            "value": "Mandarin"
          },
          {
            "label": "Branch",
            "value": "Southwestern Mandarin"
          },
          {
            "label": "Entry type",
            "value": "Locality reference"
          },
          {
            "label": "Name convention",
            "value": "Conventional city name; not a phonetic transcription"
          },
          {
            "label": "Map anchor",
            "value": "Chongqing city reference; not a dialect boundary"
          }
        ],
        "sources": [
          {
            "title": "Hu et al.: Acoustic realization of metrical prominence, 2024",
            "url": "https://www.isca-archive.org/interspeech_2024/hu24_interspeech.pdf"
          },
          {
            "title": "Xiaomian with fried eggs — photograph and documentation",
            "url": "https://commons.wikimedia.org/wiki/File:Chongqing_Xiaomian_with_fried_eggs.jpg"
          },
          {
            "title": "Jiefangbei Square, 1988 — photograph and documentation",
            "url": "https://commons.wikimedia.org/wiki/File:Jiefangbei_square_in_Chongqing_in_1988.jpg"
          }
        ],
        "readingMinutes": 2
      },
      "words": [],
      "soundNotes": [
        {
          "title": "Prominence can lean left",
          "text": "A 2024 acoustic study treats Chongqing as left-dominant in its two-syllable materials, contrasting it with right-dominant Kunming and Amoy. The comparison involves timing, intensity and pitch rather than an impression that one accent sounds “stronger”.",
          "localityIds": [
            "chongqing"
          ],
          "source": {
            "title": "Hu et al.: Acoustic realization of metrical prominence, 2024",
            "url": "https://www.isca-archive.org/interspeech_2024/hu24_interspeech.pdf"
          }
        },
        {
          "title": "A city-specific speaker sample",
          "text": "The study recruited eight Chongqing speakers raised locally and using the dialect in daily life. Its result describes that sample and task; it should not be generalized to every county in Chongqing municipality.",
          "localityIds": [
            "chongqing"
          ],
          "source": {
            "title": "Hu et al.: Acoustic realization of metrical prominence, 2024",
            "url": "https://www.isca-archive.org/interspeech_2024/hu24_interspeech.pdf"
          }
        }
      ],
      "culture": [
        {
          "title": "Xiaomian at the table",
          "text": "The photograph documents a bowl of Chongqing xiaomian with fried eggs. It is a specific preparation, not a claim that every bowl or every household uses the same ingredients.",
          "localityIds": [
            "chongqing"
          ],
          "source": {
            "title": "Xiaomian with fried eggs — photograph and documentation",
            "url": "https://commons.wikimedia.org/wiki/File:Chongqing_Xiaomian_with_fried_eggs.jpg"
          },
          "photo": {
            "src": "/images/expansion-mandarin-chongqing-11.webp",
            "alt": "Xiaomian with fried eggs in Chongqing.",
            "caption": "Xiaomian with fried eggs — Chongqing.",
            "author": "王桁霽",
            "license": "CC BY-SA 4.0",
            "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
            "sourceUrl": "https://commons.wikimedia.org/wiki/File:Chongqing_Xiaomian_with_fried_eggs.jpg"
          }
        },
        {
          "title": "Jiefangbei in 1988",
          "text": "The dated square and street photographs retain an earlier view of the city. Compare them with the modern bridge and riverside scene; the gallery’s historical dates do not redefine the scope of its speech samples.",
          "localityIds": [
            "chongqing"
          ],
          "source": {
            "title": "Jiefangbei Square, 1988 — photograph and documentation",
            "url": "https://commons.wikimedia.org/wiki/File:Jiefangbei_square_in_Chongqing_in_1988.jpg"
          },
          "photo": {
            "src": "/images/expansion-mandarin-chongqing-20.webp",
            "alt": "Jiefangbei Square, 1988 in Chongqing.",
            "caption": "Jiefangbei Square, 1988 — Chongqing.",
            "author": "Jan Kranendonk (https://www.jankranendonk.nl)",
            "license": "CC0",
            "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/deed.en",
            "sourceUrl": "https://commons.wikimedia.org/wiki/File:Jiefangbei_square_in_Chongqing_in_1988.jpg"
          }
        }
      ],
      "resources": [
        {
          "title": "Hu et al.: Acoustic realization of metrical prominence, 2024",
          "description": "Local speech, study scope and transcription conventions.",
          "localityIds": [
            "chongqing"
          ],
          "kind": "Study",
          "url": "https://www.isca-archive.org/interspeech_2024/hu24_interspeech.pdf"
        },
        {
          "title": "Xiaomian at the table",
          "description": "Xiaomian with fried eggs — photograph and documentation",
          "localityIds": [
            "chongqing"
          ],
          "kind": "Culture",
          "url": "https://commons.wikimedia.org/wiki/File:Chongqing_Xiaomian_with_fried_eggs.jpg"
        },
        {
          "title": "Jiefangbei in 1988",
          "description": "Jiefangbei Square, 1988 — photograph and documentation",
          "localityIds": [
            "chongqing"
          ],
          "kind": "Culture",
          "url": "https://commons.wikimedia.org/wiki/File:Jiefangbei_square_in_Chongqing_in_1988.jpg"
        }
      ],
      "photos": [
        {
          "id": "chongqing-7",
          "src": "/images/expansion-mandarin-chongqing-7.webp",
          "title": "Fish market",
          "category": "Food",
          "alt": "Fish market in Chongqing.",
          "caption": "Fish market — Chongqing.",
          "author": "Jan Kranendonk (https://www.jankranendonk.nl)",
          "license": "CC0",
          "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/deed.en",
          "sourceUrl": "https://commons.wikimedia.org/wiki/File:Chongqing_Fish_market.jpg",
          "width": 1200,
          "height": 801
        },
        {
          "id": "chongqing-8",
          "src": "/images/expansion-mandarin-chongqing-8.webp",
          "title": "Night above the rivers",
          "category": "Landscape",
          "alt": "Night above the rivers in Chongqing.",
          "caption": "Night above the rivers — Chongqing.",
          "author": "Jay Huang",
          "license": "CC BY 2.0",
          "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
          "sourceUrl": "https://commons.wikimedia.org/wiki/File:Chongqing_Nightscape.jpg",
          "width": 1200,
          "height": 775
        },
        {
          "id": "chongqing-11",
          "src": "/images/expansion-mandarin-chongqing-11.webp",
          "title": "Xiaomian with fried eggs",
          "category": "Food",
          "alt": "Xiaomian with fried eggs in Chongqing.",
          "caption": "Xiaomian with fried eggs — Chongqing.",
          "author": "王桁霽",
          "license": "CC BY-SA 4.0",
          "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
          "sourceUrl": "https://commons.wikimedia.org/wiki/File:Chongqing_Xiaomian_with_fried_eggs.jpg",
          "width": 1200,
          "height": 800
        },
        {
          "id": "chongqing-15",
          "src": "/images/expansion-mandarin-chongqing-15.webp",
          "title": "Dongshuimen Bridge",
          "category": "Streets",
          "alt": "Dongshuimen Bridge in Chongqing.",
          "caption": "Dongshuimen Bridge — Chongqing.",
          "author": "Marym1718",
          "license": "CC BY-SA 4.0",
          "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
          "sourceUrl": "https://commons.wikimedia.org/wiki/File:Dongshuimen_Bridge_Chongqing.jpg",
          "width": 1200,
          "height": 900
        },
        {
          "id": "chongqing-20",
          "src": "/images/expansion-mandarin-chongqing-20.webp",
          "title": "Jiefangbei Square, 1988",
          "category": "Streets",
          "alt": "Jiefangbei Square, 1988 in Chongqing.",
          "caption": "Jiefangbei Square, 1988 — Chongqing.",
          "author": "Jan Kranendonk (https://www.jankranendonk.nl)",
          "license": "CC0",
          "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/deed.en",
          "sourceUrl": "https://commons.wikimedia.org/wiki/File:Jiefangbei_square_in_Chongqing_in_1988.jpg",
          "width": 1200,
          "height": 829
        },
        {
          "id": "chongqing-22",
          "src": "/images/expansion-mandarin-chongqing-22.webp",
          "title": "A city street, 1988",
          "category": "Streets",
          "alt": "A city street, 1988 in Chongqing.",
          "caption": "A city street, 1988 — Chongqing.",
          "author": "Jan Kranendonk (https://www.jankranendonk.nl)",
          "license": "CC0",
          "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/deed.en",
          "sourceUrl": "https://commons.wikimedia.org/wiki/File:Street_in_Chongqing_in_1988.jpg",
          "width": 1200,
          "height": 801
        },
        {
          "id": "chongqing-30",
          "src": "/images/expansion-mandarin-chongqing-30.webp",
          "title": "A church in Jiangbei",
          "category": "Culture",
          "alt": "A church in Jiangbei in Chongqing.",
          "caption": "A church in Jiangbei — Chongqing.",
          "author": "夏枫水月",
          "license": "CC BY-SA 4.0",
          "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
          "sourceUrl": "https://commons.wikimedia.org/wiki/File:%E9%87%8D%E5%BA%86%E5%B8%82%E6%B1%9F%E5%8C%97%E5%8C%BA%E5%9F%BA%E7%9D%A3%E6%95%99%E5%A0%82-%E7%A6%8F%E9%9F%B3%E5%A0%82.jpg",
          "width": 1200,
          "height": 1598
        },
        {
          "id": "chongqing-31",
          "src": "/images/expansion-mandarin-chongqing-31.webp",
          "title": "Saint Teresa’s Church",
          "category": "Culture",
          "alt": "Saint Teresa’s Church in Chongqing.",
          "caption": "Saint Teresa’s Church — Chongqing.",
          "author": "夏枫水月",
          "license": "CC BY-SA 4.0",
          "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
          "sourceUrl": "https://commons.wikimedia.org/wiki/File:%E9%87%8D%E5%BA%86%E5%B8%82%E6%B1%9F%E5%8C%97%E5%8C%BA%E5%A4%A9%E4%B8%BB%E6%95%99%E5%A0%82-%E5%BE%B7%E8%82%8B%E6%92%92%E6%95%99%E5%A0%82%EF%BC%88%E8%BF%91%E6%99%AF%EF%BC%89.jpg",
          "width": 1200,
          "height": 901
        },
        {
          "id": "chongqing-33",
          "src": "/images/expansion-mandarin-chongqing-33.webp",
          "title": "Taxis beside the Yangtze",
          "category": "Streets",
          "alt": "Taxis beside the Yangtze in Chongqing.",
          "caption": "Taxis beside the Yangtze — Chongqing.",
          "author": "Sandykkzk",
          "license": "CC BY-SA 4.0",
          "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
          "sourceUrl": "https://commons.wikimedia.org/wiki/File:%E9%95%BF%E6%B1%9F%E5%92%8C%E9%87%8D%E5%BA%86%E5%87%BA%E7%A7%9F%E8%BD%A6.jpg",
          "width": 1200,
          "height": 800
        }
      ]
    }
  ]
};
