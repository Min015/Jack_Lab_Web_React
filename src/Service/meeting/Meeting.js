import axios from "axios";

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJiNzgxMjVlZC1mN2E5LTQzMTItOTc5Yi00NGYwN2NmZjM1NGYiLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNjUxMDQxNzQzLCJleHAiOjQ4MDQ2NDE3NDN9.us5JAEPGRHuvX5mfRU-eRxfnh_MF7mjJ3c8YaUSm4yk'

const _axios = axios.create({
    baseURL: 'http://localhost',//後端的url
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',//跨域
        // 'Authorization': `Bearer ${token}`//權限
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
    return _axios.get(`/api//meeting/${id}`)
}