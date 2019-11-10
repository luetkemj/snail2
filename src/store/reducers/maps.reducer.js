import {
  ADD_MAP,
  SET_CURRENT_MAP_ID,
  SET_MAP_FOV,
  UPDATE_MAP_REVEALED
} from "../action-types";

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

    case UPDATE_MAP_REVEALED: {
      const { revealed, mapId } = action.payload;
      const oldRevealed = state.maps[mapId].revealed || [];
      const newRevealed = [...new Set([...oldRevealed, ...revealed])];

      return {
        ...state,
        maps: {
          ...state.maps,
          [mapId]: {
            ...state.maps[mapId],
            revealed: newRevealed
          }
        }
      };
    }
    default:
      return state;
  }
}
