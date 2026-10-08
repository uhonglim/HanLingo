import { minSources } from "./min-sources";
import { chaoshanArticles } from "./chaoshan";
import type { LanguageId } from "./languages";

export type ArticleSection = { heading: string; paragraphs: string[] };
export type ReferenceSource = { title: string; url: string };
export type EncyclopediaEntry = {
  title: string;
  dek: string;
  sections: ArticleSection[];
  facts: { label: string; value: string }[];
  sources: ReferenceSource[];
  readingMinutes: number;
};

const source = (title: string, url: string): ReferenceSource => ({
  title,
  url,
});
const section = (heading: string, ...paragraphs: string[]): ArticleSection => ({
  heading,
  paragraphs,
});
function article(
  title: string,
  dek: string,
  sections: ArticleSection[],
  facts: [string, string][],
  sources: ReferenceSource[],
): EncyclopediaEntry {
  const words = [dek, ...sections.flatMap((item) => item.paragraphs)]
    .join(" ")
    .split(/\s+/).length;
  return {
    title,
    dek,
    sections,
    facts: facts.map(([label, value]) => ({ label, value })),
    sources,
    readingMinutes: Math.max(1, Math.ceil(words / 190)),
  };
}

const S = {
  classification: source(
    "Glottolog: Sino-Tibetan classification",
    "https://glottolog.org/resource/languoid/id/sino1245",
  ),
  overview: source(
    "Matthew Y. Chen: Tone Sandhi, opening chapter",
    "https://assets.cambridge.org/97805216/52728/sample/9780521652728ws.pdf",
  ),
  standard: source(
    "Yen-Hwei Lin: The Sounds of Chinese",
    "https://assets.cambridge.org/97805216/03980/frontmatter/9780521603980_frontmatter.htm",
  ),
  mandarinStops: source(
    "ICPhS: Standard Chinese stop consonants",
    "https://www.icphs2007.de/conference/Papers/1049/1049.pdf",
  ),
  mandarinCoda: source(
    "Gestural overlap across word boundaries: English and Mandarin",
    "https://www.cambridge.org/core/journals/canadian-journal-of-linguistics-revue-canadienne-de-linguistique/article/gestural-overlap-across-word-boundaries-evidence-from-english-and-mandarin-speakers/CDB50E6F641544A33E9C5407B68CB897",
  ),
  mandarinSandhi: source(
    "Zhang and Lai: Testing phonetic knowledge in Mandarin tone sandhi",
    "https://www.cambridge.org/core/journals/phonology/article/abs/testing-the-role-of-phonetic-knowledge-in-mandarin-tone-sandhi/515A9CC405AFDF8EBC9AAE1EA8444CD7",
  ),
  jinan: source(
    "Huang: Position-sensitive sandhi in Jinan",
    "https://www.ub.edu/ocp12/wp-content/uploads/2014/11/OCP12_Main_poster_HUANG.pdf",
  ),
  nanjing: source(
    "Experimental research on Nanjing tone sandhi, LOT dissertation",
    "https://www.lotpublications.nl/Documents/527_fulltext.pdf",
  ),
  nanjingHistory: source(
    "Zeng: The nature of Nanjing Mandarin in the Ming dynasty",
    "https://academic.oup.com/hong-kong-scholarship-online/book/45092/chapter-abstract/386491069",
  ),
  southwest: source(
    "Rao and Shaw: Zhongjiang Chinese",
    "https://doi.org/10.1017/S0025100324000203",
  ),
  chengdu: source(
    "Hu and Zhang: Vowel raising in Chengdu Mandarin",
    "https://arxiv.org/abs/1803.03887",
  ),
  written: source(
    "Ping Chen: Modern Chinese, Dialect writing",
    "https://www.cambridge.org/core/books/abs/modern-chinese/dialect-writing/F9D387397BA417BD49B98FD63B540F67",
  ),
  minGuide: minSources[1],
  minIntro: minSources[0],
  minCodas: minSources[2],
  minNorth: source(
    "Wu: Proto-Min rhyme reconstruction and strata",
    "https://www.ling.sinica.edu.tw/upload/researcher_manager_result/c37535b570fa1f44797850580f9ef3ba.pdf",
  ),
  minPuxian: source(
    "Academia Sinica: Relationships of Yongchun, Fuqing, Putian, and Xianyou",
    "https://www.ling.sinica.edu.tw/upload/researcher_manager_result/17e7b4c054664b1e85670eb38147af5b.pdf",
  ),
  jianou: source(
    "National Tsing Hua University: Competing rhyme systems in Jian’ou",
    "https://thjcs.site.nthu.edu.tw/p/406-1452-41564%2Cr2998.php?Lang=zh-tw",
  ),
  xiamen: source(
    "The syntax of Xiamen tone sandhi",
    "https://www.cambridge.org/core/journals/phonology/article/syntax-of-xiamen-tone-sandhi/F5EE066B0215ED48A28C2476BA4DFC9C",
  ),
  zhangzhou: source(
    "Huang: Suffixation in Zhangzhou",
    "https://www.degruyterbrill.com/document/doi/10.1515/opli-2024-0004/pdf",
  ),
  taiwanNames: source(
    "Taiwan Ministry of Education: Taiwanese Taigi language proficiency testing",
    "https://english.moe.gov.tw/fp-117-40171-b21aa-1.html",
  ),
  taiwanVariation: source(
    "Taiwan Ministry of Education: Taigi varieties, readings, and learning resources",
    "https://mhi.moe.edu.tw/faq/index.html?lang=/003/&page=2&reloaded=",
  ),
  taiwanDictionary: source(
    "Ministry of Education Taigi dictionary: 相 and its regional readings",
    "https://sutian.moe.edu.tw/zh-hant/su/15319/",
  ),
  taiwanDictionaryGuide: source(
    "Ministry of Education Taigi dictionary: editorial aims and principles",
    "https://sutian.moe.edu.tw/zh-hant/piantsip/piantsip-bokphiau/",
  ),
  tainanName: source(
    "MOE Taigi dictionary: 臺南, Tâi-lâm",
    "https://sutian.moe.edu.tw/zh-hant/su/20696/",
  ),
  kaohsiungNames: source(
    "MOE Taigi dictionary: Kaohsiung Red Line place names",
    "https://sutian.moe.edu.tw/zh-hant/huliok/155/",
  ),
  yilanName: source(
    "MOE Taigi dictionary: 宜蘭 place-name entries",
    "https://sutian.moe.edu.tw/zh-hant/tshiau/?lui=tai_su&tsha=%E5%AE%9C%E8%98%AD",
  ),
  lukangName: source(
    "MOE Taigi dictionary: 鹿港鎮, Lo̍k-káng-tìn",
    "https://sutian.moe.edu.tw/zh-hant/siannuntiau/tiau/8/_/lok8/%E9%B9%BF/",
  ),
  sanxiaName: source(
    "MOE Taigi dictionary: New Taipei locality names, including 三峽區",
    "https://sutian.moe.edu.tw/zh-hant/huliok/124/?iahbe=1&pitsoo=50",
  ),
  taiwanBox: source(
    "MOE Taigi dictionary: 箱 and its locality readings",
    "https://sutian.moe.edu.tw/und-hani/su/11250/",
  ),
  taiwanRice: source(
    "MOE Taigi dictionary: 飯, cooked rice, and locality comparisons",
    "https://sutian.moe.edu.tw/zh-hant/su/9222/",
  ),
  taiwanLunchbox: source(
    "MOE Taigi dictionary: 飯包 and local words for a lunchbox",
    "https://sutian.moe.edu.tw/zh-hant/su/9233/",
  ),
  taiwanShu: source(
    "MOE Taigi dictionary: 殊 and its locality readings",
    "https://sutian.moe.edu.tw/zh-hant/su/15515/",
  ),
  singaporeName: source(
    "Taipei Municipal Song Shan High School of Agriculture and Industry: Taigi word list including 新加坡",
    "https://www.saihs.edu.tw/uploads/1678269782302fhjagTST.pdf",
  ),
  georgeTownName: source(
    "Timothy Tye: Place Names in Penang Hokkien, using Taiji Romanisation",
    "https://www.penang-traveltips.com/hokkien/place-names.htm",
  ),
  singaporeHokkien: source(
    "Luo Futeng, Singapore Chinese Cultural Centre: The Hokkien dialect in Singapore",
    "https://culturepaedia.singaporeccc.org.sg/language-education/the-hokkien-dialect-in-singapore/",
  ),
  singaporeCommunity: source(
    "National Library Board: Hokkien community",
    "https://www.nlb.gov.sg/main/article-detail?cmsuuid=4fd3409a-79c9-4b3e-85e4-e321f764f91f",
  ),
  singaporeCourse: source(
    "Singapore Hokkien Huay Kuan Cultural Academy: Basic Conversational Hokkien",
    "https://www.shhkca.com.sg/basic-conversational-hokkien-course",
  ),
  singaporeOralHistory: source(
    "National Archives of Singapore: Koh Teong Koo, Hokkien oral history",
    "https://www.nas.gov.sg/archivesonline/oral_history_interviews/record-details/3a2f5cae-1160-11e3-83d5-0050568939ad",
  ),
  penangFieldwork: source(
    "Ông Kuì-lân: On the Penang Hokkien Phonetic System and Vocabulary",
    "https://taiwan.ntue.edu.tw/var/file/29/1029/img/692/476201647.pdf",
  ),
  penangDictionary: source(
    "Penang Hokkien Dictionary: community dictionary using Taiji Romanisation",
    "https://www.penang-traveltips.com/dictionary/index.htm",
  ),
  penangPhrasebook: source(
    "Areca Books: Speak Hokkien! Penang Hokkien Dictionary & Phrasebook",
    "https://arecabooks.com/product/speak-hokkien/",
  ),
  georgeTownStreets: source(
    "Penang Global Tourism: Marking George Town",
    "https://mypenang.gov.my/uploads/downloads/SFA_Marking-George-Town_V04Jul24-EN.pdf",
  ),
  fuzhou: source(
    "Chan: Prelinked and floating glottal stops in Fuzhou",
    "https://www.cambridge.org/core/journals/canadian-journal-of-linguistics-revue-canadienne-de-linguistique/article/abs/prelinked-and-floating-glottal-stops-in-fuzhou-chinese/605C456A41C97F230971D6119F5FB483",
  ),
  fuzhouSyntax: source(
    "Chen: Prosody and morphosyntax in Fuzhou verb–object phrases",
    "https://benjamins.com/catalog/lali.00029.che",
  ),
  easternMin: source(
    "Glottolog: Min Dong Chinese",
    "https://glottolog.org/resource/languoid/id/mind1253",
  ),
  yueAtlas: source(
    "CUHK: Yue subgroups in the Language Atlas",
    "https://cloud.itsc.cuhk.edu.hk/enewsasp/app/article-details.aspx/F1FF684626A68E84EE9E3CE710FA50F0/",
  ),
  cantoneseTones: source(
    "Acquisition of lexical tones by Cantonese–English bilingual children",
    "https://www.cambridge.org/core/journals/journal-of-child-language/article/acquisition-of-lexical-tones-by-cantoneseenglish-bilingual-children/B08EAD987DF2B28C234F42810A8E20A3",
  ),
  cantoneseCorpus: source(
    "SFUSED Cantonese: Methods, design, and usage",
    "https://pmc.ncbi.nlm.nih.gov/articles/PMC10851145/",
  ),
  cantoneseWriting: source(
    "Low-Resource NMT: Written and spoken languages in Hong Kong",
    "https://arxiv.org/abs/2505.17816",
  ),
  taishan: source(
    "Teresa M. Cheng: The phonology of Taishan",
    "https://www.jstor.org/stable/23749797",
  ),
  yulin: source(
    "Hu: Kinship terminology in Yulin and Cantonese",
    "https://pressto.amu.edu.pl/index.php/linpo/article/view/linpo-2020-0001",
  ),
  yueVoicing: source(
    "Tsuji: Murmured initials in Yue Chinese",
    "https://www.jstage.jst.go.jp/article/gengo1939/1977/72/1977_29/_pdf",
  ),
  hakkaAtlas: source(
    "ANU: Uncle-type Kinship Terms, Hakka and Wu classification",
    "https://openresearch-repository.anu.edu.au/server/api/core/bitstreams/5a3fa239-4e92-4217-861b-e88d6b33d9c3/content",
  ),
  meixian: source(
    "City University of Hong Kong: Vowels and tones in Meixian Hakka",
    "https://lbms03.cityu.edu.hk/theses/c_ftt/phd-ctl-b40860632f.pdf",
  ),
  hakkaDictionary: source(
    "Taiwan Ministry of Education: Hakka dictionary",
    "https://hakkadict.moe.edu.tw/",
  ),
  hakkaVarieties: source(
    "Hakka Affairs Council: Dictionary editorial introduction",
    "https://cloud.hakka.gov.tw/site/hakka/public/%E7%B7%A8%E8%BC%AF%E8%AA%AA%E6%98%8E-1754-42473.html",
  ),
  hailu: source(
    "Hakka Affairs Council: Comparative Hailu research",
    "https://www.hakka.gov.tw/File/Attach/45087/File_92996.pdf",
  ),
  lufeng: source(
    "Hakka Affairs Council: Lufeng documentary and field comparison",
    "https://cloud.hakka.gov.tw/Attachment/1/84178533971.pdf",
  ),
  luhe: source(
    "National Central University: Study of Luhe Hakka",
    "https://ir.lib.ncu.edu.tw/handle/987654321/44468?locale=en-US",
  ),
  haifeng: source(
    "National Central University: Origins and formation of Taiwanese Hailu",
    "https://hakka.ncu.edu.tw/Hakka_ePaper/paper/paper150/02_01.html",
  ),
  changting: source(
    "Lin: Changting Hakka Tone Sandhi",
    "https://toaj.stpi.niar.org.tw/index/journal/volume/article/4b1141f987fa79a3018808aead6d1f34",
  ),
  changtingField: source(
    "National Central University: Changting Chengguan Hakka",
    "https://etd.lib.ncu.edu.tw/detail/58397520cd865be401a7419ea86e6768/?seq=1",
  ),
  wuNorth: source(
    "Language change: High vowel fricativization in Northern Wu",
    "https://refubium.fu-berlin.de/bitstream/handle/fub188/45589/292-EnkeEtAl-2024.pdf?sequence=1",
  ),
  shanghai: source(
    "Chen: Tone Sandhi, Shanghai analysis",
    "https://assets.cambridge.org/052165/2723/sample/0521652723WS.pdf",
  ),
  shanghaiTts: source(
    "Improving TTS for Shanghainese through word segmentation",
    "https://arxiv.org/abs/2307.16199",
  ),
  suzhou: source(
    "ICPhS: Articulatory and acoustic study of Suzhou fricative vowels",
    "https://www.icphs2007.de/conference/Papers/1321/1321.pdf",
  ),
  suzhouStudy: source(
    "Hu: Fricative vowels as an intermediate stage of apicalization",
    "https://www.benjamins.com/catalog/lali.00027.hu",
  ),
  wenzhou: source(
    "Rose: Wenzhou tones, speaker differences, and historical development",
    "https://brill.com/view/journals/bcl/5/2/article-p29_2.xml",
  ),
  wenzhouPerception: source(
    "Xu: Wenzhou tone, pitch, phonation, and perception",
    "https://www.isca-archive.org/tal_2012/xu12c_tal.pdf",
  ),
  wenzhouSyntax: source(
    "Sentence planning and pitch scaling in Wenzhou Chinese",
    "https://www.sciencedirect.com/science/article/abs/pii/S0095447014000758",
  ),
  lishui: source(
    "Steed: Lishui Wu tone and tone sandhi",
    "https://openresearch-repository.anu.edu.au/items/69a0c01b-9f60-4eef-8e5d-cc0aed96accc",
  ),
  lishuiChange: source(
    "Lan, Chen, and Zhang: Acoustic study of Lishui tone sandhi",
    "https://www.internationalphoneticassociation.org/icphs-proceedings/ICPhS2023/full_papers/542.pdf",
  ),
};

