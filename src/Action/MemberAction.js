export const POST_Login = (payload,callback) => {
  return (dispatch) => {
    dispatch({
      type: "POST_Login",
      payload: payload,
      callback:callback,
    });
  };
}
export const GET_IsLogin = (callback) => {
  return (dispatch) => {
    dispatch({
      type: "GET_IsLogin",
      callback:callback,
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
export const GET_Role = (page, search, callback) => {
  return (dispatch) => {
    dispatch({
      type: "GET_Role",
      page: page,
      search: search,
      callback: callback,
    });
  };
}
export const GET_RoleAll = () => {
  return (dispatch) => {
    dispatch({
      type: "GET_RoleAll",
    });
  };
}
export const GET_Academic = () => {
  return (dispatch) => {
    dispatch({
      type: "GET_Academic",
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
export const GET_PrivateMember = (page, search, academic, callback) => {
  return (dispatch) => {
    dispatch({
      type: "GET_PrivateMember",
      page: page,
      search: search,
      academic: academic,
      callback: callback,
    });
  };
}
export const POST_UserAdd = (payload, callback) => {
  return (dispatch) => {
    dispatch({
      type: "POST_UserAdd",
      payload: payload,
      callback: callback,
    });
  };
}
export const PUT_ChangeRole = (payload,callback) => {
  return (dispatch) => {
    dispatch({
      type: "PUT_ChangeRole",
      payload: payload,
      callback:callback,
    });
  };
}
export const PUT_ChangeClass = (payload,callback) => {
  return (dispatch) => {
    dispatch({
      type: "PUT_ChangeClass",
      payload: payload,
      callback:callback,
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
export const GET_RolePermission = (payload, callback) => {
  return (dispatch) => {
    dispatch({
      type: "GET_RolePermission",
      payload: payload,
      callback: callback
    });
  };
}
export const PUT_ChangeRolePermission = (payload, callback) => {
  return (dispatch) => {
    dispatch({
      type: "PUT_ChangeRolePermission",
      payload: payload,
      callback: callback,
    });
  };
}
export const POST_RoleAdd = (payload, callback) => {
  return (dispatch) => {
    dispatch({
      type: "POST_RoleAdd",
      payload: payload,
      callback: callback,
    });
  };
}
export const DELETE_Role = (payload, callback) => {
  return (dispatch) => {
    dispatch({
      type: "DELETE_Role",
      payload: payload,
      callback: callback,
    });
  };
}
export const PUT_ChangePassword = (payload, callback) => {
  return (dispatch) => {
    dispatch({
      type: "PUT_ChangePassword",
      payload: payload,
      callback: callback,
    });
  };
}
export const DELETE_Member = (payload, callback) => {
  return (dispatch) => {
    dispatch({
      type: "DELETE_Member",
      payload: payload,
      callback: callback,
    });
  };
}
export const GET_MyInfo = (callback) => {
  return (dispatch) => {
    dispatch({
      type: "GET_MyInfo",
      callback: callback,
    });
  };
}
export const POST_UpdateMyPhoto = (payload, callback) => {
  return (dispatch) => {
    dispatch({
      type: "POST_UpdateMyPhoto",
      payload: payload,
      callback: callback,
    });
  };
}
export const PUT_UpdateMyIntroduction = (payload, callback) => {
  return (dispatch) => {
    dispatch({
      type: "PUT_UpdateMyIntroduction",
      payload: payload,
      callback: callback,
    });
  };
}
export const GET_MyProject = (page,callback) => {
  return (dispatch) => {
    dispatch({
      type: "GET_MyProject",
      page:page,
      callback:callback,
    });
  };
}
export const PUT_UpdateMyPassword = (payload, callback) => {
  return (dispatch) => {
    dispatch({
      type: "PUT_UpdateMyPassword",
      payload: payload,
      callback: callback,
    });
  };
}
export const GET_Student = (payload,callback) => {
  return (dispatch) => {
    dispatch({
      type: "GET_Student",
      payload:payload,
      callback:callback,
    });
  };
}
export const SAVE_Permission = () => {
  return (dispatch) => {
    dispatch({
      type: "SAVE_Permission",
    });
  };
}
export const GET_Emailvalidate=(account,token,callback)=>{
  return (dispatch) => {
    dispatch({
      type: "GET_Emailvalidate",
      account:account,
      token:token,
      callback:callback,
    });
  };
}