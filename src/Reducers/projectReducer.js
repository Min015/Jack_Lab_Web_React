const initialState = {};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case "SAVE_ProjectType":
      return { ...state, ProjectType: action.payload };
    case "SAVE_Project":
      return { ...state, Project: action.payload };
    case "SAVE_ProjectInfo":
      return { ...state, ProjectInfo: action.payload };
    default:
      return state;
  }
};