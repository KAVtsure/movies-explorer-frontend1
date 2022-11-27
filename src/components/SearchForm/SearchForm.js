import './SearchForm.css';
import icon_search from '../../images/icon_search.svg';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox.js';
import { useFormWithValidation } from '../../hooks/useFormWithValidation.js';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
    KEYWORD_ERROR
} from '../../utils/constants.js';

function SearchForm({ onSearch, onCheckBox, isShortMovies, setIsShowMoviesFavorites, favoritesMovies, isFavoritesPage }) {

    const location = useLocation();
    const { values, handleChange, isValid, setValues, setIsValid } = useFormWithValidation();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!values.query) {
            return;
        }
        onSearch(values.query);
    }

    useEffect(() => {
        if (location.pathname === '/movies') {
            const searchQuery = localStorage.getItem('searchQuery');
            if (searchQuery) {
                setValues({ query: searchQuery })
                setIsValid(true)
            }
        }
    }, [location.pathname, setIsValid, setValues])


    useEffect(() => {
        if (location.pathname === '/saved-movies' && !values.query) {
            setIsShowMoviesFavorites(favoritesMovies)
        }
    }, [favoritesMovies, location.pathname, setIsShowMoviesFavorites, values.query])

    return (
        <section className='search'>
            <form className='search__form' onSubmit={handleSubmit}>
                <div className='search__block'>
                    <img className='search__icon' src={icon_search} alt='поиск фильмов' />
                    <input type='text'
                        className='search__input'
                        placeholder='Фильм'
                        required
                        name='query'
                        id='query'
                        value={values.query || ''}
                        onChange={handleChange}

                    />
                    {!values.query && !isFavoritesPage && <span className='search__error' id='query-error'>{KEYWORD_ERROR}</span>}
                    <div className='submit__box'>
                        <button className='search__submit-button' type='submit' aria-label='кнопка поиска' disabled={!isValid}></button>
                    </div>
                </div>
                <FilterCheckbox
                    isShortMovies={isShortMovies}
                    onCheckBox={onCheckBox}
                />
            </form>
        </section>
    )
}

export default SearchForm;