import { localRecordings } from './local-recordings';
import { atlasBranches } from "./atlas";
import { learningPlaces as mapPoints } from "./learning/places";
import { getLocalLearning, availableSections } from "./learning";
import { getLocalGallery } from "./galleries";
import { regionalReadingsFor } from "./regional-words";
import { wordMeaning } from "./word-meaning";
import { varietyArticles, subgroupArticles } from "./encyclopedia";

/** Count evidence-backed entries separately from photographs and prose. */
export function localityDepth(localityId: string) {
  const point = mapPoints.find((point) => point.id === localityId);
  if (!point) throw new Error(`Unknown locality: ${localityId}`);
  const data = getLocalLearning(point);
  const meanings = new Set(data.words.map((word) => wordMeaning(word.english)));
  const sourceReadings = regionalReadingsFor(localityId).filter(
    (word) => !meanings.has(wordMeaning(word.english)),
  );
  return {
    localityId,
    branchId: `${point.groupId}/${point.subgroupId}`,
    ipaWords: data.words.length,
    segmentalEntries: data.words.filter(
      (word) =>
        word.toneNotation === "unspecified" &&
        !/[˩˨˧˦˥1-9¹²³⁴⁵⁶⁷⁸⁹]/u.test(word.ipa),
    ).length,
    sourceSpellingWords: sourceReadings.length,
    words: data.words.length + sourceReadings.length,
    photos: getLocalGallery(localityId).length,
    hostedRecordings: localRecordings.filter(item => item.localityId === localityId).length,
    soundNotes: data.soundNotes.length,
    cultureTopics: data.culture.filter((item) => item.text.trim()).length,
    learningSources: new Set(data.resources.map((item) => item.url)).size,
    articleSections: varietyArticles[localityId]?.sections.length ?? 0,
    sections: availableSections(point),
  };
}

export function branchDepth(groupId: string, subgroupId: string) {
  const places = mapPoints
    .filter(
      (point) => point.groupId === groupId && point.subgroupId === subgroupId,
    )
    .map((point) => localityDepth(point.id));
  return {
    branchId: `${groupId}/${subgroupId}`,
    localities: places.length,
    words: places.reduce((sum, place) => sum + place.words, 0),
    ipaWords: places.reduce((sum, place) => sum + place.ipaWords, 0),
    photos: places.reduce((sum, place) => sum + place.photos, 0),
    soundNotes: places.reduce((sum, place) => sum + place.soundNotes, 0),
    cultureTopics: places.reduce((sum, place) => sum + place.cultureTopics, 0),
    learningSources: places.reduce(
      (sum, place) => sum + place.learningSources,
      0,
    ),
    articleSections:
      subgroupArticles[`${groupId}/${subgroupId}`]?.sections.length ?? 0,
    places,
  };
}

export function contentDepth() {
  return atlasBranches.map(branch => branchDepth(branch.groupId, branch.id));
}