export const groupArticles: Record<LanguageId, EncyclopediaEntry> = {
  mandarin: article(
    "Mandarin",
    "A group spanning northern and southwestern China, with regional varieties distinct from Standard Mandarin.",
    [
      section(
        "A group larger than its standard",
        "Mandarin names a broad part of the Sinitic landscape, extending across northern China and far into the southwest. It also appears in the name Standard Mandarin, the standardized variety familiar from many classrooms. Those meanings overlap, but they are not interchangeable. A local speaker in Chengdu or Nanjing does not simply reproduce the pronunciation and vocabulary of a standard-language lesson.",
        "Beijing, Jinan, Nanjing, and Chengdu belong to different Mandarin branches.",
      ),
      section(
        "What the standard’s sounds reveal",
        "Standard Mandarin distinguishes aspirated from unaspirated stops: aspiration is the stronger release of air represented by [ʰ] in IPA. This explains why a spelling convention cannot be read as a universal pronunciation key. The standard also lacks syllable-final [p], [t], and [k], which makes comparison with Cantonese or Meixian Hakka particularly instructive.",
        "These are descriptions of the standard. Regional varieties need their own sound inventories; a group name is not a license to copy one city’s phonology onto every other city.",
      ),
      section(
        "Tones belong in connected speech",
        "A tone learned from an isolated syllable is only part of pronunciation. Experimental research on Mandarin examines how tones change when syllables combine, including familiar third-tone changes. Jinan and Nanjing have their own studied sandhi patterns. Comparing their rules shows why identifying a tone category and describing its actual pitch are separate tasks.",
      ),
      section(
        "Four regional paths",
        "The Beijing grouping anchors the northern route. Ji–Lu introduces Jinan and a different regional setting in Hebei and Shandong. Jianghuai leads to the lower Yangtze, with Nanjing and Yangzhou among its reference varieties. Southwestern Mandarin reaches Chengdu and Chongqing. These are selected branches, not a complete map of Mandarin, and the city points do not mark exclusive speech territories.",
      ),
      section(
        "Reading the letter carefully",
        "Our Mandarin letter is written in colloquial Standard Mandarin. It belongs beside the formal written version as a comparison of wording and register, but it is not evidence for local Beijing or Chengdu speech. Standard Written Chinese is closely associated with Mandarin-based vernacular writing; its use by speakers of other groups does not make their everyday languages identical.",
        "For a deeper comparison, follow a locality page first, then ask which speaker, context, and transcription a pronunciation represents. That sequence keeps an accessible overview connected to precise evidence.",
      ),
    ],
    [
      ["Family", "Sinitic"],
      ["Selected branches", "Beijing · Ji–Lu · Jianghuai · Southwestern"],
      ["Letter reference", "Colloquial Standard Mandarin"],
    ],
    [
      S.classification,
      S.standard,
      S.mandarinStops,
      S.mandarinCoda,
      S.mandarinSandhi,
      S.written,
    ],
  ),
  min: article(
    "Min",
    "A group rooted in Fujian, with distinct branches across the coast, inland regions, Taiwan, and overseas communities.",
    [
      section(
        "Begin with more than Southern Min",
        "Min is a Sinitic group rooted in Fujian, with communities in neighboring regions, Taiwan, and overseas. Southern Min, Eastern Min, Northern Min, Central Min, and Puxian have distinct local sound systems. An Amoy pronunciation cannot represent them all.",
        "These five branches are a selection; classifications differ in the divisions they recognize.",
      ),
      section(
        "Branches, clusters, and localities",
        "Amoy belongs to the Tsuan-Chiang cluster of Southern Min, alongside Tsuân-tsiu and Tsiang-tsiu. Academia Sinica’s database uses the names Xiamen, Quanzhou, Zhangzhou, and Quanzhang, and distinguishes the branch, cluster, and survey locality.",
      ),
      section(
        "More than one reading of a character",
        "Southern Min scholarship documents systematic differences between literary and colloquial readings. A character can participate in different layers of vocabulary and pronunciation. These are not simply careful and careless versions of the same utterance. They can preserve different sound correspondences, making a word’s reading context part of the evidence.",
        "For the learner, the consequence is practical: matching Chinese characters across two texts does not guarantee that one predictable sound substitution will connect them.",
      ),
      section(
        "Sound changes across a phrase",
        "Connected speech brings another dimension. Xiamen research examines how syntax helps delimit tone-sandhi domains; Fuzhou research likewise studies the interaction of phrase structure and pronunciation. The rules are local. A Southern Min tone pattern should not be transferred automatically to Eastern Min.",
        "Inland comparisons add further contrasts. Studies of Jian’ou and Yong’an describe different developments in syllable endings. These cases make Min a particularly clear demonstration that shared ancestry can coexist with substantial structural diversity.",
      ),
      section(
        "Writing and contemporary comparison",
        "The Amoy letter is a contributor draft awaiting local-speaker review of vocabulary, grammar, and character choices. It does not represent every Min variety.",
        "Comparing Amoy, Tsuân-tsiu, and Tsiang-tsiu shows variation within Tsuan-Chiang. Fuzhou, Putian, Jian’ou, and Yong’an extend that comparison to other Min branches.",
      ),
    ],
    [
      ["Selected branches", "Southern · Eastern · Northern · Puxian · Central"],
      ["Featured path", "Min → Southern Min → Tsuan-Chiang → Amoy"],
      ["Letter reference", "Amoy Southern Min — awaiting local review"],
    ],
    [
      S.minIntro,
      S.minGuide,
      S.minCodas,
      S.minNorth,
      S.minPuxian,
      S.xiamen,
      S.fuzhouSyntax,
    ],
  ),
  yue: article(
    "Yue",
    "Cantonese, Taishanese, and other varieties across Guangdong, Guangxi, Hong Kong, and overseas communities.",
    [
      section(
        "Cantonese within a wider group",
        "Yue includes Cantonese as associated with Guangzhou and Hong Kong, as well as regional varieties that should not be collapsed into that familiar reference. Our atlas selects Guangfu, Siyi, and Goulou. These paths connect the Pearl River region with Taishan and with Yulin in southeastern Guangxi, making internal diversity visible before detailed pronunciation is introduced.",
        "Some sources use Cantonese for a wider range of Yue varieties. Here, Cantonese refers to Guangzhou and Hong Kong varieties unless another locality is specified.",
      ),
      section(
        "The sound of a checked syllable",
        "Cantonese syllables can end in unreleased stops [p̚], [t̚], and [k̚]. The small mark indicates that the closure has no audible release. These endings help explain the short, checked syllables discussed in phonetic research. They are part of a sound system, not extra consonants to pronounce with a following vowel.",
        "Tone descriptions may count these syllables differently depending on whether the author is discussing pitch contrasts or traditional categories. A bare tone count can therefore mislead unless its convention is stated.",
      ),
      section(
        "Three selected regional paths",
        "Guangfu includes Guangzhou and Hong Kong Cantonese. Siyi includes Taishan and neighboring places such as Kaiping, Enping, and Xinhui. Goulou takes the reader inland, with Yulin as the selected point. The Language Atlas tradition recognizes additional Yue divisions; these three are deliberately chosen entry points rather than an exhaustive list.",
        "Taishan research compares its phonology directly with Cantonese while documenting incomplete mutual intelligibility. Work on Yulin compares kinship terminology. Together, these studies show that useful contrasts include vocabulary and social meanings as well as individual sounds.",
      ),
      section(
        "Speech and writing are different layers",
        "Written Cantonese and Standard Written Chinese differ in vocabulary and grammar. This makes the letter comparison more than an exercise in reading shared characters with different pronunciations. Look at the pronouns, everyday verbs, and grammatical words: wording belongs to the variety and register being represented.",
        "Our Guangfu letter is a contributor sample awaiting review. It is not a Taishan or Yulin letter, and its accessible character text does not substitute for a verified local recording.",
      ),
      section(
        "How to read the map",
        "A point at Guangzhou or Hong Kong names a reference locality, not a boundary around everyone who speaks Cantonese. The same caution matters even more when an inland variety is represented by one city. Begin with the branch, read the locality’s evidence, and compare like with like. This preserves the connection between the broad Yue label and the specific speech being described.",
      ),
    ],
    [
      ["Selected branches", "Guangfu · Siyi · Goulou"],
      ["Featured reference", "Guangzhou Cantonese"],
      ["Sound focus", "Checked syllables and local tone systems"],
    ],
    [
      S.yueAtlas,
      S.cantoneseTones,
      S.cantoneseCorpus,
      S.taishan,
      S.yulin,
      S.cantoneseWriting,
    ],
  ),
  hakka: article(
    "Hakka",
    "A group spoken across southern China, Taiwan, and overseas communities, with distinct local sound systems.",
    [
      section(
        "Communities across regions",
        "Hakka is spoken in communities across southern China, Taiwan, and overseas, with concentrations in Guangdong, western Fujian, and southern Jiangxi. Its distribution is dispersed rather than one continuous territory.",
        "Meixian is a familiar reference variety, not the pronunciation of every Hakka community. The presence of separate Taiwanese Hakka dictionary and teaching varieties is another reminder that a shared group name leaves room for substantial local differentiation.",
      ),
      section(
        "What Meixian contributes to comparison",
        "Phonetic research on Meixian describes syllable endings [p], [t], [k], [m], [n], and [ŋ]. Comparing these with Standard Mandarin makes syllable structure tangible: distinctions can occur at the end of a syllable as well as its beginning. The same research examines vowels and tones, so a complete description cannot be reduced to a short list of consonants.",
        "These observations are explicitly about Meixian. They do not establish that every Hakka variety has the same inventory, tone values, or connected-speech behavior.",
      ),
      section(
        "Three paths with different evidence",
        "Our Yue–Tai path leads to Meixian; Hailu leads to the Haifeng–Lufeng reference area; Tingzhou leads to Changting in western Fujian. These labels follow a selected classification scheme. Hailu’s position differs across sources, and the navigation should be read as a documented guide rather than a final verdict on the tree.",
        "Changting is especially useful for comparison because its tone sandhi has attracted detailed research. A familiar Meixian pronunciation rule cannot simply be reused there.",
      ),
      section(
        "An ancestral name is not a uniform city voice",
        "Hailu illustrates a difficult cartographic problem. Its name connects Haifeng and Lufeng, but research also emphasizes Luhe and a wider network of Hakka communities. The region includes contact with Southern Min and other varieties. Taiwanese Hailu has its own development and should not be presented as an unchanged recording of an ancestral mainland locality.",
        "For that reason, the Haifeng and Lufeng pages explain the geographic reference and its limits rather than inventing one authoritative urban accent.",
      ),
      section(
        "Writing, review, and local authority",
        "Our Hakka letter is intended to evoke Meixian and is preserved as supplied. It requires local review of vocabulary, grammar, and character choices before pronunciation is added. Taiwan’s official Hakka dictionary offers valuable variety-specific resources, but those resources must retain their labels; a Taiwanese reading is not automatically a Meixian reading.",
        "The atlas treats this variation as material to learn from. A careful comparison records where a form belongs and who or what documents it, instead of selecting one prominent variety as the measure of all the others.",
      ),
    ],
    [
      ["Selected branches", "Yue–Tai · Hailu · Tingzhou"],
      ["Letter reference", "Intended Meixian Hakka"],
      ["Map caution", "Hailu points identify a reference area"],
    ],
    [
      S.hakkaAtlas,
      S.meixian,
      S.hakkaDictionary,
      S.hakkaVarieties,
      S.hailu,
      S.lufeng,
      S.changting,
    ],
  ),
  wu: article(
    "Wu",
    "Varieties of the lower Yangtze and Zhejiang, known for contrasts in voice quality and connected-speech tones.",
    [
      section(
        "Shanghai is one starting point",
        "Wu is associated with Shanghai, southern Jiangsu, Zhejiang, and neighboring areas. Shanghainese is a prominent local example, but the group also includes Suzhou, Wenzhou, Lishui, and many other varieties. The first task is therefore to distinguish the group from its most familiar city name.",
        "The three Wu branches shown here are Taihu in the north, Oujiang around Wenzhou, and Chuqu inland. Other branches lie outside this selection.",
      ),
      section(
        "Consonants and voice quality",
        "Many descriptions of Wu discuss contrasts linked to historical voiced consonants. Actual speech is more intricate than reading a category label literally. In Shanghai, the phonetic realization of these categories depends on context, and breathy voice is part of the scholarly discussion. A printed symbol must therefore be tied to a transcription convention and a particular utterance.",
        "Lishui provides a useful counterexample to overgeneralization: its descriptive literature does not report the same diagnostic three-way stop contrast often associated with Wu. Shared classification is not a promise of an identical consonant system.",
      ),
      section(
        "Listen beyond the isolated syllable",
        "Tone sandhi changes how tones are realized when syllables combine. Shanghai research discusses patterns organized across words’ syllables, and speech-technology research shows why word segmentation matters when generating those patterns. Simply concatenating isolated character readings can miss the pronunciation of the whole expression.",
        "Wenzhou has its own complex word-level and phrase-level behavior. Research there also documents differences between speakers. It should not be presented as a more complicated version of a single Shanghai rule.",
      ),
      section(
        "Local variety changes the question",
        "Suzhou is a strong place to investigate vowel quality: articulatory studies examine vowels with audible frication and the tongue movements that produce them. Lishui offers another kind of evidence, with acoustic work comparing tone-sandhi behavior across generations. These studies show why local pages need distinct content rather than a repeated inventory under different city names.",
        "Together, the selected places move the reader from regional orientation to concrete questions: what makes a vowel different, what shapes a word’s pitch, and how consistent is that pattern across speakers?",
      ),
      section(
        "A written example needs a local label",
        "The Wu letter is intended as Shanghai speech and remains a contributor draft. Its character forms offer a way into vocabulary and phrasing, but they cannot supply verified sound on their own. A Suzhou or Wenzhou version would require separate local work.",
        "The Shanghai letter and the Standard Written Chinese letter differ in vocabulary, phrasing, and style.",
      ),
    ],
    [
      ["Selected branches", "Taihu · Oujiang · Chuqu"],
      ["Letter reference", "Intended Shanghai Wu"],
      ["Research themes", "Voice quality · vowels · tone sandhi"],
    ],
    [
      S.wuNorth,
      S.shanghai,
      S.shanghaiTts,
      S.suzhou,
      S.wenzhou,
      S.wenzhouSyntax,
      S.lishui,
      S.lishuiChange,
    ],
  ),
};

