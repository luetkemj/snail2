const potion = () => ({
  id: 0,
  x: 0,
  y: 0,
  type: "PICKUP",
  kind: "pickup",
  name: "Health Potion",
  sprite: "POTION",
  blocking: false,
  buff: {
    prop: "health",
    n: 10
  }
});

export default potion;
