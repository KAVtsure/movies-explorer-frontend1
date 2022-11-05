import './Register.css';
import Form from '../Form/Form.js';

function Register() {

    return (
        <Form
            title='Добро пожаловать!'
            nameButton='Зарегистрироваться'
            routeTo='/signin'
            promtText='Уже зарегистрированы?'
            routeName='Войти'
        >
            <label className='form__label'>Имя
                <input
                    className='form__input'
                    name='name'
                    id='name'
                    type='text'
                    required
                    minLength='2'
                    maxLength='40' />
                <span className='input__error' id='name-error'></span>
            </label>
        </Form>
    )
}

export default Register;
