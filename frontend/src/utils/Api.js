const optionsApi = {
    url: 'https://api.mesto.zhuuravel.nomoredomainsmonster.ru'
}

class Api {
    constructor({ url, headers }) {
        this._url = url;
        this._headers = headers;
    }

    _checkResponse(res) {
            if (res.ok) {
                return res.json();
            }
            throw new Error('Что-то пошло не так...')
    }

    _request(url, options) {
        return fetch(`${this._url}${url}`, options).then(this._checkResponse)
    }

    getAllCards(token) {
        return this._request('/cards', {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${token}`,
                'Content-Type': "application/json",
            },
        })
    }

    createCards(data, token) {
        return this._request(`/cards`, {
            method: 'POST',
            headers: {
                'authorization': `Bearer ${token}`,
                'Content-Type': "application/json",
            },
            body: JSON.stringify(data)
        })
    }

    deleteCards(_id, token) {
        return this._request(`/cards/${_id}`, {
            method: 'DELETE',
            headers: {
                'authorization': `Bearer ${token}`,
                'Content-Type': "application/json",
            },
        })
    }

    getProfileInfo(token) {
        return this._request(`/users/me`, {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${token}`,
                'Content-Type': "application/json",
            },
        })
    }

    setProfileInfo(data, token) {
        return this._request(`/users/me`, {
            method: 'PATCH',
            headers: {
                'authorization': `Bearer ${token}`,
                'Content-Type': "application/json",
            },
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
    }

    setProfileAvatar(data, token) {
        return this._request(`/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                'authorization': `Bearer ${token}`,
                'Content-Type': "application/json",
            },
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
    }

    changeLikeCardStatus(_id, isLiked, token) {
        return this._request(`/cards/${_id}/likes`, {
            method: isLiked? 'PUT' : 'DELETE',
            headers: {
                'authorization': `Bearer ${token}`,
                'Content-Type': "application/json",
            },
        })
    }
}

const myApi = new Api(optionsApi)

export default myApi