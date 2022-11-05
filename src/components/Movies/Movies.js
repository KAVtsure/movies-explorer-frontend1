import './Movies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import { moviesDb } from '../../utils/moviesDb.js'
import SearchForm from '../SearchForm/SearchForm.js';

function Movies() {

    return (
        <section className='movies'>
            <SearchForm />
            <MoviesCardList movies={moviesDb} />
        </section>
    )
}

export default Movies;
