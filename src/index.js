import state from "./state";
import { init } from "./game";
import { WIDTH, HEIGHT } from "./constants";
import { renderScreen } from "./screen";
import { attemptMove, drunkenWalk } from "./lib/movement";

init();

let action;

function input(key) {
  switch (key) {
    case "o": {
      action = "TOGGLE_OMNISCIENCE";
      break;
    }
    case "z": {
      action = "REST";
      break;
    }
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
  if (action === "REST") {
    return;
  }

  if (action === "TOGGLE_OMNISCIENCE") {
    state.config.omniscience = !state.config.omniscience;
    return;
  }

  const player = state.entities[0];

  const mx = Math.min(WIDTH - 1, Math.max(0, player.x + action.x));
  const my = Math.min(HEIGHT - 1, Math.max(0, player.y + action.y));

  attemptMove(mx, my, 0);
}

let playerTurn = true;

function update() {
  if (action && playerTurn) {
    console.log(action);
    handleAction(action);
    action = null;
    playerTurn = false;
    console.log("state:", state);
  }

  if (!playerTurn) {
    const { currentMapId } = state.maps;
    const currentMap = state.maps[currentMapId];
    const { entityIds } = currentMap;
    const { entities } = state;

    for (let id of entityIds) {
      if (id !== 0) {
        const newLoc = drunkenWalk(entities[id].x, entities[id].y);
        attemptMove(newLoc.x, newLoc.y, id);
      }
    }
    playerTurn = true;
  }
}

console.log("init:", state);

function gameLoop() {
  update();
  renderScreen(WIDTH, HEIGHT);
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
