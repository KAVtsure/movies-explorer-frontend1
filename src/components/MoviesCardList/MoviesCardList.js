import './MoviesCardList.css';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useScreenWidth from '../../hooks/useScreenWidth.js';
import MoviesCard from '../MoviesCard/MoviesCard.js';
import { getFavoritesMovie } from '../../utils/utils.js';

function MoviesCardList({ movies, isFavoritesPage, favoritesMovies, onMovieLike, onMovieDelete }) {

    const screenWidth = useScreenWidth();
    const location = useLocation();
    const [moviesListShow, setMoviesListShow] = useState([]);
    const [moviesShowAmount, setMoviesShowAmount] = useState({ start: 0, else: 0 });
    const [isRender, setIsRender] = useState(true);

    useEffect(() => {
        if (screenWidth >= 1222) {
            setMoviesShowAmount({ start: 12, else: 3 })
        } else if (screenWidth < 1222 && screenWidth >= 690) {
            setMoviesShowAmount({ start: 8, else: 2 })
        } else if (screenWidth < 690 && screenWidth >= 320) {
            setMoviesShowAmount({ start: 5, else: 2 })
        }
        return () => setIsRender(false)
    }, [screenWidth, isRender])

    useEffect(() => {
        if (location.pathname === '/saved-movies') {
            setMoviesListShow(favoritesMovies)
        }
    }, [favoritesMovies, location.pathname])

    const handleClickElse = () => {
        setMoviesListShow(movies.slice(0, moviesListShow.length + moviesShowAmount.else))

    }

    useEffect(() => {
        if (movies.length) {
            const result = movies.filter((item, index) => index < moviesShowAmount.start)
            setMoviesListShow(result)
        }
    }, [movies, moviesShowAmount.start, isFavoritesPage])

    return (
        <section className="movies-container">
            <ul className="movies__list">
                {moviesListShow.map((movie) => {
                    return (
                        <MoviesCard
                            movie={movie}
                            key={movie.id || movie._id}
                            favorites={getFavoritesMovie(favoritesMovies, movie)}
                            isFavoritesPage={isFavoritesPage}
                            onMovieLike={onMovieLike}
                            onMovieDelete={onMovieDelete}
                        />
                    )
                }
                )}
            </ul>
            {movies.length > moviesListShow.length && (
                <button className={`movies__list-extension ${isFavoritesPage ? 'movies__list-extension_hide' : ''}`}
                    type='button' aria-label='показать больше фильмов' onClick={handleClickElse}>Ещё</button>)}
        </section>
    )
}

export default MoviesCardList;
