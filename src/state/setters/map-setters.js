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

export const addMapEntityIds = (entityIds, mapId) => {
  console.log({ entityIds, mapId });
  const currentMap = state.maps[mapId];
  console.log(currentMap);

  currentMap.entityIds = currentMap.entityIds || [];
  currentMap.entityIds.push(...entityIds);
  console.log({ state });
};

export const setMapEntityLocations = (entityLocations, mapId) =>
  (state.maps[mapId].entityLocations = entityLocations);

export const addMapEntityLocations = (entityLocations, mapId) => {
  state.maps[mapId].entityLocations = state.maps[mapId].entityLocations || {};

  const keys = Object.keys(entityLocations).forEach(key => {
    // set [] at key if none exists
    state.maps[mapId].entityLocations[key] =
      state.maps[mapId].entityLocations[key] || [];

    // concat the old and new
    state.maps[mapId].entityLocations[key].push(...entityLocations[key]);
  });
};
