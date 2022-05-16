import axios from "axios";

const token = localStorage.getItem("user_token");
const BaseURL = 'http://localhost/api';
const _axios = axios.create({
  baseURL: BaseURL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Authorization': `bearer ${token}`
  }
})
const fetch = store => next => action => {
  switch (action.type) {
    case "GET_AdminAlbum":
      _axios
        .get('/album',)
        .then(response => {
          if (response.status === 200) {
            return response.data.data;
          }
        })
        .catch(err => {
          throw new Error(err);
        })
        .then(json => {
          return next({
            type: 'SAVE_AdminAlbum',
            payload: json
          });
        });
      break;
    default:
      break;
  }
  return next(action);
};

export default fetch;
