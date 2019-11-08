import { SET_TILES } from "../action-types";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_TILES: {
      return {
        tiles: action.payload.tiles,
        ids: Object.keys(action.payload.tiles)
      };
    }
    default:
      return state;
  }
}
