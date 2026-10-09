import type { GroupPhoto } from "../photography";

export type LearningSource = { title: string; url: string };
type AttestedWriting =
  | { han: string; writingStatus?: "attested"; learningKind?: "word" | "character-reading" }
  | { han: null; writingStatus: "not-supplied"; learningKind: "word" };
export type AttestedWord = AttestedWriting & {
  id: string;
  english: string;
  /** Keep a multifunctional form visible while excluding ambiguous context-free meaning quizzes. */
  meaningPracticeExclude?: true;
  ipa: string;
  toneNotation?: "pitch-contour" | "source-category" | "unspecified";
  localityId: string;
  reading: string;
  registerLabel?: string;
  note?: string;
  source: LearningSource;
};
export function hasWrittenForm(word: AttestedWord): word is AttestedWord & { han: string } {
  return typeof word.han === "string" && word.han.length > 0;
}
export type CultureItem = {
  title: string;
  text: string;
  localityIds: string[];
  source: LearningSource;
  photo?: GroupPhoto;
};
export type BranchLearning = {
  branchId: string;
  words: AttestedWord[];
  soundNotes: {
    title: string;
    text: string;
    localityIds: string[];
    source: LearningSource;
  }[];
  culture: CultureItem[];
  resources: {
    title: string;
    description: string;
    localityIds: string[];
    scope?: "branch-comparison";
    kind: "Dictionary" | "Recordings" | "Study" | "Culture";
    url: string;
  }[];
};
