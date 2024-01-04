import PopupWithForm from "./PopupWithForm";
import {useEffect, useContext, useState} from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    // Подписка на контекст
    const currentUser = useContext(CurrentUserContext);
    // После загрузки текущего пользователя из API
// его данные будут использованы в управляемых компонентах.
    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        onUpdateUser({
            name,
            about: description,
        });
    }

return (
    <PopupWithForm onClose={onClose} isOpen={isOpen} title="Редактировать профиль" onSubmit={handleSubmit}>
        <label htmlFor="input-name" className="popup__form-field">
            <input type="text" className="popup__input popup__input_name" id="input-name" name="name" value={name} onChange={handleChangeName}
                   placeholder="Имя" minLength="2" maxLength="40" required/>
            <span className="popup__input-error input-name-error"></span>
        </label>
        <label htmlFor="input-description" className="popup__form-field">
            <input type="text" className="popup__input popup__input_description" id="input-description" name="description" value={description} onChange={handleChangeDescription}
                   placeholder="О себе" minLength="2" maxLength="200"
                   required/>
            <span className="popup__input-error input-description-error"></span>
        </label>
    </PopupWithForm>
)
}

export default EditProfilePopup