export const subgroupArticles: Record<string, EncyclopediaEntry> = {
  "mandarin/beijing": article(
    "Beijing Mandarin",
    "The northern Mandarin branch that includes local Beijing speech.",
    [
      section(
        "Group, city, and standard",
        "Beijing Mandarin is used here as a regional classification label. Beijing is its selected local point. Standard Mandarin draws on Beijing-based pronunciation, but a standardized norm and the local speech of a city are different objects of study. Keep those labels separate when comparing a textbook, an interview, and a colloquial exchange.",
      ),
      section(
        "A useful first comparison",
        "Start with the Beijing locality page, then compare it with Jinan under Ji–Lu rather than treating both as an undifferentiated northern accent. The atlas’s Mandarin letter represents the standard, so it supplies a comparison reference rather than a recording or transcription of local Beijing speech. This distinction also prevents formal written vocabulary from being mistaken for everyday local usage.",
      ),
    ],
    [
      ["Group", "Mandarin"],
      ["Mapped locality", "Beijing"],
    ],
    [S.classification, S.standard, S.written],
  ),
  "mandarin/jilu": article(
    "Ji–Lu Mandarin",
    "A Mandarin branch in parts of Hebei and Shandong, including Jinan.",
    [
      section(
        "A regional classification",
        "Ji–Lu is one of the Mandarin groupings recognized in the classification followed here. Jinan, in Shandong, is our selected reference point. It belongs alongside other Mandarin regions rather than underneath local Beijing speech. The regional label provides a relationship, not a claim that every town uses the same tones or vocabulary.",
      ),
      section(
        "Why Jinan is informative",
        "Research on Jinan tone sandhi examines a process sensitive to the position of a syllable in a sequence. This raises a concrete question: how does a local variety organize tones once words are combined? Consult the locality page before applying a familiar Standard Mandarin rule. The study supports a specific Jinan pattern, not an identical rule throughout Ji–Lu.",
      ),
    ],
    [
      ["Group", "Mandarin"],
      ["Mapped locality", "Jinan"],
      ["Regional reference", "Hebei and Shandong"],
    ],
    [S.classification, S.jinan, S.mandarinSandhi],
  ),
  "mandarin/jianghuai": article(
    "Jianghuai Mandarin",
    "Mandarin varieties of the lower Yangtze, including Nanjing, Yangzhou, and Hefei.",
    [
      section(
        "The lower Yangtze route",
        "Jianghuai includes local varieties associated with Nanjing, Yangzhou, and Hefei. Nanjing is the mapped example in this edition; Yangzhou appears in the wider place listing. This branch matters because it prevents Mandarin from being equated with the speech of Beijing or with one standardized pronunciation.",
      ),
      section(
        "Local tones and historical names",
        "Experimental work on Nanjing investigates both assimilatory and dissimilatory tone sandhi: adjacent tones do not always respond in the same direction. Historical references to “Nanjing Mandarin” require separate care. Research on Ming-period usage describes a flexible prestige system, so a historical name cannot be assumed to designate present-day urban Nanjing speech. This atlas’s main comparison remains contemporary.",
      ),
    ],
    [
      ["Group", "Mandarin"],
      ["Mapped locality", "Nanjing"],
      ["Other reference places", "Yangzhou · Hefei"],
    ],
    [S.classification, S.nanjing, S.nanjingHistory],
  ),
  "mandarin/southwestern": article(
    "Southwestern Mandarin",
    "A Mandarin branch across southwestern China, including Chengdu and Chongqing.",
    [
      section(
        "A broad grouping",
        "Southwestern Mandarin includes the Chengdu and Chongqing varieties and extends well beyond either city. Chengdu is the selected map point, not a substitute for the whole southwest. The route deliberately stops at a useful level of detail; specialized classifications may insert additional regional clusters between the branch and an individual locality.",
      ),
      section(
        "Compare actual local features",
        "The JIPA description of Zhongjiang compares neighboring Southwestern Mandarin varieties and specifically discusses Chengdu. Such work shows why local glide, vowel, and tone patterns deserve direct investigation. It does not make Zhongjiang evidence interchangeable with Chengdu evidence. Start with the Chengdu page, whose references include a separate study of vowel raising, and retain the locality attached to every sound description.",
      ),
    ],
    [
      ["Group", "Mandarin"],
      ["Mapped locality", "Chengdu"],
      ["Another regional reference", "Chongqing"],
    ],
    [S.southwest, S.chengdu],
  ),
  "min/southern-min": article(
    "Southern Min",
    "The Min branch that includes the Tsuan-Chiang and Teo Swa clusters.",
    [
      section(
        "Two clusters of localities",
        "Tsuan-Chiang, called Quanzhang in linguistic sources, includes Tsuân-tsiu, Tsiang-tsiu, and Amoy, with related varieties in Taiwan, Singapore, and Penang. Teo Swa, also called Chaoshan, is a separate cluster represented here by Teochew and Swatow in eastern Guangdong. Localities within either cluster have their own pronunciations.",
      ),
      section(
        "Readings and connected speech",
        "Literary and colloquial readings are an important part of Southern Min comparison. Tone sandhi adds another layer when syllables combine. Xiamen research connects sandhi domains to syntax, while Zhangzhou research examines suffixation and tonal behavior. A shared branch label does not remove these local differences. Our contributed letter targets Xiamen and must not silently become a Quanzhou or Zhangzhou transcription.",
      ),
    ],
    [
      ["Group", "Min"],
      ["Selected clusters", "Tsuan-Chiang · Teo Swa"],
      [
        "Taiwan references",
        "Taipak · Tâi-lâm · Ko-hiông · Gî-lân · Lo̍k-káng · Sam-kiap",
      ],
    ],
    [
      S.minIntro,
      S.minGuide,
      S.xiamen,
      S.zhangzhou,
      S.taiwanVariation,
      S.singaporeHokkien,
      S.penangFieldwork,
      chaoshanArticles.chaozhou.sources[0],
      chaoshanArticles.chaozhou.sources[2],
    ],
  ),
  "min/eastern-min": article(
    "Eastern Min",
    "The Min branch that includes Fuzhou, with its own syllable structure and tone sandhi.",
    [
      section(
        "A separate route through Min",
        "Eastern Min, also called Min Dong in catalogues, includes the Fuzhou variety used as our mapped reference. It is not another name for Southern Min. Beginning with this distinction helps a reader avoid transferring Xiamen vocabulary, readings, or pronunciation rules to a city whose speech belongs to a different branch.",
      ),
      section(
        "Where phonology meets grammar",
        "Fuzhou studies examine tone-sandhi domains, verb–object phrases, and the behavior of final glottal stops. These topics reveal that pronunciation depends on more than a list of isolated syllables. The relevant grammatical grouping can matter too. Fuzhou is a well-documented entry point, but its particular patterns should retain their local label rather than being asserted for all Eastern Min communities.",
      ),
    ],
    [
      ["Group", "Min"],
      ["Catalogue name", "Min Dong"],
      ["Mapped locality", "Fuzhou"],
    ],
    [S.easternMin, S.fuzhou, S.fuzhouSyntax],
  ),
  "min/northern-min": article(
    "Northern Min",
    "An inland Min branch in northern Fujian, including Jian’ou.",
    [
      section(
        "Jian’ou within a wider branch",
        "Northern Min is represented here by Jian’ou in northern Fujian. Comparative research also draws on other localities, including Jianyang, rather than deriving the whole branch from one city. This matters when interpreting a family tree: a convenient reference point is a sample of diversity, not the ancestor or standard of every related variety.",
      ),
      section(
        "The value of comparing endings",
        "Studies of Northern Min compare rhyme systems and the different outcomes of earlier syllable endings. Jian’ou contributes evidence that contrasts with both coastal Min and Central Min. A sound correspondence can connect forms whose modern pronunciation no longer looks similar. These comparisons are evidence-based historical context for living varieties; the atlas does not supply a reconstructed historical recording or one universal Northern Min reading.",
      ),
    ],
    [
      ["Group", "Min"],
      ["Mapped locality", "Jian’ou"],
      ["Comparative locality", "Jianyang"],
    ],
    [S.minNorth, S.jianou],
  ),
  "min/puxian": article(
    "Puxian Min",
    "The Min branch associated with Putian and Xianyou.",
    [
      section(
        "Two names, a regional branch",
        "Puxian connects Putian and Xianyou in Fujian. Putian is the current map point. The branch appears separately from Southern Min and Eastern Min in this introductory scheme. A position between familiar cities on a map should not be mistaken for proof that its speech is merely a mixture of those cities’ languages.",
      ),
      section(
        "Relationships require evidence",
        "Comparative research examines Putian and Xianyou alongside Fuqing and Yongchun, evaluating consonants, tones, and vowels to assess their relationships. One analysis finds stronger connections with Eastern Min than with Southern Min. That is a scholarly argument, not a reason to hide classification uncertainty. The local Putian entry introduces this evidence without presenting a disputed deeper grouping as settled fact.",
      ),
    ],
    [
      ["Group", "Min"],
      ["Mapped locality", "Putian"],
      ["Related locality", "Xianyou"],
    ],
    [S.minIntro, S.minPuxian],
  ),
  "min/central-min": article(
    "Central Min",
    "An inland Min branch in Fujian, including Yong’an.",
    [
      section(
        "An inland reference",
        "Central Min is one of the branches selected for the initial Min overview. Yong’an is its current local example. Keeping it separate from Northern Min makes the map more informative: the inland location of two communities does not mean their sound systems or branch membership are identical.",
      ),
      section(
        "A concrete comparison",
        "Comparative work on Min syllable endings describes a distinctive pattern in Yong’an, where nasal endings developed differently from those in Jian’ou and coastal varieties. The study uses these differences to investigate earlier forms; its historical reconstruction is distinct from a present-day pronunciation record.",
      ),
    ],
    [
      ["Group", "Min"],
      ["Mapped locality", "Yong’an"],
      ["Comparison focus", "Nasal endings and rhyme correspondences"],
    ],
    [S.minIntro, S.minCodas],
  ),
  "yue/guangfu": article(
    "Guangfu",
    "The Yue branch that includes Guangzhou and Hong Kong Cantonese.",
    [
      section(
        "A familiar reference area",
        "The Guangfu grouping includes Guangzhou, Hong Kong, and Macau in the cited Language Atlas discussion. Guangzhou and Hong Kong are the two mapped examples here. Their prominence makes Cantonese an accessible starting point, but it should not erase the distinction between Guangfu and other Yue groupings such as Siyi or Goulou.",
      ),
      section(
        "Speech, tones, and writing",
        "Cantonese research documents unreleased final stops, checked syllables, and lexical tone contrasts. Written Cantonese also has vocabulary and grammar that differ from Standard Written Chinese. Those two observations belong together: a local written text is not simply the formal written language pronounced differently. The contributor letter is labeled Guangfu Cantonese and remains open to review; it does not establish identical usage in every Guangfu locality.",
      ),
    ],
    [
      ["Group", "Yue"],
      ["Mapped localities", "Guangzhou · Hong Kong"],
      ["Additional reference", "Macau"],
    ],
    [S.yueAtlas, S.cantoneseTones, S.cantoneseWriting],
  ),
  "yue/siyi": article(
    "Siyi",
    "The Yue branch that includes Taishan, Kaiping, Enping, and Xinhui.",
    [
      section(
        "The selected regional set",
        "The cited atlas discussion associates Siyi with Taishan, Enping, Kaiping, and Xinhui. Taishan is the map’s reference point. The regional label groups related varieties; it does not imply that one Taishan description exhausts the local variation across all four places.",
      ),
      section(
        "Resemblance without identity",
        "Teresa Cheng’s phonological study places Taishan in Siyi and compares its sounds with Cantonese. It describes substantial structural relationships alongside incomplete mutual intelligibility. That combination is useful for understanding the atlas: common ancestry and partial similarity do not guarantee effortless comprehension. Compare Taishan with Guangzhou as two identified varieties, and resist substituting a Cantonese dictionary entry when a Taishan form has not yet been documented.",
      ),
    ],
    [
      ["Group", "Yue"],
      ["Mapped locality", "Taishan"],
      ["Regional places", "Enping · Kaiping · Xinhui"],
    ],
    [S.yueAtlas, S.taishan],
  ),
  "yue/goulou": article(
    "Goulou",
    "An inland Yue branch extending into southeastern Guangxi, including Yulin.",
    [
      section(
        "Beyond the Cantonese reference",
        "Goulou is a regional Yue grouping represented here by Yulin in Guangxi. The cited atlas account also names Fengkai. This route broadens the site beyond Guangzhou and Hong Kong and helps prevent the word Yue from becoming a synonym for one familiar Cantonese pronunciation.",
      ),
      section(
        "Local evidence changes the picture",
        "Yulin research examines kinship vocabulary, while comparative work on inland Yue investigates phonation and historical consonant categories. These studies ask different questions and should not be collapsed into a single list of “Yue features.” The Yulin page distinguishes evidence about its local speech from claims about the wider region. In particular, a finding from neighboring Cenxi is comparative context, not automatically a verified Yulin sound inventory.",
      ),
    ],
    [
      ["Group", "Yue"],
      ["Mapped locality", "Yulin"],
      ["Another atlas locality", "Fengkai"],
    ],
    [S.yueAtlas, S.yulin, S.yueVoicing],
  ),
  "hakka/yuetai": article(
    "Yue–Tai",
    "A Hakka branch linking varieties in Guangdong and Taiwan, including Meixian.",
    [
      section(
        "What the name does",
        "Yue–Tai is a Hakka branch label in the classification used here. Meixian is its selected locality. The name should not be read as the unrelated Yue language group plus a second language: here Yue refers to Guangdong within a regional Hakka classification. Other schemes draw some of the internal boundaries differently.",
      ),
      section(
        "A reference is not a universal standard",
        "Meixian research supplies detailed phonetic evidence. Taiwan’s official resources separately document Sixian, Hailu, and other varieties. A Taiwanese dictionary reading does not automatically represent Meixian.",
      ),
    ],
    [
      ["Group", "Hakka"],
      ["Mapped locality", "Meixian"],
      ["Classification status", "Selected regional scheme"],
    ],
    [S.hakkaAtlas, S.meixian, S.hakkaVarieties],
  ),
  "hakka/hailu": article(
    "Hailu",
    "Hakka communities connected to Haifeng, Lufeng, and Luhe, with related varieties in Taiwan.",
    [
      section(
        "Names and communities",
        "Hailu is associated with Hakka communities connected to Haifeng and Lufeng. Research describes a wider area, including Luhe, and the development of Hailu varieties overseas and in Taiwan. The two map pins are reference localities within that story. They do not claim that either whole city speaks a uniform Hakka variety.",
      ),
      section(
        "Preserve the local distinction",
        "Studies of Hailu stress contact with neighboring languages and differences between mainland and Taiwanese speech. Some earlier classification schemes place Hailu within a larger Yue–Tai grouping; this edition exposes it as a separate navigational branch. The Haifeng and Lufeng pages therefore explain source scope before pronunciation. Importing a Taiwanese Hailu recording without its label would obscure the very variation the atlas is meant to reveal.",
      ),
    ],
    [
      ["Group", "Hakka"],
      ["Reference localities", "Haifeng · Lufeng"],
      ["Important research locality", "Luhe"],
    ],
    [S.hakkaAtlas, S.hailu, S.lufeng, S.luhe],
  ),
  "hakka/tingzhou": article(
    "Tingzhou",
    "A Hakka branch in western Fujian, including Changting.",
    [
      section(
        "A regional route",
        "Tingzhou is one of the Hakka regional groupings used in the cited atlas scheme. Changting is the selected point. The region should not be confused with a single uniform accent, nor should Meixian be used to fill in pronunciation simply because both entries belong to Hakka.",
      ),
      section(
        "Tone sandhi as a local question",
        "Changting has a substantial research literature on how tones change in combinations of two and three syllables. Descriptions and theoretical analyses have not always agreed, and later work revisits the data. This makes Tingzhou a useful route for learning how linguistic evidence develops. Begin with the locality and study conditions, then compare the proposed patterns; a branch label cannot replace that detailed work.",
      ),
    ],
    [
      ["Group", "Hakka"],
      ["Mapped locality", "Changting"],
      ["Regional setting", "Western Fujian"],
    ],
    [S.hakkaAtlas, S.changting, S.changtingField],
  ),
  "wu/taihu": article(
    "Taihu",
    "Northern Wu varieties around the lower Yangtze, including Shanghai and Suzhou.",
    [
      section(
        "The northern Wu route",
        "Taihu is the selected northern grouping containing Shanghai and Suzhou. More detailed classifications place these localities in a Su–Hu–Jia cluster. The simplified path omits that intermediate level for navigation, but it does not suggest that the two cities have identical vowel systems or tone patterns.",
      ),
      section(
        "Two productive comparisons",
        "Shanghai research provides a route into word-level tone sandhi and contextual voicing. Suzhou research offers a particularly clear investigation of fricative vowels, using acoustic and articulatory evidence. Read the cities side by side to see how neighboring varieties can support different questions. A Shanghai letter introduces Shanghai wording; it should not be relabeled as general Taihu speech or treated as a verified Suzhou example.",
      ),
    ],
    [
      ["Group", "Wu"],
      ["Mapped localities", "Shanghai · Suzhou"],
      ["Further cluster", "Su–Hu–Jia"],
    ],
    [S.wuNorth, S.shanghaiTts, S.suzhou],
  ),
  "wu/oujiang": article(
    "Oujiang",
    "A Wu branch around Wenzhou and the Ou River in southern Zhejiang.",
    [
      section(
        "A distinct Wu setting",
        "Oujiang is the regional grouping associated here with Wenzhou and the Ou River area. It sits beside Taihu and Chuqu in this introductory scheme. A Wenzhou reference is useful because it extends the comparison beyond the better-known Shanghai area and makes the diversity within Wu immediately visible.",
      ),
      section(
        "Melody, duration, and voice",
        "Research on Wenzhou examines complex tone sandhi, speaker differences, and the contribution of phonation to tonal perception. These are related dimensions rather than interchangeable explanations. Read the locality page for the evidence behind each claim. A tonal pattern reported for one combination or speaker should not be converted into a universal rule for every Oujiang community; the branch name supplies orientation, not a complete phonological description.",
      ),
    ],
    [
      ["Group", "Wu"],
      ["Mapped locality", "Wenzhou"],
      ["Research focus", "Tone sandhi and phonation"],
    ],
    [S.hakkaAtlas, S.wenzhou, S.wenzhouPerception],
  ),
  "wu/chuqu": article(
    "Chuqu",
    "An inland Wu branch that includes Lishui.",
    [
      section(
        "Lishui in context",
        "Chuqu includes the Lishui variety studied in the cited acoustic and descriptive research. Lishui is the current map point. The classification relates it to Wu while leaving room for a sound system that does not reproduce the familiar Shanghai profile.",
      ),
      section(
        "A valuable counterexample",
        "Steed’s Lishui description reports the absence of the diagnostic three-way stop distinction often associated with Wu and describes a right-focused sandhi system. Later acoustic research examines variation across speakers and generations. These findings make Chuqu more than another name in the tree: it tests whether a broad-group claim is actually supported. Keep the study’s scope attached to the result rather than assuming every inland Wu locality shares it.",
      ),
    ],
    [
      ["Group", "Wu"],
      ["Mapped locality", "Lishui"],
      ["Comparison focus", "Consonant categories and tone sandhi"],
    ],
    [S.lishui, S.lishuiChange],
  ),
};

