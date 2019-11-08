export const canMoveTo = (x, y, state) => {
  const { tiles } = state.tiles;
  if (tiles[`${x},${y}`].blocking) {
    return false;
  }
  return true;
};
