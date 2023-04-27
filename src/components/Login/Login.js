import './Login.css';
import Form from '../Form/Form.js';
import { useFormWithValidation } from '../../hooks/useFormWithValidation.js';

function Login({ onLogin }) {

    const { values, handleChange, errors, isValid } = useFormWithValidation();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!values.email || !values.password) {
            return;
        }
        onLogin(values);

    }

    return (
        <Form
            title='Рады видеть!'
            nameButton='Войти'
            routeTo='/signup'
            promtText='Ещё не зарегистрированы?'
            routeName='Регистрация'
            onSubmit={handleSubmit}
            isValid={isValid}
        >
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
                    pattern={'^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$'}
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
        </Form >

    )
}

export default Login;