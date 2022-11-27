import { useState, useEffect } from 'react';
import { Route, Switch, useHistory, Redirect } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute.js'
import mainApi from '../../utils/MainApi.js';
import "./App.css";
import Header from '../Header/Header.js';
import Main from '../Main/Main.js';
import Footer from '../Footer/Footer.js';
import Movies from '../Movies/Movies.js';
import SavedMovies from '../SavedMovies/SavedMovies.js';
import Register from '../Register/Register.js';
import Login from '../Login/Login.js';
import Profile from '../Profile/Profile.js';
import NotFoundPage from '../NotFoundPage/NotFoundPage.js';
import InfoTooltip from '../InfoTooltip/InfoTooltip.js';
import {
    AUTH_ERROR, REGISTER_ERROR, LOGOUT_ERROR,
    UPDATE_USER_ERROR, SUCCESS_REGISTER, SUCCESS_UPDATE_USER, DELETE_MOVIE_ERROR, SAVE_MOVIE_ERROR, TOKEN_ERROR
} from '../../utils/constants.js';

function App() {

    const [loggedIn, setLoggedIn] = useState(localStorage.getItem('jwt'));
    const [currentUser, setCurrentUser] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [favoritesMovies, setFavoritesMovies] = useState([]);
    const [infoTooltip, setInfoTooltip] = useState({ success: false, message: '' });
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false)

    const history = useHistory();

    const onLogin = ({ email, password }) => {
        setIsLoading(true);
        mainApi.login({ email, password })
            .then((data) => {
                if (data.token) {
                    localStorage.setItem('jwt', data.token);
                    setLoggedIn(true);
                    history.push('/movies');
                    setCurrentUser(data);
                }
            })
            .catch((err) => {
                setInfoTooltip({ ...infoTooltip, success: false, message: AUTH_ERROR })
                setIsInfoTooltipOpen(true)
                console.log(err)
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    const onLogout = () => {
        setIsLoading(true);
        mainApi.logout()
            .then((data) => {
                localStorage.clear();
                setLoggedIn(false);
                setCurrentUser({});
                history.push('/');
            })
            .catch((err) => {
                console.log(err)
                setInfoTooltip({ ...infoTooltip, success: false, message: LOGOUT_ERROR })
                setIsInfoTooltipOpen(true)

            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    useEffect(() => {
        const token = localStorage.getItem('jwt');
        if (token) {
            mainApi.checkToken()
                .then((res) => {
                    setLoggedIn(true);
                })
                .catch((err) => {
                    console.log(err);
                    onLogout();
                    setInfoTooltip({ ...infoTooltip, success: false, message: TOKEN_ERROR })
                    setIsInfoTooltipOpen(true)

                })
        }
    }, [])

    useEffect(() => {
        if (loggedIn) {
            mainApi.getUserInfo()
                .then((res) => {
                    setLoggedIn(true);
                    setCurrentUser(res)
                })
                .catch((err) => {
                    console.log(err);
                    localStorage.clear();
                    setLoggedIn(false);
                    setCurrentUser({});
                    history.push('/');
                    setInfoTooltip({ ...infoTooltip, success: false, message: TOKEN_ERROR })
                    setIsInfoTooltipOpen(true)

                })
        }
    }, [loggedIn])

    useEffect(() => {
        if (loggedIn) {
            mainApi.getFavoritesMovies()
                .then((res) => {
                    setFavoritesMovies(res);
                })
                .catch((err) => {
                    console.log(err);
                    setInfoTooltip({ ...infoTooltip, success: false, message: TOKEN_ERROR })
                    setIsInfoTooltipOpen(true)

                })
        }
    }, [loggedIn])

    useEffect(() => {
        function closeByEscape(evt) {
            if (evt.key === 'Escape') {
                setIsInfoTooltipOpen(false);
                setInfoTooltip({ success: false, message: '' })
            }
        }
        if (isInfoTooltipOpen) {
            document.addEventListener('keydown', closeByEscape);
            return () => {
                document.removeEventListener('keydown', closeByEscape);
            }
        }
    }, [isInfoTooltipOpen])

    const onRegister = ({ name, email, password }) => {
        setIsLoading(true);
        mainApi.register({ name, email, password })
            .then((data) => {
                setInfoTooltip({ ...infoTooltip, success: true, message: SUCCESS_REGISTER })
                setIsInfoTooltipOpen(true)
                onLogin({ email, password })

            })
            .catch((err) => {
                setInfoTooltip({ ...infoTooltip, success: false, message: REGISTER_ERROR })
                setIsInfoTooltipOpen(true)
                console.log(err)
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    const onUpdateUser = ({ name, email }) => {
        setIsLoading(true);
        mainApi.updateUserInfo({ name, email })
            .then((res) => {
                setCurrentUser(res);
                setInfoTooltip({ ...infoTooltip, success: true, message: SUCCESS_UPDATE_USER })
                setIsInfoTooltipOpen(true)
            })
            .catch((err) => {
                console.log(err);
                setInfoTooltip({ ...infoTooltip, success: false, message: UPDATE_USER_ERROR })
                setIsInfoTooltipOpen(true)
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    const handleMovieDelete = (movie) => {
        const favoriteMovie = favoritesMovies.find((m) =>
            m.movieId === movie.id || m.movieId === movie.movieId);

        mainApi.deleteMovie(favoriteMovie._id)
            .then(() => {
                const newListFavoritesMovies = favoritesMovies.filter((m) => {
                    if (movie.id === m.movieId || movie.movieId === m.movieId) {
                        return false
                    } else {
                        return true
                    }
                })

                setFavoritesMovies(newListFavoritesMovies);
            })
            .catch((err) => {
                console.log(err);
                setInfoTooltip({ ...infoTooltip, success: false, message: DELETE_MOVIE_ERROR })
                setIsInfoTooltipOpen(true)
                if (err.includes('Ошибка: 401')) {
                    localStorage.clear();
                    setLoggedIn(false);
                    setCurrentUser({});
                    history.push('/');
                    setInfoTooltip({ ...infoTooltip, success: false, message: TOKEN_ERROR })
                    setIsInfoTooltipOpen(true)
                }
            })
    }

    const handleAddFavoriteMovie = (movie) => {

        mainApi.addMovie(movie)
            .then((res) => {
                setFavoritesMovies([res, ...favoritesMovies]);
            })
            .catch((err) => {
                console.log(err);
                setInfoTooltip({ ...infoTooltip, success: false, message: SAVE_MOVIE_ERROR })
                setIsInfoTooltipOpen(true)
                if (err.includes('Ошибка: 401')) {
                    setInfoTooltip({ ...infoTooltip, success: false, message: TOKEN_ERROR })
                    setIsInfoTooltipOpen(true)
                    localStorage.clear();
                    setLoggedIn(false);
                    setCurrentUser({});
                    history.push('/');
                }
            })
    }

    const handleCloseInfoTooltip = () => {
        setIsInfoTooltipOpen(false)
    }

    return (

        <CurrentUserContext.Provider value={currentUser} >

            <div className='app'>
                <Header loggedIn={loggedIn} />
                <Switch>
                    <Route exact path="/">
                        <Main />
                    </Route>
                    <ProtectedRoute exact path="/movies"
                        component={Movies}
                        loggedIn={loggedIn}
                        onMovieLike={handleAddFavoriteMovie}
                        onMovieDelete={handleMovieDelete}
                        isLoading={isLoading}
                        favoritesMovies={favoritesMovies}
                        onLoad={setIsLoading}
                        setInfoTooltip={setInfoTooltip}
                        setIsInfoTooltipOpen={setIsInfoTooltipOpen}
                        infoTooltip={infoTooltip}
                    />
                    <ProtectedRoute exact path="/saved-movies"
                        component={SavedMovies}
                        loggedIn={loggedIn}
                        favoritesMovies={favoritesMovies}
                        onMovieDelete={handleMovieDelete}
                        isLoading={isLoading}
                        onLoad={setIsLoading}
                        setInfoTooltip={setInfoTooltip}
                        setIsInfoTooltipOpen={setIsInfoTooltipOpen}
                        infoTooltip={infoTooltip}

                    />
                    <ProtectedRoute exact path="/profile"
                        component={Profile}
                        loggedIn={loggedIn}
                        onUpdateUser={onUpdateUser}
                        onLogout={onLogout}
                        setInfoTooltip={setInfoTooltip}
                        setIsInfoTooltipOpen={setIsInfoTooltipOpen}
                        infoTooltip={infoTooltip}
                    />
                    <Route exact path="/signup">
                        {loggedIn ? <Redirect to="/movies" /> : <Register onRegister={onRegister} />}
                    </Route>
                    <Route exact path="/signin">
                        {loggedIn ? <Redirect to="/movies" /> : <Login onLogin={onLogin} />}
                    </Route>
                    <Route exact path="*">
                        <NotFoundPage />
                    </Route>
                </Switch>
                <Footer />
                <InfoTooltip
                    onClose={handleCloseInfoTooltip}
                    res={infoTooltip}
                    isOpen={isInfoTooltipOpen}
                />
            </div>
        </CurrentUserContext.Provider>
    )
}

export default App;