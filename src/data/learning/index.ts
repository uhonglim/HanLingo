import { ipaSearchForms } from "../ipa-display";
import { localityPhotos } from "./locality-photos";
import { mapPoints } from "../languages";
import { siteTerms } from "../site-terms";
import { minLearning } from "./min";
import { mandarinYueLearning } from "./mandarin-yue";
import { hakkaWuLearning } from "./hakka-wu";
import type { MapPoint } from "../languages";
import { convertIpa } from "../romanization-method";
import type { AttestedWord, BranchLearning } from "./types";
import { regionalReadingsFor } from "../regional-words";
import { wordMeaning } from "../word-meaning";
import { getLocalGallery } from "../galleries";

export const branchLearning: BranchLearning[] = [
  ...minLearning,
  ...mandarinYueLearning,
  ...hakkaWuLearning,
].map((pack) => ({
  ...pack,
  culture: [
    ...pack.culture,
    ...mapPoints
      .filter(
        (point) =>
          `${point.groupId}/${point.subgroupId}` === pack.branchId &&
          localityPhotos[point.id],
      )
      .map((point) => ({
        title: localityPhotos[point.id].title,
        text: "",
        localityIds: [point.id],
        photo: localityPhotos[point.id].photo,
        source: {
          title: "Photo and location",
          url: localityPhotos[point.id].photo.sourceUrl,
        },
      })),
  ],
}));
export const learningSections = {
  words: siteTerms.sections.words,
  culture: siteTerms.sections.photos,
  sounds: siteTerms.sections.sounds,
  practice: siteTerms.sections.practice,
} as const;
export type LearningSection = keyof typeof learningSections;
export function getBranchLearning(groupId: string, subgroupId: string) {
  return branchLearning.find(
    (item) => item.branchId === `${groupId}/${subgroupId}`,
  );
}
export function getLocalLearning(point: MapPoint) {
  const pack = getBranchLearning(point.groupId, point.subgroupId);
  const baseWords =
    pack?.words.filter((item) => item.localityId === point.id) ?? [];
  const existing = new Set(baseWords.map((word) => wordMeaning(word.english)));
  const additions = regionalReadingsFor(point.id).filter(
    (reading) => reading.ipa && !existing.has(wordMeaning(reading.english)),
  );
  return {
    words: [
      ...baseWords,
      ...additions.map((reading) => ({
        id: reading.id,
        han: reading.han,
        english: reading.english,
        ipa: reading.ipa!,
        toneNotation: reading.toneNotation,
        localityId: reading.localityId,
        reading: reading.scope,
        note: reading.note,
        source: reading.source,
      })),
    ],
    soundNotes:
      pack?.soundNotes.filter((item) => item.localityIds.includes(point.id)) ??
      [],
    culture:
      pack?.culture.filter((item) => item.localityIds.includes(point.id)) ?? [],
    resources:
      pack?.resources.filter((item) => item.localityIds.includes(point.id)) ??
      [],
  };
}
export function availableSections(point: MapPoint): LearningSection[] {
  if (point.id === "xiamen") return ["words", "culture", "sounds", "practice"];
  const data = getLocalLearning(point);
  return [
    ...(data.words.length || regionalReadingsFor(point.id).length
      ? ["words" as const]
      : []),
    ...(getLocalGallery(point.id).length ||
    data.culture.some((item) => item.photo)
      ? ["culture" as const]
      : []),
    ...(data.soundNotes.length || data.words.length ? ["sounds" as const] : []),
    ...(new Set(data.words.map((word) => word.english)).size >= 4
      ? ["practice" as const]
      : []),
  ];
}
export function spellingFor(
  word: Pick<AttestedWord, "ipa" | "toneNotation">,
): string | undefined {
  if (word.toneNotation !== "pitch-contour") return undefined;
  try {
    return convertIpa(
      word.ipa.replace(
        /[¹²³⁴⁵]/gu,
        (digit) =>
          ({ "¹": "1", "²": "2", "³": "3", "⁴": "4", "⁵": "5" })[digit]!,
      ),
    )
      .map((item) => item.spelling)
      .join(" ");
  } catch {
    return undefined;
  }
}
export function searchWords(words: AttestedWord[], query: string) {
  const normalized = query.trim().toLocaleLowerCase().normalize("NFC");
  return words.filter((word) =>
    [
      word.han,
      word.english,
      ...ipaSearchForms(word.ipa, word.toneNotation),
      spellingFor(word) ?? "",
    ].some((value) =>
      value.toLocaleLowerCase().normalize("NFC").includes(normalized),
    ),
  );
}
