import { Link } from 'react-router-dom';
import './NotFoundPage.css';

function NotFoundPage() {

    return (
        <section className='notfound'>
            <div className='notfound__container'>
                <h2 className='notfound__title'>404</h2>
                <p className='notfound__text'>Страница не найдена</p>
            </div>
            <Link to='/' className='notfound__link'>Назад</Link>
        </section>
    )
}

export default NotFoundPage;