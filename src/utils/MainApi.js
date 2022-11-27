class Api {
    constructor({ baseUrl, headers }) {
        this._url = baseUrl;
        this._headers = headers;
        this._urlUser = `${this._url}/users/me`;
        this._urlMovies = `${this._url}/movies`;
    }

    getFavoritesMovies() {
        return fetch(this._urlMovies, {
            credentials: "include",
            headers: this._headers,
            method: 'GET'
        })
            .then(this._checkResponse);
    }

    addMovie(movie) {
        return fetch(this._urlMovies, {
            credentials: 'include',
            headers: this._headers,
            method: 'POST',
            body: JSON.stringify({
                country: movie.country,
                director: movie.director,
                duration: movie.duration,
                year: movie.year,
                description: movie.description,
                nameRU: movie.nameRU,
                nameEN: movie.nameEN,
                image: `https://api.nomoreparties.co${movie.image.url}`,
                trailerLink: movie.trailerLink,
                thumbnail: `https://api.nomoreparties.co${movie.image.url}`,
                movieId: movie.id,
            })
        })
            .then(this._checkResponse);
    }

    deleteMovie(movieId) {
        return fetch(`${this._urlMovies}/${movieId}`, {
            credentials: 'include',
            headers: this._headers,
            method: 'DELETE',
        })
            .then(this._checkResponse);
    }

    getUserInfo() {
        return fetch(this._urlUser, {
            credentials: 'include',
            headers: this._headers,
            method: 'GET',
        })
            .then(this._checkResponse);
    }

    updateUserInfo({ name, email }) {
        return fetch(this._urlUser, {
            credentials: 'include',
            headers: this._headers,
            method: 'PATCH',
            body: JSON.stringify({
                name: name,
                email: email
            })
        })
            .then(this._checkResponse);
    }

    register({ name, email, password }) {
        return fetch(`${this._url}/signup`, {
            method: 'POST',
            credentials: 'include',
            headers: this._headers,
            body: JSON.stringify({ name, email, password })
        })
            .then(this._checkResponse);
    };

    login({ email, password }) {
        return fetch(`${this._url}/signin`, {
            method: 'POST',
            credentials: 'include',
            headers: this._headers,

            body: JSON.stringify({ email, password })
        })
            .then(this._checkResponse);
    };

    checkToken() {
        return fetch(this._urlUser, {
            method: 'GET',
            credentials: 'include',
            headers: this._headers,
        })
            .then(this._checkResponse);
    }

    logout() {
        return fetch(`${this._url}/signout`, {
            method: 'POST',
            credentials: 'include',
            headers: this._headers,
        })
            .then(this._checkResponse);
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }
}

const mainApi = new Api({
    baseUrl: 'https://api.movies.kavtsure.nomoredomains.icu',
    // baseUrl: 'http://localhost:4000',
    headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${localStorage.getItem('jwt')}`,
    },
});

export default mainApi;