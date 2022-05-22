export const GET_ProjectType = (page,search,callback) => {
  return (dispatch) => {
    dispatch({
      type: "GET_ProjectType",
      page:page,
      search:search,
      callback:callback,
    });
  };
}
export const GET_ProjectTypeAll = () => {
  return (dispatch) => {
    dispatch({
      type: "GET_ProjectTypeAll",
    });
  };
}
export const POST_AddProjectType = (payload,callback) => {
  return (dispatch) => {
    dispatch({
      type: "POST_AddProjectType",
      payload: payload,
      callback: callback,
    });
  };
}
export const PUT_UpdateProjectType = (payload,callback) => {
  return (dispatch) => {
    dispatch({
      type: "PUT_UpdateProjectType",
      payload: payload,
      callback: callback,
    });
  };
}
export const DELETE_ProjectType = (payload,callback) => {
  return (dispatch) => {
    dispatch({
      type: "DELETE_ProjectType",
      payload: payload,
      callback: callback,
    });
  };
}
export const GET_Project = (page,search,callback) => {
  return (dispatch) => {
    dispatch({
      type: "GET_Project",
      page:page,
      search:search,
      callback:callback,
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
export const POST_AddProject = (payload,callback) => {
  return (dispatch) => {
    dispatch({
      type: "POST_AddProject",
      payload: payload,
      callback: callback,
    });
  };
}
export const PUT_UpdateProject = (payload,callback) => {
  return (dispatch) => {
    dispatch({
      type: "PUT_UpdateProject",
      payload: payload,
      callback:callback,
    });
  };
}
export const POST_AddProjectRecord = (payload,callback) => {
  return (dispatch) => {
    dispatch({
      type: "POST_AddProjectRecord",
      payload: payload,
      callback:callback,
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
export const DELETE_ProjectRecord = (payload,callback) => {
  return (dispatch) => {
    dispatch({
      type: "DELETE_ProjectRecord",
      payload: payload,
      callback:callback,
    });
  };
}
export const POST_UpdateProjectRecord = (payload,callback) => {
  return (dispatch) => {
    dispatch({
      type: "POST_UpdateProjectRecord",
      payload: payload,
      callback:callback,
    });
  };
}
export const DELETE_Project = (payload,callback) => {
  return (dispatch) => {
    dispatch({
      type: "DELETE_Project",
      payload: payload,
      callback:callback,
    });
  };
}