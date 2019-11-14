import TextGrid from "overprint/overprint/text-grid";
import Font from "overprint/overprint/font";

import sprites from "./sprites";

import { WIDTH, HEIGHT } from "./constants";

import state from "./state";

const canvas = document.querySelector("#game");
// Create a default text grid from the canvas element
const grid = new TextGrid(canvas, {
  width: WIDTH,
  height: HEIGHT,
  font: Font("Menlo", false, 15)
});

grid.onClick((x, y) => {
  const locId = `${x},${y}`;
  const currentMap = state.maps[state.maps.currentMapId];
  const entities = currentMap.entityLocations[locId] || [];

  console.log({
    locId,
    x,
    y,
    tile: currentMap.tiles[locId],
    entities: entities.map(id => state.entities[id]),
    inFov: state.maps.fov.fov.includes(locId),
    fovDistance: state.maps.fov.distance[locId]
  });
});

export const renderScreen = () => {
  grid.clear();
  const { currentMapId } = state.maps;
  const currentMap = state.maps[currentMapId];
  const player = state.entities[0];

  const { entities } = state;
  const { entityIds } = currentMap;

  const { tiles, tileIds, revealedTileIds = [] } = currentMap;
  const {
    fov: { fov, distance }
  } = state.maps;

  // write tiles
  tileIds.forEach(id => {
    if (!state.config.omniscience) {
      if (revealedTileIds.includes(id)) {
        grid.writeCell(
          tiles[id].x,
          tiles[id].y,
          sprites[tiles[id].sprite].UNLIT
        );
      }
      if (fov.includes(id)) {
        grid.writeCell(tiles[id].x, tiles[id].y, sprites[tiles[id].sprite].LIT);
      }
    } else {
      grid.writeCell(tiles[id].x, tiles[id].y, sprites[tiles[id].sprite].LIT);
    }
  });

  entityIds.forEach(id => {
    const entityLocId = `${entities[id].x},${entities[id].y}`;

    if (!state.config.omniscience) {
      if (fov.includes(entityLocId)) {
        grid.writeCell(
          entities[id].x,
          entities[id].y,
          sprites[entities[id].sprite]
        );
      }
    } else {
      grid.writeCell(
        entities[id].x,
        entities[id].y,
        sprites[entities[id].sprite]
      );
    }
  });

  // write player last!
  grid.writeCell(player.x, player.y, sprites[player.sprite]);

  // Re-render
  grid.render();
};
