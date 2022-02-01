import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Check2Circle } from 'react-bootstrap-icons'
import Button from 'react-bootstrap/Button'

import { AuthContext } from '../../App'
import { LOGOUT } from '../../action-types'

import NavLink from '../NavLink'

function Nav() {
    const { state: authState, dispatch } = React.useContext(AuthContext)
    const navigate = useNavigate()

    const logout = () => {
        dispatch({ type: LOGOUT })
        navigate('/')
    }

    return (
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">
                    Duit <Check2Circle />
                </a>

                <button className="navbar-toggler collapsed" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbar-collapse" aria-controls="navbar-collapse">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="navbar-collapse collapse" id="navbar-collapse">
                    <ul className="navbar-nav me-auto mb-2 mb-md-0">
                        <li className="nav-item">
                            <NavLink to="/home">Home</NavLink>
                        </li>

                        {
                            ['ADMIN'].find(role => role === authState.role) &&
                            <li className="nav-item">
                                <NavLink to="/stats">Stats</NavLink>
                            </li>
                        }

                        <li className="nav-item">
                            <NavLink to="/prefs">Preferences</NavLink>
                        </li>

                        {/* Only visible for admin users */}
                        {/* If more roles are allowed, push them to the array */}
                        {
                            ['ADMIN'].find(role => role === authState.role) &&
                            <li className="nav-item">
                                <NavLink to="/backoffice/users">Users</NavLink>
                            </li>
                        }

                        <li className="nav-item">
                            {/* Uso de React Bootstrap */}
                            <Button variant="link" className="nav-link" onClick={logout}>Logout</Button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Nav