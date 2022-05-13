import { combineReducers } from "redux";

import meetingReducer from "./meetingReducer";
import memberReducer from "./memberReducer";
import projectReducer from "./projectReducer";


const route=combineReducers({meetingReducer,memberReducer,projectReducer});
export default route;
