import store from "./store";
import { moveEntity } from "./store/actions/entity.actions";

import { WIDTH, HEIGHT } from "./constants";
import { renderScreen } from "./screen";

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
