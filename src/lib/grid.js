export const rectangle = (width, height, sprite) => {
  const tiles = {};
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      tiles[`${x},${y}`] = { x, y, sprite };
    }
  }

  return tiles;
};
