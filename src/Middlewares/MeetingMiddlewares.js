/* eslint-disable no-fallthrough */
/* eslint-disable no-sequences */
/* eslint-disable no-cond-assign */
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
        case "GET_Meeting":
            console.log('meeting=>', 19);
            _axios
                .get('/meeting',)
                .then(response => {
                    if(response.status===200){
                        return response.data.data;
                    }
                })
                .catch(err => {
                    throw new Error(err);
                })
                .then(json => {
                    return next({
                        type: 'SAVE_Meeting',
                        payload: json
                    });
                });
            break;
        case "GET_MeetingInfo":
            console.log(`meetinginfo=>?id=${action.payload}`);
            _axios
                .get(`/meeting?id=${action.payload}`,)
                .then(response => {
                    console.log(response);
                    if(response.status===200){
                        return response.data.data;
                    }
                })
                .catch(err => {
                    throw new Error(err);
                })
                .then(json => {
                    return next({
                        type: 'SAVE_MeetingInfo',
                        payload: json,
                        callback:json
                    });
                });
            break;
        case "GET_MeetingDownload":
            console.log('download=>', 50);
            _axios
                .get(`/download/meeting/${action.payload}`,)
                .then(response => {
                    window.open(BaseURL + response.config.url);
                })
                .catch(err => {
                    throw new Error(err);
                })
            break;
        case "DELETE_Meeting":
            console.log('delete=>');
            _axios
                .delete(`/meeting/${action.payload}`,)
                .then(response => { console.log(response) })
                .catch(err => {
                    throw new Error(err);
                })
            break;
        default:
            console.log('default');
            break;
    }
    return next(action);
};

export default fetch;
