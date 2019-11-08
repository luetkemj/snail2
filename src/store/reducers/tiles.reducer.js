import { WIDTH, HEIGHT } from "../../constants";
import { rectangle } from "../../lib/grid";

const tiles = rectangle(WIDTH, HEIGHT, "GRASS");

tiles["30,32"] = { ...tiles["30,32"], sprite: "WALL", blocking: true };
tiles["30,33"] = { ...tiles["30,33"], sprite: "WALL", blocking: true };
tiles["30,34"] = { ...tiles["30,34"], sprite: "WALL", blocking: true };

const initialState = {
  tiles,
  ids: Object.keys(tiles)
};

export default function(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
