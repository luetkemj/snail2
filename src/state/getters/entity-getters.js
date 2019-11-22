import state from "..";

export const getPlayer = () => getEntity(0);
export const getEntity = id => state.entities[id];
