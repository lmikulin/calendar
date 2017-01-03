import {combineReducers} from "redux";

import calendar from "./calendar";
import events from "./events";
import weather from "./weather";

export default combineReducers({calendar, events, weather});
