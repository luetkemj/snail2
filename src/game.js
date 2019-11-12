import { sample, times } from "lodash";

import state from "./state";
import {
  setMap,
  setMapFov,
  setCurrentMapId,
  setMapEntityIds,
  setMapEntityLocations
} from "./state/setters/map-setters";
import { setEntityLocation, setEntity } from "./state/setters/entity-setters";

import { generateDungeon } from "./lib/dungeon";
import { idToCell } from "./lib/grid";
import createFov from "./lib/fov";

import { WIDTH, HEIGHT } from "./constants";
import { MONSTER } from "./entities";

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

export const init = () => {
  // generate map
  const dungeon = generateDungeon({
    x: 0,
    y: 0,
    width: WIDTH,
    height: HEIGHT,
    maxRoomCount: 30,
    minRoomSize: 6,
    maxRoomSize: 12
  });

  // add map to state
  setMap({ ...dungeon, tileIds: Object.keys(dungeon.tiles), id: 0 });
  setCurrentMapId(0);

  const currentMapId = state.maps.currentMapId;
  const currentMap = state.maps[currentMapId];
  const startingLoc = state.maps[currentMapId].start;

  setEntityLocation(startingLoc.x, startingLoc.y, 0);

  // generate baddies
  const { openTileIds } = currentMap;
  const spawnLocations = [];
  times(10, () => spawnLocations.push(sample(openTileIds)));
  let currentMonsterId = 1;
  const monsters = [];

  spawnLocations.forEach(spawnLoc => {
    if (spawnLoc !== startingLoc) {
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
    setEntity(monster);
  });
  setMapEntityIds([0, ...monsters.map(monster => monster.id)], 0);

  const entityLocations = {
    [`${startingLoc.x},${startingLoc.y}`]: [0],
    ...monsters.reduce((acc, val) => {
      const locId = `${val.x},${val.y}`;
      acc[locId] = acc[locId] || [];
      acc[locId].push(val.id);
      return acc;
    }, {})
  };
  setMapEntityLocations(entityLocations, currentMapId);

  // set initial fov
  const tiles = state.maps[currentMapId].tiles;
  const fov = createFov(WIDTH, HEIGHT, startingLoc.x, startingLoc.y, tiles, 8);
  setMapFov(fov);
};
