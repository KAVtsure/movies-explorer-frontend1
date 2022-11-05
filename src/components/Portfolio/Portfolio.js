import './Portfolio.css';

function Portfolio() {

    return (
        <section className='portfolio'>
            <h2 className='portfolio__head'>Портфолио</h2>
            <ul className='portfolio__links'>
                <li className='portfolio__element'>
                    <p className='portfolio__text'>Статичный сайт</p>
                    <a className='portfolio__link' href='https://github.com/KAVtsure/how-to-learn' target='_blank' rel='noreferrer'>
                        <p className='portfolio__arrow'>↗</p>
                    </a>
                </li>
                <li className='portfolio__element'>
                    <p className='portfolio__text'>Адаптивный сайт</p>
                    <a className='portfolio__link' href='https://github.com/KAVtsure/russian-travel' target='_blank' rel='noreferrer'>
                        <p className='portfolio__arrow'>↗</p>
                    </a>
                </li>
                <li className='portfolio__element'>
                    <p className='portfolio__text'>Одностраничное приложение</p>
                    <a className='portfolio__link' href='https://github.com/KAVtsure/react-mesto-api-full' target='_blank' rel='noreferrer'>
                        <p className='portfolio__arrow'>↗</p>
                    </a>
                </li>
            </ul>
        </section>
    )
}

export default Portfolio;