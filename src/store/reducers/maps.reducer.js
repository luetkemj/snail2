import { ADD_MAP, SET_CURRENT_MAP_ID, SET_MAP_FOV } from "../action-types";

const initialState = {
  currentMapId: 0,
  fov: [],
  fovs: {},
  maps: {}
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
        ...state,
        currentMapId: id
      };
    }

    case SET_MAP_FOV: {
      const { fov, id } = action.payload;
      return {
        ...state,
        fov
      };
    }
    default:
      return state;
  }
}
