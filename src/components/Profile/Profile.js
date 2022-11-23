import './Profile.css';
import { useFormWithValidation } from '../../hooks/useFormWithValidation.js';
import { useState, useEffect, useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import { UPDATE_USER_MATCH_ERROR } from '../../utils/constants.js';

function Profile({ onUpdateUser, onLogout, setInfoTooltip, setIsInfoTooltipOpen, infoTooltip }) {

    const { values, setValues, handleChange, errors, isValid, resetForm, setIsValid } = useFormWithValidation();
    const currentUser = useContext(CurrentUserContext);

    const [isEditProfile, setIsEditProfile] = useState(false);

    function handleSubmit(e) {
        const previousValue = (currentUser.email === values.email) && (currentUser.name === values.name);

        e.preventDefault();
        if (previousValue) {
            console.log('данные совпадают')
            setInfoTooltip({ ...infoTooltip, success: false, message: UPDATE_USER_MATCH_ERROR })
            setIsInfoTooltipOpen(true)
            setIsValid(false)
            return;
        }
        console.log(currentUser)
        onUpdateUser(values);
        setIsEditProfile(false);
        // resetForm();
    }

    useEffect(() => {
       
        if (currentUser) {
            setValues(
                {
                    name: currentUser.name,
                    email: currentUser.email,
                }
            )
        }
    }, [currentUser, setValues])

    const toggleButton = (e) => {
        e.preventDefault();
        setIsEditProfile(true);
    }

    return (
        <section className='profile'>
            <h2 className='profile__title'>{`Привет, ${currentUser.name}!`}</h2>
            <form className='form__profile' onSubmit={handleSubmit}>
                <div className='value__profile'>
                    <label className='label__profile'>Имя
                        <input
                            className='input__profile'
                            name='name'
                            id='name'
                            type='text'
                            required
                            minLength='2'
                            maxLength='40'
                            value={values.name || ''}
                            onChange={handleChange}
                            pattern='[A-Za-zА-Яа-яЁё\s-]+'
                            disabled={!isEditProfile}
                        />
                        <span className='error__profile' id='name-error'>{errors.name}</span>
                    </label>
                </div>
                <div className='value__profile'>
                    <label className='label__profile'>E-mail
                        <input
                            className='input__profile'
                            name='email'
                            id='email'
                            type='email'
                            required
                            minLength='2'
                            maxLength='40'
                            value={values.email || ''}
                            onChange={handleChange}
                            disabled={!isEditProfile}
                        />
                        <span className='error__profile' id='name-error'>{errors.email}</span>
                    </label>
                </div>
                <div className='btn-container'>
                    {!isEditProfile ?
                        <button className='form__submit-profile' type='submit' onClick={toggleButton}>Редактировать</button>
                        :
                        <button className={`form__submit ${!isValid ? 'form__submit_disabled' : ''}`} type='submit' disabled={!isValid}>Сохранить</button>
                    }
                    <button className='form__submit-profile form__submit-profile_logout' type='button' onClick={onLogout}>Выйти из аккаунта</button>
                </div>
            </form>
        </section>
    )
}

export default Profile;