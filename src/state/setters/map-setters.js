import { findIndex, uniq } from "lodash";
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
  const currentMap = state.maps[mapId];

  currentMap.entityIds = currentMap.entityIds || [];
  currentMap.entityIds.push(...entityIds);
};

export const removeMapEntityIds = (entityIds, mapId) => {
  const currentMap = state.maps[mapId];

  currentMap.entityIds = currentMap.entityIds.filter(
    id => !entityIds.includes(id)
  );
};

export const setMapEntityLocations = (entityLocations, mapId) =>
  (state.maps[mapId].entityLocations = entityLocations);

export const addMapEntityLocations = (entityLocations, mapId) => {
  state.maps[mapId].entityLocations = state.maps[mapId].entityLocations || {};

  Object.keys(entityLocations).forEach(key => {
    // set [] at key if none exists
    state.maps[mapId].entityLocations[key] =
      state.maps[mapId].entityLocations[key] || [];

    // concat the old and new
    state.maps[mapId].entityLocations[key].push(...entityLocations[key]);
  });
};

export const removeMapEntityLocations = (locId, entityId, mapId) => {
  let locArray = state.maps[mapId].entityLocations[locId];
  locArray = locArray.filter(id => id !== entityId);
};

export const removeEntityFromMap = (locId, entityId, mapId) => {
  console.log("removeEntityFromMap", { state, locId, entityId, mapId });
  removeMapEntityIds([entityId], mapId);
  removeMapEntityLocations(locId, entityId, mapId);
  console.log("removeEntityFromMap", { state, locId, entityId, mapId });
};
