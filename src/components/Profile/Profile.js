import './Profile.css';

function Profile() {

    return (
        <section className='profile'>
            <h2 className='profile__title'>Привет, Андрей!</h2>
            <form className='form__profile'>
                <div className='value__profile'>
                    <label className='label__profile'>Имя
                        <input
                            className='input__profile'
                            value='Андрей'
                            name='name'
                            id='name'
                            type='text'
                            required
                            minLength='2'
                            maxLength='40' />
                        <span className='error__profile' id='name-error'></span>
                    </label>
                </div>
                <div className='value__profile'>
                    <label className='label__profile'>E-mail
                        <input
                            className='input__profile'
                            value='pochta@yandex.ru'
                            name='email'
                            id='email'
                            type='email'
                            required
                            minLength='2'
                            maxLength='40' />
                        <span className='error__profile' id='name-error'></span>
                    </label>
                </div>
            </form>
            <div className='btn-container'>
                <button className='form__submit-profile' type='submit'>Редактировать</button>
                <button className='form__submit-profile form__submit-profile_logout' type='submit'>Выйти из аккаунта</button>
            </div>
        </section>
    )
}

export default Profile;