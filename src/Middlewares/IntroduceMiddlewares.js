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
    case "GET_LabIntroduce":
      _axios
        .get(`/labinfo/list?page=${action.page}&search=${action.search}`,)
        .then(response => {
          return response.data.data;
          // if (response.status === 200) {
          //   console.log("取得LAB介紹");
          //   return response.data.data;
          // }
        })
        .catch(err => {
          if (err.response.status === 401) {
            localStorage.clear();
            window.location.replace('http://localhost:3000/index');
          }
          alert(err.response.data.message);
          throw new Error(err);
        })
        .then(json => {
          if (action.callback) {
            action.callback(json)
          }
          return next({
            type: 'SAVE_LabIntroduce',
            payload: json
          });
        });
      break;
    case "POST_AddLabIntroduce":
      _axios
        .post('/labinfo', action.payload)
        .then(response => {
          if (response.status === 200) {
            console.log("新增LAB介紹成功");
          }
        })
        .catch(err => {
          if (err.response.status === 401) {
            localStorage.clear();
            window.location.replace('http://localhost:3000/index');
          }
          alert(err.response.data.message);
          throw new Error(err);
        })
        .then(json => {
          if (action.callback) {
            action.callback(json)
          }
        });
      break;
    case "GET_LabInfo":
      _axios
        .get(`/labinfo?id=${action.payload}`,)
        .then(response => response.data.data)
        .catch(err => {
          if (err.response.status === 401) {
            localStorage.clear();
            window.location.replace('http://localhost:3000/index');
          }
          alert(err.response.data.message);
          throw new Error(err);
        })
        .then(json => {
          if (action.callback) {
            action.callback(json)
          }
        });
      break;
    case "PUT_UpdateLabIntroduce":
      _axios
        .put('/labinfo', action.payload)
        .then(response => {
          if (response.status === 200) {
            console.log("修改LAB介紹成功");
          }
        })
        .catch(err => {
          if (err.response.status === 401) {
            localStorage.clear();
            window.location.replace('http://localhost:3000/index');
          }
          alert(err.response.data.message);
          throw new Error(err);
        })
        .then(json => {
          if (action.callback) {
            action.callback(json)
          }
        });
      break;
    case "DELETE_LabIntroduce":
      _axios
        .delete(`labinfo?id=${action.payload}`,)
        .then(response => {
          if (response.status === 200) {
            console.log("刪除LAB介紹成功")
          }
        })
        .catch(err => {
          if (err.response.status === 401) {
            localStorage.clear();
            window.location.replace('http://localhost:3000/index');
          }
          alert(err.response.data.message);
          throw new Error(err);
        })
        .then(json => {
          if (action.callback) {
            action.callback(json)
          }
        });
      break;
    case "GET_TeacherIntroduce":
      _axios
        .get(`/manager/teacher/list?page=${action.page}&search=${action.search}`,)
        .then(response => {
          return response.data.data;
          // if (response.status === 200) {
          //   console.log("取得教師介紹");
          //   return response.data.data;
          // }
        })
        .catch(err => {
          if (err.response.status === 401) {
            localStorage.clear();
            window.location.replace('http://localhost:3000/index');
          }
          alert(err.response.data.message);
          throw new Error(err);
        })
        .then(json => {
          if (action.callback) {
            action.callback(json)
          }
          return next({
            type: 'SAVE_TeacherIntroduce',
            payload: json
          });
        });
      break;
    case "POST_AddTeacher":
      _axios
        .post('/manager/teacher', action.payload)
        .then(response => {
          if (response.status === 200) {
            console.log("新增Teacher成功");
          }
        })
        .catch(err => {
          if (err.response.status === 401) {
            localStorage.clear();
            window.location.replace('http://localhost:3000/index');
          }
          alert(err.response.data.message);
          throw new Error(err);
        })
        .then(json => {
          if (action.callback) {
            action.callback(json)
          }
        });
      break;
    case "GET_TeacherInfo":
      _axios
        .get(`/manager/teacher?id=${action.payload}`,)
        .then(response => response.data.data)
        .catch(err => {
          if (err.response.status === 401) {
            localStorage.clear();
            window.location.replace('http://localhost:3000/index');
          }
          alert(err.response.data.message);
          throw new Error(err);
        })
        .then(json => {
          if (action.callback) {
            action.callback(json)
          }
        });
      break;
    case "PUT_UpdateTeacherIntroduce":
      _axios
        .put('/manager/teacher/info', action.payload)
        .then(response => {
          if (response.status === 200) {
            console.log("修改Teacher介紹成功");
          }
        })
        .catch(err => {
          if (err.response.status === 401) {
            localStorage.clear();
            window.location.replace('http://localhost:3000/index');
          }
          alert(err.response.data.message);
          throw new Error(err);
        })
        .then(json => {
          if (action.callback) {
            action.callback(json)
          }
        });
      break;
    case "DELETE_TeacherIntroduce":
      _axios
        .delete(`/manager/teacher?id=${action.payload}`,)
        .then(response => {
          if (response.status === 200) {
            console.log("刪除Teacher介紹成功")
          }
        })
        .catch(err => {
          if (err.response.status === 401) {
            localStorage.clear();
            window.location.replace('http://localhost:3000/index');
          }
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
