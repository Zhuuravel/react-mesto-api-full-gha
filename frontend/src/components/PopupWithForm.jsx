function PopupWithForm({isOpen, onClose, name, title, text, children, onSubmit}) {
    return(
        <div className={`popup ${isOpen}`}  >
            <div className="popup__container">
                <form className="popup__form" name={name} onSubmit={onSubmit}>
                    <button className="popup__close-button" type="button" aria-label="Закрыть" onClick={onClose} />
                    <h2 className="popup__title">{title}</h2>
                    {children}
                    <button className="popup__submit-button" aria-label={text || 'Сохранить'}>{text || 'Сохранить'}</button>
                </form>
            </div>
        </div>
    )
}

export default PopupWithForm