import axios from "axios";

const token = localStorage.getItem("user_token");

const _axios = axios.create({
   baseURL: 'http://localhost/api',
   timeout: 30000,
   headers: {
      'Content-Type': 'multipart/form-data',
      'Access-Control-Allow-Origin': '*',
      'Authorization': `bearer ${token}`
   }
})

const fetch = store => next => action => {
   switch (action.type) {
      case "POST_AddMeeting":
         _axios
            .post('/meeting', action.payload)
            .then(response => {
               if (response.status === 200) {
                  console.log(response);
                  console.log("新增成功");
               }
            })
            .catch(err => {
               console.log(err.response.data);
               throw new Error(err);
            })
         break;
      case "POST_UpdateMeeting":
         _axios
            .post('/meeting', action.payload)
            .then(response => {
               console.log(response)
               if (response.status === 200) {
                  console.log("修改成功")
               }
            })
            .catch((err) => {
               console.log(err.response.data);
               throw new Error(err);
            })
         break;
      case "POST_AddProjectRecord":
         _axios
            .post('/project/record', action.payload)
            .then(response => {
               console.log(response);
               if (response.status === 200) {
                  console.log("新增專案記錄成功");
               }
            })
            .catch(err => {
               console.log(err.response.data);
               throw new Error(err);
            })
         break;
      case "POST_UpdateProjectRecord":
         _axios
            .post('/project/record', action.payload)
            .then(response => {
               console.log(response);
               if (response.status === 200) {
                  console.log("更新專案記錄成功");
               }
            })
            .catch(err => {
               console.log(err.response.data);
               throw new Error(err);
            })
         break;
      default:
         break;
   }
   return next(action);
};

export default fetch;
