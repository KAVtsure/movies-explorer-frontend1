import './MoviesCard.css';

function MoviesCard({ movie, isFavoritesPage }) {

    return (
        <section className='movie'>
            <div className='movie__block'>
                <div className='movie__info-container'>
                    <h2 className='movie__title'>{movie.nameRU}</h2>
                    <p className='movie__duration'>{movie.duration}</p>
                </div>
                <button className={`movie__button ${isFavoritesPage ? 'movie__button-delete' : ''}
                    ${!isFavoritesPage && movie.isFavorites ? 'movie__button-save_enabled' : 'movie__button-save'}`}
                    type="button" aria-label='добавить в избранное' />
            </div>
            <img className='movie__image' src={movie.image} alt={movie.nameRU} />
        </section>
    )
}

export default MoviesCard;