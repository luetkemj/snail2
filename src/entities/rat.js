import { sample } from "lodash";
import { drunkenWalk, walkDijkstra } from "../lib/movement";

const move = id => {
  walkDijkstra(id);
};

const rat = () => ({
  id: 0,
  x: 0,
  y: 0,
  name: "rat",
  sprite: "RAT",
  blocking: true,
  health: 5,
  type: "MONSTER",
  volition: id => move(id)
});

export default rat;
