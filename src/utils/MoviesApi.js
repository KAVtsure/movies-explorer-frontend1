class MoviesApi {
    constructor({ baseUrlMovies, headers }) {
        this._headers = headers;
        this._urlMovies = baseUrlMovies;
    }

    getMovies() {
        return fetch(this._urlMovies, {
            // credentials: "include",
            headers: this._headers,
            method: 'GET'
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

const moviesApi = new MoviesApi({
    baseUrlMovies: 'https://api.nomoreparties.co/beatfilm-movies',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default moviesApi;