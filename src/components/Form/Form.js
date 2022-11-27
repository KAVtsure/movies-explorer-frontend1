import './Form.css';

import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';

function Form({ title, children, isValid, nameButton, routeTo, promtText, routeName, onSubmit }) {

    return (
        <section className='form'>
            <Link to='/'>
                <img className="form__logo" src={logo} alt="Логотип" />
            </Link>
            <h2 className='form__title'>{title}</h2>
            <form className='form__container' onSubmit={onSubmit} noValidate>
                {children}
                <button className={`form__submit ${!isValid ? 'form__submit_disabled' : ''}`} type='submit' disabled={!isValid}>{nameButton}</button>
                <div className='form__prompt'>
                    <p className='form__prompt-text'>{promtText}</p>
                    <Link to={routeTo} className='form__prompt-link'>{routeName}</Link>
                </div>
            </form>
        </section>
    )
}

export default Form;