export const GET_LabIntroduce = () => {
  return (dispatch) => {
    dispatch({
      type: "GET_LabIntroduce",
    });
  };
}
export const POST_AddLabIntroduce = (payload,callback) => {
  return (dispatch) => {
    dispatch({
      type: "POST_AddLabIntroduce",
      payload:payload,
      callback:callback,
    });
  };
}
export const PUT_UpdateLabIntroduce = (payload,callback) => {
  return (dispatch) => {
    dispatch({
      type: "PUT_UpdateLabIntroduce",
      payload:payload,
      callback:callback,
    });
  };
}
export const DELETE_LabIntroduce = (payload,callback) => {
  return (dispatch) => {
    dispatch({
      type: "DELETE_LabIntroduce",
      payload: payload,
      callback:callback,
    });
  };
}