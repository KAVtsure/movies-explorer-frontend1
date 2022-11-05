import { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
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

function App() {

    const [loggedIn, setLoggedIn] = useState(true);

    return (
        <div className='app'>
            <Header />
            <Switch>
                <Route exact path="/">
                    <Main loggedIn={loggedIn} />
                </Route>
                <Route exact path="/movies">
                    <Movies />
                </Route>
                <Route exact path="/saved-movies">
                    <SavedMovies />
                </Route>
                <Route exact path="/profile">
                    <Profile />
                </Route>
                <Route exact path="/signup">
                    <Register />
                </Route>
                <Route exact path="/signin">
                    <Login />
                </Route>
                <Route exact path="*">
                    <NotFoundPage />
                </Route>
            </Switch>
            <Footer />
        </div>
    )
}

export default App;