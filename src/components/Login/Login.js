import './Login.css';
import Form from '../Form/Form.js';

function Login() {

    return (
        <Form
            title='Рады видеть!'
            nameButton='Войти'
            routeTo='/signup'
            promtText='Ещё не зарегистрированы?'
            routeName='Регистрация'
        />
    )
}

export default Login;