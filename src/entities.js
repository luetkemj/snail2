export const PLAYER = {
  id: 0,
  x: 0,
  y: 0,
  name: "@",
  sprite: "PLAYER",
  blocking: true,
  health: 30,
  type: "PLAYER"
};

export const MONSTER = {
  id: 0,
  x: 0,
  y: 0,
  name: "",
  sprite: "MONSTER",
  blocking: true,
  health: 10,
  type: "MONSTER"
};

export const PICKUP = {
  id: 0,
  x: 0,
  y: 0,
  name: "",
  sprite: "POTION",
  blocking: false,
  buff: {
    prop: "health",
    n: 10
  },
  type: "PICKUP"
};
