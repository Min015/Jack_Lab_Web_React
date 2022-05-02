import axios from "axios";

const token = localStorage.getItem("user_token");

const _axios = axios.create({
    baseURL: 'http://localhost',//後端的url
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',//跨域
        'Authorization': `bearer ${token}`//權限
        //'Authorization': `${token}`//權限
    }
})

export function POST_function(payload) {
    return _axios.post('/api/admin', payload)
}

export function GET_Meeting() {
    return _axios.get('/api/meeting')
}
export function GET_MeetingInfo(id) {
    return _axios.get(`/api/meeting/${id}`)
}

export function GET_download(filename) {
    return _axios.get(`/api/download/meeting/${filename}`)
}

export function GET_Members() {
    return _axios.get('/api/manager/user')//暫定
}
export function DELETE_Meeting(id) {
    return _axios.delete(`/api/meeting/${id}`)
}