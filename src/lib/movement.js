export const canMoveTo = (x, y, tiles) => {
  if (tiles[`${x},${y}`].blocking) {
    return false;
  }
  return true;
};
