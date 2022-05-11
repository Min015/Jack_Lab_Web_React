import { combineReducers } from "redux";

import meetingReducer from "./meetingReducer";
import memberReducer from "./memberReducer";


const route=combineReducers({meetingReducer,memberReducer});
export default route;
