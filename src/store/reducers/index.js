// rootReducer.js
import { combineReducers } from "redux";

import entities from "./entities.reducer";
import tiles from "./tiles.reducer";

const rootReducer = combineReducers({ entities, tiles });

export default rootReducer;
