import axios from "axios";

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50IjoiamFja2xhYiIsInJvbGVzIjpbMV0sImV4cCI6MTY1MTU0NzQxNX0=.f3a478eaa8513874a49b96dfb6a8e850091eecc4992182f71b1ef8a7257deaff'

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
