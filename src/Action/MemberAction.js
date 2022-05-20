export const POST_Login = (payload) => {
  return (dispatch) => {
    dispatch({
      type: "POST_Login",
      payload:payload,
    });
  };
}
export const GET_PublicMembers = () => {
  return (dispatch) => {
    dispatch({
      type: "GET_PublicMembers",
    });
  };
}
export const GET_Role = () => {
  return (dispatch) => {
    dispatch({
      type: "GET_Role",
    });
  };
}
export const GET_Class = () => {
  return (dispatch) => {
    dispatch({
      type: "GET_Class",
    });
  };
}
export const GET_PrivateMember = () => {
  return (dispatch) => {
    dispatch({
      type: "GET_PrivateMember",
    });
  };
}
export const POST_UserAdd = (payload) => {
  return (dispatch) => {
    dispatch({
      type: "POST_UserAdd",
      payload:payload,
    });
  };
}
export const PUT_ChangeRole = (payload) => {
  return (dispatch) => {
    dispatch({
      type: "PUT_ChangeRole",
      payload:payload,
    });
  };
}
export const PUT_ChangeClass = (payload) => {
  return (dispatch) => {
    dispatch({
      type: "PUT_ChangeClass",
      payload:payload,
    });
  };
}
export const GET_PermissionList = () => {
  return (dispatch) => {
    dispatch({
      type: "GET_Permission",
    });
  };
}
export const GET_RolePermission = (payload,callback) => {
  return (dispatch) => {
    dispatch({
      type: "GET_RolePermission",
      payload:payload,
      callback:callback
    });
  };
}
export const PUT_ChangeRolePermission = (payload,callback) => {
  return (dispatch) => {
    dispatch({
      type: "PUT_ChangeRolePermission",
      payload:payload,
      callback:callback,
    });
  };
}
export const POST_RoleAdd = (payload,callback) => {
  return (dispatch) => {
    dispatch({
      type: "POST_RoleAdd",
      payload:payload,
      callback:callback,
    });
  };
}
export const DELETE_Role = (payload,callback) => {
  return (dispatch) => {
    dispatch({
      type: "DELETE_Role",
      payload:payload,
      callback:callback,
    });
  };
}
export const PUT_ChangePassword = (payload) => {
  return (dispatch) => {
    dispatch({
      type: "PUT_ChangePassword",
      payload:payload,
    });
  };
}
export const DELETE_Member = (payload) => {
  return (dispatch) => {
    dispatch({
      type: "DELETE_Member",
      payload:payload,
    });
  };
}