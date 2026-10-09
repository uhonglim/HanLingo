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
  xiamen: xiamenPhotos.map((photo) => ({
    ...photo,
    title: photo.caption,
    category: photo.category === "Sea" ? "Landscape" : photo.category,
  })),
};
export const getLocalGallery = (localityId: string): GalleryPhoto[] =>
  localityGalleries[localityId] ?? [];
