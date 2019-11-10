import Cell from "overprint/overprint/cell";

export default {
  PLAYER: Cell("@", "#DAA520"),
  WALL: {
    LIT: Cell("#", "#EEE"),
    UNLIT: Cell("#", "#444")
  },
  FLOOR: {
    LIT: Cell("•", "#EEE"),
    UNLIT: Cell("•", "#222")
  }
};
