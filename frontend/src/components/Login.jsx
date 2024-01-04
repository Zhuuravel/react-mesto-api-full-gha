import {useState} from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "./AuthForm";

function Login({handleLogin}) {

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
        handleLogin(password, username);
    }

    return (
        <AuthForm title="Вход"
                  handleChangeUsername={handleChangeUsername}
                  handleChangePassword={handleChangePassword}
                  username={username}
                  password={password}
                  onSubmit={handleSubmit} text="Войти"/>
    )
}
export default Login