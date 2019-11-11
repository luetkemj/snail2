import { keyBy, sample, times } from "lodash";
import store from "./store";
import { addEntities, placeEntity } from "./store/actions/entity.actions";
import { setEntityLocations } from "./store/actions/maps.actions";
import { generateDungeon } from "./lib/dungeon";
import { idToCell } from "./lib/grid";

import { WIDTH, HEIGHT } from "./constants";
import {
  addMap,
  setCurrentMap,
  setMapEntities
} from "./store/actions/maps.actions";
import createFov from "./lib/fov";
import { setMapFov } from "./store/actions/maps.actions";

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
  store.dispatch(
    addMap({ map: { ...dungeon, tileIds: Object.keys(dungeon.tiles) }, id: 0 })
  );
  store.dispatch(setCurrentMap({ id: 0 }));

  const currentMapId = store.getState().maps.currentMapId;
  const currentMap = store.getState().maps.maps[currentMapId];

  // place player
  const startingLoc = currentMap.start;
  store.dispatch(placeEntity({ id: 0, ...startingLoc }));

  // generate baddies
  const { openTileIds } = currentMap;
  const spawnLocations = [];
  times(10, () => spawnLocations.push(sample(openTileIds)));
  let currentMonsterId = 1;
  const monsters = [];

  spawnLocations.forEach(spawnLoc => {
    if (spawnLoc !== startingLoc) {
      monsters.push({
        ...idToCell(spawnLoc),
        id: currentMonsterId,
        sprite: "MONSTER",
        blocking: true
      });
      currentMonsterId++;
    }
  });

  store.dispatch(
    setMapEntities({
      entityIds: [0, ...monsters.map(monster => monster.id)],
      mapId: currentMapId
    })
  );
  store.dispatch(addEntities({ entities: keyBy(monsters, "id") }));

  const entityLocations = {
    [`${startingLoc.x},${startingLoc.y}`]: [0],
    ...monsters.reduce((acc, val) => {
      const locId = `${val.x},${val.y}`;
      acc[locId] = acc[locId] || [];
      acc[locId].push(val.id);
      return acc;
    }, {})
  };
  store.dispatch(setEntityLocations({ entityLocations, mapId: currentMapId }));

  // set initial fov
  const { tiles } = store.getState().maps.maps[currentMapId];
  store.dispatch(
    setMapFov({
      fov: createFov(WIDTH, HEIGHT, startingLoc.x, startingLoc.y, tiles, 8)
    })
  );
};
