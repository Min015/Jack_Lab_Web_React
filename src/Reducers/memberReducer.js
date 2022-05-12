const initialState = {};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case "SAVE_PublicMembers":
      return { ...state, PublicMemberList: action.payload };
    case "SAVE_Role":
      return { ...state, RoleList: action.payload };
    case "SAVE_Class":
      return { ...state, ClassList: action.payload };
    case "SAVE_PrivateMember":
      return { ...state, PrivateMember: action.payload };
    case "SAVE_Permission":
      return{...state,PermissionList:action.payload};
    case "SAVE_RolePermission":
      return{...state,RolePermission:action.payload};
    default:
      return state;
  }
};