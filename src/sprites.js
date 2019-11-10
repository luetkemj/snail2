import Cell from "overprint/overprint/cell";

export default {
  PLAYER: Cell("@", "#DAA520"),
  WALL: {
    LIT: Cell("#", "#AAA"),
    UNLIT: Cell("#", "#AAA")
  },
  FLOOR: {
    LIT: Cell("•", "#AAA"),
    UNLIT: Cell("•", "#AAA")
  }
};
