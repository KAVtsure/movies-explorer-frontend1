import { Route } from 'react-router-dom';
import './Footer.css';

function Footer() {

    const routes = ['/movies', '/saved-movies', '/']

    return (

        <Route exact path={routes}>
            <section className='footer'>
                <h3 className='footer__head'>Учебный проект Яндекс.Практикум х BeatFilm.</h3>
                <div className='footer__container'>
                    <p className='footer__copyright'>&copy; 2022</p>
                    <ul className='footer__links'>
                        <li className='footer__element'>
                            <a className='footer__link' href='https://practicum.yandex.ru/' target='_blank' rel='noreferrer'>Яндекс.Практикум</a>
                        </li>
                        <li className='footer__element'>
                            <a className='footer__link' href='https://github.com/KAVtsure' target='_blank' rel='noreferrer'>Github</a>
                        </li>
                    </ul>
                </div>
            </section>
        </Route>
    )
}

export default Footer;