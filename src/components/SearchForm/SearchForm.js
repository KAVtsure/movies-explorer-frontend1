import './SearchForm.css';
import icon_search from '../../images/icon_search.svg';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox.js';

function SearchForm() {

    return (
        <section className='search'>
            <form className='search__form'>
                <div className='search__block'>
                    <img className='search__icon' src={icon_search} alt='поиск фильмов' />
                    <input type='text'
                        className='search__input'
                        placeholder='Фильм'
                        required
                    />
                    <div className='submit__box'>
                        <button className='search__submit-button' type='submit' aria-label='кнопка поиска'></button>
                    </div>
                </div>
                <FilterCheckbox />
            </form>
        </section>
    )
}

export default SearchForm;