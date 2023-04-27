import './NavTab.css';

function NavTab() {

    return (
        <nav className='navtab'>
            <ul className='navtab__menu'>
                <li className='navtab__element'>
                    <a className='navtab__link' href='#project'>О проекте</a>
                </li>
                <li className='navtab__element'>
                    <a className='navtab__link' href='#techs'>Технологии</a>
                </li>
                <li className='navtab__element'>
                    <a className='navtab__link' href='#student'>Студент</a>
                </li>
            </ul>
        </nav>
    )
}

export default NavTab;