export const varietyArticles: Record<string, EncyclopediaEntry> = {
  ...chaoshanArticles,
  "beijing-city": article(
    "Beijing Mandarin",
    "Local Beijing speech, distinct from the codified pronunciation of Standard Mandarin.",
    [
      section(
        "A city variety and a standard",
        "Beijing is the local reference under the atlas’s Beijing Mandarin grouping. Its relationship with Standard Mandarin makes it an especially useful place to distinguish a community’s speech from a codified pronunciation norm. A language textbook, a formal broadcast, and a local conversation are not automatically samples of the same register or the same speaker repertoire.",
      ),
      section(
        "What to compare",
        "Research and teaching descriptions of Standard Chinese cover aspiration, rhotic suffixation, tone sandhi, and neutral-tone behavior. These provide a framework for asking precise questions about Beijing speech, but they do not certify every colloquial local form. The letter supplied for this project represents Standard Mandarin, so it is not presented here as a verified Beijing text. Local examples should preserve the speaker’s setting and the source’s description instead of treating proximity to the standard as a measure of correctness.",
      ),
    ],
    [
      ["Group", "Mandarin"],
      ["Branch", "Beijing"],
      ["Reference type", "Local variety"],
    ],
    [S.classification, S.standard, S.mandarinSandhi],
  ),
  jinan: article(
    "Jinan",
    "Ji–Lu Mandarin in Shandong, with tone changes that depend on a syllable’s position.",
    [
      section(
        "The Shandong route",
        "Jinan is the selected local point for Ji–Lu Mandarin. It gives the northern portion of the atlas more than one reference voice: local Mandarin does not stop at a contrast between Beijing and distant southern cities. Its classification describes a relationship within Mandarin, not a claim that its pronunciation is a modified version of the standard.",
      ),
      section(
        "Position can shape tone sandhi",
        "A study of Jinan’s fourth-tone sandhi examines where a syllable stands in a sequence and argues that position constrains the process. This is a concrete reason to compare connected speech, not just isolated tone labels. The result concerns a particular pattern and dataset; it is not a complete pronunciation course. For a fuller description, retain the word or phrase, the speaker, and the location in the sequence. Replacing the pattern with familiar Standard Mandarin third-tone rules would lose the local evidence.",
      ),
    ],
    [
      ["Group", "Mandarin"],
      ["Branch", "Ji–Lu"],
      ["Study focus", "Position-sensitive tone sandhi"],
    ],
    [S.classification, S.jinan],
  ),
  nanjing: article(
    "Nanjing",
    "Jianghuai Mandarin in Nanjing, distinct from historical uses of the name Nanjing Mandarin.",
    [
      section(
        "A lower Yangtze reference",
        "Nanjing is the map’s entry into Jianghuai Mandarin. Its regional neighbors in classification include Yangzhou and Hefei. This placement is a reminder that Mandarin covers local varieties with their own tonal organization, not only the standard familiar from introductory language courses.",
      ),
      section(
        "Tones in combination",
        "Experimental work on Nanjing studies both assimilatory and dissimilatory sandhi processes. In one kind of process, neighboring tones become more similar; in the other, their interaction increases a difference. The useful comparison is therefore the behavior of identified tone combinations, rather than assuming that one simple “Mandarin rule” covers all words.",
      ),
      section(
        "A historical label needs a date",
        "Research on Ming-period Nanjing Mandarin describes a flexible prestige system with several regional sources. The historical term does not designate the same variety as present-day urban Nanjing speech.",
      ),
    ],
    [
      ["Group", "Mandarin"],
      ["Branch", "Jianghuai"],
      ["Regional setting", "Lower Yangtze"],
    ],
    [S.classification, S.nanjing, S.nanjingHistory],
  ),
  chengdu: article(
    "Chengdu",
    "Southwestern Mandarin in Chengdu, with locally documented vowels and glide patterns.",
    [
      section(
        "Within Southwestern Mandarin",
        "Chengdu is a local variety within Southwestern Mandarin, not a branch at the same level as Southwestern itself. The site shortens the route to Sinitic → Mandarin → Southwestern Mandarin → Chengdu. Specialist classifications may place further regional groupings in between.",
      ),
      section(
        "A city needs its own sound evidence",
        "Research on vowel raising in Chengdu investigates the behavior of particular vowels rather than inferring the city’s whole sound system from Standard Mandarin. The JIPA description of nearby Zhongjiang also compares Chengdu when discussing glide retention. Those are complementary sources: the Zhongjiang article is not a Chengdu phonological inventory, and its recordings should retain their own locality label.",
      ),
      section(
        "Comparing with the letter",
        "The comparison letter is colloquial Standard Mandarin. It is not a verified sample of Chengdu vocabulary or pronunciation.",
      ),
    ],
    [
      ["Group", "Mandarin"],
      ["Branch", "Southwestern"],
      ["Sound topic", "Vowels and glide patterns"],
    ],
    [S.chengdu, S.southwest],
  ),
  xiamen: article(
    "Amoy",
    "Southern Min in Amoy, within the Tsuan-Chiang cluster.",
    [
      section(
        "Within Tsuan-Chiang",
        "Amoy is the established local name for Xiamen. Its Southern Min variety belongs to Tsuan-Chiang, called Quanzhang in Academia Sinica’s database. Tsuân-tsiu and Tsiang-tsiu are neighboring localities within the same cluster; Southern Min also includes other clusters.",
      ),
      section(
        "A phrase is more than isolated readings",
        "Research on Xiamen tone sandhi asks how syntactic structure helps organize the domains in which tones change. This means a string of individually correct dictionary readings need not describe a naturally spoken phrase. A pronunciation record should distinguish citation forms from connected-speech forms and identify the intended wording.",
      ),
      section(
        "The contributed letter",
        "The Amoy letter awaits local-speaker review of its vocabulary, grammar, and character choices. It has no full-letter IPA transcription or audio.",
      ),
    ],
    [
      ["Group", "Min"],
      ["Branch", "Southern Min"],
      ["Cluster", "Tsuan-Chiang"],
    ],
    [S.minGuide, S.minIntro, S.xiamen],
  ),
  quanzhou: article(
    "Tsuân-tsiu",
    "Southern Min in Tsuân-tsiu, with distinct literary and colloquial readings.",
    [
      section(
        "Within Tsuan-Chiang",
        "Tsuân-tsiu, called Quanzhou in Mandarin and in the cited research, belongs to Tsuan-Chiang alongside Amoy and Tsiang-tsiu. Their local readings differ even within the shared cluster.",
      ),
      section(
        "Literary and colloquial layers",
        "Comparative Min research uses Quanzhou literary and colloquial readings to investigate earlier syllable endings. Forms that now resemble each other in one reading layer can reveal different correspondences in another. This gives a practical reason to record more than the character and a single pronunciation: reading type and lexical context are part of the information.",
      ),
      section(
        "Use the nearby letter as a comparison",
        "The supplied Southern Min letter is intended for Xiamen. It can frame a comparison, but this page does not silently relabel it Quanzhou speech. A local adaptation needs its own review, especially where a familiar written character has more than one established reading.",
      ),
    ],
    [
      ["Group", "Min"],
      ["Branch", "Southern Min"],
      ["Cluster", "Tsuan-Chiang"],
    ],
    [S.minIntro, S.minCodas, S.minGuide],
  ),
  zhangzhou: article(
    "Tsiang-tsiu",
    "Southern Min in Tsiang-tsiu, where word formation interacts with tone sandhi.",
    [
      section(
        "Within Tsuan-Chiang",
        "Tsiang-tsiu, called Zhangzhou in Mandarin and in the cited research, belongs to Tsuan-Chiang alongside Tsuân-tsiu and Amoy. The cluster includes related Hokkien varieties beyond Fujian, each with its own local development.",
      ),
      section(
        "Word formation and tone",
        "Research on Zhangzhou suffixation discusses a right-dominant tone-sandhi system: the right edge of a relevant domain has a different role from preceding syllables. The broader question is how adding material to a word changes its spoken form. This connects morphology, the structure of words, with phonology rather than treating tones as isolated decorations.",
      ),
      section(
        "Keep the source’s variety",
        "The cited study documents particular Zhangzhou data, not every speaker across the prefecture. The nearby Amoy letter is not a verified Tsiang-tsiu text.",
      ),
    ],
    [
      ["Group", "Min"],
      ["Branch", "Southern Min"],
      ["Study focus", "Suffixation and tone sandhi"],
    ],
    [S.minIntro, S.zhangzhou],
  ),
  taipak: article(
    "Taipak",
    "Hokkien in Taipak, represented by a Quanzhou-leaning reading in the Ministry of Education dictionary.",
    [
      section(
        "A Taipei reference reading",
        "The Ministry of Education’s Taigi dictionary names Taipei among its local pronunciation references. In the entry for 相, the Taipei column is labeled Quanzhou-leaning, beside separate columns for Lukang, Sanxia, Yilan, Tainan, and Kaohsiung. This provides a concrete city reference for comparison without assigning the same accent to every Taipei speaker. The table also includes Zhangzhou-leaning and mixed reference varieties, making variation visible within a single dictionary entry.",
      ),
      section(
        "The wider Taiwan context",
        "Taiwan’s Ministry of Education uses Taiwanese Taigi in its English-language materials. Its account of regional variation describes a continuum shaped by migration from Quanzhou and Zhangzhou, with different local mixtures of features. Taipak is one locality within that wider picture. The dictionary’s literary and colloquial readings add another distinction: pronunciation depends on the word and its use as well as the place associated with a reading.",
      ),
      section(
        "Resources for reading and learning",
        "The dictionary was developed for language education and general reference, with several stages of editorial review. It provides definitions, example sentences, readings, and regional comparisons. The Ministry’s learning resources also cover Tâi-lô spelling, tones, and tone changes in connected speech. Its FAQ explains why literary and colloquial readings can occur in different words and cannot always replace each other. Together, these resources support study of both everyday vocabulary and written forms, while keeping regional differences visible.",
      ),
    ],
    [
      ["Group", "Min"],
      ["Branch", "Southern Min"],
      ["Cluster", "Tsuan-Chiang"],
      ["Entry type", "Locality reference"],
      ["Map anchor", "Taipak — city reference, not a dialect boundary"],
      ["Dictionary reference", "Taipei, Quanzhou-leaning reading"],
    ],
    [
      S.taiwanNames,
      S.taiwanVariation,
      S.taiwanDictionary,
      S.taiwanDictionaryGuide,
    ],
  ),
  tainan: article(
    "Tâi-lâm",
    "Hokkien in Tâi-lâm, with its own mixed reference variety in the Ministry of Education dictionary.",
    [
      section(
        "Tainan’s dictionary reference",
        "Tâi-lâm is the local place-name form recorded in the Ministry of Education’s dictionary. Its pronunciation tables identify a Tainan mixed reference variety, separately from the Kaohsiung mixed reference. The shared label describes a broad combination of features; it does not mean that the two locality columns always give the same reading.",
      ),
      section(
        "A comparison with 箱",
        "For 箱, meaning a box or container, the dictionary records a different colloquial reading in its Tainan column from its Kaohsiung column. The entry also distinguishes a literary reading and illustrates the word as a measure for boxed quantities, such as a box of books. This gives a specific comparison with a known meaning and reading type, rather than a general claim that every Tainan vowel differs from every Kaohsiung vowel.",
      ),
    ],
    [
      ["Group", "Min"],
      ["Branch", "Southern Min"],
      ["Cluster", "Tsuan-Chiang"],
      ["Entry type", "Locality reference"],
      ["English name", "Tainan"],
      ["Name convention", "Tâi-lâm — MOE Tâi-lô place name"],
      ["Dictionary reference", "臺南混合腔 — Tainan mixed reference"],
      ["Map anchor", "Tainan urban center; not a dialect boundary"],
    ],
    [S.tainanName, S.taiwanBox],
  ),
  kaohsiung: article(
    "Ko-hiông",
    "Hokkien in Ko-hiông: everyday words and place names from the city’s streets and stations.",
    [
      section(
        "Everyday words",
        "The Ministry’s dictionary labels its Kaohsiung column as a mixed reference variety. Tainan has a separate mixed column: the entry for 箱, a box, records different colloquial readings for the two localities. For lunchbox vocabulary, the Kaohsiung column lists 便當篋仔 and 飯篋仔. The comparison table also includes different choices elsewhere, showing that local comparison involves word choice as well as pronunciation.",
      ),
      section(
        "Around the city",
        "The Ministry’s Kaohsiung Red Line appendix records Ko-hiông in the names of the railway station and international airport. It also supplies local readings for stations including 美麗島 and 左營. These place-name entries provide a practical companion to everyday vocabulary: they identify particular destinations and preserve the dictionary’s own spelling convention. The map marker here locates the urban reference, rather than the full extent of the municipality or a uniform accent area.",
      ),
    ],
    [
      ["Group", "Min"],
      ["Branch", "Southern Min"],
      ["Cluster", "Tsuan-Chiang"],
      ["Entry type", "Locality reference"],
      ["English name", "Kaohsiung"],
      ["Name convention", "Ko-hiông — MOE Tâi-lô place name"],
      ["Dictionary reference", "高雄混合腔 — Kaohsiung mixed reference"],
      ["Map anchor", "Kaohsiung urban center; not a dialect boundary"],
    ],
    [S.kaohsiungNames, S.taiwanBox, S.taiwanLunchbox],
  ),
  yilan: article(
    "Gî-lân",
    "Hokkien in Gî-lân, represented by a Zhangzhou-leaning reading in the Ministry of Education dictionary.",
    [
      section(
        "The Yilan reference",
        "The Ministry’s place-name entries record Gî-lân and distinguish the city and county names with their administrative endings. Its pronunciation tables label the Yilan reference as Zhangzhou-leaning. This map selects the city center as a locality anchor; the dictionary’s regional label is retained in the reference notes rather than treated as a boundary around all local speakers.",
      ),
      section(
        "An everyday comparison: cooked rice",
        "In the entry for 飯, cooked rice, the Yilan column has a different recorded colloquial form from the Taipei, Tainan, and Kaohsiung columns. The dictionary keeps that comparison beside the meaning, examples for white rice and eating a meal, and a separate literary reading. A second entry, 飯包, lists 便當篋仔 for a lunchbox in its Yilan vocabulary column. Together these entries connect locality differences with ordinary food and meal vocabulary.",
      ),
    ],
    [
      ["Group", "Min"],
      ["Branch", "Southern Min"],
      ["Cluster", "Tsuan-Chiang"],
      ["Entry type", "Locality reference"],
      ["English name", "Yilan"],
      ["Name convention", "Gî-lân — MOE Tâi-lô place name"],
      [
        "Dictionary reference",
        "宜蘭偏漳腔 — Yilan Zhangzhou-leaning reference",
      ],
      ["Map anchor", "Yilan city center; not a dialect boundary"],
    ],
    [S.yilanName, S.taiwanRice, S.taiwanLunchbox],
  ),
  lukang: article(
    "Lo̍k-káng",
    "Hokkien in Lo̍k-káng, a township with a distinct Quanzhou-leaning dictionary reference.",
    [
      section(
        "Lukang as a named locality",
        "The Ministry’s place-name entry gives Lo̍k-káng-tìn for Lukang Township; Lo̍k-káng is the short place name used here. Its pronunciation tables identify Lukang as a Quanzhou-leaning reference. Sanxia and Taipei are separately labeled Quanzhou-leaning references, so the dictionary preserves each locality instead of combining them into a single Taiwan-wide accent.",
      ),
      section(
        "Shared features and local differences",
        "The entry for 殊 records the same form for Lukang and Sanxia, while the Taipei column differs. In the entry for 飯, cooked rice, Lukang and Sanxia have different recorded readings. These two examples show why a shared broad reference label does not predict agreement on every word. The individual locality columns provide the evidence for each comparison, with the word’s meaning and reading context alongside it.",
      ),
    ],
    [
      ["Group", "Min"],
      ["Branch", "Southern Min"],
      ["Cluster", "Tsuan-Chiang"],
      ["Entry type", "Locality reference"],
      ["English name", "Lukang"],
      ["Administrative unit", "Township"],
      ["Name convention", "Lo̍k-káng-tìn — MOE Tâi-lô; short name Lo̍k-káng"],
      [
        "Dictionary reference",
        "鹿港偏泉腔 — Lukang Quanzhou-leaning reference",
      ],
      ["Map anchor", "Lukang town center; not a dialect boundary"],
    ],
    [S.lukangName, S.taiwanShu, S.taiwanRice],
  ),
  sanxia: article(
    "Sam-kiap",
    "Hokkien in Sam-kiap, a district of New Taipei with its own Quanzhou-leaning dictionary reference.",
    [
      section(
        "A separate New Taipei locality",
        "The Ministry’s administrative-name appendix records Sam-kiap-khu for Sanxia District in New Taipei. Sam-kiap is the short place label here. The dictionary’s Sanxia reference appears separately from its Taipei reference even though both are labeled Quanzhou-leaning. For the character 殊, Sanxia shares the recorded Lukang form while the Taipei form differs, providing a specific comparison within that broad label.",
      ),
      section(
        "Local lunchbox vocabulary",
        "The entry for 飯包 compares words for a lunchbox across localities. It lists 飯包 in the Sanxia column and 便當盒仔 in the Taipei column; Yilan has 便當篋仔. The entry’s meaning and meal-related example make this a useful everyday vocabulary comparison. These are the dictionary’s selected local forms, with Sanxia retained as its own reference rather than folded into the neighboring Taipei entry.",
      ),
    ],
    [
      ["Group", "Min"],
      ["Branch", "Southern Min"],
      ["Cluster", "Tsuan-Chiang"],
      ["Entry type", "Locality reference"],
      ["English name", "Sanxia"],
      ["Administrative unit", "District of New Taipei"],
      ["Name convention", "Sam-kiap-khu — MOE Tâi-lô; short name Sam-kiap"],
      [
        "Dictionary reference",
        "三峽偏泉腔 — Sanxia Quanzhou-leaning reference",
      ],
      ["Map anchor", "Sanxia district center; not a dialect boundary"],
    ],
    [S.sanxiaName, S.taiwanShu, S.taiwanLunchbox],
  ),
  singapore: article(
    "Sin-ka-pho",
    "Hokkien in Sin-ka-pho, shaped by southern Fujian accents and contact with Malay, English, and Cantonese.",
    [
      section(
        "What Hokkien means in Singapore",
        "Hokkien is the customary local name for this Southern Min community language. Linguist Luo Futeng’s account for the Singapore Chinese Cultural Centre connects Singapore Hokkien with migration from Quanzhou, Zhangzhou, and Xiamen, and describes the blending of features from those accents. The local name refers to this language community, rather than to every language spoken in Fujian. Singapore Hokkien has connections with several Fujian varieties instead of a single urban accent.",
      ),
      section(
        "A local multilingual vocabulary",
        "Singapore Hokkien has developed in contact with Malay, English, and Cantonese, and Luo’s account documents words borrowed from all three. Hokkien has also contributed expressions to Singapore Mandarin. Its influence appears in local geography: Lim Chu Kang, Yio Chu Kang, and Choa Chu Kang contain an element meaning house. These place names offer familiar examples of Hokkien’s presence in Singapore’s multilingual environment.",
      ),
      section(
        "Community institutions and learning",
        "The National Library Board traces Hokkien community connections around the Singapore River and Telok Ayer, including the social and religious role of Thian Hock Keng. The Singapore Hokkien Huay Kuan Cultural Academy offers a conversational course centered on speaking and listening for family and community settings.",
        "For recorded speech, the National Archives of Singapore catalogues Hokkien oral histories, including Koh Teong Koo’s interview in the Chinese Dialect Groups collection. Its record provides interview and language metadata, with recording access governed by the archive’s conditions.",
      ),
    ],
    [
      ["Group", "Min"],
      ["Branch", "Southern Min"],
      ["Cluster", "Tsuan-Chiang"],
      ["Entry type", "Locality reference"],
      ["English name", "Singapore"],
      ["Name source", "Sin-ka-pho — Taigi educational word list"],
      ["Map anchor", "Singapore — city reference, not a dialect boundary"],
      ["Documented contact", "Malay · English · Cantonese"],
    ],
    [
      S.singaporeHokkien,
      S.singaporeCommunity,
      S.singaporeCourse,
      S.singaporeOralHistory,
      S.singaporeName,
    ],
  ),
  "george-town": article(
    "Pho Te",
    "Hokkien in Pho Te, George Town on Penang Island, within the wider Penang Hokkien community.",
    [
      section(
        "George Town and Penang Hokkien",
        "George Town is on Penang Island; the wider state also includes mainland communities. Penang Hokkien research supplies the regional context for this city page. Ông Kuì-lân’s fieldwork compares Penang speech with Zhangzhou, Longhai, Tong’an, Xiamen, and Quanzhou, identifying Zhangzhou-related features alongside local developments. The study also documents Malay and English loanwords. These findings describe Penang Hokkien rather than establishing a single accent used by every George Town speaker.",
      ),
      section(
        "Two dictionary approaches",
        "The online Penang Hokkien Dictionary is an independent community resource using Taiji Romanisation. Its search accepts several input languages and spelling systems; selecting the input mode helps locate entries. English, Malay, and Chinese explanations connect local expressions with their meanings.",
        "Luc de Gijzel’s Speak Hokkien! Penang Hokkien Dictionary & Phrasebook is a separate resource whose publisher describes a spelling system based on Pe̍h-ōe-jī. Its practical topics include family, time, and health. These resources use different spelling conventions, so matching letters alone is insufficient for a pronunciation comparison.",
      ),
      section(
        "Language in the city’s streets",
        "Penang’s official tourism brochure describes a sculpture on Transfer Road that uses a local Hokkien–Malay expression for covered five-foot walkways. It also records a Hokkien and Cantonese name for Lebuh Acheh referring to a prominent tall building. These examples connect language with particular George Town streets and with the public artworks that document residents’ stories.",
      ),
    ],
    [
      ["Group", "Min"],
      ["Branch", "Southern Min"],
      ["Cluster", "Tsuan-Chiang"],
      ["Entry type", "Locality reference"],
      ["English name", "George Town"],
      [
        "Name source",
        "Pho3 Te4 — Taiji Romanisation; Pho Te omits the source’s tone-category digits",
      ],
      ["Map anchor", "George Town — city reference, not a dialect boundary"],
      ["Country", "Malaysia"],
    ],
    [
      S.penangFieldwork,
      S.penangDictionary,
      S.penangPhrasebook,
      S.georgeTownStreets,
      S.georgeTownName,
    ],
  ),
  fuzhou: article(
    "Fuzhou",
    "Eastern Min in Fuzhou, where phrase structure helps shape pronunciation.",
    [
      section(
        "Eastern Min, not Southern Min",
        "Fuzhou is the selected locality for Eastern Min. This is a separate branch from the Southern Min route through Xiamen. The distinction is basic to the atlas: a common provincial setting does not make the local vocabularies or sound systems interchangeable.",
      ),
      section(
        "Syllables interact",
        "Fuzhou research investigates final glottal stops and their behavior in stronger and weaker positions. Other work examines how verb–object structures relate to tone-sandhi domains. Together these studies show that identifying a syllable in isolation is not enough to predict every connected-speech realization.",
      ),
      section(
        "What a useful example records",
        "A Fuzhou phrase should preserve its grammatical grouping, source, and transcription convention. The current Southern Min letter cannot supply those details for Eastern Min. This page therefore gives an evidence-based introduction without manufacturing a parallel letter or pronunciation. When local examples are added, they should make the relationship between citation forms and actual phrase-level forms visible.",
      ),
    ],
    [
      ["Group", "Min"],
      ["Branch", "Eastern Min"],
      ["Catalogue label", "Min Dong"],
    ],
    [S.easternMin, S.fuzhou, S.fuzhouSyntax],
  ),
  jianou: article(
    "Jian’ou",
    "Northern Min in Jian’ou, with syllable endings documented in comparative research.",
    [
      section(
        "The northern Fujian point",
        "Jian’ou represents Northern Min in this edition. Research places it in comparisons with other Northern Min varieties, including Jianyang, and examines how rhyme systems correspond. A local description is therefore both valuable in itself and one part of a larger comparative dataset.",
      ),
      section(
        "Endings and overlapping systems",
        "Studies of Jian’ou discuss competing rhyme systems and the development of earlier syllable endings. This cautions against assuming that a single neat modern table captures every reading layer. Related words may preserve evidence in different parts of the system, so character identity alone does not settle pronunciation.",
      ),
      section(
        "A different Min comparison",
        "Compare Jian’ou with coastal Xiamen or with Central Min Yong’an to see why “Min pronunciation” is too broad a label. The site has no reviewed Jian’ou letter or word recordings yet; the linked research supplies the basis for further study without borrowing unverified forms from a neighboring branch.",
      ),
    ],
    [
      ["Group", "Min"],
      ["Branch", "Northern Min"],
      ["Research focus", "Rhyme systems"],
    ],
    [S.minNorth, S.jianou],
  ),
  putian: article(
    "Putian",
    "Puxian Min in Putian, on the Fujian coast.",
    [
      section(
        "Putian and Puxian",
        "Putian appears under Puxian Min, the branch associated with Putian and Xianyou. It is kept separate from the Southern Min and Eastern Min entries. The map describes this selected classification rather than deciding linguistic relationships by drawing a line between adjacent cities.",
      ),
      section(
        "How relationships are argued",
        "Comparative research considers Putian and Xianyou alongside Yongchun and Fuqing, using several kinds of sound evidence. One analysis connects Puxian more closely with Eastern Min than Southern Min. This is an argument based on correspondences, not a claim that Putian is simply Fuzhou speech or a blend of two neighbors.",
      ),
      section(
        "What the page can establish",
        "The sources support an introduction to Putian’s classification and sound history. There is no reviewed Putian letter or pronunciation course here yet; the Amoy letter belongs to a different Min branch.",
      ),
    ],
    [
      ["Group", "Min"],
      ["Branch", "Puxian"],
      ["Related locality", "Xianyou"],
    ],
    [S.minIntro, S.minPuxian],
  ),
  yongan: article(
    "Yong’an",
    "Central Min in Yong’an, with distinctive developments in syllable endings.",
    [
      section(
        "A separate inland branch",
        "Yong’an is the mapped locality for Central Min. It should not be folded into Northern Min merely because both lie away from the familiar southern coastal reference points. The branch label records a linguistic classification, while the coordinate supplies geographic orientation.",
      ),
      section(
        "Nasal endings as evidence",
        "Comparative Min research describes distinctive developments of nasal endings in Yong’an. Its patterns differ from those documented for Jian’ou and coastal varieties. This illustrates how a modest-looking part of a syllable can become important evidence: the end of a word may preserve or reorganize distinctions that other varieties handle differently.",
      ),
      section(
        "A bounded introduction",
        "Historical sound correspondences do not supply a complete modern Yong’an word list. The Amoy letter and other Min tone charts describe their own localities, not Yong’an.",
      ),
    ],
    [
      ["Group", "Min"],
      ["Branch", "Central Min"],
      ["Research focus", "Nasal endings"],
    ],
    [S.minIntro, S.minCodas],
  ),
  guangzhou: article(
    "Guangzhou Cantonese",
    "Cantonese in Guangzhou, within the Guangfu branch of Yue.",
    [
      section(
        "Guangzhou within Yue",
        "Guangzhou is one of the atlas’s Guangfu localities. Cantonese associated with Guangzhou and Hong Kong is a major reference for Yue, but it does not stand for Taishan or Yulin. The local label is useful even when an English source uses Cantonese more broadly.",
      ),
      section(
        "Ends of syllables matter",
        "Cantonese phonetic descriptions include unreleased [p̚], [t̚], and [k̚] endings. Syllables closed by these stops are described as checked and are shorter than corresponding unchecked syllables in the cited tone literature. A tone count needs its convention explained because traditional categories and contrastive pitch analyses can organize this material differently.",
      ),
      section(
        "The letter and the written reference",
        "The Cantonese letter uses colloquial wording; the Standard Written Chinese letter uses a formal style. Their vocabulary and grammar differ. The Cantonese text awaits local-speaker review and is not a phonetic record of a Guangzhou speaker.",
      ),
    ],
    [
      ["Group", "Yue"],
      ["Branch", "Guangfu"],
      ["Letter status", "Contributor draft"],
    ],
    [S.yueAtlas, S.cantoneseTones, S.cantoneseWriting],
  ),
  "hong-kong": article(
    "Hong Kong Cantonese",
    "Cantonese in Hong Kong, with spoken and written forms distinct from Standard Written Chinese.",
    [
      section(
        "A shared regional route",
        "Hong Kong Cantonese belongs to the Guangfu path used here, alongside Guangzhou. The shared grouping does not establish that every choice of vocabulary, pronunciation, or register is identical in the two places. Local evidence should retain its label even when both sources use the name Cantonese.",
      ),
      section(
        "Speech and written forms",
        "Research on Cantonese and Standard Written Chinese treats differences in grammar and vocabulary as a real language-processing problem. A formal text is therefore not simply a transcript of everyday Cantonese with different character choices. The letter comparison offers an accessible way to notice this distinction before studying detailed phonology.",
      ),
      section(
        "Tones in documented speech",
        "Cantonese corpus work documents tone-bearing syllables and checked endings in actual speech. No reviewed Hong Kong recording or locally adapted letter is available here yet.",
      ),
    ],
    [
      ["Group", "Yue"],
      ["Branch", "Guangfu"],
      ["Comparison focus", "Speech and writing"],
    ],
    [S.yueAtlas, S.cantoneseWriting, S.cantoneseCorpus],
  ),
  taishan: article(
    "Taishan",
    "Siyi Yue in Taishan, related to Cantonese but not fully mutually intelligible with it.",
    [
      section(
        "Inside Siyi",
        "Taishan is the selected point for Siyi, a Yue grouping also associated with Enping, Kaiping, and Xinhui. Keeping its page distinct from Guangzhou makes the tree more than a list of alternative place names for the same language sample.",
      ),
      section(
        "A documented comparison",
        "Teresa Cheng’s study explicitly compares Taishan phonology with Cantonese. It describes structural and historical similarities while noting that the varieties are not entirely mutually intelligible. This combination matters: belonging to the same group does not guarantee that a listener understands an unfamiliar local conversation.",
      ),
      section(
        "What not to transfer automatically",
        "The linked study documents Taishan phonology within its local scope. A Guangzhou Cantonese word list or letter cannot establish a Taishan reading; no reviewed Taishan letter is available here yet.",
      ),
    ],
    [
      ["Group", "Yue"],
      ["Branch", "Siyi"],
      ["Research focus", "Comparison with Cantonese"],
    ],
    [S.yueAtlas, S.taishan],
  ),
  yulin: article(
    "Yulin",
    "Goulou Yue in southeastern Guangxi, with locally documented kinship vocabulary.",
    [
      section(
        "A Goulou reference",
        "Yulin represents the Goulou route in this edition. The cited kinship study narrows its local scope to Yuzhou and Fumian, an important reminder that a city name can cover a larger area than a particular linguistic dataset.",
      ),
      section(
        "Relationships expressed in words",
        "Research comparing Yulin and Cantonese examines kinship terminology: terms can encode generation, gender, relative position, and modes of address. This offers a different entry into linguistic diversity from a consonant chart. Related varieties can organize familiar social relationships with overlapping but non-identical vocabulary.",
      ),
      section(
        "Keep neighboring evidence separate",
        "Older comparative work discusses phonation in several inland Yue varieties, including Yulin, while focusing its detailed analysis on Cenxi. It would be misleading to turn every Cenxi observation into a Yulin fact. This page therefore retains both the regional connection and the limits of the available local evidence. The Guangfu letter is not presented as a Yulin sample.",
      ),
    ],
    [
      ["Group", "Yue"],
      ["Branch", "Goulou"],
      ["Study locality", "Yuzhou and Fumian"],
    ],
    [S.yueAtlas, S.yulin, S.yueVoicing],
  ),
  meixian: article(
    "Meixian Hakka",
    "Yue–Tai Hakka in Meixian, documented in detailed phonetic research.",
    [
      section(
        "A reference within Yue–Tai",
        "Meixian is the selected local point under Yue–Tai in this edition’s Hakka classification. It is also the intended reference for the contributed Hakka letter. Neither role makes it a universal standard for all Hakka communities or a substitute for Taiwanese Sixian and Hailu descriptions.",
      ),
      section(
        "A rich syllable ending system",
        "Acoustic and perceptual research describes Meixian vowels, tones, and final consonants [p], [t], [k], [m], [n], and [ŋ]. The coexistence of stop and nasal endings provides a useful comparison with Standard Mandarin. The full description also shows why a list of consonants alone cannot capture a local sound system.",
      ),
      section(
        "From text to pronunciation",
        "The letter’s wording and character choices remain contributor material awaiting review. Adding IPA requires choosing a locally supported reading and distinguishing isolated forms from connected speech. An official dictionary for another Hakka variety can be informative, but its readings must not be relabeled Meixian merely because the character or meaning matches.",
      ),
    ],
    [
      ["Group", "Hakka"],
      ["Branch", "Yue–Tai"],
      ["Letter reference", "Intended Meixian"],
    ],
    [S.hakkaAtlas, S.meixian, S.hakkaDictionary],
  ),
  haifeng: article(
    "Haifeng Hakka reference area",
    "Hakka communities in the Haifeng area, where Hakka and Min varieties are in contact.",
    [
      section(
        "What the map point means",
        "Haifeng appears under Hailu because the branch name is connected to Haifeng and Lufeng. It does not mean that all speech in Haifeng is Hakka, or that the plotted city center is the location of a documented speaker. Research describes Hakka communities in a wider area and extensive contact with neighboring Min varieties.",
      ),
      section(
        "A more precise local picture",
        "A National Central University report on Hailu origins discusses communities such as Pingdong in northeastern Haifeng and their connections with the Luhe area. Its evidence concerns those communities, not one uniform accent across Haifeng.",
      ),
      section(
        "Ancestral connection is not identity",
        "Taiwanese Hailu and mainland reference varieties require separate documentation. Their shared name cannot justify copying one pronunciation onto the other. This introductory page establishes the regional connection and its limits; it deliberately supplies no invented “Haifeng city” inventory or unreviewed local letter.",
      ),
    ],
    [
      ["Group", "Hakka"],
      ["Branch", "Hailu"],
      ["Point meaning", "Regional reference, not an exclusive city language"],
    ],
    [S.hailu, S.haifeng, S.luhe],
  ),
  lufeng: article(
    "Lufeng Hakka reference area",
    "Hakka communities in the Lufeng area, connected with the wider Hailu region.",
    [
      section(
        "A Hailu reference",
        "Lufeng is the second reference locality behind the Hailu name. The surrounding linguistic landscape is multilingual; a Hakka point on the map does not replace Southern Min communities or claim a uniform language throughout an administrative area.",
      ),
      section(
        "Three records need three labels",
        "Comparative research examines an older Lufeng document, field evidence from Guangdong, and Taiwanese Hailu. These records differ by period and locality; they do not describe one unchanged variety.",
      ),
      section(
        "Why Luhe also matters",
        "Research on Hailu frequently gives Luhe an important role as a reference area. The existing Lufeng pin is therefore an orientation point rather than a claim that all specialist data were collected at the city center. Local recordings and detailed inventories will need their actual community labels before they can be added responsibly.",
      ),
    ],
    [
      ["Group", "Hakka"],
      ["Branch", "Hailu"],
      ["Evidence focus", "Locality and documentary provenance"],
    ],
    [S.lufeng, S.luhe, S.hailu],
  ),
  changting: article(
    "Changting Hakka",
    "Tingzhou Hakka in western Fujian, with complex tone changes across syllable combinations.",
    [
      section(
        "The Tingzhou route",
        "Changting is the mapped reference for Tingzhou Hakka. Local research distinguishes the county-town and nearby speech it investigates rather than treating the entire wider region as one undifferentiated variety. It belongs alongside Meixian as a separate local entry.",
      ),
      section(
        "Combinations matter",
        "Lin’s study revisits Changting tone sandhi in two- and three-syllable combinations. The literature contains disagreements in both description and analysis, especially over the direction in which changes apply. A learner-facing account should therefore identify the source rather than present a single simplified table as uncontested.",
      ),
      section(
        "How to read this evidence",
        "A syllable’s pronunciation can depend on the whole sequence. The Meixian comparison letter does not establish Changting wording or sound; no reviewed Changting version is available here yet.",
      ),
    ],
    [
      ["Group", "Hakka"],
      ["Branch", "Tingzhou"],
      ["Research focus", "Two- and three-syllable sandhi"],
    ],
    [S.changting, S.changtingField],
  ),
  shanghai: article(
    "Shanghai Wu",
    "Taihu Wu in Shanghai, where tone sandhi shapes the pitch of whole words.",
    [
      section(
        "One local Wu voice",
        "Shanghai belongs to the Taihu path, with more detailed classifications placing it in the Su–Hu–Jia cluster. It is the intended reference for the project’s Wu letter. The term Shanghainese should not be stretched to cover Suzhou, Wenzhou, or every other Wu variety.",
      ),
      section(
        "Voice quality and word melody",
        "Descriptions of Shanghai connect historical consonant categories with contextual voicing and breathy voice. Tone sandhi also organizes pitch across syllables. Research on Shanghainese speech synthesis demonstrates why word segmentation matters: assembling isolated character readings can miss the relevant word-level pattern.",
      ),
      section(
        "A letter is not a recording",
        "The supplied character text introduces local wording but still awaits speaker review. It does not settle the precise voice quality, tonal domain, or spoken realization of each phrase. Those details need a documented performance and a stated IPA convention. This keeps the readable example useful without confusing it with a verified phonetic transcript.",
      ),
    ],
    [
      ["Group", "Wu"],
      ["Branch", "Taihu"],
      ["Further cluster", "Su–Hu–Jia"],
    ],
    [S.wuNorth, S.shanghai, S.shanghaiTts],
  ),
  suzhou: article(
    "Suzhou Wu",
    "Taihu Wu in Suzhou, with vowels that can carry audible frication.",
    [
      section(
        "A neighbor, not a duplicate",
        "Suzhou and Shanghai share the Taihu route and are connected more closely within the Su–Hu–Jia cluster. Their separate points matter because a regional relationship does not make their phonetic descriptions identical. A Shanghai example should keep its label when used for comparison.",
      ),
      section(
        "Vowels with audible friction",
        "Acoustic and articulatory research investigates fricative vowels in Suzhou. The work examines how tongue configuration contributes to a vowel quality with friction, bringing together what a listener hears and how the sound is produced. This is a useful reminder that vowel systems contain more than the few familiar vowel letters of English.",
      ),
      section(
        "Describe before respelling",
        "An IPA transcription of these vowels needs the Suzhou source’s conventions and speaker context. The Shanghai letter supplies neither a Suzhou vowel inventory nor a local pronunciation sample.",
      ),
    ],
    [
      ["Group", "Wu"],
      ["Branch", "Taihu"],
      ["Research focus", "Fricative vowels"],
    ],
    [S.wuNorth, S.suzhou, S.suzhouStudy],
  ),
  wenzhou: article(
    "Wenzhou Wu",
    "Oujiang Wu in Wenzhou, with contrasts in pitch, voice quality, and word-level tone patterns.",
    [
      section(
        "Beyond the Shanghai reference",
        "Wenzhou is the atlas’s selected Oujiang locality. Its position within Wu does not mean Shanghai tone rules or consonant descriptions can be transferred without checking. It provides a southern comparison with its own substantial research literature.",
      ),
      section(
        "More than a pitch contour",
        "Perception research examines the role of phonation alongside pitch in Wenzhou tonal distinctions. Work on sentence planning and tone sandhi also investigates how lexical combinations and larger phrasing affect spoken pitch. These are interacting dimensions, not reasons to reduce the system to one memorized contour for each character.",
      ),
      section(
        "Speakers are part of the evidence",
        "Rose’s study compares two speakers and finds differences in isolated tones and tone sandhi. These observations document variation between speakers, not one fixed pronunciation shared by all of Wenzhou.",
      ),
    ],
    [
      ["Group", "Wu"],
      ["Branch", "Oujiang"],
      ["Research focus", "Phonation and tonal context"],
    ],
    [S.wenzhou, S.wenzhouPerception, S.wenzhouSyntax],
  ),
  lishui: article(
    "Lishui Wu",
    "Chuqu Wu in Lishui, with locally distinctive consonant contrasts and tone sandhi.",
    [
      section(
        "A locally grounded Wu entry",
        "Lishui is the selected Chuqu point. The recent acoustic study identifies its focus with speech in Liandu, the main urban area. That scope is narrower than every community within the administrative city, and the distinction should remain visible when recordings are added.",
      ),
      section(
        "A useful exception",
        "Steed’s descriptive work reports that Lishui lacks the diagnostic three-way stop distinction often associated with Wu and describes a right-focused tone-sandhi system. This makes the locality a valuable check on broad labels: a group can contain varieties that differ in precisely the feature most often used to introduce it.",
      ),
      section(
        "Variation across generations",
        "Later acoustic research finds differences between younger and older speakers in how sandhi relates to citation tones. The findings document variation among the studied speakers; they are not a complete historical reconstruction.",
      ),
    ],
    [
      ["Group", "Wu"],
      ["Branch", "Chuqu"],
      ["Study locality", "Liandu"],
    ],
    [S.lishui, S.lishuiChange],
  ),
};
