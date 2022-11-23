import './SavedMovies.css';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader.js';
import { filterMovies, shortMoviesFilter } from '../../utils/utils.js';
import { NOT_FOUND_MESSAGE } from '../../utils/constants.js';

function SavedMovies({ favoritesMovies, onMovieDelete, isLoading, setInfoTooltip, setIsInfoTooltipOpen, infoTooltip }) {

    const location = useLocation();
    const [isShowMoviesFavorites, setIsShowMoviesFavorites] = useState(favoritesMovies);
    const [isFilteredMovies, setIsFilteredMovies] = useState(isShowMoviesFavorites);
    const [isShortMovies, setIsShortMovies] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    function handleSubmitSearch(value) {
        setSearchQuery(value);
        const filterMoviesList = filterMovies(favoritesMovies, value, isShortMovies)
        if (filterMoviesList.length === 0) {
            setInfoTooltip({ ...infoTooltip, success: false, message: NOT_FOUND_MESSAGE })
            setIsInfoTooltipOpen(true)
        } else {
            setIsFilteredMovies(filterMoviesList)
            setIsShowMoviesFavorites(filterMoviesList)
        }
    }

    function handleShortMovies() {

        if (!isShortMovies) {
            setIsShortMovies(true)
            localStorage.setItem('isShortFavoritesMovies', true);
            setIsShowMoviesFavorites(shortMoviesFilter(isFilteredMovies))

        } else {
            setIsShortMovies(false)
            localStorage.setItem('isShortFavoritesMovies', false);
            setIsFilteredMovies(isFilteredMovies)

        }

    }

    useEffect(() => {

        if (localStorage.getItem('isShortFavoritesMovies') === 'true') {
            setIsShortMovies(true)
            setIsShowMoviesFavorites(shortMoviesFilter(favoritesMovies))
        } else {
            setIsShortMovies(false)
            const filterMoviesList = filterMovies(favoritesMovies, searchQuery, isShortMovies)
            setIsShowMoviesFavorites(filterMoviesList)
        }

    }, [favoritesMovies, isShortMovies, location, searchQuery])

    return (
        <section className='saved-movies'>
            <SearchForm
                onSearch={handleSubmitSearch}
                onCheckBox={handleShortMovies}
                isShortMovies={isShortMovies}
            />
            {isLoading ? <Preloader /> :
                <MoviesCardList
                    movies={isShowMoviesFavorites}
                    favoritesMovies={favoritesMovies}
                    onMovieDelete={onMovieDelete}
                    isFavoritesPage={true}
                />
            }
        </section>
    )
}

export default SavedMovies;