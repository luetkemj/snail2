import { MOVE_ENTITY, PLACE_ENTITY } from "../action-types";

import { canMoveTo } from "../../lib/movement";

export function moveEntity({ id, x, y }) {
  return (dispatch, getState) => {
    const { currentMapId } = getState().maps;
    const { tiles } = getState().maps.maps[currentMapId];

    if (canMoveTo(x, y, tiles)) {
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
