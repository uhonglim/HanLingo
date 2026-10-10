/** Source-supplied citation categories: not words, recordings or inferred syllables. */
export type CitationToneInventory = {
  id: string;
  localityId: string;
  sourcePlaceName: string;
  sourceSiteNumber?: string;
  tones: { category: string; contour: string }[];
  source: { title: string; url: string; page: number; table: number };
  note: string;
};
