export const POST_Login = (payload) => {
  return (dispatch) => {
    dispatch({
      type: "POST_Login",
      payload:payload,
    });
  };
}
export const GET_Members = () => {
  return (dispatch) => {
    dispatch({
      type: "GET_Members",
    });
  };
}