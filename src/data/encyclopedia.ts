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
  minGuide: source(
    "Academia Sinica: Min database guide",
    "https://xiaoxue.iis.sinica.edu.tw/Minyu/Content/Files/minyu-Get_Started.pdf",
  ),
  minIntro: source(
    "Hsiao: The Sound Patterns of Taiwanese Southern Min, introduction",
    "https://assets.cambridge.org/97810096/54272/excerpt/9781009654272_excerpt.pdf",
  ),
  minCodas: source(
    "Wu and Lin: Historical analysis of Min consonant endings",
    "https://www.ling.sinica.edu.tw/upload/researcher_manager_result/80f9788d396d35b0e8c32ebd19416ac5.pdf",
  ),
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
    "https://www.cuhk.edu.hk/journal/jcl/jcl/chin_lin/1/1_2_5.html",
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
    "A large regional group, a widely learned standard, and many local ways of speaking: three things worth keeping separate.",
    [
      section(
        "A group larger than its standard",
        "Mandarin names a broad part of the Sinitic landscape, extending across northern China and far into the southwest. It also appears in the name Standard Mandarin, the standardized variety familiar from many classrooms. Those meanings overlap, but they are not interchangeable. A local speaker in Chengdu or Nanjing does not simply reproduce the pronunciation and vocabulary of a standard-language lesson.",
        "HanLingo therefore gives the standard its own role in comparison while organizing the atlas around regional groupings and localities. Beijing, Jinan, Nanjing, and Chengdu introduce four different routes through Mandarin.",
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
        "Our Mandarin letter is written in colloquial Standard Mandarin. It belongs beside the formal written version as a comparison of wording and register, but it is not evidence for local Beijing or Chengdu speech. Modern Standard Written Chinese is closely associated with Mandarin-based vernacular writing; its use by speakers of other groups does not make their everyday languages identical.",
        "For a deeper comparison, follow a locality page first, then ask which speaker, context, and transcription a pronunciation represents. That sequence keeps an accessible overview connected to precise evidence.",
      ),
    ],
    [
      ["Family branch", "Sinitic"],
      ["Selected subgroups", "Beijing · Ji–Lu · Jianghuai · Southwestern"],
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
    "Fujian is a starting place, not a single sound system. Min opens into several branches with sharply different local histories and structures.",
    [
      section(
        "Begin with more than Southern Min",
        "Min is a diverse Sinitic grouping associated especially with Fujian, with communities extending into neighboring regions, Taiwan, and overseas. Southern Min is one major part of this landscape. Eastern Min, Northern Min, Central Min, and Puxian also deserve their own entries. Treating a Xiamen example as the pronunciation of every Min variety would hide the central fact this atlas is designed to show.",
        "Our five selected Min branches are an introduction. Other classifications add or rearrange divisions, so the navigation does not claim to settle the complete family tree.",
      ),
      section(
        "Why one extra level matters",
        "The route to Xiamen passes through Southern Min and the Quanzhang cluster. Quanzhou and Zhangzhou belong in that same cluster, but retain local identities. Academia Sinica’s database separates a broad region, a cluster, and an individual survey point. That distinction makes a useful editorial rule: keep the intermediate level when it carries information, instead of forcing every branch into the same four boxes.",
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
        "The letter in this edition is intended as a Xiamen Southern Min example and remains a contributor draft awaiting local review. It is a readable entry point, not a standardized text for the entire group. Its character choices and phrasing need to be assessed alongside the intended variety.",
        "Explore Xiamen, Quanzhou, and Zhangzhou together, then move to Fuzhou, Putian, Jian’ou, or Yong’an. The comparison broadens from variation within a cluster to differences between branches. Geography helps organize that journey without pretending that a provincial boundary is a language boundary.",
      ),
    ],
    [
      ["Selected branches", "Southern · Eastern · Northern · Puxian · Central"],
      ["Featured path", "Min → Southern Min → Quanzhang → Xiamen"],
      ["Letter reference", "Intended Xiamen Southern Min"],
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
    "Cantonese is a powerful introduction to Yue. Taishan and inland Guangxi reveal why the wider group needs more than one reference voice.",
    [
      section(
        "Cantonese within a wider group",
        "Yue includes Cantonese as associated with Guangzhou and Hong Kong, as well as regional varieties that should not be collapsed into that familiar reference. Our atlas selects Guangfu, Siyi, and Goulou. These paths connect the Pearl River region with Taishan and with Yulin in southeastern Guangxi, making internal diversity visible before detailed pronunciation is introduced.",
        "The word Cantonese is sometimes used broadly in source literature. On HanLingo, a precise locality or a clearly identified broader group takes priority over assuming that every use of the English name has the same scope.",
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
        "Written Cantonese and Modern Standard Written Chinese differ in vocabulary and grammar. This makes the letter comparison more than an exercise in reading shared characters with different pronunciations. Look at the pronouns, everyday verbs, and grammatical words: wording belongs to the variety and register being represented.",
        "Our Guangfu letter is a contributor sample awaiting review. It is not a Taishan or Yulin letter, and its accessible character text does not substitute for a verified local recording.",
      ),
      section(
        "How to read the map",
        "A point at Guangzhou or Hong Kong names a reference locality, not a boundary around everyone who speaks Cantonese. The same caution matters even more when an inland variety is represented by one city. Begin with the subgroup, read the locality’s evidence, and compare like with like. This preserves the connection between the broad Yue label and the specific speech being described.",
      ),
    ],
    [
      ["Selected subgroups", "Guangfu · Siyi · Goulou"],
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
    "A language group connected across dispersed communities, with Meixian, Hailu, and Tingzhou offering distinct places to begin.",
    [
      section(
        "Communities across regions",
        "Hakka is spoken in communities across southern China, Taiwan, and overseas. Concentrations in Guangdong, western Fujian, and southern Jiangxi help orient the map, but a single continuous colored territory would be a poor description of this distribution. HanLingo instead connects selected localities through named regional groupings.",
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
      ["Selected subgroups", "Yue–Tai · Hailu · Tingzhou"],
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
    "From the lower Yangtze to southern Zhejiang, Wu shows how consonants, voice quality, and a word’s melody work together.",
    [
      section(
        "Shanghai is one starting point",
        "Wu is associated with Shanghai, southern Jiangsu, Zhejiang, and neighboring areas. Shanghainese is a prominent local example, but the group also includes Suzhou, Wenzhou, Lishui, and many other varieties. The first task is therefore to distinguish the group from its most familiar city name.",
        "HanLingo follows three selected regional routes: Taihu in the north, Oujiang around Wenzhou, and Chuqu inland. They are an introductory selection, not a complete inventory of Wu subgroups.",
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
        "Read the Shanghai letter alongside the formal written reference, then explore the other Wu entries as their own varieties. This keeps a shared writing tradition visible while leaving room for the substantial spoken differences that the map introduces.",
      ),
    ],
    [
      ["Selected subgroups", "Taihu · Oujiang · Chuqu"],
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
    "A northern regional grouping whose best-known locality must still be distinguished from the national standard.",
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
    "A northern Mandarin route through parts of Hebei and Shandong, represented by Jinan.",
    [
      section(
        "A regional classification",
        "Ji–Lu is one of the Mandarin groupings recognized in the classification followed here. Jinan, in Shandong, is our selected reference point. It belongs alongside other Mandarin regions rather than underneath local Beijing speech. The regional label provides a relationship, not a claim that every town uses the same tones or vocabulary.",
      ),
      section(
        "Why Jinan is informative",
        "Research on Jinan tone sandhi examines a process sensitive to the position of a syllable in a sequence. This gives the subgroup page a concrete question: how does a local variety organize tones once words are combined? Consult the locality page before applying a familiar Standard Mandarin rule. The study supports a specific Jinan pattern, not an identical rule throughout Ji–Lu.",
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
    "A lower Yangtze grouping that broadens what Mandarin can mean.",
    [
      section(
        "The lower Yangtze route",
        "Jianghuai includes local varieties associated with Nanjing, Yangzhou, and Hefei. Nanjing is the mapped example in this edition; Yangzhou appears in the wider place listing. The subgroup is useful precisely because it prevents Mandarin from being equated with the speech of Beijing or with one standardized pronunciation.",
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
    "A wide Mandarin region with Chengdu as the first local reference.",
    [
      section(
        "A broad grouping",
        "Southwestern Mandarin includes the Chengdu and Chongqing varieties and extends well beyond either city. Chengdu is the selected map point, not a substitute for the whole southwest. The route deliberately stops at a useful level of detail; specialized classifications may insert additional regional clusters between the subgroup and an individual locality.",
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
    "A major Min branch with Quanzhang as one important cluster, not its entire extent.",
    [
      section(
        "The Quanzhang connection",
        "Quanzhou, Zhangzhou, and Xiamen form the atlas’s three Southern Min reference points. They sit within the Quanzhang cluster, which is why their paths include an extra classification level. Southern Min extends beyond this cluster, including varieties in other regions; the three points are a focused starting set rather than its complete geography.",
      ),
      section(
        "Readings and connected speech",
        "Literary and colloquial readings are an important part of Southern Min comparison. Tone sandhi adds another layer when syllables combine. Xiamen research connects sandhi domains to syntax, while Zhangzhou research examines suffixation and tonal behavior. A shared branch label does not remove these local differences. Our contributed letter targets Xiamen and must not silently become a Quanzhou or Zhangzhou transcription.",
      ),
    ],
    [
      ["Group", "Min"],
      ["Selected cluster", "Quanzhang"],
      ["Mapped localities", "Xiamen · Quanzhou · Zhangzhou"],
    ],
    [S.minIntro, S.minGuide, S.xiamen, S.zhangzhou],
  ),
  "min/eastern-min": article(
    "Eastern Min",
    "Fuzhou opens a separate branch of Min, with its own organization of syllables and phrases.",
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
    "An inland Min branch introduced through Jian’ou and comparative rhyme research.",
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
    "A branch associated with Putian and Xianyou, whose position illuminates the difference between geography and genealogy.",
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
    "An inland branch where Yong’an offers a revealing comparison of syllable endings.",
    [
      section(
        "An inland reference",
        "Central Min is one of the branches selected for the initial Min overview. Yong’an is its current local example. Keeping it separate from Northern Min makes the map more informative: the inland location of two communities does not mean their sound systems or subgroup membership are identical.",
      ),
      section(
        "A concrete comparison",
        "Comparative work on Min codas describes a distinctive pattern in Yong’an, where nasal endings developed differently from those in Jian’ou and coastal examples. The study uses these differences to investigate earlier forms. For the present-day atlas, the lesson is to preserve local details before drawing a generalization. A future sound table should identify the source, reading layer, and attested variety rather than filling its cells from another Min branch.",
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
    "The Yue route connecting Guangzhou and Hong Kong Cantonese.",
    [
      section(
        "A familiar reference area",
        "The Guangfu grouping includes Guangzhou, Hong Kong, and Macau in the cited Language Atlas discussion. Guangzhou and Hong Kong are the two mapped examples here. Their prominence makes Cantonese an accessible starting point, but it should not erase the distinction between Guangfu and other Yue groupings such as Siyi or Goulou.",
      ),
      section(
        "Speech, tones, and writing",
        "Cantonese research documents unreleased final stops, checked syllables, and lexical tone contrasts. Written Cantonese also has vocabulary and grammar that differ from Modern Standard Written Chinese. Those two observations belong together: a local written text is not simply the formal written language pronounced differently. The contributor letter is labeled Guangfu Cantonese and remains open to review; it does not establish identical usage in every Guangfu locality.",
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
    "A Yue subgroup in which Taishan is a distinct voice, not a spelling variant of Guangzhou Cantonese.",
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
    "An inland Yue route that brings southeastern Guangxi into the comparison.",
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
    "A classification label linking part of Guangdong’s Hakka landscape with varieties in Taiwan.",
    [
      section(
        "What the name does",
        "Yue–Tai is a Hakka subgroup label in the classification used here. Meixian is its selected locality. The name should not be read as the unrelated Yue language group plus a second language: here Yue refers to Guangdong within a regional Hakka classification. Other schemes draw some of the internal boundaries differently.",
      ),
      section(
        "A reference is not a universal standard",
        "Meixian research supplies detailed phonetic evidence, while Taiwan’s official resources distinguish named varieties such as Sixian and Hailu. Their coexistence is a reason to preserve precise labels, not to merge all dictionary readings into one chart. Follow Meixian for the current letter comparison; consult variety-specific Taiwanese resources on their own terms when broadening the project.",
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
    "A name connecting Haifeng and Lufeng, with a more complex modern geography than two city pins suggest.",
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
    "A western Fujian Hakka grouping introduced through Changting.",
    [
      section(
        "A regional route",
        "Tingzhou is one of the Hakka regional groupings used in the cited atlas scheme. Changting is the selected point. The region should not be confused with a single uniform accent, nor should Meixian be used to fill in pronunciation simply because both entries belong to Hakka.",
      ),
      section(
        "Tone sandhi as a local question",
        "Changting has a substantial research literature on how tones change in combinations of two and three syllables. Descriptions and theoretical analyses have not always agreed, and later work revisits the data. This makes Tingzhou a useful route for learning how linguistic evidence develops. Begin with the locality and study conditions, then compare the proposed patterns; a compact subgroup label cannot replace that detailed work.",
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
    "A southern Wu route centered on the Wenzhou reference area.",
    [
      section(
        "A distinct Wu setting",
        "Oujiang is the regional grouping associated here with Wenzhou and the Ou River area. It sits beside Taihu and Chuqu in this introductory scheme. A Wenzhou reference is useful because it extends the comparison beyond the better-known Shanghai area and makes the diversity within Wu immediately visible.",
      ),
      section(
        "Melody, duration, and voice",
        "Research on Wenzhou examines complex tone sandhi, speaker differences, and the contribution of phonation to tonal perception. These are related dimensions rather than interchangeable explanations. Read the locality page for the evidence behind each claim. A tonal pattern reported for one combination or speaker should not be converted into a universal rule for every Oujiang community; the subgroup name supplies orientation, not a complete phonological description.",
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
    "An inland Wu grouping represented by Lishui, where familiar generalizations need careful checking.",
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
  "beijing-city": article(
    "Beijing Mandarin",
    "Local Beijing speech belongs in the atlas alongside, not underneath, the standardized Mandarin reference.",
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
      ["Subgroup", "Beijing"],
      ["Reference type", "Local variety"],
    ],
    [S.classification, S.standard, S.mandarinSandhi],
  ),
  jinan: article(
    "Jinan",
    "A Ji–Lu Mandarin reference whose tone patterns deserve to be studied on their own terms.",
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
      ["Subgroup", "Ji–Lu"],
      ["Study focus", "Position-sensitive tone sandhi"],
    ],
    [S.classification, S.jinan],
  ),
  nanjing: article(
    "Nanjing",
    "A present-day Jianghuai variety, distinct from historical uses of the name Nanjing Mandarin.",
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
        "Research on Ming-period Nanjing Mandarin discusses a flexible prestige system with more than one regional source. That historical term cannot be equated automatically with today’s urban speech. HanLingo keeps the present-day locality primary and uses this history only to explain why similarly named records may document different things.",
      ),
    ],
    [
      ["Group", "Mandarin"],
      ["Subgroup", "Jianghuai"],
      ["Regional setting", "Lower Yangtze"],
    ],
    [S.classification, S.nanjing, S.nanjingHistory],
  ),
  chengdu: article(
    "Chengdu",
    "The Southwestern Mandarin point that makes a broad regional label concrete.",
    [
      section(
        "Within Southwestern Mandarin",
        "Chengdu is a local variety within Southwestern Mandarin, not a subgroup at the same level as Southwestern itself. The site shortens the route to Sinitic → Mandarin → Southwestern Mandarin → Chengdu. Specialist classifications may place further regional groupings in between.",
      ),
      section(
        "A city needs its own sound evidence",
        "Research on vowel raising in Chengdu investigates the behavior of particular vowels rather than inferring the city’s whole sound system from Standard Mandarin. The JIPA description of nearby Zhongjiang also compares Chengdu when discussing glide retention. Those are complementary sources: the Zhongjiang article is not a Chengdu phonological inventory, and its recordings should retain their own locality label.",
      ),
      section(
        "Comparing with the letter",
        "The project’s Mandarin letter is colloquial Standard Mandarin. Reading it alongside this page can prompt questions about local vocabulary and pronunciation, but it does not turn the letter into a Chengdu sample. A verified Chengdu version would require its own contributor and review.",
      ),
    ],
    [
      ["Group", "Mandarin"],
      ["Subgroup", "Southwestern"],
      ["Sound topic", "Vowels and glide patterns"],
    ],
    [S.chengdu, S.southwest],
  ),
  xiamen: article(
    "Xiamen",
    "A Southern Min locality reached through the Quanzhang cluster, and the intended reference for the Min letter.",
    [
      section(
        "Why the path has five steps",
        "Xiamen is a local variety, while Quanzhang is the cluster above it. Academia Sinica’s database explicitly separates Southern Min, Quanzhang, and Xiamen at different descriptive levels. Quanzhou and Zhangzhou provide nearby comparison points within the cluster; Southern Min extends beyond all three.",
      ),
      section(
        "A phrase is more than isolated readings",
        "Research on Xiamen tone sandhi asks how syntactic structure helps organize the domains in which tones change. This means a string of individually correct dictionary readings need not describe a naturally spoken phrase. A pronunciation record should distinguish citation forms from connected-speech forms and identify the intended wording.",
      ),
      section(
        "The contributed letter",
        "The Min letter targets Xiamen Southern Min, but its vocabulary, grammar, and character choices remain open to local-speaker review. It is useful as a shared-text comparison now; it is not yet a verified phonetic transcript. No unreviewed IPA or synthetic local voice is attached to it.",
      ),
    ],
    [
      ["Group", "Min"],
      ["Branch", "Southern Min"],
      ["Cluster", "Quanzhang"],
    ],
    [S.minGuide, S.minIntro, S.xiamen],
  ),
  quanzhou: article(
    "Quanzhou",
    "A Quanzhang locality where different reading layers make sound comparison especially revealing.",
    [
      section(
        "A local voice within Quanzhang",
        "Quanzhou appears beside Xiamen and Zhangzhou within the Quanzhang cluster of Southern Min. Sharing that cluster does not make the three names interchangeable. The atlas keeps separate points so that a word, recording, or pronunciation can retain its actual locality.",
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
      ["Cluster", "Quanzhang"],
    ],
    [S.minIntro, S.minCodas, S.minGuide],
  ),
  zhangzhou: article(
    "Zhangzhou",
    "A Southern Min locality where tone patterns interact with how words are formed.",
    [
      section(
        "The Quanzhang route",
        "Zhangzhou is one of the three mapped Quanzhang reference points, alongside Quanzhou and Xiamen. The cluster label helps locate related varieties without erasing their individual descriptions. It also avoids calling Quanzhang itself a single city dialect.",
      ),
      section(
        "Word formation and tone",
        "Research on Zhangzhou suffixation discusses a right-dominant tone-sandhi system: the right edge of a relevant domain has a different role from preceding syllables. The broader question is how adding material to a word changes its spoken form. This connects morphology, the structure of words, with phonology rather than treating tones as isolated decorations.",
      ),
      section(
        "Keep the source’s variety",
        "A study’s Zhangzhou data should not be expanded to every speaker across a prefecture, and the atlas does not supply a complete local inventory from one paper. Likewise, the project’s Xiamen letter is a neighboring comparison, not a verified Zhangzhou version. Local wording and readings remain necessary evidence.",
      ),
    ],
    [
      ["Group", "Min"],
      ["Branch", "Southern Min"],
      ["Study focus", "Suffixation and tone sandhi"],
    ],
    [S.minIntro, S.zhangzhou],
  ),
  fuzhou: article(
    "Fuzhou",
    "An Eastern Min reference where the shape of a phrase helps determine its pronunciation.",
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
    "A Northern Min locality whose rhyme system helps reveal relationships hidden by surface pronunciation.",
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
    "The mapped Puxian reference, a useful case for separating a neighboring location from a proven linguistic relationship.",
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
        "The current evidence supports a local introduction and an explanation of classification, not a complete modern Putian pronunciation course. A future sample must specify the particular speaker and reading context. The Xiamen letter remains a Southern Min reference and is not reused as though all Fujian varieties share its wording.",
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
    "A Central Min reference that makes inland diversity visible through syllable endings.",
    [
      section(
        "A separate inland branch",
        "Yong’an is the mapped locality for Central Min. It should not be folded into Northern Min merely because both lie away from the familiar southern coastal reference points. The subgroup label records a linguistic classification, while the coordinate supplies geographic orientation.",
      ),
      section(
        "Nasal endings as evidence",
        "Comparative Min research describes distinctive developments of nasal endings in Yong’an. Its patterns differ from those documented for Jian’ou and coastal varieties. This illustrates how a modest-looking part of a syllable can become important evidence: the end of a word may preserve or reorganize distinctions that other varieties handle differently.",
      ),
      section(
        "A bounded introduction",
        "The discussion here summarizes that comparative role without converting historical analysis into an invented modern word list. To add pronunciation, the project needs an attested local form, a defined reading, and a source. The nearby Min pages provide comparisons, but neither their tone charts nor the supplied Xiamen letter should be treated as Yong’an material.",
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
    "A Guangfu reference that connects a familiar Yue variety with a more precise account of speech and writing.",
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
        "The supplied Guangfu letter uses colloquial wording, while the formal version follows Modern Standard Written Chinese. Their difference is not just pronunciation. The sample remains awaiting local review and is not a phonetic record of one Guangzhou speaker. A future recording should make that speaker and context explicit.",
      ),
    ],
    [
      ["Group", "Yue"],
      ["Subgroup", "Guangfu"],
      ["Letter status", "Contributor draft"],
    ],
    [S.yueAtlas, S.cantoneseTones, S.cantoneseWriting],
  ),
  "hong-kong": article(
    "Hong Kong Cantonese",
    "A Guangfu locality where spoken language, colloquial writing, and formal writing can be compared without collapsing them.",
    [
      section(
        "A shared regional route",
        "Hong Kong Cantonese belongs to the Guangfu path used here, alongside Guangzhou. The shared grouping does not establish that every choice of vocabulary, pronunciation, or register is identical in the two places. Local evidence should retain its label even when both sources use the name Cantonese.",
      ),
      section(
        "Speech and written forms",
        "Research on Cantonese and Modern Standard Written Chinese treats differences in grammar and vocabulary as a real language-processing problem. A formal text is therefore not simply a transcript of everyday Cantonese with different character choices. The letter comparison offers an accessible way to notice this distinction before studying detailed phonology.",
      ),
      section(
        "Tones in documented speech",
        "Cantonese corpus work documents tone-bearing syllables and checked endings, offering material grounded in actual speech. The current project does not yet attach a reviewed Hong Kong recording or an independently adapted local letter. Our Guangfu sample is a starting comparison whose precise provenance remains stated, rather than an anonymous voice for every Cantonese community.",
      ),
    ],
    [
      ["Group", "Yue"],
      ["Subgroup", "Guangfu"],
      ["Comparison focus", "Speech and writing"],
    ],
    [S.yueAtlas, S.cantoneseWriting, S.cantoneseCorpus],
  ),
  taishan: article(
    "Taishan",
    "A Siyi Yue reference whose relationship to Cantonese includes resemblance and meaningful differences.",
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
        "A Cantonese word list can suggest a comparison, but it cannot certify a Taishan pronunciation. The project’s Guangfu letter therefore remains on its own locality route. A future Taishan text needs separate lexical and phonetic work, with the exact community specified. The study linked here provides a phonological foundation, not evidence that every part of the wider Taishan area speaks identically.",
      ),
    ],
    [
      ["Group", "Yue"],
      ["Subgroup", "Siyi"],
      ["Research focus", "Comparison with Cantonese"],
    ],
    [S.yueAtlas, S.taishan],
  ),
  yulin: article(
    "Yulin",
    "An inland Yue reference in southeastern Guangxi, with evidence extending beyond pronunciation into family vocabulary.",
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
      ["Subgroup", "Goulou"],
      ["Study locality", "Yuzhou and Fumian"],
    ],
    [S.yueAtlas, S.yulin, S.yueVoicing],
  ),
  meixian: article(
    "Meixian Hakka",
    "A well-studied reference for Hakka, valuable precisely when its local label is preserved.",
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
      ["Subgroup", "Yue–Tai"],
      ["Letter reference", "Intended Meixian"],
    ],
    [S.hakkaAtlas, S.meixian, S.hakkaDictionary],
  ),
  haifeng: article(
    "Haifeng Hakka reference area",
    "One half of the name Hailu, with a multilingual local setting that a single pin cannot fully represent.",
    [
      section(
        "What the map point means",
        "Haifeng appears under Hailu because the subgroup name is connected to Haifeng and Lufeng. It does not mean that all speech in Haifeng is Hakka, or that the plotted city center is the location of a documented speaker. Research describes Hakka communities in a wider area and extensive contact with neighboring Min varieties.",
      ),
      section(
        "A more precise local picture",
        "A National Central University report on Hailu origins discusses communities such as Pingdong in northeastern Haifeng and their connections with the Luhe area. This is more specific than assigning one uniform language to an administrative label. Such evidence can guide future additions at township or community level.",
      ),
      section(
        "Ancestral connection is not identity",
        "Taiwanese Hailu and mainland reference varieties require separate documentation. Their shared name cannot justify copying one pronunciation onto the other. This introductory page establishes the regional connection and its limits; it deliberately supplies no invented “Haifeng city” inventory or unreviewed local letter.",
      ),
    ],
    [
      ["Group", "Hakka"],
      ["Subgroup", "Hailu"],
      ["Point meaning", "Regional reference, not an exclusive city language"],
    ],
    [S.hailu, S.haifeng, S.luhe],
  ),
  lufeng: article(
    "Lufeng Hakka reference area",
    "A name connecting present communities, migration histories, and older documents that must each keep their own date and locality.",
    [
      section(
        "A Hailu reference",
        "Lufeng is the second reference locality behind the Hailu name. The surrounding linguistic landscape is multilingual; a Hakka point on the map does not replace Southern Min communities or claim a uniform language throughout an administrative area.",
      ),
      section(
        "Three records need three labels",
        "Comparative research considers an older Lufeng document, field evidence from Guangdong, and Taiwanese Hailu. It finds that these materials should not be treated as interchangeable records of one unchanged variety. That is a useful model for HanLingo’s future historical layer: date, locality, and source type must accompany the form.",
      ),
      section(
        "Why Luhe also matters",
        "Research on Hailu frequently gives Luhe an important role as a reference area. The existing Lufeng pin is therefore an orientation point rather than a claim that all specialist data were collected at the city center. Local recordings and detailed inventories will need their actual community labels before they can be added responsibly.",
      ),
    ],
    [
      ["Group", "Hakka"],
      ["Subgroup", "Hailu"],
      ["Evidence focus", "Locality and documentary provenance"],
    ],
    [S.lufeng, S.luhe, S.hailu],
  ),
  changting: article(
    "Changting Hakka",
    "A western Fujian variety whose intricate tone sandhi makes the limits of a single “Hakka pronunciation” clear.",
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
        "The important point is not that Changting is “more difficult” than another variety. It is that the pronunciation of a sequence can require knowledge of the whole pattern, and that fresh investigation can refine earlier accounts. The project’s Meixian letter does not establish Changting wording or sound; a local version would need its own contribution and review.",
      ),
    ],
    [
      ["Group", "Hakka"],
      ["Subgroup", "Tingzhou"],
      ["Research focus", "Two- and three-syllable sandhi"],
    ],
    [S.changting, S.changtingField],
  ),
  shanghai: article(
    "Shanghai Wu",
    "A Taihu locality where the melody of a word can matter as much as an isolated character’s tone.",
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
      ["Subgroup", "Taihu"],
      ["Further cluster", "Su–Hu–Jia"],
    ],
    [S.wuNorth, S.shanghai, S.shanghaiTts],
  ),
  suzhou: article(
    "Suzhou Wu",
    "A Taihu variety that opens a particularly concrete question: what can make a vowel sound fricative?",
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
        "A proposed romanization should follow those documented distinctions rather than assume that a familiar letter captures them automatically. HanLingo does not invent a Suzhou IPA inventory from the Shanghai letter. Future examples should retain the specific source, speaker, and transcription conventions used to describe these vowels.",
      ),
    ],
    [
      ["Group", "Wu"],
      ["Subgroup", "Taihu"],
      ["Research focus", "Fricative vowels"],
    ],
    [S.wuNorth, S.suzhou, S.suzhouStudy],
  ),
  wenzhou: article(
    "Wenzhou Wu",
    "An Oujiang reference where pitch, voice quality, and word structure all contribute to the sound pattern.",
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
        "Rose’s study compares two speakers and documents differences in both isolated tones and sandhi. A careful account therefore identifies whose speech and which context support a pattern. The present page introduces those findings without claiming a single timeless Wenzhou inventory or attaching the project’s Shanghai letter as though it were local Wenzhou speech.",
      ),
    ],
    [
      ["Group", "Wu"],
      ["Subgroup", "Oujiang"],
      ["Research focus", "Phonation and tonal context"],
    ],
    [S.wenzhou, S.wenzhouPerception, S.wenzhouSyntax],
  ),
  lishui: article(
    "Lishui Wu",
    "A Chuqu variety that challenges an overly tidy definition of what Wu should sound like.",
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
        "Later acoustic research compares younger and older speakers and finds differences in how sandhi relates to citation tones. The result is evidence of variation within a living variety, not a complete historical reconstruction. HanLingo keeps the dated study attached to the claim rather than treating one diagram as a permanent rule for all Lishui speakers.",
      ),
    ],
    [
      ["Group", "Wu"],
      ["Subgroup", "Chuqu"],
      ["Study locality", "Liandu"],
    ],
    [S.lishui, S.lishuiChange],
  ),
};
