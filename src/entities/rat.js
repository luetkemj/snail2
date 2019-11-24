import { sample } from "lodash";
import { drunkenWalk, walkDijkstra, hasMoved } from "../lib/movement";
import { getLoc } from "../state/getters/entity-getters";
import { setEntityDijkstra } from "../state/setters/map-setters";

const move = id => {
  const oldLoc = getLoc(id);

  walkDijkstra("corpse", id) || drunkenWalk(id);

  const newLoc = getLoc(id);

  if (hasMoved(oldLoc, newLoc)) {
    setEntityDijkstra("rat");
  }
};

const rat = () => ({
  id: 0,
  x: 0,
  y: 0,
  type: "MONSTER",
  kind: "rat",
  name: "rat",
  sprite: "RAT",
  blocking: true,
  health: 5,
  volition: id => move(id)
});

export default rat;
