const initialState = {};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case "SAVE_PublicMembers":
      return { ...state, PublicMemberList: action.payload };
    case "SAVE_Role":
      return { ...state, RoleList: action.payload };
    case "SAVE_RoleAll":
      return { ...state, RoleListAll: action.payload };
    case "SAVE_Academic":
      return { ...state, AcademicList: action.payload };
    case "SAVE_Class":
      return { ...state, ClassList: action.payload };
    case "SAVE_PrivateMember":
      return { ...state, PrivateMember: action.payload };
    case "SAVE_Permission":
      return { ...state, PermissionList: action.payload };
    case "SAVE_RolePermission":
      return { ...state, RolePermission: action.payload };
    case "SAVE_MyInfo":
      return { ...state, MyInfo: action.payload };
    case "SAVE_MyProject":
      return { ...state, MyProject: action.payload };
    case "SAVE_IsLogin":
      return { ...state, IsLogin: action.payload };
    case "SAVE_Student":
      return { ...state, Student: action.payload };
    case "SAVE_MyPermission":
      return { ...state, MyPermission: action.payload };
    default:
      return state;
  }
};