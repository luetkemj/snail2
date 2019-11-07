import { MOVE_ENTITY } from "../action-types";

export const moveEntity = ({ id, x, y }) => ({
  type: MOVE_ENTITY,
  payload: { id, x, y }
});
