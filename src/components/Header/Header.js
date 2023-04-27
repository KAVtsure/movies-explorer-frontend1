import './Header.css';
import logo from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation';
import { Link, Route } from 'react-router-dom';


function Header({ loggedIn }) {

    const routes = ['/movies', '/saved-movies', '/profile', '/']

    return (
        <Route exact path={routes}>
            <header className="header">
                <Link to='/'>
                    <img className="header__logo" src={logo} alt="Логотип" />
                </Link>
                <Navigation routes={routes} loggedIn={loggedIn} />
            </header>
        </Route>
    )
}

export default Header;