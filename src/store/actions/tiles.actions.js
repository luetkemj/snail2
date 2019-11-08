import { SET_TILES } from "../action-types";

export function setTiles({ tiles }) {
  return {
    type: SET_TILES,
    payload: { tiles }
  };
}
