// rootReducer.js
import { combineReducers } from "redux";

import entities from "./entities.reducer";
import maps from "./maps.reducer";
import tiles from "./tiles.reducer";

const rootReducer = combineReducers({ entities, maps, tiles });

export default rootReducer;
