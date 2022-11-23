import { useHistory } from 'react-router-dom';
import './NotFoundPage.css';

function NotFoundPage() {

    const history = useHistory();

    const handleBack = () => {
        history.goBack();
    }

    return (
        <section className='notfound'>
            <div className='notfound__container'>
                <h2 className='notfound__title'>404</h2>
                <p className='notfound__text'>Страница не найдена</p>
            </div>
            <button className='notfound__link' onClick={handleBack}>Назад</button>
        </section>
    )
}

export default NotFoundPage;