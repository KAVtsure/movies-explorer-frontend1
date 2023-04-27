import './MoviesCard.css';
import { convertTime } from '../../utils/utils.js';

function MoviesCard({ movie, isFavoritesPage, favorites, onMovieLike, onMovieDelete }) {

    function handleLike() {
        onMovieLike(movie);
    }

    function handleDelete() {
        onMovieDelete(movie);
    }

    function handleChangeMovieStatus() {
        if ((isFavoritesPage && favorites) || (!isFavoritesPage && favorites)) {
            handleDelete()
        } else {
            handleLike()
        }
    }

    return (
        <section className='movie'>
            <div className='movie__block'>
                <div className='movie__info-container'>
                    <h2 className='movie__title'>{movie.nameRU}</h2>
                    <p className='movie__duration'>{convertTime(movie.duration)}</p>
                </div>
                
                <button className={`movie__button ${isFavoritesPage ? 'movie__button-delete' : ''}
                    ${!isFavoritesPage && favorites ? 'movie__button-save_enabled' : 'movie__button-save'}`}
                    type="button" aria-label='добавить в избранное' onClick={handleChangeMovieStatus} />
            </div>
            <a className='movie__image-link' href={movie.trailerLink} target='_blank' rel='noreferrer'>
                <img className='movie__image' src={isFavoritesPage ? movie.image : `https://api.nomoreparties.co${movie.image.url}`} alt={movie.nameRU} />
            </a>
        </section>
    )
}

export default MoviesCard;
