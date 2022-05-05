import axios from "axios";

const token = localStorage.getItem("user_token")

const _axios = axios.create({
    baseURL: 'http://localhost',//後端的url
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',//跨域
        'Authorization': `bearer ${token}`//權限
        
    }
})

export function POST_login(payload) {
    return _axios.post('/api/login', payload);
}
export function set_token(token) {
    return localStorage.setItem('user_token',token);
}
