import { WIDTH, HEIGHT } from "../../constants";
import { MOVE_ENTITY, PLACE_ENTITY } from "../action-types";
import { setMapFov, updateMapRevealed } from "./maps.actions";
import createFov from "../../lib/fov";

import { canMoveTo } from "../../lib/movement";

export function moveEntity({ id, x, y }) {
  return (dispatch, getState) => {
    const { currentMapId } = getState().maps;
    const { tiles } = getState().maps.maps[currentMapId];

    if (canMoveTo(x, y, tiles)) {
      if (id === 0) {
        const fov = createFov(WIDTH, HEIGHT, x, y, tiles, 8);
        dispatch(setMapFov({ fov }));
        dispatch(updateMapRevealed({ revealed: fov.fov, mapId: currentMapId }));
      }

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
