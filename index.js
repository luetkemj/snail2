import store from "./store";
import { moveEntity } from "./store/actions/entity.actions";

import TextGrid from "overprint/overprint/text-grid";
import Font from "overprint/overprint/font";
import Cell from "overprint/overprint/cell";

const canvas = document.querySelector("#game");

const width = 80;
const height = 50;

// Create a default text grid from the canvas element
const grid = new TextGrid(canvas, {
  width,
  height,
  font: Font("Menlo", false, 15)
});

const renderScreen = player => {
  // Predefine a map of cell objects representing text characters
  // with foreground and background colors
  const Cells = {
    Grass: Cell(".", "#37CC63", "#2F3D33"),
    // Sapling: Cell("^", "#A09A2C", "#2F3D33"),
    // Tree: Cell("¥", "#337C22", "#2F3D33"),
    Player: Cell("@", "#aaa", "#2F3D33")
  };

  // Fill the entire grid
  grid.fill(Cells.Grass);

  // Render the filled cells to the canvas
  grid.render();

  // write player
  grid.writeCell(player.x, player.y, Cells.Player);

  // Re-render the cells that changed since the previous render
  grid.render();
};

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

  console.log({ player, action });
  const mx = Math.min(width - 1, Math.max(0, player.x + action.x));
  const my = Math.min(height - 1, Math.max(0, player.y + action.y));

  const payload = { id: 0, x: mx, y: my };
  console.log({ payload });

  store.dispatch(moveEntity(payload));
  console.log({ state: store.getState() });
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

// const screen = new Screen(canvas, width, height);

function gameLoop() {
  update();
  renderScreen(store.getState().entities[0]);
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
