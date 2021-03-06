import state from "./state";
import { init } from "./game";
import { WIDTH, HEIGHT } from "./constants";
import { renderScreen } from "./screen";
import { renderMenu } from "./menu";
import { attemptMove } from "./lib/movement";
import { getPlayer } from "./state/getters/entity-getters";
import { getCurrentMap } from "./state/getters/map-getters";
import { setDijkstra } from "./state/setters/map-setters";
import { dijkstra } from "./lib/dijkstra";

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

  const player = getPlayer();
  const mx = Math.min(WIDTH - 1, Math.max(0, player.x + action.x));
  const my = Math.min(HEIGHT - 1, Math.max(0, player.y + action.y));

  attemptMove(mx, my, 0);
}

let playerTurn = true;

function update() {
  const gameOver = getPlayer().health <= 0;

  if (action && playerTurn) {
    // you are dead. make it game over
    if (gameOver) {
      state.menu.log.push("You died. Game Over");
      document.removeEventListener("keydown", ev => input(ev.key));
      playerTurn = false;
    } else {
      handleAction(action);
      action = null;
      state.game.turn += 1;
      playerTurn = false;

      const nonMonsterIds = getCurrentMap().entityIds.filter(
        id => state.entities[id].sprite === "PLAYER"
      );
      setDijkstra(
        "player",
        dijkstra(nonMonsterIds.map(id => state.entities[id]))
      );
    }
    console.log(state);
  }

  if (!playerTurn && !gameOver) {
    const { currentMapId } = state.maps;
    const currentMap = state.maps[currentMapId];
    const { entityIds } = currentMap;
    const { entities } = state;

    for (let id of entityIds) {
      if (id !== 0) {
        // skip turn if dead
        if (entities[id].health > 0) {
          const entity = entities[id];
          if (entity.hasOwnProperty("volition")) {
            entity.volition(id);
          }
        } else {
          const timeSinceDeath = state.game.turn - entities[id].deathTime;
          if (timeSinceDeath <= 100) {
            entities[id].sprite = "CORPSE.FRESH";
          }
          if (timeSinceDeath <= 200 && timeSinceDeath > 100) {
            entities[id].sprite = "CORPSE.ROTTEN";
          }
          if (timeSinceDeath > 200) {
            entities[id].sprite = "CORPSE.BONES";
          }
        }
      }
    }
    playerTurn = true;
  }
}

console.log("init:", state);

function gameLoop() {
  update();
  renderScreen(WIDTH, HEIGHT);
  renderMenu();
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
