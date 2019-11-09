import { ADD_MAP, SET_CURRENT_MAP_ID } from "../action-types";

const initialState = {
  currentMapId: 0,
  maps: { 0: {} }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_MAP: {
      const { map, id } = action.payload;
      return {
        currentMapId: state.currentMapId,
        maps: {
          ...state.maps,
          [id]: map
        }
      };
    }
    case SET_CURRENT_MAP_ID: {
      const { id } = action.payload;
      return {
        currentMapId: id,
        maps: state.maps
      };
    }
    default:
      return state;
  }
}
