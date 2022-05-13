export const GET_ProjectType = () => {
  return (dispatch) => {
    dispatch({
      type: "GET_ProjectType",
    });
  };
}
export const POST_AddProjectType = (payload) => {
  return (dispatch) => {
    dispatch({
      type: "POST_AddProjectType",
      payload:payload,
    });
  };
}
export const PUT_UpdateProjectType = (payload) => {
  return (dispatch) => {
    dispatch({
      type: "PUT_UpdateProjectType",
      payload:payload,
    });
  };
}
export const DELETE_ProjectType = (payload) => {
  return (dispatch) => {
    dispatch({
      type: "DELETE_ProjectType",
      payload:payload,
    });
  };
}