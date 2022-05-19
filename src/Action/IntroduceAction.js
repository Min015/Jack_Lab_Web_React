export const GET_LabIntroduce = () => {
  return (dispatch) => {
    dispatch({
      type: "GET_LabIntroduce",
    });
  };
}
export const POST_AddLabIntroduce = (payload, callback) => {
  return (dispatch) => {
    dispatch({
      type: "POST_AddLabIntroduce",
      payload: payload,
      callback: callback,
    });
  };
}
export const PUT_UpdateLabIntroduce = (payload, callback) => {
  return (dispatch) => {
    dispatch({
      type: "PUT_UpdateLabIntroduce",
      payload: payload,
      callback: callback,
    });
  };
}
export const DELETE_LabIntroduce = (payload, callback) => {
  return (dispatch) => {
    dispatch({
      type: "DELETE_LabIntroduce",
      payload: payload,
      callback: callback,
    });
  };
}
export const GET_TeacherIntroduce = () => {
  return (dispatch) => {
    dispatch({
      type: "GET_TeacherIntroduce",
    });
  };
}
export const POST_AddTeacher = (payload, callback) => {
  return (dispatch) => {
    dispatch({
      type: "POST_AddTeacher",
      payload: payload,
      callback: callback,
    });
  };
}
export const POST_UpdatePhoto = (payload, callback) => {
  return (dispatch) => {
    dispatch({
      type: "POST_UpdatePhoto",
      payload: payload,
      callback: callback,
    });
  };
}
export const PUT_UpdateTeacherIntroduce = (payload, callback) => {
  return (dispatch) => {
    dispatch({
      type: "PUT_UpdateTeacherIntroduce",
      payload: payload,
      callback: callback,
    });
  };
}
export const DELETE_TeacherIntroduce = (payload, callback) => {
  return (dispatch) => {
    dispatch({
      type: "DELETE_TeacherIntroduce",
      payload: payload,
      callback: callback,
    });
  };
}