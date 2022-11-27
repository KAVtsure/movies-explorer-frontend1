import success_icon from '../../images/success_icon.svg';
import fail_icon from '../../images/fail_icon.svg';
import './InfoTooltip.css';

function InfoTooltip({ onClose, isOpen, res: { success, message } }) {
    return (
        <div className={`popup popup_info ${isOpen && 'popup_opened'}`}>
            <div className="popup__container popup__container_info">
                <button className="popup__close-button" type="button" aria-label="закрыть окно" onClick={onClose}></button>
                <img className="popup__image-info" src={success ? success_icon : fail_icon} alt='результат регистрации' />
                <h2 className="popup__title popup__title_info">{message}</h2>
            </div>
        </div>
    )
}

export default InfoTooltip;