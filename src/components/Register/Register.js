import './Register.css';
import Form from '../Form/Form.js';
import { useFormWithValidation } from '../../hooks/useFormWithValidation.js';

function Register({ onRegister }) {

    const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!values.email || !values.password || !values.name) {
            return;
        }
        onRegister(values);
        resetForm();
    }

    return (
        <Form
            title='Добро пожаловать!'
            nameButton='Зарегистрироваться'
            routeTo='/signin'
            promtText='Уже зарегистрированы?'
            routeName='Войти'
            onSubmit={handleSubmit}
            isValid={isValid}
        >
            <label className='form__label'>Имя
                <input
                    className='form__input'
                    name='name'
                    id='name'
                    type='text'
                    required
                    minLength='2'
                    maxLength='40'
                    value={values.name || ''}
                    onChange={handleChange}
                    pattern='[A-Za-zА-Яа-яЁё\s-]+'
                />
                <span className='input__error' id='name-error'>{errors.name}</span>
            </label>
            <label className='form__label'>E-mail
                <input
                    className='form__input'
                    name='email'
                    id='email'
                    type='email'
                    required
                    minLength='2'
                    maxLength='30'
                    value={values.email || ''}
                    onChange={handleChange}
                />
                <span className='input__error' id='email-error'>{errors.email}</span>
            </label>
            <label className='form__label'>Пароль
                <input
                    className='form__input'
                    name='password'
                    id='password'
                    type='password'
                    required
                    minLength='8'
                    maxLength='40'
                    value={values.password || ''}
                    onChange={handleChange} />
                <span className='input__error' id='password-error'>{errors.password}</span>
            </label>
        </Form>
    )
}

export default Register;
