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
   if (action.type = 'POST_AddMeeting') {
      _axios
         .post('/meeting',)
         .then(response => response.data)
         .catch(err => {
            throw new Error(err);
         })
         .then(json => {
            return next({
               type: 'SAVE_Meeting',
               payload: json
            });
         });
   }
   else if (action.type = 'POST_UpdateMeeting') {
      _axios
         .post('/meeting',)
         .then(response => response.data)
         .catch(err => {
            throw new Error(err);
         })
         .then(json => {
            return next({
               type: 'SAVE_Meeting',
               payload: json
            });
         });
   }


   return next(action);
};

export default fetch;
