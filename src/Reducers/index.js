import { combineReducers } from "redux";

import meetingReducer from "./meetingReducer";
import memberReducer from "./memberReducer";
import projectReducer from "./projectReducer";
import guestindexReducer from "./guestindexReducer";


const route=combineReducers(
  {meetingReducer,
    memberReducer,
    projectReducer,
    guestindexReducer,
  });
export default route;
