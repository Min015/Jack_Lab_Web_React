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
    case "GET_Members":
      console.log('member=>', 18);
      _axios
        .get('/manager/user',)
        .then(response => response.data.data)
        .catch(err => {
          throw new Error(err);
        })
        .then(json => {
          return next({
            type: 'SAVE_Member',
            payload: json
          });
        });
      break;
    default:
      console.log('default');
      break;
  }
  return next(action);
};

export default fetch;
