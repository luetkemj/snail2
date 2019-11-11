import { ADD_ENTITIES, MOVE_ENTITY, PLACE_ENTITY } from "../action-types";
import { WIDTH, HEIGHT } from "../../constants";

const initialState = {
  0: {
    x: WIDTH / 2,
    y: HEIGHT / 2,
    sprite: "PLAYER",
    blocking: true
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PLACE_ENTITY: {
      const { id, x, y } = action.payload;

      const entity = {
        ...state[id],
        x,
        y
      };

      return {
        ...state,
        [id]: entity
      };
    }

    case MOVE_ENTITY: {
      const { id, x, y } = action.payload;

      const entity = {
        ...state[id],
        x,
        y
      };

      return {
        ...state,
        [id]: entity
      };
    }

    case ADD_ENTITIES: {
      const { entities } = action.payload;
      return {
        ...state,
        ...entities
      };
    }
    default:
      return state;
  }
}
