import success from '../images/success.svg'
import fail from '../images/fail.svg'

function InfoTooltip({reg, isOpen, onClose}) {

    return (
        <div className={`popup ${isOpen}`}>
            <div className="popup__container">
                <button className="popup__close-button" type="button" aria-label="Закрыть" onClick={onClose} />
                <img
                    className="popup__auth-image"
                    src={reg ? success : fail}
                    alt="Успешная авторизация"/>
                <h2 className="popup__auth-title">{reg ? "Вы успешно зарегистрировались!" : "Что-то пошло не так!\n" +
                    "Попробуйте ещё раз."}</h2>
            </div>
        </div>
    )
}
export default InfoTooltip