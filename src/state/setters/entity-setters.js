import state from "../../state";

export const setEntityLocation = (x, y, entityId) => {
  state.entities[entityId].x = x;
  state.entities[entityId].y = y;
};

export const setEntity = entity => {
  state.entities[entity.id] = entity;
};
