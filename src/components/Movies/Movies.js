import './Movies.css';
import { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import SearchForm from '../SearchForm/SearchForm.js';
import { filterMovies, shortMoviesFilter } from '../../utils/utils.js';
import Preloader from '../Preloader/Preloader.js';
import moviesApi from '../../utils/MoviesApi.js';
import {
    NOT_FOUND_MESSAGE, REQUEST_ERR_MESSAGE
} from '../../utils/constants.js';

function Movies({ onMovieLike, isLoading, favoritesMovies, onLoad, onMovieDelete, setInfoTooltip, setIsInfoTooltipOpen, infoTooltip }) {

    const location = useLocation();
    const [isFilteredMovies, setIsFilteredMovies] = useState([]);
    const [isShortMovies, setIsShortMovies] = useState(false);
    const [isInitialMovies, setIsInitialMovies] = useState([]);
    const [isAllMovies, setIsAllMovies] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const history = useHistory();

    function handleFilterMovies(movies, userQuery, checkbox) {
        const moviesList = filterMovies(movies, userQuery, false)

        if (moviesList.length === 0) {
            setInfoTooltip({ ...infoTooltip, success: false, message: NOT_FOUND_MESSAGE })
            setIsInfoTooltipOpen(true)
        } else {
            setIsInitialMovies(moviesList);
            setIsFilteredMovies(checkbox ? shortMoviesFilter(moviesList) : moviesList);
            localStorage.setItem('movies', JSON.stringify(moviesList))
        }
    }

    function handleSubmitSearch(value) {
        setSearchQuery(value);
        localStorage.setItem('searchQuery', value);
        localStorage.setItem('isShortMovies', isShortMovies);

        if (!isAllMovies.length) {
            onLoad(true)
            moviesApi.getMovies()
                .then((res) => {
                    localStorage.setItem('allMovies', JSON.stringify(res))
                    setIsAllMovies(res)
                    // console.log(isAllMovies)
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
        } else {
            handleFilterMovies(isAllMovies, value, isShortMovies)
        }
    }

    useEffect(() => {
        const movies = JSON.parse(localStorage.getItem('movies'))
        const shortMovies = localStorage.getItem('isShortMovies')
        if (movies) {
            setIsInitialMovies(movies)
            if (shortMovies) {
                setIsFilteredMovies(shortMoviesFilter(movies))
            } else {
                setIsFilteredMovies(movies)
            }
        }

    }, [location, history])

    useEffect(() => {
        const shortMovies = localStorage.getItem('isShortMovies')
        if (shortMovies === 'true') {
            setIsShortMovies(true)
        } else {
            setIsShortMovies(false)
        }
    }, [location])

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

            />
            {isLoading ? <Preloader /> :
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
