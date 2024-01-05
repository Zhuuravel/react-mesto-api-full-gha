const optionsApi = {
    url: 'http://api.mesto.zhuuravel.nomoredomainsmonster.ru',
    headers: {
        'authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': "application/json"
    }
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

    getAllCards() {
        return this._request('/cards', {
            method: 'GET',
            headers: this._headers
        })
    }

    createCards(data) {
        return this._request(`/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(data)
        })
    }

    deleteCards(_id) {
        return this._request(`/cards/${_id}`, {
            method: 'DELETE',
            headers: this._headers
        })
    }

    getProfileInfo() {
        return this._request(`/users/me`, {
            method: 'GET',
            headers: this._headers
        })
    }

    setProfileInfo(data) {
        return this._request(`/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
    }

    setProfileAvatar(data) {
        return this._request(`/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
    }

    changeLikeCardStatus(_id, isLiked) {
        return this._request(`/cards/${_id}/likes`, {
            method: isLiked? 'PUT' : 'DELETE',
            headers: this._headers,
        })
    }
}

const myApi = new Api(optionsApi)

export default myApi