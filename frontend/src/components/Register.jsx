import React, {useState} from "react";
import { Link } from "react-router-dom";
import AuthForm from "./AuthForm";

function Register({handleReg}) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function handleChangeUsername(e) {
        setUsername(e.target.value);
    }

    function handleChangePassword(e) {
        setPassword(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        handleReg(password, username);
    }

    return (
        <AuthForm title="Регистрация"
                  handleChangeUsername={handleChangeUsername}
                  handleChangePassword={handleChangePassword}
                  username={username}
                  password={password}
                  onSubmit={handleSubmit} text="Зарегистрироваться">
            <Link className="auth__link" to="/sign-in">Уже зарегистрированы? Войти</Link>
        </AuthForm>
    )
}
export default Register