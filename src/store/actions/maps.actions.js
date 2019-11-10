import {
  ADD_MAP,
  SET_CURRENT_MAP_ID,
  SET_MAP_FOV,
  UPDATE_MAP_REVEALED
} from "../action-types";

export function addMap({ map, id }) {
  return {
    type: ADD_MAP,
    payload: { map, id }
  };
}

export function setCurrentMap({ id }) {
  1;
  return {
    type: SET_CURRENT_MAP_ID,
    payload: { id }
  };
}

export function setMapFov({ fov }) {
  return {
    type: SET_MAP_FOV,
    payload: { fov }
  };
}

export function updateMapRevealed({ mapId, revealed }) {
  return {
    type: UPDATE_MAP_REVEALED,
    payload: { mapId, revealed }
  };
}
