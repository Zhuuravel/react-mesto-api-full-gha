export const BASE_URL = 'https://api.mesto.zhuuravel.nomoredomainsmonster.ru';

const getJson = (res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

export const register = (password, email) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({password, email})
    })
        .then(getJson);
};

export const authorize = (password, email) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({password, email})
    })
        .then(getJson)
        .then((data) => {
            if (data.token){
                localStorage.setItem('token', data.token);
                return data;
            }
        })
};

export const checkToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        }
    })
        .then(getJson)
        .then((res) => res)
}