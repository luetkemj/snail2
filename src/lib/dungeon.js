import rung from "rung/src/rung";
import { compact } from "lodash";
import { rectangle, rectsIntersect } from "./grid";

function digHorizontalPassage(tiles, x1, x2, y) {
  const start = Math.min(x1, x2);
  const end = Math.max(x1, x2) + 1;
  let x = start;

  while (x < end) {
    tiles[`${x},${y}`] = { x, y, sprite: "FLOOR" };
    x++;
  }
}

function digVerticalPassage(tiles, y1, y2, x) {
  const start = Math.min(y1, y2);
  const end = Math.max(y1, y2) + 1;
  let y = start;

  while (y < end) {
    tiles[`${x},${y}`] = { x, y, sprite: "FLOOR" };
    y++;
  }
}

export const generateDungeon = ({
  x,
  y,
  width,
  height,
  maxRoomCount,
  minRoomSize,
  maxRoomSize
}) => {
  // fill the entire space with walls so we can dig it out later
  const { tiles } = rectangle(
    { x, y, width, height },
    { sprite: "WALL", blocking: true, opaque: true }
  );

  const rng = rung();
  const rooms = [];
  let roomTiles = {};

  for (let r of Array(maxRoomCount).keys()) {
    let rw = rng.integer(minRoomSize, maxRoomSize);
    let rh = rng.integer(minRoomSize, maxRoomSize);
    let rx = rng.integer(1, width - rw - 1);
    let ry = rng.integer(1, height - rh - 1);

    // create a candidate room
    // todo: perf - don't bother filling this in here - wait till it's accepted
    const candidate = rectangle(
      { x: rx, y: ry, width: rw, height: rh, hasWalls: true },
      { sprite: "FLOOR", blocking: false, opaque: false }
    );

    if (!rooms.some(room => rectsIntersect(room, candidate))) {
      rooms[r] = candidate;
      roomTiles = { ...roomTiles, ...candidate.tiles };
    }
  }

  let prevRoom = null;

  for (let room of compact(rooms)) {
    if (prevRoom) {
      const prev = prevRoom.center;
      const curr = room.center;

      if (rng.boolean()) {
        digHorizontalPassage(tiles, prev.x, curr.x, curr.y);
        digVerticalPassage(tiles, prev.y, curr.y, prev.x);
      } else {
        digVerticalPassage(tiles, prev.y, curr.y, prev.x);
        digHorizontalPassage(tiles, prev.x, curr.x, curr.y);
      }
    }

    prevRoom = room;
  }

  return { tiles: { ...tiles, ...roomTiles }, start: rooms[0].center };
};
