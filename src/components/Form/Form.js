import './Form.css';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';

function Form({ title, children, nameButton, routeTo, promtText, routeName }) {

    return (
        <section className='form'>
            <Link to='/'>
                <img className="form__logo" src={logo} alt="Логотип" />
            </Link>
            <h2 className='form__title'>{title}</h2>
            <form className='form__container'>
                {children}
                <label className='form__label'>E-mail
                    <input
                        className='form__input'
                        name='email'
                        id='email'
                        type='email'
                        required
                        minLength='2'
                        maxLength='40' />
                    <span className='input__error' id='email-error'></span>
                </label>
                <label className='form__label'>Пароль
                    <input
                        className='form__input'
                        name='password'
                        id='password'
                        type='password'
                        required
                        minLength='8'
                        maxLength='40' />
                    <span className='input__error' id='password-error'>Что-то пошло не так...</span>
                </label>
                <button className='form__submit' type='submit'>{nameButton}</button>
                <div className='form__prompt'>
                    <p className='form__prompt-text'>{promtText}</p>
                    <Link to={routeTo} className='form__prompt-link'>{routeName}</Link>
                </div>
            </form>
        </section>
    )
}

export default Form;