import { sample, times } from "lodash";
import state from "../state";
import { PLAYER, MONSTER, PICKUP } from "../entities";
import { setEntityLocation, setEntity } from "../state/setters/entity-setters";
import {
  addMapEntityLocations,
  addMapEntityIds
} from "../state/setters/map-setters";
import { idToCell } from "./grid";

const hatch = (egg, mapId) => {
  const { x, y, id } = egg;
  setEntity(egg);
  setEntityLocation(x, y, id);
  addMapEntityIds([id], mapId);
  addMapEntityLocations({ [`${x},${y}`]: [id] }, mapId);
};

export const spawnPlayer = (loc, mapId = state.maps.currentMapId) =>
  hatch({ ...PLAYER, x: loc.x, y: loc.y, id: 0 }, mapId);

export const spawnMonsters = ({ count, mapId = state.maps.currentMapId }) => {
  const currentMap = state.maps[mapId];
  const { openTileIds } = currentMap;
  const goblinNames = [
    "Akbug",
    "Argav",
    "Brigadve",
    "Corbakl",
    "Cruncha",
    "Frum",
    "Gelmax",
    "Glibl",
    "Glogroth Von Bloov",
    "Glovd",
    "Gorf",
    "Grelth",
    "Grickstah",
    "Griga",
    "Groovilla Dar Trog",
    "Khroongah",
    "Kosrik",
    "Makdur",
    "Porgl",
    "Throngul",
    "Thuk",
    "Tryxtah",
    "Vorlag",
    "Yorvua"
  ];

  times(count, () => {
    let currentMonsterId = currentMap.entityIds.length;
    const spawnLoc = sample(openTileIds);
    if (!Object.keys(currentMap.entityLocations).includes(spawnLoc)) {
      const egg = {
        ...MONSTER,
        ...idToCell(spawnLoc),
        id: currentMonsterId,
        name: sample(goblinNames)
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
