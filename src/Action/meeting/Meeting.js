export const GET_Meeting = payload => {
    return (dispatch, getState) => {
      dispatch({
        type: "SAVE_function",
        payload: payload
      });
    };
  }