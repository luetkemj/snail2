import state from "./state";
import {
  setMap,
  setMapFov,
  setCurrentMapId
} from "./state/setters/map-setters";

import { spawnPlayer, spawnMonsters, spawnPickups } from "./lib/spawn";
import { generateDungeon } from "./lib/dungeon";
import createFov from "./lib/fov";

import { WIDTH, HEIGHT } from "./constants";

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
  const startingLoc = state.maps[currentMapId].start;

  spawnPlayer(startingLoc);
  spawnMonsters({ count: 10 });
  spawnPickups({ count: 5 });

  // set initial fov
  const tiles = state.maps[currentMapId].tiles;
  const fov = createFov(WIDTH, HEIGHT, startingLoc.x, startingLoc.y, tiles, 8);
  setMapFov(fov);
};
