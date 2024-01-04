import {useContext} from "react";
import Card from "./Card.jsx"
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Main({onEditAvatar, onEditProfile, onAddPlace, onCardClick, cards, onCardLike, onCardDelete}) {

    const currentUser = useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <button
                    className="profile__avatar-button"
                    type="button"
                    onClick={onEditAvatar}>
                    <img
                        className="profile__image"
                        src={currentUser.avatar}
                        alt="Аватар профиля"/>
                </button>
                <div className="profile__info">
                    <div className="profile__row">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <button
                            className="profile__edit-button"
                            aria-label="Редактировать"
                            type="button"
                            onClick={onEditProfile} />
                    </div>
                    <p className="profile__description">{currentUser.about}</p>
                </div>
                <button
                    className="profile__add-button"
                    type="button"
                    aria-label="Добавить"
                    onClick={onAddPlace} />
            </section>
            <section className="elements">
                <ul className="elements__list">
                    {cards.reverse().map((card) => {
                        return (
                            <Card
                                card={card}
                                key={card._id}
                                onCardClick={onCardClick}
                                onCardLike={onCardLike}
                                onCardDelete={onCardDelete}
                            />
                        )
                    })}
                </ul>
            </section>
        </main>
    )
}

export default Main