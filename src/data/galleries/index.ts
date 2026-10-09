import { minOverseasGalleries } from './min-overseas';
import { minMainlandExpandedGalleries } from './min-mainland-expanded';
import { minBangkokGalleries } from './min-bangkok';
import { atlasExtraGalleries } from "./atlas-extra";
import { huangyanPhotos } from "./huangyan";
import { expandedGalleries } from "../expansion";
import { chaoshanGalleries } from "./chaoshan";
import { minGalleries } from "./min";
import { otherGalleries } from "./other";
import { xiamenPhotos } from "../xiamen-photos";
import type { GalleryPhoto } from "./types";

export const localityGalleries: Record<string, GalleryPhoto[]> = {
  ...minGalleries,
  ...otherGalleries,
  ...chaoshanGalleries,
  ...expandedGalleries,
  huangyan: huangyanPhotos,
  ...atlasExtraGalleries,
  ...minMainlandExpandedGalleries,
  ...minBangkokGalleries,
  ...minOverseasGalleries,
  // Shared city context, not a claim that pictured people speak a particular variety.
  // Reuse the existing Singapore scenes; exclude the specifically Hokkien temple.
  'singapore-teochew': minGalleries.singapore.filter(photo => photo.id !== 'singapore-thian-hock-keng'),
  'singapore-hainanese': minGalleries.singapore.filter(photo => photo.id !== 'singapore-thian-hock-keng'),
  xiamen: xiamenPhotos.map((photo) => ({
    ...photo,
    title: photo.caption,
    category: photo.category === "Sea" ? "Landscape" : photo.category,
  })),
};
export const getLocalGallery = (localityId: string): GalleryPhoto[] =>
  localityGalleries[localityId] ?? [];
