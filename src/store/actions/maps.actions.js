import { ADD_MAP, SET_CURRENT_MAP } from "../action-types";

export function addMap({ map, id }) {
  return {
    type: ADD_MAP,
    payload: { map, id }
  };
}

export function setCurrentMap({ id }) {
  1;
  return {
    type: SET_CURRENT_MAP,
    payload: { id }
  };
}
