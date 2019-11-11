import { sample } from "lodash";
import store from "../store";

const CARDINAL = [
  { x: -1, y: 0 },
  { x: 1, y: 0 },
  { x: 0, y: -1 },
  { x: 0, y: 1 }
];

export const drunkenWalk = (startX, startY) => {
  const direction = sample(CARDINAL);
  const x = startX + direction.x;
  const y = startY + direction.y;
  return { x, y };
};

export const canMoveTo = (x, y) => {
  const { currentMapId } = store.getState().maps;
  const currentMap = store.getState().maps.maps[currentMapId];
  const { tiles, entityLocations } = currentMap;
  const { entities } = store.getState();
  const locId = `${x},${y}`;

  if (tiles[locId].blocking) {
    // console.log("WALL");
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
