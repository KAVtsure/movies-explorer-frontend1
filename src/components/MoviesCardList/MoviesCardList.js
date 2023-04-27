import './MoviesCardList.css';
import { useState, useEffect } from 'react';
import useScreenWidth from '../../hooks/useScreenWidth.js';
import MoviesCard from '../MoviesCard/MoviesCard.js';
import { getFavoritesMovie } from '../../utils/utils.js';
import {
    ZERO, MOVIE_START_DESKTOP, MOVIE_ELSE_DESKTOP, MOVIE_START_TABLET, MOVIE_ELSE_TABLET,
    MOVIE_START_MOBILE, MOVIE_ELSE_MOBILE, SCREENWIDTH_DESKTOP, SCREENWIDTH_TABLET, SCREENWIDTH_MOBILE
} from '../../utils/constants.js';

function MoviesCardList({ movies, isFavoritesPage, favoritesMovies, onMovieLike, onMovieDelete }) {

    const screenWidth = useScreenWidth();

    const [moviesListShow, setMoviesListShow] = useState([]);
    const [moviesShowAmount, setMoviesShowAmount] = useState({ start: ZERO, else: ZERO });
    const [isRender, setIsRender] = useState(true);

    useEffect(() => {
        if (movies.length) {
            const result = movies.filter((item, index) => index < moviesShowAmount.start)
            setMoviesListShow(result)
        }

    }, [movies, moviesShowAmount.start])

    useEffect(() => {
        if (isFavoritesPage === true) {
            setMoviesListShow(favoritesMovies)
        }
    }, [favoritesMovies, isFavoritesPage])

    useEffect(() => {

        if (screenWidth >= SCREENWIDTH_DESKTOP) {
            setMoviesShowAmount({ start: MOVIE_START_DESKTOP, else: MOVIE_ELSE_DESKTOP })
        } else if (screenWidth < SCREENWIDTH_DESKTOP && screenWidth >= SCREENWIDTH_TABLET) {
            setMoviesShowAmount({ start: MOVIE_START_TABLET, else: MOVIE_ELSE_TABLET })
        } else if (screenWidth < SCREENWIDTH_TABLET && screenWidth >= SCREENWIDTH_MOBILE) {
            setMoviesShowAmount({ start: MOVIE_START_MOBILE, else: MOVIE_ELSE_MOBILE })
        }
        return () => setIsRender(false)

    }, [screenWidth, isRender])

    const handleClickElse = () => {
        setMoviesListShow(movies.slice(0, moviesListShow.length + moviesShowAmount.else))

    }

    return (
        <section className="movies-container">
            <ul className="movies__list">
                {moviesListShow.map((movie) => {
                    return (
                        <MoviesCard
                            movie={movie}
                            key={isFavoritesPage ? movie.movieId : movie.id}
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
