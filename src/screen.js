import TextGrid from "overprint/overprint/text-grid";
import Font from "overprint/overprint/font";

import sprites from "./sprites";

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
  grid.clear();
  const { currentMapId } = store.getState().maps;
  const currentMap = store.getState().maps.maps[currentMapId];
  const player = store.getState().entities[0];
  const { tiles, ids: tileIds, revealed = [] } = currentMap;
  const {
    fov: { fov, distance }
  } = store.getState().maps;

  // write tiles
  tileIds.forEach(id => {
    if (revealed.includes(id)) {
      grid.writeCell(tiles[id].x, tiles[id].y, sprites[tiles[id].sprite].UNLIT);
    }
    if (fov.includes(id)) {
      grid.writeCell(tiles[id].x, tiles[id].y, sprites[tiles[id].sprite].LIT);
    }
  });

  // write player
  grid.writeCell(player.x, player.y, sprites[player.sprite]);

  // Re-render
  grid.render();
};
