export const GET_AdminAlbum = () => {
  return (dispatch) => {
    dispatch({
      type: "GET_AdminAlbum",
    });
  };
}
export const POST_AddAlbum = (payload,callback) => {
  return (dispatch) => {
    dispatch({
      type: "POST_AddAlbum",
      payload:payload,
      callback:callback,
    });
  };
}
export const POST_UpdataAlbum = (payload,callback) => {
  return (dispatch) => {
    dispatch({
      type: "POST_UpdataAlbum",
      payload:payload,
      callback:callback,
    });
  };
}
export const DELETE_AdAlbum = (payload,callback) => {
  return (dispatch) => {
    dispatch({
      type: "DELETE_AdAlbum",
      payload: payload,
      callback:callback,
    });
  };
}