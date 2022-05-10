const initialState = {};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  console.log(5,action.type);
  switch (action.type) {
    case "SAVE_PublicMember":
      return { ...state, MemberList: action.payload };

    default:
      return state;
  }
};