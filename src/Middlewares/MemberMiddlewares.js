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
          localStorage.setItem('user_token', response.data.data)
        })
        .catch(err => {
          throw new Error(err);
        })
      break;
    case "GET_PublicMembers":
      _axios
        .get('/member',)
        .then(response => response.data.data)
        .catch(err => {
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
        .get('/manager/role',)
        .then(response => response.data.data)
        .catch(err => {
          throw new Error(err);
        })
        .then(json => {
          return next({
            type: 'SAVE_Role',
            payload: json
          });
        });
      break;
    case "GET_Class":
      _axios
        .get('/class',)
        .then(response => response.data.data)
        .catch(err => {
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
        .get('/manager/user',)
        .then(response => response.data.data)
        .catch(err => {
          throw new Error(err);
        })
        .then(json => {
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
          throw new Error(err);
        })
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
          throw new Error(err);
        })
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
          throw new Error(err);
        })
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
          throw new Error(err);
        })
      break;
    default:
      break;
  }
  return next(action);
};

export default fetch;
