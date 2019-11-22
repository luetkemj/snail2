import state from "../state";

import { cellToId, getNeighborIds, idToCell } from "./grid";
import { getCurrentMap } from "../state/getters/map-getters";

export const dijkstra = (goals, weights = []) => {
  const cells = getCurrentMap().tiles;
  const frontier = goals.map(cellToId);

  const distance = frontier.reduce((acc, val, idx) => {
    acc[val] = weights[idx] || 0;
    return acc;
  }, {});

  while (frontier.length) {
    const current = frontier.shift();

    const cell = idToCell(current);
    const neighbors = getNeighborIds(cell.x, cell.y);

    neighbors.forEach(neighborId => {
      if (!distance[neighborId]) {
        if (cells[neighborId] && !cells[neighborId].blocking) {
          let dscore = distance[current] + 1;
          dscore = dscore > 10 ? 100000 : dscore;
          distance[neighborId] = dscore;
          frontier.push(neighborId);
        }
      }
    });
  }

  // normalize goals to their weights or 0
  goals.forEach((goal, idx) => {
    const id = cellToId(goal);
    distance[id] = weights[idx] || 0;
  });

  // todo: make a setter for this!
  state.maps.dijkstra = distance;
};
