import { MOVE_ENTITY, PLACE_ENTITY } from "../action-types";

import { canMoveTo } from "../../lib/movement";

export function moveEntity({ id, x, y }) {
  return (dispatch, getState) => {
    const state = getState();

    if (canMoveTo(x, y, state)) {
      return dispatch({
        type: MOVE_ENTITY,
        payload: { id, x, y }
      });
    }

    return dispatch({
      type: "BLOCKED"
    });
  };
}

export function placeEntity({ id, x, y }) {
  return {
    type: PLACE_ENTITY,
    payload: { id, x, y }
  };
}
