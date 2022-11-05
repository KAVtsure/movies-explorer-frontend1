import './Navigation.css';
import { Route, Link, Switch, NavLink } from 'react-router-dom';
import { useState } from 'react';


function Navigation({ routes, loggedIn }) {

    const [isOpenMenu, setIsOpenMenu] = useState(false);

    function handleToggleMenu() {
        setIsOpenMenu(!isOpenMenu)
    }

    return (
        <div className={`navigation ${isOpenMenu ? 'navigation_open' : ''}`}>
            <Switch>
                <Route exact path='/' loggedIn={!loggedIn}>
                    <nav className='navigation__auth'>
                        <Link to="/signup" className="navigation__auth-link">Регистрация</Link>
                        <Link to="/signin" className="navigation__auth-link navigation__auth-link_login">Войти</Link>
                    </nav>
                </Route>

                <Route path={routes} loggedIn={loggedIn}>
                    <div className='navigation-loggedIn'>
                        <div className='navigation-menu'>
                            <nav className='navigation-menu__movies'>
                                <NavLink to='/movies' className='menu-link' activeClassName='menu-link_active'>Фильмы</NavLink>
                                <NavLink to='/saved-movies' className='menu-link' activeClassName='menu-link_active'>Сохранённые фильмы</NavLink>
                            </nav>
                            <Link to='/profile'>
                                <button className='navigation-menu__profile'>Аккаунт</button>
                            </Link>
                        </div>
                    </div>
                    <button className={`${isOpenMenu ? 'nav-menu__button-close' : 'nav-menu__button'}`} type='button' onClick={handleToggleMenu}></button>
                    <div className={`mobile ${isOpenMenu ? 'mobile_open' : ''}`}>
                        <nav className='menu__mobile'>
                            <NavLink exact to='/' className='menu-link__mobile' activeClassName='menu-link__mobile_active' onClick={handleToggleMenu}>Главная</NavLink>
                            <NavLink to='/movies' className='menu-link__mobile' activeClassName='menu-link__mobile_active' onClick={handleToggleMenu}>Фильмы</NavLink>
                            <NavLink to='/saved-movies' className='menu-link__mobile' activeClassName='menu-link__mobile_active' onClick={handleToggleMenu}>Сохранённые фильмы</NavLink>
                        </nav>
                        <Link to='/profile' className='menu-profile' onClick={handleToggleMenu}>Аккаунт</Link>
                    </div>
                </Route>
            </Switch>
        </div>
    )
}

export default Navigation;

