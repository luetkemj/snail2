import { findIndex, uniq } from "lodash";
import state from "../../state";
import { getCurrentMap } from "../../state/getters/map-getters";
import { getEntity } from "../../state/getters/entity-getters";
import { dijkstra } from "../../lib/dijkstra";

export const setMap = map => (state.maps[map.id] = map);

export const setCurrentMapId = mapId => (state.maps.currentMapId = mapId);

export const setMapFov = fov => (state.maps.fov = fov);

export const setMapRevealed = (revealedTileIds, mapId) => {
  const previouslyRevealedTileIds = state.maps[mapId].revealedTileIds || [];
  state.maps[mapId].revealedTileIds = uniq(
    previouslyRevealedTileIds.concat(revealedTileIds)
  );
};

export const setMapEntityLocations = (entityLocations, mapId) =>
  (state.maps[mapId].entityLocations = entityLocations);

const addMapEntityId = (entityId, mapId) => {
  const currentMap = state.maps[mapId];
  // set currentMap entityIds array if needed
  currentMap.entityIds = currentMap.entityIds || [];
  currentMap.entityIds.push(entityId);
};

const removeMapEntityId = (entityId, mapId) => {
  const currentMap = state.maps[mapId];
  currentMap.entityIds = currentMap.entityIds.filter(id => id !== entityId);
};

const addMapEntityLocation = (entityId, locId, mapId) => {
  // set entity location on map if needed
  state.maps[mapId].entityLocations = state.maps[mapId].entityLocations || {};
  // set entitiyLocation array if needed
  state.maps[mapId].entityLocations[locId] =
    state.maps[mapId].entityLocations[locId] || [];
  // actually add the entityId to locations array
  state.maps[mapId].entityLocations[locId].push(entityId);
};

const removeMapEntityLocation = (locId, entityId, mapId) => {
  let locArray = state.maps[mapId].entityLocations[locId];
  locArray = locArray.filter(id => id !== entityId);
};

export const addEntityToMap = (entityId, locId, mapId) => {
  addMapEntityId(entityId, mapId);
  addMapEntityLocation(entityId, locId, mapId);
};

export const removeEntityFromMap = (locId, entityId, mapId) => {
  removeMapEntityId(entityId, mapId);
  removeMapEntityLocation(locId, entityId, mapId);
};

export const setDijkstra = (name, graph) => {
  state.maps.dijkstra[name] = graph;
};

export const setEntityDijkstra = kind => {
  const ids = getCurrentMap().entityIds.filter(
    id => getEntity(id).kind === kind
  );
  const entities = ids.map(id => getEntity(id));
  const targetIds = [...entities];

  return setDijkstra(kind, dijkstra(targetIds));
};
