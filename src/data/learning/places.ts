import { atlasLocalities } from '../atlas';
import { mapPoints, type MapPoint } from '../languages';

/** One learning address per atlas locality; an address does not imply a lesson exists. */
export const learningPlaces: MapPoint[] = atlasLocalities.map(place => ({
  ...mapPoints.find(point => point.id === place.id),
  id: place.id,
  name: place.name,
  nativeName: place.nativeName,
  groupId: place.groupId,
  subgroupId: place.branchId,
  coordinates: place.coordinates,
  hierarchy: ['Han', place.groupId, place.branchId, place.clusterId, place.name],
}));
const learningPlaceById = new Map(learningPlaces.map(place => [place.id, place]));
export const findLearningPlace = (id: string) => learningPlaceById.get(id);
