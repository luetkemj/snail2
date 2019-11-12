import { PLAYER } from "../entities";

const state = {
  config: {
    omniscience: false
  },
  entities: { 0: { ...PLAYER } },
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
