import type { GroupPhoto } from "../photography";

export type LearningSource = { title: string; url: string };
export type AttestedWord = {
  id: string;
  han: string;
  english: string;
  ipa: string;
  toneNotation?: "pitch-contour" | "source-category" | "unspecified";
  localityId: string;
  reading: string;
  note?: string;
  source: LearningSource;
};
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
