import { sample } from "lodash";
import state from "../state";
import { setEntityLocation } from "../state/setters/entity-setters";
import {
  setMapEntityLocations,
  setMapRevealed,
  setMapFov
} from "../state/setters/map-setters";
import createFov from "./fov";
import { WIDTH, HEIGHT } from "../constants";

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

export const canMoveTo = (x, y, id) => {
  const { currentMapId } = state.maps;
  const currentMap = state.maps[currentMapId];
  const { tiles, entityLocations } = currentMap;
  const { entities } = state;
  const locId = `${x},${y}`;

  // if walking into blocking tile - WALL
  if (tiles[locId].blocking) {
    return false;
  }

  // if walking into blocking entity - MONSTER / PLAYER
  if (entityLocations[locId]) {
    const blockingEntities = entityLocations[locId].map(
      entityId => entities[entityId]
    );

    if (blockingEntities.length) {
      blockingEntities.forEach(entity =>
        console.log(`${entities[id].name} bumps into ${entity.name}`)
      );

      return false;
    }
  }

  return true;
};

export const attemptMove = (x, y, id) => {
  const { currentMapId } = state.maps;
  const currentMap = state.maps[currentMapId];
  const { tiles } = currentMap;

  if (canMoveTo(x, y, id)) {
    if (id === 0) {
      const fov = createFov(WIDTH, HEIGHT, x, y, tiles, 8);
      setMapFov(fov);
      setMapRevealed(fov.fov, currentMapId);
    }

    setEntityLocation(x, y, id);

    const { entityIds } = state.maps[currentMapId];
    const { entities } = state;
    const newEntityLocations = entityIds.reduce((acc, entityId) => {
      const locId = `${entities[entityId].x},${entities[entityId].y}`;
      acc[locId] = acc[locId] || [];
      acc[locId].push(entityId);
      return acc;
    }, {});

    setMapEntityLocations(newEntityLocations, currentMapId);
  }
};
