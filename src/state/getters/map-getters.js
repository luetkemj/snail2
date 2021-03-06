import state from "../../state";

export const getCurrentMap = () => {
  const { currentMapId } = state.maps;
  const currentMap = state.maps[currentMapId];

  return currentMap;
};

export const getEntitiesAt = (x, y) =>
  getCurrentMap().entityLocations[`${x},${y}`];

export const getDijkstra = name => state.maps.dijkstra[name];
