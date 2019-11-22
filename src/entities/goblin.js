import { sample } from "lodash";
import { drunkenWalk, walkDijkstra } from "../lib/movement";

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
  // const newLoc = drunkenWalk(entities[id].x, entities[id].y);
  // attemptMove(newLoc.x, newLoc.y, id);
  walkDijkstra(id);
};

const goblin = () => ({
  id: 0,
  x: 0,
  y: 0,
  name: sample(goblinNames),
  sprite: "MONSTER",
  blocking: true,
  health: 10,
  type: "MONSTER",
  volition: id => move(id)
});

export default goblin;
