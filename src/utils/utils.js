import { MOVIE_DURATION } from './constants.js';

export function convertTime(value) {

    const minutes = value % 60;
    const hours = Math.floor(value / 60);
    return `${hours}ч ${minutes}м`
}

export function getFavoritesMovie(list, movie) {

    return list.find((m) => {
        return m.movieId === (movie.id || movie.movieId);
    })
}

export function shortMoviesFilter(movies) {

    return movies.filter((movie) => movie.duration < MOVIE_DURATION)
}

export function filterMovies(movies, userQuery, shortMovies) {

    const moviesByUserQuery = movies.filter((m) => {
        const movieEn = String(m.nameEN).toLowerCase().trim();
        const movieRu = String(m.nameRU).toLowerCase().trim();
        const userMovie = userQuery.toLowerCase().trim();
        return movieEn.indexOf(userMovie) !== -1 || movieRu.indexOf(userMovie) !== -1
    })

    if (shortMovies === true) {
        return shortMoviesFilter(moviesByUserQuery)

    } else {
        return moviesByUserQuery
    }
}