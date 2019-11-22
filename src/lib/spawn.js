import { sample, times } from "lodash";
import state from "../state";
import { PLAYER, PICKUP } from "../entities";

import goblin from "../entities/goblin";
import rat from "../entities/rat";

import { setEntity } from "../state/setters/entity-setters";
import { addEntityToMap } from "../state/setters/map-setters";
import { idToCell } from "./grid";

const hatch = (egg, mapId) => {
  const { x, y, id } = egg;
  setEntity(egg);
  addEntityToMap(id, `${x},${y}`, mapId);
};

export const spawnPlayer = (loc, mapId = state.maps.currentMapId) =>
  hatch({ ...PLAYER, x: loc.x, y: loc.y, id: 0 }, mapId);

const monsters = [goblin, rat];

export const spawnMonsters = ({ count, mapId = state.maps.currentMapId }) => {
  const currentMap = state.maps[mapId];
  const { openTileIds } = currentMap;

  times(count, () => {
    let currentMonsterId = currentMap.entityIds.length;
    const spawnLoc = sample(openTileIds);
    if (!Object.keys(currentMap.entityLocations).includes(spawnLoc)) {
      const egg = {
        ...sample(monsters)(),
        ...idToCell(spawnLoc),
        id: currentMonsterId
      };
      hatch(egg, mapId);
    }
  });
};

export const spawnPickups = ({ count, mapId = state.maps.currentMapId }) => {
  const currentMap = state.maps[mapId];
  const { openTileIds } = currentMap;

  times(count, () => {
    let id = currentMap.entityIds.length;
    const spawnLoc = sample(openTileIds);
    if (!Object.keys(currentMap.entityLocations).includes(spawnLoc)) {
      const egg = {
        ...PICKUP,
        ...idToCell(spawnLoc),
        id: id,
        name: "Health Potion"
      };
      hatch(egg, mapId);
    }
  });
};
