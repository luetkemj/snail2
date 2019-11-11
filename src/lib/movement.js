import store from "../store";

export const canMoveTo = (x, y) => {
  const { currentMapId } = store.getState().maps;
  const currentMap = store.getState().maps.maps[currentMapId];
  const { tiles, entityLocations } = currentMap;
  const { entities } = store.getState();
  const locId = `${x},${y}`;

  // console.log({ currentMapId, currentMap, tiles, entityIds, entities });

  if (tiles[locId].blocking) {
    console.log("WALL");
    return false;
  }

  if (entityLocations[locId]) {
    let somethingInTheWay = false;
    entityLocations[locId].forEach(entityId => {
      if (entities[entityId].blocking) {
        somethingInTheWay = true;
      }
      return false;
    });

    if (somethingInTheWay) return false;
  }

  return true;
};
