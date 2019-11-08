import { ADD_MAP, SET_CURRENT_MAP } from "../action-types";

const initialState = {
  current: 0,
  maps: { 0: {} }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_MAP: {
      const { map, id } = action.payload;
      return {
        current: state.current,
        maps: {
          ...state.maps,
          [id]: map
        }
      };
    }
    case SET_CURRENT_MAP: {
      const { id } = action.payload;
      return {
        current: id,
        maps: state.maps
      };
    }
    default:
      return state;
  }
}
