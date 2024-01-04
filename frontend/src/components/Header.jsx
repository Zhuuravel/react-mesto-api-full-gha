import logo from '../images/logo.svg';
import React from 'react';
import { NavLink } from "react-router-dom"

function Header({loggedIn, linkTitle, toSignOut, userEmail, route}) {
    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="логотип"/>
            <nav className="header__nav">
                {loggedIn && <p className="header__user">{userEmail}</p>}
                <NavLink className="header__link" onClick={toSignOut} to={route}>{linkTitle}</NavLink>
            </nav>
        </header>
    )
}

export default Header