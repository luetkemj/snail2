import { WIDTH, HEIGHT } from "../constants";

export const rectangle = ({ x, y, width, height, hasWalls }, tileProps) => {
  const tiles = {};

  const x1 = x;
  const x2 = x + width;
  const y1 = y;
  const y2 = y + height;

  if (hasWalls) {
    for (let yi = y1 + 1; yi < y2 - 1; yi++) {
      for (let xi = x1 + 1; xi < x2 - 1; xi++) {
        tiles[`${xi},${yi}`] = { x: xi, y: yi, ...tileProps };
      }
    }
  } else {
    for (let yi = y1; yi < y2; yi++) {
      for (let xi = x1; xi < x2; xi++) {
        tiles[`${xi},${yi}`] = { x: xi, y: yi, ...tileProps };
      }
    }
  }

  const center = {
    x: Math.round((x1 + x2) / 2),
    y: Math.round((y1 + y2) / 2)
  };

  return { x1, x2, y1, y2, center, hasWalls, tiles };
};

export const rectsIntersect = (rect1, rect2) => {
  return (
    rect1.x1 <= rect2.x2 &&
    rect1.x2 >= rect2.x1 &&
    rect1.y1 <= rect2.y2 &&
    rect1.y2 >= rect2.y1
  );
};

export const distance = (cell1, cell2) => {
  const x = Math.pow(cell2.x - cell1.x, 2);
  const y = Math.pow(cell2.y - cell1.y, 2);
  return Math.floor(Math.sqrt(x + y));
};

export const idToCell = id => {
  const coords = id.split(",");
  return { x: parseInt(coords[0], 10), y: parseInt(coords[1], 10) };
};

export const isOnMapEdge = (x, y) => {
  if (x === 0) return true; // north edge
  if (y === 0) return true; // west edge
  if (x === WIDTH - 1) return true; // south edge
  if (y === HEIGHT - 1) return true; // east edge
  return false;
};
