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
    case "GET_ProjectType":
      _axios
        .get(`/project/type`,)
        .then(response => {
          console.log(response);
          if (response.status === 200) {
            return response.data.data;
          }
        })
        .catch(err => {
          console.log(err);
          throw new Error(err);
        })
        .then(json => {
          return next({
            type: 'SAVE_ProjectType',
            payload: json
          });
        });
      break;
    case "POST_AddProjectType":
      _axios
        .post(`/project/type`, action.payload)
        .then(response => {
          console.log(response);
          if (response.status === 200) {
            console.log("新增專案類型成功");
          }
        })
        .catch(err => {
          console.log(err);
          throw new Error(err);
        })
      break;
    case "PUT_UpdateProjectType":
      _axios
        .put(`/project/type`, action.payload)
        .then(response => {
          console.log(response);
          if (response.status === 200) {
            console.log("修改專案類型成功");
          }
        })
        .catch(err => {
          console.log(err);
          throw new Error(err);
        })
      break;
    case "DELETE_ProjectType":
      _axios
        .delete(`/project/type?id=${action.payload}`,)
        .then(response => {
          console.log(response);
          if (response.status === 200) {
            console.log("刪除專案性質成功")
          }
        })
        .catch(err => {
          console.log(err);
          throw new Error(err);
        })
      break;
    case "GET_Project":
      _axios
        .get(`/project/list`,)
        .then(response => {
          console.log(response);
          if (response.status === 200) {
            return response.data.data;
          }
        })
        .catch(err => {
          console.log(err);
          throw new Error(err);
        })
        .then(json => {
          return next({
            type: 'SAVE_Project',
            payload: json
          });
        });
      break;
    case "GET_ProjectInfo":
      _axios
        .get(`/project?id=${action.payload}`,)
        .then(response => {
          console.log(response);
          if (response.status === 200) {
            return response.data.data;
          }
        })
        .catch(err => {
          console.log(err);
          throw new Error(err);
        })
        .then(json => {
          if (action.callback) {
            action.callback(json)
          }
          return next({
            type: 'SAVE_ProjectInfo',
            payload: json,
          });
        });
      break;
    case "POST_AddProject":
      _axios
        .post(`/project`, action.payload)
        .then(response => {
          console.log(response);
          if (response.status === 200) {
            console.log("建立專案成功");
          }
        })
        .catch(err => {
          console.log(err);
          throw new Error(err);
        })
      break;
    default:
      break;
  }
  return next(action);
};

export default fetch;
