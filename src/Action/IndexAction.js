export const GET_AdminAlbum = (page, search, callback) => {
  return (dispatch) => {
    dispatch({
      type: "GET_AdminAlbum",
      page: page,
      search: search,
      callback: callback,
    });
  };
}
export const GET_AdminAlbumAll = () => {
  return (dispatch) => {
    dispatch({
      type: "GET_AdminAlbumAll",
    });
  };
}
export const POST_AddAlbum = (payload, callback) => {
  return (dispatch) => {
    dispatch({
      type: "POST_AddAlbum",
      payload: payload,
      callback: callback,
    });
  };
}
export const POST_UpdataAlbum = (payload, callback) => {
  return (dispatch) => {
    dispatch({
      type: "POST_UpdataAlbum",
      payload: payload,
      callback: callback,
    });
  };
}
export const DELETE_AdAlbum = (payload, callback) => {
  return (dispatch) => {
    dispatch({
      type: "DELETE_AdAlbum",
      payload: payload,
      callback: callback,
    });
  };
}
export const GET_Book = (page, search, callback) => {
  return (dispatch) => {
    dispatch({
      type: "GET_Book",
      page: page,
      search: search,
      callback: callback,
    });
  };
}
export const POST_AddBook = (payload, callback) => {
  return (dispatch) => {
    dispatch({
      type: "POST_AddBook",
      payload: payload,
      callback: callback,
    });
  };
}
export const DELETE_Book = (payload, callback) => {
  return (dispatch) => {
    dispatch({
      type: "DELETE_Book",
      payload: payload,
      callback: callback,
    });
  };
}
export const GET_BookInfo = (payload, callback) => {
  return (dispatch) => {
    dispatch({
      type: "GET_BookInfo",
      payload: payload,
      callback: callback,
    });
  };
}
export const PUT_UpdateBookInfo = (payload, callback) => {
  return (dispatch) => {
    dispatch({
      type: "PUT_UpdateBookInfo",
      payload: payload,
      callback: callback,
    });
  };
}
export const POST_UpdateBookPhoto = (payload, callback) => {
  return (dispatch) => {
    dispatch({
      type: "POST_UpdateBookPhoto",
      payload: payload,
      callback: callback,
    });
  };
}