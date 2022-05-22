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
        .get(`/album/list?page=${action.page}&search=${action.search}`,)
        .then(response => {
          if (response.status === 200) {
            return response.data.data;
          }
        })
        .catch(err => {
          console.log(err.response.data);
          throw new Error(err);
        })
        .then(json => {
          if (action.callback) {
            action.callback(json)
          }
          return next({
            type: 'SAVE_AdminAlbum',
            payload: json
          });
        });
      break;
    case "DELETE_AdAlbum":
      _axios
        .delete(`/album?id=${action.payload}`,)
        .then(response => {
          console.log(response);
          if (response.status === 200) {
            console.log("刪除專案性質成功")
          }
        })
        .catch(err => {
          console.log(err.response.data);
          throw new Error(err);
        })
        .then(json => {
          if (action.callback) {
            action.callback(json)
          }
        });
      break;
    case "GET_Book":
      _axios
        .get(`/book/list?page=${action.page}&search=${action.search}`,)
        .then(response => {
          if (response.status === 200) {
            return response.data.data;
          }
        })
        .catch(err => {
          console.log(err.response.data);
          throw new Error(err);
        })
        .then(json => {
          if (action.callback) {
            action.callback(json)
          }
          return next({
            type: 'SAVE_Book',
            payload: json
          });
        });
      break;
    case "POST_AddBook":
      _axios
        .post('/book', action.payload)
        .then(response => {
          if (response.status === 200) {
            console.log("新增出版品成功");
          }
        })
        .catch(err => {
          console.log(err.response.data);
          throw new Error(err);
        })
        .then(json => {
          if (action.callback) {
            action.callback(json)
          }
        });
      break;
    case "DELETE_Book":
      _axios
        .delete(`/book?id=${action.payload}`,)
        .then(response => {
          console.log(response);
          if (response.status === 200) {
            console.log("刪除出版品成功")
          }
        })
        .catch(err => {
          console.log(err.response.data);
          throw new Error(err);
        })
        .then(json => {
          if (action.callback) {
            action.callback(json)
          }
        });
      break;
    case "GET_BookInfo":
      _axios
        .get(`/book?id=${action.payload}`)
        .then(response => {
          if (response.status === 200) {
            return response.data.data;
          }
        })
        .catch(err => {
          console.log(err.response.data);
          throw new Error(err);
        })
        .then(json => {
          if (action.callback) {
            action.callback(json)
          }
          return next({
            type: 'SAVE_BookInfo',
            payload: json
          });
        });
      break;
    case "PUT_UpdateBookInfo":
      _axios
        .put('/book', action.payload)
        .then(response => {
          console.log(response);
          if (response.status === 200) {
            console.log("修改出版品資訊成功");
          }
        })
        .catch(err => {
          console.log(err.response.data);
          throw new Error(err);
        })
        .then(json => {
          if (action.callback) {
            action.callback(json)
          }
        });
      break;
    default:
      break;
  }
  return next(action);
};

export default fetch;
