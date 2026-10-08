import { ipaSearchForms } from "./ipa-display";
import { xiamenWords } from "./xiamen-lexicon";
import { romanizeXiamen } from "./xiamen-romanization";

export const vocabularyCategories = [
  "All words",
  "Food & drink",
  "People & actions",
  "Around town",
  "Numbers",
];
const simplified: Record<string, string> = {
  飯: "饭",
  麵: "面",
  魚: "鱼",
  來: "来",
  買: "买",
  錢: "钱",
  飛機: "飞机",
  兩: "两",
};
// Search tolerates omitted diacritics; displayed transcriptions remain unchanged.
const normalize = (value: string) =>
  value.toLocaleLowerCase().normalize("NFD").replace(/\p{M}/gu, "");
export function filterXiamenWords(
  query: string,
  category = "All words",
  savedOnly = false,
  saved: readonly string[] = [],
) {
  const terms = normalize(query.trim()).split(/\s+/).filter(Boolean);
  return xiamenWords.filter((word) => {
    if (
      category !== "All words" &&
      vocabularyCategories.includes(category) &&
      word.category !== category
    )
      return false;
    if (savedOnly && !saved.includes(word.id)) return false;
    const text = normalize(
      `${word.han} ${simplified[word.han] ?? ""} ${word.english} ${word.id} ${ipaSearchForms(word.ipa, "pitch-contour").join(" ")} ${word.sourceReading} ${romanizeXiamen(word.segments, word.tones)}`,
    );
    return terms.every((term) => text.includes(term));
  });
}
