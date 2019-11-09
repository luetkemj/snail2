// rootReducer.js
import { combineReducers } from "redux";

import entities from "./entities.reducer";
import maps from "./maps.reducer";

const rootReducer = combineReducers({ entities, maps });

export default rootReducer;
