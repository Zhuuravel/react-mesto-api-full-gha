import PopupWithForm from "./PopupWithForm";
import {useRef} from "react";

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {

    const avatar = useRef('');

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateAvatar({
            avatar: avatar.current.value
        });
    }

    function handleClose() {
        onClose()
        avatar.current.value = ''
    }

    return (
        <PopupWithForm onClose={handleClose} isOpen={isOpen} title="Обновить аватар" onSubmit={handleSubmit}>
            <label htmlFor="input-avatar" className="popup__form-field">
                <input type="text" className="popup__input popup__input_avatar" id="input-avatar" name="avatar"
                       placeholder="Ссылка на аватар" ref={avatar} required/>
                <span className="popup__input-error input-avatar-error"></span></label>
        </PopupWithForm>
    )
}

export default EditAvatarPopup