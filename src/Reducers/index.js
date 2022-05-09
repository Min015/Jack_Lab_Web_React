import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import meetingReducer from "./meetingReducer";
import memberReducer from "./memberReducer";
//寫法二
// export default combineReducers({meetingReducer,memberReducer})
// const rootReducer=combineReducers({
//     meeting:meetingReducer,
//     member:memberReducer,
// })
// export default rootReducer;


//寫法一
// const route = combineReducers(
//     {
//         data: meetingReducer,
//         routing: routerReducer
//     },
//     {
//         data: memberReducer,
//         routing: routerReducer
//     },
// );

// export default route;

//寫法三
const route=combineReducers({meetingReducer,memberReducer});
export default route;
// export default combineReducers({meetingReducer,memberReducer});