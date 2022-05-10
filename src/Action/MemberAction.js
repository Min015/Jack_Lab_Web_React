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