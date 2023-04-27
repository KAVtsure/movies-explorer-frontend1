import './Movies.css';
import { useEffect, useState } from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import SearchForm from '../SearchForm/SearchForm.js';
import { filterMovies, shortMoviesFilter } from '../../utils/utils.js';
import Preloader from '../Preloader/Preloader.js';
import moviesApi from '../../utils/MoviesApi.js';
import {
    NOT_FOUND_MESSAGE, REQUEST_ERR_MESSAGE
} from '../../utils/constants.js';


function Movies({ onMovieLike, isLoading, favoritesMovies, onLoad, onMovieDelete, setInfoTooltip, setIsInfoTooltipOpen, infoTooltip, isFavoritesPage }) {

    const [isFilteredMovies, setIsFilteredMovies] = useState([]);
    const [isShortMovies, setIsShortMovies] = useState(false);
    const [isInitialMovies, setIsInitialMovies] = useState([]);
    const [isAllMovies, setIsAllMovies] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isNotFound, setIsNotFound] = useState(false);

    function handleFilterMovies(movies, userQuery, checkbox) {
        const moviesList = filterMovies(movies, userQuery, checkbox)

        if (moviesList.length === 0) {
            setInfoTooltip({ ...infoTooltip, success: false, message: NOT_FOUND_MESSAGE })
            setIsInfoTooltipOpen(true)
            setIsNotFound(true)
        } else {
            setIsNotFound(false)
        }
        setIsInitialMovies(moviesList);
        setIsFilteredMovies(checkbox ? shortMoviesFilter(moviesList) : moviesList);
        localStorage.setItem('movies', JSON.stringify(moviesList))
        localStorage.setItem('shortMoviesFilterList', JSON.stringify(shortMoviesFilter(moviesList)))
    }

    function handleSubmitSearch(value) {
        setSearchQuery(value);
        localStorage.setItem('searchQuery', value);
        localStorage.setItem('isShortMovies', isShortMovies);

        if (localStorage.getItem('isAllMovies')) {
            const allMoviesList = JSON.parse(localStorage.getItem('isAllMovies'))
            handleFilterMovies(allMoviesList, value, isShortMovies)

        } else {
            if (!isAllMovies.length) {
                onLoad(true)
                moviesApi.getMovies()
                    .then((res) => {
                        setIsAllMovies(res)
                        localStorage.setItem('isAllMovies', JSON.stringify(res))
                        handleFilterMovies(res, value, isShortMovies)
                    })
                    .catch((err) => {
                        console.log(err);
                        setInfoTooltip({ success: false, message: REQUEST_ERR_MESSAGE })
                        setIsInfoTooltipOpen(true)
                    })
                    .finally(() => {
                        onLoad(false);
                    })
            }
        }
    }

    useEffect(() => {

        if (localStorage.getItem('movies')) {
            const movies = JSON.parse(localStorage.getItem('movies'))
            setIsInitialMovies(movies)
            if (localStorage.getItem('isShortMovies') === true) {
                setIsFilteredMovies(shortMoviesFilter(movies))
            } else {
                setIsFilteredMovies(movies)
            }
        }

    }, [])

    useEffect(() => {
        if (isFilteredMovies.length === 0 && isShortMovies) {
            setIsNotFound(true)
        } else {
            setIsNotFound(false)
        }
    }, [isFilteredMovies.length, isShortMovies])

    useEffect(() => {

        if (localStorage.getItem('isShortMovies') === 'true') {
            setIsShortMovies(true)
            if (localStorage.getItem('shortMoviesFilterList')) {
                const shortMovies = JSON.parse(localStorage.getItem('shortMoviesFilterList'))
                setIsFilteredMovies(shortMovies)
            }
        } else {
            setIsShortMovies(false)
        }
    }, [])

    function handleShortMovies() {

        setIsShortMovies(!isShortMovies)
        if (!isShortMovies) {
            setIsFilteredMovies(shortMoviesFilter(isInitialMovies))
        } else {
            setIsFilteredMovies(isInitialMovies)
        }
        localStorage.setItem('isShortMovies', !isShortMovies);
    }

    return (
        <section className='movies'>
            <SearchForm
                onSearch={handleSubmitSearch}
                onCheckBox={handleShortMovies}
                isShortMovies={isShortMovies}
                isFavoritesPage={false}

            />
            {isLoading ? <Preloader /> : !isNotFound &&
                <MoviesCardList
                    movies={isFilteredMovies}
                    favoritesMovies={favoritesMovies}
                    onMovieLike={onMovieLike}
                    onMovieDelete={onMovieDelete}
                    isFavoritesPage={false}
                />
            }
        </section>
    )
}

export default Movies;
