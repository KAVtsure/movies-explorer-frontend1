import './SavedMovies.css';
import { useEffect, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader.js';
import { filterMovies, shortMoviesFilter } from '../../utils/utils.js';
import { NOT_FOUND_MESSAGE } from '../../utils/constants.js';

function SavedMovies({ favoritesMovies, onMovieDelete, isLoading, setInfoTooltip, setIsInfoTooltipOpen, infoTooltip, isFavoritesPage }) {

    const [isShowMoviesFavorites, setIsShowMoviesFavorites] = useState(favoritesMovies);
    const [isFilteredMovies, setIsFilteredMovies] = useState(isShowMoviesFavorites);
    const [isShortMovies, setIsShortMovies] = useState(false);
    const [isNotFound, setIsNotFound] = useState(false);

    function handleSubmitSearch(value) {

        const filterMoviesList = filterMovies(favoritesMovies, value, isShortMovies)

        if (filterMoviesList.length === 0) {
            setInfoTooltip({ ...infoTooltip, success: false, message: NOT_FOUND_MESSAGE })
            setIsInfoTooltipOpen(true)
        } else {
            setIsFilteredMovies(filterMoviesList)
            setIsShowMoviesFavorites(filterMoviesList)
            setIsNotFound(false)
        }
    }

    function handleShortMovies() {

        if (!isShortMovies) {
            setIsShortMovies(true)
            localStorage.setItem('isShortFavoritesMovies', true);
            setIsShowMoviesFavorites(shortMoviesFilter(isFilteredMovies))

            if (shortMoviesFilter(isFilteredMovies).length === 0) {
                setIsNotFound(true)
            } else {
                setIsNotFound(false)
            }

        } else {
            setIsShortMovies(false)
            localStorage.setItem('isShortFavoritesMovies', false);
            setIsShowMoviesFavorites(isFilteredMovies)

            if (isFilteredMovies.length === 0) {
                setIsNotFound(true)
            } else {
                setIsNotFound(false)
            }

        }

    }

    useEffect(() => {
        setIsFilteredMovies(favoritesMovies)
        if (favoritesMovies.length === 0) {
            setIsNotFound(true)
        } else {
            setIsNotFound(false)
        }
    }, [favoritesMovies, isFavoritesPage])

    return (
        <section className='saved-movies'>
            <SearchForm
                onSearch={handleSubmitSearch}
                onCheckBox={handleShortMovies}
                isShortMovies={isShortMovies}
                setIsShowMoviesFavorites={setIsShowMoviesFavorites}
                favoritesMovies={favoritesMovies}
                isFavoritesPage={true}
            />
            {isLoading ? <Preloader /> : !isNotFound &&
                <MoviesCardList
                    movies={isShowMoviesFavorites}
                    favoritesMovies={favoritesMovies}
                    onMovieDelete={onMovieDelete}
                    isFavoritesPage={true}
                    onMovieLike={false}

                />
            }
        </section>
    )
}

export default SavedMovies;