import { varietyPath } from "../routing";
import { languages, type LanguageId } from "./languages";
import { placeDisplayName } from "./language-names";
import { getLocalLearning, spellingFor } from "./learning";
import { learningPlaces } from "./learning/places";
import { displayIpa } from "./ipa-display";

/** Source records, not a second hand-maintained transcription collection. */
export const romanizationReadings = learningPlaces.flatMap((point) =>
  getLocalLearning(point)
    .words
    .map((word) => ({
      ...word,
      id: `${point.id}:${word.id}`,
      groupId: point.groupId,
      locality: placeDisplayName(point),
      localityPath: varietyPath(point),
      displayIpa: `[${displayIpa(word.ipa, word.toneNotation).replace(/^\[|\]$/g, "")}]`,
      spelling: spellingFor(word),
    })),
);

const examples: Partial<Record<LanguageId, string[]>> = {
  mandarin: [
    "beijing-city-ipa-eight",
    "beijing-city-ipa-lie-prone",
    "beijing-city-ipa-add",
    "jinan-sky",
  ],
  min: ["xiamen-cooked-rice", "fuzhou-七", "jianou-米", "shantou-七"],
  yue: [
    "hong-kong-think",
    "hong-kong-market",
    "hong-kong-ipa-truck",
    "yulin-father",
  ],
  hakka: [
    "meixian-tea",
    "meixian-car",
    "meixian-cuhk-39770",
    "lufeng-younger-brother",
  ],
  wu: ["wenzhou-send", "wenzhou-dress-up", "wenzhou-arrange", "suzhou-cherry"],
};

export const romanizationGroups = languages.map((group) => {
  const readings = romanizationReadings.filter(
    (word) => word.groupId === group.id,
  );
  const everyday = ['water', 'rice', 'tea', 'house', 'person', 'fish'];
  const fallback = [...new Map([
    ...everyday.flatMap(meaning => readings.filter(word => word.english.toLowerCase() === meaning && word.spelling)),
    ...readings.filter(word => word.spelling),
  ].map(word => [word.id, word])).values()].slice(0, 4);
  return {
    ...group,
    readings,
    examples: (examples[group.id] ?? fallback.map(word => word.id.split(":").slice(1).join(":"))).map((id) => {
      const word = readings.find((word) => word.id.endsWith(`:${id}`));
      if (!word) throw new Error(`Missing romanization example: ${id}`);
      return word;
    }),
    mapped: readings.filter((word) => word.spelling).length,
    unresolved: readings.filter((word) => !word.spelling),
  };
});
