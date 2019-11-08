import TextGrid from "overprint/overprint/text-grid";
import Font from "overprint/overprint/font";
import Cell from "overprint/overprint/cell";

import { WIDTH, HEIGHT } from "./constants";
import store from "./store";

const canvas = document.querySelector("#game");
// Create a default text grid from the canvas element
const grid = new TextGrid(canvas, {
  width: WIDTH,
  height: HEIGHT,
  font: Font("Menlo", false, 15)
});

export const renderScreen = () => {
  const player = store.getState().entities[0];

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
