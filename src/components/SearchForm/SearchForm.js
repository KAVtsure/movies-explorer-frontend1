import './SearchForm.css';
import icon_search from '../../images/icon_search.svg';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox.js';
import { useFormWithValidation } from '../../hooks/useFormWithValidation.js';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function SearchForm({ onSearch, onCheckBox, isShortMovies }) {

    const location = useLocation();
    const { values, handleChange, errors, isValid, resetForm, setValues, setIsValid } = useFormWithValidation();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!values.query) {
            return;
        }
        onSearch(values.query);
        resetForm();
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
                        value={values.query || ''}
                        onChange={handleChange}
                    />
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