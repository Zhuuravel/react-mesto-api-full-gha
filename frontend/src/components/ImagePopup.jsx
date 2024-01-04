function ImagePopup({card, onClose, isOpen}) {
    return(
        <div className={`popup ${isOpen}`}>
            <div className="popup__card">
                <button className="popup__close-button" type="button" aria-label="Закрыть" onClick={onClose}></button>
                <img className="popup__image" src={card.link} alt={card.name}/>
                <h2 className="popup__description">{card.name}</h2>
            </div>
        </div>
    )
}

export default ImagePopup