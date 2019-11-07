import { bindActionCreators } from "redux";
import { MOVE_ENTITY } from "../action-types";

const initialState = {
  0: {
    x: 10,
    y: 10
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
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
    default:
      return state;
  }
}
