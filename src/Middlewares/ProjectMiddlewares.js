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
        .get(`/project/type?page=${action.page}&search=${action.search}`,)
        .then(response => {
          console.log(response);
          if (response.status === 200) {
            return response.data.data;
          }
        })
        .catch(err => {
          alert(err.response.data.message);
          throw new Error(err);
        })
        .then(json => {
          if (action.callback) {
            action.callback(json)
          }
          return next({
            type: 'SAVE_ProjectType',
            payload: json
          });
        });
      break;
    case "GET_ProjectTypeAll":
      _axios
        .get(`/project/type/select`,)
        .then(response => {
          console.log(response);
          if (response.status === 200) {
            return response.data.data;
          }
        })
        .catch(err => {
          alert(err.response.data.message);
          throw new Error(err);
        })
        .then(json => {
          return next({
            type: 'SAVE_ProjectTypeAll',
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
          alert(err.response.data.message);
          throw new Error(err);
        })
        .then(json => {
          if (action.callback) {
            action.callback(json)
          }
        });
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
          alert(err.response.data.message);
          throw new Error(err);
        })
        .then(json => {
          if (action.callback) {
            action.callback(json)
          }
        });
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
          alert(err.response.data.message);
          throw new Error(err);
        })
        .then(json => {
          if (action.callback) {
            action.callback(json)
          }
        });
      break;
    case "GET_Project":
      _axios
        .get(`/project/list?page=${action.page}&search=${action.search}&id=${action.id}`,)
        .then(response => {
          console.log(response);
          if (response.status === 200) {
            return response.data.data;
          }
        })
        .catch(err => {
          alert(err.response.data.message);
          throw new Error(err);
        })
        .then(json => {
          if (action.callback) {
            action.callback(json)
          }
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
          alert(err.response.data.message);
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
    case "GET_ProjectRecord":
      _axios
        .get(`/project/record?id=${action.payload}&page=${action.page}&search=${action.search}`,)
        .then(response => {
          console.log(response);
          if (response.status === 200) {
            return response.data.data;
          }
        })
        .catch(err => {
          alert(err.response.data.message);
          throw new Error(err);
        })
        .then(json => {
          if (action.callback) {
            action.callback(json)
          }
          return next({
            type: 'SAVE_ProjectRecord',
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
          alert(err.response.data.message);
          throw new Error(err);
        })
        .then(json => {
          if (action.callback) {
            action.callback(json)
          }
        });
      break;
    case "PUT_UpdateProject":
      _axios
        .put(`/project`, action.payload)
        .then(response => {
          console.log(response);
          if (response.status === 200) {
            console.log("修改專案內容成功");
          }
        })
        .catch(err => {
          alert(err.response.data.message);
          throw new Error(err);
        })
        .then(json => {
          if (action.callback) {
            action.callback(json)
          }
        });
      break;
    case "GET_RecordFile":
      _axios
        .get(`/download/project?id=${action.payload}`,)
        .then(response => {
          console.log(response);
          if (response.status === 200) {
            window.open(`${BaseURL}/download/project?id=${action.payload}`)
          }
        })
        .catch(err => {
          alert(err.response.data.message);
          throw new Error(err);
        })
      break;
    case "DELETE_ProjectRecord":
      _axios
        .delete(`/project/record?id=${action.payload}`,)
        .then(response => {
          console.log(response);
          if (response.status === 200) {
            console.log("刪除專案記錄")
          }
        })
        .catch(err => {
          alert(err.response.data.message);
          throw new Error(err);
        })
        .then(json => {
          if (action.callback) {
            action.callback(json)
          }
        });
      break;
    case "DELETE_Project":
      _axios
        .delete(`/project?id=${action.payload}`,)
        .then(response => {
          console.log(response);
          if (response.status === 200) {
            console.log("刪除專案成功")
          }
        })
        .catch(err => {
          alert(err.response.data.message);
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
