const state = {
  game: {
    turn: 0
  },
  config: {
    omniscience: false
  },
  menu: {
    log: []
  },
  entities: {},
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
