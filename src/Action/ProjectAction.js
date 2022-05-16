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
      payload: payload,
    });
  };
}
export const PUT_UpdateProjectType = (payload) => {
  return (dispatch) => {
    dispatch({
      type: "PUT_UpdateProjectType",
      payload: payload,
    });
  };
}
export const DELETE_ProjectType = (payload) => {
  return (dispatch) => {
    dispatch({
      type: "DELETE_ProjectType",
      payload: payload,
    });
  };
}
export const GET_Project = () => {
  return (dispatch) => {
    dispatch({
      type: "GET_Project",
    });
  };
}
export const GET_ProjectInfo = (payload, callback) => {
  return (dispatch) => {
    dispatch({
      type: "GET_ProjectInfo",
      payload: payload,
      callback: callback,
    });
  };
}
export const POST_AddProject = (payload) => {
  return (dispatch) => {
    dispatch({
      type: "POST_AddProject",
      payload: payload,
    });
  };
}
export const PUT_UpdateProject = (payload) => {
  return (dispatch) => {
    dispatch({
      type: "PUT_UpdateProject",
      payload: payload,
    });
  };
}
export const POST_AddProjectRecord = (payload) => {
  return (dispatch) => {
    dispatch({
      type: "POST_AddProjectRecord",
      payload: payload,
    });
  };
}
export const GET_RecordFile = (payload) => {
  return (dispatch) => {
    dispatch({
      type: "GET_RecordFile",
      payload: payload,
    });
  };
}
export const DELETE_ProjectRecord = (payload) => {
  return (dispatch) => {
    console.log(82,payload);
    dispatch({
      type: "DELETE_ProjectRecord",
      payload: payload,
    });
  };
}
export const POST_UpdateProjectRecord = (payload) => {
  return (dispatch) => {
    dispatch({
      type: "POST_UpdateProjectRecord",
      payload: payload,
    });
  };
}