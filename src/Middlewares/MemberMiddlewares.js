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
    case "POST_Login":
      _axios
        .post('/login', action.payload)
        .then(response => {
          console.log(response);
          localStorage.setItem('user_token', response.data.data.token);
          if (response.data.data.admin === 1) {
            window.location.replace('http://localhost:3000/adminalbum');
          }
          else if (response.data.data.admin === 0) {
            window.location.replace('http://localhost:3000/setinfo');
          }
        })
        .catch(err => {
          console.log(err.response.data);
          throw new Error(err);
        })
      break;
    case "GET_PublicMembers":
      _axios
        .get('/member',)
        .then(response => response.data.data)
        .catch(err => {
          console.log(err.response.data);
          throw new Error(err);
        })
        .then(json => {
          return next({
            type: 'SAVE_PublicMembers',
            payload: json
          });
        });
      break;
    case "GET_Role":
      _axios
        .get(`/manager/role/list?page=${action.page}&search=${action.search}`,)
        .then(response => response.data.data)
        .catch(err => {
          console.log(err.response.data);
          throw new Error(err);
        })
        .then(json => {
          if (action.callback) {
            action.callback(json)
          }
          return next({
            type: 'SAVE_Role',
            payload: json
          });
        });
      break;
    case "GET_RoleAll":
      _axios
        .get(`/manager/role/select`,)
        .then(response => response.data.data)
        .catch(err => {
          console.log(err.response.data);
          throw new Error(err);
        })
        .then(json => {
          return next({
            type: 'SAVE_RoleAll',
            payload: json
          });
        });
      break;
    case "GET_Academic":
      _axios
        .get('/academic',)
        .then(response => response.data.data)
        .catch(err => {
          console.log(err.response.data);
          throw new Error(err);
        })
        .then(json => {
          return next({
            type: 'SAVE_Academic',
            payload: json
          });
        });
      break;
    case "GET_Class":
      _axios
        .get('/class',)
        .then(response => response.data.data)
        .catch(err => {
          console.log(err.response.data);
          throw new Error(err);
        })
        .then(json => {
          return next({
            type: 'SAVE_Class',
            payload: json
          });
        });
      break;
    case "GET_PrivateMember":
      _axios
        .get(`/manager/user?page=${action.page}&search=${action.search}&academic=${action.academic}`,)
        .then(response => {
          console.log(response);
          return response.data.data;
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
            type: 'SAVE_PrivateMember',
            payload: json
          });
        });
      break;
    case "POST_UserAdd":
      _axios
        .post('/manager/useradd', action.payload)
        .then(response => { console.log("新增成功") })
        .catch(err => {
          alert(err.response.data.data);
          throw new Error(err);
        })
        .then(json => {
          if (action.callback) {
            action.callback(json)
          }
        });
      break;
    case "PUT_ChangeRole":
      _axios
        .put('/manager/role/user', action.payload)
        .then(response => {
          if (response.status === 200) {
            console.log("修改角色成功")
          }
        })
        .catch(err => {
          console.log(err.response.data);
          throw new Error(err);
        })
      break;
    case "PUT_ChangeClass":
      _axios
        .put('/manager/user/class', action.payload)
        .then(response => {
          if (response.status === 200) {
            console.log("修改班級成功")
          }
        })
        .catch(err => {
          console.log(err.response.data);
          throw new Error(err);
        })
      break;
    case "GET_Permission":
      _axios
        .get('/manager/permission',)
        .then(response => {
          return response.data.data
        })
        .catch(err => {
          console.log(err.response.data);
          throw new Error(err);
        })
        .then(json => {
          return next({
            type: 'SAVE_Permission',
            payload: json
          });
        });
      break;
    case "GET_RolePermission":
      _axios
        .get(`/manager/role?id=${action.payload}`,)
        .then(response => {
          return response.data.data
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
            type: 'SAVE_RolePermission',
            payload: json
          });
        });
      break;
    case "PUT_ChangeRolePermission":
      _axios
        .put('/manager/role', action.payload)
        .then(response => {
          if (response.status === 200) {
            console.log("修改角色權限成功")
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
    case "POST_RoleAdd":
      _axios
        .post('/manager/role', action.payload)
        .then(response => {
          if (response.status === 200) {
            console.log("新增角色成功")
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
    case "DELETE_Role":
      _axios
        .delete(`/manager/role?id=${action.payload}`,)
        .then(response => {
          console.log(response)
          if (response.status === 200) {
            console.log("刪除角色成功")
          }
        })
        .catch(err => {
          console.log(err.response.data);
          alert(err.response.data.data);
          throw new Error(err);
        })
        .then(json => {
          if (action.callback) {
            action.callback(json)
          }
        });
      break;
    case "PUT_ChangePassword":
      _axios
        .put('/manager/user/password', action.payload)
        .then(response => {
          console.log(response);
          if (response.status === 200) {
            console.log("修改密碼成功");
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
    case "DELETE_Member":
      _axios
        .delete(`/manager/user?id=${action.payload}`,)
        .then(response => {
          console.log(response)
          if (response.status === 200) {
            console.log("刪除成員成功")
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
