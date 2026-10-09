import type { BranchLearning, LearningSource } from './types';
import { overseasMinSources as sources } from '../atlas/min-overseas';

const scccAudio = { title: 'SCCC · Talking Red Packet, 2021', url: 'https://singaporeccc.org.sg/events/sccc-talking-red-packet-2021/' };
const sibuVisitor = { title: 'Sarawak Tourism Board · Sibu visitor guide', url: 'https://sarawaktourism.com/v2/wp-content/uploads/2014/10/Sarawak-Visitor-Guide-Sibu.pdf' };
const sibuNames = { title: 'Local Chinese dialects and Sibu street names', url: 'https://jala.glocal-journals.link/wp-content/uploads/2023/01/4-1-3-Local-Chinese-Dialects-and-the-Toponymy-of-Chinese-Streets-in-Sibu.pdf' };
const perak = { title: 'Tourism Perak · West Coast heritage', url: 'https://www.tourismperakmalaysia.com/wp-content/uploads/2021/12/TRP-2005-0013_WestCoastExpressway_BrochureEng_300720.pdf' };
const binondo = { title: 'NHCP · Binondo Church historical marker', url: 'https://philhistoricsites.nhcp.gov.ph/registry_database/simbahan-ng-binondo/' };
const ahmami = { title: 'Ahmami · Philippine Hokkien pronunciation', url: 'https://www.ahmami.org/pronunciation.html' };
const medanMuseum = { title: 'Tjong A Fie Mansion · Museum', url: 'https://museumtjongafie.com/en/visit-us/' };
const medanCity = { title: 'Medan municipal tourism', url: 'https://medantourism.medan.go.id/public/' };
const bangkok = { title: 'Tourism Authority of Thailand · Yaowarat', url: 'https://www.tourismthailand.org/Articles/the-adventure-through-bangkok-s-chinatown' };

