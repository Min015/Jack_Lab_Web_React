const initialState = {};

export default (state = initialState, action) => {
    switch (action.type) {
        case "SAVE_function":
            return { ...state, data: action.payload };
        default:
            return state;
    }
};