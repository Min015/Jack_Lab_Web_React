import axios from "axios";

const token = localStorage.getItem("user_token");

const _axios = axios.create({
    baseURL: 'http://localhost/api',
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': `bearer ${token}`
    }
})

const fetch = store => next => action => {
    if (action.type = 'GET_function') {
        _axios
            .get('/meeting',)
            .then(response => { console.log(response) })
            .catch(err => {
                throw new Error(err);
            })
            .then(json => {
                return next({
                    type: 'SAVE_function',
                    payload: json
                });
            });
    }

    return next(action);
};

export default fetch;
