import React, { useContext } from "react"
import { useNavigate } from "react-router-dom"

import { LOGOUT } from "../../../action-types"
import { AuthContext } from "../../../App"
import NavigationLink from "../../NavigationLink"
import { NavbarWrapper } from "./NavbarStyles"
import logo from '../../../assets/img/logo.png'

function Navbar({ open, handleClick }) {
    const { state: authState, dispatch: authDispatch } = useContext(AuthContext)
    const navigate = useNavigate()

    const logout = () => {
        authDispatch({ type: LOGOUT })
        navigate('/')
    }

    return (
        <NavbarWrapper open={open}>
            <NavigationLink className="menu-button" to="/" onClick={handleClick}><span className="logo"><img src={logo} /></span></NavigationLink>
            {authState.user && (
                <NavigationLink className="menu-button" to="/home" onClick={handleClick}><span>Home</span></NavigationLink>
            )}
            {
                ['ADMIN'].find(role => role === authState.role) &&
                <>
                    <NavigationLink className="menu-button" to="/stats" onClick={handleClick}>Stats</NavigationLink>
                    <NavigationLink to="/backoffice/users" onClick={handleClick}>Users</NavigationLink>
                </>
            }
            {authState.user && (
                <NavigationLink to="/prefs" onClick={handleClick}>Preferences</NavigationLink>
            )}
            <a className="menu-button" href="/#plans" onClick={handleClick}><span>Plans</span></a>
            <a className="menu-button" href="/#reviews" onClick={handleClick}><span>Reviews</span></a>

            {authState.user && (
                <button classNameName='logout-button' onClick={logout}>
                    <NavigationLink className="menu-button" to="/">Logout</NavigationLink>
                </button>
            )}
        </NavbarWrapper>
    )
}

export default Navbar 