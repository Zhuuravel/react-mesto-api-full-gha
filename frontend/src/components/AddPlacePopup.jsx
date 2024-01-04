import PopupWithForm from "./PopupWithForm";
import {useState} from "react";

function AddPlacePopup({isOpen, onClose, onAddPlace}) {

    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeLink(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        onAddPlace({
            name,
            link
        });
    }

    function handleClose() {
        onClose()
        setName('');
        setLink('');
    }

    return (
        <PopupWithForm onClose={handleClose} isOpen={isOpen} title="Новое место" onSubmit={handleSubmit}>
            <label htmlFor="input-title" className="popup__form-field">
                <input type="text" className="popup__input popup__input_title" id="input-title" name="title"
                       placeholder="Название" minLength="2" maxLength="30" value={name} onChange={handleChangeName} required/>
                <span className="popup__input-error input-title-error"></span></label>
            <label htmlFor="input-photo" className="popup__form-field">
                <input type="url" className="popup__input popup__input_photo" id="input-photo" name="photo"
                       placeholder="Ссылка на картинку" value={link} onChange={handleChangeLink} required/>
                <span className="popup__input-error input-photo-error"></span>
            </label>
        </PopupWithForm>
    )
}

export default AddPlacePopup