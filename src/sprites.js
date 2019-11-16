import { get } from "lodash";
import Cell from "overprint/overprint/cell";

export const getSprite = path => get(sprites, path);

const sprites = {
  PLAYER: Cell("@", "#DAA520"),
  MONSTER: Cell("M", "#0C9"),
  POTION: Cell("!", "#DAA520"),
  WALL: {
    LIT: Cell("#", "#AAA"),
    UNLIT: Cell("#", "#666")
  },
  FLOOR: {
    LIT: Cell("•", "#555"),
    UNLIT: Cell("•", "#222")
  },
  CAVERN_FLOOR: {
    LIT: Cell("ʘ", "#71331E"),
    UNLIT: Cell("ʘ", "#4C2214")
  },
  CORPSE: {
    FRESH: Cell("%", "#ff6347"),
    ROTTEN: Cell("%", "#8FBC8B"),
    BONES: Cell("%", "#F5F5F5")
  }
};

export default sprites;
