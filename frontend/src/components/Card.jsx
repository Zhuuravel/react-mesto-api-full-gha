import React, {useContext} from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Card({card, onCardClick, onCardLike, onCardDelete}) {

    const currentUser = useContext(CurrentUserContext);
    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = card.owner._id === currentUser._id;

    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = (
        `element__like-button ${isLiked && 'element__like-button_active'}`
    );;

    function handleClick() {
        onCardClick(card);
    }

    function handleLikeClick() {
        onCardLike(card);
    }

    function handleDeleteClick() {
        onCardDelete(card)
    }

    return (
        <li className="element">
            {isOwn && <button className='element__delete-button' onClick={handleDeleteClick} aria-label="Удалить" />}
            <button className="element__image-button"><img className="element__image" src={`${card.link}`} alt={card.name} onClick={handleClick} /></button>
            <div className="element__row">
                <h2 className="element__title">{card.name}</h2>
                <div className="element__like">
                    <button className={cardLikeButtonClassName} type="button" aria-label="Нравится" onClick={handleLikeClick} />
                    <h2 className="element__like-counter">{card.likes.length}</h2>
                </div>
            </div>
        </li>
    )
}

export default Card