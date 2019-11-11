import { uniq } from "lodash";
import state from "../../state";

export const setMap = map => (state.maps[map.id] = map);

export const setCurrentMapId = mapId => (state.maps.currentMapId = mapId);

export const setMapFov = fov => (state.maps.fov = fov);

export const setMapRevealed = (revealedTileIds, mapId) => {
  const previouslyRevealedTileIds = state.maps[mapId].revealedTileIds || [];
  state.maps[mapId].revealedTileIds = uniq(
    previouslyRevealedTileIds.concat(revealedTileIds)
  );
};

export const setMapEntityIds = (entityIds, mapId) =>
  (state.maps[mapId].entityIds = entityIds);

export const setMapEntityLocations = (entityLocations, mapId) =>
  (state.maps[mapId].entityLocations = entityLocations);
