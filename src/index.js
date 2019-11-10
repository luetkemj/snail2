import store from "./store";
import { moveEntity, placeEntity } from "./store/actions/entity.actions";
import { generateDungeon } from "./lib/dungeon";

import { WIDTH, HEIGHT } from "./constants";
import { renderScreen } from "./screen";
import { addMap, setCurrentMap } from "./store/actions/maps.actions";
import createFov from "./lib/fov";
import { setMapFov } from "./store/actions/maps.actions";

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
  addMap({ map: { ...dungeon, ids: Object.keys(dungeon.tiles) }, id: 0 })
);
// set current map
store.dispatch(setCurrentMap({ id: 0 }));
// // set tiles for rendering on screen
// store.dispatch(setTiles({ tiles: dungeon.tiles }));
// get center of a random room in dungeon
const currentMapId = store.getState().maps.currentMapId;
const startingLoc = store.getState().maps.maps[currentMapId].start;
const { tiles } = store.getState().maps.maps[currentMapId];

// place player
store.dispatch(placeEntity({ id: 0, ...startingLoc }));
// set initial fov
store.dispatch(
  setMapFov({
    fov: createFov(WIDTH, HEIGHT, startingLoc.x, startingLoc.y, tiles, 8)
  })
);

let action;

function input(key) {
  switch (key) {
    case "ArrowUp":
      action = { x: 0, y: -1 };
      break;
    case "ArrowDown":
      action = { x: 0, y: 1 };
      break;
    case "ArrowLeft":
      action = { x: -1, y: 0 };
      break;
    case "ArrowRight":
      action = { x: 1, y: 0 };
      break;
  }
}

document.addEventListener("keydown", ev => input(ev.key));

function handleAction(action) {
  const player = store.getState().entities[0];

  const mx = Math.min(WIDTH - 1, Math.max(0, player.x + action.x));
  const my = Math.min(HEIGHT - 1, Math.max(0, player.y + action.y));

  const payload = { id: 0, x: mx, y: my };

  store.dispatch(moveEntity(payload));
}

let playerTurn = true;

function update() {
  if (action && playerTurn) {
    handleAction(action);
    action = null;
    playerTurn = false;
  }

  if (!playerTurn) {
    console.log("not your turn");
    // for (let entity of stage.entities) {
    //   if (entity.hasVolition()) {
    //     entity.takeTurn(stage);
    //   }
    // }
    playerTurn = true;
  }
}

function gameLoop() {
  update();
  renderScreen(WIDTH, HEIGHT);
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
