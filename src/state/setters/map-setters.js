import { uniq } from "lodash";
import state from "../../state";

export const setMap = map => (state.maps[map.id] = map);

export const setCurrentMapId = mapId => (state.maps.currentMapId = mapId);

export const setMapFov = fov => (state.maps.fov = fov);

export const setMapRevealed = (revealedTileIds, mapId) =>
  uniq(state.maps[mapId].revealedTileIds.concat(revealedTileIds));

export const setMapEntities = (entityIds, mapId) =>
  (state.maps[mapId].entityIds = entityIds);

export const setEntityLocations = (entityLocations, mapId) =>
  (state.maps[mapId].entityLocations = entityLocations);
