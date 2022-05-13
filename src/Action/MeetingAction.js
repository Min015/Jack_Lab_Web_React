export const GET_Meeting = () => {
  return (dispatch) => {
    dispatch({
      type: "GET_Meeting",
    });
  };
}
export const GET_MeetingInfo = (payload,callback) => {
  return (dispatch, getState) => {
    dispatch({
      type: "GET_MeetingInfo",
      payload: payload,
      callback:callback
    });
  };
}
export const GET_MeetingDownload = payload => {
  return (dispatch) => {
    dispatch({
      type: "GET_MeetingDownload",
      payload: payload
    });
  };
}
export const DELETE_Meeting = payload => {
  return (dispatch) => {
    dispatch({
      type: "DELETE_Meeting",
      payload: payload
    });
  };
}
export const POST_AddMeeting = (payload) => {
  return (dispatch) => {
    dispatch({
      type: "POST_AddMeeting",
      payload: payload,
    });
  };
}
export const POST_UpdateMeeting = (payload) => {
  console.log("MeetingAction42",payload);
  return (dispatch) => {
    dispatch({
      type: "POST_UpdateMeeting",
      payload: payload,
    });
  };
}