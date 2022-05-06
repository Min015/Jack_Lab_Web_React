import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import meetingReducer from "./meetingReducer";

const route = combineReducers(
    {
        data: meetingReducer,
        routing: routerReducer
    },
);

export default route;