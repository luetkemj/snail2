const state = {
  entities: {
    0: {
      x: 0,
      y: 0,
      sprite: "PLAYER",
      blocking: true
    }
  },
  maps: {
    currentMapId: 0,
    fov: [],
    fovs: {},
    0: {
      id: 0,
      tiles: {},
      start: {},
      openTileIds: [],
      tileIds: [],
      entityIds: [],
      revealedTileIds: [],
      entityLocations: {}
    }
  }
};

export default state;
