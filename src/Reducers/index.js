import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import meetingReducer from "./meetingReducer";
import memberReducer from "./memberReducer";
const route = combineReducers(
    {
        data: meetingReducer,
        routing: routerReducer
    },
    {
        data: memberReducer,
        routing: routerReducer
    },
);

export default route;