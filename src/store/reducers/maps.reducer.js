import {
  ADD_MAP,
  SET_CURRENT_MAP_ID,
  SET_MAP_FOV,
  UPDATE_MAP_REVEALED,
  SET_MAP_ENTITIES,
  SET_ENTITY_LOCATIONS
} from "../action-types";

const initialState = {
  currentMapId: 0,
  fov: [],
  fovs: {},
  maps: {
    0: {
      tiles: {},
      start: {},
      openTileIds: [],
      tileIds: [],
      entityIds: [],
      revealedTileIds: [],
      entityLocations: {}
    }
  }
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
      const { revealedTileIds, mapId } = action.payload;
      const oldRevealedTileIds = state.maps[mapId].revealedTileIds || [];
      const newRevealedTileIds = [
        ...new Set([...oldRevealedTileIds, ...revealedTileIds])
      ];

      return {
        ...state,
        maps: {
          ...state.maps,
          [mapId]: {
            ...state.maps[mapId],
            revealedTileIds: newRevealedTileIds
          }
        }
      };
    }

    case SET_MAP_ENTITIES: {
      const { entityIds, mapId } = action.payload;
      return {
        ...state,
        maps: {
          ...state.maps,
          [mapId]: {
            ...state.maps[mapId],
            entityIds
          }
        }
      };
    }

    case SET_ENTITY_LOCATIONS: {
      const { entityLocations, mapId } = action.payload;
      return {
        ...state,
        maps: {
          ...state.maps,
          [mapId]: {
            ...state.maps[mapId],
            entityLocations
          }
        }
      };
    }

    default:
      return state;
  }
}
