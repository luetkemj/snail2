import store from "./store";
import { init } from "./game";
import { moveEntity } from "./store/actions/entity.actions";
import { WIDTH, HEIGHT } from "./constants";
import { renderScreen } from "./screen";
import { drunkenWalk } from "./lib/movement";

init();

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
    const { currentMapId } = store.getState().maps;
    const currentMap = store.getState().maps.maps[currentMapId];
    const { entityIds } = currentMap;
    const { entities } = store.getState();

    for (let id of entityIds) {
      if (id !== 0) {
        const newLoc = drunkenWalk(entities[id].x, entities[id].y);
        store.dispatch(moveEntity({ id, x: newLoc.x, y: newLoc.y }));
      }
    }

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
