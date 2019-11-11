import { WIDTH, HEIGHT } from "../../constants";
import { ADD_ENTITIES, MOVE_ENTITY, PLACE_ENTITY } from "../action-types";
import {
  setEntityLocations,
  setMapFov,
  updateMapRevealed
} from "./maps.actions";
import createFov from "../../lib/fov";

import { canMoveTo } from "../../lib/movement";

export function placeEntity({ id, x, y }) {
  return {
    type: PLACE_ENTITY,
    payload: { id, x, y }
  };
}

export function addEntities({ entities }) {
  return {
    type: ADD_ENTITIES,
    payload: { entities }
  };
}

export function moveEntity({ id, x, y }) {
  return (dispatch, getState) => {
    const { currentMapId } = getState().maps;
    const currentMap = getState().maps.maps[currentMapId];
    const { tiles } = currentMap;

    if (canMoveTo(x, y, tiles)) {
      if (id === 0) {
        const fov = createFov(WIDTH, HEIGHT, x, y, tiles, 8);
        dispatch(setMapFov({ fov }));
        dispatch(
          updateMapRevealed({ revealedTileIds: fov.fov, mapId: currentMapId })
        );
      }

      dispatch({
        type: MOVE_ENTITY,
        payload: { id, x, y }
      });

      const { entityIds } = getState().maps.maps[currentMapId];
      const { entities } = getState();
      const newEntityLocations = entityIds.reduce((acc, entityId) => {
        const locId = `${entities[entityId].x},${entities[entityId].y}`;
        acc[locId] = acc[locId] || [];
        acc[locId].push(entityId);
        return acc;
      }, {});

      dispatch(
        setEntityLocations({
          entityLocations: newEntityLocations,
          mapId: currentMapId
        })
      );
    }

    return dispatch({
      type: "BLOCKED"
    });
  };
}
