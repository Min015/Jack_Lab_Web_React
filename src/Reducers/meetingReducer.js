const initialState = {};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
    console.log(action.type);
    switch (action.type) {
        case "SAVE_Meeting":
            return { ...state, MeetingList: action.payload };

        case "SAVE_MeetingInfo":
            return { ...state, MeetingInfo: action.payload };

        default:
            return state;
    }
};