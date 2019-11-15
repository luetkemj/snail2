import { sample, times } from "lodash";
import state from "../state";
import { MONSTER, PICKUP } from "../entities";
import { setEntityLocation, setEntity } from "../state/setters/entity-setters";
import {
  addMapEntityLocations,
  addMapEntityIds
} from "../state/setters/map-setters";
import { idToCell } from "./grid";

export const spawnPlayer = (loc, mapId = state.maps.currentMapId) => {
  const locId = `${loc.x},${loc.y}`;
  setEntityLocation(loc.x, loc.y, 0);
  addMapEntityIds([0], mapId);
  addMapEntityLocations({ [locId]: [0] }, mapId);
};

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

  const spawnLocations = [];
  times(count, () => spawnLocations.push(sample(openTileIds)));
  let currentMonsterId = currentMap.entityIds.length;
  const monsters = [];

  spawnLocations.forEach(spawnLoc => {
    if (!Object.keys(currentMap.entityLocations).includes(spawnLoc)) {
      monsters.push({
        ...MONSTER,
        ...idToCell(spawnLoc),
        id: currentMonsterId,
        name: sample(goblinNames)
      });
      currentMonsterId++;
    }
  });

  monsters.forEach(monster => {
    const spawnLoc = `${monster.x},${monster.y}`;
    setEntity(monster);
    addMapEntityIds([monster.id], mapId);
    addMapEntityLocations({ [spawnLoc]: [monster.id] }, mapId);
  });
};

export const spawnPickups = ({ count, mapId = state.maps.currentMapId }) => {
  const currentMap = state.maps[mapId];
  const { openTileIds } = currentMap;
  // generate pickups
  const spawnLocations = [];
  times(count, () => spawnLocations.push(sample(openTileIds)));
  let currentPickupId = currentMap.entityIds.length;
  const pickups = [];

  spawnLocations.forEach(spawnLoc => {
    if (!Object.keys(currentMap.entityLocations).includes(spawnLoc)) {
      pickups.push({
        ...PICKUP,
        ...idToCell(spawnLoc),
        id: currentPickupId,
        name: "Health Potion"
      });
      currentPickupId++;
    }
  });

  pickups.forEach(pickup => {
    const spawnLoc = `${pickup.x},${pickup.y}`;
    setEntity(pickup);
    addMapEntityIds([pickup.id], mapId);
    addMapEntityLocations({ [spawnLoc]: [pickup.id] }, mapId);
  });
};
