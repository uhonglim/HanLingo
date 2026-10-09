import type { GroupPhoto } from "../photography";

export type GalleryPhoto = GroupPhoto & {
  id: string;
  title: string;
  category: "Streets" | "Food" | "Culture" | "Landscape";
  year?: string;
  width?: number;
  height?: number;
  searchText?: string;
  /** Curated associations; IDs must resolve within this locality’s attested readings. */
  relatedWordIds?: string[];
};
