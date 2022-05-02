import axios from "axios";

const token = localStorage.getItem("user_token")

const _axios = axios.create({
    baseURL: 'http://localhost',//後端的url
    timeout: 30000,
    headers: {
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*',//跨域
        'Authorization': `bearer ${token}`//權限
        //'Authorization': `${token}`//權限
    }
})
export function POST_AddMeeting(payload) {
    return _axios.post('/api/meeting', payload)
}
export function POST_UpdateMeeting(payload) {
    return _axios.post('/api/meeting',payload)
}
