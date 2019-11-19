import state from "../../state";

export const getCurrentMap = () => {
  const currentMapId = state.maps;
  return state.maps[currentMapId];
};

export const getEntitiesAt = (x, y) =>
  getCurrentMap().entityLocations[`${x},${y}`];
