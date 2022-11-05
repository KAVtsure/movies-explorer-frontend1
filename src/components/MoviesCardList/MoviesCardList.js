import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ movies, isFavoritesPage }) {

    return (
        <section className="movies-container">
            <ul className="movies__list">
                {movies.map((movie) => {
                    return (
                        <MoviesCard
                            movie={movie}
                            key={movie.movieId}
                            isFavoritesPage={isFavoritesPage}
                        />
                    )
                }
                )}
            </ul>
            <button className={`movies__list-extension ${isFavoritesPage ? 'movies__list-extension_hide' : ''}`}
                type='button' aria-label='показать больше фильмов'>Ещё</button>
        </section>
    )
}

export default MoviesCardList;