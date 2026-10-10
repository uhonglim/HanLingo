import type { LanguageId } from '../languages';
export type AtlasSource = { title: string; url: string; locator: string };
export type AtlasCluster = {
  id: string; groupId: LanguageId; branchId: string;
  branchName: string; branchNativeName: string;
  name: string; nativeName: string;
  /** Actual source subdivision vs an explicitly editorial geographic collection. */
  kind: 'classification' | 'geographic';
  description: string;
  source: AtlasSource;
};
export type AtlasLocality = {
  id: string; name: string; nativeName: string;
  groupId: LanguageId; branchId: string; clusterId: string;
  coordinates: [number, number];
  /** Scope of the point and the source's attestation; never a whole-city uniformity claim. */
  scope: string;
  source: AtlasSource;
  aliases?: string[];
  /** County-distribution entries are not a town or speaker survey. */
  referenceType?: 'county';
  geographySource?: AtlasSource;
};
