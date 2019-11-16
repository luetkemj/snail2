import { times } from "lodash";
import TextGrid from "overprint/overprint/text-grid";
import Font from "overprint/overprint/font";
import Cell from "overprint/overprint/cell";

import { WIDTH, FONT_SIZE } from "./constants";

import state from "./state";

const canvas = document.querySelector("#menu");
// Create a default text grid from the canvas element
const grid = new TextGrid(canvas, {
  width: WIDTH,
  height: 5,
  font: Font("Menlo", false, FONT_SIZE)
});

grid.onClick((x, y) => {
  const locId = `${x},${y}`;
  console.log("menu", {
    locId,
    x,
    y
  });
});

export const renderMenu = () => {
  grid.clear();

  const logs = state.menu.log.slice(state.menu.log.length - 5);
  if (logs.length < 5) {
    times(5 - logs.length, () => logs.unshift(""));
  }

  logs.forEach((entry, entryIdx) => {
    entry.split("").forEach((char, charIdx) => {
      const opacity = entryIdx / 10 + 0.5;
      grid.writeCell(
        charIdx,
        entryIdx,
        Cell(char, `rgba(218,165,32,${opacity})`)
      );
    });
  });

  // turn #
  JSON.stringify(state.game.turn)
    .split("")
    .reverse()
    .forEach((char, idx) =>
      grid.writeCell(WIDTH - idx - 1, 4, Cell(char, `rgba(218,165,32, 1)`))
    );

  // Re-render
  grid.render();
};
