import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { moviesDb } from '../../utils/moviesDb.js'

function SavedMovies({ movies, isFavoritesPage }) {

    return (
        <section className='saved-movies'>
            <SearchForm />
            <MoviesCardList movies={moviesDb} isFavoritesPage={true} />
        </section>
    )
}

export default SavedMovies;