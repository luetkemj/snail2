import { sample } from "lodash";
import { drunkenWalk, walkDijkstra, hasMoved } from "../lib/movement";
import { getLoc } from "../state/getters/entity-getters";
import { setEntityDijkstra } from "../state/setters/map-setters";

const goblinNames = [
  "Akbug",
  "Argav",
  "Brigadve",
  "Corbakl",
  "Cruncha",
  "Frum",
  "Gelmax",
  "Glibl",
  "Glogroth Von Bloov",
  "Glovd",
  "Gorf",
  "Grelth",
  "Grickstah",
  "Griga",
  "Groovilla Dar Trog",
  "Khroongah",
  "Kosrik",
  "Makdur",
  "Porgl",
  "Throngul",
  "Thuk",
  "Tryxtah",
  "Vorlag",
  "Yorvua"
];

const move = id => {
  const oldLoc = getLoc(id);

  walkDijkstra("rat", id, 10) || drunkenWalk(id);

  const newLoc = getLoc(id);

  if (hasMoved(oldLoc, newLoc)) {
    setEntityDijkstra("goblin");
  }
};

const goblin = () => ({
  type: "MONSTER",
  kind: "goblin",
  name: sample(goblinNames),
  sprite: "GOBLIN",
  id: 0,
  x: 0,
  y: 0,
  blocking: true,
  health: 10,
  volition: id => move(id)
});

export default goblin;
