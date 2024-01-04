import React from "react";

function AuthForm({title, handleChangeUsername, handleChangePassword, username, password, text, children, onSubmit}) {
    return(
        <main className="content">
            <form className="auth" name="info-register" onSubmit={onSubmit}>
                <h2 className="auth__title">{title}</h2>
                <label htmlFor="input-email" className="auth__form-field">
                    <input type="email" className="auth__input auth__input_email" id="input-email" name="email" value={username} onChange={handleChangeUsername}
                           placeholder="Email" required/>
                    <span className="auth__input-error input-email-error"></span>
                </label>
                <label htmlFor="input-password" className="auth__form-field">
                    <input type="password" className="auth__input auth__input_password" id="input-password" name="password" value={password} onChange={handleChangePassword}
                           placeholder="Пароль" minLength="2" maxLength="200"
                           required/>
                    <span className="auth__input-error input-password-error"></span>
                </label>
                <button className="auth__submit-button" aria-label={text}>{text}
                </button>
                {children}
            </form>
        </main>
    )
}

export default AuthForm