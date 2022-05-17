import { combineReducers } from "redux";

import meetingReducer from "./meetingReducer";
import memberReducer from "./memberReducer";
import projectReducer from "./projectReducer";
import guestindexReducer from "./guestindexReducer";
import introduceReducer from "./introduceReducer";



const route=combineReducers(
  {meetingReducer,
    memberReducer,
    projectReducer,
    guestindexReducer,
    introduceReducer,
  });
export default route;