type Topic = [string, string, LearningSource];
function pack(branchId: string, localityId: string, notes: Topic[], culture: Topic[], resources: [LearningSource, string, 'Study' | 'Culture' | 'Recordings' | 'Dictionary'][]): BranchLearning {
  const entries = (rows: Topic[]) => rows.map(([title, text, source]) => ({ title, text, source, localityIds: [localityId] }));
  return { branchId, words: [], soundNotes: entries(notes), culture: entries(culture), resources: resources.map(([source, description, kind]) => ({ ...source, description, kind, localityIds: [localityId] })) };
}
export const overseasMinLearning: BranchLearning[] = [
  pack('min/southern-min', 'manila-hokkien', [
    ['Philippine Hokkien and Jinjiang', 'Tsai’s study traces Philippine Hokkien to Jinjiang while documenting changes after migration. A Jinjiang reading is therefore not automatically a Manila reading.', sources.manila],
    ['Language contact', 'The study identifies contact vocabulary as a particularly distinctive feature. Its national findings provide context; they are not a Manila pronunciation dictionary.', sources.manila],
  ], [
    ['Binondo Church', 'The national historical marker records the church’s institutional history. The church and surrounding plaza form one part of Binondo’s shared urban heritage.', binondo],
    ['A community language', 'The study records Lán-lâng-uē as a community name for Philippine Hokkien. This source spelling is a name used in the study, not HanLingo transcription.', sources.manila],
  ], [[sources.manila, 'Research abstract on Philippine Hokkien, its origins and language use.', 'Study'], [ahmami, 'Community pronunciation lessons; consult the original notation and audio on the publisher’s site.', 'Recordings'], [binondo, 'Official historical-marker entry.', 'Culture']]),
  pack('min/southern-min', 'medan-hokkien', [
    ['Hokkien at home', 'Wijaya’s Medan fieldwork records family use, respect for elders and community identity among the reasons speakers maintain Hokkien.', sources.medan],
    ['Different generations', 'The same study records partial use and interrupted transmission to children. It documents choices made by participants, not one fixed pronunciation shared by the whole city.', sources.medan],
  ], [
    ['Kesawan and the mansion', 'Tjong A Fie Mansion combines Chinese, Malay and European architectural elements in Kesawan. It is shared city heritage; its photographs do not identify the language spoken by visitors.', medanMuseum],
    ['A city of many communities', 'Medan’s municipal heritage itinerary includes Maimun Palace, religious buildings, Kesawan and the former post office. These places situate Hokkien life within the wider city.', medanCity],
  ], [[sources.medan, 'Local fieldwork on Hokkien use and maintenance.', 'Study'], [medanMuseum, 'The museum’s own account of its building and collections.', 'Culture'], [medanCity, 'Municipal directory of city landmarks.', 'Culture']]),
  pack('min/southern-min', 'bangkok-teochew', [
    ['A Bangkok reference', 'The Academia Sinica archive lists Bangkok Teochew separately from mainland Chaozhou. Readings here retain that source locality.', sources.sinica],
    ['Character readings and conversation', 'The archive supplies character readings with separate sound and tone fields. These citation forms do not by themselves describe connected-speech tone changes.', sources.sinica],
  ], [
    ['Yaowarat food streets', 'The Tourism Authority of Thailand’s Chinatown route connects street-food stops with the old market. The gallery’s city locations are not language boundaries.', bangkok],
    ['Temples along the route', 'Wat Mangkon Kamalawat, the Thian Fah Foundation and the Guan-U shrine appear along the same route, showing different parts of the district’s cultural life.', bangkok],
  ], [[sources.sinica, 'Downloadable locality-specific character readings.', 'Dictionary'], [bangkok, 'Official Chinatown cultural itinerary.', 'Culture']]),
  pack('min/southern-min', 'singapore-teochew', [
    ['Literary and colloquial readings', 'Singapore Teochew has distinct literary and colloquial readings. The Culturepaedia article discusses both; its spelling examples are not imported as complete IPA.', sources.teochew],
    ['Contact vocabulary', 'The article documents Malay and English loans, including words connected with shops, transport and everyday objects. These are Singapore attestations, not automatic equivalents for Swatow.', sources.teochew],
  ], [
    ['Opera and language classes', 'Nam Hwa Opera offers conversational classes, while Teochew Poit Ip Huay Kuan has organised parent-and-child nursery-rhyme classes.', sources.teochew],
    ['A New Year voice', 'For its 2021 Talking Red Packet, SCCC published a Teochew greeting by Raina Lee Xin Tian. Listen to the actual performance below in Sounds.', scccAudio],
  ], [[sources.teochew, 'Local vocabulary, grammar and cultural activities.', 'Study'], [scccAudio, 'Public recordings in six Singapore Chinese varieties.', 'Recordings']]),
  pack('min/eastern-min', 'sibu-foochow', [
    ['Foochow across generations', 'Ting and Ting studied 204 parent–child pairs in Sibu. Parents reported more Foochow use, while Mandarin was more prominent among their children.', sources.sibu],
    ['Street names as language records', 'Research on Sibu’s street names examines how local Chinese varieties are represented in names. A written street name is evidence of naming practice, not sufficient evidence for IPA.', sibuNames],
  ], [
    ['Migration remembered', 'The Foochow settlement memorial and Wong Nai Siong Memorial Garden preserve parts of Sibu’s migration history. The wider city also includes other Chinese and Indigenous communities.', sibuVisitor],
    ['River and market', 'The Rajang waterfront, river terminal and central market connect the city with its hinterland. The night market provides another view of everyday urban life.', sibuVisitor],
  ], [[sources.sibu, 'Family language survey in Sibu.', 'Study'], [sibuNames, 'Study of local street naming and Chinese varieties.', 'Study'], [sibuVisitor, 'Tourism-board guide to local history and places.', 'Culture']]),
  pack('min/eastern-min', 'sitiawan-foochow', [
    ['Several migrant origins', 'The settlement study distinguishes groups with different Fujian origins. Sitiawan is a geographic reference, not a claim that all its Foochow speakers have one accent.', sources.sitiawan],
    ['History is not a sound inventory', 'The 1972 study follows settlement patterns and social history. Its material supports the community reference, but does not supply the missing city-specific IPA recordings.', sources.sitiawan],
  ], [
    ['Kampung Koh', 'The Sitiawan Settlement Museum in Kampung Koh presents the local settlement story. The town’s heritage is linked to the surrounding settlement area, not only today’s centre.', perak],
    ['The nearby coast', 'The Perak heritage route also includes Tua Pek Kong at Pasir Panjang. This coastal stop lies outside the town centre and is labelled separately.', perak],
  ], [[sources.sitiawan, 'Historical study of Foochow settlement and migrant origins.', 'Study'], [perak, 'State tourism guide including Kampung Koh and Pasir Panjang.', 'Culture']]),
  pack('min/hainan-min', 'singapore-hainanese', [
    ['Several Hainanese origins', 'Singapore families trace origins to Wenchang, Haikou and other parts of Hainan. Culturepaedia identifies Wenchang speech as a broadcast reference, not the only local variety.', sources.hainanese],
    ['Two reading traditions', 'Literary and colloquial readings coexist. The article’s pronunciation examples omit tones, so they are not presented here as complete tonal word readings.', sources.hainanese],
  ], [
    ['Food and work', 'The source links English food-related loans with Hainanese employment in European households and the food trade.', sources.hainanese],
    ['Keeping the language audible', 'SCCC’s 2021 greeting by Wong Shu Wen provides an individual Hainanese performance. The publisher does not identify a narrower ancestral-town accent.', scccAudio],
  ], [[sources.hainanese, 'Community history, speech variation and vocabulary.', 'Study'], [scccAudio, 'A Hainanese New Year greeting hosted by SCCC.', 'Recordings']]),
  pack('min/hainan-min', 'haikou', [
    ['Haikou and Wenchang', 'Haikou is separately named among Hainanese regional varieties in the cited overview. Wenchang’s existing HanLingo word list is not reused as Haikou speech.', sources.hainanese],
    ['Island and diaspora', 'Singapore Hainanese speakers have several ancestral origins, including Haikou. An overseas performance must remain labelled with its actual recording context.', sources.hainanese],
  ], [], [[sources.hainanese, 'Regional context and overseas Hainanese communities.', 'Study'], [{ title: 'Hainan Provincial Museum', url: 'https://www.hainanmuseum.org/' }, 'Museum collections and local cultural context.', 'Culture']]),
];
