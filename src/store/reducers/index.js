// rootReducer.js
import { combineReducers } from "redux";

import entities from "./entities.reducer";

const rootReducer = combineReducers({ entities });

export default rootReducer;
