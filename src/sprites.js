import Cell from "overprint/overprint/cell";

export default {
  PLAYER: Cell("@", "#DAA520"),
  MONSTER: Cell("M", "#0C9"),
  WALL: {
    LIT: Cell("#", "#AAA"),
    UNLIT: Cell("#", "#666")
  },
  FLOOR: {
    LIT: Cell("•", "#555"),
    UNLIT: Cell("•", "#222")
  }
};